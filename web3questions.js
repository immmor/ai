// 区块链问题库
const blockchainQuestions = [
    {
        question: "在区块链中，'去中心化'意味着什么？",
        options: [
            { text: "数据存储在谷歌的服务器上", correct: false },
            { text: "没有单一的控制机构，权力下放", correct: true },
            { text: "每个人都必须住在同一个城市", correct: false }
        ]
    },
    {
        question: "如果你丢失了你的'私钥'（Private Key），会发生什么？",
        options: [
            { text: "可以找客服重置密码", correct: false },
            { text: "没有任何影响", correct: false },
            { text: "你将永久失去对钱包资产的控制权", correct: true }
        ]
    },
    {
        question: "NFT (非同质化代币) 的主要特征是？",
        options: [
            { text: "每一个都是独一无二且不可分割的", correct: true },
            { text: "它们都可以互相等价交换（像比特币一样）", correct: false },
            { text: "它们只能用来买卖图片", correct: false }
        ]
    },
    {
        question: "智能合约（Smart Contract）是什么？",
        options: [
            { text: "一份非常聪明的法律纸质合同", correct: false },
            { text: "部署在区块链上自动执行的代码协议", correct: true },
            { text: "人工智能聊天机器人", correct: false }
        ]
    },
    {
        question: "以太坊和比特币的主要区别是什么？",
        options: [
            { text: "比特币只支持加密货币，以太坊支持智能合约", correct: true },
            { text: "以太坊更老一些", correct: false },
            { text: "比特币没有区块链", correct: false }
        ]
    },
    {
        question: "Gas费在区块链中是用来做什么的？",
        options: [
            { text: "奖励区块打包者", correct: true },
            { text: "支付给中心化公司", correct: false },
            { text: "购买代币的方式", correct: false }
        ]
    },
    {
        question: "'区块'在区块链技术中包含什么？",
        options: [
            { text: "一系列交易和时间戳", correct: true },
            { text: "只有加密货币余额", correct: false },
            { text: "用户个人信息", correct: false }
        ]
    },
    {
        question: "DeFi（去中心化金融）的核心优势是什么？",
        options: [
            { text: "无需中介机构，全球可访问", correct: true },
            { text: "由政府控制更安全", correct: false },
            { text: "只能在特定国家使用", correct: false }
        ]
    },
    {
        question: "'共识机制'在区块链中起到什么作用？",
        options: [
            { text: "确保所有参与者对账本状态达成一致", correct: true },
            { text: "决定谁可以使用网络", correct: false },
            { text: "加密用户个人信息", correct: false }
        ]
    },
    {
        question: "Web3的主要特点是什么？",
        options: [
            { text: "去中心化、用户拥有数据控制权", correct: true },
            { text: "更快的网页加载速度", correct: false },
            { text: "只能在电脑上使用", correct: false }
        ]
    },
    {
        question: "什么是区块链的'不可篡改性'？",
        options: [
            { text: "一旦数据写入就几乎不可能被修改或删除", correct: true },
            { text: "区块链数据可以随时被管理员修改", correct: false },
            { text: "只有开发者可以修改区块链数据", correct: false }
        ]
    },
    {
        question: "'挖矿'在区块链中是什么意思？",
        options: [
            { text: "通过解决复杂数学问题验证交易并创建新区块", correct: true },
            { text: "在虚拟世界中寻找数字宝藏", correct: false },
            { text: "买卖加密货币的过程", correct: false }
        ]
    },
    {
        question: "公链和私链的主要区别是什么？",
        options: [
            { text: "公链对所有人开放，私链限制访问权限", correct: true },
            { text: "公链比私链更安全", correct: false },
            { text: "私链可以发行加密货币，公链不能", correct: false }
        ]
    },
    {
        question: "跨链技术的目的是什么？",
        options: [
            { text: "实现不同区块链之间的通信和资产转移", correct: true },
            { text: "将所有区块链合并为一个", correct: false },
            { text: "让区块链运行速度变慢", correct: false }
        ]
    },
    {
        question: "什么是区块链的'分布式账本'？",
        options: [
            { text: "数据副本被存储在多个节点上，而非单一中心", correct: true },
            { text: "账本只能被一个人查看", correct: false },
            { text: "账本数据每天会被清空一次", correct: false }
        ]
    },
    {
        question: "'共识算法'PoW和PoS的区别是什么？",
        options: [
            { text: "PoW依赖计算能力，PoS依赖持有代币数量", correct: true },
            { text: "PoW比PoS更环保", correct: false },
            { text: "PoS只用于比特币，PoW用于以太坊", correct: false }
        ]
    },
    {
        question: "什么是'钱包地址'？",
        options: [
            { text: "区块链上识别用户的唯一字符串", correct: true },
            { text: "加密货币的存储文件", correct: false },
            { text: "交易所的登录账号", correct: false }
        ]
    },
    {
        question: "'Layer 2'解决方案解决了区块链的什么问题？",
        options: [
            { text: "扩展性和交易速度问题", correct: true },
            { text: "安全性问题", correct: false },
            { text: "去中心化问题", correct: false }
        ]
    },
    {
        question: "'分叉'在区块链中意味着什么？",
        options: [
            { text: "区块链协议的升级或改变导致链分裂", correct: true },
            { text: "区块链数据丢失", correct: false },
            { text: "加密货币价格下跌", correct: false }
        ]
    },
    {
        question: "什么是'预言机'(Oracle)？",
        options: [
            { text: "将外部世界数据带入区块链的服务", correct: true },
            { text: "区块链网络的管理员", correct: false },
            { text: "加密货币交易的审计员", correct: false }
        ]
    },
    {
        question: "'侧链'技术的主要作用是什么？",
        options: [
            { text: "提供主链之外的扩展功能，同时保持与主链的互操作性", correct: true },
            { text: "完全替代现有主链", correct: false },
            { text: "只用于存储不重要的数据", correct: false }
        ]
    },
    {
        question: "什么是'代币经济模型'？",
        options: [
            { text: "设计代币的发行、分配和使用规则的系统", correct: true },
            { text: "预测代币价格的方法", correct: false },
            { text: "买卖代币的策略", correct: false }
        ]
    },
    {
        question: "'稳定币'与其他加密货币的主要区别是什么？",
        options: [
            { text: "价格与法定货币或商品挂钩，波动性低", correct: true },
            { text: "交易速度更快", correct: false },
            { text: "只能在特定平台使用", correct: false }
        ]
    },
    {
        question: "区块链中的'默克尔树'(Merkle Tree)有什么作用？",
        options: [
            { text: "高效验证大量数据的完整性", correct: true },
            { text: "增加区块链的存储空间", correct: false },
            { text: "减慢交易处理速度", correct: false }
        ]
    }
];
