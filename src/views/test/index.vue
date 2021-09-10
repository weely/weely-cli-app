<template>
  <div>
    <h4>test</h4>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'index',
  setup: () => {
    const msg = ref('test')
    return { msg }
  }
})
</script>

<style>

</style>