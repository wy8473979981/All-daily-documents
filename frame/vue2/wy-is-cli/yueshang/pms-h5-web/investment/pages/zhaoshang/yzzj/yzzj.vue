<template>
	<view class="container">
		<app-header>
			<app-project-selector @selected="onProjectSelected" v-if='showSelector'></app-project-selector>
		</app-header>
		<app-section>
			<view slot="head-title">
				<view class="selector">
					<app-catalogue title="已招租金达成率柱状图"></app-catalogue>
				</view>
			</view>
			<view class="registered-channels">
				<app-echarts :options="options"></app-echarts>
			</view>
		</app-section>
	</view>
</template>

<script>
// pages/zhaoshang/yzzj/yzzj.js
const app = getApp();
import regeneratorRuntime from "../../../utils/runtime";
import appHeader from "../../../components/common/header";
import appProjectSelector from "../../../components/selector/project";
import appSection from "../../../components/container/section";
import appCatalogue from "../../../components/catalogue/index";
import appEcharts from "../../../components/echarts/echarts";

export default {
	data() {
		return {
			showSelector:true,
			params: {
				bisProjectId: "",
			},
			options: {},
		};
	},

	components: {
		appHeader,
		appProjectSelector,
		appSection,
		appCatalogue,
		appEcharts,
	},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getDataList();
	},
	onShow(){
		this.setData({
			showSelector:true
		})
	},
	onHide(){
		this.setData({
			showSelector:false
		})
	},
	methods: {
		// 项目选择
		onProjectSelected(e) {
			this.setData({
				["params.bisProjectId"]: e.detail? e.detail.bisProjectId : "",
			});
			this.getDataList();
		},

		//获取柱状图数据
		async getDataList() {
			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/api/v1/report/bis/rentcompleterate/bigs/list", this.params);
			console.log(res);
			let chartData = res.data;
			let titleData = [],
				//底部文字
				zjdcl = [],
				//数据
				average = ""; //平均

			chartData.forEach((item) => {
				titleData.push(item.primaryforms);
				zjdcl.push(item.dcl);

				if (item.primaryforms === "平均") {
					average = item.dcl;
				}
			});
			const setData = {
				options: {
					grid: {
						bottom: "50px",
						containLabel: false,
					},
					tooltip: {
						show: false,
					},
					dataZoom: [
						{
							type: "inside",
							start: 1,
							end: 30,
							moveOnMouseWheel:true, 
						},
					],
					xAxis: {
						type: "category",
						boundaryGap: true,
						data: titleData,
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
					yAxis: {
						show: false,
					},
					series: [
						{
							type: "bar",
							data: zjdcl,
							//设置柱状图大小
							barWidth: 20,
							barGap: "0%",
							markLine: {
								symbol: "none",
								data: [
									{
										type: "average",
										name: "平均值",
										yAxis: average,
									},
								],
								lineStyle: {
									color: "#71C381",
								},
							},
							itemStyle: {
								normal: {
									color: function (params) {
										if (params.name !== "平均") {
											return "#4EABD3";
										} else {
											return "#6DD882";
										}
									},
									label: {
										show: true,
										position: "top",

										formatter(value) {
											return value.data + "%";
										},
									},
								},
							},
						},
					],
				},
			};
			this.setData(setData);
		},
	},
};
</script>
<style>
@import "./yzzj.css";
</style>
