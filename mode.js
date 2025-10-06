// 学习模式系统 - 炫酷版本
class StudyModeSystem {
    constructor() {
        this.currentMode = 'normal';
        this.modes = {
            normal: {
                name: '正常模式',
                icon: 'fa-star',
                bg: '',
                textColor: 'text-gray-700',
                buttonColor: 'text-blue-500',
                effects: {
                    particleColor: 'rgba(100, 149, 237, 0.5)', // 蓝色粒子
                    glowColor: 'rgba(59, 130, 246, 0.3)', // 蓝色辉光
                    animation: 'pulse-slow'
                },
                description: '稳定学习，循序渐进'
            },
            takeoff: {
                name: '起飞模式',
                icon: 'fa-rocket',
                bg: 'bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200',
                textColor: 'text-purple-800',
                buttonColor: 'text-purple-600',
                effects: {
                    particleColor: 'rgba(147, 51, 234, 0.9)', // 更亮的紫色粒子
                    glowColor: 'rgba(168, 85, 247, 0.8)', // 更亮的紫色辉光
                    animation: 'pulse-fast',
                    trailEffect: true, // 火箭尾迹效果
                    starsEffect: true,  // 星空效果
                    cometEffect: true,  // 彗星效果
                    nebulaEffect: true // 星云效果
                },
                description: '🚀 加速学习，效率翻倍',
                xpMultiplier: 1.5
            },
            battle: {
                name: '战斗模式',
                icon: 'fa-fist-raised',
                bg: 'bg-gradient-to-br from-red-200 via-orange-200 to-yellow-200',
                textColor: 'text-red-800',
                buttonColor: 'text-red-600',
                effects: {
                    particleColor: 'rgba(239, 68, 68, 1.0)', // 更亮的红色粒子
                    glowColor: 'rgba(248, 113, 113, 0.9)', // 更亮的红色辉光
                    animation: 'pulse',
                    fireEffect: true,  // 火焰效果
                    sparksEffect: true, // 火花效果
                    explosionEffect: true, // 爆炸效果
                    lightningEffect: true // 闪电效果
                },
                description: '💥 极限挑战，突破自我',
                xpMultiplier: 2.0
            }
        };
        
        this.init();
    }
    
    init() {
        // 创建模式切换按钮
        this.createModeButton();
        // 应用初始模式效果
        this.applyModeEffects();
    }
    
    createModeButton() {
        // 检查是否已存在模式按钮
        if (document.getElementById('mode-btn')) return;
        
        // 创建模式按钮
        const modeBtn = document.createElement('button');
        modeBtn.id = 'mode-btn';
        modeBtn.className = 'text-xs text-gray-500 hover:text-blue-500 flex items-center transition-all duration-300 cursor-pointer';
        modeBtn.title = '点击切换学习模式';
        
        // 添加到底部导航栏，加油按钮的左边
        const footerLeft = document.querySelector('footer .flex.space-x-3');
        if (footerLeft) {
            // 找到加油按钮，在它前面插入模式按钮
            const cheerBtn = document.getElementById('cheer-btn');
            if (cheerBtn && cheerBtn.parentElement) {
                cheerBtn.parentElement.insertBefore(modeBtn, cheerBtn);
            } else {
                footerLeft.appendChild(modeBtn);
            }
        }
        
        // 绑定点击事件
        modeBtn.addEventListener('click', () => this.toggleMode());
        
        this.updateButtonDisplay();
    }
    
    toggleMode() {
        const modes = Object.keys(this.modes);
        const currentIndex = modes.indexOf(this.currentMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        this.currentMode = modes[nextIndex];
        
        // 应用新模式效果
        this.applyModeEffects();
        
        // 显示模式切换动画
        this.showModeSwitchAnimation();
        
        console.log(`切换到${this.modes[this.currentMode].name}`);
    }
    
    applyModeEffects() {
        const modeInfo = this.modes[this.currentMode];
        const modeBtn = document.getElementById('mode-btn');
        
        if (modeBtn) {
            // 更新按钮显示
            modeBtn.innerHTML = `<i class="fa ${modeInfo.icon} mr-1 ${modeInfo.buttonColor}"></i> ${modeInfo.name}`;
            
            modeBtn.className = `text-xs ${modeInfo.textColor} hover:${modeInfo.buttonColor} flex items-center transition-all duration-300 cursor-pointer`;
        }
        
        // 切换背景样式
        const container = document.querySelector('.min-h-screen');
        if (container) {
            container.className = `min-h-screen ${modeInfo.bg} transition-all duration-500`;
        }
        
        // 应用粒子效果
        this.applyParticleEffects();
        
        // 应用辉光效果
        this.applyGlowEffects();
        
        // 更新按钮显示
        this.updateButtonDisplay();
    }
    
    applyParticleEffects() {
        // 清除之前的粒子效果
        this.clearParticleEffects();
        
        const modeInfo = this.modes[this.currentMode];
        if (this.currentMode === 'normal') return; // 正常模式不显示粒子
        
        // 创建粒子容器
        const particleContainer = document.createElement('div');
        particleContainer.id = 'mode-particles';
        particleContainer.className = 'fixed inset-0 pointer-events-none z-0';
        
        // 创建粒子样式
        const style = document.createElement('style');
        style.textContent = `
            .mode-particle {
                position: absolute;
                border-radius: 50%;
                animation: float-particle 3s ease-in-out infinite;
                pointer-events: none;
                filter: blur(0.5px);
                box-shadow: 0 0 10px var(--particle-glow);
            }
            @keyframes float-particle {
                0%, 100% { 
                    transform: translateY(0px) translateX(0px) scale(0.5); 
                    opacity: 0; 
                }
                50% { 
                    transform: translateY(-30px) translateX(15px) scale(1.2); 
                    opacity: 1; 
                }
            }
            
            /* 起飞模式特殊效果 */
            .rocket-trail {
                position: absolute;
                width: 1px;
                height: 20px;
                background: linear-gradient(to bottom, rgba(255,255,255,0.8), transparent);
                animation: rocket-trail 2s linear infinite;
                filter: blur(1px);
                box-shadow: 0 0 15px rgba(255,255,255,0.7);
            }
            @keyframes rocket-trail {
                0% { transform: translateY(100vh) translateX(0); opacity: 0; }
                10% { opacity: 1; }
                100% { transform: translateY(-100px) translateX(10px); opacity: 0; }
            }
            
            /* 战斗模式特殊效果 */
            .fire-spark {
                position: absolute;
                width: 3px;
                height: 3px;
                background: radial-gradient(circle, rgba(255,165,0,0.8), rgba(255,69,0,0.6));
                animation: fire-spark 1.5s ease-out infinite;
                filter: blur(0.5px);
                box-shadow: 0 0 8px rgba(255,69,0,0.8);
            }
            @keyframes fire-spark {
                0% { transform: scale(0) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
                100% { transform: scale(0) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // 创建基础粒子 - 增加粒子数量
        const particleCount = this.currentMode === 'takeoff' ? 100 : (this.currentMode === 'battle' ? 120 : 50);
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'mode-particle';
                particle.style.background = modeInfo.effects.particleColor;
                particle.style.setProperty('--particle-glow', modeInfo.effects.particleColor);
                particle.style.width = (Math.random() * 4 + 2) + 'px';
                particle.style.height = particle.style.width;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                particleContainer.appendChild(particle);
            }, i * 30);
        }
        
        // 起飞模式：添加火箭尾迹效果
        if (this.currentMode === 'takeoff' && modeInfo.effects.trailEffect) {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const trail = document.createElement('div');
                    trail.className = 'rocket-trail';
                    trail.style.left = Math.random() * 100 + '%';
                    trail.style.animationDelay = Math.random() * 2 + 's';
                    particleContainer.appendChild(trail);
                }, i * 150);
            }
        }
        
        // 战斗模式：添加火焰火花效果
        if (this.currentMode === 'battle' && modeInfo.effects.sparksEffect) {
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const spark = document.createElement('div');
                    spark.className = 'fire-spark';
                    spark.style.left = Math.random() * 100 + '%';
                    spark.style.top = Math.random() * 100 + '%';
                    spark.style.animationDelay = Math.random() * 1.5 + 's';
                    particleContainer.appendChild(spark);
                }, i * 50);
            }
        }
        
        document.body.appendChild(particleContainer);
    }
    
    applyGlowEffects() {
        // 清除之前的辉光效果
        this.clearGlowEffects();
        
        const modeInfo = this.modes[this.currentMode];
        if (this.currentMode === 'normal') return; // 正常模式不显示辉光
        
        // 创建辉光样式
        const style = document.createElement('style');
        style.textContent = `
            .mode-glow {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: -1;
                animation: ${modeInfo.effects.animation} 3s ease-in-out infinite;
            }
            
            /* 起飞模式：多层渐变辉光 */
            .mode-glow.takeoff {
                background: 
                    radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.4), transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.3), transparent 60%),
                    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%);
                filter: blur(10px);
            }
            
            /* 战斗模式：火焰辉光效果 */
            .mode-glow.battle {
                background: 
                    radial-gradient(circle at 30% 20%, rgba(255, 69, 0, 0.5), transparent 40%),
                    radial-gradient(circle at 70% 80%, rgba(255, 140, 0, 0.4), transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.3), transparent 60%);
                filter: blur(15px);
            }
            
            @keyframes pulse-fast {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.05); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 0.7; transform: scale(1); }
                50% { opacity: 0.9; transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
        
        // 创建辉光元素
        const glowEl = document.createElement('div');
        glowEl.id = 'mode-glow';
        glowEl.className = `mode-glow ${this.currentMode}`;
        document.body.appendChild(glowEl);
    }
    
    clearParticleEffects() {
        const particles = document.getElementById('mode-particles');
        if (particles) particles.remove();
    }
    
    clearGlowEffects() {
        const glow = document.getElementById('mode-glow');
        if (glow) glow.remove();
    }
    
    async showModeSwitchAnimation() {
        const modeInfo = this.modes[this.currentMode];
        
        // 正常模式不显示弹窗
        if (this.currentMode === 'normal') return;
        
        // 创建切换动画元素
        const animationEl = document.createElement('div');
        animationEl.className = 'fixed inset-0 flex items-center justify-center z-50 pointer-events-none';
        
        // 根据模式定制动画效果
        let animationClass = 'animate-bounce';
        let extraEffects = 'transform-gpu scale-110'; // 所有模式使用相同的缩放效果
        
        if (this.currentMode === 'takeoff') {
            animationClass = 'animate-pulse-fast';
            extraEffects = 'transform-gpu scale-110';
        } else if (this.currentMode === 'battle') {
            animationClass = 'animate-pulse';
            extraEffects = 'transform-gpu scale-110'; // 战斗模式也使用110%缩放
        }
        
        animationEl.innerHTML = `
            <div class="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl text-center ${animationClass} ${extraEffects} border-2 ${this.currentMode === 'takeoff' ? 'border-purple-300' : this.currentMode === 'battle' ? 'border-red-300' : 'border-blue-300'}">
                <div class="text-5xl mb-3 ${modeInfo.buttonColor} animate-pulse">
                    <i class="fa ${modeInfo.icon}"></i>
                </div>
                <h3 class="text-2xl font-bold ${modeInfo.textColor} mb-2">${modeInfo.name}</h3>
                <p class="text-sm text-gray-700 font-medium">${modeInfo.description}</p>
                <div class="mt-3 text-xs text-gray-500">
                    XP加成: ${modeInfo.xpMultiplier || 1.0}x
                </div>
            </div>
        `;
        
        document.body.appendChild(animationEl);
        
        // 添加音效（如果可用）
        try {
            if (window.Tone) {
                // 确保 Tone.js 上下文已启动
                if (Tone.context.state !== 'running') {
                    await Tone.start();
                }
                
                const synth = new Tone.Synth().toDestination();
                if (this.currentMode === 'takeoff') {
                    synth.triggerAttackRelease("C5", "8n");
                    setTimeout(() => synth.triggerAttackRelease("E5", "8n"), 100);
                } else if (this.currentMode === 'battle') {
                    synth.triggerAttackRelease("G4", "4n");
                }
            }
        } catch (e) {
            // 忽略音效错误
            console.log('音效播放失败:', e);
        }
        
        // 3秒后移除动画
        setTimeout(() => {
            if (animationEl.parentElement) {
                animationEl.remove();
            }
        }, 3000);
    }
    
    updateButtonDisplay() {
        const modeBtn = document.getElementById('mode-btn');
        if (!modeBtn) return;
        
        const modeInfo = this.modes[this.currentMode];
        
        // 添加当前模式的特殊样式
        modeBtn.classList.remove('border-blue-300', 'border-purple-300', 'border-red-300');
        
        if (this.currentMode === 'takeoff') {
            modeBtn.classList.add('border-purple-300');
        } else if (this.currentMode === 'battle') {
            modeBtn.classList.add('border-red-300');
        } else {
            modeBtn.classList.add('border-blue-300');
        }
    }
    
    // 获取当前模式的XP倍数
    getXPMultiplier() {
        return this.modes[this.currentMode].xpMultiplier || 1.0;
    }
    
    // 获取当前模式信息
    getCurrentMode() {
        return this.modes[this.currentMode];
    }
}

// 全局导出
window.StudyModeSystem = StudyModeSystem;