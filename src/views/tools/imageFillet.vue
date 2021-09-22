<template>
  <div class="image-fillet-wapper">
    <sys-title title="图片圆角处理"></sys-title>
    <div class="image-fillet-content">
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
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <upload-outlined v-else></upload-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
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

    const fileList = ref([]);
    const loading = ref(false)
    const imageUrl = ref('');
    
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
.image-fillet-wapper {
  width: 100%;
}

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>