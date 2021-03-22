// pages/zhibiao/xiangmupaiming.js
const app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		cols: [
			{
				label: "序号",
				width: "100rpx",
			},
			{
				label: "项目",
				key: "projectName",
				width: "160rpx",
			},
			{
				label: "招商率",
				key: "zsRate",
				unit: "%",
				width: "160rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "开业率",
				key: "kyRate",
				unit: "%",
				width: "160rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "日均客流(万/天)",
				key: "actualFlowDay",
				width: "220rpx",
				align: "right",
				sortable: true,
			},
		],
		allCols: [
			{
				label: "面积",
				key: "square",
				width: "180rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "招商率",
				key: "zsRate",
				unit: "%",
				width: "160rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "开业率",
				key: "kyRate",
				unit: "%",
				width: "160rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "日均客流(万/天)",
				key: "actualFlowDay",
				width: "220rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "渗透率(人/㎡/天)",
				key: "permeability",
				width: "180rpx",
				aalign: "right",
				sortable: true,
			},
			{
				label: "租金收缴率",
				key: "zjRate",
				width: "180rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "物业费收缴率",
				key: "wgRate",
				width: "220rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "新增签约面积(㎡)",
				key: "openSquare",
				width: "220rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "解约面积(㎡)",
				key: "endSquare",
				width: "220rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "小商铺平均租金(元/㎡/月)",
				key: "pzXsh",
				width: "220rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "日均销售(万元)",
				key: "salesDay",
				width: "220rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "小商铺坪效(元/㎡/月)",
				key: "pxXsh",
				width: "220rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "日均车流量(车/次/日)",
				key: "trafficDay",
				width: "220rpx",
				align: "right",
				sortable: true,
			},
			{
				label: "车位周转率(车/次/天)",
				key: "parkDay",
				width: "220rpx",
				align: "right",
				sortable: true,
			},
		],
		dataList: [],
		totalRow: null,
		params: {},
		yearMonth: "",
	},
	bindselected(e) {
		let list = e.detail;
		this.setData({
			cols: [...this.data.cols.slice(0, 2), ...list],
		});
	},
	async getDataList() {
		let res = await app.request.options({ loading: true }).get("/open/bis-open!manageIndexRanking.action", {
			yearMonth: this.data.yearMonth,
		});
		this.setData({
			dataList: res.data.objList.slice(0, -1).map((item, index) => {
				return { ...item, ranking: index + 1 };
			}),
			totalRow: res.data.objList.slice(-1)[0],
		});
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
	clickRow(e) {
		console.log(e.detail.id);
	},
	onLoad: function (options) {
		let date = new Date();
		let result = date.getFullYear() + "-" + (date.getMonth() + 1);
		this.setData({
			yearMonth: options.date || result,
		});
		console.log(options.date);
		this.getDataList();
	},
});
