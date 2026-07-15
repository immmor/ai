// 当前状态
let currentQuestion = 0;
let completed = [];
let cheerPressTimer = null;
let cheerPressStart = 0;
let badges = [];
let totalCorrectAnswers = 0;
let consecutiveCorrect = 0;
let comboCount = 0; // 连续答对次数（5秒内）
let lastCorrectTime = 0; // 上次答对时间戳
const COMBO_TIME_LIMIT = 5000; // 5秒时间限制
let randomQuestions = []; // 随机题目数组
let currentRandomIndex = 0; // 当前随机题目索引
let currentQuestionBank = 'questions';
const username = localStorage.getItem('username');
if (username !== 'immmor') {
    currentQuestionBank = 'questionsenglish';
}

// 游戏化状态
let xp = 0;
let level = 1;
let streakDays = 0;
let lastPlayDate = null;
let totalPlayTime = 0;
let sessionStartTime = Date.now();
let questionStartTime = Date.now();

// 弹窗队列系统
const popupQueue = [];
let isPopupShowing = false;

// DOM元素（先声明变量，在init中初始化）
let questionContainer;
let answerContainer;
let feedbackEl;
let hintBtn;
let prevBtn;
let nextBtn;
let progressEl;
let hintModal;
let hintTextEl;
let closeHintBtn;
let answerModal;
let answerTextEl;
let closeAnswerBtn;
let answerBtn;
let cheerBtn;
let speechBtn;
let particlesContainer;
let cheerAnimation;
let badgeContainer;
let levelEl;
let xpEl;
let xpBar;

// 全局变量跟踪当前语音播报状态
let currentUtterance = null;
let isSpeaking = false;
let isPaused = false;

// 初始化
function init() {
    // 等待DOM完全加载
    if (document.readyState === 'loading') {
        // 初始化
// 改为DOMContentLoaded事件触发，确保DOM完全加载后再执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
        return;
    }
    
    // 重新获取DOM元素（防止DOM未加载完成）
    questionContainer = document.getElementById('question-container');
    answerContainer = document.getElementById('answer-container');
    feedbackEl = document.getElementById('feedback');
    hintBtn = document.getElementById('hint-btn');
    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');
    progressEl = document.getElementById('progress');
    hintModal = document.getElementById('hint-modal');
    hintTextEl = document.getElementById('hint-text');
    closeHintBtn = document.getElementById('close-hint');
    answerModal = document.getElementById('answer-modal');
    answerTextEl = document.getElementById('answer-text');
    closeAnswerBtn = document.getElementById('close-answer');
    answerBtn = document.getElementById('answer-btn');
    cheerBtn = document.getElementById('cheer-btn');
    speechBtn = document.getElementById('speech-btn');
    particlesContainer = document.getElementById('particles-container');
    cheerAnimation = document.getElementById('cheer-animation');
    badgeContainer = document.getElementById('badge-container');
    levelEl = document.getElementById('level');
    xpEl = document.getElementById('xp');
    xpBar = document.getElementById('xp-bar');
    
    // 检查关键DOM元素是否存在
    if (!questionContainer) {
        console.error('Critical DOM element not found: question-container');
        return;
    }
    
    initRandomQuestions();
    initEnergy();
    loadQuestion(currentRandomIndex);
    setupEvents();
    loadBadges();
    loadGameStats();
    
    // 初始化等级样式系统
    if (window.LevelStyles) {
        window.levelStyles = new LevelStyles();
    }
    
    // 初始化学习模式系统
    if (window.StudyModeSystem) {
        window.studyModeSystem = new StudyModeSystem();
    }
    
    // 初始化时抑制动画
    updateGameStats(true);
    startSessionTimer();
    setupBadgeToggle();
    setupQuestionBankToggle();
    if (window.filterQuestionBankOptions) window.filterQuestionBankOptions();
    
    // 初始化音频上下文（需要用户交互）
    document.addEventListener('click', function initAudio() {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
        document.removeEventListener('click', initAudio);
    });
}

// 弹窗队列管理
function showNextPopup() {
    if (popupQueue.length > 0 && !isPopupShowing) {
        isPopupShowing = true;
        const popup = popupQueue.shift();
        popup();
        
        // 3秒后显示下一个弹窗
        setTimeout(() => {
            isPopupShowing = false;
            showNextPopup();
        }, 3000);
    }
}

// 加载游戏统计数据
function loadGameStats() {
    const savedStats = localStorage.getItem('goBlockchainGameStats');
    if (savedStats) {
        const stats = JSON.parse(savedStats);
        xp = stats.xp || 0;
        level = stats.level || 1;
        streakDays = stats.streakDays || 0;
        lastPlayDate = stats.lastPlayDate;
        totalPlayTime = stats.totalPlayTime || 0;
        
        // 检查连续登录
        checkDailyStreak();
    }
}

// 保存游戏统计数据
function saveGameStats() {
    const stats = {
        xp,
        level,
        streakDays,
        lastPlayDate: new Date().toISOString(),
        totalPlayTime
    };
    localStorage.setItem('goBlockchainGameStats', JSON.stringify(stats));
}

// 检查每日连续登录
function checkDailyStreak() {
    const today = new Date().toDateString();
    if (lastPlayDate) {
        const lastDate = new Date(lastPlayDate).toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate === yesterday.toDateString()) {
            streakDays++;
        } else if (lastDate !== today) {
            streakDays = 1; // 重新开始
        }
    } else {
        streakDays = 1;
    }
}

// 更新游戏统计显示
function updateGameStats(suppressAnimation = false) {
    levelEl.textContent = `Lv.${level}`;
    const xpNeeded = level * 100;
    xpEl.textContent = `${xp}/${xpNeeded}`;
    const xpPercentage = Math.min((xp / xpNeeded) * 100, 100);
    xpBar.style.width = `${xpPercentage}%`;
    
    // 应用等级样式
    if (window.levelStyles) {
        window.levelStyles.applyLevelStyles(level, suppressAnimation);
    }
}

// 添加经验值
function addXP(amount, reason = '') {
    const oldLevel = level;
    xp += amount;
    
    // 检查升级
    const xpNeeded = level * 100;
    if (xp >= xpNeeded) {
        level++;
        xp = xp - xpNeeded;
        showLevelUpAnimation();
    }
    
    updateGameStats();
    saveGameStats();
    
    // 显示经验值获得动画
    showXPGainAnimation(amount, reason);
}

// 显示经验值获得动画
function showXPGainAnimation(amount, reason) {
    const xpEl = document.createElement('div');
    xpEl.className = 'fixed top-20 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold z-40 animate-bounce-in';
    xpEl.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="text-yellow-300 text-lg">✨</span>
            <span class="font-bold">+${amount} XP</span>
            ${reason ? `<span class="text-green-100 text-xs">(${reason})</span>` : ''}
            <span class="text-yellow-300 text-lg">✨</span>
        </div>
    `;
    
    // 添加发光效果
    xpEl.style.boxShadow = '0 0 20px rgba(72, 187, 120, 0.6)';
    
    document.body.appendChild(xpEl);
    
    // 动画效果：向上漂浮并淡出
    let opacity = 1;
    let position = 80; // 初始位置
    
    const animate = () => {
        opacity -= 0.02;
        position -= 1;
        
        xpEl.style.opacity = opacity;
        xpEl.style.top = `${position}px`;
        
        if (opacity <= 0) {
            if (xpEl.parentElement) {
                xpEl.remove();
            }
            return;
        }
        
        requestAnimationFrame(animate);
    };
    
    // 延迟开始动画
    setTimeout(() => {
        animate();
    }, 500);
    
    // 2秒后强制移除（安全措施）
    setTimeout(() => {
        if (xpEl.parentElement) {
            xpEl.remove();
        }
    }, 2500);
}

// 显示经验值扣除动画
function showXPLossAnimation(amount, reason) {
    const xpEl = document.createElement('div');
    xpEl.className = 'fixed top-20 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold z-40 animate-bounce-in';
    xpEl.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="text-red-200 text-lg">💸</span>
            <span class="font-bold">-${amount} XP</span>
            ${reason ? `<span class="text-red-100 text-xs">(${reason})</span>` : ''}
            <span class="text-red-200 text-lg">💸</span>
        </div>
    `;
    
    // 添加发光效果
    xpEl.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
    
    document.body.appendChild(xpEl);
    
    // 动画效果：向上漂浮并淡出
    let opacity = 1;
    let position = 80; // 初始位置
    
    const animate = () => {
        opacity -= 0.02;
        position -= 1;
        
        xpEl.style.opacity = opacity;
        xpEl.style.top = `${position}px`;
        
        if (opacity <= 0) {
            if (xpEl.parentElement) {
                xpEl.remove();
            }
            return;
        }
        
        requestAnimationFrame(animate);
    };
    
    // 延迟开始动画
    setTimeout(() => {
        animate();
    }, 500);
    
    // 2秒后强制移除（安全措施）
    setTimeout(() => {
        if (xpEl.parentElement) {
            xpEl.remove();
        }
    }, 2500);
}

// 显示升级动画
function showLevelUpAnimation() {
    popupQueue.push(() => {
        const levelUpEl = document.createElement('div');
        levelUpEl.className = 'fixed inset-0 flex items-center justify-center z-50';
        levelUpEl.innerHTML = `
            <div class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg p-8 shadow-2xl text-white text-center flex flex-col justify-center items-center animate-pulse" style="width: 300px; height: 300px; border: 4px solid gold; box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);">
                <div class="text-8xl mb-4 animate-bounce">🎉</div>
                <h3 class="text-3xl font-bold mb-2 text-yellow-300">升级啦！</h3>
                <p class="text-xl mb-2">现在你是 <span class="font-bold text-yellow-300 text-2xl">Lv.${level}</span></p>
                <p class="text-sm opacity-90 max-w-[250px]">继续学习，解锁更多成就！</p>
                <div class="mt-4 text-2xl">✨🌟⭐️</div>
            </div>
        `;
        document.body.appendChild(levelUpEl);
        
        // 播放升级音效
        playLevelUpSound();
        
        // 添加升级彩带效果
        createConfettiEffect();
        
        // 添加额外的烟花效果
        setTimeout(() => {
            createFireworksEffect();
        }, 500);
        
        setTimeout(() => {
            if (levelUpEl.parentElement) {
                levelUpEl.remove();
            }
        }, 4000);
    });
    
    // 启动弹窗队列
    showNextPopup();
}

// 创建彩带效果
function createConfettiEffect() {
    // 创建更多彩带粒子
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
    
    // 添加烟花效果
    createFireworksEffect();
    
    // 添加庆祝文字效果
    createCelebrateTextEffect();
}

// 创建庆祝文字效果
function createCelebrateTextEffect() {
    const texts = ['🎉 太棒了！', '✨ 恭喜！', '🌟 厉害！', '💫 继续加油！', '🎊 真厉害！', '⭐️ 优秀！'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const textEl = document.createElement('div');
            const text = texts[Math.floor(Math.random() * texts.length)];
            
            textEl.style.cssText = `
                position: fixed;
                top: ${Math.random() * 60 + 20}vh;
                left: ${Math.random() * 70 + 15}vw;
                font-size: ${Math.random() * 10 + 20}px;
                font-weight: bold;
                color: ${['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3', '#686de0'][Math.floor(Math.random() * 5)]};
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
                pointer-events: none;
                z-index: 45;
                animation: celebrateText 2s ease-out forwards;
            `;
            textEl.textContent = text;
            
            document.body.appendChild(textEl);
            
            setTimeout(() => {
                if (textEl.parentElement) {
                    textEl.remove();
                }
            }, 2000);
        }, i * 200);
    }
}

// 开始会话计时器
function startSessionTimer() {
    sessionStartTime = Date.now();
    
    // 每分钟保存一次游戏时间
    setInterval(() => {
        totalPlayTime += 1;
        saveGameStats();
        
        // 每5分钟奖励经验值
        if (totalPlayTime % 5 === 0) {
            addXP(5, '坚持学习');
        }
    }, 60000); // 每分钟
}

// 创建粒子效果
function createParticle(x, y, type = 'fire') {
    const particle = document.createElement('div');
    const size = Math.random() * 10 + 5;
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
    `;
    
    if (type === 'fire') {
        particle.style.background = `radial-gradient(circle, #ff6b35, #ff8e53, #ffb142)`;
        particle.style.boxShadow = '0 0 10px #ff6b35';
    } else if (type === 'sparkle') {
        particle.style.background = `radial-gradient(circle, #f1c40f, #f39c12, #e67e22)`;
        particle.style.boxShadow = '0 0 8px #f1c40f';
    }
    
    particlesContainer.appendChild(particle);
    
    // 粒子动画
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 3 + 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let opacity = 1;
    let scale = 1;
    
    function animate() {
        opacity -= 0.02;
        scale -= 0.02;
        
        particle.style.opacity = opacity;
        particle.style.transform = `translate(${vx * 10}px, ${vy * 10}px) scale(${scale})`;
        
        if (opacity <= 0) {
            particle.remove();
            return;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 创建火花效果
function createSparkleEffect(x, y, count = 20) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createParticle(x, y, 'sparkle');
        }, i * 50);
    }
}

// 显示加油动画 - 全新炫酷版本
function showCheerAnimation() {
    cheerAnimation.classList.remove('hidden');
    
    // 创建多种炫酷效果
    createFireworksEffect();
    createEnergyWaveEffect();
    createFloatingTextEffect();
    createGlowingOrbsEffect();
    createParticleExplosionEffect();
    
    // 播放加油音效
    playCheerSound();
    
    // 3秒后隐藏
    setTimeout(() => {
        cheerAnimation.classList.add('hidden');
    }, 3000);
}

// 长按加油功能
function startCheerPress(e) {
    e.preventDefault(); // 防止默认行为
    cheerPressStart = Date.now();
    cheerPressTimer = setInterval(() => {
        const duration = Date.now() - cheerPressStart;
        
        // 根据长按时间改变按钮样式
        if (duration > 1000) {
            cheerBtn.classList.add('text-green-500', 'scale-110');
            cheerBtn.innerHTML = '<i class="fa fa-fire mr-1 text-red-500 animate-pulse"></i> 加油！';
        }
        
        if (duration > 2000) {
            // 触发超炫酷加油动画（无音效）
            createCheerEffect();
            showCheerAnimation();
            
            // 重置按钮状态
            setTimeout(() => {
                cheerBtn.classList.remove('text-green-500', 'scale-110');
                cheerBtn.innerHTML = '<i class="fa fa-fire mr-1 text-orange-500"></i> 加油';
            }, 3000);
            
            clearInterval(cheerPressTimer);
            cheerPressTimer = null;
        }
    }, 100);
}

// 播放正确答题音效
function playCorrectSound() {
    const synth = new Tone.Synth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.001,
            decay: 0.2,
            sustain: 0.3,
            release: 0.2
        }
    }).toDestination();
    
    // 播放欢快的音调
    synth.triggerAttackRelease("C6", "8n");
    setTimeout(() => {
        synth.triggerAttackRelease("E6", "8n");
    }, 100);
    setTimeout(() => {
        synth.triggerAttackRelease("G6", "8n");
    }, 200);
    
    // 播放完成后释放资源
    setTimeout(() => {
        synth.dispose();
    }, 1000);
}

// 播放错误答题音效
function playWrongSound() {
    const synth = new Tone.Synth({
        oscillator: {
            type: "sawtooth"
        },
        envelope: {
            attack: 0.001,
            decay: 0.3,
            sustain: 0.1,
            release: 0.2
        }
    }).toDestination();
    
    // 播放低沉的音调
    synth.triggerAttackRelease("C3", "4n");
    setTimeout(() => {
        synth.triggerAttackRelease("A2", "4n");
    }, 200);
    
    // 播放完成后释放资源
    setTimeout(() => {
        synth.dispose();
    }, 1000);
}

// 创建炫酷红叉效果
function createRedXEffect() {
    // 获取题目容器
    const questionContainer = document.getElementById('question-container');
    if (!questionContainer) return;
    
    // 创建红叉元素
    const redX = document.createElement('div');
    redX.className = 'fixed z-50 pointer-events-none animate-red-x';
    redX.innerHTML = `
        <div class="relative">
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative">
                    <div class="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-60"></div>
                    <div class="relative text-red-500 text-8xl font-bold animate-red-x-pulse">
                        ✕
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 计算屏幕中心位置（无论滚动到哪里都显示在屏幕中间）
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // 设置红叉位置
    redX.style.left = centerX + 'px';
    redX.style.top = centerY + 'px';
    redX.style.transform = 'translate(-50%, -50%)';
    
    // 添加到页面
    document.body.appendChild(redX);
    
    // 添加震动效果到题目容器
    questionContainer.classList.add('animate-shake');
    
    // 1.5秒后移除红叉元素
    setTimeout(() => {
        if (redX.parentElement) {
            redX.remove();
        }
        questionContainer.classList.remove('animate-shake');
    }, 1500);
}

// 创建炫酷绿色对钩效果
function createGreenCheckEffect() {
    // 获取题目容器
    const questionContainer = document.getElementById('question-container');
    if (!questionContainer) return;
    
    // 创建绿色对钩元素
    const greenCheck = document.createElement('div');
    greenCheck.className = 'fixed z-50 pointer-events-none animate-green-check';
    greenCheck.innerHTML = `
        <div class="relative">
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative">
                    <div class="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-60"></div>
                    <div class="relative text-green-500 text-8xl font-bold animate-green-check-pulse">
                        ✓
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 计算屏幕中心位置（无论滚动到哪里都显示在屏幕中间）
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // 设置对钩位置
    greenCheck.style.left = centerX + 'px';
    greenCheck.style.top = centerY + 'px';
    greenCheck.style.transform = 'translate(-50%, -50%)';
    
    // 添加到页面
    document.body.appendChild(greenCheck);
    
    // 1.5秒后移除对钩元素
    setTimeout(() => {
        if (greenCheck.parentElement) {
            greenCheck.remove();
        }
    }, 1500);
}

// 播放升级音效
function playLevelUpSound() {
    const synth = new Tone.Synth({
        oscillator: {
            type: "square"
        },
        envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.2,
            release: 0.3
        }
    }).toDestination();
    
    // 播放庆祝音调
    synth.triggerAttackRelease("C5", "8n");
    setTimeout(() => {
        synth.triggerAttackRelease("E5", "8n");
    }, 100);
    setTimeout(() => {
        synth.triggerAttackRelease("G5", "8n");
    }, 200);
    setTimeout(() => {
        synth.triggerAttackRelease("C6", "8n");
    }, 300);
    
    // 播放完成后释放资源
    setTimeout(() => {
        synth.dispose();
    }, 1500);
}

// 播放加油音效 - 全新激励版本
function playCheerSound() {
    // 使用更丰富的音色组合
    const leadSynth = new Tone.Synth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.01,
            decay: 0.2,
            sustain: 0.3,
            release: 0.5
        }
    }).toDestination();
    
    const bassSynth = new Tone.Synth({
        oscillator: {
            type: "triangle"
        },
        envelope: {
            attack: 0.02,
            decay: 0.3,
            sustain: 0.2,
            release: 0.4
        }
    }).toDestination();
    
    // 播放激励的上升音阶
    leadSynth.triggerAttackRelease("C4", "8n");
    bassSynth.triggerAttackRelease("C3", "8n");
    
    setTimeout(() => {
        leadSynth.triggerAttackRelease("E4", "8n");
        bassSynth.triggerAttackRelease("E3", "8n");
    }, 100);
    
    setTimeout(() => {
        leadSynth.triggerAttackRelease("G4", "8n");
        bassSynth.triggerAttackRelease("G3", "8n");
    }, 200);
    
    setTimeout(() => {
        leadSynth.triggerAttackRelease("C5", "8n");
        bassSynth.triggerAttackRelease("C4", "8n");
    }, 300);
    
    setTimeout(() => {
        leadSynth.triggerAttackRelease("E5", "8n");
    }, 400);
    
    setTimeout(() => {
        leadSynth.triggerAttackRelease("G5", "8n");
    }, 500);
    
    // 添加鼓点效果
    setTimeout(() => {
        const drumSynth = new Tone.MembraneSynth().toDestination();
        drumSynth.triggerAttackRelease("C2", "16n");
        setTimeout(() => {
            drumSynth.dispose();
        }, 500);
    }, 150);
    
    setTimeout(() => {
        const drumSynth = new Tone.MembraneSynth().toDestination();
        drumSynth.triggerAttackRelease("C2", "16n");
        setTimeout(() => {
            drumSynth.dispose();
        }, 500);
    }, 350);
    
    // 播放完成后释放资源
    setTimeout(() => {
        leadSynth.dispose();
        bassSynth.dispose();
    }, 2000);
}

// 创建烟花效果
function createFireworksEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'fixed w-2 h-2 rounded-full z-30 animate-fireworks select-none';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            firework.style.left = Math.random() * 80 + 10 + 'vw';
            firework.style.top = Math.random() * 80 + 10 + 'vh';
            document.body.appendChild(firework);
            
            setTimeout(() => {
                if (firework.parentElement) {
                    firework.remove();
                }
            }, 2000);
        }, i * 200);
    }
}

// 创建能量波效果
function createEnergyWaveEffect() {
    const wave = document.createElement('div');
    wave.className = 'fixed inset-0 z-20 pointer-events-none';
    wave.innerHTML = '<div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 animate-pulse"></div>';
    document.body.appendChild(wave);
    
    setTimeout(() => {
        if (wave.parentElement) {
            wave.remove();
        }
    }, 1500);
}

// 创建浮动文字效果
function createFloatingTextEffect() {
    const texts = ['加油！', '继续努力！', '太棒了！', '坚持就是胜利！', '你可以的！'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const textEl = document.createElement('div');
            textEl.className = 'fixed text-white font-bold text-lg z-30 animate-float select-none';
            textEl.textContent = texts[Math.floor(Math.random() * texts.length)];
            textEl.style.left = Math.random() * 70 + 15 + 'vw';
            textEl.style.top = Math.random() * 70 + 15 + 'vh';
            textEl.style.color = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 5)];
            textEl.style.textShadow = '0 0 10px currentColor, 0 0 20px currentColor';
            document.body.appendChild(textEl);
            
            setTimeout(() => {
                if (textEl.parentElement) {
                    textEl.remove();
                }
            }, 3000);
        }, i * 150);
    }
}

// 创建发光球体效果
function createGlowingOrbsEffect() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const orb = document.createElement('div');
            orb.className = 'fixed rounded-full z-25 animate-glow select-none';
            orb.style.width = Math.random() * 40 + 20 + 'px';
            orb.style.height = orb.style.width;
            orb.style.background = `radial-gradient(circle, ${['#ff6b6b', '#4ecdc4', '#feca57'][Math.floor(Math.random() * 3)]}, transparent)`;
            orb.style.left = Math.random() * 85 + 7.5 + 'vw';
            orb.style.top = Math.random() * 85 + 7.5 + 'vh';
            orb.style.boxShadow = '0 0 20px currentColor, 0 0 40px currentColor';
            document.body.appendChild(orb);
            
            setTimeout(() => {
                if (orb.parentElement) {
                    orb.remove();
                }
            }, 2500);
        }, i * 100);
    }
}

// 创建粒子爆炸效果
function createParticleExplosionEffect() {
    const rect = cheerAnimation.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, 'sparkle');
        }, i * 30);
    }
}

// 创建快速加油效果（单击效果）
function createQuickCheerEffect() {
    const rect = cheerBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 播放轻快的加油音效
    playQuickCheerSound();
    
    // 按钮脉冲动画
    cheerBtn.classList.add('animate-pulse-slow', 'scale-110');
    cheerBtn.style.color = '#10B981';
    cheerBtn.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        cheerBtn.classList.remove('animate-pulse-slow', 'scale-110');
        cheerBtn.style.color = '';
        cheerBtn.style.transform = '';
    }, 500);
    
    // 创建迷你烟花效果
    createMiniFireworks(centerX, centerY);
    
    // 创建能量光环效果
    createEnergyRing(centerX, centerY);
    
    // 创建文字气泡效果
    createTextBubble(centerX, centerY);
    
    // 创建旋转星星效果
    createSpinningStars(centerX, centerY);
}

// 播放快速加油音效
function playQuickCheerSound() {
    const synth = new Tone.Synth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.1,
            release: 0.2
        }
    }).toDestination();
    
    // 播放轻快活泼的音调
    synth.triggerAttackRelease("E5", "16n");
    setTimeout(() => {
        synth.triggerAttackRelease("G5", "16n");
    }, 50);
    setTimeout(() => {
        synth.triggerAttackRelease("C6", "16n");
    }, 100);
    
    // 播放完成后释放资源
    setTimeout(() => {
        synth.dispose();
    }, 500);
}

// 创建迷你烟花效果
function createMiniFireworks(x, y) {
    const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'fixed w-1 h-1 rounded-full z-30 animate-fireworks select-none';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            firework.style.left = (x + Math.random() * 40 - 20) + 'px';
            firework.style.top = (y + Math.random() * 40 - 20) + 'px';
            document.body.appendChild(firework);
            
            setTimeout(() => {
                if (firework.parentElement) {
                    firework.remove();
                }
            }, 1000);
        }, i * 100);
    }
}

// 创建能量光环效果
function createEnergyRing(x, y) {
    const ring = document.createElement('div');
    ring.className = 'fixed rounded-full border-2 z-25 select-none';
    ring.style.width = '0px';
    ring.style.height = '0px';
    ring.style.borderColor = '#10B981';
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    ring.style.transform = 'translate(-50%, -50%)';
    ring.style.boxShadow = '0 0 10px #10B981';
    document.body.appendChild(ring);
    
    // 光环扩散动画
    let size = 0;
    const expand = setInterval(() => {
        size += 5;
        ring.style.width = size + 'px';
        ring.style.height = size + 'px';
        ring.style.opacity = 1 - (size / 100);
        
        if (size > 100) {
            clearInterval(expand);
            if (ring.parentElement) {
                ring.remove();
            }
        }
    }, 16);
}

// 创建文字气泡效果
function createTextBubble(x, y) {
    const texts = ['加油！', '坚持！', '努力！', '冲鸭！', '棒！'];
    const text = texts[Math.floor(Math.random() * texts.length)];
    
    const bubble = document.createElement('div');
    bubble.className = 'fixed text-xs font-bold text-white bg-green-500 px-2 py-1 rounded-full z-30 select-none';
    bubble.textContent = text;
    bubble.style.left = (x + 30) + 'px';
    bubble.style.top = (y - 20) + 'px';
    bubble.style.transform = 'translateY(-20px)';
    bubble.style.opacity = '0';
    bubble.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.5)';
    document.body.appendChild(bubble);
    
    // 气泡上升动画
    let position = -20;
    const rise = setInterval(() => {
        position -= 1;
        bubble.style.transform = `translateY(${position}px)`;
        bubble.style.opacity = (1 - Math.abs(position) / 50).toString();
        
        if (position < -50) {
            clearInterval(rise);
            if (bubble.parentElement) {
                bubble.remove();
            }
        }
    }, 30);
}

// 创建旋转星星效果
function createSpinningStars(x, y) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'fixed text-yellow-400 z-30 select-none';
            star.innerHTML = '★';
            star.style.fontSize = '12px';
            star.style.left = (x + Math.random() * 30 - 15) + 'px';
            star.style.top = (y + Math.random() * 30 - 15) + 'px';
            star.style.textShadow = '0 0 8px yellow';
            document.body.appendChild(star);
            
            setTimeout(() => {
                if (star.parentElement) {
                    star.remove();
                }
            }, 1500);
        }, i * 200);
    }
}

// 超炫酷加油效果
function createCheerEffect() {
    // 创建爆炸粒子效果
    createExplosionEffect();
    
    // 按钮超炫酷动画
    cheerBtn.classList.add('animate-explosion');
    cheerBtn.style.textShadow = '0 0 10px #ff6b35, 0 0 20px #ff8e53, 0 0 30px #ffb142';
    
    setTimeout(() => {
        cheerBtn.classList.remove('animate-explosion');
        cheerBtn.style.textShadow = '';
    }, 2000);
}

// 创建爆炸粒子效果
function createExplosionEffect() {
    const rect = cheerBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, 'fire');
        }, i * 50);
    }
}

function stopCheerPress() {
    if (cheerPressTimer) {
        clearInterval(cheerPressTimer);
        cheerPressTimer = null;
        
        // 如果长按时间不足，显示小火花
        if (Date.now() - cheerPressStart < 1000) {
            createSparkleEffect(cheerBtn.getBoundingClientRect().left + 20, cheerBtn.getBoundingClientRect().top + 10, 5);
        }
    }
}

// 加载题目
function loadQuestion(index) {
    // 检查能量是否充足
    if (!hasEnoughEnergy()) {
        showFeedback('能量不足，请等待能量恢复后再继续学习！', 'error');
        return false;
    }
    
    // 清除之前的计时器
    if (window.clearQuestionTimer) {
        window.clearQuestionTimer();
    }
    
    // 消耗1点能量
    consumeEnergy();
    
    // 使用随机题目数组
    const questionIndex = randomQuestions[index];
    const question = getCurrentQuestions()[questionIndex];

    // 切换到新题目时停止语音播放
    if (isSpeaking || isPaused) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        isPaused = false;
        currentUtterance = null;
        
        // 恢复标题语音按钮样式
        updateSpeechButtonState('stop');
    }
    
    // 更新题目内容
    questionContainer.innerHTML = `
        <div class="bg-gray-50 px-4 h-12 border-b border-gray-200 text-xs text-gray-500 flex justify-between items-center">
            <span>${getBankDisplayName(currentQuestionBank)} ${index + 1}/${randomQuestions.length}: ${question.title}</span>
            <div class="flex items-center">
                <span id="question-timer" class="mr-2 text-gray-600 font-medium">0秒</span>
                <span id="question-correct-count" class="mr-1 text-xs text-green-600 font-medium">0</span>
                <span id="question-wrong-count" class="text-xs text-red-600 font-medium">0</span>
                ${question.type === "sentence" ? '<button id="speech-lang-btn" class="ml-1 text-gray-400 hover:text-purple-500 transition-colors p-1" title="选择播报语言"><i class="fa fa-globe text-xxs"></i></button><button id="title-speech-btn" class="ml-1 text-gray-500 hover:text-purple-500 flex items-center transition-all duration-300 select-none" title="语音播报 (快捷键: Ctrl+B/Command+B)"><i class="fa fa-volume-up mr-2 text-purple-500"></i></button>' : ''}
            </div>
        </div>
        ${question.type === "sentence" ? '' : question.content}
    `;
    
    // 滚动到页面顶部，确保题目从最上面开始展示
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 根据题目类型生成答题区域
    if (question.type === "fill") {
        answerContainer.innerHTML = `
            <div class="text-xs text-gray-500 mb-2">${question.instruction}</div>
            <div class="flex">
                <input type="text" id="answer-input" class="flex-grow px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" placeholder="在此输入...">
                <button id="submit-btn" class="bg-primary text-white px-4 py-2 rounded-r hover:bg-primary/90 text-sm">
                    提交
                </button>
            </div>
            <div class="flex justify-center mt-3">
                <button id="ai-explain-btn" class="text-indigo-500 hover:text-indigo-600 flex items-center text-sm">
                    <i class="fas fa-robot mr-1"></i> AI解析
                </button>
            </div>
        `;
        
        // 高亮填空
        document.querySelector('.code-blank').classList.add('ring-2', 'ring-primary');
        
        // 聚焦输入框
        setTimeout(() => {
            document.getElementById('answer-input').focus();
        }, 100);
    } 
    else if (question.type === "select") {
        let optionsHtml = '';
        
        // 创建选项副本并打乱顺序
        const shuffledOptions = [...question.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }
        
        // 存储打乱后的选项和原始正确选项的映射关系
        const shuffledCorrectIndex = shuffledOptions.findIndex(option => option === question.options[question.correct]);
        
        shuffledOptions.forEach((option, i) => {
            optionsHtml += `
                <div class="border border-gray-200 rounded p-3 mb-2 option-hover cursor-pointer" data-index="${i}" data-original-index="${shuffledCorrectIndex === i ? question.correct : -1}">
                    <div class="font-mono text-sm">${String.fromCharCode(65 + i)}. ${option}</div>
                </div>
            `;
        });
        
        answerContainer.innerHTML = `
            <div class="mt-2">${optionsHtml}</div>
            <div class="flex justify-center mt-3">
                <button id="ai-explain-btn" class="text-indigo-500 hover:text-indigo-600 flex items-center text-sm">
                    <i class="fas fa-robot mr-1"></i> AI解析
                </button>
            </div>
        `;
    }
    else if (question.type === "correct") {
        answerContainer.innerHTML = `
            <div class="text-xs text-gray-500 mb-2">${question.instruction}</div>
            <div class="flex">
                <input type="text" id="answer-input" class="flex-grow px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm" placeholder="输入修正后的内容...">
                <button id="submit-btn" class="bg-primary text-white px-4 py-2 rounded-r hover:bg-primary/90 text-sm">
                    修正
                </button>
            </div>
            <div class="flex justify-center mt-3">
                <button id="ai-explain-btn" class="text-indigo-500 hover:text-indigo-600 flex items-center text-sm">
                    <i class="fas fa-robot mr-1"></i> AI解析
                </button>
            </div>
        `;
        
        // 聚焦输入框
        setTimeout(() => {
            document.getElementById('answer-input').focus();
        }, 100);
    }
    else if (question.type === "sentence") {
        // 句子记忆题：直接在句子中填空
        answerContainer.innerHTML = `
            <div class="space-y-4">
                <div id="sentence-fill-stage">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <div id="sentence-content" class="text-sm leading-relaxed">
                            ${question.content}
                        </div>
                    </div>
                    <div class="flex justify-end mt-3">
                        <button id="fill-submit-btn" class="bg-primary text-white px-5 py-2 rounded hover:bg-primary/90 text-sm">
                            检查填空
                        </button>
                    </div>
                </div>
                <div id="sentence-review" class="hidden">
                    <div class="text-sm text-gray-600 mb-3 ml-2">现在请重新输入完整句子以加强记忆</div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <div id="sentence-review-content" class="text-sm leading-relaxed">
                            <!-- 第二阶段打散句子格子将在这里动态生成 -->
                        </div>
                    </div>
                    <div class="flex justify-end mt-3">
                        <button id="sentence-submit-btn" class="bg-primary text-white px-5 py-2 rounded hover:bg-primary/90 text-sm">
                            提交
                        </button>
                    </div>
                </div>
                <div id="sentence-recording" class="hidden">
                    <div class="text-center mb-4">
                        <div class="text-sm text-gray-600 font-medium">现在请朗读完整句子</div>
                    </div>
                    <div class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                        <div id="sentence-recording-content" class="text-sm leading-relaxed text-center font-medium text-gray-800">
                            <!-- 完整句子将在这里显示 -->
                        </div>
                    </div>
                    <div class="flex justify-center mt-4">
                        <button id="record-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center transition-all duration-300 select-none shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40" title="录音朗读">
                            <i class="fa fa-microphone mr-2"></i> 开始录音
                        </button>
                    </div>
                    <div id="recognition-result" class="hidden mt-4 p-4 rounded-xl text-sm"></div>
                </div>
                <div class="flex justify-center mt-3">
                    <button id="ai-explain-btn" class="text-indigo-500 hover:text-indigo-600 flex items-center text-sm">
                        <i class="fas fa-robot mr-1"></i> AI解析
                    </button>
                </div>
            </div>
        `;
        
        // 将填空处转换为可编辑的输入框（每个汉字一个输入框）
        const allBlanks = document.querySelectorAll('.code-blank');
        let inputIndex = 0;
        
        // 为标题语音按钮添加事件监听器
        const titleSpeechBtn = document.getElementById('title-speech-btn');
        if (titleSpeechBtn) {
            titleSpeechBtn.addEventListener('click', speakSentence);
        }
        
        // 为语音语言按钮添加事件监听器
        const speechLangBtn = document.getElementById('speech-lang-btn');
        if (speechLangBtn && window.getCurrentSpeechLang) {
            speechLangBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showLangSelectModal();
            });
        }
        
        // 为录音按钮添加事件监听器
        const recordBtn = document.getElementById('record-btn');
        if (recordBtn) {
            recordBtn.addEventListener('click', function() {
                handleRecording();
            });
        }
        
        allBlanks.forEach((blank, blankIndex) => {
            const originalText = blank.textContent || '______';
            const answer = blank.dataset.answer || '';
            
            // 清空当前填空处
            blank.innerHTML = '';
            
            // 为每个汉字创建一个输入框
            for (let i = 0; i < answer.length; i++) {
                const char = answer[i];
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'inline-block w-8 px-1 py-1 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary';
                input.dataset.id = `${blank.dataset.id}-${i}`;
                input.dataset.answer = char;
                input.dataset.blankIndex = blankIndex;
                input.dataset.charIndex = i;
                input.placeholder = '_';
                input.value = '';
                // input.maxLength = 10;
                
                blank.appendChild(input);
                
                // 添加事件监听器
                addInputEventListener(input, inputIndex);
                inputIndex++;
            }
        });
        
        function addInputEventListener(input, index) {
            console.log('为输入框', index, '添加事件监听器');
            
            input.addEventListener('input', function(e) {
                console.log('input事件触发，输入框:', index);
                // 检查是否应该阻止input事件处理
                if (input.dataset.preventInput === 'true') {
                    console.log('阻止input事件处理，跳过');
                    return;
                }
                handleSentenceInput(e, index);
            });
            
            input.addEventListener('paste', function(e) {
                console.log('paste事件触发，输入框:', index);
                handleSentencePaste(e, index);
            });
            
            // 添加删除键事件监听器
            input.addEventListener('keydown', function(e) {
                console.log('keydown事件触发，输入框:', index, '按键:', e.key);
                
                // 特殊处理：中文输入法候选词选择（空格键确认）
                if (e.key === ' ' && input.dataset.composing === 'true') {
                    console.log('检测到中文候选词选择确认（空格键）');
                    // 阻止默认的空格键行为
                    e.preventDefault();
                    
                    // 标记已经处理了中文候选词选择
                    input.dataset.spaceProcessed = 'true';
                    // 标记已经处理了多字符输入，防止handleSentenceInput中的重复处理
                    input.dataset.multiCharProcessed = 'true';
                    
                    // 延迟处理，确保输入框值已更新
                    setTimeout(() => {
                        const value = input.value;
                        console.log('候选词选择后输入框值:', value);
                        
                        // 检查是否是多个字符（中文候选词）
                        if (value.length > 1) {
                            console.log('检测到多字符候选词:', value);
                            // 获取所有填空输入框
                            const inputs = document.querySelectorAll('.code-blank input');
                            
                            // 检查是否是有效的中文字符
                            const isChineseText = /[\u4e00-\u9fff]/.test(value);
                            console.log('是否中文字符:', isChineseText);
                            
                            if (isChineseText) {
                                // 将输入的内容按字符分割
                                const chars = value.split('');
                                console.log('分割字符:', chars);
                                
                                // 修复：确保当前输入框只保留第一个字符
                                input.value = chars[0];
                                
                                // 从当前输入框开始填充
                                // 修复：从i=1开始填充，因为i=0的字符已经在当前输入框中
                                for (let i = 1; i < chars.length; i++) {
                                    const targetIndex = index + i;
                                    if (targetIndex < inputs.length) {
                                        console.log('填充到输入框', targetIndex, ':', chars[i]);
                                        inputs[targetIndex].value = chars[i];
                                        
                                        // 更新输入框样式
                                        inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                                        inputs[targetIndex].classList.add('border-gray-300');
                                    }
                                }
                                
                                // 修复：移除清空逻辑，当前输入框已经正确设置为第一个字符
                                // if (index > 0) {
                                //     input.value = '';
                                // }
                                
                                // 聚焦到下一个未填充的输入框
                                setTimeout(() => {
                                    focusNextEmptyInput(index + chars.length);
                                }, 10);
                                
                                console.log('中文候选词处理完成');
                                // 阻止后续的input事件处理
                                input.dataset.preventInput = 'true';
                                setTimeout(() => {
                                    input.dataset.preventInput = 'false';
                                }, 200);
                                return;
                            }
                        }
                        
                        // 如果没有检测到多字符，正常处理
                        console.log('空格键处理后未检测到多字符，正常处理');
                        handleSentenceInput(e, index);
                    }, 100); // 增加延迟到100ms，确保输入框值已更新
                }
                
                handleSentenceKeydown(e, index);
            });
            
            // 添加中文输入法事件监听器
            input.addEventListener('compositionstart', function(e) {
                console.log('compositionstart: 中文输入开始，输入框:', index);
                input.dataset.composing = 'true';
            });
            
            input.addEventListener('compositionend', function(e) {
                console.log('compositionend: 中文输入结束，输入框:', index, '值:', input.value);
                input.dataset.composing = 'false';
                
                // 检查是否已经被空格键处理过
                if (input.dataset.spaceProcessed === 'true') {
                    console.log('已经被空格键处理过，跳过compositionend处理');
                    input.dataset.spaceProcessed = 'false'; // 重置标记
                    return;
                }
                
                // 延迟处理，确保输入框值已更新（增加延迟时间）
                setTimeout(() => {
                    const value = input.value;
                    console.log('compositionend延迟检查，输入框值:', value);
                    
                    // 检查是否是多个字符（中文输入法候选词选择）
                    if (value.length > 1) {
                        console.log('检测到多字符候选词选择:', value);
                        // 获取所有填空输入框
                        const inputs = document.querySelectorAll('.code-blank input');
                        
                        // 检查是否是有效的中文字符
                        const isChineseText = /[\u4e00-\u9fff]/.test(value);
                        console.log('是否中文字符:', isChineseText);
                        
                        if (isChineseText) {
                            // 将输入的内容按字符分割
                            const chars = value.split('');
                            console.log('分割字符:', chars);
                            
                            // 修复：确保当前输入框只保留第一个字符
                            input.value = chars[0];
                            
                            // 从当前输入框开始填充
                            // 修复：从i=1开始填充，因为i=0的字符已经在当前输入框中
                            for (let i = 1; i < chars.length; i++) {
                                const targetIndex = index + i;
                                if (targetIndex < inputs.length) {
                                    console.log('填充到输入框', targetIndex, ':', chars[i]);
                                    inputs[targetIndex].value = chars[i];
                                    
                                    // 更新输入框样式
                                    inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                                    inputs[targetIndex].classList.add('border-gray-300');
                                }
                            }
                            
                            // 修复：移除清空逻辑，当前输入框已经正确设置为第一个字符
                            // if (index > 0) {
                            //     input.value = '';
                            // }
                            
                            // 聚焦到下一个未填充的输入框
                            setTimeout(() => {
                                focusNextEmptyInput(index + chars.length);
                            }, 10);
                            
                            console.log('中文候选词处理完成');
                            return;
                        }
                    }
                    
                    // 如果没有检测到多字符，或者不是中文字符，正常处理
                    // 但需要检查输入框是否已经被清空（多字符处理已完成）
                    if (input.value.trim() !== '') {
                        console.log('正常处理单字符输入');
                        handleSentenceInput(e, index);
                    } else {
                        console.log('输入框已被清空，跳过处理');
                    }
                }, 100); // 增加延迟到100ms，确保输入框值已更新
            });
        }
        
        // 聚焦第一个填空输入框
        setTimeout(() => {
            const firstInput = document.querySelector('.code-blank input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
    
    // 隐藏反馈
    feedbackEl.classList.add('hidden');
    
    // 更新按钮状态
    updateButtons();
    
    // 更新进度
    updateProgress();
    
    // 保存当前题目索引到全局
    window.currentQuestionIndex = questionIndex;
    
    // 设置当前题库名称
    if (window.setCurrentQuestionBank) {
        window.setCurrentQuestionBank(currentQuestionBank);
        console.log('设置当前题库:', currentQuestionBank);
    }
    
    // 更新答题统计显示
    if (window.updateQuestionStatsDisplay) {
        window.updateQuestionStatsDisplay();
    }
    
    // 启动新的计时器
    window.currentQuestionTime = 0;
    
    // 先清除可能存在的旧计时器
    clearInterval(window.currentQuestionTimer);
    
    // 立即更新一次计时器显示
        const timerElement = document.getElementById('question-timer');
        if (timerElement) {
            timerElement.textContent = '0s';
        }
        
        // 启动新的计时器
        window.currentQuestionTimer = setInterval(() => {
            window.currentQuestionTime++;
            const timerElement = document.getElementById('question-timer');
            if (timerElement) {
                timerElement.textContent = `${window.currentQuestionTime}s`;
            }
        }, 1000);
}

// 处理录音朗读功能
function handleRecording() {
    const questionIndex = randomQuestions[currentRandomIndex];
    const currentQuestions = getCurrentQuestions();
    const question = currentQuestions[questionIndex];
    
    if (question.type !== "sentence" || !question.fullSentence) {
        showFeedback('该题型不支持录音朗读', 'error');
        return;
    }
    
    const recognitionResultEl = document.getElementById('recognition-result');
    
    window.toggleRecording(function(recognizedText, isFinal, errorMsg) {
        if (errorMsg) {
            recognitionResultEl.classList.remove('hidden', 'bg-green-50', 'text-green-700');
            recognitionResultEl.classList.add('bg-red-50', 'text-red-700');
            recognitionResultEl.innerHTML = `<div class="font-medium mb-1">错误</div><div>${errorMsg}</div>`;
            recognitionResultEl.classList.remove('hidden');
            return;
        }
        
        if (isFinal && recognizedText) {
            const result = window.compareRecognitionWithOriginal(recognizedText, question.fullSentence);
            
            recognitionResultEl.classList.remove('hidden', 'bg-red-50', 'text-red-700');
            
            if (result.isCorrect) {
                recognitionResultEl.classList.add('bg-green-50', 'text-green-700');
                playCorrectSound();
                createGreenCheckEffect();
                
                const bonusXP = 5;
                addXP(bonusXP, '朗读正确');
                
                recognitionResultEl.innerHTML = `
                    <div class="font-medium mb-1">${result.message}</div>
                    <div class="text-xs opacity-80">原文: ${result.originalText}</div>
                    <div class="text-xs opacity-80">识别: ${result.recognizedText}</div>
                `;
            } else {
                recognitionResultEl.classList.add('bg-yellow-50', 'text-yellow-700');
                recognitionResultEl.innerHTML = `
                    <div class="font-medium mb-1">${result.message}</div>
                    <div class="text-xs opacity-80">原文: ${result.originalText}</div>
                    <div class="text-xs opacity-80">识别: ${result.recognizedText}</div>
                `;
            }
            
            recognitionResultEl.classList.remove('hidden');
        } else if (recognizedText) {
            recognitionResultEl.classList.remove('hidden', 'bg-green-50', 'text-green-700', 'bg-red-50', 'text-red-700');
            recognitionResultEl.classList.add('bg-blue-50', 'text-blue-700');
            recognitionResultEl.innerHTML = `<div class="font-medium">正在识别...</div><div>${recognizedText}</div>`;
        }
    });
}

// 检查答案
    function checkAnswer(answer) {
        // 清除计时器
        if (window.clearQuestionTimer) {
            window.clearQuestionTimer();
        } else if (window.currentQuestionTimer) {
            clearInterval(window.currentQuestionTimer);
            window.currentQuestionTimer = null;
        }
    const questionIndex = randomQuestions[currentRandomIndex];
    const question = getCurrentQuestions()[questionIndex];
    let isCorrect = false;
    let userAnswer = answer;
    
    // 处理不同题型
    if (question.type === "fill" || question.type === "correct") {
        userAnswer = userAnswer.trim();
        const correctAnswer = question.type === "fill" 
            ? document.querySelector('.code-blank').dataset.answer
            : question.correct;
        
        isCorrect = userAnswer === correctAnswer;
    } 
    else if (question.type === "select") {
        // 获取用户选择的选项元素
        const selectedOption = document.querySelector(`.option-hover[data-index="${answer}"]`);
        if (selectedOption) {
            // 使用data-original-index来判断正确选项
            isCorrect = parseInt(selectedOption.dataset.originalIndex) === question.correct;
            userAnswer = question.options[parseInt(selectedOption.dataset.originalIndex)];
        } else {
            isCorrect = false;
            userAnswer = "";
        }
    }
    else if (question.type === "sentence") {
        // 句子记忆题的特殊处理
        if (window.sentenceStage === 'fill') {
            // 第一阶段：检查所有填空
            const blankInputs = document.querySelectorAll('.code-blank input');
            let allCorrect = true;
            let incorrectBlanks = [];
            
            // 检查每个填空是否正确
            blankInputs.forEach((input, index) => {
                const userAnswer = input.value.trim();
                const correctAnswer = input.dataset.answer;
                
                if (userAnswer === correctAnswer) {
                    // 正确：显示绿色边框
                    input.classList.remove('border-red-300', 'bg-red-50');
                    input.classList.add('border-green-300', 'bg-green-50');
                } else {
                    // 错误：显示红色边框
                    input.classList.remove('border-green-300', 'bg-green-50');
                    input.classList.add('border-red-300', 'bg-red-50');
                    allCorrect = false;
                    incorrectBlanks.push(index + 1);
                }
            });
            
            isCorrect = allCorrect;
            
            if (isCorrect) {
                // 播放正确音效
                playCorrectSound();
                
                // 进入第二阶段：重新输入完整句子（打散格子形式）
                window.sentenceStage = 'review';
                document.getElementById('sentence-review').classList.remove('hidden');
                
                // 隐藏第一阶段内容
                const sentenceFillStage = document.getElementById('sentence-fill-stage');
                if (sentenceFillStage) {
                    sentenceFillStage.classList.add('hidden');
                }
                
                document.getElementById('fill-submit-btn').disabled = true;
                document.getElementById('fill-submit-btn').classList.add('opacity-50', 'cursor-not-allowed');
                
                // 创建第二阶段打散句子格子
                createReviewSentenceInputs(question.fullSentence);
                
                // 聚焦第一个输入框
                setTimeout(() => {
                    const firstInput = document.querySelector('#full-sentence-blanks input');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 100);
                
                // 第一阶段正确，奖励5分经验值
                addXP(5, '句子记忆题第一阶段正确');
                
                // 更新答题统计（正确）
                if (window.updateQuestionStats) {
                    console.log('句子第一阶段答对，更新统计:', questionIndex);
                    window.updateQuestionStats(questionIndex, true);
                }
                
                // 第一阶段正确，返回false避免进入后续的显示结果处理
                return false;
            } else {
                // 播放错误音效
                playWrongSound();
                
                // 显示炫酷红叉效果
                createRedXEffect();
                
                // 重置连续正确计数
                consecutiveCorrect = 0;
                // 重置Combo计数
                comboCount = 0;
                lastCorrectTime = 0;
                
                // 答错题扣除5点经验值
                if (xp >= 5) {
                    xp -= 5;
                    updateGameStats();
                    showXPLossAnimation(5, '答错题');
                } else if (level > 1) {
                    // 当前等级经验不足，扣除上一级经验
                    const previousLevelXPNeeded = (level - 1) * 100;
                    const xpToDeduct = 5 - xp; // 需要从上一级扣除的经验值
                    
                    // 降级处理
                    level--;
                    xp = previousLevelXPNeeded - xpToDeduct;
                    
                    updateGameStats();
                    showXPLossAnimation(5, '答错题（已降级）');
                }
                
                // 显示错误提示
                showFeedback(`第${incorrectBlanks.join(',')}个填空不正确，请检查后重试`, 'error');
                return false;
            }
        } else if (window.sentenceStage === 'review') {
            // 第二阶段：检查打散句子格子输入
            const reviewInputs = document.querySelectorAll('#full-sentence-blanks input');
            const container = document.getElementById('full-sentence-blanks');
            let allCorrect = true;
            let userAnswer = '';
            
            // 遍历所有子元素（包括输入框、标点符号span和换行符）
            container.childNodes.forEach((child) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    if (child.tagName === 'INPUT') {
                        // 输入框：检查字符是否正确
                        // 对于空格输入框，不能使用trim()，需要保留空格
                        const userChar = child.dataset.expected === ' ' ? child.value : child.value.trim();
                        const correctChar = child.dataset.expected;
                        
                        // 构建用户答案
                        userAnswer += userChar;
                        
                        if (userChar !== correctChar) {
                            allCorrect = false;
                            // 错误：显示红色边框
                            child.classList.remove('border-green-300', 'bg-green-50');
                            child.classList.add('border-red-300', 'bg-red-50');
                        } else {
                            // 正确：显示绿色边框
                            child.classList.remove('border-red-300', 'bg-red-50');
                            child.classList.add('border-green-300', 'bg-green-50');
                        }
                    } else if (child.tagName === 'SPAN') {
                        // 标点符号：直接添加到用户答案中
                        userAnswer += child.textContent;
                    } else if (child.tagName === 'BR') {
                        // 换行符：添加到用户答案中
                        userAnswer += '\n';
                    }
                }
            });
            
            // 修复：现在空格也作为输入框，需要精确匹配
            isCorrect = allCorrect && userAnswer === question.fullSentence;
        }
    }
    
    // 显示结果
    if (isCorrect) {
        // 对于sentence题型的第一阶段，显示特定反馈
        if (question.type === "sentence" && window.sentenceStage === 'fill') {
            // 第一阶段已经在前面的逻辑中处理了UI更新和阶段转换
            // 这里只需要确保不显示错误的反馈信息
            // 第一阶段正确的反馈已经在前面显示过了
        }
        // 对于sentence题型的第二阶段，显示特殊反馈
        else if (question.type === "sentence" && window.sentenceStage === 'review') {
            showFeedback('恭喜！完整句子输入正确，记忆效果加倍！', 'success');
            
            // 播放正确音效
            playCorrectSound();
            
            // 显示炫酷绿色对钩效果
            createGreenCheckEffect();
            
            // 更新统计信息
            totalCorrectAnswers++;
            consecutiveCorrect++;
            
            // 奖励经验值（加倍奖励）
            const baseXP = 20; // 比普通题目多一倍
            let bonusXP = 0;
            
            // 连续正确奖励
            if (consecutiveCorrect >= 3) {
                bonusXP += 10;
            }
            if (consecutiveCorrect >= 5) {
                bonusXP += 20;
            }
            
            // 快速答题奖励（假设在5秒内完成）
            const answerTime = Date.now() - questionStartTime;
            if (answerTime < 5000) {
                bonusXP += 10;
            }
            
            // Combo奖励：5秒内连续答对下一题
            const now = Date.now();
            if (lastCorrectTime > 0 && (now - lastCorrectTime) <= COMBO_TIME_LIMIT) {
                comboCount++;
                bonusXP += 5;
            } else {
                comboCount = 1;
            }
            lastCorrectTime = now;
            
            const totalXP = baseXP + bonusXP;
            let reason = `句子记忆题第二阶段正确`;
            if (comboCount > 1) {
                reason += ` (Combo x${comboCount} +5)`;
            }
            addXP(totalXP, reason);
            
            // 检查并授予勋章
            checkAndAwardBadges();
            
            // 答对题目，随机获得额外能量
            gainRandomEnergy();
            
            // 添加庆祝动画（显示在屏幕中间）
            createSparkleEffect(window.innerWidth / 2, window.innerHeight / 2, 20);
            
            // 标记为已完成
            if (!completed.includes(questionIndex)) {
                completed.push(questionIndex);
            }
            
            // 更新答题统计（正确）
            if (window.updateQuestionStats) {
                console.log('答对，更新统计:', questionIndex);
                window.updateQuestionStats(questionIndex, true);
            }
            
            // 显示完整句子的正确答案
            const correctSentence = question.fullSentence;
            const sentenceContentEl = document.getElementById('sentence-content');
            if (sentenceContentEl) {
                sentenceContentEl.innerHTML = `
                    <div class="text-green-600 font-medium mb-2">正确答案：</div>
                    <div class="text-sm leading-relaxed">${correctSentence}</div>
                `;
            }
            
            // 禁用提交按钮
            document.getElementById('sentence-submit-btn').disabled = true;
            document.getElementById('sentence-submit-btn').classList.add('opacity-50', 'cursor-not-allowed');
            
            // 进入第三阶段：录音朗读
            window.sentenceStage = 'recording';
            feedbackEl.textContent = '';
            feedbackEl.classList.add('hidden');
            
            // 隐藏第二阶段内容
            const sentenceReview = document.getElementById('sentence-review');
            if (sentenceReview) {
                sentenceReview.classList.add('hidden');
            }
            
            // 显示第三阶段内容
            const sentenceRecording = document.getElementById('sentence-recording');
            const sentenceRecordingContent = document.getElementById('sentence-recording-content');
            const recognitionResultEl = document.getElementById('recognition-result');
            
            if (sentenceRecording) {
                sentenceRecording.classList.remove('hidden');
            }
            
            // 在第三阶段显示完整句子
            if (sentenceRecordingContent) {
                sentenceRecordingContent.innerHTML = `<div>${question.fullSentence}</div>`;
            }
            
            if (recognitionResultEl) {
                recognitionResultEl.classList.remove('hidden');
                recognitionResultEl.classList.add('bg-blue-50', 'text-blue-700');
                recognitionResultEl.innerHTML = '<div class="font-medium">🎤 点击上方按钮录音朗读完整句子</div>';
            }
            
            // 启用下一题按钮，让用户手动控制跳转
            updateButtons();
        } else {
            // 常规正确处理
            showFeedback(question.explanation, 'success');
            
            // 播放正确音效
            playCorrectSound();
            
            // 显示炫酷绿色对钩效果
            createGreenCheckEffect();
            
            // 更新统计信息
            totalCorrectAnswers++;
            consecutiveCorrect++;
            
            // 奖励经验值
            const baseXP = 10;
            let bonusXP = 0;
            
            // 连续正确奖励
            if (consecutiveCorrect >= 3) {
                bonusXP += 5;
            }
            if (consecutiveCorrect >= 5) {
                bonusXP += 10;
            }
            
            // 快速答题奖励（假设在5秒内完成）
            const answerTime = Date.now() - questionStartTime;
            if (answerTime < 5000) {
                bonusXP += 5;
            }
            
            // Combo奖励：5秒内连续答对下一题
            const now = Date.now();
            if (lastCorrectTime > 0 && (now - lastCorrectTime) <= COMBO_TIME_LIMIT) {
                comboCount++;
                bonusXP += 5;
            } else {
                comboCount = 1;
            }
            lastCorrectTime = now;
            
            const totalXP = baseXP + bonusXP;
            let reason = `正确答题`;
            if (comboCount > 1) {
                reason += ` (Combo x${comboCount} +5)`;
            }
            addXP(totalXP, reason);
            
            // 检查并授予勋章
            checkAndAwardBadges();
            
            // 答对题目，随机获得额外能量
            gainRandomEnergy();
            
            // 添加庆祝动画（显示在屏幕中间）
            createSparkleEffect(window.innerWidth / 2, window.innerHeight / 2, 20);
            
            // 标记为已完成
            if (!completed.includes(questionIndex)) {
                completed.push(questionIndex);
            }
            
            // 更新答题统计（正确）
            if (window.updateQuestionStats) {
                console.log('答对，更新统计:', questionIndex);
                window.updateQuestionStats(questionIndex, true);
            }
            
            // 对于填空题，更新UI显示正确答案
            if (question.type === "fill") {
                const blankEl = document.querySelector('.code-blank');
                blankEl.textContent = blankEl.dataset.answer;
                blankEl.classList.add('correct');
                blankEl.classList.remove('code-blank', 'ring-2', 'ring-primary');
            }
            // 对于选择题，标记正确选项
            else if (question.type === "select") {
                document.querySelectorAll('.option-hover').forEach((el) => {
                    el.classList.remove('border-primary', 'bg-blue-50');
                    // 使用data-original-index来判断正确选项
                    if (parseInt(el.dataset.originalIndex) === question.correct) {
                        el.classList.add('border-success', 'bg-green-50');
                    }
                });
            }
            
            // 禁用提交按钮
            if (document.getElementById('submit-btn')) {
                document.getElementById('submit-btn').disabled = true;
                document.getElementById('submit-btn').classList.add('opacity-50', 'cursor-not-allowed');
            }
            
            // 启用下一题按钮，让用户手动控制跳转
            updateButtons();
        }
    } else {
        // 对于sentence题型的第二阶段，显示特定错误提示
        if (question.type === "sentence" && window.sentenceStage === 'review') {
            showFeedback('完整句子输入不正确，请检查后重试', 'error');
        } else {
            showFeedback('不正确，请再试一次', 'error');
        }
        
        // 播放错误音效
        playWrongSound();
        
        // 显示炫酷红叉效果
        createRedXEffect();
        
        // 重置连续正确计数
        consecutiveCorrect = 0;
        // 重置Combo计数
        comboCount = 0;
        lastCorrectTime = 0;
        
        // 答错题扣除5点经验值
        if (xp >= 5) {
            xp -= 5;
            updateGameStats();
            showXPLossAnimation(5, '答错题');
        } else if (level > 1) {
            // 当前等级经验不足，扣除上一级经验
            const previousLevelXPNeeded = (level - 1) * 100;
            const xpToDeduct = 5 - xp; // 需要从上一级扣除的经验值
            
            // 降级处理
            level--;
            xp = previousLevelXPNeeded - xpToDeduct;
            
            updateGameStats();
            showXPLossAnimation(5, '答错题（已降级）');
        } 
        
        // 添加错误动画
        questionContainer.classList.add('shake');
    setTimeout(() => {
        questionContainer.classList.remove('shake');
    }, 500);
        
        // 更新答题统计（错误）
        if (window.updateQuestionStats) {
            console.log('答错，更新统计:', questionIndex);
            window.updateQuestionStats(questionIndex, false);
        }
        
        // 对于选择题，标记错误选项
        if (question.type === "select") {
            const selectedEl = document.querySelector(`.option-hover[data-index="${answer}"]`);
            selectedEl.classList.add('border-primary', 'bg-blue-50', 'border-red-300', 'bg-red-50', 'shake');
        }
    }
    
    return isCorrect;
}

async function explainQuestionWithAI() {
    const questionIndex = randomQuestions[currentRandomIndex];
    const question = getCurrentQuestions()[questionIndex];
    
    const apiKey = localStorage.getItem('geminiApiKey') || '';
    if (!apiKey) {
        showFeedback('请先在AI助手中配置API Key', 'error');
        return;
    }
    
    const explainBtn = document.getElementById('ai-explain-btn');
    if (!explainBtn) return;
    
    const originalText = explainBtn.innerHTML;
    explainBtn.disabled = true;
    explainBtn.innerHTML = '<span class="animate-spin mr-1">⏳</span> 解析中...';
    
    try {
        let prompt = '';
        
        if (question.type === 'select') {
            prompt = `你是一名专业的知识讲解专家。请详细解析以下选择题：

题目：${question.title}
题干：${question.content.replace(/<[^>]*>/g, '')}
选项：
${question.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')}
正确答案：${String.fromCharCode(65 + question.correct)}

请从以下几个方面进行解析：
1. 题目所涉及的核心知识点
2. 正确答案的详细解释（为什么正确）
3. 错误选项的分析（为什么错误）
4. 相关拓展知识或记忆技巧`;
        } else if (question.type === 'fill') {
            const answerEl = document.querySelector('.code-blank');
            const answer = answerEl ? answerEl.dataset.answer : '';
            prompt = `你是一名专业的知识讲解专家。请详细解析以下填空题：

题目：${question.title}
题干：${question.content.replace(/<[^>]*>/g, '')}
正确答案：${answer}

请从以下几个方面进行解析：
1. 题目所涉及的核心知识点
2. 答案的详细解释（为什么是这个答案）
3. 相关拓展知识或记忆技巧`;
        } else if (question.type === 'sentence') {
            prompt = `你是一名专业的知识讲解专家。请详细解析以下句子记忆题：

题目：${question.title}
句子：${question.content.replace(/<[^>]*>/g, '')}
完整句子：${question.fullSentence || ''}

请从以下几个方面进行解析：
1. 句子的语法结构分析
2. 关键词汇的含义和用法
3. 句子翻译和理解要点
4. 记忆技巧和拓展知识`;
        } else {
            prompt = `你是一名专业的知识讲解专家。请详细解析以下题目：

题目：${question.title}
内容：${question.content.replace(/<[^>]*>/g, '')}

请详细解释题目涉及的知识点、解题思路和相关拓展知识。`;
        }
        
        let apiBaseUrl = localStorage.getItem('geminiApiBaseUrl') || 'https://mrok.dpdns.org/v1';
        if (!apiBaseUrl.startsWith('http://') && !apiBaseUrl.startsWith('https://')) {
            apiBaseUrl = `https://${apiBaseUrl}`;
        }
        
        const messages = [
            { role: 'system', content: '你是一名专业的知识讲解专家，善于用通俗易懂的语言解释复杂的概念。回答要详细、有条理，并且结构清晰。' },
            { role: 'user', content: prompt }
        ];
        
        const response = await fetch(`${apiBaseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gemini-flash-latest',
                messages,
                max_tokens: 2000,
                temperature: 0.5
            })
        });
        
        if (!response.ok) {
            const txt = await response.text().catch(() => '');
            let errorMsg = `API错误: ${response.status}`;
            try {
                const errorData = JSON.parse(txt);
                if (errorData.error?.message) {
                    errorMsg = errorData.error.message;
                }
            } catch (e) {
                if (txt) {
                    errorMsg += ` - ${txt.slice(0, 100)}`;
                }
            }
            throw new Error(errorMsg);
        }
        
        const data = await response.json();
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('API响应格式不正确');
        }
        
        const explanation = data.choices[0].message.content;
        
        feedbackEl.innerHTML = `<div class="text-sm">${explanation.replace(/\n/g, '<br>')}</div>`;
        feedbackEl.classList.remove('hidden', 'text-success', 'text-red-500', 'bg-green-50', 'bg-red-50');
        feedbackEl.classList.add('text-gray-800', 'bg-indigo-50', 'p-3', 'rounded-lg', 'border', 'border-indigo-100');
        
    } catch (e) {
        console.error('AI解析失败:', e);
        let errorMsg = '解析失败: ' + (e.message || '未知错误');
        if (errorMsg.includes('location is not supported')) {
            errorMsg = '地理位置不支持，请更换API服务或使用代理';
        }
        showFeedback(errorMsg, 'error');
    } finally {
        explainBtn.disabled = false;
        explainBtn.innerHTML = originalText;
    }
}

// 显示反馈
function showFeedback(text, type) {
    feedbackEl.textContent = text;
    feedbackEl.classList.remove('hidden', 'text-success', 'text-red-500', 'bg-green-50', 'bg-red-50', 'p-2', 'rounded');
    feedbackEl.classList.add(
        type === 'success' ? 'text-success' : 'text-red-500',
        type === 'success' ? 'bg-green-50' : 'bg-red-50',
        'p-2', 'rounded'
    );
}

// 显示提示
async function showHint() {
    // 检查经验值是否足够
    if (xp >= 2) {
        // 扣除2点经验值
        xp -= 2;
        updateGameStats();
        showXPLossAnimation(2, '查看提示');
    } else if (level > 1) {
        // 当前等级经验不足，扣除上一级经验
        const previousLevelXPNeeded = (level - 1) * 100;
        const xpToDeduct = 2 - xp; // 需要从上一级扣除的经验值
        
        // 降级处理
        level--;
        xp = previousLevelXPNeeded - xpToDeduct;
        
        updateGameStats();
        showXPLossAnimation(2, '查看提示（已降级）');
    } else {
        // 等级为1且经验值不足
        showFeedback('经验值不足，无法查看提示！', 'error');
        return;
    }
    
    // 播放提示音效
    try {
        if (window.Tone) {
            // 确保 Tone.js 上下文已启动
            if (Tone.context.state !== 'running') {
                await Tone.start();
            }
            
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease("A4", "8n"); // 提示音效
            
            // 播放完成后释放资源
            setTimeout(() => {
                synth.dispose();
            }, 500);
        }
    } catch (e) {
        // 忽略音效错误
        console.log('提示音效播放失败:', e);
    }
    
    // 获取当前题库的题目数组
    const currentQuestions = getCurrentQuestions();
    const questionIndex = randomQuestions[currentRandomIndex];
    hintTextEl.textContent = currentQuestions[questionIndex].hint;
    hintModal.classList.remove('hidden');
}

// 关闭提示
function closeHint() {
    hintModal.classList.add('hidden');
    if (document.getElementById('answer-input')) {
        document.getElementById('answer-input').focus();
    }
}

// 显示答案
async function showAnswer() {
    // 获取当前题库的题目数组
    const currentQuestions = getCurrentQuestions();
    const questionIndex = randomQuestions[currentRandomIndex];
    const question = currentQuestions[questionIndex];
    
    // 检查经验值是否足够
    if (xp >= 10) {
        // 扣除10点经验值
        xp -= 10;
        updateGameStats();
        showXPLossAnimation(10, '查看答案');
    } else if (level > 1) {
        // 当前等级经验不足，扣除上一级经验
        const previousLevelXPNeeded = (level - 1) * 100;
        const xpToDeduct = 10 - xp; // 需要从上一级扣除的经验值
        
        // 降级处理
        level--;
        xp = previousLevelXPNeeded - xpToDeduct;
        
        updateGameStats();
        showXPLossAnimation(10, '查看答案（已降级）');
    } else {
        // 等级为1且经验值不足
        showFeedback('经验值不足，无法查看答案！', 'error');
        return;
    }
    
    // 播放答案音效
    try {
        if (window.Tone) {
            // 确保 Tone.js 上下文已启动
            if (Tone.context.state !== 'running') {
                await Tone.start();
            }
            
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease("C5", "4n"); // 答案音效
            
            // 播放完成后释放资源
            setTimeout(() => {
                synth.dispose();
            }, 1000);
        }
    } catch (e) {
        // 忽略音效错误
        console.log('答案音效播放失败:', e);
    }
    
    let answerText = '';
    if (question.type === "fill") {
        // 填空题：从data-answer属性获取正确答案
        const blankEl = document.querySelector('.code-blank');
        const correctAnswer = blankEl ? blankEl.dataset.answer : '未找到答案';
        answerText = `正确答案：\n${correctAnswer}`;
    } else if (question.type === "select") {
        // 选择题：显示正确选项
        const correctOption = question.options[question.correct];
        answerText = `正确答案：\n${correctOption}`;
    } else if (question.type === "correct") {
        // 找错题：显示错误选项
        answerText = `错误选项：\n${question.correct}`;
    } else if (question.type === "sentence") {
        // 句子记忆题：显示完整句子
        const correctSentence = question.fullSentence;
        answerText = `完整句子：\n${correctSentence}`;
    } else {
        // 其他类型题目
        answerText = `正确答案：\n${question.correctAnswer || question.answer || '未找到答案'}`;
    }
    
    // 显示扣除经验值的提示
    answerText = `${answerText}`;
    
    answerTextEl.textContent = answerText;
    answerModal.classList.remove('hidden');
    
    // 显示经验值扣除动画
    showXPLossAnimation(10, '查看答案');
}

// 关闭答案
function closeAnswer() {
    answerModal.classList.add('hidden');
    if (document.getElementById('answer-input')) {
        document.getElementById('answer-input').focus();
    }
}

// 上一题
function goPrev() {
    if (currentRandomIndex > 0) {
        currentRandomIndex--;
        loadQuestion(currentRandomIndex);
    }
}

// 下一题
function goNext() {
    if (currentRandomIndex < randomQuestions.length - 1) {
        currentRandomIndex++;
        loadQuestion(currentRandomIndex);
    }
}

// 更新按钮状态
function updateButtons() {
    const questionIndex = randomQuestions[currentRandomIndex];
    
    // 上一题按钮
    if (currentRandomIndex > 0) {
        prevBtn.disabled = false;
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        prevBtn.disabled = true;
        prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    
    // 下一题按钮：只要有下一题就可以跳转（移除答对限制）
    if (currentRandomIndex < randomQuestions.length - 1) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        nextBtn.disabled = true;
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// 更新进度
function updateProgress() {
    // 检查progressEl是否存在，如果不存在则不更新
    if (progressEl) {
        progressEl.textContent = `${currentRandomIndex + 1}/${randomQuestions.length}`;
    }
}

// 设置事件监听
function setupEvents() {
    // 事件委托处理动态生成的元素
    document.addEventListener('click', (e) => {
        // 提交按钮
        if (e.target.id === 'submit-btn' || e.target.closest('#submit-btn')) {
            const input = document.getElementById('answer-input');
            if (input) {
                checkAnswer(input.value);
            }
        }
        
        // 选择题选项
        if (e.target.closest('.option-hover')) {
            const questionIndex = randomQuestions[currentRandomIndex];
            const currentQuestions = getCurrentQuestions();
            if (currentQuestions[questionIndex].type === "select") {
                // 如果当前题目已经答对，则禁止重复答题
                if (completed.includes(questionIndex)) {
                    return;
                }
                const option = e.target.closest('.option-hover');
                checkAnswer(option.dataset.index);
            }
        }
        
        // 句子记忆题填空按钮
        if (e.target.id === 'fill-submit-btn' || e.target.closest('#fill-submit-btn')) {
            // 初始化sentence阶段
            window.sentenceStage = 'fill';
            // 对于sentence题型的第一阶段，传递空字符串即可，因为checkAnswer函数会自己检查所有填空输入框
            checkAnswer('');
        }
        
        // 句子记忆题完整句子提交按钮
        if (e.target.id === 'sentence-submit-btn' || e.target.closest('#sentence-submit-btn')) {
            // 第二阶段：检查打散句子格子输入
            const reviewInputs = document.querySelectorAll('#full-sentence-blanks input');
            let userAnswer = '';
            
            // 构建用户答案
            reviewInputs.forEach((input) => {
                userAnswer += input.value.trim();
            });
            
            checkAnswer(userAnswer);
        }
        
        // 加油按钮
        if (e.target.id === 'cheer-btn' || e.target.closest('#cheer-btn')) {
            // 短按效果 - 全新炫酷版本
            createQuickCheerEffect();
        }
        
        // 语音播报按钮
        if (e.target.id === 'speech-btn' || e.target.closest('#speech-btn')) {
            speakSentence();
        }
        
        // 答案按钮
        if (e.target.id === 'answer-btn' || e.target.closest('#answer-btn')) {
            showAnswer();
        }
        
        // AI解析按钮
        if (e.target.id === 'ai-explain-btn' || e.target.closest('#ai-explain-btn')) {
            explainQuestionWithAI();
        }
    });
    
    // 打字音效监听
    document.addEventListener('input', (e) => {
        if (e.target.id === 'answer-input' || e.target.id === 'full-sentence-input' || e.target.matches('.code-blank input')) {
            playTypingSound();
        }
    });
    
    // 加油按钮长按事件
    cheerBtn.addEventListener('mousedown', startCheerPress);
    cheerBtn.addEventListener('touchstart', startCheerPress);
    
    cheerBtn.addEventListener('mouseup', stopCheerPress);
    cheerBtn.addEventListener('touchend', stopCheerPress);
    cheerBtn.addEventListener('mouseleave', stopCheerPress);
    
    // 键盘快捷键监听
    document.addEventListener('keydown', (e) => {
        // 检查是否在输入框中，如果是则只允许Enter键生效
        const isInInput = e.target.matches('input, textarea');
        
        // 输入框回车提交（始终有效）
        if (e.key === 'Enter') {
            // 如果答案弹窗显示中，则点击"知道了"按钮
            if (!answerModal.classList.contains('hidden')) {
                closeAnswerBtn.click();
                return;
            }
            
            // 如果提示弹窗显示中，则点击"知道了"按钮
            if (!hintModal.classList.contains('hidden')) {
                closeHintBtn.click();
                return;
            }
            
            // 如果当前有输入框且提交按钮可用，则提交答案
        if (document.getElementById('answer-input') && 
            !document.getElementById('submit-btn').disabled) {
            checkAnswer(document.getElementById('answer-input').value);
        }
        // 如果当前是句子记忆题的填空阶段且填空提交按钮可用
        else if (document.querySelector('.code-blank input') && 
                    !document.getElementById('fill-submit-btn').disabled) {
            // 初始化sentence阶段
            window.sentenceStage = 'fill';
            checkAnswer('');
        }
        // 如果当前是句子记忆题的完整句子阶段且提交按钮可用
        else if (document.getElementById('full-sentence-blanks') && 
                    !document.getElementById('sentence-submit-btn').disabled) {
            // 第二阶段：检查打散句子格子输入
            const reviewInputs = document.querySelectorAll('#full-sentence-blanks input');
            const container = document.getElementById('full-sentence-blanks');
            let userAnswer = '';
            
            // 遍历所有子元素（包括输入框和标点符号span）
            container.childNodes.forEach((child) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    if (child.tagName === 'INPUT') {
                        // 输入框：获取字符
                        const userChar = child.value.trim();
                        userAnswer += userChar;
                    } else if (child.tagName === 'SPAN') {
                        // 标点符号：直接添加到用户答案中
                        userAnswer += child.textContent;
                    }
                }
            });
            
            checkAnswer(userAnswer);
        }
        // 如果当前题目已完成且下一题按钮可用，则跳转到下一题
        else if (completed.includes(randomQuestions[currentRandomIndex]) && 
                    currentRandomIndex < randomQuestions.length - 1) {
            goNext();
        }
        }
        
        // ESC键：退出输入状态（始终有效）
        if (e.key === 'Escape') {
            // 如果当前在输入框中，则移除焦点
            if (isInInput) {
                e.target.blur();
                return;
            }
            // 如果提示弹窗显示中，则关闭提示
            if (!hintModal.classList.contains('hidden')) {
                closeHint();
                return;
            }
        }
        
        // 如果当前在输入框中，则忽略其他快捷键（除了Enter、ESC、Ctrl+U/Command+U、Ctrl+B/Command+B和Ctrl+N/Command+N）
        if (isInInput && e.key !== 'Enter' && e.key !== 'Escape' && !((e.key === 'u' || e.key === 'U') && (e.ctrlKey || e.metaKey)) && !((e.key === 'b' || e.key === 'B') && (e.ctrlKey || e.metaKey)) && !((e.key === 'n' || e.key === 'N') && (e.ctrlKey || e.metaKey))) {
            return;
        }
        
        // A键长按处理（仅在非输入状态有效）
        if (e.key === 'a' || e.key === 'A') {
            // 如果是第一次按下A键，开始长按计时
            if (!e.repeat) {
                cheerPressStart = Date.now();
                cheerPressTimer = setInterval(() => {
                    const duration = Date.now() - cheerPressStart;
                    
                    // 根据长按时间改变按钮样式
                    if (duration > 1000) {
                        cheerBtn.classList.add('text-green-500', 'scale-110');
                        cheerBtn.innerHTML = '<i class="fa fa-fire mr-1 text-red-500 animate-pulse"></i> 加油！';
                    }
                    
                    if (duration > 2000) {
                        // 触发超炫酷加油动画（无音效）
                        createCheerEffect();
                        showCheerAnimation();
                        
                        // 重置按钮状态
                        setTimeout(() => {
                            cheerBtn.classList.remove('text-green-500', 'scale-110');
                            cheerBtn.innerHTML = '<i class="fa fa-fire mr-1 text-orange-500"></i> 加油';
                        }, 3000);
                        
                        clearInterval(cheerPressTimer);
                        cheerPressTimer = null;
                    }
                }, 100);
            }
            // 如果是重复按键，不处理
            return;
        }
        
        // 选择题快捷键：1-4数字键选择答案
        if (['1', '2', '3', '4'].includes(e.key)) {
            const questionIndex = randomQuestions[currentRandomIndex];
            const currentQuestions = getCurrentQuestions();
            if (currentQuestions[questionIndex].type === "select") {
                // 如果当前题目已经答对，则禁止重复答题
                if (completed.includes(questionIndex)) {
                    return;
                }
                const optionIndex = parseInt(e.key) - 1;
                const option = document.querySelector(`.option-hover[data-index="${optionIndex}"]`);
                if (option) {
                    checkAnswer(optionIndex);
                }
            }
        }
        
        // 上一题快捷键：p键
        if (e.key === 'p' || e.key === 'P') {
            goPrev();
        }
        
        // 下一题快捷键：n键
        if ((e.key === 'n' || e.key === 'N' || e.code === 'KeyN') && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            e.stopPropagation();
            goNext();
        }
        
        // 提示快捷键：h键
        if (e.key === 'h' || e.key === 'H') {
            showHint();
        }
        
        // 答案快捷键：Ctrl+U/Command+U键
        if ((e.key === 'u' || e.key === 'U' || e.code === 'KeyU') && (e.ctrlKey || e.metaKey)) {
            e.preventDefault(); // 阻止默认的输入行为
            e.stopPropagation(); // 阻止事件冒泡
            showAnswer();
        }
        
        // 语音播报快捷键：Ctrl+B/Command+B键
        if ((e.key === 'b' || e.key === 'B' || e.code === 'KeyB') && (e.ctrlKey || e.metaKey)) {
            e.preventDefault(); // 阻止默认的输入行为
            e.stopPropagation(); // 阻止事件冒泡
            // 检查当前题目是否为sentence题型且标题语音按钮存在
            const questionIndex = randomQuestions[currentRandomIndex];
            const currentQuestions = getCurrentQuestions();
            const question = currentQuestions[questionIndex];
            const titleSpeechBtn = document.getElementById('title-speech-btn');
            if (question.type === "sentence" && titleSpeechBtn) {
                speakSentence();
            }
        }
        
        // 模式切换快捷键：Shift+M键
        if ((e.key === 'm' || e.key === 'M' || e.code === 'KeyM') && e.shiftKey) {
            e.preventDefault(); // 阻止默认的输入行为
            e.stopPropagation(); // 阻止事件冒泡

        }
        
        // 空格键触发加油效果
        if (e.key === ' ') {
            e.preventDefault();
            const rect = cheerBtn.getBoundingClientRect();
            createSparkleEffect(rect.left + 20, rect.top + 10, 5);
        }
    });
    
    // A键释放处理
    document.addEventListener('keyup', (e) => {
        if (e.key === 'a' || e.key === 'A') {
            if (cheerPressTimer) {
                clearInterval(cheerPressTimer);
                cheerPressTimer = null;
                
                // 如果长按时间小于1秒，触发短按效果
                if (Date.now() - cheerPressStart < 1000) {
                    createQuickCheerEffect();
                }
                
                // 重置按钮状态
                cheerBtn.classList.remove('text-green-500', 'scale-110');
                cheerBtn.innerHTML = '<i class="fa fa-fire mr-1 text-orange-500"></i> 加油';
            }
        }
    });
    
    // 提示按钮
    hintBtn.addEventListener('click', showHint);
    closeHintBtn.addEventListener('click', closeHint);
    
    // 答案按钮（已通过事件委托处理，此处移除重复绑定）
closeAnswerBtn.addEventListener('click', closeAnswer);


    
    // 移除模式按钮的事件监听器（已删除相关功能）
    
    // 点击弹窗背景关闭
    hintModal.addEventListener('click', (e) => {
        if (e.target === hintModal) closeHint();
    });
    
    answerModal.addEventListener('click', (e) => {
        if (e.target === answerModal) closeAnswer();
    });
    
    // 上一题/下一题
    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);
}

function showLangSelectModal() {
    const currentLang = window.getCurrentSpeechLang ? window.getCurrentSpeechLang() : 'auto';
    
    const langModal = document.createElement('div');
    langModal.id = 'lang-select-modal';
    langModal.className = 'fixed inset-0 flex items-center justify-center z-[100] bg-black/50';
    langModal.innerHTML = `
        <div class="bg-white rounded-lg shadow-2xl p-4 w-[240px]">
            <div class="text-sm font-medium text-gray-700 mb-3 text-center">选择播报语言</div>
            <div class="grid grid-cols-2 gap-2">
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'auto' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="auto">自动</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'zh-CN' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="zh-CN">中文</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'en-US' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="en-US">英语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'ja-JP' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="ja-JP">日语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'ko-KR' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="ko-KR">韩语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'de-DE' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="de-DE">德语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'fr-FR' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="fr-FR">法语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'es-ES' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="es-ES">西语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'ru-RU' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="ru-RU">俄语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'pt-PT' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="pt-PT">葡语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'it-IT' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="it-IT">意语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'nl-NL' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="nl-NL">荷兰语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'sv-SE' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="sv-SE">瑞典语</button>
                <button class="lang-option px-3 py-2 text-xs rounded border ${currentLang === 'vi-VN' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-600 hover:bg-gray-50 border-gray-100'}" data-lang="vi-VN">越南语</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(langModal);
    
    langModal.addEventListener('click', function(e) {
        if (e.target === langModal) {
            langModal.remove();
        }
    });
    
    langModal.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            if (window.setCurrentSpeechLang) {
                window.setCurrentSpeechLang(lang);
            }
            langModal.remove();
        });
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', init);

// 初始化学习增强功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始检查学习增强功能...');
    
    // 确保学习增强功能已加载并初始化
    if (window.learningEnhancement) {
        console.log('学习增强功能已初始化');
        console.log('功能状态:', window.learningEnhancement.getFeatureStatus());
    } else {
        console.warn('学习增强功能未正确加载');
        // 尝试手动创建实例
        console.log('尝试手动创建学习增强功能实例...');
        window.learningEnhancement = new LearningEnhancement();
    }
});
