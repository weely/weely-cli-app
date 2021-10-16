<template>
  <div class="main-page">
    <sys-title title="加密/解密"></sys-title>
    <div class="page__content">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-textarea v-model:value="input" placeholder="输入" :rows="4" />
        </a-col>
        <a-col :span="12">
          <a-textarea v-model:value="output" placeholder="结果" :rows="4" />
        </a-col>
      </a-row>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'enc',
  setup: () => {

    const input = ref('')
    const output = ref('')

    return {
      input,
      output
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