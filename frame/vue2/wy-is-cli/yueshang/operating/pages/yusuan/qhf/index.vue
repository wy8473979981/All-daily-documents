<template>
	<!--pages/yusuan/qhf/index.wxml-->
	<!-- 企划费-->
	<view class="yusuan-qhf">
		<app-header>
			<app-project-selector v-if="showSelector" :selected="{ label: projectName }" @selected="onProjectSelected"></app-project-selector>
		</app-header>
		<app-section>
			<view slot="head-title">
				<view class="selector" @tap="openSelector">企划费<image src="/static/assets/images/icon-selector-arrow-blue.svg"></image></view>
			</view>
			<app-table :columns="page.table.columns" :values="page.table.rows" :total-row="page.table.totalRow"></app-table>
			<view slot="head-actions">
				<view class="list-mode">
					<text :class="'list-mode-item ' + (page.table.mode === 'dc' ? 'active' : '')" @tap="onListModeChanged" data-value="dc">地产支付</text>｜
					<text :class="'list-mode-item ' + (page.table.mode === 'sy' ? 'active' : '')" @tap="onListModeChanged" data-value="sy">商业自筹</text>
				</view>
			</view>
		</app-section>
		<yusuan-dialog :items="menuItems" :projectName="projectName" :projectId="projectId" :opened="opened" @closed="onSelectorClosed"> </yusuan-dialog>
	</view>
</template>

<script>
import { projectPageMap } from "../datasource";
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const dcColumns = [
	{
		label: "项目",
		key: "project",
		width: "200rpx",
		align: "left",
	},
	{
		label: "建筑面积",
		key: "builtArea",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "业主租金",
		key: "landlordRent",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "商业租金",
		key: "commerceRent",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "小计",
		key: "paySubtotal",
		group: "按面积计提",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "单价",
		key: "areaUnitPrice",
		group: "按面积计提",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "金额",
		key: "areaAmount",
		group: "按面积计提",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "计提比例",
		key: "rentRate",
		group: "按租金计提",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "金额",
		key: "areaAmount",
		group: "按租金计提",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "地产支付+商业自筹",
		key: "payFundingTotal",
		width: "250rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "调剂金额",
		key: "makeAmount",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "调剂后金额",
		key: "makeEndAmount",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "核减",
		key: "review",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
];
const syColumns = [
	{
		label: "项目",
		key: "project",
		width: "200rpx",
		align: "left",
	},
	{
		label: "建筑面积",
		key: "builtArea",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "业主租金",
		key: "classify",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "商业租金",
		key: "device",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "计提比例",
		key: "expectBuilding",
		group: "按租金计提",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "金额",
		key: "expectResidence",
		group: "按租金计提",
		width: "200rpx",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "地产支付+商业自筹",
		key: "expectBuilding",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "调剂金额",
		key: "expectBuilding",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "调剂后金额",
		key: "expectBuilding",
		width: "200rpx",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
	},
	{
		label: "核减",
		key: "expectBuilding",
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
				budgetInstanceSheetId: null,
			},
			page: {
				table: {
					mode: "dc",
				},
			},
			table: {
				mode: "dc",
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
				.post("http://pms.powerlong.com/budget/open/tmp/data/qhf/query", this.query);
			const setdata = {
				"page.table": {
					mode: "dc",
					columns: dcColumns,
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

		onListModeChanged(e) {
			const mode = e.target.dataset.value;

			if (this.page.table.mode !== mode) {
				this.setData({
					"page.table.mode": mode,
					"page.table.columns": mode === "dc" ? dcColumns : syColumns,
				});
			}
		},
	},
};
</script>
<style>
@import "./index.css";
</style>
