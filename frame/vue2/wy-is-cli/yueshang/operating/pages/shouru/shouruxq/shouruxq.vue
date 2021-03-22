<template>
	<view :class="'shouru-zujin ' + (recovery.show ? 'recovery' : '')">
		<app-header>
			<app-project-selector @selected="onProjectSelected" :selected="selected" disabled-all></app-project-selector>
			<view class v-if="params.bisProjectId"> </view>
			<view slot="right" v-if="!recovery.show">
				<app-picker @changed="onDateChanged" fields="year" :fromDate="params.year"></app-picker>
			</view>
			<view slot="right" style="margin-left: 20rpx" v-if="!recovery.show">
				<app-filter-dialog title="筛选" :groups="groups" @selected="bindselected"></app-filter-dialog>
			</view>
			<view slot="right" style="margin-left: 20rpx" v-if="params.type !== 'dj'">
				<view class="flex" @tap="onRecoveryClick">
					纠错
					<image src="/static/assets/images/icon-find-recovery.png" style="width: 32rpx; height: 32rpx; margin-left: 10rpx"></image>
				</view>
			</view>
		</app-header>
		<view class="tab-list-box">
			<view v-for="(item, index) in tabList" :key="index" :class="'tab-list-item ' + (item.type === params.type ? 'border-current' : '')"
			 :data-type="item.type" @tap="changeTab">
				{{ item.label }}
			</view>
		</view>
		<app-section title="收缴率" :collapseable="true" v-if="!recovery.show">
			<view class="registered-channels">
				<app-echarts :options="page.charts.main.options"></app-echarts>
			</view>
		</app-section>
		<app-section title="本年收入">
			<view slot="head-actions">
				<view class="select-indicator">
					<view :class="'mount ' + (timeSpan === '0' ? 'active' : '')" @tap="changeSpan" data-span="0"> 当月 </view>
					<view class="line"> | </view>
					<view :class="'year ' + (timeSpan === '1' ? 'active' : '')" @tap="changeSpan" data-span="1"> 年累计 </view>
				</view>
			</view>
			<app-table :totalRow="totalRow" :values="dataList" :columns="columns" :selected="tableSelected" @row-column-click="onRowColumnClick"></app-table>
		</app-section>

		<view class="recovery-actions" v-if="recovery.show">
			<view class="recovery-actions__action" @tap="cancelRecovery">取消</view>
			<view class="recovery-actions__action recovery-actions__action--priamry" @tap="postRecovery">提交</view>
		</view>
	</view>
</template>

<script>
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
				recovery: {
					show: false,
					selected: {},
					current: {},
				},
				selected: {},
				current: {},
				tableSelected: {
					key: "businessKey",
					keysMap: {},
				},
				keysMap: {},
				projectName: "",
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
						label: "月份",
						key: "yearMonth",
						align: "left",
						width: "150",
					},
					{
						label: "收缴率",
						key: "colRate",
						align: "right",
						sortable: true,
					},
					{
						label: "同比",
						key: "mtm",
						align: "right",
						sortable: true,
					},
				],
				nianColumns: [{
						label: "月份",
						key: "yearMonth",
						width: "150",
						align: "left",
					},
					{
						label: "收缴率",
						align: "right",
						key: "ljColRate",
						sortable: true,
					},
					{
						label: "同比",
						align: "right",
						key: "mtmLj",
						sortable: true,
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
					year: "",
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
						borderColor: "#3992BA",
						padding: 10,
						position: function(point, params, dom, rect, size) {
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
						formatter: function(params, ticket, callback) {
							console.log(params);
							var res = ""; // var res = '收入 : ';
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

							res += "同比：" + (parseInt(params[0].value) - parseInt(params[1].value)) + "%";
							return res;
						},
					},
					xAxis: {
						type: "category",
						boundaryGap: false,
						data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
						axisLabel: {
							show: true,
							interval: 0,
						},
						axisTick: {
							show: true,
						},
						splitLine: {
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
						},
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
					series: [{
							name: "20年度",
							type: "line",
							smooth: true,
							// data: [100, 200, 400, 900, 200, 300, 500],
							color: "#3AABFF",
							areaStyle: {
								normal: {
									color: new this.$echarts.graphic.LinearGradient(
										0,
										0,
										0,
										1,
										[{
												offset: 0,
												color: "rgba(207, 223, 254, 0.48)",
											},
											{
												offset: 1,
												color: "rgba(255, 255, 255, 0.48)",
											},
										],
										false,
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
				grid: {
					top: 30,
					left: "20",
					right: "20",
					bottom: 30,
					containLabel: true,
				},
				legend: {
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
					borderColor: "#3992BA",
					padding: 10,
					position: function(point, params, dom, rect, size) {
						var x = 0;
						var y = 5;
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
					formatter: function(params, ticket, callback) {
						console.log(params);
						var res = "";

						for (var i = 0, l = params.length; i < l; i++) {
							res += params[i].seriesName + " : " + params[i].value + "%\n";
						}

						res += "同比：" + (parseInt(params[0].value) - parseInt(params[1].value)) + "%";
						return res;
					},
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
					axisLabel: {
						show: true,
						interval: 0,
					},
					axisTick: {
						show: true,
					},
					splitLine: {
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
					},
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
				areaStyle: {
					normal: {
						color: new this.$echarts.graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[{
									offset: 0,
									color: "rgba(207, 223, 254, 0.48)",
								},
								{
									offset: 1,
									color: "rgba(255, 255, 255, 0.48)",
								},
							],
							false,
						),
						shadowColor: "rgba(108,80,243, 0.9)",
						shadowBlur: 20,
					},
				},
				page: {
					charts: {
						main: {},
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
			let {
				projectName,
				bisProjectId,
				storeType
			} = options;
			let selected = {
				label: projectName,
				value: bisProjectId,
			};
			this.setData({
				columns: this.yueColumns,
				projectName: options.projectName,
				selected,
				"params.bisProjectId": options.bisProjectId,
				"params.storeType": storeType,
				"params.type": options.type,
				"params.year": options.yearMonth.split("-")[0],
			});
			this.getDataList();
			this.getStoreType(); // this.getStage();
		},
		onShow() {
			this.getDataList();
			this.getStoreType(); // this.getStage();
		},
		methods: {
			onDateChanged(e) {
				this.setData({
					["params.year"]: e.detail.value,
				});
				this.getDataList();
			},

			async getDataList() {
				let res = await app.globalData.request
					.options({
						loading: true,
					})
					.get("/open/bis-open-project!monthCollectionRate.action", this.params);
				let arr = res.data.curYearColRateList || res.data.monthCollectionRateList;
				let result = arr.map((item, index) => {
					return { ...item,
						ranking: index
					};
				});
				// let label = (this.params.yearMonth && this.params.yearMonth.split("-")[0]) || "2020";
				let label = this.params.year
				const legendData = [label.substring(2) + "年度" + "", (parseInt(label) - 1 + "").substring(2) + "年度" + ""];
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
							data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
						},
						yAxis: {
							type: "value",
						},
						series: [{
								type: "line",
								name: legendData[0],
								data: typeof res.data.curYearColRateArr === "string" ? JSON.parse(res.data.curYearColRateArr).map((num) =>
									num) : res.data.curYearColRateArr.map((num) => num),
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
								}, // data: curMonthColRateForHeadChart
							},
							{
								type: "line",
								name: legendData[1],
								data: typeof res.data.prevYearColRateArr === "string" ? JSON.parse(res.data.prevYearColRateArr).map((num) =>
									num) : res.data.prevYearColRateArr.map((num) => num), // data: curMonthColRateForHeadPrevChart
							},
						],
					},
					dataList: result,
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
						pageSource: getCurrentPages().pop().route
					})
					.then((res) => {
						const keysMap = res.data.reduce((result, item) => {
							result[item.markX] = item.markY.split(",");
							return result;
						}, {});
						setdata["recovery.selected"] = keysMap;
						setdata["tableSelected.keysMap"] = keysMap;
					});
				this.setData(setdata);
			},

			changeSpan(e) {
				const span = e.currentTarget.dataset.span;
				this.setData({
					timeSpan: span,
				});

				if (span === "0") {
					this.setData({
						columns: this.yueColumns,
					});
				} else {
					this.setData({
						columns: this.nianColumns,
					});
				}
			},

			onProjectSelected(e) {
				let detail = e.detail.value && e.detail.value.bisProjectId;
				this.setData({
					["params.bisProjectId"]: detail,
				});
				this.getDataList();
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

			onRowColumnClick(e) {
				const {
					show,
					selected
				} = this.recovery;

				if (show) {
					const {
						row,
						column
					} = e.detail;

					if (!selected[row.businessKey]) {
						selected[row.businessKey] = [];
					}

					if (selected[row.businessKey].includes(column.key)) {
						selected[row.businessKey].splice(selected[row.businessKey].indexOf(column.key), 1);
					} else {
						selected[row.businessKey].push(column.key);
					}
					this.tableSelected.keysMap = selected;
					this.tableSelected.keysMap = Object.assign({}, this.tableSelected.keysMap);
					this.tableSelected = Object.assign({}, this.tableSelected);
					// this.setData({
					//   "tableSelected.keysMap": selected
					// });
				}
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
						markInfos: JSON.stringify(markInfos),
						pageType,
						pageSource: getCurrentPages().pop().route,
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
		},
	};
</script>
<style>
	@import "./shouruxq.css";
</style>
