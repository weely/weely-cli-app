
## Clipboard使用遇到的问题，Clipboard对象的第一个参数target对象不能为svg类型对象

## react框架 input对象的target为空时，可在赋值前调用 event.presist() 解决，注意不能放在异步函数中

## js异步调用axios打开链接时，会被浏览器阻止
>解决方法： 
    先利用 `const nWindow = window.open('about:blank') ` 打开新的一个空白页面，接着在axios的then回调里写入要打开的url，至此可解决上面问题
    （注意：利用 a 链接方式目前也会被阻止）


## js区分移动端与桌面端方法汇总
(https://www.ruanyifeng.com/blog/2021/09/detecting-mobile-browser.html)[https://www.ruanyifeng.com/blog/2021/09/detecting-mobile-browser.html]

1、通过 navigator.userAgent 判断，只要里面包含 `mobi`、`android`、`iphone`等关键字，就可以认定为移动设备
```
if (/mobi|android|iphone/i.test(navigator.userAgent)) {
    // 当前设备是移动设备
}
```
该方法优点是简单方便，缺点是不可靠，因为用户可修改这个字符串，让手机浏览器伪装成桌面浏览器

2、window.screen,window.innerWidth
方法二可以通过屏幕宽度判断是否为手机
```
if (window.screen.width < 500) {
    // 当前设备为移动设备
}
```
缺点是如果手机横屏，就识别不了
`window.innerWidth` 返回网页可见部分宽度，比较适合指定网页在不同宽度下样式
```
const getBrowserWidth = function() {
  if (window.innerWidth < 768) {
    return "xs";
  } else if (window.innerWidth < 991) {
    return "sm";
  } else if (window.innerWidth < 1199) {
    return "md";
  } else {
    return "lg";
  }
};
```
3、window.orientation
方法三是侦测屏幕放心，手机屏幕可以随时改变方法（横屏或竖屏），桌面设备做不到
window.orientation属性用于获取屏幕的当前方向，只有移动设备才有这个属性，桌面设备会返回undefined
if (typeof window.orientation !== 'undefined') {
  // 当前设备是移动设备 
}

注意，iPhone 的 Safari 浏览器不支持该属性。

4、touch事件
方法四是手机浏览器的DOM元素可通过ontounchstart属性，为touch事件指定监听函数，桌面设备没有这个属性
```
function isMobile() {
    return ('ontounchstart' in document.documentElement)
}
// 或者
function isMobile(){
    try{
        document.createEvent('TouchEvent'); return true;
    }catch(e) {
        return false;
    }
}
```

5、window.matchMedia()
最后一种方法是结合css来判断
CSS 通过 media query（媒介查询）为网页指定响应式样式。如果某个针对手机的 media query 语句生效了，就可以认为当前设备是移动设备。

window.matchMedia()方法接受一个 CSS 的 media query 语句作为参数，判断这个语句是否生效。
`let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;`
除了通过屏幕宽度判断，还可以通过指针的精确性判断。CSS 语句pointer:coarse表示当前设备的指针是不精确的。由于手机不支持鼠标，只支持触摸，所以符合这个条件
`let isMobile = window.matchMedia("(pointer:coarse)").matches;`
any-pointer:coarse表示所有指针里面，只要有一个指针是不精确的，就符合查询条件
`let isMobile = window.matchMedia("(any-pointer:coarse)").matches;`

6、其他工具包
 (react-device-detect)[https://www.npmjs.com/package/react-device-detect]，它支持多种粒度的设备侦测
 (mobile-detect)[https://www.npmjs.com/package/mobile-detect]


7、一行代码实现黑白屏切换

** 至为灰色 **
// 现代浏览器
html {
  filter: grayscale(1);
  -webkit-filter: grayscale(1); /* Old Chrome、Old Safari、Old Opera*/
  filter: grayscale(1); /* 现代浏览器标准 */
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); /* IE */
}

** 切换黑白色 **
html {
  filter: invert(1) hue-rotate(180deg);
}


8、chrome浏览器中自带input样式input:-internal-autofill-selected修改（修改input通过autocomplete选中而出现的背景色）
方案1：如果不是透明色，可直接修改box-shadow
```
input:-webkit-autofill {
  box-shadow: 0 0 0 1000px #f0f0f0 inset !important;
}
```

方案2：通css3动画解决
```
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition-delay: 111111s;
  transition: color 11111s ease-out, background-color 111111s ease-out;
}
```
方案3：关闭自动填充功能
```
<input type="text" autocomplete="off">
```


### 
* PaaS：平台即服务
* Iaas：基础设施即服务
* SaaS：软件即服务


SOA: 面向服务架构
DDD: 领域驱动设计（Domain Driven Design）

AMP: Accelerated Mobile Pages
PWA: progressive web app

[现代 Web 开发的现状与未来（JSDC 2019 演讲全文）](https://zhuanlan.zhihu.com/p/88616149)

[https://modernjs.dev/](https://modernjs.dev/)
