const questionscrypto = [
    {
        id: 1,
        type: "select",
        title: "比特币核心概念",
        content: `<div class="p-4 text-sm">
                    <p>比特币白皮书中提出的主要创新是什么？</p>
                </div>`,
        options: ["去中心化数字货币", "智能合约", "股权证明机制", "分片技术"],
        correct: 0,
        explanation: "比特币白皮书的核心创新是提出了第一个去中心化的点对点电子现金系统，解决了双重支付问题"
    },
    {
        id: 2,
        type: "select",
        title: "工作量证明机制",
        content: `<div class="p-4 text-sm">
                    <p>比特币使用的工作量证明机制主要解决什么问题？</p>
                </div>`,
        options: ["双重支付问题", "交易速度问题", "存储空间问题", "隐私保护问题"],
        correct: 0,
        explanation: "工作量证明机制通过计算难题来防止双重支付攻击，确保交易顺序的一致性"
    },
    {
        id: 3,
        type: "sentence",
        title: "区块链定义",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">比特币白皮书中将区块链定义为<span class="code-blank" data-id="3-1" data-answer="时间戳"></span>服务器，通过<span class="code-blank" data-id="3-2" data-answer="工作量证明"></span>机制来记录交易。</p>
                </div>`,
        instruction: "填写区块链的核心概念",
        hint: "时间戳和工作量证明",
        explanation: "比特币区块链是一个基于工作量证明的时间戳服务器，确保交易记录的不可篡改性",
        fullSentence: "比特币白皮书中将区块链定义为时间戳服务器，通过工作量证明机制来记录交易。"
    },
    {
        id: 4,
        type: "select",
        title: "以太坊创新",
        content: `<div class="p-4 text-sm">
                    <p>以太坊白皮书相对于比特币的主要创新是什么？</p>
                </div>`,
        options: ["智能合约平台", "更快的交易速度", "更大的区块大小", "更好的隐私保护"],
        correct: 0,
        explanation: "以太坊的核心创新是引入了图灵完备的智能合约，使区块链能够执行复杂的程序逻辑"
    },
    {
        id: 5,
        type: "sentence",
        title: "智能合约概念",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">以太坊的智能合约是存储在区块链上的<span class="code-blank" data-id="5-1" data-answer="代码"></span>，能够在满足特定条件时自动<span class="code-blank" data-id="5-2" data-answer="执行"></span>。</p>
                </div>`,
        instruction: "填写智能合约的基本概念",
        hint: "代码和执行",
        explanation: "智能合约是存储在区块链上的自执行代码，能够在预设条件满足时自动执行",
        fullSentence: "以太坊的智能合约是存储在区块链上的代码，能够在满足特定条件时自动执行。"
    },
    {
        id: 6,
        type: "select",
        title: "去中心化特性",
        content: `<div class="p-4 text-sm">
                    <p>比特币的去中心化特性主要通过什么实现？</p>
                </div>`,
        options: ["点对点网络", "中心化服务器", "政府监管", "银行中介"],
        correct: 0,
        explanation: "比特币通过点对点网络实现去中心化，所有节点平等参与验证和维护网络"
    },
    {
        id: 7,
        type: "sentence",
        title: "挖矿过程",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">比特币挖矿是通过计算<span class="code-blank" data-id="7-1" data-answer="哈希"></span>难题来竞争记账权，成功挖矿的节点获得<span class="code-blank" data-id="7-2" data-answer="区块奖励"></span>。</p>
                </div>`,
        instruction: "填写比特币挖矿的关键概念",
        hint: "哈希和区块奖励",
        explanation: "比特币挖矿是计算哈希难题的过程，成功者获得新区块的记账权和区块奖励",
        fullSentence: "比特币挖矿是通过计算哈希难题来竞争记账权，成功挖矿的节点获得区块奖励。"
    },
    {
        id: 8,
        type: "select",
        title: "以太坊燃料费",
        content: `<div class="p-4 text-sm">
                    <p>以太坊中的Gas（燃料费）主要用于什么目的？</p>
                </div>`,
        options: ["防止网络滥用", "支付矿工费用", "限制智能合约复杂度", "所有以上选项"],
        correct: 3,
        explanation: "Gas机制既用于支付矿工费用，也用于防止网络滥用和限制计算复杂度"
    },
    {
        id: 9,
        type: "sentence",
        title: "共识机制",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">比特币使用<span class="code-blank" data-id="9-1" data-answer="工作量证明"></span>共识机制，而以太坊2.0计划转向<span class="code-blank" data-id="9-2" data-answer="权益证明"></span>机制。</p>
                </div>`,
        instruction: "填写共识机制类型",
        hint: "工作量证明和权益证明",
        explanation: "比特币使用PoW共识，以太坊2.0升级到PoS以提高能效和可扩展性",
        fullSentence: "比特币使用工作量证明共识机制，而以太坊2.0计划转向权益证明机制。"
    },
    {
        id: 10,
        type: "select",
        title: "双重支付问题",
        content: `<div class="p-4 text-sm">
                    <p>比特币如何解决双重支付问题？</p>
                </div>`,
        options: ["通过时间戳和共识机制", "通过加密算法", "通过中心化审核", "通过智能合约"],
        correct: 0,
        explanation: "比特币通过时间戳服务器和共识机制确保交易顺序，防止同一笔资金被花费两次"
    },
    {
        id: 11,
        type: "sentence",
        title: "区块链不可篡改性",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">区块链的不可篡改性源于每个区块都包含前一个区块的<span class="code-blank" data-id="11-1" data-answer="哈希值"></span>，形成<span class="code-blank" data-id="11-2" data-answer="链式"></span>结构。</p>
                </div>`,
        instruction: "填写区块链安全特性",
        hint: "哈希值和链式",
        explanation: "区块链通过哈希指针连接区块，任何修改都会导致后续所有区块哈希值变化",
        fullSentence: "区块链的不可篡改性源于每个区块都包含前一个区块的哈希值，形成链式结构。"
    },
    {
        id: 12,
        type: "select",
        title: "以太坊账户模型",
        content: `<div class="p-4 text-sm">
                    <p>以太坊使用什么类型的账户模型？</p>
                </div>`,
        options: ["基于UTXO", "基于账户余额", "混合模型", "基于代币"],
        correct: 1,
        explanation: "以太坊使用基于账户余额的模型，每个账户有余额和存储空间，支持智能合约"
    },
    {
        id: 13,
        type: "sentence",
        title: "去中心化应用",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">以太坊支持构建<span class="code-blank" data-id="13-1" data-answer="去中心化应用"></span>（DApps），这些应用的后端逻辑运行在<span class="code-blank" data-id="13-2" data-answer="区块链"></span>上。</p>
                </div>`,
        instruction: "填写以太坊应用特性",
        hint: "去中心化应用和区块链",
        explanation: "DApps的后端逻辑通过智能合约在区块链上执行，确保透明和去中心化",
        fullSentence: "以太坊支持构建去中心化应用（DApps），这些应用的后端逻辑运行在区块链上。"
    },
    {
        id: 14,
        type: "select",
        title: "比特币发行机制",
        content: `<div class="p-4 text-sm">
                    <p>比特币的总供应量是多少？</p>
                </div>`,
        options: ["2100万", "无上限", "1亿", "5000万"],
        correct: 0,
        explanation: "比特币设计为通货紧缩货币，总供应量固定为2100万个，通过挖矿逐步释放"
    },
    {
        id: 15,
        type: "sentence",
        title: "区块链分叉",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">当区块链网络出现规则分歧时，可能产生<span class="code-blank" data-id="15-1" data-answer="分叉"></span>。硬分叉是<span class="code-blank" data-id="15-2" data-answer="不兼容"></span>的升级。</p>
                </div>`,
        instruction: "填写区块链升级概念",
        hint: "分叉和不兼容",
        explanation: "硬分叉是不向后兼容的协议升级，会导致区块链分裂成两条独立的链",
        fullSentence: "当区块链网络出现规则分歧时，可能产生分叉。硬分叉是不兼容的升级。"
    }
];