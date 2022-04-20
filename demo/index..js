
function c(){
  let { b } = require('./a.js')
  b = b + 1
  console.log(b + 1)
}

function c2(){
  b1 = b1 + 1
  console.log(b1 + 1)
}

c()
c()
