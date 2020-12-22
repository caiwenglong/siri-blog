import { apiGetArticles, apiAddArticle } from '@/api/article'
const articleDefaultState = () => {
  return {
    id: '',
    title: '',
    category: '',
    content: '',
    author: '',
    gmtCreate: '',
    gmtModified: ''
  }
}

const state = {
  entityArticle: articleDefaultState,
  entityArticleList: []
}

const mutations = {
  SET_ENTITY_ARTICLE: (state, article) => {
    state.entityArticle = article
  },
  SET_ENTITY_ARTICLE_LIST: (state, articleList) => {
    state.entityArticleList = articleList
  }
}

const actions = {
  /* 获取文章列表 */
  getAllArticles({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiGetArticles(params).then(res => {
        commit('SET_ENTITY_ARTICLE', res.article)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  addArticle({ commit }, articleData) {
    return new Promise((resolve, reject) => {
      apiAddArticle(articleData).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
