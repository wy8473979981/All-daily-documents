import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import axios from "./api/index.js";
import "lib-flexible";
import Plugins from "./components/index.js";
import Utils from "@/utils/index";
import { Toast, Notify, Dialog } from "vant";
import Mixin from "./mixins/index"
import * as filters from "./filters/index"
import preventReClick from "./directives/preventReClick"

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$util = Utils;
Vue.prototype.$Toast = Toast;
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$Notify = Notify;
const Success = (message) => {
	Notify({message, duration: 1200, color: '#FFFFFF', background: '#66CA96' })
}
const Error = (message) => {
	Notify({message, duration: 1200, color: '#FFFFFF', background: '#FD100E' })
}
Vue.prototype.$Success = Success;
Vue.prototype.$Error = Error;

Toast.setDefaultOptions({ duration: 800 });

Vue.use(Vant);
Vue.use(Plugins);
Vue.use(preventReClick);
Vue.mixin(Mixin)

router.beforeEach((to, from, next)=>{
	if(to.meta.title){
		document.title = to.meta.title
	}
	if(to.path === '/') {
		// 记录收件箱tab index，用于detail返回list，当list后退至首页重置index
		store.commit('setTabIndex', 0)
	}
	next()
})

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
