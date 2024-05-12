
Function.prototype.MyCall = function(ctx, ...args){
    const fn = Symbol('fn')
    ctx[fn] = this
    const res = args ? ctx[fn](...args) : ctx[fn]()

    delete ctx[fn]

    return res
}

function fn1(a,b){
    console.log(a + b)
}

const b = {}
  
//   fn1.call(b,1,2)
// fn1.MyCall(b,1,2)

function myNew(Func, ...args){
    // 1.创建一个对象
    const obj = {}
    // 2.新对象原型__proto__指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构造函数this指向新对象
    const res = Func.apply(obj, args)
    // 4.如果构造函数未返回对象，则返回this
    return res instanceof Object ? res : obj
}

function func1(){
    getName = function(){
        console.log(4)
    }
    return this
}
func1.getName = function(){
    console.log(3)
}
func1.prototype.getName = function(){
    console.log(5)
}
var getName = function(){
    console.log(1)
}

function getName(){
    console.log(2)
}

// func1.getName()
// getName()
// func1()
// getName()
// new func1().getName()
// new new func1().getName()



function recurTree(tree, res=[]) {
    if(tree.length <= 0) {
        return res
    }
    for(let item of tree){
        console.log(item.value)
        if (item.child) {
            recurTree(item.child, res)
        }
    }
}

recurTree([
    {
        value: 1,
        child: [
            {
                value: 12,
                child: [
                    {
                        value: 121
                    },
                    {
                        value: 122
                    },
                    {
                        value: 123
                    }
                ]
            },
            {
                value: 13,
                child: [
                    {
                        value: 131
                    },
                ]
            }
        ]
    },
    {
        value: 2,
        child: [
            {
                value: 22,
                child: [
                    {
                        value: 221
                    },
                    {
                        value: 222
                    },
                ]
            },
            {
                value: 23,
                child: [
                    {
                        value: 231
                    },
                ]
            }
        ]
    }
])