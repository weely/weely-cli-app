<template>
  <div class="dashboard-page">
    <a-row :gutter="20" class="panel-group">
      <a-col :xs="12" :sm="12" :lg="6">
        <a-card hoverable size="small">
          <template #extra>
            日
          </template>
          <template #title>
            <span>访问数</span>
          </template>
          <count-to :end-val="23"></count-to>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :lg="6">
        <a-card hoverable size="small">
          <template #extra>
            月
          </template>
          <template #title>
            <span>访问数</span>
          </template>
          <count-to :end-val="151"></count-to>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :lg="6">
        <a-card hoverable size="small">
          <template #extra>
            年
          </template>
          <template #title>
            <span>访问数</span>
          </template>
          <count-to :end-val="9346"></count-to>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :lg="6">
        <a-card hoverable size="small">
          <template #extra>
            总
          </template>
          <template #title>
            <span>访问数</span>
          </template>
          <count-to :end-val="34581"></count-to>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'dashboard',
  setup: () => {
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    const success = () => {
      $message.success('This is a success message');
    }

    return {
      success
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  width: 100%;

}

</style>