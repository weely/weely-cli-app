<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <a-menu-item
          :key="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}">
          <template #icon>
            <svg-icon v-if="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :icon-class="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" />
          </template>
          {{ onlyOneChild.meta.title }}
        </a-menu-item>
      </app-link>
    </template>

    <a-sub-menu v-else ref="subMenu" :key="resolvePath(item.path)" popper-append-to-body>
        <template #icon>
          <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta && item.meta.icon" />
        </template>
        <template #title>
          <span v-if="item.meta">{{item.meta.title}}</span>
        </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </a-sub-menu>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs } from 'vue'
import path from 'path'
import { isExternal } from '@/utils/validate'
import AppLink from './Link'

export default defineComponent({
  name: 'SidebarItem',
  components: { AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const onlyOneChild = ref(null)
    const { basePath } = toRefs(props)

    const hasOneShowingChild = function(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) { return false }
        // 有一个子路由节点才设置 Temp
        onlyOneChild.value = item
        return true
      })

      // 有且仅有一个子路由，默认展示该子路由节点
      if (showingChildren.length === 1) { return true }

      // 没有子路由显示自身
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }

    const resolvePath = function (routePath) {
      if (isExternal(routePath)) { return routePath }

      if (isExternal(basePath.value)) { return basePath.value }

      return path.resolve(basePath.value, routePath)
    }

    return {
      onlyOneChild,
      hasOneShowingChild,
      resolvePath
    }
  }
})
</script>
