import Vue from "vue";
import App from "./App.vue";
import './assets/styles/reset.css';
import "./plugins/element.js";
import '../theme/index.css';
import '@/assets/styles/element-ui-common.scss'
import store from './store/index';
import router from './router';
import comps from '@comps';
import './filter';
import enums from './enum/index';
import timeoutRouter from './prototype.js';
import importDirective from './directive';
import myCharts from './plugins/echarts/myCharts.js';
import { Popover ,Message} from 'element-ui';
import echarts from "echarts";
import VueClipboard from 'vue-clipboard2'

import '@utils/date.js';
import objectUtil from '@utils/params.js';
import Common from '@utils/common.js';
import Utils from '@utils/index.js';
import axios from "./apis/index.js";
Vue.prototype.$axios = axios;
Vue.use(VueClipboard)
Vue.prototype.$echarts = echarts;
Vue.use(Popover);

// console.log(process.env.NODE_ENV)
// if(process.env.NODE_ENV !== "production") require("./mock/mock.js")  // 只在开发环境中引入，生产环境不引入mock
// require("./mock/mock.js")

Vue.use(comps);
Vue.use(myCharts);
Vue.config.productionTip = false;
Vue.prototype.$enums = enums;
Vue.prototype.$timeoutRouter = timeoutRouter;
Vue.prototype.$objectUtil = objectUtil;
Vue.prototype.$common = Common;
Vue.prototype.$Utils = Utils;
Vue.prototype.$message = Message;

// 导入全局指令
importDirective(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
