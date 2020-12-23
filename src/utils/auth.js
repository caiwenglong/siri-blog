import Cookies from 'js-cookie'

const TokenKey = 'sr_blog_token'
const roleKey = 'sr_blog_role'
const userIdKey = 'sr_blog_user_id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setRole(role) {
  return Cookies.set(roleKey, role)
}

export function getRole() {
  return Cookies.get(roleKey)
}

export function setUserId(id) {
  return Cookies.set(userIdKey, id)
}

export function getUserId() {
  return Cookies.get(userIdKey)
}

