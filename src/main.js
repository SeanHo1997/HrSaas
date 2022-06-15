import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import checkPermission from '@/mixin/checkPermission'

import '@/icons' // icon
import '@/permission' // permission control

// 导入自定义组件
import components from '@/components/index.js'
// 导入项目资源的过滤器
import * as filters from '@/filters/index.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册自定义指令
import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
// 注册过滤器

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

import i18n from '@/lang'
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

// 注册自定义组件
Vue.use(components)

// mixin提供全局事件
Vue.mixin(checkPermission)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
