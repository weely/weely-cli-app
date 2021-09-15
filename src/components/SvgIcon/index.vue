<template>
  <div v-if="isExternalUrl" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'
import { defineComponent, toRefs, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { iconClass, className } = toRefs(props)
    const isExternalUrl = computed(() => isExternal(iconClass.value))
    const iconName = computed(() => `#icon-${iconClass.value}`)
    const svgClass = computed(() => className.value ?  `svg-icon ${className.value}` : 'svg-icon')
    const styleExternalIcon = computed(() => ({
      mask: `url(${iconClass.value}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${iconClass.value}) no-repeat 50% 50%`
    }))

    return {
      isExternalUrl,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
