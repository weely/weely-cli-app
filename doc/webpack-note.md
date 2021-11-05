# Webpack中hash与chunkhash的区别，以及js与css的hash指纹解耦方案
[https://www.cnblogs.com/ihardcoder/p/5623411.html](https://www.cnblogs.com/ihardcoder/p/5623411.html)

1. hash与chunkhash
>官方文档对于两者的定义：
[hash] is replaced by the hash of the compilation.
hash代表的是compilation的hash值。
[chunkhash] is replaced by the hash of the chunk.
chunkhash代表的是chunk的hash值。

### filename 不能写成 [name].[chunkhash:8].js
* chunkhash只能用在生产环境不能用在开发环境
* 去掉热更新，不要让webpack.HotModuleReplacementPlugin()在plugins里运行, 热更新与js的chunkhash有冲突


### npx与npm区分
* NPM(Node Package Manager)：Node.js的包管理器，目标是自动化依赖和包管理
* NPX：执行 Node 包的工具，从 npm5.2 版本开始，与npm捆绑在一起

1. 默认情况下，首先检查路径中（项目中）是否存在要执行的包
2. 如果存在，即执行
3. 如果不存在，未安装对应包，npx 将安装其最新版包，然后执行它
npx还可以直接调用项目中安装的模块

* 注意：npx 可以用来避免全局安装，使用 npx 命令时。会让全局安装的模块下载到临时目录，使用之后会删除。下次使用需要重新安装。

## webpack入门到精通

### 起步
创建 webpack-demo目录，命令行打开新建目录，使用 `npm init` 初始化项目，生成 package.json 文件
创建 `src/index.js` 文件，作为入口文件，入口文件中写入
```
function component() {
    const element = document.createElement('div')
    element.innerHTML = 'hello webpack'

    return element
}

document.body.appendChild(component())
```
创建webpack.config.js的配置文件，文件中添加
```
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
```
> 项目中有 webpack.config.js 配置文件时，webpack 默认会基于该配置文件执行命令

在 dist 目录下创建  index.html 文件
文件内容如下：
```
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
<script src="./bundle.js"></script>
</body>
</html>
```

接下来通过 `npx webpack` 命令打包生成 `bundle.js` ，浏览器打开 index.html文件即可看见页面中显示有` hello webpack `

### 管理资源
webpack 默认只能识别 javascript文件，如果需要加载其他文件，例如 css、图片、vue模板文件，需要 loader 或内置的 Asset Modules 来引入其他类型文件

#### 加载 CSS
加载css需要安装 style-loader 和 css-loader，并在module中配置这些loader

