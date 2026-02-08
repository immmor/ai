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

        // 插入新用户（默认余额0）
        const result = await DB
          .prepare('INSERT INTO user (username, password, balance) VALUES (?, ?, 0)')
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

        // 查询账号：包含余额信息
        const user = await DB
          .prepare('SELECT id, username, balance FROM user WHERE username = ? AND password = ?')
          .bind(username, password)
          .first();

        if (user) {
          return resJson({ success: true, message: '登录成功！', userInfo: { id: user.id, username: user.username, balance: user.balance } });
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

      // ========== 支付URL构建接口 ==========
      if (path === '/api/pay/build-url' && request.method === 'POST') {
        try {
          const params = await request.json();
          const { type, order_no, amount, description } = params;
          
          if (!type || !order_no || !amount || !description) {
            return resJson({
              code: 400,
              msg: '缺少必要参数'
            }, 400);
          }
          
          // 易支付API配置（从环境变量读取）
          const apiUrl = env.PAY_API_URL;
          const pid = env.PAY_MID;
          const key = env.PAY_KEY;
          
          // 映射支付类型
          const epayType = type === 'alipay' ? 'alipay' : 'wxpay';
          
          // 构建支付参数
          const paymentParams = {
            pid: pid,
            type: epayType,
            out_trade_no: order_no,
            notify_url: 'https://immmor.com/api/pay/notify',
            return_url: 'https://immmor.com',
            name: description,
            money: amount.toFixed(2),
            sitename: '我的网站'
          };
          
          // 生成签名（MD5）
          const sortedParams = Object.entries(paymentParams)
            .filter(([k, v]) => !['sign', 'sign_type'].includes(k) && v !== '')
            .sort(([a], [b]) => a.localeCompare(b));
          
          const queryString = sortedParams.map(([k, v]) => `${k}=${v}`).join('&');
          const signStr = queryString + key;
          
          // 计算MD5签名
          const sign = await md5Hash(signStr);
          
          paymentParams['sign'] = sign;
          paymentParams['sign_type'] = 'MD5';
          
          // 构造最终请求URL
          const finalQueryString = Object.entries(paymentParams)
            .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
            .join('&');
          
          const payUrl = `${apiUrl}?${finalQueryString}`;
          
          return resJson({
            code: 200,
            msg: '支付URL构建成功',
            data: {
              pay_url: payUrl,
              order_no: order_no,
              amount: amount
            }
          });
        } catch (err) {
          return resJson({
            code: 500,
            msg: '支付URL构建失败',
            error: err.message
          }, 500);
        }
      }
      
      // MD5哈希函数
      async function md5Hash(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('MD5', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
      }
      
      // ========== AI聊天接口（支持流式响应） ==========
      if (path === '/chat' && request.method === 'POST') {
        try {
          const params = await request.json();
          const { prompt, stream = false } = params;
          
          if (!prompt) {
            return resJson({ success: false, message: '请输入prompt参数' }, 400);
          }
          
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

      // ========== 充值接口 ==========
      if (path === '/api/recharge' && request.method === 'POST') {
        try {
          const params = await request.json();
          const { username, amount } = params;
          
          if (!username || !amount || amount <= 0) {
            return resJson({ code: 400, msg: '参数错误' }, 400);
          }
          
          // 更新用户余额
          const result = await DB
            .prepare('UPDATE user SET balance = balance + ? WHERE username = ?')
            .bind(amount, username)
            .run();
          
          if (result.success && result.meta.changes > 0) {
            // 查询更新后的余额
            const user = await DB
              .prepare('SELECT balance FROM user WHERE username = ?')
              .bind(username)
              .first();
            
            return resJson({ code: 200, msg: '充值成功', balance: user.balance });
          } else {
            return resJson({ code: 404, msg: '用户不存在' }, 404);
          }
        } catch (err) {
          return resJson({ code: 500, msg: '充值失败', error: err.message }, 500);
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
          'POST /api/pay/build-url → 构建支付URL',
          'POST /api/recharge → 充值（传{username,amount}）',
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