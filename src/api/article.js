import request from '@/utils/request'

export function apiGetAllArticles(params) {
  return request({
    url: `/article-api/siri-article/getAll/${params.userId}/${params.category}/${params.pageNum}/${params.pageSize}`,
    method: 'get'
  })
}

export function apiGetArticle(params) {
  return request({
    url: `/article-api/siri-article/getArticle/${params}`,
    method: 'get'
  })
}

export function apiAddArticle(articleForm) {
  return request({
    url: '/article-api/siri-article/add',
    method: 'post',
    data: articleForm
  })
}

export function apiGetArticleCategories(params) {
  return request({
    url: `/article-api/siri-article/category/getAllCategories/${params}`,
    method: 'get'
  })
}

export function apiAddArticleCategory(params) {
  return request({
    url: `/article-api/siri-article/category/AddArticleCategory`,
    method: 'post',
    data: params
  })
}