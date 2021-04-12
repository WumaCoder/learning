# 00-走向源码的第一步

## Q

如何在 vscode 里调试 vue 代码？

## A

### 第一步: 安装环境

首先安装 nodejs 与 git
然后安装 vscode, 之后安装`vscode-flow-ide`、`Debugger for Chrome` 插件

然后安装 chrome 浏览器

> 因为 vue2 是使用 flow 进行开发

### 第二步: 克隆代码

使用下面的命令克隆 vue 仓库的代码, 并且安装依赖包

```bash
git clone https://github.com/vuejs/vue.git
cd vue && npm install
```

然后修改 `package.json` -> `script.dev` 为 `rollup --sourcemap -w -c scripts/config.js --environment TARGET:web-full-dev`

> 这样可以在 debug 的时候方便调试源代码

然后我们执行 `npm run dev`
执行完成后你会看到`dist` 目录
然后我们在`examples`里创建一个文件夹比如`_learn`
然后在该文件夹下创建一个`html`文件，将`dist/vue.js`引入来写一个简单的 demo

### 第三步: 调试代码

现在我们通过 vscode 创建一个 launch.json 文件，具体操作：`侧边栏debug` -> `创建 launch.json` -> `chrome: launch`

然后我们可以在 src 里进行打断点，然后执行刚刚创建的那个命令，就可以方便的调试了
