### git更改远程仓库地址

1. 删除原来的仓库 `git remote rm origin`
2. 利用 ***remote add*** 添加需要替换的仓库地址 `git remote add origin https://github.com/***/demo.git`

### 使用淘宝镜像安装node-sass
```
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ -D
```


### git clone 拉取代码出现 ` OpenSSL SSL_read: Connection was reset, errno 10054` 错误
解决方法：
将https校验关掉即可，执行命令如下：
`git config --global http.sslVerify "false"`
