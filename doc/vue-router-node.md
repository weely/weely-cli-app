库：
* path-to-regexp：url的正则表达式
1. pathToRegexp()： 类似于 new ExpReg('xxx')
```
var pathToRegexp = require('path-to-regexp')
var re = pathToRegexp('/foo/:bar')
console.log(re);
```
2. exec(): 匹配 url 地址与规则是否相等
```
var pathToRegexp = require('path-to-regexp')
 
var re = pathToRegexp('/foo/:bar');     // 匹配规则
var match1 = re.exec('/test/route');    // url 路径
var match2 = re.exec('/foo/route');     // url 路径
 
console.log(match1); //null
console.log(match2); //[ '/foo/route', 'route', index: 0, input: '/foo/route' ]
```
3. parse(): 解析 url 字符串中参数部分
```
var pathToRegexp = require('path-to-regexp');
 
var url = '/user/:id';
console.log(pathToRegexp.parse(url));
//[ '/user',{ name: 'id', prefix: '/',delimiter: '/',optional: false, repeat: false, partial: false, pattern: '[^\\/]+?' } ]
```

4. compile(): 快速填充 url 字符串的参数值
```
var pathToRegexp = require('path-to-regexp')
 
var url = '/user/:id/:name'
var data = {id: 10001, name: 'bob'}
console.log(pathToRegexp.compile(url)(data)); // /user/10001/bob
```