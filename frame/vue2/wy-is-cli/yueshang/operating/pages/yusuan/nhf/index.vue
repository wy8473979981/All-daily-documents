<template>
	<!--pages/yusuan/nhf/index.wxml-->
	<!-- 能耗费概况 -->
	<view class="yusuan-nhf">
		<app-header>
			<app-project-selector v-if="showSelector" :selected="{ label: projectName }" @selected="onProjectSelected"></app-project-selector>
		</app-header>
		<app-section>
			<view slot="head-title">
				<view class="selector" @tap="openSelector">能耗费概况<image src="/static/assets/images/icon-selector-arrow-blue.svg"></image></view>
			</view>
			<app-table :fixednum="3" :columns="page.table.columns" :values="page.table.rows" :total-row="page.table.totalRow"></app-table>
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
		label: "类别",
		key: "category",
		width: "150rpx",
		align: "left",
	},
	{
		label: "项目",
		key: "project",
		width: "150rpx",
		align: "left",
	},
	{
		label: "用电分类",
		key: "classify",
		width: "200rpx",
		align: "left",
	},
	{
		label: "用电设备",
		key: "device",
		width: "200rpx",
		align: "left",
	},
	{
		label: "2020年度预计发生额",
		key: "estimateQuota",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "2021年度预算合计",
		key: "expectTotal",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "MALL",
		key: "expectMall",
		group: "2021年能耗预算",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "商业街",
		key: "expectCommercial",
		group: "2021年能耗预算",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "住宅",
		key: "expectResidence",
		group: "2021年能耗预算",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "写字楼",
		key: "expectBuilding",
		group: "2021年能耗预算",
		width: "200rpx",
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
				budgetInstanceSheetId: null,
			},
			page: {
				table: {},
			},
			table: {},
			opened: false,
			projectName: "全部",
			projectId: null,
			menuItems: [],
		};
	},
	onShow() {
		this.showSelector = true;
	},
	onHide() {
		this.showSelector = false;
	},
	components: {
		appHeader,
		appSection,
		appProjectSelector,
		appTable,
		yusuanDialog,
	},
	props: {},
	onLoad: function (options = {}) {
		this.setData({
			"query.budgetInstanceSheetId": options.id,
			projectName: options.projectName,
			projectId: options.projectId,
		});
		this.loadMenu();
	},
	methods: {
		loadData: async function () {
			const { data } = await app.globalData.request
				.options({
					loading: true,
				})
				.post("http://pms.powerlong.com/budget/open/tmp/data/energy/query", this.query);
			const setdata = {
				"page.table": {
					columns,
					rows: data,
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
				"query.budgetInstanceSheetId": (item || {}).id,
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
