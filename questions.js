const questions = [
            {
                id: 1,
                type: "fill",
                title: "包声明",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">package</span> <span class="code-blank" data-id="1" data-answer="main"></span></div>
                </div>`,
                instruction: "填写Go程序的主包名称",
                hint: "Go语言中可执行程序的包名是\"main\"",
                explanation: "main包是Go语言中特殊的包名，表示这是一个可以直接运行的程序"
            },
            {
                id: 2,
                type: "select",
                title: "结构体定义",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项是正确的区块结构体定义？</p>
                </div>`,
                options: [
                    `type Block { Data string }`,
                    `struct Block { Data string }`,
                    `type Block struct { Data string }`,
                    `def Block: Data string`
                ],
                correct: 2, // 索引从0开始
                explanation: "在Go中，结构体定义格式为：type 名称 struct { 字段 类型 }"
            },
            {
                id: 3,
                type: "fill",
                title: "导入语句",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">import</span> <span class="code-blank" data-id="3" data-answer='"fmt"'></span></div>
                </div>`,
                instruction: "填写导入fmt包的正确语句（包含引号）",
                hint: "包名需要用双引号括起来，fmt是格式化输入输出的包",
                explanation: "import语句用于导入其他包，包名必须放在双引号中"
            },
            {
                id: 4,
                type: "correct",
                title: "修正错误",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">func</span> main() {</div>
                    <div class="ml-4">b := Block{data: <span class="text-red-600">"区块数据"</span>}</div>
                    <div>}</div>
                </div>`,
                instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
                correct: "Data",
                hint: "Go语言中结构体字段名首字母通常大写",
                explanation: "Go语言中，结构体字段名首字母大写表示该字段可导出（公共），小写则为私有"
            },
            {
                id: 5,
                type: "fill",
                title: "函数定义",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">func</span> <span class="code-blank" data-id="5" data-answer="(b Block) GetData"></span>() <span class="text-purple-600">string</span> {</div>
                    <div class="ml-4"><span class="text-blue-600">return</span> b.Data</div>
                    <div>}</div>
                </div>`,
                instruction: "填写正确的方法接收者和名称，实现获取区块数据的方法",
                hint: "方法格式：(接收者 类型) 方法名，这里需要定义GetData方法",
                explanation: "在Go中，方法通过接收者与结构体关联，格式为：func (接收者 类型) 方法名()"
            },
            {
                id: 6,
                type: "fill",
                title: "区块链定义",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">type</span> <span class="code-blank" data-id="6" data-answer="Blockchain"></span> []Block</div>
                </div>`,
                instruction: "填写区块链类型名称，它是Block的切片",
                hint: "区块链是由多个区块组成的链条，名称是Blockchain",
                explanation: "在Go中，我们可以用切片（[]）来表示区块链，它是区块的有序集合"
            },
            {
                id: 7,
                type: "select",
                title: "创建区块",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项正确创建了一个新区块？</p>
                </div>`,
                options: [
                    `newBlock = Block{"交易数据"}`,
                    `newBlock := Block{Data: "交易数据"}`,
                    `newBlock -> Block("交易数据")`,
                    `Block newBlock = {"交易数据"}`
                ],
                correct: 1,
                explanation: "在Go中，创建结构体实例使用 变量名 := 结构体名{字段: 值} 的格式"
            },
            {
                id: 8,
                type: "fill",
                title: "哈希函数导入",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">import</span> <span class="code-blank" data-id="8" data-answer='"crypto/sha256"'></span></div>
                </div>`,
                instruction: "填写导入SHA-256哈希包的语句（包含引号）",
                hint: "Go中SHA-256哈希功能在crypto/sha256包中",
                explanation: "crypto/sha256包提供了SHA-256哈希算法实现，是区块链的核心依赖"
            },
            {
                id: 9,
                type: "correct",
                title: "修正切片操作",
                content: `<div class="p-4 font-mono text-sm">
                    <div>blockchain := Blockchain{genesisBlock}</div>
                    <div><span class="text-red-600">blockchain += newBlock</span></div>
                </div>`,
                instruction: "修正添加区块到区块链的错误代码",
                correct: "blockchain = append(blockchain, newBlock)",
                hint: "在Go中，向切片添加元素使用append函数",
                explanation: "Go中的切片不能使用+=添加元素，必须使用append函数：slice = append(slice, 元素)"
            },
            {
                id: 10,
                type: "fill",
                title: "获取最后区块",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">func</span> getLastBlock(bc Blockchain) Block {</div>
                    <div class="ml-4"><span class="text-blue-600">return</span> bc[<span class="code-blank" data-id="10" data-answer="len(bc)-1"></span>]</div>
                    <div>}</div>
                </div>`,
                instruction: "填写索引值，获取区块链中的最后一个区块",
                hint: "使用len()函数获取切片长度，索引从0开始",
                explanation: "区块链的最后一个区块索引是长度减1，因为Go中切片索引从0开始"
            },
            {
                id: 11,
                type: "select",
                title: "哈希计算",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项正确计算字符串的SHA-256哈希？</p>
                </div>`,
                options: [
                    `hash := sha256.Hash("data")`,
                    `hash := sha256.Sum256("data")`,
                    `hash := sha256.Sum256([]byte("data"))`,
                    `hash := sha256.Compute("data")`
                ],
                correct: 2,
                explanation: "sha256.Sum256()函数需要字节切片作为参数，所以需要用[]byte()转换字符串"
            },
            {
                id: 12,
                type: "fill",
                title: "区块哈希字段",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">type</span> Block <span class="text-blue-600">struct</span> {</div>
                    <div class="ml-4">Data <span class="text-purple-600">string</span></div>
                    <div class="ml-4"><span class="code-blank" data-id="12" data-answer="Hash"></span> <span class="text-purple-600">string</span></div>
                    <div>}</div>
                </div>`,
                instruction: "填写区块结构体的哈希字段名称",
                hint: "区块通常包含数据和哈希两个字段",
                explanation: "区块结构体通常包含Data和Hash字段，Hash用于存储区块的哈希值"
            },
            {
                id: 13,
                type: "select",
                title: "时间戳导入",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个包用于获取当前时间戳？</p>
                </div>`,
                options: [
                    `"time"`,
                    `"timestamp"`,
                    `"datetime"`,
                    `"clock"`
                ],
                correct: 0,
                explanation: "Go语言中time包提供了时间相关的功能，包括获取当前时间戳"
            },
            {
                id: 14,
                type: "fill",
                title: "时间戳字段",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">type</span> Block <span class="text-blue-600">struct</span> {</div>
                    <div class="ml-4">Data <span class="text-purple-600">string</span></div>
                    <div class="ml-4">Hash <span class="text-purple-600">string</span></div>
                    <div class="ml-4"><span class="code-blank" data-id="14" data-answer="Timestamp"></span> <span class="text-purple-600">int64</span></div>
                    <div>}</div>
                </div>`,
                instruction: "填写区块结构体的时间戳字段名称",
                hint: "区块通常包含时间戳来记录创建时间",
                explanation: "Timestamp字段记录区块创建的时间戳，类型为int64"
            },
            {
                id: 15,
                type: "correct",
                title: "修正时间戳获取",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">func</span> getTimestamp() <span class="text-purple-600">int64</span> {</div>
                    <div class="ml-4"><span class="text-red-600">return time.Now()</span></div>
                    <div>}</div>
                </div>`,
                instruction: "修正获取时间戳的函数错误",
                correct: "return time.Now().Unix()",
                hint: "time.Now()返回time.Time类型，需要转换为Unix时间戳",
                explanation: "time.Now().Unix()返回int64类型的Unix时间戳，time.Now()返回的是time.Time类型"
            },
            {
                id: 16,
                type: "fill",
                title: "前一个区块哈希",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">type</span> Block <span class="text-blue-600">struct</span> {</div>
                    <div class="ml-4">Data <span class="text-purple-600">string</span></div>
                    <div class="ml-4">Hash <span class="text-purple-600">string</span></div>
                    <div class="ml-4">Timestamp <span class="text-purple-600">int64</span></div>
                    <div class="ml-4"><span class="code-blank" data-id="16" data-answer="PrevHash"></span> <span class="text-purple-600">string</span></div>
                    <div>}</div>
                </div>`,
                instruction: "填写前一个区块哈希字段名称",
                hint: "区块链中每个区块都包含前一个区块的哈希",
                explanation: "PrevHash字段存储前一个区块的哈希值，这是区块链连接的关键"
            },
            {
                id: 17,
                type: "select",
                title: "创世区块",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">创世区块的PrevHash应该是什么？</p>
                </div>`,
                options: [
                    `空字符串""`,
                    `"0"`,
                    `当前区块的哈希`,
                    `随机字符串`
                ],
                correct: 0,
                explanation: "创世区块是区块链的第一个区块，没有前一个区块，所以PrevHash为空字符串"
            },
            {
                id: 18,
                type: "fill",
                title: "计算区块哈希",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">func</span> calculateHash(b Block) <span class="text-purple-600">string</span> {</div>
                    <div class="ml-4">data := <span class="text-blue-600">string</span>(b.Data) + <span class="text-blue-600">string</span>(b.PrevHash) + <span class="code-blank" data-id="18" data-answer="fmt.Sprintf(\"%d\", b.Timestamp)"></span></div>
                    <div class="ml-4">hash := sha256.Sum256([]byte(data))</div>
                    <div class="ml-4"><span class="text-blue-600">return</span> fmt.Sprintf(<span class="text-green-600">"%x"</span>, hash)</div>
                    <div>}</div>
                </div>`,
                instruction: "填写时间戳转换为字符串的代码",
                hint: "使用fmt.Sprintf格式化int64类型的时间戳",
                explanation: "fmt.Sprintf(\"%d\", b.Timestamp)将int64时间戳转换为字符串"
            },
            {
                id: 19,
                type: "correct",
                title: "修正哈希计算",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">func</span> calculateHash(b Block) <span class="text-purple-600">string</span> {</div>
                    <div class="ml-4">data := b.Data + b.PrevHash + <span class="text-red-600">b.Timestamp</span></div>
                    <div class="ml-4">hash := sha256.Sum256([]byte(data))</div>
                    <div class="ml-4"><span class="text-blue-600">return</span> fmt.Sprintf(<span class="text-green-600">"%x"</span>, hash)</div>
                    <div>}</div>
                </div>`,
                instruction: "修正哈希计算中的类型错误",
                correct: "fmt.Sprintf(\"%d\", b.Timestamp)",
                hint: "不能直接将int64和字符串相加，需要先转换类型",
                explanation: "int64类型的Timestamp需要先转换为字符串才能与其他字符串拼接"
            },
            {
                id: 20,
                type: "fill",
                title: "创建新区块",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">func</span> <span class="code-blank" data-id="20" data-answer="createBlock"></span>(data <span class="text-purple-600">string</span>, prevHash <span class="text-purple-600">string</span>) Block {</div>
                    <div class="ml-4">timestamp := time.Now().Unix()</div>
                    <div class="ml-4">newBlock := Block{</div>
                    <div class="ml-8">Data: data,</div>
                    <div class="ml-8">PrevHash: prevHash,</div>
                    <div class="ml-8">Timestamp: timestamp,</div>
                    <div class="ml-8">Hash: <span class="text-green-600">""</span></div>
                    <div class="ml-4">}</div>
                    <div class="ml-4">newBlock.Hash = calculateHash(newBlock)</div>
                    <div class="ml-4"><span class="text-blue-600">return</span> newBlock</div>
                    <div>}</div>
                </div>`,
                instruction: "填写创建新区块的函数名称",
                hint: "函数名应该描述其功能，比如createBlock",
                explanation: "createBlock函数接收数据和前一个区块哈希，返回一个新的区块"
            },
            {
                id: 21,
                type: "select",
                title: "添加区块到链",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项正确地将新区块添加到区块链？</p>
                </div>`,
                options: [
                    `blockchain = append(blockchain, newBlock)`,
                    `blockchain.add(newBlock)`,
                    `blockchain.push(newBlock)`,
                    `blockchain[len(blockchain)] = newBlock`
                ],
                correct: 0,
                explanation: "在Go中，使用append函数向切片添加元素，返回新的切片"
            },
            {
                id: 22,
                type: "fill",
                title: "版本声明",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">pragma</span> <span class="text-purple-600">solidity</span> <span class="code-blank" data-id="22" data-answer="^0.8.0"></span>;</div>
                </div>`,
                instruction: "填写Solidity 0.8.0及以上版本的声明语句",
                hint: "使用^符号表示兼容指定版本及以上",
                explanation: "pragma solidity ^0.8.0; 声明合约使用Solidity 0.8.0或更高版本编译"
            },
            {
                id: 23,
                type: "select",
                title: "合约定义",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项是正确的Solidity合约定义？</p>
                </div>`,
                options: [
                    `contract MyContract {}`,
                    `class MyContract {}`,
                    `function MyContract {}`,
                    `module MyContract {}`
                ],
                correct: 0,
                explanation: "在Solidity中，合约使用contract关键字定义"
            },
            {
                id: 24,
                type: "fill",
                title: "状态变量",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> Counter {</div>
                    <div class="ml-4"><span class="code-blank" data-id="24" data-answer="uint256 public"></span> count;</div>
                    <div>}</div>
                </div>`,
                instruction: "填写正确的状态变量声明，定义一个公开的无符号整数count",
                hint: "需要指定类型和可见性",
                explanation: "uint256 public count; 声明了一个公开的无符号256位整数状态变量"
            },
            {
                id: 25,
                type: "correct",
                title: "修正错误",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> Store {</div>
                    <div class="ml-4">string data;</div>
                    <div class="ml-4"><span class="text-blue-600">function</span> setData(string memory _data) {</div>
                    <div class="ml-8">data = _data;</div>
                    <div class="ml-4">}</div>
                    <div>}</div>
                </div>`,
                instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
                correct: "public",
                hint: "函数需要指定可见性",
                explanation: "Solidity 0.5.0及以上版本要求显式指定函数可见性，应添加public关键字"
            },
            {
                id: 26,
                type: "select",
                title: "构造函数",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项是正确的Solidity构造函数定义？</p>
                </div>`,
                options: [
                    `function Constructor() {}`,
                    `constructor() {}`,
                    `init() {}`,
                    `new() {}`
                ],
                correct: 1,
                explanation: "在Solidity中，构造函数使用constructor关键字定义，在合约部署时执行"
            },
            {
                id: 27,
                type: "fill",
                title: " payable函数",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> Donation {</div>
                    <div class="ml-4"><span class="text-blue-600">function</span> donate() <span class="code-blank" data-id="27" data-answer="external payable"></span> {</div>
                    <div class="ml-8"><span class="comment">// 接收捐赠</span></div>
                    <div class="ml-4">}</div>
                    <div>}</div>
                </div>`,
                instruction: "填写正确的可见性和 payable 修饰符，使函数能接收以太币",
                hint: "需要包含external和payable关键字",
                explanation: "payable修饰符允许函数接收以太币，external表示函数只能从外部调用"
            },
            {
                id: 28,
                type: "correct",
                title: "修正错误",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> Math {</div>
                    <div class="ml-4"><span class="text-blue-600">function</span> add(uint a, uint b) <span class="text-blue-600">public</span> {</div>
                    <div class="ml-8"><span class="text-blue-600">return</span> a + b;</div>
                    <div class="ml-4">}</div>
                    <div>}</div>
                </div>`,
                instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
                correct: "returns (uint)",
                hint: "函数缺少返回值类型声明",
                explanation: "Solidity函数需要显式声明返回值类型，应添加returns (uint)"
            },
            {
                id: 29,
                type: "select",
                title: "映射定义",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项是正确的用户余额映射定义？</p>
                </div>`,
                options: [
                    `mapping(address => uint256) balances;`,
                    `map(address => uint256) balances;`,
                    `mapping(address, uint256) balances;`,
                    `dictionary(address => uint256) balances;`
                ],
                correct: 0,
                explanation: "Solidity中映射的定义格式为：mapping(键类型 => 值类型) 变量名;"
            },
            {
                id: 30,
                type: "fill",
                title: "事件定义",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> Token {</div>
                    <div class="ml-4"><span class="code-blank" data-id="30" data-answer="event Transfer"></span>(address indexed from, address indexed to, uint256 value);</div>
                    <div>}</div>
                </div>`,
                instruction: "填写正确的事件声明，定义一个转账事件",
                hint: "使用event关键字",
                explanation: "event Transfer(...) 定义了一个转账事件，可以被前端监听"
            },
            {
                id: 31,
                type: "correct",
                title: "修正错误",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> Wallet {</div>
                    <div class="ml-4"><span class="text-blue-600">function</span> withdraw() <span class="text-blue-600">public</span> {</div>
                    <div class="ml-8">msg.sender.transfer(address(this).balance)</div>
                    <div class="ml-4">}</div>
                    <div>}</div>
                </div>`,
                instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
                correct: ";",
                hint: "语句缺少结束符",
                explanation: "Solidity中每条语句必须以分号;结束"
            },
            {
                id: 32,
                type: "select",
                title: "继承语法",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项是正确的Solidity合约继承语法？</p>
                </div>`,
                options: [
                    `contract Child extend Parent {}`,
                    `contract Child inherits Parent {}`,
                    `contract Child is Parent {}`,
                    `contract Child : Parent {}`
                ],
                correct: 2,
                explanation: "Solidity中使用is关键字实现合约继承"
            },
            {
                id: 33,
                type: "fill",
                title: "修饰符定义",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> AdminControl {</div>
                    <div class="ml-4">address admin;</div>
                    <div class="ml-4"><span class="code-blank" data-id="33" data-answer="modifier onlyAdmin"></span> {</div>
                    <div class="ml-8"><span class="text-blue-600">require</span>(msg.sender == admin, "Not admin");</div>
                    <div class="ml-8">_;</div>
                    <div class="ml-4">}</div>
                    <div>}</div>
                </div>`,
                instruction: "填写正确的修饰符声明，定义一个仅管理员可用的修饰符",
                hint: "使用modifier关键字",
                explanation: "modifier onlyAdmin 定义了一个名为onlyAdmin的函数修饰符，用于限制函数访问"
            },
            {
                id: 34,
                type: "correct",
                title: "修正错误",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> Bank {</div>
                    <div class="ml-4">mapping(address => uint) balances;</div>
                    <div class="ml-4"><span class="text-blue-600">function</span> deposit() <span class="text-blue-600">public</span> <span class="text-blue-600">payable</span> {</div>
                    <div class="ml-8">balances[msg.sender] += msg.value</div>
                    <div class="ml-4">}</div>
                    <div>}</div>
                </div>`,
                instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
                correct: ";",
                hint: "注意语句的结束符",
                explanation: "Solidity中每条语句必须以分号;结束，赋值语句后缺少分号"
            },
            {
                id: 35,
                type: "select",
                title: "数组定义",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项是正确的动态数组定义？</p>
                </div>`,
                options: [
                    `uint[5] numbers;`,
                    `uint[] numbers;`,
                    `array(uint) numbers;`,
                    `dynamic uint numbers[];`
                ],
                correct: 1,
                explanation: "Solidity中动态数组定义为：类型[] 变量名; 不需要指定长度"
            },
            {
                id: 36,
                type: "fill",
                title: "require语句",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> SafeMath {</div>
                    <div class="ml-4"><span class="text-blue-600">function</span> subtract(uint a, uint b) <span class="text-blue-600">public</span> <span class="text-blue-600">pure</span> <span class="text-blue-600">returns</span> (uint) {</div>
                    <div class="ml-8"><span class="code-blank" data-id="36" data-answer="require(b <= a, 'Underflow')"></span>;</div>
                    <div class="ml-8"><span class="text-blue-600">return</span> a - b;</div>
                    <div class="ml-4">}</div>
                    <div>}</div>
                </div>`,
                instruction: "填写正确的require语句，防止下溢",
                hint: "检查b是否小于等于a",
                explanation: "require(b <= a, 'Underflow'); 确保减法操作不会导致下溢"
            },
            {
                id: 37,
                type: "correct",
                title: "修正错误",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> Greeter {</div>
                    <div class="ml-4">string greeting;</div>
                    <div class="ml-4"><span class="text-blue-600">constructor</span>(string _greeting) {</div>
                    <div class="ml-8">greeting = _greeting;</div>
                    <div class="ml-4">}</div>
                    <div>}</div>
                </div>`,
                instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
                correct: "memory",
                hint: "字符串参数需要指定存储位置",
                explanation: "字符串作为函数参数时需要指定存储位置，应改为string memory _greeting"
            },
            {
                id: 38,
                type: "select",
                title: "枚举定义",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项是正确的枚举定义？</p>
                </div>`,
                options: [
                    `enum Status { Pending, Approved, Rejected }`,
                    `enumerate Status { Pending, Approved, Rejected }`,
                    `enum Status = { Pending, Approved, Rejected }`,
                    `enum (Pending, Approved, Rejected) Status;`
                ],
                correct: 0,
                explanation: "Solidity中枚举定义格式为：enum 名称 { 枚举值1, 枚举值2, ... }"
            },
            {
                id: 39,
                type: "fill",
                title: "接口定义",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="39" data-answer="interface IERC20"></span> {</div>
                    <div class="ml-4"><span class="text-blue-600">function</span> totalSupply() <span class="text-blue-600">external</span> <span class="text-blue-600">view</span> <span class="text-blue-600">returns</span> (uint256);</div>
                    <div class="ml-4"><span class="text-blue-600">function</span> balanceOf(address account) <span class="text-blue-600">external</span> <span class="text-blue-600">view</span> <span class="text-blue-600">returns</span> (uint256);</div>
                    <div>}</div>
                </div>`,
                instruction: "填写正确的接口声明，定义一个ERC20接口",
                hint: "使用interface关键字，通常接口名以I开头",
                explanation: "interface IERC20 定义了一个名为IERC20的接口，包含ERC20标准的基本函数"
            },
            {
                id: 40,
                type: "correct",
                title: "修正错误",
                content: `<div class="p-4 font-mono text-sm">
                    <div><span class="text-blue-600">contract</span> Counter {</div>
                    <div class="ml-4">uint count = 0;</div>
                    <div class="ml-4"><span class="text-blue-600">function</span> increment() <span class="text-blue-600">public</span> {</div>
                    <div class="ml-8">count++</div>
                    <div class="ml-4">}</div>
                    <div>}</div>
                </div>`,
                instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
                correct: ";",
                hint: "语句结束需要什么符号？",
                explanation: "Solidity中每条语句必须以分号;结束，自增语句后缺少分号"
            },
            {
                id: 41,
                type: "select",
                title: "库定义",
                content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪个选项是正确的库定义？</p>
                </div>`,
                options: [
                    `library MathLib {}`,
                    `lib MathLib {}`,
                    `library MathLib() {}`,
                    `module MathLib {}`
                ],
                correct: 0,
                explanation: "Solidity中使用library关键字定义库，库用于封装可重用的函数"
            },
    {
        id: 42,
        type: "select",
        title: "EVM位数",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以太坊虚拟机（EVM）是多少位的虚拟机？</p>
        </div>`,
        options: [
            "8位",
            "32位",
            "64位",
            "256位"
        ],
        correct: 3,
        explanation: "EVM是256位的虚拟机，所有运算都以256位数据为基础"
    },
    {
        id: 43,
        type: "fill",
        title: "EVM栈深度",
        content: `<div class="p-4 font-mono text-sm">
            <div>EVM栈的最大深度是<span class="code-blank" data-id="43" data-answer="1024"></span>个元素</div>
        </div>`,
        instruction: "填写EVM栈的最大深度",
        hint: "是2的10次方",
        explanation: "EVM栈的最大深度为1024个元素，超过这个深度会导致栈溢出错误"
    },
    {
        id: 44,
        type: "select",
        title: "EVM存储类型",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪种不是EVM中的数据存储区域？</p>
        </div>`,
        options: [
            "Stack（栈）",
            "Memory（内存）",
            "Storage（存储）",
            "Cache（缓存）"
        ],
        correct: 3,
        explanation: "EVM有三个主要数据存储区域：Stack（栈）、Memory（内存）和Storage（存储），没有Cache（缓存）"
    },
    {
        id: 45,
        type: "fill",
        title: "Gas机制",
        content: `<div class="p-4 font-mono text-sm">
            <div>EVM中，每笔交易都需要支付<span class="code-blank" data-id="45" data-answer="gas"></span>来执行操作</div>
        </div>`,
        instruction: "填写EVM中交易执行所需的资源单位",
        hint: "这个单位用于防止无限循环和计算滥用",
        explanation: "Gas是EVM中衡量计算工作量的单位，每笔交易必须指定gas limit和gas price"
    },
    {
        id: 46,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项描述错误</span></div>
            <div>EVM是基于栈的虚拟机</div>
            <div>EVM只能直接访问区块链状态</div>
            <div>EVM执行的是编译后的bytecode</div>
            <div>EVM支持浮点运算</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "EVM支持浮点运算",
        hint: "EVM对数字类型有严格限制",
        explanation: "EVM不支持浮点运算，只支持整数运算，所有数字都以256位整数表示"
    },
    {
        id: 47,
        type: "select",
        title: "字节码类型",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">部署到EVM的合约代码通常是什么形式？</p>
        </div>`,
        options: [
            "Solidity源代码",
            "字节码（Bytecode）",
            "汇编代码",
            "机器码"
        ],
        correct: 1,
        explanation: "Solidity代码会被编译为字节码（Bytecode），这是EVM可以直接执行的指令集"
    },
    {
        id: 48,
        type: "fill",
        title: "指令数量",
        content: `<div class="p-4 font-mono text-sm">
            <div>EVM包含大约<span class="code-blank" data-id="48" data-answer="140"></span>条不同的操作码（opcode）</div>
        </div>`,
        instruction: "填写EVM操作码的大致数量",
        hint: "数量在100-200之间",
        explanation: "EVM有大约140条操作码，每条操作码对应一个特定的操作，如ADD、MUL、SLOAD等"
    },
    {
        id: 49,
        type: "select",
        title: "Storage特性",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">关于EVM的Storage（存储），以下哪项描述正确？</p>
        </div>`,
        options: [
            "临时存储，交易结束后清除",
            "永久存储，存在区块链上",
            "读写速度快，成本低",
            "容量有限，最多存储1024个数据"
        ],
        correct: 1,
        explanation: "Storage是EVM的永久存储区域，数据会被写入区块链，具有持久性，但读写成本较高"
    },
    {
        id: 50,
        type: "fill",
        title: "Memory特性",
        content: `<div class="p-4 font-mono text-sm">
            <div>EVM的Memory（内存）是<span class="code-blank" data-id="50" data-answer="临时的"></span>存储区域，交易执行结束后会被清除</div>
        </div>`,
        instruction: "填写描述EVM内存特性的形容词",
        hint: "与'永久的'相对",
        explanation: "EVM的Memory是临时存储，仅在交易执行期间存在，执行结束后数据会被清除"
    },
    {
        id: 51,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项关于gas的描述错误</span></div>
            <div>gas用于防止交易执行所需的计算工作量</div>
            <div>gas price是用户愿意为每个gas支付的以太币数量</div>
            <div>未使用的gas会被销毁</div>
            <div>gas不足会导致交易失败</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "未使用的gas会被销毁",
        hint: "未使用的gas会如何处理？",
        explanation: "未使用的gas会退还给交易发送者，而不是被销毁"
    },
    {
        id: 52,
        type: "select",
        title: "Opcode功能",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">EVM中，SLOAD指令的功能是什么？</p>
        </div>`,
        options: [
            "从Storage读取数据",
            "向Storage写入数据",
            "从Memory读取数据",
            "向Memory写入数据"
        ],
        correct: 0,
        explanation: "SLOAD指令用于从Storage（永久存储）中读取数据，对应的SSTORE指令用于写入数据"
    },
    {
        id: 53,
        type: "fill",
        title: "CREATE指令",
        content: `<div class="p-4 font-mono text-sm">
            <div>EVM的<span class="code-blank" data-id="53" data-answer="CREATE"></span>指令用于创建新的智能合约</div>
        </div>`,
        instruction: "填写用于创建新合约的EVM指令",
        hint: "指令名称全大写",
        explanation: "CREATE是EVM中用于创建新智能合约的指令，会在区块链上部署新合约并返回其地址"
    },
    {
        id: 54,
        type: "select",
        title: "异常处理",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">EVM中，当发生错误（如gas不足）时会如何处理？</p>
        </div>`,
        options: [
            "返回错误代码，继续执行",
            "回滚所有状态更改，消耗的gas不退还",
            "暂停执行，等待用户确认",
            "自动重试交易",
        ],
        correct: 1,
        explanation: "EVM执行出错时会回滚所有状态更改，就像交易从未发生过一样，但已消耗的gas不会退还"
    },
    {
        id: 55,
        type: "fill",
        title: "CALL指令",
        content: `<div class="p-4 font-mono text-sm">
            <div>EVM的CALL指令用于<span class="code-blank" data-id="55" data-answer="调用其他合约"></span></div>
        </div>`,
        instruction: "填写CALL指令的主要功能",
        hint: "与其他合约交互的操作",
        explanation: "CALL指令是EVM中用于调用其他合约函数的主要指令，支持合约之间的交互"
    },
    {
        id: 56,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项关于EVM栈的描述错误</span></div>
            <div>栈是LIFO（后进先出）结构</div>
            <div>栈元素大小固定为256位</div>
            <div>可以直接访问栈中的任意元素</div>
            <div>栈操作有严格的深度限制</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "可以直接访问栈中的任意元素",
        hint: "栈的访问方式有什么限制？",
        explanation: "EVM栈是严格的LIFO结构，只能访问栈顶元素，不能直接访问栈中的任意元素"
    },
    {
        id: 57,
        type: "select",
        title: "SHA3指令",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">EVM中，SHA3指令实现了哪种哈希算法？</p>
        </div>`,
        options: [
            "SHA-1",
            "SHA-256",
            "Keccak-256",
            "MD5"
        ],
        correct: 2,
        explanation: "EVM中的SHA3指令实际上实现的是Keccak-256哈希算法，与标准SHA-3有细微差别"
    },
    {
        id: 58,
        type: "fill",
        title: "Blockhash指令",
        content: `<div class="p-4 font-mono text-sm">
            <div>BLOCKHASH指令可以获取最近<span class="code-blank" data-id="58" data-answer="256"></span>个区块的哈希值</div>
        </div>`,
        instruction: "填写BLOCKHASH指令可以访问的区块数量",
        hint: "是2的8次方",
        explanation: "EVM的BLOCKHASH指令只能获取最近256个区块的哈希值，更早的区块哈希无法直接获取"
    },
    {
        id: 59,
        type: "select",
        title: "日志功能",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">EVM中，哪个指令用于创建日志（事件）？</p>
        </div>`,
        options: [
            "LOG",
            "EVENT",
            "LOG0至LOG4",
            "EMIT"
        ],
        correct: 2,
        explanation: "EVM提供了LOG0到LOG4指令用于创建日志，数字表示日志中索引参数的数量"
    },
    {
        id: 60,
        type: "fill",
        title: "自毁指令",
        content: `<div class="p-4 font-mono text-sm">
            <div>EVM中，<span class="code-blank" data-id="60" data-answer="SELFDESTRUCT"></span>指令用于销毁合约并将余额发送到指定地址</div>
        </div>`,
        instruction: "填写用于销毁合约的EVM指令",
        hint: "指令名称全大写，包含SELF和DESTRUCT",
        explanation: "SELFDESTRUCT指令是EVM中用于销毁当前合约的指令，会将合约中剩余的以太币发送到指定地址"
    },
    {
        id: 61,
        type: "select",
        title: "预编译合约",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪项不是EVM中的预编译合约？</p>
        </div>`,
        options: [
            "SHA256哈希计算",
            "椭圆签名验证",
            "随机数生成",
            "椭圆曲线加密"
        ],
        correct: 2,
        explanation: "EVM包含多个预编译合约用于复杂运算，如加密哈希和签名验证，但不包括随机数生成"
    },
    {
        id: 62,
        type: "select",
        title: "区块链本质",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">区块链最本质的特征是什么？</p>
        </div>`,
        options: [
            "一种加密货币",
            "一个去中心化的分布式账本",
            "一种新的数据库技术",
            "一种点对点通信协议"
        ],
        correct: 1,
        explanation: "区块链本质上是一个去中心化的分布式账本，能够安全地记录交易并数据"
    },
    {
        id: 63,
        type: "fill",
        title: "区块链核心特性",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链的核心特性包括去中心化、透明性、不可篡改性和<span class="code-blank" data-id="63" data-answer="可追溯性"></span></div>
        </div>`,
        instruction: "填写区块链的核心特性之一",
        hint: "指可以追踪数据历史的特性",
        explanation: "区块链的可追溯性指每个交易都可以被追踪到其源头，形成完整的审计 trail"
    },
    {
        id: 64,
        type: "select",
        title: "区块组成",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">一个典型的区块不包含以下哪项？</p>
        </div>`,
        options: [
            "区块头",
            "交易数据",
            "前一区块哈希",
            "矿工私钥"
        ],
        correct: 3,
        explanation: "区块包含区块头、交易数据和前一区块哈希等信息，但不包含矿工私钥"
    },
    {
        id: 65,
        type: "fill",
        title: "链的形成",
        content: `<div class="p-4 font-mono text-sm">
            <div>每个区块通过包含<span class="code-blank" data-id="65" data-answer="前一区块的哈希值"></span>来形成链式结构</div>
        </div>`,
        instruction: "填写区块之间形成链的关键要素",
        hint: "与前一个区块相关联的加密值",
        explanation: "每个区块包含前一区块的哈希值，使区块之间形成不可篡改的链式结构"
    },
    {
        id: 66,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项描述错误</span></div>
            <div>区块链数据一旦写入就无法修改</div>
            <div>区块链网络中的节点地位平等</div>
            <div>区块链只能用于加密货币</div>
            <div>区块链使用密码学保证数据安全</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "区块链只能用于加密货币",
        hint: "区块链的应用范围很广",
        explanation: "区块链技术不仅可用于加密货币，还可应用于供应链、医疗、金融等多个领域"
    },
    {
        id: 67,
        type: "select",
        title: "去中心化意义",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">区块链的去中心化设计主要是为了实现什么？</p>
        </div>`,
        options: [
            "提高交易速度",
            "消除单点故障和信任中介",
            "降低存储成本",
            "简化系统设计"
        ],
        correct: 1,
        explanation: "去中心化设计使区块链网络没有单一控制点，消除了单点故障风险和对中介机构的依赖"
    },
    {
        id: 68,
        type: "fill",
        title: "共识机制作用",
        content: `<div class="p-4 font-mono text-sm">
            <div>共识机制的作用是让区块链网络中的节点对<span class="code-blank" data-id="68" data-answer="交易的有效性"></span>达成一致</div>
        </div>`,
        instruction: "填写共识机制的主要作用对象",
        hint: "与网络中发生的操作相关",
        explanation: "共识机制确保区块链网络中的所有节点对交易的有效性和顺序达成一致，维持账本一致性"
    },
    {
        id: 69,
        type: "select",
        title: "工作量证明",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪项是工作量证明（PoW）的特点？</p>
        </div>`,
        options: [
            "能耗低",
            "通过计算难题验证交易",
            "持有代币越多权力越大",
            "节点轮流验证交易"
        ],
        correct: 1,
        explanation: "工作量证明（PoW）要求矿工解决复杂的计算难题来验证交易并创建新区块"
    },
    {
        id: 70,
        type: "fill",
        title: "智能合约定义",
        content: `<div class="p-4 font-mono text-sm">
            <div>智能合约是运行在区块链上的<span class="code-blank" data-id="70" data-answer="自动执行的代码"></span></div>
        </div>`,
        instruction: "填写智能合约的本质",
        hint: "无需人工干预即可运行的程序",
        explanation: "智能合约是预先编写的代码，当满足特定条件时会在区块链上自动执行，无需人工干预"
    },
    {
        id: 71,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项关于区块链透明性的描述错误</span></div>
            <div>区块链上的交易对所有参与者可见</div>
            <div>任何人都可以查看区块链上的交易历史</div>
            <div>区块链上的交易无法匿名进行</div>
            <div>交易详情公开但参与者身份可匿名</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "区块链上的交易无法匿名进行",
        hint: "区块链通常如何处理用户身份？",
        explanation: "区块链交易是透明的，但参与者身份通常通过地址表示，可以保持匿名性"
    },
    {
        id: 72,
        type: "select",
        title: "公有链特点",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">公有链的主要特点是什么？</p>
        </div>`,
        options: [
            "仅限授权节点访问",
            "任何人都可以参与和查看",
            "由单一机构控制",
            "交易速度极快"
        ],
        correct: 1,
        explanation: "公有链是完全开放的区块链网络，任何人都可以成为节点参与共识过程和查看交易数据"
    },
    {
        id: 73,
        type: "fill",
        title: "私有链应用场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>私有链通常用于<span class="code-blank" data-id="73" data-answer="企业内部"></span>或特定组织内部的数据管理</div>
        </div>`,
        instruction: "填写私有链的典型应用范围",
        hint: "与组织边界相关",
        explanation: "私有链仅限特定组织或企业内部使用，提供可控的区块链解决方案"
    },
    {
        id: 74,
        type: "select",
        title: "联盟链特点",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">联盟链最显著的特点是什么？</p>
        </div>`,
        options: [
            "完全去中心化",
            "由多个机构共同管理",
            "无需共识机制",
            "交易完全公开"
        ],
        correct: 1,
        explanation: "联盟链由多个组织或机构共同管理和维护，介于公有链和私有链之间"
    },
    {
        id: 75,
        type: "fill",
        title: "哈希函数作用",
        content: `<div class="p-4 font-mono text-sm">
            <div>哈希函数在区块链中用于将任意长度的数据转换为<span class="code-blank" data-id="75" data-answer="固定长度的哈希值"></span></div>
        </div>`,
        instruction: "填写哈希函数的输出结果",
        hint: "具有固定长度的加密值",
        explanation: "哈希函数将任意长度的输入数据转换为固定长度的哈希值，用于数据完整性验证和区块链接"
    },
    {
        id: 76,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项关于不可篡改性的描述错误</span></div>
            <div>区块链的不可篡改性是绝对的，无法更改任何数据</div>
            <div>修改区块链数据需要控制多数节点</div>
            <div>区块链的不可篡改性源于其链式结构和哈希加密</div>
            <div>修改历史区块会导致后续所有区块失效</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "区块链的不可篡改性是绝对的，无法更改任何数据",
        hint: "不可篡改性是否是绝对的？",
        explanation: "区块链的不可篡改性是相对的，理论上控制超过51%的算力可以修改数据，但成本极高"
    },
    {
        id: 77,
        type: "select",
        title: "区块链分叉",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">区块链分叉是指什么？</p>
        </div>`,
        options: [
            "区块链数据损坏",
            "区块链网络分裂成两个独立的链",
            "区块被黑客攻击",
            "交易验证失败"
        ],
        correct: 1,
        explanation: "区块链分叉指由于共识分歧或协议升级，区块链网络分裂成两条独立的链"
    },
    {
        id: 78,
        type: "fill",
        title: "UTXO模型",
        content: `<div class="p-4 font-mono text-sm">
            <div>UTXO模型中，"UTXO"代表<span class="code-blank" data-id="78" data-answer="未花费的交易输出"></span></div>
        </div>`,
        instruction: "填写UTXO的全称",
        hint: "与未使用的交易部分有关",
        explanation: "UTXO（Unspent Transaction Output）指未花费的交易输出，是比特币等加密货币的记账模型"
    },
    {
        id: 79,
        type: "select",
        title: "账户模型vs UTXO",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪项是账户模型与UTXO模型的主要区别？</p>
        </div>`,
        options: [
            "账户模型记录余额，UTXO模型追踪交易输出",
            "账户模型更安全，UTXO模型更高效",
            "账户模型用于公有链，UTXO模型用于私有链",
            "账户模型支持智能合约，UTXO模型不支持"
        ],
        correct: 0,
        explanation: "账户模型直接记录账户余额，类似银行账户；UTXO模型追踪每笔交易的未花费输出，不直接记录余额"
    },
    {
        id: 80,
        type: "fill",
        title: "P2P网络",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链网络通常采用<span class="code-blank" data-id="80" data-answer="点对点"></span>网络结构，节点之间直接通信</div>
        </div>`,
        instruction: "填写区块链网络的典型网络结构类型",
        hint: "P2P网络的中文名称",
        explanation: "区块链网络采用点对点（P2P）结构，每个节点既是客户端也是服务器，没有中心服务器"
    },
    {
        id: 81,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项关于节点的描述错误</span></div>
            <div>节点是区块链网络的参与者</div>
            <div>节点负责验证和转发交易</div>
            <div>只有区块链必须运行全节点才能使用</div>
            <div>全节点存储完整的区块链数据</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "使用区块链必须运行全节点才能使用",
        hint: "普通用户都需要运行全节点吗？",
        explanation: "使用区块链不一定要运行全节点，用户可以通过轻节点或第三方服务访问区块链网络"
    },
    {
        id: 82,
        type: "select",
        title: "权益证明",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">权益证明（PoS）的核心思想是什么？</p>
        </div>`,
        options: [
            "计算能力越强，验证权越大",
            "持有代币越多，验证权越大",
            "加入网络时间越长，验证权越大",
            "节点性能越好，验证权越大"
        ],
        correct: 1,
        explanation: "权益证明（PoS）中，节点验证交易的权利与持有代币的数量（权益）成正比"
    },
    {
        id: 83,
        type: "fill",
        title: "智能合约平台",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="code-blank" data-id="83" data-answer="以太坊"></span>是最著名的支持智能合约的区块链平台之一</div>
        </div>`,
        instruction: "填写最著名的智能合约合约平台名称",
        hint: "第一个支持智能合约的主流区块链平台",
        explanation: "以太坊是第一个支持智能合约的主流区块链平台，开创了在区块链上运行代码的先河"
    },
    {
        id: 84,
        type: "select",
        title: "跨链技术",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">跨链技术的主要目的是什么？</p>
        </div>`,
        options: [
            "提高单个区块链的安全性",
            "实现不同区块链之间的资产转移和数据交互",
            "降低区块链的能耗",
            "增加区块链的交易吞吐量"
        ],
        correct: 1,
        explanation: "跨链技术旨在解决不同区块链网络之间的互联互通问题，实现资产和数据的跨链转移"
    },
    {
        id: 85,
        type: "fill",
        title: "预言机作用",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链预言机的作用是将<span class="code-blank" data-id="85" data-answer="链外数据"></span>引入区块链网络</div>
        </div>`,
        instruction: "填写预言机引入的数据类型",
        hint: "来自区块链外部的数据",
        explanation: "预言机是连接区块链与现实世界的桥梁，将链外数据（如价格、天气等）安全地引入区块链"
    },
    {
        id: 86,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项关于挖矿的描述错误</span></div>
            <div>挖矿是验证交易并创建新区块的过程</div>
            <div>挖矿需要消耗大量计算资源</div>
            <div>所有区块链都需要挖矿</div>
            <div>成功挖矿通常会获得代币奖励</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "所有区块链都需要挖矿",
        hint: "哪些共识机制不需要挖矿？",
        explanation: "并非所有区块链都需要挖矿，只有采用工作量证明（PoW）等共识机制的区块链才需要挖矿"
    },
    {
        id: 87,
        type: "select",
        title: "51%攻击",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">51%攻击是指什么？</p>
        </div>`,
        options: [
            "黑客控制了51%的用户账户",
            "攻击者控制了网络中51%以上的算力",
            "51%的节点同时离线",
            "区块链数据丢失了51%"
        ],
        correct: 1,
        explanation: "51%攻击指攻击者控制了区块链网络中51%以上的算力，能够篡改交易历史"
    },
    {
        id: 88,
        type: "fill",
        title: "数字签名作用",
        content: `<div class="p-4 font-mono text-sm">
            <div>数字签名在区块链中用于验证交易的<span class="code-blank" data-id="88" data-answer="真实性和完整性"></span></div>
        </div>`,
        instruction: "填写数字签名在区块链中的主要作用",
        hint: "与交易的有效性和未被篡改有关",
        explanation: "数字签名确保区块链交易确实由发送者发起，且在传输过程中未被篡改"
    },
    {
        id: 89,
        type: "select",
        title: "代币类型",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪项不属于常见的区块链代币类型？</p>
        </div>`,
        options: [
            "原生代币（Native Token）",
            "ERC-20代币",
            "同质化代币（Fungible Token）",
            "智能代币（Smart Token）"
        ],
        correct: 3,
        explanation: "常见的代币类型包括原生代币、ERC-20代币、同质化代币和非同质化代币（NFT）等，没有智能代币这一标准类型"
    },
    {
        id: 90,
        type: "fill",
        title: "NFT特点",
        content: `<div class="p-4 font-mono text-sm">
            <p>NFT的主要特点是<span class="code-blank" data-id="90" data-answer="唯一性和不可分割性"></span></p>
        </div>`,
        instruction: "填写NFT的核心特点",
        hint: "与代币的独特性有关",
        explanation: "NFT（非同质化代币）具有唯一性和不可分割性，每个NFT都是独特的，不能像普通代币那样分割成更小单位"
    },
    {
        id: 91,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项关于区块链隐私的描述错误</span></div>
            <div>区块链默认提供完全的隐私保护</div>
            <div>隐私币使用特殊技术增强交易隐私</div>
            <div>链上分析可以追踪交易模式</div>
            <div>零知识证明可用于增强区块链隐私</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "区块链默认提供完全的隐私保护",
        hint: "区块链的透明性对隐私有什么影响？",
        explanation: "区块链默认是透明的，交易对所有人可见，需要特殊技术（如零知识证明）来增强隐私保护"
    },
    {
        id: 92,
        type: "select",
        title: "侧链技术",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">侧链技术的主要目的是什么？</p>
        </div>`,
        options: [
            "提高主链的安全性",
            "扩展区块链的功能和性能",
            "替代现有的主链",
            "降低区块链的去中心化程度"
        ],
        correct: 1,
        explanation: "侧链是连接到主链的并行区块链，旨在扩展主链的功能，提高交易吞吐量和降低成本"
    },
    {
        id: 93,
        type: "fill",
        title: "Gas作用",
        content: `<div class="p-4 font-mono text-sm">
            <div>Gas在区块链中用于衡量<span class="code-blank" data-id="93" data-answer="计算资源消耗"></span></div>
        </div>`,
        instruction: "填写Gas在区块链中的作用",
        hint: "与执行操作所需的资源有关",
        explanation: "Gas用于衡量区块链上执行操作（如交易、智能合约）所需的计算资源，防止恶意消耗资源"
    },
    {
        id: 94,
        type: "select",
        title: "Layer 2解决方案",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪项不属于Layer 2解决方案？</p>
        </div>`,
        options: [
            "状态通道（State Channels）",
            " Plasma",
            "权益证明（PoS）",
            "rollups"
        ],
        correct: 2,
        explanation: "Layer 2解决方案在主链之上构建，用于提高扩展性，包括状态通道、Plasma和rollups等，PoS是共识机制"
    },
    {
        id: 95,
        type: "fill",
        title: "创世区块",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链的第一个区块被称为<span class="code-blank" data-id="95" data-answer="创世区块"></span></div>
        </div>`,
        instruction: "填写区块链第一个区块的名称",
        hint: "与'创造'相关的术语",
        explanation: "创世区块是区块链的第一个区块，没有前序区块，是整个区块链的起点"
    },
    {
        id: 96,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项关于智能合约的描述错误</span></div>
            <div>智能合约自动执行预设条件</div>
            <div>智能合约一旦部署就无法修改</div>
            <div>智能合约永远不会有漏洞</div>
            <div>智能合约可用于自动执行金融协议</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "智能合约永远不会有漏洞",
        hint: "智能合约是否可能存在安全问题？",
        explanation: "智能合约由代码编写，可能存在漏洞和安全问题，历史上发生过多起智能合约漏洞导致的资产损失事件"
    },
    {
        id: 97,
        type: "select",
        title: "分布式账本",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">分布式账本与传统中心化账本的主要区别是什么？</p>
        </div>`,
        options: [
            "分布式账本存储容量更大",
            "分布式账本由多个节点共同维护",
            "分布式账本查询速度更快",
            "分布式账本只用于金融交易"
        ],
        correct: 1,
        explanation: "分布式账本由网络中的多个节点共同维护和存储，而传统账本通常由单一机构控制"
    },
    {
        id: 98,
        type: "fill",
        title: "双花问题",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链通过共识机制解决了数字资产的<span class="code-blank" data-id="98" data-answer="双重花费"></span>问题</div>
        </div>`,
        instruction: "填写区块链解决的一个核心问题",
        hint: "指同一笔钱被花两次的问题",
        explanation: "双重花费问题指数字资产可能被重复花费的问题，区块链通过共识机制和时间戳确保每笔交易唯一有效"
    },
    {
        id: 99,
        type: "select",
        title: "时间戳作用",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">区块链中时间戳的主要作用是什么？</p>
        </div>`,
        options: [
            "提高交易速度",
            "记录交易发生的时间，确保交易顺序",
            "加密交易数据",
            "验证用户身份"
        ],
        correct: 1,
        explanation: "时间戳为区块链上的每笔交易提供了准确的时间记录，确保交易按正确顺序处理，防止交易重放"
    },
    {
        id: 100,
        type: "fill",
        title: "区块链 scalability",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链的<span class="code-blank" data-id="100" data-answer="可扩展性"></span>指其处理更多交易和用户的能力</div>
        </div>`,
        instruction: "填写区块链处理增长需求的能力对应的中文术语",
        hint: "与系统扩展能力相关",
        explanation: "可扩展性是区块链的重要挑战之一，指区块链系统随着用户和交易量增长而有效扩展的能力"
    },
    {
        id: 101,
        type: "correct",
        title: "修正错误",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下哪项关于共识机制的描述错误</span></div>
            <div>共识机制确保区块链数据一致性</div>
            <div>不同区块链可以采用不同的共识机制</div>
            <div>共识机制只用于验证交易</div>
            <div>共识机制影响区块链的安全性和性能</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "共识机制只用于验证交易",
        hint: "共识机制还有其他作用吗？",
        explanation: "共识机制不仅用于验证交易，还用于决定新区块的创建、解决分叉等，是维持区块链一致性的核心"
    },
    {
        id: 102,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在Go语言中，哪个关键字用于创建goroutine？</p>
        </div>`,
        options: [
            "thread",
            "goroutine",
            "go",
            "async"
        ],
        correct: 2,
        explanation: "Go语言使用go关键字创建goroutine，这是一种轻量级的线程"
    },
    {
        id: 103,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div>Go语言中，<span class="code-blank" data-id="103" data-answer="channel"></span>用于在goroutine之间传递数据和同步操作</div>
        </div>`,
        instruction: "填写Go语言中用于goroutine间通信的机制名称",
        hint: "中文称为'通道'",
        explanation: "channel是Go语言中用于goroutine之间安全通信的机制，可以传递数据并实现同步"
    },
    {
        id: 104,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪个是无缓冲channel的特点？</p>
        </div>`,
        options: [
            "发送操作会立即返回",
            "发送和接收操作会相互阻塞直到完成",
            "可以存储多个元素在缓冲区中",
            "当缓冲区满时发送操作会阻塞"
        ],
        correct: 1,
        explanation: "无缓冲channel的发送和接收操作会相互等待，形成同步，发送方和接收方必须同时准备好才能完成操作"
    },
    {
        id: 105,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div>创建一个可以存储5个int类型元素的带缓冲channel：<span class="code-blank" data-id="105" data-answer="make(chan int, 5)"></span></div>
        </div>`,
        instruction: "填写创建带缓冲channel的代码",
        hint: "使用make函数，指定类型和缓冲区大小",
        explanation: "make(chan int, 5)创建了一个可以存储5个int元素的带缓冲channel"
    },
    {
        id: 106,
        type: "correct",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4"><span class="text-blue-600">go</span> printHello()</div>
            <div>}</div>
            <div></div>
            <div><span class="text-blue-600">func</span> printHello() {</div>
            <div class="ml-4">fmt.Println(<span class="text-red-600">"Hello"</span>)</div>
            <div>}</div>
        </div>`,
        instruction: "找出代码中的错误并修正（描述错误原因）",
        correct: "main函数可能在printHello执行前退出",
        hint: "主goroutine和子goroutine的执行顺序问题",
        explanation: "main函数作为主goroutine会在启动子goroutine后立即退出，需要添加同步机制等待子goroutine完成"
    },
    {
        id: 107,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">sync.WaitGroup的作用是什么？</p>
        </div>`,
        options: [
            "保护共享资源不被并发访问",
            "等待一组goroutine完成",
            "限制并发goroutine的数量",
            "实现goroutine间的消息传递"
        ],
        correct: 1,
        explanation: "sync.WaitGroup用于等待一组goroutine完成执行，主要方法有Add()、Done()和Wait()"
    },
    {
        id: 108,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">var</span> wg sync.WaitGroup</div>
            <div></div>
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">wg.Add(2)</div>
            <div class="ml-4"><span class="text-blue-600">go</span> task1()</div>
            <div class="ml-4"><span class="text-blue-600">go</span> task2()</div>
            <div class="ml-4"><span class="code-blank" data-id="108" data-answer="wg.Wait()"></span></div>
            <div>}</div>
        </div>`,
        instruction: "填写代码中缺少的等待所有goroutine完成的语句",
        hint: "使用WaitGroup的等待方法",
        explanation: "wg.Wait()会阻塞当前goroutine，直到WaitGroup的计数器减为0"
    },
    {
        id: 109,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪个方法用于减少sync.WaitGroup的计数器？</p>
        </div>`,
        options: [
            "wg.Dec()",
            "wg.Done()",
            "wg.Sub()",
            "wg.Minus()"
        ],
        correct: 1,
        explanation: "sync.WaitGroup的Done()方法用于将计数器减1，通常在goroutine结束时调用"
    },
    {
        id: 110,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> task() {</div>
            <div class="ml-4"><span class="text-blue-600">defer</span> <span class="code-blank" data-id="110" data-answer="wg.Done()"></span></div>
            <div class="ml-4"><span class="comment">// 任务处理逻辑</span></div>
            <div>}</div>
        </div>`,
        instruction: "填写在任务函数结束时通知WaitGroup的语句",
        hint: "使用defer确保执行，调用Done()方法",
        explanation: "defer wg.Done()确保在task函数退出时调用wg.Done()，减少WaitGroup计数器"
    },
    {
        id: 111,
        type: "correct",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">var</span> wg sync.WaitGroup</div>
            <div></div>
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4"><span class="text-blue-600">for</span> i := 0; i < 5; i++ {</div>
            <div class="ml-8">wg.Add(1)</div>
            <div class="ml-8"><span class="text-blue-600">go</span> <span class="text-red-600">func()</span> {</div>
            <div class="ml-12"><span class="text-blue-600">defer</span> wg.Done()</div>
            <div class="ml-12">fmt.Println(i)</div>
            <div class="ml-8">}()</div>
            <div class="ml-4">}</div>
            <div class="ml-4">wg.Wait()</div>
            <div>}</div>
        </div>`,
        instruction: "找出代码中的错误并修正（说明错误原因）",
        correct: "循环变量i被所有goroutine共享，需要作为参数传递",
        hint: "循环变量在goroutine中的捕获问题",
        explanation: "所有goroutine共享同一个循环变量i，当goroutine执行时i可能已经被修改，应将i作为参数传递给匿名函数"
    },
    {
        id: 112,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">sync.Mutex的作用是什么？</p>
        </div>`,
        options: [
            "实现goroutine间的消息传递",
            "等待多个goroutine完成",
            "保护共享资源，实现互斥访问",
            "限制goroutine的创建数量"
        ],
        correct: 2,
        explanation: "sync.Mutex是互斥锁，用于保护共享资源，确保同一时间只有一个goroutine可以访问"
    },
    {
        id: 113,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">var</span> mu sync.Mutex</div>
            <div><span class="text-blue-600">var</span> count <span class="text-purple-600">int</span></div>
            <div></div>
            <div><span class="text-blue-600">func</span> increment() {</div>
            <div class="ml-4"><span class="code-blank" data-id="113" data-answer="mu.Lock()"></span></div>
            <div class="ml-4"><span class="text-blue-600">defer</span> mu.Unlock()</div>
            <div class="ml-4">count++</div>
            <div>}</div>
        </div>`,
        instruction: "填写获取互斥锁的语句",
        hint: "使用Mutex的Lock方法",
        explanation: "mu.Lock()获取互斥锁，确保同一时间只有一个goroutine可以执行count++操作"
    },
    {
        id: 114,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">关于sync.RWMutex，以下描述正确的是？</p>
        </div>`,
        options: [
            "只允许一个goroutine同时读取",
            "允许多个goroutine同时读取，但写入时需要独占",
            "与sync.Mutex功能完全相同",
            "不支持写操作的锁定"
        ],
        correct: 1,
        explanation: "sync.RWMutex是读写锁，允许多个goroutine同时获取读锁，但写锁是独占的，适用于读多写少的场景"
    },
    {
        id: 115,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">var</span> rwmu sync.RWMutex</div>
            <div><span class="text-blue-600">var</span> data <span class="text-purple-600">map</span>[string]int</div>
            <div></div>
            <div><span class="text-blue-600">func</span> getData(key string) int {</div>
            <div class="ml-4"><span class="code-blank" data-id="115" data-answer="rwmu.RLock()"></span></div>
            <div class="ml-4"><span class="text-blue-600">defer</span> rwmu.RUnlock()</div>
            <div class="ml-4"><span class="text-blue-600">return</span> data[key]</div>
            <div>}</div>
        </div>`,
        instruction: "填写获取读锁的语句",
        hint: "使用RWMutex的读锁定方法",
        explanation: "rwmu.RLock()获取读锁，允许多个goroutine同时读取数据"
    },
    {
        id: 116,
        type: "correct",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">var</span> mu sync.Mutex</div>
            <div><span class="text-blue-600">var</span> value <span class="text-purple-600">int</span></div>
            <div></div>
            <div><span class="text-blue-600">func</span> setValue(v int) {</div>
            <div class="ml-4">mu.Lock()</div>
            <div class="ml-4">value = v</div>
            <div class="ml-4"><span class="comment">// 缺少解锁操作</span></div>
            <div>}</div>
        </div>`,
        instruction: "找出代码中的错误并修正（写出修正后的代码）",
        correct: "添加defer mu.Unlock()",
        hint: "锁定后必须解锁，否则会导致死锁",
        explanation: "代码中只调用了mu.Lock()而没有解锁，会导致其他goroutine永久阻塞，应添加defer mu.Unlock()"
    },
    {
        id: 117,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪个函数可以用于从channel中接收数据并判断channel是否已关闭？</p>
        </div>`,
        options: [
            "recv(ch)",
            "ch.Receive()",
            "data, ok := <-ch",
            "read(ch)"
        ],
        correct: 2,
        explanation: "使用data, ok := <-ch语法可以接收channel数据，当ok为false时表示channel已关闭"
    },
    {
        id: 118,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">ch := make(chan int)</div>
            <div class="ml-4"><span class="text-blue-600">go</span> <span class="text-blue-600">func</span>() {</div>
            <div class="ml-8">ch <- 42</div>
            <div class="ml-8"><span class="code-blank" data-id="118" data-answer="close(ch)"></span></div>
            <div class="ml-4">}()</div>
            <div class="ml-4">fmt.Println(<-ch)</div>
            <div>}</div>
        </div>`,
        instruction: "填写关闭channel的语句",
        hint: "使用close函数",
        explanation: "close(ch)用于关闭channel，关闭后的channel不能再发送数据，但可以继续接收剩余数据"
    },
    {
        id: 119,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">关于select语句，以下描述错误的是？</p>
        </div>`,
        options: [
            "select可以同时等待多个channel操作",
            "select中的case必须是channel操作",
            "select语句至少需要一个default case",
            "当多个case就绪时，select会随机选择一个执行"
        ],
        correct: 2,
        explanation: "select语句可以没有default case，此时如果没有case就绪，select会阻塞"
    },
    {
        id: 120,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">ch1 := make(chan string)</div>
            <div class="ml-4">ch2 := make(chan string)</div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">go</span> sendData(ch1, <span class="text-red-600">"data1"</span>)</div>
            <div class="ml-4"><span class="text-blue-600">go</span> sendData(ch2, <span class="text-red-600">"data2"</span>)</div>
            <div></div>
            <div class="ml-4"><span class="code-blank" data-id="120" data-answer="select"></span> {</div>
            <div class="ml-8"><span class="text-blue-600">case</span> msg := <-ch1:</div>
            <div class="ml-12">fmt.Println(msg)</div>
            <div class="ml-8"><span class="text-blue-600">case</span> msg := <-ch2:</div>
            <div class="ml-12">fmt.Println(msg)</div>
            <div class="ml-4">}</div>
            <div>}</div>
        </div>`,
        instruction: "填写正确的关键字，实现同时等待两个channel",
        hint: "用于多路复用的关键字",
        explanation: "select语句用于多路复用，可以同时等待多个channel操作，哪个先就绪就执行哪个"
    },
    {
        id: 121,
        type: "correct",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">ch := make(chan int)</div>
            <div class="ml-4"><span class="text-blue-600">close</span>(ch)</div>
            <div class="ml-4">ch <- 100 <span class="comment">// 错误语句</span></div>
            <div>}</div>
        </div>`,
        instruction: "说明代码中的错误原因",
        correct: "向已关闭的channel发送数据会导致panic",
        hint: "关闭后的channel能否发送数据？",
        explanation: "channel关闭后不能再发送数据，尝试发送会导致panic，但可以继续接收剩余数据"
    },
    {
        id: 122,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">sync.Once的作用是什么？</p>
        </div>`,
        options: [
            "确保代码块只执行一次，即使在并发环境下",
            "延迟执行函数",
            "定时执行函数",
            "限制函数的执行时间"
        ],
        correct: 0,
        explanation: "sync.Once确保其Do()方法中的函数在程序生命周期内只执行一次，无论有多少goroutine调用"
    },
    {
        id: 123,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">var</span> once sync.Once</div>
            <div></div>
            <div><span class="text-blue-600">func</span> initResource() {</div>
            <div class="ml-4"><span class="comment">// 资源初始化逻辑</span></div>
            <div>}</div>
            <div></div>
            <div><span class="text-blue-600">func</span> useResource() {</div>
            <div class="ml-4"><span class="code-blank" data-id="123" data-answer="once.Do(initResource)"></span></div>
            <div class="ml-4"><span class="comment">// 使用资源</span></div>
            <div>}</div>
        </div>`,
        instruction: "填写确保initResource只执行一次的语句",
        hint: "使用sync.Once的Do方法",
        explanation: "once.Do(initResource)确保initResource函数无论被多少goroutine调用，都只会执行一次"
    },
    {
        id: 124,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪个方法可以用于设置goroutine的超时？</p>
        </div>`,
        options: [
            "time.Out()",
            "time.After()结合select",
            "goroutine.SetTimeout()",
            "context.SetDeadline()"
        ],
        correct: 1,
        explanation: "可以使用time.After()创建一个在指定时间后发送信号的channel，结合select实现超时控制"
    },
    {
        id: 125,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> doWork() <span class="text-purple-600">error</span> {</div>
            <div class="ml-4">ch := make(chan <span class="text-purple-600">error</span>)</div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">go</span> <span class="text-blue-600">func</span>() {</div>
            <div class="ml-8"><span class="comment">// 执行耗时操作</span></div>
            <div class="ml-8">ch <- nil</div>
            <div class="ml-4">}()</div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">select</span> {</div>
            <div class="ml-8"><span class="text-blue-600">case</span> err := <-ch:</div>
            <div class="ml-12"><span class="text-blue-600">return</span> err</div>
            <div class="ml-8"><span class="text-blue-600">case</span> <-<span class="code-blank" data-id="125" data-answer="time.After(5 * time.Second)"></span>:</div>
            <div class="ml-12"><span class="text-blue-600">return</span> fmt.Errorf(<span class="text-red-600">"timeout"</span>)</div>
            <div class="ml-4">}</div>
            <div>}</div>
        </div>`,
        instruction: "填写创建5秒后超时的channel",
        hint: "使用time.After函数",
        explanation: "time.After(5 * time.Second)创建一个channel，5秒后会发送一个时间值，结合select实现超时控制"
    },
    {
        id: 126,
        type: "correct",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">ch := make(chan int)</div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">go</span> <span class="text-blue-600">func</span>() {</div>
            <div class="ml-8"><span class="text-blue-600">for</span> {</div>
            <div class="ml-12">ch <- 1</div>
            <div class="ml-8">}</div>
            <div class="ml-4">}()</div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">select</span> {</div>
            <div class="ml-8"><span class="text-blue-600">case</span> <-ch:</div>
            <div class="ml-12">fmt.Println(<span class="text-red-600">"received"</span>)</div>
            <div class="ml-4">}</div>
            <div>}</div>
        </div>`,
        instruction: "分析代码可能存在的问题",
        correct: "goroutine会一直向channel发送数据导致泄漏",
        hint: "没有退出机制的循环会导致什么问题？",
        explanation: "匿名goroutine中的无限循环会一直向channel发送数据，主goroutine只接收一次就退出，导致goroutine泄漏"
    },
    {
        id: 127,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">context.Context的主要作用是什么？</p>
        </div>`,
        options: [
            "存储全局变量",
            "在goroutine之间传递取消信号和请求范围的值",
            "实现goroutine的同步等待",
            "保护共享资源的并发访问"
        ],
        correct: 1,
        explanation: "context.Context用于在goroutine之间传递取消信号、超时信息和请求范围的键值对，便于控制goroutine的生命周期"
    },
    {
        id: 128,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">ctx, cancel := <span class="code-blank" data-id="128" data-answer="context.WithCancel(context.Background())"></span></div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">go</span> worker(ctx)</div>
            <div></div>
            <div class="ml-4"><span class="comment">// 一段时间后取消</span></div>
            <div class="ml-4">time.Sleep(1 * time.Second)</div>
            <div class="ml-4">cancel()</div>
            <div>}</div>
        </div>`,
        instruction: "填写创建可取消context的语句",
        hint: "使用context.WithCancel函数",
        explanation: "context.WithCancel(context.Background())创建一个可取消的context，返回context和取消函数"
    },
    {
        id: 129,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪种情况会导致goroutine泄漏？</p>
        </div>`,
        options: [
            "goroutine正常执行完毕并退出",
            "goroutine进入无限循环且没有退出机制",
            "使用sync.WaitGroup等待goroutine完成",
            "通过channel向goroutine发送退出信号"
        ],
        correct: 1,
        explanation: "goroutine进入无限循环且没有外部可以触发的退出机制，会导致goroutine永久运行，造成资源泄漏"
    },
    {
        id: 130,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> worker(quit chan <span class="text-purple-600">struct</span>{}) {</div>
            <div class="ml-4"><span class="text-blue-600">for</span> {</div>
            <div class="ml-8"><span class="text-blue-600">select</span> {</div>
            <div class="ml-12"><span class="text-blue-600">case</span> <-quit:</div>
            <div class="ml-16"><span class="text-blue-600">return</span> <span class="comment">// 退出goroutine</span></div>
            <div class="ml-12"><span class="text-blue-600">default:</span></div>
            <div class="ml-16"><span class="comment">// 执行工作</span></div>
            <div class="ml-8">}</div>
            <div class="ml-4">}</div>
            <div>}</div>
            <div></div>
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">quit := make(chan <span class="text-purple-600">struct</span>{})</div>
            <div class="ml-4"><span class="text-blue-600">go</span> worker(quit)</div>
            <div></div>
            <div class="ml-4"><span class="comment">// 发送退出信号</span></div>
            <div class="ml-4"><span class="code-blank" data-id="130" data-answer="close(quit)"></span></div>
            <div>}</div>
        </div>`,
        instruction: "填写向worker发送退出信号的语句",
        hint: "可以通过关闭channel发送信号",
        explanation: "close(quit)关闭退出channel，worker中的<-quit操作会立即返回，使goroutine退出"
    },
    {
        id: 131,
        type: "correct",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">ch := make(chan int)</div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">go</span> <span class="text-blue-600">func</span>() {</div>
            <div class="ml-8">data := <-ch</div>
            <div class="ml-8">fmt.Println(data)</div>
            <div class="ml-4">}()</div>
            <div>}</div>
        </div>`,
        instruction: "分析代码可能存在的问题",
        correct: "主goroutine退出导致子goroutine被终止，可能无法执行",
        hint: "主goroutine和子goroutine的生命周期问题",
        explanation: "主goroutine在启动子goroutine后立即退出，子goroutine可能还没来得及执行就被终止，导致程序行为不确定"
    },
    {
        id: 132,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪个是控制并发数量的常用模式？</p>
        </div>`,
        options: [
            "使用带缓冲channel作为信号量",
            "使用无缓冲channel",
            "使用sync.Mutex",
            "使用sync.Once"
        ],
        correct: 0,
        explanation: "可以使用带缓冲channel作为信号量控制并发数量，缓冲区大小即为最大并发数，获取资源时从channel接收，释放时发送"
    },
    {
        id: 133,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4"><span class="comment">// 限制最大并发数为3</span></div>
            <div class="ml-4">sem := make(chan <span class="text-purple-600">struct</span>{}, <span class="code-blank" data-id="133" data-answer="3"></span>)</div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">for</span> i := 0; i < 10; i++ {</div>
            <div class="ml-8">sem <- struct{}{} <span class="comment">// 获取信号量</span></div>
            <div class="ml-8"><span class="text-blue-600">go</span> <span class="text-blue-600">func</span>(num int) {</div>
            <div class="ml-12"><span class="text-blue-600">defer</span> <span class="text-blue-600">func</span>() { <-sem }()</div>
            <div class="ml-12">process(num)</div>
            <div class="ml-8">}(i)</div>
            <div class="ml-4">}</div>
            <div>}</div>
        </div>`,
        instruction: "填写缓冲区大小，限制最大并发数为3",
        hint: "填写数字3",
        explanation: "带缓冲channel的缓冲区大小设为3，作为信号量可以限制同时运行的goroutine数量不超过3个"
    },
    {
        id: 134,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">关于原子操作（sync/atomic包），以下描述正确的是？</p>
        </div>`,
        options: [
            "原子操作比互斥锁性能低",
            "原子操作适用于复杂的临界区代码",
            "原子操作是不可分割的操作，不会被其他goroutine中断",
            "原子操作只能用于整数类型"
        ],
        correct: 2,
        explanation: "原子操作是不可分割的操作，在执行过程中不会被其他goroutine中断，适用于简单的计数器等场景，性能通常优于互斥锁"
    },
    {
        id: 135,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">import</span> <span class="text-red-600">"sync/atomic"</span></div>
            <div></div>
            <div><span class="text-blue-600">var</span> count int32</div>
            <div></div>
            <div><span class="text-blue-600">func</span> increment() {</div>
            <div class="ml-4"><span class="code-blank" data-id="135" data-answer="atomic.AddInt32(&count, 1)"></span></div>
            <div>}</div>
        </div>`,
        instruction: "填写使用原子操作实现count加1的语句",
        hint: "使用sync/atomic包的AddInt32函数",
        explanation: "atomic.AddInt32(&count, 1)以原子方式将count加1，确保并发安全"
    },
    {
        id: 136,
        type: "correct",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">ch := make(chan int, 1)</div>
            <div class="ml-4">ch <- 1</div>
            <div class="ml-4">ch <- 2 <span class="comment">// 错误语句</span></div>
            <div>}</div>
        </div>`,
        instruction: "说明代码中的错误原因",
        correct: "向缓冲区已满的channel发送数据会导致阻塞",
        hint: "带缓冲channel的缓冲区已满会发生什么？",
        explanation: "该channel缓冲区大小为1，已经存入一个元素，再次发送会导致阻塞，在main函数中会造成死锁"
    },
    {
        id: 137,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪个函数可以用于从channel中接收所有数据直到channel关闭？</p>
        </div>`,
        options: [
            "for data := range ch",
            "for { <-ch }",
            "channel.ReceiveAll()",
            "readAll(ch)"
        ],
        correct: 0,
        explanation: "使用for data := range ch语法可以循环接收channel中的数据，直到channel被关闭且所有数据都被接收"
    },
    {
        id: 138,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">ch := make(chan int)</div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">go</span> <span class="text-blue-600">func</span>() {</div>
            <div class="ml-8"><span class="text-blue-600">for</span> i := 0; i < 5; i++ {</div>
            <div class="ml-12">ch <- i</div>
            <div class="ml-8">}</div>
            <div class="ml-8">close(ch)</div>
            <div class="ml-4">}()</div>
            <div></div>
            <div class="ml-4"><span class="code-blank" data-id="138" data-answer="for data := range ch"></span> {</div>
            <div class="ml-8">fmt.Println(data)</div>
            <div class="ml-4">}</div>
            <div>}</div>
        </div>`,
        instruction: "填写循环接收channel中所有数据的语句",
        hint: "使用range关键字",
        explanation: "for data := range ch循环会接收channel中的所有数据，直到channel被关闭"
    },
    {
        id: 139,
        type: "select",
        title: "go并发编程",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">关于goroutine和操作系统线程的区别，以下描述正确的是？</p>
        </div>`,
        options: [
            "goroutine比线程消耗更多内存",
            "goroutine是由Go运行时调度的，而不是操作系统",
            "一个进程中最多只能创建1000个goroutine",
            "goroutine不能运行在多个CPU核心上"
        ],
        correct: 1,
        explanation: "goroutine是由Go运行时（runtime）负责调度的用户级线程，比操作系统线程更轻量，调度开销更小"
    },
    {
        id: 140,
        type: "fill",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4">ctx, cancel := context.WithTimeout(context.Background(), <span class="code-blank" data-id="140" data-answer="3 * time.Second"></span>)</div>
            <div class="ml-4"><span class="text-blue-600">defer</span> cancel()</div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">go</span> longRunningTask(ctx)</div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600"><-</span>ctx.Done()</div>
            <div class="ml-4">fmt.Println(ctx.Err())</div>
            <div>}</div>
        </div>`,
        instruction: "填写设置3秒超时的语句",
        hint: "使用time.Second作为时间单位",
        explanation: "context.WithTimeout的第二个参数设置为3 * time.Second，创建一个3秒后自动取消的context"
    },
    {
        id: 141,
        type: "correct",
        title: "go并发编程",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="text-blue-600">func</span> main() {</div>
            <div class="ml-4"><span class="text-blue-600">var</span> mu sync.Mutex</div>
            <div class="ml-4"><span class="text-blue-600">var</span> count <span class="text-purple-600">int</span></div>
            <div></div>
            <div class="ml-4"><span class="text-blue-600">for</span> i := 0; i < 1000; i++ {</div>
            <div class="ml-8"><span class="text-blue-600">go</span> <span class="text-blue-600">func</span>() {</div>
            <div class="ml-12">mu.Lock()</div>
            <div class="ml-12">count++</div>
            <div class="ml-8">}()</div>
            <div class="ml-4">}</div>
            <div></div>
            <div class="ml-4">time.Sleep(time.Second)</div>
            <div class="ml-4">fmt.Println(count)</div>
            <div>}</div>
        </div>`,
        instruction: "分析代码可能存在的问题",
        correct: "没有解锁操作，会导致死锁",
        hint: "锁定后必须执行对应的解锁操作",
        explanation: "代码中只调用了mu.Lock()而没有调用mu.Unlock()，会导致所有goroutine都阻塞在获取锁的操作上，造成死锁"
    },
{
        id: 142,
        type: "select",
        title: "GMP",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在Go语言的GMP模型中，G代表什么？</p>
        </div>`,
        options: [
            "操作系统线程",
            "协程（Goroutine）",
            "调度器",
            "处理器"
        ],
        correct: 1,
        explanation: "GMP模型中，G是Goroutine的缩写，代表协程，是Go语言中的轻量级线程"
    },
    {
        id: 143,
        type: "select",
        title: "GMP",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在Go语言的GMP模型中，M代表什么？</p>
        </div>`,
        options: [
            "协程（Goroutine）",
            "机器（Machine）",
            "操作系统线程",
            "调度器"
        ],
        correct: 2,
        explanation: "GMP模型中，M是Machine的缩写，代表操作系统线程，是实际执行代码的实体"
    },
    {
        id: 144,
        type: "select",
        title: "GMP",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在Go语言的GMP模型中，P代表什么？</p>
        </div>`,
        options: [
            "处理器（Processor）",
            "程序计数器",
            "优先级",
            "并行度"
        ],
        correct: 0,
        explanation: "GMP模型中，P是Processor的缩写，代表逻辑处理器，用于管理G和关联M，是G运行的资源载体"
    },
    {
        id: 145,
        type: "fill",
        title: "GMP",
        content: `<div class="p-4 font-mono text-sm">
            <div>在GMP模型中，P的数量默认等于<span class="code-blank" data-id="145" data-answer="CPU核心数"></span></div>
        </div>`,
        instruction: "填写P的默认数量依据",
        hint: "与硬件核心数量相关",
        explanation: "Go语言中P的默认数量等于CPU核心数，可以通过GOMAXPROCS环境变量或runtime.GOMAXPROCS()函数修改"
    },
    {
        id: 146,
        type: "select",
        title: "GMP",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下关于GMP调度的描述，正确的是？</p>
        </div>`,
        options: [
            "一个M可以绑定多个P",
            "一个P在同一时间只能绑定一个M",
            "G只能在创建它的M上运行",
            "P的数量越多程序性能一定越好"
        ],
        correct: 1,
        explanation: "GMP模型中，一个P在同一时间只能绑定一个M，形成一个有效的执行单元；而一个M可以在不同时间绑定不同的P"
    },
    {
        id: 147,
        type: "fill",
        title: "GMP",
        content: `<div class="p-4 font-mono text-sm">
            <div>当G发生阻塞操作时，M会与P<span class="code-blank" data-id="147" data-answer="分离"></span>，P会寻找其他空闲的M继续执行其他G</div>
        </div>`,
        instruction: "填写G阻塞时M与P的关系变化",
        hint: "表示两者不再关联的动作",
        explanation: "当G执行阻塞操作时，M会与P分离，P会快速找到另一个空闲的M来运行队列中的其他G，提高资源利用率"
    },
    {
        id: 148,
        type: "select",
        title: "GMP",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">Go语言中的全局运行队列（Global Run Queue）存储的是什么？</p>
        </div>`,
        options: [
            "所有处于阻塞状态的G",
            "刚创建的G或从本地队列迁移过来的G",
            "正在运行的G",
            "已经执行完成的G"
        ],
        correct: 1,
        explanation: "全局运行队列存储新创建的G或从本地队列迁移过来的G，P会定期从全局队列中获取G到本地队列"
    },
    {
        id: 149,
        type: "correct",
        title: "GMP",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下关于工作窃取的描述错误</span></div>
            <div>工作窃取是指当一个P的本地队列没有G时</div>
            <div>从其他P的本地队列窃取G来执行</div>
            <div>只能从全局队列获取G，不能从其他P窃取</div>
            <div>用于平衡各P的工作负载</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "只能从全局队列获取G，不能从其他P窃取",
        hint: "工作窃取的核心机制是什么？",
        explanation: "工作窃取是GMP调度的重要机制，当一个P的本地队列空了，会从其他P的本地队列窃取G来执行，以平衡负载"
    },
    {
        id: 150,
        type: "fill",
        title: "GMP",
        content: `<div class="p-4 font-mono text-sm">
            <div>函数runtime.GOMAXPROCS(n)用于设置<span class="code-blank" data-id="150" data-answer="P的最大数量"></span></div>
        </div>`,
        instruction: "填写runtime.GOMAXPROCS(n)函数的作用",
        hint: "与P的数量相关",
        explanation: "runtime.GOMAXPROCS(n)用于设置P的最大数量，即并发执行的最大线程数，直接影响Go程序的并行度"
    },
    {
        id: 151,
        type: "select",
        title: "GMP",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">以下哪种情况会触发Go调度器的抢占式调度？</p>
        </div>`,
        options: [
            "G执行时间过长（超过10ms）",
            "G正在执行计算密集型任务",
            "G处于阻塞状态",
            "G刚创建还未执行"
        ],
        correct: 0,
        explanation: "Go调度器会在G执行时间过长（约10ms）时触发抢占式调度，将其暂停并放入队列，让其他G有机会执行，防止单个G长期占用P"
    },
    {
        id: 152,
        type: "select",
        title: "面试注意",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">IT面试前，针对目标公司的“业务与技术栈调研”，以下哪项准备最关键？</p>
        </div>`,
        options: [
            "背诵公司成立时间、创始人等基础信息",
            "了解公司核心产品技术架构（如后端用Go/Java、前端用Vue/React）",
            "收集公司所有员工的公开社交账号",
            "记忆公司近3年的营收数据"
        ],
        correct: 1,
        explanation: "IT面试中，技术栈匹配度是核心评估点之一。了解目标公司核心产品的技术架构，能在沟通中体现“适配性”，比单纯背诵基础信息或非技术数据更有价值"
    },
    {
        id: 153,
        type: "fill",
        title: "面试注意",
        content: `<div class="p-4 font-mono text-sm">
            <div>IT面试现场回答技术问题时，若遇到“不会的知识点”，正确的做法是<span class="code-blank" data-id="153" data-answer="坦诚说明当前未掌握，并表达学习意愿"></span>，而非编造答案或沉默回避</div>
        </div>`,
        instruction: "填写面对不会的技术问题时的正确做法",
        hint: "核心是“诚实”与“主动”，避免欺骗性回答",
        explanation: "IT行业重视“技术诚信”，编造答案易被面试官识破（如追问细节时露馅）；坦诚说明未掌握并表达学习计划，反而能体现谦逊和成长意识"
    },
    {
        id: 154,
        type: "select",
        title: "面试注意",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">IT面试中，描述过往项目经历时，以下哪种表达最能体现技术能力？</p>
        </div>`,
        options: [
            "“我参与了公司的电商项目，负责部分开发工作”",
            "“我用Go语言实现了电商订单模块，优化后接口响应时间从200ms降至50ms，解决了高并发下的超时问题”",
            "“项目很复杂，我做了很多代码开发，最后顺利上线了”",
            "“我和团队一起完成了项目，大家配合得很好”"
        ],
        correct: 1,
        explanation: "技术面试中，项目描述需遵循“STAR原则”（场景-任务-行动-结果），选项2明确提及“技术栈（Go）、具体模块、量化成果（响应时间优化）、解决的问题”，能直观体现技术贡献，而非模糊的“参与”或“配合”"
    },
    {
        id: 155,
        type: "correct",
        title: "面试注意",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下关于IT面试“技术笔试/编程题”的做法，错误的是</span></div>
            <div>拿到题目后，先和面试官确认需求边界（如输入输出格式、异常场景）</div>
            <div>直接写代码，不用考虑注释和代码规范，节省时间</div>
            <div>遇到思路卡壳时，先在纸上画流程图或伪代码梳理逻辑</div>
            <div>代码完成后，主动检查边界情况（如空输入、极值）</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "直接写代码，不用考虑注释和代码规范，节省时间",
        hint: "IT开发中“代码可读性”是核心素养，面试中会重点考察",
        explanation: "IT面试的编程题不仅考察“能否实现功能”，更考察“工程化思维”——注释清晰、规范命名、处理异常，是程序员的基本素养；跳过规范直接写代码，会让面试官认为候选人缺乏团队协作意识（代码需他人维护）"
    },
    {
        id: 156,
        type: "fill",
        title: "面试注意",
        content: `<div class="p-4 font-mono text-sm">
            <div>IT面试结束前，向面试官提问时，应避免问<span class="code-blank" data-id="156" data-answer="“我这次面试能过吗？”“薪资能给多少？”（或其他仅关注个人利益、无技术/业务深度的问题）"></span>，优先问技术团队架构、项目难点等有价值的问题</div>
        </div>`,
        instruction: "填写面试结束前应避免的提问内容",
        hint: "避免“短期利益导向”或“让面试官无法回答”的问题",
        explanation: "面试结束前的提问是“展示主动性和关注点”的机会：问“技术团队架构”“项目难点”能体现对工作内容的重视；而“能否通过”“薪资多少”属于面试官无法即时回答的问题（需综合评估），且会显得候选人仅关注结果，而非工作本身"
    },
    {
        id: 157,
        type: "select",
        title: "面试注意",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">IT远程面试（如Zoom、腾讯会议）时，以下哪项准备最容易被忽略但至关重要？</p>
        </div>`,
        options: [
            "提前10分钟打开软件测试麦克风、摄像头",
            "准备好纸质笔记本记录问题",
            "穿正式的西装外套",
            "在背景中摆放公司LOGO相关物品"
        ],
        correct: 0,
        explanation: "远程面试中，“设备稳定性”直接影响沟通效率——麦克风无声、摄像头模糊会导致面试官无法正常获取信息，甚至中断面试；选项2（纸质笔记本）非必需（可用电竞本记录），选项3（西装）过度正式（IT面试更看重舒适得体），选项4（背景LOGO）无实际意义"
    },
    {
        id: 158,
        type: "select",
        title: "面试注意",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">当面试官问“你遇到过的技术难题是什么？如何解决的？”时，以下哪种回答逻辑最合理？</p>
        </div>`,
        options: [
            "“我遇到过数据库卡顿，后来换了个数据库就好了”",
            "“我遇到Redis缓存穿透问题：1. 先定位原因（大量空key请求）；2. 用布隆过滤器拦截空key；3. 最终将接口错误率从15%降至0.1%”",
            "“技术难题很多，但具体细节记不清了，反正最后都解决了”",
            "“我没遇到过太难的技术问题，团队里有资深同事会帮忙”"
        ],
        correct: 1,
        explanation: "该问题考察“问题解决能力”，需体现“分析过程-行动方案-量化结果”：选项2清晰说明“问题（缓存穿透）、原因定位、解决方案（布隆过滤器）、成果（错误率下降）”，完整展现技术思维；其他选项要么模糊（选项1未说明换数据库的原因）、要么回避（选项3/4），无法体现能力"
    },
    {
        id: 159,
        type: "correct",
        title: "面试注意",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下关于IT面试“简历内容”的注意事项，错误的是</span></div>
            <div>简历中技术栈需与目标岗位匹配（如应聘Go开发，重点写Go相关项目）</div>
            <div>用“熟练掌握所有编程语言”“精通分布式架构”等绝对化表述突出优势</div>
            <div>项目经历需标注自己的具体职责（如“独立负责支付模块”而非“参与项目”）</div>
            <div>附上GitHub地址（若有优质开源项目或demo），让面试官直观看到代码能力</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "用“熟练掌握所有编程语言”“精通分布式架构”等绝对化表述突出优势",
        hint: "IT技术领域“专精”比“全而不精”更受认可，绝对化表述易被追问打脸",
        explanation: "IT面试中，面试官会针对简历中的技术点深度追问（如“精通分布式”会问CAP理论、一致性算法），绝对化表述若无法支撑细节，会让面试官认为候选人“不务实”；反而用“熟练使用Go开发微服务”“了解Redis分布式锁实现”等精准表述，更显专业和诚实"
    },
    {
        id: 160,
        type: "fill",
        title: "面试注意",
        content: `<div class="p-4 font-mono text-sm">
            <div>IT面试后，建议在<span class="code-blank" data-id="160" data-answer="24小时内"></span>向面试官发送感谢信，内容可简要提及面试中的技术交流亮点，同时表达对岗位的持续兴趣</div>
        </div>`,
        instruction: "填写面试后发送感谢信的合理时间范围",
        hint: "需在面试官对面试者印象未淡化前发送，且避免当天深夜或次日过晚",
        explanation: "24小时内是面试后跟进的黄金时间：此时面试官对候选人记忆清晰，感谢信能强化正面印象；内容提及“技术交流亮点”（如“今天聊到的Go协程调度GMP模型很有收获”），能体现候选人的用心，而非模板化问候"
    },
    {
        id: 161,
        type: "select",
        title: "面试注意",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">当面试官问“你为什么离开上一家公司？”时，以下哪种回答最得体？</p>
        </div>`,
        options: [
            "“上一家公司加班太多，领导也不专业，氛围很差”",
            "“想寻求更大的技术成长空间，目标公司的微服务架构是我想深入学习的方向”",
            "“上一家公司薪资太低，希望新公司能给更高的工资”",
            "“上一家公司项目太简单，学不到东西，我想做更难的项目”"
        ],
        correct: 1,
        explanation: "回答离职原因需避免“抱怨前公司”（选项1）或“仅谈薪资”（选项3），核心是“展现正向动机”：选项2将离职原因与“技术成长”“目标公司优势”结合，既体现个人追求，也暗示对新公司的认可，让面试官认为候选人是“为了发展而来”，而非“为了逃避问题”"
    },
    {
        id: 165,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在设计联盟链的节点准入机制时，针对金融机构间的区块链网络，以下哪种方案最合适？</p>
        </div>`,
        options: [
            "完全开放，任何人可自由加入节点",
            "基于数字证书的准入机制，由联盟内权威机构颁发节点证书",
            "通过代币质押数量决定节点资格",
            "仅允许单一机构运行所有节点"
        ],
        correct: 1,
        explanation: "金融联盟链需要兼顾安全性和可控性，基于数字证书的准入机制可由联盟内机构共同管理身份认证，既保证节点身份可追溯，又符合金融监管要求"
    },
    {
        id: 166,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>在区块链转账场景中，当检测到双花攻击尝试时，节点应立即<span class="code-blank" data-id="166" data-answer="拒绝该交易并向全网广播攻击信息"></span>，以保护账本一致性</div>
        </div>`,
        instruction: "填写应对双花攻击尝试的处理措施",
        hint: "需要阻止异常交易并通知其他节点",
        explanation: "双花攻击会破坏区块链的一致性，节点检测到后应拒绝处理该交易，并向全网广播，使其他节点也能识别并拒绝，共同维护账本安全"
    },
    {
        id: 167,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">某物流企业计划用区块链追踪货物运输轨迹，以下哪个设计最合理？</p>
        </div>`,
        options: [
            "每5分钟自动记录一次货物位置到区块链",
            "在关键节点（如出库、中转、签收）由负责人签名上传状态到区块链",
            "仅记录最终签收状态，减少链上数据量",
            "让所有运输车辆实时向区块链推送GPS坐标"
        ],
        correct: 1,
        explanation: "物流轨迹追踪需在关键节点确保数据真实性，由负责人签名上传可保证责任可追溯，同时避免过多冗余数据。实时推送会导致链上数据爆炸，仅记录最终状态则失去追踪意义"
    },
    {
        id: 168,
        type: "correct",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下是设计区块链电子存证系统的做法，错误的是</span></div>
            <div>采用SHA-256哈希算法对存证内容生成唯一指纹</div>
            <div>将完整文件内容直接存储在区块链上以保证不可篡改</div>
            <div>记录存证时间戳和相关方数字签名</div>
            <div>提供链上哈希与文件的验证接口供用户核对</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "将完整文件内容直接存储在区块链上以保证不可篡改",
        hint: "区块链存储能力有限，需考虑存储效率",
        explanation: "区块链存储成本高、效率低，电子存证系统应仅存储文件哈希值而非完整内容，完整文件可存储在分布式存储系统中，通过链上哈希验证完整性"
    },
    {
        id: 169,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>在区块链智能合约开发中，当需要调用链外数据（如汇率信息）时，应通过<span class="code-blank" data-id="169" data-answer="预言机（Oracle）"></span>实现，以保证数据可靠性</div>
        </div>`,
        instruction: "填写链外数据接入的中间件名称",
        hint: "连接区块链与现实世界数据的桥梁",
        explanation: "预言机是区块链与链外世界的中间件，能安全地将外部数据引入智能合约，解决了区块链无法直接访问链外信息的问题，常见应用包括获取价格、天气等数据"
    },
    {
        id: 170,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">某跨境支付场景计划采用区块链技术，以下哪项是最核心的技术优势？</p>
        </div>`,
        options: [
            "交易速度比传统支付快10倍以上",
            "无需中心化机构背书，降低跨境结算成本",
            "交易数据完全公开透明，任何人可查看详细信息",
            "无需遵守各国金融监管政策"
        ],
        correct: 1,
        explanation: "跨境支付传统模式依赖多个中间机构，手续费高、周期长。区块链可实现点对点交易，减少中间环节，降低成本，这是其核心优势。交易速度并非绝对更快，且区块链支付仍需遵守监管"
    },
    {
        id: 171,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">设计NFT数字艺术品交易平台时，智能合约需重点实现哪些功能？</p>
        </div>`,
        options: [
            "自动生成随机艺术品、批量铸造同质化代币",
            "代币转账、余额查询、自动分红",
            "唯一标识生成、所有权转移、创作者版税自动分配",
            "高并发处理、实时价格更新、杠杆交易"
        ],
        correct: 2,
        explanation: "NFT的核心是唯一性和所有权证明，智能合约需实现唯一标识（Token ID）、安全的所有权转移逻辑，以及支持创作者在二次交易中获得版税的机制，这是数字艺术品交易的关键需求"
    },
    {
        id: 172,
        type: "correct",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下是区块链供应链溯源系统的设计，错误的是</span></div>
            <div>每个参与方拥有独立的区块链账户，操作需签名确认</div>
            <div>商品从生产到销售的每个环节信息都上链存储</div>
            <div>为保护商业机密，参与方身份信息完全匿名处理</div>
            <div>提供链上数据查询接口，供消费者验证商品真伪</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "为保护商业机密，参与方身份信息完全匿名处理",
        explanation: "供应链系统需要责任可追溯，参与方身份应采用可控匿名（如通过数字证书关联真实身份但不公开），完全匿名会导致出现问题时无法追责，违背供应链溯源的初衷"
    },
    {
        id: 173,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>在区块链节点出现故障导致同步中断时，节点重启后应通过<span class="code-blank" data-id="173" data-answer="区块哈希链验证和缺失区块同步机制"></span>恢复数据一致性</div>
        </div>`,
        instruction: "填写节点故障恢复的核心机制",
        hint: "基于区块链的链式结构特性",
        explanation: "区块链节点恢复时，需通过哈希链验证已有区块的完整性，然后从其他节点同步缺失的区块，利用区块链的链式结构和哈希验证确保恢复后的数据与全网一致"
    },
    {
        id: 174,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">当区块链网络出现硬分叉时，作为节点开发者应采取哪些措施？</p>
        </div>`,
        options: [
            "立即关闭节点，等待分叉结束",
            "根据业务需求选择支持的链，升级节点软件并配置相应参数",
            "修改本地账本数据，使节点同时兼容两条链",
            "向全网广播反对分叉的声明"
        ],
        correct: 1,
        explanation: "硬分叉会产生两条不兼容的链，节点开发者应根据业务需求和社区共识选择支持的链，通过升级软件、配置正确的共识规则确保节点在选定的链上正常运行，维护业务连续性"
    },
    {
        id: 175,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在设计区块链节点的P2P网络模块时，以下哪种发现节点的方式最适合联盟链场景？</p>
        </div>`,
        options: [
            "完全去中心化的随机节点发现",
            "基于预置种子节点列表的发现机制",
            "通过DNS动态获取节点列表",
            "依赖第三方中心化服务发现节点"
        ],
        correct: 1,
        explanation: "联盟链需要可控的节点组成，预置种子节点列表可确保只有授权节点能加入网络，符合联盟链的权限管理要求，其他方式要么过于开放要么依赖中心化服务"
    },
    {
        id: 176,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>实现区块链交易的幂等性处理时，后端应通过<span class="code-blank" data-id="176" data-answer="交易唯一标识（如TxID）和状态标记"></span>避免重复处理同一笔交易</div>
        </div>`,
        instruction: "填写保证交易幂等性的核心机制",
        hint: "需要唯一标识和状态追踪",
        explanation: "区块链交易需确保即使重复提交也只会被处理一次，通过交易唯一标识（TxID）记录并标记处理状态，可有效防止重复执行，保证账本一致性"
    },
    {
        id: 177,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在开发区块链智能合约时，以下哪种做法能有效降低gas费用消耗？</p>
        </div>`,
        options: [
            "使用更复杂的数据结构提升代码可读性",
            "将链上数据存储量最大化以保证完整性",
            "优化循环逻辑，减少链上计算和存储操作",
            "增加不必要的事件日志输出方便调试"
        ],
        correct: 2,
        explanation: "Gas费用与合约执行的计算量和存储操作直接相关，优化循环、减少链上存储可显著降低消耗。复杂数据结构和冗余存储会增加gas成本，不符合合约开发最佳实践"
    },
    {
        id: 178,
        type: "correct",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下区块链共识算法实现的做法错误的是</span></div>
            <div>PoW算法中，验证节点需验证区块哈希是否满足难度要求</div>
            <div>PoS算法中，根据节点质押代币数量分配记账权</div>
            <div>DPoS算法中，由全体节点参与每个区块的验证过程</div>
            <div>PBFT算法中，通过多轮共识投票确保区块一致性</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "DPoS算法中，由全体节点参与每个区块的验证过程",
        explanation: "DPoS（委托权益证明）通过节点选举出少数代表节点负责区块生产和验证，而非全体节点参与，这样可提高共识效率，错误描述违背了DPoS的核心设计"
    },
    {
        id: 179,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链节点同步模块中，当处理分叉链时，应遵循<span class="code-blank" data-id="179" data-answer="最长链（或权重最高链）优先原则"></span>选择最终有效链</div>
        </div>`,
        instruction: "填写处理分叉链的核心原则",
        hint: "与链的长度或权重相关",
        explanation: "区块链通过最长链（如比特币）或权重最高链（如以太坊合并后的PoS链）原则解决分叉问题，确保全网节点最终收敛到同一账本状态，维护数据一致性"
    },
    {
        id: 180,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">设计区块链钱包后端服务时，以下哪种私钥存储方式最安全？</p>
        </div>`,
        options: [
            "明文存储在数据库中，方便快速访问",
            "加密后存储在服务器本地文件系统",
            "使用硬件安全模块（HSM）加密存储和管理",
            "存储在分布式缓存中提高访问性能"
        ],
        correct: 2,
        explanation: "硬件安全模块（HSM）提供物理级别的安全保护，可防止私钥被非法提取，是金融级区块链应用的首选方案。其他方式都存在软件层面被攻击的风险"
    },
    {
        id: 181,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在实现区块链跨链交易时，以下哪种方案更适合资产转移场景？</p>
        </div>`,
        options: [
            "公证人机制（Notary）",
            "侧链/中继链（Sidechain/Relay）",
            "哈希锁定（Hash-Locking）",
            "分布式私钥控制（Distributed Private Key Control）"
        ],
        correct: 1,
        explanation: "侧链/中继链方案通过资产锚定机制实现跨链转移，支持双向兑换，适合资产转移场景。公证人机制依赖第三方，哈希锁定更适合原子交换，分布式私钥控制安全性要求极高"
    },
    {
        id: 182,
        type: "correct",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下区块链日志系统设计错误的是</span></div>
            <div>记录所有节点间的P2P通信内容便于问题排查</div>
            <div>对敏感操作（如私钥使用）进行脱敏处理</div>
            <div>采用分布式日志收集系统汇总各节点日志</div>
            <div>设置日志轮转策略防止磁盘空间耗尽</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "记录所有节点间的P2P通信内容便于问题排查",
        explanation: "区块链节点间通信包含大量敏感信息（如交易细节），记录所有通信内容会带来安全风险和存储压力，应仅记录关键操作日志，而非完整通信内容"
    },
    {
        id: 183,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链智能合约升级时，为避免数据丢失，后端通常采用<span class="code-blank" data-id="183" data-answer="代理合约模式（Proxy Pattern）"></span>，将逻辑与数据存储分离</div>
        </div>`,
        instruction: "填写智能合约升级的常用模式",
        hint: "一种将逻辑和数据分离的设计模式",
        explanation: "代理合约模式通过代理合约持有数据，逻辑合约可单独升级，调用时通过代理转发，既实现了合约升级又保留了原有数据，是主流的合约升级方案"
    },
    {
        id: 184,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">设计区块链浏览器后端API时，以下哪种优化措施最有效？</p>
        </div>`,
        options: [
            "直接从区块链节点实时查询所有数据",
            "建立链下索引数据库存储区块和交易信息",
            "限制API调用频率为每秒1次",
            "仅返回最新10个区块的数据"
        ],
        correct: 1,
        explanation: "区块链节点不适合高频查询，建立链下索引数据库（如MySQL、Elasticsearch）可大幅提升查询性能，支持复杂条件检索，是区块链浏览器的标准实现方案"
    },
    {
        id: 185,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在区块链节点性能优化中，针对区块验证瓶颈，以下哪种方法最有效？</p>
        </div>`,
        options: [
            "增加节点内存容量",
            "并行验证区块中的交易",
            "减少区块大小限制",
            "降低共识算法难度"
        ],
        correct: 1,
        explanation: "区块验证的主要开销在于交易合法性检查，在保证顺序性的前提下并行验证交易可显著提升性能。增加内存效果有限，减少区块大小会降低吞吐量，降低难度影响安全性"
    },
    {
        id: 186,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>实现区块链的权限管理系统时，后端应采用<span class="code-blank" data-id="186" data-answer="基于角色的访问控制（RBAC）与属性基访问控制（ABAC）结合"></span>的机制，细粒度控制节点操作权限</div>
        </div>`,
        instruction: "填写区块链权限管理的常用机制",
        hint: "结合角色和属性的控制方式",
        explanation: "区块链权限管理需要灵活且细粒度的控制，RBAC按角色分配权限，ABAC基于属性动态判断权限，两者结合可满足复杂场景需求，如联盟链中的多机构权限管理"
    },
    {
        id: 187,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在处理区块链大交易量时，以下哪种扩容方案属于链上扩容？</p>
        </div>`,
        options: [
            "状态通道（State Channels）",
            "分片（Sharding）",
            "侧链（Sidechains）",
            "等离子体（Plasma）"
        ],
        correct: 1,
        explanation: "分片是链上扩容方案，将区块链数据分成多个并行处理的分片，每个分片处理部分交易。其他选项均为链下扩容方案，通过将交易移至主链外处理实现扩容"
    },
    {
        id: 188,
        type: "correct",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下区块链节点备份策略错误的是</span></div>
            <div>定期备份完整账本数据和私钥</div>
            <div>采用增量备份减少存储开销</div>
            <div>将备份数据仅存储在节点本地服务器</div>
            <div>定期测试备份恢复流程确保有效性</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "将备份数据仅存储在节点本地服务器",
        explanation: "区块链节点备份需采用异地多副本存储，仅存储在本地服务器存在单点故障风险（如硬件损坏、自然灾害），可能导致数据永久丢失，违背数据安全原则"
    },
    {
        id: 189,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链交易池（Mempool）设计中，当交易数量超过上限时，应根据<span class="code-blank" data-id="189" data-answer="交易手续费（Gas Price）高低"></span>进行优先级排序和淘汰</div>
        </div>`,
        instruction: "填写交易池淘汰策略的依据",
        hint: "与交易的经济激励相关",
        explanation: "交易池满时，通常优先保留手续费高的交易，这符合区块链的经济模型，激励用户支付合理费用以确保交易被优先处理，同时优化网络资源分配"
    },
    {
        id: 190,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在开发区块链智能合约的测试框架时，以下哪项是必须实现的功能？</p>
        </div>`,
        options: [
            "自动生成合约文档",
            "模拟不同gas限制下的合约执行",
            "自动优化合约代码",
            "集成第三方支付接口"
        ],
        correct: 1,
        explanation: "智能合约执行受gas限制影响，测试框架必须能模拟不同gas环境，确保合约在各种条件下都能正确执行或优雅失败。其他功能属于辅助功能，非必需"
    },
    {
        id: 191,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">设计区块链的链下数据存储方案时，以下哪种方式最适合存储大文件？</p>
        </div>`,
        options: [
            "IPFS分布式文件系统",
            "关系型数据库（如MySQL）",
            "区块链节点本地文件系统",
            "中心化云存储（如AWS S3）"
        ],
        correct: 0,
        explanation: "IPFS是分布式文件系统，适合存储大文件并与区块链配合使用（链上存储文件哈希，IPFS存储实际内容）。关系型数据库不适合大文件，本地存储和中心化存储不符合区块链的去中心化理念"
    },
    {
        id: 192,
        type: "correct",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下区块链节点监控指标设计错误的是</span></div>
            <div>监控节点连接的 peers 数量和网络延迟</div>
            <div>监控区块生成速度和交易确认时间</div>
            <div>监控节点私钥的使用频率</div>
            <div>监控内存和磁盘使用率等系统指标</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "监控节点私钥的使用频率",
        explanation: "私钥是高度敏感信息，不应被监控或记录使用频率，这会增加泄露风险。节点监控应关注网络状态、性能指标和系统资源，而非私钥相关信息"
    },
    {
        id: 193,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>实现区块链的隐私保护交易时，后端可采用<span class="code-blank" data-id="193" data-answer="零知识证明（Zero-Knowledge Proof）"></span>技术，在不泄露交易详情的情况下验证交易合法性</div>
        </div>`,
        instruction: "填写隐私保护交易的核心技术",
        hint: "一种无需泄露信息即可证明的技术",
        explanation: "零知识证明允许一方在不向另一方提供任何有用信息的情况下，证明某个论断是正确的，非常适合区块链隐私交易场景，如Zcash和以太坊的ZK-SNARKs应用"
    },
    {
        id: 194,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在区块链节点的共识模块中，处理恶意节点发送的无效区块时，应采取哪种措施？</p>
        </div>`,
        options: [
            "接受区块并转发给其他节点",
            "拒绝该区块并将恶意节点加入黑名单",
            "忽略该区块不做任何处理",
            "修改区块内容使其有效后再处理"
        ],
        correct: 1,
        explanation: "节点应验证每个区块的合法性，对无效区块直接拒绝并标记发送节点，防止恶意节点攻击网络。接受或修改无效区块会破坏账本一致性，忽略则可能允许攻击扩散"
    },
    {
        id: 195,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">设计区块链的账户系统时，以下哪种模型更适合高频交易场景？</p>
        </div>`,
        options: [
            "UTXO模型（未花费交易输出）",
            "账户余额模型（Account-Based）",
            "混合模型（UTXO+账户）",
            "哈希锁定模型"
        ],
        correct: 1,
        explanation: "账户余额模型直接维护账户余额，交易处理更简单高效，适合高频交易场景（如以太坊）。UTXO模型需要追踪所有未花费输出，在高频交易下效率较低"
    },
    {
        id: 196,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链节点的同步机制中，为快速同步历史数据，可采用<span class="code-blank" data-id="196" data-answer="快照同步（Snapshot Sync）"></span>，直接获取最新状态而非逐个同步区块</div>
        </div>`,
        instruction: "填写快速同步历史数据的方法",
        hint: "基于状态快照的同步方式",
        explanation: "快照同步通过获取区块链的最新状态快照（如账户余额、合约状态），跳过中间区块同步，大幅减少同步时间，特别适合新节点加入网络时的初始同步"
    },
    {
        id: 197,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在智能合约审计的后端自动化工具中，以下哪项是必须检测的风险？</p>
        </div>`,
        options: [
            "合约代码的注释完整性",
            "整数溢出/下溢漏洞",
            "变量命名规范",
            "代码缩进格式"
        ],
        correct: 1,
        explanation: "整数溢出/下溢是智能合约的严重安全漏洞，可能导致资产被盗或合约功能异常，是自动化审计工具必须检测的风险。其他选项属于代码规范问题，不涉及安全风险"
    },
    {
        id: 198,
        type: "correct",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下区块链P2P网络协议设计错误的是</span></div>
            <div>实现区块和交易的广播机制确保数据一致性</div>
            <div>对所有节点通信采用加密传输</div>
            <div>允许节点自由选择是否验证收到的区块</div>
            <div>实现节点身份认证防止恶意节点接入</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "允许节点自由选择是否验证收到的区块",
        explanation: "区块链节点必须验证所有收到的区块和交易，否则可能接受无效数据，破坏账本一致性。自由选择是否验证会导致网络中出现不一致的账本状态，违背区块链设计原则"
    },
    {
        id: 199,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链的智能合约事件处理中，后端服务应通过<span class="code-blank" data-id="199" data-answer="事件监听（Event Listener）和过滤机制"></span>捕获并处理合约触发的特定事件</div>
        </div>`,
        instruction: "填写处理智能合约事件的机制",
        hint: "包含监听和过滤两个方面",
        explanation: "智能合约事件是链上到链下的重要通信方式，后端通过监听特定事件签名并应用过滤条件（如参数值），可高效捕获需要处理的事件，实现链下业务逻辑触发"
    },
    {
        id: 200,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在设计区块链的链上治理机制时，以下哪种方案更适合去中心化自治组织（DAO）？</p>
        </div>`,
        options: [
            "由单一核心团队决定所有提案",
            "基于代币持有量的投票机制，按比例分配投票权",
            "随机选择节点进行决策",
            "不设置任何治理机制，完全自由发展"
        ],
        correct: 1,
        explanation: "DAO的核心是去中心化治理，基于代币持有量的投票机制让代币持有者参与决策，按比例分配投票权既体现权益又保证一定公平性，是主流DAO的治理方案"
    },
    {
        id: 201,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">区块链节点的存储优化中，针对历史数据访问频率低的特点，可采用哪种策略？</p>
        </div>`,
        options: [
            "删除所有历史数据只保留最新状态",
            "将历史数据迁移至冷存储，按需加载",
            "复制多份历史数据提高访问速度",
            "压缩所有数据至单一文件"
        ],
        correct: 1,
        explanation: "区块链需要完整历史数据但访问频率低，冷存储（如离线存储、低成本存储系统）可降低主节点存储压力，同时保持数据可访问性。删除历史数据会破坏区块链不可篡改特性"
    },
    {
        id: 202,
        type: "correct",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下区块链交易验证逻辑错误的是</span></div>
            <div>验证交易签名是否与发送者地址匹配</div>
            <div>验证发送者账户余额是否足够支付交易金额和手续费</div>
            <div>验证交易是否已被处理过（防重放）</div>
            <div>仅验证交易格式，不验证业务逻辑合法性</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "仅验证交易格式，不验证业务逻辑合法性",
        explanation: "区块链交易验证必须包括业务逻辑合法性（如智能合约调用的参数有效性、NFT所有权证明等），仅验证格式会导致无效或恶意交易被写入区块链，破坏系统安全性"
    },
    {
        id: 203,
        type: "fill",
        title: "区块链后端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>实现区块链的跨链数据查询时，后端可通过<span class="code-blank" data-id="203" data-answer="跨链中继（Cross-Chain Relayer）和数据验证机制"></span>安全获取其他链上的数据</div>
        </div>`,
        instruction: "填写跨链数据查询的核心机制",
        hint: "包含中继和验证两个部分",
        explanation: "跨链数据查询需要中继节点获取其他链的数据，并通过密码学验证确保数据真实性，防止中继节点提供虚假信息，这是跨链信息交互的基础"
    },
    {
        id: 204,
        type: "select",
        title: "区块链后端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在区块链节点的负载均衡设计中，以下哪种方案最适合联盟链环境？</p>
        </div>`,
        options: [
            "基于DNS轮询的简单负载均衡",
            "根据节点性能动态分配请求的智能负载均衡",
            "随机选择节点处理请求",
            "将所有请求路由到单一主节点"
        ],
        correct: 1,
        explanation: "联盟链节点性能可能存在差异，智能负载均衡可根据节点当前负载、历史性能动态分配请求，优化资源利用率和响应时间。其他方案要么过于简单要么存在单点故障风险"
    },
    {
        id: 205,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在开发区块链钱包前端时，以下哪种私钥处理方式最安全？</p>
        </div>`,
        options: [
            "将私钥存储在前端localStorage中",
            "仅在内存中处理私钥，不持久化存储",
            "加密后存储在服务器数据库",
            "明文显示在页面供用户复制"
        ],
        correct: 1,
        explanation: "区块链私钥应仅在前端内存中临时处理，使用后立即清除，不做任何持久化存储，这是防止私钥泄露的最安全方式。localStorage和服务器存储都存在被窃取风险"
    },
    {
        id: 206,
        type: "fill",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链DApp前端与智能合约交互时，需通过<span class="code-blank" data-id="206" data-answer="Web3.js或Ethers.js等库"></span>连接区块链节点，实现交易签名和合约调用</div>
        </div>`,
        instruction: "填写前端与智能合约交互的常用库",
        hint: "两个主流的JavaScript库",
        explanation: "Web3.js和Ethers.js是区块链前端开发的核心库，封装了与区块链节点通信的API，提供交易签名、合约调用等功能，简化了DApp与区块链的交互过程"
    },
    {
        id: 207,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在设计NFT市场前端时，以下哪种方式最适合展示NFT藏品的所有权信息？</p>
        </div>`,
        options: [
            "仅显示当前持有者的用户名",
            "显示NFT合约地址、Token ID及当前持有者钱包地址，并提供区块链浏览器查询链接",
            "隐藏所有地址信息，仅展示藏品图片",
            "显示NFT的历史交易价格列表"
        ],
        correct: 1,
        explanation: "NFT所有权基于区块链地址，前端应展示合约地址、Token ID（唯一标识）和持有者钱包地址，并提供区块链浏览器链接供用户验证，确保信息透明可查"
    },
    {
        id: 208,
        type: "correct",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下区块链交易前端处理错误的是</span></div>
            <div>交易发送前显示预估gas费用供用户确认</div>
            <div>提供交易撤销功能，允许用户取消已发送的交易</div>
            <div>显示交易哈希并提供区块链浏览器查询链接</div>
            <div>交易未确认前显示"处理中"状态</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "提供交易撤销功能，允许用户取消已发送的交易",
        explanation: "区块链交易一旦发送到网络，无法被撤销，这是由区块链的不可篡改性决定的。前端提供撤销功能会误导用户，正确做法是清晰说明交易的不可逆性"
    },
    {
        id: 209,
        type: "fill",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链前端处理用户钱包连接时，应通过<span class="code-blank" data-id="209" data-answer="WalletConnect或MetaMask等标准接口"></span>实现，支持多种钱包接入</div>
        </div>`,
        instruction: "填写钱包连接的标准接口方案",
        hint: "包含主流钱包协议和插件",
        explanation: "WalletConnect是跨平台钱包连接协议，MetaMask是主流浏览器插件钱包，通过这些标准接口可实现前端与多种钱包的兼容，提升用户体验"
    },
    {
        id: 210,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在区块链前端开发中，处理链上数据加载时，以下哪种用户体验设计最合理？</p>
        </div>`,
        options: [
            "加载时显示空白页面，完成后一次性展示所有数据",
            "使用骨架屏和加载动画，并显示'链上数据加载中...'提示",
            "不显示任何加载状态，让用户等待时以为页面卡住",
            "提前缓存所有可能的数据，占用大量浏览器内存"
        ],
        correct: 1,
        explanation: "链上数据加载通常较慢，骨架屏和加载动画可减少用户等待焦虑，明确的提示让用户了解当前状态，是区块链前端的最佳实践"
    },
    {
        id: 211,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">开发多链DApp前端时，以下哪种方式最适合切换不同区块链网络？</p>
        </div>`,
        options: [
            "为每个区块链开发独立的前端应用",
            "在同一页面提供网络选择下拉框，动态切换Web3 provider",
            "隐藏网络切换功能，自动选择第一个可用网络",
            "要求用户手动修改浏览器钱包的网络设置"
        ],
        correct: 1,
        explanation: "多链DApp前端应提供直观的网络切换界面，通过动态更换Web3 provider实现不同链的切换，无需用户离开应用或手动修改钱包设置，提升用户体验"
    },
    {
        id: 212,
        type: "correct",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下NFT mint前端流程设计错误的是</span></div>
            <div>显示mint价格和所需代币类型</div>
            <div>mint前验证用户钱包余额是否充足</div>
            <div>用户确认后直接发送交易，无需再次确认gas费用</div>
            <div>交易发送后显示交易哈希和状态追踪</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "用户确认后直接发送交易，无需再次确认gas费用",
        explanation: "NFT mint涉及gas费用，而gas价格可能实时波动，前端必须在发送交易前让用户确认最终的gas费用，避免用户因费用过高而产生不满，这是区块链交互的重要用户体验设计"
    },
    {
        id: 213,
        type: "fill",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链前端展示钱包地址时，为兼顾安全性和可读性，通常采用<span class="code-blank" data-id="213" data-answer="地址截断显示（如前6后4位）"></span>的方式，隐藏中间部分字符</div>
        </div>`,
        instruction: "填写钱包地址的展示方式",
        hint: "显示部分字符，隐藏中间部分",
        explanation: "区块链地址通常较长（如42位），完整显示既不美观也存在安全风险（如被拍照复制），采用前6后4位的截断显示方式，既能让用户识别自己的地址，又能保护隐私"
    },
    {
        id: 214,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在设计区块链交易确认页面时，以下哪项信息最需要突出显示？</p>
        </div>`,
        options: [
            "网站logo和品牌名称",
            "交易金额、接收地址、gas费用等关键信息",
            "网站使用条款和隐私政策链接",
            "其他用户的交易历史记录"
        ],
        correct: 1,
        explanation: "区块链交易不可逆，前端必须在确认页面清晰突出交易金额、接收地址、gas费用等关键信息，确保用户在最终确认前能核对所有细节，避免误操作"
    },
    {
        id: 215,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">开发区块链前端时，处理智能合约事件的最佳方式是？</p>
        </div>`,
        options: [
            "定期刷新页面重新获取所有事件",
            "使用WebSocket实时监听事件，并在前端动态更新UI",
            "仅在用户点击按钮时手动加载事件",
            "忽略事件处理，不展示实时数据"
        ],
        correct: 1,
        explanation: "智能合约事件需要实时展示（如交易确认、NFT转账），WebSocket可建立持久连接实时接收事件，前端据此动态更新UI，提供实时反馈，是最佳实践"
    },
    {
        id: 216,
        type: "fill",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链前端实现离线签名时，应在<span class="code-blank" data-id="216" data-answer="本地完成签名过程，仅将签名后的交易发送到网络"></span>，确保私钥不泄露</div>
        </div>`,
        instruction: "填写离线签名的核心实现方式",
        hint: "强调签名过程的本地化",
        explanation: "离线签名的关键是私钥始终留在本地，不在网络中传输，前端应在本地完成签名计算，仅将签名结果发送到区块链网络，最大限度降低私钥泄露风险"
    },
    {
        id: 217,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在区块链前端设计中，以下哪种方式最适合提示用户切换到正确的网络？</p>
        </div>`,
        options: [
            "静默切换用户的网络设置，不进行提示",
            "显示清晰的错误提示，并提供一键切换网络按钮",
            "仅在控制台输出错误信息，不影响用户界面",
            "关闭应用并显示网络错误页面"
        ],
        correct: 1,
        explanation: "当用户使用的区块链网络与DApp要求不符时，前端应明确提示并提供便捷的切换方式，减少用户操作成本，提升体验。静默切换侵犯用户知情权，其他方式不够友好"
    },
    {
        id: 218,
        type: "correct",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下区块链前端安全设计错误的是</span></div>
            <div>使用HTTPS加密所有网络通信</div>
            <div>对用户输入的合约地址进行校验，防止恶意地址</div>
            <div>在前端代码中硬编码API密钥和私钥</div>
            <div>实现交易参数的二次确认机制</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "在前端代码中硬编码API密钥和私钥",
        explanation: "前端代码（JavaScript）会被用户浏览器下载并解析，硬编码的密钥和私钥会被轻易提取，导致严重安全漏洞。敏感信息应放在后端，前端通过安全接口获取"
    },
    {
        id: 219,
        type: "fill",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链前端展示gas费用时，应提供<span class="code-blank" data-id="219" data-answer="快速、标准、缓慢等不同档位的选择"></span>，让用户根据需求选择交易确认速度</div>
        </div>`,
        instruction: "填写gas费用展示的最佳实践",
        hint: "提供不同速度选项",
        explanation: "不同用户对交易确认速度有不同需求（紧急交易愿意支付更高gas），前端提供多档位选择（对应不同gas价格），既满足用户需求又体现透明性"
    },
    {
        id: 220,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在开发区块链数据可视化前端时，以下哪种图表最适合展示代币价格与交易量的关系？</p>
        </div>`,
        options: [
            "折线图展示价格，柱状图叠加展示交易量",
            "饼图展示不同代币的占比",
            "散点图展示随机数据点",
            "雷达图展示多维度指标"
        ],
        correct: 0,
        explanation: "折线图适合展示价格随时间的变化趋势，柱状图适合展示同期交易量，两者叠加可直观呈现价格与交易量的关系，是区块链数据分析前端的常用可视化方式"
    },
    {
        id: 221,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">设计区块链钱包转账页面时，以下哪项功能最能防止用户误操作？</p>
        </div>`,
        options: [
            "自动填充常用接收地址",
            "接收地址输入后进行格式校验和风险提示",
            "隐藏转账金额输入框，默认转账全部余额",
            "不显示gas费用，自动选择最高费用"
        ],
        correct: 1,
        explanation: "区块链转账地址格式特殊且错误转账无法挽回，前端对地址进行格式校验（如以太坊地址的checksum校验）并提示风险（如陌生地址警告），可有效减少误操作"
    },
    {
        id: 222,
        type: "correct",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下NFT详情页前端设计错误的是</span></div>
            <div>展示NFT高清图片和详细属性</div>
            <div>显示当前所有者和历史交易记录</div>
            <div>提供"立即购买"按钮，无需确认价格直接交易</div>
            <div>链接到智能合约地址和区块链浏览器</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "提供'立即购买'按钮，无需确认价格直接交易",
        explanation: "NFT交易涉及金额较大且不可逆，前端必须在交易前让用户确认价格、gas费用等信息，直接购买的设计会增加误操作风险，损害用户利益"
    },
    {
        id: 223,
        type: "fill",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链前端处理交易失败时，应<span class="code-blank" data-id="223" data-answer="显示具体错误原因（如gas不足、余额不足）并提供解决方案"></span>，帮助用户解决问题</div>
        </div>`,
        instruction: "填写交易失败时的前端处理方式",
        hint: "需包含错误原因和解决方案",
        explanation: "区块链交易失败原因多样（gas不足、余额不足、合约报错等），前端应解析错误信息并提供明确指引（如'请增加gas费用重试'），而非仅显示'交易失败'的模糊提示"
    },
    {
        id: 224,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在区块链前端实现多语言支持时，以下哪种做法最适合加密货币相关术语？</p>
        </div>`,
        options: [
            "所有术语完全翻译为当地语言",
            "保留关键术语的英文原名（如Gas、NFT、Wallet），仅翻译解释文本",
            "创造全新的本地语言术语替代原有英文术语",
            "不提供多语言支持，仅使用英文"
        ],
        correct: 1,
        explanation: "区块链领域的许多术语（如Gas、NFT）已成为行业通用词汇，完全翻译可能导致混淆，保留英文原名并提供本地化解释是最佳实践，兼顾专业性和易懂性"
    },
    {
        id: 225,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">开发区块链移动端DApp时，以下哪种钱包集成方式最适合？</p>
        </div>`,
        options: [
            "在App内实现完整的钱包功能，包括私钥管理",
            "通过WalletConnect协议与独立钱包App通信",
            "要求用户手动输入私钥进行交易签名",
            "不集成钱包功能，仅展示区块链数据"
        ],
        correct: 1,
        explanation: "移动端DApp通过WalletConnect与独立钱包App通信，既避免了在App内管理私钥的安全风险，又能实现交易签名功能，是移动端区块链应用的标准集成方式"
    },
    {
        id: 226,
        type: "fill",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链前端实现交易历史查询时，应提供<span class="code-blank" data-id="226" data-answer="按时间、类型、金额等筛选条件"></span>，帮助用户快速找到目标交易</div>
        </div>`,
        instruction: "填写交易历史查询的优化功能",
        hint: "提供多种筛选方式",
        explanation: "用户交易历史可能较多，前端提供多维度筛选条件（时间范围、交易类型、金额区间等）可大幅提升查询效率，改善用户体验"
    },
    {
        id: 227,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在区块链前端设计中，以下哪种方式最适合引导新用户了解钱包连接流程？</p>
        </div>`,
        options: [
            "弹出详细的文字说明文档，要求用户阅读后关闭",
            "提供交互式引导， step-by-step 演示连接过程",
            "不提供引导，让用户自行探索",
            "自动连接第一个检测到的钱包，不询问用户"
        ],
        correct: 1,
        explanation: "区块链钱包连接对新用户可能较陌生，交互式分步引导可降低学习成本，通过实际操作演示帮助用户快速掌握流程，比纯文字说明更有效"
    },
    {
        id: 228,
        type: "correct",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下区块链前端性能优化错误的是</span></div>
            <div>缓存链上静态数据（如代币元数据）减少重复请求</div>
            <div>使用分页加载大量交易历史数据</div>
            <div>一次性加载所有区块数据到前端内存</div>
            <div>使用Web Worker处理复杂的链上数据计算</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "一次性加载所有区块数据到前端内存",
        explanation: "区块链数据量极大（尤其是公链），一次性加载所有数据会导致前端内存溢出、页面卡顿甚至崩溃，正确做法是分页加载或按需加载，仅获取当前需要的数据"
    },
    {
        id: 229,
        type: "fill",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链前端展示智能合约交互界面时，应<span class="code-blank" data-id="229" data-answer="清晰展示合约方法参数和含义，并提供输入验证"></span>，防止用户输入错误参数</div>
        </div>`,
        instruction: "填写智能合约交互界面的设计要点",
        hint: "强调参数展示和验证",
        explanation: "智能合约方法参数通常具有特定格式和含义，前端应清晰说明每个参数的用途并进行输入验证（如类型检查、范围限制），帮助用户正确调用合约，避免因参数错误导致交易失败"
    },
    {
        id: 230,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在设计区块链质押挖矿前端界面时，以下哪项信息最需要突出显示？</p>
        </div>`,
        options: [
            "平台的营销宣传语",
            "质押收益率、锁仓周期、风险提示",
            "其他用户的质押数量排名",
            "复杂的挖矿算法原理说明"
        ],
        correct: 1,
        explanation: "质押挖矿用户最关心实际收益和风险，前端应突出显示收益率、锁仓周期等关键信息，并明确提示风险（如智能合约风险、市场风险），帮助用户做出决策"
    },
    {
        id: 231,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">区块链前端实现深色模式时，以下哪种设计最适合展示链上数据？</p>
        </div>`,
        options: [
            "使用高对比度颜色区分不同状态的交易（如绿色表示成功，红色表示失败）",
            "所有文本使用相同颜色，不区分状态",
            "采用低饱和度颜色，降低视觉冲击力",
            "完全反转亮色模式的所有颜色"
        ],
        correct: 0,
        explanation: "深色模式下，保持关键数据的高对比度（如交易状态、金额）可提升可读性，帮助用户快速识别重要信息，是区块链数据展示的实用设计原则"
    },
    {
        id: 232,
        type: "correct",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下区块链前端错误处理设计错误的是</span></div>
            <div>将链上错误代码转换为用户易懂的提示信息</div>
            <p>当钱包未安装时，提供钱包下载链接</p>
            <div>交易失败时，仅显示错误代码而不解释原因</div>
            <div>网络连接中断时，显示重试按钮</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "交易失败时，仅显示错误代码而不解释原因",
        explanation: "区块链错误代码（如以太坊的revert reason）对普通用户难以理解，前端应将其转换为易懂的自然语言解释（如'余额不足'），并提供解决方案，仅显示代码会让用户无法解决问题"
    },
    {
        id: 233,
        type: "fill",
        title: "区块链前端场景",
        content: `<div class="p-4 font-mono text-sm">
            <div>区块链前端实现代币余额展示时，应同时显示<span class="code-blank" data-id="233" data-answer="代币符号、余额数量和法币价值（可选）"></span>，满足用户不同需求</div>
        </div>`,
        instruction: "填写代币余额展示的核心要素",
        hint: "包括标识、数量和价值",
        explanation: "用户需要知道代币类型（符号）、具体数量，部分用户还关心法币价值，前端综合展示这些信息可满足不同用户需求，提升体验"
    },
    {
        id: 234,
        type: "select",
        title: "区块链前端场景",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在区块链前端开发中，以下哪种方式最适合实现响应式设计适配不同设备？</p>
        </div>`,
        options: [
            "为手机、平板、桌面分别开发三个独立前端",
            "使用CSS媒体查询和弹性布局，一套代码适配多设备",
            "优先开发桌面版，移动版仅缩放显示",
            "忽略移动设备，仅支持桌面浏览器"
        ],
        correct: 1,
        explanation: "区块链应用需要覆盖多设备用户，使用响应式设计（媒体查询、弹性布局）可实现一套代码适配不同屏幕尺寸，降低维护成本，提供一致的用户体验"
    },
    {
        id: 235,
        type: "select",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在React项目中集成MetaMask钱包，以下哪种方式最适合管理钱包连接状态？</p>
        </div>`,
        options: [
            "使用useState钩子单独管理每个组件的连接状态",
            "通过useContext+useReducer封装全局钱包上下文，统一管理连接状态",
            "将连接状态存储在localStorage中，通过useEffect读取",
            "每个组件独立调用window.ethereum API判断连接状态"
        ],
        correct: 1,
        explanation: "区块链钱包连接状态需在React全局共享（如多个页面需判断是否已连接），用useContext+useReducer封装全局上下文，可避免状态冗余，实现统一的连接、断开逻辑，符合React状态管理最佳实践"
    },
    {
        id: 236,
        type: "fill",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 font-mono text-sm">
            <div>在React函数组件中，使用Ethers.js调用智能合约方法时，为避免组件卸载后执行setState导致内存泄漏，应结合<span class="code-blank" data-id="236" data-answer="useEffect清理函数和isMounted状态"></span>处理</div>
        </div>`,
        instruction: "填写避免内存泄漏的关键技术",
        hint: "需包含生命周期控制和状态标记",
        explanation: "区块链合约调用是异步操作，组件卸载后若回调仍执行setState会触发警告。可在useEffect中定义isMounted变量（初始为true），清理函数中设为false，回调中判断isMounted为true时再更新状态，确保安全"
    },
    {
        id: 237,
        type: "select",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">开发React版NFT列表组件时，需循环渲染多个NFT卡片并调用链上接口获取详情，以下哪种优化方案最合适？</p>
        </div>`,
        options: [
            "使用useEffect一次性请求所有NFT详情，渲染时直接映射",
            "用React.lazy+Suspense懒加载每个NFT卡片组件",
            "使用useCallback缓存请求函数，结合useMemo缓存渲染结果",
            "通过React Query或SWR实现数据请求、缓存与失效管理"
        ],
        correct: 3,
        explanation: "区块链数据请求需处理缓存（避免重复调用）、加载状态、数据失效（如NFT所有权变更），React Query/SWR封装了这些能力，比原生useEffect更高效，还能减少组件内重复逻辑，提升可维护性"
    },
    {
        id: 238,
        type: "correct",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下React组件处理区块链交易签名的代码，错误的是</span></div>
            <div>function TransactionButton() {</div>
            <div class="ml-4">const [isLoading, setIsLoading] = useState(false);</div>
            <div class="ml-4">const signTransaction = async () => {</div>
            <div class="ml-8">setIsLoading(true);</div>
            <div class="ml-8">const provider = new ethers.providers.Web3Provider(window.ethereum);</div>
            <div class="ml-8">const signer = provider.getSigner();</div>
            <div class="ml-8">await signer.sendTransaction(txData);</div>
            <div class="ml-8">setIsLoading(false);</div>
            <div class="ml-4">};</div>
            <div class="ml-4">return &lt;button onClick={signTransaction} disabled={isLoading}&gt;签名&lt;/button&gt;;</div>
            <div>}</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "未捕获交易异常，若签名失败isLoading会一直为true",
        hint: "异步操作需处理错误场景，避免状态卡死",
        explanation: "区块链交易可能因用户拒绝、gas不足等失败，代码中未加try/catch捕获异常，失败时setIsLoading(false)不会执行，导致按钮一直处于加载状态，应在try块中执行交易，catch块中重置isLoading"
    },
    {
        id: 239,
        type: "fill",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 font-mono text-sm">
            <div>在React项目中，为实现多链切换功能（如ETH、BSC），可通过<span class="code-blank" data-id="239" data-answer="自定义useChain Hook封装网络切换逻辑，结合Context共享当前链信息"></span>，让所有组件能获取和切换当前链</div>
        </div>`,
        instruction: "填写多链切换的React实现方案",
        hint: "需包含自定义Hook和全局状态共享",
        explanation: "自定义useChain Hook可封装网络切换（如调用wallet_switchEthereumChain）、链信息校验等逻辑，通过Context将当前链ID、名称等状态全局共享，避免组件间重复代码，符合React Hooks设计思想"
    },
    {
        id: 240,
        type: "select",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">开发React版区块链钱包地址展示组件时，以下哪种方式最适合处理地址截断（如前6后4）并复用？</p>
        </div>`,
        options: [
            "在每个需要展示地址的组件内单独写截断函数",
            "封装一个通用的AddressTruncate组件，接收address props返回截断后的值",
            "使用useMemo在父组件中处理所有地址截断，传给子组件",
            "通过Redux存储截断后的地址，供所有组件调用"
        ],
        correct: 1,
        explanation: "React鼓励组件化复用，封装通用AddressTruncate组件（如接收address和length参数），可在项目中随处复用，减少重复代码，且便于统一维护截断逻辑（如后续调整显示位数）"
    },
    {
        id: 241,
        type: "select",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在React组件中监听智能合约事件（如NFT Transfer），以下哪种做法能确保组件卸载后停止监听？</p>
        </div>`,
        options: [
            "调用contract.on('Transfer', callback)后不处理，依赖浏览器自动清理",
            "在useEffect中注册监听，返回清理函数调用contract.off('Transfer', callback)",
            "使用useRef存储监听实例，在组件卸载时手动删除",
            "将监听逻辑放在类组件的componentDidMount，componentWillUnmount中不处理"
        ],
        correct: 1,
        explanation: "React函数组件中，useEffect的清理函数会在组件卸载或依赖更新时执行，在此处调用contract.off取消事件监听，可避免内存泄漏和无效回调执行，是处理区块链事件监听的标准做法"
    },
    {
        id: 242,
        type: "correct",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下React组件使用useState管理gas费用档位的代码，错误的是</span></div>
            <div>function GasSelector() {</div>
            <div class="ml-4">const [gasTier, setGasTier] = useState('standard');</div>
            <div class="ml-4">const gasPrices = {</div>
            <div class="ml-8">fast: '30 gwei',</div>
            <div class="ml-8">standard: '20 gwei',</div>
            <div class="ml-8">slow: '10 gwei'</div>
            <div class="ml-4">};</div>
            <div class="ml-4">return (</div>
            <div class="ml-8">&lt;div&gt;</div>
            <div class="ml-12">{Object.keys(gasPrices).map(tier => (</div>
            <div class="ml-16">&lt;button key={tier} onClick={() => setGasTier(tier)}&gt;</div>
            <div class="ml-20">{tier}: {gasPrices[tier]}</div>
            <div class="ml-16">&lt;/button&gt;</div>
            <div class="ml-12">))}</div>
            <div class="ml-8">&lt;/div&gt;</div>
            <div class="ml-4">);</div>
            <div>}</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "未标记当前选中的gas档位，用户无法识别已选状态",
        hint: "需通过状态映射选中样式，提升用户体验",
        explanation: "区块链交易中gas档位选择需明确选中状态，代码中未根据gasTier状态给当前选中按钮添加差异化样式（如active类），用户无法判断自己选了哪个档位，易导致误操作，应在button中添加className={gasTier === tier ? 'active' : ''}"
    },
    {
        id: 243,
        type: "fill",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 font-mono text-sm">
            <div>在React项目中使用TypeScript开发区块链组件时，为智能合约调用结果定义类型时，应通过<span class="code-blank" data-id="243" data-answer="interface或type定义接口类型，结合Ethers.js的ContractReturnType获取返回值类型"></span>，确保类型安全</div>
        </div>`,
        instruction: "填写TypeScript下智能合约调用的类型定义方案",
        hint: "需包含类型定义方式和Ethers.js类型工具",
        explanation: "区块链合约调用返回值结构固定，用interface/type定义明确的类型（如INFTMetadata），结合Ethers.js的ContractReturnType<typeof contract, 'getMetadata'>工具类型，可自动推导合约方法返回值类型，避免any类型，符合TypeScript类型安全要求"
    },
    {
        id: 244,
        type: "select",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">开发React版NFT Mint组件时，以下哪种方式最适合处理用户输入的mint数量（限制1-10）？</p>
        </div>`,
        options: [
            "使用useState存储数量，在onChange中直接更新，提交时再校验",
            "用useState+useEffect组合，实时校验输入值并修正（如输入0时自动设为1）",
            "使用controlled组件，在onChange中先校验输入合法性，再更新state",
            "使用uncontrolled组件，通过ref获取输入值，提交时统一校验"
        ],
        correct: 2,
        explanation: "React受控组件可实时控制输入状态，区块链mint数量有明确限制（1-10），在onChange中先判断输入是否为有效数字且在范围内，仅合法值才更新state，避免提交时才发现错误，提升用户体验"
    },
    {
        id: 245,
        type: "select",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">在React中使用React Query请求链上交易历史数据，以下哪种配置最适合处理数据刷新？</p>
        </div>`,
        options: [
            "设置refetchOnWindowFocus: false，避免窗口聚焦时重复请求",
            "配置staleTime: 5 * 60 * 1000（5分钟），链上数据短期不变，减少请求",
            "关闭cacheTime，每次都重新请求最新数据",
            "设置refetchInterval: 1000（1秒），实时刷新交易状态"
        ],
        correct: 1,
        explanation: "链上交易历史数据一旦确认（如区块打包）短期内不会变化，设置staleTime:5分钟可让React Query在5分钟内不重复请求相同数据，既保证数据时效性，又减少对区块链节点的请求压力，平衡性能与体验"
    },
    {
        id: 246,
        type: "fill",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 font-mono text-sm">
            <div>在React函数组件中，为避免每次渲染都重新创建区块链交易参数对象，应使用<span class="code-blank" data-id="246" data-answer="useMemo缓存交易参数，依赖项为影响参数的变量（如金额、地址）"></span>，优化性能</div>
        </div>`,
        instruction: "填写优化交易参数创建的React Hook",
        hint: "需包含缓存Hook和依赖项设置",
        explanation: "区块链交易参数（如txData）通常包含多个字段，每次渲染重新创建会导致不必要的组件重渲染（如传给子组件时），用useMemo缓存txData，仅当依赖项（如amount、toAddress）变化时重新生成，提升React渲染性能"
    },
    {
        id: 247,
        type: "select",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 text-sm">
            <p class="mb-2">开发React版区块链钱包断开连接功能时，以下哪种实现最符合React状态管理逻辑？</p>
        </div>`,
        options: [
            "直接调用window.ethereum.disconnect()，不更新React状态",
            "在全局钱包Context的reducer中定义DISCONNECT动作，同步执行断开API和状态重置",
            "在每个使用钱包的组件中单独调用断开API，各自重置局部状态",
            "通过localStorage清除钱包信息，触发useEffect更新状态"
        ],
        correct: 1,
        explanation: "区块链钱包断开需同步处理两部分：1. 调用钱包API（如disconnect）；2. 重置React全局状态（如当前地址、链ID），用Context reducer定义统一的DISCONNECT动作，可确保状态与实际连接状态一致，避免状态混乱"
    },
    {
        id: 248,
        type: "correct",
        title: "区块链前端场景（React）",
        content: `<div class="p-4 font-mono text-sm">
            <div><span class="comment">// 以下React组件展示NFT详情的代码，错误的是</span></div>
            <div>function NFTDetail({ tokenId }) {</div>
            <div class="ml-4">const { data: nft, isLoading, error } = useQuery(['nft', tokenId], () => {</div>
            <div class="ml-8">const contract = new ethers.Contract(ABI, ADDRESS, provider);</div>
            <div class="ml-8">return contract.getNFTMetadata(tokenId);</div>
            <div class="ml-4">});</div>
            <div class="ml-4">if (isLoading) return &lt;div&gt;加载中...&lt;/div&gt;;</div>
            <div class="ml-4">return (</div>
            <div class="ml-8">&lt;div&gt;</div>
            <div class="ml-12">&lt;img src={nft.image} alt="NFT"/&gt;</div>
            <div class="ml-12">&lt;p&gt;名称: {nft.name}&lt;/p&gt;</div>
            <div class="ml-8">&lt;/div&gt;</div>
            <div class="ml-4">);</div>
            <div>}</div>
        </div>`,
        instruction: "找出错误的描述（只需要输入错误的句子）",
        correct: "未处理error状态，若合约调用失败会导致组件崩溃",
        hint: "React Query请求需覆盖loading、success、error三种状态",
        explanation: "区块链合约调用可能因网络问题、tokenId不存在等失败，代码中仅处理了isLoading状态，未处理error状态，失败时nft为undefined，访问nft.image会触发报错，应添加if (error) return <div>加载失败: {error.message}</div>"
    }
        ];