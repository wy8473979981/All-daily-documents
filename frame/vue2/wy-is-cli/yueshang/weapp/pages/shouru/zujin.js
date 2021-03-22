// pages/shouru/zujin.js
import * as echarts from "../../packages/ec-canvas/echarts";
const app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		tabList: [{
				label: "租金收入",
				type: "zj",
			},
			{
				label: "物管收入",
				type: "wg",
			},
		],
		dataList: [],
		type: "zj",
		yueColumns: [{
				label: "序号",
				width: "100rpx",
			},
			{
				label: "项目",
				key: "projectName",
				color: '#399CFF',
			},
			{
				label: "收缴率",
				key: "curMonthColRate",
				width: "160rpx",
				sortable: true,
				align: 'right'
			},
			{
				label: "同比",
				key: "mtm",
				width: "160rpx",
				sortable: true,
				align: 'right'
			},
		],
		nianColumns: [{
				label: "序号",
				width: "100rpx",
			},
			{
				label: "项目",
				key: "projectName",
				color: '#399CFF',
			},
			{
				label: "收缴率",
				key: "curYearColRate",
				width: "160rpx",
				sortable: true,
				align: 'right'
			},
			{
				label: "同比",
				key: "yty",
				width: "160rpx",
				sortable: true,
				align: 'right'
			},
		],
		columns: [],
		totalRow: null,
		timeSpan: "0",
		groups: [],
		params: {
			storeType: "",
			stage: "",
			type: "zj",
			yearMonth: "",
			queryEndDate: "",
		},
	},
	clickRow(e) {
		let id = e.detail.row.bisProjectId;
		let projectName = e.detail.row.projectName;
		app.page.go('./shouruxq/shouruxq',{
			id:id,
			projectName:projectName
		})
	},
	async getDataList() {
		let res = await app.request
			.options({
				loading: true
			})
			.get("/open/bis-open-month-rate!monthRate.action", this.data.params);

		let result = res.data.monthCollectionRateList.map((item, index) => {
			return {
				...item,
				ranking: index
			};
		});

		let label =
			(this.data.params.yearMonth &&
				this.data.params.yearMonth.split("-")[0]) ||
			"2020";
		const legendData = [label.substring(2) + '年度' + '', ((parseInt(label) - 1) + '').substring(2) + '年度' + '']
		const setdata = {
			"page.charts.main.options": {
				legend: {
					// data: [label + "年度", label - 1 + "年度"],
					data: legendData,
					icon: "circle",
					itemHeight: 7,
				},
				xAxis: {
					type: "category",
					data: [
						"1月",
						"2月",
						"3月",
						"4月",
						"5月",
						"6月",
						"7月",
						"8月",
						"9月",
						"10月",
						"11月",
						"12月",
					],
				},
				yAxis: {
					type: "value",
				},
				unit: "%",
				series: [{
						type: "line",
						name: legendData[0],
						lineStyle: {
							color: '#3AABFF'
						},
						data: JSON.parse(res.data.curMonthColRateForHeadChart).map(
							(num) => num
						),
						areaStyle: {
							color: new app.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: "#CFDFFE",
								},
								{
									offset: 1,
									color: "#FFFFFF",
								},
							]),
						},
					},
					{
						type: "line",
						lineStyle: {
							color: '#9BB3C6'
						},
						name: legendData[1],
						data: JSON.parse(res.data.curMonthColRateForHeadPrevChart).map(
							(num) => num
						),
						// data: curMonthColRateForHeadPrevChart
					},
				],
			},
			totalRow: res.data.monthCollectionRateList.slice(0, 1)[0],
			dataList: result.slice(1),
		};
		this.setData(setdata);
	},

	changeSpan(e) {
		const span = e.currentTarget.dataset.span;
		this.setData({
			timeSpan: span,
		});
		if (span === "0") {
			this.setData({
				columns: this.data.yueColumns,
			});
		} else {
			this.setData({
				columns: this.data.nianColumns,
			});
		}
	},

	toTop() {
		if (wx.pageScrollTo) {
			wx.pageScrollTo({
				scrollTop: 0,
			});
		} else {
			wx.showModal({
				title: "提示",
				content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
			});
		}
	},
	// 切换tab
	async changeTab(e) {
		let type = e.currentTarget.dataset.type;
		await this.setData({
			["params.type"]: type,
		});
		this.getDataList();
	},
	// 获取搜索物业类型枚举
	async getStoreType() {
		let res = await app.request
			.options({
				loading: true
			})
			.get("/open/bis-open-dict!chargeTypeList.action");
		let result = res.data.map((item) => {
			return {
				label: item.name,
				value: "storeType-" + item.code,
			};
		});
		let group = {
			label: "物业类型",
			items: result,
			maxnum: 1,
		};
		let groups = this.data.groups;
		groups.push(group);
		this.setData({
			groups,
		});
	},
	// 获取项目阶段枚举
	async getStage() {
		let res = await app.request
			.options({
				loading: true
			})
			.get("/open/bis-open-dict!stageList.action");
		let result = res.data.map((item) => {
			return {
				label: item.name,
				value: "stage-" + item.code,
			};
		});
		let group = {
			label: "项目阶段",
			items: result,
			maxnum: 1,
		};
		let groups = this.data.groups;
		groups.push(group);
		this.setData({
			groups,
		});
	},
	bindselected(e) {
		e.detail.forEach((item) => {
			let temp = item.split("-");
			let key = temp[0];
			let value = temp[1];
			if (key === "storeType") {
				this.setData({
					["params.storeType"]: value,
				});
			}
			if (key === "stage") {
				this.setData({
					"params.stage": value,
				});
			}
		});
		this.getDataList();
	},
	onProjectSelected(e) {
		if (e.detail.value) {
			let id = e.detail.value.bisProjectId;
			wx.navigateTo({
				url: `./shouruxq/shouruxq?id=${id}&projectName=${e.detail.label}`,
			});
		}
	},
	onDateChanged(e) {
		this.setData({
			["params.yearMonth"]: e.detail.value,
		});
		this.getDataList();
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (options.type) {
			this.setData({
				["params.type"]: options.type,
			});
		}
		this.setData({
			["params.yearMonth"]: app.getDefaultDate("month"),
		});
		this.setData({
			columns: this.data.yueColumns,
		});
		this.getDataList();
		this.getStoreType();
		this.getStage();
	},
});