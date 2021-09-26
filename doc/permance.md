### 性能分析

navigationStart 加载起始时间
redirectStart 重定向开始时间（如果发生了HTTP重定向，每次重定向都和当前文档同域的话，就返回开始重定向的fetchStart的值。其他情况，则返回0）
redirectEnd 重定向结束时间（如果发生了HTTP重定向，每次重定向都和当前文档同域的话，就返回最后一次重定向接受完数据的时间。其他情况则返回0）
fetchStart 浏览器发起资源请求时，如果有缓存，则返回读取缓存的开始时间
domainLookupStart 查询DNS的开始时间。如果请求没有发起DNS请求，如keep-alive，缓存等，则返回fetchStart
domainLookupEnd 查询DNS的结束时间。如果没有发起DNS请求，同上
connectStart 开始建立TCP请求的时间。如果请求是keep-alive，缓存等，则返回domainLookupEnd
(secureConnectionStart) 如果在进行TLS或SSL，则返回握手时间
connectEnd 完成TCP链接的时间。如果是keep-alive，缓存等，同connectStart
requestStart 发起请求的时间
responseStart 服务器开始响应的时间
domLoading 从图中看是开始渲染dom的时间，具体未知
domInteractive 未知
domContentLoadedEventStart 开始触发DomContentLoadedEvent事件的时间
domContentLoadedEventEnd DomContentLoadedEvent事件结束的时间
domComplete 从图中看是dom渲染完成时间，具体未知
loadEventStart 触发load的时间，如没有则返回0
loadEventEnd load事件执行完的时间，如没有则返回0
unloadEventStart unload事件触发的时间
unloadEventEnd unload事件执行完的时间
```
    let timing = performance.timing,
        start = timing.navigationStart,
        dnsTime = 0,
        tcpTime = 0,
        firstPaintTime = 0,
        domRenderTime = 0,
        loadTime = 0;

    dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
    tcpTime = timing.connectEnd - timing.connectStart;
    firstPaintTime = timing.responseStart - start;
    domRenderTime = timing.domContentLoadedEventEnd - start;
    loadTime = timing.loadEventEnd - start;
    
    console.log('DNS解析时间:', dnsTime , '\nTCP建立时间:', tcpTime, '\n首屏时间:', firstPaintTime, '\ndom渲染完成时间:', domRenderTime, '\n页面onload时间:', loadTime);
```