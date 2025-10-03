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
    }
];