import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css' //导入样式

import ElementUI from 'element-ui'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
