# 使用node编写 cli（命令行）

## hello cli
nodejs的cli，本质上其实就是跑node脚本`node hello.js`，但我们可以通过node，做得更逼真一些，在package.json中的scripts中添加一个脚本名
```
{
  "scripts": {
    "hello": "node index.js"
  }
}
```
然后命令行中执行：
```
npm run hello
```
不过，这不能像webpack、vue一样，直接通过执行 ` vue create app` 来执行命令，下面就让我们来自己创建一个也能这样执行的 cli 

## 首先，取名
这里我们就用 hello-cli 这个名字，我们打算实现直接在命令行中输入 `hello-cli`,命令行中能输入‘hello cli’ 文案

1、先创建一个 hello-cli 的目录，使用 npm init 初始化
2、添加 index.js 入口文件，index.js 内容如下
```
#!/usr/bin/env node
console.log('hello cli')
```
添加#`!/usr/bin/env node`或者`#!/usr/bin/node `这行代码是告诉系统，当前脚本使用nodejs来执行
`#!/usr/bin/env node` 的意思是让系统自己去找node的执行程序。
`#!/usr/bin/node` 的意思是，明确告诉系统，node的执行程序在路径为/usr/bin/node。

3、修改package.json，添加bin字段
```
{
  "name": "hello-cli",
  "version": "1.0.0",
  "bin":{
    "hello-cli":"index.js"  
  }
}
```
bin字段里面写上这个命令行的名字，也就是hello-cli，它告诉npm，里面的js脚本可以通过命令行的方式执行，以hello-cli的命令调用。命令行的名字可任意取
4、全局添加 `hello-cli` 命令
在package.json目录下，打开命令行工具，执行 `npm link`，将当前代码在npm全局目录下添加一个快捷方式。或者在package.json目录下执行 `npm install -g`，全局安装，这样，
`hello-cli`命令就可以直接在命令行中执行了

命令行中执行`hello-cli`，即可成功输出 `hello cli`
> 通过 `npm link` 添加链接的方式，可通过npm unlink删除
通过 `npm install -g` 全局安装的方式，可通过 `npm uninstall -g` 删除全局安装

5、局部安装
局部安装可通过 `npm i -D file:xxx` 命令安装，注意‘xxx’ 为 cli 项目的绝对路径
例如 `npm i -D file:E:\weely\weely-cli-app\bin`,
局部安装后，可直接在项目 package.json 的scripts 中添加脚本
```
{
  "scripts": {
    "hello": "hello-cli"
  }
}
```
执行`npm run hello`, 即可成功输出 ‘hello cli’

以上即已经成功编写了一个最最简单的cli，通过node即可实现更加复杂，强大的功能，例如vue-cli,webpack工具等等
