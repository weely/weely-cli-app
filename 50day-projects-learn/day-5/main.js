const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

window.onload = function(){
  const bg = document.querySelector('.bg')
  const loadingTxtNode = document.getElementById('loading-text')
  let percent = 0
  const timer = setInterval(() => {
    percent++
    loadingTxtNode.innerHTML = percent + '%'
    loadingTxtNode.style.opacity = scale(percent, 0, 100, 1, 0)
    bg.style.filter = `blur(${scale(percent, 0, 100, 30, 0)}px)`
    if (percent >= 100) {
      clearInterval(timer)
    }
  }, 20)
}