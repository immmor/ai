// _worker.js
export default {
  // fetch 事件是核心，拦截所有进入 Pages 的请求
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 1. 处理自定义 API 接口（后台逻辑）
    if (url.pathname.startsWith('/api/')) {
      // 路由匹配：/api/hello
      if (url.pathname === '/api/hello') {
        return new Response(JSON.stringify({
          code: 200,
          message: 'Hello from Pages Worker!',
          data: { time: new Date().toISOString() }
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 路由匹配：/api/register 注册接口（使用 D1 数据库）
      if (url.pathname === '/api/register' && request.method === 'POST') {
        const params = await request.json();
        const { username, password } = params;
        
        if (!username || !password) {
          return new Response(JSON.stringify({ 
            success: false, 
            message: '用户名和密码不能为空！' 
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        try {
          const existingUser = await env.DB
            .prepare('SELECT * FROM user WHERE username = ?')
            .bind(username)
            .first();

          if (existingUser) {
            return new Response(JSON.stringify({ 
              success: false, 
              message: '用户名已存在！' 
            }), {
              status: 409,
              headers: { 'Content-Type': 'application/json' }
            });
          }

          const result = await env.DB
            .prepare('INSERT INTO user (username, password, balance) VALUES (?, ?, 0)')
            .bind(username, password)
            .run();

          if (result.success) {
            return new Response(JSON.stringify({ 
              success: true, 
              message: '注册成功！', 
              userInfo: { sername: username } 
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          } else {
            return new Response(JSON.stringify({ 
              success: false, 
              message: '注册失败，请重试！' 
            }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } catch (err) {
          return new Response(JSON.stringify({ 
            success: false, 
            message: '数据库操作失败',
            error: err.message 
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      // 路由匹配：/api/login 登录接口（使用 D1 数据库）
      if (url.pathname === '/api/login' && request.method === 'POST') {
        const params = await request.json();
        const { username, password } = params;
        
        if (!username || !password) {
          return new Response(JSON.stringify({ 
            success: false, 
            message: '用户名和密码不能为空！' 
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        try {
          const user = await env.DB
            .prepare('SELECT rowid, username, balance FROM user WHERE username = ? AND password = ?')
            .bind(username, password)
            .first();

          if (user) {
            return new Response(JSON.stringify({ 
              success: true, 
              message: '登录成功！', 
              userInfo: { id: user.rowid, username: user.username, balance: user.balance } 
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          } else {
            return new Response(JSON.stringify({ 
              success: false, 
              message: '用户名或密码错误' 
            }), {
              status: 401,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } catch (err) {
          return new Response(JSON.stringify({ 
            success: false, 
            message: '数据库查询失败',
            error: err.message 
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      // 路由匹配：/api/pay/build-url 构建支付URL
      if (url.pathname === '/api/pay/build-url' && request.method === 'POST') {
        try {
          const params = await request.json();
          const { type, order_no, amount, description } = params;
          
          if (!type || !order_no || !amount || !description) {
            return new Response(JSON.stringify({
              code: 400,
              msg: '缺少必要参数'
            }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          
          const apiUrl = env.PAY_API_URL;
          const pid = env.PAY_MID;
          const key = env.PAY_KEY;
          
          const epayType = type === 'alipay' ? 'alipay' : 'wxpay';
          
          const finalOrderNo = params.username ? `${params.username}_${order_no}` : order_no;
          
          const paymentParams = {
            pid: pid,
            type: epayType,
            out_trade_no: finalOrderNo,
            notify_url: 'https://immmor.com/api/pay/notify',
            return_url: 'https://immmor.com/pay',
            name: description,
            money: amount.toFixed(2),
            sitename: '我的网站'
          };
          
          const sortedParams = Object.entries(paymentParams)
            .filter(([k, v]) => !['sign', 'sign_type'].includes(k) && v !== '')
            .sort(([a], [b]) => a.localeCompare(b));
          
          const queryString = sortedParams.map(([k, v]) => `${k}=${v}`).join('&');
          const signStr = queryString + key;
          
          const sign = await md5Hash(signStr);
          
          paymentParams['sign'] = sign;
          paymentParams['sign_type'] = 'MD5';
          
          const finalQueryString = Object.entries(paymentParams)
            .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
            .join('&');
          
          const payUrl = `${apiUrl}?${finalQueryString}`;
          
          // 记录订单到Supabase
          await fetch(`${env.SUPABASE_URL}/rest/v1/orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': env.SUPABASE_KEY,
              'Authorization': `Bearer ${env.SUPABASE_KEY}`
            },
            body: JSON.stringify({
              order_no: finalOrderNo,
              username: params.username,
              amount: amount,
              payment_type: epayType,
              status: 'pending',
              description: description
            })
          });
          
          return new Response(JSON.stringify({
            code: 200,
            msg: '支付URL构建成功',
            data: {
              pay_url: payUrl,
              order_no: order_no,
              amount: amount
            }
          }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({
            code: 500,
            msg: '支付URL构建失败',
            error: err.message
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      async function md5Hash(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('MD5', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
      }

      // 路由匹配：/api/pay/notify 支付通知接口
      if (url.pathname === '/api/pay/notify' && request.method === 'GET') {
        try {
          const order_no = url.searchParams.get('out_trade_no');
          const trade_no = url.searchParams.get('trade_no');
          const trade_status = url.searchParams.get('trade_status');
          const money = url.searchParams.get('money');
          const sign = url.searchParams.get('sign');
          
          if (trade_status === 'TRADE_SUCCESS') {
            const username = order_no.split('_')[0];
            
            // 更新用户余额
            const result = await env.DB
              .prepare('UPDATE user SET balance = balance + ? WHERE username = ?')
              .bind(parseFloat(money), username)
              .run();
            
            // 更新订单状态到Supabase
            await fetch(`${env.SUPABASE_URL}/rest/v1/orders?order_no=eq.${order_no}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': env.SUPABASE_KEY,
                'Authorization': `Bearer ${env.SUPABASE_KEY}`
              },
              body: JSON.stringify({
                status: 'paid',
                trade_no: trade_no,
                paid_at: new Date().toISOString()
              })
            });
            
            return new Response('success', { status: 200 });
          } else {
            // 支付失败，更新订单状态到Supabase
            await fetch(`${env.SUPABASE_URL}/rest/v1/orders?order_no=eq.${order_no}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': env.SUPABASE_KEY,
                'Authorization': `Bearer ${env.SUPABASE_KEY}`
              },
              body: JSON.stringify({
                status: 'failed'
              })
            });
            
            return new Response('fail', { status: 200 });
          }
        } catch (err) {
          return new Response('fail', { status: 500 });
        }
      }

      // 路由匹配：/api/recharge 充值接口
      if (url.pathname === '/api/recharge' && request.method === 'POST') {
        try {
          const params = await request.json();
          const { username, amount } = params;
          
          if (!username || !amount || amount <= 0) {
            return new Response(JSON.stringify({ code: 400, msg: '参数错误' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          
          const result = await env.DB
            .prepare('UPDATE user SET balance = balance + ? WHERE username = ?')
            .bind(amount, username)
            .run();
          
          if (result.success && result.meta.changes > 0) {
            const user = await env.DB
              .prepare('SELECT balance FROM user WHERE username = ?')
              .bind(username)
              .first();
            
            return new Response(JSON.stringify({ code: 200, msg: '充值成功', balance: user.balance }), {
              headers: { 'Content-Type': 'application/json' }
            });
          } else {
            return new Response(JSON.stringify({ code: 404, msg: '用户不存在' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } catch (err) {
          return new Response(JSON.stringify({ code: 500, msg: '充值失败', error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      // 路由匹配：/api/balance 查询余额接口
      if (url.pathname === '/api/balance' && request.method === 'GET') {
        try {
          const username = url.searchParams.get('username');
          
          if (!username) {
            return new Response(JSON.stringify({ code: 400, msg: '缺少username参数' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          
          const user = await env.DB
            .prepare('SELECT balance FROM user WHERE username = ?')
            .bind(username)
            .first();
          
          if (user) {
            return new Response(JSON.stringify({ code: 200, msg: '查询成功', balance: user.balance }), {
              headers: { 'Content-Type': 'application/json' }
            });
          } else {
            return new Response(JSON.stringify({ code: 404, msg: '用户不存在' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } catch (err) {
          return new Response(JSON.stringify({ code: 500, msg: '查询失败', error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      // 路由匹配：/api/orders 查询订单列表接口
      if (url.pathname === '/api/orders' && request.method === 'GET') {
        try {
          const username = url.searchParams.get('username');
          const page = parseInt(url.searchParams.get('page')) || 1;
          const limit = parseInt(url.searchParams.get('limit')) || 10;
          const offset = (page - 1) * limit;
          
          if (!username) {
            return new Response(JSON.stringify({ code: 400, msg: '缺少username参数' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          
          // 查询订单总数
          const totalResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/orders?username=eq.${username}&select=id`, {
            headers: {
              'apikey': env.SUPABASE_KEY,
              'Authorization': `Bearer ${env.SUPABASE_KEY}`
            }
          });
          const totalData = await totalResponse.json();
          const total = totalData.length;
          
          // 查询订单列表
          const ordersResponse = await fetch(`${env.SUPABASE_URL}/rest/v1/orders?username=eq.${username}&order=created_at.desc&limit=${limit}&offset=${offset}`, {
            headers: {
              'apikey': env.SUPABASE_KEY,
              'Authorization': `Bearer ${env.SUPABASE_KEY}`
            }
          });
          const orders = await ordersResponse.json();
          
          return new Response(JSON.stringify({ 
            code: 200, 
            msg: '查询成功', 
            data: {
              orders: orders || [],
              pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
              }
            }
          }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ code: 500, msg: '查询失败', error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      // 路由匹配：/api/order/detail 查询订单详情接口
      if (url.pathname === '/api/order/detail' && request.method === 'GET') {
        try {
          const orderNo = url.searchParams.get('order_no');
          
          if (!orderNo) {
            return new Response(JSON.stringify({ code: 400, msg: '缺少order_no参数' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          
          // 查询订单详情
          const response = await fetch(`${env.SUPABASE_URL}/rest/v1/orders?order_no=eq.${orderNo}`, {
            headers: {
              'apikey': env.SUPABASE_KEY,
              'Authorization': `Bearer ${env.SUPABASE_KEY}`
            }
          });
          const orders = await response.json();
          
          if (orders.length > 0) {
            return new Response(JSON.stringify({ code: 200, msg: '查询成功', data: orders[0] }), {
              headers: { 'Content-Type': 'application/json' }
            });
          } else {
            return new Response(JSON.stringify({ code: 404, msg: '订单不存在' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } catch (err) {
          return new Response(JSON.stringify({ code: 500, msg: '查询失败', error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      return new Response(JSON.stringify({ code: 404, message: 'API not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. 放行静态资源（HTML/CSS/JS/图片等）
    // env.ASSETS.fetch 是 Pages 内置的静态资源获取方法
    return env.ASSETS.fetch(request);
  }
};