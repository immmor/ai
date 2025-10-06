const questionsenglish = [
    {
        id: 1,
        type: "sentence",
        title: "英语基本句型",
        content: `<div class="p-4 font-mono text-sm">
                    <div><span class="code-blank" data-id="1-1" data-answer="She"></span> <span class="code-blank" data-id="1-2" data-answer="reads"></span> a book every day.</div>
                </div>`,
        instruction: "填写英语基本句型",
        hint: "主语和谓语动词",
        explanation: "英语基本句型结构：主语 + 谓语动词 + 宾语",
        fullSentence: "She reads a book every day."
    },
    {
        id: 2,
        type: "sentence",
        title: "现在进行时",
        content: `<div class="p-4 font-mono text-sm">
                    <div>They <span class="code-blank" data-id="2-1" data-answer="are"></span> <span class="code-blank" data-id="2-2" data-answer="watching"></span> TV right now.</div>
                </div>`,
        instruction: "填写现在进行时句子",
        hint: "be动词和现在分词",
        explanation: "现在进行时结构：主语 + be动词 + 现在分词 + 其他",
        fullSentence: "They are watching TV right now."
    },
    {
        id: 3,
        type: "sentence",
        title: "一般过去时",
        content: `<div class="p-4 font-mono text-sm">
                    <div>He <span class="code-blank" data-id="3-1" data-answer="went"></span> to the library yesterday.</div>
                </div>`,
        instruction: "填写一般过去时句子",
        hint: "过去式动词",
        explanation: "一般过去时表示过去发生的动作或状态，动词用过去式",
        fullSentence: "He went to the library yesterday."
    },
    {
        id: 4,
        type: "sentence",
        title: "将来时态",
        content: `<div class="p-4 font-mono text-sm">
                    <div>We <span class="code-blank" data-id="4-1" data-answer="will"></span> <span class="code-blank" data-id="4-2" data-answer="visit"></span> our grandparents next week.</div>
                </div>`,
        instruction: "填写将来时态句子",
        hint: "助动词和动词原形",
        explanation: "一般将来时结构：主语 + will + 动词原形 + 其他",
        fullSentence: "We will visit our grandparents next week."
    },
    {
        id: 5,
        type: "sentence",
        title: "现在完成时",
        content: `<div class="p-4 font-mono text-sm">
                    <div>I <span class="code-blank" data-id="5-1" data-answer="have"></span> <span class="code-blank" data-id="5-2" data-answer="finished"></span> my homework already.</div>
                </div>`,
        instruction: "填写现在完成时句子",
        hint: "助动词和过去分词",
        explanation: "现在完成时结构：主语 + have/has + 过去分词 + 其他",
        fullSentence: "I have finished my homework already."
    },
    {
        id: 6,
        type: "sentence",
        title: "复合句练习",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Although it was raining heavily, <span class="code-blank" data-id="6-1" data-answer="they"></span> <span class="code-blank" data-id="6-2" data-answer="decided"></span> to go for a walk in the park because they needed some fresh air.</div>
                </div>`,
        instruction: "填写复合句",
        hint: "主语和谓语动词",
        explanation: "复合句包含主句和从句，注意主谓一致",
        fullSentence: "Although it was raining heavily, they decided to go for a walk in the park because they needed some fresh air."
    },
    {
        id: 7,
        type: "sentence",
        title: "条件状语从句",
        content: `<div class="p-4 font-mono text-sm">
                    <div>If you study hard every day and practice speaking English regularly, <span class="code-blank" data-id="7-1" data-answer="you"></span> <span class="code-blank" data-id="7-2" data-answer="will"></span> <span class="code-blank" data-id="7-3" data-answer="improve"></span> your language skills significantly within a few months.</div>
                </div>`,
        instruction: "填写条件状语从句",
        hint: "主语、助动词和动词",
        explanation: "条件状语从句表示假设条件，主句用将来时",
        fullSentence: "If you study hard every day and practice speaking English regularly, you will improve your language skills significantly within a few months."
    },
    {
        id: 8,
        type: "sentence",
        title: "定语从句练习",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The book <span class="code-blank" data-id="8-1" data-answer="that"></span> I borrowed from the library last week is very interesting and has helped me learn many new vocabulary words.</div>
                </div>`,
        instruction: "填写定语从句",
        hint: "关系代词",
        explanation: "定语从句修饰名词，使用关系代词连接",
        fullSentence: "The book that I borrowed from the library last week is very interesting and has helped me learn many new vocabulary words."
    },
    {
        id: 9,
        type: "sentence",
        title: "时间状语从句",
        content: `<div class="p-4 font-mono text-sm">
                    <div>When I was walking home from school yesterday afternoon, I saw an old friend <span class="code-blank" data-id="9-1" data-answer="whom"></span> I hadn't seen for many years and we decided to have coffee together.</div>
                </div>`,
        instruction: "填写时间状语从句",
        hint: "关系代词",
        explanation: "时间状语从句表示动作发生的时间，使用连接词引导",
        fullSentence: "When I was walking home from school yesterday afternoon, I saw an old friend whom I hadn't seen for many years and we decided to have coffee together."
    },
    {
        id: 10,
        type: "sentence",
        title: "复杂并列句",
        content: `<div class="p-4 font-mono text-sm">
                    <div>My brother wants to study computer science at university, <span class="code-blank" data-id="10-1" data-answer="but"></span> my sister prefers to major in business administration because she believes it offers more career opportunities in the future.</div>
                </div>`,
        instruction: "填写复杂并列句",
        hint: "并列连词",
        explanation: "并列句使用连词连接两个或多个独立分句",
        fullSentence: "My brother wants to study computer science at university, but my sister prefers to major in business administration because she believes it offers more career opportunities in the future."
    }
];