<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
<script>
import { isExternal } from '@/utils/validate'
import { defineComponent, toRefs, computed } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { to } = toRefs(props)
    const isExternalLink = isExternal(to.value)
    const type = computed(() => isExternalLink ? 'a' : 'router-link')
    
    const linkProps = function(to) {
      if (isExternalLink) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }

    return {
      type,
      linkProps
    }
  }
})
</script>
