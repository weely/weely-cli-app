<template>
  <div class="main-page">
    <sys-title title="编码/解码"></sys-title>
    <div class="page__content">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-textarea v-model:value="input" placeholder="输入" :rows="10" />
        </a-col>
        <a-col :span="12">
          <a-textarea v-model:value="output" placeholder="结果" :rows="10"/>
        </a-col>
      </a-row>

      <a-Space style="margin-top: 16px;">
        <a-button @click="base64Encode">base64编码</a-button>
        <a-button @click="base64Decode">base64解码</a-button>
        <a-button @click="toMd5">md5加密</a-button>
      </a-Space>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Base64 } from 'js-base64'
import md5 from 'md5'

export default {
  name: 'enc',
  setup: () => {
    const input = ref('')
    const output = ref('')

    const base64Encode = () => {
      output.value = Base64.encode(input.value)
    }
    const base64Decode = () => {
      input.value = Base64.decode(output.value)
    }

    const toMd5 = () => {
      output.value = md5(input.value)
    }

    return {
      input,
      output,
      base64Encode,
      base64Decode,
      toMd5
    }
  },
}
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
  

  & .page__content {
    padding: 16px;
  }
}
</style>