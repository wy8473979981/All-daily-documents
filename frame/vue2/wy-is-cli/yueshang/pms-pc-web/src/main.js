import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import '@/assets/style/index.scss';
import router from './router'
import store from './store'
import components from './components'

Vue.config.productionTip = false

Vue.use(components);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
