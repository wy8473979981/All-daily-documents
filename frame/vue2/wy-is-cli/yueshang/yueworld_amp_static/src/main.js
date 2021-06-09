/*
 * @Author: fhj
 * @LastEditors: fhj
 */
import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import App from './App'
import store from './store'
import router from './router'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import './icons' // icon
import './permission' // permission control
import * as $echarts from 'echarts'
Vue.prototype.$echarts = $echarts;

require('./components')

// 自定义指令
Vue.use((Vue) => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach((directive) => {
      directive = directive.__esModule && directive.default ? directive.default : directive
      Object.keys(directive).forEach((key) => {
        Vue.directive(key, directive[key])
      })
    })
  })(require.context('./directive', false, /^\.\/.*\.js$/))
})

// 全局过滤器
import * as filters from './filters' // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$filters = { ...Vue.prototype.$filters, ...filters }

// 引入API
import PUBFN from './utils/pubFn'
console.log(PUBFN)
Vue.prototype.$PUBFN = PUBFN

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
