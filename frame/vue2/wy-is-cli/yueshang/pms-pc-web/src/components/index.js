import YsNTable from './YsNTable'
import YsNForm from './YsNForm'
import YsNChart from './YsNChart'
import YsNList from './YsNList'
import YsNSearch from "./YsNSearch";
import YsNLoading from "./YsNLoading";

const config = {
  install: (Vue) => {
    Vue.component('ys-n-table', YsNTable)
    Vue.component('ys-n-form', YsNForm)
    Vue.component('ys-n-chart', YsNChart)
    Vue.component('ys-n-list', YsNList)
    Vue.component("ys-n-search", YsNSearch);
    Vue.component("ys-n-loading", YsNLoading);

    Vue.use(YsNLoading.directive);

    Vue.prototype.$ysnloading = YsNLoading.service;
  }
}

export default config