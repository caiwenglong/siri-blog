import Vue from 'vue'

// 浏览器 title
Vue.prototype.$title = ' | SIRI Blog'

// 侧边栏风格
Vue.prototype.$SildeBar = 'hHh lpR fFf' // 风格二：lHh lpR fFf

// axiois 中请求基地址，如果需要请在 axios/fetchData.js 中打开
Vue.prototype.$baseURL = ''

// 请求超时时间
Vue.prototype.$timeOut = 8000

// 组件最大缓存数
Vue.prototype.$Max_KeepAlive = 10

export default Vue
