import request from '@/utils/request'

export function apiLogin(data) {
  return request({
    url: 'http://120.24.144.34:8803/user-center/user/login',
    method: 'post',
    data
  })
}

export function apiGetUserInfo(token) {
  return request({
    url: 'http://120.24.144.34:8803/user-center/user/getUserInfos',
    method: 'get',
    params: { token }
  })
}

export function apiLogout() {
  return request({
    url: 'http://120.24.144.34:8803/user-center/user/logout',
    method: 'post'
  })
}
