// 登录状态管理
let isLoggedIn = false;
// ✅ 固定Worker接口地址（已写死你的域名，无需修改）
const WORKER_LOGIN_URL = "https://api.immmor.com/login";
const WORKER_REGISTER_URL = "https://api.immmor.com/register";

// 创建登录按钮
function createLoginButton() {
    const questionBankBtn = document.getElementById('question-bank-btn');
    if (!questionBankBtn) return;
    const parentDiv = questionBankBtn.parentElement;
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'flex items-center gap-2';
    parentDiv.insertBefore(buttonsContainer, questionBankBtn);
    buttonsContainer.appendChild(questionBankBtn);
    questionBankBtn.style.marginLeft = '0';
    questionBankBtn.style.marginRight = '0';

    // 创建登录按钮
    const loginBtn = document.createElement('button');
    loginBtn.id = 'login-btn';
    loginBtn.className = 'text-xs text-gray-500 hover:text-blue-500 flex items-center rounded transition-colors';
    loginBtn.title = '登录';
    loginBtn.innerHTML = '<i class="fas fa-user"></i>';
    buttonsContainer.appendChild(loginBtn);

    const questionBankMenu = document.getElementById('question-bank-menu');
    if (questionBankMenu) parentDiv.appendChild(questionBankMenu);
}

// 创建登录和注册模态框
function createLoginModal() {
    const overlay = document.createElement('div');
    overlay.id = 'login-modal-overlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.className = 'bg-white rounded-lg shadow-xl p-6 w-full max-w-sm';
    modal.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">登录</h3>
            <button id="login-modal-close" class="text-gray-400 hover:text-gray-500">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <form id="login-form">
            <div class="mb-4">
                <label for="login-username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input type="text" id="login-username" name="username" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="请输入用户名">
            </div>
            <div class="mb-4">
                <label for="login-password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <input type="password" id="login-password" name="password" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="请输入密码">
            </div>
            <div id="login-error" class="mb-4 text-sm text-red-500 hidden"></div>
            <div class="flex flex-col gap-2">
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">登录</button>
                <div class="text-center text-xs text-gray-500">
                    还没有账号？ <button id="register-button" class="text-green-500 hover:underline">立即注册</button>
                </div>
            </div>
        </form>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

// 初始化登录功能
function initLogin() {
    createLoginButton();
    createLoginModal();
    const storedLogin = localStorage.getItem('userLoggedIn');
    if (storedLogin === 'true') {
        isLoggedIn = true;
        updateLoginButton();
    }
    
    // 登录按钮点击事件
    document.getElementById('login-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        isLoggedIn ? showUserMenu() : showLoginModal();
    });
    
    // 登录表单提交事件
    document.getElementById('login-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
    
    // 登录模态框关闭事件
    document.getElementById('login-modal-close')?.addEventListener('click', hideLoginModal);
    document.getElementById('login-modal-overlay')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) hideLoginModal();
    });
    
    // 注册按钮点击事件（在登录界面内）
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'register-button') {
            e.preventDefault();
            // 在登录表单内切换到注册模式
            const modalTitle = document.querySelector('#login-modal h3');
            const submitBtn = document.querySelector('#login-form button[type="submit"]');
            const registerBtn = document.getElementById('register-button');
            
            if (modalTitle && submitBtn && registerBtn) {
                if (modalTitle.textContent === '登录') {
                    modalTitle.textContent = '注册';
                    submitBtn.textContent = '注册';
                    submitBtn.className = 'w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm';
                    registerBtn.textContent = '已有账号？立即登录';
                    submitBtn.onclick = (e) => {
                        e.preventDefault();
                        handleRegister();
                    };
                } else {
                    modalTitle.textContent = '登录';
                    submitBtn.textContent = '登录';
                    submitBtn.className = 'w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm';
                    registerBtn.textContent = '还没有账号？立即注册';
                    submitBtn.onclick = (e) => {
                        e.preventDefault();
                        handleLogin();
                    };
                }
            }
        }
    });
}

// 显示/隐藏登录模态框
function showLoginModal() {
    const modal = document.getElementById('login-modal-overlay');
    if (modal) {
        modal.classList.remove('hidden');
        document.getElementById('login-username').focus();
    }
}

function hideLoginModal() {
    const modal = document.getElementById('login-modal-overlay');
    const form = document.getElementById('login-form');
    const error = document.getElementById('login-error');
    modal?.classList.add('hidden');
    form?.reset();
    error && (error.textContent = '', error.classList.add('hidden'));
}

// ✅ 核心修复：登录请求处理（100%适配Worker接口）
function handleLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorMsg = document.getElementById('login-error');

    // 1. 本地校验输入
    if (!username || !password) {
        errorMsg.textContent = '用户名和密码不能为空！';
        errorMsg.classList.remove('hidden');
        return;
    }

    // 2. 显示加载状态
    errorMsg.textContent = '正在登录...';
    errorMsg.className = 'mb-4 text-sm text-gray-500';
    errorMsg.classList.remove('hidden');

    // ✅ 3. 请求Worker登录接口（修复所有请求问题）
    fetch(WORKER_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ username, password }), // 正确传递参数
        mode: 'cors' // 强制跨域模式
    }).then(async (res) => {
        const data = await res.json(); // 强制解析JSON
        if (data.success) {
            // 登录成功
            isLoggedIn = true;
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('username', username);
            updateLoginButton();
            hideLoginModal();
            errorMsg.textContent = '登录成功！';
            errorMsg.className = 'mb-4 text-sm text-green-500';
            setTimeout(() => errorMsg.classList.add('hidden'), 2000);
        } else {
            // 登录失败
            errorMsg.textContent = data.message || '用户名或密码错误';
            errorMsg.className = 'mb-4 text-sm text-red-500';
        }
    }).catch((err) => {
        // 捕获网络错误
        errorMsg.textContent = '网络异常，请重试！';
        errorMsg.className = 'mb-4 text-sm text-red-500';
        console.error('登录请求失败：', err);
    });
}

// ✅ 注册请求处理（100%适配Worker接口）
function handleRegister() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorMsg = document.getElementById('login-error');

    // 1. 本地校验输入
    if (!username || !password) {
        errorMsg.textContent = '用户名和密码不能为空！';
        errorMsg.classList.remove('hidden');
        return;
    }

    // 2. 显示加载状态
    errorMsg.textContent = '正在注册...';
    errorMsg.className = 'mb-4 text-sm text-gray-500';
    errorMsg.classList.remove('hidden');

    // ✅ 3. 请求Worker注册接口
    fetch(WORKER_REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ username, password }), // 正确传递参数
        mode: 'cors' // 强制跨域模式
    }).then(async (res) => {
        const data = await res.json(); // 强制解析JSON
        if (data.success) {
            // 注册成功，自动登录
            isLoggedIn = true;
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('username', username);
            updateLoginButton();
            hideLoginModal();
            errorMsg.textContent = '注册成功！';
            errorMsg.className = 'mb-4 text-sm text-green-500';
            setTimeout(() => errorMsg.classList.add('hidden'), 2000);
        } else {
            // 注册失败
            errorMsg.textContent = data.message || '注册失败，请重试！';
            errorMsg.className = 'mb-4 text-sm text-red-500';
        }
    }).catch((err) => {
        // 捕获网络错误
        errorMsg.textContent = '网络异常，请重试！';
        errorMsg.className = 'mb-4 text-sm text-red-500';
        console.error('注册请求失败：', err);
    });
}

// 更新登录按钮状态
function updateLoginButton() {
    const btn = document.getElementById('login-btn');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-user"></i>';
        btn.title = isLoggedIn ? '用户信息' : '登录';
        // 根据登录状态设置不同颜色
        btn.className = 'text-xs flex items-center rounded transition-colors';
        if (isLoggedIn) {
            btn.classList.add('text-green-500', 'hover:text-green-600');
        } else {
            btn.classList.add('text-gray-500', 'hover:text-green-500');
        }
    }
}

// 显示用户菜单 & 退出登录
function showUserMenu() {
    let menu = document.getElementById('user-menu');
    if (menu) return menu.classList.toggle('hidden');
    menu = document.createElement('div');
    menu.id = 'user-menu';
    menu.className = 'absolute top-full -right-1 mt-2.5 w-auto min-w-[80px] bg-white rounded-md shadow-lg border border-gray-200 z-50';
    
    // 添加用户名显示
    const usernameDiv = document.createElement('div');
    usernameDiv.className = 'w-full text-left px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 border-b border-gray-100';
    usernameDiv.textContent = localStorage.getItem('username') || '用户';
    menu.appendChild(usernameDiv);
    
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'w-full text-left px-3 py-2 text-xs hover:bg-gray-100';
    logoutBtn.textContent = '退出登录';
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('username');
        updateLoginButton();
        menu.remove();
    });
    menu.appendChild(logoutBtn);
    document.getElementById('login-btn').parentElement.appendChild(menu);
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target.id !== 'login-btn') menu.remove();
    });
}

// 初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogin);
} else {
    initLogin();
}