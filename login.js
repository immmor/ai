// 登录状态管理
let isLoggedIn = false;

// 创建登录按钮
function createLoginButton() {
    // 找到题库按钮
    const questionBankBtn = document.getElementById('question-bank-btn');
    if (!questionBankBtn) return;
    
    // 找到父容器
    const parentDiv = questionBankBtn.parentElement;
    
    // 创建一个新的flex容器来包裹两个按钮，增加间距
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'flex items-center gap-2'; // 增加gap到2
    
    // 将题库按钮移动到新容器中
    parentDiv.insertBefore(buttonsContainer, questionBankBtn);
    buttonsContainer.appendChild(questionBankBtn);
    
    // 移除题库按钮的负margin
    questionBankBtn.style.marginLeft = '0';
    questionBankBtn.style.marginRight = '0';
    
    // 创建登录按钮
    const loginBtn = document.createElement('button');
    loginBtn.id = 'login-btn';
    // 移除登录按钮的负margin，使用正常的padding
    loginBtn.className = 'text-xs text-gray-500 hover:text-blue-500 flex items-center px-2 py-1 rounded border border-gray-200 hover:border-blue-300 transition-colors';
    loginBtn.title = '登录';
    loginBtn.innerHTML = '<span>登</span>';
    
    // 将登录按钮添加到新容器中
    buttonsContainer.appendChild(loginBtn);
    
    // 确保下拉菜单仍然在父容器中，并且在正确的位置
    const questionBankMenu = document.getElementById('question-bank-menu');
    if (questionBankMenu) {
        parentDiv.appendChild(questionBankMenu);
    }
}

// 创建登录模态框
function createLoginModal() {
    // 创建模态框遮罩层
    const overlay = document.createElement('div');
    overlay.id = 'login-modal-overlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    
    // 创建模态框容器
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.className = 'bg-white rounded-lg shadow-xl p-6 w-full max-w-sm';
    
    // 创建模态框内容
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
            <div class="flex items-center justify-between">
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
                    登录
                </button>
            </div>
        </form>
    `;
    
    // 将模态框添加到遮罩层
    overlay.appendChild(modal);
    
    // 将遮罩层添加到文档中
    document.body.appendChild(overlay);
}

// 初始化登录功能
function initLogin() {
    // 创建登录按钮和模态框
    createLoginButton();
    createLoginModal();
    
    // 检查本地存储中的登录状态
    const storedLogin = localStorage.getItem('userLoggedIn');
    if (storedLogin === 'true') {
        isLoggedIn = true;
        updateLoginButton();
    }
    
    // 为登录按钮添加点击事件
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止事件冒泡
            console.log('Login button clicked, isLoggedIn:', isLoggedIn);
            if (isLoggedIn) {
                // 已登录时点击可以显示用户信息或退出登录
                showUserMenu();
            } else {
                // 未登录时点击显示登录模态框
                showLoginModal();
            }
        });
    }
    
    // 为登录表单添加提交事件
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // 为关闭按钮添加点击事件
    const closeBtn = document.getElementById('login-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideLoginModal);
    }
    
    // 点击模态框外部关闭模态框
    const modalOverlay = document.getElementById('login-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                hideLoginModal();
            }
        });
    }
}

// 显示登录模态框
function showLoginModal() {
    const modal = document.getElementById('login-modal-overlay');
    if (modal) {
        modal.classList.remove('hidden');
        // 聚焦到用户名输入框
        const usernameInput = document.getElementById('login-username');
        if (usernameInput) {
            usernameInput.focus();
        }
    }
}

// 隐藏登录模态框
function hideLoginModal() {
    const modal = document.getElementById('login-modal-overlay');
    if (modal) {
        modal.classList.add('hidden');
        // 重置表单
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.reset();
        }
        // 清除错误信息
        const errorMsg = document.getElementById('login-error');
        if (errorMsg) {
            errorMsg.textContent = '';
            errorMsg.classList.add('hidden');
        }
    }
}

// 处理登录逻辑
function handleLogin() {
    // 获取输入值
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('login-error');
    
    // 简单的模拟登录验证
    // 实际项目中应该调用后端API进行验证
    if (username && password) {
        // 模拟登录成功
        isLoggedIn = true;
        // 保存登录状态到本地存储
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('username', username);
        // 更新登录按钮
        updateLoginButton();
        // 关闭模态框
        hideLoginModal();
        // 显示登录成功提示
        if (errorMsg) {
            errorMsg.textContent = '登录成功！';
            errorMsg.classList.remove('hidden');
            errorMsg.classList.remove('text-red-500');
            errorMsg.classList.add('text-green-500');
            // 3秒后隐藏成功提示
            setTimeout(() => {
                errorMsg.classList.add('hidden');
            }, 3000);
        }
    } else {
        // 显示错误信息
        if (errorMsg) {
            errorMsg.textContent = '用户名和密码不能为空！';
            errorMsg.classList.remove('hidden');
            errorMsg.classList.remove('text-green-500');
            errorMsg.classList.add('text-red-500');
        }
    }
}

// 更新登录按钮显示
function updateLoginButton() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        if (isLoggedIn) {
            loginBtn.innerHTML = '<span>我</span>';
            loginBtn.title = '用户信息';
        } else {
            loginBtn.innerHTML = '<span>登</span>';
            loginBtn.title = '登录';
        }
    }
}

// 显示用户菜单
function showUserMenu() {
    console.log('showUserMenu function called');
    
    // 检查是否已存在用户菜单
    let userMenu = document.getElementById('user-menu');
    
    // 如果菜单已存在，则切换显示状态
    if (userMenu) {
        userMenu.classList.toggle('hidden');
        return;
    }
    
    // 创建用户菜单
    userMenu = document.createElement('div');
    userMenu.id = 'user-menu';
    userMenu.className = 'absolute top-full -right-1 mt-2 w-auto min-w-[80px] bg-white rounded-md shadow-lg border border-gray-200 z-50';
    
    // 创建退出登录选项
    const logoutOption = document.createElement('button');
    logoutOption.className = 'w-full text-left px-3 py-2 text-xs hover:bg-gray-100';
    logoutOption.textContent = '退出登录';
    
    // 为退出登录选项添加点击事件
    logoutOption.addEventListener('click', () => {
        console.log('Logout clicked');
        logout();
        // 隐藏用户菜单
        userMenu.remove();
    });
    
    // 将退出登录选项添加到菜单中
    userMenu.appendChild(logoutOption);
    
    // 将菜单添加到登录按钮的父容器中
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.parentElement.appendChild(userMenu);
    }
    
    // 点击页面其他地方关闭菜单
    const handleClickOutside = (e) => {
        if (e.target !== loginBtn && !userMenu.contains(e.target)) {
            userMenu.remove();
            document.removeEventListener('click', handleClickOutside);
        }
    };
    document.addEventListener('click', handleClickOutside);
}

// 退出登录
function logout() {
    isLoggedIn = false;
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('username');
    updateLoginButton();
}

// 确保DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogin);
} else {
    initLogin();
}