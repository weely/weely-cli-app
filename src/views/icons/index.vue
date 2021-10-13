<template>
  <div class="icons-page">
    <sys-title title="Icon组件"></sys-title>
    <a-card title="系统图标(点击图标拷贝代码)" size="small">
      <div class="icons-list">
        <div v-for="iconItem in iconList" :key="iconItem" class="icon-item">
          <a-tooltip>
            <template #title>{{ generateIconCode(iconItem) }}</template>
            <div @click="handleClipboard(generateIconCode(iconItem), $event)">
              <svg-icon  class-name="disabled" :icon-class="`${iconItem}`" />
              <span class="icon-item-title">{{ iconItem }}</span>
            </div>
          </a-tooltip>
        </div>
      </div>
    </a-card>

    <a-card title="Ant Icon(直接按需引入即可)" size="small" class="sys-marg">
      <div class="icons-list">
        <div v-for="antIcon in antIconList" :key="antIcon" class="icon-item">
          <a-tooltip>
            <template #title>{{ generateAntIconCode(antIcon) }}</template>
            <div @click="handleClipboard(generateAntIconCode(antIcon), $event)">
              <component :is="antIcon" class="disabled" />
              <span class="icon-item-title">{{ antIcon }}</span>
            </div>
          </a-tooltip>
        </div>
      </div>
    </a-card>

    <a-card title="阿里图标" size="small" class="sys-marg">
      <p><a href="https://www.iconfont.cn/search/index?searchType=icon&q=%E5%B7%A5%E5%85%B7&page=1&tag=&fills=0" target="_blank">阿里矢量图库</a></p>
    </a-card>

    <a-card title="iconify" size="small" class="sys-marg">
      <p><a href="https://iconify.design/" target="_blank">iconify</a></p>
    </a-card>
  </div>
</template>

<script>
import { ref, readonly } from 'vue'
import svgIcons from './svg-icons'
import clipboard from '@/utils/clipboard'
import { AndroidOutlined, AppleOutlined, WindowsOutlined, GooglePlusOutlined, GithubOutlined, WechatOutlined, QqOutlined, SlackOutlined, TwitterOutlined, AlipayCircleOutlined }  from '@ant-design/icons-vue'

export default {
  name: 'Icons',
  components: {
    AndroidOutlined, AppleOutlined, WindowsOutlined, GooglePlusOutlined, GithubOutlined, WechatOutlined, QqOutlined, SlackOutlined, TwitterOutlined, AlipayCircleOutlined
  },
  setup: () => {

    const msg = ref('msg')
    const iconList = readonly(svgIcons)
    const antIconList = ['AndroidOutlined', 'AppleOutlined', 'WindowsOutlined', 'GithubOutlined', 'WechatOutlined', 'AlipayCircleOutlined', 'QqOutlined', 'SlackOutlined', 'TwitterOutlined', 'GooglePlusOutlined',]

    const generateIconCode = function (symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    }
    const generateAntIconCode = function(symbol) {
      return `<${symbol} />`
    }

    const handleClipboard = (text, event) => {
      clipboard(text, event)
    }

    return {
      msg,
      iconList,
      antIconList,
      generateIconCode,
      generateAntIconCode,
      handleClipboard
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