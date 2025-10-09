// 错题本功能模块
class WrongQuestions {
    constructor() {
        this.wrongQuestions = [];
        this.loadWrongQuestions();
    }

    // 加载错题本
    loadWrongQuestions() {
        const saved = localStorage.getItem('wrongQuestions');
        if (saved) {
            this.wrongQuestions = JSON.parse(saved);
        }
    }

    // 保存错题本
    saveWrongQuestions() {
        localStorage.setItem('wrongQuestions', JSON.stringify(this.wrongQuestions));
    }

    // 添加错题
    addWrongQuestion(question, userAnswer, correctAnswer, topic) {
        const wrongQuestion = {
            id: Date.now(),
            question: question,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            topic: topic,
            timestamp: new Date().toISOString(),
            reviewCount: 0,
            lastReviewed: null
        };
        
        // 检查是否已存在相同错题
        const existingIndex = this.wrongQuestions.findIndex(wq => 
            wq.question === question && wq.topic === topic
        );
        
        if (existingIndex !== -1) {
            // 更新现有错题
            this.wrongQuestions[existingIndex] = wrongQuestion;
        } else {
            // 添加新错题
            this.wrongQuestions.unshift(wrongQuestion);
        }
        
        this.saveWrongQuestions();
    }

    // 移除错题
    removeWrongQuestion(id) {
        this.wrongQuestions = this.wrongQuestions.filter(wq => wq.id !== id);
        this.saveWrongQuestions();
    }

    // 标记为已复习
    markAsReviewed(id) {
        const question = this.wrongQuestions.find(wq => wq.id === id);
        if (question) {
            question.reviewCount++;
            question.lastReviewed = new Date().toISOString();
            this.saveWrongQuestions();
        }
    }

    // 获取错题列表
    getWrongQuestions() {
        return this.wrongQuestions;
    }

    // 获取按主题分组的错题
    getWrongQuestionsByTopic() {
        const grouped = {};
        this.wrongQuestions.forEach(wq => {
            if (!grouped[wq.topic]) {
                grouped[wq.topic] = [];
            }
            grouped[wq.topic].push(wq);
        });
        return grouped;
    }

    // 显示错题本面板
    showWrongQuestionsPanel() {
        const wrongQuestions = this.getWrongQuestions();
        
        const panel = document.createElement('div');
        panel.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
        panel.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[60vh] flex flex-col overflow-hidden">
                <div class="bg-gradient-to-r from-red-500 to-orange-500 p-4 flex-shrink-0">
                    <h3 class="text-lg font-bold text-white flex items-center justify-between">
                        <span>
                            <i class="fas fa-book mr-2"></i>
                            错题本 (${wrongQuestions.length})
                        </span>
                        <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-200">
                            <i class="fas fa-times"></i>
                        </button>
                    </h3>
                </div>
                <div class="flex-1 overflow-y-auto p-4">
                    ${wrongQuestions.length === 0 ? `
                        <div class="text-center py-8 text-gray-500">
                            <i class="fas fa-check-circle text-4xl mb-2"></i>
                            <p>暂无错题记录</p>
                        </div>
                    ` : `
                        <div class="space-y-4">
                            ${wrongQuestions.map(wq => `
                                <div class="border rounded-lg p-3 bg-red-50">
                                    <div class="flex justify-between items-start mb-2">
                                        <span class="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">${wq.topic}</span>
                                        <button onclick="wrongQuestions.removeWrongQuestion(${wq.id})" class="text-red-500 hover:text-red-700 text-xs">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                    <div class="text-sm font-medium mb-1">${wq.question}</div>
                                    <div class="text-xs text-gray-600 mb-1">
                                        <span class="text-red-500">你的答案: ${wq.userAnswer}</span>
                                    </div>
                                    <div class="text-xs text-gray-600">
                                        <span class="text-green-500">正确答案: ${wq.correctAnswer}</span>
                                    </div>
                                    <div class="flex justify-between items-center mt-2 text-xs text-gray-500">
                                        <span>复习次数: ${wq.reviewCount}</span>
                                        <span>${new Date(wq.timestamp).toLocaleDateString()}</span>
                                    </div>
                                    <button onclick="wrongQuestions.markAsReviewed(${wq.id}); this.closest('.fixed').remove()" 
                                            class="w-full mt-2 bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs">
                                        标记为已复习
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    `}
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

    // 清空错题本
    clearWrongQuestions() {
        this.wrongQuestions = [];
        this.saveWrongQuestions();
    }

    // 获取需要复习的错题（最近3天内的错题）
    getReviewQuestions() {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        
        return this.wrongQuestions.filter(wq => {
            const lastReviewed = wq.lastReviewed ? new Date(wq.lastReviewed) : new Date(wq.timestamp);
            return lastReviewed < threeDaysAgo;
        });
    }
}

// 创建全局实例
window.wrongQuestions = new WrongQuestions();