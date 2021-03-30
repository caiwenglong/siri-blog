import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

/*
Vue.filter('dataFormat', function(dateStr, pattern = 'YYYY-MM-DD'){
  return moment(dateStr).format(pattern)
})
*/

export function dateFormat(dateStr, pattern = 'YYYY-MM-DD') {
  return moment(dateStr).format(pattern)
}
