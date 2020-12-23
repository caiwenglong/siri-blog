import moment from 'moment'

/*
Vue.filter('dataFormat', function(dateStr, pattern = 'YYYY-MM-DD'){
  return moment(dateStr).format(pattern)
})
*/

export function dateFormat(dateStr, pattern = 'YYYY-MM-DD') {
  return moment(dateStr).format(pattern)
}
