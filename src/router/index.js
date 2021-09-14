import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '仪表盘', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: 'main',
    meta: { title: '首页', icon: 'dashboard', affix: true },
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index/index'),
        name: 'main',
        meta: { title: '首页1',  }
      },
      {
        path: 'test',
        component: () => import('@/views/test'),
        name: 'test1',
        meta: { title: 'DEMO1' }
      },
      {
        path: 'test2',
        component: () => import('@/views/test'),
        name: 'test2',
        meta: { title: 'DEMO2' },
        hidden: true
      },
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/test',
    component: () => import('@/views/test'),
    hidden: true
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/NotFoundComponent/index.vue'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/test2',
    component: () => import('@/views/test'),
    hidden: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { left: 0, top: 0 }
  },
})

export default router
