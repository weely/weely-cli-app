# ` vite2 + vue3 + typescript ` 中使用svg


[vite-plugin-svg-icons 文档](https://www.npmjs.com/package/vite-plugin-svg-icons/)
## 安装 vite-plugin-svg-icons
`npm i -D vite-plugin-svg-icons`

## 创建svg文件存放路径
在src目录下，创建 icons 目录，将需要使用的 svg 文件存放在该目录

## 修改 vite.config.ts 配置，添加svg插件
```
// vite.config.ts
import SvgIconsPlugin from 'vite-plugin-svg-icons'
import path from 'path

export default () => {
  return {
    plugins: [
      SvgIconsPlugin({
        // svg 文件引入路径
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // svg 压缩配置
        svgoOptions: false,
        // default
        symbolId: 'icon-[dir]-[name]',
      })
    ]
  }
}
```

## 添加 SvgIcon 组件
```
// ./components/SvgIcon.vue
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: ''
  },
  spin: {
    type: Boolean,
    default: false,
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon')

</script>
<template>
  <svg
    :class="[svgClass, spin && 'svg-icon-spin']"
    aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>

```

## 在 main.ts 文件中引入
```
// vite 中需要添加此行
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon.vue'

// 全局引入
app.component('svg-icon', SvgIcon)

```

## 使用
```
<svg-icon name="icon1" :class-name="icon1" />
```
