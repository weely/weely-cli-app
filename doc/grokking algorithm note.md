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
散列函数：将输出映射到数字
散列函数需要满足的条件：
* 同一输入，输出结果必须是一致的
* 不同的输入映射到不同的数字

平均情况下，散列表执行各种操作的算法时间均为O(1),常量时间


## 广度优先搜索

### 图简介
广度优先搜索：解决最短路径问题的算法
有向图：关系单向
无向图：无方向或关系双向

### 广度优先搜索
查找最短路径

* 队列：一种先进先出（First In First Out,FIFO）的数据结构
* 栈：一种先进后出（Last In First Out,LIFI）的数据结构
```
// 广度优先搜索
const graph = {
  you: ['alice', 'bob', 'claire'],
  bob: ['anuj', 'peggy'],
  alice: ['peggy'],
  claire: ['thom', 'jonny'],
  anuj: [],
  peggy: [],
  thom: [],
  jonny: []
}

function Deque(){
  this.deque = []
}

Deque.prototype.push = function(value) {
  if (Array.isArray(value)) {
    this.deque = this.deque.concat(value)
  } else {
    this.deque.push(value)
  }
}

Deque.prototype.pop = function(value) {
  return this.deque.shift(value)
}

Deque.prototype.size = function() {
  return this.deque.length
}

function meetCondition(value) {
  return value?.[0] === 't'
}
// 广度优先搜索-查找有没有合适的经销商
function search(name) {
  const searched = new Set()
  const deque = new Deque()
  deque.push(graph[name])
  while (deque.size() > 0) {
    const value = deque.pop()
    if (!searched.has(value)) {
      if (meetCondition(value)) {
        return value
      } else {
        deque.push(graph[value])
        searched.add(value)
      }
    }
  }
  return false
}

search('you')
```

### 小结
* 广度优先搜索指出是否有从A到B的路线
* 如果有，广度优先搜索将找出最短路径
* 当遇到类似于寻找最短路径问题时，可尝试使用图建立模型，再使用广度优先搜索来解决问题
* 有向图中的边为箭头，箭头表示关系的方向
* 无向图中的边不带箭头，关系是双向的
* 队列是先进先出(FIFO)
* 栈是是后进先出(LIFO)
* 需要按加入顺序检查搜索列表中的对象，否则找到的非最短路径，因此搜索列表必须是队列
* 已经检查过的对象，不必再去检查，否则可能导致死循环

## 狄克斯特拉算法
找出加权的最快路径

问题：从一个顶点到其余各顶点的最短路径算法
[狄克斯特拉算法图解](https://img-blog.csdn.net/20181006144205780?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zOTQzMzc4Mw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

狄克斯特拉算法思路：
1. 找出最便宜的节点，即可在最短时间内前往的节点
2. 对于该节点的所有邻居，检查是否有前往他们的更短路径，如果有，就更新其开销
3. 标记处理过的节点，并后续步骤中不再处理
4. 重复以上过程，直到对图中的每个节点都这样做了
5. 计算最终路径
```
const graph = {
  start: {
    a: 6,
    b: 3
  },
  a: {
    c: 2,
    d: 4
  },
  b: {
    e: 10,
  },
  c: {
    fin: 5
  },
  d: {
    e: 1,
    fin: 4
  },
  e: {
    fin: 1
  },
  fin: { }
}

const costs = {
  a: 6,
  b: 3,
  c: Infinity,
  d: Infinity,
  e: Infinity,
  fin: Infinity
}

const parents = {
  a: 'start',
  b: 'start',
  c: 'a',
  d: 'a',
  e: 'b',
  fin: null
}
const processed = []

function findLowestCostNode(costs) {
  let lowestCost = Infinity, lowestCostNode;
  for (let node in costs) {
    const cost = costs[node]
    if (!processed.includes(node)) {
      if (cost < lowestCost) {
        lowestCost = cost
        lowestCostNode = node
      }
    }
  }
  return lowestCostNode
}

function dijkstra(){
  let node = findLowestCostNode(costs)
  while(node) {
    let cost = costs[node]
    const neighbors = graph[node]
    for (let k in neighbors) {
      const newCost = cost + neighbors[k]
      if (costs[k] > newCost) {
        costs[k] = newCost
        parents[k] = node
      }
    }
    processed.push(node)
    node = findLowestCostNode(costs)
  }
}
dijkstra()
```


### 小结
* 广度优先搜索用于非加权图中查找最短路径
* 狄克斯特拉算法用于在加权图中查找最短路径
* 仅当权重为正时狄克斯特拉算法才管用
* 如果图中包含负权边，可使用贝尔曼福德算法

## 贪婪算法

> NP完全问题
简写：NP = P?

### 教室调度问题
如何在同一教室安排最多课程

### 背包问题
如何偷最值钱的东西

### 集合覆盖问题
四色问题

### NP完全问题
识别NP完全问题

## 动态规划

### 背包问题

单元格价值 = 比较两者中较大的那个 max({
  1. 上一个单元格的值(即 ceil[i-1][j])
  2. 当前商品的价值 + 剩余空间的价值(ceil[i-1][j-当前商品的重量])
})

针对能否只取一部分的问题，直接采用贪婪算法就好，不需要用到动态规划

```
// 动态规划算法计算偷取最大价值商品问题
const goods = {
  macbook: {
    price: 2000,
    weight: 1
  },
  guitar: {
    price: 1500,
    weight: 3
  },
  piano: {
    price: 3000,
    weight: 4
  },
}
const container = 4
const matirx = []

function dynamicProgram() {
  const keys = Object.keys(goods)
  for(let i = 0;i < keys.length; i++) { 
    const key = keys[i]
    matirx[i] = new Array()
    for (let j = 0; j < container; j++) {
      const good = goods[key]
      const preCeilPrice = i > 0 && matirx[i-1] && matirx[i-1][j] || 0
      const currentGoods = good.weight <= (j+1) ? good.price : 0
      const resWeight = j + 1 - good.weight
      const resContainerPrice = resWeight > 0 ? (matirx[i-1] && matirx[i-1][resWeight] || 0) : 0
      matirx[i][j] = Math.max(preCeilPrice, currentGoods + resContainerPrice)
    }
  }
}

dynamicProgram()

```

```
// 求最长公共子串
var stringA = 'aswdsfhhhhhhhh1111221222222222000000'
var stringB = 'aswdsfhhhh2hhhh111121ssd22122222222dsd2000000'
function dynamicProgram2 (stringA, stringB) {
  const listA = stringA.split('')
  const listB = stringB.split('')
  const maxPoint = {
    x: -1,
    y: -1,
    value: 0,
    total: 0
  }
  const matrix = []
  for(let i = 0;i < listA.length; i++) {
    matrix[i] = new Array()
    for (let j=0; j < listB.length; j++) {
      const topV = matrix[i-1] && matrix[i-1][j-1] || 0
      if (listA[i] === listB[j]) {
        matrix[i][j] = topV + 1
      } else {
        matrix[i][j] = 0
      }
      if (matrix[i][j] > maxPoint.value) {
        maxPoint.x = i
        maxPoint.y = j
        maxPoint.value = matrix[i][j]
        maxPoint.total = 1
      } else if (matrix[i][j] === maxPoint.value){
        maxPoint.total += 1
      }
    }
  }
  return { matrix, maxPoint }
}
const res = dynamicProgram2(stringA, stringB)
```


















