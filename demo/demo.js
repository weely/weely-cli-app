<<<<<<< HEAD
const { SHA256, enc } = require('crypto-js')

function encryBas464Sha256(str) {
    return enc.Base64.stringify(SHA256(str)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

const randomStr = '1111111111111213123131231sdaasd12aadfsadf23fasdvasvsafsadfqer23fdfasdcsdc'

console.log(encryBas464Sha256(randomStr))
=======
var stringA = 'hh1'
var stringB = 'h2h'

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

  console.log(matrix)
  console.log(maxPoint)

  return maxPoint
}
const maxPoint = dynamicProgram2(stringA, stringB)
>>>>>>> 3d3f38cd2739999f8b425738fd714a08d22a41f0
