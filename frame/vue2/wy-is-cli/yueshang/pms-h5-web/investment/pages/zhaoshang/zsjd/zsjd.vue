<template>
	<view>
		<app-header>
			<view slot="right">
				<app-date-picker :fromDate="params.realCompletedYm" fields="month" @changed="onDateChanged"></app-date-picker>
			</view>
			<app-project-selector @selected="onProjectSelected" v-if="showSelector"></app-project-selector>
		</app-header>
		<view class="span-box">
			<view v-for="(item, index) in spanList" :key="index" :class="'span-item ' + (item.type === params.menuType ? 'active' : '')" @tap="changeHeaderTab" :data-type="item.type">
				{{ item.label }}
			</view>
		</view>
		<app-section>
			<view slot="head-title">
				<app-catalogue title="筹备招商进度"></app-catalogue>
			</view>
			<view slot="head-actions" class="action-box">
				<view v-for="(item, index) in tabList" :key="index" :class="'action-item ' + (item.type === params.conditionType ? 'active' : '')" @tap="tabChange" :data-type="item.type">
					{{ item.label }}
				</view>
			</view>
			<app-table fixednum="2" :columns="columns" :values="rows" :total-row="totalRow" @row-column-click="onRowColumnClick"></app-table>
		</app-section>
	</view>
</template>

<script>
const app = getApp();
const columnsList = [
	{
		label: "序号",
		width: "100rpx",
		align: "left",
	},
	{
		label: "项目",
		key: "projectName",
		width: "160rpx",
		color: "#3B96BE",
		align: "left",
	},
	{
		label: "开业时间",
		key: "openDate",
		width: "200rpx",
		align: "right",
		sortable: true,
	},
	{
		label: "建筑面积",
		key: "structureSquare",
		width: "260rpx",
		align: "right",
		sortable: true,
		type: "2",
	},
	{
		label: "计租面积",
		key: "rentSquare",
		width: "260rpx",
		align: "right",
		sortable: true,
		type: "3",
	},
	{
		label: "品牌数量",
		key: "brandCount",
		width: "160rpx",
		align: "right",
		sortable: true,
		type: "1",
	},
	{
		label: "实际",
		key: "intentionA",
		width: "160rpx",
		group: "意向",
		align: "right",
		sortable: true,
	},
	{
		label: "目标",
		key: "intentionT",
		width: "160rpx",
		group: "意向",
		align: "right",
		sortable: true,
	},
	{
		label: "实际",
		key: "businessA",
		width: "160rpx",
		group: "商务",
		align: "right",
		sortable: true,
	},
	{
		label: "目标",
		key: "businessT",
		width: "160rpx",
		group: "商务",
		align: "right",
		sortable: true,
	},
	{
		label: "差异",
		key: "businessC",
		width: "160rpx",
		group: "商务",
		align: "right",
		sortable: true,
	},
	{
		label: "实际",
		key: "contNetworkReformationA",
		width: "160rpx",
		group: "合同网批",
		align: "right",
		sortable: true,
	},
	{
		label: "目标",
		key: "contNetworkReformationT",
		width: "160rpx",
		group: "合同网批",
		align: "right",
		sortable: true,
	},
	{
		label: "差异",
		key: "contNetworkReformationC",
		width: "160rpx",
		group: "合同网批",
		align: "right",
		sortable: true,
	},
	{
		label: "实际",
		key: "contSignA",
		width: "160rpx",
		group: "合同签署",
		align: "right",
		sortable: true,
	},
	{
		label: "目标",
		key: "contSignT",
		width: "160rpx",
		group: "合同签署",
		align: "right",
		sortable: true,
	},
	{
		label: "差异",
		key: "contSignC",
		width: "160rpx",
		group: "合同签署",
		align: "right",
		sortable: true,
	},
	{
		label: "实际",
		key: "enterA",
		width: "160rpx",
		group: "进场",
		align: "right",
		sortable: true,
	},
	{
		label: "目标",
		key: "enterT",
		width: "160rpx",
		group: "进场",
		align: "right",
		sortable: true,
	},
	{
		label: "差异",
		key: "enterC",
		width: "160rpx",
		group: "进场",
		align: "right",
		sortable: true,
	},
	{
		label: "实际",
		key: "startBusinessA",
		width: "160rpx",
		group: "开业",
		align: "right",
		sortable: true,
	},
	{
		label: "目标",
		key: "startBusinessT",
		width: "160rpx",
		group: "开业",
		align: "right",
		sortable: true,
	},
	{
		label: "差异",
		key: "startBusinessC",
		width: "160rpx",
		group: "开业",
		align: "right",
		sortable: true,
	}, // {
	// 	label: '实际',
	// 	key: 'initialChargeA',
	// 	width: '200rpx',
	// 	group: '前期费用',
	// 	align: 'right',
	// 	sortable: true
	// },
	// {
	// 	label: '目标',
	// 	key: 'initialChargeT',
	// 	width: '200rpx',
	// 	group: '前期费用',
	// 	align: 'right',
	// 	sortable: true
	// },
	// {
	// 	label: '差异',
	// 	key: 'initialChargeC',
	// 	width: '200rpx',
	// 	group: '前期费用',
	// 	align: 'right',
	// 	sortable: true
	// }
];
import appProjectSelector from "../../../components/selector/project";
import appHeader from "../../../components/common/header";
import appDatePicker from "../../../components/selector/datepicker";
import appTable from "../../../components/table/index";
import appTable1 from "../../../components/tablecomponents/index";
import appCatalogue from "../../../components/catalogue/index";
import appSection from "../../../components/container/section";

export default {
	data() {
		return {
			showSelector: true,
			columns: [],
			tabList: [
				{
					type: "2",
					label: "建筑面积",
				},
				{
					type: "3",
					label: "计租面积",
				},
				{
					type: "1",
					label: "品牌数量",
				},
			],
			spanList: [
				{
					type: "1",
					label: "累计招商",
				},
				{
					type: "2",
					label: "当月招商",
				},
			],
			rows: [],
			totalRow: {},
			params: {
				offset: 1,
				limit: 200,
				conditionType: "1",
				menuType: "1",
				realCompletedYm: app.globalData.getDefaultDate("month"),
				projectId: "",
			},
			// selected:{
			//  label:"全部",
			//  value:''
			// }
		};
	},

	components: {
		appProjectSelector,
		appHeader,
		appDatePicker,
		appTable,
		appTable1,
		appCatalogue,
		appSection,
	},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
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
	onLoad: function (options) {
		const {
			params: { conditionType },
		} = this;
		let res = columnsList.filter((item) => !item.type || item.type === conditionType);
		this.setData({
			columns: res,
		});
		this.getDataList();
	},
	methods: {
		async getDataList() {
			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/api/v1/report/bis/attract/investment/total/bigs/list", this.params);
			this.setData({
				rows: res.data.list.slice(0, -1),
				totalRow: res.data.list.slice(-1)[0],
			});
		},
		//切换tab
		tabChange(e) {
			const type = e.currentTarget.dataset.type;
			let res = columnsList.filter((item) => !item.type || item.type === type);
			this.setData({
				["params.conditionType"]: e.currentTarget.dataset.type,
				columns: res,
			});
			this.getDataList();
		},

		changeHeaderTab(e) {
			this.setData({
				["params.menuType"]: e.currentTarget.dataset.type,
			});
			this.getDataList();
		},

		onDateChanged(e) {
			this.setData({
				["params.realCompletedYm"]: e.detail.value,
			});
			this.getDataList();
		},

		onRowColumnClick(e) {
			let params = Object.assign({}, this.params);
			params.projectId = e.detail.row.bisProjectId;
			params.projectName = e.detail.row.projectName;
			this.pageGo("/pages/zhaoshang/zsjd/detail", params);
			// app.globalData.page.go("./detail", params);
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
@import "./zsjd.css";
</style>
