<template>
	<!--pages/yusuan/zfgk/index.wxml-->
	<!-- 租费概况 -->
	<view class="yusuan-zfgk">
		<app-header>
			<app-project-selector v-if="showSelector" :selected="{ label: projectName }" @selected="onProjectSelected"></app-project-selector>
		</app-header>
		<app-section>
			<view slot="head-title">
				<view class="selector" @tap="openSelector">租费概况<image src="/static/assets/images/icon-selector-arrow-blue.svg"></image></view>
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
		label: "收入类别",
		key: "incomeType",
		width: "150rpx",
		align: "left",
	},
	{
		label: "业态",
		key: "projectType",
		width: "150rpx",
		align: "left",
	},
	{
		label: "类别",
		key: "rentType",
		width: "150rpx",
		align: "left",
	},
	{
		label: "2021年应收",
		key: "receivableNextYear",
		group: "合计",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "年计费面积",
		key: "areaNextYear",
		group: "合计",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "单价(元/月/(m²))",
		key: "priceNextYear",
		group: "合计",
		width: "220rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "1月",
		key: "receivableJan",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "2月",
		key: "receivableFeb",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "3月",
		key: "receivableMarch",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "4月",
		key: "receivableApril",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "5月",
		key: "receivableMay",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "6月",
		key: "receivableJune",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "7月",
		key: "receivableJuly",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "8月",
		key: "receivableAugust",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "9月",
		key: "receivableSep",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "10月",
		key: "receivableOct",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "11月",
		key: "receivableNove",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "12月",
		key: "receivableDece",
		group: "应收",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "1月",
		key: "areaJan",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "2月",
		key: "areaFeb",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "3月",
		key: "areaMarch",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "4月",
		key: "areaApril",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "5月",
		key: "areaMay",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "6月",
		key: "areaJune",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "7月",
		key: "areaJuly",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "8月",
		key: "areaAugust",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "9月",
		key: "areaSep",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "10月",
		key: "areaOct",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "11月",
		key: "areaNove",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "12月",
		key: "areaDece",
		group: "计费面积",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "2021年应收",
		key: "receivableNextTwoYear",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "2022年应收",
		key: "receivableNextThreeYear",
		width: "200rpx",
		align: "right",
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
		console.log(options,'0000')
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
				.post("http://pms.powerlong.com/budget/open/collectrate/queryPage", this.query);
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
