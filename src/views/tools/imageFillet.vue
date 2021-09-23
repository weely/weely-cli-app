<template>
  <div class="image-fillet-wapper">
    <sys-title title="图片圆角处理"></sys-title>
    <div class="image-fillet-content">
      <a-form :model="formState" :wrapper-col="wrapperCol">
        <a-form-item label="圆角尺寸">
          <a-input v-model:value="formState.filletSize" />
        </a-form-item>
        <a-form-item label="水印文字">
          <a-input v-model:value="formState.watermark" />
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
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
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
import { ref, reactive, getCurrentInstance } from 'vue'
import { UploadOutlined, LoadingOutlined  } from '@ant-design/icons-vue';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}

export default {
  name: 'Tools',
  components: { UploadOutlined, LoadingOutlined  },
  setup: () => {
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    const fileList = ref([])
    const loading = ref(false)
    const imageUrl = ref('')
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
        loading.value = true
        return
      }
      if (info.file.status === 'done') {
        console.log('---done---')
        // Get this url from response in real world.
        getBase64(info.file.originFileObj).then((fileUrl) => {
          imageUrl.value = fileUrl
          loading.value = false
        })
      }
      if (info.file.status === 'error') {
        getBase64(info.file.originFileObj).then((fileUrl) => {
          imageUrl.value = fileUrl
          loading.value = false
        })
        $message.error('上传失败！')
      }
    }

    const customRequest = async (file) => {
      console.log('---preview---', file)
      if (!file.url && !file.preview) {
        imageUrl.value = await getBase64(file.file)
        loading.value = false
      }
    }

    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
      formState,
      loading,
      fileList,
      imageUrl,
      handleChange,
      beforeUpload,
      customRequest
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.image-fillet-wapper {
  width: 100%;

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

  img, canvas {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>