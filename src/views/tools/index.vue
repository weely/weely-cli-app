<template>
  <div class="main-page">
    <h4>工具</h4>
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