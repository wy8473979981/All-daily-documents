const app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		ready: false,
		options: null,
		list: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options = {}) {
		const res = await app.request
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
				"#": [],
			}
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

	onSelected(e) {
		app.cache.set("project-selector-selected", e.detail);
		app.page.back();
	},

	onAllSelected() {
		if (
			this.data.options.disabledAll !== "false" &&
			this.data.options.disabledAll
		) {
			app.toast({ title: "不能选择全部", icon: "none" });
			return;
		}
		this.onSelected({
			detail: {
				name: "全部",
				label: "全部",
				value: null,
			},
		});
	},
});
