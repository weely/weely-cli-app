import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import autUi from './ant-ui'
import 'normalize.css'
import '@/styles/common.scss';
import './middleware'
import SvgIcon from './icons' // icon
import SysTitle from '@/components/SysTitle'
import CountTo from '@/components/CountTo'

createApp(App)
  .component('svg-icon', SvgIcon)
  .component('sys-title', SysTitle)
  .use(autUi)
  .use(CountTo)
  .use(store)
  .use(router)
  .mount('#app')
