/* ============================================================
 * vpay-tier.js —— 用户等级（只按余额划分，无积分）
 *
 * 用法：拿到余额后调用  VpayTier.apply(余额)
 *       例如在 vpay.html 的 updateBalance() 里：
 *         balanceVal = r.balance || 0;
 *         VpayTier.apply(balanceVal);
 *
 * 想改等级：只动下面 TIERS 数组即可
 *   name  —— 侧边栏账号下方显示的等级名
 *   card  —— 资产卡底部那行 "FUNBUA ____" 的后半句
 *   min   —— 升到这个等级所需的最低余额（单位 ¥，与页面显示的余额一致）
 *   color —— 等级主色（侧边栏等级文字、资产卡账户名、卡片描边）
 *   grad  —— 头像背景渐变
 *   icon  —— FontAwesome 图标名
 * ============================================================ */
(function () {
  'use strict';

  var TIERS = [
    { name: '普通会员', card: '尊享数字账户', icon: 'fa-user',          min: 0,      color: '#9aa0b0', grad: 'linear-gradient(135deg,#8a8d9b,#b6bac7)' },
    { name: '白银会员', card: '白银数字账户', icon: 'fa-medal',         min: 100,    color: '#cbd5e6', grad: 'linear-gradient(135deg,#b8c2d1,#eef2f8)' },
    { name: '黄金会员', card: '黄金数字账户', icon: 'fa-crown',         min: 1000,   color: '#f1c40f', grad: 'linear-gradient(135deg,#f39c12,#f7dc6f)' },
    { name: '铂金会员', card: '铂金数字账户', icon: 'fa-gem',           min: 5000,   color: '#5eead4', grad: 'linear-gradient(135deg,#22d3ee,#a5f3fc)' },
    { name: '黑金会员', card: '黑金数字账户', icon: 'fa-shield-halved', min: 20000,  color: '#a29bfe', grad: 'linear-gradient(135deg,#6c5ce7,#c8b6ff)' },
    { name: '钻石会员', card: '钻石数字账户', icon: 'fa-star',          min: 100000, color: '#ffd166', grad: 'linear-gradient(135deg,#7ee8fa,#ffd166,#ff8fab)' }
  ];

  var current = -1;

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
      '/* 资产卡底部：FUNBUA 后面的账户名跟着等级变色 */',
      '#tierAccountLabel{color:var(--tier-color,inherit);font-weight:600;transition:color .3s ease}',
      '/* 资产卡描边也带一点等级色 */',
      '.crypto-card::after{content:"";position:absolute;inset:0;border-radius:20px;pointer-events:none;',
      '  border:1px solid var(--tier-color,#8a8d9b);opacity:.22;transition:border-color .3s ease}'
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
