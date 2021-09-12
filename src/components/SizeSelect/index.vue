<template>
  <a-dropdown :trigger="['click']" placement="bottomCenter">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>

    <template #overlay>
      <a-menu @click="handleSetSize">
        <a-menu-item v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size===item.value"
          :title="item.label"
          >{{ item.label }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },
  computed: {
    size() {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize({key}) {
      this.$store.dispatch('app/setSize', key)
      this.refreshView()
      this.$message.success('切换尺寸成功')
    },
    refreshView() {
      const { fullPath } = this.$route

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }

}
</script>
