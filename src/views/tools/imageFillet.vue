<template>
  <div class="image-fillet-wapper">
    <sys-title title="在线图片处理"></sys-title>
    <div class="image-fillet-content">
      <a-form layout="inline" :model="formState" class="image-fillet--form">
        <a-row class="image-fillet--form-item">
          <span class="image-fillet--form-item-label">添加水印</span>
          <a-form-item label="水印">
            <a-input v-model:value="formState.watermark" placeholder="为空时不添加水印" allowClear/>
          </a-form-item>
          <a-form-item label="倾斜角">
            <a-input-number v-model:value="formState.angle" />
          </a-form-item>
          <a-form-item label="颜色">
            <el-color-picker v-model="formState.color" show-alpha size="mini" />
          </a-form-item>
        </a-row>
        <a-row class="image-fillet--form-item">
          <span class="image-fillet--form-item-label">图片类型</span>
            <a-form-item label="图片类型">
              <a-switch checked-children="圆形图片" un-checked-children="圆角图片" v-model:checked="formState.isCircle" />
            </a-form-item>
            <a-form-item label="圆角尺寸">
              <a-input-number v-model:value="formState.filletSize" :disabled="formState.isCircle"/>
            </a-form-item>
        </a-row>
        <a-form-item>
          <a-button type="primary" style="margin-right: 12px;" @click="transferImage">图片转换</a-button>
          <a-button type="default" @click="downImage">图片下载</a-button>
        </a-form-item>
      </a-form>
      <div class="image-fillet--upload">
        <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :customRequest="customRequest"
          :disabled="isDisabled"
          title="点击上传图片"
          accept="image/*"
        >
          <canvas v-if="imageUrl" id="previewCanvas" :width="canvasWidth" :height="canvasHeight" />
          <div v-else class="upload-icon">
            <loading-outlined v-if="loading"></loading-outlined>
            <inbox-outlined v-else></inbox-outlined>
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
import { InboxOutlined, LoadingOutlined  } from '@ant-design/icons-vue';
import { ElColorPicker } from 'element-plus'
import { getBase64, drawCircleImage, drawFilletImage, clearCanvas } from './utils'
import { saveAs } from 'file-saver'
import watermark from './watermark'

export default {
  name: 'Tools',
  components: { InboxOutlined, LoadingOutlined, ElColorPicker },
  setup: () => {
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    const isDisabled = ref(false)
    const fileList = ref([])
    const loading = ref(false)
    const imageUrl = ref('')
    const radius = ref(200)
    const canvasWidth = ref(200)
    const canvasHeight = ref(200)
    const formState = reactive({
      isCircle: false,
      filletSize: 50,
      watermark: '',
      color: 'rgba(66, 65, 118, 0.36)',
      angle: 30
    });
    let cv, ctx;
    
    const beforeUpload = (file) => {
      // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      // if (!isJpgOrPng) {
      //   $message.error('仅支持JPG格式！')
      // }
      const isLt8M = file.size / 1024 / 1024 < 8
      if (!isLt8M) {
        $message.error('图片大小不能超过8MB！')
      }
      return isLt8M
    }

    const customRequest = async (file) => {
      loading.value = true

      imageUrl.value = await getBase64(file.file)
      const initImg = new Image()
      initImg.src = imageUrl.value
      initImg.onload = function(){
        $message.info('width:'+initImg.width+',height:'+initImg.height)

        canvasWidth.value = initImg.width
        canvasHeight.value = initImg.height
        radius.value = Math.floor(Math.min(initImg.width, initImg.height) / 2 - 2)
        
        nextTick(() => {
          cv = document.getElementById('previewCanvas')
          ctx = cv.getContext("2d")
          if (formState.isCircle) {
            drawCircleImage(ctx, initImg, canvasWidth.value / 2, canvasHeight.value / 2, radius.value)
          } else {
            drawFilletImage(ctx, initImg, canvasWidth.value, canvasHeight.value, 0, 0, formState.filletSize)
          }
          loading.value = false
        })
      }
    }

    const transferImage = () => {
      if (!imageUrl.value) {
        $message.info('请上传图片！')
        return
      }
      if (!ctx) {
          cv = document.getElementById('previewCanvas')
          ctx = cv.getContext("2d")
      }
      const transferImg = new Image()
      transferImg.src = imageUrl.value
      transferImg.onload = function(){
        nextTick(() => {
          clearCanvas(cv, canvasWidth.value, canvasHeight.value)
          if (formState.isCircle) {
            drawCircleImage(ctx, transferImg, transferImg.width/2, transferImg.height / 2, radius.value)
          } else {
            drawFilletImage(ctx, transferImg, canvasWidth.value, canvasHeight.value, 0, 0, formState.filletSize)
          }
          if (formState.watermark) {
            const wm = new watermark({ctx, text: formState.watermark, x: canvasWidth.value/2, y: canvasHeight.value / 2, fillStyle: formState.color, isRepeat: true, angle: formState.angle })
            wm.drawWatermark()
          }
        })
      }
    }

    const downFile = () => {
      if (!cv && !imageUrl.value) return
      saveAs(cv.toDataURL('image.png'), 'download.png')
    }

    const downImage = () => {
      if (!imageUrl.value) {
        $message.info('请上传图片！')
        return
      }
      if (!ctx) {
        cv = document.getElementById('previewCanvas')
        ctx = cv.getContext("2d")
      }

      const downImg = new Image()
      downImg.src = imageUrl.value
      downImg.onload = function (){
        nextTick(() => {
          clearCanvas(cv, canvasWidth.value, canvasHeight.value)
          if (formState.isCircle) {
            drawCircleImage(ctx, downImg, downImg.width/2, downImg.height / 2, radius.value)
          } else {
            drawFilletImage(ctx, downImg, canvasWidth.value, canvasHeight.value, 0, 0, formState.filletSize)
          }
          if (formState.watermark) {
            const wm = new watermark({ctx, text: formState.watermark, x: downImg.width/2, y: downImg.height / 2, fillStyle: formState.color, isRepeat: true, angle: formState.angle })
            wm.drawWatermark(downFile)
          } else {
            downFile()
          }

        })
      }
    }

    return {
      isDisabled,
      radius,
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
      formState,
      loading,
      fileList,
      imageUrl,
      canvasWidth,
      canvasHeight,
      beforeUpload,
      customRequest,
      transferImage,
      downImage
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.image-fillet-wapper {
  width: 100%;

  .image-fillet--form {
    margin-bottom: 4px;
  }

  .image-fillet--form-item {
    position: relative;
    padding: 12px 8px 8px;
    margin: 0 8px 16px 0;
    border: 1px solid #{$borderColorLight};
  }

  .image-fillet--form-item-label {
    position: absolute;
    top: -14px;
    left: 8px;
    padding: 0 8px;
    font-weight: bold;
    background: #fff;
  }
  // .image-fillet--form-item::after {
  //   content: '水印'
  // }

  .image-fillet--upload {
    width: 100%;
    text-align: center;
    border-top: solid 1px #{$borderColorLight};
    border-bottom: solid 1px #{$borderColorLight};

    .avatar-uploader {
      width: calc(90% - 32px);
      vertical-align: bottom;
      text-align: center;
    }
  }
}

:deep .ant-upload.ant-upload-select-picture-card {
  margin: 20px auto;
  color: #666;
  width: 100%;
  max-width: 1200px;
  min-height: 360px;
  max-height: 840px;
  float: none;

  .upload-icon {
    font-size: 48px;
    color: #40a9ff;

    .ant-upload-text {
      color: #999;
      font-size: 32px;
    }
  }

  #previewCanvas {
    max-width: 100%;
    max-height: 100%;
  }
  img, canvas {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>