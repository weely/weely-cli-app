<template>
<div class="sys-title">
  <slot name="title">{{ title }}</slot>
</div>  
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss">
@import "~@/styles/theme-variables.scss";

.sys-title {
  color: #333;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
}

.sys-title::before{
  content: '';
  margin-right: 8px;
  color: #{$colorPrimary};
  border-left: solid 4px;
}
</style>