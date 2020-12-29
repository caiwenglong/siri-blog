const getters = {
  getTagView: (state) => { return state.tagView },
  getBreadcrumbs: (state) => { return state.breadcrumbs },
  getKeepAliveList: (state) => { return state.keepAliveList },
  getRole: (state) => { return state.user.role },
  getToken: (state) => { return state.token },
  userId: (state) => { return state.user.id },
  dynamicRouters: state => state.routers.dynamicRouters,
  getRoutes: (state) => { return state.routers.routes },
  storeCategories: state => state.routers.categories
}

export default getters
