// 能量系统功能实现

// 能量初始值
let energy = 20;
const MAX_ENERGY = 20; // 最大能量值
const ENERGY_RECOVERY_INTERVAL = 60000; // 能量恢复间隔（毫秒）- 1分钟

// 获取能量元素
let energyDisplay = null;
let energyIcon = null;

// 初始化能量系统
function initEnergy() {
    // 从localStorage加载能量值
    loadEnergy();
    
    // 创建能量显示元素
    createEnergyDisplay();
    
    // 更新能量显示
    updateEnergyDisplay();
    
    // 设置能量自动恢复定时器
    setupEnergyRecovery();
    
    console.log('能量系统初始化完成，当前能量：', energy);
}

// 从localStorage加载能量
function loadEnergy() {
    const savedEnergy = localStorage.getItem('goBlockchainEnergy');
    if (savedEnergy) {
        energy = parseInt(savedEnergy);
    }
    
    // 确保能量在有效范围内
    energy = Math.max(0, Math.min(energy, MAX_ENERGY));
}

// 保存能量到localStorage
function saveEnergy() {
    localStorage.setItem('goBlockchainEnergy', energy.toString());
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
    energyContainer.className = 'relative group -ml-1';
    energyContainer.innerHTML = `
        <div id="energy-display" class="flex items-center cursor-help bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 transform transition-all duration-300 hover:bg-blue-100" title="当前能量值">
            <i id="energy-icon" class="fas fa-bolt text-blue-500 text-sm mr-0.5"></i>
            <span id="energy-count" class="text-blue-600 font-medium text-sm">${energy}</span>
        </div>
        <div class="absolute top-full left-0 mt-1 px-4 py-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-gray-100">
            <div class="font-medium text-gray-800 flex items-center">
                <i class="fas fa-bolt text-blue-500 mr-2"></i>
                能量值：${energy}/${MAX_ENERGY}
            </div>
            <div class="h-1 w-full bg-gray-100 rounded-full mt-2 mb-2">
                <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style="width: ${(energy/MAX_ENERGY)*100}%"></div>
            </div>
            <div class="text-gray-600 text-xs">每道题消耗1点能量</div>
            <div class="text-gray-600 text-xs">答对题目有机会获得额外能量</div>
            
            <!-- 充能码输入区域 -->
            <div class="mt-3 pt-2 border-t border-gray-100">
                <div class="flex items-center space-x-1">
                    <input type="text" placeholder="输入充能码" id="energy-code-input" 
                           class="text-sm px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 w-36">
                    <button id="energy-code-submit" class="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors whitespace-nowrap">
                        充能
                    </button>
                </div>
                <div id="energy-code-message" class="text-xs mt-1 h-4"></div>
            </div>
        </div>
        
        <script>
        // 为充能码提交按钮添加事件监听器
        document.getElementById('energy-code-input').parentElement.addEventListener('click', function(e) {
            // 防止点击输入区域时关闭提示框
            e.stopPropagation();
        });
        
        document.getElementById('energy-code-submit').addEventListener('click', function() {
            const codeInput = document.getElementById('energy-code-input');
            const messageEl = document.getElementById('energy-code-message');
            const code = codeInput.value.trim().toLowerCase();
            
            if (code === 'energy') {
                // 验证成功，增加10点能量
                // 尝试直接调用全局能量增加函数，如果不存在则手动更新
                if (window.addEnergy) {
                    window.addEnergy(10);
                } else if (window.energy !== undefined) {
                    // 如果没有addEnergy函数，直接更新energy变量并调用updateEnergyDisplay
                    window.energy = Math.min(window.energy + 10, window.MAX_ENERGY);
                    if (window.updateEnergyDisplay) {
                        window.updateEnergyDisplay(window.energy);
                    }
                    // 保存到localStorage
                    localStorage.setItem('user_energy', window.energy);
                }
                messageEl.textContent = '充能成功！获得10点能量';
                messageEl.className = 'text-xs mt-1 h-4 text-green-600';
            } else {
                messageEl.textContent = '无效的充能码';
                messageEl.className = 'text-xs mt-1 h-4 text-red-600';
            }
            
            // 3秒后清除消息
            setTimeout(() => {
                messageEl.textContent = '';
                messageEl.className = 'text-xs mt-1 h-4';
            }, 3000);
            
            // 清空输入框
            codeInput.value = '';
        });
        
        // 允许通过回车键提交充能码
        document.getElementById('energy-code-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('energy-code-submit').click();
            }
        });
        </script>
    `;
    
    // 将能量显示添加到勋章显示的左边
    badgeSection.insertBefore(energyContainer, badgeSection.firstChild);
    
    // 获取能量显示元素引用
    energyDisplay = document.getElementById('energy-display');
    energyIcon = document.getElementById('energy-icon');
}

// 更新能量显示
function updateEnergyDisplay() {
    if (energyDisplay && energyDisplay.querySelector('#energy-count')) {
        const energyCount = energyDisplay.querySelector('#energy-count');
        
        // 添加能量变化动画
        if (energyIcon) {
            energyIcon.classList.add('animate-pulse');
        }
        energyCount.classList.add('animate-bounce-in');
        
        // 更新能量值
        energyCount.textContent = energy;
        
        // 更新悬停提示信息
        const tooltip = energyDisplay.nextElementSibling;
        if (tooltip) {
            // 更新标题
        const titleElement = tooltip.querySelector('.font-medium');
        if (titleElement) {
            titleElement.innerHTML = `<i class="fas fa-bolt text-blue-500 mr-2"></i>能量值：${energy}/${MAX_ENERGY}`;
        }
            
            // 更新进度条
            const progressBar = tooltip.querySelector('.h-full.bg-gradient-to-r.from-amber-400.to-red-500.rounded-full');
            if (progressBar) {
                const percentage = (energy/MAX_ENERGY) * 100;
                progressBar.style.width = `${percentage}%`;
            }
        }
        
        // 恢复正常样式
        setTimeout(() => {
            if (energyIcon) {
                energyIcon.classList.remove('animate-pulse');
            }
            energyCount.classList.remove('animate-bounce-in');
        }, 1000);
    }
    
    // 保存能量值
    saveEnergy();
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
    return energy > 0;
}