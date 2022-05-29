import router from '@/router'
import store from '@/store/index.js'
import nprogress from 'nprogress'

const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 有token以及去登录页
    if (to.path === '/login') {
      // 跳到主页
      next('/')
    } else {
      // 在有token的情况下获取用户资料,但是并不是每次都要获取资料，判断userInfo里面是否有内容来决定是否获取
      if (!store.getters.userId) {
        const res = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch('permission/filterRoutes', res.roles.menus)
        router.addRoutes(routes)
        next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()
})

router.afterEach(() => {
  nprogress.done()
})
