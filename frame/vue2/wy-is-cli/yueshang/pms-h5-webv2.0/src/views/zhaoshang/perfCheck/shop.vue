<template>
	<div class="home" v-webTitle :data-title="`招商业绩考核-铺位`">
		<div class="header-top">
			<ys-n-nav-bar :title="`招商业绩考核-铺位`" />
			<div class="app-header">
				<div class="app-header-container">
					<div class="app-header-left">
						<ys-n-project-select :selected="selected" @projeSelected="projeSelected" :dilogShow="false"  :disabledAll="true">
						</ys-n-project-select>
					</div>
				</div>
			</div>
		</div>
		<ys-n-section :title="chartsTitle" :collapseable="collapseable">
			<div class="head-actions_left_view" slot="head-actions_left">
				<!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
				<!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
				<ys-n-filter-chart-dialog :searchList="searchTypeList" @search="searchType" :leftLink="true"
					@linkUrl="goLink"></ys-n-filter-chart-dialog>
			</div>
			<ys-n-table :fixednum="1" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns"
				@row-column-click="onRowColumnClick"></ys-n-table>
		</ys-n-section>
	</div>
</template>

<script>
	
	const columnList = [{
		label: '序号',
		width: '1.5rem',
		align: 'left'
	}, {
		label: '项目',
		key: 'bisProjectName',
		width: '2rem',
		align: 'left'
	}, {
		label: '铺位号',
		key: 'storeNo',
		width: '2rem',
		align: 'left'
	}, {
		label: '业态',
		key: 'primaryForms',
		width: '1.8rem',
		align: 'left'
	}, {
		label: '计租面积(㎡)',
		key: 'rentArea',
		width: '2.6rem',
		align: 'right',
		sortable: true
	}, {
		label: '主谈人',
		key: 'chiefNegotiator',
		width: '1.8rem',
		align: 'left'
	}]
	export default {
		name: "Home",
		data() {
			return {
				searchTypeList: [{
					label: "",
					key: "wylx",
					selectedCode: 4,
					values: [{
							name: "筹备招商进度",
							url: "/zhaoshang/process/index",
						},
						{
							name: "筹备期网批驳回率统计",
							url: "/zhaoshang/reject",
						},
						{
							name: "筹备期全面抽成统计",
							url: "/zhaoshang/commissionTotal",
						}, // {
						// 	label: "项目铺位分解",
						// 	url: "/pages/zhaoshang/pwfj/pwfj"
						// },
						{
							name: "招商业绩考核",
							url: "/zhaoshang/perfCheck/index",
							code: 4
						},
						{
							name: "总部联发品牌数据监控",
							url: "/zhaoshang/linkBrand/index",
						},
						{
							name: "已招租金达成率柱状图",
							url: "/zhaoshang/rentCompletRate",
						},
						{
							name: "进场审图进度-品牌数",
							url: "/zhaoshang/stjd/stjd",
						},
						{
							name: "待开业项目招商进度-品牌数",
							url: "/zhaoshang/noMakebusinessBrandNum",
						},
					],
				}],
				collapseable: false,
				chartsTitle: "招商业绩考核-铺位",
				selected: {
					projectId: this.$route.query.projectId,
					label: this.$route.query.projectName || "全部",
				},
				params: {
					offset: 1,
					limit: 10000,
					queryYear: this.$route.query.yearAndMonth ? this.$route.query.yearAndMonth.split('-')[0] : new Date()
						.getFullYear(),
					projectId: this.$route.query.projectId,
					projectName: this.$route.query.projectName || '',
					label: this.$route.query.projectName || ''
				},
				table: {
					totalRow: null,
					dataList: [],
					columns: columnList
				},
			}
		},
		created() {
			this.getDataList()
		},
		methods: {
			projeSelected(item) {
				console.log(item);
				this.setData({
					["params.projectId"]: (item && item.projectId) || "",
					["params.projectName"]: (item && item.shortName) || "",
				});
				this.initData()
			},
			searchType(item) {},
			async getDataList() {
				let res = await this.$axios.zhaoshangServe.getPrefDetailTableData(this.params)
				this.setData({
					"table.dataList": res.data.list.slice(0, -1),
					"table.totalRow": res.data.list.slice(-1)[0],
				});
			},
			goLink(url) {
				this.$router.push({
					path: url,
					query: this.params
				})
			},
		},
	}
</script>

<style>
</style>
