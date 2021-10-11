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
  // {
  //   path: '/',
  //   component: Layout,
  //   name: 'main',
  //   meta: { title: '首页', icon: 'component', affix: true },
  //   redirect: 'index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/index/index'),
  //       name: 'main',
  //       meta: { title: '首页',  }
  //     }
  //   ]
  // },
  {
    path: '/tools',
    component: Layout,
    name: 'Tools',
    meta: { title: '工具', icon: 'tool', affix: true },
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/tools/index'),
        name: 'Tools',
        meta: { title: '工具列表' }
      },
      {
        path: 'image-fillet',
        component: () => import('@/views/tools/image-fillet'),
        name: 'image-fillet',
        meta: { title: '在线图片处理', }
      },
      {
        path: 'enc',
        component: () => import('@/views/tools/enc'),
        name: 'enc-dec',
        meta: { title: '加密/解密', }
      },
      {
        path: 'json-editor',
        component: () => import('@/views/tools/json-editor'),
        name: 'json-editor-view',
        meta: { title: 'JSON工具', }
      }
    ]
  },
  {
    path: '/icons',
    component: Layout,
    name: 'Icons',
    meta: { title: '图标', icon: 'icon', affix: true },
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: '图标',  }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    name: 'Profile',
    meta: { title: '个人信息', icon: 'user', affix: true },
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'profile',
        meta: { title: '个人信息',  }
      }
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
