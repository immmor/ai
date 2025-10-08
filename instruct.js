// 首次访问步骤指引功能
class StepByStepGuide {
    constructor() {
        this.steps = [
            {
                title: "欢迎使用学习系统",
                content: "这是一个交互式学习平台，通过答题来提升你的技能水平。",
                target: "#level-header",
                position: "bottom"
            },
            {
                title: "等级和经验值",
                content: "这里显示你的当前等级和经验值进度。每答对题目都会获得经验值，升级后可以解锁新功能。",
                target: "#level-header .flex.items-center.space-x-2:last-child .flex.items-center.space-x-2:first-child",
                position: "bottom"
            },
            {
                title: "勋章系统",
                content: "点击'勋'字可以查看你获得的勋章。连续答对题目、完成特定题库等都可以获得勋章。",
                target: "#badge-collapsed",
                position: "bottom"
            },
            {
                title: "选择题库",
                content: "点击'题库'按钮可以选择不同的学习主题，包括Go区块链、Python、React等。",
                target: "#question-bank-btn",
                position: "bottom"
            },
            {
                title: "题目区域",
                content: "这里显示当前题目。仔细阅读题目内容，理解问题要求。",
                target: "#question-container",
                position: "top"
            },
            {
                title: "答题区域",
                content: "根据题目要求在这里选择或填写答案。支持选择题、填空题等多种题型。",
                target: "#answer-container",
                position: "top"
            },
            {
                title: "提示功能",
                content: "遇到困难时可以点击'提示'按钮获得解题思路，但会减少获得的经验值。",
                target: "#hint-btn",
                position: "top"
            },
            {
                title: "查看答案",
                content: "实在无法解答时可以查看答案，但建议先尝试自己思考。",
                target: "#answer-btn",
                position: "top"
            },
            {
                title: "模式切换",
                content: "点击模式按钮可以切换不同的学习模式，包括正常模式、起飞模式和战斗模式，不同模式有不同的视觉特效和XP加成。",
                target: "#mode-btn",
                position: "top"
            },
            {
                title: "加油功能",
                content: "长按'加油'按钮可以获得鼓励和动力，帮助你保持学习热情！",
                target: "#cheer-btn",
                position: "top"
            },
            {
                title: "上一题按钮",
                content: "点击'上一题'按钮可以返回查看之前的题目，方便复习和检查。",
                target: "#prev-btn",
                position: "top"
            },
            {
                title: "下一题按钮",
                content: "点击'下一题'按钮可以继续学习新的题目，系统会自动记录你的学习进度。",
                target: "#next-btn",
                position: "top"
            }
        ];
        
        this.currentStep = 0;
        this.guideActive = false;
        this.guideOverlay = null;
        this.guideElement = null;
        this.hasSeenGuide = localStorage.getItem('hasSeenGuide');
        
        this.init();
    }
    
    init() {
        // 检查是否需要显示指引
        if (!this.hasSeenGuide) {
            setTimeout(() => {
                this.showGuide();
            }, 1000);
        }
    }
    
    showGuide() {
        if (this.guideActive) return;
        
        this.guideActive = true;
        this.createGuideOverlay();
        this.showCurrentStep();
    }
    
    createGuideOverlay() {
        // 创建遮罩层 - 使用透明背景，只在目标元素周围显示暗色区域
        this.guideOverlay = document.createElement('div');
        this.guideOverlay.className = 'fixed inset-0 z-40 pointer-events-none';
        
        // 创建指引弹窗
        this.guideElement = document.createElement('div');
        this.guideElement.className = 'fixed z-50 bg-white rounded-lg shadow-2xl';
        this.guideElement.style.maxWidth = '320px';
        this.guideElement.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(this.guideOverlay);
        document.body.appendChild(this.guideElement);
        
        // 点击指引弹窗外部关闭指引
        document.addEventListener('click', this.handleOutsideClick.bind(this));
    }
    
    showCurrentStep() {
        if (this.currentStep >= this.steps.length) {
            this.closeGuide();
            return;
        }
        
        const step = this.steps[this.currentStep];
        const targetElement = document.querySelector(step.target);
        
        if (!targetElement) {
            this.currentStep++;
            this.showCurrentStep();
            return;
        }
        
        // 计算目标元素的位置
        const rect = targetElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // 高亮目标元素
        this.highlightTarget(targetElement);
        
        // 更新指引内容
        this.updateGuideContent(step, rect, viewportWidth, viewportHeight);
    }
    
    highlightTarget(targetElement) {
        // 移除之前的高亮和遮罩
        const existingHighlights = document.querySelectorAll('.guide-highlight, .guide-mask');
        existingHighlights.forEach(el => el.remove());
        
        // 创建高亮效果 - 只在目标元素周围显示暗色区域
        const highlight = document.createElement('div');
        highlight.className = 'guide-highlight fixed z-45 border-2 border-blue-500 rounded-lg pointer-events-none bg-blue-100/30';
        
        const rect = targetElement.getBoundingClientRect();
        
        // 第一个指引步骤使用正常尺寸，其他步骤使用扩大尺寸
        const padding = this.currentStep === 0 ? 0 : 10;
        highlight.style.left = (rect.left - padding) + 'px';
        highlight.style.top = (rect.top - padding) + 'px';
        highlight.style.width = (rect.width + padding * 2) + 'px';
        highlight.style.height = (rect.height + padding * 2) + 'px';
        
        // 创建遮罩效果 - 在目标元素周围显示暗色区域，但目标元素本身保持明亮
        this.createMaskAroundTarget(targetElement, rect);
        
        document.body.appendChild(highlight);
    }
    
    createMaskAroundTarget(targetElement, targetRect) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // 创建四个遮罩区域：上、下、左、右
        const masks = [
            // 上方遮罩
            {
                left: 0,
                top: 0,
                width: viewportWidth,
                height: targetRect.top
            },
            // 下方遮罩
            {
                left: 0,
                top: targetRect.bottom,
                width: viewportWidth,
                height: viewportHeight - targetRect.bottom
            },
            // 左侧遮罩
            {
                left: 0,
                top: targetRect.top,
                width: targetRect.left,
                height: targetRect.height
            },
            // 右侧遮罩
            {
                left: targetRect.right,
                top: targetRect.top,
                width: viewportWidth - targetRect.right,
                height: targetRect.height
            }
        ];
        
        masks.forEach((mask, index) => {
            if (mask.width > 0 && mask.height > 0) {
                const maskElement = document.createElement('div');
                maskElement.className = 'guide-mask fixed z-40 bg-black/50 pointer-events-auto';
                maskElement.style.left = mask.left + 'px';
                maskElement.style.top = mask.top + 'px';
                maskElement.style.width = mask.width + 'px';
                maskElement.style.height = mask.height + 'px';
                
                // 点击遮罩区域关闭指引
                maskElement.addEventListener('click', () => {
                    this.closeGuide();
                });
                
                document.body.appendChild(maskElement);
            }
        });
    }
    
    updateGuideContent(step, targetRect, viewportWidth, viewportHeight) {
        const guideHTML = `
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-gray-800">${step.title}</h3>
                    <div class="text-sm text-gray-500">
                        ${this.currentStep + 1}/${this.steps.length}
                    </div>
                </div>
                <p class="text-gray-600 mb-6 text-sm leading-relaxed">${step.content}</p>
                <div class="flex justify-between items-center">
                    <button class="text-gray-500 hover:text-gray-700 text-sm" id="skip-guide">
                        跳过指引
                    </button>
                    <div class="flex space-x-2">
                        ${this.currentStep > 0 ? 
                            '<button class="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50" id="prev-step">上一步</button>' : 
                            '<button class="px-4 py-2 text-sm border border-gray-300 rounded opacity-50 cursor-not-allowed" disabled>上一步</button>'
                        }
                        <button class="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600" id="next-step">
                            ${this.currentStep === this.steps.length - 1 ? '完成' : '下一步'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.guideElement.innerHTML = guideHTML;
        
        // 定位指引弹窗
        this.positionGuide(step.position, targetRect, viewportWidth, viewportHeight);
        
        // 添加事件监听
        this.addEventListeners();
    }
    
    positionGuide(position, targetRect, viewportWidth, viewportHeight) {
        const guideWidth = 320;
        const margin = 20;
        
        // 在边界检查前重新获取指引框的实际高度，确保是最新的
        const guideHeight = this.guideElement.offsetHeight;
        
        let left, top;
        
        // 智能定位：根据目标元素位置和可用空间选择最佳显示位置
        const isTopElement = targetRect.top < viewportHeight / 3;
        const isBottomElement = targetRect.bottom > viewportHeight * 2 / 3;
        const isLeftElement = targetRect.left < viewportWidth / 3;
        const isRightElement = targetRect.right > viewportWidth * 2 / 3;
        
        // 获取当前步骤索引
        const currentStepIndex = this.currentStep;
        
        // 第一个指引框（欢迎使用学习系统）放在垂直偏上、水平中间
        if (currentStepIndex === 0) {
            // 使用实际尺寸计算中间位置
            const actualGuideWidth = this.guideElement.offsetWidth;
            const actualGuideHeight = this.guideElement.offsetHeight;
            left = (viewportWidth - actualGuideWidth) / 2; // 水平居中
            top = viewportHeight * 0.15; // 垂直偏上位置
        }
        // 第二个指引框（等级和经验值）放在偏上右边
        if (currentStepIndex === 1 || currentStepIndex === 2 || currentStepIndex === 3) {
            // 第二个指引框：放在偏上右边
            const spaceOnRight = viewportWidth - targetRect.right - margin;
            const spaceOnBottom = viewportHeight - targetRect.bottom - margin;
            
            if (spaceOnRight > guideWidth) {
                // 右侧有足够空间
                left = targetRect.right + margin;
                top = Math.max(margin, targetRect.top - 20); // 稍微偏上
            } else if (spaceOnBottom > guideHeight) {
                // 下方有足够空间
                left = Math.max(margin, targetRect.left - (guideWidth - targetRect.width) / 2);
                top = targetRect.bottom + margin;
            } else {
                // 默认显示在左侧
                left = Math.max(margin, targetRect.left - guideWidth - margin);
                top = targetRect.top + (targetRect.height - guideHeight) / 2;
            }
        }
        // 对于其他顶部元素
        else if (isTopElement) {
            // 顶部元素：优先下方显示
            const spaceOnBottom = viewportHeight - targetRect.bottom - margin;
            const spaceOnLeft = targetRect.left - margin;
            
            if (spaceOnBottom > guideHeight) {
                // 下方有足够空间
                left = Math.max(margin, targetRect.left - (guideWidth - targetRect.width) / 2);
                top = targetRect.bottom + margin;
            } else if (spaceOnLeft > guideWidth) {
                // 左侧有足够空间
                left = targetRect.left - guideWidth - margin;
                top = targetRect.top + (targetRect.height - guideHeight) / 2;
            } else {
                // 默认居中显示
                left = (viewportWidth - guideWidth) / 2;
                top = (viewportHeight - guideHeight) / 2;
            }
        } else {
            // 其他元素使用原有逻辑
            switch (position) {
                case 'top':
                    left = targetRect.left + (targetRect.width - guideWidth) / 2;
                    top = targetRect.top - guideHeight - margin;
                    
                    // 如果上方空间不足，改为下方显示
                    if (top < margin) {
                        top = targetRect.bottom + margin;
                    }
                    break;
                case 'bottom':
                    left = targetRect.left + (targetRect.width - guideWidth) / 2;
                    top = targetRect.bottom + margin;
                    
                    // 如果下方空间不足，改为上方显示
                    if (top + guideHeight > viewportHeight - margin) {
                        top = targetRect.top - guideHeight - margin;
                    }
                    break;
                case 'left':
                    left = targetRect.left - guideWidth - margin;
                    top = targetRect.top + (targetRect.height - guideHeight) / 2;
                    
                    // 如果左侧空间不足，改为右侧显示
                    if (left < margin) {
                        left = targetRect.right + margin;
                    }
                    break;
                case 'right':
                    left = targetRect.right + margin;
                    top = targetRect.top + (targetRect.height - guideHeight) / 2;
                    
                    // 如果右侧空间不足，改为左侧显示
                    if (left + guideWidth > viewportWidth - margin) {
                        left = targetRect.left - guideWidth - margin;
                    }
                    break;
                default:
                    left = (viewportWidth - guideWidth) / 2;
                    top = (viewportHeight - guideHeight) / 2;
            }
        }
        
        // 彻底修复边界检查 - 确保指引框绝对不会超出屏幕范围
        // 重新获取指引框的实际尺寸
        const actualGuideWidth = this.guideElement.offsetWidth;
        const actualGuideHeight = this.guideElement.offsetHeight;
        
        // 对于第一个指引框，完全移除边界检查的影响，确保水平居中
        if (currentStepIndex === 0) {
            // 直接设置居中位置，不进行边界检查
            left = (viewportWidth - actualGuideWidth) / 2;
            top = viewportHeight * 0.15; // 更往上的位置
        } else {
            // 其他指引框使用完整的边界检查
            left = Math.max(margin, Math.min(left, viewportWidth - actualGuideWidth - margin));
            top = Math.max(margin, Math.min(top, viewportHeight - actualGuideHeight - margin));
            
            // 最终强制边界约束
            left = Math.max(0, Math.min(left, viewportWidth - actualGuideWidth));
            top = Math.max(0, Math.min(top, viewportHeight - actualGuideHeight));
        }
        
        this.guideElement.style.left = left + 'px';
        this.guideElement.style.top = top + 'px';
    }
    
    addEventListeners() {
        const skipBtn = document.getElementById('skip-guide');
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');
        
        skipBtn?.addEventListener('click', () => {
            this.closeGuide();
        });
        
        prevBtn?.addEventListener('click', () => {
            if (this.currentStep > 0) {
                this.currentStep--;
                this.showCurrentStep();
            }
        });
        
        nextBtn?.addEventListener('click', () => {
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++;
                this.showCurrentStep();
            } else {
                this.closeGuide();
            }
        });
    }
    
    handleOutsideClick(event) {
        // 如果点击的是指引弹窗内部，不关闭
        if (this.guideElement && this.guideElement.contains(event.target)) {
            return;
        }
        
        // 如果点击的是高亮的目标元素，不关闭
        const highlight = document.querySelector('.guide-highlight');
        if (highlight && highlight.contains(event.target)) {
            return;
        }
        
        // 如果点击的是遮罩区域，关闭指引
        const isMaskClick = event.target.classList.contains('guide-mask');
        if (isMaskClick) {
            this.closeGuide();
        }
    }
    
    closeGuide() {
        // 标记为已查看指引
        localStorage.setItem('hasSeenGuide', 'true');
        this.hasSeenGuide = true;
        
        // 移除事件监听
        document.removeEventListener('click', this.handleOutsideClick.bind(this));
        
        // 移除所有指引元素
        if (this.guideOverlay) {
            this.guideOverlay.remove();
        }
        if (this.guideElement) {
            this.guideElement.remove();
        }
        
        // 移除高亮效果和遮罩
        const guideElements = document.querySelectorAll('.guide-highlight, .guide-mask');
        guideElements.forEach(el => el.remove());
        
        this.guideActive = false;
        
        // 显示完成提示
        this.showCompletionMessage();
    }
    
    showCompletionMessage() {
        const completionMsg = document.createElement('div');
        completionMsg.className = 'fixed top-16 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        completionMsg.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fa fa-check-circle"></i>
                <span>指引完成！开始你的学习之旅吧！</span>
            </div>
        `;
        
        document.body.appendChild(completionMsg);
        
        // 3秒后自动消失
        setTimeout(() => {
            completionMsg.remove();
        }, 3000);
    }
    
    // 重新显示指引的方法（可用于帮助页面）
    showGuideAgain() {
        this.currentStep = 0;
        this.hasSeenGuide = false;
        localStorage.removeItem('hasSeenGuide');
        this.showGuide();
    }
}

// 初始化步骤指引
let stepGuide = null;

document.addEventListener('DOMContentLoaded', function() {
    stepGuide = new StepByStepGuide();
    
    // 添加重新显示指引的全局方法
    window.showStepGuide = function() {
        if (stepGuide) {
            stepGuide.showGuideAgain();
        }
    };
});

// 添加指引相关的CSS样式
const guideStyles = `
    .guide-highlight {
        animation: guidePulse 2s infinite;
        z-index: 45 !important;
    }
    
    @keyframes guidePulse {
        0% { 
            border-color: rgba(255, 193, 7, 0.8);
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(255, 193, 7, 0.6);
        }
        50% { 
            border-color: rgba(255, 193, 7, 1);
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.3), 0 0 0 10px rgba(255, 193, 7, 0.3);
        }
        100% { 
            border-color: rgba(255, 193, 7, 0.8);
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(255, 193, 7, 0.6);
        }
    }
    
    #guide-element {
        z-index: 50 !important;
    }
    
    #guide-overlay {
        z-index: 40 !important;
    }
`;

// 将样式添加到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = guideStyles;
document.head.appendChild(styleSheet);