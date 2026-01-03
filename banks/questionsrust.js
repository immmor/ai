const questionsrust = [
    {
        id: 1,
        type: "select",
        title: "Rust基础语法",
        content: `<div class="p-4 text-sm">
                    <p>Rust中哪个关键字用于定义函数？</p>
                </div>`,
        options: ["fn", "function", "func", "def"],
        correct: 0,
        explanation: "Rust使用fn关键字定义函数，格式为：fn 函数名(参数) -> 返回类型 {}"
    },
    {
        id: 2,
        type: "fill",
        title: "Rust变量声明",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="2" data-answer="let"></span> x = 10;</div>
                    <div>println!("{}", <span class="code-blank" data-id="2-2" data-answer="x"></span>);</div>
                </div>`,
        instruction: "填写变量声明关键字",
        hint: "Rust中变量声明需要关键字",
        explanation: "Rust使用let关键字声明变量，默认不可变，使用mut关键字可以使其可变"
    },
    {
        id: 3,
        type: "correct",
        title: "Rust可变变量",
        content: `<div class="p-4 font-mono text-sm">
                    <div>let x = 10;</div>
                    <div>x = 20;</div>
                </div>`,
        instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
        correct: "let mut x = 10;",
        hint: "Rust变量默认不可变，需要使用mut关键字",
        explanation: "Rust中变量默认不可变，要修改变量值需要在声明时使用mut关键字"
    },
    {
        id: 4,
        type: "sentence",
        title: "Rust所有权",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">Rust中值的所有权遵循三个规则：每个值有且只有一个<span class="code-blank" data-id="4-1" data-answer="所有者"></span>；当所有者离开<span class="code-blank" data-id="4-2" data-answer="作用域"></span>时，值被自动释放；可以通过<span class="code-blank" data-id="4-3" data-answer="引用"></span>来使用值而不获取所有权。</p>
                </div>`,
        instruction: "填写Rust所有权的关键概念",
        hint: "所有者、作用域、引用",
        explanation: "Rust的所有权系统是其内存安全的核心，通过所有权规则避免了垃圾回收",
        fullSentence: "Rust中值的所有权遵循三个规则：每个值有且只有一个所有者；当所有者离开作用域时，值被自动释放；可以通过引用来使用值而不获取所有权。"
    },
    {
        id: 5,
        type: "select",
        title: "Rust借用",
        content: `<div class="p-4 text-sm">
                    <p>Rust中哪个符号用于创建不可变引用？</p>
                </div>`,
        options: ["&", "&mut", "*", "@"],
        correct: 0,
        explanation: "Rust使用&符号创建不可变引用，&mut用于创建可变引用"
    },
    {
        id: 6,
        type: "fill",
        title: "Rust模式匹配",
        content: `<div class="p-4 font-mono text-sm">
                    <div>let number = 3;</div>
                    <div><span class="code-blank" data-id="6" data-answer="match"></span> number {</div>
                    <div>    1 => println!("One"),</div>
                    <div>    2 => println!("Two"),</div>
                    <div>    3 => println!("Three"),</div>
                    <div>    _ => println!("Other"),</div>
                    <div>}</div>
                </div>`,
        instruction: "填写模式匹配关键字",
        hint: "Rust中使用match进行模式匹配",
        explanation: "Rust的match表达式是强大的模式匹配工具，类似于switch但更灵活"
    },
    {
        id: 7,
        type: "sentence",
        title: "Rust错误处理",
        content: `<div class="p-4 font-mono text-sm">
                    <div>use std::fs::File;</div>
                    <div>use std::io::Read;</div>
                    <div>fn read_file() -> <span class="code-blank" data-id="7-1" data-answer="Result"></span><String, std::io::Error> {</div>
                    <div>    let mut file = File::open("test.txt")<span class="code-blank" data-id="7-2" data-answer="?"></span>;</div>
                    <div>    let mut content = String::new();</div>
                    <div>    file.read_to_string(&mut content)<span class="code-blank" data-id="7-3" data-answer="?"></span>;</div>
                    <div>    <span class="code-blank" data-id="7-4" data-answer="Ok"></span>(content)</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Rust错误处理代码",
        hint: "Result类型、?操作符和Ok返回值",
        explanation: "Rust使用Result类型进行错误处理，?操作符可以简化错误传播",
        fullSentence: "use std::fs::File;\nuse std::io::Read;\nfn read_file() -> Result<String, std::io::Error> {\n    let mut file = File::open(\"test.txt\")?;\n    let mut content = String::new();\n    file.read_to_string(&mut content)?;\n    Ok(content)\n}"
    },
    {
        id: 8,
        type: "sentence",
        title: "Rust trait",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="8-1" data-answer="trait"></span> Printable {</div>
                    <div>    <span class="code-blank" data-id="8-2" data-answer="fn"></span> print(&self);</div>
                    <div>}</div>
                    <div>struct Person {</div>
                    <div>    name: String,</div>
                    <div>}</div>
                    <div><span class="code-blank" data-id="8-3" data-answer="impl"></span> Printable for Person {</div>
                    <div>    fn print(&self) {</div>
                    <div>        println!("{}", self.name);</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Rust trait定义和实现代码",
        hint: "trait关键字、fn方法定义和impl实现",
        explanation: "Rust的trait类似于接口，用于定义共享行为",
        fullSentence: "trait Printable {\n    fn print(&self);\n}\nstruct Person {\n    name: String,\n}\nimpl Printable for Person {\n    fn print(&self) {\n        println!(\"{}\", self.name);\n    }\n}"
    },
    {
        id: 9,
        type: "sentence",
        title: "Rust生命周期",
        content: `<div class="p-4 font-mono text-sm">
                    <div>fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {</div>
                    <div>    if x.len() > y.len() {</div>
                    <div>        <span class="code-blank" data-id="9-1" data-answer="x"></span></div>
                    <div>    } else {</div>
                    <div>        <span class="code-blank" data-id="9-2" data-answer="y"></span></div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Rust生命周期代码",
        hint: "生命周期参数和返回值",
        explanation: "Rust的生命周期用于确保引用的有效性，避免悬垂引用",
        fullSentence: "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() {\n        x\n    } else {\n        y\n    }\n}"
    },
    {
        id: 10,
        type: "sentence",
        title: "Rust宏",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="10-1" data-answer="macro_rules!"></span> hello {</div>
                    <div>    () => {</div>
                    <div>        println!("Hello, World!");</div>
                    <div>    };</div>
                    <div>}</div>
                    <div>fn main() {</div>
                    <div>    <span class="code-blank" data-id="10-2" data-answer="hello"></span>();</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Rust宏定义和调用代码",
        hint: "macro_rules!宏定义和调用",
        explanation: "Rust的宏是元编程工具，可以生成代码，使用macro_rules!定义",
        fullSentence: "macro_rules! hello {\n    () => {\n        println!(\"Hello, World!\");\n    };\n}\nfn main() {\n    hello!();\n}"
    }
];