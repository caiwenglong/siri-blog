import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import article from './modules/article'
import user from './modules/user'
import routers from './modules/routers'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules: {
    user,
    article,
    routers
  }
})
