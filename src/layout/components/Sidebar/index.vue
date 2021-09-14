<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div wrap-class="scrollbar-wrapper">
      <a-menu
        :default-selected-keys="activeMenu"
        :inline-collapsed="isCollapse"
        v-model:selectedKeys="selectedKeys"
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
import { mapGetters, useStore } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default defineComponent({
  components: { SidebarItem, Logo },
  setup() {
    const store = useStore()
    const router = useRoute()
    const { meta, path } = router
    const activeMenu = computed(() => {
      return meta.activeMenu ? [meta.activeMenu] : [path]
    })
    const sidebar = computed(() => store.state.app.sidebar)
    const isCollapse = computed(() => !sidebar.value.opened)
    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const styleObj = computed(() => ({
        backgroundColor: variables.menuBg
      }))
    const selectedKeys = ref(activeMenu.value)
    watch(router, (val) => {
      const { meta, path } = val
      if (meta && meta.activeMenu) {
        selectedKeys.value = [meta.activeMenu]
      }
      selectedKeys.value = [path]
    })
    
    return {
      sidebar,
      activeMenu,
      selectedKeys,
      showLogo,
      isCollapse,
      styleObj
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
    ]),
  },

})
</script>
