// 全局变量：当前题目计时器
window.currentQuestionTimer = null;
window.currentQuestionTime = 0;

// 初始化随机题目数组
function initRandomQuestions() {
    // 获取当前题库的题目数组
    const currentQuestions = getCurrentQuestions();
    
    // 创建题目索引数组
    const questionIndices = Array.from({length: currentQuestions.length}, (_, i) => i);
    
    // 确保id为1的题目总是第一题
    const id1Index = questionIndices.findIndex(i => currentQuestions[i].id === 1);
    if (id1Index !== -1 && id1Index !== 0) {
        // 将id为1的题目移到数组开头
        [questionIndices[0], questionIndices[id1Index]] = [questionIndices[id1Index], questionIndices[0]];
    }
    
    // 随机打乱剩余题目（从第2个开始）
    for (let i = questionIndices.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * (i - 1)) + 1;
        [questionIndices[i], questionIndices[j]] = [questionIndices[j], questionIndices[i]];
    }
    
    randomQuestions = questionIndices;
    currentRandomIndex = 0;
    
    console.log('题目顺序:', randomQuestions.map(i => currentQuestions[i].title));
}

// 获取当前题库的题目数组
function getCurrentQuestions() {
    if (currentQuestionBank === 'questionswrong') {
        // 从错题本获取题目
        const wrongQuestions = window.wrongQuestions.getWrongQuestions();
        // 将错题转换为标准题目格式
        return wrongQuestions.map((wq, index) => {
            // 如果有完整的题目信息，则优先使用它
            if (wq.fullQuestionData) {
                // 复制原始题目信息并添加错题相关信息
                const questionWithWrongInfo = {
                    ...wq.fullQuestionData,
                    id: index + 1,
                    originalWrongQuestion: wq,
                    // 添加错题标记，方便识别
                    isWrongQuestion: true,
                    // 更新提示信息
                    hint: wq.correctAnswer,
                    // 保留正确答案
                    correctAnswer: wq.correctAnswer,
                    correct: wq.correctAnswer
                };
                return questionWithWrongInfo;
            } else {
                // 如果没有完整题目信息，使用基础格式
                return {
                    id: index + 1,
                    type: 'fill',
                    title: `${wq.topic}: ${wq.question.substring(0, 30)}...`,
                    content: `<div class="p-4 text-sm">
                                <p class="mb-2 font-medium">${wq.question}</p>
                                <p class="text-xs text-gray-500 mb-2">你的答案: <span class="text-red-500">${wq.userAnswer}</span></p>
                                <p class="text-xs text-gray-500">正确答案: <span class="text-green-500">${wq.correctAnswer}</span></p>
                            </div>`,
                    instruction: `复习 ${wq.topic} 错题`,
                    hint: wq.correctAnswer,
                    explanation: '这是你之前做错的题目，请再次尝试回答',
                    fullSentence: wq.correctAnswer,
                    originalWrongQuestion: wq
                };
            }
        });
    } else if (currentQuestionBank === 'questionsaiagent') {
        return questionsaiagent;
    } else if (currentQuestionBank === 'questionspython') {
        return questionspython;
    } else if (currentQuestionBank === 'questionsrust') {
        return questionsrust;
    } else if (currentQuestionBank === 'questionsreactts') {
        return questionsreactts;
    } else if (currentQuestionBank === 'questionsgomicro') {
        return questionsgomicro;
    } else if (currentQuestionBank === 'questionscrypto') {
        return questionscrypto;
    } else if (currentQuestionBank === 'questionscontract') {
        return questionscontract;
    } else if (currentQuestionBank === 'questionsenglish') {
        return questionsenglish;
    } else if (currentQuestionBank === 'questionsstock') {
        return questionsstock;
    } else if (currentQuestionBank === 'questionsgerman') {
        return questionsgerman;
    } else if (currentQuestionBank === 'questionsroutine') {
        return questionsroutine;
    } else {
        return questions;
    }
}

// 设置题库选择功能
function setupQuestionBankToggle() {
    const bankBtn = document.getElementById('question-bank-btn');
    const bankMenu = document.getElementById('question-bank-menu');
    const bankOptions = document.querySelectorAll('.question-bank-option');
    
    // 点击题库按钮显示/隐藏下拉菜单
    bankBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        bankMenu.classList.toggle('hidden');
    });
    
    // 点击题库选项
    bankOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const bankName = option.dataset.bank;
            switchQuestionBank(bankName);
            bankMenu.classList.add('hidden');
        });
    });
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', () => {
        bankMenu.classList.add('hidden');
    });
    
    // 初始化选中状态
    updateQuestionBankSelection();
}

// 切换题库
function switchQuestionBank(bankName) {
    if (currentQuestionBank === bankName) return;
    
    // 清除当前题目计时器
    clearQuestionTimer();
    
    // 更新当前题库
    currentQuestionBank = bankName;
    
    // 重置游戏状态
    currentRandomIndex = 0;
    completed = [];
    totalCorrectAnswers = 0;
    consecutiveCorrect = 0;
    window.currentQuestionTime = 0;
    
    // 重新初始化题目数组
    initRandomQuestions();
    
    // 加载新题库的第一题
    loadQuestion(currentRandomIndex);
    
    // 更新题库选择按钮的选中状态
    updateQuestionBankSelection();
    
    // 显示切换成功的提示
    const bankDisplayName = getBankDisplayName(bankName);
    // showFeedback(`已切换到${bankDisplayName}题库`, 'success');
}

// 获取题库显示名称
function getBankDisplayName(bankName) {
    let bankDisplayName = 'Go区块链';
    if (bankName === 'questionswrong') {
        bankDisplayName = '错题本';
    } else if (bankName === 'questionsaiagent') {
        bankDisplayName = 'AI Agent';
    } else if (bankName === 'questionspython') {
        bankDisplayName = 'Python编程';
    } else if (bankName === 'questionsrust') {
        bankDisplayName = 'Rust编程';
    } else if (bankName === 'questionsreactts') {
        bankDisplayName = 'React';
    } else if (bankName === 'questionsgomicro') {
        bankDisplayName = 'Go微服务';
    } else if (bankName === 'questionscrypto') {
        bankDisplayName = '加密概念';
    } else if (bankName === 'questionscontract') {
        bankDisplayName = '智能合约';
    } else if (bankName === 'questionsenglish') {
        bankDisplayName = '英语学习';
    } else if (bankName === 'questionsstock') {
        bankDisplayName = '股票投资';
    } else if (bankName === 'questionsgerman') {
        bankDisplayName = '德语学习';
    } else if (bankName === 'questionsroutine') {
        bankDisplayName = '多语学习';
    }
    return bankDisplayName;
}

// 清除当前题目计时器
window.clearQuestionTimer = function() {
    if (window.currentQuestionTimer) {
        clearInterval(window.currentQuestionTimer);
        window.currentQuestionTimer = null;
        window.currentQuestionTime = 0;
    }
};

// 更新题目计时器显示
window.updateTimerDisplay = function() {
    const timerElement = document.getElementById('question-timer');
    if (timerElement) {
        timerElement.textContent = `${window.currentQuestionTime}s`;
    }
};

// 确保全局currentQuestionBank可用
window.currentQuestionBank = window.currentQuestionBank || 'default';

// 获取当前题库名称
window.getCurrentQuestionBank = function() {
    return window.currentQuestionBank;
};

// 设置当前题库名称
window.setCurrentQuestionBank = function(bank) {
    window.currentQuestionBank = bank;
    console.log('设置当前题库:', bank);
};

// 获取题目答题统计
window.getQuestionStats = function(questionIndex) {
    try {
        const bank = window.getCurrentQuestionBank();
        console.log('获取统计 - 题库:', bank, '题目索引:', questionIndex);
        
        // 从localStorage获取答题统计数据
        let statsData;
        try {
            const storedData = localStorage.getItem('questionStats');
            statsData = storedData ? JSON.parse(storedData) : {};
        } catch (e) {
            console.error('解析localStorage数据失败:', e);
            statsData = {};
        }
        
        const key = `${bank}_${questionIndex}`;
        const result = statsData[key] || { correct: 0, wrong: 0 };
        console.log('获取统计数据:', key, result);
        return result;
    } catch (error) {
        console.error('获取统计时出错:', error);
        return { correct: 0, wrong: 0 };
    }
};

// 更新题目答题统计
window.updateQuestionStats = function(questionIndex, isCorrect) {
    try {
        const bank = window.getCurrentQuestionBank();
        console.log('更新统计 - 题库:', bank, '题目索引:', questionIndex, '是否正确:', isCorrect);
        
        // 从localStorage获取答题统计数据
        let statsData;
        try {
            const storedData = localStorage.getItem('questionStats');
            statsData = storedData ? JSON.parse(storedData) : {};
            console.log('从localStorage获取数据成功');
        } catch (e) {
            console.error('解析localStorage数据失败:', e);
            statsData = {};
        }
        
        const key = `${bank}_${questionIndex}`;
        
        // 初始化或获取现有统计
        if (!statsData[key]) {
            statsData[key] = { correct: 0, wrong: 0 };
            console.log('初始化统计数据');
        }
        
        // 记录更新前的值用于调试
        const prevCorrect = statsData[key].correct;
        const prevWrong = statsData[key].wrong;
        
        // 更新统计
        if (isCorrect) {
            statsData[key].correct++;
            console.log('增加正确次数:', prevCorrect, '->', statsData[key].correct);
        } else {
            statsData[key].wrong++;
            console.log('增加错误次数:', prevWrong, '->', statsData[key].wrong);
        }
        
        // 保存回localStorage
        try {
            localStorage.setItem('questionStats', JSON.stringify(statsData));
            console.log('保存到localStorage成功');
            // 验证保存是否成功
            const verifyData = JSON.parse(localStorage.getItem('questionStats'));
            console.log('验证保存结果:', verifyData[key]);
        } catch (e) {
            console.error('保存到localStorage失败:', e);
        }
        
        // 使用setTimeout确保DOM已准备好
        setTimeout(() => {
            const correctElement = document.getElementById('question-correct-count');
            const wrongElement = document.getElementById('question-wrong-count');
            
            if (correctElement && wrongElement) {
                const stats = statsData[key];
                correctElement.textContent = `${stats.correct}`;
                wrongElement.textContent = `${stats.wrong}`;
                console.log('更新显示成功:', stats.correct, stats.wrong);
                
                // 添加视觉反馈，让用户看到数字变化
                if (isCorrect) {
                    correctElement.classList.add('scale-125');
                    setTimeout(() => correctElement.classList.remove('scale-125'), 300);
                } else {
                    wrongElement.classList.add('scale-125');
                    setTimeout(() => wrongElement.classList.remove('scale-125'), 300);
                }
            } else {
                console.error('无法找到显示元素');
            }
        }, 100);
    } catch (error) {
        console.error('更新统计时出错:', error);
    }
};

// 更新答题统计显示
window.updateQuestionStatsDisplay = function() {
    try {
        const correctElement = document.getElementById('question-correct-count');
        const wrongElement = document.getElementById('question-wrong-count');
        const bank = window.getCurrentQuestionBank();
        
        console.log('更新显示函数被调用，当前索引:', window.currentQuestionIndex, '当前题库:', bank);
        
        if (correctElement && wrongElement && window.currentQuestionIndex !== undefined) {
            const stats = window.getQuestionStats(window.currentQuestionIndex);
            console.log('获取到的统计数据:', stats);
            correctElement.textContent = `${stats.correct}`;
            wrongElement.textContent = `${stats.wrong}`;
            console.log('通过显示函数更新:', stats.correct, stats.wrong);
        } else {
            console.error('无法更新显示:', { 
                correctElementExists: !!correctElement, 
                wrongElementExists: !!wrongElement, 
                indexDefined: window.currentQuestionIndex !== undefined 
            });
        }
    } catch (error) {
        console.error('更新显示时出错:', error);
    }
};

// 更新题库选择按钮的选中状态
function updateQuestionBankSelection() {
    // 获取所有题库选项
    const bankOptions = document.querySelectorAll('.question-bank-option');
    
    // 重置所有选项的颜色
    bankOptions.forEach(option => {
        option.classList.remove('bg-blue-50', 'text-blue-600', 'font-medium');
        option.classList.add('hover:bg-gray-100');
    });
    
    // 为当前选中的题库添加颜色标记
    const currentOption = document.querySelector(`.question-bank-option[data-bank="${window.currentQuestionBank}"]`);
    if (currentOption) {
        currentOption.classList.add('bg-blue-50', 'text-blue-600', 'font-medium');
        currentOption.classList.remove('hover:bg-gray-100');
    }
}
        