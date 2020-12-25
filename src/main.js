import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './quasar'
import router from './router/permission'
import i18n from './i18n'

// 系统全局配置
import './config'
import constantModules from './share/constant'
import commonHandle from './share/handle'
import * as filters from './share/filters'

// 第三方组件
import animated from 'animate.css'
import jsonView from 'vue-json-views'
import Vuelidate from 'vuelidate'
import * as _ from 'lodash'
import Contextmenu from 'vue-contextmenujs'

// markdown
import './components/Markdown/Markdown'

// ECharts
import './components/ECharts/EChartsConfig'

// 样式
import './styles/index.scss'

import '@/icons' // icon

// 前往 public 文件夹的路径
Vue.prototype.$PUBLIC_PATH = process.env.BASE_URL
Vue.prototype._i18n = i18n
Vue.prototype._lodash = _
Vue.prototype._constant = constantModules
Vue.prototype._commonHandle = commonHandle

Vue.config.productionTip = false
Vue.use(animated)
Vue.use(jsonView)
Vue.use(Vuelidate)
Vue.use(Contextmenu)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const vue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

export default vue
