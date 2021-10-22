<template>
  <div ref="target">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
  name: 'ClickOutSide',
  emits: ['clickOutside'],
  // eslint-disable-next-line
  setup(props, context){
    const target = ref(null)

    onClickOutside(target, () => {
      context.emit('clickOutside')
    })

    return {
      target
    }
  }
}
</script>
