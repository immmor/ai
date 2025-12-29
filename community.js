// 学习社区功能实现

// 社区数据结构
class CommunityPost {
    constructor(id, content, timestamp, user = "匿名用户") {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.user = user;
    }
}

// 初始化社区功能
function initCommunity() {
    const communityBtn = document.getElementById('community-panel-btn');
    if (communityBtn) {
        communityBtn.addEventListener('click', toggleCommunityPanel);
    }
}

// 创建社区面板
function createCommunityPanel() {
    // 检查面板是否已存在
    if (document.getElementById('community-panel')) {
        return document.getElementById('community-panel');
    }

    const panel = document.createElement('div');
    panel.id = 'community-panel';
    panel.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 hidden';
    
    // 面板内容
    panel.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <!-- 面板头部 -->
            <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-xl">
                <h2 class="text-lg font-bold text-orange-800">📚 学习社区</h2>
                <button id="close-community" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <!-- 发布区域 -->
            <div class="p-4 border-b border-gray-100 bg-white">
                <textarea id="post-content" placeholder="分享你的学习进度或感想..." class="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 text-sm"></textarea>
                <div class="flex justify-end mt-2">
                    <button id="publish-post" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm">
                        <i class="fas fa-paper-plane mr-1"></i> 发布
                    </button>
                </div>
            </div>
            
            <!-- 帖子列表 -->
            <div id="posts-list" class="flex-1 overflow-y-auto p-4 space-y-4">
                <!-- 帖子将动态添加到这里 -->
            </div>
        </div>
    `;

    document.body.appendChild(panel);

    // 绑定事件
    document.getElementById('close-community').addEventListener('click', toggleCommunityPanel);
    document.getElementById('publish-post').addEventListener('click', publishPost);

    return panel;
}

// 显示/隐藏社区面板
function toggleCommunityPanel() {
    const panel = createCommunityPanel();
    panel.classList.toggle('hidden');
    
    // 如果显示面板，加载帖子
    if (!panel.classList.contains('hidden')) {
        loadPosts();
    }
}

// 发布帖子
function publishPost() {
    // 检查是否登录
    if (!isLoggedIn) {
        alert('请先登录后再发布内容！');
        showLoginModal(); // 调用登录弹窗
        return;
    }

    const content = document.getElementById('post-content').value.trim();
    if (!content) {
        alert('请输入内容后再发布！');
        return;
    }

    // 获取登录用户名
    const username = localStorage.getItem('username') || '匿名用户';
    
    // 创建新帖子
    const timestamp = Date.now();
    const postId = `post-${timestamp}`;
    const newPost = new CommunityPost(postId, content, timestamp, username);

    // 保存到本地存储
    savePost(newPost);

    // 清空输入框
    document.getElementById('post-content').value = '';

    // 重新加载帖子
    loadPosts();
}

// 保存帖子到本地存储
function savePost(post) {
    const posts = getPostsFromStorage();
    posts.unshift(post); // 添加到开头
    localStorage.setItem('learningCommunityPosts', JSON.stringify(posts));
}

// 从本地存储获取帖子
function getPostsFromStorage() {
    const postsJson = localStorage.getItem('learningCommunityPosts');
    return postsJson ? JSON.parse(postsJson) : [];
}

// 加载帖子列表
function loadPosts() {
    const postsList = document.getElementById('posts-list');
    const posts = getPostsFromStorage();

    if (posts.length === 0) {
        postsList.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-comments text-4xl mb-2 text-gray-300"></i>
                <p>还没有帖子，快来发布第一条吧！</p>
            </div>
        `;
        return;
    }

    // 渲染帖子
    postsList.innerHTML = posts.map(post => `
        <div class="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center mb-2">
                <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                    <i class="fas fa-user text-orange-600"></i>
                </div>
                <div>
                    <div class="font-medium text-gray-800">${post.user}</div>
                    <div class="text-xs text-gray-500">${formatTime(post.timestamp)}</div>
                </div>
            </div>
            <div class="text-sm text-gray-700 whitespace-pre-wrap">${post.content}</div>
            <div class="flex justify-end mt-3">
                <button class="text-orange-500 hover:text-orange-600 text-xs flex items-center" onclick="deletePost('${post.id}')">
                    <i class="fas fa-trash-alt mr-1"></i> 删除
                </button>
            </div>
        </div>
    `).join('');
}

// 删除帖子
function deletePost(postId) {
    if (confirm('确定要删除这条帖子吗？')) {
        let posts = getPostsFromStorage();
        posts = posts.filter(post => post.id !== postId);
        localStorage.setItem('learningCommunityPosts', JSON.stringify(posts));
        loadPosts();
    }
}

// 格式化时间
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // 小于1分钟
    if (diff < 60 * 1000) {
        return '刚刚';
    }
    // 小于1小时
    if (diff < 60 * 60 * 1000) {
        return `${Math.floor(diff / (60 * 1000))}分钟前`;
    }
    // 小于1天
    if (diff < 24 * 60 * 60 * 1000) {
        return `${Math.floor(diff / (60 * 60 * 1000))}小时前`;
    }
    // 小于1周
    if (diff < 7 * 24 * 60 * 60 * 1000) {
        return `${Math.floor(diff / (24 * 60 * 60 * 1000))}天前`;
    }
    // 其他情况显示完整日期
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initCommunity);

// 确保能访问登录相关函数和变量
// 如果isLoggedIn未定义，尝试从localStorage获取
if (typeof isLoggedIn === 'undefined') {
    window.isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
}

// 如果showLoginModal未定义，创建一个简单的提示
if (typeof showLoginModal === 'undefined') {
    window.showLoginModal = function() {
        // 尝试显示登录弹窗或提示
        const loginModal = document.getElementById('login-modal-overlay');
        if (loginModal) {
            loginModal.classList.remove('hidden');
        } else {
            alert('请先登录后再发布内容！');
        }
    };
}

// 暴露必要的函数到全局
window.initCommunity = initCommunity;
window.toggleCommunityPanel = toggleCommunityPanel;
window.publishPost = publishPost;
window.deletePost = deletePost;