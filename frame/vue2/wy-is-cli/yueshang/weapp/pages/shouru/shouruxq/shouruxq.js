// pages/shouru/zujin.js
import * as echarts from "../../../packages/ec-canvas/echarts";
const app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		projectName: "",
		tabList: [
			{
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
		yueColumns: [
			{
				label: "月份",
				key: "yearMonth",
				standbyKey: "rank",
			},
			{
				label: "收缴率",
				key: "colRate",
				sortable: true,
        align: 'right'
			},
			{
				label: "同比",
				key: "mtm",
				sortable: true,
        align: 'right'
			},
		],
		nianColumns: [
			{
				label: "月份",
				key: "yearMonth",
			},
			{
				label: "收缴率",
				key: "ljColRate",
				sortable: true,
        align: 'right'
			},
			{
				label: "同比",
				key: "mtmLj",
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
			year: "2020",
		},
		selected: {},
		lineops: {
			grid: {
				top: 30,
				left: "20",
				right: "20",
				bottom: 30,
				containLabel: true,
			},
			legend: {
				//可设定图例在上、下、居中
				icon: "circle",
				itemHeight: 12,
				bottom: 0,
			},

			tooltip: {
				show: true,
				trigger: "axis",
				backgroundColor: "#fff",
				textStyle: {
					color: "#000",
					fontSize: 10,
				},
				borderWidth: 2,
				borderColor: "#1890FF",
				padding: 10,
				position: function (point, params, dom, rect, size) {
					//解决超出屏幕问题
					var x = 0; // x坐标位置
					var y = 5; // y坐标位置
					// 当前鼠标位置
					var pointX = point[0];
					var pointY = point[1];
					var boxWidth = size.contentSize[0];
					var boxHeight = size.contentSize[1];
					if (boxWidth > pointX) {
						x = pointX + 20;
					} else {
						x = pointX - boxWidth - 20;
					}
					return [x, y];
				},
				formatter: function (params, ticket, callback) {
					console.log(params);
					var res = "";
					// var res = '收入 : ';
					// var income = 0;
					// for (var j = 0; j < params.length; j++) {
					//   income += parseInt(params[j].value);
					// }

					// //使用for可以将需要的数据全部加到res
					// //注意下边的<br/>
					// res += income + '\n';
					for (var i = 0, l = params.length; i < l; i++) {
						res += params[i].seriesName + " : " + params[i].value + "%\n";
					}
					res +=
						"同比：" +
						(parseInt(params[0].value) - parseInt(params[1].value)) +
						"%";

					return res;
				},
			},
			xAxis: {
				type: "category",
				boundaryGap: false,
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
				// "axisLine": {       //x轴
				//   "show": true

				// },
				axisLabel: {
					show: true,
					interval: 0,
				},
				axisTick: {
					//刻度线
					show: true,
				},
				splitLine: {
					//网格线
					show: false,
				},
				axisTick: {
					show: false,
				},
			},
			yAxis: {
				x: "center",
				type: "value",
				interval: 0,
				splitLine: {
					lineStyle: {
						type: "dashed",
					},
				},
				axisLabel: {
					show: true,
					interval: 5,
					// textStyle: {
					// 		color: '#333'
					// }
				},
				// "axisLine": {       //y轴
				// 	show: true,
				// 	"onZero":true,
				// 	"onZeroAxisIndex":0,
				// 	"splitNumber":5

				// },
				// "axisTick": {       //刻度线
				//   "show": true
				// },
				// "splitLine": {     //网格线
				// 	"show": true
				// },
				axisLabel: {
					show: true,
					interval: "0",
					formatter: "{value}%",
				},
				axisLine: {
					show: true,
					onZero: true,
				},
				axisTick: {
					show: true,
				},
			},
			series: [
				{
					name: "20年度",
					type: "line",
					smooth: true,
					// data: [100, 200, 400, 900, 200, 300, 500],
					color: "#3AABFF",
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[
									{
										offset: 0,
										color: "rgba(207, 223, 254, 0.48)",
									},
									{
										offset: 1,
										color: "rgba(255, 255, 255, 0.48)",
									},
								],
								false
							),
							shadowColor: "rgba(108,80,243, 0.9)",
							shadowBlur: 20,
						},
					},
				},
				{
					name: "19年度",
					type: "line",
					smooth: true,
					// data: [400,300,400,900,300,300,500],
					color: "#9BB3C6",
				},
			],
		},
	},

	onDateChanged(e) {
		this.setData({
			["params.year"]: e.detail.value,
		});
		this.getDataList();
	},
	async getDataList() {
		let res = await app.request
			.options({ loading: true })
			.get(
				"/open/bis-open-project!monthCollectionRate.action",
				this.data.params
			);

		let result = res.data.curYearColRateList.map((item, index) => {
			return { ...item, ranking: index };
		});
		// let label =
		// 	(this.data.params.year && this.data.params.year.split("-")[0]) || "20";
		// console.log(label);
		let label =
			(this.data.params.yearMonth &&
				this.data.params.yearMonth.split("-")[0]) ||
			"2020";
		const legendData = [
			label.substring(2) + "年度" + "",
			(parseInt(label) - 1 + "").substring(2) + "年度" + "",
		];

		const setdata = {
			"page.charts.main.options": {
				unit: "%",
				legend: {
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
				series: [
					{
						type: "line",
						name: legendData[0],
						data: JSON.parse(res.data.curYearColRateArr).map((num) => num),
						areaStyle: {
							color: new app.echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: "#CFDFFE",
								},
								{
									offset: 1,
									color: "#FFFFFF",
								},
							]),
						},
						// data: curMonthColRateForHeadChart
					},
					{
						type: "line",
						name: legendData[1],
						data: JSON.parse(res.data.prevYearColRateArr).map((num) => num),
						// data: curMonthColRateForHeadPrevChart
					},
				],
			},
			dataList: result,
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
	onProjectSelected(e) {
		let detail = e.detail.value && e.detail.value.bisProjectId;
		this.setData({
			["params.bisProjectId"]: detail,
		});
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
			.options({ loading: true })
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
			.options({ loading: true })
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
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let { projectName, id } = options;
		let selected = {
			label: projectName,
			value: id,
		};
		this.setData({
			columns: this.data.yueColumns,
			["params.bisProjectId"]: options.id,
			projectName: options.projectName,
			selected,
			// ["params.year"]: app.getDefaultDate("year"),
		});
		this.getDataList();
		this.getStoreType();
		this.getStage();
	},
});
