<template>
  <div class="main-page">
    <sys-title title="首页"></sys-title>

    <div class="main-page__content">
      <a-button @click="success">Success</a-button>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'

export default {
  name: 'index',
  setup: () => {
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    const msg = ref('msg')

    const success = () => {
      $message.success('This is a success message');
    }

    return {
      msg,
      success
    }
  },
}
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;

  &__content {
    padding: 16px;
  }
}
</style>