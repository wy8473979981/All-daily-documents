import YsNLoading from "./YsNLoading/index.js";
import YsNMap from "./YsNMap/index.vue";

const install = function (Vue) {
  Vue.component("ys-n-map", YsNMap);

  Vue.use(YsNLoading.directive);

  Vue.prototype.$ysnloading = YsNLoading.service;

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
}
