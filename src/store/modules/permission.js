import { constantRoutes, asyncRoutes } from '@/router/index'

const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(item => {
      routes.push(...asyncRoutes.filter(route => route.name === item))
    })
    console.log(routes)
    context.commit('setRoutes', routes)
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
