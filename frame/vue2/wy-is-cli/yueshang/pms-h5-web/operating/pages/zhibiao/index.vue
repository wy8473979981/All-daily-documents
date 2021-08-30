<template>
	<view class="index-main">
		<app-header>
			<app-project-selector @selected="onProjectSelected" :selected="selected"></app-project-selector>
			<!-- <view class="project-leader" v-if="params.bisProjectId" @tap="showLeaderDetail">
      <image class="leader-avatar" src="/static/assets/images/leader.png" lazy-load="false"></image>
      <view class>项目总</view>
    </view> -->
			<view slot="right">
				<app-picker @changed="onDateChanged" fields="month" :fromDate="params.yearMonth"></app-picker>
			</view>
		</app-header>
		<view class="header-tab-box">
			<view class="tab-list-box">
				<view
					v-for="(item, index) in tabList"
					:key="index"
					:class="'tab-list-item ' + (item.code === params.storeType ? 'border-current' : '')"
					:data-type="item.code"
					@tap="changeTab"
				>
					{{ item.name }}
				</view>
			</view>
			<view class="ranking-to" @tap="gotoRanking" v-if="!params.bisProjectId">指标排名</view>
		</view>
		<!-- 这里是环形图 -->
		<view class="charts-box" v-if="!showLeader && !showHimt">
			<view v-for="(item, index) in pieOptions" :key="index" class="charts-item" :data-type="index" @tap="showHimtFun">
				<view class="number-chart"> {{ item.series[0].data[0].value }}% </view>
				<image class="query-icon" src="/static/assets/images/icon-query.png"> </image>
				<app-echarts class="pie" :options="item" height="180px" :canvasId="'pie' + (index + 1)" :num="pieOptions.length"></app-echarts>
			</view>
		</view>
		<!-- 整体情况 -->
		<app-section title="空铺">
			<view class="index-item-box">
				<view class="index-item-row">
					<view class="item-inner-label">总考核面积</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ empryStore.allSquare || "-" }}</view>
						<view class="inner-data-unit" v-if="empryStore.allSquare">万㎡</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">空铺面积</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ empryStore.emptySquare || "-" }}</view>
						<view class="inner-data-unit">万㎡</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">本月去化</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ empryStore.subSquare || "-" }}</view>
						<view class="inner-data-unit">万㎡</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">本月新增</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ empryStore.addSquare || "-" }}</view>
						<view class="inner-data-unit">万㎡</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">空铺数</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ empryStore.emptyNum || "-" }}</view>
						<view class="inner-data-unit">个</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">当月去化</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ empryStore.subNum || "-" }}</view>
						<view class="inner-data-unit">个</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">本月新增</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ empryStore.addNum || "-" }}</view>
						<view class="inner-data-unit">个</view>
					</view>
				</view>
			</view>
		</app-section>
		<app-section title="欠费">
			<view class="index-item-box">
				<view class="index-item-inner">
					<view class="item-inner-label">累计欠费</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.oweTotal || "-" }}</view>
						<view class="inner-data-unit" :v-if="dataDetail.oweTotal">万元</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">当月欠费</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.oweMonthTotal || "-" }}</view>
						<view class="inner-data-unit" :v-if="dataDetail.oweMonthTotal">万元</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">清欠率</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.oweRate || "-" }}</view>
					</view>
				</view>
			</view>
		</app-section>
		<app-section title="客流">
			<view class="index-item-box">
				<view class="index-item-inner">
					<view class="item-inner-label">当月指标</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.ipvaMonthTarget || "-" }}</view>
						<view class="inner-data-unit" v-if="dataDetail.ipvaMonthTarget">万</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">当月实际</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.ipvaNum || "-" }}</view>
						<view class="inner-data-unit" :v-if="dataDetail.ipvaNum">万</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">达成率</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.ipvaMonthTargetRate || "-" }}</view>
					</view>
				</view>
			</view>
		</app-section>
		<app-section title="租金收入">
			<view class="index-item-box">
				<view class="index-item-inner">
					<view class="item-inner-label">当月指标</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.rentFactTotalMonthTarget || "-" }}</view>
						<view class="inner-data-unit">万元</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">当月实际</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.rentFactTotal || "-" }}</view>
						<view class="inner-data-unit" v-if="dataDetail.rentFactTotal">万元</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">达成率</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.rentFactTotalMonthTargetRate || "-" }}</view>
					</view>
				</view>
			</view>
		</app-section>
		<app-section title="物管收入">
			<view class="index-item-box">
				<view class="index-item-inner">
					<view class="item-inner-label">当月指标</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.propFactTotalMonthTarget || "-" }}</view>
						<view class="inner-data-unit">万元</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">当月实际</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.propFactTotal || "-" }}</view>
						<view class="inner-data-unit" v-if="dataDetail.propFactTotal">万元</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">达成率</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.wgComRate || "-" }}</view>
					</view>
				</view>
			</view>
		</app-section>
		<app-section title="销售">
			<view class="index-item-box">
				<view class="index-item-inner">
					<view class="item-inner-label">当月指标</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.salesMonthMonthTarget || "-" }}</view>
						<view class="inner-data-unit">万元</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">当月实际</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.salesMonth || "-" }}</view>
						<view class="inner-data-unit" v-if="dataDetail.salesMonth">万元</view>
					</view>
				</view>
				<view class="index-item-inner">
					<view class="item-inner-label">达成率</view>
					<view class="item-inner-data">
						<view class="inner-data-num">{{ dataDetail.salesMonthMonthTargetRate || "-" }}</view>
					</view>
				</view>
			</view>
		</app-section>
		<view class="project-leader-modal" v-if="showLeader">
			<view class="leader-modal-inner" v-if="leaderDetail">
				<view class="leader-name">{{ leaderDetail.userName }}</view>
				<view v-for="(item, index) in leaderDetail.resultList" :key="index" class="leader-title">
					{{ item.workDuty }} ({{ item.type === 1 ? item.startDate : item.startDate + "-" + item.endDate }})
				</view>
				<view class="leader-title">入职：{{ leaderDetail.attendWorkDate }}</view>
				<view class="leader-close" @tap="closeModal">X</view>
			</view>
		</view>
		<view class="project-leader-modal" v-if="showHimt">
			<view class="leader-modal-inner">
				<view class="leader-name">{{ himtDetail.title }}</view>
				<view class="leader-title">{{ himtDetail.subTitle }}</view>
				<view class="leader-close" @tap="closeModal">X</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as echarts from "@/packages/ec-canvas/echarts";
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
import appSection from "@/components/container/section";
import appHeader from "@/components/common/header";
import appProjectSelector from "@/components/selector/project";
import appPicker from "@/components/selector/datepicker";
import appEcharts from "@/components/echarts/echarts";

export default {
	data() {
		return {
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
								itemStyle: {
									normal: {
										color: "#3992BA",
									},
								},
								// color: '#1CC2FF',
								selected: false,
								label: {
									normal: {
										// 是显示标签
										show: true,
										position: "center",
										fontSize: 12,
										color: "#333333",
										formatter: "{b} \n \n",
									},
								},
							},
							{
								value: 50,
								selected: false,
								itemStyle: {
									normal: {
										color: "#EAEAEA",
									},
								},
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
			grid: {
				top: 0,
				left: 30,
				right: 30,
				bottom: 0,
				containLabel: true,
			},
			yAxis: {
				axisLine: {
					show: false,
				},
			},
			legend: {
				show: false,
			},
			labelLine: {
				normal: {
					show: false,
				},
			},
			data: [
				{
					value: 50,
					name: "开业率",
					itemStyle: {
						normal: {
							color: "#3992BA",
						},
					},
					selected: false,
					label: {
						normal: {
							show: true,
							position: "center",
							fontSize: 12,
							color: "#333333",
							formatter: "{b} \n \n",
						},
					},
				},
				{
					value: 50,
					selected: false,
					itemStyle: {
						normal: {
							color: "#EAEAEA",
						},
					},
					label: {
						normal: {
							show: false,
						},
					},
				},
			],
			pieTitleList: [
				{
					label: "开业率",
					key: "kyRate",
				},
				{
					label: "开业达成率",
					key: "mothKyRate",
				},
				{
					label: "出租率",
					key: "czRate",
				},
			],
			pieOptions: [],
			params: {
				storeType: "1",
				bisProjectId: "",
				yearMonth: "",
			},
			showLeader: false,
			showHimt: false,
			himtArray: [
				{
					title: "开业率",
					subTitle: "合同开业面积/铺位计租面积",
				},
				{
					title: "开业达成率",
					subTitle: "实际开业面积/目标开业面积",
				},
				{
					title: "开业率",
					subTitle: "合同计租面积/铺位计租面积",
				},
			],
			himtDetail: {},
			dataDetail: {},
			empryStore: {},
			selected: {
				label: "全部",
				value: "",
			},
		};
	},

	components: {
		appSection,
		appHeader,
		appProjectSelector,
		appPicker,
		appEcharts,
	},
	props: {},
	onLoad: function () {
		this.setData({
			["params.yearMonth"]: app.globalData.getDefaultDate("month"),
		});
		this.getStoreType();
		this.getEmptyStore();
		this.getdata();
		const _this = this;
		uni.$on("onProjectSelected", (e) => {
			console.log("eeee===", e);
			_this.onProjectSelected(e);
		});
		// 启动app桥接
		this.connectWebViewJavascriptBridge();
		this.connectWebViewJavascriptBridge();
	},
	methods: {
		showHimtFun(e) {
			let type = e.currentTarget.dataset.type;
			this.setData({
				showHimt: true,
				himtDetail: this.himtArray[type],
			});
		},

		async getdata() {
			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open-statistics!getZhiBiaoTotalInfo.action", this.params);
			this.setData({
				dataDetail: res.data,
			});
			let result = [];
			this.pieTitleList.forEach((item) => {
				let data = JSON.parse(JSON.stringify(this.registeredChannels));
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
			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get(`/open/bis-open-report!bisProjectPrincipalInfo.action?bisProjectId=${this.params.bisProjectId}`);

			if (res.data) {
				this.setData({
					leaderDetail: res.data,
					showLeader: true,
				});
			} else {
				uni.showToast({
					title: "职位空缺",
					duration: 2000,
				});
			}
		},

		// 获取 空铺信息
		async getEmptyStore() {
			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get(`/open/bis-open!emptyShopList.action?bisProjectId=${this.params.bisProjectId}`);
			this.setData({
				empryStore: res.data,
			});
		},

		closeModal() {
			this.setData({
				showLeader: false,
				showHimt: false,
			});
		},

		showLeaderDetail() {
			this.getLeaderInner();
		},

		// 跳转到指标排名
		gotoRanking() {
			const url = `/pages/zhibiao/xiangmupaiming`;
			this.$util.pageGo(url, { date: this.params.yearMonth });
		},

		// 切换tab
		changeTab(e) {
			this.setData({
				["params.storeType"]: e.currentTarget.dataset.type,
			});
			this.getdata();
			this.getEmptyStore();
		},

		onProjectSelected(e) {
			let title = "运营分析（首页）";

			if (!e.detail.value) {
				title = "运营分析（首页）";
			} else {
				title = "运营分析（在营 )";
			}

			uni.setNavigationBarTitle({
				title: title,
			});
			this.setData({
				selected: e.detail,
			});
			this.setData({
				["params.bisProjectId"]: (e.detail.value && e.detail.value.bisProjectId) || "",
			});
			this.getEmptyStore();
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
			let res = await app.globalData.request.get("/open/bis-open-dict!chargeTypeList.action");
			this.setData({
				tabList: res.data,
			});
		},
		connectWebViewJavascriptBridge(callback) {
			console.log("准备与APP搭桥：");
			if (window.WebViewJavascriptBridge) {
				console.log("桥接：window.WebViewJavascriptBridge");
				callback(WebViewJavascriptBridge);
			} else {
				document.addEventListener(
					"WebViewJavascriptBridgeReady",
					function () {
						console.log("桥接：document.addEventListener");
						callback(WebViewJavascriptBridge);
					},
					false,
				);
				console.log("桥接失败！");
			}
		},
	},
};
</script>
<style>
@import "./index.css";
</style>
