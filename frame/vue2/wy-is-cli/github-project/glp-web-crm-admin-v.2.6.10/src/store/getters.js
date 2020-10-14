const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  userInfo: state => state.user.userInfo,               //用户信息
  menuData: state => state.user.menuData,               //用户菜单
  token: state => state.user.token,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  todoApproval: state => state.user.todoApproval,
  stsToken: state => state.app.stsToken,
  errorLogs: state => state.errorLog.logs
}
export default getters
