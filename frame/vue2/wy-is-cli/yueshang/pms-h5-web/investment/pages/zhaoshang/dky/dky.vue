<template>
	<view>
		<app-header>
			<app-project-selector @selected="onProjectSelected" v-if="showSelector"></app-project-selector>
			<view slot="right">
				<app-date-picker :fromDate="params.queryDate" fields="month" @changed="onDateChanged"></app-date-picker>
			</view>
		</app-header>
		<app-section>
			<view slot="head-title">
				<view class="selector">
					<app-catalogue title="待开业项目招商进度-品牌数"></app-catalogue>
				</view>
			</view>
			<view class="registered-channels">
				<app-echarts :options="businessBrand" height="580rpx" id='count'></app-echarts>
			</view>
			<view class="table-wrapper">
				<app-table identity="tab1" fixednum="1" :columns="businessColumns" :values="businessRows" :total-row="businessTotalRow" @row-column-click="onRowColumnClick"></app-table>
			</view>
		</app-section>
		<view class="contract-wrapper">
			<view class="registered-channels">
				<app-echarts :options="contractBrand" height="580rpx" id='num'></app-echarts>
			</view>
			<view class="table-wrapper">
				<app-table identity="tab2" fixednum="1" :columns="contractColumns" :values="contractRows" :total-row="contractTotalRow" @row-column-click="onRowColumnClick"></app-table>
			</view>
		</view>
	</view>
</template>

<script>
// pages/zhaoshang/dky/dky.js
const app = getApp();
import appHeader from "../../../components/common/header";
import appProjectSelector from "../../../components/selector/project";
import appSection from "../../../components/container/section";
import appCatalogue from "../../../components/catalogue/index";
import appEcharts from "../../../components/echarts/echarts";
import appDatePicker from "../../../components/selector/datepicker";
import appTable from "../../../components/table/index";

export default {
	data() {
		return {
			businessBrand: {},
			businessColumns: [],
			businessRows: [],
			businessTotalRow: null,
			contractBrand: {},
			contractColumns: [],
			contractRows: [],
			contractTotalRow: null,
			params: {
				// offset: 1,
				// limit: 200,
				steptype: "",
				queryDate: app.globalData.getDefaultDate("month"),
				projectId: "",
			},
		};
	},

	components: {
		appHeader,
		appProjectSelector,
		appSection,
		appCatalogue,
		appEcharts,
		appDatePicker,
		appTable,
	},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getDataList();
	},
	onShow() {
		this.setData({
			showSelector: true,
		});
	},
	onHide() {
		this.setData({
			showSelector: false,
		});
	},
	methods: {
		getDataList() {
			this.getSWQP();
			this.getHTQS();
		},

		// 商务签批计划完成情况-品牌数
		getSWQP() {
			app.globalData.request
				.options({
					loading: true,
				})
				.get("/api/v1/report/bis/tobeopens/projects/merchantsteps/bigs/swqplist", this.params)
				.then((res) => {
					let chartData = res.data.list.slice(1);
					let primaryForms = [],
						//底部文字
						wclRate = [],
						//完成率
						targetnum = [],
						//目标
						actualnum = [],
						//实际
						dsknum = []; //待收口

					let targetnumObj = {},
						actualnumObj = {},
						dsknumObj = {};
					let tableHeader = []; //根据后端数据获得表头

					let tableData = []; //根据后端数据筛选数据

					chartData.forEach((item, index) => {
						primaryForms.push(item.primaryForms);
						wclRate.push(item.wclRate);
						targetnum.push(item.targetnum);
						actualnum.push(item.actualnum);
						dsknum.push(item.dsknum);
						let header = {
							label: item.primaryForms,
							key: `index-${index}`,
							width: "140rpx",
							align: "left",
						};
						tableHeader.push(header);
						targetnumObj.name = "目标";
						targetnumObj[`index-${index}`] = item.targetnumStr;
						actualnumObj.name = "实际";
						actualnumObj[`index-${index}`] = item.actualnumStr;
						dsknumObj.name = "待收口";
						dsknumObj[`index-${index}`] = item.dsknumStr;
					}); //给头部添加一个空值，方便显示 目标 实际 待收口

					tableHeader.unshift({
						label: "",
						key: "name",
						width: "140rpx",
						align: "left",
					});
					tableData[0] = targetnumObj;
					tableData[1] = actualnumObj;
					tableData[2] = dsknumObj;
					console.log(tableHeader);
					console.log(tableData);
					const businessBrand = {
						color: ["#3B96BE", "#697F95", "#4EABD3", "#FAD961"],
						title: {
							show: true,
							text: "商务签批计划完成情况-品牌数",
							textStyle: {
								color: "#333",
								fontSize: "12",
							},
						},
						dataZoom: [
							{
								type: "inside",
								start: 1,
								end: 30,
							},
						],
						tooltip: {
							trigger: "axis",
							formatter: "{b0} \n <br/> {a0}: {c0}% \n <br/>{a1}: {c1} \n<br/> {a2}: {c2} \n <br/>{a3}: {c3}",
							padding: [8, 10, 8, 10],
							borderColor: "rgba(45, 159, 203, 1)",
							borderWidth: 1,
							backgroundColor: "rgba(255,255,255,0.9)",
							textStyle: {
								color: "#333333",
								fontSize: 11,
							},
						},
						grid: {
							left: "0%",
							right: "0%",
							bottom: "10%",
							top: "14%",
							containLabel: true,
						},
						legend: {
							selectedMode: true,
							data: ["完成率", "目标", "实际", "待收口"],
						},
						xAxis: {
							type: "category",
							boundaryGap: true,
							data: primaryForms,
							axisLabel: {
								show: true,
								textStyle: {
									fontSize: "12",
									color: "#333F4F",
								},
								interval: 0,
								rotate: "45",
							},
							splitLine: {
								show: false,
							},
						},
						yAxis: [
							{
								type: "value",
								splitLine: {
									show: false,
								},
								axisLine: {
									show: false,
								},
								axisTick: {
									//y轴刻度线
									show: false,
								},
							},
							{
								type: "value",
								splitLine: {
									show: false,
								},
								axisLabel: {
									formatter: "{value}%",
								},
								axisLine: {
									show: false,
								},
								axisTick: {
									//y轴刻度线
									show: false,
								},
							},
						],
						series: [
							{
								name: "完成率",
								type: "line",
								data: wclRate,
								yAxisIndex: 1,
								itemStyle: {
									normal: {
										label: {
											show: true,

											formatter(value) {
												return value.data + "%";
											},
										},
									},
								},
							},
							{
								name: "目标",
								type: "bar",
								data: targetnum,
								//设置柱状图大小
								barWidth: 10,
							},
							{
								name: "实际",
								type: "bar",
								data: actualnum,
								barWidth: 10,
							},
							{
								name: "待收口",
								type: "bar",
								data: dsknum,
								barWidth: 10,
							},
						],
					};
					this.setData({
						businessBrand,
						businessColumns: tableHeader,
						businessRows: tableData,
					});
				});
		},

		// 合同签署计划完成情况-品牌数
		getHTQS() {
			app.globalData.request
				.options({
					loading: true,
				})
				.get("/api/v1/report/bis/tobeopens/projects/merchantsteps/bigs/htbslist", this.params)
				.then((res) => {
					let chartData = res.data.list.slice(1);
					let primaryForms = [],
						//底部文字
						wclRate = [],
						//完成率
						targetnum = [],
						//目标
						actualnum = [],
						//实际
						dsknum = []; //待收口

					let targetnumObj = {},
						actualnumObj = {},
						dsknumObj = {};
					let tableHeader = []; //根据后端数据获得表头

					let tableData = []; //根据后端数据筛选数据

					chartData.forEach((item, index) => {
						primaryForms.push(item.primaryForms);
						wclRate.push(item.wclRate);
						targetnum.push(item.targetnum);
						actualnum.push(item.actualnum);
						dsknum.push(item.dsknum);
						let header = {
							label: item.primaryForms,
							key: `index-${index}`,
							width: "140rpx",
							align: "left",
						};
						tableHeader.push(header);
						targetnumObj.name = "目标";
						targetnumObj[`index-${index}`] = item.targetnumStr;
						actualnumObj.name = "实际";
						actualnumObj[`index-${index}`] = item.actualnumStr;
						dsknumObj.name = "待收口";
						dsknumObj[`index-${index}`] = item.dsknumStr;
					}); //给头部添加一个空值，方便显示 目标 实际 待收口

					tableHeader.unshift({
						label: "",
						key: "name",
						width: "140rpx",
						align: "left",
					});
					tableData[0] = targetnumObj;
					tableData[1] = actualnumObj;
					tableData[2] = dsknumObj;
					console.log(tableData);
					const contractBrand = {
						color: ["#3B96BE", "#C6DFCC", "#6DD882", "#FAD961"],
						title: {
							show: true,
							text: "合同签署计划完成情况-品牌数",
							textStyle: {
								color: "#333",
								fontSize: "12",
							},
						},
						dataZoom: [
							{
								type: "inside",
								start: 1,
								end: 30,
							},
						],
						tooltip: {
							trigger: "axis",
							formatter: "{b0} \n <br/> {a0}: {c0}% \n <br/>{a1}: {c1} \n<br/> {a2}: {c2} \n <br/> {a3}: {c3}",
							padding: [8, 10, 8, 10],
							borderColor: "rgba(45, 159, 203, 1)",
							borderWidth: 1,
							backgroundColor: "rgba(255,255,255,0.9)",
							textStyle: {
								color: "#333333",
								fontSize: 11,
							},
						},
						grid: {
							left: "0%",
							right: "0%",
							bottom: "10%",
							top: "14%",
							containLabel: true,
						},
						legend: {
							selectedMode: true,
							data: ["完成率", "目标", "实际", "待收口"],
						},
						xAxis: {
							type: "category",
							boundaryGap: true,
							data: primaryForms,
							axisLabel: {
								show: true,
								textStyle: {
									fontSize: "12",
									color: "#333F4F",
								},
								interval: 0,
								rotate: "45",
							},
							splitLine: {
								show: false,
							},
						},
						yAxis: [
							{
								type: "value",
								splitLine: {
									show: false,
								},
								axisLine: {
									show: false,
								},
								axisTick: {
									//y轴刻度线
									show: false,
								},
							},
							{
								type: "value",
								splitLine: {
									show: false,
								},
								axisLabel: {
									formatter: "{value}%",
								},
								axisLine: {
									show: false,
								},
								axisTick: {
									//y轴刻度线
									show: false,
								},
							},
						],
						series: [
							{
								name: "完成率",
								type: "line",
								data: wclRate,
								yAxisIndex: 1,
								itemStyle: {
									normal: {
										label: {
											show: true,

											formatter(value) {
												return value.data + "%";
											},
										},
									},
								},
							},
							{
								name: "目标",
								type: "bar",
								data: targetnum,
								//设置柱状图大小
								barWidth: 10,
							},
							{
								name: "实际",
								type: "bar",
								data: actualnum,
								barWidth: 10,
							},
							{
								name: "待收口",
								type: "bar",
								data: dsknum,
								barWidth: 10,
							},
						],
					};
					this.setData({
						contractBrand,
						contractColumns: tableHeader,
						contractRows: tableData,
					});
				});
		},

		onDateChanged(e) {
			this.setData({
				["params.queryDate"]: e.detail.value,
			});
			this.getDataList();
		},

		onProjectSelected(e) {
			this.setData({
				["params.projectId"]: e.detail ? e.detail.bisProjectId : "",
			});
			this.getDataList();
		},
	},
};
</script>
<style>
@import "./dky.css";
</style>
