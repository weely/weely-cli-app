<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div wrap-class="scrollbar-wrapper">
      <a-menu
        :default-selected-keys="activeMenu"
        :default-open-keys="activeMenu"
        v-model:selectedKeys="selectedKeys"
        :inline-collapsed="isCollapse"
        mode="inline"
        theme="dark"
        :style="styleObj"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </a-menu>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default defineComponent({
  name: 'Sidebar',
  components: { SidebarItem, Logo },
  setup() {
    const store = useStore()
    const route = useRoute()

    const sidebar = computed(() => store.state.app.sidebar)
    const isCollapse = computed(() => !sidebar.value.opened)
    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const permission_routes = computed(() => store.getters.permission_routes)
    const styleObj = computed(() => ({
      backgroundColor: variables.menuBg
    }))
    const activeMenu = computed(() => {
      const { meta, path } = route
      return meta.activeMenu ? [meta.activeMenu] : [path]
    })
    const selectedKeys = ref(activeMenu.value)
    watch(route, (val) => {
      const { meta, path } = val
      if (meta && meta.activeMenu) {
        selectedKeys.value = [meta.activeMenu]
      }
      selectedKeys.value = [path]
    })
    
    return {
      permission_routes,
      sidebar,
      activeMenu,
      selectedKeys,
      showLogo,
      isCollapse,
      styleObj
    }
  }
})
</script>
