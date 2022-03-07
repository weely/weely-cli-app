import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'login'
  },
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
    meta: { title: '首页', icon: 'home', affix: true },
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index/index'),
        name: 'main',
        meta: { title: '首页',  }
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
        path: 'create-qrcode',
        component: () => import('@/views/tools/create-qrcode'),
        name: 'create-qrcode-view',
        meta: { title: '生成二维码', }
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
        meta: { title: '编码/解码', }
      },
      {
        path: 'json-editor',
        component: () => import('@/views/tools/json-editor'),
        name: 'json-editor-view',
        meta: { title: 'JSON工具', }
      },
    ]
  },
  {
    path: '/feats',
    component: Layout,
    name: 'feats',
    meta: { title: '功能', icon: 'component' },
    redirect: 'ws',
    children: [
      {
        path: 'ws',
        component: () => import('@/views/feats/websocket-exam'),
        name: 'webSocketExam',
        meta: { title: 'websocket测试',  }
      },
      {
        path: 'clickoutside',
        component: () => import('@/views/feats/clickOutSide'),
        name: 'clickOutSide',
        meta: { title: 'clickOutSide组件',  }
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
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/test'),
        name: 'demo',
        meta: { title: 'demo',  }
      }
    ],
    // hidden: true
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
