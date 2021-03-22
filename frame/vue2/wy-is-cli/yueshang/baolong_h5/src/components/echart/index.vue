<template>
	<div class="app-echart">
		<div ref="chart" style="width:100%;height:300px"></div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			values: {},
		};
	},
	props: {
		options: {
			type: Object,
			default: function() {
				return {};
			},
		},
	},
	watch: {
		options: {
			handler: function(newValue) {
				this.getEchartData(newValue);
				this.values = newValue;
			},
			immediate: true,
			deep: true,
		},
	},
	mounted() {
		this.getEchartData(this.values);
	},

	methods: {
		getEchartData(option) {
			let that = this;
			const chart = this.$refs.chart;
			if (chart) {
				const myChart = this.$echarts.init(chart);
				if (!option) {
					return;
				}
				const { legend, xAxis, yAxis, grid, unit, type, ...opts } = option;
				const options = {
					color: ["#3AABFF", "#9BB3C6"],
					legend: {
						bottom: 0,
						icon: "circle",
						itemHeight: 6,
						show: true,
						...legend,
					},
					tooltip: {
						show: true,
						trigger: "axis",
						backgroundColor: "rgba(255,255,255,.7)",
						textStyle: {
							color: "#000000",
							top: "16px",
						},
						extraCssText: {
							top: "16px",
						},
						formatter: function(params) {
							let res, tb, num1, num2;
							if (params[0]) {
								res = params[0].name + "\n<br/>";
							} else if (params[1]) {
								res = params[1].name + "\n<br/>";
							}

							if (params[0] && params[0].data && params[1] && params[1].data) {
								num1 = params[0].data;
								num2 = params[1].data;
								tb = (((num2 - num1) / num1) * 100).toFixed(2) + "%";
							} else {
								tb = "-";
							}
							params.forEach((item) => {
								if (item) {
									res += item.seriesName + "：" + that.formatNumber(item.data) + unit + "\n<br/>";
								}
							});
							if (type == "tb") {
								res += "同比：" + tb;
							}
							return res;
						},
					},
					grid: {
						top: 10,
						bottom: 30,
						left: 5,
						right: 15,
						containLabel: true,
						...grid,
					},
					xAxis: {
						boundaryGap: false,
						nameTextStyle: {
							color: "#f00",
						},
						axisLine: {
							//x轴
							show: true,
							lineStyle: {
								color: "#C9CCDA",
							},
						},
						axisLabel: {
							textStyle: {
								color: "#ABB9BE", //坐标值得具体的颜色
							},
						},
						axisTick: {
							//刻度线
							show: false,
						},
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed",
							},
						},

						//   axisLabel: {   //x轴是否显示全
						//     interval:0
						//  },
						...xAxis,
					},
					yAxis: {
						boundaryGap: false,
						axisLine: {
							//x轴
							show: true,
							lineStyle: {
								color: "#C9CCDA",
							},
						},
						axisLabel: {
							textStyle: {
								color: "#ABB9BE", //坐标值得具体的颜色
							},
						},
						axisTick: {
							//刻度线
							show: false,
						},
						splitLine: {
							show: false,
						},
						...yAxis,
					},
					...opts,
				};
				myChart.setOption(options);
			}
		},
		formatNumber(value = "0", currencyType = "") {
			let res;
			if (value.toString().indexOf(".") === -1) {
				res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + ".00";
			} else {
				let prev = value.toString().split(".")[0];
				let next = value.toString().split(".")[1] < 10 ? value.toString().split(".")[1] + "0" : value.toString().split(".")[1];
				res = (prev || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + "." + next;
			}
			return currencyType + res;
		},
	},
};
</script>
<style lang="scss" scoped>
.app-echart {
	width: 100%;
}
</style>
