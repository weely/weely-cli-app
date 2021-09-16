# 使用vue-cli4 + vue3 + vue-cli-plugin-electron-builder + Electron15 开发桌面应用

## 第一步：使用vue-cli4新建项目（选择vue3）
`vue create electron-demo`

## 第二步：安装vue-cli-plugin-electron-builder，执行 `vue add electron-builder` 

## 第三步：运行项目yarn electron:serve，正常运行以来即ok

## 第四步：yarn electron:build 打包exe，安装即可

> 提示：electron15依赖的node版本需要14版本以上，所以本地最好安装node14及以上版本

#### 参考文档：
* [https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)
* [https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/#installation](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/#installation)
