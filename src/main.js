import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import 'normalize.css'
import '@/styles/common.scss';
import './middleware'
import autUi from './ant-ui'

createApp(App).use(autUi).use(router).mount('#app')
