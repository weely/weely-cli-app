const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  introduction: state => state.user.introduction,
  permission_routes: state => state.permission.routes,
}
export default getters
