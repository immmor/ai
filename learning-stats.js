// 学习统计功能模块
class LearningStats {
    constructor() {
        this.stats = {
            totalQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            streakDays: 0,
            lastStudyDate: null,
            topicMastery: {},
            studyTime: 0
        };
        this.loadStats();
    }

    // 加载统计数据
    loadStats() {
        const savedStats = localStorage.getItem('learningStats');
        if (savedStats) {
            this.stats = JSON.parse(savedStats);
        }
        this.updateStreak();
    }

    // 保存统计数据
    saveStats() {
        localStorage.setItem('learningStats', JSON.stringify(this.stats));
    }

    // 更新连续学习天数
    updateStreak() {
        const today = new Date().toDateString();
        const lastDate = this.stats.lastStudyDate ? new Date(this.stats.lastStudyDate).toDateString() : null;
        
        if (!lastDate) {
            this.stats.streakDays = 1;
        } else if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate === yesterday.toDateString()) {
                this.stats.streakDays++;
            } else {
                this.stats.streakDays = 1;
            }
        }
        
        this.stats.lastStudyDate = new Date().toISOString();
        this.saveStats();
    }

    // 记录答题结果
    recordAnswer(isCorrect, topic) {
        this.stats.totalQuestions++;
        
        if (isCorrect) {
            this.stats.correctAnswers++;
        } else {
            this.stats.wrongAnswers++;
        }

        // 更新主题掌握度
        if (!this.stats.topicMastery[topic]) {
            this.stats.topicMastery[topic] = { correct: 0, total: 0 };
        }
        
        this.stats.topicMastery[topic].total++;
        if (isCorrect) {
            this.stats.topicMastery[topic].correct++;
        }

        this.saveStats();
    }

    // 记录学习时间
    recordStudyTime(minutes) {
        this.stats.studyTime += minutes;
        this.saveStats();
    }

    // 获取统计数据
    getStats() {
        const accuracy = this.stats.totalQuestions > 0 
            ? Math.round((this.stats.correctAnswers / this.stats.totalQuestions) * 100) 
            : 0;
            
        return {
            ...this.stats,
            accuracy: accuracy
        };
    }

    // 获取主题掌握度
    getTopicMastery(topic) {
        if (!this.stats.topicMastery[topic]) {
            return 0;
        }
        const mastery = this.stats.topicMastery[topic];
        return Math.round((mastery.correct / mastery.total) * 100);
    }

    // 重置统计数据
    resetStats() {
        this.stats = {
            totalQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            streakDays: 0,
            lastStudyDate: null,
            topicMastery: {},
            studyTime: 0
        };
        this.saveStats();
    }

    // 显示统计面板
    showStatsPanel() {
        const stats = this.getStats();
        
        const panel = document.createElement('div');
        panel.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
        panel.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
                <div class="bg-gradient-to-r from-green-500 to-blue-500 p-4">
                    <h3 class="text-lg font-bold text-white flex items-center">
                        <i class="fas fa-chart-line mr-2"></i>
                        学习统计
                    </h3>
                </div>
                <div class="p-4 space-y-4 overflow-y-auto">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="text-center p-3 bg-green-50 rounded-lg">
                            <div class="text-2xl font-bold text-green-600">${stats.totalQuestions}</div>
                            <div class="text-xs text-gray-600">总答题数</div>
                        </div>
                        <div class="text-center p-3 bg-blue-50 rounded-lg">
                            <div class="text-2xl font-bold text-blue-600">${stats.accuracy}%</div>
                            <div class="text-xs text-gray-600">正确率</div>
                        </div>
                        <div class="text-center p-3 bg-yellow-50 rounded-lg">
                            <div class="text-2xl font-bold text-yellow-600">${stats.streakDays}</div>
                            <div class="text-xs text-gray-600">连续学习天数</div>
                        </div>
                        <div class="text-center p-3 bg-purple-50 rounded-lg">
                            <div class="text-2xl font-bold text-purple-600">${Math.round(stats.studyTime / 60)}</div>
                            <div class="text-xs text-gray-600">学习时长(小时)</div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h4 class="font-semibold mb-2">主题掌握度</h4>
                        <div class="space-y-2">
                            ${Object.entries(stats.topicMastery).map(([topic, mastery]) => {
                                const masteryPercent = Math.round((mastery.correct / mastery.total) * 100);
                                return `
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm">${topic}</span>
                                        <div class="w-20 bg-gray-200 rounded-full h-2">
                                            <div class="bg-green-500 h-2 rounded-full" style="width: ${masteryPercent}%"></div>
                                        </div>
                                        <span class="text-xs text-gray-600">${masteryPercent}%</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    
                    <div class="flex space-x-2">
                        <button onclick="learningStats.resetStats()" class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm">
                            重置统计
                        </button>
                        <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm">
                            关闭
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // 点击背景关闭
        panel.addEventListener('click', (e) => {
            if (e.target === panel) {
                panel.remove();
            }
        });
    }
}

// 创建全局实例
window.learningStats = new LearningStats();