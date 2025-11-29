const questionsgerman = [
    {
        id: 1,
        type: "sentence",
        title: "德语基础句型",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="1-1" data-answer="Ich"></span> <span class="code-blank" data-id="1-2" data-answer="lese"></span> ein Buch jeden Tag.</div>
                </div>`,
        instruction: "填写德语基础句型",
        hint: "主语和谓语动词",
        explanation: "德语基础句型结构：主语 + 谓语动词 + 宾语",
        fullSentence: "Ich lese ein Buch jeden Tag."
    },
    {
        id: 2,
        type: "sentence",
        title: "现在进行时",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Sie <span class="code-blank" data-id="2-1" data-answer="sind"></span> gerade fern <span class="code-blank" data-id="2-2" data-answer="sehen"></span>.</div>
                </div>`,
        instruction: "填写现在进行时句子",
        hint: "助动词和动词",
        explanation: "德语现在进行时通常用现在时表示，有时加gerade强调正在进行",
        fullSentence: "Sie sind gerade fern sehen."
    },
    {
        id: 3,
        type: "sentence",
        title: "一般过去时",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Gestern <span class="code-blank" data-id="3-1" data-answer="ging"></span> ich in die Bibliothek.</div>
                </div>`,
        instruction: "填写一般过去时句子",
        hint: "过去式动词",
        explanation: "德语一般过去时表示过去发生的动作，注意动词位置在第二位",
        fullSentence: "Gestern ging ich in die Bibliothek."
    },
    {
        id: 4,
        type: "sentence",
        title: "将来时态",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Nächste Woche <span class="code-blank" data-id="4-1" data-answer="werden"></span> wir unsere Großeltern <span class="code-blank" data-id="4-2" data-answer="besuchen"></span>.</div>
                </div>`,
        instruction: "填写将来时态句子",
        hint: "助动词和动词原形",
        explanation: "德语将来时结构：werden + 动词原形",
        fullSentence: "Nächste Woche werden wir unsere Großeltern besuchen."
    },
    {
        id: 5,
        type: "sentence",
        title: "自我介绍",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="5-1" data-answer="Mein"></span> Name ist Anna. <span class="code-blank" data-id="5-2" data-answer="Ich"></span> bin 25 Jahre alt.</div>
                </div>`,
        instruction: "填写自我介绍句子",
        hint: "形容词性物主代词和主语",
        explanation: "德语自我介绍的基本表达方式",
        fullSentence: "Mein Name ist Anna. Ich bin 25 Jahre alt."
    },
    {
        id: 6,
        type: "sentence",
        title: "问候语",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="6-1" data-answer="Guten"></span> Tag! Wie <span class="code-blank" data-id="6-2" data-answer="geht"></span> es Ihnen?</div>
                </div>`,
        instruction: "填写问候语",
        hint: "问候词和动词",
        explanation: "德语日常问候语",
        fullSentence: "Guten Tag! Wie geht es Ihnen?"
    },
    {
        id: 7,
        type: "sentence",
        title: "感谢表达",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="7-1" data-answer="Danke"></span> schön! Das ist sehr <span class="code-blank" data-id="7-2" data-answer="freundlich"></span> von Ihnen.</div>
                </div>`,
        instruction: "填写感谢表达",
        hint: "感谢词和形容词",
        explanation: "德语感谢的表达方式",
        fullSentence: "Danke schön! Das ist sehr freundlich von Ihnen."
    },
    {
        id: 8,
        type: "sentence",
        title: "询问方向",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Entschuldigung, wo <span class="code-blank" data-id="8-1" data-answer="ist"></span> das Rathaus? <span class="code-blank" data-id="8-2" data-answer="Können"></span> Sie mir helfen?</div>
                </div>`,
        instruction: "填写询问方向句子",
        hint: "系动词和情态动词",
        explanation: "德语询问方向的表达方式",
        fullSentence: "Entschuldigung, wo ist das Rathaus? Können Sie mir helfen?"
    },
    {
        id: 9,
        type: "sentence",
        title: "数字表达",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Ich habe <span class="code-blank" data-id="9-1" data-answer="fünf"></span> Bücher und <span class="code-blank" data-id="9-2" data-answer="drei"></span> Stifte.</div>
                </div>`,
        instruction: "填写数字表达",
        hint: "基数词",
        explanation: "德语数字的基本表达",
        fullSentence: "Ich habe fünf Bücher und drei Stifte."
    },
    {
        id: 10,
        type: "sentence",
        title: "日期表达",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Heute ist der <span class="code-blank" data-id="10-1" data-answer="erste"></span> Januar <span class="code-blank" data-id="10-2" data-answer="zweitausendundzwanzig"></span>.</div>
                </div>`,
        instruction: "填写日期表达",
        hint: "序数词和年份",
        explanation: "德语日期的表达方式",
        fullSentence: "Heute ist der erste Januar zweitausendundzwanzig."
    },
    {
        id: 11,
        type: "sentence",
        title: "简单问候",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="11-1" data-answer="Hallo"></span>! Wie heißt <span class="code-blank" data-id="11-2" data-answer="du"></span>?</div>
                </div>`,
        instruction: "填写简单的问候语",
        hint: "打招呼和第二人称",
        explanation: "最基本的德语问候语",
        fullSentence: "Hallo! Wie heißt du?"
    },
    {
        id: 12,
        type: "sentence",
        title: "基本数字1-5",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Ein, zwei, <span class="code-blank" data-id="12-1" data-answer="drei"></span>, vier, <span class="code-blank" data-id="12-2" data-answer="fünf"></span>.</div>
                </div>`,
        instruction: "填写德语数字",
        hint: "基础数字",
        explanation: "德语中1-5的基本数字",
        fullSentence: "Ein, zwei, drei, vier, fünf."
    },
    {
        id: 13,
        type: "sentence",
        title: "日常物品",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Das ist ein <span class="code-blank" data-id="13-1" data-answer="Buch"></span>. Das ist ein <span class="code-blank" data-id="13-2" data-answer="Stift"></span>.</div>
                </div>`,
        instruction: "填写日常物品名称",
        hint: "书和笔",
        explanation: "常见物品的德语名称",
        fullSentence: "Das ist ein Buch. Das ist ein Stift."
    },
    {
        id: 14,
        type: "sentence",
        title: "简单自我介绍",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="14-1" data-answer="Ich"></span> heiße Max. <span class="code-blank" data-id="14-2" data-answer="Ich"></span> bin 20 Jahre alt.</div>
                </div>`,
        instruction: "填写自我介绍",
        hint: "第一人称",
        explanation: "简单的德语自我介绍",
        fullSentence: "Ich heiße Max. Ich bin 20 Jahre alt."
    },
    {
        id: 15,
        type: "sentence",
        title: "基础动词",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Ich <span class="code-blank" data-id="15-1" data-answer="esse"></span> ein Apfel. Ich <span class="code-blank" data-id="15-2" data-answer="trinke"></span> Wasser.</div>
                </div>`,
        instruction: "填写基础动词",
        hint: "吃和喝",
        explanation: "基本日常动词",
        fullSentence: "Ich esse ein Apfel. Ich trinke Wasser."
    },
    {
        id: 16,
        type: "sentence",
        title: "基本颜色",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Rot, grün, <span class="code-blank" data-id="16-1" data-answer="blau"></span> und <span class="code-blank" data-id="16-2" data-answer="gelb"></span>.</div>
                </div>`,
        instruction: "填写颜色名称",
        hint: "蓝色和黄色",
        explanation: "基本颜色的德语表达",
        fullSentence: "Rot, grün, blau und gelb."
    },
    {
        id: 17,
        type: "sentence",
        title: "人称代词",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="17-1" data-answer="Ich"></span> bin hier. <span class="code-blank" data-id="17-2" data-answer="Du"></span> bist da.</div>
                </div>`,
        instruction: "填写人称代词",
        hint: "我和你",
        explanation: "第一和第二人称代词",
        fullSentence: "Ich bin hier. Du bist da."
    },
    {
        id: 18,
        type: "sentence",
        title: "简单回答",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Ja, <span class="code-blank" data-id="18-1" data-answer="ich"></span> verstehe. Nein, <span class="code-blank" data-id="18-2" data-answer="ich"></span> verstehe nicht.</div>
                </div>`,
        instruction: "填写简单回答",
        hint: "第一人称",
        explanation: "基本的肯定和否定回答",
        fullSentence: "Ja, ich verstehe. Nein, ich verstehe nicht."
    },
    {
        id: 19,
        type: "sentence",
        title: "时间表达",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Es ist <span class="code-blank" data-id="19-1" data-answer="ein"></span> Uhr. Bald ist <span class="code-blank" data-id="19-2" data-answer="zwei"></span> Uhr.</div>
                </div>`,
        instruction: "填写时间表达",
        hint: "一点和两点",
        explanation: "基本的时间表达方式",
        fullSentence: "Es ist ein Uhr. Bald ist zwei Uhr."
    },
    {
        id: 20,
        type: "sentence",
        title: "感谢和道歉",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="20-1" data-answer="Danke"></span>! <span class="code-blank" data-id="20-2" data-answer="Entschuldigung"></span>, ich bin spät.</div>
                </div>`,
        instruction: "填写感谢和道歉",
        hint: "谢谢和对不起",
        explanation: "基本的礼貌用语",
        fullSentence: "Danke! Entschuldigung, ich bin spät."
    }
];