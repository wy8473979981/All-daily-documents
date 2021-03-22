<template>
	<view>
		<app-header>
			<!-- <app-project-selector bindselected="onProjectSelected" /> -->
			<view slot="right" style="display: flex">
				<app-date-picker :fromDate="queryModel.yearMonth" fields="month" @changed="onDateChanged"></app-date-picker>
				<app-filter-dialog style="margin-left: 32rpx" :groups="groups" title="筛选" @selected="onSelectedChange" @open="bindopen" @close="bindclose"></app-filter-dialog>
			</view>
		</app-header>

		<!-- <view class="updata-time">数据更新时间：{{ updateTime }} 数据来源系统：PMS系统</view> -->

		<view class="wrapper">
			<app-section :title="chartsTitle" :collapseable="collapseable" v-if="show">
				<view class="head-actions_left_view" slot="head-actions_left">
					<!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
					<!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
					<app-filter-chartdialog :items="items" @chartselected="onChartSelectedChange"> </app-filter-chartdialog>
				</view>
				<app-echarts height="400rpx" :options="lineops"></app-echarts>
			</app-section>
		</view>

		<view class="wrapper" style="margin-top: 12rpx">
			<!-- <app-header tabs="{{ [{ label: '购物列表' }, { label: '项目排名' }] }}" bind:tab-changed="onTabChanged"></app-header> -->
			<app-section title="项目排名">
				<view slot="head-actions">
					<view class="list-mode">
						<text :class="'list-mode-item ' + (table.mode === 'day' ? 'active' : '')" @tap="onListModeChanged" data-value="day">昨日</text>｜
						<text :class="'list-mode-item ' + (table.mode === 'month' ? 'active' : '')" @tap="onListModeChanged" data-value="month">当月</text>｜
						<text :class="'list-mode-item ' + (table.mode === 'year' ? 'active' : '')" @tap="onListModeChanged" data-value="year">年累计</text>
					</view>
				</view>
				<app-table :values="table.dataList" :columns="table.columns" :totalRow="table.totalRow" :fixednum="2" @row-column-click="onRowColumnClick"> </app-table>
			</app-section>
		</view>
	</view>
</template>

<script>
// pages/xiaoshou/paiming/paiming.js
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const monthColumns = [
	{
		label: "序号",
		width: "90rpx",
		fixed: true,
	},
	{
		label: "项目",
		key: "projectName",
		color: "#3B96BE",
		width: "180",
		align: "left",
		fixed: true,
	},
	{
		label: "平效",
		key: "px",
		sortable: true,
		width: "140",
		align: "right",
	},
	{
		label: "同比",
		key: "pxTb",
		sortable: true,
		width: "140",
		align: "right",
	},
	{
		label: "租售比",
		key: "zsb",
		sortable: true,
		width: "140",
		align: "right",
	},
	{
		label: "同比",
		key: "zsbTb",
		sortable: true,
		width: "140",
		align: "right",
	},
	{
		label: "销售额(万元)",
		key: "monthSales",
		sortable: true,
		width: "200",
		align: "right",
	},
	{
		label: "同比",
		key: "mtm",
		width: "130",
		sortable: true,
		align: "right",
	},
	{
		label: "环比",
		key: "hb",
		width: "130",
		sortable: true,
		align: "right",
	},
];
const yearColumns = [
	{
		label: "序号",
		width: "90rpx",
	},
	{
		label: "项目",
		key: "projectName",
		color: "#3B96BE",
		width: "180",
		align: "left",
	},
	{
		label: "平均月平效",
		key: "avgMonthPx",
		sortable: true,
		width: "200",
		align: "right",
	},
	{
		label: "销售额(万元)",
		key: "yearSales",
		sortable: true,
		width: "200",
		align: "right",
	},
	{
		label: "同比",
		key: "yty",
		width: "130",
		sortable: true,
		align: "right",
	},
];
const dayColumns = [
	{
		label: "序号",
		width: "90rpx",
	},
	{
		label: "项目",
		key: "name",
		color: "#3B96BE",
		width: "180",
		align: "left",
	},
	{
		label: "销售额(万元)",
		key: "yesterDaySales",
		sortable: true,
		width: "200",
		align: "right",
	},
	{
		label: "环比",
		key: "hb",
		width: "130",
		sortable: true,
		align: "right",
	},
	{
		label: "达成率",
		key: "dcl",
		width: "130",
		sortable: true,
		align: "right",
	},
];
import appHeader from "@/components/common/header";
import appProjectSelector from "@/components/selector/project";
import appSection from "@/components/container/section";
import appEcharts from "@/components/echarts/echarts";
import appTable from "@/components/table/index";
import appFilterDialog from "@/components/filter/dialog";
import appDatePicker from "@/components/selector/datepicker";
import appFilterChartdialog from "@/components/filter/chartdialog";

export default {
	data() {
		return {
			show: true,
			chartsTitle: "平效(元/m²)",
			queryModel: {
				operateArea: "",
				provinceCd: "",
				yearMonth: null,
				storeType: "",
				stage: "",
			},
			updateTime: null,
			collapseable: true,
			pxCharData: [],
			// 当年平效
			pxPrevYearCharData: [],
			//上年平效
			monthSalesChart: [],
			//当年销售额
			prevMonthSalesChart: [],
			//上年销售额
			zsbChart: [],
			// 当年租售比
			prevZsbChart: [],
			// 上年租售比
			lineops: {
				decimals: "xiaoshoupaiming",
				unit: "元/㎡",
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
				},
				yAxis: {
					type: "value",
					boundaryGap: false,
				},
				series: [
					{
						type: "line",
						lineStyle: {
							color: "#3AABFF",
						},
						areaStyle: {
							color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: "#2D9FCB",
								},
								{
									offset: 1,
									color: "rgba(255,255,255,0.48)",
								},
							]),
						},
					},
					{
						type: "line",
						lineStyle: {
							color: "#9BB3C6",
						},
					},
				],
			},
			xAxis: {
				type: "category",
				boundaryGap: false,
				data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
			},
			yAxis: {
				type: "value",
				boundaryGap: false,
			},
			lineStyle: {
				color: "#3AABFF",
			},
			areaStyle: {
				color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: "#2D9FCB",
					},
					{
						offset: 1,
						color: "rgba(255,255,255,0.48)",
					},
				]),
			},
			lineStyle: {
				color: "#9BB3C6",
			},
			table: {
				mode: "month",
				columns: monthColumns,
				totalRow: null,
				dataList: [],
			},
			mTotalRow: null,
			yTotalRow: null,
			dTotalRow: null,
			monthData: [],
			yearData: [],
			dayData: [],
			groups: [],
			items: [
				{
					title: "平效",
					value: "px",
					unit: "元/m²",
				},
				{
					title: "销售额",
					value: "xse",
					unit: "万元",
				},
				{
					title: "租售比",
					value: "zsb",
					unit: "万元",
				},
			],
		};
	},

	components: {
		appHeader,
		appProjectSelector,
		appSection,
		appEcharts,
		appTable,
		appFilterDialog,
		appDatePicker,
		appFilterChartdialog,
	},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log("options==", options);
		// console.log(options)
		// const date = new Date()
		// let month = date.getMonth() + 1
		// let yearMonth = date.getFullYear()
		// if (month > 9) {
		//   yearMonth += '-' + month
		// } else {
		//   yearMonth += '-0' + month
		// }
		// const project = app.cache.get('project-selector-selected-ys')
		// let provinceCd = ''
		// if (project && project.name !== '全部') {
		//   provinceCd = project.name
		// }
		this.setData({
			// updateTime: yearMonth + date.getDate(),
			"queryModel.yearMonth": options.yearMonth,
			"queryModel.storeType": options.storeType, // 'queryModel.provinceCd': provinceCd
		});
		this.queryData();
		this.getStoreType();
	},
	methods: {
		// 获取搜索物业类型枚举
		async getStoreType() {
			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open-dict!chargeTypeList.action");
			let result = res.data.map((item) => {
				return {
					label: item.name,
					value: "storeType-" + item.code,
					selected: item.code === this.queryModel.storeType,
				};
			});
			let group = {
				label: "物业类型",
				items: result,
				maxnum: 1,
			};
			let groups = this.groups;
			groups.push(group);
			this.setData({
				groups,
			});
		},

		onProjectSelected(e) {
			// console.log(e)
			let provinceCd = "";

			if (e.detail.label !== "全部") {
				provinceCd = e.detail.label;
			}

			this.setData({
				"queryModel.provinceCd": provinceCd,
			});
			this.queryData();
		},

		onDateChanged(e) {
			// console.log(e)
			this.setData({
				"queryModel.yearMonth": e.detail.value,
			});
			this.queryData();
		},

		onChartSelectedChange(e) {
			let curChartData = [];
			let prevCartData = [];
			let decimals = "";
			let unit = "";
			this.items.forEach((item) => {
				if (item.value === e.detail.value) {
					if (item.value === "px") {
						(curChartData = this.pxCharData), (prevCartData = this.pxPrevYearCharData), (decimals = "xiaoshoupaiming"), (unit = "元/㎡");
					}

					if (item.value === "xse") {
						(curChartData = this.monthSalesChart), (prevCartData = this.prevMonthSalesChart);
						(decimals = "paiming"), (unit = "");
					}

					if (item.value === "zsb") {
						(curChartData = this.zsbChart), (prevCartData = this.prevZsbChart);
						(decimals = ""), (unit = "%");
					}

					const setData = {
						chartsTitle: e.detail.title + "(" + e.detail.unit + ")",
						"lineops.decimals": decimals,
						"lineops.unit": unit,
						"lineops.series[0].data": curChartData,
						"lineops.series[1].data": prevCartData,
					};
					this.setData(setData);
				}
			});
		},

		bindopen() {
			this.setData({
				show: false,
			});
		},

		bindclose() {
			this.setData({
				show: true,
			});
		},

		onSelectedChange(e) {
			// console.log(e)
			const detail = e.detail;

			if (detail.length === 0) {
				this.setData({
					queryModel: {
						provinceCd: "",
						yearMonth: this.queryModel.yearMonth,
						storeType: "",
						stage: "",
					},
				});
			} else {
				let kv = {};
				detail.forEach((item) => {
					const key = item.split("-")[0];
					const val = item.split("-")[1];
					kv[key] = val;
				});

				for (const key in kv) {
					this.setData({
						[`queryModel.${key}`]: kv[key],
					});
				}
			}

			this.queryData();
		},

		onListModeChanged(e) {
			const mode = e.target.dataset.value;

			if (this.table.mode !== mode) {
				if (mode === "month") {
					this.setData({
						"table.mode": mode,
						"table.columns": monthColumns,
						"table.totalRow": this.mTotalRow,
						"table.dataList": this.monthData,
					});
				} else if (mode === "year") {
					this.setData({
						"table.mode": mode,
						"table.columns": yearColumns,
						"table.totalRow": this.yTotalRow,
						"table.dataList": this.yearData,
					});
				} else {
					this.setData({
						"table.mode": mode,
						"table.columns": dayColumns,
						"table.totalRow": this.dTotalRow,
						"table.dataList": this.dayData,
					});
				}
			}
		},

		onActionsLeftCatch(e) {
			console.log("onActionsLeftCatch");
		},

		onRowColumnClick(e) {
			// console.log(e)
			app.globalData.page.go("../month/month", {
				bisProjectId: e.detail.row.bisProjectId,
				projectName: e.detail.row.projectName,
				yearMonth: this.queryModel.yearMonth,
				storeType: this.queryModel.storeType,
			});
		},

		queryData() {
			app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open-project!salesOfMonOrYear.action", this.queryModel)
				.then((res) => {
					const data = res.data;
					const initChar = data.initChar;
					const initPrevYearChar = data.initPrevYearChar; // const year = new Date().getFullYear();

					const year = this.queryModel.yearMonth.split("-")[0]; // const lastYear = String(year - 1);
					// const legendData = [year.substring(2) + "年度", lastYear.substring(2) + "年度"];

					const mode = this.table.mode;
					const legendData = [(year + "").substring(2) + "年度" + "", (year - 1 + "").substring(2) + "年度" + ""];
					const salesMonth = data.salesMonth; // 月数据

					let mData = []; // 年数据

					let yData = [];
					let dData = res.data.salesDay.slice(1).map((item) => {
						return { ...item, bisProjectId: item.id, projectName: item.name };
					});
					let dTotalRow = res.data.salesDay.slice(0, 1)[0];
					let dataList = [];
					let totalRow = null;
					let yTotalRow = null;
					let mTotalRow = null;

					for (let i = 0, len = salesMonth.length; i < len; i++) {
						const item = salesMonth[i];

						if (i === 0) {
							// 合计数据
							// 月合计
							mTotalRow = {
								projectName: "合计",
								px: item.pxTot,
								pxTb: item.pxTbTot,
								zsb: item.zsbTot,
								zsbTb: item.zsbTbTot,
								monthSales: item.monthSalesTot,
								mtm: item.mtmTot,
								hb: item.hbTot,
							}; // 年合计

							yTotalRow = {
								projectName: "合计",
								avgMonthPx: item.avgMonthPxTot,
								yearSales: item.yearSalesTot,
								yty: item.ytyTot,
							};
						} else {
							// 月数据
							mData.push({
								bisProjectId: item.bisProjectId,
								projectName: item.projectName,
								px: item.px,
								pxTb: item.pxTb,
								zsb: item.zsb,
								zsbTb: item.zsbTb,
								monthSales: item.monthSales,
								mtm: item.mtm,
								hb: item.hb,
							}); // 年数据

							yData.push({
								bisProjectId: item.bisProjectId,
								projectName: item.projectName,
								avgMonthPx: item.avgMonthPx,
								yearSales: item.yearSales,
								yty: item.yty,
							});
						}
					}

					if (mode === "day") {
						dataList = dData;
						totalRow = dTotalRow;
					} else if (mode === "month") {
						totalRow = mTotalRow;
						dataList = mData;
					} else {
						totalRow = yTotalRow;
						dataList = yData;
					} // // 筛选条件配置
					// let options = this.data.options
					// if (options.length === 2) {
					//   // 项目区域
					//   let areaOptionItem = {
					//     label: '项目区域',
					//     maxnum: 1,
					//     items: [{
					//       label: '全部',
					//       value: 'operateArea-'
					//     }]
					//   }
					//   data.result.operateAreaList.forEach(item => {
					//     areaOptionItem.items.push({
					//       label: item.operateArea,
					//       value: 'operateArea-' + item.index
					//     })
					//   })
					//   options.push(areaOptionItem)
					//   // 省份
					//   let provOptionItem = {
					//     label: '省份',
					//     maxnum: 1,
					//     items: [{
					//       label: '全部',
					//       value: 'provinceCd-'
					//     }]
					//   }
					//   data.result.proviceList.forEach(item => {
					//     provOptionItem.items.push({
					//       label: item.province,
					//       value: 'provinceCd-' + item.index
					//     })
					//   })
					//   options.push(provOptionItem)
					// }
					// 当年平效
					// let initCharData = [];

					if (initChar.pxChart && initChar.pxChart.length > 3) {
						this.pxCharData = JSON.parse(initChar.pxChart);
					} // 上年平效
					// let initPrevYearCharData = [];

					if (initPrevYearChar.pxChart && initPrevYearChar.pxChart.length > 3) {
						this.pxPrevYearCharData = JSON.parse(initPrevYearChar.pxChart);
					}

					this.monthSalesChart = JSON.parse(initChar.monthSalesChart);
					this.prevMonthSalesChart = JSON.parse(initPrevYearChar.monthSalesChart);
					this.zsbChart = JSON.parse(initChar.zsbChart);
					this.prevZsbChart = JSON.parse(initPrevYearChar.zsbChart);
					this.setData({
						"lineops.legend.data": legendData,
						"lineops.series[0].name": legendData[0],
						"lineops.series[0].data": this.pxCharData,
						"lineops.series[1].name": legendData[1],
						"lineops.series[1].data": this.pxPrevYearCharData,
						monthData: mData,
						yearData: yData,
						mTotalRow: mTotalRow,
						yTotalRow: yTotalRow,
						dTotalRow: dTotalRow,
						dayData: dData,
						"table.totalRow": totalRow,
						"table.dataList": dataList,
					});
				});
		},
	},
};
</script>
<style>
@import "./paiming.css";
</style>
