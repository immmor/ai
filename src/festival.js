// 节日特效系统
// 支持春节、情人节、圣诞节、国庆节等节日的炫酷视觉效果

class FestivalEffects {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.festival = this.getTodayFestival();
    this.isRunning = false;
    this.animationId = null;
    this.fadeOut = false;
    this.fadeSpeed = 0.015;
    this.stopTimer = null;
    
    this.init();
    this.setupEventListeners();
  }
  
  init() {
    // 设置Canvas尺寸
    this.resizeCanvas();
    document.body.appendChild(this.canvas);
    
    // 设置Canvas样式
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '9999';
    this.canvas.style.pointerEvents = 'none';
    
    // 启动动画
    this.start();
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  getTodayFestival() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekDay = now.getDay();
    const weekOfMonth = Math.ceil(day / 7);
    
    // 节日日期配置
    const festivals = [
      { month: 1, day: 1, name: 'newYear' },
      { month: 2, day: 14, name: 'valentine' },
      { month: 5, day: 1, name: 'labour' },
      { month: 5, day: 5, name: 'dragonBoat' },
      { month: 8, day: 15, name: 'midAutumn' },
      { month: 10, day: 1, name: 'national' },
      { month: 10, day: 31, name: 'halloween' },
      // 感恩节：11月第四个星期四
      { month: 11, weekOfMonth: 4, weekDay: 4, name: 'thanksgiving' },
      { month: 12, day: 25, name: 'christmas' }
    ];
    
    // 检查当前日期是否匹配任何节日
    for (const festival of festivals) {
      if (festival.weekOfMonth && festival.weekDay) {
        // 处理按周计算的节日（如感恩节）
        if (festival.month === month && festival.weekOfMonth === weekOfMonth && festival.weekDay === weekDay) {
          return festival.name;
        }
      } else if (festival.month === month && festival.day === day) {
        // 处理固定日期的节日
        return festival.name;
      }
    }
    
    // 默认返回圣诞节（示例）
    return 'christmas';
  }
  
  setFestival(festivalName) {
    this.festival = festivalName;
    this.particles = [];
  }
  
  createParticle() {
    const particle = {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      color: this.getRandomColor(),
      life: 1,
      decay: Math.random() * 0.03 + 0.005
    };
    
    return particle;
  }
  
  getRandomColor() {
    const colors = {
      christmas: ['#FF0000', '#008000', '#FFFFFF', '#FFD700'],
      valentine: ['#FF1493', '#FF69B4', '#FFC0CB', '#FFB6C1'],
      newYear: ['#FF0000', '#FFD700', '#FF8C00', '#FFFF00'],
      national: ['#FF0000', '#FFFFFF', '#0000FF'],
      labour: ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF'],
      midAutumn: ['#FFD700', '#FFA500', '#FF8C00', '#FFFF00'],
      dragonBoat: ['#FF4500', '#FF6347', '#DC143C', '#FF8C00'],
      halloween: ['#FF6600', '#FFCC00', '#FF9900', '#8B4513'],
      thanksgiving: ['#D2691E', '#CD853F', '#DEB887', '#F4A460']
    };
    
    const festivalColors = colors[this.festival] || colors.christmas;
    return festivalColors[Math.floor(Math.random() * festivalColors.length)];
  }
  
  updateParticles() {
    // 淡出模式下不再创建新粒子
    if (!this.fadeOut && this.particles.length < 100) {
      const particle = this.createParticle();
      
      // 根据节日设置粒子特殊属性
      switch (this.festival) {
        case 'christmas':
          this.createSnowflake(particle);
          break;
        case 'valentine':
          this.createHeart(particle);
          break;
        case 'newYear':
          this.createFirework(particle);
          break;
        case 'national':
          this.createStar(particle);
          break;
        case 'labour':
          this.createConfetti(particle);
          break;
        case 'midAutumn':
          Math.random() > 0.5 ? this.createMooncake(particle) : this.createMoon(particle);
          break;
        case 'dragonBoat':
          Math.random() > 0.5 ? this.createZongzi(particle) : this.createDragon(particle);
          break;
        case 'halloween':
          Math.random() > 0.5 ? this.createPumpkin(particle) : this.createGhost(particle);
          break;
        case 'thanksgiving':
          Math.random() > 0.5 ? this.createTurkey(particle) : this.createCorn(particle);
          break;
      }
      
      this.particles.push(particle);
    }
    
    // 更新所有粒子
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      // 更新位置
      p.x += p.speedX;
      p.y += p.speedY;
      
      // 更新生命周期
      p.life -= p.decay;
      
      // 淡出模式下加速生命周期衰减
      if (this.fadeOut) {
        p.life -= this.fadeSpeed;
        // 同时逐渐缩小粒子
        p.size *= 0.98;
      }
      
      // 特殊节日效果
      switch (this.festival) {
        case 'christmas':
          p.speedX += (Math.random() - 0.5) * 0.1;
          p.y += 0.5;
          break;
        case 'valentine':
          p.speedY -= 0.1;
          p.size += 0.05;
          break;
        case 'newYear':
          p.size += 0.1;
          p.speedY += 0.2;
          break;
        case 'midAutumn':
          p.speedY += 0.3;
          p.speedX += (Math.random() - 0.5) * 0.2;
          break;
        case 'dragonBoat':
          p.speedY += 0.4;
          p.speedX += (Math.random() - 0.5) * 0.3;
          break;
        case 'halloween':
          p.speedY += 0.3;
          p.speedX += Math.sin(p.y * 0.01) * 0.2;
          break;
        case 'thanksgiving':
          p.speedY += 0.35;
          p.speedX += (Math.random() - 0.5) * 0.25;
          break;
      }
      
      // 移除死亡粒子
      if (p.life <= 0 || p.y > this.canvas.height || p.size <= 0.1) {
        this.particles.splice(i, 1);
      }
    }
    
    // 所有粒子都消失后，完全停止
    if (this.fadeOut && this.particles.length === 0) {
      this.isRunning = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      this.fadeOut = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  
  createSnowflake(particle) {
    particle.speedY = Math.random() * 2 + 0.5;
    particle.speedX = Math.random() * 2 - 1;
    particle.color = '#FFFFFF';
    particle.size = Math.random() * 4 + 1;
    particle.type = 'snowflake';
  }
  
  createHeart(particle) {
    particle.speedY = -Math.random() * 2 - 0.5;
    particle.speedX = Math.random() * 3 - 1.5;
    particle.type = 'heart';
  }
  
  createFirework(particle) {
    particle.x = this.canvas.width / 2;
    particle.y = this.canvas.height;
    particle.speedY = -Math.random() * 10 - 5;
    particle.speedX = Math.random() * 6 - 3;
    particle.type = 'firework';
    particle.size = 2;
  }
  
  createStar(particle) {
    particle.type = 'star';
    particle.size = Math.random() * 6 + 2;
  }
  
  createConfetti(particle) {
    particle.type = 'confetti';
    particle.size = Math.random() * 8 + 3;
    particle.speedY = Math.random() * 5 + 2;
  }
  
  createMooncake(particle) {
    particle.type = 'mooncake';
    particle.size = Math.random() * 6 + 4;
    particle.speedY = Math.random() * 2 + 1;
    particle.color = '#FFD700';
  }
  
  createMoon(particle) {
    particle.type = 'moon';
    particle.size = Math.random() * 10 + 8;
    particle.speedY = Math.random() * 1 + 0.5;
    particle.color = '#FFFFE0';
  }
  
  createZongzi(particle) {
    particle.type = 'zongzi';
    particle.size = Math.random() * 6 + 4;
    particle.speedY = Math.random() * 2.5 + 1.5;
    particle.color = '#8B4513';
  }
  
  createDragon(particle) {
    particle.type = 'dragon';
    particle.size = Math.random() * 8 + 6;
    particle.speedY = Math.random() * 2 + 1;
    particle.color = '#FF4500';
  }
  
  createPumpkin(particle) {
    particle.type = 'pumpkin';
    particle.size = Math.random() * 7 + 5;
    particle.speedY = Math.random() * 2 + 1;
    particle.color = '#FF6600';
  }
  
  createGhost(particle) {
    particle.type = 'ghost';
    particle.size = Math.random() * 8 + 6;
    particle.speedY = Math.random() * 1.5 + 0.5;
    particle.color = '#FFFFFF';
  }
  
  createTurkey(particle) {
    particle.type = 'turkey';
    particle.size = Math.random() * 7 + 5;
    particle.speedY = Math.random() * 2 + 1;
    particle.color = '#D2691E';
  }
  
  createCorn(particle) {
    particle.type = 'corn';
    particle.size = Math.random() * 6 + 4;
    particle.speedY = Math.random() * 2.5 + 1.5;
    particle.color = '#FFCC00';
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      
      switch (p.type) {
        case 'snowflake':
          this.drawSnowflake(p);
          break;
        case 'heart':
          this.drawHeart(p);
          break;
        case 'firework':
          this.drawFirework(p);
          break;
        case 'star':
          this.drawStar(p);
          break;
        case 'confetti':
          this.drawConfetti(p);
          break;
        case 'mooncake':
          this.drawMooncake(p);
          break;
        case 'moon':
          this.drawMoon(p);
          break;
        case 'zongzi':
          this.drawZongzi(p);
          break;
        case 'dragon':
          this.drawDragon(p);
          break;
        case 'pumpkin':
          this.drawPumpkin(p);
          break;
        case 'ghost':
          this.drawGhost(p);
          break;
        case 'turkey':
          this.drawTurkey(p);
          break;
        case 'corn':
          this.drawCorn(p);
          break;
        default:
          this.drawCircle(p);
      }
      
      this.ctx.restore();
    }
  }
  
  drawCircle(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  drawSnowflake(p) {
    this.ctx.strokeStyle = p.color;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    
    for (let i = 0; i < 6; i++) {
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(
        p.x + Math.cos(i * Math.PI / 3) * p.size,
        p.y + Math.sin(i * Math.PI / 3) * p.size
      );
      
      this.ctx.moveTo(
        p.x + Math.cos(i * Math.PI / 3) * p.size * 0.5,
        p.y + Math.sin(i * Math.PI / 3) * p.size * 0.5
      );
      this.ctx.lineTo(
        p.x + Math.cos((i * Math.PI / 3) + 0.5) * p.size * 0.8,
        p.y + Math.sin((i * Math.PI / 3) + 0.5) * p.size * 0.8
      );
      this.ctx.lineTo(
        p.x + Math.cos((i * Math.PI / 3) - 0.5) * p.size * 0.8,
        p.y + Math.sin((i * Math.PI / 3) - 0.5) * p.size * 0.8
      );
    }
    
    this.ctx.stroke();
  }
  
  drawHeart(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    
    const scale = p.size * 0.1;
    this.ctx.moveTo(p.x, p.y + 3 * scale);
    this.ctx.bezierCurveTo(p.x + 5 * scale, p.y - 2 * scale, p.x + 15 * scale, p.y - 2 * scale, p.x + 15 * scale, p.y + 3 * scale);
    this.ctx.bezierCurveTo(p.x + 15 * scale, p.y + 8 * scale, p.x, p.y + 15 * scale, p.x, p.y + 15 * scale);
    this.ctx.bezierCurveTo(p.x, p.y + 15 * scale, p.x - 15 * scale, p.y + 8 * scale, p.x - 15 * scale, p.y + 3 * scale);
    this.ctx.bezierCurveTo(p.x - 15 * scale, p.y - 2 * scale, p.x - 5 * scale, p.y - 2 * scale, p.x, p.y + 3 * scale);
    
    this.ctx.fill();
  }
  
  drawFirework(p) {
    this.ctx.fillStyle = p.color;
    
    // 主爆炸
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 爆炸碎片
    if (p.size > 5) {
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const distance = p.size * 2;
        
        this.ctx.beginPath();
        this.ctx.arc(
          p.x + Math.cos(angle) * distance,
          p.y + Math.sin(angle) * distance,
          p.size * 0.3,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      }
    }
  }
  
  drawStar(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const x = p.x + Math.cos(angle) * p.size;
      const y = p.y + Math.sin(angle) * p.size;
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
      
      const innerAngle = ((i + 0.5) * Math.PI * 2) / 5 - Math.PI / 2;
      const innerX = p.x + Math.cos(innerAngle) * p.size * 0.5;
      const innerY = p.y + Math.sin(innerAngle) * p.size * 0.5;
      this.ctx.lineTo(innerX, innerY);
    }
    
    this.ctx.closePath();
    this.ctx.fill();
  }
  
  drawConfetti(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  }
  
  drawMooncake(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 月饼花纹
    this.ctx.strokeStyle = '#8B4513';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
    this.ctx.stroke();
    
    this.ctx.beginPath();
    this.ctx.moveTo(p.x - p.size * 0.5, p.y);
    this.ctx.lineTo(p.x + p.size * 0.5, p.y);
    this.ctx.moveTo(p.x, p.y - p.size * 0.5);
    this.ctx.lineTo(p.x, p.y + p.size * 0.5);
    this.ctx.stroke();
  }
  
  drawMoon(p) {
    // 渐变月亮
    const gradient = this.ctx.createRadialGradient(p.x - p.size * 0.3, p.y - p.size * 0.3, 0, p.x, p.y, p.size);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(1, p.color);
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  drawZongzi(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    
    // 粽子三角形
    this.ctx.moveTo(p.x, p.y - p.size);
    this.ctx.lineTo(p.x - p.size * 0.8, p.y + p.size * 0.5);
    this.ctx.lineTo(p.x + p.size * 0.8, p.y + p.size * 0.5);
    this.ctx.closePath();
    this.ctx.fill();
    
    // 粽叶线条
    this.ctx.strokeStyle = '#228B22';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(p.x - p.size * 0.8, p.y + p.size * 0.5);
    this.ctx.lineTo(p.x, p.y - p.size);
    this.ctx.lineTo(p.x + p.size * 0.8, p.y + p.size * 0.5);
    this.ctx.moveTo(p.x - p.size * 0.6, p.y + p.size * 0.2);
    this.ctx.lineTo(p.x + p.size * 0.6, p.y + p.size * 0.2);
    this.ctx.stroke();
  }
  
  drawDragon(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    
    // 龙形
    this.ctx.arc(p.x, p.y, p.size * 0.6, Math.PI, 0);
    this.ctx.arc(p.x + p.size * 0.8, p.y, p.size * 0.4, 0, Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
    
    // 龙角
    this.ctx.strokeStyle = p.color;
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(p.x + p.size * 0.6, p.y - p.size * 0.4);
    this.ctx.lineTo(p.x + p.size * 1.2, p.y - p.size * 0.8);
    this.ctx.moveTo(p.x + p.size * 1.0, p.y - p.size * 0.3);
    this.ctx.lineTo(p.x + p.size * 1.4, p.y - p.size * 0.6);
    this.ctx.stroke();
  }
  
  drawPumpkin(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    
    // 南瓜圆形
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 南瓜条纹
    this.ctx.strokeStyle = '#FF8C00';
    this.ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(
        p.x + Math.cos(angle) * p.size,
        p.y + Math.sin(angle) * p.size
      );
      this.ctx.stroke();
    }
    
    // 南瓜灯眼睛和嘴巴
    this.ctx.fillStyle = '#000000';
    // 眼睛
    this.ctx.beginPath();
    this.ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.2, p.size * 0.15, 0, Math.PI * 2);
    this.ctx.arc(p.x + p.size * 0.3, p.y - p.size * 0.2, p.size * 0.15, 0, Math.PI * 2);
    this.ctx.fill();
    // 嘴巴
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y + p.size * 0.2, p.size * 0.3, 0, Math.PI);
    this.ctx.fill();
  }
  
  drawGhost(p) {
    // 半透明幽灵
    this.ctx.fillStyle = p.color;
    this.ctx.globalAlpha = p.life * 0.8;
    this.ctx.beginPath();
    
    // 幽灵身体
    this.ctx.arc(p.x, p.y - p.size * 0.3, p.size * 0.5, 0, Math.PI * 2);
    this.ctx.rect(p.x - p.size * 0.5, p.y - p.size * 0.3, p.size, p.size * 0.8);
    this.ctx.fill();
    
    // 幽灵底部波浪
    this.ctx.beginPath();
    this.ctx.moveTo(p.x - p.size * 0.5, p.y + p.size * 0.5);
    for (let i = 0; i < 3; i++) {
      this.ctx.quadraticCurveTo(
        p.x - p.size * 0.3 + i * p.size * 0.3,
        p.y + p.size * 0.7,
        p.x - p.size * 0.1 + i * p.size * 0.3,
        p.y + p.size * 0.5
      );
    }
    this.ctx.fill();
    
    // 幽灵眼睛
    this.ctx.fillStyle = '#000000';
    this.ctx.beginPath();
    this.ctx.arc(p.x - p.size * 0.2, p.y - p.size * 0.4, p.size * 0.1, 0, Math.PI * 2);
    this.ctx.arc(p.x + p.size * 0.2, p.y - p.size * 0.4, p.size * 0.1, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  drawTurkey(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    
    // 火鸡身体
    this.ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 火鸡尾巴
    const tailColors = ['#FF4500', '#FF6347', '#DC143C', '#FF8C00'];
    for (let i = 0; i < 5; i++) {
      this.ctx.fillStyle = tailColors[i % tailColors.length];
      this.ctx.beginPath();
      this.ctx.moveTo(p.x - p.size * 0.6, p.y);
      this.ctx.lineTo(p.x - p.size * 1.2, p.y - p.size * 0.8 + i * p.size * 0.4);
      this.ctx.lineTo(p.x - p.size * 0.6, p.y - p.size * 0.6 + i * p.size * 0.3);
      this.ctx.closePath();
      this.ctx.fill();
    }
    
    // 火鸡头部
    this.ctx.fillStyle = '#FFD700';
    this.ctx.beginPath();
    this.ctx.arc(p.x + p.size * 0.6, p.y, p.size * 0.3, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 火鸡嘴巴
    this.ctx.fillStyle = '#FF4500';
    this.ctx.beginPath();
    this.ctx.moveTo(p.x + p.size * 0.8, p.y);
    this.ctx.lineTo(p.x + p.size * 1.0, p.y - p.size * 0.1);
    this.ctx.lineTo(p.x + p.size * 1.0, p.y + p.size * 0.1);
    this.ctx.closePath();
    this.ctx.fill();
  }
  
  drawCorn(p) {
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    
    // 玉米棒
    this.ctx.fillRect(p.x - p.size * 0.3, p.y - p.size * 0.7, p.size * 0.6, p.size * 1.4);
    
    // 玉米粒
    this.ctx.fillStyle = '#DAA520';
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        this.ctx.beginPath();
        this.ctx.arc(
          p.x - p.size * 0.3 + col * p.size * 0.3,
          p.y - p.size * 0.5 + row * p.size * 0.35,
          p.size * 0.1,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      }
    }
    
    // 玉米须
    this.ctx.strokeStyle = '#FFD700';
    this.ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(p.x - p.size * 0.2 + i * p.size * 0.15, p.y - p.size * 0.8);
      this.ctx.lineTo(p.x - p.size * 0.4 + i * p.size * 0.2, p.y - p.size * 1.2);
      this.ctx.stroke();
    }
  }
  
  animate() {
    if (!this.isRunning) return;
    
    this.updateParticles();
    this.drawParticles();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  start(duration = 10000) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.fadeOut = false;
    this.animate();
    
    // 设置定时器，指定时间后开始淡出
    this.stopTimer = setTimeout(() => {
      this.startFadeOut();
    }, duration);
  }
  
  // 开始淡出效果
  startFadeOut() {
    this.fadeOut = true;
  }
  
  stop(immediate = false) {
    if (!this.isRunning) return;
    
    // 清除定时器
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
      this.stopTimer = null;
    }
    
    if (immediate) {
      // 立即停止
      this.isRunning = false;
      this.fadeOut = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles = [];
    } else {
      // 平滑淡出
      this.startFadeOut();
    }
  }
  
  // 创建节日切换控制面板
  createControlPanel() {
    const panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.top = '20px';
    panel.style.right = '20px';
    panel.style.zIndex = '10000';
    panel.style.background = 'rgba(255, 255, 255, 0.8)';
    panel.style.padding = '10px';
    panel.style.borderRadius = '5px';
    panel.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    
    const title = document.createElement('h3');
    title.textContent = '节日特效';
    title.style.margin = '0 0 10px 0';
    title.style.fontSize = '14px';
    panel.appendChild(title);
    
    const festivals = ['christmas', 'valentine', 'newYear', 'national', 'labour', 'midAutumn', 'dragonBoat', 'halloween', 'thanksgiving'];
    const festivalNames = ['圣诞节', '情人节', '新年', '国庆节', '劳动节', '中秋节', '端午节', '万圣节', '感恩节'];
    
    // 为感恩节添加特殊说明
    if (this.festival === 'thanksgiving') {
      const note = document.createElement('p');
      note.textContent = '感恩节：11月第四个星期四';
      note.style.fontSize = '12px';
      note.style.color = '#666';
      note.style.margin = '5px 0 10px 0';
      panel.appendChild(note);
    }
    
    festivals.forEach((festival, index) => {
      const button = document.createElement('button');
      button.textContent = festivalNames[index];
      button.style.margin = '2px';
      button.style.padding = '5px 10px';
      button.style.border = 'none';
      button.style.borderRadius = '3px';
      button.style.cursor = 'pointer';
      button.style.backgroundColor = '#f0f0f0';
      
      button.addEventListener('click', () => {
        this.setFestival(festival);
        
        // 更新按钮样式
        document.querySelectorAll('#festival-controls button').forEach(btn => {
          btn.style.backgroundColor = '#f0f0f0';
        });
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';
      });
      
      panel.appendChild(button);
    });
    
    panel.id = 'festival-controls';
    document.body.appendChild(panel);
  }
}

// 初始化节日特效系统
window.addEventListener('DOMContentLoaded', () => {
  const festivalEffects = new FestivalEffects();
//   festivalEffects.createControlPanel();
  
  // 暴露到全局以便调试
  window.festivalEffects = festivalEffects;
  
  // 添加一个重新开始按钮到控制面板
  const restartButton = document.createElement('button');
  restartButton.textContent = '重新开始 (10秒)';
  restartButton.style.margin = '10px 2px 0 2px';
  restartButton.style.padding = '5px 10px';
  restartButton.style.border = 'none';
  restartButton.style.borderRadius = '3px';
  restartButton.style.cursor = 'pointer';
  restartButton.style.backgroundColor = '#2196F3';
  restartButton.style.color = 'white';
  restartButton.style.display = 'block';
  
  restartButton.addEventListener('click', () => {
    festivalEffects.stop();
    setTimeout(() => {
      festivalEffects.start();
    }, 100);
  });
  
  document.getElementById('festival-controls').appendChild(restartButton);
});