const questionsgomicro = [
    {
        id: 1,
        type: "select",
        title: "微服务架构基础",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在Go微服务架构中，哪个框架最常用于服务发现和配置管理？</p>
                </div>`,
        options: ["Consul", "Etcd", "ZooKeeper", "所有选项都正确"],
        correct: 3,
        explanation: "Consul、Etcd和ZooKeeper都是常用的服务发现和配置管理工具，可以根据具体需求选择"
    },
    {
        id: 2,
        type: "fill",
        title: "Go微服务通信",
        content: `<div class="p-4 font-mono text-sm">
                    <div>// 使用gRPC定义服务</div>
                    <div>service UserService {</div>
                    <div>    rpc GetUser(<span class="code-blank" data-id="2" data-answer="UserRequest"></span>) returns (UserResponse);</div>
                    <div>}</div>
                </div>`,
        instruction: "填写请求参数类型",
        hint: "gRPC服务定义中需要指定请求和响应类型",
        explanation: "在gRPC服务定义中，每个RPC方法都需要指定请求和响应消息类型"
    },
    {
        id: 3,
        type: "correct",
        title: "Go微服务错误处理",
        content: `<div class="p-4 font-mono text-sm">
                    <div>func getUserHandler(w http.ResponseWriter, r *http.Request) {</div>
                    <div>    user, err := getUserFromDB(r.URL.Query().Get("id"))</div>
                    <div>    <span class="text-red-600">if err != nil {</span></div>
                    <div>        <span class="text-red-600">log.Println(err)</span></div>
                    <div>        <span class="text-red-600">return</span></div>
                    <div>    }</div>
                    <div>    json.NewEncoder(w).Encode(user)</div>
                    <div>}</div>
                </div>`,
        instruction: "找出代码中的错误并修正（只需要输入错误的部分）",
        correct: "w.WriteHeader(http.StatusInternalServerError); w.Write([]byte(err.Error()))",
        hint: "微服务中需要正确处理错误并返回适当的HTTP状态码",
        explanation: "在微服务中，错误应该被正确返回给客户端，而不是仅仅记录日志"
    },
    {
        id: 4,
        type: "sentence",
        title: "Go微服务配置",
        content: `<div class="p-4 text-sm">
                    <p class="mb-4">在Go微服务中，通常使用<span class="code-blank" data-id="4-1" data-answer="环境变量"></span>或<span class="code-blank" data-id="4-2" data-answer="配置文件"></span>来管理不同环境的配置，使用<span class="code-blank" data-id="4-3" data-answer="Viper"></span>库可以方便地读取配置。</p>
                </div>`,
        instruction: "填写Go微服务配置管理的关键概念",
        hint: "配置管理、环境隔离和配置库",
        explanation: "微服务需要支持多环境配置，Viper是Go中常用的配置管理库",
        fullSentence: "在Go微服务中，通常使用环境变量或配置文件来管理不同环境的配置，使用Viper库可以方便地读取配置。"
    },
    {
        id: 5,
        type: "select",
        title: "服务间通信",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在Go微服务架构中，哪种通信协议最适合高性能的内部服务调用？</p>
                </div>`,
        options: ["REST/JSON", "gRPC", "GraphQL", "WebSocket"],
        correct: 1,
        explanation: "gRPC基于HTTP/2和Protocol Buffers，提供高性能的二进制序列化和双向流通信"
    },
    {
        id: 6,
        type: "fill",
        title: "Go微服务容器化",
        content: `<div class="p-4 font-mono text-sm">
                    <div># Dockerfile示例</div>
                    <div>FROM <span class="code-blank" data-id="6" data-answer="golang:alpine"></span></div>
                    <div>WORKDIR /app</div>
                    <div>COPY go.mod go.sum ./</div>
                    <div>RUN go mod download</div>
                </div>`,
        instruction: "填写基础镜像名称",
        hint: "Go应用的轻量级Docker基础镜像",
        explanation: "golang:alpine是Go应用的轻量级Docker镜像，适合微服务部署"
    },
    {
        id: 7,
        type: "sentence",
        title: "Go微服务监控",
        content: `<div class="p-4 font-mono text-sm">
                    <div>import (</div>
                    <div>    "<span class="code-blank" data-id="7-1" data-answer="github.com/prometheus/client_golang/prometheus"></span>"</div>
                    <div>    "<span class="code-blank" data-id="7-2" data-answer="github.com/prometheus/client_golang/prometheus/promhttp"></span>"</div>
                    <div>)</div>
                    <div>var requestCount = prometheus.NewCounterVec(</div>
                    <div>    prometheus.CounterOpts{</div>
                    <div>        Name: "<span class="code-blank" data-id="7-3" data-answer="http_requests_total"></span>",</div>
                    <div>        Help: "Total number of HTTP requests",</div>
                    <div>    },</div>
                    <div>    []string{"method", "endpoint"},</div>
                    <div>)</div>
                    <div>func init() {</div>
                    <div>    <span class="code-blank" data-id="7-4" data-answer="prometheus.MustRegister"></span>(requestCount)</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Go微服务监控代码",
        hint: "Prometheus监控指标导入和注册",
        explanation: "使用Prometheus进行微服务监控，需要导入相关包并注册指标",
        fullSentence: "import (\n    \"github.com/prometheus/client_golang/prometheus\"\n    \"github.com/prometheus/client_golang/prometheus/promhttp\"\n)\nvar requestCount = prometheus.NewCounterVec(\n    prometheus.CounterOpts{\n        Name: \"http_requests_total\",\n        Help: \"Total number of HTTP requests\",\n    },\n    []string{\"method\", \"endpoint\"},\n)\nfunc init() {\n    prometheus.MustRegister(requestCount)\n}"
    },
    {
        id: 8,
        type: "sentence",
        title: "Go微服务熔断器",
        content: `<div class="p-4 font-mono text-sm">
                    <div>import "<span class="code-blank" data-id="8-1" data-answer="github.com/afex/hystrix-go/hystrix"></span>"</div>
                    <div>func getUserWithCircuitBreaker(userID string) (*User, error) {</div>
                    <div>    output := make(chan *User, 1)</div>
                    <div>    errors := hystrix.<span class="code-blank" data-id="8-2" data-answer="Go"></span>("get_user", func() error {</div>
                    <div>        user, err := getUserService(userID)</div>
                    <div>        if err != nil {</div>
                    <div>            return err</div>
                    <div>        }</div>
                    <div>        output <- user</div>
                    <div>        return nil</div>
                    <div>    }, nil)</div>
                    <div>    select {</div>
                    <div>    case user := <-output:</div>
                    <div>        return user, nil</div>
                    <div>    case err := <-errors:</div>
                    <div>        return nil, err</div>
                    <div>    }</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Go微服务熔断器代码",
        hint: "Hystrix熔断器导入和使用",
        explanation: "熔断器模式可以防止级联故障，Hystrix是常用的实现",
        fullSentence: "import \"github.com/afex/hystrix-go/hystrix\"\nfunc getUserWithCircuitBreaker(userID string) (*User, error) {\n    output := make(chan *User, 1)\n    errors := hystrix.Go(\"get_user\", func() error {\n        user, err := getUserService(userID)\n        if err != nil {\n            return err\n        }\n        output <- user\n        return nil\n    }, nil)\n    select {\n    case user := <-output:\n        return user, nil\n    case err := <-errors:\n        return nil, err\n    }\n}"
    },
    {
        id: 9,
        type: "sentence",
        title: "Go微服务API网关",
        content: `<div class="p-4 font-mono text-sm">
                    <div>// 使用Gin框架创建API网关</div>
                    <div>router := <span class="code-blank" data-id="9-1" data-answer="gin.Default"></span>()</div>
                    <div>router.<span class="code-blank" data-id="9-2" data-answer="GET"></span>("/users/:id", func(c *gin.Context) {</div>
                    <div>    userID := c.Param("id")</div>
                    <div>    // 调用用户服务</div>
                    <div>    resp, err := http.Get(fmt.Sprintf("http://user-service/users/%s", userID))</div>
                    <div>    if err != nil {</div>
                    <div>        c.JSON(500, gin.H{"error": err.Error()})</div>
                    <div>        return</div>
                    <div>    }</div>
                    <div>    defer resp.Body.Close()</div>
                    <div>    var user User</div>
                    <div>    json.NewDecoder(resp.Body).Decode(&user)</div>
                    <div>    c.JSON(200, user)</div>
                    <div>})</div>
                    <div>router.<span class="code-blank" data-id="9-3" data-answer="Run"></span>(":8080")</div>
                </div>`,
        instruction: "填写Go微服务API网关代码",
        hint: "Gin框架路由定义和启动",
        explanation: "API网关作为微服务架构的入口点，负责路由和请求转发",
        fullSentence: "router := gin.Default()\nrouter.GET(\"/users/:id\", func(c *gin.Context) {\n    userID := c.Param(\"id\")\n    resp, err := http.Get(fmt.Sprintf(\"http://user-service/users/%s\", userID))\n    if err != nil {\n        c.JSON(500, gin.H{\"error\": err.Error()})\n        return\n    }\n    defer resp.Body.Close()\n    var user User\n    json.NewDecoder(resp.Body).Decode(&user)\n    c.JSON(200, user)\n})\nrouter.Run(\":8080\")"
    },
    {
        id: 10,
        type: "sentence",
        title: "Go微服务数据库迁移",
        content: `<div class="p-4 font-mono text-sm">
                    <div>import "<span class="code-blank" data-id="10-1" data-answer="github.com/golang-migrate/migrate/v4"></span>"</div>
                    <div>import _ "<span class="code-blank" data-id="10-2" data-answer="github.com/golang-migrate/migrate/v4/database/postgres"></span>"</div>
                    <div>func runMigrations() error {</div>
                    <div>    m, err := migrate.New(</div>
                    <div>        "file://migrations",</div>
                    <div>        "<span class="code-blank" data-id="10-3" data-answer="postgres"></span>://user:pass@localhost:5432/database?sslmode=disable"</div>
                    <div>    )</div>
                    <div>    if err != nil {</div>
                    <div>        return err</div>
                    <div>    }</div>
                    <div>    if err := m.<span class="code-blank" data-id="10-4" data-answer="Up"></span>(); err != nil {</div>
                    <div>        return err</div>
                    <div>    }</div>
                    <div>    return nil</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Go微服务数据库迁移代码",
        hint: "数据库迁移库导入和迁移执行",
        explanation: "数据库迁移确保微服务的数据库结构在不同版本间保持一致",
        fullSentence: "import \"github.com/golang-migrate/migrate/v4\"\nimport _ \"github.com/golang-migrate/migrate/v4/database/postgres\"\nfunc runMigrations() error {\n    m, err := migrate.New(\n        \"file://migrations\",\n        \"postgres://user:pass@localhost:5432/database?sslmode=disable\"\n    )\n    if err != nil {\n        return err\n    }\n    if err := m.Up(); err != nil {\n        return err\n    }\n    return nil\n}"
    },
    {
        id: 11,
        type: "sentence",
        title: "Go微服务日志聚合",
        content: `<div class="p-4 font-mono text-sm">
                    <div>import "<span class="code-blank" data-id="11-1" data-answer="go.uber.org/zap"></span>"</div>
                    <div>func main() {</div>
                    <div>    logger, _ := zap.<span class="code-blank" data-id="11-2" data-answer="NewProduction"></span>()</div>
                    <div>    defer logger.<span class="code-blank" data-id="11-3" data-answer="Sync"></span>()</div>
                    <div>    logger.Info("Service started",</div>
                    <div>        zap.String("service", "user-service"),</div>
                    <div>        zap.Int("port", 8080),</div>
                    <div>    )</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Go微服务日志聚合代码",
        hint: "结构化日志库导入和使用",
        explanation: "结构化日志便于日志聚合和分析，Zap是高性能的Go日志库",
        fullSentence: "import \"go.uber.org/zap\"\nfunc main() {\n    logger, _ := zap.NewProduction()\n    defer logger.Sync()\n    logger.Info(\"Service started\",\n        zap.String(\"service\", \"user-service\"),\n        zap.Int(\"port\", 8080),\n    )\n}"
    },
    {
        id: 12,
        type: "sentence",
        title: "Go微服务健康检查",
        content: `<div class="p-4 font-mono text-sm">
                    <div>import "<span class="code-blank" data-id="12-1" data-answer="github.com/heptiolabs/healthcheck"></span>"</div>
                    <div>func main() {</div>
                    <div>    health := healthcheck.<span class="code-blank" data-id="12-2" data-answer="NewHandler"></span>()</div>
                    <div>    health.AddLivenessCheck("goroutine-threshold", healthcheck.<span class="code-blank" data-id="12-3" data-answer="GoroutineCountCheck"></span>(100))</div>
                    <div>    http.HandleFunc("/health", health.<span class="code-blank" data-id="12-4" data-answer="LiveEndpoint"></span>)</div>
                    <div>    http.ListenAndServe(":8080", nil)</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Go微服务健康检查代码",
        hint: "健康检查库导入和检查端点设置",
        explanation: "健康检查端点用于服务发现和负载均衡器判断服务状态",
        fullSentence: "import \"github.com/heptiolabs/healthcheck\"\nfunc main() {\n    health := healthcheck.NewHandler()\n    health.AddLivenessCheck(\"goroutine-threshold\", healthcheck.GoroutineCountCheck(100))\n    http.HandleFunc(\"/health\", health.LiveEndpoint)\n    http.ListenAndServe(\":8080\", nil)\n}"
    },
    {
        id: 13,
        type: "sentence",
        title: "Go微服务限流",
        content: `<div class="p-4 font-mono text-sm">
                    <div>import "<span class="code-blank" data-id="13-1" data-answer="golang.org/x/time/rate"></span>"</div>
                    <div>var limiter = rate.<span class="code-blank" data-id="13-2" data-answer="NewLimiter"></span>(rate.Every(time.Second), 10)</div>
                    <div>func rateLimitMiddleware(next http.Handler) http.Handler {</div>
                    <div>    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {</div>
                    <div>        if !limiter.<span class="code-blank" data-id="13-3" data-answer="Allow"></span>() {</div>
                    <div>            http.Error(w, "Too Many Requests", http.StatusTooManyRequests)</div>
                    <div>            return</div>
                    <div>        }</div>
                    <div>        next.ServeHTTP(w, r)</div>
                    <div>    })</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Go微服务限流代码",
        hint: "限流器导入和中间件实现",
        explanation: "限流保护微服务不被过多请求压垮，确保系统稳定性",
        fullSentence: "import \"golang.org/x/time/rate\"\nvar limiter = rate.NewLimiter(rate.Every(time.Second), 10)\nfunc rateLimitMiddleware(next http.Handler) http.Handler {\n    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n        if !limiter.Allow() {\n            http.Error(w, \"Too Many Requests\", http.StatusTooManyRequests)\n            return\n        }\n        next.ServeHTTP(w, r)\n    })\n}"
    },
    {
        id: 14,
        type: "sentence",
        title: "Go微服务分布式追踪",
        content: `<div class="p-4 font-mono text-sm">
                    <div>import "<span class="code-blank" data-id="14-1" data-answer="go.opentelemetry.io/otel"></span>"</div>
                    <div>import "<span class="code-blank" data-id="14-2" data-answer="go.opentelemetry.io/otel/trace"></span>"</div>
                    <div>func getUserHandler(w http.ResponseWriter, r *http.Request) {</div>
                    <div>    ctx := r.Context()</div>
                    <div>    tracer := otel.<span class="code-blank" data-id="14-3" data-answer="Tracer"></span>("user-service")</div>
                    <div>    ctx, span := tracer.<span class="code-blank" data-id="14-4" data-answer="Start"></span>(ctx, "get-user")</div>
                    <div>    defer span.<span class="code-blank" data-id="14-5" data-answer="End"></span>()</div>
                    <div>    // 业务逻辑</div>
                    <div>}</div>
                </div>`,
        instruction: "填写Go微服务分布式追踪代码",
        hint: "OpenTelemetry追踪库导入和span管理",
        explanation: "分布式追踪帮助理解微服务间的调用关系和性能瓶颈",
        fullSentence: "import \"go.opentelemetry.io/otel\"\nimport \"go.opentelemetry.io/otel/trace\"\nfunc getUserHandler(w http.ResponseWriter, r *http.Request) {\n    ctx := r.Context()\n    tracer := otel.Tracer(\"user-service\")\n    ctx, span := tracer.Start(ctx, \"get-user\")\n    defer span.End()\n    // 业务逻辑\n}"
    },
    {
        id: 15,
        type: "select",
        title: "微服务数据一致性",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在微服务架构中，处理跨服务数据一致性的最佳实践是什么？</p>
                </div>`,
        options: ["使用分布式事务", "采用最终一致性模式", "将所有数据放在一个数据库中", "避免跨服务数据操作"],
        correct: 1,
        explanation: "微服务架构通常采用最终一致性模式，通过事件驱动架构和Saga模式来处理跨服务数据一致性"
    },
    {
        id: 16,
        type: "select",
        title: "微服务部署策略",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪种部署策略可以确保微服务在更新时不会中断服务？</p>
                </div>`,
        options: ["蓝绿部署", "滚动更新", "金丝雀发布", "所有选项都正确"],
        correct: 3,
        explanation: "蓝绿部署、滚动更新和金丝雀发布都是常用的零停机部署策略，可以根据具体场景选择"
    },
    {
        id: 17,
        type: "select",
        title: "微服务安全认证",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在微服务架构中，推荐使用哪种方式进行服务间认证？</p>
                </div>`,
        options: ["API密钥", "JWT令牌", "mTLS双向认证", "OAuth 2.0客户端凭证"],
        correct: 2,
        explanation: "mTLS（双向TLS）提供了最强的服务间认证安全性，确保只有授权的服务可以相互通信"
    },
    {
        id: 18,
        type: "select",
        title: "微服务事件驱动",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在Go微服务中，哪种消息队列最适合处理高吞吐量的事件流？</p>
                </div>`,
        options: ["RabbitMQ", "Kafka", "Redis Pub/Sub", "NATS"],
        correct: 1,
        explanation: "Kafka专为高吞吐量、持久化的事件流设计，适合微服务架构中的事件驱动通信"
    },
    {
        id: 19,
        type: "select",
        title: "微服务测试策略",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在微服务测试金字塔中，哪种测试应该占最大比例？</p>
                </div>`,
        options: ["端到端测试", "集成测试", "单元测试", "契约测试"],
        correct: 2,
        explanation: "单元测试应该占测试金字塔的最大比例，因为它们运行快、成本低，能够快速反馈代码质量"
    },
    {
        id: 20,
        type: "select",
        title: "微服务服务网格",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在微服务架构中，服务网格（Service Mesh）主要负责处理什么？</p>
                </div>`,
        options: ["业务逻辑", "服务间通信的网络层", "数据库操作", "用户界面渲染"],
        correct: 1,
        explanation: "服务网格专门处理服务间的网络通信，包括负载均衡、服务发现、安全认证、监控等基础设施功能"
    },
    {
        id: 21,
        type: "select",
        title: "微服务配置管理",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在Go微服务中，哪种配置管理方式最适合动态配置更新？</p>
                </div>`,
        options: ["环境变量", "配置文件", "配置中心", "硬编码在代码中"],
        correct: 2,
        explanation: "配置中心（如Consul、Etcd、Apollo）支持动态配置更新，无需重启服务即可应用新配置"
    },
    {
        id: 22,
        type: "select",
        title: "微服务性能优化",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在Go微服务中，哪种技术最适合减少服务间调用的延迟？</p>
                </div>`,
        options: ["使用HTTP/1.1", "使用gRPC", "增加更多的日志", "使用同步阻塞调用"],
        correct: 1,
        explanation: "gRPC基于HTTP/2协议，支持多路复用和头部压缩，能显著减少服务间调用的延迟"
    },
    {
        id: 23,
        type: "select",
        title: "微服务容错机制",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在微服务架构中，哪种模式用于处理服务调用失败的情况？</p>
                </div>`,
        options: ["重试模式", "熔断器模式", "超时模式", "所有选项都正确"],
        correct: 3,
        explanation: "重试、熔断器和超时都是微服务中常用的容错机制，可以组合使用来提高系统稳定性"
    },
    {
        id: 24,
        type: "select",
        title: "微服务监控指标",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在微服务监控中，哪个指标最能反映服务的健康状态？</p>
                </div>`,
        options: ["CPU使用率", "内存使用量", "请求成功率", "所有指标都很重要"],
        correct: 3,
        explanation: "微服务监控需要综合多个指标，包括CPU、内存、网络、请求成功率等，才能全面反映服务健康状态"
    },
    {
        id: 25,
        type: "select",
        title: "微服务API设计",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在微服务API设计中，哪种API风格最适合内部服务间的通信？</p>
                </div>`,
        options: ["RESTful API", "gRPC", "GraphQL", "SOAP"],
        correct: 1,
        explanation: "gRPC基于Protocol Buffers，提供高性能的二进制序列化，适合内部服务间的高效通信"
    },
    {
        id: 26,
        type: "select",
        title: "微服务数据库设计",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在微服务架构中，数据库设计应该遵循什么原则？</p>
                </div>`,
        options: ["每个服务使用独立的数据库", "所有服务共享一个数据库", "根据业务需求混合使用", "避免使用数据库"],
        correct: 0,
        explanation: "微服务应该拥有独立的数据库，这样可以实现数据隔离、独立部署和扩展"
    },
    {
        id: 27,
        type: "select",
        title: "微服务版本管理",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在微服务架构中，如何处理API的版本兼容性问题？</p>
                </div>`,
        options: ["使用URL版本控制", "使用请求头版本控制", "同时运行多个版本", "所有选项都正确"],
        correct: 3,
        explanation: "微服务API版本管理可以采用多种策略，包括URL版本控制、请求头版本控制和同时运行多个版本"
    },
    {
        id: 28,
        type: "select",
        title: "微服务团队组织",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">哪种团队组织结构最适合微服务架构？</p>
                </div>`,
        options: ["功能团队", "跨职能团队", "项目团队", "康威定律团队"],
        correct: 1,
        explanation: "跨职能团队（包含开发、测试、运维等角色）能够独立负责一个或多个微服务的全生命周期"
    },
    {
        id: 29,
        type: "select",
        title: "微服务监控告警",
        content: `<div class="p-4 text-sm">
                    <p class="mb-2">在微服务监控中，哪种告警策略最有效？</p>
                </div>`,
        options: ["基于阈值的告警", "基于异常检测的告警", "基于趋势分析的告警", "综合使用多种告警策略"],
        correct: 3,
        explanation: "综合使用阈值告警、异常检测和趋势分析可以提供更全面和准确的监控告警"
    }
];
