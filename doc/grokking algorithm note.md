# 算法图解

## 算法简介

### 引言
算法：一组完成任务的指令。广义上任何代码片段都可视为算法

### 二分查找
二分查找：一种算法，其输入是一个有序的元素列表。如果要查找的元素包含在列表中，二分查找返回其位置，否则返回null
二分查找时，猜测的是中间的数字，从而每次都讲余下的数字排除一半。
简单查找：就是从头找到末尾。
一般而言，对于包含n个元素的列表，用二分查找最多需要 log2n 步，而简单查找最多需要 n 步

```
// 二分法查询
function binary_search(list, searchV) {
  let start = 0, end = list.length - 1
  while(start <= end) {
    const sIndex = Math.floor((start + end) / 2)
    const sItem = list[sIndex]
    if (searchV === sItem) {
      return sIndex
    } else if (searchV > sItem) {
      start = sIndex + 1
    } else {
      end = sIndex - 1
    }
  }
}

function recur_binary_search(list, search) {
  let start=0, end=list.length - 1,cursor,value
  function f() {
    cursor = Math.floor((start + end)/2)
    value = list[cursor]
    if (value === search) {
      return cursor
    } else if (search > value) {
      start = cursor + 1
    } else if (search < value){
      end = cursor - 1
    }
    if (start > end) {
      return -1
    }
    return f()
  }
  return f()
}


```
### 大O表示法
大O表示法：一种特殊的表示法，指出算法的速度有多快
大O表示法指出最糟糕情况下的运行时间

>一些常见的大O时间
O(log2n): 对数时间，二分查找大O时间即为O(log2n)
O(n)：线性时间，简单查找
O(n*log2n)：快排
O(n^2)：选择排序
O(n!)：（旅行商问题，计算到达5个城市路程）

### 总结
* 二分查找比简单查找快很多
* O(log2n) 比 O(n)快
* 算法运行时间并不以秒计
* 算法运行时间从增速的角度度量的
* 算法运行时间用大O表示法表示

## 选择排序

### 数组和链表
数组存储的内容是相连的（紧靠一起的）。数组的元素带有编号，编号都是从 0 开始的
链表可存储在内存的任何位置，链表的每个元素都会存储下一个元素的地址，从而使一系列随机内存地址串在一起

> 数组及链表大O时间
读取： 数组：O(1)，   链表：O(n)
插入/删除： 数组：O(n)，   链表：O(1)

### 选择排序
依次找最小的元素，放新数组中

## 递归
### 递归： 
* 基线条件：函数不再调自己，并退出，避免死循环
* 递归条件：函数调自己

### 栈
栈只支持两种操作，压入（插入）和弹出（删除并读取），入栈与出栈
调用栈
递归调用栈
尾递归：自己返回自己

## 快速排序
### 4.1 分而治之
分而治之（divide and conquer）

>欧几里得算法（碾转相除法）
定理：两个整数的最大公约数等于其中较小的那个数和两数相除余数的最大公约数
```
<!-- 证明： -->
正整数a、b（a > b）

假设：a 除 b得k,且余数为c，a、b的公约数为m
a = k * b + c
a - k * b = c
(a / m) - k * (b / m) = c / m
a / m 与 b / m结果均为整数，假设为 x,y
x - k * y = c/m
整数经过 + ，- ，* 运算后，结果为整数
所以 c/m 也为整数，即m也为c的公约数
```
```
function GCD(a,b) {
  const max = Math.max(a,b)
  const min = Math.min(a,b)
  const r = max % min
  if (r === 0) {
    return min
  }
  return GCD(min, r)
}
```
```
// 递归计算数组和
function sumArr(arr) {
  if (arr.length <= 0) {
    return 0
  }

  return arr.pop() + sumArr(arr)
}
// 尾递归
function sumArr1(arr, sum=0) {
  if (arr.length <= 0) {
    return sum
  }
  const lastValue = arr.pop()

  return sumArr1(arr, lastValue + sum)
}
```

```
// 快速排序
function quickSort(list) {
  if (list.length < 2) return list
  const pivot = list[0]

  const smaller = list.filter((i) => i <= pivot>)
  const greater = list.filter((i) => i > pivot)

  return quickSort(smaller).concat([pviot], quickSort(greater))
}

```


## 散列表（字典）




























