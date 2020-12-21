import request from '@/utils/request'

export function apiLogin(data) {
  return request({
    url: '/user-api/user-center/user/login',
    method: 'post',
    data
  })
}

export function apiGetInfo(token) {
  return request({
    url: '/user-api/user-center/user/info',
    method: 'get',
    params: { token }
  })
}

export function apiLogout() {
  return request({
    url: '/user-api/user-center/user/logout',
    method: 'post'
  })
}
