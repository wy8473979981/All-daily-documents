import appProjectSelect from "./ys-n-project-select/index.vue";
import appDatePick from "./ys-n-date-pick/index.vue";
import appSection from "./ys-n-section/index.vue";
import appSearchCriteria from "./ys-n-search-criteria/index.vue";
import filterChartDialog from "./ys-n-filter-chart-dialog/index.vue";
import toTop from "./ys-n-to-top/index.vue";
import comparison from "./ys-n-comparison/index.vue";
import lengthways from "./ys-n-table/lengthways.vue";
import appEcharts from "./ys-n-echart/index";
import tab from './ys-n-tab/index.vue'
import appTableComponent from './ys-n-table/appTableComponent.vue'
import dialogComponent from './ys-n-dialog/index.vue'
import redressError from './ys-n-redress-error/index.vue'
import navBar from './ys-n-nav-bar/index.vue'
import filterDialog from './ys-n-filter-dialog/dialog.vue'
import treeSelect from './ys-n-tree-select/index.vue'
const Plugin = {
	install: function (Vue) {
		Vue.component("ys-n-project-select", appProjectSelect);
		Vue.component("ys-n-date-pick", appDatePick);
		Vue.component("ys-n-section", appSection);
		Vue.component("ys-n-search-criteria", appSearchCriteria);
		Vue.component("ys-n-to-top", toTop);
		Vue.component("ys-n-comparison", comparison);
		Vue.component("ys-n-length-ways", lengthways);
		Vue.component("ys-n-echart", appEcharts);
		Vue.component("ys-n-tab", tab);
		Vue.component("ys-n-table", appTableComponent);
		Vue.component('ys-n-dialog', dialogComponent);
		Vue.component('ys-n-redress-error', redressError);
		Vue.component('ys-n-nav-bar', navBar);
		Vue.component('ys-n-filter-dialog', filterDialog);
		Vue.component("ys-n-filter-chart-dialog", filterChartDialog);
		Vue.component("ys-n-tree-select", treeSelect);
	},
};
export default Plugin;
