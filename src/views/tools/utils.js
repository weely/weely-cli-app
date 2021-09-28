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
  ctx.strokeStyle = '#ffffff'
  ctx.stroke()
  ctx.clip()

  ctx.drawImage(img, 0, 0, cx + radius, cy + radius)

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
