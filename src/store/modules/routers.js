import { apiGetArticleCategories } from '../../api/article'
import { generateAsyncRouters } from '../../router/asyncRoutes'

const state = {
  dynamicRouters: null
}

const mutations = {
  SET_ROUTERS: (state, dynamicRouters) => {
    state.dynamicRouters = dynamicRouters
  }
}

const actions = {
  async generateRoutes({ commit }) {
    return new Promise(resolve => {
      let routes = []
      apiGetArticleCategories('1327139287671386114').then(res => {
        const menus = res.data.categories
        if(menus.length) {
          routes = generateAsyncRouters(menus)
        }
        commit('SET_ROUTERS', routes)
        resolve(routes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
