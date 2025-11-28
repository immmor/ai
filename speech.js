// 检测文本语言（中文或英文）
function detectLanguage(text) {
    // 统计中文字符数量
    const chineseChars = text.match(/[\u4e00-\u9fff]/g) || [];
    const chineseCount = chineseChars.length;
    
    // 统计英文字符数量（字母和空格）
    const englishChars = text.match(/[a-zA-Z\s]/g) || [];
    const englishCount = englishChars.length;
    
    // 统计德文字符数量（包含德语特有字符）
    const germanChars = text.match(/[äöüßÄÖÜ]/g) || [];
    const germanCount = germanChars.length;
    
    // 常见德语词汇列表（用于检测不含特殊字符的德语文本）
    const commonGermanWords = [
        'der', 'die', 'das', 'und', 'ist', 'ich', 'zu', 'ein', 'eine',
        'er', 'es', 'was', 'wir', 'zu', 'auf', 'für',
        'ist', 'von', 'den', 'dem', 'dass', 'sich', 'auch', 'einem', 'eine', 'als',
        'nur', 'noch', 'sehr', 'sie'
    ];
    
    // 转换文本为小写用于词汇匹配
    const textLower = text.toLowerCase();
    // 计算文本中包含的德语词汇数量
    let germanWordCount = 0;
    commonGermanWords.forEach(word => {
        // 使用单词边界正则表达式确保完整匹配单词
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(wordRegex) || [];
        germanWordCount += matches.length;
    });
    
    // 如果中文字符数量最多，则认为是中文
    if (chineseCount > englishCount && chineseCount > 0) {
        return 'zh-CN';
    }
    // 如果德语特有字符数量较多（至少有2个），则认为是德语
    else if (germanCount >= 1 || germanWordCount >= 1) {
        return 'de-DE';
    }
    // 默认为英语
    else {
        return 'en-US';
    }
}

// 更新语音按钮状态
function updateSpeechButtonState(state) {
    const speechBtn = document.getElementById('speech-btn');
    const titleSpeechBtn = document.getElementById('title-speech-btn');
    
    const buttons = [speechBtn, titleSpeechBtn].filter(btn => btn !== null);
    
    buttons.forEach(btn => {
        switch(state) {
            case 'playing':
                btn.classList.remove('text-gray-500', 'hover:text-purple-500', 'text-purple-500');
                btn.classList.add('text-purple-600');
                btn.innerHTML = '<i class="fa fa-pause mr-1 text-purple-600"></i>';
                break;
            case 'paused':
                btn.classList.remove('text-purple-600');
                btn.classList.add('text-purple-500');
                btn.innerHTML = '<i class="fa fa-play mr-1 text-purple-500"></i>';
                break;
            case 'stopped':
            default:
                btn.classList.remove('text-purple-600');
                btn.classList.add('text-gray-500', 'hover:text-purple-500');
                btn.innerHTML = '<i class="fa fa-volume-up mr-1 text-purple-500"></i>';
                break;
        }
    });
}

// 语音播报功能
function speakSentence() {
    const questionIndex = randomQuestions[currentRandomIndex];
    const currentQuestions = getCurrentQuestions();
    const question = currentQuestions[questionIndex];
    
    if (question.type === "sentence" && question.fullSentence) {
        // 使用Web Speech API进行语音播报
        if ('speechSynthesis' in window) {
            
            // 如果正在播报，则暂停
            if (isSpeaking && currentUtterance && !isPaused) {
                window.speechSynthesis.pause();
                isPaused = true;
                
                // 改变按钮样式，表示已暂停
                updateSpeechButtonState('paused');
                return;
            }
            
            // 如果已暂停，则继续播放
            if (isPaused && currentUtterance) {
                window.speechSynthesis.resume();
                isPaused = false;
                
                // 改变按钮样式，表示正在播报
                updateSpeechButtonState('playing');
                return;
            }
            
            // 停止任何正在进行的语音播报
            window.speechSynthesis.cancel();
            isPaused = false;
            
            // 检测语言
            const detectedLang = detectLanguage(question.fullSentence);
            
            // 创建新的语音播报
            currentUtterance = new SpeechSynthesisUtterance(question.fullSentence);
            currentUtterance.lang = detectedLang; // 根据检测结果设置语言
            currentUtterance.rate = 0.9; // 稍微慢一点，便于听清
            currentUtterance.pitch = 1.0; // 正常音调
            currentUtterance.volume = 1.0; // 最大音量
            
            // 添加语音播报开始和结束的事件监听
            currentUtterance.onstart = function() {
                isSpeaking = true;
                isPaused = false;
                // 改变按钮样式，表示正在播报
                updateSpeechButtonState('playing');
            };
            
            currentUtterance.onend = function() {
                isSpeaking = false;
                isPaused = false;
                currentUtterance = null;
                // 恢复按钮样式
                updateSpeechButtonState('stopped');
            };
            
            currentUtterance.onerror = function(event) {
                console.error('语音播报错误:', event);
                isSpeaking = false;
                isPaused = false;
                currentUtterance = null;
                // 恢复按钮样式
                updateSpeechButtonState('stopped');
                
                // 只有在不是主动取消的情况下才显示错误提示
                if (event.error !== 'interrupted') {
                    showFeedback('语音播报失败，请检查浏览器设置或尝试刷新页面', 'error');
                }
            };
            
            // 开始语音播报
            window.speechSynthesis.speak(currentUtterance);
        } else {
            // 浏览器不支持语音播报
            showFeedback('您的浏览器不支持语音播报功能', 'error');
        }
    }
}
