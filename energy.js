// 能量系统功能实现

// 能量初始值
let energy = 20;
const MAX_ENERGY = 20; // 最大能量值
const ENERGY_RECOVERY_INTERVAL = 7200000; // 能量恢复间隔（毫秒）- 1分钟

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
    
    // console.log('能量系统初始化完成，当前能量：', energy);
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

// 设置能量系统事件监听器
function setupEnergyEventListeners() {
    // 获取DOM元素引用
    const energyDisplay = document.getElementById('energy-display');
    const energyTooltip = document.getElementById('energy-tooltip');
    const codeInput = document.getElementById('energy-code-input');
    const codeSubmit = document.getElementById('energy-code-submit');
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
                
                // 更新提示框中的能量值
                const energyText = energyTooltip.querySelector('.font-medium.text-gray-800.flex.items-center');
                if (energyText) {
                    energyText.innerHTML = '<i class="fas fa-sun text-yellow-500 mr-2"></i>能量值：' + energy + '/' + MAX_ENERGY;
                }
                saveEnergy();
                showFeedback('充能成功！获得10点能量', 'success');
            } else {
                showFeedback('无效的充能码', 'error');
            }
            codeInput.value = '';
        });
    }
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
        </div>
    `;
    
    // 将能量显示添加到勋章显示的左边
    badgeSection.insertBefore(energyContainer, badgeSection.firstChild);
    
    // 获取能量显示元素引用
    energyDisplay = document.getElementById('energy-display');
    energyIcon = document.getElementById('energy-icon');
    
    setupEnergyEventListeners();
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
            energyCount.textContent = energy;
        }
        
        // 更新进度条宽度
        if (energyProgressBar) {
            const percentage = (energy / MAX_ENERGY) * 100;
            energyProgressBar.style.width = `${percentage}%`;
        }
        
        // 更新悬停提示信息
        const tooltip = energyDisplay.nextElementSibling;
        if (tooltip) {
            // 更新标题
            const titleElement = tooltip.querySelector('.font-medium');
            if (titleElement) {
                titleElement.innerHTML = `<i class="fas fa-sun text-yellow-500 mr-2"></i>能量值：${energy}/${MAX_ENERGY}`;
            }
            
            // 更新提示框中的进度条
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
    
    // 创建能量显示元素
    createEnergyDisplay();
    
    // 更新能量显示
    updateEnergyDisplay();
    
    // 设置能量自动恢复定时器
    setupEnergyRecovery();
    
    // 初始化太阳掉落系统
    initSunDropSystem();
    
    // console.log('能量系统初始化完成，当前能量：', energy);
}