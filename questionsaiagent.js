const questionsaiagent = [
    { 
        id: 1, 
        type: "sentence", 
        title: "AI Agent基本概念", 
        content: `<div class="p-4 text-sm"> 
                    <p class="mb-4">AI Agent是一种能够<span class="code-blank" data-id="1-1" data-answer="自主决策"></span>和<span class="code-blank" data-id="1-2" data-answer="执行任务"></span>的智能系统，通过<span class="code-blank" data-id="1-3" data-answer="感知环境"></span>、<span class="code-blank" data-id="1-4" data-answer="推理分析"></span>和<span class="code-blank" data-id="1-5" data-answer="行动执行"></span>来完成特定目标。</p> 
                </div>`, 
        instruction: "填写正确的词语完成AI Agent概念定义", 
        hint: "AI Agent的核心能力包括自主决策、环境感知、推理分析等", 
        explanation: 
            "AI Agent是一种能够自主决策和执行任务的智能系统，通过感知环境、推理分析和行动执行来完成特定目标", 
        fullSentence: 
            "AI Agent是一种能够自主决策和执行任务的智能系统，通过感知环境、推理分析和行动执行来完成特定目标。", 
    }, 
    { 
        id: 2, 
        type: "select", 
        title: "Agent类定义", 
        content: `<div class="p-4 text-sm"> 
                    <p class="mb-2">哪个选项是正确的Agent类定义？</p> 
                </div>`, 
        options: [ 
            `class Agent { constructor() { this.memory = [] } }`, 
            `function Agent() { this.memory = [] }`, 
            `type Agent struct { Memory []string }`, 
            `def Agent: memory = []`, 
        ], 
        correct: 0, 
        explanation: "在JavaScript中，使用class关键字定义类，constructor是构造函数", 
    }, 
    { 
        id: 3, 
        type: "fill", 
        title: "工具调用函数", 
        content: `<div class="p-4 font-mono text-sm"> 
                    <div><span class="text-blue-600">function</span> <span class="code-blank" data-id="3" data-answer='callTool'></span>(toolName, params) {</div> 
                    <div>    // 实现工具调用逻辑</div> 
                    <div>}</div> 
                </div>`, 
        instruction: "填写工具调用函数的名称", 
        hint: "函数名应该描述其功能，如callTool或invokeTool", 
        explanation: "工具调用函数通常命名为callTool或类似名称，用于执行特定的工具操作", 
    },
    { 
        id: 4, 
        type: "sentence", 
        title: "Agent工作流程", 
        content: `<div class="p-4 text-sm"> 
                    <p class="mb-4">Agent的工作流程包括<span class="code-blank" data-id="4-1" data-answer="接收输入"></span>、<span class="code-blank" data-id="4-2" data-answer="处理信息"></span>、<span class="code-blank" data-id="4-3" data-answer="制定计划"></span>、<span class="code-blank" data-id="4-4" data-answer="执行动作"></span>和<span class="code-blank" data-id="4-5" data-answer="评估结果"></span>五个阶段。</p> 
                </div>`, 
        instruction: "填写Agent工作流程的各个阶段", 
        hint: "Agent工作流程通常包括输入、处理、计划、执行、评估等环节", 
        explanation: 
            "Agent的工作流程包括接收输入、处理信息、制定计划、执行动作和评估结果五个阶段", 
        fullSentence: 
            "Agent的工作流程包括接收输入、处理信息、制定计划、执行动作和评估结果五个阶段。", 
    }, 
    { 
        id: 5, 
        type: "select", 
        title: "记忆存储方式", 
        content: `<div class="p-4 text-sm"> 
                    <p class="mb-2">哪种方式最适合存储Agent的长期记忆？</p> 
                </div>`, 
        options: [ 
            `会话存储(sessionStorage)`, 
            `本地存储(localStorage)`, 
            `内存变量`, 
            `数据库存储`, 
        ], 
        correct: 3, 
        explanation: "数据库存储适合长期记忆，可以持久化保存Agent的学习和经验", 
    }, 
    { 
        id: 6, 
        type: "fill", 
        title: "API调用函数", 
        content: `<div class="p-4 font-mono text-sm"> 
                    <div><span class="text-blue-600">async</span> <span class="code-blank" data-id="6" data-answer='fetchAPI'></span>(url, options) {</div> 
                    <div>    const response = await fetch(url, options);</div> 
                    <div>    return response.json();</div> 
                    <div>}</div> 
                </div>`, 
        instruction: "填写异步API调用函数的名称", 
        hint: "函数名应该描述其功能，如fetchAPI或callAPI", 
        explanation: "异步API调用函数通常命名为fetchAPI或类似名称，用于获取远程数据", 
    },
    { 
        id: 7, 
        type: "sentence", 
        title: "多Agent协作", 
        content: `<div class="p-4 text-sm"> 
                    <p class="mb-4">多Agent系统通过<span class="code-blank" data-id="7-1" data-answer="通信协议"></span>实现<span class="code-blank" data-id="7-2" data-answer="信息交换"></span>，使用<span class="code-blank" data-id="7-3" data-answer="协商机制"></span>解决<span class="code-blank" data-id="7-4" data-answer="冲突问题"></span>，最终达成<span class="code-blank" data-id="7-5" data-answer="共同目标"></span>。</p> 
                </div>`, 
        instruction: "填写多Agent协作的关键要素", 
        hint: "多Agent协作涉及通信、协商、冲突解决等机制", 
        explanation: 
            "多Agent系统通过通信协议实现信息交换，使用协商机制解决冲突问题，最终达成共同目标", 
        fullSentence: 
            "多Agent系统通过通信协议实现信息交换，使用协商机制解决冲突问题，最终达成共同目标。", 
    }, 
    { 
        id: 8, 
        type: "select", 
        title: "错误处理策略", 
        content: `<div class="p-4 text-sm"> 
                    <p class="mb-2">哪种错误处理策略最适合Agent系统？</p> 
                </div>`, 
        options: [ 
            `忽略所有错误`, 
            `立即终止程序`, 
            `重试机制和降级处理`, 
            `只记录错误不处理`, 
        ], 
        correct: 2, 
        explanation: "重试机制和降级处理可以让Agent在遇到错误时继续运行，提高系统鲁棒性", 
    }, 
    { 
        id: 9, 
        type: "fill", 
        title: "状态管理", 
        content: `<div class="p-4 font-mono text-sm"> 
                    <div><span class="text-blue-600">class</span> <span class="code-blank" data-id="9" data-answer='AgentState'></span> {</div> 
                    <div>    constructor() {</div> 
                    <div>        this.currentTask = null;</div> 
                    <div>        this.memory = [];</div> 
                    <div>    }</div> 
                    <div>}</div> 
                </div>`, 
        instruction: "填写Agent状态管理类的名称", 
        hint: "类名应该描述其功能，如AgentState或StateManager", 
        explanation: "Agent状态管理类通常命名为AgentState或类似名称，用于管理Agent的运行状态", 
    }
]
