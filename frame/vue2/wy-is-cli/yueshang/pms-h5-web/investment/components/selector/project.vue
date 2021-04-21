<template>
	<view class="app-project-selector" @tap="onClick">
		<view>{{ component.selected.label }}</view>
		<image v-if="!disabled" class="app-project-selector-icon" src="/static/assets/images/icon-selector-arrow.png"></image>
	</view>
</template>

<script>
const app = getApp();
import regeneratorRuntime from "../../utils/runtime";
const cacheKey = "project-selector-selected-zs";

export default {
	data() {
		return {
			component: {
				selected: {
					label: "全部",
					value: null,
				},
			},
		};
	},

	components: {},
	props: {
		page: {
			type: String,
			default: "/pages/common/project-selector",
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		hideAll: {
			type: Boolean,
			default: false,
		},
		disabledAll: {
			type: Boolean,
			default: false,
		},
		selected: {
			type: Object,
			default: null,
		},
	},
	watch: {
		selected: {
			handler: function (newValue) {
				if (newValue) {
					this.setData({
						"component.selected": {
							label: newValue.label,
							value: newValue.value,
						},
					});
				}
			},
			immediate: true,
			deep: true,
		},
	},
	// onPageShow() {
	// 	const selected = app.globalData.cache.get(cacheKey, null);
	// 	app.globalData.cache.clear(cacheKey);
	// 	this.setData({
	// 		"component.selected": selected || this.component.selected,
	// 	});
	// 	if (selected) {
	// 		this.emit();
	// 	}
	// },
	mounted() {
		let selected = app.globalData.cache.get(cacheKey, null);
		app.globalData.cache.clear(cacheKey);
		this.$nextTick(() => {
			if (selected) {
				selected.label = selected.shortName;
				this.setData({
					"component.selected": selected || this.component.selected,
				});
			}
			this.emit();
		});
	},
	methods: {
		// pageShow(e) {
		// 	// const selected = app.globalData.cache.get(cacheKey, null);
		// 	// app.globalData.cache.clear(cacheKey);
		// 	this.setData({
		// 		"component.selected": e.detail || this.component.selected,
		// 	});
		// 	if (e.detail) {
		// 		this.emit();
		// 	}
		// },
		onClick() {
			if (this.disabled) {
				return;
			}
			const { disabledAll, hideAll } = this;
			// if (this.$route.path === "/") {
			//   app.globalData.cache.set("prevPath", { prevPath: "prevPath" });
			//   app.globalData.page.go("./detail", params);
			// 	// this.pageGo(this.page, {
			// 	// 	disabledAll,
			// 	// 	hideAll,
			// 	// });
			// 	return;
			// }
			app.globalData.page.go(this.page, {
				disabledAll,
				hideAll,
			});
		},
		emit() {
			let detail = {
				value: Object.assign({}, this.component.selected),
			};
			this.$emit("selected", {
				detail: this.component.selected,
			});
		},
	},
};
</script>
<style>
@import "./project.css";
</style>
