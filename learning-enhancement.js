// 学习增强功能主模块 - 整合所有功能
class LearningEnhancement {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    // 初始化所有功能
    init() {
        if (this.isInitialized) return;
        
        console.log('学习增强功能开始初始化...');
        
        // 检查依赖模块是否已加载
        console.log('依赖模块状态:', {
            learningStats: !!window.learningStats,
            wrongQuestions: !!window.wrongQuestions,
            smartRecommend: !!window.smartRecommend
        });
        
        // 等待页面完全加载，确保答题系统变量已初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // 额外延迟确保答题系统完全初始化
                setTimeout(() => this.setupEnhancements(), 100);
            });
        } else {
            // 页面已加载，但需要确保答题系统变量已初始化
            setTimeout(() => this.setupEnhancements(), 100);
        }
        
        this.isInitialized = true;
        console.log('学习增强功能初始化完成');
    }

    // 设置增强功能
    setupEnhancements() {
        this.addEnhancementButtons();
        this.setupEventListeners();
        this.startSessionTimer();
    }

    // 添加增强功能按钮
    addEnhancementButtons() {
        // 现在只添加学按钮，其他功能都集成到上拉框中
        // 学按钮已经在HTML中直接添加，这里不需要额外操作
    }

    // 设置事件监听器
    setupEventListeners() {
        // 学按钮点击事件 - 显示上拉框
        document.getElementById('learn-btn')?.addEventListener('click', () => {
            this.toggleLearnPanel();
        });

        // 上拉框功能按钮点击事件
        document.getElementById('stats-panel-btn')?.addEventListener('click', () => {
            this.hideLearnPanel();
            if (window.learningStats && window.learningStats.showStatsPanel) {
                setTimeout(() => window.learningStats.showStatsPanel(), 300);
            } else {
                console.warn('学习统计模块不可用');
            }
        });

        document.getElementById('wrong-questions-panel-btn')?.addEventListener('click', () => {
            this.hideLearnPanel();
            if (window.wrongQuestions && window.wrongQuestions.showWrongQuestionsPanel) {
                setTimeout(() => window.wrongQuestions.showWrongQuestionsPanel(), 300);
            } else {
                console.warn('错题本模块不可用');
            }
        });

        document.getElementById('recommend-panel-btn')?.addEventListener('click', () => {
            this.hideLearnPanel();
            if (window.smartRecommend && window.smartRecommend.showRecommendationsPanel && 
                window.learningStats && window.wrongQuestions) {
                setTimeout(() => window.smartRecommend.showRecommendationsPanel(window.learningStats, window.wrongQuestions), 300);
            } else {
                console.warn('智能推荐模块不可用');
            }
        });

        document.getElementById('settings-panel-btn')?.addEventListener('click', () => {
            this.hideLearnPanel();
            this.showSettingsPanel();
        });

        // 点击背景关闭上拉框
        document.getElementById('learn-panel')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideLearnPanel();
            }
        });

        // 监听答题结果（需要与现有答题系统集成）
        this.setupAnswerTracking();
    }

    // 设置答题跟踪
    setupAnswerTracking() {
        console.log('开始设置答题跟踪...');
        
        // 检查全局作用域中是否有checkAnswer函数
        if (typeof checkAnswer === 'function') {
            console.log('找到全局checkAnswer函数，准备重写');
            
            // 保存原始函数
            const originalCheckAnswer = checkAnswer;
            
            // 重写全局checkAnswer函数
            checkAnswer = function(answer) {
                console.log('答题跟踪被调用，答案:', answer);
                const result = originalCheckAnswer.call(this, answer);
                
                // 安全检查：确保必要的变量存在
                if (!randomQuestions || currentRandomIndex === undefined || typeof getCurrentQuestions !== 'function') {
                    console.warn('答题跟踪：缺少必要的变量，跳过数据记录');
                    return result;
                }
                
                // 获取当前题目信息
                const questionIndex = randomQuestions[currentRandomIndex];
                const questions = getCurrentQuestions();
                
                if (!questions || questionIndex === undefined || questionIndex >= questions.length) {
                    console.warn('答题跟踪：无效的题目索引，跳过数据记录');
                    return result;
                }
                
                const question = questions[questionIndex];
                
                console.log('题目信息:', {
                    questionIndex: questionIndex,
                    question: question,
                    result: result,
                    learningStats: !!window.learningStats,
                    wrongQuestions: !!window.wrongQuestions
                });
                
                // 记录学习统计
                if (window.learningStats) {
                    const topic = window.learningEnhancement.getCurrentTopicName();
                    console.log('记录学习统计，主题:', topic, '结果:', result);
                    window.learningStats.recordAnswer(result, topic);
                }
                
                // 记录错题
                if (!result && window.wrongQuestions) {
                    const topic = window.learningEnhancement.getCurrentTopicName();
                    console.log('记录错题，主题:', topic);
                    window.wrongQuestions.addWrongQuestion(
                        question.title || question.question,
                        answer,
                        question.correct || question.correctAnswer,
                        topic
                    );
                }
                
                return result;
            };
            
            console.log('答题跟踪设置完成');
        } else {
            console.warn('未找到全局checkAnswer函数，答题跟踪无法设置');
        }
    }

    // 获取当前主题名称
    getCurrentTopicName() {
        const bankNames = {
            'questions': 'Go区块链',
            'questionsaiagent': 'AI Agent',
            'questionspython': 'Python',
            'questionsreactts': 'React',
            'questionsgomicro': 'Go微服务',
            'questionscrypto': '加密概念',
            'questionscontract': '智能合约',
            'questionsenglish': '英语学习',
            'questionsstock': '股票投资'
        };
        
        return bankNames[window.currentQuestionBank] || '未知主题';
    }

    // 启动会话计时器
    startSessionTimer() {
        let sessionStartTime = Date.now();
        
        // 每分钟记录一次学习时间
        setInterval(() => {
            if (window.learningStats) {
                const minutes = Math.round((Date.now() - sessionStartTime) / 60000);
                if (minutes > 0) {
                    window.learningStats.recordStudyTime(minutes);
                    sessionStartTime = Date.now(); // 重置计时器
                }
            }
        }, 60000); // 每分钟检查一次

        // 页面卸载时记录剩余时间
        window.addEventListener('beforeunload', () => {
            if (window.learningStats) {
                const minutes = Math.round((Date.now() - sessionStartTime) / 60000);
                if (minutes > 0) {
                    window.learningStats.recordStudyTime(minutes);
                }
            }
        });
    }

    // 上拉框显示/隐藏控制
    toggleLearnPanel() {
        const panel = document.getElementById('learn-panel');
        if (!panel) return;
        
        if (panel.classList.contains('hidden')) {
            this.showLearnPanel();
        } else {
            this.hideLearnPanel();
        }
    }

    showLearnPanel() {
        const panel = document.getElementById('learn-panel');
        const learnBtn = document.getElementById('learn-btn');
        if (!panel) return;
        
        if (learnBtn) {
            const btnRect = learnBtn.getBoundingClientRect();
            const panelWidth = 100; // w-25 的宽度
            const offset = 10; // 与按钮的间距
            
            // 计算位置：学按钮正上方
            // 水平居中：按钮中心对齐上拉框中心
            const left = btnRect.left + btnRect.width / 2 - panelWidth / 2;
            // 垂直上方：按钮顶部上方
            const bottom = window.innerHeight - btnRect.top + offset;
            
            panel.style.position = 'fixed';
            panel.style.left = Math.max(10, left) + 'px'; // 确保不超出左边界
            panel.style.right = 'auto';
            panel.style.bottom = bottom + 'px';
            panel.style.transform = 'translateY(0) scale(1)';
            panel.style.opacity = '1';
        } else {
            // 备用位置：屏幕底部居中
            panel.style.position = 'fixed';
            panel.style.left = '50%';
            panel.style.bottom = '20px';
            panel.style.transform = 'translateX(-50%) translateY(0) scale(1)';
            panel.style.opacity = '1';
        }
        
        panel.classList.remove('hidden');
        
        // 添加背景遮罩
        this.createOverlay();
    }

    hideLearnPanel() {
        const panel = document.getElementById('learn-panel');
        if (!panel) return;
        
        panel.style.transform = 'translateY(100%) scale(1)';
        panel.style.opacity = '0';
        
        setTimeout(() => {
            panel.classList.add('hidden');
        }, 300);
        
        // 移除背景遮罩
        this.removeOverlay();
    }

    // 创建背景遮罩
    createOverlay() {
        if (document.getElementById('learn-panel-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'learn-panel-overlay';
        overlay.className = 'fixed inset-0 bg-black/20 z-10';
        overlay.addEventListener('click', () => this.hideLearnPanel());
        
        document.body.appendChild(overlay);
    }

    // 移除背景遮罩
    removeOverlay() {
        const overlay = document.getElementById('learn-panel-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    // 显示设置面板
    showSettingsPanel() {
        const settingsPanel = `
            <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                    <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                        <h3 class="text-lg font-bold text-white">学习设置</h3>
                    </div>
                    <div class="p-4 space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">学习目标</label>
                            <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                                <option>每日10题</option>
                                <option>每日20题</option>
                                <option>每日30题</option>
                                <option>不限数量</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">难度偏好</label>
                            <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                                <option>循序渐进</option>
                                <option>中等难度</option>
                                <option>挑战模式</option>
                            </select>
                        </div>
                        <div class="flex items-center">
                            <input type="checkbox" id="auto-review" class="mr-2">
                            <label for="auto-review" class="text-sm text-gray-700">自动复习错题</label>
                        </div>
                    </div>
                    <div class="border-t p-3">
                        <button onclick="this.closest('.fixed').remove()" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                            保存设置
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', settingsPanel);
    }

    // 获取功能状态
    getFeatureStatus() {
        return {
            learningStats: !!window.learningStats,
            wrongQuestions: !!window.wrongQuestions,
            smartRecommend: !!window.smartRecommend,
            isInitialized: this.isInitialized
        };
    }
}

// 创建全局实例
window.learningEnhancement = new LearningEnhancement();