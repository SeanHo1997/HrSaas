import { getToken, setToken, removeToken, setTimeStamp, removeTimeStamp } from '@/utils/auth'
import { login, userInfo, userBasicInfo } from '@/api/user.js'
import { resetRouter } from '@/router/index'

const state = {
  token: getToken(), // vuex启动时，token从cookies中读取
  userInfo: {}
}

const mutations = {
  setToken (state, token) {
    setToken(token) // 将设置的token同步给缓存
    state.token = token
  },
  removeToken (state) {
    state.token = null // 删除vuex中的token
    removeToken() // 再将缓存中的token置空
  },
  // 更新用户信息
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  removeUserInfo (state) {
    state.userInfo = {}
  }
}
// 在acitons中调用登录接口
const actions = {
  async login (context, data) {
    // 调用接口
    const token = await login(data)
    // data回来会经过response.use()
    context.commit('setToken', token)
    // 登录后拿到token记录时间戳
    setTimeStamp()
  },
  async getUserInfo (context) {
    const res = await userInfo()
    const BasicInfo = await userBasicInfo(res.userId)
    context.commit('setUserInfo', { ...res, ...BasicInfo })
    return res // 后面需要用到res，先埋下伏笔
  },
  logout (context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    removeTimeStamp()
    resetRouter()
    // 同时还需要清空permission模块下的routes
    context.commit('permission/addRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
