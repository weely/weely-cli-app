<template>
  <div class="icons-page">
    <sys-title title="Icon组件"></sys-title>
    <p><a href="https://www.iconfont.cn/search/index?searchType=icon&q=%E5%B7%A5%E5%85%B7&page=1&tag=&fills=0" target="_blank">阿里矢量图库</a></p>
    <a-card title="系统图标" size="small">
      <div class="icons-list">
        <div v-for="iconItem in iconList" :key="iconItem" class="icon-item">
          <div @click="success">
            <svg-icon  class-name="disabled"  :icon-class="`${iconItem}`" />
            <span class="icon-item-title">{{ iconItem }}</span>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { ref, getCurrentInstance, readonly } from 'vue'
import svgIcons from './svg-icons'

export default {
  name: 'Icons',
  setup: () => {
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    const msg = ref('msg')
    const iconList = readonly(svgIcons)

    const success = () => {
      $message.success('This is a success message');
    }

    return {
      msg,
      iconList,
      success
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.icons-page {
  width: 100%;

  & .icons-list {
    display: flex;
    flex-wrap: wrap;

  }

  .icon-item {
    margin: 20px;
    height: 90px;
    text-align: center;
    width: 120px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
    transition: all .5s ease;

    .icon-item-title {
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }
  }

  .icon-item:hover {
    background-color: #1890ff;
    color: #fff;
  }



  .disabled {
    pointer-events: none;
  }
}
</style>