import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import 'normalize.css'
import '@/styles/common.scss';
// import './middleware'

createApp(App).use(router).mount('#app')
