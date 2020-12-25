const getters = {
  getRoutes: (state) => { return state.routes },
  getTagView: (state) => { return state.tagView },
  getBreadcrumbs: (state) => { return state.breadcrumbs },
  getKeepAliveList: (state) => { return state.keepAliveList },
  getRole: (state) => { return state.role },
  getToken: (state) => { return state.token },
  userId: (state) => { return state.user.id },
  dynamicRouters: state => state.routers.dynamicRouters
}

export default getters
