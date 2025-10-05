// 添加动画样式定义
const addAnimationStyles = () => {
    if (!document.getElementById('level-styles-animations')) {
        const style = document.createElement('style');
        style.id = 'level-styles-animations';
        style.textContent = `
            @keyframes confetti {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
            @keyframes fireworks {
                0% { transform: scale(0); opacity: 1; }
                50% { transform: scale(1.5); opacity: 0.8; }
                100% { transform: scale(2); opacity: 0; }
            }
            @keyframes particle-fall {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                100% { transform: translate(${Math.random() * 200 - 100}px, 100vh) rotate(360deg); opacity: 0; }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            @keyframes red-pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
                70% { box-shadow: 0 0 0 20px rgba(255, 0, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
            }
            @keyframes level-up-popup {
                0% { transform: scale(0.5); opacity: 0; }
                50% { transform: scale(1.1); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes level-down-popup {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
                100% { transform: scale(0.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
};

// 等级样式管理系统
class LevelStyles {
    constructor() {
        // 初始化动画样式
        addAnimationStyles();
        
        this.levelConfigs = {
            1: {
                name: '初学者',
                headerBg: 'bg-white',
                headerBorder: 'border-gray-200',
                mainBg: 'bg-gray-50',
                levelColor: 'text-gray-600',
                xpBarGradient: 'from-green-400 to-blue-500',
                badgeBg: 'from-yellow-300 via-orange-400 to-red-500',
                questionBg: 'bg-white',
                questionBorder: 'border-gray-200',
                footerBg: 'bg-white',
                footerBorder: 'border-gray-200',
                animation: 'none',
                specialEffects: [],
                icon: '📘',
                description: '刚刚开始学习的旅程'
            },
            2: {
                name: '学徒',
                headerBg: 'bg-blue-50',
                headerBorder: 'border-blue-200',
                mainBg: 'bg-blue-50',
                levelColor: 'text-blue-600',
                xpBarGradient: 'from-blue-400 to-purple-500',
                badgeBg: 'from-blue-300 via-purple-400 to-indigo-500',
                questionBg: 'bg-blue-50',
                questionBorder: 'border-blue-200',
                footerBg: 'bg-blue-50',
                footerBorder: 'border-blue-200',
                animation: 'pulse-slow',
                specialEffects: ['subtle-glow'],
                icon: '📗',
                description: '正在快速成长的学徒'
            },
            3: {
                name: '熟练者',
                headerBg: 'bg-gradient-to-r from-green-50 to-blue-50',
                headerBorder: 'border-green-200',
                mainBg: 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50',
                levelColor: 'text-green-600',
                xpBarGradient: 'from-green-500 to-teal-500',
                badgeBg: 'from-green-300 via-teal-400 to-blue-500',
                questionBg: 'bg-gradient-to-r from-green-50 to-blue-50',
                questionBorder: 'border-green-200',
                footerBg: 'bg-gradient-to-r from-green-50 to-blue-50',
                footerBorder: 'border-green-200',
                animation: 'pulse',
                specialEffects: ['glow', 'float'],
                icon: '📙',
                description: '熟练掌握技能的熟练者'
            },
            4: {
                name: '专家',
                headerBg: 'bg-gradient-to-r from-purple-50 to-pink-50',
                headerBorder: 'border-purple-200',
                mainBg: 'bg-gradient-to-br from-purple-50 via-pink-50 to-red-50',
                levelColor: 'text-purple-600',
                xpBarGradient: 'from-purple-500 to-pink-500',
                badgeBg: 'from-purple-300 via-pink-400 to-red-500',
                questionBg: 'bg-gradient-to-r from-purple-50 to-pink-50',
                questionBorder: 'border-purple-200',
                footerBg: 'bg-gradient-to-r from-purple-50 to-pink-50',
                footerBorder: 'border-purple-200',
                animation: 'bounce-slow',
                specialEffects: ['glow', 'float', 'sparkle'],
                icon: '🎓',
                description: '领域内的专家级人物'
            },
            5: {
                name: '大师',
                headerBg: 'bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50',
                headerBorder: 'border-yellow-300',
                mainBg: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50',
                levelColor: 'text-yellow-600',
                xpBarGradient: 'from-yellow-500 via-orange-500 to-red-500',
                badgeBg: 'from-yellow-300 via-orange-400 to-red-500',
                questionBg: 'bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50',
                questionBorder: 'border-yellow-300',
                footerBg: 'bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50',
                footerBorder: 'border-yellow-300',
                animation: 'bounce',
                specialEffects: ['glow', 'float', 'sparkle', 'fire'],
                icon: '👑',
                description: '技艺精湛的大师级人物'
            },
            6: {
                name: '宗师',
                headerBg: 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50',
                headerBorder: 'border-indigo-300',
                mainBg: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50',
                levelColor: 'text-indigo-600',
                xpBarGradient: 'from-indigo-500 via-purple-500 to-pink-500',
                badgeBg: 'from-indigo-300 via-purple-400 to-pink-500',
                questionBg: 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50',
                questionBorder: 'border-indigo-300',
                footerBg: 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50',
                footerBorder: 'border-indigo-300',
                animation: 'pulse-fast',
                specialEffects: ['glow', 'float', 'sparkle', 'fire', 'rainbow'],
                icon: '🌟',
                description: '开宗立派的宗师级人物'
            },
            7: {
                name: '传奇',
                headerBg: 'bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50',
                headerBorder: 'border-teal-300',
                mainBg: 'bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50',
                levelColor: 'text-teal-600',
                xpBarGradient: 'from-teal-500 via-cyan-500 to-blue-500',
                badgeBg: 'from-teal-300 via-cyan-400 to-blue-500',
                questionBg: 'bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50',
                questionBorder: 'border-teal-300',
                footerBg: 'bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50',
                footerBorder: 'border-teal-300',
                animation: 'spin-slow',
                specialEffects: ['glow', 'float', 'sparkle', 'fire', 'rainbow', 'nebula'],
                icon: '⚡',
                description: '传说中的传奇人物'
            },
            8: {
                name: '神话',
                headerBg: 'bg-gradient-to-r from-red-50 via-pink-50 to-purple-50',
                headerBorder: 'border-red-300',
                mainBg: 'bg-gradient-to-br from-red-50 via-pink-50 to-purple-50',
                levelColor: 'text-red-600',
                xpBarGradient: 'from-red-500 via-pink-500 to-purple-500',
                badgeBg: 'from-red-300 via-pink-400 to-purple-500',
                questionBg: 'bg-gradient-to-r from-red-50 via-pink-50 to-purple-50',
                questionBorder: 'border-red-300',
                footerBg: 'bg-gradient-to-r from-red-50 via-pink-50 to-purple-50',
                footerBorder: 'border-red-300',
                animation: 'pulse-rainbow',
                specialEffects: ['glow', 'float', 'sparkle', 'fire', 'rainbow', 'nebula', 'galaxy'],
                icon: '🔥',
                description: '神话般的存在'
            },
            9: {
                name: '不朽',
                headerBg: 'bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200',
                headerBorder: 'border-gray-400',
                mainBg: 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200',
                levelColor: 'text-gray-800',
                xpBarGradient: 'from-gray-500 via-gray-600 to-gray-700',
                badgeBg: 'from-gray-300 via-gray-400 to-gray-500',
                questionBg: 'bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200',
                questionBorder: 'border-gray-400',
                footerBg: 'bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200',
                footerBorder: 'border-gray-400',
                animation: 'glow-eternal',
                specialEffects: ['glow', 'float', 'sparkle', 'fire', 'rainbow', 'nebula', 'galaxy', 'eternal'],
                icon: '💎',
                description: '永恒不朽的存在'
            },
            10: {
                name: '神明',
                headerBg: 'bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300',
                headerBorder: 'border-yellow-500',
                mainBg: 'bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300',
                levelColor: 'text-yellow-800',
                xpBarGradient: 'from-yellow-600 via-yellow-700 to-yellow-800',
                badgeBg: 'from-yellow-400 via-yellow-500 to-yellow-600',
                questionBg: 'bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300',
                questionBorder: 'border-yellow-500',
                footerBg: 'bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300',
                footerBorder: 'border-yellow-500',
                animation: 'divine-glow',
                specialEffects: ['glow', 'float', 'sparkle', 'fire', 'rainbow', 'nebula', 'galaxy', 'eternal', 'divine'],
                icon: '✨',
                description: '如同神明般的存在'
            }
        };
        
        this.currentLevel = 1;
        this.previousLevel = 1;
    }

    // 获取等级配置
    getLevelConfig(level) {
        const maxLevel = Math.max(...Object.keys(this.levelConfigs).map(Number));
        const actualLevel = Math.min(level, maxLevel);
        return this.levelConfigs[actualLevel] || this.levelConfigs[1];
    }

    // 应用等级样式
    applyLevelStyles(level, suppressAnimation = false) {
        this.previousLevel = this.currentLevel;
        this.currentLevel = level;
        
        const config = this.getLevelConfig(level);
        
        // 显示等级变化动画（除非被抑制）
        if (!suppressAnimation && this.previousLevel !== level) {
            this.showLevelChangeAnimation(this.previousLevel, level);
        }
        
        // 更新头部样式
        const header = document.querySelector('header');
        header.className = `fixed top-0 left-0 right-0 ${config.headerBg} ${config.headerBorder} py-2 z-20 transition-all duration-1000`;
        
        // 更新等级显示颜色和图标
        const levelEl = document.getElementById('level');
        levelEl.innerHTML = `${config.icon} Lv.${level} ${config.name}`;
        levelEl.className = `${config.levelColor} font-bold transition-all duration-1000`;
        
        // 更新经验条
        const xpBar = document.getElementById('xp-bar');
        xpBar.className = `h-full bg-gradient-to-r ${config.xpBarGradient} transition-all duration-1000`;
        
        // 更新勋章背景
        const badgeCollapsed = document.getElementById('badge-collapsed');
        badgeCollapsed.className = `hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${config.badgeBg} text-white text-sm font-bold shadow-lg cursor-pointer transition-all duration-1000 hover:scale-110`;
        
        // 更新主内容区域
        const body = document.querySelector('body');
        body.className = `${config.mainBg} min-h-screen transition-all duration-1000`;
        
        // 更新题目容器
        const questionContainer = document.getElementById('question-container');
        questionContainer.className = `${config.questionBg} rounded ${config.questionBorder} mb-6 overflow-hidden transition-all duration-1000`;
        
        // 更新底部
        const footer = document.querySelector('footer');
        footer.className = `fixed bottom-0 left-0 right-0 ${config.footerBg} ${config.footerBorder} py-3 z-10 transition-all duration-1000`;
        
        // 应用动画效果
        this.applyAnimations(config);
        
        // 应用特殊效果
        this.applySpecialEffects(config);
        
        console.log(`等级 ${level} 样式已应用: ${config.name}`);
    }

    // 显示等级变化动画
    showLevelChangeAnimation(oldLevel, newLevel) {
        if (oldLevel === newLevel) return;
        
        const isUpgrade = newLevel > oldLevel;
        
        // 使用弹窗队列系统，避免动画冲突
        const animationFunction = () => {
            const animationEl = document.createElement('div');
            animationEl.className = 'fixed inset-0 flex items-center justify-center z-50';
            
            const oldConfig = this.getLevelConfig(oldLevel);
            const newConfig = this.getLevelConfig(newLevel);
            
            if (isUpgrade) {
                // 升级动画 - 参考learn.html中的showLevelUpAnimation
                animationEl.innerHTML = `
                    <div class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg p-8 shadow-2xl text-white text-center flex flex-col justify-center items-center animate-pulse" style="width: 300px; height: 300px; border: 4px solid gold; box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);">
                        <div class="text-8xl mb-4 animate-bounce">🎉</div>
                        <h3 class="text-3xl font-bold mb-2 text-yellow-300">升级啦！</h3>
                        <p class="text-xl mb-2">现在你是 <span class="font-bold text-yellow-300 text-2xl">${newConfig.icon} Lv.${newLevel}</span></p>
                        <p class="text-sm opacity-90 max-w-[250px]">${newConfig.description}</p>
                        <div class="mt-4 text-2xl">✨🌟⭐️</div>
                    </div>
                `;
                
                // 播放升级音效
                if (window.playLevelUpSound) {
                    window.playLevelUpSound();
                }
                
                // 添加升级彩带效果
                this.createConfettiEffect();
                
                // 添加额外的烟花效果
                setTimeout(() => {
                    this.createFireworksEffect();
                }, 500);
                
            } else {
                // 降级动画 - 参考learn.html中的降级处理
                animationEl.innerHTML = `
                    <div class="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-lg p-8 shadow-2xl text-white text-center flex flex-col justify-center items-center animate-pulse" style="width: 300px; height: 300px; border: 4px solid #666; box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);">
                        <div class="text-8xl mb-4 animate-shake">💔</div>
                        <h3 class="text-3xl font-bold mb-2 text-red-300">等级下降</h3>
                        <p class="text-xl mb-2">从 <span class="font-bold text-gray-300">${oldConfig.icon} Lv.${oldLevel}</span> 降到 <span class="font-bold text-red-300">${newConfig.icon} Lv.${newLevel}</span></p>
                        <p class="text-sm opacity-90 max-w-[250px]">继续努力，重新升级！</p>
                        <div class="mt-4 text-2xl">💪🔥⚡</div>
                    </div>
                `;
                
                // 播放降级音效（如果有）
                if (window.playWrongSound) {
                    window.playWrongSound();
                }
                
                // 添加降级特效
                this.createLevelDownEffect();
            }
            
            document.body.appendChild(animationEl);
            
            setTimeout(() => {
                if (animationEl.parentElement) {
                    animationEl.remove();
                }
            }, 4000);
        };
        
        // 如果存在弹窗队列系统，使用队列，否则直接执行
        if (window.popupQueue && window.showNextPopup) {
            window.popupQueue.push(animationFunction);
            window.showNextPopup();
        } else {
            animationFunction();
        }
    }

    // 应用动画效果
    applyAnimations(config) {
        const levelEl = document.getElementById('level');
        
        // 移除所有动画类
        const animationClasses = ['animate-pulse', 'animate-bounce', 'animate-pulse-slow', 'animate-pulse-fast', 'animate-spin-slow', 'animate-pulse-rainbow', 'animate-glow-eternal', 'animate-divine-glow'];
        animationClasses.forEach(cls => levelEl.classList.remove(cls));
        
        // 添加新的动画类
        if (config.animation && config.animation !== 'none') {
            levelEl.classList.add(`animate-${config.animation}`);
        }
    }

    // 应用特殊效果
    applySpecialEffects(config) {
        // 清除之前的特殊效果
        this.clearSpecialEffects();
        
        // 应用新的特殊效果
        config.specialEffects.forEach(effect => {
            const methodName = `apply${effect.charAt(0).toUpperCase() + effect.slice(1)}Effect`;
            if (typeof this[methodName] === 'function') {
                this[methodName]();
            }
        });
    }

    // 清除特殊效果
    clearSpecialEffects() {
        const effects = document.querySelectorAll('.special-effect');
        effects.forEach(effect => effect.remove());
    }

    // 各种特殊效果的具体实现
    applySubtleGlowEffect() {
        const style = document.createElement('style');
        style.className = 'special-effect';
        style.textContent = `
            .level-subtle-glow {
                text-shadow: 0 0 5px currentColor;
            }
        `;
        document.head.appendChild(style);
        
        const levelEl = document.getElementById('level');
        levelEl.classList.add('level-subtle-glow');
    }

    applyGlowEffect() {
        const style = document.createElement('style');
        style.className = 'special-effect';
        style.textContent = `
            .level-glow {
                text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
            }
        `;
        document.head.appendChild(style);
        
        const levelEl = document.getElementById('level');
        levelEl.classList.add('level-glow');
    }

    applyFloatEffect() {
        const style = document.createElement('style');
        style.className = 'special-effect';
        style.textContent = `
            .level-float {
                animation: float 3s ease-in-out infinite;
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-3px); }
            }
        `;
        document.head.appendChild(style);
        
        const levelEl = document.getElementById('level');
        levelEl.classList.add('level-float');
    }

    applySparkleEffect() {
        const sparkleContainer = document.createElement('div');
        sparkleContainer.className = 'special-effect fixed inset-0 pointer-events-none z-0';
        sparkleContainer.innerHTML = `
            <style>
                .sparkle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: gold;
                    border-radius: 50%;
                    animation: sparkle 2s linear infinite;
                    pointer-events: none;
                }
                @keyframes sparkle {
                    0% { opacity: 0; transform: scale(0); }
                    50% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0); }
                }
            </style>
        `;
        document.body.appendChild(sparkleContainer);
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.animationDelay = Math.random() * 2 + 's';
                sparkleContainer.appendChild(sparkle);
            }, i * 100);
        }
    }

    applyFireEffect() {
        const style = document.createElement('style');
        style.className = 'special-effect';
        style.textContent = `
            .level-fire {
                background: linear-gradient(45deg, #ff6b35, #ff8e53, #ffb142);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        `;
        document.head.appendChild(style);
        
        const levelEl = document.getElementById('level');
        levelEl.classList.add('level-fire');
    }

    applyRainbowEffect() {
        const style = document.createElement('style');
        style.className = 'special-effect';
        style.textContent = `
            .level-rainbow {
                background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                background-size: 400% 400%;
                animation: rainbow 3s ease-in-out infinite;
            }
            @keyframes rainbow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
        
        const levelEl = document.getElementById('level');
        levelEl.classList.add('level-rainbow');
    }

    applyNebulaEffect() {
        const nebulaContainer = document.createElement('div');
        nebulaContainer.className = 'special-effect fixed inset-0 pointer-events-none z-0';
        nebulaContainer.innerHTML = `
            <style>
                .nebula-particle {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    border-radius: 50%;
                    animation: nebula 10s linear infinite;
                    pointer-events: none;
                }
                @keyframes nebula {
                    0% { opacity: 0; transform: translate(0, 0) scale(0); }
                    50% { opacity: 0.3; transform: translate(100px, 50px) scale(1); }
                    100% { opacity: 0; transform: translate(200px, 100px) scale(0); }
                }
            </style>
        `;
        document.body.appendChild(nebulaContainer);
        
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'nebula-particle';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            nebulaContainer.appendChild(particle);
        }
    }

    applyGalaxyEffect() {
        const galaxyContainer = document.createElement('div');
        galaxyContainer.className = 'special-effect fixed inset-0 pointer-events-none z-0';
        galaxyContainer.innerHTML = `
            <style>
                .galaxy-star {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    background: white;
                    border-radius: 50%;
                    animation: twinkle 2s ease-in-out infinite;
                    pointer-events: none;
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 1; }
                }
            </style>
        `;
        document.body.appendChild(galaxyContainer);
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'galaxy-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 2 + 's';
            galaxyContainer.appendChild(star);
        }
    }

    applyEternalEffect() {
        const style = document.createElement('style');
        style.className = 'special-effect';
        style.textContent = `
            .level-eternal {
                animation: eternal 5s ease-in-out infinite;
            }
            @keyframes eternal {
                0%, 100% { 
                    filter: drop-shadow(0 0 5px gold) drop-shadow(0 0 10px gold);
                }
                50% { 
                    filter: drop-shadow(0 0 10px gold) drop-shadow(0 0 20px gold);
                }
            }
        `;
        document.head.appendChild(style);
        
        const levelEl = document.getElementById('level');
        levelEl.classList.add('level-eternal');
    }

    applyDivineEffect() {
        const style = document.createElement('style');
        style.className = 'special-effect';
        style.textContent = `
            .level-divine {
                background: linear-gradient(45deg, #ffd700, #ffed4e, #fffacd, #ffed4e, #ffd700);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            }
        `;
        document.head.appendChild(style);
        
        const levelEl = document.getElementById('level');
        levelEl.classList.add('level-divine');
    }

    // 创建彩带效果 - 参考learn.html中的createConfettiEffect
    createConfettiEffect() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#ff9f43', '#ff7979', '#badc58', '#686de0'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                // 随机形状：方形、圆形、三角形
                const shapes = ['square', 'circle', 'triangle'];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                let shapeStyle = '';
                if (shape === 'circle') {
                    shapeStyle = 'border-radius: 50%;';
                } else if (shape === 'triangle') {
                    shapeStyle = 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%); width: 12px; height: 12px;';
                }
                
                confetti.style.cssText = `
                    position: fixed;
                    width: ${shape === 'triangle' ? '12px' : '10px'};
                    height: ${shape === 'triangle' ? '12px' : '10px'};
                    background: ${color};
                    top: -20px;
                    left: ${Math.random() * 100}vw;
                    ${shapeStyle}
                    pointer-events: none;
                    z-index: 40;
                    animation: confetti ${2 + Math.random()}s ease-out forwards;
                    transform: rotate(${Math.random() * 360}deg);
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentElement) {
                        confetti.remove();
                    }
                }, 4000);
            }, i * 30);
        }
    }

    // 创建烟花效果 - 参考learn.html中的createFireworksEffect
    createFireworksEffect() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3', '#686de0'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                firework.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: ${color};
                    border-radius: 50%;
                    top: ${Math.random() * 60 + 20}vh;
                    left: ${Math.random() * 80 + 10}vw;
                    pointer-events: none;
                    z-index: 40;
                    animation: fireworks 1.5s ease-out forwards;
                    box-shadow: 0 0 10px ${color};
                `;
                
                document.body.appendChild(firework);
                
                setTimeout(() => {
                    if (firework.parentElement) {
                        firework.remove();
                    }
                }, 1500);
            }, i * 100);
        }
    }

    // 创建降级特效
    createLevelDownEffect() {
        // 添加震动效果
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            @keyframes red-pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
                70% { box-shadow: 0 0 0 20px rgba(255, 0, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
            }
            @keyframes particle-fall {
                0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                100% { transform: translate(${Math.random() * 200 - 100}px, 100vh) rotate(360deg); opacity: 0; }
            }
            .animate-shake {
                animation: shake 0.5s ease-in-out;
            }
        `;
        document.head.appendChild(style);
        
        // 添加红色脉冲效果
        const pulseEl = document.createElement('div');
        pulseEl.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 35;
            animation: red-pulse 1s ease-out;
        `;
        document.body.appendChild(pulseEl);
        
        setTimeout(() => {
            if (pulseEl.parentElement) {
                pulseEl.remove();
            }
        }, 1000);
        
        // 添加破碎粒子效果
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const randomX = Math.random() * 200 - 100; // -100px 到 100px 的随机偏移
                
                particle.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: #ff6b6b;
                    border-radius: 50%;
                    top: 50vh;
                    left: 50vw;
                    pointer-events: none;
                    z-index: 40;
                    animation: particle-fall 2s ease-out forwards;
                `;
                
                // 为每个粒子创建独立的动画
                const particleStyle = document.createElement('style');
                particleStyle.textContent = `
                    @keyframes particle-fall-${i} {
                        0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                        100% { transform: translate(${randomX}px, 100vh) rotate(360deg); opacity: 0; }
                    }
                `;
                document.head.appendChild(particleStyle);
                
                particle.style.animation = `particle-fall-${i} 2s ease-out forwards`;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentElement) {
                        particle.remove();
                    }
                    if (particleStyle.parentElement) {
                        particleStyle.remove();
                    }
                }, 2000);
            }, i * 20);
        }
    }
}

// 创建全局实例
window.levelStyles = new LevelStyles();