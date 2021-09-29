<template>
  <div ref="rightPanelRef" :class="{show:show}" class="rightPanel-container">
    <div class="rightPanel-background"></div>
    <div class="rightPanel">
      <div class="handle-button" :style="{'top':buttonTop+'px','background-color':theme}" @click.stop.prevent="show=!show">
        <CloseOutlined v-if="show" />
        <SettingOutlined v-else />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { addClass, removeClass } from '@/utils'
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'RightPanel',
  props: {
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 250,
      type: Number
    }
  },
  components: {
    SettingOutlined, CloseOutlined
  },
  setup(props){
    const { clickNotClose } = toRefs(props)
    const store = useStore()
    const rightPanelRef = ref(null);

    const show = ref(false)
    const theme = computed(() => store.state.settings.theme)
    const closeSidebar = function (evt) {
      const parent = evt.target.closest('.rightPanel')
      if (!parent) {
        show.value = false
        window.removeEventListener('click', closeSidebar)
      }
    }
    const addEventClick = function () {
      window.addEventListener('click', closeSidebar)
    }

    watch(show, (value) => {
      if (value && !clickNotClose.value) {
        addEventClick()
      }
      if (value) {
        addClass(document.body, 'showRightPanel')
      } else {
        removeClass(document.body, 'showRightPanel')
      }
    })
    
    const insertToBody = function () {
      const elx = rightPanelRef.value
      const body = document.querySelector('body')
      body.insertBefore(elx, body.firstChild)
    }
    onMounted(() => {
      insertToBody()
    })
    return {
      rightPanelRef,
      show,
      theme,
      insertToBody
    }
  },
  unmounted() {
    const elx = this.$refs.rightPanelRef
    elx && elx.remove()
  }
})
</script>

<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
  background: rgba(0, 0, 0, .2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
  transition: all .25s cubic-bezier(.7, .3, .1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}

.show {
  transition: all .3s cubic-bezier(.7, .3, .1, 1);

  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
