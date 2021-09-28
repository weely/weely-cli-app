<template>
  <div class="image-fillet-wapper">
    <sys-title title="图片圆角处理"></sys-title>
    <div class="image-fillet-content">
      <a-form layout="inline" :model="formState" class="image-fillet--form">
        <a-form-item label="圆角尺寸">
          <a-input v-model:value="formState.filletSize" />
        </a-form-item>
        <a-form-item label="水印文案">
          <a-input v-model:value="formState.watermark" />
        </a-form-item>
        <a-form-item label="水印颜色">
          <el-color-picker v-model="formState.color" show-alpha size="small" />
        </a-form-item>
        <a-form-item label="字体角度">
          <a-input v-model:value.number="formState.angle" />
        </a-form-item>
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
import { getBase64, drawCircleImage } from './utils'
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
      filletSize: 50,
      watermark: 'weely.cc',
      color: 'rgba(66, 65, 118, 0.36)',
      angle: 45
    });
    let cv, ctx;
    
    const beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        $message.error('仅支持JPG格式！')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        $message.error('图片大小不能超过2MB！')
      }
      return isJpgOrPng && isLt2M
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
          drawCircleImage(ctx, initImg, canvasWidth.value / 2, canvasHeight.value / 2, radius.value)
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
          ctx.clearRect(0,0,canvasWidth.value, canvasHeight.value)

          drawCircleImage(ctx, transferImg, transferImg.width/2, transferImg.height / 2, radius.value)
          const wm = new watermark({ctx, text: formState.watermark, x: canvasWidth.value/2, y: canvasHeight.value / 2, fillStyle: formState.color, isRepeat: true, angle: formState.angle })
          wm.drawWatermark()
        })
      }
    }

    const downFile = () => {
      if (!cv && !imageUrl.value) return
      saveAs(cv.toDataURL('image.png'))
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
          ctx.clearRect(0,0,canvasWidth.value, canvasHeight.value)
          drawCircleImage(ctx, downImg, downImg.width/2, downImg.height / 2, radius.value)
          const wm = new watermark({ctx, text: formState.watermark, x: downImg.width/2, y: downImg.height / 2, fillStyle: formState.color, isRepeat: true, angle: formState.angle })
          wm.drawWatermark(downFile)
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
    margin-bottom: 20px;
  }

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