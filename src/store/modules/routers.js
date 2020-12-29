import { apiGetArticleCategories } from '../../api/article'
import { generateAsyncRouters } from '../../router/asyncRoutes'

const state = {
  dynamicRouters: null,
  categories: []
}

const mutations = {
  SET_ROUTERS: (state, dynamicRouters) => {
    state.dynamicRouters = dynamicRouters
  },

  SET_CATEGORIES: (state, categories) => {
    state.categories = categories
  }
}

const actions = {
  generateRoutes({ commit }, userId) {
    return new Promise(resolve => {
      let routes = []
      apiGetArticleCategories(userId).then(res => {
        const menus = res.data.categories
        if(menus.length) {
          routes = generateAsyncRouters(menus)
        }
        commit('SET_CATEGORIES', menus)
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
