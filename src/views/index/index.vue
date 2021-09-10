<template>
  <div class="main-page">
    <h4>首页</h4>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'index',
  setup: () => {
    const msg = ref('')
    return { msg }
  }
})
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
}
</style>