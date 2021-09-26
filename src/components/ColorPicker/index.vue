<template>
  <div
    :class="[
      'color-picker',
      colorDisabled ? 'is-disabled' : '',
      colorSize ? `color-picker--${ colorSize }` : ''
    ]"
    v-clickoutside="hide">
    <div class="color-picker__mask" v-if="colorDisabled"></div>
    <div class="color-picker__trigger" @click="handleTrigger">
      <span class="color-picker__color" :class="{ 'is-alpha': showAlpha }">
        <span class="color-picker__color-inner"
          :style="{
            backgroundColor: displayedColor
          }"></span>
        <span class="color-picker__empty el-icon-close" v-if="!value && !showPanelColor"></span>
      </span>
      <span class="color-picker__icon el-icon-arrow-down" v-show="value || showPanelColor"></span>
    </div>
    <picker-dropdown
       ref="dropdown"
       :class="['color-picker__panel', popperClass || '']"
       v-model="showPicker"
       @pick="confirmValue"
       @clear="clearValue"
       :color="color"
       :show-alpha="showAlpha"
       :predefine="predefine">
    </picker-dropdown>
  </div>
</template>

<script>
export default {
  name: 'colorPicker',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.color-picker {

}
</style>
