<template>
  <div class="components-container">
    <sys-title title="在线生成二维码"></sys-title>
    <div class="create-qrcode-container">
      <a-row class="create-qrcode__form">
        <a-form layout="inline" :model="formState" class="image-fillet--form">
          <a-form-item label="纠错级别">
            <a-select
              ref="select"
              v-model:value="formState.correctLevel"
              style="width: 120px"
              :options="correntLevelOptions"
            >
            </a-select>
          </a-form-item>
          <a-form-item label="尺寸">
            <a-input-number v-model:value="formState.size" :min="40" :max="500" />
          </a-form-item>
          <a-form-item label="前景色">
            <el-color-picker v-model="formState.frontColor" show-alpha size="mini" />
          </a-form-item>
          <a-form-item label="背景色">
            <el-color-picker v-model="formState.bgColor" show-alpha size="mini" />
          </a-form-item>
          <a-form-item>
            <a-button :loading="loading" type="primary" style="margin-right: 12px;" @click="onCreateQrcode">生成二维码</a-button>
            <a-button :loading="downLoading" type="default" @click="onDownloadQrcode">
            <template #icon>
              <DownloadOutlined />
            </template>
            下载二维码</a-button>
            <!-- <a-button type="default" @click="onClear">清除</a-button> -->
          </a-form-item>
        </a-form>
      </a-row>

      <a-divider style="border-color: #7cb305" dashed />

      <a-row class="create-qrcode__content">
        <a-form layout="vertical" class="cqc__form">
          <a-form-item label="链接或文本" class="qrcode-form-item">
            <a-textarea v-model:value="formState.inputUrl" placeholder="输入链接或文本，不超过500字" :rows="16" allowClear/>
          </a-form-item>
          <div class="space"></div>
          <a-form-item label="二维码" class="qrcode-form-item">
            <section class="qrcode">
              <div id="qrcodeCanvas" ref="qrcodeCanvas"></div>
            </section>
          </a-form-item>
        </a-form>
      </a-row>
    </div>
  </div>
</template>

<script>
import { DownloadOutlined } from '@ant-design/icons-vue'
import { reactive, readonly, onMounted, nextTick, ref, getCurrentInstance } from 'vue'
import { ElColorPicker } from 'element-plus'
import QRCode from 'qrcodejs2'
import { saveAs } from 'file-saver'

export default {
  name: 'CreateQrcodeView',
  components: {
    DownloadOutlined,
    ElColorPicker
  },
  setup() {
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    // const goomeQrcodeLogo = require('@/assets/goome_qrcode_logo.jpg')
    const correntLevelOptions = readonly([
      { label: 'L（低级）', value: QRCode.CorrectLevel.L },
      { label: 'M（中级）', value: QRCode.CorrectLevel.M },
      { label: 'Q（四分之一）', value: QRCode.CorrectLevel.Q },
      { label: 'H（高级）', value: QRCode.CorrectLevel.H },
    ])
    const formState = reactive({
      inputUrl: '',
      size: 128,
      frontColor: '#000000',
      bgColor: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    })
    const loading = ref(false)
    const downLoading = ref(false)
    let qrcodeImgData = null

    const createQtcode = (url) => {
      if (!url) {
        $message.info('请输入链接或文本！')
        return
      }
      const qrcode = new QRCode('qrcodeCanvas', {
        text: `${url}`,
        width: formState.size,
        height: formState.size,
        correctLevel : formState.correctLevel,
        colorDark : formState.frontColor,
        colorLight : formState.bgColor,
      })
      qrcode.clear() //清除二维码 
      qrcode.makeCode(url) //生成另一个新的二维码
      // 存放二维码资源，方便下载
      qrcodeImgData = qrcode._oDrawing._elCanvas.toDataURL("image/png")
    }

    const onCreateQrcode = function() {
      loading.value = true
      nextTick(() => {
        document.getElementById('qrcodeCanvas').innerHTML = ''
        createQtcode(formState.inputUrl)
        loading.value = false
      })
    }

    const onDownloadQrcode = function() {
      downLoading.value = true
      nextTick(() => {
        document.getElementById('qrcodeCanvas').innerHTML = ''
        createQtcode(formState.inputUrl)
        saveAs(qrcodeImgData, 'download.png')
        downLoading.value = false
      })
    }

    onMounted(() => {
      document.getElementById('qrcodeCanvas').innerHTML = ''
      createQtcode('demo')
    })

    return {
      correntLevelOptions,
      formState,
      loading,
      downLoading,
      onCreateQrcode,
      onDownloadQrcode
    }
  }
}
</script>

<style lang="scss" scoped>
.create-qrcode-container {
  position: relative;
  padding: 16px;
  height: 100%;
  background: #fff;
}

.create-qrcode__content {

  .cqc__form {
    display: flex;
    width: 96%;
    justify-content: space-between;

    .space {
      width: 16px;
    }
    .qrcode-form-item {
      justify-content: center;
      flex: 1;
    }
  }

  .qrcode {
    background-color: #eee;
    border: 1px solid #ccc;
    text-align: center;
    min-height: 360px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>

