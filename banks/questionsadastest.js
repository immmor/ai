const questionsadastest = [
    {
        id: 1,
        type: "select",
        title: "ADAS 基础概念",
        content: `<div class="p-4 text-sm">
                    <p>ADAS 的英文全称是什么？</p>
                </div>`,
        options: ["Advanced Driver Assistance Systems", "Automated Driving Autonomous System", "Advanced Driving and Safety", "Automatic Driver Alert System"],
        correct: 0,
        explanation: "ADAS 全称为 Advanced Driver Assistance Systems（高级驾驶辅助系统），用于提升驾驶安全和舒适性。"
    },
    {
        id: 2,
        type: "select",
        title: "HIL 测试概念",
        content: `<div class="p-4 text-sm">
                    <p>HIL（Hardware-in-the-Loop）测试的主要目的是什么？</p>
                </div>`,
        options: [
            "在真实车辆上测试硬件",
            "用实时仿真环境连接真实硬件进行闭环测试",
            "纯软件仿真测试",
            "在生产线上的硬件测试"
        ],
        correct: 1,
        explanation: "HIL 测试将真实硬件（如 ECU）接入实时仿真环境，模拟车辆和道路工况，进行闭环验证。"
    },
    {
        id: 3,
        type: "fill",
        title: "ADAS 感知传感器",
        content: `<div class="p-4 font-mono text-sm">
                    <div>ADAS 常用的三种主要感知传感器：</div>
                    <div>1. 激光<span class="code-blank" data-id="3" data-answer="雷达"></span>（LiDAR）</div>
                    <div>2. 毫米波<span class="code-blank" data-id="3-2" data-answer="雷达"></span>（Radar）</div>
                    <div>3. 视觉<span class="code-blank" data-id="3-3" data-answer="摄像头"></span>（Camera）</div>
                </div>`,
        instruction: "填写传感器名称",
        hint: "三种传感器的中文名称",
        explanation: "ADAS 三大核心传感器：激光雷达（LiDAR）、毫米波雷达（Radar）、视觉摄像头（Camera）。"
    },
    {
        id: 4,
        type: "correct",
        title: "ADAS 功能识别",
        content: `<div class="p-4 font-mono text-sm">
                    <div>以下哪个不是标准的 ADAS 功能：</div>
                    <div>A. ACC（自适应巡航控制）</div>
                    <div>B. AEB（自动紧急制动）</div>
                    <div>C. GPS（全球定位系统）</div>
                    <div>D. LKA（车道保持辅助）</div>
                </div>`,
        instruction: "找出不属于 ADAS 功能的选项（输入选项字母）",
        correct: "C",
        hint: "GPS 是定位系统，不属于 ADAS 功能",
        explanation: "GPS 是基础定位技术，不属于 ADAS 功能。ACC、AEB、LKA 都是标准的 ADAS 功能。"
    },
    {
        id: 5,
        type: "sentence",
        title: "HIL 测试系统组成",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">HIL 测试系统的核心组件包括：<span class="code-blank" data-id="5-1" data-answer="实时处理器"></span>、<span class="code-blank" data-id="5-2" data-answer="I/O接口板卡"></span>、<span class="code-blank" data-id="5-3" data-answer="负载仿真"></span>单元和<span class="code-blank" data-id="5-4" data-answer="故障注入"></span>单元。</p>
                </div>`,
        instruction: "填写 HIL 系统的核心组件",
        hint: "实时处理器、I/O接口、负载仿真、故障注入",
        explanation: "HIL 系统由实时处理器、I/O接口板卡、负载仿真单元和故障注入单元组成。",
        fullSentence: "HIL 测试系统的核心组件包括：实时处理器、I/O接口板卡、负载仿真单元和故障注入单元。"
    },
    {
        id: 6,
        type: "select",
        title: "传感器融合",
        content: `<div class="p-4 text-sm">
                    <p>传感器融合（Sensor Fusion）的主要优势是什么？</p>
                </div>`,
        options: [
            "降低硬件成本",
            "通过多传感器互补提高感知可靠性和鲁棒性",
            "减少数据处理量",
            "简化系统架构"
        ],
        correct: 1,
        explanation: "传感器融合通过融合摄像头、雷达、激光雷达等多传感器数据，弥补单一传感器的局限，提高环境感知的准确性和可靠性。"
    },
    {
        id: 7,
        type: "fill",
        title: "ADAS 功能等级",
        content: `<div class="p-4 font-mono text-sm">
                    <div>SAE 将驾驶自动化分为 L0 到 <span class="code-blank" data-id="7" data-answer="L5"></span> 六个等级。</div>
                    <div>其中 L3 级定义为<span class="code-blank" data-id="7-2" data-answer="有条件自动驾驶"></span>。</div>
                </div>`,
        instruction: "填写自动化等级",
        hint: "最高等级和 L3 的定义",
        explanation: "SAE J3016 将驾驶自动化分为 L0-L5 六个等级，L3 为有条件自动驾驶，系统在特定条件下可完全接管驾驶。"
    },
    {
        id: 8,
        type: "select",
        title: "测试层级对比",
        content: `<div class="p-4 text-sm">
                    <p>以下关于 MIL / SIL / HIL 的描述，哪项是正确的？</p>
                </div>`,
        options: [
            "MIL 比 HIL 更接近真实系统",
            "SIL 使用真实硬件进行测试",
            "HIL 包含真实硬件接入实时仿真环境",
            "三种测试方法的测试覆盖范围完全相同"
        ],
        correct: 2,
        explanation: "MIL（Model-in-the-Loop）测试模型，SIL（Software-in-the-Loop）测试软件，HIL（Hardware-in-the-Loop）将真实硬件接入实时仿真，三者逐级逼近真实系统。"
    },
    {
        id: 9,
        type: "sentence",
        title: "传感器特性对比",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">三种 ADAS 传感器特性对比：</p>
                    <p class="mb-2">激光雷达（LiDAR）擅长<span class="code-blank" data-id="9-1" data-answer="3D点云"></span>感知，精度高但受<span class="code-blank" data-id="9-2" data-answer="天气"></span>影响大。</p>
                    <p class="mb-2">毫米波雷达擅长<span class="code-blank" data-id="9-3" data-answer="速度"></span>测量和远距离探测。</p>
                    <p class="mb-2">摄像头擅长<span class="code-blank" data-id="9-4" data-answer="语义"></span>识别（如交通标志、车道线）。</p>
                </div>`,
        instruction: "填写三种传感器的关键特性",
        hint: "3D点云、天气、速度、语义",
        explanation: "LiDAR 提供高精度 3D 点云，但对恶劣天气敏感；Radar 擅长测速和远距；Camera 擅长语义理解。",
        fullSentence: "激光雷达（LiDAR）擅长3D点云感知，精度高但受天气影响大。毫米波雷达擅长速度测量和远距离探测。摄像头擅长语义识别（如交通标志、车道线）。"
    },
    {
        id: 10,
        type: "select",
        title: "功能安全标准",
        content: `<div class="p-4 text-sm">
                    <p>ADAS 系统开发遵循的功能安全标准是什么？</p>
                </div>`,
        options: ["ISO 9001", "ISO 26262", "ISO 14001", "ISO 21434"],
        correct: 1,
        explanation: "ISO 26262 是道路车辆功能安全标准，规定了从概念到量产的完整功能安全开发流程。ISO 21434 是网络安全标准。"
    },
    {
        id: 11,
        type: "fill",
        title: "ADAS 测试验证",
        content: `<div class="p-4 font-mono text-sm">
                    <div>ADAS 系统的 V 模型开发流程中，</div>
                    <div>左侧为<span class="code-blank" data-id="11" data-answer="需求"></span>分解和系统设计，</div>
                    <div>右侧为集成测试和<span class="code-blank" data-id="11-2" data-answer="验证"></span>。</div>
                </div>`,
        instruction: "填写 V 模型开发流程",
        hint: "需求、验证",
        explanation: "V 模型左侧从需求到系统/组件设计逐级分解，右侧从单元测试到系统集成验证逐级确认。"
    },
    {
        id: 12,
        type: "sentence",
        title: "实时仿真系统",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">HIL 测试中，实时仿真系统需要运行：</p>
                    <p class="mb-2">1. <span class="code-blank" data-id="12-1" data-answer="车辆动力学"></span>模型（车辆运动行为）</p>
                    <p class="mb-2">2. <span class="code-blank" data-id="12-2" data-answer="道路环境"></span>模型（路面、交通参与者）</p>
                    <p class="mb-2">3. <span class="code-blank" data-id="12-3" data-answer="传感器"></span>模型（摄像头、雷达、LiDAR 仿真）</p>
                    <p class="mb-2">4. <span class="code-blank" data-id="12-4" data-answer="执行器"></span>模型（制动、转向、油门响应）</p>
                </div>`,
        instruction: "填写 HIL 实时仿真系统的关键模型",
        hint: "车辆动力学、道路环境、传感器、执行器",
        explanation: "HIL 实时仿真需同时运行车辆动力学、道路环境、传感器和执行器模型，构成完整的闭环测试环境。",
        fullSentence: "HIL 测试中实时仿真系统需运行车辆动力学模型（车辆运动行为）、道路环境模型（路面、交通参与者）、传感器模型（摄像头、雷达、LiDAR 仿真）和执行器模型（制动、转向、油门响应）。"
    },
    {
        id: 13,
        type: "select",
        title: "车载通信协议",
        content: `<div class="p-4 text-sm">
                    <p>ADAS 系统中 ECU 之间最常用的通信协议是什么？</p>
                </div>`,
        options: ["USB", "CAN/CAN-FD", "Bluetooth", "Wi-Fi"],
        correct: 1,
        explanation: "CAN（Controller Area Network）和 CAN-FD 是汽车电子中最常用的总线通信协议，用于 ECU 之间的实时数据交换。"
    },
    {
        id: 14,
        type: "sentence",
        title: "ADAS 测试场景",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">典型的 ADAS 测试场景包括：</p>
                    <p class="mb-1">• <span class="code-blank" data-id="14-1" data-answer="前车急刹"></span>场景（测试 AEB 功能）</p>
                    <p class="mb-1">• 行人<span class="code-blank" data-id="14-2" data-answer="横穿马路"></span>场景（测试行人检测）</p>
                    <p class="mb-1">• 车道<span class="code-blank" data-id="14-3" data-answer="保持"></span>场景（测试 LKA 功能）</p>
                    <p class="mb-1">• <span class="code-blank" data-id="14-4" data-answer="自适应巡航"></span>跟车场景（测试 ACC 功能）</p>
                </div>`,
        instruction: "填写 ADAS 测试场景",
        hint: "前车急刹、横穿马路、保持、自适应巡航",
        explanation: "ADAS 测试需覆盖法规和标准定义的关键场景，包括前车急刹、行人横穿、车道保持、自适应巡航等。",
        fullSentence: "典型的 ADAS 测试场景包括：前车急刹场景（测试 AEB 功能）、行人横穿马路场景（测试行人检测）、车道保持场景（测试 LKA 功能）、自适应巡航跟车场景（测试 ACC 功能）。"
    },
    {
        id: 15,
        type: "fill",
        title: "传感器标定",
        content: `<div class="p-4 font-mono text-sm">
                    <div>传感器标定分为<span class="code-blank" data-id="15" data-answer="内参"></span>标定和<span class="code-blank" data-id="15-2" data-answer="外参"></span>标定。</div>
                    <div>内参标定确定传感器的<span class="code-blank" data-id="15-3" data-answer="内部参数"></span>，</div>
                    <div>外参标定确定传感器之间的<span class="code-blank" data-id="15-4" data-answer="坐标系"></span>转换关系。</div>
                </div>`,
        instruction: "填写传感器标定的概念",
        hint: "内参、外参、内部参数、坐标系",
        explanation: "内参标定确定传感器自身的参数（如焦距、畸变系数），外参标定确定不同传感器坐标系之间的旋转和平移关系。"
    },
    {
        id: 16,
        type: "select",
        title: "故障注入测试",
        content: `<div class="p-4 text-sm">
                    <p>HIL 测试中故障注入（Fault Injection）的目的是什么？</p>
                </div>`,
        options: [
            "提高系统性能",
            "验证系统在异常情况下的安全响应",
            "降低测试成本",
            "缩短开发周期"
        ],
        correct: 1,
        explanation: "故障注入通过模拟传感器失效、通信中断、信号异常等故障，验证系统能否正确检测故障并进入安全状态（Fail-Safe）。"
    },
    {
        id: 17,
        type: "sentence",
        title: "ADAS 感知与决策",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">ADAS 系统的工作流程：</p>
                    <p class="mb-1">1. <span class="code-blank" data-id="17-1" data-answer="感知"></span>层：传感器采集环境数据</p>
                    <p class="mb-1">2. <span class="code-blank" data-id="17-2" data-answer="融合"></span>层：多传感器数据融合</p>
                    <p class="mb-1">3. <span class="code-blank" data-id="17-3" data-answer="决策"></span>层：规划行驶策略</p>
                    <p class="mb-1">4. <span class="code-blank" data-id="17-4" data-answer="执行"></span>层：控制车辆执行动作</p>
                </div>`,
        instruction: "填写 ADAS 系统的工作流程",
        hint: "感知、融合、决策、执行",
        explanation: "ADAS 系统遵循感知→融合→决策→执行的工作流程，形成完整的数据处理和控制链路。",
        fullSentence: "ADAS 系统的工作流程：感知层（传感器采集环境数据）→ 融合层（多传感器数据融合）→ 决策层（规划行驶策略）→ 执行层（控制车辆执行动作）。"
    },
    {
        id: 18,
        type: "select",
        title: "ASIL 等级",
        content: `<div class="p-4 text-sm">
                    <p>ISO 26262 中，ASIL D 表示什么？</p>
                </div>`,
        options: [
            "最低安全等级",
            "最高安全等级，表示最严格的功能安全要求",
            "只适用于软件的安全等级",
            "仅适用于ADAS系统的安全等级"
        ],
        correct: 1,
        explanation: "ASIL（Automotive Safety Integrity Level）分为 A、B、C、D 四个等级，ASIL D 要求最高，通常用于安全关键系统如 AEB、EPS 等。"
    },
    {
        id: 19,
        type: "fill",
        title: "HIL 测试时间参数",
        content: `<div class="p-4 font-mono text-sm">
                    <div>HIL 实时仿真系统的步长通常为</div>
                    <div><span class="code-blank" data-id="19" data-answer="毫秒"></span>级（1-10ms），</div>
                    <div>以保证仿真的<span class="code-blank" data-id="19-2" data-answer="实时性"></span>和<span class="code-blank" data-id="19-3" data-answer="确定性"></span>。</div>
                </div>`,
        instruction: "填写 HIL 仿真实时性要求",
        hint: "毫秒、实时性、确定性",
        explanation: "HIL 系统需要毫秒级的实时步长，确保仿真时间与真实时间同步，并提供确定性的响应。"
    },
    {
        id: 20,
        type: "sentence",
        title: "ADAS 法规认证",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">ADAS 功能需要满足的法规包括：</p>
                    <p class="mb-1">• 欧洲 <span class="code-blank" data-id="20-1" data-answer="Euro NCAP"></span> 安全评级标准</p>
                    <p class="mb-1">• 中国 <span class="code-blank" data-id="20-2" data-answer="C-NCAP"></span> 安全评级标准</p>
                    <p class="mb-1">• 联合国 UN-R<span class="code-blank" data-id="20-3" data-answer="152"></span>（AEB 法规）</p>
                    <p class="mb-1">• 联合国 UN-R<span class="code-blank" data-id="20-4" data-answer="157"></span>（LKA 法规）</p>
                </div>`,
        instruction: "填写 ADAS 法规认证",
        hint: "Euro NCAP、C-NCAP、152、157",
        explanation: "ADAS 功能需满足 Euro NCAP/C-NCAP 安全评级和 UN R152（AEB）、UN R157（LKA）等法规要求。",
        fullSentence: "ADAS 功能需要满足的法规包括：欧洲 Euro NCAP 安全评级标准、中国 C-NCAP 安全评级标准、联合国 UN-R152（AEB 法规）、联合国 UN-R157（LKA 法规）。"
    },
    {
        id: 21,
        type: "select",
        title: "预期功能安全",
        content: `<div class="p-4 text-sm">
                    <p>ISO 21448（SOTIF）关注的是哪类安全问题？</p>
                </div>`,
        options: [
            "电子元件随机硬件失效",
            "系统故障导致的电子故障",
            "预期功能不足或可预见的误用导致的风险",
            "网络攻击导致的安全威胁"
        ],
        correct: 2,
        explanation: "SOTIF（Safety of the Intended Functionality）即预期功能安全，关注因功能不足或人员误用导致的风险，而非硬件随机失效。"
    },
    {
        id: 22,
        type: "select",
        title: "V2X 通信",
        content: `<div class="p-4 text-sm">
                    <p>V2X 通信技术中，V2V 代表什么？</p>
                </div>`,
        options: [
            "车辆与基础设施通信",
            "车辆与车辆通信",
            "车辆与行人通信",
            "车辆与云端通信"
        ],
        correct: 1,
        explanation: "V2V（Vehicle-to-Vehicle）即车-车通信，是 V2X 的重要组成部分，实现车辆间实时信息交换，提升感知范围。"
    },
    {
        id: 23,
        type: "fill",
        title: "高精地图",
        content: `<div class="p-4 font-mono text-sm">
                    <div>高精地图（HD Map）的精度可达<span class="code-blank" data-id="23" data-answer="厘米"></span>级，</div>
                    <div>包含车道线、<span class="code-blank" data-id="23-2" data-answer="坡度"></span>、曲率等详细信息，</div>
                    <div>常用于 L<span class="code-blank" data-id="23-3" data-answer="3"></span> 级及以上自动驾驶系统。</div>
                </div>`,
        instruction: "填写高精地图的关键特性",
        hint: "厘米、坡度、3",
        explanation: "高精地图精度达厘米级，包含车道模型、道路坡度、曲率等几何信息，是 L3 级以上自动驾驶的重要先验信息。"
    },
    {
        id: 24,
        type: "select",
        title: "驾驶员监控系统",
        content: `<div class="p-4 text-sm">
                    <p>DMS（Driver Monitoring System）的主要功能是什么？</p>
                </div>`,
        options: [
            "监控车辆电池状态",
            "监测驾驶员疲劳、分心等状态",
            "监控发动机运行参数",
            "监测胎压变化"
        ],
        correct: 1,
        explanation: "DMS 通过摄像头监测驾驶员面部特征、眼球运动等，判断是否疲劳或分心，并及时发出警报，是 L2/L3 系统的重要安全冗余手段。"
    },
    {
        id: 25,
        type: "correct",
        title: "ADAS 法规辨识",
        content: `<div class="p-4 font-mono text-sm">
                    <div>以下哪个不属于 UN ECE 的 ADAS 相关法规？</div>
                    <div>A. UN-R152（AEB）</div>
                    <div>B. UN-R157（ALKS）</div>
                    <div>C. UN-R155（网络安全）</div>
                    <div>D. UN-R140（排放标准）</div>
                </div>`,
        instruction: "找出不属于 ADAS 法规的选项（输入选项字母）",
        correct: "D",
        hint: "UN-R140 是关于排放的法规",
        explanation: "UN-R140 是车辆排放相关法规。UN-R152（AEB）、UN-R157（ALKS车道保持系统）、UN-R155（网络安全）均与 ADAS 相关。"
    },
    {
        id: 26,
        type: "sentence",
        title: "自动泊车系统",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">APA（自动泊车辅助）系统的工作流程：</p>
                    <p class="mb-1">1. <span class="code-blank" data-id="26-1" data-answer="车位检测"></span>：通过超声波雷达和摄像头搜索车位</p>
                    <p class="mb-1">2. <span class="code-blank" data-id="26-2" data-answer="路径规划"></span>：计算泊入轨迹</p>
                    <p class="mb-1">3. <span class="code-blank" data-id="26-3" data-answer="轨迹跟踪"></span>：控制转向、油门和制动执行泊入</p>
                    <p class="mb-1">4. <span class="code-blank" data-id="26-4" data-answer="泊入完成"></span>：车辆完成泊车并自动挂入 P 挡</p>
                </div>`,
        instruction: "填写 APA 系统的工作流程",
        hint: "车位检测、路径规划、轨迹跟踪、泊入完成",
        explanation: "APA 系统通过超声雷达和摄像头检测车位，规划最优路径，并控制车辆沿轨迹完成泊入。",
        fullSentence: "APA 系统的工作流程：车位检测（通过超声波雷达和摄像头搜索车位）→ 路径规划（计算泊入轨迹）→ 轨迹跟踪（控制转向、油门和制动执行泊入）→ 泊入完成（车辆完成泊车并自动挂入 P 挡）。"
    },
    {
        id: 27,
        type: "select",
        title: "域控制器架构",
        content: `<div class="p-4 text-sm">
                    <p>与传统分布式 ECU 架构相比，域控制器（Domain Controller）架构的主要优势是什么？</p>
                </div>`,
        options: [
            "单个 ECU 算力更强",
            "集中化计算、减少线束、支持 OTA 升级",
            "制造成本更低",
            "更易于维修单个 ECU"
        ],
        correct: 1,
        explanation: "域控制器架构将多个 ECU 功能集中到高性能计算平台，减少线束复杂度，支持软件 OTA 升级，是智能驾驶发展的趋势。"
    },
    {
        id: 28,
        type: "fill",
        title: "仿真测试场景库",
        content: `<div class="p-4 font-mono text-sm">
                    <div>ADAS 仿真测试场景库通常包含：</div>
                    <div>1. <span class="code-blank" data-id="28" data-answer="法规"></span>场景（Euro NCAP、C-NCAP 规定）</div>
                    <div>2. <span class="code-blank" data-id="28-2" data-answer="自然驾驶"></span>场景（真实道路采集数据）</div>
                    <div>3. <span class="code-blank" data-id="28-3" data-answer="边缘"></span>场景（Corner Case，极端罕见情况）</div>
                </div>`,
        instruction: "填写仿真场景库的分类",
        hint: "法规、自然驾驶、边缘",
        explanation: "ADAS 仿真场景库包括法规场景（认证必备）、自然驾驶场景（真实道路）、边缘场景（Corner Case，极端情况）。"
    },
    {
        id: 29,
        type: "sentence",
        title: "ADAS 网络安全",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">ISO 21434 汽车网络安全工程的关键活动包括：</p>
                    <p class="mb-1">• <span class="code-blank" data-id="29-1" data-answer="威胁分析"></span>与风险评估（TARA）</p>
                    <p class="mb-1">• 安全<span class="code-blank" data-id="29-2" data-answer="目标"></span>定义</p>
                    <p class="mb-1">• 安全<span class="code-blank" data-id="29-3" data-answer="架构"></span>设计</p>
                    <p class="mb-1">• 安全<span class="code-blank" data-id="29-4" data-answer="验证"></span>与确认</p>
                </div>`,
        instruction: "填写网络安全关键活动",
        hint: "威胁分析、目标、架构、验证",
        explanation: "ISO 21434 要求从概念阶段开展 TARA，定义安全目标，进行安全架构设计，并贯穿开发过程的验证与确认。",
        fullSentence: "ISO 21434 汽车网络安全工程的关键活动包括：威胁分析与风险评估（TARA）、安全目标定义、安全架构设计、安全验证与确认。"
    },
    {
        id: 30,
        type: "select",
        title: "冗余制动系统",
        content: `<div class="p-4 text-sm">
                    <p>在 L3 级以上自动驾驶中，制动系统通常需要冗余设计，以下哪种方案是常见的冗余制动架构？</p>
                </div>`,
        options: [
            "ESP+iBooster 双冗余架构",
            "使用两个独立的机械制动踏板",
            "仅依靠再生制动",
            "增加制动片数量"
        ],
        correct: 0,
        explanation: "ESP+iBooster 是常见的冗余制动架构，当主制动系统失效时，备用系统可接管制动功能，满足自动驾驶安全要求。"
    },
    {
        id: 31,
        type: "select",
        title: "HIL 测试平台架构",
        content: `<div class="p-4 text-sm">
                    <p>HIL 测试平台的核心实时硬件通常采用什么架构？</p>
                </div>`,
        options: [
            "普通 PC + Windows 系统",
            "FPGA + 多核实时处理器架构",
            "纯单片机系统",
            "云服务器虚拟化方案"
        ],
        correct: 1,
        explanation: "HIL 系统通常采用 FPGA + 多核实时处理器架构，FPGA 处理高速 I/O 和信号仿真，实时处理器运行车辆动力学等复杂模型，确保微秒级确定性响应。"
    },
    {
        id: 32,
        type: "select",
        title: "RCP 快速控制原型",
        content: `<div class="p-4 text-sm">
                    <p>RCP（Rapid Control Prototyping）与 HIL 的主要区别是什么？</p>
                </div>`,
        options: [
            "RCP 比 HIL 成本更高",
            "RCP 用虚拟控制器控制真实被控对象，HIL 用真实控制器控制虚拟被控对象",
            "RCP 只能用于硬件测试",
            "两者没有本质区别"
        ],
        correct: 1,
        explanation: "RCP 将虚拟控制器原型接入真实被控对象（或真实环境），快速验证控制算法；HIL 则将真实 ECU 接入虚拟被控对象（实时仿真环境），验证 ECU 软硬件。"
    },
    {
        id: 33,
        type: "fill",
        title: "HIL 信号调理",
        content: `<div class="p-4 font-mono text-sm">
                    <div>HIL 系统中，信号调理（Signal Conditioning）的主要功能包括：</div>
                    <div>1. 电平<span class="code-blank" data-id="33" data-answer="转换"></span>（匹配 ECU 与仿真平台的电压范围）</div>
                    <div>2. 信号<span class="code-blank" data-id="33-2" data-answer="隔离"></span>（防止电气干扰和地环路）</div>
                    <div>3. 负载<span class="code-blank" data-id="33-3" data-answer="仿真"></span>（模拟真实执行器的电气特性）</div>
                </div>`,
        instruction: "填写信号调理的功能",
        hint: "转换、隔离、仿真",
        explanation: "信号调理在 HIL 中负责 ECU 与仿真平台之间的电气适配，包括电平转换、电气隔离和负载仿真，确保信号正确可靠。"
    },
    {
        id: 34,
        type: "select",
        title: "基于场景的 HIL 测试",
        content: `<div class="p-4 text-sm">
                    <p>在 ADAS HIL 测试中，基于场景的测试（Scenario-Based Testing）相比传统里程累积测试的主要优势是什么？</p>
                </div>`,
        options: [
            "不需要场景库",
            "可针对性覆盖法规要求和边缘场景，测试效率更高",
            "不需要传感器模型",
            "完全替代实车路试"
        ],
        correct: 1,
        explanation: "基于场景的测试可精确定义具体工况（如前车切入、行人横穿），高效覆盖法规要求和边缘场景，弥补里程累积测试难以遇到的稀有场景。"
    },
    {
        id: 35,
        type: "sentence",
        title: "HIL 测试流程",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">ADAS HIL 测试的标准执行流程：</p>
                    <p class="mb-1">1. <span class="code-blank" data-id="35-1" data-answer="测试规划"></span>：定义测试目标和场景</p>
                    <p class="mb-1">2. <span class="code-blank" data-id="35-2" data-answer="环境搭建"></span>：配置 HIL 平台和连接 ECU</p>
                    <p class="mb-1">3. <span class="code-blank" data-id="35-3" data-answer="测试执行"></span>：运行自动化测试序列</p>
                    <p class="mb-1">4. <span class="code-blank" data-id="35-4" data-answer="结果分析"></span>：评估 PASS/FAIL 并生成报告</p>
                </div>`,
        instruction: "填写 HIL 测试流程",
        hint: "测试规划、环境搭建、测试执行、结果分析",
        explanation: "HIL 测试遵循规划→搭建→执行→分析的标准化流程，确保测试的可重复性和可追溯性。",
        fullSentence: "ADAS HIL 测试的标准执行流程：测试规划（定义测试目标和场景）→ 环境搭建（配置 HIL 平台和连接 ECU）→ 测试执行（运行自动化测试序列）→ 结果分析（评估 PASS/FAIL 并生成报告）。"
    },
    {
        id: 36,
        type: "select",
        title: "传感器模型仿真",
        content: `<div class="p-4 text-sm">
                    <p>ADAS HIL 测试中，传感器模型仿真的关键挑战是什么？</p>
                </div>`,
        options: [
            "传感器模型太便宜",
            "在实时约束下同时保证仿真精度和低延迟",
            "传感器体积太大",
            "不需要考虑传感器噪声"
        ],
        correct: 1,
        explanation: "传感器模型需要在严格的实时步长内完成渲染和物理仿真，平衡 fidelity（逼真度）与实时性，是 ADAS HIL 的核心技术难点。"
    },
    {
        id: 37,
        type: "fill",
        title: "功率 HIL",
        content: `<div class="p-4 font-mono text-sm">
                    <div>功率 HIL（Power HIL）主要用于测试：</div>
                    <div>1. 电动助力转向<span class="code-blank" data-id="37" data-answer="EPS"></span>系统</div>
                    <div>2. 电子<span class="code-blank" data-id="37-2" data-answer="制动"></span>系统（如 iBooster、ESP）</div>
                    <div>3. <span class="code-blank" data-id="37-3" data-answer="电机"></span>控制器（电驱系统）</div>
                </div>`,
        instruction: "填写功率 HIL 的典型应用",
        hint: "EPS、制动、电机",
        explanation: "Power HIL 可仿真大功率负载，用于测试 EPS、电子制动系统和电机控制器等包含功率级执行器的 ECU。"
    },
    {
        id: 38,
        type: "sentence",
        title: "HIL 测试自动化",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">HIL 自动化测试框架的关键组件包括：</p>
                    <p class="mb-1">• <span class="code-blank" data-id="38-1" data-answer="测试管理"></span>工具（管理测试用例和结果）</p>
                    <p class="mb-1">• <span class="code-blank" data-id="38-2" data-answer="序列生成"></span>器（编排测试步骤）</p>
                    <p class="mb-1">• <span class="code-blank" data-id="38-3" data-answer="数据记录"></span>模块（采集总线信号和传感器数据）</p>
                    <p class="mb-1">• <span class="code-blank" data-id="38-4" data-answer="评估"></span>模块（自动比对预期结果）</p>
                </div>`,
        instruction: "填写自动化测试框架组件",
        hint: "测试管理、序列生成、数据记录、评估",
        explanation: "HIL 自动化测试框架通过测试管理、序列生成、数据记录和评估模块实现 7×24 小时无人值守测试。",
        fullSentence: "HIL 自动化测试框架的关键组件包括：测试管理工具（管理测试用例和结果）、序列生成器（编排测试步骤）、数据记录模块（采集总线信号和传感器数据）、评估模块（自动比对预期结果）。"
    },
    {
        id: 39,
        type: "select",
        title: "HIL 测试覆盖率",
        content: `<div class="p-4 text-sm">
                    <p>以下哪种方式最能提高 ADAS HIL 测试的覆盖效率？</p>
                </div>`,
        options: [
            "手动运行所有测试用例",
            "基于参数化组合的自动化场景遍历",
            "只测试法规要求的场景",
            "增加更多真实硬件"
        ],
        correct: 1,
        explanation: "通过参数化组合（如车速、距离、天气等变量组合），可自动化生成海量测试场景，极大提高测试覆盖率，发现边界条件下的潜在问题。"
    },
    {
        id: 40,
        type: "sentence",
        title: "HIL 测试数据采集",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">HIL 测试中常见的数据采集和分析内容：</p>
                    <p class="mb-1">• <span class="code-blank" data-id="40-1" data-answer="CAN/LIN"></span>总线数据（ECU 通信报文）</p>
                    <p class="mb-1">• <span class="code-blank" data-id="40-2" data-answer="传感器"></span>仿真输出（摄像头图像、雷达目标列表）</p>
                    <p class="mb-1">• <span class="code-blank" data-id="40-3" data-answer="执行器"></span>响应（转向角、制动压力、加速度）</p>
                    <p class="mb-1">• <span class="code-blank" data-id="40-4" data-answer="时间"></span>戳对齐（确保多源数据同步分析）</p>
                </div>`,
        instruction: "填写 HIL 数据采集内容",
        hint: "CAN/LIN、传感器、执行器、时间",
        explanation: "HIL 测试数据采集需覆盖总线报文、传感器输出、执行器响应等多个维度，并通过时间戳对齐实现精确的闭环分析。",
        fullSentence: "HIL 测试中常见的数据采集和分析内容：CAN/LIN 总线数据（ECU 通信报文）、传感器仿真输出（摄像头图像、雷达目标列表）、执行器响应（转向角、制动压力、加速度）、时间戳对齐（确保多源数据同步分析）。"
    }
];