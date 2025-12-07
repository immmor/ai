/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// 写一个简单的登录接口，结合Cloudflare D1数据库

export default {
  async fetch(request, env, ctx) {
    // 处理CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders
      });
    }

    const url = new URL(request.url);
    
    // 登录接口
    if (url.pathname === '/login' && request.method === 'POST') {
      try {
        const { username, password } = await request.json();
        
        // 检查D1数据库绑定是否存在
        if (!env.DB) {
          console.error('D1数据库绑定不存在');
          return new Response(JSON.stringify({
            success: false,
            message: '数据库绑定未配置',
            debug: {
              availableBindings: Object.keys(env),
              workerName: env.WORKER_NAME || '未知',
              timestamp: new Date().toISOString()
            }
          }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }
        
        console.log('数据库绑定存在，准备查询用户:', username);
        
        // 从D1数据库查询用户
        const query = env.DB.prepare(
          'SELECT id, username, password FROM user WHERE username = ?'
        ).bind(username);
        
        console.log('查询语句已准备好，执行查询');
        const user = await query.first();
        
        console.log('查询结果:', user);
        
        // 验证用户名和密码
        if (user && user.password === password) {
          // 登录成功，返回token
          const token = btoa(`${username}:${Date.now()}`);
          return new Response(JSON.stringify({
            success: true,
            message: '登录成功',
            token: token,
            user: {
              id: user.id,
              username: user.username
            }
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        } else {
          // 登录失败
          return new Response(JSON.stringify({
            success: false,
            message: '用户名或密码错误'
          }), {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }
      } catch (error) {
        console.error('登录错误:', error);
        console.error('错误堆栈:', error.stack);
        return new Response(JSON.stringify({
          success: false,
          message: '服务器错误: ' + error.message,
          debug: {
            errorType: error.constructor.name,
            errorStack: error.stack,
            timestamp: new Date().toISOString()
          }
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }
    }
    
    // 注册接口
    if (url.pathname === '/register' && request.method === 'POST') {
      try {
        const { username, password } = await request.json();
        
        // 检查D1数据库绑定是否存在
        if (!env.DB) {
          return new Response(JSON.stringify({
            success: false,
            message: '数据库绑定未配置'
          }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }
        
        // 检查用户名是否已存在
        const existingUser = await env.DB.prepare(
          'SELECT id FROM user WHERE username = ?'
        ).bind(username).first();
        
        if (existingUser) {
          return new Response(JSON.stringify({
            success: false,
            message: '用户名已存在'
          }), {
            status: 409,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }
        
        // 创建新用户
        const result = await env.DB.prepare(
          'INSERT INTO user (username, password) VALUES (?, ?)'
        ).bind(username, password).run();
        
        return new Response(JSON.stringify({
          success: true,
          message: '注册成功',
          user: {
            id: result.meta.last_row_id,
            username: username
          }
        }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      } catch (error) {
        console.error('注册错误:', error);
        return new Response(JSON.stringify({
          success: false,
          message: '服务器错误: ' + error.message
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }
    }
    
    // 数据库健康检查接口
    if (url.pathname === '/health' && request.method === 'GET') {
      try {
        const healthCheck = {
          status: 'ok',
          timestamp: new Date().toISOString(),
          availableBindings: Object.keys(env),
          database: {
            bound: !!env.DB,
            status: 'unknown'
          }
        };
        
        if (env.DB) {
          try {
            // 测试数据库连接
            const result = await env.DB.prepare('SELECT 1 as test').first();
            healthCheck.database.status = 'connected';
            healthCheck.database.testResult = result;
          } catch (dbError) {
            healthCheck.database.status = 'error';
            healthCheck.database.error = dbError.message;
          }
        } else {
          healthCheck.database.status = 'not_bound';
        }
        
        return new Response(JSON.stringify(healthCheck), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      } catch (error) {
        console.error('健康检查错误:', error);
        return new Response(JSON.stringify({
          status: 'error',
          message: error.message
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }
    }
    
    // 默认响应
    return new Response('Hello World! 请使用 POST /login 进行登录或 POST /register 进行注册，或访问 /health 检查数据库健康状态', {
      headers: corsHeaders
    });
  }
};