package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"
)

// 用户结构体
type User struct {
	Username      string   `json:"username"`
	Password      string   `json:"password"`
	QuestionBanks []string `json:"question_banks"` // 可访问的题库列表
}

// 会话结构体
type Session struct {
	Username string
	Expires  time.Time
}

// 全局变量
var (
	users    = make(map[string]User)
	sessions = make(map[string]Session)
	mutex    = sync.RWMutex{}
)

// 预定义用户账号和权限
func initUsers() {
	// 管理员账号 - 可以访问所有题库
	users["admin"] = User{
		Username: "admin",
		Password: "admin123",
		QuestionBanks: []string{
			"questions", "questionsaiagent", "questionspython",
			"questionsreactts", "questionsgomicro", "questionscrypto",
			"questionscontract", "questionsenglish", "questionsstock",
		},
	}

	// 普通用户账号 - 只能访问部分题库
	users["user1"] = User{
		Username:      "user1",
		Password:      "user123",
		QuestionBanks: []string{"questions", "questionspython", "questionsenglish"},
	}

	// 开发者账号 - 可以访问技术相关题库
	users["dev"] = User{
		Username: "dev",
		Password: "dev123",
		QuestionBanks: []string{
			"questions", "questionsaiagent", "questionspython",
			"questionsreactts", "questionsgomicro", "questionscrypto",
		},
	}

	// 学生账号 - 基础题库
	users["student"] = User{
		Username:      "student",
		Password:      "student123",
		QuestionBanks: []string{"questions", "questionsenglish"},
	}
}

// 生成会话ID
func generateSessionID() string {
	return fmt.Sprintf("%d", time.Now().UnixNano())
}

// 检查会话是否有效
func isValidSession(sessionID string) bool {
	mutex.RLock()
	defer mutex.RUnlock()

	session, exists := sessions[sessionID]
	if !exists {
		return false
	}

	if time.Now().After(session.Expires) {
		delete(sessions, sessionID)
		return false
	}

	return true
}

// 获取当前用户
func getCurrentUser(r *http.Request) *User {
	cookie, err := r.Cookie("session_id")
	if err != nil {
		return nil
	}

	if !isValidSession(cookie.Value) {
		return nil
	}

	mutex.RLock()
	defer mutex.RUnlock()

	session := sessions[cookie.Value]
	user, exists := users[session.Username]
	if !exists {
		return nil
	}

	return &user
}

// 登录处理函数
func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	username := r.FormValue("username")
	password := r.FormValue("password")

	mutex.RLock()
	user, exists := users[username]
	mutex.RUnlock()

	if !exists || user.Password != password {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "用户名或密码错误",
		})
		return
	}

	// 创建新会话
	sessionID := generateSessionID()
	expires := time.Now().Add(24 * time.Hour)

	mutex.Lock()
	sessions[sessionID] = Session{
		Username: username,
		Expires:  expires,
	}
	mutex.Unlock()

	// 设置会话cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    sessionID,
		Expires:  expires,
		Path:     "/",
		HttpOnly: true,
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":        true,
		"message":        "登录成功",
		"username":       username,
		"question_banks": user.QuestionBanks,
	})
}

// 登出处理函数
func logoutHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session_id")
	if err == nil {
		mutex.Lock()
		delete(sessions, cookie.Value)
		mutex.Unlock()
	}

	// 清除cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    "",
		Expires:  time.Now().Add(-1 * time.Hour),
		Path:     "/",
		HttpOnly: true,
	})

	http.Redirect(w, r, "/login", http.StatusSeeOther)
}

// 检查登录状态
func checkAuthHandler(w http.ResponseWriter, r *http.Request) {
	user := getCurrentUser(r)
	if user == nil {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"authenticated": false,
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"authenticated":  true,
		"username":       user.Username,
		"question_banks": user.QuestionBanks,
	})
}

// 登录页面
func loginPageHandler(w http.ResponseWriter, r *http.Request) {
	// 如果已经登录，重定向到主页面
	if getCurrentUser(r) != nil {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	html := `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录 - 学习系统</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div class="text-center mb-6">
            <i class="fa fa-code text-blue-500 text-4xl mb-4"></i>
            <h1 class="text-2xl font-bold text-gray-800">学习系统登录</h1>
            <p class="text-gray-600 mt-2">请输入您的账号信息</p>
        </div>
        
        <form id="loginForm" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input type="text" name="username" required 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <input type="password" name="password" required 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            
            <button type="submit" 
                    class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                登录
            </button>
        </form>
        
        <div class="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 class="text-sm font-medium text-gray-700 mb-2">测试账号：</h3>
            <div class="text-xs text-gray-600 space-y-1">
                <div>管理员: admin / admin123 (所有题库)</div>
                <div>开发者: dev / dev123 (技术题库)</div>
                <div>用户1: user1 / user123 (基础题库)</div>
                <div>学生: student / student123 (基础题库)</div>
            </div>
        </div>
        
        <div id="message" class="mt-4 text-center text-sm hidden"></div>
    </div>
    
    <script>
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const response = await fetch('/api/login', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            const messageEl = document.getElementById('message');
            
            if (result.success) {
                messageEl.className = 'mt-4 text-center text-sm text-green-600';
                messageEl.textContent = '登录成功，正在跳转...';
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                messageEl.className = 'mt-4 text-center text-sm text-red-600';
                messageEl.textContent = result.message;
            }
            messageEl.classList.remove('hidden');
        });
    </script>
</body>
</html>`

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(w, html)
}

// 主页面（需要认证）
func mainHandler(w http.ResponseWriter, r *http.Request) {
	user := getCurrentUser(r)
	if user == nil {
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	// 读取golearn.html文件
	content, err := os.ReadFile("golearn.html")
	if err != nil {
		http.Error(w, "无法读取页面文件", http.StatusInternalServerError)
		return
	}

	htmlContent := string(content)

	// 修改题库按钮为"我的"
	htmlContent = strings.ReplaceAll(htmlContent, "题库", "我的")

	// 修改题库下拉菜单，只显示用户有权限的题库
	htmlContent = modifyQuestionBankMenu(htmlContent, user)

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(w, htmlContent)
}

// 修改题库下拉菜单
func modifyQuestionBankMenu(htmlContent string, user *User) string {
	bankNames := map[string]string{
		"questions":         "Go区块链",
		"questionsaiagent":  "AI Agent",
		"questionspython":   "Python",
		"questionsreactts":  "React",
		"questionsgomicro":  "Go微服务",
		"questionscrypto":   "加密概念",
		"questionscontract": "智能合约",
		"questionsenglish":  "英语学习",
		"questionsstock":    "股票投资",
	}

	// 生成用户有权限的题库选项
	var options strings.Builder
	for _, bank := range user.QuestionBanks {
		if name, exists := bankNames[bank]; exists {
			options.WriteString(fmt.Sprintf(`
                            <button class="question-bank-option w-full text-left px-3 py-2 text-xs hover:bg-gray-100" data-bank="%s">
                                <span>%s</span>
                            </button>`, bank, name))
		}
	}

	// 替换题库菜单部分
	oldMenu := `<div id="question-bank-menu" class="absolute top-full right-0 mt-1 w-auto min-w-[80px] bg-white rounded-md shadow-lg border border-gray-200 z-20 hidden">
                        <div class="py-1">
                            <button class="question-bank-option w-full text-left px-3 py-2 text-xs hover:bg-gray-100" data-bank="questions">
                                <span>Go区块链</span>
                            </button>
                            <button class="question-bank-option w-full text-left px-3 py-2 text-xs hover:bg-gray-100" data-bank="questionsaiagent">
                                <span>AI Agent</span>
                            </button>
                            <button class="question-bank-option w-full text-left px-3 py-2 text-xs hover:bg-gray-100" data-bank="questionspython">
                                <span>Python</span>
                            </button>
                            <button class="question-bank-option w-full text-left px-3 py-2 text-xs hover:bg-gray-100" data-bank="questionsreactts">
                                <span>React</span>
                            </button>
                            <button class="question-bank-option w-full text-left px-3 py-2 text-xs hover:bg-gray-100" data-bank="questionsgomicro">
                                <span>Go微服务</span>
                            </button>
                            <button class="question-bank-option w-full text-left px-3 py-2 text-xs hover:bg-gray-100" data-bank="questionscrypto">
                                <span>加密概念</span>
                            </button>
                            <button class="question-bank-option w-full text-left px-3 py-2 text-xs hover:bg-gray-100" data-bank="questionscontract">
                                <span>智能合约</span>
                            </button>
                            <button class="question-bank-option w-full text-left px-3 py-2 text-xs hover:bg-gray-100" data-bank="questionsenglish">
                                <span>英语学习</span>
                            </button>
                            <button class="question-bank-option w-full text-left px-3 py-2 text-xs hover:bg-gray-100" data-bank="questionsstock">
                                <span>股票投资</span>
                            </button>
                        </div>
                    </div>`

	newMenu := fmt.Sprintf(`<div id="question-bank-menu" class="absolute top-full right-0 mt-1 w-auto min-w-[80px] bg-white rounded-md shadow-lg border border-gray-200 z-20 hidden">
                        <div class="py-1">%s
                        </div>
                    </div>`, options.String())

	return strings.Replace(htmlContent, oldMenu, newMenu, 1)
}

// 静态文件服务
func fileServerHandler(w http.ResponseWriter, r *http.Request) {
	// 检查认证
	if getCurrentUser(r) == nil {
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}

	// 服务静态文件
	filePath := r.URL.Path[1:] // 移除开头的"/"
	if filePath == "" {
		filePath = "golearn.html"
	}

	// 检查文件是否存在
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		http.NotFound(w, r)
		return
	}

	http.ServeFile(w, r, filePath)
}

// 中间件：记录请求日志
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %s", r.Method, r.URL.Path, time.Since(start))
	})
}

// 中间件：添加安全头
func securityHeadersMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		next.ServeHTTP(w, r)
	})
}

func main() {
	// 初始化用户数据
	initUsers()

	// 设置路由
	mux := http.NewServeMux()

	// API路由
	mux.HandleFunc("/api/login", loginHandler)
	mux.HandleFunc("/api/logout", logoutHandler)
	mux.HandleFunc("/api/check-auth", checkAuthHandler)

	// 页面路由
	mux.HandleFunc("/login", loginPageHandler)

	// 主路由处理所有请求
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			mainHandler(w, r)
		} else if r.URL.Path == "/golearn.html" {
			fileServerHandler(w, r)
		} else {
			// 处理其他静态文件请求
			fileServerHandler(w, r)
		}
	})

	// 应用中间件
	handler := loggingMiddleware(securityHeadersMiddleware(mux))

	// 启动服务器
	port := ":8088"
	log.Printf("服务器启动在 http://localhost%s", port)
	log.Printf("登录页面: http://localhost%s/login", port)
	log.Println("测试账号:")
	log.Println("  - 管理员: admin / admin123 (所有题库)")
	log.Println("  - 开发者: dev / dev123 (技术题库)")
	log.Println("  - 用户1: user1 / user123 (基础题库)")
	log.Println("  - 学生: student / student123 (基础题库)")

	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatal("服务器启动失败:", err)
	}
}
