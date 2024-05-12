# nvm安装及使用笔记

1. window下使用nvm管理node版本
1、下载nvm-setup.zip：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)，并解压缩，安装
> 注意选择的安装目录及外链的symlink nodejs目录均不能有特殊字符，不能有中文及空格，不然会导致后面执行切换命令报错 `exit status 1: xxxxxxx`，推荐nvm安装在根目录，nodejs外链也放在在根目录,同时安装前，卸载掉旧版本的node

2、配置镜像，修改setting.txt文件，添加以下2行配置
```
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```
3、使用`nvm install `安装指定的node版本，例如 `npm install 14.17.6`

4、安装完成后，使用 `nvm ls`可以查看已安装列表

5、***使用超管打开powershell，执行 `nvm use 14.17.6`***使用指定版本的nodejs
如果返回 `Now using node v14.17.6` 说明切换成功，执行`npm -v` 与`node -v`检查，均执行成功说明安装ok了。
> 这里我最开始使用的 cmd 命令行，一直报错 `exit status 1: xxxxxxx`，安装路径也没有中文及空格，后来尝试使用超管打开powershell才执行成功。

nvm 设置默认版本
nvm alias default v14.18.3