# npm镜像问题

[npm 常用命令详解](https://www.cnblogs.com/itlkNote/p/6830682.html) 

## 修改切换npm镜像
方法1： 直接编辑npm配置文件
```
直接修改registry的地址

sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
registry=https://registry.npm.taobao.org
```

方法二：用代码更改npm的配置文件
```
npm config set registry http://registry.npm.taobao.org
```
修改使用淘宝镜像

2.换成原来的
```
npm config set registry https://registry.npmjs.org/
```


npm 报错gifsicle@5.2.1
npm install --ignore-list