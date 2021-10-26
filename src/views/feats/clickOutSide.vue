<template>
<div class="clickoutside-page">
  <sys-title title="点外部触发事件"></sys-title>
  <div class="clickoutside-content">
      <ClickOutSide @clickOutside="handleClickOutSide"><div @click="onClickInner" class="inner-box">{{ message }}</div></ClickOutSide>
  </div>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ClickOutSide from '@/components/ClickOutSide'

export default defineComponent({
  name: 'clickoutsidePage',
  components: { ClickOutSide },
  setup() {
    const message = ref('点击')
    const handleClickOutSide = () => {
      message.value = '点击外面'
    }

    const onClickInner = () => {
      message.value = '点击里面'
    }

    return {
      message,
      handleClickOutSide,
      onClickInner
    }
  }
})
</script>
<style lang="scss" scoped>
.clickoutside-content {
  text-align: center;
  padding: 16px;

  .inner-box {
    width: 100%;
    height: 200px;
    line-height: 200px;
    font-size: 20px;
    color: #fff;
    background-color: #408ede;
    box-shadow: 0px 0px 15px 0px #92b7ed;
    border-radius: 20px;
  }
}
</style>
