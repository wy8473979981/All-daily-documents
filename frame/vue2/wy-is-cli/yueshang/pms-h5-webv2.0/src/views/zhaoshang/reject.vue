<template>
	<div class="home" v-webTitle :data-title="`筹备期网批驳回率统计`">
		<div class="header-top">
			<ys-n-nav-bar :title="`筹备期网批驳回率统计`" />
			<div class="app-header">
				<div class="app-header-container">
					<div class="app-header-left">
						<ys-n-project-select :selected="selected" @projeSelected="projeSelected" :dilogShow="false" :disabledAll="true">
						</ys-n-project-select>
					</div>
					<div class="app-header-right">
						<ys-n-date-pick :type="`year-month`" @selected="dateSelected" :selected="params.yearAndMonth">
						</ys-n-date-pick>
					</div>
				</div>
			</div>
		</div>
		<ys-n-section :title="chartsTitle" :collapseable="collapseable">
			<div class="head-actions_left_view" slot="head-actions_left">
				<ys-n-filter-chart-dialog :searchList="searchTypeList" @search="searchType" :leftLink="true"
					@linkUrl="goLink"></ys-n-filter-chart-dialog>
			</div>
			<ys-n-table :fixednum="2" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns">
			</ys-n-table>
		</ys-n-section>
	</div>
</template>

<script>
	
	let columns = [{
		label: '序号',
		width: '1.5rem',
		align: 'left'
	}, {
		label: '项目',
		key: 'projectName',
		width: '2rem',
		align: 'left'
	}, {
		label: '发起数',
		key: 'lagmonthBrandFqNum',
		width: '1.7rem',
		group: '上月-品牌',
		align: 'right',
		sortable: true
	}, {
		label: '驳回数',
		key: 'lagmonthBrandBhNum',
		group: '上月-品牌',
		width: '1.7rem',
		align: 'right',
		sortable: true
	}, {
		label: '准确率',
		key: 'lagmonthBrandZql',
		group: '上月-品牌',
		width: '1.7rem',
		unit: '%',
		slot: 'penoncel',
		align: 'right',
		sortable: true
	}, {
		label: '发起数',
		key: 'curmonthBrandFqNum',
		group: '本月-品牌',
		width: '1.7rem',
		align: 'right',
		sortable: true
	}, {
		label: '驳回数',
		key: 'curmonthBrandBhNum',
		group: '本月-品牌',
		width: '1.7rem',
		align: 'right',
		sortable: true
	}, {
		label: '准确率',
		key: 'curmonthPpZql',
		group: '本月-品牌',
		width: '1.7rem',
		unit: '%',
		slot: 'penoncel',
		align: 'right',
		sortable: true
	}, {
		label: '发起数',
		key: 'lagmonthBusinessFqNum',
		group: '上月-商务',
		width: '1.7rem',
		align: 'right',
		sortable: true
	}, {
		label: '驳回数',
		key: 'lagmonthBusinessBhNum',
		group: '上月-商务',
		width: '1.7rem',
		align: 'right',
		sortable: true
	}, {
		label: '准确率',
		key: 'lagmonthBusinessZql',
		group: '上月-商务',
		width: '1.7rem',
		unit: '%',
		slot: 'penoncel',
		align: 'right',
		sortable: true
	}, {
		label: '发起数',
		key: 'curmonthBusinessFqNum',
		group: '本月-商务',
		width: '1.7rem',
		align: 'right',
		sortable: true
	}, {
		label: '驳回数',
		key: 'curmonthBusinessBhNum',
		group: '本月-商务',
		width: '1.7rem',
		align: 'right',
		sortable: true
	}, {
		label: '准确率',
		key: 'curmonthBusinessZql',
		group: '本月-商务',
		width: '1.7rem',
		unit: '%',
		slot: 'penoncel',
		align: 'right',
		sortable: true
	}]
	export default {
		name: "reject",
		data() {
			return {
				collapseable: false,
				chartsTitle: "筹备期网批驳回率统计",
				selected: {
					projectId: this.$route.query.projectId || '',
					label: this.$route.query.projectName || '全部',
				},
				params: {
					offset: 1,
					limit: 100000,
					yearAndMonth: this.$route.query.yearAndMonth || '',
					projectId: this.$route.query.projectId || '',
					monthId: this.$route.query.realCompletedYm ? this.$route.query.realCompletedYm.replace('-','') : ''
				},
				table: {
					totalRow: null,
					dataList: [],
					columns: columns,
				},
				searchTypeList: [{
					label: "",
					key: "wylx",
					selectedCode: 2,
					values: [{
							name: "筹备招商进度",
							url: "/zhaoshang/process/index",
						},
						{
							name: "筹备期网批驳回率统计",
							url: "/zhaoshang/reject",
							code: 2,
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
							url: "/zhaoshang/brandNum",
						},
					],
				}]
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
				this.getDataList()
			},
			dateSelected(date) {
				console.log(date);
				this.setData({
					["params.yearAndMonth"]: date,
					["params.monthId"]: date.replace('-','')
				});
				this.getDataList()
				// },
			},
			async getDataList() {
				let res = await this.$axios.zhaoshangServe.getRejectTableData(this.params)
				this.setData({
					"table.dataList": res.data.list.slice(0, -1),
					"table.totalRow": res.data.list.slice(-1)[0],
				});
			},
			searchType() {

			},
			goLink(url) {
				this.$router.push({
					path: url,
					query: this.params
				})
			}
		}
	}
</script>

<style>
</style>
