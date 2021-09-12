import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import autUi from './ant-ui'
import 'normalize.css'
import '@/styles/common.scss';
import './middleware'
import SvgIcon from './icons' // icon


createApp(App)
  .component('svg-icon', SvgIcon)
  .use(autUi)
  .use(store)
  .use(router)
  .mount('#app')
