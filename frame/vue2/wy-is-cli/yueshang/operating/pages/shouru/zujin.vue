<template>
	<!--pages/shouru/zujin.wxml-->
	<view :class="'shouru-zujin ' + (recovery.show ? 'recovery' : '')">

		<app-header>
			<view v-show="recovery.show"> 纠错编辑 </view>
			<!-- 全部 -->
			<view slot="right" class="slot-right" v-show="!recovery.show">
				<app-picker @changed="onDateChanged" fields="month" :fromDate="params.yearMonth"></app-picker>
				<view class="header-right-select">
					<app-filter-dialog :groups="groups" @selected="bindselected" title="筛选" @open="bindopen" @close="bindclose"></app-filter-dialog>
				</view>
			</view>

			<view slot="right" style="margin-left: 20rpx" v-show="!recovery.show">
				<view class="flex" @tap="onRecoveryClick" v-show="params.type !== 'dj'">
					纠错
					<image src="/static/assets/images/icon-find-recovery.png" style="width: 32rpx; height: 32rpx; margin-left: 10rpx"></image>
				</view>
			</view>

		</app-header>

		<view class="tab-list-box" v-show="!recovery.show">
			<view v-for="(item, index) in tabList" :key="index" :class="'tab-list-item ' + (item.type === params.type ? 'border-current' : '')"
			 :data-type="item.type" @tap="changeTab">
				{{ item.label }}
			</view>
		</view>
		<app-section title="收缴率" :collapseable="true" v-show="!recovery.show && !show">
			<view class="registered-channels">
				<app-echarts v-if="page && page.charts" :options="page.charts.main.options"></app-echarts>
			</view>
		</app-section>
		<app-section title="项目排名">
			<view slot="head-actions">
				<view class="select-indicator">
					<view :class="'mount ' + (timeSpan === '0' ? 'active' : '')" @tap="changeSpan" data-span="0"> 当月 </view>
					<view class="line"> | </view>
					<view :class="'year ' + (timeSpan === '1' ? 'active' : '')" @tap="changeSpan" data-span="1"> 年累计 </view>
				</view>
			</view>
			<app-table :fixednum="2" :totalRow="totalRow" :values="dataList" :columns="columns" :selected="tableSelected"
			 @row-column-click="onRowColumnClick"></app-table>
		</app-section>

		<view class="recovery-actions" v-if="recovery.show">
			<view class="recovery-actions__action" @tap="cancelRecovery">取消</view>
			<view class="recovery-actions__action recovery-actions__action--priamry" @tap="postRecovery">提交</view>
		</view>

		<app-filter-dialog :checkboxes="dataList" @selected="showComparisonList" v-if="params.type !== 'dj' && !recovery.show"
		 tip="注意：最少选两项" @open="bindopen" @close="bindclose">
			<view class="comparison"> 对比 </view>
		</app-filter-dialog>

		<image class="to-top" src="/static/assets/images/icon-totpo.png" @tap="toTop"> </image>

	</view>
</template>

<script>
	// pages/shouru/zujin.js
	// import * as echarts from "@/packages/ec-canvas/echarts";
	const app = getApp();
	import regeneratorRuntime from "@/utils/runtime";
	import appSection from "@/components/container/section";
	import appTable from "@/components/table/index";
	import appFilterDialog from "@/components/filter/dialog";
	import appEcharts from "@/components/echarts/echarts";
	import appHeader from "@/components/common/header";
	import appProjectSelector from "@/components/selector/project";
	import appPicker from "@/components/selector/datepicker";

	export default {
		data() {
			return {
				canca: false,
				recovery: {
					show: false,
					selected: {},
					current: {},
				},
				selected: {},
				current: {},
				tableSelected: {
					key: "bisProjectId",
					keysMap: {},
				},
				keysMap: {},
				tabList: [{
						label: "租金收入",
						type: "zj",
					},
					{
						label: "物管收入",
						type: "wg",
					},
					{
						label: "多经收入",
						type: "dj",
					},
				],
				dataList: [],
				type: "zj",
				yueColumns: [{
						label: "序号",
						width: "90rpx",
					},
					{
						label: "项目",
						key: "projectName",
						color: "#3992BA",
						align: "left",
						width: "220rpx",
					},
					{
						label: "应收(万)",
						key: "curMonthMust",
						width: "220rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "收入(万)",
						key: "curMonthFact",
						width: "220rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "收缴率(合同)",
						key: "sjHtMonthRate",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "环比",
						key: "htmonthHb",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "同比",
						key: "htmonthTb",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "收缴率(权责)",
						key: "curMonthColRate",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "环比",
						key: "mhb",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "同比",
						key: "mtm",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "预算达成率",
						key: "comRate",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
				],
				nianColumns: [{
						label: "序号",
						width: "90rpx",
					},
					{
						label: "项目",
						key: "projectName",
						color: "#3992BA",
						align: "left",
						width: "220rpx",
					},
					{
						label: "应收(万)",
						key: "curYearMust",
						width: "220rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "收入(万)",
						key: "curYearFact",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "收缴率(合同)",
						key: "sjHtYearRate",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "环比",
						key: "htYearHb",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "同比",
						key: "htYearTb",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "收缴率(权责)",
						key: "curYearColRate",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "环比",
						key: "yhb",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "同比",
						key: "yty",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "预算达成率",
						key: "comRateYTD",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
				],
				//针对多经收入的columns
				yueColumnsDj: [{
						label: "序号",
						width: "90rpx",
					},
					{
						label: "项目",
						key: "projectName",
						color: "#3992BA",
						align: "left",
						width: "220rpx",
					},
					{
						label: "应收(万)",
						key: "curMonthMust",
						width: "220rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "收入(万)",
						key: "curMonthFact",
						width: "220rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "收缴率(合同)",
						key: "sjHtMonthRate",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "环比",
						key: "htmonthHb",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "同比",
						key: "htmonthTb",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "预算达成率",
						key: "comRate",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
				],
				nianColumnsDj: [{
						label: "序号",
						width: "90rpx",
					},
					{
						label: "项目",
						key: "projectName",
						color: "#3992BA",
						align: "left",
						width: "220rpx",
					},
					{
						label: "应收(万)",
						key: "curYearMust",
						width: "220rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "收入(万)",
						key: "curYearFact",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "收缴率(合同)",
						key: "sjHtYearRate",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "环比",
						key: "htYearHb",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "同比",
						key: "htYearTb",
						width: "150rpx",
						sortable: true,
						align: "right",
					},
					{
						label: "预算达成率",
						key: "comRateYTD",
						width: "200rpx",
						sortable: true,
						align: "right",
					},
				],
				show: false,
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
				selected: [],
				page: {
					table: {
						mode: "month",
					},
				},
			};
		},

		components: {
			appSection,
			appTable,
			appFilterDialog,
			appEcharts,
			appHeader,
			appProjectSelector,
			appPicker,
		},
		props: {},
		onLoad: function(options) {
			console.log(options);
			this.setData({
				params: { ...this.params,
					...options
				},
				columns: options.type == "dj" ? this.yueColumnsDj : this.yueColumns,
			});
			this.getDataList();
			// this.getStoreType(); // this.getStage();
		},
		onShow() {
			this.getDataList();
			this.getStoreType();
			// this.getStage();
		},
		methods: {
			onRowColumnClick(e) {
				const {
					show,
					selected
				} = this.recovery;
				const {
					row,
					column
				} = e.detail;
				if (show) {
					const rowKey = this.tableSelected.key;
					if (!selected[row[rowKey]]) {
						selected[row[rowKey]] = [];
					}
					if (selected[row[rowKey]].includes(column.key)) {
						selected[row[rowKey]].splice(selected[row[rowKey]].indexOf(column.key), 1);
					} else {
						selected[row[rowKey]].push(column.key);
					}
					this.tableSelected.keysMap = selected;
					this.tableSelected.keysMap = Object.assign({}, this.tableSelected.keysMap);
					this.tableSelected = Object.assign({}, this.tableSelected);
					return;
				}

				if (column.key === "projectName") {
					let bisProjectId = e.detail.row.bisProjectId;
					let projectName = e.detail.row.projectName;
					app.globalData.page.go("./shouruxq/shouruxq", { ...this.params,
						bisProjectId: bisProjectId,
						projectName: projectName,
						storeType: this.params.storeType
					});
					return;
				}

				let bisProjectId = row.bisProjectId;
				let currentColumn = column.key; // let isSelected = selectedList.find(i => i.markX === bisProjectId)
				// console.log(isSelected)
				// console.log(row,column,selectedList)
				// let keys =

				return;
			},

			async getDataList() {
				let res = await app.globalData.request
					.options({
						loading: true,
					})
					.get("/open/bis-open-month-rate!monthRate.action", this.params);
				let result = res.data.monthCollectionRateList.map((item, index) => {
					return { ...item,
						ranking: index,
						label: item.projectName
					};
				});
				let label = (this.params.yearMonth && this.params.yearMonth.split("-")[0]) || "2020";
				const legendData = [label.substring(2) + "年度" + "", (parseInt(label) - 1 + "").substring(2) + "年度" + ""];
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
							data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
						},
						yAxis: {
							type: "value",
						},
						unit: "%",
						series: [{
								type: "line",
								name: legendData[0],
								lineStyle: {
									color: "#3AABFF",
								},
								data: typeof res.data.curMonthColRateForHeadChart === "object" ?
									res.data.curMonthColRateForHeadChart.map((num) => num) : JSON.parse(res.data.curMonthColRateForHeadChart).map(
										(num) => num),
								areaStyle: {
									color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
									color: "#9BB3C6",
								},
								name: legendData[1],
								data: typeof res.data.curMonthColRateForHeadPrevChart === "object" ?
									res.data.curMonthColRateForHeadPrevChart.map((num) => num) : JSON.parse(res.data.curMonthColRateForHeadPrevChart)
									.map((num) => num), // data: curMonthColRateForHeadPrevChart
							},
						],
					},
					totalRow: res.data.monthCollectionRateList.slice(0, 1)[0],
					dataList: result.slice(1),
				};
				const {
					params
				} = this;
				await app.globalData.request
					.options({
						loading: true,
					})
					.get("/open/bis-open-mark-info!findPageMarkInfoList.action", { ...params,
						pageType: params.type,
						bizProjectId: "",
						pageSource: getCurrentPages().pop().route
					})
					.then((res) => {
						const keysMap = res.data.reduce((result, item) => {
							result[item.markX] = item.markY.split(",");
							return result;
						}, {});
						setdata["recovery.selected"] = keysMap;
						setdata["tableSelected.keysMap"] = keysMap;
						setdata["selected"] = res.data;
					});
				this.setData(setdata);
			},

			//切换 年月筛选
			changeSpan(e) {
				const span = e.currentTarget.dataset.span;
				this.setData({
					timeSpan: span,
				}); // 当tab为多经收入时，取不同的columns

				if (this.params.type == "dj") {
					if (span === "0") {
						this.setData({
							columns: this.yueColumnsDj,
						});
					} else {
						this.setData({
							columns: this.nianColumnsDj,
						});
					}
				} else {
					if (span === "0") {
						this.setData({
							columns: this.yueColumns,
						});
					} else {
						this.setData({
							columns: this.nianColumns,
						});
					}
				}
			},

			bindopen() {
				this.setData({
					show: true,
				});
			},

			bindclose() {
				this.setData({
					show: false,
				});
			},

			toTop() {
				if (uni.pageScrollTo) {
					uni.pageScrollTo({
						scrollTop: 0,
					});
				} else {
					uni.showModal({
						title: "提示",
						content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
					});
				}
			},

			// 切换tab
			async changeTab(e) {
				let type = e.currentTarget.dataset.type;
				let span = this.timeSpan; // 当tab为多经收入时，取不同的columns

				if (type == "dj") {
					if (span === "0") {
						await this.setData({
							["params.type"]: type,
							columns: this.yueColumnsDj,
						});
					} else {
						await this.setData({
							["params.type"]: type,
							columns: this.nianColumnsDj,
						});
					}
				} else {
					if (span === "0") {
						await this.setData({
							["params.type"]: type,
							columns: this.yueColumns,
						});
					} else {
						await this.setData({
							["params.type"]: type,
							columns: this.nianColumns,
						});
					}
				}

				this.getDataList();
			},

			// 获取搜索物业类型枚举
			async getStoreType() {
				if (this.canca) {
					return;
				}
				this.canca = true;
				let res = await app.globalData.request
					.options({
						loading: true,
					})
					.get("/open/bis-open-dict!chargeTypeList.action");
				let result = res.data.map((item) => {
					return {
						label: item.name,
						value: "storeType-" + item.code,
						selected: item.code === this.params.storeType,
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

			// 获取项目阶段枚举
			async getStage() {
				let res = await app.globalData.request
					.options({
						loading: true,
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
				let groups = this.groups;
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
					uni.navigateTo({
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

			onRecoveryClick() {
				this.setData({
					"recovery.show": true,
					"recovery.current": JSON.parse(JSON.stringify(this.recovery.selected)),
				});
				this.getDataList();
				this.getStoreType(); // this.getStage();
			},

			postRecovery() {
				const {
					bisProjectId,
					type: pageType,
					storeType
				} = this.params;
				const selectedMap = this.recovery.selected;
				const markInfos = Object.keys(selectedMap)
					.filter((key) => selectedMap[key].length)
					.map((key) => {
						return {
							markX: key,
							markY: selectedMap[key].join(","),
							notes: "",
						};
					});
				app.globalData.request
					.options({
						loading: true,
					})
					.post("/open/bis-open-mark-info!clearAndSavePageMarkInfoList.action", {
						bisProjectId,
						storeType,
						markInfos,
						pageType,
						pageSource: getCurrentPages().pop().route,
						bisProjectId: "",
						uuid: "feedback",
						userName: "pd测试管理员",
					})
					.then(() => {
						this.cancelRecovery(false);
					});
			},

			cancelRecovery(reset = true) {
				const setdata = {
					"recovery.show": false,
					"recovery.selected": this.tableSelected.keysMap,
				};

				if (reset !== false) {
					setdata["recovery.selected"] = this.recovery.current;
					setdata["tableSelected.keysMap"] = this.recovery.current;
				}

				this.setData(setdata);
				this.getDataList();
				this.getStoreType(); // this.getStage();
			},

			// 对比操作
			showComparisonList(e) {
				if (e.detail.length < 2) {
					uni.showToast({
						title: "最少选两项",
					});
					return;
				}
				let ids = e.detail.map((item) => item.bisProjectId).join(",");
				let params = this.params;
				params.ids = ids;
				app.globalData.page.go("/pages/shouru/duibi/duibi", params);
			},
		},
	};
</script>
<style>
	@import "./zujin.css";
</style>
