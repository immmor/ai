/**
 * 波特兰枫树绘制和生长逻辑
 * 根据用户等级和经验值动态调整树的大小、形状和复杂度
 */

class PortlandMapleTree {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.level = 1;
        this.currentXP = 0;
        this.maxXP = 100;
        this.isGrowing = false;
        
        // 设置Canvas大小
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // 初始化树的状态
        this.treeState = this.getInitialTreeState();
        
        // 开始绘制
        this.draw();
    }
    
    // 调整Canvas大小以适应屏幕
    resizeCanvas() {
        // 设置Canvas大小为视口宽度的80%，高度为视口高度的30%
        const width = Math.min(window.innerWidth * 0.8, 500);
        const height = window.innerHeight * 0.3;
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        // 重新绘制树
        this.draw();
    }
    
    // 获取树的初始状态
    getInitialTreeState() {
        return {
            trunkHeight: 50,
            trunkWidth: 8,
            branchCount: 3,
            leafDensity: 0.3,
            leafColor: '#FF6B35', // 波特兰枫叶秋季颜色
            hasFlowers: false,
            detailLevel: 0.5
        };
    }
    
    // 更新等级和经验值
    updateStats(level, currentXP, maxXP) {
        this.level = level;
        this.currentXP = currentXP;
        this.maxXP = maxXP;
        
        // 根据新的等级和经验值更新树的状态
        this.updateTreeState();
        
        // 触发生长动画
        if (!this.isGrowing) {
            this.grow();
        }
    }
    
    // 根据等级和经验值更新树的状态
    updateTreeState() {
        // 计算总体经验比例（考虑当前等级和经验值）
        const totalXPFactor = (this.level - 1) + (this.currentXP / this.maxXP);
        
        // 更新树干高度（随等级线性增长，最高到300px）
        this.treeState.trunkHeight = Math.min(50 + totalXPFactor * 25, 300);
        
        // 更新树干宽度（随等级增长，最高到30px）
        this.treeState.trunkWidth = Math.min(8 + totalXPFactor * 2, 30);
        
        // 更新树枝数量（随等级增长，最高到12个主枝）
        this.treeState.branchCount = Math.min(3 + Math.floor(totalXPFactor * 1.5), 12);
        
        // 更新叶子密度（随等级增长，最高到0.9）
        this.treeState.leafDensity = Math.min(0.3 + totalXPFactor * 0.1, 0.9);
        
        // 更新细节级别（随等级增长，最高到1.0）
        this.treeState.detailLevel = Math.min(0.5 + totalXPFactor * 0.1, 1.0);
        
        // 随着等级提升，可能会开花（较高等级有概率开花）
        this.treeState.hasFlowers = this.level > 8 && Math.random() > 0.7;
        
        // 根据季节变化叶子颜色（这里简化处理，主要展示秋季色彩）
        const seasonFactor = (new Date().getMonth() + 1) / 12;
        if (seasonFactor > 0.7 || seasonFactor < 0.1) { // 秋末冬初
            this.treeState.leafColor = `hsl(${Math.floor(10 + Math.random() * 20)}, 100%, ${Math.floor(50 + Math.random() * 10)}%)`;
        } else if (seasonFactor > 0.4 && seasonFactor < 0.7) { // 夏季
            this.treeState.leafColor = `hsl(${Math.floor(100 + Math.random() * 30)}, 70%, ${Math.floor(30 + Math.random() * 10)}%)`;
        } else { // 春季
            this.treeState.leafColor = `hsl(${Math.floor(80 + Math.random() * 20)}, 80%, ${Math.floor(40 + Math.random() * 10)}%)`;
        }
    }
    
    // 生长动画
    grow() {
        this.isGrowing = true;
        const duration = 2000; // 生长动画持续2秒
        const startTime = Date.now();
        const startState = { ...this.treeState };
        const targetState = this.calculateTargetState();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = this.easeOutQuad(progress);
            
            // 插值计算当前状态
            this.treeState.trunkHeight = startState.trunkHeight + (targetState.trunkHeight - startState.trunkHeight) * easeProgress;
            this.treeState.trunkWidth = startState.trunkWidth + (targetState.trunkWidth - startState.trunkWidth) * easeProgress;
            this.treeState.branchCount = Math.floor(startState.branchCount + (targetState.branchCount - startState.branchCount) * easeProgress);
            this.treeState.leafDensity = startState.leafDensity + (targetState.leafDensity - startState.leafDensity) * easeProgress;
            this.treeState.detailLevel = startState.detailLevel + (targetState.detailLevel - startState.detailLevel) * easeProgress;
            
            // 绘制当前状态
            this.draw();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isGrowing = false;
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // 计算目标状态（稍微超出实际计算值，使生长动画更明显）
    calculateTargetState() {
        const totalXPFactor = (this.level - 1) + (this.currentXP / this.maxXP);
        return {
            trunkHeight: Math.min(50 + totalXPFactor * 25 * 1.1, 320),
            trunkWidth: Math.min(8 + totalXPFactor * 2 * 1.1, 32),
            branchCount: Math.min(3 + Math.floor(totalXPFactor * 1.5 * 1.1), 14),
            leafDensity: Math.min(0.3 + totalXPFactor * 0.1 * 1.1, 0.95),
            detailLevel: Math.min(0.5 + totalXPFactor * 0.1 * 1.1, 1.05)
        };
    }
    
    // 缓动函数
    easeOutQuad(t) {
        return t * (2 - t);
    }
    
    // 主绘制函数
    draw() {
        const { width, height } = this.canvas;
        const ctx = this.ctx;
        
        // 清空画布
        ctx.clearRect(0, 0, width, height);
        
        // 保存上下文状态
        ctx.save();
        
        // 将原点移动到画布底部中心
        ctx.translate(width / 2, height);
        
        // 绘制背景（可选）
        this.drawBackground();
        
        // 绘制树干
        this.drawTrunk();
        
        // 绘制树枝
        this.drawBranches(0, -this.treeState.trunkHeight, 0, this.treeState.trunkWidth * 0.7);
        
        // 绘制叶子
        this.drawLeaves();
        
        // 如果有花，绘制花朵
        if (this.treeState.hasFlowers) {
            this.drawFlowers();
        }
        
        // 恢复上下文状态
        ctx.restore();
    }
    
    // 绘制背景
    drawBackground() {
        const { width, height } = this.canvas;
        const ctx = this.ctx;
        
        // 保存当前状态
        ctx.save();
        
        // 重置变换以绘制背景
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        // 渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#f0f9ff'); // 浅蓝色天空
        gradient.addColorStop(1, '#e0f2fe');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // 恢复状态
        ctx.restore();
    }
    
    // 绘制树干
    drawTrunk() {
        const ctx = this.ctx;
        
        // 确保treeState已定义，如果未定义则使用默认值
        const { trunkHeight = 50, trunkWidth = 8 } = this.treeState || {};
        
        // 树干颜色（灰褐色）
        ctx.fillStyle = '#8B4513';
        
        // 绘制树干
        ctx.beginPath();
        ctx.moveTo(-trunkWidth / 2, 0);
        ctx.bezierCurveTo(
            -trunkWidth / 3, -trunkHeight * 0.3,
            trunkWidth / 3, -trunkHeight * 0.7,
            -trunkWidth / 4, -trunkHeight
        );
        ctx.bezierCurveTo(
            -trunkWidth / 2, -trunkHeight * 0.7,
            -trunkWidth * 0.8, -trunkHeight * 0.3,
            -trunkWidth / 2, 0
        );
        ctx.fill();
        
        // 添加树皮纹理
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 10; i++) {
            const y = -trunkHeight * (i / 10);
            const w1 = trunkWidth * (0.4 + Math.random() * 0.2);
            const w2 = trunkWidth * (0.4 + Math.random() * 0.2);
            
            ctx.beginPath();
            ctx.moveTo(-w1 / 2, y);
            ctx.lineTo(w2 / 2, y - trunkHeight * 0.03);
            ctx.stroke();
        }
    }
    
    // 递归绘制树枝
    drawBranches(x, y, angle, thickness) {
        const ctx = this.ctx;
        
        // 确保treeState已定义，如果未定义则使用默认值
        const { branchCount = 3, detailLevel = 0.5 } = this.treeState || {};
        
        // 树枝长度（基于当前位置）
        const branchLength = thickness * 4 * detailLevel;
        
        // 到达末端时停止递归
        if (branchLength < 2 || thickness < 0.5) {
            return;
        }
        
        // 保存当前状态
        ctx.save();
        
        // 移动到起始点
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        // 绘制当前树枝
        ctx.strokeStyle = '#A0522D'; // 树枝颜色
        ctx.lineWidth = thickness;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        // 略微弯曲的树枝
        const curveX = branchLength * 0.3 * (Math.random() - 0.5);
        const curveY = -branchLength * 0.7;
        
        ctx.quadraticCurveTo(curveX, curveY, 0, -branchLength);
        ctx.stroke();
        
        // 生成子树枝
        const childBranchCount = Math.max(2, Math.floor(branchCount * 0.3 * detailLevel));
        
        for (let i = 0; i < childBranchCount; i++) {
            const childAngle = (Math.random() - 0.5) * Math.PI * 0.8; // -72度到72度之间
            const childThickness = thickness * (0.6 + Math.random() * 0.2);
            const childX = Math.sin(angle) * (branchLength * (0.3 + i * 0.2));
            const childY = -branchLength * (0.3 + i * 0.2);
            
            this.drawBranches(childX, childY, childAngle, childThickness);
        }
        
        // 恢复状态
        ctx.restore();
    }
    
    // 绘制叶子
    drawLeaves() {
        const ctx = this.ctx;
        
        // 确保treeState已定义，如果未定义则使用默认值
        const { leafDensity = 0.3, leafColor = '#FF6B35', trunkHeight = 50 } = this.treeState || {};
        const { width, height } = this.canvas;
        
        // 计算叶子数量
        const leafCount = Math.floor(width * height * leafDensity * 0.0005);
        
        for (let i = 0; i < leafCount; i++) {
            // 随机生成叶子位置（集中在树冠区域）
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * trunkHeight * 0.7;
            const x = Math.cos(angle) * radius;
            const y = -trunkHeight * 0.3 - Math.sin(angle) * radius * 0.8;
            
            // 确保叶子在画布范围内
            if (Math.abs(x) > width / 2 - 20 || Math.abs(y) > height - 20) {
                continue;
            }
            
            // 保存当前状态
            ctx.save();
            
            // 移动到叶子位置
            ctx.translate(x, y);
            ctx.rotate(Math.random() * Math.PI * 2); // 随机旋转
            
            // 叶子大小（随机）
            const leafSize = 5 + Math.random() * 10;
            
            // 绘制掌状枫叶（5个裂片）
            ctx.fillStyle = leafColor;
            ctx.strokeStyle = leafColor;
            ctx.lineWidth = 1;
            
            ctx.beginPath();
            
            // 绘制枫叶的5个裂片
            for (let j = 0; j < 5; j++) {
                const petalAngle = (j / 5) * Math.PI * 2;
                const x1 = Math.cos(petalAngle) * leafSize;
                const y1 = Math.sin(petalAngle) * leafSize * 0.5;
                
                const ctrlX = Math.cos(petalAngle + Math.PI / 5) * leafSize * 1.5;
                const ctrlY = Math.sin(petalAngle + Math.PI / 5) * leafSize;
                
                if (j === 0) {
                    ctx.moveTo(x1, y1);
                } else {
                    ctx.quadraticCurveTo(ctrlX, ctrlY, x1, y1);
                }
            }
            
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            // 恢复状态
            ctx.restore();
        }
    }
    
    // 绘制花朵（等级高时可能出现）
    drawFlowers() {
        const ctx = this.ctx;
        
        // 确保treeState已定义，如果未定义则使用默认值
        const { leafDensity = 0.3, trunkHeight = 50, hasFlowers = false } = this.treeState || {};
        
        // 如果没有花朵或叶子密度太低，则不绘制花朵
        if (!hasFlowers || leafDensity < 0.5) return;
        
        const flowerCount = Math.floor(leafDensity * 20);
        
        for (let i = 0; i < flowerCount; i++) {
            // 随机生成花朵位置（集中在树冠边缘）
            const angle = Math.random() * Math.PI * 2;
            const radius = trunkHeight * 0.7 * (0.8 + Math.random() * 0.2);
            const x = Math.cos(angle) * radius;
            const y = -trunkHeight * 0.3 - Math.sin(angle) * radius * 0.8;
            
            // 保存当前状态
            ctx.save();
            
            // 移动到花朵位置
            ctx.translate(x, y);
            
            // 花朵大小
            const size = 3 + Math.random() * 4;
            
            // 绘制花瓣（5-6片）
            const petalCount = 5 + Math.floor(Math.random() * 2);
            const petalColor = `hsl(${Math.random() * 30}, 100%, ${90 + Math.random() * 5}%)`; // 粉色到白色
            
            ctx.fillStyle = petalColor;
            
            for (let j = 0; j < petalCount; j++) {
                const petalAngle = (j / petalCount) * Math.PI * 2;
                
                ctx.save();
                ctx.rotate(petalAngle);
                
                // 绘制单个花瓣
                ctx.beginPath();
                ctx.ellipse(0, -size * 0.5, size * 0.5, size, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
            
            // 绘制花蕊
            ctx.fillStyle = '#FFD700'; // 金黄色
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            // 恢复状态
            ctx.restore();
        }
    }
}

// 初始化枫树
let mapleTree;

function initMapleTree() {
    if (!document.getElementById('maple-tree-canvas')) {
        console.error('Maple tree canvas not found');
        return;
    }
    
    mapleTree = new PortlandMapleTree('maple-tree-canvas');
    
    // 监听等级和经验值变化
    updateMapleTreeStats();
    
    // 定期检查更新（每3秒）
    setInterval(updateMapleTreeStats, 3000);
}

// 更新枫树状态
function updateMapleTreeStats() {
    if (!mapleTree) return;
    
    // 从页面获取等级和经验值
    const levelElement = document.getElementById('level');
    const xpBarElement = document.getElementById('xp-bar');
    
    if (levelElement && xpBarElement) {
        // 提取等级数字
        const levelText = levelElement.textContent;
        const level = parseInt(levelText.match(/\d+/)[0]) || 1;
        
        // 从进度条获取当前经验比例
        const xpBarWidth = parseFloat(xpBarElement.style.width) || 0;
        const currentXP = Math.floor(xpBarWidth * 100 / 100); // 假设进度条宽度是百分比
        const maxXP = 100;
        
        // 更新树的状态
        mapleTree.updateStats(level, currentXP, maxXP);
    }
}

// 当DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMapleTree);
} else {
    initMapleTree();
}