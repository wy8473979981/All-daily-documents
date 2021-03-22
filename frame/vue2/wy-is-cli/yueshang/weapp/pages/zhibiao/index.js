import * as echarts from "../../packages/ec-canvas/echarts";
const app = getApp();

Page({
	data: {
		tabList: [],
		leaderDetail: {},
		currentTab: "0",
		registeredChannels: {
			grid: {
				top: 0,
				left: 30,
				right: 30,
				bottom: 0,
				containLabel: true,
			},
			yAxis: {
				axisLine: {
					//y轴
					show: false,
				},
			},
			legend: {
				show: false,
			},
			series: [
				{
					type: "pie",
					// 饼图的半径，数组的第一项是内半径，第二项是外半径
					radius: ["80%", "70%"],
					// 是否启用防止标签重叠策略，默认开启
					avoidLabelOverlap: false,
					hoverAnimation: false,
					// 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
					labelLine: {
						normal: {
							show: false,
						},
					},
					data: [
						{
							value: 50,
							name: "开业率",
							itemStyle: { normal: { color: "#1890FF" } },
							// color: '#1CC2FF',
							selected: false,
							label: {
								normal: {
									// 是显示标签
									show: true,
									position: "center",
									fontSize: 12,
									color: "#333333",
									formatter: "{b}\n\n{d}%",
								},
							},
						},
						{
							value: 50,
							selected: false,
							itemStyle: { normal: { color: "#EAEAEA" } },
							label: {
								normal: {
									show: false,
								},
							},
						},
					],
				},
			],
		},
		pieTitleList: [
			{ label: "开业率", key: "kyRate" },
			{ label: "开业达成率", key: "mothKyRate" },
			{ label: "出租率", key: "czRate" },
		],
		pieOptions: [],
		params: {
			storeType: "1",
			bisProjectId: "",
			yearMonth: "",
		},
		showLeader: false,
		dataDetail: {},
		empryStore: {},
	},
	onLoad: function () {
		this.setData({
			["params.yearMonth"]: app.getDefaultDate("month"),
		});
		this.getStoreType();
		this.getEmptyStore();
		this.getdata();
	},
	async getdata() {
		let res = await app.request
			.options({ loading: true })
			.get(
				"/open/bis-open-statistics!getZhiBiaoTotalInfo.action",
				this.data.params
			);
		this.setData({
			dataDetail: res.data,
		});
		let result = [];
		this.data.pieTitleList.forEach((item) => {
			let data = JSON.parse(JSON.stringify(this.data.registeredChannels));
			let value = (res.data[item.key] && res.data[item.key].split("%")[0]) || 0;
			let name = item.label;
			data.series[0].data[0].value = value;
			data.series[0].data[0].name = name;
			data.series[0].data[1].value = 100 - value;
			result.push(data);
		});
		this.setData({
			pieOptions: result,
		});
	},
	// 获取项目总信息
	async getLeaderInner() {
		let res = await app.request
			.options({ loading: true })
			.get(
				`/open/bis-open-report!bisProjectPrincipalInfo.action?bisProjectId=${this.data.params.bisProjectId}`
			);
		if (res.data) {
			this.setData({
				leaderDetail: res.data,
				showLeader: true,
			});
		} else {
			wx.showToast({
				title: "职位空缺",
				duration: 2000,
			});
		}
	},
	// 获取 空铺信息
	async getEmptyStore() {
		let res = await app.request
			.options({ loading: true })
			.get(
				`/open/bis-open!emptyShopList.action?bisProjectId=${this.data.params.bisProjectId}`
			);
		this.setData({
			empryStore: res.data,
		});
	},
	closeModal() {
		this.setData({
			showLeader: false,
		});
	},
	showLeaderDetail() {
		this.getLeaderInner();
	},
	// 跳转到指标排名
	gotoRanking() {
		app.page.go(`./xiangmupaiming?date=${this.data.params.yearMonth}`);
	},
	// 切换tab
	changeTab(e) {
		this.setData({
			["params.storeType"]: e.currentTarget.dataset.type,
		});
		this.getdata();
	},
	onProjectSelected(e) {
		this.setData({
			["params.bisProjectId"]:
				(e.detail.value && e.detail.value.bisProjectId) || "",
		});
		this.getdata();
	},
	onDateChanged(e) {
		this.setData({
			["params.yearMonth"]: e.detail.value,
		});
		this.getdata();
	},
	// 获取搜索物业类型枚举
	async getStoreType() {
		let res = await app.request.get(
			"/open/bis-open-dict!chargeTypeList.action"
		);
		this.setData({
			tabList: res.data,
		});
	},
});
