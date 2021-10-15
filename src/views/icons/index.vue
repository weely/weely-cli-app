<template>
  <div class="icons-page">
    <sys-title title="Icon组件"></sys-title>
    <div class="icons-page__content">
      <collapse-card title="系统图标(点击图标拷贝代码)" size="small" :default-open="true">
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
      </collapse-card>
      <collapse-card size="small" class="sys-marg">
        <template #title>
          Ant Icon部分示例(直接按需引入即可，图标查询地址 <a href="https://icones.netlify.app/collection/ant-design" target="_blank">icones.netlify</a>)
        </template>
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
      </collapse-card>
      <collapse-card size="small" class="sys-marg">
        <template #title>
          iconify部分示例(基本包含所有的图标，<a href="https://iconify.design/" target="_blank">iconify.design</a> 可以查询到想要的任何图标。并且打包只会打包所用到的图标)
        </template>
        <a-alert type="info">
          <template #message>
          <a href="https://docs.iconify.design/icon-components/vue/" target="_blank">Iconify for Vue3</a> 文档，推荐使用iconify,style属性可自定义样式
          </template>
        </a-alert>
        <div class="icons-list">
          <div v-for="iconify in iconifyList" :key="iconify" class="icon-item">
            <a-tooltip>
              <template #title>{{ generateIconifyIconCode(iconify) }}</template>
              <div @click="handleClipboard(generateIconifyIconCode(iconify), $event)">
                <!-- <span class="iconify" :data-icon="iconify"></span> -->
                <!-- <Icon icon="mdi:home" style="color: red" /> -->
                <Icon :icon="iconify"></Icon>
                <span class="icon-item-title">{{ iconify }}</span>
              </div>
            </a-tooltip>
          </div>
        </div>
      </collapse-card>
      <collapse-card title="阿里图标(使用方法：登录下载svg引入即可)" size="small" class="sys-marg">
        <p><a href="https://www.iconfont.cn/" target="_blank">阿里矢量图库</a></p>
      </collapse-card>
    </div>
  </div>
</template>

<script>
import { ref, readonly } from 'vue'
import svgIcons from './svg-icons'
import clipboard from '@/utils/clipboard'
import {
  AndroidOutlined, AppleOutlined, WindowsOutlined, GooglePlusOutlined, GithubOutlined,
  WechatOutlined, QqOutlined, SlackOutlined, TwitterOutlined, AlipayCircleOutlined, CaretDownFilled
}  from '@ant-design/icons-vue'
import CollapseCard from '@/components/CollapseCard'
import { Icon } from '@iconify/vue';

export default {
  name: 'Icons',
  components: {
    AndroidOutlined, AppleOutlined, WindowsOutlined, GooglePlusOutlined, GithubOutlined,
    WechatOutlined, QqOutlined, SlackOutlined, TwitterOutlined, AlipayCircleOutlined,
    CaretDownFilled,
    CollapseCard,
    Icon
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
    const generateIconifyIconCode = function(symbol) {
      // return `<span class="iconify" data-icon="${symbol}"></span>`
      return `<Icon :icon="${symbol}" />`
    }

    const handleClipboard = (text, event) => {
      clipboard(text, event)
    }

    return {
      msg,
      iconList,
      antIconList,
      iconifyList: ['fa-solid:home','mdi-light:home', 'mdi:alert', 'line-md:image-twotone', 'noto:angry-face', 'fa-regular:handshake'],
      generateIconCode,
      generateAntIconCode,
      generateIconifyIconCode,
      handleClipboard
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.icons-page {
  width: 100%;

  &__content {
    padding: 16px;
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