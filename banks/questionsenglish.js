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
    },
    {
        id: 11,
        type: "sentence",
        title: "ADAS系统测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>During ADAS <span class="code-blank" data-id="11-1" data-answer="testing"></span>, engineers <span class="code-blank" data-id="11-2" data-answer="verify"></span> lane <span class="code-blank" data-id="11-3" data-answer="keeping"></span> assistance, <span class="code-blank" data-id="11-4" data-answer="adaptive"></span> cruise control, and <span class="code-blank" data-id="11-5" data-answer="collision"></span> avoidance systems.</div>
                </div>`,
        instruction: "填写ADAS系统测试句子",
        hint: "名词和形容词",
        explanation: "ADAS测试的主要功能验证",
        fullSentence: "During ADAS testing, engineers verify lane keeping assistance, adaptive cruise control, and collision avoidance systems."
    },
    {
        id: 12,
        type: "sentence",
        title: "娱乐系统功能测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Infotainment system <span class="code-blank" data-id="12-1" data-answer="testing"></span> includes <span class="code-blank" data-id="12-2" data-answer="checking"></span> audio <span class="code-blank" data-id="12-3" data-answer="quality"></span>, <span class="code-blank" data-id="12-4" data-answer="touchscreen"></span> responsiveness, <span class="code-blank" data-id="12-5" data-answer="navigation"></span> accuracy, and connectivity features.</div>
                </div>`,
        instruction: "填写娱乐系统测试句子",
        hint: "名词和动名词",
        explanation: "娱乐系统测试的关键指标",
        fullSentence: "Infotainment system testing includes checking audio quality, touchscreen responsiveness, navigation accuracy, and connectivity features."
    },
    {
        id: 13,
        type: "sentence",
        title: "传感器校准测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>ADAS <span class="code-blank" data-id="13-1" data-answer="sensors"></span> require <span class="code-blank" data-id="13-2" data-answer="precise"></span> calibration to <span class="code-blank" data-id="13-3" data-answer="ensure"></span> accurate <span class="code-blank" data-id="13-4" data-answer="detection"></span> of <span class="code-blank" data-id="13-5" data-answer="objects"></span> and obstacles.</div>
                </div>`,
        instruction: "填写传感器校准测试句子",
        hint: "名词和动词",
        explanation: "ADAS传感器校准的重要性",
        fullSentence: "ADAS sensors require precise calibration to ensure accurate detection of objects and obstacles."
    },
    {
        id: 14,
        type: "sentence",
        title: "语音识别测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Voice <span class="code-blank" data-id="14-1" data-answer="recognition"></span> testing <span class="code-blank" data-id="14-2" data-answer="evaluates"></span> command <span class="code-blank" data-id="14-3" data-answer="accuracy"></span>, noise <span class="code-blank" data-id="14-4" data-answer="cancellation"></span>, and <span class="code-blank" data-id="14-5" data-answer="response"></span> time for infotainment systems.</div>
                </div>`,
        instruction: "填写语音识别测试句子",
        hint: "名词和动词",
        explanation: "娱乐系统语音识别测试要点",
        fullSentence: "Voice recognition testing evaluates command accuracy, noise cancellation, and response time for infotainment systems."
    },
    {
        id: 15,
        type: "sentence",
        title: "自动驾驶测试场景",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Autonomous <span class="code-blank" data-id="15-1" data-answer="driving"></span> tests <span class="code-blank" data-id="15-2" data-answer="simulate"></span> various <span class="code-blank" data-id="15-3" data-answer="traffic"></span> scenarios including <span class="code-blank" data-id="15-4" data-answer="pedestrian"></span> crossings and <span class="code-blank" data-id="15-5" data-answer="emergency"></span> braking situations.</div>
                </div>`,
        instruction: "填写自动驾驶测试句子",
        hint: "名词和动词",
        explanation: "自动驾驶测试的典型场景",
        fullSentence: "Autonomous driving tests simulate various traffic scenarios including pedestrian crossings and emergency braking situations."
    },
    {
        id: 16,
        type: "sentence",
        title: "ADAS测试工程师详细自我介绍",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Good morning, I'm <span class="code-blank" data-id="16-1" data-answer="Statham"></span>, a Senior ADAS <span class="code-blank" data-id="16-2" data-answer="Validation"></span> Engineer at BMW's <span class="code-blank" data-id="16-3" data-answer="Advanced"></span> Technology Center. With over <span class="code-blank" data-id="16-4" data-answer="eight"></span> years of experience, I <span class="code-blank" data-id="16-5" data-answer="specialize"></span> in developing test <span class="code-blank" data-id="16-6" data-answer="methodologies"></span> for Level 3 <span class="code-blank" data-id="16-7" data-answer="autonomous"></span> driving systems, including <span class="code-blank" data-id="16-8" data-answer="sensor"></span> fusion algorithms and <span class="code-blank" data-id="16-9" data-answer="real-time"></span> decision-making <span class="code-blank" data-id="16-10" data-answer="software"></span>.</div>
                </div>`,
        instruction: "填写ADAS测试工程师详细自我介绍",
        hint: "姓名、职位、部门、年限、专业领域、技术术语",
        explanation: "ADAS测试工程师的详细专业自我介绍",
        fullSentence: "Good morning, I'm Statham, a Senior ADAS Validation Engineer at BMW's Advanced Technology Center. With over eight years of experience, I specialize in developing test methodologies for Level 3 autonomous driving systems, including sensor fusion algorithms and real-time decision-making software."
    },
    {
        id: 17,
        type: "sentence",
        title: "娱乐系统测试工程师详细自我介绍",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Hello everyone, my name is <span class="code-blank" data-id="17-1" data-answer="Statham"></span> and I lead the <span class="code-blank" data-id="17-2" data-answer="Infotainment"></span> Quality Assurance team at BMW's <span class="code-blank" data-id="17-3" data-answer="Digital"></span> Product Development <span class="code-blank" data-id="17-4" data-answer="Division"></span>. My team is responsible for <span class="code-blank" data-id="17-5" data-answer="ensuring"></span> the reliability of our <span class="code-blank" data-id="17-6" data-answer="iDrive"></span> 8.0 system, which <span class="code-blank" data-id="17-7" data-answer="integrates"></span> advanced voice <span class="code-blank" data-id="17-8" data-answer="recognition"></span>, augmented reality <span class="code-blank" data-id="17-9" data-answer="navigation"></span>, and <span class="code-blank" data-id="17-10" data-answer="seamless"></span> smartphone connectivity.</div>
                </div>`,
        instruction: "填写娱乐系统测试工程师详细自我介绍",
        hint: "姓名、职位、团队、部门、职责、系统名称、技术功能",
        explanation: "娱乐系统测试工程师的详细专业自我介绍",
        fullSentence: "Hello everyone, my name is Statham and I lead the Infotainment Quality Assurance team at BMW's Digital Product Development Division. My team is responsible for ensuring the reliability of our iDrive 8.0 system, which integrates advanced voice recognition, augmented reality navigation, and seamless smartphone connectivity."
    },
    {
        id: 18,
        type: "sentence",
        title: "ADAS测试技术挑战",
        content: `<div class="p-4 font-mono text-sm">
                    <div>One of the most <span class="code-blank" data-id="18-1" data-answer="challenging"></span> aspects of ADAS <span class="code-blank" data-id="18-2" data-answer="testing"></span> is validating system <span class="code-blank" data-id="18-3" data-answer="performance"></span> under <span class="code-blank" data-id="18-4" data-answer="adverse"></span> weather conditions, such as <span class="code-blank" data-id="18-5" data-answer="heavy"></span> rain, fog, or <span class="code-blank" data-id="18-6" data-answer="snow"></span>, where <span class="code-blank" data-id="18-7" data-answer="sensor"></span> visibility is <span class="code-blank" data-id="18-8" data-answer="significantly"></span> reduced and <span class="code-blank" data-id="18-9" data-answer="algorithm"></span> accuracy must be <span class="code-blank" data-id="18-10" data-answer="maintained"></span>.</div>
                </div>`,
        instruction: "填写ADAS测试技术挑战句子",
        hint: "形容词、名词、性能、条件、天气、技术术语",
        explanation: "ADAS测试面临的技术挑战和解决方案",
        fullSentence: "One of the most challenging aspects of ADAS testing is validating system performance under adverse weather conditions, such as heavy rain, fog, or snow, where sensor visibility is significantly reduced and algorithm accuracy must be maintained."
    },
    {
        id: 19,
        type: "sentence",
        title: "娱乐系统用户体验测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>When testing <span class="code-blank" data-id="19-1" data-answer="infotainment"></span> systems, we focus on <span class="code-blank" data-id="19-2" data-answer="user"></span> experience metrics including <span class="code-blank" data-id="19-3" data-answer="response"></span> time, <span class="code-blank" data-id="19-4" data-answer="intuitive"></span> interface design, <span class="code-blank" data-id="19-5" data-answer="multitasking"></span> capabilities, and <span class="code-blank" data-id="19-6" data-answer="personalization"></span> features that <span class="code-blank" data-id="19-7" data-answer="enhance"></span> driver <span class="code-blank" data-id="19-8" data-answer="safety"></span> while <span class="code-blank" data-id="19-9" data-answer="maintaining"></span> <span class="code-blank" data-id="19-10" data-answer="entertainment"></span> value.</div>
                </div>`,
        instruction: "填写娱乐系统用户体验测试句子",
        hint: "系统类型、用户、性能指标、设计、功能、安全",
        explanation: "娱乐系统用户体验测试的关键指标",
        fullSentence: "When testing infotainment systems, we focus on user experience metrics including response time, intuitive interface design, multitasking capabilities, and personalization features that enhance driver safety while maintaining entertainment value."
    },
    {
        id: 20,
        type: "sentence",
        title: "ADAS测试基本概念",
        content: `<div class="p-4 font-mono text-sm">
                    <div>ADAS <span class="code-blank" data-id="20-1" data-answer="systems"></span> help <span class="code-blank" data-id="20-2" data-answer="drivers"></span> by providing <span class="code-blank" data-id="20-3" data-answer="safety"></span> features and <span class="code-blank" data-id="20-4" data-answer="assistance"></span>.</div>
                </div>`,
        instruction: "填写ADAS测试基本概念句子",
        hint: "系统、驾驶员、安全、辅助",
        explanation: "ADAS系统的基本功能和目的",
        fullSentence: "ADAS systems help drivers by providing safety features and assistance."
    },
    {
        id: 21,
        type: "sentence",
        title: "雷达传感器测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Radar <span class="code-blank" data-id="21-1" data-answer="sensors"></span> detect <span class="code-blank" data-id="21-2" data-answer="objects"></span> and measure <span class="code-blank" data-id="21-3" data-answer="distance"></span>.</div>
                </div>`,
        instruction: "填写雷达传感器测试句子",
        hint: "传感器、物体、距离",
        explanation: "雷达传感器的基本功能",
        fullSentence: "Radar sensors detect objects and measure distance."
    },
    {
        id: 22,
        type: "sentence",
        title: "摄像头系统测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Camera <span class="code-blank" data-id="22-1" data-answer="systems"></span> recognize <span class="code-blank" data-id="22-2" data-answer="traffic"></span> signs and <span class="code-blank" data-id="22-3" data-answer="lanes"></span>.</div>
                </div>`,
        instruction: "填写摄像头系统测试句子",
        hint: "系统、交通、车道",
        explanation: "摄像头系统的主要功能",
        fullSentence: "Camera systems recognize traffic signs and lanes."
    },
    {
        id: 23,
        type: "sentence",
        title: "自动紧急制动测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>AEB <span class="code-blank" data-id="23-1" data-answer="automatically"></span> applies <span class="code-blank" data-id="23-2" data-answer="brakes"></span> to avoid <span class="code-blank" data-id="23-3" data-answer="collisions"></span>.</div>
                </div>`,
        instruction: "填写自动紧急制动测试句子",
        hint: "自动、刹车、碰撞",
        explanation: "自动紧急制动系统的工作原理",
        fullSentence: "AEB automatically applies brakes to avoid collisions."
    },
    {
        id: 24,
        type: "sentence",
        title: "车道保持辅助测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Lane <span class="code-blank" data-id="24-1" data-answer="keeping"></span> assist helps <span class="code-blank" data-id="24-2" data-answer="maintain"></span> the vehicle in the <span class="code-blank" data-id="24-3" data-answer="lane"></span>.</div>
                </div>`,
        instruction: "填写车道保持辅助测试句子",
        hint: "保持、维持、车道",
        explanation: "车道保持辅助系统的基本功能",
        fullSentence: "Lane keeping assist helps maintain the vehicle in the lane."
    },
    {
        id: 25,
        type: "sentence",
        title: "自适应巡航控制测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>ACC <span class="code-blank" data-id="25-1" data-answer="maintains"></span> a safe <span class="code-blank" data-id="25-2" data-answer="distance"></span> from the <span class="code-blank" data-id="25-3" data-answer="vehicle"></span> ahead.</div>
                </div>`,
        instruction: "填写自适应巡航控制测试句子",
        hint: "维持、距离、车辆",
        explanation: "自适应巡航控制系统的基本功能",
        fullSentence: "ACC maintains a safe distance from the vehicle ahead."
    },
    {
        id: 26,
        type: "sentence",
        title: "盲点监测测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>BSD <span class="code-blank" data-id="26-1" data-answer="detects"></span> vehicles in the <span class="code-blank" data-id="26-2" data-answer="blind"></span> spot area.</div>
                </div>`,
        instruction: "填写盲点监测测试句子",
        hint: "检测、盲点",
        explanation: "盲点监测系统的工作原理",
        fullSentence: "BSD detects vehicles in the blind spot area."
    },
    {
        id: 27,
        type: "sentence",
        title: "自动泊车辅助测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>APA <span class="code-blank" data-id="27-1" data-answer="helps"></span> drivers <span class="code-blank" data-id="27-2" data-answer="park"></span> the car <span class="code-blank" data-id="27-3" data-answer="automatically"></span>.</div>
                </div>`,
        instruction: "填写自动泊车辅助测试句子",
        hint: "帮助、停车、自动",
        explanation: "自动泊车辅助系统的功能",
        fullSentence: "APA helps drivers park the car automatically."
    },
    {
        id: 28,
        type: "sentence",
        title: "交通标志识别测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>TSR <span class="code-blank" data-id="28-1" data-answer="reads"></span> speed <span class="code-blank" data-id="28-2" data-answer="limit"></span> signs on the <span class="code-blank" data-id="28-3" data-answer="road"></span>.</div>
                </div>`,
        instruction: "填写交通标志识别测试句子",
        hint: "读取、限速、道路",
        explanation: "交通标志识别系统的基本功能",
        fullSentence: "TSR reads speed limit signs on the road."
    },
    {
        id: 29,
        type: "sentence",
        title: "驾驶员疲劳监测测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>DMS <span class="code-blank" data-id="29-1" data-answer="monitors"></span> driver <span class="code-blank" data-id="29-2" data-answer="alertness"></span> and <span class="code-blank" data-id="29-3" data-answer="attention"></span>.</div>
                </div>`,
        instruction: "填写驾驶员疲劳监测测试句子",
        hint: "监测、警觉性、注意力",
        explanation: "驾驶员监测系统的作用",
        fullSentence: "DMS monitors driver alertness and attention."
    },
    {
        id: 30,
        type: "sentence",
        title: "夜视系统测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Night <span class="code-blank" data-id="30-1" data-answer="vision"></span> improves <span class="code-blank" data-id="30-2" data-answer="visibility"></span> in dark <span class="code-blank" data-id="30-3" data-answer="conditions"></span>.</div>
                </div>`,
        instruction: "填写夜视系统测试句子",
        hint: "视觉、可见性、条件",
        explanation: "夜视系统的优势",
        fullSentence: "Night vision improves visibility in dark conditions."
    },
    {
        id: 31,
        type: "sentence",
        title: "前方碰撞预警测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>FCW <span class="code-blank" data-id="31-1" data-answer="warns"></span> about <span class="code-blank" data-id="31-2" data-answer="potential"></span> front <span class="code-blank" data-id="31-3" data-answer="collisions"></span>.</div>
                </div>`,
        instruction: "填写前方碰撞预警测试句子",
        hint: "警告、潜在、碰撞",
        explanation: "前方碰撞预警系统的功能",
        fullSentence: "FCW warns about potential front collisions."
    },
    {
        id: 32,
        type: "sentence",
        title: "交叉路口辅助测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Intersection <span class="code-blank" data-id="32-1" data-answer="assist"></span> helps at <span class="code-blank" data-id="32-2" data-answer="dangerous"></span> road <span class="code-blank" data-id="32-3" data-answer="junctions"></span>.</div>
                </div>`,
        instruction: "填写交叉路口辅助测试句子",
        hint: "辅助、危险、路口",
        explanation: "交叉路口辅助系统的作用",
        fullSentence: "Intersection assist helps at dangerous road junctions."
    },
    {
        id: 33,
        type: "sentence",
        title: "紧急转向辅助测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>ESA <span class="code-blank" data-id="33-1" data-answer="supports"></span> steering during <span class="code-blank" data-id="33-2" data-answer="emergency"></span> <span class="code-blank" data-id="33-3" data-answer="maneuvers"></span>.</div>
                </div>`,
        instruction: "填写紧急转向辅助测试句子",
        hint: "支持、紧急、操作",
        explanation: "紧急转向辅助系统的功能",
        fullSentence: "ESA supports steering during emergency maneuvers."
    },
    {
        id: 34,
        type: "sentence",
        title: "行人检测测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Pedestrian <span class="code-blank" data-id="34-1" data-answer="detection"></span> identifies <span class="code-blank" data-id="34-2" data-answer="people"></span> near the <span class="code-blank" data-id="34-3" data-answer="road"></span>.</div>
                </div>`,
        instruction: "填写行人检测测试句子",
        hint: "检测、人员、道路",
        explanation: "行人检测系统的重要性",
        fullSentence: "Pedestrian detection identifies people near the road."
    },
    {
        id: 35,
        type: "sentence",
        title: "问题提票流程",
        content: `<div class="p-4 font-mono text-sm">
                    <div>When we <span class="code-blank" data-id="35-1" data-answer="find"></span> a bug, we <span class="code-blank" data-id="35-2" data-answer="create"></span> a ticket in the <span class="code-blank" data-id="35-3" data-answer="system"></span>.</div>
                </div>`,
        instruction: "填写问题提票流程句子",
        hint: "发现、创建、系统",
        explanation: "问题提票的基本流程",
        fullSentence: "When we find a bug, we create a ticket in the system."
    },
    {
        id: 36,
        type: "sentence",
        title: "软件刷写测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>We <span class="code-blank" data-id="36-1" data-answer="flash"></span> new <span class="code-blank" data-id="36-2" data-answer="software"></span> to the test <span class="code-blank" data-id="36-3" data-answer="vehicle"></span>.</div>
                </div>`,
        instruction: "填写软件刷写测试句子",
        hint: "刷写、软件、车辆",
        explanation: "测试车辆软件刷写的过程",
        fullSentence: "We flash new software to the test vehicle."
    },
    {
        id: 37,
        type: "sentence",
        title: "问题描述文档",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The ticket <span class="code-blank" data-id="37-1" data-answer="describes"></span> the problem with <span class="code-blank" data-id="37-2" data-answer="detailed"></span> <span class="code-blank" data-id="37-3" data-answer="information"></span>.</div>
                </div>`,
        instruction: "填写问题描述文档句子",
        hint: "描述、详细、信息",
        explanation: "问题提票的详细描述要求",
        fullSentence: "The ticket describes the problem with detailed information."
    },
    {
        id: 38,
        type: "sentence",
        title: "刷写验证流程",
        content: `<div class="p-4 font-mono text-sm">
                    <div>After <span class="code-blank" data-id="38-1" data-answer="flashing"></span>, we <span class="code-blank" data-id="38-2" data-answer="verify"></span> the software <span class="code-blank" data-id="38-3" data-answer="version"></span>.</div>
                </div>`,
        instruction: "填写刷写验证流程句子",
        hint: "刷写、验证、版本",
        explanation: "软件刷写后的验证步骤",
        fullSentence: "After flashing, we verify the software version."
    },
    {
        id: 39,
        type: "sentence",
        title: "问题跟踪管理",
        content: `<div class="p-4 font-mono text-sm">
                    <div>We <span class="code-blank" data-id="39-1" data-answer="track"></span> all issues in the <span class="code-blank" data-id="39-2" data-answer="project"></span> <span class="code-blank" data-id="39-3" data-answer="management"></span> tool.</div>
                </div>`,
        instruction: "填写问题跟踪管理句子",
        hint: "跟踪、项目、管理",
        explanation: "问题跟踪和管理的工具使用",
        fullSentence: "We track all issues in the project management tool."
    },
    {
        id: 40,
        type: "sentence",
        title: "车载娱乐系统测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The <span class="code-blank" data-id="40-1" data-answer="infotainment"></span> system provides <span class="code-blank" data-id="40-2" data-answer="music"></span> and <span class="code-blank" data-id="40-3" data-answer="navigation"></span>.</div>
                </div>`,
        instruction: "填写车载娱乐系统测试句子",
        hint: "信息娱乐、音乐、导航",
        explanation: "车载娱乐系统的基本功能",
        fullSentence: "The infotainment system provides music and navigation."
    },
    {
        id: 41,
        type: "sentence",
        title: "触摸屏响应测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The touch <span class="code-blank" data-id="41-1" data-answer="screen"></span> should respond <span class="code-blank" data-id="41-2" data-answer="quickly"></span> to user <span class="code-blank" data-id="41-3" data-answer="input"></span>.</div>
                </div>`,
        instruction: "填写触摸屏响应测试句子",
        hint: "屏幕、快速、输入",
        explanation: "触摸屏响应性能要求",
        fullSentence: "The touch screen should respond quickly to user input."
    },
    {
        id: 42,
        type: "sentence",
        title: "蓝牙连接测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>We test <span class="code-blank" data-id="42-1" data-answer="Bluetooth"></span> <span class="code-blank" data-id="42-2" data-answer="connection"></span> with mobile <span class="code-blank" data-id="42-3" data-answer="phones"></span>.</div>
                </div>`,
        instruction: "填写蓝牙连接测试句子",
        hint: "蓝牙、连接、手机",
        explanation: "蓝牙连接测试的基本内容",
        fullSentence: "We test Bluetooth connection with mobile phones."
    },
    {
        id: 43,
        type: "sentence",
        title: "语音控制系统测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The voice <span class="code-blank" data-id="43-1" data-answer="control"></span> system understands <span class="code-blank" data-id="43-2" data-answer="spoken"></span> <span class="code-blank" data-id="43-3" data-answer="commands"></span>.</div>
                </div>`,
        instruction: "填写语音控制系统测试句子",
        hint: "控制、口语、命令",
        explanation: "语音控制系统的工作原理",
        fullSentence: "The voice control system understands spoken commands."
    },
    {
        id: 44,
        type: "sentence",
        title: "多媒体播放测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The system plays <span class="code-blank" data-id="44-1" data-answer="audio"></span> and <span class="code-blank" data-id="44-2" data-answer="video"></span> files from <span class="code-blank" data-id="44-3" data-answer="USB"></span>.</div>
                </div>`,
        instruction: "填写多媒体播放测试句子",
        hint: "音频、视频、USB",
        explanation: "多媒体播放功能的测试",
        fullSentence: "The system plays audio and video files from USB."
    },
    {
        id: 45,
        type: "sentence",
        title: "边界值测试用例",
        content: `<div class="p-4 font-mono text-sm">
                    <div>We test <span class="code-blank" data-id="45-1" data-answer="boundary"></span> values to find <span class="code-blank" data-id="45-2" data-answer="edge"></span> case <span class="code-blank" data-id="45-3" data-answer="issues"></span>.</div>
                </div>`,
        instruction: "填写边界值测试用例句子",
        hint: "边界、边缘、问题",
        explanation: "边界值测试的重要性",
        fullSentence: "We test boundary values to find edge case issues."
    },
    {
        id: 46,
        type: "sentence",
        title: "等价类划分测试",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Equivalence <span class="code-blank" data-id="46-1" data-answer="partitioning"></span> reduces the number of test <span class="code-blank" data-id="46-2" data-answer="cases"></span> <span class="code-blank" data-id="46-3" data-answer="needed"></span>.</div>
                </div>`,
        instruction: "填写等价类划分测试句子",
        hint: "划分、用例、需要",
        explanation: "等价类划分测试的优势",
        fullSentence: "Equivalence partitioning reduces the number of test cases needed."
    },
    {
        id: 47,
        type: "sentence",
        title: "回归测试用例",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Regression <span class="code-blank" data-id="47-1" data-answer="testing"></span> ensures that new <span class="code-blank" data-id="47-2" data-answer="changes"></span> don't break existing <span class="code-blank" data-id="47-3" data-answer="functionality"></span>.</div>
                </div>`,
        instruction: "填写回归测试用例句子",
        hint: "测试、变更、功能",
        explanation: "回归测试的目的",
        fullSentence: "Regression testing ensures that new changes don't break existing functionality."
    },
    {
        id: 48,
        type: "sentence",
        title: "性能测试用例",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Performance <span class="code-blank" data-id="48-1" data-answer="tests"></span> measure system <span class="code-blank" data-id="48-2" data-answer="response"></span> time under <span class="code-blank" data-id="48-3" data-answer="load"></span>.</div>
                </div>`,
        instruction: "填写性能测试用例句子",
        hint: "测试、响应、负载",
        explanation: "性能测试的主要内容",
        fullSentence: "Performance tests measure system response time under load."
    },
    {
        id: 49,
        type: "sentence",
        title: "安全测试用例",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Security <span class="code-blank" data-id="49-1" data-answer="testing"></span> identifies <span class="code-blank" data-id="49-2" data-answer="vulnerabilities"></span> and potential <span class="code-blank" data-id="49-3" data-answer="threats"></span>.</div>
                </div>`,
        instruction: "填写安全测试用例句子",
        hint: "测试、漏洞、威胁",
        explanation: "安全测试的目标",
        fullSentence: "Security testing identifies vulnerabilities and potential threats."
    },
    {
        id: 50,
        type: "sentence",
        title: "兼容性测试用例",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Compatibility <span class="code-blank" data-id="50-1" data-answer="testing"></span> checks software <span class="code-blank" data-id="50-2" data-answer="behavior"></span> across different <span class="code-blank" data-id="50-3" data-answer="platforms"></span>.</div>
                </div>`,
        instruction: "填写兼容性测试用例句子",
        hint: "测试、行为、平台",
        explanation: "兼容性测试的范围",
        fullSentence: "Compatibility testing checks software behavior across different platforms."
    },
    {
        id: 51,
        type: "sentence",
        title: "可用性测试用例",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Usability <span class="code-blank" data-id="51-1" data-answer="testing"></span> evaluates how <span class="code-blank" data-id="51-2" data-answer="easy"></span> the system is to <span class="code-blank" data-id="51-3" data-answer="use"></span>.</div>
                </div>`,
        instruction: "填写可用性测试用例句子",
        hint: "测试、容易、使用",
        explanation: "可用性测试的目的",
        fullSentence: "Usability testing evaluates how easy the system is to use."
    },
    {
        id: 52,
        type: "sentence",
        title: "集成测试用例",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Integration <span class="code-blank" data-id="52-1" data-answer="testing"></span> verifies that <span class="code-blank" data-id="52-2" data-answer="components"></span> work together <span class="code-blank" data-id="52-3" data-answer="correctly"></span>.</div>
                </div>`,
        instruction: "填写集成测试用例句子",
        hint: "测试、组件、正确",
        explanation: "集成测试的作用",
        fullSentence: "Integration testing verifies that components work together correctly."
    },
    {
        id: 53,
        type: "sentence",
        title: "冒烟测试用例",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Smoke <span class="code-blank" data-id="53-1" data-answer="testing"></span> checks if the basic <span class="code-blank" data-id="53-2" data-answer="functionality"></span> is <span class="code-blank" data-id="53-3" data-answer="working"></span>.</div>
                </div>`,
        instruction: "填写冒烟测试用例句子",
        hint: "测试、功能、工作",
        explanation: "冒烟测试的目的",
        fullSentence: "Smoke testing checks if the basic functionality is working."
    },
    {
        id: 54,
        type: "sentence",
        title: "验收测试用例",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Acceptance <span class="code-blank" data-id="54-1" data-answer="testing"></span> confirms that the <span class="code-blank" data-id="54-2" data-answer="system"></span> meets user <span class="code-blank" data-id="54-3" data-answer="requirements"></span>.</div>
                </div>`,
        instruction: "填写验收测试用例句子",
        hint: "测试、系统、需求",
        explanation: "验收测试的最终目标",
        fullSentence: "Acceptance testing confirms that the system meets user requirements."
    },
    {
        id: 55,
        type: "sentence",
        title: "测试环境问题",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The test <span class="code-blank" data-id="55-1" data-answer="environment"></span> was not <span class="code-blank" data-id="55-2" data-answer="stable"></span> which caused <span class="code-blank" data-id="55-3" data-answer="delays"></span>.</div>
                </div>`,
        instruction: "填写测试环境问题句子",
        hint: "环境、稳定、延迟",
        explanation: "测试环境不稳定的影响",
        fullSentence: "The test environment was not stable which caused delays."
    },
    {
        id: 56,
        type: "sentence",
        title: "重现困难的问题",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Some bugs are <span class="code-blank" data-id="56-1" data-answer="difficult"></span> to <span class="code-blank" data-id="56-2" data-answer="reproduce"></span> consistently in <span class="code-blank" data-id="56-3" data-answer="testing"></span>.</div>
                </div>`,
        instruction: "填写重现困难的问题句子",
        hint: "困难、重现、测试",
        explanation: "难以重现的bug问题",
        fullSentence: "Some bugs are difficult to reproduce consistently in testing."
    },
    {
        id: 57,
        type: "sentence",
        title: "测试数据不足",
        content: `<div class="p-4 font-mono text-sm">
                    <div>We faced <span class="code-blank" data-id="57-1" data-answer="challenges"></span> due to <span class="code-blank" data-id="57-2" data-answer="insufficient"></span> test <span class="code-blank" data-id="57-3" data-answer="data"></span>.</div>
                </div>`,
        instruction: "填写测试数据不足句子",
        hint: "挑战、不足、数据",
        explanation: "测试数据不足带来的困难",
        fullSentence: "We faced challenges due to insufficient test data."
    },
    {
        id: 58,
        type: "sentence",
        title: "时间压力问题",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Tight <span class="code-blank" data-id="58-1" data-answer="deadlines"></span> made it <span class="code-blank" data-id="58-2" data-answer="hard"></span> to complete <span class="code-blank" data-id="58-3" data-answer="testing"></span>.</div>
                </div>`,
        instruction: "填写时间压力问题句子",
        hint: "截止日期、困难、测试",
        explanation: "时间压力对测试的影响",
        fullSentence: "Tight deadlines made it hard to complete testing."
    },
    {
        id: 59,
        type: "sentence",
        title: "复杂系统集成",
        content: `<div class="p-4 font-mono text-sm">
                    <div>Complex system <span class="code-blank" data-id="59-1" data-answer="integration"></span> created many <span class="code-blank" data-id="59-2" data-answer="unexpected"></span> <span class="code-blank" data-id="59-3" data-answer="issues"></span>.</div>
                </div>`,
        instruction: "填写复杂系统集成句子",
        hint: "集成、意外、问题",
        explanation: "复杂系统集成带来的挑战",
        fullSentence: "Complex system integration created many unexpected issues."
    },
    {
        id: 60,
        type: "sentence",
        title: "ADAS测试完整流程",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The complete ADAS testing <span class="code-blank" data-id="60-1" data-answer="process"></span> begins with <span class="code-blank" data-id="60-2" data-answer="requirements"></span> analysis where we thoroughly review the functional specifications and performance criteria for each ADAS feature including lane keeping assistance, adaptive cruise control, automatic emergency braking, and blind spot detection. After requirements analysis, we proceed to test <span class="code-blank" data-id="60-3" data-answer="planning"></span> phase where we develop detailed test cases covering various scenarios such as highway driving, urban environments, adverse weather conditions, and edge cases like sudden obstacles or sensor failures. The third phase involves <span class="code-blank" data-id="60-4" data-answer="environment"></span> setup where we configure the test vehicles with necessary sensors including cameras, radar, lidar, and ultrasonic sensors, ensuring proper calibration and integration with the vehicle's electronic control units. During test execution, we conduct both <span class="code-blank" data-id="60-5" data-answer="simulation"></span> testing using sophisticated software tools and real-world testing on closed tracks and public roads to validate system performance under realistic conditions. We meticulously document all test results, including system responses, false positives, false negatives, and performance metrics such as detection range, response time, and accuracy rates. The final phase includes <span class="code-blank" data-id="60-6" data-answer="reporting"></span> and analysis where we compile comprehensive test reports, identify any deviations from expected behavior, and provide detailed recommendations for system improvements or bug fixes to the development team.</div>
                </div>`,
        instruction: "填写ADAS测试完整流程句子",
        hint: "流程、需求、规划、环境、仿真、报告",
        explanation: "ADAS测试的完整流程包括需求分析、测试规划、环境设置、测试执行和报告分析",
        fullSentence: "The complete ADAS testing process begins with requirements analysis where we thoroughly review the functional specifications and performance criteria for each ADAS feature including lane keeping assistance, adaptive cruise control, automatic emergency braking, and blind spot detection. After requirements analysis, we proceed to test planning phase where we develop detailed test cases covering various scenarios such as highway driving, urban environments, adverse weather conditions, and edge cases like sudden obstacles or sensor failures. The third phase involves environment setup where we configure the test vehicles with necessary sensors including cameras, radar, lidar, and ultrasonic sensors, ensuring proper calibration and integration with the vehicle's electronic control units. During test execution, we conduct both simulation testing using sophisticated software tools and real-world testing on closed tracks and public roads to validate system performance under realistic conditions. We meticulously document all test results, including system responses, false positives, false negatives, and performance metrics such as detection range, response time, and accuracy rates. The final phase includes reporting and analysis where we compile comprehensive test reports, identify any deviations from expected behavior, and provide detailed recommendations for system improvements or bug fixes to the development team."
    },
    {
        id: 61,
        type: "sentence",
        title: "ETC测试完整流程",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The comprehensive Electronic Toll Collection (ETC) testing <span class="code-blank" data-id="61-1" data-answer="procedure"></span> starts with system <span class="code-blank" data-id="61-2" data-answer="architecture"></span> review where we analyze the complete ETC ecosystem including onboard units (OBUs), roadside equipment (RSE), backend servers, payment gateways, and communication protocols such as DSRC or 5.9 GHz dedicated short-range communications. Following architecture analysis, we move to functional <span class="code-blank" data-id="61-3" data-answer="validation"></span> where we test core functionalities including vehicle detection, toll calculation based on vehicle classification, transaction processing, receipt generation, and account management. We conduct extensive performance testing to evaluate system <span class="code-blank" data-id="61-4" data-answer="reliability"></span> under various conditions such as high traffic volumes, different vehicle speeds (from 5 km/h to 120 km/h), adverse weather conditions, and simultaneous multiple vehicle transactions. Security testing is crucial and involves testing encryption algorithms, authentication mechanisms, data privacy compliance, and vulnerability assessments to prevent unauthorized access or fraudulent activities. Integration testing ensures seamless <span class="code-blank" data-id="61-5" data-answer="interoperability"></span> between different ETC systems from various manufacturers and compatibility with existing toll infrastructure. The testing process also includes user acceptance testing (UAT) where we validate the system from end-user perspective, ensuring intuitive user interfaces, clear error messages, and efficient customer support mechanisms. Finally, we conduct regulatory compliance testing to ensure the system meets all legal requirements and industry standards before deployment.</div>
                </div>`,
        instruction: "填写ETC测试完整流程句子",
        hint: "流程、架构、验证、可靠性、互操作性",
        explanation: "ETC测试的完整流程包括架构分析、功能验证、性能测试、安全测试、集成测试和合规性测试",
        fullSentence: "The comprehensive Electronic Toll Collection (ETC) testing procedure starts with system architecture review where we analyze the complete ETC ecosystem including onboard units (OBUs), roadside equipment (RSE), backend servers, payment gateways, and communication protocols such as DSRC or 5.9 GHz dedicated short-range communications. Following architecture analysis, we move to functional validation where we test core functionalities including vehicle detection, toll calculation based on vehicle classification, transaction processing, receipt generation, and account management. We conduct extensive performance testing to evaluate system reliability under various conditions such as high traffic volumes, different vehicle speeds (from 5 km/h to 120 km/h), adverse weather conditions, and simultaneous multiple vehicle transactions. Security testing is crucial and involves testing encryption algorithms, authentication mechanisms, data privacy compliance, and vulnerability assessments to prevent unauthorized access or fraudulent activities. Integration testing ensures seamless interoperability between different ETC systems from various manufacturers and compatibility with existing toll infrastructure. The testing process also includes user acceptance testing (UAT) where we validate the system from end-user perspective, ensuring intuitive user interfaces, clear error messages, and efficient customer support mechanisms. Finally, we conduct regulatory compliance testing to ensure the system meets all legal requirements and industry standards before deployment."
    },
    {
        id: 62,
        type: "sentence",
        title: "蓝牙测试完整流程",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The complete Bluetooth testing <span class="code-blank" data-id="62-1" data-answer="workflow"></span> encompasses multiple testing <span class="code-blank" data-id="62-2" data-answer="dimensions"></span> starting with protocol conformance testing to verify compliance with Bluetooth SIG specifications including core protocols, profiles, and service discovery procedures. We then proceed to <span class="code-blank" data-id="62-3" data-answer="interoperability"></span> testing where we validate seamless connectivity and data exchange between the device under test and various Bluetooth-enabled products from different manufacturers such as smartphones, headphones, speakers, and automotive infotainment systems. Performance testing evaluates key metrics including connection establishment time, data transfer rates for different Bluetooth versions (from classic Bluetooth to Bluetooth 5.3), audio quality for A2DP profile, battery consumption during active connections, and range testing under various environmental conditions. Security testing is essential and involves assessing pairing mechanisms, encryption strength, vulnerability to common attacks like bluejacking or bluesnarfing, and compliance with Bluetooth security protocols. We conduct stress testing to evaluate system stability under extreme conditions such as maximum number of connected devices, continuous data streaming, and interference from other wireless signals in the 2.4 GHz band. User experience testing focuses on intuitive pairing processes, stable connection maintenance, automatic reconnection capabilities, and graceful handling of connection drops or signal interruptions. The final phase includes certification testing to ensure the product meets all Bluetooth qualification program requirements before market release.</div>
                </div>`,
        instruction: "填写蓝牙测试完整流程句子",
        hint: "工作流、维度、互操作性",
        explanation: "蓝牙测试的完整流程包括协议一致性测试、互操作性测试、性能测试、安全测试、压力测试和认证测试",
        fullSentence: "The complete Bluetooth testing workflow encompasses multiple testing dimensions starting with protocol conformance testing to verify compliance with Bluetooth SIG specifications including core protocols, profiles, and service discovery procedures. We then proceed to interoperability testing where we validate seamless connectivity and data exchange between the device under test and various Bluetooth-enabled products from different manufacturers such as smartphones, headphones, speakers, and automotive infotainment systems. Performance testing evaluates key metrics including connection establishment time, data transfer rates for different Bluetooth versions (from classic Bluetooth to Bluetooth 5.3), audio quality for A2DP profile, battery consumption during active connections, and range testing under various environmental conditions. Security testing is essential and involves assessing pairing mechanisms, encryption strength, vulnerability to common attacks like bluejacking or bluesnarfing, and compliance with Bluetooth security protocols. We conduct stress testing to evaluate system stability under extreme conditions such as maximum number of connected devices, continuous data streaming, and interference from other wireless signals in the 2.4 GHz band. User experience testing focuses on intuitive pairing processes, stable connection maintenance, automatic reconnection capabilities, and graceful handling of connection drops or signal interruptions. The final phase includes certification testing to ensure the product meets all Bluetooth qualification program requirements before market release."
    },
    {
        id: 63,
        type: "sentence",
        title: "ADAS测试自我介绍",
        content: `<div class="p-4 font-mono text-sm">
                    <div>As an experienced ADAS testing <span class="code-blank" data-id="63-1" data-answer="engineer"></span> with over five years of specialized experience in automotive safety systems, I have developed comprehensive expertise in testing advanced driver assistance technologies including adaptive cruise control, lane keeping assistance, automatic emergency braking, blind spot detection, and traffic sign recognition systems. My professional <span class="code-blank" data-id="63-2" data-answer="background"></span> includes extensive hands-on experience with both simulation-based testing using tools like CarMaker, dSPACE, and Vector CANoe, as well as real-world testing on closed tracks and public roads under various environmental conditions. I possess deep knowledge of automotive communication protocols including CAN, LIN, FlexRay, and Automotive Ethernet, along with proficiency in sensor technologies such as cameras, radar, lidar, and ultrasonic sensors. Throughout my career, I have successfully led multiple ADAS testing projects from requirements analysis and test planning to execution and reporting, consistently ensuring that systems meet rigorous safety standards including ISO 26262 functional safety requirements. My testing <span class="code-blank" data-id="63-3" data-answer="methodology"></span> emphasizes systematic approach to risk assessment, comprehensive test case development covering normal operation, edge cases, and failure scenarios, and meticulous documentation of test results with detailed analysis of system performance metrics. I have particular expertise in developing test scenarios for complex driving situations such as highway merging, intersection navigation, adverse weather conditions, and pedestrian detection in urban environments. My technical skills include programming in Python for test automation, data analysis using MATLAB and Simulink, and working with automotive diagnostic tools for system debugging and validation. I am passionate about automotive safety and continuously stay updated with the latest industry trends and regulatory requirements to ensure that the ADAS systems I test provide maximum protection for vehicle occupants and other road users. My collaborative approach involves close coordination with development teams, system architects, and quality assurance specialists to identify potential issues early in the development lifecycle and contribute to continuous improvement of testing processes and methodologies.</div>
                </div>`,
        instruction: "填写ADAS测试自我介绍句子",
        hint: "工程师、背景、方法论",
        explanation: "ADAS测试工程师的完整自我介绍，涵盖专业背景、技术技能和测试经验",
        fullSentence: "As an experienced ADAS testing engineer with over five years of specialized experience in automotive safety systems, I have developed comprehensive expertise in testing advanced driver assistance technologies including adaptive cruise control, lane keeping assistance, automatic emergency braking, blind spot detection, and traffic sign recognition systems. My professional background includes extensive hands-on experience with both simulation-based testing using tools like CarMaker, dSPACE, and Vector CANoe, as well as real-world testing on closed tracks and public roads under various environmental conditions. I possess deep knowledge of automotive communication protocols including CAN, LIN, FlexRay, and Automotive Ethernet, along with proficiency in sensor technologies such as cameras, radar, lidar, and ultrasonic sensors. Throughout my career, I have successfully led multiple ADAS testing projects from requirements analysis and test planning to execution and reporting, consistently ensuring that systems meet rigorous safety standards including ISO 26262 functional safety requirements. My testing methodology emphasizes systematic approach to risk assessment, comprehensive test case development covering normal operation, edge cases, and failure scenarios, and meticulous documentation of test results with detailed analysis of system performance metrics. I have particular expertise in developing test scenarios for complex driving situations such as highway merging, intersection navigation, adverse weather conditions, and pedestrian detection in urban environments. My technical skills include programming in Python for test automation, data analysis using MATLAB and Simulink, and working with automotive diagnostic tools for system debugging and validation. I am passionate about automotive safety and continuously stay updated with the latest industry trends and regulatory requirements to ensure that the ADAS systems I test provide maximum protection for vehicle occupants and other road users. My collaborative approach involves close coordination with development teams, system architects, and quality assurance specialists to identify potential issues early in the development lifecycle and contribute to continuous improvement of testing processes and methodologies."
    },
    {
        id: 64,
        type: "sentence",
        title: "车载娱乐系统测试自我介绍",
        content: `<div class="p-4 font-mono text-sm">
                    <div>As a dedicated automotive infotainment system testing <span class="code-blank" data-id="64-1" data-answer="specialist"></span> with extensive experience in evaluating modern vehicle entertainment and connectivity features, I bring comprehensive expertise in testing integrated systems that combine audio/video playback, navigation, smartphone integration, voice recognition, and connectivity technologies. My professional journey has involved testing various infotainment platforms including QNX, Android Automotive, and GENIVI-based systems, with particular focus on user experience quality, system <span class="code-blank" data-id="64-2" data-answer="performance"></span> stability, and seamless integration with vehicle networks. I have developed specialized testing methodologies for evaluating touchscreen responsiveness, voice command accuracy, Bluetooth and Wi-Fi connectivity reliability, and multimedia playback quality under different operating conditions. My testing approach encompasses both functional validation and non-functional aspects including usability testing, compatibility testing with various mobile devices and operating systems, and performance testing under extreme temperature conditions and electrical noise environments. I possess deep knowledge of automotive software architectures, middleware components, and human-machine interface (HMI) design principles, enabling me to identify subtle usability issues and provide constructive feedback for user interface improvements. Throughout my career, I have contributed to the testing of advanced features such as Apple CarPlay and Android Auto integration, over-the-air (OTA) update mechanisms, cloud-based services, and personalized user profiles. My technical skill set includes proficiency with automotive diagnostic tools, CAN bus analysis, multimedia testing equipment, and automated testing frameworks for regression testing and continuous integration. I have particular expertise in developing test scenarios that simulate real-world usage patterns including simultaneous operation of multiple features, stress testing during system boot-up and shutdown sequences, and validation of fail-safe mechanisms during system failures. My collaborative work style involves close partnership with UX designers, software developers, and hardware engineers to ensure that infotainment systems deliver intuitive, reliable, and enjoyable experiences for vehicle occupants. I am committed to staying current with emerging technologies in the automotive entertainment space and continuously refining testing strategies to address the evolving demands of connected vehicles and smart mobility solutions.</div>
                </div>`,
        instruction: "填写车载娱乐系统测试自我介绍句子",
        hint: "专家、性能",
        explanation: "车载娱乐系统测试专家的完整自我介绍，涵盖技术专长、测试方法和行业经验",
        fullSentence: "As a dedicated automotive infotainment system testing specialist with extensive experience in evaluating modern vehicle entertainment and connectivity features, I bring comprehensive expertise in testing integrated systems that combine audio/video playback, navigation, smartphone integration, voice recognition, and connectivity technologies. My professional journey has involved testing various infotainment platforms including QNX, Android Automotive, and GENIVI-based systems, with particular focus on user experience quality, system performance stability, and seamless integration with vehicle networks. I have developed specialized testing methodologies for evaluating touchscreen responsiveness, voice command accuracy, Bluetooth and Wi-Fi connectivity reliability, and multimedia playback quality under different operating conditions. My testing approach encompasses both functional validation and non-functional aspects including usability testing, compatibility testing with various mobile devices and operating systems, and performance testing under extreme temperature conditions and electrical noise environments. I possess deep knowledge of automotive software architectures, middleware components, and human-machine interface (HMI) design principles, enabling me to identify subtle usability issues and provide constructive feedback for user interface improvements. Throughout my career, I have contributed to the testing of advanced features such as Apple CarPlay and Android Auto integration, over-the-air (OTA) update mechanisms, cloud-based services, and personalized user profiles. My technical skill set includes proficiency with automotive diagnostic tools, CAN bus analysis, multimedia testing equipment, and automated testing frameworks for regression testing and continuous integration. I have particular expertise in developing test scenarios that simulate real-world usage patterns including simultaneous operation of multiple features, stress testing during system boot-up and shutdown sequences, and validation of fail-safe mechanisms during system failures. My collaborative work style involves close partnership with UX designers, software developers, and hardware engineers to ensure that infotainment systems deliver intuitive, reliable, and enjoyable experiences for vehicle occupants. I am committed to staying current with emerging technologies in the automotive entertainment space and continuously refining testing strategies to address the evolving demands of connected vehicles and smart mobility solutions."
    },
    {
        id: 65,
        type: "sentence",
        title: "ADAS测试每周工作流程",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The weekly ADAS testing <span class="code-blank" data-id="65-1" data-answer="workflow"></span> begins each Monday morning with a comprehensive team <span class="code-blank" data-id="65-2" data-answer="meeting"></span> where we review the previous week's test results, discuss any critical issues identified, and plan the current week's testing priorities based on project milestones and development progress. Monday afternoon is dedicated to test environment <span class="code-blank" data-id="65-3" data-answer="preparation"></span> where we ensure all test vehicles are properly equipped with the latest software builds, sensors are calibrated correctly, and simulation tools are configured for the planned test scenarios. Tuesday and Wednesday are focused on intensive test <span class="code-blank" data-id="65-4" data-answer="execution"></span> activities including both laboratory simulations and real-world driving tests covering various ADAS features such as adaptive cruise control, lane keeping assistance, automatic emergency braking, and blind spot detection under different environmental conditions. Thursday morning involves detailed data <span class="code-blank" data-id="65-5" data-answer="analysis"></span> where we review test logs, analyze system performance metrics, identify anomalies or deviations from expected behavior, and prepare preliminary test reports. Thursday afternoon is reserved for collaboration sessions with development teams to discuss findings, provide feedback on system performance, and coordinate any necessary software updates or bug fixes. Friday morning focuses on comprehensive test reporting where we finalize weekly test documentation, update test management systems with results, and prepare status updates for project stakeholders. Friday afternoon is dedicated to test process improvement activities including reviewing testing methodologies, identifying opportunities for automation, and planning for the following week's testing activities. Throughout the week, we maintain continuous communication with cross-functional teams, conduct daily stand-up meetings to address emerging issues, and ensure alignment with overall project timelines and quality objectives.</div>
                </div>`,
        instruction: "填写ADAS测试每周工作流程句子",
        hint: "工作流、会议、准备、执行、分析",
        explanation: "ADAS测试工程师的每周工作流程，涵盖计划、准备、执行、分析和报告等环节",
        fullSentence: "The weekly ADAS testing workflow begins each Monday morning with a comprehensive team meeting where we review the previous week's test results, discuss any critical issues identified, and plan the current week's testing priorities based on project milestones and development progress. Monday afternoon is dedicated to test environment preparation where we ensure all test vehicles are properly equipped with the latest software builds, sensors are calibrated correctly, and simulation tools are configured for the planned test scenarios. Tuesday and Wednesday are focused on intensive test execution activities including both laboratory simulations and real-world driving tests covering various ADAS features such as adaptive cruise control, lane keeping assistance, automatic emergency braking, and blind spot detection under different environmental conditions. Thursday morning involves detailed data analysis where we review test logs, analyze system performance metrics, identify anomalies or deviations from expected behavior, and prepare preliminary test reports. Thursday afternoon is reserved for collaboration sessions with development teams to discuss findings, provide feedback on system performance, and coordinate any necessary software updates or bug fixes. Friday morning focuses on comprehensive test reporting where we finalize weekly test documentation, update test management systems with results, and prepare status updates for project stakeholders. Friday afternoon is dedicated to test process improvement activities including reviewing testing methodologies, identifying opportunities for automation, and planning for the following week's testing activities. Throughout the week, we maintain continuous communication with cross-functional teams, conduct daily stand-up meetings to address emerging issues, and ensure alignment with overall project timelines and quality objectives."
    },
    {
        id: 66,
        type: "sentence",
        title: "车载娱乐系统测试每周工作流程",
        content: `<div class="p-4 font-mono text-sm">
                    <div>The weekly automotive infotainment system testing <span class="code-blank" data-id="66-1" data-answer="schedule"></span> starts on Monday with test planning and <span class="code-blank" data-id="66-2" data-answer="coordination"></span> activities where we review the test backlog, prioritize features based on development progress and customer requirements, and allocate testing resources accordingly. Monday afternoon involves test case <span class="code-blank" data-id="66-3" data-answer="development"></span> and environment setup where we prepare test scenarios for new features, update existing test cases for regression testing, and configure test benches with the latest software builds and hardware configurations. Tuesday through Thursday are dedicated to comprehensive test <span class="code-blank" data-id="66-4" data-answer="validation"></span> covering various aspects including multimedia functionality (audio/video playback quality, codec compatibility), connectivity features (Bluetooth, Wi-Fi, cellular connectivity), navigation system accuracy, voice recognition performance, smartphone integration (Apple CarPlay, Android Auto), and user interface responsiveness. Each day includes specific focus areas: Tuesday for core functionality testing, Wednesday for performance and stress testing under different operating conditions, and Thursday for compatibility testing with various mobile devices and operating systems. Friday morning is reserved for defect <span class="code-blank" data-id="66-5" data-answer="management"></span> and reporting where we consolidate test results, document identified issues with detailed reproduction steps and severity ratings, and prepare comprehensive test reports for development teams. Friday afternoon focuses on test automation activities including script development, maintenance of automated test suites, and analysis of test coverage metrics. Throughout the week, we conduct daily status meetings to track testing progress, address blocking issues, and ensure timely feedback to development teams. We also allocate time for exploratory testing to identify usability issues and provide constructive feedback for user experience improvements.</div>
                </div>`,
        instruction: "填写车载娱乐系统测试每周工作流程句子",
        hint: "日程、协调、开发、验证、管理",
        explanation: "车载娱乐系统测试的每周工作流程，包括计划、测试、验证、缺陷管理和自动化等活动",
        fullSentence: "The weekly automotive infotainment system testing schedule starts on Monday with test planning and coordination activities where we review the test backlog, prioritize features based on development progress and customer requirements, and allocate testing resources accordingly. Monday afternoon involves test case development and environment setup where we prepare test scenarios for new features, update existing test cases for regression testing, and configure test benches with the latest software builds and hardware configurations. Tuesday through Thursday are dedicated to comprehensive test validation covering various aspects including multimedia functionality (audio/video playback quality, codec compatibility), connectivity features (Bluetooth, Wi-Fi, cellular connectivity), navigation system accuracy, voice recognition performance, smartphone integration (Apple CarPlay, Android Auto), and user interface responsiveness. Each day includes specific focus areas: Tuesday for core functionality testing, Wednesday for performance and stress testing under different operating conditions, and Thursday for compatibility testing with various mobile devices and operating systems. Friday morning is reserved for defect management and reporting where we consolidate test results, document identified issues with detailed reproduction steps and severity ratings, and prepare comprehensive test reports for development teams. Friday afternoon focuses on test automation activities including script development, maintenance of automated test suites, and analysis of test coverage metrics. Throughout the week, we conduct daily status meetings to track testing progress, address blocking issues, and ensure timely feedback to development teams. We also allocate time for exploratory testing to identify usability issues and provide constructive feedback for user experience improvements."
    }
];