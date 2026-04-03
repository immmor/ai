// 价格计划和会员相关功能

// 价格相关常量
const PRICE_MONTHLY = 10;
const PRICE_YEARLY = 100;
const SUPPORT_EMAIL = 'support@immmor.com';

// 显示价格计划弹窗
function showPricePlanPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    const popup = document.createElement('div');
    popup.className = 'bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto';
    popup.innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">会员价格计划</h2>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            
            <!-- 价格计划卡片 -->
            <div class="grid md:grid-cols-2 gap-4 mb-6">
                <!-- 月度计划 -->
                <div class="border-2 border-gray-200 rounded-lg p-5 hover:border-blue-500 transition-colors">
                    <h3 class="text-lg font-semibold text-gray-700 mb-2">月度会员</h3>
                    <div class="flex items-baseline mb-4">
                        <span class="text-3xl font-bold text-gray-900">¥${PRICE_MONTHLY}</span>
                        <span class="text-gray-500 ml-2">/月</span>
                    </div>
                    <ul class="space-y-2 mb-6 text-sm text-gray-600">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>无限能量恢复</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>无广告体验</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>专属徽章</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>优先支持</span>
                        </li>
                    </ul>
                    <button onclick="buyVipMonthly()" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                        选择月度计划
                    </button>
                </div>
                
                <!-- 年度计划 -->
                <div class="border-2 border-blue-500 rounded-lg p-5 shadow-lg bg-gradient-to-br from-blue-50 to-white">
                    <div class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        推荐
                    </div>
                    <h3 class="text-lg font-semibold text-blue-600 mb-2">年度会员</h3>
                    <div class="flex items-baseline mb-4">
                        <span class="text-3xl font-bold text-gray-900">¥${PRICE_YEARLY}</span>
                        <span class="text-gray-500 ml-2">/年</span>
                    </div>
                    <div class="text-green-600 text-sm font-medium mb-4">
                        <i class="fas fa-tag mr-1"></i>
                        节省¥20（相当于¥8.3/月）
                    </div>
                    <ul class="space-y-2 mb-6 text-sm text-gray-600">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>所有月度会员权益</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>额外赠送7天</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>永久专属徽章</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>一对一学习咨询</span>
                        </li>
                    </ul>
                    <button onclick="buyVipYearly()" class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors font-medium">
                        选择年度计划
                    </button>
                </div>
            </div>
            
            <!-- 支付方式 -->
            <div class="mb-6">
                <h3 class="text-sm font-semibold text-gray-700 mb-3">支持的支付方式</h3>
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <div class="flex items-center">
                        <i class="fab fa-alipay text-blue-600 mr-2 text-xl"></i>
                        <span>支付宝</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fab fa-weixin text-green-600 mr-2 text-xl"></i>
                        <span>微信支付</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-wallet text-purple-600 mr-2 text-xl"></i>
                        <span>TRON USDT</span>
                    </div>
                </div>
            </div>
            
            <!-- 隐私政策和条款链接 -->
            <div class="border-t pt-4">
                <p class="text-sm text-gray-600 mb-3">
                    购买即表示您同意我们的
                    <a href="javascript:showPrivacyPolicy()" class="text-blue-600 hover:underline">隐私政策</a>
                    和
                    <a href="javascript:showTermsOfService()" class="text-blue-600 hover:underline">服务条款</a>
                </p>
            </div>
            
            <!-- 支持邮箱 -->
            <div class="border-t pt-4 mt-4">
                <div class="flex items-start space-x-3">
                    <i class="fas fa-envelope text-gray-400 mt-1"></i>
                    <div>
                        <p class="text-sm font-semibold text-gray-700 mb-1">需要帮助？</p>
                        <p class="text-sm text-gray-600 mb-2">如有任何问题，请随时联系我们：</p>
                        <a href="mailto:${SUPPORT_EMAIL}" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                            <i class="fas fa-arrow-right mr-1"></i>
                            ${SUPPORT_EMAIL}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // 点击遮罩层关闭
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

// 购买月度会员
function buyVipMonthly() {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const popup = document.createElement('div');
    popup.className = 'bg-white rounded-lg p-6 w-80';
    popup.innerHTML = `
        <h3 class="text-lg font-bold mb-4">确认购买</h3>
        <p class="text-gray-600 mb-4">您确定要花费 ¥${PRICE_MONTHLY} 购买30天会员吗？</p>
        <div class="flex space-x-2">
            <button onclick="confirmVipPurchase(${PRICE_MONTHLY}, 30, 'monthly')" class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">确认</button>
            <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">取消</button>
        </div>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// 购买年度会员
function buyVipYearly() {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const popup = document.createElement('div');
    popup.className = 'bg-white rounded-lg p-6 w-80';
    popup.innerHTML = `
        <h3 class="text-lg font-bold mb-4">确认购买</h3>
        <p class="text-gray-600 mb-4">您确定要花费 ¥${PRICE_YEARLY} 购买365天会员吗？</p>
        <p class="text-green-600 text-sm mb-4"><i class="fas fa-star"></i> 额外赠送7天！</p>
        <div class="flex space-x-2">
            <button onclick="confirmVipPurchase(${PRICE_YEARLY}, 365, 'yearly')" class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">确认</button>
            <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">取消</button>
        </div>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// 确认购买VIP
async function confirmVipPurchase(amount, days, type) {
    // 检查用户是否已登录
    if (typeof isLoggedIn === 'undefined' || !isLoggedIn) {
        showFeedback('请先登录后再购买会员', 'error');
        return;
    }
    
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
                amount: amount,
                duration: days
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
            
            // 关闭所有弹窗
            const overlays = document.querySelectorAll('.fixed.inset-0.bg-black.bg-opacity-50');
            overlays.forEach(overlay => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            });
        } else {
            throw new Error(result.msg || '购买失败');
        }
        
    } catch (error) {
        console.error('购买失败:', error);
        showFeedback('购买失败: ' + error.message, 'error');
    }
}

// 显示隐私政策
function showPrivacyPolicy() {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    const popup = document.createElement('div');
    popup.className = 'bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto';
    popup.innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">隐私政策</h2>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            
            <div class="prose max-w-none text-sm text-gray-700 space-y-4">
                <p><strong>生效日期：</strong>2024年1月1日</p>
                
                <p>欢迎使用我们的服务。我们深知您的隐私对您的重要性，本隐私政策旨在向您说明我们如何收集、使用、保护您的个人信息。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">1. 我们收集的信息</h3>
                <ul class="list-disc pl-5 space-y-2">
                    <li>账户信息：用户名、邮箱地址</li>
                    <li>学习数据：学习进度、答题记录、经验值</li>
                    <li>设备信息：设备类型、操作系统、浏览器类型</li>
                    <li>使用数据：访问时间、页面浏览记录</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">2. 信息使用方式</h3>
                <ul class="list-disc pl-5 space-y-2">
                    <li>提供和维护我们的服务</li>
                    <li>改进和优化用户体验</li>
                    <li>发送重要通知（如服务变更）</li>
                    <li>保护我们的服务安全</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">3. 信息保护</h3>
                <p>我们采取合理的技术和管理措施保护您的个人信息，包括加密技术、访问控制等。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">4. 信息共享</h3>
                <p>我们不会出售您的个人信息。在以下情况下可能会共享信息：</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li>获得您的明确同意</li>
                    <li>遵守法律法规要求</li>
                    <li>保护我们的合法权利</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">5. 您的权利</h3>
                <p>您可以访问、更正、删除您的个人信息，也可以撤回同意。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">6. 隐私政策更新</h3>
                <p>我们可能会不时更新本隐私政策。更新后将在页面上发布新版本。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">7. 联系我们</h3>
                <p>如对本隐私政策有任何疑问，请联系我们：</p>
                <p class="text-blue-600 font-medium">邮箱：${SUPPORT_EMAIL}</p>
            </div>
            
            <div class="mt-6 pt-4 border-t text-center">
                <button onclick="this.closest('.fixed').remove()" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    关闭
                </button>
            </div>
        </div>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// 显示服务条款
function showTermsOfService() {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    const popup = document.createElement('div');
    popup.className = 'bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto';
    popup.innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">服务条款</h2>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            
            <div class="prose max-w-none text-sm text-gray-700 space-y-4">
                <p><strong>生效日期：</strong>2024年1月1日</p>
                
                <p>感谢您使用我们的服务。使用我们的服务即表示您同意遵守以下服务条款。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">1. 服务说明</h3>
                <p>我们提供在线学习平台，包括题库、学习工具等功能。服务可能会不定期更新和改进。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">2. 账户注册</h3>
                <ul class="list-disc pl-5 space-y-2">
                    <li>您必须提供真实、准确的注册信息</li>
                    <li>您有责任维护账户安全</li>
                    <li>您对账户下的所有活动负责</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">3. 使用规则</h3>
                <p>您同意：</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li>遵守所有适用的法律法规</li>
                    <li>不用于任何非法或未经授权的目的</li>
                    <li>不干扰服务的正常运行</li>
                    <li>不尝试获取未授权的访问权限</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">4. 知识产权</h3>
                <p>服务中的所有内容（包括但不限于题库、代码、文档）的知识产权归我们所有。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">5. 会员服务</h3>
                <ul class="list-disc pl-5 space-y-2">
                    <li>会员服务自购买之日起生效</li>
                    <li>会员权益仅限个人使用</li>
                    <li>我们保留调整会员权益的权利</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">6. 免责声明</h3>
                <p>服务按"现状"提供，我们不对服务的可用性、准确性、及时性作任何保证。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">7. 责任限制</h3>
                <p>在法律允许的最大范围内，我们对任何间接、附带或 consequential 损失不承担责任。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">8. 条款修改</h3>
                <p>我们保留随时修改本服务条款的权利。修改后将继续在页面上发布新版本。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">9. 适用法律</h3>
                <p>本条款受中华人民共和国法律管辖。</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">10. 联系我们</h3>
                <p>如对本服务条款有任何疑问，请联系我们：</p>
                <p class="text-blue-600 font-medium">邮箱：${SUPPORT_EMAIL}</p>
            </div>
            
            <div class="mt-6 pt-4 border-t text-center">
                <button onclick="this.closest('.fixed').remove()" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    关闭
                </button>
            </div>
        </div>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// 初始化价格功能
function initPrice() {
    // 检查能量显示元素是否存在
    const energyDisplay = document.getElementById('energy-display');
    if (!energyDisplay) {
        console.error('能量显示元素未找到');
        return;
    }
    
    // 创建dollar按钮容器
    const dollarContainer = document.createElement('div');
    dollarContainer.className = 'relative cursor-pointer w-5 px-1.5 py-0.5 rounded-md overflow-hidden flex items-center justify-center';
    dollarContainer.title = '查看价格计划';
    dollarContainer.innerHTML = `
        <div class="absolute inset-0 bg-gray-200"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 opacity-70"></div>
        <div class="relative z-10 flex items-center justify-center">
            <i class="fas fa-dollar-sign text-white text-xs"></i>
        </div>
    `;
    
    // 在能量显示容器后面添加dollar按钮（在同一层级）
    const energyContainer = energyDisplay.parentNode;
    const badgeSection = energyContainer.parentNode;
    badgeSection.insertBefore(dollarContainer, energyContainer.nextSibling);
    
    // 添加点击事件
    dollarContainer.addEventListener('click', function(e) {
        e.stopPropagation();
        showPricePlanPopup();
    });
    
    // 点击页面其他地方关闭弹窗
    document.addEventListener('click', function() {
        const pricePopup = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50:has(.max-w-md.w-full)');
        if (pricePopup && !pricePopup.contains(event.target) && event.target !== dollarContainer) {
            document.body.removeChild(pricePopup);
        }
    });
}

// 导出函数
window.showPricePlanPopup = showPricePlanPopup;
window.showPrivacyPolicy = showPrivacyPolicy;
window.showTermsOfService = showTermsOfService;
window.buyVipMonthly = buyVipMonthly;
window.buyVipYearly = buyVipYearly;
window.confirmVipPurchase = confirmVipPurchase;

// 等待能量显示元素创建后再初始化
function initPriceDelayed() {
    const checkInterval = setInterval(() => {
        const energyDisplay = document.getElementById('energy-display');
        if (energyDisplay) {
            clearInterval(checkInterval);
            initPrice();
        }
    }, 100);
    
    // 5秒超时
    setTimeout(() => {
        clearInterval(checkInterval);
        console.warn('等待能量显示元素超时');
    }, 5000);
}

// 自动初始化
initPriceDelayed();
