// 播放打字音效（轻快的键盘音效）
function playTypingSound() {
    // 播放轻快的键盘音效作为打字音效
    const synth = new Tone.Synth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.1,
            release: 0.1
        }
    }).toDestination();
    
    // 随机音符，模拟键盘敲击声
    const notes = ["C5", "D5", "E5", "F5", "G5"];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    synth.triggerAttackRelease(randomNote, "16n");
    
    // 播放完成后释放资源
    setTimeout(() => {
        synth.dispose();
    }, 500);
}


// 处理sentence类型题目的输入事件
function handleSentenceInput(e, currentIndex) {
    const input = e.target;
    const value = input.value;
    
    console.log('输入事件触发:', { value, currentIndex, isComposing: e.isComposing, inputType: e.inputType, composing: input.dataset.composing });
    
    // 检查是否是中文输入法正在输入（composition事件）
    if (e.isComposing || e.inputType === 'insertCompositionText' || input.dataset.composing === 'true') {
        console.log('中文输入法正在输入，跳过处理');
        return;
    }
    
    // 特殊处理：检测中文输入法候选词选择
    // 当inputType为'insertText'且值长度大于1时，可能是中文候选词选择
    if (e.inputType === 'insertText' && value.length > 1) {
        console.log('检测到中文候选词选择:', value);
        
        // 检查是否已经被空格键处理过
        if (input.dataset.multiCharProcessed === 'true') {
            console.log('多字符输入已经被空格键处理过，跳过重复处理');
            // 重置标记
            input.dataset.multiCharProcessed = 'false';
            return;
        }
        
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
            // 当前输入框的值应该是第一个字符，而不是整个多字符输入
            input.value = chars[0];
            
            // 从当前输入框开始填充
            // 修复：从i=1开始填充，因为i=0的字符已经在当前输入框中
            for (let i = 1; i < chars.length; i++) {
                const targetIndex = currentIndex + i;
                if (targetIndex < inputs.length) {
                    console.log('填充到输入框', targetIndex, ':', chars[i]);
                    inputs[targetIndex].value = chars[i];
                    
                    // 更新输入框样式
                    inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                    inputs[targetIndex].classList.add('border-gray-300');
                }
            }
            
            // 确保字符正确显示：只在当前输入框不是多字符输入的第一个字符时才清空
            // 对于多字符输入，第一个字符应该保留在当前输入框
            // 修复：对于多字符输入，当前输入框应该保留第一个字符，不应该被清空
            // if (currentIndex > 0) {
            //     input.value = '';
            // }
            
            // 聚焦到下一个未填充的输入框
            setTimeout(() => {
                focusNextEmptyInput(currentIndex + chars.length);
            }, 10);
            
            console.log('中文候选词处理完成');
            return;
        }
    }
    
    // 如果输入的内容超过1个字符，可能是粘贴或快速输入
    if (value.length > 1) {
        console.log('检测到多字符输入:', value);
        // 获取所有填空输入框
        const inputs = document.querySelectorAll('.code-blank input');
        
        // 检查是否是有效的中文字符（非英文字母）
        const isChineseText = /[\u4e00-\u9fff]/.test(value);
        console.log('是否中文字符:', isChineseText);
        
        if (isChineseText) {
            // 将输入的内容按字符分割
            const chars = value.split('');
            console.log('分割字符:', chars);
            
            // 从当前输入框开始填充
            // 修复：从i=1开始填充，因为i=0的字符已经在当前输入框中
            for (let i = 1; i < chars.length; i++) {
                const targetIndex = currentIndex + i;
                if (targetIndex < inputs.length) {
                    console.log('填充到输入框', targetIndex, ':', chars[i]);
                    inputs[targetIndex].value = chars[i];
                    
                    // 更新输入框样式
                    inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                    inputs[targetIndex].classList.add('border-gray-300');
                }
            }
            
            // 确保第一个字符正确显示：对于多字符输入，第一个字符应该保留在当前输入框
            // 只有当当前输入框不是多字符输入的第一个字符时才清空
            // 修复：对于多字符输入，当前输入框应该保留第一个字符，不应该被清空
            // if (currentIndex > 0) {
            //     input.value = '';
            // }
            
            // 聚焦到下一个未填充的输入框
            setTimeout(() => {
                focusNextEmptyInput(currentIndex + chars.length);
            }, 10);
            
            console.log('多字符处理完成');
            // 处理完成后立即返回，避免后续逻辑执行
            return;
        }
        // 如果是英文字母，可能是输入法候选词选择，不处理
    }
    
    // 如果输入了1个字符，自动跳到下一个输入框（对中文字符和英文字符都生效）
    else if (value.length === 1) {
        console.log('单字符输入，跳转到下一个输入框');
        setTimeout(() => {
            focusNextEmptyInput(currentIndex + 1);
        }, 10);
    }
}

// 处理sentence类型题目的删除键事件
function handleSentenceKeydown(e, currentIndex) {
    const input = e.target;
    const value = input.value;
    
    // 处理Backspace键删除
    if (e.key === 'Backspace' && value.length === 0 && currentIndex > 0) {
        e.preventDefault();
        
        // 获取所有填空输入框
        const inputs = document.querySelectorAll('.code-blank input');
        
        // 找到前一个非空的输入框
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (inputs[i].value.trim()) {
                // 清空前一个输入框
                inputs[i].value = '';
                
                // 更新输入框样式
                inputs[i].classList.remove('border-gray-300');
                inputs[i].classList.add('border-red-300', 'bg-red-50');
                
                // 聚焦到前一个输入框
                setTimeout(() => {
                    inputs[i].focus();
                }, 10);
                break;
            }
        }
    }
    
    // 处理Delete键删除
    if (e.key === 'Delete' && value.length === 0 && currentIndex < document.querySelectorAll('.code-blank input').length - 1) {
        e.preventDefault();
        
        // 获取所有填空输入框
        const inputs = document.querySelectorAll('.code-blank input');
        
        // 找到后一个非空的输入框
        for (let i = currentIndex + 1; i < inputs.length; i++) {
            if (inputs[i].value.trim()) {
                // 清空后一个输入框
                inputs[i].value = '';
                
                // 更新输入框样式
                inputs[i].classList.remove('border-gray-300');
                inputs[i].classList.add('border-red-300', 'bg-red-50');
                
                // 聚焦到后一个输入框
                setTimeout(() => {
                    inputs[i].focus();
                }, 10);
                break;
            }
        }
    }
}

// 处理sentence类型题目的粘贴事件
function handleSentencePaste(e, currentIndex) {
    e.preventDefault();
    
    // 获取粘贴的内容
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    
    if (pastedText && pastedText.length > 0) {
        // 获取所有填空输入框
        const inputs = document.querySelectorAll('.code-blank input');
        
        // 将粘贴的内容按字符分割
        const chars = pastedText.split('');
        
        // 从当前输入框开始填充
        for (let i = 0; i < chars.length; i++) {
            const targetIndex = currentIndex + i;
            if (targetIndex < inputs.length) {
                inputs[targetIndex].value = chars[i];
                
                // 更新输入框样式
                inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                inputs[targetIndex].classList.add('border-gray-300');
            }
        }
        
        // 聚焦到下一个未填充的输入框
        setTimeout(() => {
            focusNextEmptyInput(currentIndex + chars.length);
        }, 10);
    }
}

// 聚焦到下一个未填充的输入框
function focusNextEmptyInput(startIndex) {
    const inputs = document.querySelectorAll('.code-blank input');
    
    for (let i = startIndex; i < inputs.length; i++) {
        if (!inputs[i].value.trim()) {
            inputs[i].focus();
            return;
        }
    }
    
    // 如果所有输入框都已填充，聚焦到最后一个
    if (inputs.length > 0) {
        inputs[inputs.length - 1].focus();
    }
}

// 为第二阶段输入框添加复杂的事件监听器（支持中文输入法）
function addStage2InputEventListener(input, index) {
    console.log('为第二阶段输入框', index, '添加事件监听器');
    
    input.addEventListener('input', function(e) {
        console.log('第二阶段input事件触发，输入框:', index);
        // 检查是否应该阻止input事件处理
        if (input.dataset.preventInput === 'true') {
            console.log('阻止input事件处理，跳过');
            return;
        }
        handleStage2Input(e, index);
    });
    
    input.addEventListener('paste', function(e) {
        console.log('第二阶段paste事件触发，输入框:', index);
        handleStage2Paste(e, index);
    });
    
    // 添加删除键事件监听器
    input.addEventListener('keydown', function(e) {
        console.log('第二阶段keydown事件触发，输入框:', index, '按键:', e.key);
        
        // 特殊处理：中文输入法候选词选择（空格键确认）
        if (e.key === ' ' && input.dataset.composing === 'true') {
            console.log('检测到中文候选词选择确认（空格键）');
            // 阻止默认的空格键行为
            e.preventDefault();
            
            // 标记已经处理了中文候选词选择
            input.dataset.spaceProcessed = 'true';
            // 标记已经处理了多字符输入，防止handleStage2Input中的重复处理
            input.dataset.multiCharProcessed = 'true';
            
            // 延迟处理，确保输入框值已更新
            setTimeout(() => {
                const value = input.value;
                console.log('候选词选择后输入框值:', value);
                
                // 检查是否是多个字符（中文候选词）
                if (value.length > 1) {
                    console.log('检测到多字符候选词:', value);
                    // 获取所有第二阶段输入框
                    const inputs = document.querySelectorAll('#full-sentence-blanks input');
                    
                    // 检查是否是有效的中文字符
                    const isChineseText = /[\u4e00-\u9fff]/.test(value);
                    console.log('是否中文字符:', isChineseText);
                    
                    if (isChineseText) {
                        // 将输入的内容按字符分割
                        const chars = value.split('');
                        console.log('分割字符:', chars);
                        
                        // 从当前输入框开始填充
                        for (let i = 0; i < chars.length; i++) {
                            const targetIndex = index + i;
                            if (targetIndex < inputs.length) {
                                console.log('填充到输入框', targetIndex, ':', chars[i]);
                                inputs[targetIndex].value = chars[i];
                                
                                // 更新输入框样式
                                inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                                inputs[targetIndex].classList.add('border-green-300', 'bg-green-50');
                                
                                // 播放正确音效
                                playCorrectSound();
                            }
                        }
                        
                        // 清空当前输入框
                        input.value = '';
                        
                        // 聚焦到下一个输入框
                        setTimeout(() => {
                            focusStage2NextInput(index + chars.length);
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
                handleStage2Input(e, index);
            }, 100); // 增加延迟到100ms，确保输入框值已更新
        }
        
        handleStage2Keydown(e, index);
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
                // 获取所有第二阶段输入框
                const inputs = document.querySelectorAll('#full-sentence-blanks input');
                
                // 检查是否是有效的中文字符
                const isChineseText = /[\u4e00-\u9fff]/.test(value);
                console.log('是否中文字符:', isChineseText);
                
                if (isChineseText) {
                    // 将输入的内容按字符分割
                    const chars = value.split('');
                    console.log('分割字符:', chars);
                    
                    // 从当前输入框开始填充
                    for (let i = 0; i < chars.length; i++) {
                        const targetIndex = index + i;
                        if (targetIndex < inputs.length) {
                            console.log('填充到输入框', targetIndex, ':', chars[i]);
                            inputs[targetIndex].value = chars[i];
                            
                            // 更新输入框样式
                            inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                            inputs[targetIndex].classList.add('border-green-300', 'bg-green-50');
                            
                            // 播放正确音效
                            playCorrectSound();
                        }
                    }
                    
                    // 清空当前输入框
                    input.value = '';
                    
                    // 聚焦到下一个输入框
                    setTimeout(() => {
                        focusStage2NextInput(index + chars.length);
                    }, 10);
                    
                    console.log('中文候选词处理完成');
                    return;
                }
            }
            
            // 如果没有检测到多字符，或者不是中文字符，正常处理
            // 但需要检查输入框是否已经被清空（多字符处理已完成）
            if (input.value.trim() !== '') {
                console.log('正常处理单字符输入');
                handleStage2Input(e, index);
            } else {
                console.log('输入框已被清空，跳过处理');
            }
        }, 100); // 增加延迟到100ms，确保输入框值已更新
    });
}

// 第二阶段输入处理函数
function handleStage2Input(e, currentIndex) {
    const input = e.target;
    const value = input.value;
    
    console.log('第二阶段输入事件触发:', { value, currentIndex, isComposing: e.isComposing, inputType: e.inputType, composing: input.dataset.composing });
    
    // 调试：检查多字符处理条件
    console.log('多字符处理条件检查:');
    console.log('  - value.length > 1:', value.length > 1);
    console.log('  - e.inputType === \'insertText\':', e.inputType === 'insertText');
    console.log('  - 组合条件:', e.inputType === 'insertText' && value.length > 1);
    
    // 检查是否是中文输入法正在输入（composition事件）
    if (e.isComposing || e.inputType === 'insertCompositionText' || input.dataset.composing === 'true') {
        console.log('中文输入法正在输入，跳过处理');
        return;
    }
    
    // 特殊处理：检测中文输入法候选词选择
    // 当inputType为'insertText'且值长度大于1时，可能是中文候选词选择
    if (e.inputType === 'insertText' && value.length > 1) {
        console.log('检测到中文候选词选择:', value);
        
        // 检查是否已经被空格键处理过
        if (input.dataset.multiCharProcessed === 'true') {
            console.log('多字符输入已经被空格键处理过，跳过重复处理');
            // 重置标记
            input.dataset.multiCharProcessed = 'false';
            return;
        }
        
        // 获取所有第二阶段输入框
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        
        // 检查是否是有效的中文字符
        const isChineseText = /[\u4e00-\u9fff]/.test(value);
        console.log('是否中文字符:', isChineseText);
        
        if (isChineseText) {
            // 将输入的内容按字符分割
            const chars = value.split('');
            console.log('分割字符:', chars);
            
            // 从当前输入框开始填充
            for (let i = 0; i < chars.length; i++) {
                const targetIndex = currentIndex + i;
                if (targetIndex < inputs.length) {
                    console.log('填充到输入框', targetIndex, ':', chars[i]);
                    inputs[targetIndex].value = chars[i];
                    
                    // 更新输入框样式
                    inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                    inputs[targetIndex].classList.add('border-green-300', 'bg-green-50');
                    
                    // 第二阶段不播放正确音效
                }
            }
            
            // 清空当前输入框
            input.value = '';
            
            // 聚焦到下一个输入框
            setTimeout(() => {
                focusStage2NextInput(currentIndex + chars.length);
            }, 10);
            
            console.log('中文候选词处理完成');
            return;
        }
    }
    
    // 如果输入的内容超过1个字符，可能是粘贴或快速输入
    if (value.length > 1) {
        console.log('检测到多字符输入:', value);
        // 获取所有第二阶段输入框
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        
        // 检查是否是有效的中文字符（非英文字母）
        const isChineseText = /[\u4e00-\u9fff]/.test(value);
        console.log('是否中文字符:', isChineseText);
        
        if (isChineseText) {
            // 将输入的内容按字符分割
            const chars = value.split('');
            console.log('分割字符:', chars);
            
            // 从当前输入框开始填充
            for (let i = 0; i < chars.length; i++) {
                const targetIndex = currentIndex + i;
                if (targetIndex < inputs.length) {
                    console.log('填充到输入框', targetIndex, ':', chars[i]);
                    inputs[targetIndex].value = chars[i];
                    
                    // 更新输入框样式
                    inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                    inputs[targetIndex].classList.add('border-green-300', 'bg-green-50');
                    
                    // 第二阶段不播放正确音效
                }
            }
            
            // 清空当前输入框
            input.value = '';
            
            // 聚焦到下一个输入框
            setTimeout(() => {
                focusStage2NextInput(currentIndex + chars.length);
            }, 10);
            
            console.log('多字符处理完成');
            // 处理完成后立即返回，避免后续逻辑执行
            return;
        }
        // 如果是英文字母，可能是输入法候选词选择，不处理
    }
    
    // 如果输入了1个字符，自动跳到下一个输入框（仅对中文字符生效）
    else if (value.length === 1 && /[\u4e00-\u9fff]/.test(value)) {
        console.log('单字符输入，跳转到下一个输入框');
        setTimeout(() => {
            focusStage2NextInput(currentIndex + 1);
        }, 10);
    }
    
    // 单字符输入的验证逻辑
    if (value.length === 1) {
        const expected = input.dataset.expected;
        const userInput = value.trim();
        
        if (userInput === expected) {
            // 正确：显示绿色边框
            input.classList.remove('border-red-300', 'bg-red-50');
            input.classList.add('border-green-300', 'bg-green-50');
        } else {
            // 错误：显示红色边框
            input.classList.remove('border-green-300', 'bg-green-50');
            input.classList.add('border-red-300', 'bg-red-50');
        }
    }
}

// 第二阶段粘贴处理函数
function handleStage2Paste(e, currentIndex) {
    e.preventDefault();
    
    // 获取粘贴的内容
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    
    if (pastedText && pastedText.length > 0) {
        // 获取所有第二阶段输入框
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        
        // 将粘贴的内容按字符分割
        const chars = pastedText.split('');
        
        // 从当前输入框开始填充
        for (let i = 0; i < chars.length; i++) {
            const targetIndex = currentIndex + i;
            if (targetIndex < inputs.length) {
                inputs[targetIndex].value = chars[i];
                
                // 更新输入框样式
                const expected = inputs[targetIndex].dataset.expected;
                if (chars[i] === expected) {
                    inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                    inputs[targetIndex].classList.add('border-green-300', 'bg-green-50');
                    // 第二阶段不播放正确音效
                } else {
                    inputs[targetIndex].classList.remove('border-green-300', 'bg-green-50');
                    inputs[targetIndex].classList.add('border-red-300', 'bg-red-50');
                    // 第二阶段不播放错误音效
                }
            }
        }
        
        // 聚焦到下一个输入框
        setTimeout(() => {
            focusStage2NextInput(currentIndex + chars.length);
        }, 10);
    }
}

// 第二阶段键盘按下处理函数
function handleStage2Keydown(e, currentIndex) {
    const input = e.target;
    const value = input.value;
    
    // 处理Backspace键删除
    if (e.key === 'Backspace' && value.length === 0 && currentIndex > 0) {
        e.preventDefault();
        
        // 获取所有第二阶段输入框
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        
        // 找到前一个非空的输入框
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (inputs[i].value.trim()) {
                // 清空前一个输入框
                inputs[i].value = '';
                
                // 更新输入框样式
                inputs[i].classList.remove('border-gray-300');
                inputs[i].classList.add('border-red-300', 'bg-red-50');
                
                // 聚焦到前一个输入框
                setTimeout(() => {
                    inputs[i].focus();
                }, 10);
                break;
            }
        }
    }
    
    // 处理Delete键删除
    if (e.key === 'Delete' && value.length === 0 && currentIndex < document.querySelectorAll('#full-sentence-blanks input').length - 1) {
        e.preventDefault();
        
        // 获取所有第二阶段输入框
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        
        // 找到后一个非空的输入框
        for (let i = currentIndex + 1; i < inputs.length; i++) {
            if (inputs[i].value.trim()) {
                // 清空后一个输入框
                inputs[i].value = '';
                
                // 更新输入框样式
                inputs[i].classList.remove('border-gray-300');
                inputs[i].classList.add('border-red-300', 'bg-red-50');
                
                // 聚焦到后一个输入框
                setTimeout(() => {
                    inputs[i].focus();
                }, 10);
                break;
            }
        }
    }
    
    // 方向键处理
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        inputs[currentIndex - 1].focus();
        e.preventDefault();
    } else if (e.key === 'ArrowRight' && currentIndex < document.querySelectorAll('#full-sentence-blanks input').length - 1) {
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        inputs[currentIndex + 1].focus();
        e.preventDefault();
    }
}

// 聚焦到第二阶段的下一个输入框
function focusStage2NextInput(startIndex) {
    const inputs = document.querySelectorAll('#full-sentence-blanks input');
    for (let i = startIndex; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            inputs[i].focus();
            return;
        }
    }
    // 如果所有输入框都已填充，聚焦到最后一个
    if (inputs.length > 0) {
        inputs[inputs.length - 1].focus();
    }
}

// 创建第二阶段打散句子格子
function createReviewSentenceInputs(fullSentence) {
    const reviewContent = document.getElementById('sentence-review-content');
    
    // 清空现有内容
    reviewContent.innerHTML = '';
    
    // 创建容器用于存放打散的句子格子
    const container = document.createElement('div');
    container.id = 'full-sentence-blanks';
    container.className = 'code-blank';
    
    // 将完整句子按字符分割，为每个字符创建一个输入框
    // 只显示标点符号，其他字符用输入框代替
    const chars = fullSentence.split('');
    
    // 创建输入框索引映射表，用于处理多字符填充时的索引计算
    const inputMap = [];
    let inputIndex = 0;
    
    chars.forEach((char, charIndex) => {
        // 判断是否是标点符号、空格或换行符
        const isPunctuation = /[，。！？；：、"'（）【】《》]/.test(char);
        const isSpace = char === ' ';
        const isNewline = char === '\n';
        
        if (isPunctuation || isNewline) {
            // 标点符号和换行符直接显示
            const span = document.createElement('span');
            span.className = 'inline-block text-gray-700';
            
            // 特殊处理换行符
            if (isNewline) {
                span.textContent = ''; // 清空文本内容
                // 创建换行元素
                const br = document.createElement('br');
                container.appendChild(br);
            } else {
                span.textContent = char;
            }
            
            container.appendChild(span);
            
            // 在映射表中标记这个位置不是输入框
            inputMap[charIndex] = null;
        } else if (isSpace) {
            // 空格创建输入框，让用户必须输入空格
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'inline-block w-4 px-1 py-1 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary';
            input.dataset.id = `review-${inputIndex}`;
            input.dataset.expected = ' '; // 正确答案是空格
            input.dataset.charIndex = charIndex; // 保存字符在句子中的位置
            input.dataset.inputIndex = inputIndex; // 保存输入框的独立索引
            input.placeholder = '␣'; // 使用空格符号作为占位符
            input.value = '';
            
            // 添加事件监听器
            addStage2InputEventListener(input, inputIndex);
            
            container.appendChild(input);
            
            // 在映射表中记录输入框位置
            inputMap[charIndex] = inputIndex;
            
            // 递增输入框索引
            inputIndex++;
        } else {
            // 非标点符号、非空格和非换行符创建输入框
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'inline-block w-8 px-1 py-1 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary';
            input.dataset.id = `review-${inputIndex}`;
            input.dataset.expected = char; // 正确答案
            input.dataset.charIndex = charIndex; // 保存字符在句子中的位置
            input.dataset.inputIndex = inputIndex; // 保存输入框的独立索引
            input.placeholder = '_';
            input.value = '';
            
            // 添加事件监听器
            addStage2InputEventListener(input, inputIndex);
            
            container.appendChild(input);
            
            // 在映射表中记录输入框位置
            inputMap[charIndex] = inputIndex;
            
            // 递增输入框索引
            inputIndex++;
        }
    });
    
    // 保存映射表到容器中，供后续使用
    container.dataset.inputMap = JSON.stringify(inputMap);
    
    reviewContent.appendChild(container);
}

// 为第二阶段输入框添加事件监听器
function addStage2InputEventListener(input, index) {
    console.log('为第二阶段输入框', index, '添加事件监听器');
    
    input.addEventListener('input', function(e) {
        console.log('第二阶段input事件触发，输入框:', index);
        // 检查是否应该阻止input事件处理
        if (input.dataset.preventInput === 'true') {
            console.log('阻止input事件处理，跳过');
            return;
        }
        handleStage2Input(e, index);
    });
    
    input.addEventListener('paste', function(e) {
        console.log('第二阶段paste事件触发，输入框:', index);
        handleStage2Paste(e, index);
    });
    
    // 添加删除键事件监听器
    input.addEventListener('keydown', function(e) {
        console.log('第二阶段keydown事件触发，输入框:', index, '按键:', e.key);
        
        // 特殊处理：中文输入法候选词选择（空格键确认）
        if (e.key === ' ' && input.dataset.composing === 'true') {
            console.log('检测到中文候选词选择确认（空格键）');
            // 阻止默认的空格键行为
            e.preventDefault();
            
            // 标记已经处理了中文候选词选择
            input.dataset.spaceProcessed = 'true';
            // 标记已经处理了多字符输入，防止handleStage2Input中的重复处理
            input.dataset.multiCharProcessed = 'true';
            
            // 延迟处理，确保输入框值已更新
            setTimeout(() => {
                const value = input.value;
                console.log('候选词选择后输入框值:', value);
                
                // 检查是否是多个字符（中文候选词）
                if (value.length > 1) {
                    console.log('检测到多字符候选词:', value);
                    // 获取所有第二阶段输入框
                    const inputs = document.querySelectorAll('#full-sentence-blanks input');
                    
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
                                const expected = inputs[targetIndex].dataset.expected;
                                if (chars[i] === expected) {
                                    inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                                    inputs[targetIndex].classList.add('border-green-300', 'bg-green-50');
                                    // 播放正确音效
                                    playCorrectSound();
                                } else {
                                    inputs[targetIndex].classList.remove('border-green-300', 'bg-green-50');
                                    inputs[targetIndex].classList.add('border-red-300', 'bg-red-50');
                                    // 播放错误音效
                                    playWrongSound();
                                }
                            }
                        }
                        
                        // 聚焦到下一个未填充的输入框
                        setTimeout(() => {
                            focusStage2NextInput(index + chars.length);
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
                handleStage2Input(e, index);
            }, 100); // 增加延迟到100ms，确保输入框值已更新
        }
        
        handleStage2Keydown(e, index);
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
                // 获取所有第二阶段输入框
                const inputs = document.querySelectorAll('#full-sentence-blanks input');
                
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
                            const expected = inputs[targetIndex].dataset.expected;
                            if (chars[i] === expected) {
                                inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                                inputs[targetIndex].classList.add('border-green-300', 'bg-green-50');
                                // 播放正确音效
                                playCorrectSound();
                            } else {
                                inputs[targetIndex].classList.remove('border-green-300', 'bg-green-50');
                                inputs[targetIndex].classList.add('border-red-300', 'bg-red-50');
                                // 播放错误音效
                                playWrongSound();
                            }
                        }
                    }
                    
                    // 聚焦到下一个未填充的输入框
                    setTimeout(() => {
                        focusStage2NextInput(index + chars.length);
                    }, 10);
                    
                    console.log('中文候选词处理完成');
                    return;
                }
            }
            
            // 如果没有检测到多字符，或者不是中文字符，正常处理
            // 但需要检查输入框是否已经被清空（多字符处理已完成）
            if (input.value.trim() !== '') {
                console.log('正常处理单字符输入');
                handleStage2Input(e, index);
            } else {
                console.log('输入框已被清空，跳过处理');
            }
        }, 100); // 增加延迟到100ms，确保输入框值已更新
    });
}

// 第二阶段输入处理函数
function handleStage2Input(e, currentIndex) {
    const input = e.target;
    const value = input.value;
    
    console.log('第二阶段输入事件触发:', { value, currentIndex, isComposing: e.isComposing, inputType: e.inputType, composing: input.dataset.composing });
    
    // 检查是否是中文输入法正在输入（composition事件）
    if (e.isComposing || e.inputType === 'insertCompositionText' || input.dataset.composing === 'true') {
        console.log('中文输入法正在输入，跳过处理');
        return;
    }
    
    // 特殊处理：检测中文输入法候选词选择
    // 当inputType为'insertText'且值长度大于1时，可能是中文候选词选择
    if (e.inputType === 'insertText' && value.length > 1) {
        console.log('检测到中文候选词选择:', value);
        
        // 检查是否已经被空格键处理过
        if (input.dataset.multiCharProcessed === 'true') {
            console.log('多字符输入已经被空格键处理过，跳过重复处理');
            // 重置标记
            input.dataset.multiCharProcessed = 'false';
            return;
        }
        
        // 获取所有第二阶段输入框和索引映射表
        const container = document.getElementById('full-sentence-blanks');
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        const inputMap = JSON.parse(container.dataset.inputMap || '[]');
        
        // 检查是否是有效的中文字符
        const isChineseText = /[\u4e00-\u9fff]/.test(value);
        console.log('是否中文字符:', isChineseText);
        
        if (isChineseText) {
            // 将输入的内容按字符分割
            const chars = value.split('');
            console.log('分割字符:', chars);
            
            // 修复：确保当前输入框只保留第一个字符
            // 当前输入框的值应该是第一个字符，而不是整个多字符输入
            input.value = chars[0];
            
            // 从当前输入框开始填充，使用索引映射表找到正确的目标输入框
            const currentCharIndex = parseInt(input.dataset.charIndex);
            
            for (let i = 1; i < chars.length; i++) {
                const targetCharIndex = currentCharIndex + i;
                const targetInputIndex = inputMap[targetCharIndex];
                
                if (targetInputIndex !== undefined && targetInputIndex !== null && targetInputIndex < inputs.length) {
                    console.log('填充到输入框', targetInputIndex, ':', chars[i]);
                    inputs[targetInputIndex].value = chars[i];
                    
                    // 更新输入框样式
                    const expected = inputs[targetInputIndex].dataset.expected;
                    if (chars[i] === expected) {
                        inputs[targetInputIndex].classList.remove('border-red-300', 'bg-red-50');
                        inputs[targetInputIndex].classList.add('border-green-300', 'bg-green-50');
                        // 第二阶段不播放正确音效
                    } else {
                        inputs[targetInputIndex].classList.remove('border-green-300', 'bg-green-50');
                        inputs[targetInputIndex].classList.add('border-red-300', 'bg-red-50');
                        // 第二阶段不播放错误音效
                    }
                }
            }
            
            // 聚焦到下一个未填充的输入框
            setTimeout(() => {
                // 找到下一个有效的输入框索引
                let nextCharIndex = currentCharIndex + chars.length;
                let nextInputIndex = null;
                
                while (nextCharIndex < inputMap.length) {
                    nextInputIndex = inputMap[nextCharIndex];
                    if (nextInputIndex !== null && nextInputIndex !== undefined) {
                        break;
                    }
                    nextCharIndex++;
                }
                
                if (nextInputIndex !== null && nextInputIndex !== undefined) {
                    focusStage2NextInput(nextInputIndex);
                }
            }, 10);
            
            console.log('中文候选词处理完成');
            return;
        }
    }
    
    // 如果输入的内容超过1个字符，可能是粘贴或快速输入
    if (value.length > 1) {
        console.log('检测到多字符输入:', value);
        // 获取所有第二阶段输入框和索引映射表
        const container = document.getElementById('full-sentence-blanks');
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        const inputMap = JSON.parse(container.dataset.inputMap || '[]');
        
        // 检查是否是有效的中文字符（非英文字母）
        const isChineseText = /[\u4e00-\u9fff]/.test(value);
        console.log('是否中文字符:', isChineseText);
        
        if (isChineseText) {
            // 将输入的内容按字符分割
            const chars = value.split('');
            console.log('分割字符:', chars);
            
            // 从当前输入框开始填充，使用索引映射表找到正确的目标输入框
            const currentCharIndex = parseInt(input.dataset.charIndex);
            
            for (let i = 1; i < chars.length; i++) {
                const targetCharIndex = currentCharIndex + i;
                const targetInputIndex = inputMap[targetCharIndex];
                
                if (targetInputIndex !== undefined && targetInputIndex !== null && targetInputIndex < inputs.length) {
                    console.log('填充到输入框', targetInputIndex, ':', chars[i]);
                    inputs[targetInputIndex].value = chars[i];
                    
                    // 更新输入框样式
                    const expected = inputs[targetInputIndex].dataset.expected;
                    if (chars[i] === expected) {
                        inputs[targetInputIndex].classList.remove('border-red-300', 'bg-red-50');
                        inputs[targetInputIndex].classList.add('border-green-300', 'bg-green-50');
                        // 第二阶段不播放正确音效
                    } else {
                        inputs[targetInputIndex].classList.remove('border-green-300', 'bg-green-50');
                        inputs[targetInputIndex].classList.add('border-red-300', 'bg-red-50');
                        // 第二阶段不播放错误音效
                    }
                }
            }
            
            // 聚焦到下一个未填充的输入框
            setTimeout(() => {
                // 找到下一个有效的输入框索引
                let nextCharIndex = currentCharIndex + chars.length;
                let nextInputIndex = null;
                
                while (nextCharIndex < inputMap.length) {
                    nextInputIndex = inputMap[nextCharIndex];
                    if (nextInputIndex !== null && nextInputIndex !== undefined) {
                        break;
                    }
                    nextCharIndex++;
                }
                
                if (nextInputIndex !== null && nextInputIndex !== undefined) {
                    focusStage2NextInput(nextInputIndex);
                }
            }, 10);
            
            console.log('多字符处理完成');
            // 处理完成后立即返回，避免后续逻辑执行
            return;
        }
        // 如果是英文字母，可能是输入法候选词选择，不处理
    }
    
    // 如果输入了1个字符，自动跳到下一个输入框（对中文字符和英文字符都生效）
    else if (value.length === 1) {
        console.log('单字符输入，跳转到下一个输入框');
        
        // 单字符输入的验证逻辑
        const expected = input.dataset.expected;
        // 对于空格输入框，不能使用trim()，需要保留空格
        const userInput = input.dataset.expected === ' ' ? value : value.trim();
        
        if (userInput === expected) {
            // 正确：显示绿色边框
            input.classList.remove('border-red-300', 'bg-red-50');
            input.classList.add('border-green-300', 'bg-green-50');
            // 第二阶段不播放正确音效
        } else {
            // 错误：显示红色边框
            input.classList.remove('border-green-300', 'bg-green-50');
            input.classList.add('border-red-300', 'bg-red-50');
            // 第二阶段不播放错误音效
        }
        
        setTimeout(() => {
            focusStage2NextInput(currentIndex + 1);
        }, 10);
    }
}

// 第二阶段粘贴处理函数
function handleStage2Paste(e, currentIndex) {
    e.preventDefault();
    
    // 获取粘贴的内容
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    
    if (pastedText && pastedText.length > 0) {
        // 获取所有第二阶段输入框
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        
        // 将粘贴的内容按字符分割
        const chars = pastedText.split('');
        
        // 从当前输入框开始填充
        for (let i = 0; i < chars.length; i++) {
            const targetIndex = currentIndex + i;
            if (targetIndex < inputs.length) {
                inputs[targetIndex].value = chars[i];
                
                // 更新输入框样式
                const expected = inputs[targetIndex].dataset.expected;
                if (chars[i] === expected) {
                    inputs[targetIndex].classList.remove('border-red-300', 'bg-red-50');
                    inputs[targetIndex].classList.add('border-green-300', 'bg-green-50');
                    // 播放正确音效
                    playCorrectSound();
                } else {
                    inputs[targetIndex].classList.remove('border-green-300', 'bg-green-50');
                    inputs[targetIndex].classList.add('border-red-300', 'bg-red-50');
                    // 播放错误音效
                    playWrongSound();
                }
            }
        }
        
        // 聚焦到下一个输入框
        setTimeout(() => {
            focusStage2NextInput(currentIndex + chars.length);
        }, 10);
    }
}

// 第二阶段键盘按下处理函数
function handleStage2Keydown(e, currentIndex) {
    const input = e.target;
    const value = input.value;
    
    // 处理Backspace键删除
    if (e.key === 'Backspace' && value.length === 0 && currentIndex > 0) {
        e.preventDefault();
        
        // 获取所有第二阶段输入框
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        
        // 找到前一个非空的输入框
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (inputs[i].value.trim()) {
                // 清空前一个输入框
                inputs[i].value = '';
                
                // 更新输入框样式
                inputs[i].classList.remove('border-gray-300');
                inputs[i].classList.add('border-red-300', 'bg-red-50');
                
                // 聚焦到前一个输入框
                setTimeout(() => {
                    inputs[i].focus();
                }, 10);
                break;
            }
        }
    }
    
    // 处理Delete键删除
    if (e.key === 'Delete' && value.length === 0 && currentIndex < document.querySelectorAll('#full-sentence-blanks input').length - 1) {
        e.preventDefault();
        
        // 获取所有第二阶段输入框
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        
        // 找到后一个非空的输入框
        for (let i = currentIndex + 1; i < inputs.length; i++) {
            if (inputs[i].value.trim()) {
                // 清空后一个输入框
                inputs[i].value = '';
                
                // 更新输入框样式
                inputs[i].classList.remove('border-gray-300');
                inputs[i].classList.add('border-red-300', 'bg-red-50');
                
                // 聚焦到后一个输入框
                setTimeout(() => {
                    inputs[i].focus();
                }, 10);
                break;
            }
        }
    }
    
    // 方向键处理
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        inputs[currentIndex - 1].focus();
        e.preventDefault();
    } else if (e.key === 'ArrowRight' && currentIndex < document.querySelectorAll('#full-sentence-blanks input').length - 1) {
        const inputs = document.querySelectorAll('#full-sentence-blanks input');
        inputs[currentIndex + 1].focus();
        e.preventDefault();
    }
}

// 聚焦到第二阶段的下一个输入框
function focusStage2NextInput(startIndex) {
    const inputs = document.querySelectorAll('#full-sentence-blanks input');
    for (let i = startIndex; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            inputs[i].focus();
            return;
        }
    }
    // 如果所有输入框都已填充，聚焦到最后一个
    if (inputs.length > 0) {
        inputs[inputs.length - 1].focus();
    }
}

