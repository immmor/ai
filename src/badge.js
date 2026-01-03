// 加载勋章
function loadBadges() {
    const savedBadges = localStorage.getItem('goBlockchainBadges');
    if (savedBadges) {
        badges = JSON.parse(savedBadges);
        updateBadgeDisplay();
    }
}

// 保存勋章
function saveBadges() {
    localStorage.setItem('goBlockchainBadges', JSON.stringify(badges));
}

// 更新勋章显示
function updateBadgeDisplay() {
    badgeContainer.innerHTML = '';
    badges.forEach(badge => {
        const badgeEl = document.createElement('div');
        badgeEl.className = 'relative group';
        badgeEl.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 flex items-center justify-center text-white text-sm shadow-lg cursor-help transform transition-transform duration-300 hover:scale-110" title="${badge.name}">
                <i class="fa ${badge.icon}"></i>
            </div>
            <div class="absolute top-1/2 right-full transform -translate-y-1/2 mr-2 px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-gray-600">
                <div class="font-medium">${badge.name}</div>
                <div class="w-2 h-2 bg-gradient-to-r from-yellow-300 to-orange-400 absolute -right-1 top-1/2 transform -translate-y-1/2 rotate-45"></div>
            </div>
        `;
        badgeContainer.appendChild(badgeEl);
    });
    
    // 更新折叠勋章显示状态
    updateBadgeCollapsed();
}

// 更新折叠勋章显示状态
function updateBadgeCollapsed() {
    const badgeCollapsed = document.getElementById('badge-collapsed');
    if (badges.length > 0) {
        badgeCollapsed.style.display = 'flex';
        // 移除默认闪烁效果，仅在获得新勋章时闪烁
        badgeCollapsed.classList.remove('animate-pulse');
    } else {
        badgeCollapsed.style.display = 'none';
    }
}

// 勋章折叠/展开功能
function setupBadgeToggle() {
    const badgeCollapsed = document.getElementById('badge-collapsed');
    const badgeContainer = document.getElementById('badge-container');
    
    // 点击折叠勋章展开/收起
    badgeCollapsed.addEventListener('click', (e) => {
        e.stopPropagation();
        badgeContainer.classList.toggle('expanded');
        
        if (badgeContainer.classList.contains('expanded')) {
            // 展开状态：添加快速旋转动画
            badgeCollapsed.style.transition = 'transform 0.3s ease-in-out';
            badgeCollapsed.style.transform = 'rotate(180deg)';
        } else {
            // 收起状态：快速恢复原状
            badgeCollapsed.style.transition = 'transform 0.3s ease-in-out';
            badgeCollapsed.style.transform = 'rotate(0deg)';
        }
    });
    
    // 点击页面其他地方收起勋章
    document.addEventListener('click', (e) => {
        if (!badgeContainer.contains(e.target) && !badgeCollapsed.contains(e.target)) {
            badgeContainer.classList.remove('expanded');
            badgeCollapsed.style.transform = 'rotate(0deg)';
        }
    });
    
    // 阻止勋章容器内的点击事件冒泡
    badgeContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// 检查并授予勋章
function checkAndAwardBadges() {
    const newBadges = [];
    
    // 首次正确勋章
    if (totalCorrectAnswers === 1 && !badges.find(b => b.id === 'first_correct')) {
        newBadges.push({
            id: 'first_correct',
            name: '首次正确',
            icon: 'fas fa-star',
            description: '完成第一道题目'
        });
    }
    
    // 连续正确勋章
    if (consecutiveCorrect >= 3 && !badges.find(b => b.id === 'streak_3')) {
        newBadges.push({
            id: 'streak_3',
            name: '连续3题正确',
            icon: 'fas fa-bolt',
            description: '连续答对3道题目'
        });
    }
    
    if (consecutiveCorrect >= 5 && !badges.find(b => b.id === 'streak_5')) {
        newBadges.push({
            id: 'streak_5',
            name: '连续5题正确',
            icon: 'fas fa-rocket',
            description: '连续答对5道题目'
        });
    }
    
    if (consecutiveCorrect >= 10 && !badges.find(b => b.id === 'streak_10')) {
        newBadges.push({
            id: 'streak_10',
            name: '连续10题正确',
            icon: 'fas fa-fire',
            description: '连续答对10道题目'
        });
    }
    
    // 完成所有题目勋章
    if (completed.length === getCurrentQuestions().length && !badges.find(b => b.id === 'all_completed')) {
        newBadges.push({
            id: 'all_completed',
            name: '完成所有题目',
            icon: 'fas fa-trophy',
            description: '完成所有编程挑战题目'
        });
    }
    
    // 快速学习者勋章
    if (totalCorrectAnswers >= 5 && !badges.find(b => b.id === 'fast_learner')) {
        newBadges.push({
            id: 'fast_learner',
            name: '快速学习者',
            icon: 'fas fa-bolt',
            description: '快速完成5道题目'
        });
    }
    
    // 等级勋章
    if (level >= 5 && !badges.find(b => b.id === 'level_5')) {
        newBadges.push({
            id: 'level_5',
            name: '等级5',
            icon: 'fas fa-gem',
            description: '达到等级5'
        });
    }
    
    if (level >= 10 && !badges.find(b => b.id === 'level_10')) {
        newBadges.push({
            id: 'level_10',
            name: '等级10',
            icon: 'fas fa-crown',
            description: '达到等级10'
        });
    }
    
    // 连续登录勋章
    if (streakDays >= 3 && !badges.find(b => b.id === 'streak_3_days')) {
        newBadges.push({
            id: 'streak_3_days',
            name: '连续3天',
            icon: 'fas fa-calendar',
            description: '连续3天登录学习'
        });
    }
    
    if (streakDays >= 7 && !badges.find(b => b.id === 'streak_7_days')) {
        newBadges.push({
            id: 'streak_7_days',
            name: '连续7天',
            icon: 'fas fa-calendar-check',
            description: '连续7天登录学习'
        });
    }
    
    // 学习时长勋章
    if (totalPlayTime >= 60 && !badges.find(b => b.id === 'learner_1h')) {
        newBadges.push({
            id: 'learner_1h',
            name: '学习1小时',
            icon: 'fas fa-clock',
            description: '累计学习1小时'
        });
    }
    
    if (totalPlayTime >= 300 && !badges.find(b => b.id === 'learner_5h')) {
        newBadges.push({
            id: 'learner_5h',
            name: '学习5小时',
            icon: 'fas fa-hourglass',
            description: '累计学习5小时'
        });
    }
    
    // 添加新勋章并显示动画（使用弹窗队列）
newBadges.forEach(badge => {
    badges.push(badge);
    showBadgeAnimation(badge);
    
    // 勋章奖励经验值
    addXP(50, `获得勋章: ${badge.name}`);
});
    
    if (newBadges.length > 0) {
        saveBadges();
        updateBadgeDisplay();
    }
}

// 显示勋章获得动画
function showBadgeAnimation(badge) {
    popupQueue.push(() => {
        const animationEl = document.createElement('div');
        animationEl.className = 'fixed inset-0 flex items-center justify-center z-50';
        animationEl.innerHTML = `
            <div class="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg p-8 shadow-2xl text-white text-center flex flex-col justify-center items-center animate-pulse" style="width: 300px; height: 300px; border: 4px solid gold; box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);">
                <div class="text-8xl mb-4 animate-bounce">
                    <i class="fa ${badge.icon}"></i>
                </div>
                <h3 class="text-3xl font-bold mb-2 text-yellow-300">获得新勋章！</h3>
                <p class="text-xl mb-2 max-w-[250px]">${badge.name}</p>
                <p class="text-sm opacity-90 mb-4">${badge.description}</p>
                <button class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-110">
                    🎉 太棒了！
                </button>
                <div class="mt-4 text-2xl">✨🌟⭐️</div>
            </div>
        `;
        document.body.appendChild(animationEl);
        
        // 添加按钮点击事件
        const button = animationEl.querySelector('button');
        button.addEventListener('click', () => {
            if (animationEl.parentElement) {
                animationEl.remove();
            }
        });
        
        // 播放获得勋章音效
        playBadgeSound();
        
        // 添加彩带效果
        createConfettiEffect();
        
        // 添加额外的烟花效果
        setTimeout(() => {
            createFireworksEffect();
        }, 500);
        
        // 页面上的勋章和勋字按钮闪烁5次
        const pageBadgeIcon = document.querySelector('#badge-container i');
        const badgeCollapsed = document.getElementById('badge-collapsed');
        let flashCount = 0;
        const maxFlashes = 5;
        
        const flashBadge = () => {
            if (flashCount < maxFlashes) {
                // 勋章图标闪烁
                if (pageBadgeIcon) {
                    pageBadgeIcon.classList.remove('animate-pulse');
                    void pageBadgeIcon.offsetWidth; // 触发重绘
                    pageBadgeIcon.classList.add('animate-pulse');
                }
                
                // 勋字按钮闪烁
                if (badgeCollapsed) {
                    badgeCollapsed.classList.remove('animate-pulse');
                    void badgeCollapsed.offsetWidth; // 触发重绘
                    badgeCollapsed.classList.add('animate-pulse');
                }
                
                flashCount++;
                setTimeout(flashBadge, 1200); // 1200ms间隔，更舒适的速度
            } else {
                // 闪烁结束后移除动画类
                if (pageBadgeIcon) {
                    pageBadgeIcon.classList.remove('animate-pulse');
                }
                if (badgeCollapsed) {
                    badgeCollapsed.classList.remove('animate-pulse');
                }
            }
        };
        
        // 开始闪烁
        setTimeout(flashBadge, 1000);
        
        // 4秒后自动移除
        setTimeout(() => {
            if (animationEl.parentElement) {
                animationEl.remove();
            }
        }, 4000);
    });
    
    // 启动弹窗队列
    showNextPopup();
}

// 播放获得勋章音效
function playBadgeSound() {
    const synth = new Tone.Synth({
        oscillator: {
            type: "triangle"
        },
        envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.3,
            release: 0.4
        }
    }).toDestination();
    
    // 播放清脆的音调
    synth.triggerAttackRelease("E6", "16n");
    setTimeout(() => {
        synth.triggerAttackRelease("G6", "16n");
    }, 50);
    setTimeout(() => {
        synth.triggerAttackRelease("C7", "16n");
    }, 100);
    setTimeout(() => {
        synth.triggerAttackRelease("E7", "16n");
    }, 150);
    
    // 播放完成后释放资源
    setTimeout(() => {
        synth.dispose();
    }, 1000);
}
        
        