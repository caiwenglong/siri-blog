import Cookies from 'js-cookie'

const TokenKey = 'sr_blog_token'
const roleKey = 'sr_blog_role'

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
