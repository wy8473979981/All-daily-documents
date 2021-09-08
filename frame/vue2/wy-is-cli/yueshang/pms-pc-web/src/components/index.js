/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 
 */
import YsNTable from './YsNTable'
import YsNForm from './YsNForm'
import YsNChart from './YsNChart'
import YsNList from './YsNList'
import YsNSearch from "./YsNSearch"
import YsNLoading from "./YsNLoading"
import YsNTitle from "./YsNTitle"
import YsNSelect from "./YsNSelect"
import YsNIcon from "./YsNIcon"
import YsnStatusSearch from "./YsNStatusSearch"
import YsnBtn from "./ysn-btn"
import YsNCascader from "./YsNCascader"

const config = {
  install: (Vue) => {
    Vue.component('ys-n-table', YsNTable)
    Vue.component('ys-n-form', YsNForm)
    Vue.component('ys-n-chart', YsNChart)
    Vue.component('ys-n-list', YsNList)
    Vue.component("ys-n-search", YsNSearch);
    Vue.component("ys-n-loading", YsNLoading);
    Vue.component("ys-n-title", YsNTitle);
    Vue.component("ys-n-select", YsNSelect);
    Vue.component("ys-n-icon", YsNIcon);
    Vue.component("ys-n-cascader", YsNCascader);


    
    Vue.component("ysn-status-search", YsnStatusSearch);
    Vue.component("ysn-btn", YsnBtn);

    Vue.use(YsNLoading.directive);

    Vue.prototype.$ysnloading = YsNLoading.service;
  }
}

export default config