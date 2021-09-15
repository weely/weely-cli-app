<template>
  <div class="main-page">
    dashboard
    <a-button @click="success">click</a-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'dashboard',
  setup: () => {
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    const success = () => {
      $message.success('This is a success message');
    }

    return {
      success
    }
  }
}
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
}
</style>