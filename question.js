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
    
    // 更新当前题库
    currentQuestionBank = bankName;
    
    // 重置游戏状态
    currentRandomIndex = 0;
    completed = [];
    totalCorrectAnswers = 0;
    consecutiveCorrect = 0;
    
    // 重新初始化题目数组
    initRandomQuestions();
    
    // 加载新题库的第一题
    loadQuestion(currentRandomIndex);
    
    // 更新题库选择按钮的选中状态
    updateQuestionBankSelection();
    
    // 显示切换成功的提示
    let bankDisplayName = 'Go区块链';
    if (bankName === 'questionswrong') {
        bankDisplayName = '错题本';
    } else if (bankName === 'questionsaiagent') {
        bankDisplayName = 'AI Agent';
    } else if (bankName === 'questionspython') {
        bankDisplayName = 'Python编程';
    } else if (bankName === 'questionsreactts') {
        bankDisplayName = 'React';
    } else if (bankName === 'questionsgomicro') {
        bankDisplayName = 'Go微服务';
    } else if (bankName === 'questionscrypto') {
        bankDisplayName = '加密概念';
    } else if (bankName === 'questionscontract') {
        bankDisplayName = '智能合约';
    }
    // showFeedback(`已切换到${bankDisplayName}题库`, 'success');
}

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
    const currentOption = document.querySelector(`.question-bank-option[data-bank="${currentQuestionBank}"]`);
    if (currentOption) {
        currentOption.classList.add('bg-blue-50', 'text-blue-600', 'font-medium');
        currentOption.classList.remove('hover:bg-gray-100');
    }
}
        