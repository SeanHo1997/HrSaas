import { constantRoutes } from '@/router/index'
import { asyncRoutes } from '@/router/index'

const state = {
  routes: constantRoutes
}
const mutations = {
  addRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(item => {
      routes.push(...asyncRoutes.filter(route => route.name === item))
    })
    context.commit('addRoutes', routes)
    // return的数据给到sidebar使用
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
