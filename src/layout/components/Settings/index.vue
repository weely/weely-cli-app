<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统样式设置</h3>

      <div class="drawer-item">
        <span>固定Header</span>
        <a-switch v-model:checked="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>侧边栏图标</span>
        <a-switch v-model:checked="sidebarLogo" class="drawer-switch" />
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Settings',
  setup() {
    const store = useStore()

    const fixedHeader = computed({
      get() {
        return store.state.settings.fixedHeader
      },
      set(val) {
        store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    })

    const sidebarLogo = computed({
      get() {
        return store.state.settings.sidebarLogo
      },
      set(val) {
        store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    })

    return {
      fixedHeader,
      sidebarLogo
    }
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
    font-weight: bold;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
