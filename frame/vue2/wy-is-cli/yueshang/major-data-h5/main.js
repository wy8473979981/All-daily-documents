import Vue from 'vue'
import App from './App'
import request from './common/http.js'
import {toast,loading} from './common/toast.js'
import '@/utils/date.js'
import store from './store'
import * as echarts from "@/node_modules/echarts"
import ysWechat from "@/utils/wechat.js"
import components from '@/components'
Vue.config.productionTip = false

Vue.use(components)
// 定义全局对象
Vue.prototype.$store = store
Vue.prototype.$http = request
Vue.prototype.$toast = toast
Vue.prototype.$loading = loading
Vue.prototype.$echarts = echarts
Vue.prototype.$wechat = ysWechat

App.mpType = 'app'

Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			const handleData = (tepData, tepKey, afterKey) => {
				tepKey = tepKey.split('.');
				tepKey.forEach(item => {
					if (tepData[item] === null || tepData[item] === undefined) {
						let reg = /^[0-9]+$/;
						tepData[item] = reg.test(afterKey) ? [] : {};
						tepData = tepData[item];
					} else {
						tepData = tepData[item];
					}
				});
				return tepData;
			};
			const isFn = function(value) {
				return typeof value == 'function' || false;
			};
			Object.keys(obj).forEach(function(key) {
				let val = obj[key];
				key = key.replace(/\]/g, '').replace(/\[/g, '.');
				let front, after;
				let index_after = key.lastIndexOf('.');
				if (index_after != -1) {
					after = key.slice(index_after + 1);
					front = handleData(that, key.slice(0, index_after), after);
				} else {
					after = key;
					front = that;
				}
				if (front.$data && front.$data[after] === undefined) {
					Object.defineProperty(front, after, {
						get() {
							return front.$data[after];
						},
						set(newValue) {
							front.$data[after] = newValue;
							that.$forceUpdate();
						},
						enumerable: true,
						configurable: true
					});
					front[after] = val;
				} else {
					that.$set(front, after, val);
				}
			});
			this.$forceUpdate();
			isFn(callback) && this.$nextTick(callback);
		}
	}
});

const app = new Vue({
    ...App
})
app.$mount()
