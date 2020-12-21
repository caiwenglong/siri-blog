import { Notify, Loading, QSpinnerBars } from 'quasar'
import i18n from '@/i18n'
export function handleNotify(customOptions) {
  /*
  *   设置默认值
  * */
  const defaultOptions = {
    type: 'positive',
    message: '',
    position: 'top',
    timeout: 2500,
    textColor: 'white',
    progress: true,
    transform: true, // 是否国际化
    actions: [{ icon: 'close', color: 'white' }]
  }
  const options = Object.assign({}, defaultOptions, customOptions)
  Notify.setDefaults(options)
  Notify.create({
    type: options.type,
    message: options.transform ? i18n.t(options.message) : options.message
  })
}

export function handleShowLoading() {
  const defaultOptions = {
    spinner: QSpinnerBars,
    spinnerSize: 60,
    message: '登录中....',
    messageColor: 'primary',
    customClass: 'customClass'
  }
  const options = Object.assign({}, defaultOptions, defaultOptions)
  Loading.show(options)
}

export function handleHideLoading() {
  Loading.hide()
}
