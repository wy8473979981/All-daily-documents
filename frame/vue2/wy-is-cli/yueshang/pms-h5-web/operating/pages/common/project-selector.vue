<template>
	<view class="common-project-selector">
		<view class="selector-header">
			<view class="header-title">项目选择（在营）</view>
		</view>
		<app-index-list :list="list" @selected="onSelected"> </app-index-list>
	</view>
</template>

<script>
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
import appIndexList from "@/components/selector/indexes";

export default {
	data() {
		return {
			ready: false,
			options: null,
			list: [],
		};
	},

	components: {
		appIndexList,
	},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options = {}) {
		const res = await app.globalData.request
			.options({
				loading: true,
				caching: 5,
			})
			.get("/open/bis-open-dict!selectProjectList.action", {
				operStatus: 2,
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
				"#": [
					{
						label: "全部",
						value: [
							{
								shortName: "全部",
							},
						],
					},
				],
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
			console.log(e.detail.label);
			if (e.detail.label === "全部") {
				if (this.options.disabledAll !== "false" && this.options.disabledAll) {
					app.globalData.toast({
						title: "不能选择全部",
						icon: "none",
					});
					return;
				}
			}
			app.globalData.cache.set("project-selector-selected", e.detail);
			app.globalData.page.back();
		},
		onAllSelected() {
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
