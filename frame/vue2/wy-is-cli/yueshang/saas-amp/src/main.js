import Vue from 'vue'
import ElementUI from 'element-ui'
import '@styles/reset.css'
import '../theme/index.css'
import App from './App'
import store from './store/index'
import router from './router'
import '@utils/date.js'
import comps from '@comps'
import './filter'
import enums from '@enum'
import timeoutRouter from './prototype.js'
import importDirective from './directive'
import objectUtil from './utils/params.js'
import Common from './utils/common.js'
import myCharts from './plugins/echarts/myCharts.js'
import './icons' // icon

Vue.use(comps)
Vue.use(ElementUI)
// Vue.use(VueParticles)
Vue.use(myCharts)
Vue.config.productionTip = false
Vue.prototype.$enums = enums
Vue.prototype.$timeoutRouter = timeoutRouter
Vue.prototype.$objectUtil = objectUtil
Vue.prototype.$common = Common

// 导入全局指令
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h=> h(App)
}).$mount("#app")
