<template>
	<view class="app-echarts" :style="'height: ' + height + ';'">
		<div v-if="canvasId" class="ec-canvas" :id="id" :canvasId="id" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @error="error"></div>
	</view>
</template>
<style>
uni-canvas {
	width: 100%;
	height: 100%;
}
.ec-canvas {
	width: 100%;
	height: 100%;
}
</style>
<script>
// components/echarts.js
const instances = {};
// import ecCanvas from "@/packages/ec-canvas/ec-canvas";

export default {
	data() {
		return {
			chartId: null,
			ec: {
				onInit: null,
			},
			tongbi: null,
			canvasId: "firstCanvas",
		};
	},

	components: {
		// ecCanvas
	},
	props: {
		id: {
			type: String,
			default: 'firstId',
		},
		height: {
			type: String,
			default: "450rpx",
		},
		options: {
			type: Object,
			default: () => ({}),
		},
	},
	watch: {
		options: {
			handler: function (newValue) {
				const chartId = this.id || this.chartId || `echart-${Date.now()}`;
				const chart = instances[chartId];
				const { legend, xAxis, yAxis, unit, decimals, isPaiming, tb, grid, ...opts } = newValue || {};
				const options = {
					color: ["#3AABFF", "#9BB3C6"],
					legend: {
						bottom: 0,
						icon: "circle",
						itemHeight: 6,
						...legend,
					},
					tooltip: {
						show: true,
						trigger: "axis",
						backgroundColor: "rgba(255,255,255,.7)",
						textStyle: {
							color: "#000000",
						},
						formatter: function (params, ticket, callback) {
							let res = "";

							if (decimals === "paiming") {
								if (params.length > 0) {
									res += params[0].axisValue + "\n";
								}

								for (var i = 0, l = params.length; i < l; i++) {
									if (!(params[i].value == null)) {
										res += params[i].seriesName + " : " + params[i].value + "\n";
									} else {
										res += params[i].seriesName + " : -" + "\n";
									}
								}

								if (params.length === 2 && !tb) {
									if (!(params[0].value == null) && !(params[1].value == null)) {
										let p0 = Number(params[0].value);
										let p1 = Number(params[1].value);
										let tb = "";

										if (p0 == 0 && p1 == 0) {
											tb = 0;
										} else {
											tb = (((p0 - p1) / p1) * 100).toFixed(2);
										}

										res += "同比：" + tb + "%";
									}
								}

								return res;
							}

							if (decimals === "xiaoshoupaiming") {
								if (params.length > 0) {
									res += params[0].axisValue + "\n";
								}

								for (var i = 0, l = params.length; i < l; i++) {
									if (!(params[i].value == null)) {
										res += params[i].seriesName + " : " + params[i].value + [unit] + "\n";
									} else {
										res += params[i].seriesName + " : -" + "\n";
									}
								}

								if (params.length === 2 && !tb) {
									if (!(params[0].value == null) && !(params[1].value == null)) {
										let p0 = Number(params[0].value);
										let p1 = Number(params[1].value);
										let tb = "";

										if (p0 == 0 && p1 == 0) {
											tb = 0;
										} else {
											tb = (((p0 - p1) / p1) * 100).toFixed(2);
										}

										res += "同比：" + tb + "%";
									}
								}

								return res;
							}

							if (params.length > 0) {
								res += params[0].axisValue + "\n";
							}

							for (var i = 0, l = params.length; i < l; i++) {
								if (!(params[i].value == null)) {
									res += params[i].seriesName + " : " + params[i].value + [unit] + "\n";
								} else {
									res += params[i].seriesName + " : -" + "\n";
								}
							}

							if (params.length === 2 && !tb) {
								if (!(params[0].value == null) && !(params[1].value == null)) {
									res += "同比：" + (Number(params[0].value) - Number(params[1].value)).toFixed(2) + [unit];
								}
							}

							return res;
						},
					},
					grid: {
						top: 10,
						bottom: 30,
						left: 5,
						right: 5,
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
					yAxis: Array.isArray(yAxis)
						? yAxis
						: {
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
				this.$nextTick(()=>{
						const context = document.getElementById(this.id);
						if (options && context) {
							var eachart = this.$echarts.init(context);
							eachart.setOption(options);
						}
				})
				
			},
			immediate: true,
			deep: true,
		},
	},

	destroyed() {
		delete instances[this.chartId];
	},
	methods: {
		initEcharts(options, width, height, devicePixelRatio) {
			const canvasId = this.canvasId;
			const query = uni.createSelectorQuery().in(this);
			// #ifdef H5
			const context = document.getElementById(canvasId);
			// #endif
			// #ifdef APP-VUE
			const context = uni.createCanvasContext(canvasId, this);
			// #endif
			query
				.select(`#${canvasId}`)
				.boundingClientRect((res) => {
					if (!res) {
						setTimeout(() => this.initEcharts(options), 50);
						return;
					}
					setTimeout(() => {
						var eachart = this.$echarts.init(context);
						eachart.setOption(options);
					}, 100);
				})
				.exec();
		},
		touchStart(e) {},
		touchMove() {},
		touchEnd() {},
		error() {},
	},
};
</script>
