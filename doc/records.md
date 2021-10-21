
## Clipboard使用遇到的问题，Clipboard对象的第一个参数target对象不能为svg类型对象

## react框架 input对象的target为空时，可在赋值前调用 event.presist() 解决，注意不能放在异步函数中

## js异步调用axios打开链接时，会被浏览器阻止
>解决方法： 
    先利用 `const nWindow = window.open('about:blank') ` 打开新的一个空白页面，接着在axios的then回调里写入要打开的url，至此可解决上面问题
    （注意：利用 a 链接方式目前也会被阻止）