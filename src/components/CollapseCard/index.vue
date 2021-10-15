<template>
  <a-card v-bind="$attrs">
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #extra>
      <div class="basic-arrow" :class="show ? 'down' : 'up'" @click="show = !show"><CaretDownFilled /></div>
    </template>
    <collapse-transition>
      <div v-show="show">
        <slot></slot>
      </div>
    </collapse-transition>
  </a-card>
</template>

<script>
import { ref, toRefs } from 'vue'
import { CaretDownFilled }  from '@ant-design/icons-vue'
import CollapseTransition from '@/components/Transition/CollapseTransition'

export default {
  name: 'CollapseCard',
  props: {
    defaultOpen: {
      type: Boolean,
      default: false
    }
  },
  components: { CaretDownFilled, CollapseTransition },
  setup(props){
    const { defaultOpen } = toRefs(props)

    return {
      show: ref(defaultOpen.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-arrow {
  transition: all .3s ease .1s;
  cursor: pointer;
  transform: rotate(90deg);
}

.up {
  transform: rotate(180deg);
}

.down {
  transform: rotate(0deg);
}
</style>
