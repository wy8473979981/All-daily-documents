import Vue from 'vue'
import App from './App.vue'
import Components from '/src/components'
// import '/src/assets/style/index.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";

Vue.use(ElementUI)
Vue.use(Components)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
