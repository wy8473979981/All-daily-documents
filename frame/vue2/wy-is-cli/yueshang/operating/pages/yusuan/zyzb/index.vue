<template>
	<!--pages/yusuan/zyzb/index.wxml-->
	<!-- 主要指标 -->
	<view class="yusuan-zyzb">
		<app-header>
			<app-project-selector v-if="showSelector" @selected="onProjectSelected"></app-project-selector>
		</app-header>
		<app-section>
			<view slot="head-title">
				<view class="selector" @tap="openSelector">主要指标<image src="/static/assets/images/icon-selector-arrow-blue.svg"></image></view>
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
		key: "projectType",
		width: "150",
		fixed: true,
		align: "left",
	},
	{
		label: "主要指标",
		key: "subjectName",
		width: "150",
		fixed: true,
		align: "left",
	},
	{
		label: "2020年度预计发生额",
		key: "preYearBudget",
		width: "280",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "2021年度预算合计",
		key: "preYearBudget",
		width: "280",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "一季度",
		key: "budgetQaOne",
		group: "2021年预算",
		width: "200",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "二季度",
		key: "budgetQaTwo",
		group: "2021年预算",
		width: "200",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "三季度",
		key: "budgetQaThree",
		group: "2021年预算",
		width: "200",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "四季度",
		key: "budgetQaFour",
		group: "2021年预算",
		width: "200",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "合计",
		key: "budgetTotal",
		group: "2021年预算",
		width: "200",
		align: "left",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "21VS20增长率",
		key: "increasePre",
		width: "200",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "2022年预算",
		key: "nextYearBudget",
		width: "200",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "22VS21增长率",
		key: "increaseNext",
		width: "200",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "2023年预算",
		key: "nextTwoYearBudget",
		width: "200",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
	},
	{
		label: "23VS22增长率",
		key: "increaseNextTwo",
		width: "200",
		align: "right",
		numberPrecision: 2,
		numberFormat: true,
		unit: "%",
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
			menuItems: [],
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
				table: {},
			},
			table: {},
			opened: false,
			projectName: "全部",
			projectId: null,
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
				.post("http://pms.powerlong.com/budget/open/collecttarget/queryPage", this.query);
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
