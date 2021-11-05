<template>
  <section class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" :key="route.fullPath"/>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AppMain',
  setup() {
    const route = useRoute()
    const key = computed(() => route.path)

    return {
      key,
      route
    }
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0px;
  background: #f0f2f5;
}

.fixed-header+.app-main {
  padding-top: 50px;
  min-height: 100vh;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>
