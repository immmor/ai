// _worker.js
export default {
  // fetch 事件是核心，拦截所有进入 Pages 的请求
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 1. 处理自定义 API 接口（后台逻辑）
    if (url.pathname.startsWith('/api/')) {
      // 路由匹配：/api/hello
      if (url.pathname === '/api/hello') {
        // 返回 JSON 响应，模拟后台接口
        return new Response(JSON.stringify({
          code: 200,
          message: 'Hello from Pages Worker!',
          data: { time: new Date().toISOString() }
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 路由匹配：/api/user
      if (url.pathname === '/api/user') {
        // 模拟获取用户数据（可对接数据库、KV 等）
        return new Response(JSON.stringify({
          code: 200,
          data: { id: 1, name: 'Cloudflare User' }
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 404 接口
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