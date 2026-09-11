/* ============================================================
 * vpay-tier.js —— 用户等级（只按余额划分，无积分）
 *
 * 用法：拿到余额后调用  VpayTier.apply(余额)
 *       例如在 vpay.html 的 updateBalance() 里：
 *         balanceVal = r.balance || 0;
 *         VpayTier.apply(balanceVal);
 *
 * 想改等级：只动下面 TIERS 数组即可
 *   name         —— 侧边栏账号下方显示的等级名
 *   card         —— 资产卡底部那行 "FUNBUA ____" 的后半句
 *   min          —— 升到这个等级所需的最低余额（单位 ¥，与页面显示的余额一致）
 *   color        —— 等级主色（等级文字 / 品牌图标与文字 / 卡号 / 卡图标 / 描边 / 光圈）
 *   grad         —— 头像背景渐变
 *   cardBg       —— 资产卡（玻璃卡）底色渐变，带透明度
 *   cardBgSolid  —— 弹窗里那张信用卡的底色渐变，不透明
 *   icon         —— FontAwesome 图标名
 *
 * 输出的 CSS 变量（挂在 :root 上）：
 *   --tier-color       主色
 *   --tier-grad        头像渐变
 *   --tier-glow        主色光晕（35%）
 *   --tier-glow-soft   柔和光晕（18%）
 *   --tier-glow-strong 强光晕（60%）
 *   --tier-card-bg     资产卡底色
 *   --tier-card-bg-solid 信用卡弹窗底色
 * ============================================================ */
(function () {
  'use strict';

  var TIERS = [
    { name: '普通会员', card: '尊享数字账户', icon: 'fa-user', min: 0,
      color: '#9aa0b0',
      grad: 'linear-gradient(135deg,#8a8d9b,#b6bac7)',
      cardBg: 'linear-gradient(135deg,rgba(255,255,255,0.15) 0%,rgba(255,255,255,0.02) 100%)',
      cardBgSolid: 'linear-gradient(135deg,#1b1e29 0%,#2a2f3d 50%,#161922 100%)' },

    { name: '白银会员', card: '白银数字账户', icon: 'fa-medal', min: 100,
      color: '#cbd5e6',
      grad: 'linear-gradient(135deg,#b8c2d1,#eef2f8)',
      cardBg: 'linear-gradient(135deg,rgba(203,213,230,0.22) 0%,rgba(203,213,230,0.03) 100%)',
      cardBgSolid: 'linear-gradient(135deg,#242b38 0%,#4e5a70 50%,#1e2430 100%)' },

    { name: '黄金会员', card: '黄金数字账户', icon: 'fa-crown', min: 1000,
      color: '#f1c40f',
      grad: 'linear-gradient(135deg,#f39c12,#f7dc6f)',
      cardBg: 'linear-gradient(135deg,rgba(241,196,15,0.22) 0%,rgba(241,196,15,0.03) 100%)',
      cardBgSolid: 'linear-gradient(135deg,#2c2412 0%,#6e5919 50%,#22190c 100%)' },

    { name: '铂金会员', card: '铂金数字账户', icon: 'fa-gem', min: 5000,
      color: '#a9d6f5',
      grad: 'linear-gradient(135deg,#8fb8e0,#d9edff)',
      cardBg: 'linear-gradient(135deg,rgba(169,214,245,0.22) 0%,rgba(169,214,245,0.03) 100%)',
      cardBgSolid: 'linear-gradient(135deg,#1a2733 0%,#3f5f7d 50%,#151f28 100%)' },

    // 黑金：黑底 + 金，主色用古金 #d4af37，底色是近黑里透金
    { name: '黑金会员', card: '黑金数字账户', icon: 'fa-shield-halved', min: 20000,
      color: '#d4af37',
      grad: 'linear-gradient(135deg,#17171c,#d4af37)',
      cardBg: 'linear-gradient(135deg,rgba(212,175,55,0.24) 0%,rgba(12,12,14,0.55) 100%)',
      cardBgSolid: 'linear-gradient(135deg,#0b0b0d 0%,#3a2f16 45%,#0b0b0d 100%)' },

    { name: '钻石会员', card: '钻石数字账户', icon: 'fa-star', min: 100000,
      color: '#b9f2ff',
      grad: 'linear-gradient(135deg,#7ee8fa,#ffd166,#ff8fab)',
      cardBg: 'linear-gradient(135deg,rgba(185,242,255,0.24) 0%,rgba(255,209,102,0.06) 50%,rgba(255,143,171,0.10) 100%)',
      cardBgSolid: 'linear-gradient(135deg,#152437 0%,#2f4d73 45%,#3b2444 100%)' }
  ];

  var current = -1;

  // #rrggbb -> rgba(...)，用来给主色加不同透明度做光晕
  function rgba(hex, alpha) {
    var h = String(hex).replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16) || 0;
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')';
  }

  // 等级相关样式，随脚本注入一次
  function injectStyle() {
    if (document.getElementById('vpay-tier-style')) return;
    var s = document.createElement('style');
    s.id = 'vpay-tier-style';
    s.textContent = [
      '/* 侧边栏：账号下面的等级文字 */',
      '#userStatus{display:flex;align-items:center;gap:5px;color:var(--tier-color,#8a8d9b);font-weight:600;transition:color .3s ease}',
      '#userStatus i{font-size:11px}',
      '/* 头像底色随等级走 */',
      '.avatar{background:var(--tier-grad,var(--primary-purple));transition:background .3s ease}',
      '/* 侧边栏顶部品牌：图标与文字也跟等级色走（登录页没设变量时回退原色） */',
      '.brand{background-image:linear-gradient(45deg,#fff,var(--tier-color,#8a8d9b))}',
      '.brand i{color:var(--tier-color,#f1c40f)}',
      '/* 资产卡：整卡底色跟等级走（黑金档为黑底带金） */',
      '.crypto-card{background-image:var(--tier-card-bg,linear-gradient(135deg,rgba(255,255,255,0.15) 0%,rgba(255,255,255,0.02) 100%))}',
      '/* 资产卡右上角光晕：换成等级色（原为固定紫） */',
      '.crypto-card::before{background-image:radial-gradient(circle,var(--tier-color,#6c5ce7) 0%,transparent 70%);opacity:.28}',
      '/* 资产卡上的信用卡图标 */',
      '.crypto-card .card-top > i{color:var(--tier-color,rgba(255,255,255,0.85));transition:color .3s ease}',
      '/* 资产卡底部：FUNBUA 后面的账户名跟着等级变色 */',
      '#tierAccountLabel{color:var(--tier-color,inherit);font-weight:600;transition:color .3s ease}',
      '/* 资产卡描边也带一点等级色 */',
      '.crypto-card::after{content:"";position:absolute;inset:0;border-radius:20px;pointer-events:none;',
      '  border:1px solid var(--tier-color,#8a8d9b);opacity:.3}'
    ].join('\n');
    document.head.appendChild(s);
  }

  // 按余额算等级下标（余额不够则停在能到的最高档）
  function tierOf(balance) {
    var b = Number(balance) || 0;
    var idx = 0;
    for (var i = 0; i < TIERS.length; i++) {
      if (b >= TIERS[i].min) idx = i;
    }
    return idx;
  }

  function apply(balance) {
    injectStyle();
    var idx = tierOf(balance);
    var t = TIERS[idx];
    var root = document.documentElement;

    root.style.setProperty('--tier-color', t.color);
    root.style.setProperty('--tier-grad', t.grad);
    root.style.setProperty('--tier-glow', rgba(t.color, 0.35));
    root.style.setProperty('--tier-glow-soft', rgba(t.color, 0.18));
    root.style.setProperty('--tier-glow-strong', rgba(t.color, 0.6));
    if (t.cardBg) root.style.setProperty('--tier-card-bg', t.cardBg);
    if (t.cardBgSolid) root.style.setProperty('--tier-card-bg-solid', t.cardBgSolid);
    root.setAttribute('data-tier', String(idx + 1));

    // 等级没变就不用重写文字，避免无意义的重排
    if (idx === current) return;
    current = idx;

    // 侧边栏：账号下面的等级文字
    var st = document.getElementById('userStatus');
    if (st) st.innerHTML = '<i class="fa-solid ' + t.icon + '"></i>' + t.name;

    // 资产卡底部：FUNBUA ＋ 等级账户名
    var acc = document.getElementById('tierAccountLabel');
    if (acc) acc.textContent = t.card;
  }

  window.VpayTier = { apply: apply, tierOf: tierOf, tiers: TIERS };
})();
