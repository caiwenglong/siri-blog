import { apiGetArticleCategories } from '../../api/article'
import asyncRoutes, { generateAsyncRouters } from '../../router/asyncRoutes'
import deepClone from '../../utils/common'
import { forEach } from 'lodash'
import constructionRouters from '../../router/permissionUtils'
import store from '../index'
import router, { resetRouter } from '../../router'

const state = {
  dynamicRouters: null,
  routes: '',
  categories: []
}

const mutations = {
  SET_ROUTERS: (state, dynamicRouters) => {
    state.dynamicRouters = dynamicRouters
  },

  SET_CATEGORIES: (state, categories) => {
    state.categories = categories
  },

  // 设置用户类型，并根据权限获取授权路由
  SET_ROLES_AND_ROUTES: (state, params) => {
    // 深拷贝
    const accessRoutes = deepClone(asyncRoutes)
    forEach(params, item => {
      accessRoutes[0].children.push(item)
    })
    accessRoutes[0].children = constructionRouters(accessRoutes[0].children)
    state.routes = accessRoutes
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
        commit('SET_CATEGORIES', menus) // 设置分类列表
        commit('SET_ROUTERS', routes) // 设置动态路由
        commit('SET_ROLES_AND_ROUTES', routes) // 完整路由
        resetRouter() // 在添加路由之前将路由重置为空
        router.addRoutes(store.getters.getRoutes) // 添加动态路由
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
