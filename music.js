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
  musicButton.style.right = '30px';
  musicButton.style.bottom = '30px';
  musicButton.style.width = '60px';
  musicButton.style.height = '60px';
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
  playIcon.style.borderLeft = '18px solid rgba(255, 182, 193, 0.8)'; // 浅粉色
  playIcon.style.borderTop = '12px solid transparent';
  playIcon.style.borderBottom = '12px solid transparent';
  playIcon.style.marginLeft = '6px';
  playIcon.style.transition = 'all 0.3s ease';
  
  const pauseIcon = document.createElement('div');
  pauseIcon.style.display = 'none';
  pauseIcon.style.width = '30px'; // 从36px减小到30px
  pauseIcon.style.height = '30px'; // 从36px减小到30px
  pauseIcon.style.position = 'relative';
  pauseIcon.style.transition = 'all 0.3s ease';
  
  const pauseBar1 = document.createElement('div');
  pauseBar1.style.position = 'absolute';
  pauseBar1.style.width = '8px'; // 从10px减小到8px
  pauseBar1.style.height = '30px'; // 从36px减小到30px
  pauseBar1.style.backgroundColor = 'rgba(255, 182, 193, 0.8)'; // 浅粉色
  pauseBar1.style.borderRadius = '4px'; // 从5px减小到4px
  pauseBar1.style.left = '5px'; // 从6px调整为5px
  
  const pauseBar2 = document.createElement('div');
  pauseBar2.style.position = 'absolute';
  pauseBar2.style.width = '8px'; // 从10px减小到8px
  pauseBar2.style.height = '30px'; // 从36px减小到30px
  pauseBar2.style.backgroundColor = 'rgba(255, 182, 193, 0.8)'; // 浅粉色
  pauseBar2.style.borderRadius = '4px'; // 从5px减小到4px
  pauseBar2.style.right = '5px'; // 从6px调整为5px
  
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
  musicButton.addEventListener('click', function() {
    if (!isPlaying) {
      // 播放音乐
      if (!audio) {
        audio = new Audio();
        audio.addEventListener('ended', function() {
          // 播放下一首
          currentTrackIndex = (currentTrackIndex + 1) % musicList.length;
          audio.src = musicList[currentTrackIndex].url;
          audio.play();
        });
      }
      
      audio.src = musicList[currentTrackIndex].url;
      audio.play();
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
  });
  
  // 拖拽功能
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let buttonStartX = 0;
  let buttonStartY = 0;
  
  musicButton.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    
    const rect = musicButton.getBoundingClientRect();
    buttonStartX = rect.left;
    buttonStartY = rect.top;
    
    musicButton.style.cursor = 'grabbing';
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const deltaX = e.clientX - dragStartX;
      const deltaY = e.clientY - dragStartY;
      
      let newX = buttonStartX + deltaX;
      let newY = buttonStartY + deltaY;
      
      // 获取按钮尺寸
      const buttonWidth = musicButton.offsetWidth;
      const buttonHeight = musicButton.offsetHeight;
      
      // 计算与各边缘的距离
      const distToLeft = newX;
      const distToRight = window.innerWidth - (newX + buttonWidth);
      const distToTop = newY;
      const distToBottom = window.innerHeight - (newY + buttonHeight);
      
      // 找出最近的边缘
      const minDistance = Math.min(distToLeft, distToRight, distToTop, distToBottom);
      
      // 边缘间距
      const edgeMargin = 30;
      
      // 根据最近的边缘吸附，但保持一定距离
      if (minDistance === distToLeft) {
        newX = edgeMargin; // 吸附到左边缘，但保持30px距离
      } else if (minDistance === distToRight) {
        newX = window.innerWidth - buttonWidth - edgeMargin; // 吸附到右边缘，但保持30px距离
      } else if (minDistance === distToTop) {
        newY = edgeMargin; // 吸附到上边缘，但保持30px距离
      } else {
        newY = window.innerHeight - buttonHeight - edgeMargin; // 吸附到底部，但保持30px距离
      }
      
      musicButton.style.left = newX + 'px';
      musicButton.style.top = newY + 'px';
      musicButton.style.right = 'auto';
      musicButton.style.bottom = 'auto';
    }
  });
  
  document.addEventListener('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      musicButton.style.cursor = 'pointer';
    }
  });
  
  // 添加触摸支持
  musicButton.addEventListener('touchstart', function(e) {
    isDragging = true;
    dragStartX = e.touches[0].clientX;
    dragStartY = e.touches[0].clientY;
    
    const rect = musicButton.getBoundingClientRect();
    buttonStartX = rect.left;
    buttonStartY = rect.top;
    
    e.preventDefault();
  });
  
  document.addEventListener('touchmove', function(e) {
    if (isDragging) {
      const deltaX = e.touches[0].clientX - dragStartX;
      const deltaY = e.touches[0].clientY - dragStartY;
      
      let newX = buttonStartX + deltaX;
      let newY = buttonStartY + deltaY;
      
      // 获取按钮尺寸
      const buttonWidth = musicButton.offsetWidth;
      const buttonHeight = musicButton.offsetHeight;
      
      // 计算与各边缘的距离
      const distToLeft = newX;
      const distToRight = window.innerWidth - (newX + buttonWidth);
      const distToTop = newY;
      const distToBottom = window.innerHeight - (newY + buttonHeight);
      
      // 找出最近的边缘
      const minDistance = Math.min(distToLeft, distToRight, distToTop, distToBottom);
      
      // 边缘间距
      const edgeMargin = 30;
      
      // 根据最近的边缘吸附，但保持一定距离
      if (minDistance === distToLeft) {
        newX = edgeMargin; // 吸附到左边缘，但保持30px距离
      } else if (minDistance === distToRight) {
        newX = window.innerWidth - buttonWidth - edgeMargin; // 吸附到右边缘，但保持30px距离
      } else if (minDistance === distToTop) {
        newY = edgeMargin; // 吸附到上边缘，但保持30px距离
      } else {
        newY = window.innerHeight - buttonHeight - edgeMargin; // 吸附到底部，但保持30px距离
      }
      
      musicButton.style.left = newX + 'px';
      musicButton.style.top = newY + 'px';
      musicButton.style.right = 'auto';
      musicButton.style.bottom = 'auto';
    }
  });
  
  document.addEventListener('touchend', function() {
    if (isDragging) {
      isDragging = false;
    }
  });
});