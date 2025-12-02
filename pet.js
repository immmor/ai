// 创建一个从右往左循环移动的cat1.gif动画
window.addEventListener('DOMContentLoaded', function() {
  // 创建图片元素
  const cat = document.createElement('img');
  cat.src = 'cat1.gif';
  cat.style.position = 'fixed';
  cat.style.bottom = '20px'; // 距离底部20px，沿着footer边
  cat.style.width = '80px'; // 稍微调整大小，更适合底部显示
  cat.style.height = 'auto';
  cat.style.zIndex = '1000';
  
  // 将图片添加到页面
  document.body.appendChild(cat);
  
  // 创建消息气泡元素
  const messageBubble = document.createElement('div');
  messageBubble.style.position = 'fixed';
  messageBubble.style.padding = '8px 12px';
  messageBubble.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
  messageBubble.style.borderRadius = '15px';
  messageBubble.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  messageBubble.style.fontSize = '14px';
  messageBubble.style.fontFamily = 'Arial, sans-serif';
  messageBubble.style.color = '#333';
  messageBubble.style.zIndex = '1001';
  messageBubble.style.display = 'none';
  messageBubble.style.maxWidth = '200px';
  document.body.appendChild(messageBubble);
  
  // 可能的消息列表
  const messages = [
    "喵~",
    "你好呀！",
    "继续学习吧！",
    "加油！",
    "你真棒！",
    "喵喵~",
    "摸摸我~",
    "今天学到了什么？"
  ];
  
  // 添加点击事件
  cat.addEventListener('click', function() {
    // 跳跃动画
    cat.style.transition = 'transform 0.3s ease-out';
    cat.style.transform = 'translateY(-30px)';
    
    // 显示随机消息
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageBubble.textContent = randomMessage;
    messageBubble.style.display = 'block';
    
    // 定位消息气泡在猫的上方
    const catRect = cat.getBoundingClientRect();
    messageBubble.style.left = (catRect.left + catRect.width / 2 - messageBubble.offsetWidth / 2) + 'px';
    messageBubble.style.bottom = (window.innerHeight - catRect.top - 10) + 'px'; // 调整为-10，让气泡稍微往下
    
    // 300ms后恢复原始位置
    setTimeout(() => {
      cat.style.transform = 'translateY(0)';
    }, 300);
    
    // 2秒后隐藏消息
    setTimeout(() => {
      messageBubble.style.display = 'none';
    }, 2000);
    
    // 播放猫叫声
    const audio = new Audio('meow.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('无法播放声音:', e));
  });
  
  // 添加鼠标悬停效果
  cat.addEventListener('mouseenter', function() {
    cat.style.cursor = 'pointer';
    cat.style.transform = 'scale(1.1)';
  });
  
  cat.addEventListener('mouseleave', function() {
    cat.style.transform = 'scale(1)';
  });
  
  // 初始化位置（从屏幕右侧开始）
  let position = window.innerWidth;
  cat.style.left = position + 'px';
  
  // 设置移动速度
  const speed = 1; // 像素/帧
  
  // 动画函数
  function moveCat() {
    // 更新位置
    position -= speed;
    
    // 如果猫完全移出屏幕左侧，重置到右侧
    if (position < -100) {
      position = window.innerWidth;
    }
    
    // 更新猫的位置
    cat.style.left = position + 'px';
    
    // 如果消息气泡正在显示，更新其位置跟随猫
    if (messageBubble.style.display === 'block') {
      const catRect = cat.getBoundingClientRect();
      messageBubble.style.left = (catRect.left + catRect.width / 2 - messageBubble.offsetWidth / 2) + 'px';
      messageBubble.style.bottom = (window.innerHeight - catRect.top - 10) + 'px'; // 调整为-10，让气泡稍微往下
    }
    
    // 继续动画
    requestAnimationFrame(moveCat);
  }
  
  // 开始动画
  moveCat();
});