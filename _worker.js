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
              userInfo: { id: result.meta.last_row_id, username: username } 
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
            .prepare('SELECT id, username, balance FROM user WHERE username = ? AND password = ?')
            .bind(username, password)
            .first();

          if (user) {
            return new Response(JSON.stringify({ 
              success: true, 
              message: '登录成功！', 
              userInfo: { id: user.id, username: user.username, balance: user.balance } 
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