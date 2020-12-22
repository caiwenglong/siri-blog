import request from '@/utils/request'

export function apiGetArticles(params) {
  return request({
    url: `/article-api/siri-article/getAll/${params.userId}/${params.pageNum}/${params.pageSize}`,
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
