<template>
  <div class="main-page">
    <sys-title title="加密/解密"></sys-title>
    <div></div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Tools',
  setup: () => {

    const msg = ref('msg')

    return {
      msg,
    }
  },
}
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
}
</style>