import appProjectSelect from "./projectSelect/index.vue";
import appDatePick from "./datePick/index.vue";
import appSection from "./section/index.vue";
import searchCriteria from "./searchCriteria/index.vue";
import toTop from "./toTop/index.vue";
import comparison from "./comparison/index.vue";
import lengthways from "./table/lengthways.vue";
import echart from "./echart/index.vue";

const Plugin = {
	install: function(Vue) {
		Vue.component("appProjectSelect", appProjectSelect);
		Vue.component("appDatePick", appDatePick);
		Vue.component("appSection", appSection);
		Vue.component("searchCriteria", searchCriteria);
		Vue.component("toTop", toTop);
		Vue.component("comparison", comparison);
		Vue.component("lengthways", lengthways);
		Vue.component("echart", echart);
	},
};
export default Plugin;
