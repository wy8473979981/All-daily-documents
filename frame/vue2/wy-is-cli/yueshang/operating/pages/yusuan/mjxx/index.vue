<template>
	<!--pages/yusuan/mjxx/index.wxml-->
	<!-- 基础信息-面积信息 -->
	<view class="yusuan-mjxx">
		<app-header>
			<app-project-selector v-if="showSelector" :selected="{ label: projectName }" @selected="onProjectSelected"></app-project-selector>
		</app-header>
		<app-section>
			<view slot="head-title">
				<view class="selector" @tap="openSelector">基础信息-面积信息<image src="/static/assets/images/icon-selector-arrow-blue.svg"></image></view>
			</view>
			<app-table :fixednum="2" :columns="page.table.columns" :values="page.table.rows" :total-row="page.table.totalRow"></app-table>
		</app-section>
		<yusuan-dialog :items="menuItems" :projectName="projectName" :projectId="projectId" :opened="opened" @closed="onSelectorClosed"> </yusuan-dialog>
	</view>
</template>

<script>
import { projectPageMap } from "../datasource";
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const columns = [
	{
		label: "业态",
		key: "bizType",
		width: "200rpx",
		align: "left",
	},
	{
		label: "资产",
		key: "assetType",
		width: "200rpx",
		align: "left",
	},
	{
		label: "属性",
		key: "assetNature",
		width: "200rpx",
		align: "left",
	},
	{
		label: "建筑面积(m²)",
		key: "coveredArea",
		width: "200rpx",
		group: "管理面积",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "套内面积(m²)",
		key: "insideArea",
		width: "200rpx",
		group: "管理面积",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "一铺一价版",
		key: "glaPriceArea",
		width: "200rpx",
		group: "GLA(可租面积)",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "签约版",
		key: "glaContractArea",
		width: "200rpx",
		group: "GLA(可租面积)",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "签约版",
		key: "billingArea",
		width: "200rpx",
		group: "计费面积",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "车位数",
		key: "parkingNum",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "免费时长(h)",
		key: "ratesFreetime",
		width: "200rpx",
		group: "收费标准",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "收费标准(元/h)",
		key: "ratesHour",
		width: "200rpx",
		group: "收费标准",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "24H封顶(元)",
		key: "ratesDay",
		width: "200rpx",
		group: "收费标准",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "员工停车(元/月)",
		key: "ratesEmp",
		width: "220rpx",
		group: "收费标准",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
];
import appHeader from "@/components/common/header";
import appSection from "@/components/container/section";
import appProjectSelector from "../components/selector/project";
import appTable from "@/components/table/index";
import yusuanDialog from "../components/filter/dialog";

export default {
	data() {
		return {
			showSelector: true,
			query: {
				bean: {
					budgetInstanceSheetId: null,
				},
				pageNum: 1,
				pageSize: 1000,
			},
			bean: {
				budgetInstanceSheetId: null,
			},
			page: {
				table: {
					columns,
				},
			},
			table: {
				columns,
			},
			opened: false,
			projectName: "全部",
			projectId: null,
			menuItems: [],
		};
	},

	components: {
		appHeader,
		appSection,
		appProjectSelector,
		appTable,
		yusuanDialog,
	},
	props: {},
	onShow() {
		this.showSelector = true;
	},
	onHide() {
		this.showSelector = false;
	},
	onLoad: function (options = {}) {
		this.setData({
			"query.bean.budgetInstanceSheetId": options.id,
			projectName: options.projectName,
			projectId: options.projectId,
		});
		this.loadMenu();
	},
	methods: {
		loadData: async function () {
			const {
				data: { ...res },
			} = await app.globalData.request
				.options({
					loading: true,
				})
				.post("http://pms.powerlong.com/budget/open/collectbase/queryPage", this.query);
			const setdata = {
				"page.table": {
					columns,
					rows: res.list,
				},
			};
			this.setData(setdata);
		},
		loadMenu: async function () {
			const res = await app.globalData.request
				.options({
					loading: true,
				})
				.post("http://pms.powerlong.com/budget/open/getBudgetInstanceSheet", {
					projectId: this.projectId,
				});
			const menuItems = res.data.map((item) => {
				return {
					label: item.name,
					value: item,
				};
			});
			const findUrl = `/${this.route}`;
			const budgetSheetId = Object.keys(projectPageMap).find((key) => {
				const item = projectPageMap[key];
				return item[1] === findUrl;
			});
			const item = res.data.find((item) => {
				return item.budgetSheetId == budgetSheetId;
			});
			this.setData({
				"query.bean.budgetInstanceSheetId": (item || {}).id,
				menuItems,
			});
			this.loadData();
		},

		onProjectSelected(e) {
			this.setData({
				projectId: e.detail.value.mallId,
				projectName: e.detail.value.shortName,
			});
			this.loadMenu();
		},

		openSelector() {
			this.setData({
				opened: true,
			});
		},

		onSelectorClosed() {
			this.setData({
				opened: false,
			});
		},
	},
};
</script>
<style>
@import "./index.css";
</style>
