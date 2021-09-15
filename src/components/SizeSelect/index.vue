<template>
  <a-dropdown :trigger="['click']" placement="bottomCenter">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>

    <template #overlay>
      <a-menu @click="handleSetSize">
        <a-menu-item v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size===item.value"
          :title="item.label"
          >{{ item.label }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import { defineComponent, readonly, computed, nextTick, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'SizeSelect',
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    const sizeOptions = readonly([
      { label: '默认', value: 'default' },
      { label: '中等', value: 'medium' },
      { label: '小型', value: 'small' },
      { label: '迷你', value: 'mini' }
    ])
    const size = computed(() => store.getters.size)
    const refreshView = function () {
      const { fullPath } = route
      nextTick(() => {
        router.replace({ path: '/redirect' + fullPath })
      })
    }
    const handleSetSize = function ({key}) {
      store.dispatch('app/setSize', key)
      refreshView()
      $message.success('切换尺寸成功')
    }

    return {
      sizeOptions,
      size,
      handleSetSize,
    }
  }
})
</script>
