// 音乐播放器按钮
window.addEventListener('DOMContentLoaded', function() {
  // 音乐列表
  const musicList = [
    { title: '轻松音乐', url: 'music/mojave.mp3' },
    // { title: '专注音乐', url: 'music/music2.mp3' },
    { title: '放松音乐', url: 'music/ThroughThisLifeAndBeyondIt.mp3' }
  ];
  
  // 随机选择初始歌曲
  let currentTrackIndex = Math.floor(Math.random() * musicList.length);
  let isPlaying = false;
  let audio = null;
  
  // 创建音乐播放器按钮
  const musicButton = document.createElement('button');
  musicButton.id = 'music-player';
  musicButton.className = 'text-gray-500 hover:text-purple-500 flex items-center transition-all duration-300 select-none';
  musicButton.title = '音乐播放';
  musicButton.style.padding = '0';
  musicButton.style.background = 'none';
  musicButton.style.border = 'none';
  musicButton.style.outline = 'none';
  
  // 创建播放/暂停图标 - 使用Font Awesome图标
  const playIcon = document.createElement('i');
  playIcon.className = 'fa fa-play mr-1 text-purple-500';
  playIcon.style.display = 'inline-block';
  playIcon.style.width = '12px';
  
  const pauseIcon = document.createElement('i');
  pauseIcon.className = 'fa fa-pause mr-1 text-purple-500';
  pauseIcon.style.display = 'none';
  pauseIcon.style.width = '12px';
  
  // 创建音乐文本标签
  const musicText = document.createElement('span');
  // musicText.textContent = ' 音乐';
  
  musicButton.appendChild(playIcon);
  musicButton.appendChild(pauseIcon);
  musicButton.appendChild(musicText);
  
  // 添加到footer区域，加油按钮的右边
  const cheerBtn = document.getElementById('cheer-btn');
  if (cheerBtn) {
    const footerLeft = cheerBtn.parentNode;
    footerLeft.insertBefore(musicButton, cheerBtn.nextSibling);
  } else {
    // 如果找不到加油按钮，则添加到body
    document.body.appendChild(musicButton);
  }
  
  // 播放/暂停功能
  musicButton.addEventListener('click', async function() {
    handleMusicPlayPause();
  });
  
  // 添加触摸事件处理
  musicButton.addEventListener('touchend', async function(e) {
    e.preventDefault(); // 防止默认行为干扰
    handleMusicPlayPause();
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
          // 随机播放下一首
          let nextTrackIndex;
          do {
            nextTrackIndex = Math.floor(Math.random() * musicList.length);
          } while (nextTrackIndex === currentTrackIndex && musicList.length > 1);
          
          currentTrackIndex = nextTrackIndex;
          audio.src = musicList[currentTrackIndex].url;
          playAudio();
        });
        
        audio.addEventListener('error', function(e) {
          console.error('音频播放错误:', e);
          // 尝试重新加载
          audio.load();
        });
      }
      
      // 每次点击播放时随机选择一首歌曲
      let newTrackIndex;
      do {
        newTrackIndex = Math.floor(Math.random() * musicList.length);
      } while (newTrackIndex === currentTrackIndex && musicList.length > 1);
      
      currentTrackIndex = newTrackIndex;
      audio.src = musicList[currentTrackIndex].url;
      await playAudio();
      isPlaying = true;
      
      // 更新UI
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline-block';
    } else {
      // 暂停音乐
      if (audio) {
        audio.pause();
      }
      isPlaying = false;
      
      // 更新UI
      playIcon.style.display = 'inline-block';
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
  
  // 音乐按钮现在位于footer中，不再需要拖拽功能
});