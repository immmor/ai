// AI生成题库功能
// 通过调用AI接口，根据用户输入的主题自动生成题目
// 存储结构：{ [topic]: [questions] }，每个主题对应一个独立题库
class AIQuestionGenerator {
    constructor() {
        this.storageKey = 'aiGeneratedQuestions';
        this.bankPrefix = 'aigen:';
        this.topics = {}; // { topicName: [questions] }
        this.init();
    }

    init() {
        this.loadExistingQuestions();
        this.injectBankMenuOptions();
        this.bindPanelButton();
    }

    bindPanelButton() {
        const btn = document.getElementById('ai-generate-panel-btn');
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // 关闭学习功能上拉框（如果已打开）
            const panel = document.getElementById('learn-panel');
            if (panel && !panel.classList.contains('hidden')) {
                panel.classList.add('hidden');
            }
            this.openDialog();
        });
    }

    // 从localStorage加载已生成的题库（按主题分组）
    loadExistingQuestions() {
        let data = {};
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                data = JSON.parse(saved);
                // 旧版是数组：迁移到默认主题
                if (Array.isArray(data)) {
                    data = data.length > 0 ? { 'AI题库': data } : {};
                }
                if (!data || typeof data !== 'object' || Array.isArray(data)) {
                    data = {};
                }
            }
        } catch (e) {
            console.error('加载AI生成题库失败:', e);
            data = {};
        }
        this.topics = data;
        // 暴露为全局变量，题库系统按需读取
        window.aiGeneratedTopics = this.topics;
    }

    // 持久化保存
    saveQuestions() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.topics));
        } catch (e) {
            console.error('保存AI生成题库失败:', e);
        }
        window.aiGeneratedTopics = this.topics;
    }

    // 主题 ↔ 内部bankId 的转换（URL编码防止特殊字符破坏data属性）
    getBankIdForTopic(topic) {
        return this.bankPrefix + encodeURIComponent(topic);
    }
    getTopicFromBankId(bankId) {
        if (!bankId || !bankId.startsWith(this.bankPrefix)) return null;
        try { return decodeURIComponent(bankId.slice(this.bankPrefix.length)); }
        catch (e) { return null; }
    }
    getQuestionsForBankId(bankId) {
        const topic = this.getTopicFromBankId(bankId);
        if (!topic) return [];
        return this.topics[topic] || [];
    }

    // 把指定主题的题目注入到全局 window.questionsaigenerate（兼容旧读取）
    setActiveTopic(topic) {
        window.questionsaigenerate = this.topics[topic] || [];
    }

    // 注入到题库选择菜单：每个主题一个选项 + 顶部"新建AI题库"选项
    injectBankMenuOptions() {
        const menu = document.getElementById('question-bank-menu');
        if (!menu) return;
        const inner = menu.querySelector('div');
        if (!inner) return;
        // 清理旧的AI相关选项
        inner.querySelectorAll('[data-bank^="aigen:"], [data-bank="ai-generate-new"]').forEach(el => el.remove());
        // 为每个主题添加选项
        for (const topic of Object.keys(this.topics)) {
            const bankId = this.getBankIdForTopic(topic);
            const btn = document.createElement('button');
            btn.className = 'question-bank-option w-full text-center px-3 py-2 text-xs hover:bg-gray-100';
            btn.dataset.bank = bankId;
            const count = (this.topics[topic] || []).length;
            btn.innerHTML = `<span>🤖 ${this._escapeHtml(topic)}</span>`;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.setActiveTopic(topic);
                if (typeof switchQuestionBank === 'function') {
                    switchQuestionBank(bankId);
                }
                menu.classList.add('hidden');
            });
            inner.prepend(btn);
        }
        // 顶部"新建AI题库"入口
        const newBtn = document.createElement('button');
        newBtn.className = 'w-full text-center px-3 py-2 text-xs hover:bg-gray-100 border-t border-gray-200 text-indigo-600 font-medium';
        newBtn.dataset.bank = 'ai-generate-new';
        newBtn.innerHTML = '<span>✨AI生成</span>';
        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.add('hidden');
            this.openDialog();
        });
        inner.prepend(newBtn);
    }

    // 弹出生成对话框
    openDialog() {
        if (this._dialog) {
            this._dialog.classList.remove('hidden');
            this.refreshList();
            return;
        }
        this._buildDialog();
        this._dialog.classList.remove('hidden');
        this.refreshList();
    }

    closeDialog() {
        if (this._dialog) this._dialog.classList.add('hidden');
    }

    _buildDialog() {
        // 样式
        const style = document.createElement('style');
        style.textContent = `
            #ai-qg-dialog { position: fixed; inset: 0; z-index: 60; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.55); }
            #ai-qg-dialog.hidden { display: none; }
            #ai-qg-panel { background: #fff; border-radius: 14px; width: min(560px, 96vw); max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.3); overflow: hidden; }
            .ai-qg-header { padding: 14px 18px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; display: flex; justify-content: space-between; align-items: center; }
            .ai-qg-header h3 { margin: 0; font-size: 16px; font-weight: 600; }
            .ai-qg-close { background: none; border: none; color: #fff; font-size: 18px; cursor: pointer; }
            .ai-qg-body { padding: 16px 18px; overflow-y: auto; flex: 1; }
            .ai-qg-row { display: flex; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
            .ai-qg-field { flex: 1; min-width: 140px; display: flex; flex-direction: column; }
            .ai-qg-field label { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
            .ai-qg-field input, .ai-qg-field select, .ai-qg-field textarea { padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; outline: none; }
            .ai-qg-field input:focus, .ai-qg-field select:focus, .ai-qg-field textarea:focus { border-color: #667eea; box-shadow: 0 0 0 2px rgba(102,126,234,0.2); }
            .ai-qg-actions { display: flex; gap: 10px; margin-top: 4px; }
            .ai-qg-btn { padding: 8px 14px; border-radius: 8px; font-size: 13px; cursor: pointer; border: none; transition: all 0.2s; }
            .ai-qg-btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; }
            .ai-qg-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(102,126,234,0.4); }
            .ai-qg-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
            .ai-qg-btn-ghost { background: #f3f4f6; color: #374151; }
            .ai-qg-btn-ghost:hover { background: #e5e7eb; }
            .ai-qg-btn-danger { background: #fee2e2; color: #b91c1c; }
            .ai-qg-btn-danger:hover { background: #fecaca; }
            .ai-qg-list { margin-top: 14px; border-top: 1px dashed #e5e7eb; padding-top: 12px; }
            .ai-qg-item { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px; font-size: 13px; }
            .ai-qg-item-title { font-weight: 600; color: #1f2937; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center; }
            .ai-qg-item-meta { color: #6b7280; font-size: 11px; }
            .ai-qg-item-actions { display: flex; gap: 6px; }
            .ai-qg-item-actions button { padding: 3px 8px; font-size: 11px; border-radius: 6px; border: none; cursor: pointer; }
            .ai-qg-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.5); border-top-color: #fff; border-radius: 50%; animation: ai-qg-spin 0.8s linear infinite; vertical-align: middle; margin-right: 6px; }
            @keyframes ai-qg-spin { to { transform: rotate(360deg); } }
            .ai-qg-toast { position: fixed; top: 70px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.85); color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 13px; z-index: 100; animation: ai-qg-fade 2.5s forwards; }
            @keyframes ai-qg-fade { 0%{opacity:0;transform:translate(-50%,-8px);} 10%{opacity:1;transform:translate(-50%,0);} 80%{opacity:1;} 100%{opacity:0;} }
        `;
        document.head.appendChild(style);

        // DOM
        const dlg = document.createElement('div');
        dlg.id = 'ai-qg-dialog';
        dlg.className = 'hidden';
        dlg.innerHTML = `
            <div id="ai-qg-panel" onclick="event.stopPropagation()">
                <div class="ai-qg-header">
                    <h3>🤖 AI生成题库</h3>
                    <button class="ai-qg-close" id="ai-qg-close" aria-label="关闭">✕</button>
                </div>
                <div class="ai-qg-body">
                    <div class="ai-qg-row">
                        <div class="ai-qg-field" style="flex:2;">
                            <label>题目主题 <span style="color:#9ca3af">(必填)</span></label>
                            <input type="text" id="ai-qg-topic" placeholder="例如：JavaScript闭包、Rust所有权模型、英语单词" maxlength="60">
                        </div>
                        <div class="ai-qg-field" style="flex:1;">
                            <label>数量</label>
                            <select id="ai-qg-count">
                                <option value="3">3</option>
                                <option value="5" selected>5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                        <div class="ai-qg-field" style="flex:1;">
                            <label>题型</label>
                            <select id="ai-qg-type">
                                <option value="select" selected>选择题</option>
                                <option value="fill">填空题</option>
                                <option value="sentence">句子题</option>
                                <option value="mixed">混合</option>
                            </select>
                        </div>
                        <div class="ai-qg-field" style="flex:1;">
                            <label>难度</label>
                            <select id="ai-qg-difficulty">
                                <option value="简单">简单</option>
                                <option value="中等" selected>中等</option>
                                <option value="困难">困难</option>
                            </select>
                        </div>
                    </div>
                    <div class="ai-qg-field">
                        <label>补充要求 <span style="color:#9ca3af">(可选)</span></label>
                        <textarea id="ai-qg-extra" rows="2" placeholder="例如：侧重实际应用、面向初学者、避免过时代码等"></textarea>
                    </div>
                    <div class="ai-qg-actions">
                        <button class="ai-qg-btn ai-qg-btn-primary" id="ai-qg-generate">✨ 开始生成</button>
                        <button class="ai-qg-btn ai-qg-btn-ghost" id="ai-qg-goto-bank">查看题库</button>
                        <button class="ai-qg-btn ai-qg-btn-danger" id="ai-qg-clear">清空题库</button>
                    </div>
                    <div class="ai-qg-list" id="ai-qg-list"></div>
                </div>
            </div>
        `;
        // 点击遮罩关闭
        dlg.addEventListener('click', () => this.closeDialog());
        document.body.appendChild(dlg);
        this._dialog = dlg;

        // 事件绑定
        dlg.querySelector('#ai-qg-close').addEventListener('click', (e) => { e.stopPropagation(); this.closeDialog(); });
        dlg.querySelector('#ai-qg-generate').addEventListener('click', () => this.handleGenerate());
        dlg.querySelector('#ai-qg-goto-bank').addEventListener('click', () => {
            this.closeDialog();
            // 跳到第一个有内容的主题
            const firstTopic = Object.keys(this.topics).find(t => (this.topics[t] || []).length > 0);
            if (!firstTopic) {
                this.showToast('题库为空，请先生成题目', 'info');
                return;
            }
            this.setActiveTopic(firstTopic);
            if (typeof switchQuestionBank === 'function') {
                switchQuestionBank(this.getBankIdForTopic(firstTopic));
            }
        });
        dlg.querySelector('#ai-qg-clear').addEventListener('click', () => this.handleClear());
    }

    // 刷新已生成列表：按主题分组展示
    refreshList() {
        const listEl = this._dialog.querySelector('#ai-qg-list');
        if (!listEl) return;
        this.loadExistingQuestions();
        const topics = Object.keys(this.topics);
        if (topics.length === 0) {
            listEl.innerHTML = '<div style="color:#9ca3af;font-size:12px;text-align:center;padding:10px;">暂无题库，点击"开始生成"创建第一个题库</div>';
            return;
        }
        const html = topics.map(topic => {
            const qs = this.topics[topic] || [];
            return `
                <div class="ai-qg-item" data-topic="${this._escapeAttr(topic)}">
                    <div class="ai-qg-item-title">
                        <span>📚 ${this._escapeHtml(topic)} <span class="text-gray-400 font-normal">(${qs.length})</span></span>
                        <div class="ai-qg-item-actions">
                            <button class="ai-qg-btn-ghost" data-act="goto" data-topic="${this._escapeAttr(topic)}">做题</button>
                            <button class="ai-qg-btn-danger" data-act="del-topic" data-topic="${this._escapeAttr(topic)}">删除</button>
                        </div>
                    </div>
                    ${qs.slice(0, 3).map((q, i) => `
                        <div class="ai-qg-item-meta" style="margin-top:4px;padding-left:8px;">
                            ${i + 1}. [${q.type === 'select' ? '选择' : '填空'}] ${this._escapeHtml((q.title || q.question || '').slice(0, 50))}${(q.title || q.question || '').length > 50 ? '…' : ''}
                        </div>
                    `).join('')}
                    ${qs.length > 3 ? `<div class="ai-qg-item-meta" style="padding-left:8px;">…还有 ${qs.length - 3} 道题</div>` : ''}
                </div>
            `;
        }).join('');
        listEl.innerHTML = html;
        // 做题
        listEl.querySelectorAll('button[data-act="goto"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const t = e.target.dataset.topic;
                this.setActiveTopic(t);
                this.closeDialog();
                if (typeof switchQuestionBank === 'function') {
                    switchQuestionBank(this.getBankIdForTopic(t));
                }
            });
        });
        // 删除主题
        listEl.querySelectorAll('button[data-act="del-topic"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const t = e.target.dataset.topic;
                if (!confirm(`确定删除题库「${t}」及其下所有题目吗？`)) return;
                delete this.topics[t];
                this.saveQuestions();
                this.injectBankMenuOptions();
                this.refreshList();
                this.showToast(`已删除「${t}」`, 'success');
            });
        });
    }

    // 清空所有题库
    handleClear() {
        if (Object.keys(this.topics).length === 0) {
            this.showToast('题库已为空', 'info');
            return;
        }
        if (!confirm('确定清空所有AI生成的题库吗？此操作不可恢复。')) return;
        this.topics = {};
        this.saveQuestions();
        this.injectBankMenuOptions();
        this.refreshList();
        this.showToast('已清空所有AI题库', 'success');
    }

    // 生成题目主流程
    async handleGenerate() {
        const topic = this._dialog.querySelector('#ai-qg-topic').value.trim();
        const count = parseInt(this._dialog.querySelector('#ai-qg-count').value, 10);
        const qtype = this._dialog.querySelector('#ai-qg-type').value;
        const difficulty = this._dialog.querySelector('#ai-qg-difficulty').value;
        const extra = this._dialog.querySelector('#ai-qg-extra').value.trim();

        if (!topic) {
            this.showToast('请输入题目主题', 'error');
            return;
        }

        // 校验 API Key
        const apiKey = localStorage.getItem('geminiApiKey') || '';
        if (!apiKey) {
            this.showToast('请先在AI助手中配置API Key', 'error');
            return;
        }

        const genBtn = this._dialog.querySelector('#ai-qg-generate');
        const originalText = genBtn.innerHTML;
        genBtn.disabled = true;
        genBtn.innerHTML = '<span class="ai-qg-spinner"></span>生成中...';

        try {
            const prompt = this.buildPrompt({ topic, count, qtype, difficulty, extra });
            const response = await this.callAI(prompt, apiKey);
            // 调试：把原始响应打到控制台
            console.log('[AI生成] 原始响应:', response);
            const parsed = this.parseAIResponse(response);
            if (parsed.length === 0) {
                const preview = (response || '').toString().slice(0, 120);
                throw new Error('未能解析出有效题目，请重试。AI返回: ' + preview);
            }
            // 同一主题内顺序累加 id
            const existing = this.topics[topic] || [];
            const startId = existing.length > 0 ? Math.max(...existing.map(q => q.id || 0)) + 1 : 1;
            const newQuestions = parsed.map((q, i) => ({
                ...q,
                id: startId + i,
                createdAt: Date.now(),
                topic
            }));
            // 写入 topics 对象（每个主题一个独立题库）
            this.topics[topic] = existing.concat(newQuestions);
            this.saveQuestions();
            // 刷新题库菜单（让新主题立刻出现在下拉里）
            this.injectBankMenuOptions();
            this.refreshList();
            this.showToast(`已为「${topic}」生成 ${newQuestions.length} 道题目`, 'success');
        } catch (e) {
            console.error('AI生成题目失败:', e);
            this.showToast('生成失败: ' + (e.message || '未知错误'), 'error');
        } finally {
            genBtn.disabled = false;
            genBtn.innerHTML = originalText;
        }
    }

    // 构造Prompt
    buildPrompt({ topic, count, qtype, difficulty, extra }) {
        const typeMap = {
            select: '每题都是"选择题"（type="select"），提供4个选项（options数组），并用correct字段（0-3）给出正确答案。',
            fill: '每题都是"填空题"（type="fill"），question中用一个【____】标记空缺位置，并在answer字段给出该空应填的词语或短语。',
            sentence: '每题都是"句子记忆题"（type="sentence"），question中用【】包裹需要填空的关键词（可以有多个），并提供一个blanks对象（键为填空序号，值为该空的答案），以及一个fullSentence字段给出完整的句子。',
            mixed: '题型可以混合，包含至少1道选择题、1道填空题、1道句子题。'
        };
        const typeHint = qtype === 'select' ? 'type（填select）'
            : qtype === 'fill' ? 'type（填fill）'
            : qtype === 'sentence' ? 'type（填sentence）'
            : 'type（填select/fill/sentence）';
        const extraFields = qtype === 'select' ? 'options（字符串数组，4项）、correct（0-3的整数）。'
            : qtype === 'fill' ? 'answer（字符串，question中【____】处的答案）。'
            : qtype === 'sentence' ? 'blanks（对象，键为"1"/"2"/…，值为每个【】内词语的答案）、fullSentence（完整句子）。'
            : '选择题：options、correct；填空题：answer；句子题：blanks、fullSentence。';
        return `你是一名严谨的出题专家。请围绕主题"${topic}"，生成${count}道${difficulty}难度的练习题。${typeMap[qtype]}

要求：
1. 题目内容准确，事实清晰，避免争议。
2. 选择题的干扰项要有迷惑性但明显错误。
3. 填空题答案尽量是关键词或短语。
4. 句子题的question中用【词语】包裹需要填空的关键词，支持多个填空。
5. 每道题必须包含：title（题目标题，简短）、question（完整题干）、type、hint（解题提示）、explanation（详细解释）。
6. 额外字段：${extraFields}
${extra ? '7. 额外要求：' + extra : ''}

严格按以下JSON数组格式返回，不要包含任何其他文字、Markdown代码块或解释：
[{"type":"select","title":"...","question":"...","options":["A","B","C","D"],"correct":0,"hint":"...","explanation":"..."}]`;
    }

    // 调用 AI 接口（复用 ai.js 中的格式）
    async callAI(prompt, apiKey) {
        let apiBaseUrl = localStorage.getItem('geminiApiBaseUrl') || 'https://mrok.dpdns.org/v1';
        if (!apiBaseUrl.startsWith('http://') && !apiBaseUrl.startsWith('https://')) {
            apiBaseUrl = `https://${apiBaseUrl}`;
        }
        const messages = [
            { role: 'system', content: '你是一名严谨的出题专家。严格按照用户要求的JSON格式输出，不要包含任何多余文字。' },
            { role: 'user', content: prompt }
        ];
        const response = await fetch(`${apiBaseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gemini-flash-latest',
                messages,
                max_tokens: 4000,
                temperature: 0.5
            })
        });
        if (!response.ok) {
            const txt = await response.text().catch(() => '');
            throw new Error(`API错误: ${response.status} ${txt.slice(0, 100)}`);
        }
        const data = await response.json();
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('API响应格式不正确');
        }
        return data.choices[0].message.content;
    }

    // 解析AI返回的JSON
    parseAIResponse(text) {
        if (!text) return [];
        let jsonStr = String(text).trim();
        // 去掉markdown代码块（```json ... ``` 或 ``` ... ```）
        jsonStr = jsonStr.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
        // 找到第一个 [ 或 {，尝试多种解析方式
        const bracketStart = jsonStr.indexOf('[');
        const braceStart = jsonStr.indexOf('{');
        const candidates = [];
        if (bracketStart !== -1) candidates.push(bracketStart);
        if (braceStart !== -1) candidates.push(braceStart);
        candidates.sort((a, b) => a - b);
        // 尝试从每个候选起点解析
        for (const start of candidates) {
            const open = jsonStr[start];
            const close = open === '[' ? ']' : '}';
            let depth = 0;
            let inStr = false;
            let escape = false;
            let end = -1;
            for (let i = start; i < jsonStr.length; i++) {
                const ch = jsonStr[i];
                if (inStr) {
                    if (escape) { escape = false; continue; }
                    if (ch === '\\') { escape = true; continue; }
                    if (ch === '"') inStr = false;
                    continue;
                }
                if (ch === '"') { inStr = true; continue; }
                if (ch === open) depth++;
                else if (ch === close) {
                    depth--;
                    if (depth === 0) { end = i; break; }
                }
            }
            if (end === -1) continue;
            const candidate = jsonStr.slice(start, end + 1);
            try {
                const data = JSON.parse(candidate);
                const arr = this._extractQuestions(data);
                if (arr.length > 0) return this._normalize(arr);
            } catch (e) {
                console.warn('[AI生成] 该起点解析失败:', e.message, '->', candidate.slice(0, 80));
            }
        }
        return [];
    }

    // 从可能的数据结构中提取题目数组
    _extractQuestions(data) {
        if (Array.isArray(data)) return data;
        if (data && typeof data === 'object') {
            // 常见包装字段
            const keys = ['questions', 'data', 'items', 'list', 'result', 'content'];
            for (const k of keys) {
                if (Array.isArray(data[k])) return data[k];
            }
            // 找第一个值为数组的字段
            for (const k of Object.keys(data)) {
                if (Array.isArray(data[k])) return data[k];
            }
        }
        return [];
    }

    // 标准化为系统使用的题目格式
    _normalize(arr) {
        const result = [];
        for (const item of arr) {
            if (!item || typeof item !== 'object') continue;
            // 归一化 type 字段：兼容 select/choice/multiple、fill/blank 等
            const rawType = String(item.type || '').toLowerCase().trim();
            let t = null;
            if (['select', 'choice', 'multiple', 'choicequestion', '选择题'].includes(rawType)) t = 'select';
            else if (['fill', 'blank', 'fillblank', 'cloze', '填空题'].includes(rawType)) t = 'fill';
            else if (['sentence', 'sentencequestion', '句子', '句子题', '句子记忆', '记忆题'].includes(rawType)) t = 'sentence';
            else if (rawType.includes('select') || rawType.includes('choice')) t = 'select';
            else if (rawType.includes('fill') || rawType.includes('blank')) t = 'fill';
            else if (rawType.includes('sentence')) t = 'sentence';
            // 如果没有type，根据字段推断
            if (!t) {
                if (item.options && item.correct !== undefined) t = 'select';
                else if (item.blanks || item.fullSentence) t = 'sentence';
                else if (Array.isArray(item.answer) && item.answer.length > 1) t = 'sentence';
                else if (item.answer !== undefined && item.answer !== '') t = 'fill';
            }
            if (!t) continue;
            // 题目文本兼容：question / stem / text / content
            const questionText = item.question || item.stem || item.text || '';
            if (!questionText) continue;
            // title 兼容
            const title = item.title || item.topic || item.subject || (t === 'select' ? '选择题' : t === 'fill' ? '填空题' : '句子题');
            const hint = item.hint || item.tip || '';
            const explanation = item.explanation || item.analysis || item.reason || '';
            if (t === 'select') {
                let options = item.options;
                // options 兼容：choices / answers
                if (!Array.isArray(options)) options = item.choices || item.answers;
                if (!Array.isArray(options) || options.length < 2) continue;
                // correct 兼容：数字索引、字母(A/B/C/D)、字符串内容
                let correct = item.correct;
                if (typeof correct === 'string') {
                    const s = correct.trim();
                    if (/^[A-Da-d]$/.test(s)) {
                        correct = s.toUpperCase().charCodeAt(0) - 65;
                    } else if (!isNaN(Number(s))) {
                        correct = Number(s);
                    } else {
                        // 尝试按文本匹配
                        const idx = options.findIndex(o => String(o).trim() === s);
                        correct = idx;
                    }
                }
                if (typeof correct !== 'number' || correct < 0 || correct >= options.length) continue;
                result.push({
                    type: 'select',
                    title: String(title),
                    content: `<div class="p-4 text-sm"><p>${this._escapeHtml(questionText)}</p></div>`,
                    options: options.map(o => String(o)),
                    correct,
                    hint: String(hint),
                    explanation: String(explanation)
                });
            } else if (t === 'fill') {
                let answer = item.answer;
                if (answer === undefined || answer === null || answer === '') continue;
                if (Array.isArray(answer)) answer = answer[0];
                answer = String(answer).trim();
                if (!answer) continue;
                // 将 question 中的占位符替换为 code-blank
                const id = 'fill_' + Math.random().toString(36).slice(2, 8);
                const blank = `<span class="code-blank" data-id="${id}" data-answer="${this._escapeAttr(answer)}"></span>`;
                let html = this._escapeHtml(questionText);
                // 多种占位符写法
                html = html.replace(/【____】/g, blank)
                           .replace(/【__】/g, blank)
                           .replace(/_{2,}/g, blank)
                           .replace(/\(\s*\?\s*\)/g, blank)
                           .replace(/（\s*\?\s*）/g, blank);
                const finalHtml = `<div class="p-4 text-sm font-mono"><p>${html}</p></div>`;
                result.push({
                    type: 'fill',
                    title: String(title),
                    content: finalHtml,
                    instruction: `请补全【${title}】中的空缺`,
                    hint: String(hint),
                    explanation: String(explanation)
                });
            } else if (t === 'sentence') {
                let blanks = item.blanks || {};
                let blankList = [];
                let html = this._escapeHtml(questionText);
                const bracketRegex = /【([^】]+)】/;
                if (bracketRegex.test(questionText)) {
                    html = this._escapeHtml(questionText);
                    let idx = 0;
                    html = html.replace(/【([^】]+)】/g, (whole, inside) => {
                        idx++;
                        const answer = blanks[String(idx)] || blanks[idx] || inside.trim();
                        const id = 'sen_' + Math.random().toString(36).slice(2, 8) + '-' + idx;
                        blankList.push(answer);
                        return `<span class="code-blank" data-id="${id}" data-answer="${this._escapeAttr(answer)}"></span>`;
                    });
                } else {
                    let idx = 0;
                    let answers = item.answer;
                    if (typeof answers === 'string') answers = [answers];
                    if (!Array.isArray(answers)) answers = Object.values(blanks);
                    html = html.replace(/_{2,}/g, () => {
                        idx++;
                        const answer = answers[idx - 1] || blanks[String(idx)] || '';
                        const id = 'sen_' + Math.random().toString(36).slice(2, 8) + '-' + idx;
                        blankList.push(answer);
                        return `<span class="code-blank" data-id="${id}" data-answer="${this._escapeAttr(answer)}"></span>`;
                    });
                }
                if (blankList.length === 0) continue;
                const finalContent = `<div class="p-4 font-mono text-sm"><div>${html}</div></div>`;
                let fullSentence = item.fullSentence || '';
                if (!fullSentence) {
                    let fs = questionText;
                    let bi = 0;
                    fs = fs.replace(/【[^】]+】|_{2,}/g, () => {
                        const ans = blankList[bi] || '';
                        bi++;
                        return ans;
                    });
                    fullSentence = fs;
                }
                result.push({
                    type: 'sentence',
                    title: String(title),
                    content: finalContent,
                    instruction: '请填写句子中的空白处',
                    hint: String(hint),
                    explanation: String(explanation),
                    fullSentence: String(fullSentence)
                });
            }
        }
        return result;
    }

    _escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }
    _escapeAttr(s) {
        return this._escapeHtml(s);
    }

    showToast(message, type = 'info') {
        const colors = { success: '#10b981', error: '#ef4444', info: '#3b82f6' };
        const t = document.createElement('div');
        t.className = 'ai-qg-toast';
        t.style.background = `rgba(0,0,0,0.85)`;
        t.style.borderLeft = `3px solid ${colors[type] || colors.info}`;
        t.textContent = message;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2600);
    }
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    window.aiQuestionGenerator = new AIQuestionGenerator();
});
