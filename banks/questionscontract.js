const questionscontract = [
    {
        id: 1,
        type: "select",
        title: "Solidity基础语法",
        content: `<div class="p-4 text-sm">
                    <p>Solidity中哪个关键字用于定义合约？</p>
                </div>`,
        options: ["contract", "class", "struct", "interface"],
        correct: 0,
        explanation: "Solidity使用contract关键字定义智能合约，类似于其他语言中的类"
    },
    {
        id: 2,
        type: "fill",
        title: "Solidity变量声明",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="2" data-answer="uint"></span> public balance = 100;</div>
                    <div>address <span class="code-blank" data-id="2-2" data-answer="public"></span> owner;</div>
                </div>`,
        instruction: "填写变量类型和可见性",
        hint: "无符号整数和公开可见性",
        explanation: "Solidity中uint表示无符号整数，public关键字使变量可被外部访问"
    },
    {
        id: 3,
        type: "correct",
        title: "Solidity函数定义",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function getBalance() <span class="text-red-600">private</span> view returns(uint) {</div>
                    <div>    return balance;</div>
                    <div>}</div>
                </div>`,
        instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
        correct: "public",
        hint: "外部调用的函数需要public可见性",
        explanation: "如果函数需要被外部调用，应该使用public而不是private可见性"
    },
    {
        id: 4,
        type: "sentence",
        title: "Solidity构造函数",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="4-1" data-answer="constructor"></span>() {</div>
                    <div>    owner = <span class="code-blank" data-id="4-2" data-answer="msg.sender"></span>;</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Solidity构造函数代码",
        hint: "构造函数关键字和发送者地址",
        explanation: "Solidity使用constructor定义构造函数，msg.sender获取调用者地址",
        fullSentence: "constructor() {\n    owner = msg.sender;\n}"
    },
    {
        id: 5,
        type: "select",
        title: "Solidity事件定义",
        content: `<div class="p-4 text-sm">
                    <p>Solidity中哪个关键字用于定义事件？</p>
                </div>`,
        options: ["event", "emit", "log", "signal"],
        correct: 0,
        explanation: "Solidity使用event关键字定义事件，用于记录合约状态变化"
    },
    {
        id: 6,
        type: "fill",
        title: "Solidity映射类型",
        content: `<div class="p-4 font-mono text-sm">
                    <div>mapping(address => <span class="code-blank" data-id="6" data-answer="uint"></span>) public balances;</div>
                    <div>balances[msg.sender] = <span class="code-blank" data-id="6-2" data-answer="100"></span>;</div>
                </div>`,
        instruction: "填写映射类型和赋值",
        hint: "无符号整数和数值",
        explanation: "mapping定义键值对映射，address映射到uint类型"
    },
    {
        id: 7,
        type: "sentence",
        title: "Solidity转账函数",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function transfer(address <span class="code-blank" data-id="7-1" data-answer="to"></span>, uint <span class="code-blank" data-id="7-2" data-answer="amount"></span>) public {</div>
                    <div>    require(balances[msg.sender] >= amount, "余额不足");</div>
                    <div>    balances[msg.sender] -= amount;</div>
                    <div>    balances[to] += amount;</div>
                    <div>    <span class="code-blank" data-id="7-3" data-answer="emit"></span> Transfer(msg.sender, to, amount);</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Solidity转账函数代码",
        hint: "接收地址、金额和事件触发",
        explanation: "转账函数需要验证余额，更新映射，并触发Transfer事件",
        fullSentence: "function transfer(address to, uint amount) public {\n    require(balances[msg.sender] >= amount, \"余额不足\");\n    balances[msg.sender] -= amount;\n    balances[to] += amount;\n    emit Transfer(msg.sender, to, amount);\n}"
    },
    {
        id: 8,
        type: "sentence",
        title: "Solidity修饰器",
        content: `<div class="p-4 font-mono text-sm">
                    <div>modifier <span class="code-blank" data-id="8-1" data-answer="onlyOwner"></span>() {</div>
                    <div>    require(msg.sender == owner, "只有所有者可以调用");</div>
                    <div>    <span class="code-blank" data-id="8-2" data-answer="_;"></span></div>
                    <div>}</div>
                    <div>function withdraw() public <span class="code-blank" data-id="8-3" data-answer="onlyOwner"></span> {</div>
                    <div>    // 提现逻辑</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Solidity修饰器代码",
        hint: "修饰器名称、下划线和应用",
        explanation: "修饰器用于函数权限控制，_表示执行原函数体",
        fullSentence: "modifier onlyOwner() {\n    require(msg.sender == owner, \"只有所有者可以调用\");\n    _;\n}\nfunction withdraw() public onlyOwner {\n    // 提现逻辑\n}"
    },
    {
        id: 9,
        type: "sentence",
        title: "Solidity继承",
        content: `<div class="p-4 font-mono text-sm">
                    <div>contract <span class="code-blank" data-id="9-1" data-answer="ERC20"></span> {</div>
                    <div>    // ERC20标准函数</div>
                    <div>}</div>
                    <div>contract MyToken <span class="code-blank" data-id="9-2" data-answer="is"></span> ERC20 {</div>
                    <div>    // 自定义逻辑</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Solidity继承代码",
        hint: "父合约名称和继承关键字",
        explanation: "Solidity使用is关键字实现合约继承",
        fullSentence: "contract ERC20 {\n    // ERC20标准函数\n}\ncontract MyToken is ERC20 {\n    // 自定义逻辑\n}"
    },
    {
        id: 10,
        type: "sentence",
        title: "Solidity接口定义",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="10-1" data-answer="interface"></span> IERC20 {</div>
                    <div>    function transfer(address to, uint amount) external returns (bool);</div>
                    <div>    function balanceOf(address account) external view returns (uint);</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Solidity接口代码",
        hint: "接口定义关键字",
        explanation: "Solidity使用interface关键字定义接口，只包含函数声明",
        fullSentence: "interface IERC20 {\n    function transfer(address to, uint amount) external returns (bool);\n    function balanceOf(address account) external view returns (uint);\n}"
    },
    {
        id: 11,
        type: "sentence",
        title: "Solidity库使用",
        content: `<div class="p-4 font-mono text-sm">
                    <div>using SafeMath <span class="code-blank" data-id="11-1" data-answer="for"></span> uint;</div>
                    <div>uint public totalSupply = 1000;</div>
                    <div>function mint(uint amount) public {</div>
                    <div>    totalSupply = totalSupply.<span class="code-blank" data-id="11-2" data-answer="add"></span>(amount);</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Solidity库使用代码",
        hint: "for关键字和库函数调用",
        explanation: "using...for将库函数附加到类型，SafeMath提供安全的数学运算",
        fullSentence: "using SafeMath for uint;\nuint public totalSupply = 1000;\nfunction mint(uint amount) public {\n    totalSupply = totalSupply.add(amount);\n}"
    },
    {
        id: 12,
        type: "sentence",
        title: "Solidity错误处理",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function withdraw(uint amount) public {</div>
                    <div>    <span class="code-blank" data-id="12-1" data-answer="require"></span>(amount > 0, "金额必须大于0");</div>
                    <div>    <span class="code-blank" data-id="12-2" data-answer="assert"></span>(balances[msg.sender] >= amount);</div>
                    <div>    if (amount > maxWithdraw) {</div>
                    <div>        <span class="code-blank" data-id="12-3" data-answer="revert"></span>("超过最大提现金额");</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Solidity错误处理代码",
        hint: "require、assert和revert",
        explanation: "require用于输入验证，assert用于内部检查，revert用于条件回滚",
        fullSentence: "function withdraw(uint amount) public {\n    require(amount > 0, \"金额必须大于0\");\n    assert(balances[msg.sender] >= amount);\n    if (amount > maxWithdraw) {\n        revert(\"超过最大提现金额\");\n    }\n}"
    },
    {
        id: 13,
        type: "sentence",
        title: "Solidity支付函数",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function deposit() public <span class="code-blank" data-id="13-1" data-answer="payable"></span> {</div>
                    <div>    balances[msg.sender] += <span class="code-blank" data-id="13-2" data-answer="msg.value"></span>;</div>
                    <div>}</div>
                    <div>function withdraw(uint amount) public {</div>
                    <div>    payable(msg.sender).<span class="code-blank" data-id="13-3" data-answer="transfer"></span>(amount);</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Solidity支付相关代码",
        hint: "payable、msg.value和transfer",
        explanation: "payable函数可接收ETH，msg.value获取发送金额，transfer用于转账",
        fullSentence: "function deposit() public payable {\n    balances[msg.sender] += msg.value;\n}\nfunction withdraw(uint amount) public {\n    payable(msg.sender).transfer(amount);\n}"
    },
    {
        id: 14,
        type: "sentence",
        title: "Solidity结构体",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="14-1" data-answer="struct"></span> User {</div>
                    <div>    string name;</div>
                    <div>    uint age;</div>
                    <div>    address wallet;</div>
                    <div>}</div>
                    <div>mapping(uint => User) public users;</div>
                    <div>function addUser(uint id, string memory name, uint age) public {</div>
                    <div>    users[id] = User(name, age, <span class="code-blank" data-id="14-2" data-answer="msg.sender"></span>);</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Solidity结构体代码",
        hint: "结构体定义和构造函数",
        explanation: "struct定义自定义数据类型，按顺序传入参数创建实例",
        fullSentence: "struct User {\n    string name;\n    uint age;\n    address wallet;\n}\nmapping(uint => User) public users;\nfunction addUser(uint id, string memory name, uint age) public {\n    users[id] = User(name, age, msg.sender);\n}"
    },
    {
        id: 15,
        type: "sentence",
        title: "Solidity枚举类型",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="15-1" data-answer="enum"></span> Status { Pending, Approved, Rejected }</div>
                    <div>Status public currentStatus = Status.<span class="code-blank" data-id="15-2" data-answer="Pending"></span>;</div>
                    <div>function approve() public {</div>
                    <div>    currentStatus = Status.<span class="code-blank" data-id="15-3" data-answer="Approved"></span>;</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Solidity枚举类型代码",
        hint: "enum定义和枚举值",
        explanation: "enum定义有限的状态集合，通过点号访问具体值",
        fullSentence: "enum Status { Pending, Approved, Rejected }\nStatus public currentStatus = Status.Pending;\nfunction approve() public {\n    currentStatus = Status.Approved;\n}"
    },
    {
        id: 16,
        type: "select",
        title: "ERC20标准",
        content: `<div class="p-4 text-sm">
                    <p>ERC20标准中哪个函数用于查询代币余额？</p>
                </div>`,
        options: ["balanceOf()", "totalSupply()", "transfer()", "approve()"],
        correct: 0,
        explanation: "ERC20标准中balanceOf(address)函数用于查询指定地址的代币余额"
    },
    {
        id: 17,
        type: "sentence",
        title: "ERC20转账函数",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function transfer(address <span class="code-blank" data-id="17-1" data-answer="to"></span>, uint256 <span class="code-blank" data-id="17-2" data-answer="value"></span>) public returns (bool) {</div>
                    <div>    require(balanceOf(msg.sender) >= value, "余额不足");</div>
                    <div>    _balances[msg.sender] -= value;</div>
                    <div>    _balances[to] += value;</div>
                    <div>    <span class="code-blank" data-id="17-3" data-answer="emit"></span> Transfer(msg.sender, to, value);</div>
                    <div>    return true;</div>
                    <div>}</div>
                </div>`,
        instruction: "填写ERC20转账函数代码",
        hint: "接收地址、金额和事件触发",
        explanation: "ERC20转账函数需要验证余额，更新余额映射，并触发Transfer事件",
        fullSentence: "function transfer(address to, uint256 value) public returns (bool) {\n    require(balanceOf(msg.sender) >= value, \"余额不足\");\n    _balances[msg.sender] -= value;\n    _balances[to] += value;\n    emit Transfer(msg.sender, to, value);\n    return true;\n}"
    },
    {
        id: 18,
        type: "select",
        title: "ERC721标准",
        content: `<div class="p-4 text-sm">
                    <p>ERC721标准主要用于实现什么类型的代币？</p>
                </div>`,
        options: ["非同质化代币(NFT)", "同质化代币", "多代币标准", "稳定币"],
        correct: 0,
        explanation: "ERC721标准用于实现非同质化代币(NFT)，每个代币都是唯一的"
    },
    {
        id: 19,
        type: "sentence",
        title: "ERC721所有权转移",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function transferFrom(address <span class="code-blank" data-id="19-1" data-answer="from"></span>, address <span class="code-blank" data-id="19-2" data-answer="to"></span>, uint256 <span class="code-blank" data-id="19-3" data-answer="tokenId"></span>) public {</div>
                    <div>    require(_isApprovedOrOwner(msg.sender, tokenId), "无权转移");</div>
                    <div>    _transfer(from, to, tokenId);</div>
                    <div>}</div>
                </div>`,
        instruction: "填写ERC721所有权转移函数代码",
        hint: "发送地址、接收地址和代币ID",
        explanation: "ERC721的transferFrom函数用于转移NFT所有权，需要验证权限",
        fullSentence: "function transferFrom(address from, address to, uint256 tokenId) public {\n    require(_isApprovedOrOwner(msg.sender, tokenId), \"无权转移\");\n    _transfer(from, to, tokenId);\n}"
    },
    {
        id: 20,
        type: "select",
        title: "ERC1155标准",
        content: `<div class="p-4 text-sm">
                    <p>ERC1155标准的主要特点是什么？</p>
                </div>`,
        options: ["支持同质化和非同质化代币", "只支持NFT", "只支持同质化代币", "不支持批量操作"],
        correct: 0,
        explanation: "ERC1155是多代币标准，可以同时支持同质化和非同质化代币，并支持批量操作"
    },
    {
        id: 21,
        type: "sentence",
        title: "ERC1155批量转账",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function safeBatchTransferFrom(address <span class="code-blank" data-id="21-1" data-answer="from"></span>, address <span class="code-blank" data-id="21-2" data-answer="to"></span>, uint256[] memory <span class="code-blank" data-id="21-3" data-answer="ids"></span>, uint256[] memory <span class="code-blank" data-id="21-4" data-answer="amounts"></span>, bytes memory data) public {</div>
                    <div>    require(ids.length == amounts.length, "数组长度不匹配");</div>
                    <div>    for (uint256 i = 0; i < ids.length; i++) {</div>
                    <div>        safeTransferFrom(from, to, ids[i], amounts[i], data);</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写ERC1155批量转账函数代码",
        hint: "发送地址、接收地址、代币ID数组和数量数组",
        explanation: "ERC1155的safeBatchTransferFrom函数支持批量转移多种代币",
        fullSentence: "function safeBatchTransferFrom(address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public {\n    require(ids.length == amounts.length, \"数组长度不匹配\");\n    for (uint256 i = 0; i < ids.length; i++) {\n        safeTransferFrom(from, to, ids[i], amounts[i], data);\n    }\n}"
    },
    {
        id: 22,
        type: "select",
        title: "ERC165标准",
        content: `<div class="p-4 text-sm">
                    <p>ERC165标准的主要作用是什么？</p>
                </div>`,
        options: ["接口检测", "代币发行", "代币销毁", "权限管理"],
        correct: 0,
        explanation: "ERC165标准用于检测合约是否实现了特定接口"
    },
    {
        id: 23,
        type: "sentence",
        title: "ERC165接口检测",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function supportsInterface(bytes4 <span class="code-blank" data-id="23-1" data-answer="interfaceId"></span>) public view returns (bool) {</div>
                    <div>    return interfaceId == type(IERC165).<span class="code-blank" data-id="23-2" data-answer="interfaceId"></span> || interfaceId == type(IERC721).interfaceId;</div>
                    <div>}</div>
                </div>`,
        instruction: "填写ERC165接口检测函数代码",
        hint: "接口ID和interfaceId属性",
        explanation: "ERC165的supportsInterface函数用于检查合约是否支持特定接口",
        fullSentence: "function supportsInterface(bytes4 interfaceId) public view returns (bool) {\n    return interfaceId == type(IERC165).interfaceId || interfaceId == type(IERC721).interfaceId;\n}"
    },
    {
        id: 24,
        type: "select",
        title: "RWA代币化标准",
        content: `<div class="p-4 text-sm">
                    <p>RWA代币化通常使用哪种ERC标准作为基础？</p>
                </div>`,
        options: ["ERC3643", "ERC20", "ERC721", "ERC1155"],
        correct: 0,
        explanation: "RWA代币化通常使用ERC3643标准（T-REX协议），专门为合规的代币化证券设计"
    },
    {
        id: 25,
        type: "select",
        title: "ERC3643标准特点",
        content: `<div class="p-4 text-sm">
                    <p>ERC3643标准的主要特点是什么？</p>
                </div>`,
        options: ["内置合规性和权限管理", "支持NFT功能", "支持批量转账", "Gas费用优化"],
        correct: 0,
        explanation: "ERC3643标准的主要特点是内置合规性和权限管理，支持KYC/AML验证和转账限制"
    },
    {
        id: 26,
        type: "sentence",
        title: "ERC3643代币合约结构",
        content: `<div class="p-4 font-mono text-sm">
                    <div>contract <span class="code-blank" data-id="26-1" data-answer="SecurityToken"></span> is <span class="code-blank" data-id="26-2" data-answer="ERC3643"></span> {</div>
                    <div>    address public <span class="code-blank" data-id="26-3" data-answer="compliance"></span>;</div>
                    <div>    </div>
                    <div>    constructor(string memory name, string memory symbol, address _compliance) ERC3643(name, symbol) {</div>
                    <div>        compliance = _compliance;</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写ERC3643代币合约基础结构代码",
        hint: "合约名称、标准名称和合规合约地址",
        explanation: "ERC3643代币合约继承ERC3643标准，包含合规合约地址等字段",
        fullSentence: "contract SecurityToken is ERC3643 {\n    address public compliance;\n    \n    constructor(string memory name, string memory symbol, address _compliance) ERC3643(name, symbol) {\n        compliance = _compliance;\n    }\n}"
    },
    {
        id: 27,
        type: "sentence",
        title: "ERC3643转账权限检查",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {</div>
                    <div>    super._beforeTokenTransfer(from, to, amount);</div>
                    <div>    require(<span class="code-blank" data-id="27-1" data-answer="ICompliance"></span>(compliance).<span class="code-blank" data-id="27-2" data-answer="canTransfer"></span>(from, to, amount), "转账不符合合规要求");</div>
                    <div>}</div>
                </div>`,
        instruction: "填写ERC3643转账权限检查代码",
        hint: "接口名称和合规检查函数",
        explanation: "ERC3643在转账前会调用合规合约检查转账是否符合要求",
        fullSentence: "function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {\n    super._beforeTokenTransfer(from, to, amount);\n    require(ICompliance(compliance).canTransfer(from, to, amount), \"转账不符合合规要求\");\n}"
    },
    {
        id: 28,
        type: "select",
        title: "ERC3643合规合约",
        content: `<div class="p-4 text-sm">
                    <p>ERC3643标准中合规合约的主要作用是什么？</p>
                </div>`,
        options: ["验证身份和转账权限", "管理代币供应量", "优化Gas费用", "提供价格预言机"],
        correct: 0,
        explanation: "ERC3643合规合约主要负责验证用户身份和转账权限，确保符合监管要求"
    },
    {
        id: 29,
        type: "sentence",
        title: "ERC3643身份验证",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function <span class="code-blank" data-id="29-1" data-answer="verifyIdentity"></span>(address investor) public view returns (bool) {</div>
                    <div>    return <span class="code-blank" data-id="29-2" data-answer="identityRegistry"></span>.isVerified(investor) && !<span class="code-blank" data-id="29-3" data-answer="blacklist"></span>.isBlacklisted(investor);</div>
                    <div>}</div>
                </div>`,
        instruction: "填写ERC3643身份验证代码",
        hint: "验证函数、身份注册表和黑名单",
        explanation: "ERC3643通过身份注册表验证投资者身份，并检查是否在黑名单中",
        fullSentence: "function verifyIdentity(address investor) public view returns (bool) {\n    return identityRegistry.isVerified(investor) && !blacklist.isBlacklisted(investor);\n}"
    },
    {
        id: 30,
        type: "select",
        title: "ERC3643转账限制",
        content: `<div class="p-4 text-sm">
                    <p>ERC3643标准支持哪种类型的转账限制？</p>
                </div>`,
        options: ["基于身份的转账限制", "基于时间的限制", "基于金额的限制", "以上所有"],
        correct: 3,
        explanation: "ERC3643支持基于身份、时间和金额的多种转账限制，确保合规性"
    },
    {
        id: 31,
        type: "sentence",
        title: "ERC3643分红分配",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function <span class="code-blank" data-id="31-1" data-answer="distributeDividends"></span>() public payable onlyOwner {</div>
                    <div>    address[] memory <span class="code-blank" data-id="31-2" data-answer="holders"></span> = identityRegistry.getVerifiedInvestors();</div>
                    <div>    for (uint256 i = 0; i < holders.length; i++) {</div>
                    <div>        uint256 balance = balanceOf(holders[i]);</div>
                    <div>        uint256 dividend = (msg.value * balance) / totalSupply();</div>
                    <div>        payable(holders[i]).<span class="code-blank" data-id="31-3" data-answer="transfer"></span>(dividend);</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写ERC3643分红分配代码",
        hint: "分红函数、持有者数组和转账",
        explanation: "ERC3643分红分配只面向通过身份验证的投资者，按持有比例分配",
        fullSentence: "function distributeDividends() public payable onlyOwner {\n    address[] memory holders = identityRegistry.getVerifiedInvestors();\n    for (uint256 i = 0; i < holders.length; i++) {\n        uint256 balance = balanceOf(holders[i]);\n        uint256 dividend = (msg.value * balance) / totalSupply();\n        payable(holders[i]).transfer(dividend);\n    }\n}"
    },
    {
        id: 32,
        type: "select",
        title: "ERC3643与ERC20区别",
        content: `<div class="p-4 text-sm">
                    <p>ERC3643与ERC20的主要区别是什么？</p>
                </div>`,
        options: ["内置合规性控制", "更高的Gas效率", "支持NFT功能", "更简单的部署流程"],
        correct: 0,
        explanation: "ERC3643与ERC20的主要区别是内置了合规性控制机制，适合证券类代币发行"
    },
    {
        id: 33,
        type: "select",
        title: "Chainlink预言机基础",
        content: `<div class="p-4 text-sm">
                    <p>Chainlink预言机的主要作用是什么？</p>
                </div>`,
        options: ["将链下数据引入智能合约", "提供Gas费用优化", "管理代币供应量", "提供身份验证服务"],
        correct: 0,
        explanation: "Chainlink预言机的主要作用是将链下数据（如价格、天气、体育比赛结果等）安全地引入智能合约"
    },
    {
        id: 34,
        type: "sentence",
        title: "Chainlink价格预言机",
        content: `<div class="p-4 font-mono text-sm">
                    <div>import "@chainlink/contracts/src/v0.8/interfaces/<span class="code-blank" data-id="34-1" data-answer="AggregatorV3Interface"></span>.sol";</div>
                    <div>contract PriceConsumer {</div>
                    <div>    AggregatorV3Interface internal <span class="code-blank" data-id="34-2" data-answer="priceFeed"></span>;</div>
                    <div>    </div>
                    <div>    constructor() {</div>
                    <div>        priceFeed = AggregatorV3Interface(<span class="code-blank" data-id="34-3" data-answer="0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"></span>);</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Chainlink价格预言机合约基础代码",
        hint: "接口名称、价格源变量和ETH/USD价格源地址",
        explanation: "Chainlink价格预言机使用AggregatorV3Interface接口，需要指定对应代币的价格源地址",
        fullSentence: "import \"@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol\";\ncontract PriceConsumer {\n    AggregatorV3Interface internal priceFeed;\n    \n    constructor() {\n        priceFeed = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);\n    }\n}"
    },
    {
        id: 35,
        type: "sentence",
        title: "Chainlink获取价格数据",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function getLatestPrice() public view returns (<span class="code-blank" data-id="35-1" data-answer="int"></span>) {</div>
                    <div>    (,<span class="code-blank" data-id="35-2" data-answer="int"></span> price,,,) = priceFeed.<span class="code-blank" data-id="35-3" data-answer="latestRoundData"></span>();</div>
                    <div>    return price;</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Chainlink获取最新价格数据的函数代码",
        hint: "返回值类型、价格变量和函数调用",
        explanation: "Chainlink价格预言机返回int类型的价格数据，需要调用latestRoundData()函数获取",
        fullSentence: "function getLatestPrice() public view returns (int) {\n    (,int price,,,) = priceFeed.latestRoundData();\n    return price;\n}"
    },
    {
        id: 36,
        type: "sentence",
        title: "Chainlink VRF随机数生成",
        content: `<div class="p-4 font-mono text-sm">
                    <div>import "@chainlink/contracts/src/v0.8/interfaces/<span class="code-blank" data-id="36-1" data-answer="VRFCoordinatorV2Interface"></span>.sol";</div>
                    <div>import "@chainlink/contracts/src/v0.8/<span class="code-blank" data-id="36-2" data-answer="VRFConsumerBaseV2"></span>.sol";</div>
                    <div>contract RandomNumberConsumer is VRFConsumerBaseV2 {</div>
                    <div>    uint256 public <span class="code-blank" data-id="36-3" data-answer="randomResult"></span>;</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Chainlink VRF随机数生成合约基础代码",
        hint: "VRF协调器接口、消费者基类和随机结果变量",
        explanation: "Chainlink VRF使用VRFCoordinatorV2Interface接口和VRFConsumerBaseV2基类合约",
        fullSentence: "import \"@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol\";\nimport \"@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol\";\ncontract RandomNumberConsumer is VRFConsumerBaseV2 {\n    uint256 public randomResult;\n}"
    },
    {
        id: 37,
        type: "sentence",
        title: "Chainlink VRF请求随机数",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function requestRandomWords() external returns (uint256 requestId) {</div>
                    <div>    requestId = COORDINATOR.<span class="code-blank" data-id="37-1" data-answer="requestRandomWords"></span>(</div>
                    <div>        keyHash,</div>
                    <div>        subId,</div>
                    <div>        requestConfirmations,</div>
                    <div>        callbackGasLimit,</div>
                    <div>        numWords</div>
                    <div>    );</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Chainlink VRF请求随机数的函数代码",
        hint: "请求随机数函数",
        explanation: "Chainlink VRF通过调用协调器的requestRandomWords函数来请求随机数",
        fullSentence: "function requestRandomWords() external returns (uint256 requestId) {\n    requestId = COORDINATOR.requestRandomWords(\n        keyHash,\n        subId,\n        requestConfirmations,\n        callbackGasLimit,\n        numWords\n    );\n}"
    },
    {
        id: 38,
        type: "select",
        title: "智能合约安全最佳实践",
        content: `<div class="p-4 text-sm">
                    <p>以下哪种是智能合约安全的最佳实践？</p>
                </div>`,
        options: ["使用Checks-Effects-Interactions模式", "尽可能使用call()函数", "避免使用require语句", "使用tx.origin进行身份验证"],
        correct: 0,
        explanation: "Checks-Effects-Interactions模式是智能合约安全的重要最佳实践，先检查条件，再更新状态，最后进行外部调用"
    },
    {
        id: 39,
        type: "sentence",
        title: "重入攻击防护",
        content: `<div class="p-4 font-mono text-sm">
                    <div>function withdraw(uint amount) public {</div>
                    <div>    require(balances[msg.sender] >= amount, "余额不足");</div>
                    <div>    balances[msg.sender] = <span class="code-blank" data-id="39-1" data-answer="0"></span>;</div>
                    <div>    (bool success, ) = msg.sender.<span class="code-blank" data-id="39-2" data-answer="call"></span>{value: amount}("");</div>
                    <div>    require(success, "转账失败");</div>
                    <div>}</div>
                </div>`,
        instruction: "填写重入攻击防护的代码",
        hint: "先清零余额再转账",
        explanation: "防止重入攻击的关键是在进行外部调用前先更新合约状态（清零余额）",
        fullSentence: "function withdraw(uint amount) public {\n    require(balances[msg.sender] >= amount, \"余额不足\");\n    balances[msg.sender] = 0;\n    (bool success, ) = msg.sender.call{value: amount}(\"\");\n    require(success, \"转账失败\");\n}"
    },
    {
        id: 40,
        type: "select",
        title: "Gas优化技巧",
        content: `<div class="p-4 text-sm">
                    <p>以下哪种方法可以有效优化Gas消耗？</p>
                </div>`,
        options: ["使用calldata代替memory", "使用更多的循环", "使用更长的变量名", "使用更多的require语句"],
        correct: 0,
        explanation: "使用calldata代替memory可以显著减少Gas消耗，因为calldata是只读的，不需要复制到内存中"
    },
    {
        id: 41,
        type: "sentence",
        title: "代理模式实现",
        content: `<div class="p-4 font-mono text-sm">
                    <div>contract <span class="code-blank" data-id="41-1" data-answer="Proxy"></span> {</div>
                    <div>    address public <span class="code-blank" data-id="41-2" data-answer="implementation"></span>;</div>
                    <div>    </div>
                    <div>    fallback() external payable {</div>
                    <div>        address impl = implementation;</div>
                    <div>        assembly {</div>
                    <div>            calldatacopy(0, 0, calldatasize())</div>
                    <div>            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)</div>
                    <div>            returndatacopy(0, 0, returndatasize())</div>
                    <div>            switch result</div>
                    <div>            case 0 { revert(0, returndatasize()) }</div>
                    <div>            default { return(0, returndatasize()) }</div>
                    <div>        }</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写代理合约的基础代码",
        hint: "合约名称和实现地址",
        explanation: "代理模式使用delegatecall将调用转发到实现合约，实现合约的可升级性",
        fullSentence: "contract Proxy {\n    address public implementation;\n    \n    fallback() external payable {\n        address impl = implementation;\n        assembly {\n            calldatacopy(0, 0, calldatasize())\n            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)\n            returndatacopy(0, 0, returndatasize())\n            switch result\n            case 0 { revert(0, returndatasize()) }\n            default { return(0, returndatasize()) }\n        }\n    }\n}"
    },
    {
        id: 42,
        type: "select",
        title: "Layer2扩容方案",
        content: `<div class="p-4 text-sm">
                    <p>以下哪种不是主流的Layer2扩容方案？</p>
                </div>`,
        options: ["Optimistic Rollup", "ZK-Rollup", "Plasma", "Proof of Work"],
        correct: 3,
        explanation: "Proof of Work是Layer1的共识机制，不是Layer2扩容方案。主流的Layer2方案包括Optimistic Rollup、ZK-Rollup和Plasma等"
    },
    {
        id: 43,
        type: "select",
        title: "Solidity存储布局",
        content: `<div class="p-4 text-sm">
                    <p>Solidity中状态变量的存储布局遵循什么原则？</p>
                </div>`,
        options: ["按声明顺序连续存储", "按字母顺序存储", "随机存储", "按使用频率存储"],
        correct: 0,
        explanation: "Solidity中状态变量按照声明顺序连续存储在存储槽中，每个变量占用32字节的存储槽"
    },
    {
        id: 44,
        type: "select",
        title: "Solidity内存管理",
        content: `<div class="p-4 text-sm">
                    <p>Solidity中memory和storage的主要区别是什么？</p>
                </div>`,
        options: ["memory是临时存储，storage是持久存储", "memory比storage更昂贵", "storage只能在函数内部使用", "memory可以跨合约调用"],
        correct: 0,
        explanation: "memory是临时存储，函数执行结束后数据丢失；storage是持久存储，数据会永久保存在区块链上"
    },
    {
        id: 45,
        type: "select",
        title: "Solidity函数可见性",
        content: `<div class="p-4 text-sm">
                    <p>以下哪种函数可见性允许外部合约调用？</p>
                </div>`,
        options: ["public和external", "private和internal", "只有public", "只有external"],
        correct: 0,
        explanation: "public和external函数都可以被外部合约调用，但external函数在内部调用时不能直接使用this.func()方式"
    },
    {
        id: 46,
        type: "select",
        title: "Solidity事件机制",
        content: `<div class="p-4 text-sm">
                    <p>Solidity事件的主要作用是什么？</p>
                </div>`,
        options: ["记录合约状态变化和提供日志", "优化Gas消耗", "实现合约继承", "提供随机数生成"],
        correct: 0,
        explanation: "Solidity事件用于记录合约的重要状态变化，这些日志可以被外部应用监听和查询"
    },
    {
        id: 47,
        type: "select",
        title: "Solidity修饰器应用",
        content: `<div class="p-4 text-sm">
                    <p>Solidity修饰器的主要应用场景是什么？</p>
                </div>`,
        options: ["函数权限控制和输入验证", "优化代码执行效率", "实现多态性", "管理存储布局"],
        correct: 0,
        explanation: "修饰器主要用于函数权限控制（如onlyOwner）和输入参数验证，可以在多个函数中复用相同的检查逻辑"
    },
    {
        id: 48,
        type: "sentence",
        title: "RWA代币化合约",
        content: `<div class="p-4 font-mono text-sm">
                    <div>contract <span class="code-blank" data-id="48-1" data-answer="RWA"></span> {</div>
                    <div>    address public <span class="code-blank" data-id="48-2" data-answer="issuer"></span>;</div>
                    <div>    address public <span class="code-blank" data-id="48-3" data-answer="complianceOracle"></span>;</div>
                    <div>    string public <span class="code-blank" data-id="48-4" data-answer="assetName"></span>;</div>
                    <div>    uint256 public <span class="code-blank" data-id="48-5" data-answer="totalSupply"></span>;</div>
                    <div>    uint256 public <span class="code-blank" data-id="48-6" data-answer="tokenizationDate"></span>;</div>
                    <div>    </div>
                    <div>    mapping(address => uint256) public <span class="code-blank" data-id="48-7" data-answer="balances"></span>;</div>
                    <div>    mapping(address => bool) public <span class="code-blank" data-id="48-8" data-answer="whitelist"></span>;</div>
                    <div>    mapping(address => mapping(address => uint256)) public <span class="code-blank" data-id="48-9" data-answer="allowances"></span>;</div>
                    <div>    </div>
                    <div>    event <span class="code-blank" data-id="48-10" data-answer="Transfer"></span>(address indexed from, address indexed to, uint256 value);</div>
                    <div>    event Approval(address indexed owner, address indexed spender, uint256 value);</div>
                    <div>    event WhitelistUpdated(address indexed investor, bool status);</div>
                    <div>    event TokenizationCompleted(uint256 totalTokens, string assetName);</div>
                    <div>    </div>
                    <div>    modifier <span class="code-blank" data-id="48-11" data-answer="onlyIssuer"></span>() {</div>
                    <div>        require(msg.sender == issuer, "Only issuer");</div>
                    <div>        _;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    modifier <span class="code-blank" data-id="48-12" data-answer="onlyComplianceOracle"></span>() {</div>
                    <div>        require(msg.sender == complianceOracle, "Only compliance oracle");</div>
                    <div>        _;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    modifier <span class="code-blank" data-id="48-13" data-answer="onlyWhitelisted"></span>(address investor) {</div>
                    <div>        require(whitelist[investor], "Investor not whitelisted");</div>
                    <div>        _;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    constructor(string memory _assetName, uint256 _totalSupply, address _complianceOracle) {</div>
                    <div>        issuer = msg.sender;</div>
                    <div>        complianceOracle = _complianceOracle;</div>
                    <div>        assetName = _assetName;</div>
                    <div>        totalSupply = _totalSupply;</div>
                    <div>        tokenizationDate = block.timestamp;</div>
                    <div>        balances[issuer] = _totalSupply;</div>
                    <div>        whitelist[issuer] = true;</div>
                    <div>        </div>
                    <div>        emit Transfer(address(0), issuer, _totalSupply);</div>
                    <div>        emit TokenizationCompleted(_totalSupply, _assetName);</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="48-14" data-answer="transfer"></span>(address to, uint256 value) external returns (bool) {</div>
                    <div>        require(whitelist[msg.sender] && whitelist[to], "Parties not whitelisted");</div>
                    <div>        require(balances[msg.sender] >= value, "Insufficient balance");</div>
                    <div>        </div>
                    <div>        balances[msg.sender] -= value;</div>
                    <div>        balances[to] += value;</div>
                    <div>        </div>
                    <div>        emit Transfer(msg.sender, to, value);</div>
                    <div>        return true;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="48-15" data-answer="approve"></span>(address spender, uint256 value) external returns (bool) {</div>
                    <div>        allowances[msg.sender][spender] = value;</div>
                    <div>        emit Approval(msg.sender, spender, value);</div>
                    <div>        return true;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="48-16" data-answer="transferFrom"></span>(address from, address to, uint256 value) external returns (bool) {</div>
                    <div>        require(whitelist[from] && whitelist[to], "Parties not whitelisted");</div>
                    <div>        require(balances[from] >= value, "Insufficient balance");</div>
                    <div>        require(allowances[from][msg.sender] >= value, "Allowance exceeded");</div>
                    <div>        </div>
                    <div>        balances[from] -= value;</div>
                    <div>        balances[to] += value;</div>
                    <div>        allowances[from][msg.sender] -= value;</div>
                    <div>        </div>
                    <div>        emit Transfer(from, to, value);</div>
                    <div>        return true;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="48-17" data-answer="updateWhitelist"></span>(address investor, bool status) external onlyComplianceOracle {</div>
                    <div>        whitelist[investor] = status;</div>
                    <div>        emit WhitelistUpdated(investor, status);</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="48-18" data-answer="balanceOf"></span>(address account) external view returns (uint256) {</div>
                    <div>        return balances[account];</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="48-19" data-answer="allowance"></span>(address owner, address spender) external view returns (uint256) {</div>
                    <div>        return allowances[owner][spender];</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="48-20" data-answer="getAssetInfo"></span>() external view returns (string memory, uint256, uint256) {</div>
                    <div>        return (assetName, totalSupply, tokenizationDate);</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写RWA代币化合约的完整代码",
        hint: "合约名称、发行方、合规预言机、资产名称、总供应量、代币化日期、余额映射、白名单、授权映射、事件、修饰器和核心函数",
        explanation: "RWA代币化合约基于ERC3643标准，包含合规检查、白名单管理、代币转移等核心功能，用于将现实世界资产合规地代币化",
        fullSentence: "contract RWA {\n    address public issuer;\n    address public complianceOracle;\n    string public assetName;\n    uint256 public totalSupply;\n    uint256 public tokenizationDate;\n    \n    mapping(address => uint256) public balances;\n    mapping(address => bool) public whitelist;\n    mapping(address => mapping(address => uint256)) public allowances;\n    \n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n    event WhitelistUpdated(address indexed investor, bool status);\n    event TokenizationCompleted(uint256 totalTokens, string assetName);\n    \n    modifier onlyIssuer() {\n        require(msg.sender == issuer, \"Only issuer\");\n        _;\n    }\n    \n    modifier onlyComplianceOracle() {\n        require(msg.sender == complianceOracle, \"Only compliance oracle\");\n        _;\n    }\n    \n    modifier onlyWhitelisted(address investor) {\n        require(whitelist[investor], \"Investor not whitelisted\");\n        _;\n    }\n    \n    constructor(string memory _assetName, uint256 _totalSupply, address _complianceOracle) {\n        issuer = msg.sender;\n        complianceOracle = _complianceOracle;\n        assetName = _assetName;\n        totalSupply = _totalSupply;\n        tokenizationDate = block.timestamp;\n        balances[issuer] = _totalSupply;\n        whitelist[issuer] = true;\n        \n        emit Transfer(address(0), issuer, _totalSupply);\n        emit TokenizationCompleted(_totalSupply, _assetName);\n    }\n    \n    function transfer(address to, uint256 value) external returns (bool) {\n        require(whitelist[msg.sender] && whitelist[to], \"Parties not whitelisted\");\n        require(balances[msg.sender] >= value, \"Insufficient balance\");\n        \n        balances[msg.sender] -= value;\n        balances[to] += value;\n        \n        emit Transfer(msg.sender, to, value);\n        return true;\n    }\n    \n    function approve(address spender, uint256 value) external returns (bool) {\n        allowances[msg.sender][spender] = value;\n        emit Approval(msg.sender, spender, value);\n        return true;\n    }\n    \n    function transferFrom(address from, address to, uint256 value) external returns (bool) {\n        require(whitelist[from] && whitelist[to], \"Parties not whitelisted\");\n        require(balances[from] >= value, \"Insufficient balance\");\n        require(allowances[from][msg.sender] >= value, \"Allowance exceeded\");\n        \n        balances[from] -= value;\n        balances[to] += value;\n        allowances[from][msg.sender] -= value;\n        \n        emit Transfer(from, to, value);\n        return true;\n    }\n    \n    function updateWhitelist(address investor, bool status) external onlyComplianceOracle {\n        whitelist[investor] = status;\n        emit WhitelistUpdated(investor, status);\n    }\n    \n    function balanceOf(address account) external view returns (uint256) {\n        return balances[account];\n    }\n    \n    function allowance(address owner, address spender) external view returns (uint256) {\n        return allowances[owner][spender];\n    }\n    \n    function getAssetInfo() external view returns (string memory, uint256, uint256) {\n        return (assetName, totalSupply, tokenizationDate);\n    }\n}"
    },
    {
        id: 49,
        type: "sentence",
        title: "完整永续合约功能",
        content: `<div class="p-4 font-mono text-sm">
                    <div>contract PerpetualContract {</div>
                    <div>    address public owner;</div>
                    <div>    uint256 public fundingRate = 0.0001 * 1e18;</div>
                    <div>    uint256 public lastFundingTime;</div>
                    <div>    uint256 public <span class="code-blank" data-id="49-1" data-answer="leverage"></span> = 10; // 10倍杠杆</div>
                    <div>    </div>
                    <div>    mapping(address => int256) public positions;</div>
                    <div>    mapping(address => uint256) public margins;</div>
                    <div>    </div>
                    <div>    event PositionOpened(address indexed trader, int256 size, uint256 margin);</div>
                    <div>    event PositionClosed(address indexed trader, int256 pnl);</div>
                    <div>    event FundingPaid(address indexed trader, int256 fundingAmount);</div>
                    <div>    </div>
                    <div>    modifier onlyOwner() {</div>
                    <div>        require(msg.sender == owner, "Only owner");</div>
                    <div>        _;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    constructor() {</div>
                    <div>        owner = msg.sender;</div>
                    <div>        lastFundingTime = block.timestamp;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function openPosition(int256 size, uint256 margin) external payable {</div>
                    <div>        require(size != 0, "Size cannot be zero");</div>
                    <div>        require(margin > 0, "Margin required");</div>
                    <div>        require(msg.value == margin, "ETH sent must equal margin");</div>
                    <div>        </div>
                    <div>        // 检查保证金是否足够</div>
                    <div>        uint256 requiredMargin = <span class="code-blank" data-id="49-2" data-answer="abs"></span>(size) / leverage;</div>
                    <div>        require(margin >= requiredMargin, "Insufficient margin");</div>
                    <div>        </div>
                    <div>        // 更新持仓和保证金</div>
                    <div>        positions[msg.sender] += size;</div>
                    <div>        margins[msg.sender] += margin;</div>
                    <div>        </div>
                    <div>        emit PositionOpened(msg.sender, size, margin);</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function closePosition() external {</div>
                    <div>        int256 size = positions[msg.sender];</div>
                    <div>        require(size != 0, "No position to close");</div>
                    <div>        </div>
                    <div>        // 计算盈亏（简化版，实际需要价格预言机）</div>
                    <div>        int256 pnl = size * 1e18 / 100; // 假设盈利1%</div>
                    <div>        </div>
                    <div>        // 支付资金费率</div>
                    <div>        payFunding(msg.sender);</div>
                    <div>        </div>
                    <div>        // 计算最终金额</div>
                    <div>        uint256 finalAmount = margins[msg.sender] + uint256(pnl);</div>
                    <div>        </div>
                    <div>        // 重置持仓和保证金</div>
                    <div>        positions[msg.sender] = 0;</div>
                    <div>        margins[msg.sender] = 0;</div>
                    <div>        </div>
                    <div>        // 转账给交易者</div>
                    <div>        payable(msg.sender).transfer(finalAmount);</div>
                    <div>        </div>
                    <div>        emit PositionClosed(msg.sender, pnl);</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function payFunding(address trader) internal {</div>
                    <div>        if (block.timestamp - lastFundingTime >= 1 hours) {</div>
                    <div>            int256 fundingAmount = int256(margins[trader]) * int256(fundingRate) / 1e18;</div>
                    <div>            </div>
                    <div>            if (positions[trader] > 0) {</div>
                    <div>                // 多头支付资金费率</div>
                    <div>                margins[trader] -= uint256(fundingAmount);</div>
                    <div>            } else if (positions[trader] < 0) {</div>
                    <div>                // 空头接收资金费率</div>
                    <div>                margins[trader] += uint256(-fundingAmount);</div>
                    <div>            }</div>
                    <div>            </div>
                    <div>            lastFundingTime = block.timestamp;</div>
                    <div>            emit FundingPaid(trader, fundingAmount);</div>
                    <div>        }</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function abs(int256 x) internal pure returns (uint256) {</div>
                    <div>        return x >= 0 ? uint256(x) : uint256(-x);</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function setFundingRate(uint256 newRate) external onlyOwner {</div>
                    <div>        fundingRate = newRate;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function withdrawFees() external onlyOwner {</div>
                    <div>        payable(owner).transfer(address(this).balance);</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写完整永续合约的功能代码",
        hint: "杠杆倍数、绝对值函数、保证金计算",
        explanation: "完整永续合约包含开仓、平仓、资金费率计算、杠杆控制等核心功能",
        fullSentence: "contract PerpetualContract {\n    address public owner;\n    uint256 public fundingRate = 0.0001 * 1e18;\n    uint256 public lastFundingTime;\n    uint256 public leverage = 10; // 10倍杠杆\n    \n    mapping(address => int256) public positions;\n    mapping(address => uint256) public margins;\n    \n    event PositionOpened(address indexed trader, int256 size, uint256 margin);\n    event PositionClosed(address indexed trader, int256 pnl);\n    event FundingPaid(address indexed trader, int256 fundingAmount);\n    \n    modifier onlyOwner() {\n        require(msg.sender == owner, \"Only owner\");\n        _;\n    }\n    \n    constructor() {\n        owner = msg.sender;\n        lastFundingTime = block.timestamp;\n    }\n    \n    function openPosition(int256 size, uint256 margin) external payable {\n        require(size != 0, \"Size cannot be zero\");\n        require(margin > 0, \"Margin required\");\n        require(msg.value == margin, \"ETH sent must equal margin\");\n        \n        // 检查保证金是否足够\n        uint256 requiredMargin = abs(size) / leverage;\n        require(margin >= requiredMargin, \"Insufficient margin\");\n        \n        // 更新持仓和保证金\n        positions[msg.sender] += size;\n        margins[msg.sender] += margin;\n        \n        emit PositionOpened(msg.sender, size, margin);\n    }\n    \n    function closePosition() external {\n        int256 size = positions[msg.sender];\n        require(size != 0, \"No position to close\");\n        \n        // 计算盈亏（简化版，实际需要价格预言机）\n        int256 pnl = size * 1e18 / 100; // 假设盈利1%\n        \n        // 支付资金费率\n        payFunding(msg.sender);\n        \n        // 计算最终金额\n        uint256 finalAmount = margins[msg.sender] + uint256(pnl);\n        \n        // 重置持仓和保证金\n        positions[msg.sender] = 0;\n        margins[msg.sender] = 0;\n        \n        // 转账给交易者\n        payable(msg.sender).transfer(finalAmount);\n        \n        emit PositionClosed(msg.sender, pnl);\n    }\n    \n    function payFunding(address trader) internal {\n        if (block.timestamp - lastFundingTime >= 1 hours) {\n            int256 fundingAmount = int256(margins[trader]) * int256(fundingRate) / 1e18;\n            \n            if (positions[trader] > 0) {\n                // 多头支付资金费率\n                margins[trader] -= uint256(fundingAmount);\n            } else if (positions[trader] < 0) {\n                // 空头接收资金费率\n                margins[trader] += uint256(-fundingAmount);\n            }\n            \n            lastFundingTime = block.timestamp;\n            emit FundingPaid(trader, fundingAmount);\n        }\n    }\n    \n    function abs(int256 x) internal pure returns (uint256) {\n        return x >= 0 ? uint256(x) : uint256(-x);\n    }\n    \n    function setFundingRate(uint256 newRate) external onlyOwner {\n        fundingRate = newRate;\n    }\n    \n    function withdrawFees() external onlyOwner {\n        payable(owner).transfer(address(this).balance);\n    }\n}"
    },
    {
        id: 50,
        type: "sentence",
        title: "OpenZeppelin IERC20接口",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="50-1" data-answer="interface"></span> <span class="code-blank" data-id="50-2" data-answer="IERC20"></span> {</div>
                    <div>    event <span class="code-blank" data-id="50-3" data-answer="Transfer"></span>(address indexed from, address indexed to, uint256 value);</div>
                    <div>    event <span class="code-blank" data-id="50-4" data-answer="Approval"></span>(address indexed owner, address indexed spender, uint256 value);</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="50-5" data-answer="totalSupply"></span>() external view returns (uint256);</div>
                    <div>    function <span class="code-blank" data-id="50-6" data-answer="balanceOf"></span>(address account) external view returns (uint256);</div>
                    <div>    function <span class="code-blank" data-id="50-7" data-answer="transfer"></span>(address to, uint256 amount) external returns (bool);</div>
                    <div>    function <span class="code-blank" data-id="50-8" data-answer="allowance"></span>(address owner, address spender) external view returns (uint256);</div>
                    <div>    function <span class="code-blank" data-id="50-9" data-answer="approve"></span>(address spender, uint256 amount) external returns (bool);</div>
                    <div>    function <span class="code-blank" data-id="50-10" data-answer="transferFrom"></span>(address from, address to, uint256 amount) external returns (bool);</div>
                    <div>}</div>
                    <div>    </div>
                    <div>interface <span class="code-blank" data-id="50-11" data-answer="IERC20Metadata"></span> is IERC20 {</div>
                    <div>    function <span class="code-blank" data-id="50-12" data-answer="name"></span>() external view returns (string memory);</div>
                    <div>    function <span class="code-blank" data-id="50-13" data-answer="symbol"></span>() external view returns (string memory);</div>
                    <div>    function <span class="code-blank" data-id="50-14" data-answer="decimals"></span>() external view returns (uint8);</div>
                    <div>}</div>
                    <div>    </div>
                    <div>interface <span class="code-blank" data-id="50-15" data-answer="IERC20Permit"></span> {</div>
                    <div>    function <span class="code-blank" data-id="50-16" data-answer="permit"></span>(</div>
                    <div>        address owner,</div>
                    <div>        address spender,</div>
                    <div>        uint256 value,</div>
                    <div>        uint256 deadline,</div>
                    <div>        uint8 v,</div>
                    <div>        bytes32 r,</div>
                    <div>        bytes32 s</div>
                    <div>    ) external;</div>
                    <div>    function <span class="code-blank" data-id="50-17" data-answer="nonces"></span>(address owner) external view returns (uint256);</div>
                    <div>    function <span class="code-blank" data-id="50-18" data-answer="DOMAIN_SEPARATOR"></span>() external view returns (bytes32);</div>
                    <div>}</div>
                </div>`,
        instruction: "填写OpenZeppelin IERC20接口的完整代码",
        hint: "接口定义关键字、事件名称、函数签名、元数据接口和许可接口",
        explanation: "OpenZeppelin的IERC20接口定义了ERC20代币标准的核心功能，包括转账、授权、余额查询等，IERC20Metadata提供代币元数据，IERC20Permit支持无Gas交易",
        fullSentence: "interface IERC20 {\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n    \n    function totalSupply() external view returns (uint256);\n    function balanceOf(address account) external view returns (uint256);\n    function transfer(address to, uint256 amount) external returns (bool);\n    function allowance(address owner, address spender) external view returns (uint256);\n    function approve(address spender, uint256 amount) external returns (bool);\n    function transferFrom(address from, address to, uint256 amount) external returns (bool);\n}\n\ninterface IERC20Metadata is IERC20 {\n    function name() external view returns (string memory);\n    function symbol() external view returns (string memory);\n    function decimals() external view returns (uint8);\n}\n\ninterface IERC20Permit {\n    function permit(\n        address owner,\n        address spender,\n        uint256 value,\n        uint256 deadline,\n        uint8 v,\n        bytes32 r,\n        bytes32 s\n    ) external;\n    function nonces(address owner) external view returns (uint256);\n    function DOMAIN_SEPARATOR() external view returns (bytes32);\n}"
    },
    {
        id: 51,
        type: "sentence",
        title: "OpenZeppelin Ownable合约",
        content: `<div class="p-4 font-mono text-sm">
                    <div>contract <span class="code-blank" data-id="51-1" data-answer="Ownable"></span> {</div>
                    <div>    address private <span class="code-blank" data-id="51-2" data-answer="_owner"></span>;</div>
                    <div>    </div>
                    <div>    event <span class="code-blank" data-id="51-3" data-answer="OwnershipTransferred"></span>(address indexed previousOwner, address indexed newOwner);</div>
                    <div>    </div>
                    <div>    constructor() {</div>
                    <div>        <span class="code-blank" data-id="51-4" data-answer="_transferOwnership"></span>(msg.sender);</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    modifier <span class="code-blank" data-id="51-5" data-answer="onlyOwner"></span>() {</div>
                    <div>        require(owner() == msg.sender, "Ownable: caller is not the owner");</div>
                    <div>        _;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="51-6" data-answer="owner"></span>() public view virtual returns (address) {</div>
                    <div>        return _owner;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="51-7" data-answer="renounceOwnership"></span>() public virtual onlyOwner {</div>
                    <div>        _transferOwnership(address(0));</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="51-8" data-answer="transferOwnership"></span>(address newOwner) public virtual onlyOwner {</div>
                    <div>        require(newOwner != address(0), "Ownable: new owner is the zero address");</div>
                    <div>        _transferOwnership(newOwner);</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="51-9" data-answer="_transferOwnership"></span>(address newOwner) internal virtual {</div>
                    <div>        address oldOwner = _owner;</div>
                    <div>        _owner = newOwner;</div>
                    <div>        emit OwnershipTransferred(oldOwner, newOwner);</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写OpenZeppelin Ownable合约的完整代码",
        hint: "合约名称、私有所有者变量、事件、修饰器、构造函数和所有权转移函数",
        explanation: "OpenZeppelin的Ownable合约提供了合约所有权管理功能，包括所有者检查、所有权转移和所有权放弃等核心功能，是智能合约权限控制的基础组件",
        fullSentence: "contract Ownable {\n    address private _owner;\n    \n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\n    \n    constructor() {\n        _transferOwnership(msg.sender);\n    }\n    \n    modifier onlyOwner() {\n        require(owner() == msg.sender, \"Ownable: caller is not the owner\");\n        _;\n    }\n    \n    function owner() public view virtual returns (address) {\n        return _owner;\n    }\n    \n    function renounceOwnership() public virtual onlyOwner {\n        _transferOwnership(address(0));\n    }\n    \n    function transferOwnership(address newOwner) public virtual onlyOwner {\n        require(newOwner != address(0), \"Ownable: new owner is the zero address\");\n        _transferOwnership(newOwner);\n    }\n    \n    function _transferOwnership(address newOwner) internal virtual {\n        address oldOwner = _owner;\n        _owner = newOwner;\n        emit OwnershipTransferred(oldOwner, newOwner);\n    }\n}"
    },
    {
        id: 52,
        type: "select",
        title: "简单合约函数",
        content: `<div class="p-4 text-sm">
            <p>Solidity中，哪个关键字用于声明一个只读函数？</p>
        </div>`,
        options: [
            "view",
            "pure",
            "constant",
            "readonly",
        ],
        correct: 0,
        explanation:
            "view关键字用于声明只读函数，这些函数不会修改合约状态",
    },
    {
        id: 53,
        type: "sentence",
        title: "OpenZeppelin UUPSUpgradeable合约",
        content: `<div class="p-4 font-mono text-sm">
                    <div>abstract contract <span class="code-blank" data-id="53-1" data-answer="UUPSUpgradeable"></span> is IERC1822Proxiable {</div>
                    <div>    address private immutable <span class="code-blank" data-id="53-2" data-answer="_self"></span> = address(this);</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="53-3" data-answer="proxiableUUID"></span>() external view virtual override notDelegated returns (bytes32) {</div>
                    <div>        return <span class="code-blank" data-id="53-4" data-answer="_IMPLEMENTATION_SLOT"></span>;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="53-5" data-answer="upgradeToAndCall"></span>(address newImplementation, bytes memory data) external payable virtual onlyProxy {</div>
                    <div>        _authorizeUpgrade(newImplementation);</div>
                    <div>        _upgradeToAndCallUUPS(newImplementation, data);</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="53-6" data-answer="_upgradeToAndCallUUPS"></span>(address newImplementation, bytes memory data) internal {</div>
                    <div>        require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");</div>
                    <div>        StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;</div>
                    <div>        emit Upgraded(newImplementation);</div>
                    <div>        if (data.length > 0) {</div>
                    <div>            Address.functionDelegateCall(newImplementation, data);</div>
                    <div>        }</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="53-7" data-answer="_authorizeUpgrade"></span>(address newImplementation) internal virtual;</div>
                    <div>    </div>
                    <div>    modifier <span class="code-blank" data-id="53-8" data-answer="onlyProxy"></span>() {</div>
                    <div>        require(address(this) != _self, "Function must be called through delegatecall");</div>
                    <div>        require(_getImplementation() == _self, "Function must be called through active proxy");</div>
                    <div>        _;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    modifier <span class="code-blank" data-id="53-9" data-answer="notDelegated"></span>() {</div>
                    <div>        require(address(this) == _self, "UUPSUpgradeable: must not be called through delegatecall");</div>
                    <div>        _;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    function <span class="code-blank" data-id="53-10" data-answer="_getImplementation"></span>() internal view returns (address) {</div>
                    <div>        return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;</div>
                    <div>    }</div>
                    <div>    </div>
                    <div>    bytes32 internal constant <span class="code-blank" data-id="53-11" data-answer="_IMPLEMENTATION_SLOT"></span> = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;</div>
                    <div>}</div>
                </div>`,
        instruction: "填写OpenZeppelin UUPSUpgradeable合约的完整代码",
        hint: "抽象合约、不可变变量、UUID函数、升级函数、授权函数、修饰器、实现槽常量",
        explanation: "UUPSUpgradeable合约实现了通用可升级代理标准，允许合约通过代理模式进行无破坏性升级，是智能合约升级模式的核心组件",
        fullSentence: "abstract contract UUPSUpgradeable is IERC1822Proxiable {\n    address private immutable _self = address(this);\n    \n    function proxiableUUID() external view virtual override notDelegated returns (bytes32) {\n        return _IMPLEMENTATION_SLOT;\n    }\n    \n    function upgradeToAndCall(address newImplementation, bytes memory data) external payable virtual onlyProxy {\n        _authorizeUpgrade(newImplementation);\n        _upgradeToAndCallUUPS(newImplementation, data);\n    }\n    \n    function _upgradeToAndCallUUPS(address newImplementation, bytes memory data) internal {\n        require(Address.isContract(newImplementation), \"ERC1967: new implementation is not a contract\");\n        StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;\n        emit Upgraded(newImplementation);\n        if (data.length > 0) {\n            Address.functionDelegateCall(newImplementation, data);\n        }\n    }\n    \n    function _authorizeUpgrade(address newImplementation) internal virtual;\n    \n    modifier onlyProxy() {\n        require(address(this) != _self, \"Function must be called through delegatecall\");\n        require(_getImplementation() == _self, \"Function must be called through active proxy\");\n        _;\n    }\n    \n    modifier notDelegated() {\n        require(address(this) == _self, \"UUPSUpgradeable: must not be called through delegatecall\");\n        _;\n    }\n    \n    function _getImplementation() internal view returns (address) {\n        return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;\n    }\n    \n    bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;\n}"
    },
    {
        id: 54,
        type: "select",
        title: "Gas优化基础",
        content: `<div class="p-4 text-sm">
                    <p>在Solidity中，哪种数据类型消耗的Gas最少？</p>
                </div>`,
        options: ["uint256", "uint8", "bool", "address"],
        correct: 2,
        explanation: "bool类型只占用1位存储空间，消耗的Gas最少。uint8虽然比uint256小，但在存储时仍然占用完整的32字节槽位"
    },
    {
        id: 55,
        type: "select",
        title: "存储优化",
        content: `<div class="p-4 text-sm">
                    <p>哪种存储布局方式最节省Gas？</p>
                </div>`,
        options: ["将小数据类型打包到同一个存储槽", "每个变量单独占用一个存储槽", "使用mapping存储所有数据", "使用数组存储所有数据"],
        correct: 0,
        explanation: "将多个小数据类型打包到同一个32字节存储槽中可以显著节省Gas，因为每个存储槽的写入操作都需要消耗大量Gas"
    },
    {
        id: 56,
        type: "select",
        title: "函数可见性优化",
        content: `<div class="p-4 text-sm">
                    <p>哪种函数可见性消耗的Gas最少？</p>
                </div>`,
        options: ["external", "public", "internal", "private"],
        correct: 2,
        explanation: "internal函数不涉及外部调用，不需要进行ABI编码解码，消耗的Gas最少。external函数虽然在某些情况下更高效，但需要处理外部调用开销"
    },
    {
        id: 57,
        type: "select",
        title: "循环优化",
        content: `<div class="p-4 text-sm">
                    <p>哪种循环写法最节省Gas？</p>
                </div>`,
        options: ["使用固定长度的for循环", "使用while循环", "使用递归函数", "避免使用循环"],
        correct: 0,
        explanation: "固定长度的for循环可以让编译器更好地优化，避免动态数组长度检查的开销。while循环和递归可能产生不可预测的Gas消耗"
    },
    {
        id: 58,
        type: "select",
        title: "错误处理优化",
        content: `<div class="p-4 text-sm">
                    <p>哪种错误处理方式消耗的Gas最少？</p>
                </div>`,
        options: ["require()", "assert()", "revert()", "自定义错误"],
        correct: 3,
        explanation: "自定义错误（Custom Errors）在Solidity 0.8.4+中引入，比require和revert消耗更少的Gas，因为它们不需要存储错误字符串"
    },
    {
        id: 59,
        type: "select",
        title: "内存优化",
        content: `<div class="p-4 text-sm">
                    <p>哪种内存使用方式最节省Gas？</p>
                </div>`,
        options: ["使用calldata代替memory", "使用memory代替storage", "使用storage代替memory", "使用固定大小数组"],
        correct: 0,
        explanation: "calldata是只读的，不需要在内存中复制数据，比memory更节省Gas。特别是在函数参数传递时，使用calldata可以避免不必要的数据复制"
    },
    {
        id: 60,
        type: "select",
        title: "事件优化",
        content: `<div class="p-4 text-sm">
                    <p>哪种事件参数标记方式最节省Gas？</p>
                </div>`,
        options: ["indexed参数", "非indexed参数", "所有参数都indexed", "不使用事件"],
        correct: 0,
        explanation: "indexed参数可以让事件更高效地被过滤和查询，虽然写入时消耗稍多Gas，但整体使用效率更高。合理使用indexed参数可以优化Gas消耗"
    },
    {
        id: 61,
        type: "select",
        title: "数学运算优化",
        content: `<div class="p-4 text-sm">
                    <p>哪种数学运算方式最节省Gas？</p>
                </div>`,
        options: ["使用移位运算代替乘除法", "使用SafeMath库", "直接使用+-*/运算", "使用内联汇编"],
        correct: 0,
        explanation: "移位运算（<<和>>）比乘除法消耗更少的Gas。在Solidity 0.8+中，内置的溢出检查已经足够安全，不需要额外使用SafeMath库"
    },
    {
        id: 62,
        type: "select",
        title: "合约部署优化",
        content: `<div class="p-4 text-sm">
                    <p>哪种方式可以减少合约部署的Gas成本？</p>
                </div>`,
        options: ["使用代理模式", "减少构造函数代码", "使用较小的合约", "所有选项都正确"],
        correct: 3,
        explanation: "所有选项都有助于减少Gas成本：代理模式可以避免重复部署逻辑合约，减少构造函数代码可以降低一次性成本，较小的合约自然消耗更少Gas"
    },
    {
        id: 63,
        type: "select",
        title: "Gas优化最佳实践",
        content: `<div class="p-4 text-sm">
                    <p>以下哪种不是Gas优化的最佳实践？</p>
                </div>`,
        options: ["过早优化", "使用适当的可见性", "避免不必要的存储操作", "使用适当的数据类型"],
        correct: 0,
        explanation: "过早优化是Gas优化的常见误区。应该先确保代码正确性和安全性，再进行有针对性的Gas优化。其他选项都是Gas优化的最佳实践"
    }
];