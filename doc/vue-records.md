### 打印功能可通过 vue-print-nb 实现
打印页面修改样式：
1、@media print 
```
@media print {
  html{
    background-color: #FFFFFF;
    margin: 0;  /* this affects the margin on the html before sending to printer */
  }

  body{
    border: none ;
    margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
    color: blue !important; // 修改样式需要使用 !important 重置浏览器行为
  }
}
```
2、@page 用来设置页面大小、边距、方向等
```
// demo1
@page{
  size: A4 portrait; /*  */
  margin: 3.7cm 2.6cm 3.5cm; /* 国家标准公文页边距 GB/T 9704-2012 */
}

// demo2
@page{
  size:  auto;
  margin: 0; // 去除页眉页脚
}
```

### vue splice 数组会触发dom更新
### element el-table fix属性会出现滚动条不同步滑动bug，el-table 单元格里面使用 el-input 使用v-model会出现输入框死锁bug，双向绑定出现异常问题。

