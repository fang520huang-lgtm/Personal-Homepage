'use strict';

/* =========================================================
 * Fang OS custom terminal
 * Commands stay in English while help and feedback follow the UI language.
 * ========================================================= */

const pageLoadedAt = Date.now();

function pad(n) { return String(n).padStart(2, '0'); }

function isEnglish() {
  return typeof PH !== 'undefined' && PH.getLang && PH.getLang() === 'en';
}

function tr(zh, en) {
  return isEnglish() ? en : zh;
}

function userValue(field) {
  return PH.userText ? PH.userText(field) : PH.USER[field];
}

function projectValue(project, field) {
  return PH.projectText ? PH.projectText(project, field) : project[field];
}

/* ---------- Virtual file system ---------- */
function virtualFileSystem() {
  return isEnglish()
    ? {
        '': { dirs: ['Projects'], files: ['Profile.txt', 'Skills.txt', 'Contact.txt', 'Password.txt'] },
        'Projects': { dirs: [], files: ['Project One.txt', 'Project Two.txt'] }
      }
    : {
        '': { dirs: ['项目'], files: ['个人简历.txt', '技能.txt', '联系方式.txt', '密码.txt'] },
        '项目': { dirs: [], files: ['项目一.txt', '项目二.txt'] }
      };
}

let cwdSegs = [];

function cwdPath() {
  const segs = cwdSegs.length ? '\\' + cwdSegs.join('\\') : '';
  const folderName = String(userValue('name')).replace(/\s+/g, '');
  return 'C:\\Users\\' + folderName + segs;
}

function fileContents() {
  if (isEnglish()) {
    return {
      'Profile.txt': 'Name: ' + userValue('name') + '\nRole: ' + userValue('title') + '\nAbout: ' + userValue('bio'),
      'Skills.txt': 'Technical skills:\n' + userValue('capabilities').map(c => '  - ' + c).join('\n') + '\n\nFocus areas: ' + (userValue('tags') || []).join(' / '),
      'Contact.txt': 'Email: ' + PH.USER.email + '\nWeChat: ' + PH.USER.wechat + '\nGitHub: ' + PH.USER.github,
      'Password.txt': 'Nice try 😜\nThe real password is: keep learning and keep building!',
      'Project One.txt': 'Project: Fang OS\nDescription: ' + projectValue(PH.USER.projects[0], 'desc'),
      'Project Two.txt': projectValue(PH.USER.projects[1], 'name') + '\n' + projectValue(PH.USER.projects[1], 'desc')
    };
  }
  return {
    '个人简历.txt': '姓名：' + userValue('name') + '\n身份：' + userValue('title') + '\n简介：' + userValue('bio'),
    '技能.txt': '技术能力：\n' + userValue('capabilities').map(c => '  - ' + c).join('\n') + '\n\n主要方向：' + (userValue('tags') || []).join(' / '),
    '联系方式.txt': '邮箱：' + PH.USER.email + '\n微信：' + PH.USER.wechat + '\nGitHub：' + PH.USER.github,
    '密码.txt': '别想偷看我的密码 😜\n真正的密码是——好好写代码，天天向上！',
    '项目一.txt': '项目：Fang OS\n简介：' + projectValue(PH.USER.projects[0], 'desc'),
    '项目二.txt': projectValue(PH.USER.projects[1], 'name') + '\n' + projectValue(PH.USER.projects[1], 'desc')
  };
}

function resetTerminalLanguageState() {
  cwdSegs = [];
}

/* ---------- Matrix effect ---------- */
let matrixOn = false;
let matrixRaf = null;

function startMatrix() {
  if (matrixOn) return;
  matrixOn = true;
  const layer = document.getElementById('matrix-layer');
  const canvas = document.getElementById('matrix-canvas');
  layer.classList.remove('hidden');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF$#@%&';
  const size = 16;
  const cols = Math.floor(canvas.width / size);
  const drops = [];
  for (let i = 0; i < cols; i++) {
    drops.push(Math.floor(Math.random() * -canvas.height / size));
  }
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = size + 'px "Cascadia Mono", Consolas, monospace';
    for (let i = 0; i < cols; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.975 ? '#cfc' : '#0f0';
      ctx.fillText(ch, i * size, drops[i] * size);
      if (drops[i] * size > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    matrixRaf = requestAnimationFrame(draw);
  }
  draw();
  const onKey = (e) => {
    if (e.key === 'Escape') {
      stopMatrix();
      document.removeEventListener('keydown', onKey);
    }
  };
  document.addEventListener('keydown', onKey);
}

function stopMatrix() {
  if (!matrixOn) return;
  matrixOn = false;
  if (matrixRaf) cancelAnimationFrame(matrixRaf);
  matrixRaf = null;
  const layer = document.getElementById('matrix-layer');
  if (layer) layer.classList.add('hidden');
}

/* ---------- Helpers ---------- */
function uptimeText() {
  const sec = Math.floor((Date.now() - pageLoadedAt) / 1000);
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return isEnglish()
    ? minutes + ' min ' + seconds + ' sec'
    : minutes + ' 分 ' + seconds + ' 秒';
}

const APP_ALIAS = {
  terminal: 'terminal', '终端': 'terminal',
  about: 'about', '个人简历': 'about', '关于我': 'about', '关于': 'about',
  projects: 'projects', '项目': 'projects',
  skills: 'skills', '技能': 'skills',
  contact: 'contact', '联系方式': 'contact', '联系我': 'contact', '联系': 'contact'
};

/* ---------- Command registry ---------- */
const CMDS = {
  help(ctx) {
    ctx.print('');
    ctx.print(tr('Fang OS 终端 — 可用命令', 'Fang OS Terminal — Available commands'), 'cyan');
    const lines = isEnglish()
      ? [
          '  help          Show this help',
          '  neofetch      Show system information',
          '  echo <text>   Print text',
          '  date / time   Show the date / time',
          '  ls / dir      List the current directory',
          '  cd <path>     Change directory',
          '  cat <file>    View a file',
          '  pwd           Show the current path',
          '  about         View my profile',
          '  projects      View featured projects',
          '  skills        View technical skills',
          '  contact       View contact details',
          '  open <app>    Open a desktop app',
          '  exit          Close Terminal',
          '  sudo <cmd>    Run as administrator',
          '  uptime        Show system uptime',
          '  ver           Show the system version',
          '  sleep         Go to the lock screen',
          '  reboot        Restart the system',
          '  shutdown      Shut down'
        ]
      : [
          '  help          显示本帮助',
          '  neofetch      系统信息',
          '  echo <text>   输出文字',
          '  date / time   日期 / 时间',
          '  ls / dir      列出当前目录',
          '  cd <路径>     切换目录',
          '  cat <文件>    查看文件',
          '  pwd           显示当前路径',
          '  about         查看个人简历',
          '  projects      查看项目列表',
          '  skills        查看技能列表',
          '  contact       查看联系方式',
          '  open <应用>   打开桌面应用',
          '  exit          关闭终端',
          '  sudo <cmd>    以管理员身份运行',
          '  uptime        已运行时长',
          '  ver           系统版本',
          '  sleep         待机（回到锁屏）',
          '  reboot        重启系统',
          '  shutdown      关机'
        ];
    lines.forEach(line => ctx.print(line));
    ctx.print('');
  },

  neofetch(ctx) {
    const logo = [
      '  ▛▀▀▀▜ ▛▀▀▀▜',
      '  ▌  ▐ ▌  ▐',
      '  ▙▄▄▄▟ ▙▄▄▄▟',
      '  ▛▀▀▀▜ ▛▀▀▀▜',
      '  ▌  ▐ ▌  ▐',
      '  ▙▄▄▄▟ ▙▄▄▄▟'
    ];
    const info = isEnglish()
      ? [
          userValue('name') + '@FangOS',
          '-----------------------',
          'OS:       Fang OS 1.0',
          'Style:    Windows 11',
          'Kernel:   JavaScript ES2024',
          'Terminal: Custom Terminal v1.0',
          'Desktop:  Custom Desktop v1.0',
          'Theme:    Dark / Classic Blue',
          'Language: English',
          'Location: ' + userValue('location'),
          'Uptime:   ' + uptimeText()
        ]
      : [
          userValue('name') + '@FangOS',
          '-----------------------',
          'OS:     Fang OS 1.0',
          '风格:   Windows 11',
          '内核:   JavaScript ES2024',
          '终端:   自研终端 v1.0',
          '桌面:   自研桌面 v1.0',
          '主题:   深色 / 经典蓝',
          '语言:   简体中文',
          '地址:   ' + userValue('location'),
          '已运行: ' + uptimeText()
        ];
    logo.forEach((l, i) => {
      ctx.print(l + (info[i] ? '   ' + info[i] : ''), i < 3 ? 'cyan' : '');
    });
  },

  echo(ctx, rest) {
    ctx.print(rest || '');
  },

  date(ctx) {
    const d = new Date();
    if (isEnglish()) {
      ctx.print(new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(d));
    } else {
      const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][d.getDay()];
      ctx.print(d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + week);
    }
  },

  time(ctx) {
    const d = new Date();
    ctx.print(pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()));
  },

  ls(ctx) { listDir(ctx); },
  dir(ctx) { listDir(ctx); },
  cd(ctx, rest) { changeDir(ctx, rest); },
  cat(ctx, rest) { viewFile(ctx, rest); },

  about(ctx) {
    ctx.print(userValue('name'), 'cyan');
    ctx.print(userValue('title'));
    ctx.print(tr('所在地：', 'Location: ') + userValue('location'));
    ctx.print('');
    ctx.print(tr('个人简介：', 'About:'), 'cyan');
    ctx.print(userValue('bio'));
  },

  projects(ctx) {
    const ps = PH.USER.projects || [];
    ctx.print(isEnglish() ? 'Featured Projects (' + ps.length + ')' : '精选项目（' + ps.length + ' 个）', 'cyan');
    ps.forEach((p, i) => {
      ctx.print('');
      ctx.print('[' + (i + 1) + '] ' + projectValue(p, 'name'), 'cyan');
      ctx.print('    ' + projectValue(p, 'desc'));
      ctx.print('    ' + tr('技术栈：', 'Tech stack: ') + projectValue(p, 'tech'));
      if (p.link) ctx.print('    ' + tr('链接：', 'Link: ') + p.link);
      else ctx.print('    ' + tr('GitHub 仓库链接待添加', 'GitHub repository link coming soon'), 'dim');
    });
  },

  skills(ctx) {
    const tags = userValue('tags') || [];
    if (tags.length) {
      ctx.print(tr('主要方向：', 'Focus areas: ') + tags.join(' / '), 'cyan');
      ctx.print('');
    }
    ctx.print(tr('技术能力：', 'Technical skills:'), 'cyan');
    (userValue('capabilities') || []).forEach(c => ctx.print('  ✓ ' + c));
  },

  contact(ctx) {
    const u = PH.USER;
    ctx.print(tr('邮箱：', 'Email: ') + u.email);
    ctx.print(tr('微信：', 'WeChat: ') + u.wechat);
    ctx.print('GitHub: ' + u.github);
  },

  pwd(ctx) {
    ctx.print(cwdPath(), 'cyan');
  },

  open(ctx, rest) { openAppCmd(ctx, rest); },
  start(ctx, rest) { openAppCmd(ctx, rest); },

  exit(ctx) { PH.closeApp('terminal'); },
  quit(ctx) { PH.closeApp('terminal'); },

  cls(ctx) { ctx.print.clear(); },
  clear(ctx) { ctx.print.clear(); },

  sudo(ctx) {
    ctx.print(tr('要允许此应用对你的设备进行更改吗？[是(Y)/否(N)]', 'Do you want to allow this app to make changes to your device? [Yes (Y)/No (N)]'), 'warn');
    setTimeout(() => ctx.print(tr('访问被拒绝：你不是管理员 😎', 'Access denied: you are not an administrator 😎'), 'err'), 900);
  },

  uptime(ctx) {
    ctx.print(tr('本页面已运行 ', 'This page has been running for ') + uptimeText());
  },

  ver(ctx) {
    ctx.print(tr('Microsoft Windows [版本 10.0.22631.4249]', 'Microsoft Windows [Version 10.0.22631.4249]'), 'cyan');
    ctx.print(tr('Fang OS 纪念版', 'Fang OS Commemorative Edition'), 'dim');
  },

  sleep(ctx) {
    ctx.print(tr('正在待机……', 'Going to sleep...'), 'warn');
    setTimeout(() => PH.sleepSystem(), 600);
  },

  reboot(ctx) {
    ctx.print(tr('正在重新启动系统……', 'Restarting...'), 'warn');
    setTimeout(() => PH.bootSequence(), 800);
  },

  shutdown(ctx) {
    ctx.print(tr('正在关机……', 'Shutting down...'), 'warn');
    setTimeout(() => PH.shutdownSystem(), 800);
  }
};

/* ---------- File-system commands ---------- */
function listDir(ctx) {
  const key = cwdSegs.join('\\');
  const node = virtualFileSystem()[key] || { dirs: [], files: [] };
  ctx.print('  ' + tr('目录：', 'Directory: ') + cwdPath(), 'cyan');
  node.dirs.forEach(d => ctx.print('  ' + tr('[目录] ', '[DIR]  ') + d + '\\', 'ok'));
  node.files.forEach(f => ctx.print('  ' + tr('[文件] ', '[FILE] ') + f));
  if (!node.dirs.length && !node.files.length) ctx.print('  ' + tr('（空目录）', '(empty directory)'), 'dim');
}

function changeDir(ctx, rest) {
  const arg = (rest || '').trim();
  if (!arg) { ctx.print(cwdPath(), 'cyan'); return; }
  if (arg === '\\' || arg === '/') {
    cwdSegs = [];
    ctx.print(cwdPath(), 'cyan');
    return;
  }
  if (arg === '..') {
    cwdSegs.pop();
    ctx.print(cwdPath(), 'cyan');
    return;
  }
  const node = virtualFileSystem()[cwdSegs.join('\\')];
  if (node && node.dirs.indexOf(arg) !== -1) {
    cwdSegs.push(arg);
    ctx.print(cwdPath(), 'cyan');
  } else {
    ctx.print(tr('系统找不到指定的路径。', 'The system cannot find the path specified.'), 'err');
  }
}

function viewFile(ctx, rest) {
  const name = (rest || '').trim();
  if (!name) { ctx.print(tr('用法：cat <文件名>', 'Usage: cat <file>'), 'warn'); return; }
  const node = virtualFileSystem()[cwdSegs.join('\\')];
  if (!node || node.files.indexOf(name) === -1) {
    ctx.print(tr('系统找不到指定的文件。', 'The system cannot find the file specified.'), 'err');
    return;
  }
  String(fileContents()[name] || tr('（空文件）', '(empty file)')).split('\n').forEach(l => ctx.print(l));
}

function openAppCmd(ctx, rest) {
  const arg = (rest || '').trim().toLowerCase();
  if (!arg) {
    ctx.print(tr('可用应用：终端 / 个人简历 / 项目 / 技能 / 联系方式', 'Available apps: Terminal / Profile / Projects / Skills / Contact'), 'cyan');
    return;
  }
  const id = APP_ALIAS[arg];
  if (id && PH.apps[id]) {
    PH.openApp(id);
    ctx.print(tr('正在打开：', 'Opening: ') + PH.appTitle(id), 'ok');
  } else {
    ctx.print(tr('找不到应用：', 'App not found: ') + rest, 'err');
  }
}

/* ---------- Command execution ---------- */
function runCommand(raw, ctx) {
  const text = raw.trim();
  if (!text) return;
  const parts = text.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const rest = parts.slice(1).join(' ');
  const fn = CMDS[cmd];
  if (fn) {
    try {
      fn(ctx, rest, parts.slice(1));
    } catch (err) {
      ctx.print(tr('内部错误：', 'Internal error: ') + err.message, 'err');
    }
  } else {
    ctx.print(isEnglish()
      ? "'" + parts[0] + "' is not recognized as an internal or external command, operable program, or batch file."
      : "'" + parts[0] + "' 不是内部或外部命令，也不是可运行的程序或批处理文件。", 'err');
    ctx.print(tr("输入 'help' 查看可用命令。", "Try 'help' to see available commands."), 'dim');
  }
}

function completeCommand(input, out) {
  const v = input.value;
  const words = v.split(/\s+/);
  if (words.length !== 1) return;
  const q = words[0].toLowerCase();
  const cands = Object.keys(CMDS).filter(c => c.startsWith(q));
  if (cands.length === 1) {
    input.value = cands[0] + ' ';
  } else if (cands.length > 1) {
    const d = document.createElement('div');
    d.className = 'line dim';
    d.textContent = cands.join('    ');
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
  }
}

/* ---------- Terminal rendering ---------- */
function buildTerminal(body) {
  body.innerHTML =
    '<div class="terminal">' +
      '<div class="term-out"></div>' +
      '<div class="term-input-line"><span class="term-prompt"></span><input class="term-input" autocomplete="off" spellcheck="false" /></div>' +
    '</div>';

  const out = body.querySelector('.term-out');
  const input = body.querySelector('.term-input');
  const promptEl = body.querySelector('.term-prompt');
  const history = [];
  let hIdx = 0;

  const print = (text, cls) => {
    String(text).split('\n').forEach(line => {
      const d = document.createElement('div');
      d.className = 'line' + (cls ? ' ' + cls : '');
      d.textContent = line;
      out.appendChild(d);
    });
    out.scrollTop = out.scrollHeight;
  };
  print.clear = () => { out.innerHTML = ''; };

  const renderPrompt = () => { promptEl.textContent = cwdPath() + '> '; };
  renderPrompt();

  print(tr('Fang OS 终端 v1.0 — 输入 help 查看所有命令', "Fang OS Terminal v1.0 — Type 'help' to see all commands"), 'dim');
  print('');
  print(tr("输入 'help' 查看所有可用命令。", "Type 'help' to see all available commands."), 'dim');
  print('');

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const v = input.value;
      print(promptEl.textContent + v);
      runCommand(v, { print: print, input: input });
      if (v.trim()) {
        history.push(v);
        hIdx = history.length;
      }
      input.value = '';
      renderPrompt();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hIdx > 0) { hIdx--; input.value = history[hIdx] || ''; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIdx < history.length) { hIdx++; input.value = history[hIdx] || ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      completeCommand(input, out);
    }
  });

  body.addEventListener('pointerdown', (e) => {
    if (e.target.tagName !== 'INPUT') input.focus();
  });
  setTimeout(() => input.focus(), 80);
}
