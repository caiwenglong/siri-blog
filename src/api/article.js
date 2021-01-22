import request from '@/utils/request'

export function apiGetAllArticles(params) {
  return request({
    url: `http://120.24.144.34:8803/siri-article/getAll/${params.userId}/${params.category}/${params.pageNum}/${params.pageSize}`,
    method: 'get'
  })
}

export function apiGetArticle(params) {
  return request({
    url: `http://120.24.144.34:8803/siri-article/getArticle/${params}`,
    method: 'get'
  })
}

export function apiAddArticle(articleForm) {
  return request({
    url: 'http://120.24.144.34:8803/siri-article/add',
    method: 'post',
    data: articleForm
  })
}

export function apiModifyArticle(articleForm) {
  return request({
    url: 'http://120.24.144.34:8803/siri-article/modify',
    method: 'post',
    data: articleForm
  })
}

export function apiDeleteArticleById(params) {
  return request({
    url: `http://120.24.144.34:8803/siri-article/deleteArticleById/${params}`,
    method: 'delete'
  })
}

export function apiDeleteArticleByCategoryIdList(params) {
  return request({
    url: `http://120.24.144.34:8803/siri-article/deleteArticleByCategoryIdList`,
    method: 'delete',
    data: params
  })
}

export function apiGetArticleCategories(params) {
  return request({
    url: `http://120.24.144.34:8803/siri-article/category/getAllCategories/${params}`,
    method: 'get'
  })
}

export function apiAddArticleCategory(params) {
  return request({
    url: `http://120.24.144.34:8803/siri-article/category/addArticleCategory`,
    method: 'post',
    data: params
  })
}

export function apiModifyArticleCategory(params) {
  return request({
    url: `http://120.24.144.34:8803/siri-article/category/modifyArticleCategory`,
    method: 'post',
    data: params
  })
}

export function apiBatchDeleteArticleCategory(params) {
  return request({
    url: `http://120.24.144.34:8803/siri-article/category/batchDeleteArticleCategory`,
    method: 'delete',
    data: params
  })
}

export function apiGetCategoryChildren(params) {
  return request({
    url: `http://120.24.144.34:8803/siri-article/category/getCategoryChildren/${params}`,
    method: 'get'
  })
}
