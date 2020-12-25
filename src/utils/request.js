import axios from 'axios'

import { getToken } from './auth'
// create axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api base_url
  timeout: 50000, // timeout,
  headers: { 'Access-Control-Allow-Origin': '*' }
})

// request interceptor

service.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Content-Type'] = 'application/json'
  if(getToken()) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// response interceptor

service.interceptors.response.use((response) => {
  const res = response.data
  if(res.code !== 'SR20000') {
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return response.data
  }
}, error => {
  return Promise.reject(error)
})

export default service
