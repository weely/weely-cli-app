import CountTo from './vue-countTo.vue'

// 参数app为createApp创建的实例
function install(app) {
  app.component("count-to", CountTo)
  return app
}

export default { install }
export { CountTo }