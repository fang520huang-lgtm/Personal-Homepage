'use strict';

/* =========================================================
 * Fang OS — core application logic
 * Boot, lock screen, desktop, windows, taskbar, and Start menu
 *
 * Edit the USER object below to customize personal content.
 * ========================================================= */

const USER = {
  name: '方志恒',
  nameEn: 'Zhiheng Fang',
  title: '同济大学博士研究生 · 编程爱好者',
  titleEn: 'PhD Candidate at Tongji University · Programming Enthusiast',
  location: '中国',
  locationEn: 'China',
  email: '1781201525@qq.com',
  wechat: 'handicraft_producer',
  github: 'https://github.com/fang520huang-lgtm',
  bio: 'hi，我是方志恒，同济大学博士研究生，也是一名编程爱好者。',
  bioEn: "Hi, I'm Zhiheng Fang, a PhD candidate at Tongji University and a programming enthusiast.",
  tags: ['Python', 'C++', 'Web 自动化', '微信小程序', 'AI Agent', '爬虫', '数据处理', '自动化脚本'],
  tagsEn: ['Python', 'C++', 'Web Automation', 'WeChat Mini Programs', 'AI Agents', 'Web Scraping', 'Data Processing', 'Automation Scripts'],
  capabilities: [
    '熟悉 Python/C++，能够结合 AI 编程工具完成数据处理、自动化脚本、文件格式转换、爬虫及工具开发',
    '具备 Web 自动化、微信小程序及轻量级软件开发经验',
    '擅长借助 AI Agent、技术文档与调试工具快速完成需求分析、方案设计、代码实现与问题排查',
    '能够针对实际业务或生活场景快速搭建技术解决方案，并对生成代码进行测试、修改、集成与验证',
    '具备较强的快速学习能力，可根据需求快速接入新的语言、框架、API 和开发工具'
  ],
  capabilitiesEn: [
    'Proficient in Python and C++, with experience using AI coding tools for data processing, automation, file conversion, web scraping, and utility development',
    'Experienced in web automation, WeChat Mini Programs, and lightweight software development',
    'Skilled at using AI agents, technical documentation, and debugging tools to move quickly from requirements to tested implementations',
    'Able to build practical technical solutions and test, refine, integrate, and validate generated code',
    'A fast learner who can quickly adopt new languages, frameworks, APIs, and development tools'
  ],
  projects: [
    { name: 'Fang OS', desc: '当前正在浏览的网页就是本项目：一个拥有开机动画、锁屏、桌面窗口和自研终端的 Windows 风格个人主页。', descEn: 'This website is the project itself: a Windows-inspired personal homepage with a boot sequence, lock screen, desktop windows, and a custom terminal.', tech: 'HTML / CSS / JavaScript', link: 'https://github.com/fang520huang-lgtm/Personal-Homepage', linkLabel: '查看 GitHub 仓库 →', linkLabelEn: 'View GitHub repository →' },
    { name: 'Fadeworn UI', desc: '一个会随点击、拖拽、输入和滚动留下磨损痕迹的复古 UI 组件展示项目，让界面呈现可见的使用历史。', descEn: 'A vintage UI component showcase where clicks, drags, typing, and scrolling leave visible material wear over time.', tech: 'Next.js / React / TypeScript / Tailwind CSS / Radix UI', link: 'https://fang520huang-lgtm.github.io/Fadeworn-UI/' }
  ]
};

/* ---------- Shared helpers ---------- */
const $ = (sel) => document.querySelector(sel);

const I18N = {
  zh: {
    pageTitle: '方志恒 · Fang OS',
    pageDescription: '方志恒的个人主页：一个 Windows 风格的开机动画、锁屏、桌面与终端。',
    bootText: '正在启动 <b>Fang OS</b>',
    lockHint: '点击任意位置继续',
    startTitle: '开始',
    imeTitle: '中文（简体，中国）',
    imeSwitch: '切换到英语',
    network: '网络',
    volume: '音量',
    battery: '电量',
    shutdownText: '系统已关机',
    shutdownHint: '如果页面没有自动关闭，请手动关闭标签页 · 点击任意位置重新开机',
    bsodTitle: '你的电脑遇到问题，需要重新启动。<br>我们只收集某些错误信息，然后为你重新启动。',
    bsodDetail: '如果你需要了解详细信息，可以稍后搜索此停止代码：CRITICAL_PROCESS_DIED',
    bsodProgress: '正在收集错误信息：',
    bsodHint: '点击任意位置重新启动',
    matrixTip: '正在进入矩阵世界 · 按 ESC 退出',
    terminal: '终端',
    profile: '个人简历',
    projects: '项目',
    skills: '技能',
    contact: '联系方式',
    minimize: '最小化',
    maximize: '最大化',
    restore: '还原',
    close: '关闭',
    searchPlaceholder: '搜索应用，回车打开第一个结果',
    power: '电源',
    shutdown: '关机',
    sleep: '待机',
    restart: '重启',
    cancel: '取消',
    openTerminal: '打开终端',
    changeWallpaper: '更换壁纸',
    refresh: '刷新',
    aboutSystem: '关于此系统',
    iconActions: '图标操作',
    open: '打开',
    rename: '重命名',
    wallpaperChanged: '壁纸已更换',
    desktopRefreshed: '桌面已刷新 ✨',
    aboutToast: 'Fang OS 版本 1.0 · Windows 风格演示',
    desktopIcon: '桌面图标',
    doubleClick: '双击打开',
    unnamed: '未命名',
    avatarAlt: '头像',
    aboutHeading: '个人简介',
    skillsHeading: '技术能力',
    projectsHeading: '精选项目',
    projectsUpdating: '持续更新中…',
    viewDemo: '查看在线展示 →',
    linkPending: 'GitHub 仓库链接待添加',
    contactHeading: '联系方式',
    email: '邮箱',
    wechat: '微信'
  },
  en: {
    pageTitle: 'Zhiheng Fang · Fang OS',
    pageDescription: "Zhiheng Fang's Windows-inspired personal homepage with a boot sequence, lock screen, desktop, and terminal.",
    bootText: 'Starting <b>Fang OS</b>',
    lockHint: 'Click anywhere to continue',
    startTitle: 'Start',
    imeTitle: 'ENG English (United States)',
    imeSwitch: 'Switch to Chinese',
    network: 'Network',
    volume: 'Volume',
    battery: 'Battery',
    shutdownText: 'Your PC is turned off',
    shutdownHint: 'If this tab does not close automatically, close it manually · Click anywhere to start again',
    bsodTitle: "Your device ran into a problem and needs to restart.<br>We're just collecting some error info, and then we'll restart for you.",
    bsodDetail: 'For more information about this issue, search online for this stop code: CRITICAL_PROCESS_DIED',
    bsodProgress: 'Collecting error info:',
    bsodHint: 'Click anywhere to restart',
    matrixTip: 'Entering the Matrix · Press ESC to exit',
    terminal: 'Terminal',
    profile: 'Profile',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
    minimize: 'Minimize',
    maximize: 'Maximize',
    restore: 'Restore',
    close: 'Close',
    searchPlaceholder: 'Search apps, then press Enter to open the first result',
    power: 'Power',
    shutdown: 'Shut down',
    sleep: 'Sleep',
    restart: 'Restart',
    cancel: 'Cancel',
    openTerminal: 'Open Terminal',
    changeWallpaper: 'Change wallpaper',
    refresh: 'Refresh',
    aboutSystem: 'About this system',
    iconActions: 'Icon actions',
    open: 'Open',
    rename: 'Rename',
    wallpaperChanged: 'Wallpaper changed',
    desktopRefreshed: 'Desktop refreshed ✨',
    aboutToast: 'Fang OS version 1.0 · Windows-inspired showcase',
    desktopIcon: 'Desktop icon',
    doubleClick: 'Double-click to open',
    unnamed: 'Unnamed',
    avatarAlt: 'Profile photo',
    aboutHeading: 'About Me',
    skillsHeading: 'Technical Skills',
    projectsHeading: 'Featured Projects',
    projectsUpdating: 'More updates coming soon.',
    viewDemo: 'View live demo →',
    linkPending: 'GitHub repository link coming soon',
    contactHeading: 'Contact',
    email: 'Email',
    wechat: 'WeChat'
  }
};

let currentLang = 'en';

function t(key) {
  return I18N[currentLang][key] || I18N.zh[key] || key;
}

function userText(field) {
  const localizedField = currentLang === 'en' ? field + 'En' : field;
  return USER[localizedField] !== undefined ? USER[localizedField] : USER[field];
}

function projectText(project, field) {
  const localizedField = currentLang === 'en' ? field + 'En' : field;
  return project[localizedField] !== undefined ? project[localizedField] : project[field];
}

function toast(msg, ms = 2400) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  $('#toast-box').appendChild(t);
  setTimeout(() => t.classList.add('out'), ms - 350);
  setTimeout(() => t.remove(), ms);
}

/* ---------- Blue-screen easter egg ---------- */
let bsodTimer = null;

function triggerBsod() {
  stopMatrix();
  hideStartMenu();
  closeAllWindows();
  // Briefly block the main thread to imitate an unresponsive application.
  const freeze = $('#freeze-layer');
  freeze.classList.remove('hidden');
  setTimeout(() => {
    const t0 = performance.now();
    while (performance.now() - t0 < 900) { /* Intentional demo freeze. */ }
    freeze.classList.add('hidden');
    showBsod();
  }, 120);
}

function showBsod() {
  const screen = $('#bsod-screen');
  screen.classList.remove('hidden');
  drawFakeQr();
  let pct = 0;
  const el = $('#bsod-pct');
  clearInterval(bsodTimer);
  bsodTimer = setInterval(() => {
    pct += 2 + Math.random() * 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(bsodTimer);
      bsodTimer = null;
      setTimeout(bootSequence, 750);
    }
    el.textContent = Math.floor(pct) + '%';
  }, 120);
}

function hideBsod() {
  clearInterval(bsodTimer);
  bsodTimer = null;
  const screen = $('#bsod-screen');
  if (screen) screen.classList.add('hidden');
}

function stopBsod() {
  hideBsod();
  const freeze = $('#freeze-layer');
  if (freeze) freeze.classList.add('hidden');
}

function drawFakeQr() {
  const canvas = $('#bsod-qr');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const N = 21;
  const cell = canvas.width / N;
  const mark = (c, r) => ctx.fillRect(c * cell, r * cell, cell, cell);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Random modules preserve the visual appearance of a QR code.
  ctx.fillStyle = '#000';
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      // Keep the center clear for the :( mark.
      if (c >= 6 && c <= 15 && r >= 6 && r <= 16) continue;
      if (Math.random() < 0.42) mark(c, r);
    }
  }
  // Draw three finder patterns.
  const finder = (x, y) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(x * cell, y * cell, 7 * cell, 7 * cell);
    ctx.fillStyle = '#fff';
    ctx.fillRect((x + 1) * cell, (y + 1) * cell, 5 * cell, 5 * cell);
    ctx.fillStyle = '#000';
    ctx.fillRect((x + 2) * cell, (y + 2) * cell, 3 * cell, 3 * cell);
  };
  finder(0, 0);
  finder(N - 7, 0);
  finder(0, N - 7);
  // Draw the centered :( mark with two dots and a curved parenthesis.
  ctx.fillStyle = '#000';
  // Colon dots.
  mark(8, 8); mark(9, 8); mark(8, 9); mark(9, 9);
  mark(8, 12); mark(9, 12); mark(8, 13); mark(9, 13);
  // Smooth left-facing parenthesis.
  for (let r = 7; r <= 15; r++) {
    const t = (r - 11) / 4; // -1 .. 1
    const col = Math.round(11 + 3.5 * t * t);
    mark(col, r);
  }
}

/* ---------- Wallpapers ---------- */
const WALLPAPERS = [
  'radial-gradient(1200px 800px at 82% 18%, rgba(74,158,255,.55), transparent 60%), radial-gradient(1000px 700px at 12% 88%, rgba(0,190,255,.38), transparent 60%), radial-gradient(900px 620px at 55% 45%, rgba(96,64,255,.28), transparent 65%), linear-gradient(135deg,#081a3a 0%,#0f2c52 100%)',
  'radial-gradient(1100px 750px at 20% 15%, rgba(255,140,200,.5), transparent 60%), radial-gradient(1000px 700px at 85% 80%, rgba(120,80,255,.45), transparent 62%), linear-gradient(135deg,#2a0a3a 0%,#3c1053 100%)',
  'radial-gradient(1000px 700px at 80% 25%, rgba(255,190,80,.5), transparent 60%), radial-gradient(1000px 700px at 15% 75%, rgba(80,220,170,.4), transparent 60%), linear-gradient(135deg,#17301f 0%,#1c3d2a 100%)',
  'radial-gradient(1100px 760px at 50% 0%, rgba(80,180,255,.55), transparent 60%), radial-gradient(1000px 700px at 90% 90%, rgba(40,60,140,.5), transparent 62%), linear-gradient(160deg,#0a1733 0%,#10255c 100%)'
];
let wpIdx = 0;

function setWallpaper(i) {
  wpIdx = ((i % WALLPAPERS.length) + WALLPAPERS.length) % WALLPAPERS.length;
  $('#wallpaper').style.background = WALLPAPERS[wpIdx];
  $('#lock-screen').style.background = WALLPAPERS[wpIdx];
}

/* ---------- Boot, lock, and shutdown flow ---------- */
const screens = {
  boot: $('#boot-screen'),
  lock: $('#lock-screen'),
  desktop: $('#desktop'),
  shutdown: $('#shutdown-screen')
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.add('hidden'));
  screens[name].classList.remove('hidden');
  if (name === 'desktop') requestAnimationFrame(positionLanguageTip);
}

let bootTimer = null;

function bootSequence() {
  closeAllWindows();
  stopMatrix();
  stopBsod();
  hideStartMenu();
  clearTimeout(bootTimer);
  showScreen('boot');
  bootTimer = setTimeout(() => showScreen('lock'), 3200);
}

function shutdownSystem() {
  closeAllWindows();
  stopMatrix();
  stopBsod();
  hideStartMenu();
  showScreen('shutdown');
  screens.shutdown.addEventListener('click', bootSequence, { once: true });
  // Browsers may block scripts from closing a tab they did not open.
  try {
    const w = window.open('', '_self');
    if (w) w.close();
    window.close();
  } catch (err) { /* Keep the shutdown screen visible when closing is blocked. */ }
}

function sleepSystem() {
  closeAllWindows();
  stopMatrix();
  stopBsod();
  hideStartMenu();
  showScreen('lock');
}

$('#lock-screen').addEventListener('click', () => showScreen('desktop'));
$('#bsod-screen').addEventListener('click', () => {
  hideBsod();
  bootSequence();
});
document.addEventListener('keydown', (e) => {
  if (!screens.lock.classList.contains('hidden') && e.key !== 'F12') {
    showScreen('desktop');
  }
});

/* ---------- Clock ---------- */
function pad2(n) { return String(n).padStart(2, '0'); }

function updateClock() {
  const now = new Date();
  const time = pad2(now.getHours()) + ':' + pad2(now.getMinutes());
  const chineseTrayDate = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
  const englishLockDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(now);
  const englishTrayDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(now);
  $('#lock-time').textContent = time;
  $('#lock-date').textContent = englishLockDate;
  $('#clock-time').textContent = time;
  $('#clock-date').textContent = currentLang === 'en' ? englishTrayDate : chineseTrayDate;
  $('#lock-username').textContent = USER.nameEn;
}
setInterval(updateClock, 1000);

/* ---------- Desktop icons ---------- */
const DESKTOP_ICONS = [
  { id: 'terminal', icon: '<span class="term-ic">&gt;_</span>', labelKey: 'terminal' },
  { id: 'about', icon: '👤', labelKey: 'profile' },
  { id: 'projects', icon: '📁', labelKey: 'projects' },
  { id: 'skills', icon: '⚙️', labelKey: 'skills' },
  { id: 'contact', icon: '✉️', labelKey: 'contact' },
  { id: 'bug2', icon: '🐞', labelKey: null }
];

/* Snap desktop icons to a Windows-inspired grid. */
const GRID = { cellW: 92, cellH: 84, originX: 10, originY: 14 };
const iconSlots = {};

function buildDesktopIcons() {
  const box = $('#desktop-icons');
  DESKTOP_ICONS.forEach(it => {
    const el = document.createElement('div');
    el.className = 'desk-icon';
    el.dataset.id = it.id;
    el.innerHTML = '<span class="ic">' + it.icon + '</span><span class="lb">' + (it.labelKey ? t(it.labelKey) : ':(') + '</span>';
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      selectIcon(el);
      const id = el.dataset.id;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - rect.left;
      const dy = e.clientY - rect.top;
      let dragged = false;
      const move = (ev) => {
        if (!dragged && Math.abs(ev.clientX - e.clientX) + Math.abs(ev.clientY - e.clientY) < 5) return;
        dragged = true;
        el.classList.add('dragging');
        let x = ev.clientX - dx;
        let y = ev.clientY - dy;
        x = Math.max(0, Math.min(x, window.innerWidth - 86));
        const dragMaxY = window.innerHeight - 48 - iconElHeight();
        y = Math.max(0, Math.min(y, dragMaxY));
        el.style.left = x + 'px';
        el.style.top = y + 'px';
      };
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        if (dragged) {
          el.classList.remove('dragging');
          const x = parseFloat(el.style.left);
          const y = parseFloat(el.style.top);
          const col = Math.max(0, Math.round((x - GRID.originX) / GRID.cellW));
          const maxRow = gridMaxRows() - 1;
          const row = Math.max(0, Math.min(maxRow, Math.round((y - GRID.originY) / GRID.cellH)));
          el.dataset.dragged = '1';
          placeIcon(id, col, row);
        }
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    });
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (el.dataset.dragged === '1') {
        el.dataset.dragged = '';
        return;
      }
      selectIcon(el);
    });
    el.addEventListener('dblclick', () => openApp(it.id));
    box.appendChild(el);
  });
  layoutDesktopIcons();
}

function layoutDesktopIcons() {
  const maxRows = gridMaxRows();
  document.querySelectorAll('.desk-icon').forEach((el, i) => {
    const col = Math.floor(i / maxRows);
    const row = i % maxRows;
    iconSlots[el.dataset.id] = { col: col, row: row };
    applyIconPos(el, col, row);
  });
}

function applyIconPos(el, col, row) {
  el.dataset.moved = '1';
  el.style.left = (GRID.originX + col * GRID.cellW) + 'px';
  el.style.top = (GRID.originY + row * GRID.cellH) + 'px';
}

function iconEl(id) {
  return document.querySelector('.desk-icon[data-id="' + id + '"]');
}

/* Limit grid rows so icons remain above the taskbar. */
function gridMaxRows() {
  const taskbarH = 48;
  const margin = 6;
  const iconH = iconElHeight();
  return Math.max(1, Math.floor((window.innerHeight - taskbarH - margin - GRID.originY - iconH) / GRID.cellH) + 1);
}

function iconElHeight() {
  const el = document.querySelector('.desk-icon');
  return el ? el.offsetHeight : 82;
}

/* Place an icon in the requested cell. Occupied cells push later icons down,
 * and a full column continues in the next column. */
function placeIcon(id, col, row) {
  const maxRows = gridMaxRows();
  col = Math.max(0, col);
  row = Math.max(0, Math.min(row, maxRows - 1));
  const target = col * maxRows + row;
  const others = [];
  Object.keys(iconSlots).forEach(oid => {
    if (oid === id) return;
    const s = iconSlots[oid];
    others.push({ id: oid, idx: s.col * maxRows + s.row });
  });
  others.sort((a, b) => a.idx - b.idx);
  const occupied = new Set(others.map(o => o.idx));
  const updated = {};

  if (occupied.has(target)) {
    others.forEach(o => {
      const idx = o.idx >= target ? o.idx + 1 : o.idx;
      updated[o.id] = { col: Math.floor(idx / maxRows), row: idx % maxRows };
    });
  } else {
    others.forEach(o => {
      updated[o.id] = { col: Math.floor(o.idx / maxRows), row: o.idx % maxRows };
    });
  }
  updated[id] = { col: col, row: row };

  Object.keys(updated).forEach(oid => {
    const s = updated[oid];
    iconSlots[oid] = s;
    const el = iconEl(oid);
    if (el) applyIconPos(el, s.col, s.row);
  });
}

function selectIcon(el) {
  document.querySelectorAll('.desk-icon.selected').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
}

function clearIconSelection() {
  document.querySelectorAll('.desk-icon.selected').forEach(x => x.classList.remove('selected'));
}

/* ---------- Application registry ---------- */
const APPS = {
  terminal: { titleKey: 'terminal', icon: '<span class="term-ic">&gt;_</span>', width: 780, height: 520, theme: 'dark', single: true, build: buildTerminal },
  about:    { titleKey: 'profile', icon: '👤', width: 660, height: 520, single: true, build: buildAbout },
  projects: { titleKey: 'projects', icon: '📁', width: 760, height: 540, single: true, build: buildProjects },
  skills:   { titleKey: 'skills', icon: '⚙️', width: 690, height: 535, single: true, build: buildSkills },
  contact:  { titleKey: 'contact', icon: '✉️', width: 450, height: 330, single: true, build: buildContact },
  bug2:     { titleKey: null, icon: '🐞', single: true }
};

function appTitle(id) {
  const app = APPS[id];
  return app && app.titleKey ? t(app.titleKey) : ':(';
}

const PINNED = ['terminal', 'about'];
const openWindows = {};
let zTop = 20;
let winCount = 0;
let focusedApp = null;

/* ---------- Window management ---------- */
function openApp(id) {
  const app = APPS[id];
  if (!app) return;
  if (id === 'bug2') {
    // The easter egg briefly freezes before showing the blue screen.
    triggerBsod();
    return;
  }
  if (openWindows[id]) {
    const w = openWindows[id];
    w.el.classList.remove('minimized');
    w.minimized = false;
    focusWindow(id);
    return;
  }
  const win = document.createElement('div');
  win.className = 'window';
  win.dataset.theme = app.theme || 'light';
  win.style.width = app.width + 'px';
  win.style.height = app.height + 'px';
  const off = (winCount % 5) * 30;
  // Leave clear space around the desktop icon column.
  win.style.left = Math.max(24, 180 + off) + 'px';
  win.style.top = Math.max(24, 72 + off) + 'px';
  win.dataset.appId = id;
  win.innerHTML =
    '<div class="titlebar">' +
      '<span class="win-icon">' + app.icon + '</span>' +
      '<span class="win-title">' + appTitle(id) + '</span>' +
      '<div class="win-controls">' +
        '<button class="win-btn min" title="' + t('minimize') + '"><svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><path d="M0 5h10" stroke="currentColor" stroke-width="1"/></svg></button>' +
        '<button class="win-btn max" title="' + t('maximize') + '">' + maxIconHtml(false) + '</button>' +
        '<button class="win-btn close" title="' + t('close') + '"><svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><path d="M0 0l10 10M10 0L0 10" stroke="currentColor" stroke-width="1.1"/></svg></button>' +
      '</div>' +
    '</div>' +
    '<div class="window-body"></div>' +
    '<div class="rs rs-n" data-resize="n"></div>' +
    '<div class="rs rs-s" data-resize="s"></div>' +
    '<div class="rs rs-e" data-resize="e"></div>' +
    '<div class="rs rs-w" data-resize="w"></div>' +
    '<div class="rs rs-ne" data-resize="ne"></div>' +
    '<div class="rs rs-nw" data-resize="nw"></div>' +
    '<div class="rs rs-se" data-resize="se"></div>' +
    '<div class="rs rs-sw" data-resize="sw"></div>';
  $('#windows-layer').appendChild(win);

  const body = win.querySelector('.window-body');
  app.build(body, id);

  setupWindow(win, id);
  ensureTaskBtn(id);
  openWindows[id] = { el: win, minimized: false, maximized: false };
  winCount++;
  focusWindow(id);
}

function maxIconHtml(maximized) {
  return maximized
    ? '<svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><path d="M3.5 1.5h5v5M8.5 3.5v5h-5" fill="none" stroke="currentColor" stroke-width="1"/><rect x="1.5" y="3.5" width="5" height="5" fill="none" stroke="currentColor" stroke-width="1"/></svg>'
    : '<svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><rect x="0.75" y="0.75" width="8.5" height="8.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
}

function setupWindow(win, id) {
  win.addEventListener('pointerdown', () => focusWindow(id));

  const tb = win.querySelector('.titlebar');
  tb.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || e.target.closest('.win-btn')) return;
    if (win.classList.contains('maximized')) return;
    const rect = win.getBoundingClientRect();
    const layerRect = $('#windows-layer').getBoundingClientRect();
    const dx = e.clientX - rect.left;
    const dy = e.clientY - rect.top;
    const move = (ev) => {
      let x = ev.clientX - dx - layerRect.left;
      let y = ev.clientY - dy - layerRect.top;
      x = Math.max(-rect.width + 120, Math.min(x, layerRect.width - 40));
      y = Math.max(0, Math.min(y, layerRect.height - 40));
      win.style.left = x + 'px';
      win.style.top = y + 'px';
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    e.preventDefault();
  });

  tb.querySelector('.min').addEventListener('click', (e) => {
    e.stopPropagation();
    minimizeWindow(id);
  });
  tb.querySelector('.max').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMaximize(id);
  });
  tb.querySelector('.close').addEventListener('click', (e) => {
    e.stopPropagation();
    closeWindow(id);
  });

  attachResizeHandles(win, id);
}

/* Support resizing from every edge and corner. */
function attachResizeHandles(win, id) {
  const layer = $('#windows-layer');
  win.querySelectorAll('.rs').forEach(handle => {
    const dir = handle.dataset.resize;
    handle.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || win.classList.contains('maximized')) return;
      e.preventDefault();
      e.stopPropagation();
      focusWindow(id);
      const rect = win.getBoundingClientRect();
      const layerRect = layer.getBoundingClientRect();
      const startX = e.clientX, startY = e.clientY;
      const startW = rect.width, startH = rect.height;
      const startLeft = rect.left - layerRect.left;
      const startTop = rect.top - layerRect.top;
      const MINW = 340, MINH = 230;
      const W = layerRect.width, H = layerRect.height;
      const move = (ev) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        let left = startLeft, top = startTop, w = startW, h = startH;
        if (dir.indexOf('e') !== -1) w = startW + dx;
        if (dir.indexOf('s') !== -1) h = startH + dy;
        if (dir.indexOf('w') !== -1) { w = startW - dx; left = startLeft + dx; }
        if (dir.indexOf('n') !== -1) { h = startH - dy; top = startTop + dy; }
        if (w < MINW) { if (dir.indexOf('w') !== -1) left = startLeft + startW - MINW; w = MINW; }
        if (h < MINH) { if (dir.indexOf('n') !== -1) top = startTop + startH - MINH; h = MINH; }
        if (left < 0) { w += left; left = 0; }
        if (top < 0) { h += top; top = 0; }
        if (left + w > W) { if (dir.indexOf('w') !== -1) left = W - w; else w = W - left; }
        if (top + h > H) { if (dir.indexOf('n') !== -1) top = H - h; else h = H - top; }
        win.style.left = left + 'px';
        win.style.top = top + 'px';
        win.style.width = w + 'px';
        win.style.height = h + 'px';
      };
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    });
  });
}

function focusWindow(id) {
  const w = openWindows[id];
  if (!w) return;
  w.el.classList.remove('minimized');
  w.minimized = false;
  zTop++;
  w.el.style.zIndex = zTop;
  focusedApp = id;
  updateTaskButtons();
}

function minimizeWindow(id) {
  const w = openWindows[id];
  if (!w) return;
  w.el.classList.add('minimized');
  w.minimized = true;
  if (focusedApp === id) focusedApp = null;
  updateTaskButtons();
}

function toggleMaximize(id) {
  const w = openWindows[id];
  if (!w) return;
  w.maximized = !w.maximized;
  w.el.classList.toggle('maximized', w.maximized);
  const btn = w.el.querySelector('.win-btn.max');
  if (btn) {
    btn.innerHTML = maxIconHtml(w.maximized);
    btn.title = w.maximized ? t('restore') : t('maximize');
  }
}

function closeWindow(id) {
  const w = openWindows[id];
  if (!w) return;
  w.el.remove();
  delete openWindows[id];
  if (focusedApp === id) focusedApp = null;
  const btn = taskBtn(id);
  if (btn) {
    btn.classList.remove('running', 'active');
    if (!btn.dataset.pinned) btn.remove();
  }
  winCount = Math.max(0, winCount - 1);
}

function closeAllWindows() {
  Object.keys(openWindows).forEach(closeWindow);
}

/* ---------- Taskbar ---------- */
function taskBtn(id) {
  return document.querySelector('#taskbar-apps [data-app-id="' + id + '"]');
}

function makeTaskBtn(id) {
  const btn = document.createElement('button');
  btn.className = 'tb-btn';
  btn.dataset.appId = id;
  btn.innerHTML = '<span class="tb-ic">' + APPS[id].icon + '</span><span class="tb-ind"></span>';
  btn.title = appTitle(id);
  btn.addEventListener('click', () => toggleFromTaskbar(id));
  return btn;
}

function buildTaskbar() {
  PINNED.forEach(id => {
    const btn = makeTaskBtn(id);
    btn.dataset.pinned = '1';
    $('#taskbar-apps').appendChild(btn);
  });
}

function ensureTaskBtn(id) {
  let btn = taskBtn(id);
  if (!btn) {
    btn = makeTaskBtn(id);
    $('#taskbar-apps').appendChild(btn);
  }
  btn.classList.add('running');
  updateTaskButtons();
}

function toggleFromTaskbar(id) {
  const w = openWindows[id];
  if (!w) { openApp(id); return; }
  if (w.minimized) {
    w.el.classList.remove('minimized');
    w.minimized = false;
    focusWindow(id);
  } else if (focusedApp === id) {
    minimizeWindow(id);
  } else {
    focusWindow(id);
  }
}

function updateTaskButtons() {
  document.querySelectorAll('#taskbar-apps .tb-btn').forEach(btn => {
    const id = btn.dataset.appId;
    btn.classList.toggle('active', focusedApp === id && openWindows[id] && !openWindows[id].minimized);
  });
}

/* ---------- Start menu ---------- */
function buildStartMenu() {
  const grid = Object.keys(APPS).map(id =>
    '<button class="start-app" data-id="' + id + '"><span class="sa-ic">' + APPS[id].icon + '</span><span>' + appTitle(id) + '</span></button>'
  ).join('');
  $('#start-menu').innerHTML =
    '<div class="start-search"><input id="start-search" placeholder="' + t('searchPlaceholder') + '" autocomplete="off" /></div>' +
    '<div class="start-grid">' + grid + '</div>' +
    '<div class="start-footer">' +
      '<div class="start-user"><span class="avatar">👤</span><span>' + userText('name') + '</span></div>' +
      '<button id="power-btn" class="power-btn" title="' + t('power') + '">⏻</button>' +
    '</div>' +
    '<div id="power-flyout" class="hidden">' +
      '<button data-act="shutdown">' + t('shutdown') + '</button>' +
      '<button data-act="sleep">' + t('sleep') + '</button>' +
      '<button data-act="reboot">' + t('restart') + '</button>' +
      '<button data-act="cancel">' + t('cancel') + '</button>' +
    '</div>';

  $('#start-menu').querySelectorAll('.start-app').forEach(btn => {
    btn.addEventListener('click', () => {
      hideStartMenu();
      openApp(btn.dataset.id);
    });
  });

  const search = $('#start-search');
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    $('#start-menu').querySelectorAll('.start-app').forEach(b => {
      const app = APPS[b.dataset.id];
      const hit = !q || appTitle(b.dataset.id).toLowerCase().includes(q) || b.dataset.id.includes(q);
      b.style.display = hit ? '' : 'none';
    });
  });
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const first = $('#start-menu .start-app:not([style*="display: none"])');
      if (first) {
        hideStartMenu();
        openApp(first.dataset.id);
      }
    }
  });

  $('#power-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    $('#power-flyout').classList.toggle('hidden');
  });
  $('#power-flyout').querySelectorAll('button').forEach(b => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const act = b.dataset.act;
      hideStartMenu();
      if (act === 'shutdown') shutdownSystem();
      else if (act === 'sleep') sleepSystem();
      else if (act === 'reboot') bootSequence();
    });
  });
}

function toggleStartMenu() {
  const m = $('#start-menu');
  if (m.classList.contains('hidden')) {
    $('#power-flyout').classList.add('hidden');
    m.classList.remove('hidden');
    setTimeout(() => $('#start-search').focus(), 50);
  } else {
    hideStartMenu();
  }
}

function hideStartMenu() {
  $('#start-menu').classList.add('hidden');
  $('#power-flyout').classList.add('hidden');
}

$('#start-btn').addEventListener('click', toggleStartMenu);

/* ---------- Context menus ---------- */
const ctxMenu = $('#context-menu');

function showDesktopMenu(x, y) {
  ctxMenu.classList.remove('icon-menu');
  delete ctxMenu.dataset.iconId;
  ctxMenu.innerHTML =
    '<div class="ctx-item" data-act="terminal">' + t('openTerminal') + '</div>' +
    '<div class="ctx-item" data-act="wallpaper">' + t('changeWallpaper') + '</div>' +
    '<div class="ctx-item" data-act="refresh">' + t('refresh') + '</div>' +
    '<div class="ctx-sep"></div>' +
    '<div class="ctx-item" data-act="about">' + t('aboutSystem') + '</div>';
  showContextMenu(x, y);
}

function showIconMenu(x, y, icon) {
  ctxMenu.classList.add('icon-menu');
  ctxMenu.dataset.iconId = icon.dataset.id;
  ctxMenu.innerHTML =
    '<div class="ctx-title">' + t('iconActions') + '</div>' +
    '<div class="ctx-item" data-act="open">📂 ' + t('open') + '</div>' +
    '<div class="ctx-item" data-act="rename">✏️ ' + t('rename') + '</div>';
  showContextMenu(x, y);
}

function showContextMenu(x, y) {
  ctxMenu.classList.remove('hidden');
  const rect = ctxMenu.getBoundingClientRect();
  ctxMenu.style.left = Math.min(x, window.innerWidth - rect.width - 8) + 'px';
  ctxMenu.style.top = Math.min(y, window.innerHeight - rect.height - 8) + 'px';
}

function hideContextMenu() {
  ctxMenu.classList.add('hidden');
}

$('#desktop').addEventListener('contextmenu', (e) => {
  if (e.target.closest('.window') || e.target.closest('#taskbar') || e.target.closest('#start-menu')) return;
  e.preventDefault();
  const icon = e.target.closest('.desk-icon');
  if (icon) {
    selectIcon(icon);
    showIconMenu(e.clientX, e.clientY, icon);
  } else {
    showDesktopMenu(e.clientX, e.clientY);
  }
});

ctxMenu.addEventListener('click', (e) => {
  const act = e.target.dataset.act;
  const iconId = ctxMenu.dataset.iconId;
  hideContextMenu();
  if (act === 'terminal') openApp('terminal');
  else if (act === 'wallpaper') {
    setWallpaper(wpIdx + 1);
    toast(t('wallpaperChanged'));
  } else if (act === 'refresh') {
    clearIconSelection();
    toast(t('desktopRefreshed'));
  } else if (act === 'about') {
    toast(t('aboutToast'));
  } else if (act === 'open' && iconId) {
    openApp(iconId);
  } else if (act === 'rename' && iconId) {
    startRenameIcon(iconId);
  } else if (act === 'props' && iconId) {
    toast(appTitle(iconId) + ' · ' + t('desktopIcon') + ' · ' + t('doubleClick'));
  }
});

function startRenameIcon(id) {
  const el = document.querySelector('.desk-icon[data-id="' + id + '"]');
  if (!el) return;
  const label = el.querySelector('.lb');
  if (!label) return;
  const oldName = label.textContent;
  const input = document.createElement('input');
  input.className = 'rename-input';
  input.value = oldName;
  label.replaceWith(input);
  input.focus();
  input.select();
  const done = () => {
    const v = input.value.trim();
    const span = document.createElement('span');
    span.className = 'lb';
    span.textContent = v || t('unnamed');
    input.replaceWith(span);
  };
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      input.blur();
    } else if (e.key === 'Escape') {
      input.value = oldName;
      input.blur();
    }
  });
  input.addEventListener('blur', done);
}

/* Dismiss menus and selections when clicking empty space. */
document.addEventListener('pointerdown', (e) => {
  if (!e.target.closest('#start-menu') && !e.target.closest('#start-btn')) hideStartMenu();
  if (!e.target.closest('#context-menu')) hideContextMenu();
  if (!e.target.closest('.window') && !e.target.closest('#taskbar')) {
    focusedApp = null;
    updateTaskButtons();
  }
  if (!e.target.closest('.desk-icon')) clearIconSelection();
});


/* ---------- Application content ---------- */
function buildAbout(body) {
  body.innerHTML =
    '<div class="app-pad">' +
      '<div class="about-head">' +
        '<img class="avatar avatar-photo" src="assets/avatar.jpg" alt="' + t('avatarAlt') + '">' +
        '<div>' +
          '<h2>' + userText('name') + '</h2>' +
          '<div class="muted">' + userText('title') + '</div>' +
          '<div class="muted">📍 ' + userText('location') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="about-bio">' +
        '<h3>' + t('aboutHeading') + '</h3>' +
        '<p>' + userText('bio') + '</p>' +
      '</div>' +
    '</div>';
}

function buildSkills(body) {
  const tags = (userText('tags') || []).map(tag => '<span class="tag">' + tag + '</span>').join('');
  const caps = (userText('capabilities') || []).map(c =>
    '<div class="cap-item"><span class="cap-dot">✓</span><span>' + c + '</span></div>'
  ).join('');
  body.innerHTML =
    '<div class="app-pad">' +
      '<h3 style="font-size:15px;margin-bottom:14px;">' + t('skillsHeading') + '</h3>' +
      (tags ? '<div class="tag-row">' + tags + '</div>' : '') +
      '<div class="cap-list">' + caps + '</div>' +
    '</div>';
}

function buildProjects(body) {
  const cards = USER.projects.map(p =>
    '<div class="proj-card">' +
      '<h4>' + projectText(p, 'name') + '</h4>' +
      '<p>' + projectText(p, 'desc') + '</p>' +
      '<div class="tech">🛠 ' + projectText(p, 'tech') + '</div>' +
      (p.link
        ? '<a href="' + p.link + '" target="_blank" rel="noopener noreferrer">' + (projectText(p, 'linkLabel') || t('viewDemo')) + '</a>'
        : '<span class="muted">' + t('linkPending') + '</span>') +
    '</div>'
  ).join('');
  body.innerHTML =
    '<div class="app-pad">' +
      '<h3 style="font-size:15px;margin-bottom:14px;">' + t('projectsHeading') + '</h3>' +
      '<div class="proj-grid">' + cards + '</div>' +
      '<div class="projects-updating">' + t('projectsUpdating') + '</div>' +
    '</div>';
}

function buildContact(body) {
  body.innerHTML =
    '<div class="app-pad">' +
      '<h3 style="font-size:15px;margin-bottom:14px;">' + t('contactHeading') + '</h3>' +
      '<div class="contact-list">' +
        '<div class="contact-item"><span class="ci-ic">✉️</span><span>' + t('email') + '</span><span class="ci-val">' + USER.email + '</span></div>' +
        '<div class="contact-item"><span class="ci-ic">💬</span><span>' + t('wechat') + '</span><span class="ci-val">' + USER.wechat + '</span></div>' +
        '<div class="contact-item"><span class="ci-ic">🐙</span><span>GitHub</span><a href="' + USER.github + '" target="_blank" rel="noopener noreferrer">' + USER.github + '</a></div>' +
      '</div>' +
      '</div>';
}

/* ---------- Language switching ---------- */
function setLanguage(lang) {
  currentLang = lang === 'en' ? 'en' : 'zh';
  applyLanguage();
}

function applyLanguage() {
  document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';
  document.body.dataset.language = currentLang;
  document.title = t('pageTitle');

  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = t('pageDescription');

  $('#boot-text').innerHTML = I18N.en.bootText;
  $('#lock-hint').textContent = I18N.en.lockHint;
  $('#start-btn').title = t('startTitle');
  $('#network-icon').setAttribute('title', t('network'));
  $('#volume-icon').setAttribute('title', t('volume'));
  $('#battery-icon').setAttribute('title', t('battery'));
  $('#shutdown-text').textContent = t('shutdownText');
  $('#shutdown-hint').textContent = t('shutdownHint');
  $('#bsod-title').innerHTML = t('bsodTitle');
  $('#bsod-detail').textContent = t('bsodDetail');
  $('#bsod-progress-label').textContent = t('bsodProgress');
  $('#bsod-hint').textContent = t('bsodHint');
  $('#matrix-tip').textContent = t('matrixTip');

  const langToggle = $('#lang-toggle');
  langToggle.textContent = currentLang === 'en' ? 'ENG' : '中';
  langToggle.title = t('imeTitle');
  langToggle.setAttribute('aria-label', t('imeSwitch'));
  langToggle.dataset.lang = currentLang;

  updateClock();

  DESKTOP_ICONS.forEach(item => {
    const label = document.querySelector('.desk-icon[data-id="' + item.id + '"] .lb');
    if (label) label.textContent = item.labelKey ? t(item.labelKey) : ':(';
  });

  if (typeof resetTerminalLanguageState === 'function') resetTerminalLanguageState();

  Object.keys(openWindows).forEach(id => {
    const state = openWindows[id];
    const win = state.el;
    const app = APPS[id];
    const title = win.querySelector('.win-title');
    if (title) title.textContent = appTitle(id);
    const minButton = win.querySelector('.win-btn.min');
    const maxButton = win.querySelector('.win-btn.max');
    const closeButton = win.querySelector('.win-btn.close');
    if (minButton) minButton.title = t('minimize');
    if (maxButton) maxButton.title = state.maximized ? t('restore') : t('maximize');
    if (closeButton) closeButton.title = t('close');
    const body = win.querySelector('.window-body');
    if (body && app && typeof app.build === 'function') app.build(body, id);
  });

  document.querySelectorAll('#taskbar-apps .tb-btn').forEach(btn => {
    btn.title = appTitle(btn.dataset.appId);
  });

  buildStartMenu();
  hideContextMenu();
  requestAnimationFrame(positionLanguageTip);
}

function setupLanguageToggle() {
  $('#lang-toggle').addEventListener('click', (event) => {
    event.stopPropagation();
    setLanguage(currentLang === 'zh' ? 'en' : 'zh');
  });
}

function positionLanguageTip() {
  const tip = $('#language-tip');
  const toggle = $('#lang-toggle');
  if (!tip || !toggle || tip.classList.contains('hidden') || screens.desktop.classList.contains('hidden')) return;

  const toggleRect = toggle.getBoundingClientRect();
  const tipWidth = tip.offsetWidth;
  const margin = 12;
  // Anchor to the center of the 20 px Chinese indicator to prevent tip movement.
  const anchorX = toggleRect.right - 10;
  const idealLeft = anchorX - tipWidth / 2;
  const left = Math.max(margin, Math.min(idealLeft, window.innerWidth - tipWidth - margin));
  const arrowLeft = Math.max(14, Math.min(anchorX - left, tipWidth - 14));

  tip.style.left = left + 'px';
  tip.style.setProperty('--tip-arrow-left', arrowLeft + 'px');
}

function setupLanguageTip() {
  const tip = $('#language-tip');
  const closeButton = $('#language-tip-close');
  tip.classList.remove('hidden');

  const dismiss = () => {
    tip.classList.add('hidden');
  };

  closeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    dismiss();
  });
  tip.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dismiss();
  });
  window.addEventListener('resize', positionLanguageTip);
}

/* ---------- Public API used by the terminal ---------- */
window.PH = {
  USER: USER,
  apps: APPS,
  t: t,
  getLang: () => currentLang,
  userText: userText,
  projectText: projectText,
  appTitle: appTitle,
  toast: toast,
  openApp: openApp,
  closeApp: closeWindow,
  bootSequence: bootSequence,
  shutdownSystem: shutdownSystem,
  sleepSystem: sleepSystem,
  startMatrix: startMatrix,
  stopMatrix: stopMatrix
};

/* ---------- Initialization ---------- */
updateClock();
buildDesktopIcons();
buildTaskbar();
buildStartMenu();
setupLanguageToggle();
applyLanguage();
setupLanguageTip();
setWallpaper(0);
bootSequence();

/* Reflow icons after viewport changes so they stay above the taskbar. */
window.addEventListener('resize', () => layoutDesktopIcons());
