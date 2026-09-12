# Fang OS — Personal Homepage

A dependency-free, Windows-inspired personal homepage built with plain HTML, CSS, and JavaScript. It presents a boot sequence, lock screen, bilingual desktop, draggable application windows, and a custom interactive terminal.

![Fang OS terminal demo](assets/demo/personal-homepage-terminal-demo.png)

The same recording is also available as an [H.264 MP4 video](assets/demo/personal-homepage-terminal-demo.mp4) and a [widely compatible GIF](assets/demo/personal-homepage-terminal-demo.gif).

## Features

- English startup and lock screen, with English as the default desktop language
- Chinese/English switching from the taskbar input-method indicator
- Closable bilingual language hint shown again after every refresh
- Desktop icons with selection, drag, rename, context-menu, and double-click actions
- Draggable, resizable, minimizable, maximizable, and closable windows
- Start menu, taskbar, clock, wallpaper switching, sleep, restart, and shutdown states
- Custom terminal with commands such as `help`, `neofetch`, `projects`, `skills`, and `contact`
- Responsive layout and a hidden blue-screen easter egg

## Live Demo

This repository contains the complete website. After GitHub Pages is enabled, the published site can be linked here.

## Run Locally

No build step or package installation is required.

1. Clone or download the repository.
2. Open `index.html` in Chrome or Edge.

For consistent local URLs, you can also serve the folder with any static web server, such as the Live Server extension in Visual Studio Code.

## Customize

Edit the `USER` object near the top of `js/app.js`. It is the single source of truth for:

- Chinese and English profile text
- Contact details and GitHub links
- Skill tags and capability descriptions
- Project names, summaries, technology stacks, and links

The desktop applications and terminal read from the same data, so changes stay synchronized.

## Project Structure

```text
.
├── assets/
│   ├── avatar.jpg
│   └── demo/
│       ├── personal-homepage-desktop.png
│       ├── personal-homepage-terminal-demo.gif
│       ├── personal-homepage-terminal-demo.mp4
│       └── personal-homepage-terminal-demo.png
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── terminal.js
├── index.html
├── LICENSE
└── README.md
```

## Browser Support

The latest versions of Chrome and Edge are recommended. Browser security rules may prevent a webpage from closing its own tab; in that case, Fang OS remains on the shutdown screen.

## License

Released under the [MIT License](LICENSE).

---

## 中文说明

Fang OS 是一个使用原生 HTML、CSS 和 JavaScript 编写的 Windows 风格个人主页，无需安装依赖或执行构建命令。页面包含英文开机与锁屏、默认英文桌面、中英切换、桌面图标、窗口系统、任务栏、自研终端和蓝屏彩蛋。

需要修改个人信息时，只需编辑 `js/app.js` 顶部的 `USER` 对象；个人简历、项目、技能、联系方式和终端中的内容会自动保持一致。
