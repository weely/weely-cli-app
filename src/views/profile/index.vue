<template>
  <div class="profile-page">
    <sys-title title="个人信息"></sys-title>
    <div class="profile-page__content">
      <a-row type="flex" :gutter="20">
        <a-col :span="6" :xs="24" :md="6">
          <user-card :user="formState"></user-card>
        </a-col>

        <a-col :span="18" :xs="24" :md="18">
          demo
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'
import userCard from './components/user-card'
import { useStore } from 'vuex'

export default {
  name: 'profile',
  components: { userCard },
  setup: () => {
    const store = useStore()
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message
    const user = store.state.user

    const formState = reactive({
      ...user,
      role: '超级管理员',
    })

    const success = () => {
      $message.success('This is a success message');
    }

    const onSubmit = function() {
      success()
    }

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 4 },
      formState,
      onSubmit
    }
  },
}
</script>

<style lang="scss" scoped>
.profile-page {
  width: 100%;
}
</style>