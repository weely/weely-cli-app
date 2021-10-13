<template>
  <div class="tools-page">
    <sys-title title="工具列表"></sys-title>
    
    <div class="tools-list-wrapper">
      <div class="tools-list">
        <div v-for="routerItem in toolsList" :key="routerItem">
          <router-link :to="routerItem.path" class="tool-item">
            <svg-icon v-if="routerItem.meta.icon" class-name="disabled" :icon-class="`${routerItem.meta.icon}`" />
            <span class="tool-item-title">{{ routerItem.meta.title }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import find from 'lodash/find'
import { useStore } from 'vuex'

export default {
  name: 'Tools',
  setup: () => {
    const store = useStore()
    const routes = computed(() => store.getters.permission_routes)
    const toolRouter = find(routes.value, (item) => item.name === 'Tools')
    const toolsList = computed(() => toolRouter ? toolRouter.children.filter((item) => item.name !== 'Tools') : [])

    return {
      toolsList
    }
  },
}
</script>


<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.tools-page {
  width: 100%;

  & .tools-list-wrapper {
    // border: solid 1px #{$borderColorLighter};
    padding: 20px;
    background: #fff;
  }

  & .tools-list {
    display: flex;
    flex-wrap: wrap;

  }

  .tool-item {
    padding: 8px 16px;
    margin: 0 16px 16px 0;
    border: solid 1px #{$borderColorLight};
    text-align: center;
    float: left;
    color: #{$menuText};
    cursor: pointer;
    transition: all .5s ease;

    .tool-item-title {
      display: block;
      font-size: 20px;
      line-height: 40px;
    }
  }

  .tool-item:hover {
    background-color: #1890ff;
    color: #fff;
  }


  .disabled {
    pointer-events: none;
  }
}
</style>