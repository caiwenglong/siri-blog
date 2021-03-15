import request from '@/utils/request'

/**
 * 用户登录
 * @param data： 用户名，密码
 */
export function apiLogin(data) {
  return request({
    url: '/user-api/user-center/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param token
 */
export function apiGetUserInfo(token) {
  return request({
    url: '/user-api/user-center/user/getUserInfos',
    method: 'get',
    params: { token }
  })
}

/**
 * 发送验证码
 * @param data
 */
export function apiRegister(data) {
  return request({
    url: `/user-api/user-center/user/register`,
    method: 'post',
    data
  })
}

/**
 * 修改密码
 * @param data
 */
export function apiModifyPassword(data) {
  return request({
    url: `/user-api/user-center/user/modify-password`,
    method: 'post',
    data
  })
}

/**
 * 发送注册
 * @param phoneNum
 */
export function apiGetRegisterCode(phoneNum) {
  return request({
    url: `/user-code/service/msm/send/${phoneNum}`,
    method: 'get'
  })
}

/**
 * 退出登录
 */
export function apiLogout() {
  return request({
    url: '/user-api/user-center/user/logout',
    method: 'post'
  })
}
