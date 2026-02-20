// 能量系统功能实现

// 视频缓存相关常量
const VIDEO_CACHE_DB_NAME = 'VideoCacheDB';
const VIDEO_CACHE_STORE_NAME = 'videos';
const VIDEO_CACHE_DB_VERSION = 1;
let videoCacheDB = null;

// 能量初始值
let energy = 20;
const MAX_ENERGY = 20; // 最大能量值
const ENERGY_RECOVERY_INTERVAL = 7200000; // 能量恢复间隔（毫秒）- 1分钟

// 会员相关常量
const VIP_MONTHLY_PRICE = 10; // 会员月费10元
let isVip = false; // 当前是否为会员
let vipExpiryTime = 0; // 会员过期时间

// 获取能量元素
let energyDisplay = null;
let energyIcon = null;

// 从localStorage加载能量
function loadEnergy() {
    const savedEnergy = localStorage.getItem('goBlockchainEnergy');
    if (savedEnergy) {
        energy = parseInt(savedEnergy);
    }
    
    // 确保能量在有效范围内
    energy = Math.max(0, Math.min(energy, MAX_ENERGY));
}

// 同步加载会员状态（立即设置默认值）
function loadVipStatusSync() {
    console.log('同步加载VIP状态...');
    
    // 检查登录状态
    const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
    console.log('用户登录状态:', loggedIn);
    
    if (loggedIn) {
        const username = localStorage.getItem('username');
        console.log('用户名:', username);
        
        if (username) {
            // 暂时设置为非VIP状态，等待异步更新
            isVip = false;
            vipExpiryTime = 0;
            console.log('等待异步更新VIP状态');
            return;
        }
    }
    
    // 默认设置为非VIP状态
    isVip = false;
    vipExpiryTime = 0;
    console.log('设置为非VIP状态');
}

// 异步更新VIP状态
async function updateVipStatusAsync() {
    console.log('开始异步更新VIP状态...');
    
    // 检查登录状态
    const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
    console.log('用户登录状态:', loggedIn);
    
    if (loggedIn) {
        const username = localStorage.getItem('username');
        console.log('用户名:', username);
        
        if (username) {
            try {
                const response = await fetch(`https://api.immmor.com/api/learn/vip/status?username=${encodeURIComponent(username)}`);
                const result = await response.json();
                console.log('VIP状态API返回:', result);
                
                if (result.code === 200 && result.data) {
                    // 更新VIP状态
                    isVip = result.data.is_vip;
                    
                    // 如果有VIP过期时间，转换为时间戳
                    if (result.data.vip_expire_date) {
                        const expireDate = new Date(result.data.vip_expire_date.replace(' ', 'T'));
                        vipExpiryTime = expireDate.getTime();
                        console.log('VIP过期时间:', result.data.vip_expire_date, '转换为时间戳:', vipExpiryTime);
                    }
                    
                    // 更新UI显示
                    updateEnergyDisplay();
                    updateVipStatusDisplay();
                    
                    console.log('VIP状态异步更新完成:', isVip);
                    return;
                }
            } catch (error) {
                console.error('获取VIP状态失败:', error);
            }
        }
    }
    
    // 默认设置为非VIP状态
    isVip = false;
    vipExpiryTime = 0;
    console.log('异步更新设置为非VIP状态');
}

// 保存会员状态函数已废弃，VIP状态完全由后端管理

// 激活会员
function activateVip(vipData) {
    // 使用后端返回的VIP数据
    isVip = true;
    const expireDate = new Date(vipData.vip_expire_date.replace(' ', 'T'));
    vipExpiryTime = expireDate.getTime();
    console.log('会员已激活，到期时间：', vipData.vip_expire_date, '剩余天数：', vipData.remaining_days);
    
    // 立即更新UI显示
    updateEnergyDisplay();
    updateVipStatusDisplay();
    
    showFeedback('会员购买成功！已获得无限能量', 'success');
}

// 保存能量到localStorage
function saveEnergy() {
    localStorage.setItem('goBlockchainEnergy', energy.toString());
}

// 设置能量系统事件监听器
function setupEnergyEventListeners() {
    // 获取DOM元素引用
    const energyDisplay = document.getElementById('energy-display');
    const energyTooltip = document.getElementById('energy-tooltip');
    const codeInput = document.getElementById('energy-code-input');
    const codeSubmit = document.getElementById('energy-code-submit');
    const buyVipBtn = document.getElementById('buy-vip-btn');
    // const messageEl = document.getElementById('energy-code-message');
    
    if (!energyDisplay || !energyTooltip) {
        console.error('能量显示元素未找到');
        return;
    }
    
    // 点击显示/隐藏提示框
    energyDisplay.addEventListener('click', function(e) {
        e.stopPropagation(); // 防止事件冒泡
        // 切换提示框显示状态
        energyTooltip.classList.toggle('hidden');
        // 更新会员状态显示
        updateVipStatusDisplay();
    });
    
    // 点击页面其他地方关闭提示框
    document.addEventListener('click', function() {
        energyTooltip.classList.add('hidden');
    });
    
    // 为充能码输入区域添加点击事件，防止关闭提示框
    if (codeInput) {
        const codeInputArea = codeInput.parentElement;
        codeInputArea.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // 允许通过回车键提交充能码
        codeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                codeSubmit.click();
            }
        });
    }
    
    // 为充能码提交按钮添加事件监听器
    if (codeSubmit) {
        codeSubmit.addEventListener('click', function() {
            const code = codeInput.value.trim().toLowerCase();
            
            if (code === 'energy') {
                window.energy = energy = Math.min(energy + 10, MAX_ENERGY);
                
                // 更新UI显示
                if (document.getElementById('energy-count')) {
                    document.getElementById('energy-count').textContent = energy;
                }
                
                // 更新主界面进度条
                const energyProgressBar = document.getElementById('energy-progress-bar');
                if (energyProgressBar) {
                    energyProgressBar.style.width = (energy / MAX_ENERGY) * 100 + '%';
                }
                
                // 更新提示框中的进度条
                const tooltipProgressBar = energyTooltip.querySelector('.h-full.bg-gradient-to-r.from-yellow-400.to-yellow-600.rounded-full');
                if (tooltipProgressBar) {
                    tooltipProgressBar.style.width = (energy / MAX_ENERGY) * 100 + '%';
                }
                
                saveEnergy();
                showFeedback('充能成功！获得10点能量', 'success');
            } else {
                showFeedback('无效的充能码', 'error');
            }
            codeInput.value = '';
        });
    }
    
    // 为看广告按钮添加事件监听器
    const watchAdBtn = document.getElementById('watch-ad-btn');
    if (watchAdBtn) {
        watchAdBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止关闭提示框
            watchAdForEnergy();
        });
    }
    
    // 为购买会员按钮添加事件监听器
    if (buyVipBtn) {
        buyVipBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止关闭提示框
            buyVip();
        });
    }
    
    // 为余额购买按钮添加事件监听器
    const balanceVipBtn = document.getElementById('balance-vip-btn');
    if (balanceVipBtn) {
        balanceVipBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止关闭提示框
            showVipConfirmPopup();
        });
    }
    
    // 为支付宝购买按钮添加事件监听器（保留作为备选）
    const alipayBtn = document.getElementById('alipay-btn');
    if (alipayBtn) {
        alipayBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止关闭提示框
            showPaymentPopup('alipay');
        });
    }
    
    // 为微信购买按钮添加事件监听器（保留作为备选）
    const wechatBtn = document.getElementById('wechat-btn');
    if (wechatBtn) {
        wechatBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止关闭提示框
            showPaymentPopup('weixin');
        });
    }
}

// 更新会员状态显示
function updateVipStatusDisplay() {
    const vipStatusEl = document.getElementById('vip-status');
    if (!vipStatusEl) return;
    
    if (isVip) {
        const remainingTime = vipExpiryTime - Date.now();
        const daysRemaining = Math.ceil(remainingTime / (24 * 60 * 60 * 1000));
        vipStatusEl.textContent = `会员剩余 ${daysRemaining} 天`;
        vipStatusEl.className = 'text-xs text-center mt-1 text-green-500';
    } else {
        vipStatusEl.textContent = '非会员状态';
        vipStatusEl.className = 'text-xs text-center mt-1 text-gray-500';
    }
}

// 购买会员 - 原有TRON支付（保留作为备选）
function buyVip() {
    // 调用支付函数，第一个参数是TRON钱包地址
    pay('TKxnwudYzov8ztHchjE6VZCCGAuDft8jQV', VIP_MONTHLY_PRICE, 'usdt');
}

// 显示购买确认弹窗
function showVipConfirmPopup() {
    // 检查用户是否已登录
    if (typeof isLoggedIn === 'undefined' || !isLoggedIn) {
        showFeedback('请先登录后再购买会员', 'error');
        return;
    }
    
    // 创建确认弹窗
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const popup = document.createElement('div');
    popup.className = 'bg-white rounded-lg p-6 w-80';
    popup.innerHTML = `
        <h3 class="text-lg font-bold mb-4">确认购买会员</h3>
        <p class="text-gray-600 mb-4">是否确认花费10元购买30天会员？</p>
        <div class="flex space-x-2">
            <button id="confirm-vip-btn" class="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">确认购买</button>
            <button id="cancel-vip-btn" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">取消</button>
        </div>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // 确认按钮点击事件
    document.getElementById('confirm-vip-btn').onclick = () => {
        document.body.removeChild(overlay);
        buyVipWithBalance();
    };
    
    // 取消按钮点击事件
    document.getElementById('cancel-vip-btn').onclick = () => {
        document.body.removeChild(overlay);
    };
}

// 从用户余额购买会员
async function buyVipWithBalance() {
    try {
        const username = localStorage.getItem('username');
        if (!username) {
            showFeedback('用户信息获取失败', 'error');
            return;
        }
        
        const response = await fetch('https://immmor.com/api/learn/vip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                amount: VIP_MONTHLY_PRICE,
                duration: 30
            })
        });
        
        const result = await response.json();
        
        if (result.code === 200) {
            // 购买成功，激活会员
            activateVip(result.data);
            
            // 更新本地缓存的余额
            if (typeof updateCachedBalance === 'function') {
                updateCachedBalance(parseFloat(result.data.balance));
            }
            
            showFeedback(`会员购买成功！VIP有效期至${result.data.vip_expire_date}，剩余${result.data.remaining_days}天`, 'success');
        } else {
            throw new Error(result.msg || '购买失败');
        }
        
    } catch (error) {
        console.error('购买失败:', error);
        showFeedback('购买失败: ' + error.message, 'error');
    }
}

// 生成随机订单号（保留用于TRON支付）
function generateOrderNumber() {
    const randomNum = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    return `immmor-${randomNum}`;
}



// 复制订单号（保留用于TRON支付）
function copyOrderNumber(orderNumber) {
    navigator.clipboard.writeText(orderNumber).then(() => {
        showFeedback('订单号已复制到剪贴板', 'success');
    }).catch(err => {
        console.error('复制失败:', err);
        showFeedback('复制失败，请手动复制', 'error');
    });
}




// 创建能量显示元素
function createEnergyDisplay() {
    // 查找勋章容器的父元素
    const badgeSection = document.querySelector('.flex.items-center.space-x-1');
    if (!badgeSection) {
        console.error('未找到勋章区域');
        return;
    }
    
    // 创建能量显示容器
    const energyContainer = document.createElement('div');
    energyContainer.className = 'relative -ml-1';
    energyContainer.innerHTML = `
        <div id="energy-display" class="relative cursor-pointer w-10 px-2 py-0.5 rounded-md overflow-hidden" title="点击查看能量详情">
            <div class="absolute inset-0 bg-gray-200"></div>
            <div id="energy-progress-bar" class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500" style="width: ${(energy / MAX_ENERGY) * 100}%"></div>
            <div class="relative flex items-center justify-center z-10">
                <i id="energy-icon" class="fas fa-sun text-white text-xs mr-0.5"></i>
                <span id="energy-count" class="text-white font-medium text-xs">${energy}</span>
            </div>
        </div>
        <div id="energy-tooltip" class="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-2 py-2 bg-white rounded-lg shadow-lg hidden z-10 border border-gray-100">
            <!-- 充能码输入区域 -->
            <div class="flex items-center space-x-2">
                <input type="text" placeholder="输入充能码" id="energy-code-input" class="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-24">
                <button id="energy-code-submit" class="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors whitespace-nowrap">
                    充能
                </button>
            </div>
            <!-- 看广告获取能量 -->
            <div class="mt-2">
                <button id="watch-ad-btn" class="w-full px-3 py-1.5 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors whitespace-nowrap flex items-center justify-center">
                    <i class="fas fa-play-circle mr-1"></i>看广告得5点能量
                </button>
            </div>
            <div class="mt-1 flex space-x-2">
                <button id="balance-vip-btn" class="flex-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors whitespace-nowrap flex items-center justify-center">
                    <i class="fas fa-wallet mr-1"></i>VIP购买
                </button>
            </div>
            <div id="vip-status" class="text-xs text-center mt-1 text-gray-500"></div>
        </div>
    `;
    
    // 将能量显示添加到勋章显示的左边
    badgeSection.insertBefore(energyContainer, badgeSection.firstChild);
    
    // 获取能量显示元素引用
    energyDisplay = document.getElementById('energy-display');
    energyIcon = document.getElementById('energy-icon');
    
    setupEnergyEventListeners();
    updateVipStatusDisplay();
}

// 更新能量显示
function updateEnergyDisplay() {
    if (energyDisplay) {
        const energyCount = energyDisplay.querySelector('#energy-count');
        const energyProgressBar = energyDisplay.querySelector('#energy-progress-bar');
        
        // 添加能量变化动画
        if (energyIcon) {
            energyIcon.classList.add('animate-pulse');
        }
        if (energyCount) {
            energyCount.classList.add('animate-bounce-in');
            // 更新能量值
            if (isVip) {
                energyCount.textContent = 'VIP';
            } else {
                energyCount.textContent = energy;
            }
        }
        
        // 更新进度条宽度
        if (energyProgressBar) {
            const percentage = isVip ? 100 : (energy / MAX_ENERGY) * 100;
            energyProgressBar.style.width = `${percentage}%`;
        }
        
        // 更新悬停提示信息
        const tooltip = energyDisplay.nextElementSibling;
        if (tooltip) {
            // 更新标题
            const titleElement = tooltip.querySelector('.font-medium');
            
            // 更新提示框中的进度条
            const progressBar = tooltip.querySelector('.h-full.bg-gradient-to-r.from-amber-400.to-red-500.rounded-full');
            if (progressBar) {
                const percentage = isVip ? 100 : (energy/MAX_ENERGY) * 100;
                progressBar.style.width = `${percentage}%`;
            }
        }
        
        // 恢复正常样式
        setTimeout(() => {
            if (energyIcon) {
                energyIcon.classList.remove('animate-pulse');
            }
            if (energyCount) {
                energyCount.classList.remove('animate-bounce-in');
            }
        }, 1000);
    }
    
    // 保存能量值
    saveEnergy();
    
    // 同时更新全局变量
    window.energy = energy;
}

// 设置能量自动恢复
function setupEnergyRecovery() {
    setInterval(() => {
        if (energy < MAX_ENERGY) {
            energy += 1;
            updateEnergyDisplay();
            console.log('能量自动恢复，当前能量：', energy);
        }
    }, ENERGY_RECOVERY_INTERVAL);
}

// 消耗能量
function consumeEnergy() {
    // 如果是会员，不消耗能量
    if (isVip) {
        console.log('会员用户，不消耗能量');
        return true;
    }
    
    if (energy > 0) {
        energy -= 1;
        updateEnergyDisplay();
        console.log('消耗1点能量，剩余能量：', energy);
        return true;
    }
    console.log('能量不足！');
    return false;
}

// 随机获得能量（答题正确时）
function gainRandomEnergy() {
    // 30%概率获得额外能量
    const hasBonus = Math.random() < 0.3;
    if (hasBonus) {
        // 随机获得1-3点能量
        const bonusEnergy = Math.floor(Math.random() * 3) + 1;
        energy = Math.min(energy + bonusEnergy, MAX_ENERGY);
        
        // 显示获得能量的动画效果
        showEnergyGainEffect(bonusEnergy);
        
        updateEnergyDisplay();
        console.log(`获得额外${bonusEnergy}点能量，当前能量：`, energy);
        return bonusEnergy;
    }
    return 0;
}

// 显示获得能量的动画效果
function showEnergyGainEffect(amount) {
    if (!energyDisplay) return;
    
    // 创建能量增加提示
    const gainEffect = document.createElement('div');
    gainEffect.className = 'absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce-in';
    gainEffect.textContent = `+${amount}能量`;
    
    // 添加到页面
    document.body.appendChild(gainEffect);
    
    // 定位到能量图标上方
    const rect = energyDisplay.getBoundingClientRect();
    gainEffect.style.left = `${rect.left + rect.width / 2}px`;
    gainEffect.style.top = `${rect.top - 30}px`;
    gainEffect.style.position = 'fixed';
    
    // 动画结束后移除
    setTimeout(() => {
        gainEffect.style.transition = 'all 0.5s ease-out';
        gainEffect.style.opacity = '0';
        gainEffect.style.transform = 'translate(-50%, -20px)';
        
        setTimeout(() => {
            if (document.body.contains(gainEffect)) {
                document.body.removeChild(gainEffect);
            }
        }, 500);
    }, 1500);
}

// 获取当前能量值
function getCurrentEnergy() {
    return energy;
}

// 检查能量是否充足
function hasEnoughEnergy() {
    // 如果是会员，能量无限
    if (isVip) {
        return true;
    }
    return energy > 0;
}

// 广告视频URL数组，包含多个广告视频
const adVideos = [
    'static/ads/1218.mp4',
    'static/ads/jianying.mp4',
    'static/ads/sp.mp4'
];

// 看广告获取能量
function watchAdForEnergy() {
    // 创建广告视频播放器
    createAdVideoPlayer();
}

// 创建广告视频播放器
function createAdVideoPlayer() {
    // 随机选择一个视频URL
    const randomVideoUrl = adVideos[Math.floor(Math.random() * adVideos.length)];
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center';
    overlay.style.backdropFilter = 'blur(2px)';
    
    // 创建播放器容器
    const playerContainer = document.createElement('div');
    playerContainer.className = 'bg-gray-900 rounded-lg overflow-hidden shadow-2xl w-full h-full';
    playerContainer.style.maxHeight = '100vh';
    
    // 创建视频元素
    const video = document.createElement('video');
    video.className = 'w-full h-full object-contain';
    video.controls = true;
    video.autoplay = true;
    video.muted = false;
    
    // 禁用默认控制栏的进度条交互
    video.controlsList = 'nodownload noplaybackrate';
    
    // 创建播放器控制栏
    const controlBar = document.createElement('div');
    controlBar.className = 'flex items-center justify-between p-3 absolute top-0 left-0 right-0';
    
    // 播放状态显示
    const statusText = document.createElement('div');
    statusText.className = 'text-white text-sm font-medium';
    statusText.textContent = '广告播放中...';
    
    // 关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors';
    closeBtn.textContent = '关闭';
    
    // 将元素组合起来
    controlBar.appendChild(statusText);
    controlBar.appendChild(closeBtn);
    
    playerContainer.appendChild(video);
    playerContainer.appendChild(controlBar);
    
    overlay.appendChild(playerContainer);
    
    // 添加到页面
    document.body.appendChild(overlay);
    
    // 禁止页面滚动
    document.body.style.overflow = 'hidden';
    
    // 标记广告是否可跳过或已完成
    let isAdSkippable = false;
    let isAdCompleted = false;
    
    // 记录当前播放位置，防止快进
    let lastCurrentTime = 0;
    
    // 剩余可跳过时间
    let skipCountdown = 60;
    
    // 创建倒计时显示
    const countdownText = document.createElement('span');
    countdownText.className = 'ml-2 text-yellow-400';
    
    // 更新倒计时的定时器
    let countdownTimer;
    
    // 启动倒计时的函数
    function startCountdown() {
        if (!countdownTimer && skipCountdown > 0) {
            countdownTimer = setInterval(() => {
                skipCountdown--;
                if (skipCountdown <= 0) {
                    clearInterval(countdownTimer);
                    countdownTimer = null;
                    countdownText.textContent = '';
                    isAdSkippable = true;
                    
                    // 更新状态和按钮
                    statusText.textContent = '广告播放中...';
                    closeBtn.textContent = '跳过广告';
                    closeBtn.className = 'px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors';
                } else {
                    countdownText.textContent = `(${skipCountdown}秒后可跳过)`;
                }
            }, 1000);
        }
    }
    
    // 设置视频事件监听器
    function setupVideoEventListeners() {
        // 监听视频元数据加载完成事件，获取视频时长
        video.addEventListener('loadedmetadata', () => {
            // 检查视频时长是否大于等于60秒
            if (video.duration >= 60) {
                // 视频足够长，显示倒计时
                countdownText.textContent = `(${skipCountdown}秒后可跳过)`;
                statusText.appendChild(countdownText);
                
                // 启动倒计时（只有在视频播放时才开始）
                if (!video.paused) {
                    startCountdown();
                }
            } else {
                // 视频不足60秒，必须完整观看
                isAdSkippable = false;
                closeBtn.textContent = '关闭';
                closeBtn.className = 'px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors';
            }
        });
        
        // 处理视频加载失败的情况
        video.addEventListener('error', () => {
            // 视频加载失败时，仍然需要用户观看足够时间
            countdownText.textContent = `(${skipCountdown}秒后可跳过)`;
            statusText.appendChild(countdownText);
            
            // 启动倒计时
            startCountdown();
        });
        
        // 监听视频暂停事件，暂停倒计时
        video.addEventListener('pause', () => {
            if (countdownTimer) {
                clearInterval(countdownTimer);
                countdownTimer = null;
            }
        });
        
        // 监听视频播放事件，恢复倒计时
        video.addEventListener('play', () => {
            // 只有当视频时长足够且倒计时未结束时才恢复
            if (video.duration >= 60 && skipCountdown > 0) {
                startCountdown();
            }
        });
    }
    
    // 初始化视频缓存功能
    initVideoCache().then(() => {
        // 检查本地是否有缓存的视频
        getCachedVideo(randomVideoUrl).then(cachedUrl => {
            // 确保在设置视频src之前已经添加了事件监听器
            setupVideoEventListeners();
            
            if (cachedUrl) {
                // 使用缓存的视频
                video.src = cachedUrl;
            } else {
                // 从服务器获取视频
                video.src = randomVideoUrl;
                
                // 缓存视频
                cacheVideo(randomVideoUrl);
            }
            
            // 强制加载视频（解决某些浏览器中事件不触发的问题）
            video.load();
        }).catch(error => {
            console.error('视频缓存操作失败:', error);
            // 确保在设置视频src之前已经添加了事件监听器
            setupVideoEventListeners();
            video.src = randomVideoUrl;
            video.load();
        });
    }).catch(error => {
        console.error('视频缓存初始化失败:', error);
        // 确保在设置视频src之前已经添加了事件监听器
        setupVideoEventListeners();
        video.src = randomVideoUrl;
        video.load();
    });
    
    // 监听视频播放完成事件
    video.addEventListener('ended', () => {
        // 只在定时器存在时清理
        if (countdownTimer) {
            clearInterval(countdownTimer);
        }
        isAdCompleted = true;
        isAdSkippable = true;
        countdownText.textContent = '';
        statusText.textContent = '广告播放完成！';
        
        // 更新按钮
        closeBtn.textContent = '领取能量';
        closeBtn.className = 'px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition-colors';
        
        // 自动给予能量
        setTimeout(() => {
            grantEnergyAfterAd();
            closeAdPlayer(overlay);
        }, 1000);
    });
    
    // 监听视频时间更新，判断是否接近完成并防止快进
    video.addEventListener('timeupdate', () => {
        // 检测用户是否快进
        if (video.currentTime - lastCurrentTime > 1) {
            // 用户快进了，将播放位置重置到上次记录的位置
            video.currentTime = lastCurrentTime;
            showFeedback('广告不允许快进', 'warning');
        }
        
        // 更新上次播放位置
        lastCurrentTime = video.currentTime;
        
        if (video.duration - video.currentTime < 1) {
            statusText.textContent = '广告即将完成...';
            if (countdownText.parentNode) {
                statusText.appendChild(countdownText);
            }
        }
    });
    
    // 监听seeked事件，防止用户拖拽进度条
    video.addEventListener('seeked', () => {
        // 如果不是自然播放到当前位置，重置到之前的位置
        if (Math.abs(video.currentTime - lastCurrentTime) > 0.1 && !isAdCompleted) {
            video.currentTime = lastCurrentTime;
            showFeedback('广告不允许快进或跳转', 'warning');
        }
    });
    
    // 关闭按钮点击事件
    closeBtn.addEventListener('click', () => {
        // 只在定时器存在时清理
        if (countdownTimer) {
            clearInterval(countdownTimer);
        }
        
        if (isAdCompleted) {
            // 广告播放完成，给予能量
            grantEnergyAfterAd();
        } else if (isAdSkippable) {
            // 已过可跳过时间，允许跳过并给予能量
            grantEnergyAfterAd();
        } else {
            // 还未到可跳过时间或视频未播放完成，提前退出
            showFeedback('您已提前退出广告，无法获得能量', 'warning');
        }
        
        closeAdPlayer(overlay);
    });
}

// 关闭广告播放器
function closeAdPlayer(overlay) {
    // 恢复页面滚动
    document.body.style.overflow = '';
    
    // 释放Blob URL，避免内存泄漏
    const video = overlay.querySelector('video');
    if (video && video.src.startsWith('blob:')) {
        URL.revokeObjectURL(video.src);
    }
    
    // 移除播放器
    if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
    }
}

// 广告播放完成后给予能量
function grantEnergyAfterAd() {
    // 增加5点能量
    window.energy = energy = Math.min(energy + 5, MAX_ENERGY);
    
    // 更新UI显示
    if (document.getElementById('energy-count')) {
        document.getElementById('energy-count').textContent = energy;
    }
    
    // 更新主界面进度条
    const energyProgressBar = document.getElementById('energy-progress-bar');
    if (energyProgressBar) {
        energyProgressBar.style.width = (energy / MAX_ENERGY) * 100 + '%';
    }
    
    saveEnergy();
    showFeedback('广告播放完成！获得5点能量', 'success');
    
    // 显示能量获得效果
    showEnergyGainEffect(5);
    
    // 播放能量获取音效
    playEnergyGainSound();
}

// 显示能量获得效果
function showEnergyGainEffect(amount) {
    // 创建能量获得效果元素
    const effect = document.createElement('div');
    effect.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-yellow-500 z-50';
    effect.textContent = `+${amount} 能量`;
    effect.style.pointerEvents = 'none';
    effect.style.textShadow = '0 0 10px rgba(251, 191, 36, 0.7)';
    
    // 添加到页面
    document.body.appendChild(effect);
    
    // 动画效果
    effect.animate([
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        { opacity: 1, transform: 'translate(-50%, -70%) scale(1.2)' },
        { opacity: 0, transform: 'translate(-50%, -100%) scale(1)' }
    ], {
        duration: 1500,
        easing: 'ease-out'
    }).onfinish = () => {
        // 动画结束后移除元素
        document.body.removeChild(effect);
    };
}

// 播放能量获取音效
function playEnergyGainSound() {
    // 这里可以添加实际的音效播放逻辑
    // 例如使用HTML5 Audio API播放音效
    try {
        // 创建音频元素
        const audio = new Audio('/ai/audio/energy-gain.mp3'); // 假设音效文件路径
        audio.volume = 0.5; // 设置音量
        audio.play().catch(error => {
            console.log('无法自动播放音效，需要用户交互后才能播放');
        });
    } catch (error) {
        console.error('播放音效失败:', error);
    }
}

// 太阳掉落动画系统
let fallingSuns = [];
let lastSunDropTime = 0;
const MIN_SUN_INTERVAL = 30000; // 最小太阳掉落间隔（毫秒）
const MAX_SUN_INTERVAL = 45000; // 最大太阳掉落间隔（毫秒）
const SUN_FALL_SPEED = 2; // 太阳掉落速度
const SUN_SWING_AMPLITUDE = 30; // 太阳左右摆动幅度
const SUN_SIZE = 30; // 太阳大小

// 初始化太阳掉落系统
function initSunDropSystem() {
    // 在能量系统初始化后启动太阳掉落
    lastSunDropTime = Date.now();
    requestAnimationFrame(updateSunDropSystem);
}

// 更新太阳掉落系统
function updateSunDropSystem() {
    const currentTime = Date.now();
    
    // 检查是否需要生成新的太阳
    const timeSinceLastDrop = currentTime - lastSunDropTime;
    const nextDropInterval = Math.random() * (MAX_SUN_INTERVAL - MIN_SUN_INTERVAL) + MIN_SUN_INTERVAL;
    
    if (timeSinceLastDrop > nextDropInterval && fallingSuns.length < 3) { // 限制同时最多3个太阳
        createFallingSun();
        lastSunDropTime = currentTime;
    }
    
    // 更新所有掉落中的太阳
    updateFallingSuns();
    
    // 继续下一帧
    requestAnimationFrame(updateSunDropSystem);
}

// 创建掉落的太阳
function createFallingSun() {
    const sun = document.createElement('div');
    const startX = Math.random() * (window.innerWidth - SUN_SIZE);
    const startY = -SUN_SIZE;
    const swingPhase = Math.random() * Math.PI * 2; // 随机相位
    
    sun.className = 'fixed z-50 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:brightness-110';
    sun.style.left = `${startX}px`;
    sun.style.top = `${startY}px`;
    sun.innerHTML = `<i class="fas fa-sun text-yellow-400 text-${Math.floor(SUN_SIZE/8)}xl animate-pulse"></i>`;
    
    // 添加到页面
    document.body.appendChild(sun);
    
    // 存储太阳信息
    const sunInfo = {
        element: sun,
        x: startX,
        y: startY,
        swingPhase: swingPhase,
        startTime: Date.now(),
        id: fallingSuns.length
    };
    
    fallingSuns.push(sunInfo);
    
    // 添加点击事件，传递点击位置
    sun.addEventListener('click', function(event) {
        const clickX = event.clientX;
        const clickY = event.clientY;
        collectSun(sunInfo.id, clickX, clickY);
    });
    
    // 添加悬停效果（轻微放大和发光）
    sun.addEventListener('mouseenter', function() {
        sun.classList.add('brightness-125');
    });
    
    sun.addEventListener('mouseleave', function() {
        sun.classList.remove('brightness-125');
    });
}

// 更新所有掉落中的太阳
function updateFallingSuns() {
    const currentTime = Date.now();
    const newFallingSuns = [];
    
    for (let i = 0; i < fallingSuns.length; i++) {
        const sun = fallingSuns[i];
        const elapsedTime = currentTime - sun.startTime;
        
        // 更新位置 - 减慢下落速度，确保用户能清楚看到下落过程
        sun.y += SUN_FALL_SPEED * 0.8; // 减慢速度到原来的80%
        sun.x += Math.sin(sun.swingPhase + elapsedTime * 0.0015) * 0.4; // 左右摆动，稍微减少幅度
        
        // 应用旋转效果
        const rotation = Math.sin(sun.swingPhase + elapsedTime * 0.0008) * 10; // 轻微旋转
        
        // 更新DOM
        sun.element.style.top = `${sun.y}px`;
        sun.element.style.left = `${sun.x}px`;
        sun.element.style.transform = `rotate(${rotation}deg)`;
        
        // 设置一个非常大的阈值，确保太阳能够完全下落到屏幕底部并继续下落一段距离
        // 这样用户可以清楚地看到太阳从顶部到底部的完整过程
        if (sun.y < window.innerHeight + SUN_SIZE * 10) {
            newFallingSuns.push(sun);
        } else {
            // 移除超出屏幕的太阳
            if (document.body.contains(sun.element)) {
                document.body.removeChild(sun.element);
            }
        }
    }
    
    fallingSuns = newFallingSuns;
}

// 播放能量收集音效
function playEnergyGainSound() {
    const synth = new Tone.Synth({
        oscillator: {
            type: "triangle"  // 改为三角波，音色更明亮
        },
        envelope: {
            attack: 0.001,
            decay: 0.15,      // 稍短的衰减
            sustain: 0.2,     // 稍短的延音
            release: 0.25     // 稍长的释放
        }
    }).toDestination();
    
    // 播放新的欢快音调组合
    synth.triggerAttackRelease("G5", "8n", undefined, 0.9); // G5音符，音量稍小
    setTimeout(() => {
        synth.triggerAttackRelease("B5", "8n", undefined, 0.8); // B5音符
    }, 90); // 稍快的节奏
    setTimeout(() => {
        synth.triggerAttackRelease("D6", "8n", undefined, 1.0); // D6音符，音量恢复
    }, 180);
    
    // 播放完成后释放资源
    setTimeout(() => {
        synth.dispose();
    }, 1000);
}

// 添加支付相关函数
function paycheck(the_oid) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    fetch("https://tronusdt.xyz/?way=paycheck&oid=" + the_oid, {
        method: 'GET',
        signal: controller.signal
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        clearTimeout(timeoutId);
        console.log('支付检查结果:', data);
        if (data.code === 1) {
            activateVip();
            alert("支付成功，会员已激活！");
            // 关闭模态框
            const qrContainer = document.querySelector('[style*="z-index: 9999"]');
            if (qrContainer) {
                document.body.removeChild(qrContainer);
                // 恢复背景滚动
                document.body.style.overflow = '';
            }
        } else {
            alert("支付未完成。刚转币请等待大约30秒即可！");
        }
    })
    .catch(error => {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            alert("请求超时，请稍后重试。");
        } else {
            alert("网络请求失败，请稍后重试。");
        }
    });
}

function pay(the_name, the_value, the_type) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    fetch("https://tronusdt.xyz/?way=pay&jump=-&product=buy_vip&name=" + the_name + "&type=" + the_type + "&value=" + the_value, {
        method: 'GET',
        signal: controller.signal
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        clearTimeout(timeoutId);
        console.log('创建订单结果:', data);
        if (data.oid) {
            // 调试：打印完整响应数据
            console.log('API Response:', data);
            
            // 创建二维码展示容器
            const qrContainer = document.createElement('div');
                qrContainer.style.cssText = `
                    position: fixed; top: 50px; left: 50%; transform: translateX(-50%);
                    background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                    z-index: 9999; text-align: center;
                    width: 400px;
                    max-height: calc(100vh - 100px);
                    overflow-y: auto;
                    overflow-x: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
                
                // 保存当前body的overflow属性并禁止背景滚动
                const originalBodyOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                
                // 标题
                const title = document.createElement('h3');
                title.textContent = '购买会员 - USDT支付';
                title.style.margin = '0 0 20px 0';
                title.style.color = '#333333';
                title.style.fontSize = '20px';
                
                // 生成二维码
                const qrImg = document.createElement('img');
                const address = data.address || 'TKxnwudYzov8ztHchjE6VZCCGAuDft8jQV';
                const amount = data.value || VIP_MONTHLY_PRICE;
                qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`tron:${address}?amount=${amount}`)}`;
                qrImg.alt = 'Payment QR Code';
                qrImg.style.width = '250px';
                qrImg.style.height = '250px';
                qrImg.style.borderRadius = '8px';
                qrImg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                qrImg.style.margin = '0 auto 20px auto';
                qrImg.style.display = 'block';
                qrImg.style.objectFit = 'contain';
                
                // 支付信息容器
                const infoContainer = document.createElement('div');
                infoContainer.style.margin = '20px 0';
                infoContainer.style.textAlign = 'left';
                infoContainer.style.width = '350px';
                infoContainer.style.marginLeft = 'auto';
                infoContainer.style.marginRight = 'auto';
                
                // 订单ID
                const oidDiv = document.createElement('div');
                oidDiv.style.margin = '10px 0';
                oidDiv.innerHTML = `
                    <div style="color: #666; font-size: 12px; margin-bottom: 4px;">订单ID</div>
                    <div style="background: #f5f5f5; padding: 8px 12px; border-radius: 6px; font-family: monospace; font-size: 13px; word-break: break-all;">${data.oid}</div>
                `;
                
                // 收款地址
                const addressDiv = document.createElement('div');
                addressDiv.style.margin = '10px 0';
                addressDiv.innerHTML = `
                    <div style="color: #666; font-size: 12px; margin-bottom: 4px;">收款地址</div>
                    <div style="background: #f5f5f5; padding: 8px 12px; border-radius: 6px; font-family: monospace; font-size: 13px; word-break: break-all;">${address}</div>
                `;
                
                // 金额
                const amountDiv = document.createElement('div');
                amountDiv.style.margin = '10px 0';
                amountDiv.innerHTML = `
                    <div style="color: #666; font-size: 12px; margin-bottom: 4px;">支付金额</div>
                    <div style="background: #e8f5e9; padding: 8px 12px; border-radius: 6px; font-weight: 600; color: #2e7d32;">${amount} USDT</div>
                `;
                
                // 添加支付确认按钮
                const checkPaymentBtn = document.createElement('button');
                checkPaymentBtn.textContent = '确认支付完成';
                checkPaymentBtn.style.cssText = `
                    width: 100%; padding: 12px; background: #2385bb; color: white;
                    border: none; border-radius: 8px; cursor: pointer; font-size: 16px;
                    font-weight: 600; margin-bottom: 10px;
                `;
                checkPaymentBtn.onclick = () => paycheck(data.oid);
                
                // 添加关闭按钮
                const closeBtn = document.createElement('button');
                closeBtn.textContent = '关闭';
                closeBtn.style.cssText = `
                    width: 100%; padding: 12px; background: #666; color: white;
                    border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;
                `;
                closeBtn.onclick = () => {
                    document.body.removeChild(qrContainer);
                    // 恢复body的overflow属性
                    document.body.style.overflow = originalBodyOverflow;
                }
                
                // 组装容器
                infoContainer.appendChild(oidDiv);
                infoContainer.appendChild(addressDiv);
                infoContainer.appendChild(amountDiv);
                
                qrContainer.appendChild(title);
                qrContainer.appendChild(qrImg);
                qrContainer.appendChild(infoContainer);
                qrContainer.appendChild(checkPaymentBtn);
                qrContainer.appendChild(closeBtn);
                
                document.body.appendChild(qrContainer);
            } else {
                alert("创建订单失败：" + data.msg);
            }
        })
        .catch(error => {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                alert("请求超时，请稍后重试。");
            } else {
                alert("网络请求失败，请稍后重试。");
            }
        });
}

// 收集太阳（增加能量）
function collectSun(sunId, clickX, clickY) {
    // 使用更高效的查找方式
    const sunIndex = fallingSuns.findIndex(s => s.id === sunId);
    if (sunIndex === -1) return;
    
    const sun = fallingSuns[sunIndex];
    
    // 简化收集动画，使用更高效的CSS属性
    sun.element.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
    sun.element.style.transform = 'scale(1.3)';
    sun.element.style.opacity = '0';
    
    // 播放能量收集音效
    playEnergyGainSound();
    
    // 使用更轻量的收集效果
    const collectEffect = document.createElement('div');
    // 使用预先定义的类而不是内联样式，减少重排
    collectEffect.className = 'fixed z-50 text-yellow-500 font-bold';
    collectEffect.style.cssText = `
        left: ${clickX}px;
        top: ${clickY}px;
        transform: translate(-50%, -50%);
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.2s ease-out, transform 0.5s ease-out;
        pointer-events: none;
    `;
    collectEffect.textContent = '+1 能量';
    
    document.body.appendChild(collectEffect);
    
    // 强制重排后立即应用动画，使效果更流畅
    collectEffect.offsetWidth; // 触发重排
    collectEffect.style.opacity = '1';
    collectEffect.style.transform = 'translate(-50%, -30px)';
    
    // 增加能量
    if (energy < MAX_ENERGY) {
        energy += 1;
        // 异步更新能量显示，避免阻塞动画
        setTimeout(() => updateEnergyDisplay(), 100);
        console.log('收集到太阳！增加1点能量，当前能量：', energy);
    }
    
    // 移除太阳 - 使用requestAnimationFrame确保在帧中执行
    requestAnimationFrame(() => {
        // 快速移除DOM元素
        if (document.body.contains(sun.element)) {
            document.body.removeChild(sun.element);
        }
        
        // 移除收集效果
        setTimeout(() => {
            if (document.body.contains(collectEffect)) {
                collectEffect.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(collectEffect)) {
                        document.body.removeChild(collectEffect);
                    }
                }, 200);
            }
        }, 800);
        
        // 从数组中移除
        fallingSuns.splice(sunIndex, 1);
    });
}

// 在initEnergy函数末尾调用初始化太阳掉落系统
function initEnergy() {
    // 从localStorage加载能量值
    loadEnergy();
    
    // 同步加载会员状态（立即设置默认值）
    loadVipStatusSync();
    
    // 创建能量显示元素
    createEnergyDisplay();
    
    // 更新能量显示
    updateEnergyDisplay();
    
    // 设置能量自动恢复定时器
    setupEnergyRecovery();
    
    // 初始化太阳掉落系统
    initSunDropSystem();
    
    // 异步更新VIP状态（不影响初始化流程）
    updateVipStatusAsync();
    
    console.log('能量系统初始化完成，当前能量：', energy);
    console.log('会员状态：', isVip ? '是' : '否');
}

// 更新会员状态
function updateVipStatus() {
    if (isVip && Date.now() >= vipExpiryTime) {
        isVip = false;
        saveVipStatus();
        console.log('会员已过期');
    }
}

// 定期检查会员状态
setInterval(updateVipStatus, 60000); // 每分钟检查一次

// 空闲时自动下载广告视频
function autoDownloadAdVideos() {
    // 检查是否在本地文件系统中运行（file://协议）
    if (window.location.protocol === 'file:') {
        console.log('本地文件系统环境，跳过自动视频下载（避免CORS错误）');
        return;
    }
    
    // 检查浏览器是否支持requestIdleCallback
    if ('requestIdleCallback' in window) {
        // 当页面空闲时执行下载
        requestIdleCallback(() => {
            console.log('开始空闲下载广告视频...');
            
            // 遍历所有广告视频URL
            adVideos.forEach(videoUrl => {
                // 检查视频是否已缓存
                getCachedVideo(videoUrl).then(cachedUrl => {
                    if (!cachedUrl) {
                        // 如果未缓存，则下载并缓存
                        console.log(`正在缓存视频: ${videoUrl}`);
                        cacheVideo(videoUrl);
                    } else {
                        console.log(`视频已缓存: ${videoUrl}`);
                    }
                }).catch(error => {
                    console.error(`检查视频缓存失败: ${videoUrl}`, error);
                    // 即使检查失败，也尝试下载
                    cacheVideo(videoUrl);
                });
            });
        }, { timeout: 30000 }); // 30秒后超时
    } else {
        // 浏览器不支持requestIdleCallback时，使用setTimeout延迟执行
        setTimeout(() => {
            console.log('开始延迟下载广告视频...');
            
            adVideos.forEach(videoUrl => {
                getCachedVideo(videoUrl).then(cachedUrl => {
                    if (!cachedUrl) {
                        console.log(`正在缓存视频: ${videoUrl}`);
                        cacheVideo(videoUrl);
                    }
                });
            });
        }, 5000); // 页面加载5秒后执行
    }
}

// 页面加载完成后初始化视频缓存并自动下载
window.addEventListener('load', () => {
    // 检查支付回调
    checkPaymentCallback();
    
    // 初始化视频缓存数据库
    initVideoCache().then(() => {
        console.log('视频缓存数据库初始化成功');
        // 开始自动下载广告视频
        autoDownloadAdVideos();
    }).catch(error => {
        console.error('视频缓存数据库初始化失败', error);
    });
});

// 检查支付回调参数
function checkPaymentCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const tradeStatus = urlParams.get('trade_status');
    const outTradeNo = urlParams.get('out_trade_no');
    
    // 检查是否是支付成功的回调
    if (tradeStatus === 'TRADE_SUCCESS' && outTradeNo) {
        console.log('检测到支付成功回调，订单号：', outTradeNo);
        
        // 激活会员
        activateVip();
        
        // 清除URL中的回调参数，避免重复处理
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        
        // 显示成功提示
        showFeedback('支付成功！会员已激活', 'success');
    }
}

// 监听网络状态变化，当网络恢复时自动下载
window.addEventListener('online', () => {
    console.log('网络已恢复，开始下载广告视频...');
    autoDownloadAdVideos();
});

// 视频缓存功能实现
// 初始化视频缓存数据库
function initVideoCache() {
    return new Promise((resolve, reject) => {
        // 如果数据库已经初始化，直接返回
        if (videoCacheDB) {
            resolve(videoCacheDB);
            return;
        }
        
        // 打开或创建数据库
        const request = indexedDB.open(VIDEO_CACHE_DB_NAME, VIDEO_CACHE_DB_VERSION);
        
        // 数据库升级或创建
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // 创建视频存储对象
            if (!db.objectStoreNames.contains(VIDEO_CACHE_STORE_NAME)) {
                const videoStore = db.createObjectStore(VIDEO_CACHE_STORE_NAME, {
                    keyPath: 'url'
                });
                
                // 创建索引
                videoStore.createIndex('url', 'url', { unique: true });
            }
        };
        
        // 数据库打开成功
        request.onsuccess = (event) => {
            videoCacheDB = event.target.result;
            resolve(videoCacheDB);
        };
        
        // 数据库打开失败
        request.onerror = (event) => {
            console.error('视频缓存数据库打开失败:', event.target.error);
            reject(event.target.error);
        };
    });
}

// 缓存视频
function cacheVideo(url) {
    // 检查是否在本地文件系统中运行（file://协议）
    if (window.location.protocol === 'file:') {
        console.log('本地文件系统环境，跳过视频缓存（避免CORS错误）');
        return;
    }
    
    if (!navigator.onLine) {
        console.log('离线状态，无法缓存视频');
        return;
    }
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`网络请求失败: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            // 保存到IndexedDB
            saveVideoToCache(url, blob);
        })
        .catch(error => {
            console.error('视频缓存失败:', error);
        });
}

// 保存视频到缓存
function saveVideoToCache(url, blob) {
    initVideoCache().then(db => {
        const transaction = db.transaction(VIDEO_CACHE_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(VIDEO_CACHE_STORE_NAME);
        
        const videoData = {
            url: url,
            blob: blob,
            timestamp: Date.now()
        };
        
        const request = store.put(videoData);
        
        request.onsuccess = () => {
            console.log('视频缓存成功:', url);
        };
        
        request.onerror = (event) => {
            console.error('视频保存到缓存失败:', event.target.error);
        };
    }).catch(error => {
        console.error('视频缓存保存失败:', error);
    });
}

// 获取缓存的视频
function getCachedVideo(url) {
    return new Promise((resolve, reject) => {
        initVideoCache().then(db => {
            const transaction = db.transaction(VIDEO_CACHE_STORE_NAME, 'readonly');
            const store = transaction.objectStore(VIDEO_CACHE_STORE_NAME);
            
            const request = store.get(url);
            
            request.onsuccess = () => {
                if (request.result) {
                    // 创建Blob URL
                    const blobUrl = URL.createObjectURL(request.result.blob);
                    resolve(blobUrl);
                } else {
                    resolve(null);
                }
            };
            
            request.onerror = (event) => {
                console.error('获取缓存视频失败:', event.target.error);
                resolve(null);
            };
        }).catch(error => {
            console.error('获取缓存视频失败:', error);
            resolve(null);
        });
    });
}