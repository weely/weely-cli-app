# 使用vue-cli4 + vue3 + vue-cli-plugin-electron-builder + Electron15 开发桌面应用

## 第一步：使用vue-cli4新建项目（选择vue3）
`vue create electron-demo`
> 补充说明：先全局安装vue-cli4, `npm install -g @vue/cli`,再执行上面命令

## 第二步：安装vue-cli-plugin-electron-builder，执行 `vue add electron-builder` 

## 第三步：运行项目yarn electron:serve，正常运行以来即ok

## 第四步：yarn electron:build 打包exe，安装即可

> 提示：electron15依赖的node版本需要14版本以上，所以本地最好安装node14及以上版本

electron + vue3无法显示vue-devtools的问题：
background.js中引用的为vue2的版本，需要改为引用Beta版本的devtools
```
// VUEJS_DEVTOOLS ---- vue3 用不了
const { default: installExtension, } = require('electron-devtools-installer')
// 使用beta版 vue-devtools
// 参考链接 https://github.com/vuejs/vue-devtools/issues/1279
// https://v3.vuejs.org/guide/migration/introduction.html#devtools-extension
// https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg
var vue_devtools_beta = { id: "ljjemllljcmogpfapbkkighbhhppjdbg", electron: ">=1.2.1" }
var result = await installExtension(vue_devtools_beta)
```


遇到的问题：
## window10下命令行无法执行的问题：[参考文档](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.1)
1. 管理员身份打开powershell,执行：`Get-ExecutionPolicy`查看当前系统的执行策略
系统默认为***Restricted***
2. 执行 `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned` 修改策略，调整为cmd可执行

## 安装electron失败 postinstall: `node install.js`
使用淘宝镜像安装electron: `npm config set electron_mirror https://npm.taobao.org/mirrors/electron/ `

3、拉取代码install后无法启动的问题，可通过执行 `vue add electron-builder`重新安装依赖修复

#### 参考文档：
* [https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)
* [https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/#installation](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/#installation)
