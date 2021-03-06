const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  name: state => state.user.userInfo.username,
  photo: state => state.user.userInfo.staffPhoto,
  routes: state => state.permission.routes
}
export default getters
