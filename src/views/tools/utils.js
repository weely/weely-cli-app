/**
 * 获取文件base64
 * @param {*} file 
 * @returns 
 */
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}

/**
 * 绘制圆形图片
 * @param {*} ctx 
 * @param {*} img 
 * @param {*} x 
 * @param {*} y 
 * @param {*} radius 
 */
export function drawCircleImage(ctx, img, x, y, radius) {
  const d = radius * 2
  const cx = (+x + radius > d) ? x : (x + radius)
  const cy = (+y + radius > d) ? y : (x + radius)

  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, 2*Math.PI)
  ctx.strokeStyle = 'rgba(0,0,0,0)'
  ctx.stroke()
  ctx.clip()

  ctx.drawImage(img, 0, 0, cx + radius, cy + radius)
}

/**
 * 绘制圆角矩形图片
 * @param {*} ctx 
 * @param {*} img 
 * @param {*} width 
 * @param {*} height 
 * @param {*} x 
 * @param {*} y 
 * @param {*} radius 
 */
export function drawFilletImage(ctx, img, width, height, x, y, radius) {
  const x11 = x + radius
  const y11 = y
  const x12 = x + width - radius
  const y12 = y
  const x21 = x + width
  const y21 = y + radius
  const x22 = x + width
  const y22 = y + height - radius
  const x31 = x + width - radius
  const y31 = y + height
  const x32 = x + radius
  const y32 = y + height
  const x41 = x
  const y41 = y + height - radius
  const x42 = x
  const y42 = y + radius

  ctx.beginPath()
  ctx.moveTo(x11, y11)
  ctx.lineTo(x12, y12)
  ctx.arcTo(x22, y12, x21, y21, radius)
  ctx.lineTo(x22, y22)
  ctx.arcTo(x22, y31, x31, y31, radius)
  ctx.lineTo(x32, y32)
  ctx.arcTo(x42, y32, x41, y41, radius)
  ctx.lineTo(x42, y42)
  ctx.arcTo(x, y, x11, y11, radius)
  ctx.strokeStyle = 'rgba(0,0,0,0)'
  ctx.stroke()

  ctx.clip()

  ctx.drawImage(img, 0, 0, width, height)
}

/**
 * 清空重置画布
 * @param {*} cv 
 * @param {*} canvasWidth 
 * @param {*} canvasHeight
 */
export function clearCanvas(cv, canvasWidth, canvasHeight) {
  cv.width = canvasWidth
  cv.height = canvasHeight
  // 尝试了以下两方法，需要使用clip重置剪切也不行
  // ctx.rect(0,0,canvasWidth,canvasHeight)
  // ctx.stroke()
  // ctx.fillStyle = '#ffffff'
  // ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  // ctx.clip()
  // 直接清除，尝试了也不行
  // ctx.clearRect(0,0,canvasWidth, canvasHeight)
}

/**
 * 绘制水印字体
 * addWatermark(ctx, formState.watermark, img.width/2, img.height / 2, formState.color)
 * @param {*} ctx: canvas实例对象
 * @param {*} text: 水印文案
 * @param {*} x: x坐标
 * @param {*} y: y坐标
 * @param {*} maxWidth: 最大字体宽度 
 */
export function addWatermark(ctx, text, x, y, fillStyle='rgba(256,256,256,0.6)') {
  ctx.font="30px microsoft yahei"
  ctx.fillStyle = fillStyle
  ctx.fillText(text, x, y)
  // ctx.fillText(text, x, y, [maxWidth])
}
