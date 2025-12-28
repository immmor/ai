// AI对话界面实现
class AIChatInterface {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.apiKey = localStorage.getItem('geminiApiKey') || '';
        this.apiBaseUrl = localStorage.getItem('geminiApiBaseUrl') || 'https://mrok.dpdns.org/v1';
        this.init();
    }

    init() {
        this.createStyles();
        this.createChatButton();
        this.createChatWindow();
        this.loadApiKey();
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 毛玻璃效果基础样式 */
            .glass-effect {
                background: rgba(255, 255, 255, 0.25);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            }

            /* 浮动AI按钮 */
            #ai-chat-button {
                position: fixed;
                bottom: 40px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                font-size: 20px;
                cursor: pointer;
                box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
                z-index: 1000;
            }

            #ai-chat-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }

            /* AI聊天窗口 */
            #ai-chat-window {
                position: fixed;
                bottom: 140px;
                right: 20px;
                width: 350px;
                max-width: calc(100vw - 40px);
                height: 500px;
                border-radius: 20px;
                display: none;
                flex-direction: column;
                z-index: 1000;
                overflow: hidden;
            }

            /* 聊天窗口头部 */
        #ai-chat-header {
            padding: 15px 20px;
            border-radius: 20px 20px 0 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        /* API设置按钮样式 */
        .api-toggle-btn {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        
        .api-toggle-btn:hover {
            background-color: rgba(255,255,255,0.1);
        }
        
        /* 解释按钮样式 */
        .explain-btn {
            background: rgba(0, 180, 255, 0.8);
            border: none;
            color: white;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-left: 5px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .explain-btn:hover {
            background: rgba(0, 180, 255, 1);
            box-shadow: 0 2px 4px rgba(0, 180, 255, 0.3);
        }

            #ai-chat-header h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
            }

            #ai-chat-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 5px;
            }

            /* API设置区域 */
            #ai-api-settings {
                padding: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            #ai-api-settings input {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.9);
                color: #333;
                margin-bottom: 10px;
                font-size: 14px;
            }

            #ai-api-settings input::placeholder {
                color: rgba(51, 51, 51, 0.5);
            }

            /* 聊天消息区域 */
            #ai-chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: rgba(255, 255, 255, 0.8);
            }

            #ai-chat-messages::-webkit-scrollbar {
                width: 6px;
            }

            #ai-chat-messages::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.2);
            }

            #ai-chat-messages::-webkit-scrollbar-thumb {
                background: rgba(102, 126, 234, 0.5);
                border-radius: 3px;
            }

            /* 消息样式 */
            .ai-message {
                margin-bottom: 15px;
                display: flex;
                flex-direction: column;
            }

            .ai-message.user {
                align-items: flex-end;
            }

            .ai-message.bot {
                align-items: flex-start;
            }

            .ai-message-content {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.6;
                word-wrap: break-word;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .ai-message.user .ai-message-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-bottom-right-radius: 4px;
            }

            .ai-message.bot .ai-message-content {
                background: rgba(255, 255, 255, 0.95);
                color: #333;
                border-bottom-left-radius: 4px;
            }

            /* 输入区域 */
            #ai-chat-input-area {
                padding: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                gap: 8px;
            }

            #ai-chat-input {
                flex: 1;
                padding: 8px 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 18px;
                background: rgba(255, 255, 255, 0.9);
                color: #333;
                font-size: 13px;
                resize: none;
                min-height: 36px;
                max-height: 80px;
            }

            #ai-chat-input::placeholder {
                color: rgba(51, 51, 51, 0.5);
            }

            #ai-chat-send {
                padding: 8px 16px;
                border: none;
                border-radius: 18px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.3s ease;
            }

            #ai-chat-send:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }
            
            /* 解释按钮样式 */
            #ai-explain-question {
                padding: 8px;
                border: none;
                border-radius: 50%;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s ease;
            }
            
            #ai-explain-question:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
            }

            /* 加载动画 */
            .ai-loading {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 1s ease-in-out infinite;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            /* 响应式设计 */
            @media (max-width: 768px) {
                #ai-chat-window {
                    width: calc(100vw - 20px);
                    height: 70vh;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    right: auto;
                    bottom: auto;
                    transform: translate(-50%, -50%);
                    margin: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createChatButton() {
        this.chatButton = document.createElement('button');
        this.chatButton.id = 'ai-chat-button';
        this.chatButton.innerHTML = '<i class="fas fa-robot"></i>';
        this.chatButton.title = '打开AI助手';
        this.chatButton.addEventListener('click', () => this.toggleChat());
        document.body.appendChild(this.chatButton);
    }

    createChatWindow() {
        this.chatWindow = document.createElement('div');
        this.chatWindow.id = 'ai-chat-window';
        this.chatWindow.className = 'glass-effect';
        this.chatWindow.innerHTML = `
            <div id="ai-chat-header">
                <h3>AI助手</h3>
                <button id="ai-api-toggle" class="api-toggle-btn" title="API设置"><i class="fas fa-cog"></i></button>
            </div>
            <div id="ai-api-settings" style="display: none;">
                <div id="ai-api-fields" style="display: block;">
                    <input type="text" id="ai-api-key" placeholder="请输入Gemini API Key" />
                    <input type="text" id="ai-api-base-url" placeholder="API Base URL (可选)" />
                </div>
            </div>
            <div id="ai-chat-messages"></div>
            <div id="ai-chat-input-area">
                <textarea id="ai-chat-input" placeholder="输入您的问题..."></textarea>
        <button id="ai-chat-send">发送</button>
            </div>
        `;
        document.body.appendChild(this.chatWindow);

        // 绑定事件
        this.chatWindow.querySelector('#ai-chat-send').addEventListener('click', () => this.sendMessage());
        this.chatWindow.querySelector('#ai-chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // API设置保存
        this.chatWindow.querySelector('#ai-api-key').addEventListener('input', (e) => {
            this.apiKey = e.target.value;
            localStorage.setItem('geminiApiKey', this.apiKey);
        });

        this.chatWindow.querySelector('#ai-api-base-url').addEventListener('input', (e) => {
            this.apiBaseUrl = e.target.value;
            localStorage.setItem('geminiApiBaseUrl', this.apiBaseUrl);
        });

        // API设置切换
        const apiToggle = this.chatWindow.querySelector('#ai-api-toggle');
        const apiSettings = this.chatWindow.querySelector('#ai-api-settings');
        const apiFields = this.chatWindow.querySelector('#ai-api-fields');
        let apiSettingsVisible = false;
        apiToggle.addEventListener('click', () => {
            if (apiSettingsVisible) {
                apiSettings.style.display = 'none';
                apiToggle.innerHTML = '<i class="fas fa-cog"></i>';
            } else {
                apiSettings.style.display = 'block';
                apiToggle.innerHTML = '<i class="fas fa-cog"></i>';
            }
            apiSettingsVisible = !apiSettingsVisible;
        });

        // 解释当前题目按钮
        const explainBtn = this.chatWindow.querySelector('#ai-explain-question');
        explainBtn.addEventListener('click', () => this.explainCurrentQuestion());
    }

    loadApiKey() {
        this.chatWindow.querySelector('#ai-api-key').value = this.apiKey;
        this.chatWindow.querySelector('#ai-api-base-url').value = this.apiBaseUrl;
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWindow.style.display = 'flex';
            this.chatButton.innerHTML = '<i class="fas fa-times"></i>';
            this.chatButton.title = '关闭AI助手';
        } else {
            this.chatWindow.style.display = 'none';
            this.chatButton.innerHTML = '<i class="fas fa-robot"></i>';
            this.chatButton.title = '打开AI助手';
        }
    }

    async sendMessage() {
        const input = this.chatWindow.querySelector('#ai-chat-input');
        const message = input.value.trim();
        if (!message) return;
        if (!this.apiKey) {
            this.showError('请先输入Gemini API Key');
            return;
        }

        // 清空输入
        input.value = '';

        // 添加用户消息
        this.addMessage('user', message);

        // 显示加载状态
        const loadingMessage = this.addLoadingMessage();

        try {
            const response = await this.callGeminiAPI(message);
            
            // 移除加载状态
            loadingMessage.remove();

            // 添加AI回复
            this.addMessage('bot', response);
        } catch (error) {
            // 移除加载状态
            loadingMessage.remove();
            this.showError(error.message || 'API调用失败');
        }
    }

    addMessage(role, content) {
        const message = { role, content, timestamp: new Date() };
        this.messages.push(message);

        const messagesContainer = this.chatWindow.querySelector('#ai-chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `ai-message ${role}`;
        messageElement.innerHTML = `
            <div class="ai-message-content">${content}</div>
        `;
        messagesContainer.appendChild(messageElement);

        // 滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        return messageElement;
    }

    addLoadingMessage() {
        const messagesContainer = this.chatWindow.querySelector('#ai-chat-messages');
        const loadingElement = document.createElement('div');
        loadingElement.className = 'ai-message bot';
        loadingElement.innerHTML = `
            <div class="ai-message-content">
                <div class="ai-loading"></div>
            </div>
        `;
        messagesContainer.appendChild(loadingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return loadingElement;
    }

    showError(message) {
        this.addMessage('bot', `⚠️ ${message}`);
    }

    // 详细解释当前题目
    async explainCurrentQuestion() {
        // 检查是否有当前题目
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) {
            // 如果没有找到当前题目，显示提示消息
            this.addMessage('bot', '⚠️ 没有找到当前题目');
            return;
        }
        
        if (!this.apiKey) {
            this.showError('请先输入Gemini API Key');
            return;
        }
        
        // 构建解释请求消息
        const explainMessage = `请详细解释以下题目：\n\n${currentQuestion.question}\n\n选项：\n${currentQuestion.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n')}\n\n正确答案：${String.fromCharCode(65 + currentQuestion.correctAnswer)}`;
        
        // 添加请求消息
        this.addMessage('user', explainMessage);
        
        // 显示加载状态
        const loadingMessage = this.addLoadingMessage();
        
        try {
            const response = await this.callGeminiAPI(explainMessage);
            
            // 移除加载状态
            loadingMessage.remove();
            
            // 添加AI解释
            this.addMessage('bot', response);
        } catch (error) {
            // 移除加载状态
            loadingMessage.remove();
            this.showError(error.message || '解释请求失败');
        }
    }
    
    // 获取当前题目（需要根据实际页面结构调整）
    getCurrentQuestion() {
        try {
            // 这里需要根据实际页面结构来获取当前题目
            // 假设题目在id为question-text的元素中
            const questionText = document.getElementById('question-text');
            if (!questionText) return null;
            
            // 假设选项在class为option的元素中
            const optionElements = document.querySelectorAll('.option');
            const options = Array.from(optionElements).map(opt => opt.textContent.trim());
            
            // 假设正确答案存储在某个元素的属性中
            // 这里需要根据实际情况调整
            const correctAnswer = 0; // 临时默认值
            
            return {
                question: questionText.textContent.trim(),
                options: options,
                correctAnswer: correctAnswer
            };
        } catch (error) {
            console.error('获取当前题目失败:', error);
            return null;
        }
    }
    
    async callGeminiAPI(message) {
        // 确保API基础URL格式正确
        let apiBaseUrl = this.apiBaseUrl;
        if (!apiBaseUrl.startsWith('http://') && !apiBaseUrl.startsWith('https://')) {
            apiBaseUrl = `https://${apiBaseUrl}`;
        }
        
        // 构造简单的消息格式，避免复杂的消息历史可能导致的格式问题
        const messages = [
            { role: 'system', content: 'You are a helpful AI assistant. When explaining questions, please provide detailed explanations including the concept, reasoning process, and why each option is correct or incorrect.' },
            { role: 'user', content: message }
        ];
        
        try {
            const response = await fetch(`${apiBaseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gemini-flash-latest',
                    messages: messages,
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                // 尝试获取详细错误信息
                const errorText = await response.text().catch(() => '');
                let errorMessage = `API错误: ${response.status}`;
                
                try {
                    // 尝试解析JSON错误响应
                    const errorData = JSON.parse(errorText);
                    if (errorData.error?.message) {
                        errorMessage = errorData.error.message;
                    }
                } catch (e) {
                    // 如果不是JSON格式，使用原始错误文本
                    if (errorText) {
                        errorMessage += ` - ${errorText}`;
                    }
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            
            // 检查响应结构
            if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
                throw new Error('API响应格式不正确');
            }
            
            return data.choices[0].message.content;
        } catch (error) {
            // 网络错误或其他异常
            throw new Error(error.message || '网络请求失败');
        }
    }
}

// 页面加载完成后初始化AI聊天界面
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否已经加载了Font Awesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }

    // 初始化AI聊天界面
    window.aiChat = new AIChatInterface();
});