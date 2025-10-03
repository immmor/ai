const questionspython = [
    {
        id: 1,
        type: "select",
        title: "Python基础语法",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">Python中哪个关键字用于定义函数？</p>
                </div>`,
        options: ["def", "function", "func", "define"],
        correct: 0,
        explanation: "Python使用def关键字定义函数，格式为：def 函数名(参数):"
    },
    {
        id: 2,
        type: "fill",
        title: "Python变量声明",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="2" data-answer="x"></span> = 10</div>
                    <div>print(<span class="code-blank" data-id="2-2" data-answer="x"></span>)</div>
                </div>`,
        instruction: "填写变量名",
        hint: "变量名应该一致",
        explanation: "Python中变量声明不需要关键字，直接赋值即可"
    },
    {
        id: 3,
        type: "correct",
        title: "Python列表操作",
        content: `<div class="p-4 font-mono text-sm">
                    <div>fruits = ["apple", "banana", "cherry"]</div>
                    <div>fruits.<span class="text-red-600">add</span>("orange")</div>
                </div>`,
        instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
        correct: "append",
        hint: "Python列表添加元素使用append方法",
        explanation: "Python列表使用append()方法添加元素，不是add()方法"
    },
    {
        id: 4,
        type: "sentence",
        title: "Python面向对象",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">Python中使用<span class="code-blank" data-id="4-1" data-answer="class"></span>关键字定义类，类的构造函数名为<span class="code-blank" data-id="4-2" data-answer="__init__"></span>，使用<span class="code-blank" data-id="4-3" data-answer="self"></span>关键字引用当前对象实例。</p>
                </div>`,
        instruction: "填写Python面向对象编程的关键概念",
        hint: "Python类定义、构造函数和self关键字",
        explanation: "Python中使用class定义类，__init__是构造函数，self引用当前实例",
        fullSentence: "Python中使用class关键字定义类，类的构造函数名为__init__，使用self关键字引用当前对象实例。"
    },
    {
        id: 5,
        type: "select",
        title: "Python异常处理",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">Python中哪个关键字用于捕获异常？</p>
                </div>`,
        options: ["try", "catch", "except", "error"],
        correct: 2,
        explanation: "Python使用try-except结构处理异常，except关键字用于捕获异常"
    },
    {
        id: 6,
        type: "fill",
        title: "Python循环语句",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="6" data-answer="for"></span> i in range(5):</div>
                    <div>    print(i)</div>
                </div>`,
        instruction: "填写循环关键字",
        hint: "Python中使用for循环遍历序列",
        explanation: "Python使用for关键字进行循环遍历，range(5)生成0-4的序列"
    },
    {
        id: 7,
        type: "sentence",
        title: "Python函数定义",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="7-1" data-answer="def"></span> greet(name):</div>
                    <div>    <span class="code-blank" data-id="7-2" data-answer="return"></span> f"Hello, {name}!"</div>
                    <div>result = greet("World")</div>
                    <div>print(<span class="code-blank" data-id="7-3" data-answer="result"></span>)</div>
                </div>`,
        instruction: "填写Python函数定义代码",
        hint: "函数定义关键字、返回值语句和变量名",
        explanation: "Python使用def定义函数，return返回值，调用函数后使用变量接收结果",
        fullSentence: "def greet(name):\n    return f\"Hello, {name}!\"\nresult = greet(\"World\")\nprint(result)"
    },
    {
        id: 8,
        type: "sentence",
        title: "Python条件语句",
        content: `<div class="p-4 font-mono text-sm">
                    <div>x = 10</div>
                    <div><span class="code-blank" data-id="8-1" data-answer="if"></span> x > 5:</div>
                    <div>    print("x大于5")</div>
                    <div><span class="code-blank" data-id="8-2" data-answer="elif"></span> x == 5:</div>
                    <div>    print("x等于5")</div>
                    <div><span class="code-blank" data-id="8-3" data-answer="else"></span>:</div>
                    <div>    print("x小于5")</div>
                </div>`,
        instruction: "填写Python条件语句代码",
        hint: "条件判断关键字",
        explanation: "Python使用if、elif和else进行条件判断",
        fullSentence: "x = 10\nif x > 5:\n    print(\"x大于5\")\nelif x == 5:\n    print(\"x等于5\")\nelse:\n    print(\"x小于5\")"
    },
    {
        id: 9,
        type: "sentence",
        title: "Python模块导入",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="9-1" data-answer="import"></span> math</div>
                    <div>result = math.sqrt(16)</div>
                    <div><span class="code-blank" data-id="9-2" data-answer="from"></span> datetime <span class="code-blank" data-id="9-3" data-answer="import"></span> datetime</div>
                    <div>now = datetime.now()</div>
                    <div><span class="code-blank" data-id="9-4" data-answer="import"></span> pandas <span class="code-blank" data-id="9-5" data-answer="as"></span> pd</div>
                </div>`,
        instruction: "填写Python模块导入代码",
        hint: "模块导入关键字和语法",
        explanation: "Python使用import导入模块，from...import导入特定函数，as起别名",
        fullSentence: "import math\nresult = math.sqrt(16)\nfrom datetime import datetime\nnow = datetime.now()\nimport pandas as pd"
    }
];
