<template>
	<view class="project-select">
		<view class="selected">
			<view class="label">已选</view>
			<view class="selected-list">
				<view v-for="(item, index) in selectedList" :key="index" class="selected-item" @tap="remove" :data-value="item.value">
					<view class="item-name">{{ item.name }}</view>
					<view class="item-clear">X</view>
				</view>
			</view>
		</view>
		<view class="project-list">
			<checkbox-group @change="checkboxChange">
				<label v-for="(item, index) in projectList" :key="index" class="weui-cell weui-check__label">
					<view class="weui-cell__hd">
						<checkbox :value="item.value" :checked="item.checked"></checkbox>
					</view>
					<view class="weui-cell__bd">{{ item.name }}</view>
				</label>
			</checkbox-group>
		</view>
		<view class="button-box">
			<view class="cancel btn" @tap="cancel">取消</view>
			<view class="reset btn" @tap="reset">重置</view>
			<view class="confirm btn" @tap="confirm">完成</view>
		</view>
	</view>
</template>

<script>
// pages/sjlb/sjlb.js
const app = getApp();

export default {
	data() {
		return {
			projectList: [],
			selectedList: [],
			params: {
				limit: 100,
				offset: 1,
			},
		};
	},

	components: {},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let params = options; // params.bisShopSortId = params.bisShopSortId && params.bisShopSortId.split(",");

		this.setData({
			params: options,
		});
		this.getDataList();
	},
	methods: {
		checkboxChange(e) {
			let values = e.detail.value;
			let result = this.projectList.filter((item) => {
				return values.indexOf(item.value) > -1;
			});
			this.projectList.forEach((item) => {
				if (values.indexOf(item.value) > -1) {
					item.checked = true;
				}
			});
			this.setData({
				selectedList: result,
			});
		},

		async getDataList() {
			let res = await app.globalData.request.get("/api/v1/report/bis/merchans/formats/bigs/list", this.params);
			let result = res.data.list.map((item) => {
				return {
					value: item.bisShopId,
					name: item.merchantsChineseName,
				};
			});
			this.setData({
				projectList: result,
			});
		},

		remove(e) {
			let value = e.currentTarget.dataset.value;
			let data = this.projectList;
			let result = this.selectedList.filter((item) => {
				return item.value !== value;
			});
			data.forEach((item) => {
				if (item.value === value) {
					item.checked = false;
				}
			});
			this.setData({
				selectedList: result,
				projectList: data,
			});
		},

		reset() {
			let data = this.projectList;
			data.forEach((item) => {
				item.checked = false;
			});
			this.setData({
				projectList: data,
				selectedList: [],
			});
		},

		cancel() {
			this.reset();
			app.globalData.page.go('/')
			// app.globalData.page.back();
		},

		confirm() {
			let list = this.selectedList.map((item) => item.value);
			let ids = list.join(",");

			if (list.length < 2) {
				uni.showToast({
					title: "对比项目过少",
				});
			} else {
				// this.pageGo("/pages/sjbj/sjbj", { ids });
				app.globalData.page.go("../sjbj/sjbj", {
					ids,
				});
			}
		},
	},
};
</script>
<style>
@import "./sjlb.css";
</style>
