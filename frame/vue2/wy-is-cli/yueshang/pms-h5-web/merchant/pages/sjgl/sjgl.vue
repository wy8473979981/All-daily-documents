<template>
	<view>
		<app-header class="header">
			<view class="project-selector" :hidden="selector" @tap="statusFilter">
				业态筛选
				<image class="icon-selector-arrow" src="/static/assets/images/icon-selector-arrow.png"></image>
			</view>
			<view class="search-solt" slot="right">
				<view class="search-layout">
					<image class="search-btn" src="/static/assets/images/icon-find-recovery.png"></image>
					<input class="search-input" @input="bindKeyInput" @confirm="searchConfirm" placeholder-class="search-input-placeholder"
					 placeholder="商家名称筛选" @tap="searchTap"></input>
				</view>
			</view>
		</app-header>
		<view class="selected" v-if="selectedList && selectedList.length !== 0">
			<view class="label">已选</view>
			<view class="selected-list">
				<view v-for="(item, index) in selectedList" :key="index" class="selected-item" :data-id="item.bisShopSortId">
					<view class="item-name">{{item.sortName}}</view>
				</view>
			</view>
		</view>
		<view :hidden="!showModal">
			<app-section title="商家管理">
				<app-table fixednum="2" identity="merchant" :columns="page.merchantTable.columns" :values="page.merchantTable.rows"
				 :total-row="page.merchantTable.totalRow" @row-click="onRowClick"></app-table>
			</app-section>
		</view>

		<view class="filter-modal" :hidden="showModal">
			<view class="selected">
				<view class="label">已选</view>

				<view class="selected-list">
					<view v-for="(item, index) in selectedList" :key="index" class="selected-item" @tap="remove" :data-id="item.bisShopSortId">
						<view class="item-name">{{item.sortName}}</view>
						<view class="item-clear">X</view>
					</view>
				</view>

			</view>

			<view class="filter-box">

				<view class="filter-box-left">
					<view v-for="(item, index) in merchantList" :key="index" :class="'filter-label-item ' + (currentItem.bisShopSortId===item.bisShopSortId?'active':'')"
					 @tap="merchantClick" :data-bisShopSortId="item.bisShopSortId">
						{{item.sortName}}
					</view>
				</view>

				<view class="filter-box-right">

					<view v-for="(item, index) in currentItem.child" :key="index" class="filter-child-box">

						<label class="checkbox" @tap="parentChange" :data-id="item.bisShopSortId">
							<checkbox :value="item.bisShopSortId" :checked="item.checked"></checkbox>
							{{item.sortName}}
						</label>

						<view class="checkbox-group">

							<label v-for="(child, index2) in item.child" :key="index2" class="weui-cell weui-check__label" @tap="checkboxChange"
							 :data-id="child.bisShopSortId">
								<view class="weui-cell__hd">
									<checkbox :value="child.bisShopSortId" :checked="child.checked"></checkbox>
								</view>
								<view class="weui-cell__bd">{{child.sortName}}</view>
							</label>

						</view>
					</view>
					<view class="empty" v-if="currentItem.child && currentItem.child.length===0">暂无数据</view>
				</view>
			</view>
			<view class="button-box">
				<view class="cancel btn" @tap="cancel">取消</view>
				<view class="reset btn" @tap="reset">重置</view>
				<view class="confirm btn" @tap="confirm">完成</view>
			</view>
		</view>
		<view class="comparison" @tap="goToComparison">对比</view>
	</view>
</template>

<script>
	// pages/sjgl/sjgl/sjgl.js
	const app = getApp();
	import regeneratorRuntime from "../../utils/runtime";
	const dealerColumns = [{
		label: '序号',
		width: '100rpx'
	}, {
		label: '商家名',
		key: 'merchantsChineseName',
		color: '#3B96BE',
		width: '160rpx',
		align: 'left'
	}, {
		label: '业态',
		key: 'thirdlyFormats',
		color: '#333333',
		width: '150rpx',
		align: 'left'
	}, {
		label: '店型',
		key: 'storeType',
		color: '#333333',
		width: '140rpx',
		align: 'left'
	}, {
		label: '欠费(万)',
		key: 'owe',
		color: '#E93743',
		align: 'right',
		width: '140rpx',
		sortable: true
	}, {
		label: '合作项目数',
		key: 'cooperativeProjectsNumber',
		align: 'right',
		width: '180rpx',
		sortable: true
	}, ];
	import appHeader from "../../components/common/header";
	import appProjectSelector from "../../components/selector/project";
	import appSection from "../../components/container/section";
	import appTable from "../../components/table/index";

	export default {
		data() {
			return {
				selected: {},
				selector: false,
				// searchWidth: '492rpx',
				page: {
					merchantTable: {
						columns: [],
						rows: []
					}
				},
				merchantTable: {
					columns: [],
					rows: []
				},
				showModal: true,
				selectedList: [],
				selectedListDefault: [],
				merchantList: [],
				currentItem: {},
				query: {
					limit: 100,
					offset: 1,
					hasNext: false,
					total: '',
					merchantName: '',
					bisShopSortId: ''
				}
			};
		},

		components: {
			appHeader,
			appProjectSelector,
			appSection,
			appTable
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			const setData = {
				['selected.label']: '业态筛选',
				['query.merchantName']: app.globalData.name || ''
			};
			this.setData(setData);
			this.loadData();
			this.getDataList();
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: async function() {
			if (this.query.hasNext) {
				this.query.limit = 50;
				this.query.offset = this.query.offset + 1;
				const url = '/api/v1/report/bis/merchans/formats/bigs/list';
				const {
					data: res
				} = await app.globalData.request.options({
					loading: true
				}).get(url, this.query);
				const rows = res.list.map(item => {
					return {
						bisShopId: item.bisShopId,
						merchantsChineseName: item.merchantsChineseName,
						thirdlyFormats: item.thirdlyFormats,
						storeType: item.storeType,
						owe: item.owe
					};
				});
				let addrows = this.page.merchantTable.rows.concat(rows);
				const setdata = {
					'query.offset': res.offset,
					'query.hasNext': res.hasNext,
					'query.total': res.total,
					'page.merchantTable': {
						columns: [...dealerColumns],
						rows: addrows
					}
				};
				this.setData(setdata);
			}
		},
		methods: {
			loadData: async function() {
				this.query.offset = 1;
				const url = '/api/v1/report/bis/merchans/formats/bigs/list';
				const {
					data: res
				} = await app.globalData.request.options({
					loading: true
				}).get(url, this.query);
				const rows = res.list.map(item => {
					return {
						bisShopId: item.bisShopId,
						merchantsChineseName: item.merchantsChineseName,
						thirdlyFormats: item.thirdlyFormats,
						storeType: item.storeType,
						owe: item.owe,
						cooperativeProjectsNumber: item.cooperativeProjectsNumber
					};
				});
				const setdata = {
					'query.offset': res.offset,
					'query.hasNext': res.hasNext,
					'query.total': res.total,
					'page.merchantTable': {
						columns: [...dealerColumns],
						rows: rows
					}
				};
				this.setData(setdata);
			},
			onRowClick: function(e) {
				this.pageGo('/pages/sjgl/sjxx/sjxx', {
					bisShopId: e.detail.row.bisShopId
				});
			},
			searchConfirm: function(e) {
				this.setData({
					selector: false,
					['query.limit']: 100,
					['query.merchantName']: e.detail.value
				});
				this.loadData();
			},
			searchTap: function(e) {
				this.setData({
					selector: true,
					showModal: true // searchWidth: '100%'

				});
			},
			bindKeyInput(e) {
				this.setData({
					merchantName: e.detail.value
				})
			},
			// 获取所有的列表
			async getDataList() {
				let res = await app.globalData.request.options({
					loading: true
				}).get('/api/v1/report/bis/formats/bigs/list');
				console.log(JSON.stringify(res.data.list))
				this.setData({
					merchantList: res.data.list,
					currentItem: res.data.list[0]
				});
			},

			merchantClick(e) {
				let id = e.currentTarget.dataset.bisshopsortid;
				let result = this.merchantList.find(v => v.bisShopSortId === id);
				this.setData({
					currentItem: result
				});
			},

			statusFilter() {
				this.defaultChecked();
				this.setData({
					showModal: !this.showModal
				});
			},

			cancel() {
				this.reset();
				this.setData({
					showModal: true
				});
			},

			// 点击父类
			parentChange(e) {
				let id = e.currentTarget.dataset.id;
				let selectedList = this.selectedList;
				let result = this.currentItem.child.find(item => item.bisShopSortId === id);
				result.checked = !result.checked;
				result.child.forEach(v => {
					v.checked = result.checked;

					if (v.checked) {
						if (!selectedList.find(r => r.bisShopSortId === v.bisShopSortId)) {
							selectedList.push(v);
						}
					} else {
						selectedList = selectedList.filter(item => item.bisShopSortId !== v.bisShopSortId);
					}
				});
				this.setData({
					currentItem: this.currentItem,
					selectedList: selectedList
				});
			},

			checkboxChange(e) {
				let id = e.currentTarget.dataset.id;
				let selectedList = this.selectedList;
				let {
					parent,
					child
				} = this.findParent(id);
				child.checked = !child.checked;

				if (child.checked) {
					selectedList.push(child);
				} else {
					selectedList = selectedList.filter(item => item.bisShopSortId !== child.bisShopSortId);
				}

				parent.checked = parent.child.every(item => item.checked);
				this.setData({
					currentItem: this.currentItem,
					selectedList: selectedList
				});
			},

			remove(e) {
				let id = e.currentTarget.dataset.id;
				let selectedList = this.selectedList;
				let {
					parent,
					child
				} = this.findRoot(id);
				child.checked = false;
				selectedList = selectedList.filter(v => v.bisShopSortId !== id);
				parent.checked = parent.child.every(item => item.checked);
				this.setData({
					currentItem: this.currentItem,
					selectedList: selectedList
				});
			},

			goToComparison() {
				let params = Object.assign({}, this.query); // params.bisShopSortId = params.bisShopSortId && params.bisShopSortId.join(",");
				// console.log(params.bisShopSortId)
				this.pageGo("/pages/sjlb/sjlb", params);
			},

			findParent(id) {
				let currentItem = this.currentItem;
				let parent = null;
				let child = null;
				currentItem.child.forEach(item => {
					if (item.child) {
						item.child.forEach(v => {
							if (v.bisShopSortId === id) {
								parent = item;
								child = v;
							}
						});
					}
				});
				return {
					parent,
					child
				};
			},

			findRoot(id) {
				let child = null;
				let parent = null;
				this.merchantList.forEach(item => {
					item.child.forEach(v => {
						if (v && v.child) {
							v.child.forEach(m => {
								if (m.bisShopSortId === id) {
									child = m;
									parent = v;
								}
							});
						}
					});
				});
				return {
					child,
					parent
				};
			},

			reset() {
				this.merchantList.forEach(item => {
					item.child.forEach(v => {
						if (v && v.child) {
							v.checked = false;
							v.child.forEach(m => {
								m.checked = false;
							});
						}
					});
				});
				this.setData({
					['merchantList']: this.merchantList,
					currentItem: this.currentItem,
					selectedList: []
				});
			},

			confirm() {
				let bisShopSortId = [];
				this.selectedList.forEach(item => {
					bisShopSortId.push(item.bisShopSortId);
				});
				this.setData({
					['query.limit']: 100,
					['query.bisShopSortId']: bisShopSortId.join(','),
					showModal: true,
					selectedListDefault: JSON.parse(JSON.stringify(this.selectedList))
				});
				this.loadData();
			},

			defaultChecked() {
				let merchantList = this.merchantList;
				let currentItem = this.currentItem;
				let selectedListDefault = this.selectedListDefault;
				merchantList.forEach(item => {
					item.child.forEach(v => {
						if (v && v.child) {
							v.child.forEach(m => {
								if (selectedListDefault.find(c => c.bisShopSortId === m.bisShopSortId)) {
									m.checked = true;
								}
							});
						}

						v.checked = v.child.every(i => i.checked);
					});
				});
				this.setData({
					selectedList: Object.assign([], selectedListDefault),
					currentItem: currentItem
				});
			}

		}
	};
</script>
<style>
	@import "./sjgl.css";
</style>
