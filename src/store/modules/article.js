import {
  apiGetAllArticles,
  apiAddArticle,
  apiModifyArticle,
  apiGetArticle,
  apiDeleteArticleById,
  apiDeleteArticleByCategoryIdList,
  apiGetArticleCategories,
  apiGetCategoryChildren,
  apiAddArticleCategory,
  apiBatchDeleteArticleCategory,
  apiModifyArticleCategory
} from '@/api/article'
import srCode from '@/share/constant/files/srCode'
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
  categories: [],
  categoryChildren: []
}

const mutations = {
  SET_ENTITY_ARTICLE: (state, article) => {
    state.entityArticle = article
  },
  SET_ENTITY_ARTICLE_LIST: (state, articleList) => {
    state.entityArticleList = articleList
  },
  SET_CATEGORY_CHILDREN: (state, categoryChildren) => {
    state.categoryChildren = categoryChildren
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

  modifyArticle({ commit }, articleData) {
    return new Promise((resolve, reject) => {
      apiModifyArticle(articleData).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 通过文章ID删除文章
   * @param commit
   * @param idArticle：文章ID
   * @returns {Promise<unknown>}
   */
  deleteArticleById({ commit }, idArticle) {
    return new Promise((resolve, reject) => {
      apiDeleteArticleById(idArticle).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 通过分类ID删除文章
   * @param commit
   * @param idCategory：分类ID
   * @returns {Promise<unknown>}
   */
  deleteArticleByCategoryIdList({ commit }, idCategoryList) {
    return new Promise((resolve, reject) => {
      apiDeleteArticleByCategoryIdList(idCategoryList).then(res => {
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
        console.log(res)
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

  /**
   * 修改分类
   * @param commit
   * @param categoryForm
   * @returns {Promise<unknown>}
   */
  modifyCategory({ commit }, categoryForm) {
    return new Promise((resolve, reject) => {
      apiModifyArticleCategory(categoryForm).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 通过分类ID列表批量删除分类
   * @param commit
   * @param categoryIdList
   * @returns {Promise<unknown>}
   */
  batchDeleteCategory({ commit }, params) {
    return new Promise((resolve, reject) => {
      apiBatchDeleteArticleCategory(params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getCategoryChildren({ commit }, idCategory) {
    return new Promise((resolve, reject) => {
      apiGetCategoryChildren(idCategory).then(res => {
        if(res.code === srCode.SUCCESS && res.data.categoryChildren.length) {
          commit('SET_CATEGORY_CHILDREN', res.data.categoryChildren)
        }
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
