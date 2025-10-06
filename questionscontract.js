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
    }
];