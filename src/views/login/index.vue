<template>
  <div class="login-page">
    <div>
      <div id="login_container">

      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
import '@/assets/libs/wxLogin'

export default {
  name: 'index',
  setup: () => {
    const internalInstance = getCurrentInstance()
    const $message = internalInstance.appContext.config.globalProperties.$message

    const msg = ref('msg')

    const success = () => {
      $message.success('This is a success message');
    }

    onMounted(() => {
      // eslint-disable-next-line
      const wxLogin = new WxLogin({
        self_redirect:true,
        id:"login_container", 
        appid: "wx1be34cc46c54e7ff",
        // appid: "wxa473aba024d862ff",
        scope: "snsapi_login", 
        redirect_uri: encodeURIComponent("http://weely.cc"),
        state: "",
        style: "white",
        href: ""
      });
    })

    return {
      msg,
      success
    }
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  padding: 40px;
  text-align: center;
}
</style>