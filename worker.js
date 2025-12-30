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

      // ========== 支付接口（调用第三方支付API） ==========
      if (path === '/api/pay/submit' && request.method === 'POST') {
        try {
          const params = await request.json();
          
          // 调用第三方支付API
          const paymentResponse = await fetch('https://epayapi.wxda.net/api/pay/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          });
          
          const paymentResult = await paymentResponse.json();
          return resJson(paymentResult, paymentResponse.status);
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
          
          // 调用第三方支付查询API
          const queryResponse = await fetch(`https://epayapi.wxda.net/api/pay/query?order_no=${orderNo}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
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

      // ========== 默认接口提示 ==========
      return resJson({
        code: 200,
        msg: 'Worker+D1 服务正常 ✅',
        testTips: [
          'GET /get-user?name=kkk → 测试你的账号',
          'POST /login → 登录（传{username,password}）',
          'POST /register → 注册（传{username,password}）',
          'GET /get-users → 查看所有用户',
          'POST /api/pay/submit → 调用支付接口'
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