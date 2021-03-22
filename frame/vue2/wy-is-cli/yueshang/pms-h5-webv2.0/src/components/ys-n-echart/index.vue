<template>
  <div class="app-echart">
    <div ref="chart" :style="{height:height}" style="width:100%"></div>
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
      default: function () {
        return {};
      },
    },
    height: {
      type: String,
      default: '240px'
    }
  },
  watch: {
    options: {
      handler: function (newValue) {
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
        const { legend, xAxis, yAxis, grid, unit, type, color, precision = 2, ...opts } = option;
        // console.log(yAxis, 'yAxis')
        const options = {
          color: color ? color : ["#3AABFF", "#9BB3C6"],
          legend: {
            bottom: 0,
            icon: "circle",
            itemHeight: 6,
            show: true,
            align: 'left',
            itemGap: 20, // 设置间距
            itemWidth: 8,//图标宽
            ...legend,
          },
          tooltip: {
            confine: true,//防止悬浮窗被遮盖
            show: true,
            trigger: "axis",
            backgroundColor: "#fff",
            borderColor: "rgba(24,144,255,.7)",		//tooltip边框颜色
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
            formatter: function (params) {
              let res, tb, num1, num2;
              if (params[0]) {
                res = params[0].name + "\n<br/>";
              } else if (params[1]) {
                res = params[1].name + "\n<br/>";
              }

              if (params[0] && params[0].data && params[1] && params[1].data) {
                num1 = params[0].data;
                num2 = params[1].data;
                tb = (((num1 - num2) / num2) * 100).toFixed(2) + "%";
              } else {
                tb = "-";
              }
              params.forEach((item) => {
                if (item) {
                  // console.log(item.data, 'data')
                  //that.formatNumber(item.data | '0')
                  res += item.seriesName + "：" + that.formatNumber(item.data ? item.data : 0, '', precision) + (unit ? unit : '') + "\n<br/>";
                }
              });
              if (type == "tb") {
                if (tb.indexOf('-') != -1 && tb != '-') {
                  res += "同比：" + "<span style='color:#FD100E'>" + tb + "</span>";
                } else {
                  res += "同比：" + "<span>" + tb + "</span>";
                }

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
              show: false,
            },
            ...yAxis,
          },
          ...opts,
        };
        // console.log(options, 'options')
        myChart.setOption(options);
      }
    },
    formatNumber(value = "0", currencyType = "", precision = 2) {
      var text = Number(value).toFixed(precision);
      var bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
      let res = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, function (_, c) { return _ + ','; }).split('').reverse().join('') + bit;
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
