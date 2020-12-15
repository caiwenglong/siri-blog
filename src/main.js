import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './quasar'
import router from './router/permission'

// 系统全局配置
import './config'

// 第三方组件
import animated from 'animate.css'
import jsonView from 'vue-json-views'

// markdown
import './components/Markdown/Markdown'

// ECharts
import './components/ECharts/EChartsConfig'

// 样式
import './styles/index.scss'

// 前往 public 文件夹的路径
Vue.prototype.$PUBLIC_PATH = process.env.BASE_URL

Vue.config.productionTip = false
Vue.use(animated)
Vue.use(jsonView)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue
