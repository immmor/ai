// 高级音量控制系统
class VolumeControl {
    constructor() {
        // 默认音量设置
        this.volumes = {
            master: 0.5,        // 主音量
            correct: 0.7,       // 做对题音效
            wrong: 0.6,         // 做错题音效
            cheer: 0.8,         // 加油音效
            speech: 0.9,        // 语音播报
            notification: 0.5,  // 通知音效
            background: 0.3     // 背景音乐
        };
        this.init();
    }

    init() {
        this.loadVolumes();
        this.setupVolumeControls();
    }

    // 加载保存的音量设置
    loadVolumes() {
        const savedVolumes = localStorage.getItem('learning-app-volumes');
        if (savedVolumes) {
            try {
                const parsed = JSON.parse(savedVolumes);
                this.volumes = { ...this.volumes, ...parsed };
            } catch (e) {
                console.warn('加载音量设置失败，使用默认设置');
            }
        }
        this.applyAllVolumes();
    }

    // 保存音量设置
    saveVolumes() {
        localStorage.setItem('learning-app-volumes', JSON.stringify(this.volumes));
    }

    // 应用所有音量设置
    applyAllVolumes() {
        // 应用主音量到全局音频
        if (window.Tone && Tone.Master) {
            Tone.Master.volume.value = this.volumeToDecibels(this.volumes.master);
        }

        if (window.Howler) {
            Howler.volume(this.volumes.master);
        }

        this.updateVolumeDisplay();
    }

    // 播放特定音效（带音量控制）
    playSound(type, soundConfig) {
        const volume = this.volumes[type] * this.volumes.master;
        
        if (window.Tone && soundConfig.tone) {
            // 使用Tone.js播放音效
            const synth = new Tone.Synth().toDestination();
            synth.volume.value = this.volumeToDecibels(volume);
            if (soundConfig.note) {
                synth.triggerAttackRelease(soundConfig.note, soundConfig.duration || "8n");
            }
        } else if (window.Howler && soundConfig.howler) {
            // 使用Howler.js播放音效
            const sound = new Howl({
                src: [soundConfig.src],
                volume: volume,
                onend: soundConfig.onEnd
            });
            sound.play();
        }
    }

    // 播放做对题音效
    playCorrectSound() {
        this.playSound('correct', {
            tone: true,
            note: "C5",
            duration: "4n"
        });
    }

    // 播放做错题音效
    playWrongSound() {
        this.playSound('wrong', {
            tone: true,
            note: "C3",
            duration: "8n"
        });
    }

    // 播放加油音效
    playCheerSound() {
        this.playSound('cheer', {
            tone: true,
            note: "G4",
            duration: "2n"
        });
    }

    // 播放语音播报
    playSpeechSound(text) {
        // 这里可以集成语音合成API
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.volume = this.volumes.speech * this.volumes.master;
            speechSynthesis.speak(utterance);
        }
    }

    // 将0-1的音量值转换为分贝值
    volumeToDecibels(volume) {
        return Math.log10(Math.max(0.001, volume)) * 20;
    }

    // 设置音量控制界面
    setupVolumeControls() {
        this.createVolumePanel();
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('#volume-panel-btn')) {
                this.toggleVolumePanel();
            }
        });
    }

    // 创建详细的音量控制面板
    createVolumePanel() {
        const volumePanelHTML = `
            <div id="volume-panel" class="fixed inset-0 bg-black/80 flex items-center justify-center z-30 hidden">
                <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] flex flex-col border border-gray-100/50">
                    <div class="p-4 border-b border-gray-200 bg-gray-50/50">
                        <h3 class="text-sm font-semibold text-gray-800 flex items-center">
                            <i class="fas fa-sliders-h text-green-600 mr-2"></i>
                            音效控制
                        </h3>
                    </div>
                    <div class="flex-1 overflow-y-auto p-4">
                    
                    <!-- 主音量 -->
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-700 font-medium flex items-center">
                                <i class="fas fa-volume-up text-blue-500 mr-2"></i>
                                主音量
                            </span>
                            <span id="master-volume-value" class="text-xs font-mono text-blue-600">${Math.round(this.volumes.master * 100)}%</span>
                        </div>
                        <input type="range" id="master-volume-slider" min="0" max="1" step="0.01" value="${this.volumes.master}" 
                               class="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer">
                    </div>

                    <!-- 各种音效音量控制 -->
                    <div class="space-y-3">
                        ${this.createVolumeControl('correct', '做对题音效', 'check-circle', 'green')}
                        ${this.createVolumeControl('wrong', '做错题音效', 'times-circle', 'red')}
                        ${this.createVolumeControl('cheer', '加油音效', 'fire', 'orange')}
                        ${this.createVolumeControl('speech', '语音播报', 'microphone', 'purple')}
                        ${this.createVolumeControl('notification', '通知音效', 'bell', 'yellow')}
                        ${this.createVolumeControl('background', '背景音乐', 'music', 'indigo')}
                    </div>

                    <!-- 控制按钮 -->
                    <div class="flex space-x-2 mt-4 pt-3 border-t border-gray-200">
                        <button id="mute-all-btn" class="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-xs transition-colors">
                            <i class="fas fa-volume-mute mr-1"></i>全部静音
                        </button>
                        <button id="reset-all-btn" class="flex-1 py-2 bg-green-100 hover:bg-green-200 text-green-600 rounded text-xs transition-colors">
                            <i class="fas fa-undo mr-1"></i>重置全部
                        </button>
                        <button id="test-sound-btn" class="flex-1 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded text-xs transition-colors">
                            <i class="fas fa-play mr-1"></i>测试音效
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', volumePanelHTML);
        this.setupVolumeEvents();
    }

    // 创建单个音量控制项
    createVolumeControl(type, label, icon, color) {
        return `
            <div class="volume-control-item">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-600 flex items-center">
                        <i class="fas fa-${icon} text-${color}-500 mr-2"></i>
                        ${label}
                    </span>
                    <span id="${type}-volume-value" class="text-xs font-mono text-${color}-600">${Math.round(this.volumes[type] * 100)}%</span>
                </div>
                <input type="range" id="${type}-volume-slider" min="0" max="1" step="0.01" value="${this.volumes[type]}" 
                       class="w-full h-1.5 bg-${color}-100 rounded-lg appearance-none cursor-pointer">
            </div>
        `;
    }

    // 设置音量事件监听
    setupVolumeEvents() {
        const volumePanel = document.getElementById('volume-panel');

        // 主音量滑块
        const masterSlider = document.getElementById('master-volume-slider');
        masterSlider.addEventListener('input', (e) => {
            this.volumes.master = parseFloat(e.target.value);
            this.applyAllVolumes();
            this.saveVolumes();
            this.updateVolumeValue('master', this.volumes.master);
        });

        // 各种音效音量滑块
        const volumeTypes = ['correct', 'wrong', 'cheer', 'speech', 'notification', 'background'];
        volumeTypes.forEach(type => {
            const slider = document.getElementById(`${type}-volume-slider`);
            if (slider) {
                slider.addEventListener('input', (e) => {
                    this.volumes[type] = parseFloat(e.target.value);
                    this.saveVolumes();
                    this.updateVolumeValue(type, this.volumes[type]);
                });
            }
        });

        // 控制按钮
        document.getElementById('mute-all-btn').addEventListener('click', () => {
            Object.keys(this.volumes).forEach(key => {
                this.volumes[key] = 0;
                const slider = document.getElementById(`${key}-volume-slider`);
                if (slider) slider.value = 0;
                this.updateVolumeValue(key, 0);
            });
            this.applyAllVolumes();
            this.saveVolumes();
        });

        document.getElementById('reset-all-btn').addEventListener('click', () => {
            this.volumes = {
                master: 0.5,
                correct: 0.7,
                wrong: 0.6,
                cheer: 0.8,
                speech: 0.9,
                notification: 0.5,
                background: 0.3
            };
            this.applyAllVolumes();
            this.saveVolumes();
            this.updateAllVolumeDisplays();
        });

        document.getElementById('test-sound-btn').addEventListener('click', () => {
            this.playTestSequence();
        });

        // 点击页面其他地方关闭音量面板
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#volume-panel') && !e.target.closest('#volume-panel-btn')) {
                volumePanel.classList.add('hidden');
            }
        });

        // 点击面板背景关闭面板
        volumePanel.addEventListener('click', (e) => {
            if (e.target === volumePanel) {
                volumePanel.classList.add('hidden');
            }
        });
    }

    // 更新音量显示
    updateVolumeValue(type, value) {
        const valueEl = document.getElementById(`${type}-volume-value`);
        if (valueEl) {
            valueEl.textContent = `${Math.round(value * 100)}%`;
        }
    }

    // 更新所有音量显示
    updateAllVolumeDisplays() {
        Object.keys(this.volumes).forEach(type => {
            this.updateVolumeValue(type, this.volumes[type]);
            const slider = document.getElementById(`${type}-volume-slider`);
            if (slider) slider.value = this.volumes[type];
        });
    }

    // 更新音量显示
    updateVolumeDisplay() {
        this.updateVolumeValue('master', this.volumes.master);
    }

    // 切换音量面板显示
    toggleVolumePanel() {
        const volumePanel = document.getElementById('volume-panel');
        volumePanel.classList.toggle('hidden');
    }

    // 播放测试音效序列
    playTestSequence() {
        setTimeout(() => this.playCorrectSound(), 100);
        setTimeout(() => this.playWrongSound(), 600);
        setTimeout(() => this.playCheerSound(), 1100);
        setTimeout(() => this.playSpeechSound('测试语音'), 1600);
    }

    // 获取特定音效的音量
    getVolume(type) {
        return this.volumes[type] || 0;
    }

    // 设置特定音效的音量
    setVolume(type, value) {
        if (this.volumes[type] !== undefined) {
            this.volumes[type] = Math.max(0, Math.min(1, value));
            this.saveVolumes();
            this.updateVolumeValue(type, this.volumes[type]);
        }
    }
}

// 初始化音量控制系统
let volumeControl;
document.addEventListener('DOMContentLoaded', () => {
    volumeControl = new VolumeControl();
});

// 全局音效播放函数
window.playSoundEffect = (type) => {
    if (volumeControl) {
        switch (type) {
            case 'correct':
                volumeControl.playCorrectSound();
                break;
            case 'wrong':
                volumeControl.playWrongSound();
                break;
            case 'cheer':
                volumeControl.playCheerSound();
                break;
            default:
                volumeControl.playCorrectSound();
        }
    }
};