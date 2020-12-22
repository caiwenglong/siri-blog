const getters = {
  getRoutes: (state) => { return state.routes },
  getTagView: (state) => { return state.tagView },
  getBreadcrumbs: (state) => { return state.breadcrumbs },
  getKeepAliveList: (state) => { return state.keepAliveList },
  getRole: (state) => { return state.role },
  getToken: (state) => { return state.token },
  userId: state => state.user.id
}

export default getters
