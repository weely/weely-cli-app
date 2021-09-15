<template>
  <a-breadcrumb class="app-breadcrumb" separator="/">
    <a-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { compile } from 'path-to-regexp'
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup(){
    const route = useRoute()
    const router = useRouter()
    const levelList = ref(null)
    // methods
    const isDashboard = function(route) {
      const name = route && route.name

      return name && name.trim().toLocaleLowerCase() === 'dashboard'
    }
    const getBreadcrumb = function () {
      // 有 meta.title 才显示路由
      let matched = route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '仪表盘' }}].concat(matched)
      }

      levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    const pathCompile = function (path) {
      const { params } = route
      var toPath = compile(path , { encode: encodeURIComponent })

      return toPath(params)
    }
    const handleLink = function (item) {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(pathCompile(path))
    }
    // watch
    watch(route, (val) => {
      if (val.path.startsWith('/redirect/')) return
      getBreadcrumb()
    })

    return {
      levelList,
      getBreadcrumb,
      handleLink
    }
  },
  created() {
    this.getBreadcrumb()
  }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.a-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
