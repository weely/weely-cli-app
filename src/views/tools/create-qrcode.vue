<template>
  <div class="components-container">
    <sys-title title="在线生成二维码"></sys-title>
    <div class="cqr">
      <div class="cqr__content">
        <div class="cqr__item">
          <label for="inputUrl">链接或文本</label>
          <a-textarea id="inputUrl" v-model:value="formState.inputUrl" placeholder="输入链接或文本，不超过500字" allowClear class="cqr-i" />
        </div>
        <div class="space"></div>
        <div class="cqr__form">
          <div></div>
        <!-- inline,vertical, horizontal -->
          <a-form layout="horizontal" :model="formState" class="qrcode-form cqr-i" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
            <a-form-item label="纠错级别">
              <a-select
                ref="select"
                v-model:value="formState.correctLevel"
                :options="correntLevelOptions"
                class="qr-form-item"
              >
              </a-select>
            </a-form-item>
            <a-form-item label="maskPattern">
              <a-select
                ref="select"
                v-model:value="formState.maskPattern"
                class="qr-form-item"
              >
                <a-select-option v-for="i in 8" :key="i" :value="i-1">{{i-1}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="边距">
              <a-select
                ref="select"
                v-model:value="formState.margin"
                class="qr-form-item"
              >
                <a-select-option v-for="i in 17" :key="i" :value="i-1">{{i-1}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="尺寸">
              <a-select
                ref="select"
                v-model:value="formState.size"
                class="qr-form-item"
              >
                <a-select-option value="50">50px</a-select-option>
                <a-select-option value="100">100px</a-select-option>
                <a-select-option value="200">200px</a-select-option>
                <a-select-option value="400">400px</a-select-option>
                <a-select-option value="500">500px</a-select-option>
                <a-select-option value="1000">1000px</a-select-option>
                <a-select-option value="2000">2000px</a-select-option>
              </a-select>
            </a-form-item>
            <!-- <a-form-item label="尺寸">
              <a-select
                ref="select"
                v-model:value="formState.segments"
                class="qr-form-item"
              >
                <a-select-option value="alphanumeric">Alphanumeric</a-select-option>
                <a-select-option value="Numeric">Numeric</a-select-option>
                <a-select-option value="byte">Byte</a-select-option>
              </a-select>
            </a-form-item> -->
            <a-form-item label="前景色">
              <el-color-picker v-model="formState.frontColor" size="mini" color-format="hex" class="qr-form-item" />
            </a-form-item>
            <a-form-item label="背景色">
              <el-color-picker v-model="formState.bgColor" size="mini" color-format="hex" class="qr-form-item"/>
            </a-form-item>
            <a-space direction="vertical" style="width: 100%;">
              <a-button type="primary" @click="onCreateQrcode" style="width: 100%;">生成二维码</a-button>
              <a-button type="default" @click="onDownloadQrcode" style="width: 100%;">
                <template #icon>
                  <DownloadOutlined />
                </template>下载二维码</a-button>
            </a-space>

          </a-form>
        </div>
        <div class="space"></div>
        <div class="cqr__item">
          <label>二维码</label>
          <section class="qrcode cqr-i">
            <canvas id="qrcodeCanvas" ref="qrcodeCanvas" style="max-width: 400px;max-height: 400px;"></canvas>
            <!-- <img id="qrcodeLogo" :src="goomeQrcodeLogo" class="logo"> -->
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import 'element-plus/es/components/base/style/css'
// import 'element-plus/theme-chalk/el-progress.css'
import { DownloadOutlined } from '@ant-design/icons-vue'
import { reactive, readonly, onMounted, nextTick, ref, getCurrentInstance } from 'vue'
import { ElColorPicker } from 'element-plus'
import QRCode from 'qrcode'
import { saveAs } from 'file-saver'
import { drawFilletImage, clearCanvas, getBase64 } from './utils'
// import watermark from './watermark'

export default {
  name: 'CreateQrcodeView',
  components: {
    DownloadOutlined,
    ElColorPicker
  },
  setup() {
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    const goomeQrcodeLogo = require('@/assets/goome_qrcode_logo.jpg')
    const correntLevelOptions = readonly([
      { label: 'L（低级）', value: 'L' },
      { label: 'M（中级）', value: 'M' },
      { label: 'Q（四分之一）', value: 'Q' },
      { label: 'H（高级）', value: 'H' },
    ])
    const formState = reactive({
      inputUrl: 'demo',
      size: 1000,
      frontColor: '#000000',
      bgColor: '#ffffff00',
      correctLevel: 'L',
      modules: '',
      margin: 1,
      maskPattern: 0,
      // bgTransparency: 100,
      // segments: 'byte',
    })

    const generateQR = async (text) => {
      try {
        if (!text) {
          $message.info('请输入链接或文本！')
          return Promise.reject(false)
        }
        const options = {
          text: `${text}`,
          width: formState.size,
          height: formState.size,
          margin: formState.margin,
          maskPattern: formState.maskPattern,
          // version: formState.version,
          // scale: formState.scale,
          // segments: formState.segments,
          // modules: '',
          color: {
            dark : formState.frontColor,
            light: formState.bgColor,
          },
          errorCorrectionLevel : formState.correctLevel,

        }
        const qrcodeDataUrl = await QRCode.toDataURL(text, options)
        return Promise.resolve(qrcodeDataUrl)
      } catch (err) {
        console.error(err)
        return Promise.reject(false)
      }
    }

    const onCreateQrcode = function() {
      nextTick(async () => {
        // document.getElementById('qrcodeCanvas').innerHTML = ''
        const dataUrl = await generateQR(formState.inputUrl)

        const tempImg = new Image()
        tempImg.src = dataUrl
        tempImg.onload = function(){

          $message.info('width:'+tempImg.width+',height:'+tempImg.height)
          const canvasWidth = tempImg.width
          const canvasHeight = tempImg.height
          nextTick(() => {

            const cv = document.getElementById('qrcodeCanvas')
            const ctx = cv.getContext("2d")
            clearCanvas(cv, canvasWidth, canvasHeight)
            drawFilletImage(ctx, tempImg, canvasWidth, canvasHeight, 0, 0, 0)
          })
        }
      })
    }

    const onDownloadQrcode = function() {
      nextTick(async () => {
        const qrcodeDataUrl = await generateQR(formState.inputUrl)
        saveAs(qrcodeDataUrl, 'download.png')
        // const qrcodeLogo = document.getElementById('qrcodeLogo')
        // // getBase64()
        // const cv = document.getElementById('qrcodeCanvas')
        // const ctx = cv.getContext("2d")
        // const transferImg = new Image()
        // transferImg.src = qrcodeDataUrl
        // transferImg.onload = function(){
        //   clearCanvas(cv, cv.width, cv.height)
        //   ctx.drawImage(qrcodeLogo, cv.width/2, cv.height/2, 100,  100)
        //   saveAs(cv.toDataURL('image.png'), 'download.png')
        // }
      })
    }

    onMounted(() => {
      generateQR('demo')
    })

    return {
      goomeQrcodeLogo,
      correntLevelOptions,
      formState,
      onCreateQrcode,
      onDownloadQrcode
    }
  }
}
</script>

<style lang="scss" scoped>
.cqr {
  position: relative;
  padding: 16px;
  height: 100%;
  background: #fff;

  &__content {
    display: flex;
    width: 90%;
    min-width: 640px;
    justify-content: space-between;
  }

  .space {
    width: 16px;
  }

  &__item {
    justify-content: center;
    flex: 1;

    & > label {
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
    }
  }

  &__form {
    padding-top: 22px;
    .qrcode-form {
      width: 224px;
      padding: 12px;
      border: solid 1px #ccc;
    }

    .qr-form-item {
      width: 120px;
    }
  }

  :deep {
    .qr-form-item.el-color-picker--mini {
      width: 120px;
    }
    .el-color-picker--mini .el-color-picker__trigger {
      width: 100% !important;
    }

    .qrcode-form .ant-form-item-label {
      margin-right: 12px;
    }

    .ant-form-item-label > label {
      text-align: justify;
      line-height: 32px;
      float: left;
      display: block;
      width: 100%;
      white-space: normal;
    }
    .ant-form-item-label > label::after {
      content: ':';
      height: 0px;
      width: 100%;
      overflow: hidden;
      display: inline-block;
    }
  }
  .cqr-i {
    height: 500px;
  }
  .qrcode {
    background-color: #eee;
    border: 1px solid #ccc;
    text-align: center;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img.logo {
      position: absolute;
      width: 50px;
      height: 50px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

</style>
