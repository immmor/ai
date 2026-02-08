// ✅ ES模块格式 + 彻底修复prepare undefined + 完整CORS + kkk/pwd登录必过 + 全接口可用
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ========== 1. 全局CORS跨域处理（前端无报错） ==========
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400'
        }
      });
    }
    // 统一JSON响应封装（所有返回自带跨域头）
    const resJson = (data, status = 200) => {
      return Response.json(data, {
        status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    };

    try {
      // ========== ✅ 核心修复：数据库实例兜底（解决prepare undefined） ==========
      // 【关键】这里的 DB 必须和你Worker绑定D1的「Variable name」完全一致！！！
      const DB = env.DB; 
      if (!DB) {
        return resJson({
          code: 500,
          msg: "数据库绑定失败！请检查Worker的D1绑定配置",
          error: "D1 database instance is undefined"
        }, 500);
      }

      // ========== 注册接口（核心）→ 用户名密码注册 ==========
      if (path === '/register' && request.method === 'POST') {
        const params = await request.json();
        const { username, password } = params;
        
        if (!username || !password) {
          return resJson({ success: false, message: '用户名和密码不能为空！' }, 400);
        }

        // 检查用户名是否已存在
        const existingUser = await DB
          .prepare('SELECT * FROM user WHERE username = ?')
          .bind(username)
          .first();

        if (existingUser) {
          return resJson({ success: false, message: '用户名已存在！' }, 409);
        }

        // 插入新用户
        const result = await DB
          .prepare('INSERT INTO user (username, password) VALUES (?, ?)')
          .bind(username, password)
          .run();

        if (result.success) {
          return resJson({ success: true, message: '注册成功！', userInfo: { id: result.meta.last_row_id, username: username } });
        } else {
          return resJson({ success: false, message: '注册失败，请重试！' }, 500);
        }
      }

      // ========== 登录接口（核心）→ 用户名密码登录 ==========
      if (path === '/login' && request.method === 'POST') {
        const params = await request.json();
        const { username, password } = params;
        
        if (!username || !password) {
          return resJson({ success: false, message: '用户名和密码不能为空！' }, 400);
        }

        // 查询账号：精准匹配你的user表
        const user = await DB
          .prepare('SELECT * FROM user WHERE username = ? AND password = ?')
          .bind(username, password)
          .first();

        if (user) {
          return resJson({ success: true, message: '登录成功！', userInfo: { id: user.id, username: user.username } });
        } else {
          return resJson({ success: false, message: '用户名或密码错误' }, 401);
        }
      }

      // ========== 按用户名查询（测试kkk专用） ==========
      if (path === '/get-user' && request.method === 'GET') {
        const name = url.searchParams.get('name');
        if (!name) return resJson({ code: 400, msg: '请传入name参数，例：?name=kkk' }, 400);
        
        const result = await DB
          .prepare('SELECT * FROM user WHERE username = ?')
          .bind(name)
          .first();
        
        return result 
          ? resJson({ code: 200, msg: '查询成功', data: result }) 
          : resJson({ code: 404, msg: '用户不存在' }, 404);
      }

      // ========== 查询所有用户（验证数据库数据） ==========
      if (path === '/get-users' && request.method === 'GET') {
        const result = await DB.prepare('SELECT id, username, password FROM user').all();
        return resJson({ code: 200, msg: '查询成功', total: result.results.length, data: result.results });
      }

      // ========== 易支付客户端（从pay.py转换） ==========
      class EpayClient {
        constructor(api_url, pid, key) {
          this.api_url = api_url.rstrip('/') + '/submit.php';
          this.pid = String(pid);
          this.key = key;
        }

        get_signature(params) {
          // 筛选并排序参数
          const sortedParams = Object.entries(params)
            .filter(([k, v]) => k !== 'sign' && k !== 'sign_type' && v !== '')
            .sort(([a], [b]) => a.localeCompare(b));

          // 拼接待签名字符串
          const queryString = sortedParams.map(([k, v]) => `${k}=${v}`).join('&');

          // 计算MD5签名
          const signStr = queryString + this.key;
          return crypto.subtle.digest('MD5', new TextEncoder().encode(signStr))
            .then(hash => {
              const hex = Array.from(new Uint8Array(hash))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
              return hex;
            });
        }

        async build_pay_url(out_trade_no, type, name, money, notify_url, return_url) {
          const params = {
            pid: this.pid,
            type: type,
            out_trade_no: out_trade_no,
            notify_url: notify_url,
            return_url: return_url,
            name: name,
            money: String(money),
            sitename: '我的网站'
          };

          // 生成签名
          params.sign = await this.get_signature(params);
          params.sign_type = 'MD5';

          // 构造最终请求URL
          const queryString = Object.entries(params)
            .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
            .join('&');
          return `${this.api_url}?${queryString}`;
        }
      }

      // ========== 支付接口（使用易支付客户端） ==========
      if (path === '/api/pay/submit' && request.method === 'POST') {
        try {
          const params = await request.json();
          const origin = request.url.split('/').slice(0, 3).join('/');

          // 初始化易支付客户端（请替换为实际配置）
          const client = new EpayClient(
            'https://epay.wxda.net/',
            '1235',
            'YHEPe1KO1Kg4o7gEOqgKmXkpGnPNNE2Y'
          );

          // 构建支付URL
          const payUrl = await client.build_pay_url(
            params.order_no,
            params.type,
            params.body,
            params.amount,
            'https://immmor.com/api/pay/notify',
            'https://immmor.com'
          );

          return resJson({
            code: 200,
            msg: '支付链接生成成功',
            data: {
              pay_url: payUrl,
              order_no: params.order_no,
              amount: params.amount
            }
          });
        } catch (err) {
          return resJson({
            code: 500,
            msg: '支付请求失败',
            error: err.message
          }, 500);
        }
      }
      
      // ========== 支付查询接口 ==========
      if (path === '/api/pay/query' && request.method === 'GET') {
        try {
          const orderNo = url.searchParams.get('order_no');
          
          if (!orderNo) {
            return resJson({
              code: 400,
              msg: '缺少订单号参数'
            }, 400);
          }
          
          // 调用易支付查询API
          const queryResponse = await fetch('https://epay.wxda.net/query.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              pid: '1235',
              out_trade_no: orderNo,
              key: 'YHEPe1KO1Kg4o7gEOqgKmXkpGnPNNE2Y'
            })
          });
          
          const queryResult = await queryResponse.json();
          return resJson(queryResult, queryResponse.status);
        } catch (err) {
          return resJson({
            code: 500,
            msg: '支付查询失败',
            error: err.message
          }, 500);
        }
      }

      // ========== AI聊天接口（支持流式响应） ==========
      if (path === '/chat' && request.method === 'POST') {
        try {
          const params = await request.json();
          const { prompt, stream = false } = params;
          
          if (!prompt) {
            return resJson({ success: false, message: '请输入prompt参数' }, 400);
          }
          
          // 检查是否在Cloudflare Worker环境中
          // Cloudflare Worker限制：
          // 1. 不允许直接访问IP地址的HTTP请求
          // 2. 只支持HTTPS请求
          // 3. 某些端口可能被限制
          
          // 生产环境解决方案：
          // 1. 将k.py部署到支持HTTPS的服务器
          // 2. 使用域名而不是IP地址访问
          // 3. 确保域名不在Cloudflare的保护范围内（避免回源问题）
          
          try {
            // 调用远程AI服务
            const aiResponse = await fetch('https://ip.immmor.com:8081/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ prompt, stream }),
              redirect: 'follow'
            });
            
            // 检查响应状态
            if (!aiResponse.ok) {
              return resJson({
                code: aiResponse.status,
                msg: 'AI服务请求失败',
                error: `HTTP ${aiResponse.status} ${aiResponse.statusText}`
              }, aiResponse.status);
            }
            
            // 获取响应内容
            const textResult = await aiResponse.text();
            
            // 尝试解析JSON（如果是JSON格式）
            try {
              const aiResult = JSON.parse(textResult);
              return resJson(aiResult, aiResponse.status);
            } catch (jsonErr) {
              // 非JSON响应，直接返回
              return new Response(textResult, {
                status: aiResponse.status,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': aiResponse.headers.get('content-type') || 'text/plain; charset=utf-8'
                }
              });
            }
          } catch (fetchErr) {
            // 网络请求错误处理
            console.error('Fetch error:', fetchErr);
            
            // 检测Cloudflare 1003错误
            if (fetchErr.message && fetchErr.message.includes('1003')) {
              return resJson({
                code: 500,
                msg: 'Cloudflare Worker 1003错误',
                error: '不允许直接IP访问或HTTP请求',
                solution: [
                  '1. 将k.py部署到支持HTTPS的服务器',
                  '2. 使用域名而不是IP地址（如：https://ai.example.com/chat）',
                  '3. 确保域名不在Cloudflare保护范围内',
                  '4. 或在本地环境测试（不使用Cloudflare Worker）'
                ]
              }, 500);
            }
            
            return resJson({
              code: 500,
              msg: '网络请求失败',
              error: fetchErr.message
            }, 500);
          }
        } catch (err) {
          // 其他错误处理
          console.error('AI API Error:', err);
          return resJson({
            code: 500,
            msg: 'AI接口调用失败',
            error: err.message
          }, 500);
        }
      }

      // ========== 默认接口提示 ==========
      return resJson({
        code: 200,
        msg: 'Worker+D1 服务正常 ✅',
        testTips: [
          'GET /get-user?name=kkk → 测试你的账号',
          'POST /login → 登录（传{username,password}）',
          'POST /register → 注册（传{username,password}）',
          'GET /get-users → 查看所有用户',
          'POST /api/pay/submit → 调用支付接口',
          'POST /chat → AI聊天接口（传{prompt,stream}）'
        ]
      });

    } catch (err) {
      return resJson({
        code: 500,
        msg: '服务器错误',
        error: err.message,
        tip: '优先检查D1绑定的Variable name是否为 DB'
      }, 500);
    }
  },
};