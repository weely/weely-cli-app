<template>
  <div class="main-page">
    <h4>首页</h4>
    <p>{{ msg }}</p>
    <a-button @click="success">Success</a-button>
  </div>
</template>

<script>
import { ref, defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'index',
  setup: () => {
    const internalInstance = getCurrentInstance()
    const msg = ref('msg')

    const success = () => {
      internalInstance.appContext.config.globalProperties.$message.success('This is a success message');
    }

    return {
      msg,
      success
    }
  },
})
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
}
</style>