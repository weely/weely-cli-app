import router from '@/router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false }) // NProgress不展示右上角加载图标

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // const { roles } = await store.dispatch('user/getInfo')
  const roles = ['admin']
  const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

  router.addRoute(accessRoutes)

  next()
})

router.afterEach(() => {
  // 进度条加载完成
  NProgress.done()
})
