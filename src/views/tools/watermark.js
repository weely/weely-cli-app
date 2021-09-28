class watermark {
  constructor({ctx, text, x, y, fillStyle, isRepeat, fontSize, angle}) {
    this.ctx = ctx
    this.fillStyle = fillStyle
    this.font = "microsoft yahei"
    this.fontSize = fontSize || 30
    this.angle = angle || 45
    this.angle = Math.min(angle, 360)
    this.text = text
    this.watermarkIcon = null

    this.x = x || 0
    this.y = y || 0
    this.isRepeat = isRepeat || true
    this.width = 40
    this.height = this.fontSize
    
    // this.setWatermarkIcon()
  }

  /**
   * 生成单个水印文案图
   * @returns 
   */
  setWatermarkIcon() {
    const _canvas = document.createElement('canvas')
    const _ctx = _canvas.getContext('2d')
    // 设置初始字体，方便measureText方法获取准确宽度
    _ctx.font = `${this.fontSize}px ${this.font}`
    // 设置背景透明
    // 获取文字像素宽度
    const width = Math.ceil(_ctx.measureText(this.text).width) + 8
    // const height = this.fontSize
    // 设置canvas宽高
    _canvas.width = width + 40
    _canvas.height = _canvas.width
    _canvas.style.background = 'rgba(255,255,255,0)'
    // 由于canvas宽高变化后会清空样式，所以字体样式需要重新设置
    _ctx.fillStyle = this.fillStyle
    _ctx.font = `${this.fontSize}px ${this.font}`
    // 中心点转移到canvas中心
    _ctx.translate(_canvas.width / 2,_canvas.height / 2);
    _ctx.rotate(this.angle * Math.PI / 180)

    _ctx.fillText(this.text, -_canvas.width/2 + 20, 0)
    this.watermarkIcon = _canvas.toDataURL('image.png')

    this.width = _canvas.width
    this.height = _canvas.height
  }

  getWatermarkIcon() {
    return this.watermarkIcon
  }

  async drawWatermark(callback) {
    if (!this.watermarkIcon) {
      this.setWatermarkIcon()
    }
    const { ctx, watermarkIcon, x, y, width, height } = this
    if (this.isRepeat) {
      const img = new Image()
      img.src = watermarkIcon
      img.onload = function(){
        const pat = ctx.createPattern(img, "repeat")
        ctx.fillStyle=pat
        ctx.fill()
        callback && callback()
      }
    } else {
      ctx.drawImage(watermarkIcon, x, y, width,  height)
    }
  }
}

export default watermark;
