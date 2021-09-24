<template>
  <div class="image-fillet-wapper">
    <sys-title title="图片圆角处理"></sys-title>
    <div class="image-fillet-content">
      <a-form layout="inline" :model="formState" class="image-fillet--form">
        <a-form-item label="圆角尺寸">
          <a-input v-model:value="formState.filletSize" />
        </a-form-item>
        <a-form-item label="水印文字">
          <a-input v-model:value="formState.watermark" />
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
          @change="handleChange"
        >
          <canvas v-if="imageUrl" id="previewCanvas" :width="canvasWidth" :height="canvasHeight" />
          <div v-else class="upload-icon">
            <loading-outlined v-if="loading"></loading-outlined>
            <upload-outlined v-else></upload-outlined>
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
import { UploadOutlined, LoadingOutlined  } from '@ant-design/icons-vue';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}

function drawCircleImage(ctx, img, x, y, radius) {
  const d = radius * 2
  const cx = (+x + radius > d) ? x : (x + radius)
  const cy = (+y + radius > d) ? y : (x + radius)

  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, 2*Math.PI)
  ctx.strokeStyle = '#000000'
  ctx.stroke()
  ctx.clip()

  ctx.drawImage(img, 0, 0, cx + radius, cy + radius)
}

export default {
  name: 'Tools',
  components: { UploadOutlined, LoadingOutlined },
  setup: () => {
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    const fileList = ref([])
    const loading = ref(false)
    const imageUrl = ref('')
    const radius = ref(200)
    const canvasWidth = ref(200)
    const canvasHeight = ref(200)
    const formState = reactive({
      filletSize: 50,
      watermark: ''
    });
    
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

    const handleChange = (info) => {
      console.log('---start---', info)

      if (info.file.status === 'uploading') {
        console.log('---uploading---')
        loading.value = true
        return
      }
      if (info.file.status === 'done') {
        console.log('---done---')
        getBase64(info.file.originFileObj).then((fileUrl) => {
          imageUrl.value = fileUrl
          loading.value = false
        })
      }
      if (info.file.status === 'error') {
        $message.error('上传失败！')
      }
    }

    const customRequest = async (file) => {
      loading.value = true

      imageUrl.value = await getBase64(file.file)
      const img = new Image()
      img.src = imageUrl.value
      img.onload = function(){
        $message.info('width:'+img.width+',height:'+img.height)

        canvasWidth.value = img.width
        canvasHeight.value = img.height
        radius.value = Math.floor(Math.min(img.width, img.height) / 2 - 2)
        
        nextTick(() => {
          const cv = document.getElementById('previewCanvas')
          const ctx = cv.getContext("2d")

          drawCircleImage(ctx, img, img.width/2, img.height / 2, radius.value)
          loading.value = false
        })
      }
    }

    const transferImage = () => {
      console.log('转换图片')
    }

    const downImage = () => {
      console.log('下载图片')
    }

    return {
      radius,
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
      formState,
      loading,
      fileList,
      imageUrl,
      canvasWidth,
      canvasHeight,
      handleChange,
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

::v-deep .ant-upload.ant-upload-select-picture-card {
  margin: 20px auto;
  color: #666;
  width: 100%;
  max-width: 1200px;
  min-height: 400px;
  max-height: 840px;
  float: none;

  .upload-icon {
    font-size: 32px;
    color: #999;
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