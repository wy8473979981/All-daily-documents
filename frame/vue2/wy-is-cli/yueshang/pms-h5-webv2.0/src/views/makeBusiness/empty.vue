<template>
	<div class="kaiye-details" v-webTitle :data-title="`招商空铺信息`">
		<div class="header-top">
			<ys-n-nav-bar :title="`招商信息`" />
			<div class="app-header">
				<ys-n-project-select :selected="selected" @projeSelected="projeSelected" :isHome="false"></ys-n-project-select>
			</div>
		</div>
		<ys-n-section title="空铺排名" :hasTable="true">
			<ys-n-table :values="dataList" :columns="columns" :totalRow="totalRow"></ys-n-table>
		</ys-n-section>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				selected: {
					projectId: this.$route.query.projectId,
					label: this.$route.query.projectName,
				},
				params: {
					yearMonth:this.$route.query.yearMonth,
					projectId: this.$route.query.projectId,
					projectName:this.$route.query.projectName,
					chargeType: this.$route.query.chargeType
				},
				columns: [{
					label: "序号",
					width: "1.2rem"
				}, {
					label: "铺位号",
					width: "4rem",
					key: "storeNo"
				}, {
					label: "空铺面积",
					key:'rentSquare',
					width: "2rem",
					sortable: true,
					align: "right"
				}, {
					label: "空铺天数",
					key: "emptyDays",
					sortable: true,
					width: "2rem",
					align: "right"
				}],
				dataList: [],
				//数据列表
				totalRow: null //合计数据

			};
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		created() {
			this.loadData();
		},
		methods: {
			//获取年份
			getYear(year) {
			  if (year) {
			    return year.split("-")[0];
			  }
			},
			projeSelected(item) {
				this.setData({
				  ["params.projectId"]: (item && item.projectId) || "",
				  ["params.projectName"]: (item && item.shortName) || "",
				  ["selected.projectId"]: (item && item.projectId) || "",
				  ["selected.label"]: (item && item.shortName) || "",
				});
				this.loadData();
			},

			//获取数据
			async loadData() {
				let res = await this.$axios.makeBusinessServe.getEmptyDetail(this.params)
				if (res.data) {
					this.setData({
						dataList: res.data.map((item, index) => {
							return { ...item,
								ranking: index + 1
							};
						})
					});
				}
			}

		}
	};
</script>

<style>
</style>
