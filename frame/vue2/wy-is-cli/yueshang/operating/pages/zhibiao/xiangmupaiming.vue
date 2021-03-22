<template>
	<view class="zhibiao-xiangmupaiming">
		<view class="zhibiao-header">
			<view class> 全部 </view>
			<view class="header-right-box">
				<view class="header-right-select"> {{ yearMonth }} </view>
				<view class="header-right-select">
					<app-filter-dialog :groups="groups" @selected="bindselected" title="筛选"></app-filter-dialog>
				</view>
			</view>
		</view>
		<app-section title="项目排名">
			<view slot="head-actions">
				<app-filter-dialog :checkboxes="allCols" :maxnum="3" @selected="bindselected1" tip="筛选指标 （注：最多可选三项）">
					<view class="select-indicator">
						筛选指标
						<image class="select-icon" src="/static/assets/images/icon-filter-index.png"> </image>
					</view>
				</app-filter-dialog>
			</view>
			<app-table @sort="sort" :values="dataList" :columns="cols" :totalRow="totalRow" @row-column-click="clickRow" :fixednum="2"></app-table>
		</app-section>
		<image class="to-top" src="/static/assets/images/icon-totpo.png" @tap="toTop"> </image>
	</view>
</template>

<script>
// pages/zhibiao/xiangmupaiming.js
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
import appSection from "@/components/container/section";
import appTable from "@/components/table/index";
import appFilterDialog from "@/components/filter/dialog";

export default {
	data() {
		return {
			cols: [
				{
					label: "序号",
					width: "90rpx",
				},
				{
					label: "项目",
					key: "shortName",
					width: "160rpx",
				},
				{
					label: "租金达成率(%)",
					key: "zjFinishRateStr",
					width: "240rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "物管达成率(%)",
					key: "wgFinishRateStr",
					width: "240rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "租金收缴率(%)",
					key: "sjZjRateStr",
					width: "240rpx",
					align: "right",
					sortable: true,
				},
			],
			groups: [],
			allCols: [
				{
					label: "租金达成率(%)",
					key: "zjFinishRateStrNew",
					width: "240rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "物管达成率",
					key: "wgFinishRateStrNew",
					width: "240rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "租金收缴率",
					key: "sjZjRateStr",
					width: "240rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "物管收缴率",
					key: "sjWgRateStr",
					width: "220rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "客流完成率",
					key: "cusFlowFinishRateStr",
					width: "180rpx",
					aalign: "right",
					sortable: true,
				},
				{
					label: "销售额完成率",
					key: "saleFinishRateStr",
					width: "180rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "空铺率",
					key: "emptyRateStr",
					width: "220rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "出租率",
					key: "czRateStr",
					width: "220rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "空铺面积",
					key: "emptySquare",
					width: "220rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "新增空铺面积",
					key: "addSquare",
					width: "220rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "去化空铺面积",
					key: "subSquare",
					width: "220rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "空铺数量",
					key: "emptyNum",
					width: "160rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "新增空铺数量",
					key: "addNum",
					width: "220rpx",
					align: "right",
					sortable: true,
				},
				{
					label: "去化空铺数量",
					key: "subNum",
					width: "220rpx",
					align: "right",
					sortable: true,
				},
			],
			dataList: [],
			totalRow: null,
			params: {
				yearMonth: "",
			},
			yearMonth: "",
		};
	},

	components: {
		appSection,
		appTable,
		appFilterDialog,
	},
	props: {},
	onLoad: async function (options) {
		let date = new Date();
		let result = date.getFullYear() + "-" + (date.getMonth() + 1);
		this.setData({
			yearMonth: options.date || result,
			["params.yearMonth"]: options.date || result,
		});
		this.getStoreType();
		this.getDataList();
		this.getChangeList();
	},
	methods: {
		bindselected1(e) {
			let list = e.detail;
			this.setData({
				cols: [...this.cols.slice(0, 2), ...list],
			});
			this.getStoreType();
			this.getDataList();
			this.getChangeList();
		},

		async getDataList() {
			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open!selectIndexList.action", this.params);
			this.setData({
				dataList: res.data.slice(1),
				totalRow: res.data.slice(0, 1)[0],
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

		clickRow(e) {
			console.log(e.detail.id);
		},

		bindselected(e) {
			console.log(e);
			e.detail.forEach((item) => {
				let temp = item.split("-");
				let key = temp[0];
				let value = temp[1];

				if (key === "storeType") {
					this.setData({
						["params.storeType"]: value,
					});
				}

				if (key === "squareFlag") {
					this.setData({
						"params.squareFlag": value,
					});
				}
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

		async getChangeList() {
			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get("/open/bis-open-dict!checkList.action");
			let result = res.data.map((item) => {
				return {
					label: item.name,
					value: "squareFlag-" + item.code,
				};
			});
			let group = {
				label: "面积类型",
				items: result,
				maxnum: 1,
			};
			let groups = this.groups;
			groups.push(group);
			this.setData({
				groups,
			});
		},
	},
};
</script>
<style>
@import "./xiangmupaiming.css";
</style>
