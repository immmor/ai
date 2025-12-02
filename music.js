// 音乐播放器按钮
window.addEventListener('DOMContentLoaded', function() {
  // 音乐列表
  const musicList = [
    // { title: '轻松音乐', url: 'static/music1.mp3' },
    // { title: '专注音乐', url: 'static/music2.mp3' },
    { title: '放松音乐', url: 'ThroughThisLifeAndBeyondIt.mp3' }
  ];
  
  let currentTrackIndex = 0;
  let isPlaying = false;
  let audio = null;
  
  // 创建音乐播放器按钮
  const musicButton = document.createElement('div');
  musicButton.id = 'music-player';
  musicButton.style.position = 'fixed';
  musicButton.style.right = '5px'; // 从10px减小到5px，更靠右
  musicButton.style.bottom = '30px';
  musicButton.style.width = '30px'; // 从40px减小到30px
  musicButton.style.height = '30px'; // 从40px减小到30px
  musicButton.style.borderRadius = '50%';
  musicButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  musicButton.style.backdropFilter = 'blur(10px)';
  musicButton.style.webkitBackdropFilter = 'blur(10px)';
  musicButton.style.border = '1px solid rgba(255, 255, 255, 0.3)';
  musicButton.style.display = 'flex';
  musicButton.style.alignItems = 'center';
  musicButton.style.justifyContent = 'center';
  musicButton.style.cursor = 'pointer';
  musicButton.style.zIndex = '1000';
  musicButton.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
  musicButton.style.transition = 'all 0.3s ease';
  
  // 创建播放/暂停图标
  const playIcon = document.createElement('div');
  playIcon.style.width = '0';
  playIcon.style.height = '0';
  playIcon.style.borderLeft = '9px solid rgba(255, 182, 193, 0.8)'; // 从12px减小到9px
  playIcon.style.borderTop = '6px solid transparent'; // 从8px减小到6px
  playIcon.style.borderBottom = '6px solid transparent'; // 从8px减小到6px
  playIcon.style.marginLeft = '3px'; // 从4px减小到3px
  playIcon.style.transition = 'all 0.3s ease';
  
  const pauseIcon = document.createElement('div');
  pauseIcon.style.display = 'none';
  pauseIcon.style.width = '15px'; // 从20px减小到15px
  pauseIcon.style.height = '15px'; // 从20px减小到15px
  pauseIcon.style.position = 'relative';
  pauseIcon.style.transition = 'all 0.3s ease';
  
  const pauseBar1 = document.createElement('div');
  pauseBar1.style.position = 'absolute';
  pauseBar1.style.width = '4px'; // 从5px减小到4px
  pauseBar1.style.height = '15px'; // 从20px减小到15px
  pauseBar1.style.backgroundColor = 'rgba(255, 182, 193, 0.8)'; // 浅粉色
  pauseBar1.style.borderRadius = '2px'; // 从2.5px减小到2px
  pauseBar1.style.left = '2px'; // 从3px减小到2px
  
  const pauseBar2 = document.createElement('div');
  pauseBar2.style.position = 'absolute';
  pauseBar2.style.width = '4px'; // 从5px减小到4px
  pauseBar2.style.height = '15px'; // 从20px减小到15px
  pauseBar2.style.backgroundColor = 'rgba(255, 182, 193, 0.8)'; // 浅粉色
  pauseBar2.style.borderRadius = '2px'; // 从2.5px减小到2px
  pauseBar2.style.right = '2px'; // 从3px减小到2px
  
  pauseIcon.appendChild(pauseBar1);
  pauseIcon.appendChild(pauseBar2);
  
  musicButton.appendChild(playIcon);
  musicButton.appendChild(pauseIcon);
  
  // 添加到页面
  document.body.appendChild(musicButton);
  
  // 添加悬停效果
  musicButton.addEventListener('mouseenter', function() {
    musicButton.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    musicButton.style.transform = 'scale(1.05)';
  });
  
  musicButton.addEventListener('mouseleave', function() {
    musicButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    musicButton.style.transform = 'scale(1)';
  });
  
  // 播放/暂停功能
  musicButton.addEventListener('click', async function() {
    if (!isDragging) {
      handleMusicPlayPause();
    }
  });
  
  // 添加触摸事件处理
  musicButton.addEventListener('touchend', async function(e) {
    e.preventDefault(); // 防止默认行为干扰
    if (!isDragging) {
      handleMusicPlayPause();
    }
  });
  
  // 处理音乐播放/暂停的函数
  async function handleMusicPlayPause() {
    if (!isPlaying) {
      // 播放音乐
      if (!audio) {
        audio = new Audio();
        // 添加移动设备兼容性设置
        audio.preload = 'auto';
        audio.loop = false;
        
        audio.addEventListener('ended', function() {
          // 播放下一首
          currentTrackIndex = (currentTrackIndex + 1) % musicList.length;
          audio.src = musicList[currentTrackIndex].url;
          playAudio();
        });
        
        audio.addEventListener('error', function(e) {
          console.error('音频播放错误:', e);
          // 尝试重新加载
          audio.load();
        });
      }
      
      audio.src = musicList[currentTrackIndex].url;
      await playAudio();
      isPlaying = true;
      
      // 更新UI
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      // 暂停音乐
      if (audio) {
        audio.pause();
      }
      isPlaying = false;
      
      // 更新UI
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  }
  
  // 播放音频的辅助函数，处理移动设备兼容性
  async function playAudio() {
    try {
      // 确保音频已加载
      if (audio.readyState < 2) {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('音频加载超时')), 5000);
          audio.addEventListener('canplaythrough', () => {
            clearTimeout(timeout);
            resolve();
          }, { once: true });
          audio.addEventListener('error', () => {
            clearTimeout(timeout);
            reject(new Error('音频加载失败'));
          }, { once: true });
          audio.load();
        });
      }
      
      // 尝试播放
      const playPromise = audio.play();
      
      // 现代浏览器返回Promise
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      console.error('播放音频失败:', error);
      
      // 尝试创建新的音频上下文（解决某些移动设备的问题）
      try {
        if (window.AudioContext || window.webkitAudioContext) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const audioContext = new AudioContext();
          
          // 如果音频上下文被暂停，尝试恢复
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
          
          // 再次尝试播放
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        }
      } catch (contextError) {
        console.error('创建音频上下文失败:', contextError);
      }
    }
  }
  
  // 拖拽功能
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let buttonStartX = 0;
  let buttonStartY = 0;
  let touchStartTime = 0;
  const dragThreshold = 5; // 拖拽阈值，超过5px才算拖拽
  const edgeMargin = 5; // 边缘间距，与按钮初始右边距一致
  const snapThreshold = 20; // 吸附阈值
  const horizontalLock = true; // 水平锁定，只允许在右侧边缘移动
  
  musicButton.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    
    const rect = musicButton.getBoundingClientRect();
    buttonStartX = rect.left;
    buttonStartY = rect.top;
    
    musicButton.style.cursor = 'grabbing';
    musicButton.style.transition = 'none'; // 拖拽时禁用过渡效果
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const deltaX = e.clientX - dragStartX;
      const deltaY = e.clientY - dragStartY;
      
      let newY = buttonStartY + deltaY;
      
      // 获取按钮尺寸
      const buttonHeight = musicButton.offsetHeight;
      
      // 垂直方向自由移动，但限制在屏幕范围内
      if (newY < edgeMargin) {
        newY = edgeMargin;
      } else if (newY + buttonHeight > window.innerHeight - edgeMargin) {
        newY = window.innerHeight - buttonHeight - edgeMargin;
      }
      
      // 使用right定位，保持与右边框的固定距离
      musicButton.style.left = 'auto';
      musicButton.style.top = newY + 'px';
      musicButton.style.right = edgeMargin + 'px';
      musicButton.style.bottom = 'auto';
    }
  });
  
  document.addEventListener('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      musicButton.style.cursor = 'pointer';
      musicButton.style.transition = 'all 0.3s ease'; // 恢复过渡效果
      
      // 边缘吸附算法 - 只考虑垂直方向的吸附
      const currentY = parseInt(musicButton.style.top);
      const windowHeight = window.innerHeight;
      const buttonHeight = musicButton.offsetHeight;
      
      let finalY = currentY;
      
      // 检查是否接近顶部边缘
      if (currentY < snapThreshold) {
        finalY = edgeMargin;
      }
      // 检查是否接近底部边缘
      else if (windowHeight - currentY - buttonHeight < snapThreshold) {
        finalY = windowHeight - buttonHeight - edgeMargin;
      }
      
      // 应用吸附位置，使用right定位保持与右边框的固定距离
      musicButton.style.left = 'auto';
      musicButton.style.top = finalY + 'px';
      musicButton.style.right = edgeMargin + 'px';
      musicButton.style.bottom = 'auto';
    }
  });
  
  // 添加触摸支持
  musicButton.addEventListener('touchstart', function(e) {
    // 只有在单点触摸时才开始跟踪
    if (e.touches.length === 1) {
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      
      const rect = musicButton.getBoundingClientRect();
      buttonStartX = rect.left;
      buttonStartY = rect.top;
      
      // 不立即设置isDragging为true，等待touchmove判断
      e.preventDefault();
    }
  });
  
  document.addEventListener('touchmove', function(e) {
    if (e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - dragStartX;
      const deltaY = e.touches[0].clientY - dragStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // 只有当移动距离超过阈值时才认为是拖拽
      if (distance > dragThreshold) {
        isDragging = true;
        
        // 获取按钮尺寸
        const buttonWidth = musicButton.offsetWidth;
        const buttonHeight = musicButton.offsetHeight;
        
        // 强制水平锁定：始终保持在右侧边缘
        let newY = buttonStartY + deltaY;
        
        // 垂直方向自由移动，但限制在屏幕范围内
        if (newY < edgeMargin) {
          newY = edgeMargin;
        } else if (newY + buttonHeight > window.innerHeight - edgeMargin) {
          newY = window.innerHeight - buttonHeight - edgeMargin;
        }
        
        musicButton.style.left = 'auto';
        musicButton.style.right = edgeMargin + 'px';
        musicButton.style.top = newY + 'px';
        musicButton.style.bottom = 'auto';
      }
    }
  });
  
  document.addEventListener('touchend', function(e) {
    // 重置拖拽状态
    setTimeout(() => {
      isDragging = false;
      
      // 确保按钮始终在右侧边缘
      const buttonWidth = musicButton.offsetWidth;
      const buttonHeight = musicButton.offsetHeight;
      const currentY = parseInt(musicButton.style.top) || buttonStartY;
      
      // 垂直方向边缘吸附
      let finalY = currentY;
      if (currentY < edgeMargin) {
        finalY = edgeMargin;
      } else if (currentY + buttonHeight > window.innerHeight - edgeMargin) {
        finalY = window.innerHeight - buttonHeight - edgeMargin;
      }
      
      // 应用最终位置，确保在右侧
      musicButton.style.left = 'auto';
      musicButton.style.right = edgeMargin + 'px';
      musicButton.style.top = finalY + 'px';
      musicButton.style.bottom = 'auto';
    }, 10);
  });
});