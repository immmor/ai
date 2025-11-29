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
    }
];
