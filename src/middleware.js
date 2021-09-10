import router from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  // 进度条加载完成
  NProgress.done()
})
