// Price plan and membership features

// Price constants
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
                <h2 class="text-2xl font-bold text-gray-800">Membership Plans</h2>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            
            <!-- 价格计划卡片 -->
            <div class="grid md:grid-cols-2 gap-4 mb-6">
                <!-- 月度计划 -->
                <div class="border-2 border-gray-200 rounded-lg p-5 hover:border-blue-500 transition-colors">
                    <h3 class="text-lg font-semibold text-gray-700 mb-2">Monthly Membership</h3>
                    <div class="flex items-baseline mb-4">
                        <span class="text-3xl font-bold text-gray-900">¥${PRICE_MONTHLY}</span>
                        <span class="text-gray-500 ml-2">/month</span>
                    </div>
                    <ul class="space-y-2 mb-6 text-sm text-gray-600">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>Unlimited energy recovery</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>Ad-free experience</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>Exclusive badge</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>Priority support</span>
                        </li>
                    </ul>
                    <button onclick="buyVipMonthly()" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                        Select Monthly Plan
                    </button>
                </div>
                
                <!-- 年度计划 -->
                <div class="border-2 border-blue-500 rounded-lg p-5 shadow-lg bg-gradient-to-br from-blue-50 to-white">
                    <div class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        Recommended
                    </div>
                    <h3 class="text-lg font-semibold text-blue-600 mb-2">Annual Membership</h3>
                    <div class="flex items-baseline mb-4">
                        <span class="text-3xl font-bold text-gray-900">¥${PRICE_YEARLY}</span>
                        <span class="text-gray-500 ml-2">/year</span>
                    </div>
                    <div class="text-green-600 text-sm font-medium mb-4">
                        <i class="fas fa-tag mr-1"></i>
                        Save ¥20 (¥8.3/month)
                    </div>
                    <ul class="space-y-2 mb-6 text-sm text-gray-600">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>All monthly membership benefits</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>Additional 7 days free</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>Permanent exclusive badge</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>1-on-1 learning consultation</span>
                        </li>
                    </ul>
                    <button onclick="buyVipYearly()" class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors font-medium">
                        Select Annual Plan
                    </button>
                </div>
            </div>
            
            <!-- 支付方式 -->
            <div class="mb-6">
                <h3 class="text-sm font-semibold text-gray-700 mb-3">Payment Methods</h3>
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <div class="flex items-center">
                        <i class="fab fa-alipay text-blue-600 mr-2 text-xl"></i>
                        <span>Alipay</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fab fa-weixin text-green-600 mr-2 text-xl"></i>
                        <span>WeChat Pay</span>
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
                    By purchasing, you agree to our
                    <a href="javascript:showPrivacyPolicy()" class="text-blue-600 hover:underline">Privacy Policy</a>
                    and
                    <a href="javascript:showTermsOfService()" class="text-blue-600 hover:underline">Terms of Service</a>
                </p>
            </div>
            
            <!-- 支持邮箱 -->
            <div class="border-t pt-4 mt-4">
                <div class="flex items-start space-x-3">
                    <i class="fas fa-envelope text-gray-400 mt-1"></i>
                    <div>
                        <p class="text-sm font-semibold text-gray-700 mb-1">Need Help?</p>
                        <p class="text-sm text-gray-600 mb-2">If you have any questions, please contact us:</p>
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
        <h3 class="text-lg font-bold mb-4">Confirm Purchase</h3>
        <p class="text-gray-600 mb-4">Are you sure you want to spend ¥${PRICE_MONTHLY} for 30 days of membership?</p>
        <div class="flex space-x-2">
            <button onclick="confirmVipPurchase(${PRICE_MONTHLY}, 30, 'monthly')" class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Confirm</button>
            <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">Cancel</button>
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
        <h3 class="text-lg font-bold mb-4">Confirm Purchase</h3>
        <p class="text-gray-600 mb-4">Are you sure you want to spend ¥${PRICE_YEARLY} for 365 days of membership?</p>
        <p class="text-green-600 text-sm mb-4"><i class="fas fa-star"></i> Additional 7 days free!</p>
        <div class="flex space-x-2">
            <button onclick="confirmVipPurchase(${PRICE_YEARLY}, 365, 'yearly')" class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Confirm</button>
            <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">Cancel</button>
        </div>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// 确认购买VIP
async function confirmVipPurchase(amount, days, type) {
    // 检查用户是否已登录
    if (typeof isLoggedIn === 'undefined' || !isLoggedIn) {
        showFeedback('Please login first before purchasing membership', 'error');
        return;
    }
    
    try {
        const username = localStorage.getItem('username');
        if (!username) {
            showFeedback('Failed to get user information', 'error');
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
            
            showFeedback(`Membership purchase successful! VIP expires on ${result.data.vip_expire_date}, ${result.data.remaining_days} days remaining`, 'success');
            
            // 关闭所有弹窗
            const overlays = document.querySelectorAll('.fixed.inset-0.bg-black.bg-opacity-50');
            overlays.forEach(overlay => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            });
        } else {
            throw new Error(result.msg || 'Purchase failed');
        }
        
    } catch (error) {
        console.error('Purchase failed:', error);
        showFeedback('Purchase failed: ' + error.message, 'error');
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
                <h2 class="text-2xl font-bold text-gray-800">Privacy Policy</h2>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            
            <div class="prose max-w-none text-sm text-gray-700 space-y-4">
                <p><strong>Effective Date:</strong> January 1, 2024</p>
                
                <p>Welcome to our service. We understand the importance of your privacy, and this Privacy Policy is designed to explain how we collect, use, and protect your personal information.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">1. Information We Collect</h3>
                <ul class="list-disc pl-5 space-y-2">
                    <li>Account Information: username, email address</li>
                    <li>Learning Data: learning progress, answer records, experience points</li>
                    <li>Device Information: device type, operating system, browser type</li>
                    <li>Usage Data: access time, page view history</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">2. How We Use Your Information</h3>
                <ul class="list-disc pl-5 space-y-2">
                    <li>To provide and maintain our service</li>
                    <li>To improve and optimize user experience</li>
                    <li>To send important notifications (e.g., service changes)</li>
                    <li>To protect the security of our service</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">3. Information Protection</h3>
                <p>We implement reasonable technical and management measures to protect your personal information, including encryption and access control.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">4. Information Sharing</h3>
                <p>We do not sell your personal information. Information may be shared in the following cases:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li>With your explicit consent</li>
                    <li>To comply with legal requirements</li>
                    <li>To protect our legitimate rights</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">5. Your Rights</h3>
                <p>You have the right to access, correct, delete your personal information, or withdraw consent.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">6. Privacy Policy Updates</h3>
                <p>We may update this Privacy Policy from time to time. The new version will be posted on the website.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">7. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <p class="text-blue-600 font-medium">Email: ${SUPPORT_EMAIL}</p>
            </div>
            
            <div class="mt-6 pt-4 border-t text-center">
                <button onclick="this.closest('.fixed').remove()" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Close
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
                <h2 class="text-2xl font-bold text-gray-800">Terms of Service</h2>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            
            <div class="prose max-w-none text-sm text-gray-700 space-y-4">
                <p><strong>Effective Date:</strong> January 1, 2024</p>
                
                <p>Thank you for using our service. By using our service, you agree to the following Terms of Service.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">1. Service Description</h3>
                <p>We provide an online learning platform, including question banks, learning tools, and other features. The service may be updated and improved from time to time.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">2. Account Registration</h3>
                <ul class="list-disc pl-5 space-y-2">
                    <li>You must provide true and accurate registration information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>You are responsible for all activities under your account</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">3. Use Rules</h3>
                <p>You agree to:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Not use the service for any illegal or unauthorized purpose</li>
                    <li>Not interfere with the normal operation of the service</li>
                    <li>Not attempt to obtain unauthorized access</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">4. Intellectual Property</h3>
                <p>All content in the service (including but not limited to question banks, code, documentation) is owned by us.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">5. Membership Service</h3>
                <ul class="list-disc pl-5 space-y-2">
                    <li>Membership service takes effect from the date of purchase</li>
                    <li>Membership benefits are for personal use only</li>
                    <li>We reserve the right to adjust membership benefits</li>
                </ul>
                
                <h3 class="font-semibold text-gray-800 mt-4">6. Disclaimer</h3>
                <p>The service is provided "as is". We make no warranties regarding the availability, accuracy, or timeliness of the service.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">7. Limitation of Liability</h3>
                <p>To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">8. Terms Modifications</h3>
                <p>We reserve the right to modify these Terms of Service at any time. The new version will be posted on the website.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">9. Governing Law</h3>
                <p>These terms are governed by the laws of the People's Republic of China.</p>
                
                <h3 class="font-semibold text-gray-800 mt-4">10. Contact Us</h3>
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <p class="text-blue-600 font-medium">Email: ${SUPPORT_EMAIL}</p>
            </div>
            
            <div class="mt-6 pt-4 border-t text-center">
                <button onclick="this.closest('.fixed').remove()" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Close
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
        console.error('Energy display element not found');
        return;
    }
    
    // 创建dollar按钮容器
    const dollarContainer = document.createElement('div');
    dollarContainer.className = 'relative cursor-pointer w-5 px-1.5 py-0.5 rounded-md overflow-hidden flex items-center justify-center';
    dollarContainer.title = 'View Price Plans';
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
        console.warn('Waiting for energy display element timed out');
    }, 5000);
}

// 自动初始化
initPriceDelayed();

// Automatically show price plan popup after page loads
window.addEventListener('load', () => setTimeout(showPricePlanPopup, 500));
