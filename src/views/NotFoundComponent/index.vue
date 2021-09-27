<template>
<div class="not-found-page">
    404，抱歉，您访问的资源不存在<a href="/">返回首页</a>
</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NotFoundComponent',
})
</script>

<style scoped>
.not-found-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  margin: 0;
}
</style>
  