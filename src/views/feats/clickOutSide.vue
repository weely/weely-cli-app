<template>
  <div class="clickoutside-page">
      <ClickOutSide @clickOutside="handleClickOutSide">点我</ClickOutSide>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ClickOutSide from '@/components/ClickOutSide'

export default defineComponent({
  name: 'clickoutsidePage',
  components: { ClickOutSide },
  setup() {
    const handleClickOutSide = () => {
      console.log('点击外面')
    }

    return {
      handleClickOutSide
    }
  }
})
</script>
