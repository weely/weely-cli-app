<template>
  <div class="icons-page">
    <sys-title title="系统图标"></sys-title>
    <p></p>
    <div class="icons-list-wrapper">
      <div class="icons-list">
        <div v-for="iconItem in iconList" :key="iconItem" class="icon-item">
          <div>
            <svg-icon  class-name="disabled"  :icon-class="`${iconItem}`" />
            <span class="icon-item-title">{{ iconItem }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, readonly } from 'vue'
import svgIcons from './svg-icons'
import SysTitle from '@/components/SysTitle'

export default {
  name: 'Icons',
  components: { SysTitle },
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

  & .icons-list-wrapper {
    border: solid 1px #{$borderColorLight};
  }

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