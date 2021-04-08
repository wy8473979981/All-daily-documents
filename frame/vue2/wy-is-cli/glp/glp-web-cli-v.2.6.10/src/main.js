import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import App from './App'
import store from './store'
import router from './router'

// 引入element-ui.css
import '@/styles/theme/index.css'
// 引入字体css
import '@/styles/icon/iconfont.css'
// 引入全局样式
import '@/styles/index.scss' // global css


import i18n from './lang' // Internationalization
import './icons' // icon
// import './errorLog' // error log
import './permission' // permission control

import '@/components/registerGlobalTpl'

// import './mock' // simulation data

// 重写message提示层，每次只能允许一个弹出提示
let hasShowMessage=false;
let {Message}=Element;
let $message=(opt,type) => {
  	if(type==2){
  		Message.call(null,opt);
  	}else{
  		if(!hasShowMessage){
  			hasShowMessage=true;
  			Message.call(null,{
  				...opt,
  				onClose: () => {
  					if(opt.onClose){opt.onClose()};
  					hasShowMessage=false;
  				}
  			});
  		}
  	}
};
['success', 'warning', 'info', 'error'].forEach(function (type) {
  $message[type] = function (options) {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return $message(options);
  };
});
// 注册element组件
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});
// 覆盖Vue的原型方法$message
Vue.prototype.$message = $message;
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
