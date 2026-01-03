// 检测文本语言（中文、英文、德语、阿拉伯语、日语、韩语、俄语、西班牙语、法语、意大利语、葡萄牙语、荷兰语、瑞典语、越南语、缅甸语或希伯来语）
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
    
    // 统计阿拉伯语字符数量（阿拉伯字母）
    const arabicChars = text.match(/[\u0600-\u06FF\u0750-\u077F]/g) || [];
    const arabicCount = arabicChars.length;
    
    // 统计日语字符数量（平假名和片假名）
    const japaneseChars = text.match(/[\u3040-\u309F\u30A0-\u30FF]/g) || [];
    const japaneseCount = japaneseChars.length;
    
    // 统计韩语字符数量（韩文字母）
    const koreanChars = text.match(/[\uAC00-\uD7AF]/g) || [];
    const koreanCount = koreanChars.length;
    
    // 统计俄语字符数量（西里尔字母）
    const russianChars = text.match(/[\u0400-\u04FF]/g) || [];
    const russianCount = russianChars.length;
    
    // 统计葡萄牙语特有字符数量
    const portugueseChars = text.match(/[çãáéíóúâêôàèìòù]/gi) || [];
    const portugueseCount = portugueseChars.length;
    
    // 统计荷兰语特有字符数量
    const dutchChars = text.match(/[ëïüäöêéè]/gi) || [];
    const dutchCount = dutchChars.length;
    
    // 统计瑞典语特有字符数量
    const swedishChars = text.match(/[åäöÅÄÖ]/g) || [];
    const swedishCount = swedishChars.length;
    
    // 统计越南语字符数量（越南语字母和声调符号）
    const vietnameseChars = text.match(/[ăâêôơưàằầèềìòồờùừỳắấếốớứỹẫẩễổởửữđ]/gi) || [];
    const vietnameseCount = vietnameseChars.length;
    
    // 统计缅甸语字符数量（缅甸语字母）
    const burmeseChars = text.match(/[\u1000-\u109F]/g) || [];
    const burmeseCount = burmeseChars.length;
    
    // 统计希伯来语字符数量（希伯来语字母）
    const hebrewChars = text.match(/[\u0590-\u05FF]/g) || [];
    const hebrewCount = hebrewChars.length;
    
    // 统计藏语字符数量（藏语字母）
    const tibetanChars = text.match(/[\u0F00-\u0FFF]/g) || [];
    const tibetanCount = tibetanChars.length;
    
    // 统计蒙古语字符数量（蒙古语字母）
    const mongolianChars = text.match(/[\u1800-\u18AF]/g) || [];
    const mongolianCount = mongolianChars.length;
    
    // 统计印度尼西亚语特有字符数量
    const indonesianChars = text.match(/[áàâäéèêëíìîïóòôöúùûüñ]/gi) || [];
    const indonesianCount = indonesianChars.length;
    
    // 常见德语词汇列表（用于检测不含特殊字符的德语文本）
    const commonGermanWords = [
        'der', 'die', 'das', 'und', 'ist', 'ich', 'zu', 'ein', 'eine',
        'er', 'es', 'wir', 'zu', 'auf', 'für',
        'ist', 'den', 'dass', 'sich', 'auch', 'einem', 'eine', 'als',
        'nur', 'noch', 'sehr', 'sie'
    ];
    
    // 常见西班牙语词汇列表（用于检测西班牙语）
    const commonSpanishWords = [
        'el', 'que', 'una',
         'para', 'con', 'no', 'una', 'su', 'se', 'por', 'lo', 'como',
        'más', 'pero', 'sus', 'le', 'si', 'me', 'te', 'mi'
    ];
    
    // 常见法语词汇列表（用于检测法语）
    const commonFrenchWords = [
        'et', 'que',
        'je', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'avec',
        'mes', 'ton', 'ta', 'tes', 'sa', 'ses'
    ];
    
    // 常见意大利语词汇列表（用于检测意大利语）
    const commonItalianWords = [
        'il', 'lo','gli', 'di',
        'è', 'mi', 'ti', 'si', 'noi', 'voi', 'loro',
        'con', 'il', 'del', 'della', 'dei', 'delle', 'questo', 'quella'
    ];
    
    // 常见葡萄牙语词汇列表（用于检测葡萄牙语）
    const commonPortugueseWords = [
        'o', 'a', 'os', 'as', 'e', 'de', 'que', 'em', 'um', 'uma',
        'é', 'para', 'com', 'não', 'sua', 'se', 'por', 'lo', 'como', 'mais'
    ];
    
    // 常见荷兰语词汇列表（用于检测荷兰语）
    const commonDutchWords = [
        'de', 'het', 'en', 'in', 'van', 'ik', 'dat', 'die', 'je', 'een',
        'hij', 'we', 'ze', 'te', 'zijn', 'naar', 'op', 'bij', 'met', 'voor'
    ];
    
    // 常见瑞典语词汇列表（用于检测瑞典语）
    const commonSwedishWords = [
        'och', 'i', 'jag', 'att', 'det', 'är', 'en', 'för', 'vi', 'av',
        'de', 'som', 'med', 'till', 'om', 'han', 'men', 'är', 'hon', 'ska'
    ];
    
    // 常见越南语词汇列表（用于检测越南语）
    const commonVietnameseWords = [
        'và', 'tôi', 'có', 'không', 'là', 'được', 'của', 'trong', 'đến', 'như',
        'một', 'các', 'để', 'thì', 'khi', 'này', 'đó', 'bạn', 'nhà', 'người'
    ];
    
    // 常见缅甸语词汇列表（用于检测缅甸语）
    const commonBurmeseWords = [
        'နှင့်', 'ငါ', 'ရှိသည်', 'မဟုတ်', 'သည်', 'ပေးသည်', '၏', 'အတွင်း', 'မှ', 'ကဲ့သို့',
        'တစ်', 'သူ', 'အဘို့', 'ထို့ကြောင့်', 'အခါ', 'ဤ', 'ထို', 'သင်', 'အိမ်', 'လူတို့'
    ];
    
    // 常见希伯来语词汇列表（用于检测希伯来语）
    const commonHebrewWords = [
        'וגם', 'אני', 'יש', 'לא', 'זה', 'את', 'של', 'בתוך', 'ל', 'כמו',
        'אחד', 'הם', 'לשם', 'אז', 'כשם', 'זה', 'אלה', 'אתה', 'בית', 'אנשים'
    ];
    
    // 常见藏语词汇列表（用于检测藏语）
    const commonTibetanWords = [
        'དང་', 'ང་', 'ཡོད་', 'མིན་', 'འདི་', 'ལ་', 'གི་', 'ནང་', 'ལ་', 'ཤེས་',
        'གཅིག་', 'ཁོང་ཚོ་', 'དེ་', 'ན་', 'ནང་', 'གི་', 'ཁོང་', 'ནང་', 'གི་', 'མི'
    ];
    
    // 常见蒙古语词汇列表（用于检测蒙古语）
    const commonMongolianWords = [
        'болон', 'би', 'байна', 'биш', 'энэ', 'даа', 'хүн', 'мөн', 'өөр', 'байх',
        'ван', 'тэр', 'юм', 'төгрөг', 'орчуулсан', 'бид', 'ч', 'юу', 'гэж', 'санаа'
    ];
    
    // 常见印度尼西亚语词汇列表（用于检测印度尼西亚语）
    const commonIndonesianWords = [
        'dan', 'saya', 'yang', 'di', 'itu', 'untuk', 'dari', 'adalah', 'ini', 'ke',
        'dengan', 'yang', 'pada', 'kita', 'telah', 'dalam', 'juga', 'akan', 'tidak', 'sudah'
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
    
    // 计算文本中包含的西班牙语词汇数量
    let spanishWordCount = 0;
    commonSpanishWords.forEach(word => {
        // 使用单词边界正则表达式确保完整匹配单词
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(wordRegex) || [];
        spanishWordCount += matches.length;
    });
    
    // 计算文本中包含的法语词汇数量
    let frenchWordCount = 0;
    commonFrenchWords.forEach(word => {
        // 使用单词边界正则表达式确保完整匹配单词
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(wordRegex) || [];
        frenchWordCount += matches.length;
    });
    
    // 计算文本中包含的意大利语词汇数量
    let italianWordCount = 0;
    commonItalianWords.forEach(word => {
        // 使用单词边界正则表达式确保完整匹配单词
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(wordRegex) || [];
        italianWordCount += matches.length;
    });
    
    // 计算文本中包含的葡萄牙语词汇数量
    let portugueseWordCount = 0;
    commonPortugueseWords.forEach(word => {
        // 使用单词边界正则表达式确保完整匹配单词
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(wordRegex) || [];
        portugueseWordCount += matches.length;
    });
    
    // 计算文本中包含的荷兰语词汇数量
    let dutchWordCount = 0;
    commonDutchWords.forEach(word => {
        // 使用单词边界正则表达式确保完整匹配单词
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(wordRegex) || [];
        dutchWordCount += matches.length;
    });
    
    // 计算文本中包含的瑞典语词汇数量
    let swedishWordCount = 0;
    commonSwedishWords.forEach(word => {
        // 使用单词边界正则表达式确保完整匹配单词
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(wordRegex) || [];
        swedishWordCount += matches.length;
    });
    
    // 计算文本中包含的越南语词汇数量
    let vietnameseWordCount = 0;
    commonVietnameseWords.forEach(word => {
        // 使用单词边界正则表达式确保完整匹配单词
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(wordRegex) || [];
        vietnameseWordCount += matches.length;
    });
    
    // 计算文本中包含的缅甸语词汇数量
    let burmeseWordCount = 0;
    commonBurmeseWords.forEach(word => {
        // 缅甸语不使用单词边界，直接匹配字符序列
        const matches = textLower.split(word).length - 1;
        burmeseWordCount += matches;
    });
    
    // 计算文本中包含的希伯来语词汇数量
    let hebrewWordCount = 0;
    commonHebrewWords.forEach(word => {
        // 希伯来语不使用单词边界，直接匹配字符序列
        const matches = textLower.split(word).length - 1;
        hebrewWordCount += matches;
    });
    
    // 计算文本中包含的藏语词汇数量
    let tibetanWordCount = 0;
    commonTibetanWords.forEach(word => {
        // 藏语不使用单词边界，直接匹配字符序列
        const matches = textLower.split(word).length - 1;
        tibetanWordCount += matches;
    });
    
    // 计算文本中包含的蒙古语词汇数量
    let mongolianWordCount = 0;
    commonMongolianWords.forEach(word => {
        // 蒙古语不使用单词边界，直接匹配字符序列
        const matches = textLower.split(word).length - 1;
        mongolianWordCount += matches;
    });
    
    // 计算文本中包含的印度尼西亚语词汇数量
    let indonesianWordCount = 0;
    commonIndonesianWords.forEach(word => {
        // 使用单词边界正则表达式确保完整匹配单词
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        const matches = textLower.match(wordRegex) || [];
        indonesianWordCount += matches.length;
    });
    
    // 如果中文字符数量最多，则认为是中文
    if (japaneseCount >= 1) {
        return 'ja-JP';
    }
    // 如果阿拉伯语字符数量较多，则认为是阿拉伯语
    else if (arabicCount >= 1) {
        return 'ar-SA';
    }
    // 如果日语字符数量较多，则认为是日语
    else if (chineseCount > englishCount && chineseCount > 0) {
        return 'zh-CN';
    }
    // 如果韩语字符数量较多，则认为是韩语
    else if (koreanCount >= 1) {
        return 'ko-KR';
    }
    // 如果俄语字符数量较多，则认为是俄语
    else if (russianCount >= 1) {
        return 'ru-RU';
    }
    // 如果德语特有字符数量较多或包含德语词汇，则认为是德语
    else if (germanCount >= 1 || germanWordCount >= 1) {
        return 'de-DE';
    }
    // 如果包含较多西班牙语词汇，则认为是西班牙语
    else if (spanishWordCount >= 2) {
        return 'es-ES';
    }
    // 如果包含较多法语词汇，则认为是法语
    else if (frenchWordCount >= 2) {
        return 'fr-FR';
    }
    // 如果包含较多意大利语词汇，则认为是意大利语
    else if (italianWordCount >= 2) {
        return 'it-IT';
    }
    // 如果包含较多葡萄牙语词汇或特有字符，则认为是葡萄牙语
    else if (portugueseWordCount >= 2 || portugueseCount >= 1) {
        return 'pt-PT';
    }
    // 如果包含较多荷兰语词汇或特有字符，则认为是荷兰语
    else if (dutchWordCount >= 2 || dutchCount >= 1) {
        return 'nl-NL';
    }
    // 如果包含较多瑞典语词汇或特有字符，则认为是瑞典语
    else if (swedishWordCount >= 2 || swedishCount >= 1) {
        return 'sv-SE';
    }
    // 如果包含较多越南语词汇或特有字符，则认为是越南语
    else if (vietnameseWordCount >= 2 || vietnameseCount >= 1) {
        return 'vi-VN';
    }
    // 如果包含较多缅甸语词汇或特有字符，则认为是缅甸语
    else if (burmeseWordCount >= 2 || burmeseCount >= 1) {
        return 'my-MM';
    }
    // 如果包含较多希伯来语词汇或特有字符，则认为是希伯来语
    else if (hebrewWordCount >= 2 || hebrewCount >= 1) {
        return 'he-IL';
    }
    // 如果包含较多藏语词汇或特有字符，则认为是藏语
    else if (tibetanWordCount >= 2 || tibetanCount >= 1) {
        return 'bo-CN';
    }
    // 如果包含较多蒙古语词汇或特有字符，则认为是蒙古语
    else if (mongolianWordCount >= 2 || mongolianCount >= 1) {
        return 'mn-MN';
    }
    // 如果包含较多印度尼西亚语词汇或特有字符，则认为是印度尼西亚语
    else if (indonesianWordCount >= 2 || indonesianCount >= 1) {
        return 'id-ID';
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
