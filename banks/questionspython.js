const questionspython = [
    {
        id: 1,
        type: "select",
        title: "Python基础语法",
        content: `<div class="p-4 text-sm">
                    <p>Python中哪个关键字用于定义函数？</p>
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
                    <p>Python中哪个关键字用于捕获异常？</p>
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
    },
    {
        id: 10,
        type: "sentence",
        title: "Python装饰器",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="10-1" data-answer="def"></span> timer(func):</div>
                    <div>    <span class="code-blank" data-id="10-2" data-answer="def"></span> wrapper(*args, **kwargs):</div>
                    <div>        start = time.time()</div>
                    <div>        result = func(*args, **kwargs)</div>
                    <div>        end = time.time()</div>
                    <div>        print(f"函数 {func.__name__} 执行时间: {end - start:.2f}秒")</div>
                    <div>        <span class="code-blank" data-id="10-3" data-answer="return"></span> result</div>
                    <div>    <span class="code-blank" data-id="10-4" data-answer="return"></span> wrapper</div>
                    <div>@timer</div>
                    <div>def slow_function():</div>
                    <div>    time.sleep(1)</div>
                </div>`,
        instruction: "填写Python装饰器代码",
        hint: "装饰器定义、内部函数和返回值",
        explanation: "装饰器是一个接收函数作为参数并返回新函数的函数，使用@语法糖应用",
        fullSentence: "def timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f\"函数 {func.__name__} 执行时间: {end - start:.2f}秒\")\n        return result\n    return wrapper\n@timer\ndef slow_function():\n    time.sleep(1)"
    },
    {
        id: 11,
        type: "sentence",
        title: "Python生成器",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="11-1" data-answer="def"></span> fibonacci(n):</div>
                    <div>    a, b = 0, 1</div>
                    <div>    <span class="code-blank" data-id="11-2" data-answer="for"></span> _ in range(n):</div>
                    <div>        <span class="code-blank" data-id="11-3" data-answer="yield"></span> a</div>
                    <div>        a, b = b, a + b</div>
                    <div>fib = fibonacci(10)</div>
                    <div>print(list(<span class="code-blank" data-id="11-4" data-answer="fib"></span>))</div>
                </div>`,
        instruction: "填写Python生成器代码",
        hint: "生成器函数定义、yield关键字和迭代",
        explanation: "生成器使用yield返回数据，可以节省内存并支持惰性计算",
        fullSentence: "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\nfib = fibonacci(10)\nprint(list(fib))"
    },
    {
        id: 12,
        type: "sentence",
        title: "Python上下文管理器",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="12-1" data-answer="class"></span> FileManager:</div>
                    <div>    <span class="code-blank" data-id="12-2" data-answer="def"></span> __init__(self, filename, mode):</div>
                    <div>        self.filename = filename</div>
                    <div>        self.mode = mode</div>
                    <div>        self.file = None</div>
                    <div>    <span class="code-blank" data-id="12-3" data-answer="def"></span> __enter__(self):</div>
                    <div>        self.file = open(self.filename, self.mode)</div>
                    <div>        <span class="code-blank" data-id="12-4" data-answer="return"></span> self.file</div>
                    <div>    <span class="code-blank" data-id="12-5" data-answer="def"></span> __exit__(self, exc_type, exc_val, exc_tb):</div>
                    <div>        <span class="code-blank" data-id="12-6" data-answer="if"></span> self.file:</div>
                    <div>            self.file.close()</div>
                    <div><span class="code-blank" data-id="12-7" data-answer="with"></span> FileManager("test.txt", "w") as f:</div>
                    <div>    f.write("Hello, World!")</div>
                </div>`,
        instruction: "填写Python上下文管理器代码",
        hint: "上下文管理器类定义、__enter__和__exit__方法",
        explanation: "上下文管理器通过__enter__和__exit__方法实现资源管理，使用with语句",
        fullSentence: "class FileManager:\n    def __init__(self, filename, mode):\n        self.filename = filename\n        self.mode = mode\n        self.file = None\n    def __enter__(self):\n        self.file = open(self.filename, self.mode)\n        return self.file\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if self.file:\n            self.file.close()\nwith FileManager(\"test.txt\", \"w\") as f:\n    f.write(\"Hello, World!\")"
    },
    {
        id: 13,
        type: "sentence",
        title: "Python异步编程",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="13-1" data-answer="import"></span> asyncio</div>
                    <div><span class="code-blank" data-id="13-2" data-answer="async"></span> def fetch_data(url):</div>
                    <div>    <span class="code-blank" data-id="13-3" data-answer="await"></span> asyncio.sleep(1)</div>
                    <div>    <span class="code-blank" data-id="13-4" data-answer="return"></span> f"Data from {url}"</div>
                    <div><span class="code-blank" data-id="13-5" data-answer="async"></span> def main():</div>
                    <div>    tasks = [</div>
                    <div>        fetch_data("url1"),</div>
                    <div>        fetch_data("url2"),</div>
                    <div>        fetch_data("url3")</div>
                    <div>    ]</div>
                    <div>    results = <span class="code-blank" data-id="13-6" data-answer="await"></span> asyncio.gather(*tasks)</div>
                    <div>    print(results)</div>
                    <div>asyncio.run(<span class="code-blank" data-id="13-7" data-answer="main"></span>())</div>
                </div>`,
        instruction: "填写Python异步编程代码",
        hint: "async/await关键字、异步函数定义和任务并发",
        explanation: "异步编程使用async/await语法，asyncio.gather可以并发执行多个异步任务",
        fullSentence: "import asyncio\nasync def fetch_data(url):\n    await asyncio.sleep(1)\n    return f\"Data from {url}\"\nasync def main():\n    tasks = [\n        fetch_data(\"url1\"),\n        fetch_data(\"url2\"),\n        fetch_data(\"url3\")\n    ]\n    results = await asyncio.gather(*tasks)\n    print(results)\nasyncio.run(main())"
    },
    {
        id: 14,
        type: "sentence",
        title: "Python元类",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="14-1" data-answer="class"></span> SingletonMeta(<span class="code-blank" data-id="14-2" data-answer="type"></span>):</div>
                    <div>    _instances = {}</div>
                    <div>    <span class="code-blank" data-id="14-3" data-answer="def"></span> __call__(cls, *args, **kwargs):</div>
                    <div>        <span class="code-blank" data-id="14-4" data-answer="if"></span> cls not in cls._instances:</div>
                    <div>            cls._instances[cls] = super().__call__(*args, **kwargs)</div>
                    <div>        <span class="code-blank" data-id="14-5" data-answer="return"></span> cls._instances[cls]</div>
                    <div><span class="code-blank" data-id="14-6" data-answer="class"></span> Database(metaclass=SingletonMeta):</div>
                    <div>    <span class="code-blank" data-id="14-7" data-answer="def"></span> __init__(self):</div>
                    <div>        self.connection = "数据库连接"</div>
                    <div>db1 = Database()</div>
                    <div>db2 = Database()</div>
                    <div>print(db1 <span class="code-blank" data-id="14-8" data-answer="is"></span> db2)</div>
                </div>`,
        instruction: "填写Python元类代码",
        hint: "元类定义、__call__方法和单例模式实现",
        explanation: "元类是类的类，通过重写__call__方法可以控制类的实例化过程，实现单例模式",
        fullSentence: "class SingletonMeta(type):\n    _instances = {}\n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(*args, **kwargs)\n        return cls._instances[cls]\nclass Database(metaclass=SingletonMeta):\n    def __init__(self):\n        self.connection = \"数据库连接\"\ndb1 = Database()\ndb2 = Database()\nprint(db1 is db2)"
    }
];
