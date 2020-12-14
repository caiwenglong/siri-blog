import request from '@/utils/request'

export function apiGetArticles() {
  return request({
    url: '/article-api/siri-article/getAll',
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
