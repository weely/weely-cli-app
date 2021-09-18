<template>
  <div class="main-page">
    <h4>工具</h4>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'

export default {
  name: 'Tools',
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
}
</style>