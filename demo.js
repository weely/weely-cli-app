const { SHA256, enc } = require('crypto-js')

function encryBas464Sha256(str) {
    return enc.Base64.stringify(SHA256(str)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

const randomStr = '1111111111111213123131231sdaasd12aadfsadf23fasdvasvsafsadfqer23fdfasdcsdc'

console.log(encryBas464Sha256(randomStr))