<template>
	<div class="home">
		<div class="app-header">
			<div>
				<app-project-select :selected="selected" @projeSelected="projeSelected"></app-project-select>
			</div>
			<div class="app-header-right">
				<searchCriteria :searchList="searchList" @search="search" />
				<app-date-pick type="date" @selected="dateSelected" selected="2020-01-02"></app-date-pick>
			</div>
		</div>
		<div class="app-main">
			<app-section title="echar">
				<echart :options="options"></echart>
				<!-- <echart></echart> -->
			</app-section>
		</div>
		<comparison :data="data" @search="comparisonSelect" himt="注意：最多选两个">
			<template>
				<div class="comparison">对比</div>
			</template>
		</comparison>
		<to-top class="go-top" />
	</div>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			selected: {
				bisProjectId: "10086",
				label: "安溪",
			},
			searchList: [
				{
					label: "物业类型",
					key: "wylx",
					selectedCode: 1,
					values: [
						{
							name: "购物中心",
							code: 1,
						},
						{
							name: "商业街",
							code: 2,
						},
						{
							name: "全部",
							code: 0,
						},
					],
				},
			],
			data: [
				{
					bisProjectId: "402834702e90c8fb012e9436a78f0a0a",
					comRate: "-",
					comRateYTD: "-",
					curMonthColRate: "0.00%",
					curMonthFact: "0",
					curMonthMust: "1.06",
					curYearColRate: "0.00%",
					curYearFact: "0",
					curYearMust: "1.06",
					htYearHb: "-",
					htYearTb: "-",
					htmonthHb: "-",
					htmonthTb: "-",
					label: "海阳",
					lastMonthSHHJ: "0",
					mhb: "-",
					monthSHHJ: "0",
					monthYsHt: "1.06",
					mtm: "-100.00%",
					projectName: "海阳",
					ranking: 1,
					sjHtMonthRate: "0.00%",
					sjHtYearRate: "0.00%",
					yearSHHJ: "0",
					yearYsHt: "1.06",
					yhb: "-100.00%",
					yty: "-100.00%",
				},
				{
					bisProjectId: "402834702e90c8fb012e9436a78f0a0b",
					comRate: "-",
					comRateYTD: "-",
					curMonthColRate: "0.00%",
					curMonthFact: "0",
					curMonthMust: "1.06",
					curYearColRate: "0.00%",
					curYearFact: "0",
					curYearMust: "1.06",
					htYearHb: "-",
					htYearTb: "-",
					htmonthHb: "-",
					htmonthTb: "-",
					label: "海阳",
					lastMonthSHHJ: "0",
					mhb: "-",
					monthSHHJ: "0",
					monthYsHt: "1.06",
					mtm: "-100.00%",
					projectName: "海阳",
					ranking: 1,
					sjHtMonthRate: "0.00%",
					sjHtYearRate: "0.00%",
					yearSHHJ: "0",
					yearYsHt: "1.06",
					yhb: "-100.00%",
					yty: "-100.00%",
				},
			],
			rows: [
				{
					key: "ab",
					label: "",
				},
				{
					key: "abc",
					label: "应收(万元)",
					unit: "%",
				},
				{
					key: "abc",
					label: "应收(万元)",
					unit: "%",
				},
				{
					key: "abc",
					label: "应收(万元)",
					unit: "%",
				},
				{
					key: "abc",
					label: "应收(万元)",
					unit: "%",
				},
				{
					key: "abc",
					label: "应收(万元)",
					unit: "%",
				},
				{
					key: "abc",
					label: "应收(万元)",
					unit: "%",
				},
				{
					key: "abc",
					label: "应收(万元)",
					unit: "%",
				},
				{
					key: "abc",
					label: "应收(万元)",
					unit: "%",
				},
				{
					key: "abc",
					label: "应收(万元)",
					unit: "%",
				},
				{
					key: "abc",
					label: "应收(万元)",
					unit: "%",
				},
			],
			values: [
				{
					ab: "安徽",
					abc: 100,
				},
				{
					ab: "安庆",
					abc: 10000000,
				},
				{
					ab: "合肥",
					abc: 10000000,
				},
			],
			options: {
				xAxis: {
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				},
				unit: "万",
				type: "tb",
				series: [
					{
						name: "2020",
						data: [150, 230, 224, 218, 135, 147],
						type: "line",
					},
					{
						name: "2021",
						data: [10, 20, 280, 21, 35, 0, 160],
						type: "line",
					},
				],
				legend: {
					data: ["2020", "2021"],
				},
			},
		};
	},
	watch: {},
	methods: {
		projeSelected(item) {
			console.log(item);
		},
		dateSelected(date) {
			console.log(date);
		},
		search(item) {
			console.log(item);
		},
		comparisonSelect(ids) {
			console.log(ids);
		},
	},
};
</script>
<style lang="scss">
.go-top {
	position: fixed;
	bottom: 150px;
	right: 20px;
}
.app-main {
	height: 1500px;
}
.comparison {
	width: 1rem;
	height: 1rem;
	background-color: #f00;
	line-height: 1rem;
	position: fixed;
	bottom: 50px;
	right: 20px;
	text-align: center;
	border-radius: 50%;
	color: #fff;
}
</style>
