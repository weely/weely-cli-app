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
