// export default {}
const transBollean = (value, format) => {
	const result = value == 'true' ? '是' : '否';
	return result;
};
// 去掉秒
const filterTimess = (value, format) => {
	if(value && value.length == 19) {
		value = value.slice(0,16);
	}
	return value;
};
const filters = {
	transBollean,
	filterTimess
}
// 2020-07-02 13:29:19
import Vue from "vue";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})