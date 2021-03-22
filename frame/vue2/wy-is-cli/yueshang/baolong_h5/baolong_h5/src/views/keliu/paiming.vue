<template>
	<div class="keliu-paiming">
		<div class="app-header">
			<div class="app-header-right">
				<app-date-pick @selected="dateSelected" :selected="params.yearMonth" type="year-month"></app-date-pick>
			</div>
		</div>
		<div class="keliu-paimign-main">
			<app-section :collapseable="true">
				<div class="title-unit" slot="head-title">（万元）</div>
			</app-section>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			params: {},
			tabList: [
				{
					title: "客流密度",
					type: "kl",
					unit: "人/天/㎡",
					value: "",
				},
				{
					title: "项目客流",
					type: "xmkl",
					unit: "人",
					value: "",
				},
			],
			activeTab: {
				title: "客流密度",
				type: "kl",
				unit: "人/天/㎡",
				value: "",
			},
		};
	},
	methods: {
		dateSelected() {},
		async getProjectFlow() {
			let res = await this.$axios.keliu.getProjectFlow({ date: "2020-01-01" });
			console.log(res);
		},
	},
	mounted() {
		this.params = this.$route.query;
		this.getProjectFlow();
	},
};
</script>
<style lang="scss" scoped></style>
