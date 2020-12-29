import {
  apiGetAllArticles,
  apiAddArticle,
  apiGetArticle,
  apiGetArticleCategories,
  apiAddArticleCategory,
  apiDeleteArticleCategory
} from '@/api/article'
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
  entityArticleList: [],
  categories: []
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
  /**
   * 获取全部文章
   * @param commit
   * @param params：{ userId： 用户ID, pageNum: 第几页, pageSize: 每页条数}
   * @returns {Promise<unknown>}
   */
  getAllArticles({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiGetAllArticles(params).then(res => {
        commit('SET_ENTITY_ARTICLE_LIST', res.article)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 通过文章ID获取单个文章
   * @param commit
   * @param artId：文章ID
   * @returns {Promise<unknown>}
   */
  getArticle({ commit }, artId) {
    return new Promise((resolve, reject) => {
      apiGetArticle(artId).then(res => {
        commit('SET_ENTITY_ARTICLE', res.article)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 添加文章
   * @param commit
   * @param articleData：文章表单
   * @returns {Promise<unknown>}
   */
  addArticle({ commit }, articleData) {
    return new Promise((resolve, reject) => {
      apiAddArticle(articleData).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 通过用户ID获取分类
   * @param commit
   * @param userId
   * @returns {Promise<unknown>}
   */
  getAllCategory({ commit }, userId) {
    return new Promise((resolve, reject) => {
      apiGetArticleCategories(userId).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 添加文章分类
   * @param commit
   * @param categoryForm：分类表单
   * @returns {Promise<unknown>}
   */
  addCategory({ commit }, categoryForm) {
    return new Promise((resolve, reject) => {
      apiAddArticleCategory(categoryForm).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  deleteCategory({ commit }, categoryId) {
    return new Promise((resolve, reject) => {
      apiDeleteArticleCategory(categoryId).then(res => {
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
