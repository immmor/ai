const questionsstock = [
    {
        id: 1,
        type: "select",
        title: "股票市场基础",
        content: `<div class="p-4 text-sm">
                    <p>股票市场中，哪个指标用于衡量股票价格相对于每股收益的比率？</p>
                </div>`,
        options: ["市盈率", "市净率", "股息率", "换手率"],
        correct: 0,
        explanation: "市盈率是股票价格与每股收益的比率，用于评估股票的投资价值"
    },
    {
        id: 2,
        type: "fill",
        title: "技术分析术语",
        content: `<div class="p-4 text-sm">
                    <p>当股票价格突破前期高点时，通常被称为<span class="code-blank" data-id="2" data-answer="突破"></span>；当价格跌破前期低点时，被称为<span class="code-blank" data-id="2-2" data-answer="跌破"></span>。</p>
                </div>`,
        instruction: "填写技术分析术语",
        hint: "价格突破和跌破的关键词",
        explanation: "突破和跌破是技术分析中的重要概念，用于判断趋势变化"
    },
    {
        id: 3,
        type: "correct",
        title: "投资策略修正",
        content: `<div class="p-4 text-sm">
                    <p>在价值投资中，投资者应该寻找<span class="text-red-600">高估</span>的股票进行投资。</p>
                </div>`,
        instruction: "找出投资策略中的错误并修正（只需要输入错误的部分）",
        correct: "低估",
        hint: "价值投资的核心是寻找被低估的股票",
        explanation: "价值投资的核心是寻找市场价格低于内在价值的被低估股票"
    },
    {
        id: 4,
        type: "sentence",
        title: "风险管理原则",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">在股票投资中，<span class="code-blank" data-id="4-1" data-answer="分散投资"></span>是重要的风险管理策略，投资者应该避免将<span class="code-blank" data-id="4-2" data-answer="所有资金"></span>投入单一股票。</p>
                </div>`,
        instruction: "填写风险管理的关键概念",
        hint: "投资分散和资金分配",
        explanation: "分散投资可以有效降低单一股票风险，避免重大损失",
        fullSentence: "在股票投资中，分散投资是重要的风险管理策略，投资者应该避免将所有资金投入单一股票。"
    },
    {
        id: 5,
        type: "select",
        title: "市场心理分析",
        content: `<div class="p-4 text-sm">
                    <p>当市场出现恐慌性抛售时，哪种投资者心理最可能主导市场？</p>
                </div>`,
        options: ["贪婪", "恐惧", "乐观", "谨慎"],
        correct: 1,
        explanation: "恐慌性抛售通常由恐惧心理主导，投资者担心进一步亏损而急于卖出"
    },
    {
        id: 6,
        type: "select",
        title: "K线图分析",
        content: `<div class="p-4 text-sm">
                    <p>在K线图中，当实体部分为红色时，通常表示什么？</p>
                </div>`,
        options: ["股价上涨", "股价下跌", "股价持平", "交易量放大"],
        correct: 1,
        explanation: "红色K线表示收盘价低于开盘价，即股价下跌"
    },
    {
        id: 7,
        type: "fill",
        title: "基本面分析",
        content: `<div class="p-4 text-sm">
                    <p>基本面分析主要关注公司的<span class="code-blank" data-id="7" data-answer="财务状况"></span>、<span class="code-blank" data-id="7-2" data-answer="盈利能力"></span>和<span class="code-blank" data-id="7-3" data-answer="行业地位"></span>等因素。</p>
                </div>`,
        instruction: "填写基本面分析的关键要素",
        hint: "公司财务、盈利能力和市场地位",
        explanation: "基本面分析通过研究公司的内在价值来判断投资价值"
    },
    {
        id: 8,
        type: "correct",
        title: "止损策略修正",
        content: `<div class="p-4 text-sm">
                    <p>止损策略的目的是为了<span class="text-red-600">扩大</span>亏损。</p>
                </div>`,
        instruction: "找出止损策略中的错误并修正（只需要输入错误的部分）",
        correct: "限制",
        hint: "止损的目的是控制风险",
        explanation: "止损策略的目的是限制亏损，防止损失扩大"
    },
    {
        id: 9,
        type: "sentence",
        title: "技术指标应用",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">移动平均线是常用的技术指标，当短期均线<span class="code-blank" data-id="9-1" data-answer="上穿"></span>长期均线时，通常被视为<span class="code-blank" data-id="9-2" data-answer="买入"></span>信号。</p>
                </div>`,
        instruction: "填写技术指标的应用规则",
        hint: "均线交叉和交易信号",
        explanation: "移动平均线的金叉（短期上穿长期）是买入信号，死叉（短期下穿长期）是卖出信号",
        fullSentence: "移动平均线是常用的技术指标，当短期均线上穿长期均线时，通常被视为买入信号。"
    },
    {
        id: 10,
        type: "select",
        title: "市场周期理论",
        content: `<div class="p-4 text-sm">
                    <p>根据市场周期理论，哪个阶段通常被认为是买入的最佳时机？</p>
                </div>`,
        options: ["繁荣期", "衰退期", "萧条期", "复苏期"],
        correct: 3,
        explanation: "复苏期是市场从底部开始回升的阶段，通常是买入的好时机"
    },
    {
        id: 11,
        type: "fill",
        title: "资金管理原则",
        content: `<div class="p-4 text-sm">
                    <p>合理的资金管理要求单笔交易的风险不超过总资金的<span class="code-blank" data-id="11" data-answer="2%"></span>到<span class="code-blank" data-id="11-2" data-answer="5%"></span>。</p>
                </div>`,
        instruction: "填写资金管理的风险控制比例",
        hint: "风险控制百分比范围",
        explanation: "合理的风险控制是成功投资的关键，通常建议单笔交易风险控制在2%-5%"
    },
    {
        id: 12,
        type: "correct",
        title: "投资心态修正",
        content: `<div class="p-4 text-sm">
                    <p>成功的投资者应该<span class="text-red-600">情绪化</span>地做出投资决策。</p>
                </div>`,
        instruction: "找出投资心态中的错误并修正（只需要输入错误的部分）",
        correct: "理性",
        hint: "投资需要理性思考",
        explanation: "成功的投资者应该理性地做出投资决策，避免情绪化操作"
    },
    {
        id: 13,
        type: "sentence",
        title: "价值投资理念",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">价值投资的核心理念是<span class="code-blank" data-id="13-1" data-answer="安全边际"></span>，即在<span class="code-blank" data-id="13-2" data-answer="价格低于价值"></span>时买入股票。</p>
                </div>`,
        instruction: "填写价值投资的核心概念",
        hint: "安全边际和价格价值关系",
        explanation: "价值投资强调安全边际，即在价格显著低于内在价值时买入",
        fullSentence: "价值投资的核心理念是安全边际，即在价格低于价值时买入股票。"
    },
    {
        id: 14,
        type: "select",
        title: "技术分析工具",
        content: `<div class="p-4 text-sm">
                    <p>哪个技术指标用于衡量股票的超买超卖状态？</p>
                </div>`,
        options: ["RSI", "MACD", "布林带", "KDJ"],
        correct: 0,
        explanation: "RSI（相对强弱指数）是衡量股票超买超卖状态的重要技术指标"
    },
    {
        id: 15,
        type: "fill",
        title: "投资组合构建",
        content: `<div class="p-4 text-sm">
                    <p>构建投资组合时，应该考虑资产的<span class="code-blank" data-id="15" data-answer="相关性"></span>，通过<span class="code-blank" data-id="15-2" data-answer="分散投资"></span>来降低整体风险。</p>
                </div>`,
        instruction: "填写投资组合构建的关键要素",
        hint: "资产相关性和风险分散",
        explanation: "投资组合构建需要考虑资产的相关性，通过分散投资来优化风险收益比"
    },
    {
        id: 16,
        type: "select",
        title: "技术分析形态",
        content: `<div class="p-4 text-sm">
                    <p>哪种技术分析形态通常被认为是反转信号？</p>
                </div>`,
        options: ["头肩顶", "三角形整理", "矩形整理", "旗形整理"],
        correct: 0,
        explanation: "头肩顶形态通常被认为是重要的反转信号，预示着上涨趋势可能结束"
    },
    {
        id: 17,
        type: "fill",
        title: "宏观经济分析",
        content: `<div class="p-4 text-sm">
                    <p>宏观经济分析主要关注<span class="code-blank" data-id="17" data-answer="GDP增长率"></span>、<span class="code-blank" data-id="17-2" data-answer="通货膨胀率"></span>和<span class="code-blank" data-id="17-3" data-answer="利率政策"></span>等指标。</p>
                </div>`,
        instruction: "填写宏观经济分析的关键指标",
        hint: "经济增长、通胀和货币政策",
        explanation: "宏观经济分析通过研究整体经济环境来判断市场趋势"
    },
    {
        id: 18,
        type: "correct",
        title: "投资时机修正",
        content: `<div class="p-4 text-sm">
                    <p>在股票投资中，应该<span class="text-red-600">追涨杀跌</span>以获得最佳收益。</p>
                </div>`,
        instruction: "找出投资时机选择中的错误并修正（只需要输入错误的部分）",
        correct: "低买高卖",
        hint: "正确的投资时机策略",
        explanation: "追涨杀跌是投资大忌，正确的策略应该是低买高卖"
    },
    {
        id: 19,
        type: "sentence",
        title: "趋势交易原则",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">趋势交易的核心原则是<span class="code-blank" data-id="19-1" data-answer="顺势而为"></span>，即在<span class="code-blank" data-id="19-2" data-answer="上升趋势"></span>中买入，在<span class="code-blank" data-id="19-3" data-answer="下降趋势"></span>中卖出。</p>
                </div>`,
        instruction: "填写趋势交易的核心原则",
        hint: "顺势操作和趋势判断",
        explanation: "趋势交易强调跟随市场趋势，在上升趋势中做多，在下降趋势中做空",
        fullSentence: "趋势交易的核心原则是顺势而为，即在上升趋势中买入，在下降趋势中卖出。"
    },
    {
        id: 20,
        type: "select",
        title: "财务报表分析",
        content: `<div class="p-4 text-sm">
                    <p>哪个财务报表反映了公司在特定时间点的财务状况？</p>
                </div>`,
        options: ["资产负债表", "利润表", "现金流量表", "所有者权益变动表"],
        correct: 0,
        explanation: "资产负债表反映了公司在特定时间点的资产、负债和所有者权益状况"
    },
    {
        id: 21,
        type: "fill",
        title: "风险管理工具",
        content: `<div class="p-4 text-sm">
                    <p>在风险管理中，<span class="code-blank" data-id="21" data-answer="止损单"></span>和<span class="code-blank" data-id="21-2" data-answer="止盈单"></span>是常用的风险控制工具。</p>
                </div>`,
        instruction: "填写风险管理的关键工具",
        hint: "止损和止盈工具",
        explanation: "止损单和止盈单是自动执行的风险管理工具，帮助控制亏损和锁定利润"
    },
    {
        id: 22,
        type: "correct",
        title: "投资期限修正",
        content: `<div class="p-4 text-sm">
                    <p>长期投资者应该关注<span class="text-red-600">短期波动</span>而不是公司基本面。</p>
                </div>`,
        instruction: "找出投资期限选择中的错误并修正（只需要输入错误的部分）",
        correct: "长期价值",
        hint: "长期投资的核心关注点",
        explanation: "长期投资者应该关注公司的长期价值和基本面，而不是短期市场波动"
    },
    {
        id: 23,
        type: "sentence",
        title: "技术指标组合",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">在技术分析中，通常将<span class="code-blank" data-id="23-1" data-answer="MACD"></span>和<span class="code-blank" data-id="23-2" data-answer="RSI"></span>结合使用，以提高<span class="code-blank" data-id="23-3" data-answer="交易信号"></span>的准确性。</p>
                </div>`,
        instruction: "填写技术指标组合应用",
        hint: "常用技术指标和信号准确性",
        explanation: "MACD和RSI是常用的技术指标组合，可以相互验证提高交易信号的可靠性",
        fullSentence: "在技术分析中，通常将MACD和RSI结合使用，以提高交易信号的准确性。"
    },
    {
        id: 24,
        type: "select",
        title: "市场情绪指标",
        content: `<div class="p-4 text-sm">
                    <p>哪个指标常用于衡量市场恐慌程度？</p>
                </div>`,
        options: ["VIX指数", "道琼斯指数", "纳斯达克指数", "标准普尔500指数"],
        correct: 0,
        explanation: "VIX指数（恐慌指数）用于衡量市场对未来30天波动率的预期，反映市场恐慌程度"
    },
    {
        id: 25,
        type: "fill",
        title: "投资哲学",
        content: `<div class="p-4 text-sm">
                    <p>成功的投资需要<span class="code-blank" data-id="25" data-answer="耐心"></span>、<span class="code-blank" data-id="25-2" data-answer="纪律"></span>和<span class="code-blank" data-id="25-3" data-answer="持续学习"></span>。</p>
                </div>`,
        instruction: "填写成功投资的关键品质",
        hint: "投资成功的重要素质",
        explanation: "耐心、纪律和持续学习是成功投资者必备的重要品质"
    }
];