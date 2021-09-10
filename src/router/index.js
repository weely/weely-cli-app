import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/index/index') },
  { path: '/test', component: () => import('@/views/test/index') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { left: 0, top: 0 }
  },
})

export default router
