<template>
	<view class="common-project-selector">
		<view v-if="ready" class="index-group__item" @tap.stop="onAllSelected"> 全部 </view>
		<app-index-list :list="list" @selected="onSelected"> </app-index-list>
	</view>
</template>

<script>
const app = getApp();
import regeneratorRuntime from "../../utils/runtime";
import appIndexList from "../../components/selector/indexes";

export default {
	data() {
		return {
			ready: true,
			options: null,
			list: [],
			prevPath: null,
		};
	},

	components: {
		appIndexList,
	},
	props: {},
	created() {
		let prevPath = app.globalData.cache.get("prevPath", null);
		app.globalData.cache.clear("prevPath");
		this.setData({
			prevPath,
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options = {}) {
		const res = await app.globalData.request
			.options({
				loading: true,
				caching: 5,
			})
			.get("http://pd.powerlong.com/open/bis-open-dict!selectProjectList.action", {
				operStatus: 1,
			});
		const listMap = res.data.reduce(
			(result, project) => {
				const key = (project.projectShortName || project.pinyincode || "#")[0];

				if (!result[key]) {
					result[key] = [];
				}

				result[key].push(project);
				return result;
			},
			{
				"#": [],
			},
		);
		const list = Object.keys(listMap)
			.sort()
			.map((key) => {
				return {
					label: key,
					items: listMap[key].map((project) => {
						return {
							label: project.label || project.name || project.shortName,
							value: project,
						};
					}),
				};
			});
		this.setData({
			options,
			list,
			ready: true,
		});
	},

	methods: {
		onSelected(e) {
			app.globalData.cache.set("project-selector-selected-zs", e.detail);
			// if (this.prevPath) {
			// 	// setTimeout((_) => {
			// 	// 	// app.globalData.page.back();
			// 	// }, 200);
			// 	app.globalData.page.go("/");
			// } else {
			// }
			app.globalData.page.back();
		},
		onAllSelected() {
			if (this.options.disabledAll !== "false" && this.options.disabledAll) {
				app.globalData.toast({
					title: "不能选择全部",
					icon: "none",
				});
				return;
			}

			this.onSelected({
				detail: {
					bisProjectId: "",
					shortName: "全部",
				},
			});
		},
	},
};
</script>
<style>
@import "./project-selector.css";
</style>
