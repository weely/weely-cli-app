<template>
  <div class="login-page">
    <div>
      <div id="login_container"></div>
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
      new WxLogin({
        self_redirect:true,
        id:"login_container", 
        // appid: "wxef49846a9f3ee3b4",
        // redirect_uri: encodeURIComponent("https://weely.cc"),
        appid: "wx4968c1523c416b8e",
        redirect_uri: encodeURIComponent("http://support.gpsoo.net/1"),
        scope: "snsapi_login", 
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