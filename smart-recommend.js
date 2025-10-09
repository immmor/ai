// 智能推荐功能模块
class SmartRecommend {
    constructor() {
        this.recommendations = [];
        this.userPreferences = {
            difficulty: 'medium',
            topics: [],
            learningStyle: 'balanced'
        };
        this.loadPreferences();
    }

    // 加载用户偏好
    loadPreferences() {
        const saved = localStorage.getItem('userPreferences');
        if (saved) {
            this.userPreferences = JSON.parse(saved);
        }
    }

    // 保存用户偏好
    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    }

    // 更新用户偏好
    updatePreferences(preferences) {
        this.userPreferences = { ...this.userPreferences, ...preferences };
        this.savePreferences();
    }

    // 分析学习数据并生成推荐
    generateRecommendations(learningStats, wrongQuestions) {
        const stats = learningStats.getStats();
        const wrongQues = wrongQuestions.getWrongQuestions();
        
        this.recommendations = [];

        // 基于正确率推荐
        if (stats.accuracy < 60) {
            this.recommendations.push({
                type: 'difficulty',
                title: '建议降低难度',
                description: '当前正确率较低，建议先从简单题目开始练习',
                priority: 'high',
                action: 'switch_difficulty'
            });
        } else if (stats.accuracy > 80) {
            this.recommendations.push({
                type: 'difficulty',
                title: '可以挑战更高难度',
                description: '当前掌握情况良好，可以尝试更有挑战性的题目',
                priority: 'medium',
                action: 'increase_difficulty'
            });
        }

        // 基于错题推荐复习
        if (wrongQues.length > 0) {
            const recentWrong = wrongQues.slice(0, 3);
            const topics = [...new Set(recentWrong.map(wq => wq.topic))];
            
            this.recommendations.push({
                type: 'review',
                title: '错题复习建议',
                description: `建议复习${topics.join('、')}相关的错题`,
                priority: 'high',
                action: 'review_wrong_questions'
            });
        }

        // 基于学习时间推荐
        if (stats.studyTime < 30) {
            this.recommendations.push({
                type: 'time',
                title: '增加学习时间',
                description: '建议每天至少学习30分钟以获得更好的效果',
                priority: 'medium',
                action: 'increase_study_time'
            });
        }

        // 基于连续学习天数推荐
        if (stats.streakDays >= 3) {
            this.recommendations.push({
                type: 'motivation',
                title: '保持学习习惯',
                description: `已连续学习${stats.streakDays}天，继续保持！`,
                priority: 'low',
                action: 'continue_streak'
            });
        }

        // 基于主题掌握度推荐
        Object.entries(stats.topicMastery).forEach(([topic, mastery]) => {
            const masteryPercent = Math.round((mastery.correct / mastery.total) * 100);
            
            if (masteryPercent < 50) {
                this.recommendations.push({
                    type: 'topic',
                    title: `${topic}需要加强`,
                    description: `该主题掌握度较低(${masteryPercent}%)，建议重点练习`,
                    priority: 'high',
                    action: 'focus_topic'
                });
            }
        });

        // 按优先级排序
        this.recommendations.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });

        return this.recommendations;
    }

    // 获取个性化学习路径
    getPersonalizedPath(learningStats) {
        const stats = learningStats.getStats();
        const path = [];

        // 根据掌握度推荐学习顺序
        const topicMastery = Object.entries(stats.topicMastery)
            .map(([topic, mastery]) => ({
                topic,
                mastery: Math.round((mastery.correct / mastery.total) * 100)
            }))
            .sort((a, b) => a.mastery - b.mastery);

        // 推荐薄弱主题优先
        topicMastery.slice(0, 2).forEach(item => {
            if (item.mastery < 70) {
                path.push({
                    step: `加强${item.topic}练习`,
                    description: `当前掌握度${item.mastery}%，建议重点练习`,
                    estimatedTime: '20分钟',
                    priority: 'high'
                });
            }
        });

        // 推荐错题复习
        if (this.recommendations.some(rec => rec.type === 'review')) {
            path.push({
                step: '错题复习',
                description: '复习最近做错的题目',
                estimatedTime: '15分钟',
                priority: 'medium'
            });
        }

        // 推荐新主题探索
        if (stats.accuracy > 70) {
            path.push({
                step: '探索新主题',
                description: '尝试学习新的知识点',
                estimatedTime: '25分钟',
                priority: 'low'
            });
        }

        return path;
    }

    // 显示推荐面板
    showRecommendationsPanel(learningStats, wrongQuestions) {
        const recommendations = this.generateRecommendations(learningStats, wrongQuestions);
        const personalizedPath = this.getPersonalizedPath(learningStats);
        
        const panel = document.createElement('div');
        panel.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
        panel.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 h-[600px] flex flex-col overflow-hidden">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex-shrink-0">
                    <h3 class="text-lg font-bold text-white flex items-center justify-between">
                        <span>
                            <i class="fas fa-robot mr-2"></i>
                            智能推荐
                        </span>
                        <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-200">
                            <i class="fas fa-times"></i>
                        </button>
                    </h3>
                </div>
                <div class="flex-1 overflow-y-auto p-4">
                    <div class="mb-6">
                        <h4 class="font-semibold mb-3 text-purple-600">个性化学习路径</h4>
                        <div class="space-y-2">
                            ${personalizedPath.map((step, index) => `
                                <div class="flex items-start p-3 bg-purple-50 rounded-lg">
                                    <span class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3">${index + 1}</span>
                                    <div>
                                        <div class="font-medium">${step.step}</div>
                                        <div class="text-sm text-gray-600">${step.description}</div>
                                        <div class="text-xs text-purple-500">预计时间: ${step.estimatedTime}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-3 text-blue-600">学习建议</h4>
                        <div class="space-y-3">
                            ${recommendations.map(rec => `
                                <div class="p-3 rounded-lg border-l-4 ${
                                    rec.priority === 'high' ? 'bg-red-50 border-red-500' :
                                    rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                                    'bg-green-50 border-green-500'
                                }">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <div class="font-medium">${rec.title}</div>
                                            <div class="text-sm text-gray-600 mt-1">${rec.description}</div>
                                        </div>
                                        <span class="text-xs px-2 py-1 rounded-full ${
                                            rec.priority === 'high' ? 'bg-red-200 text-red-800' :
                                            rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                                            'bg-green-200 text-green-800'
                                        }">${rec.priority === 'high' ? '高优先级' : rec.priority === 'medium' ? '中优先级' : '低优先级'}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="border-t p-3 flex-shrink-0">
                    <button onclick="this.closest('.fixed').remove()" class="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm">
                        关闭
                    </button>
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

    // 获取推荐数量
    getRecommendationCount() {
        return this.recommendations.length;
    }
}

// 创建全局实例
window.smartRecommend = new SmartRecommend();