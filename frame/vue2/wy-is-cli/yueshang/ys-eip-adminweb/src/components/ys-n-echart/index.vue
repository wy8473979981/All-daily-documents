<template>
	<div class="app-echart">
		<div ref="chart" :style="{height:height}" style="width:100%"></div>
	</div>
</template>
<script>
import ResizeListener from "element-resize-detector";
	export default {
		data() {
			return {
				values: {},
        myChart: null
			};
		},
		props: {
			options: {
				type: Object,
				default: function() {
					return {};
				},
			},
			height: {
				type: String,
				default: '500px'
			}
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
    beforeDestroy() {
      window.removeEventListener("resize", this.handleWindowResize);
    },
		methods: {
			getEchartData(option) {
				let that = this;
				const chart = this.$refs.chart;
				if (chart) {
					this.myChart = this.$echarts.init(chart);
					if (!option) {
						return;
					}
					const {
						singType,
						legend,
						xAxis,
						yAxis,
						grid,
						unit,
						type,
						color,
						precision = 2,
						...opts
					} = option;

					const options = {
						color: color ? color : ["#3AABFF", "#9BB3C6"],
						legend: {
							icon: "circle", //'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
							itemHeight: 20,
							show: true,
							align: 'left',
							itemGap: 20, // 设置间距
							itemWidth: 20, //图标宽
							...legend,
						},
						tooltip: {
							confine: true, //防止悬浮窗被遮盖
							show: true,
							trigger: "axis",
							backgroundColor: "#F0F2F7",
							borderColor: "#F0F2F7", //tooltip边框颜色
							borderWidth: 1,
							borderRadius: 0,
							fontSize: '32px',
							textStyle: {
								color: "#000000",
								top: "32px",
							},
							extraCssText: {
								top: "32px",
							},
							padding: [8, 10, 8, 10],
							formatter: function(params) {
								let res, tb, num1, num2;
								if(singType) {
									return that.formatNumber(params[0].data,'',precision)
								}
								if (params[0]) {
									res = "<span style='font-weight: bold;'>" + params[0].name + "</span>" +
										"\n<br/>";
								} else if (params[1]) {
									res = "<span style='font-weight: bold;'>" + params[1].name + "</span>" +
										"\n<br/>";
								}

								if (params[0] && params[0].data && params[1] && params[1].data) {
									num1 = params[0].data;
									num2 = params[1].data;
									tb = (((num1 - num2) / num2) * 100).toFixed(2) + "%";
								} else {
									tb = "-";
								}
								console.log(option,'option')
								params.forEach((item) => {
									if (item) {
										// console.log(item.data, 'data')
										//that.formatNumber(item.data | '0')
										res += "<span style='color: #8893A3;'>" + item.seriesName + "：" +
											"</span>" + that.formatNumber(item.data ? item.data : 0, '',
												precision) + (unit ? unit : '') + "\n<br/>";
									}
								});
								if (type == "tb") {
									if (tb.indexOf('-') != -1 && tb != '-') {
										res += "同比：" + "<span style='color:#FD100E'>" + tb + "</span>";
									} else {
										res += "同比：" + "<span>" + tb + "</span>";
									}

								}
								// console.log(res,'res')
								return res;
							},
						},
						grid: {
							top: 50,
							bottom: 30,
							left: 5,
							right: 15,
							containLabel: true,
							...grid,
						},
						xAxis: {
							//boundaryGap: false,
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
							splitLine: {
								show: false,
								lineStyle: {
									type: "dashed",
								},
							},

							//   axisLabel: {   //x轴是否显示全
							//     interval:0
							//  },
							...xAxis,
						},
						yAxis: yAxis && yAxis instanceof Array ? yAxis : {
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
								show: true,
								lineStyle: {
									type: "dashed",
								},
							},
							...yAxis,
						},
						...opts,
					};
					console.log(options, 'options')
          this.myChart.setOption(options)
          this.myChart.on('legendselectchanged', function(obj) {
						that.$emit('selectLegend', obj)
					})

          window.addEventListener("resize", this.handleWindowResize);
          this.addChartResizeListener();
				}
			},
			formatNumber(value = "0", currencyType = "", precision = 2) {
				var text = Number(value).toFixed(precision);
				var bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
				let res = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, function(_, c) {
					return _ + ',';
				}).split('').reverse().join('') + bit;
				return currencyType + res;
			},
      /**
       * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
       */
      addChartResizeListener() {
        // eslint-disable-next-line no-undef
        const instance = ResizeListener({
          strategy: "scroll",
          callOnAdd: true,
        });
        instance.listenTo(this.$el, () => {
          if (!this.myChart) return;
          this.myChart.resize();
        });
      },
      /**
       * 当窗口缩放时，echart动态调整自身大小
       */
      handleWindowResize() {
        if (!this.myChart) return;
        this.myChart.resize();
      },

		},
	};
</script>
<style lang="scss" scoped>
	.app-echart {
		width: 100%;
	}
</style>
