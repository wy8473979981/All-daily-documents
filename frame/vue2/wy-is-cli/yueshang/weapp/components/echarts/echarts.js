// components/echarts.js
import * as echarts from '../../packages/ec-canvas/echarts';

const instances = {};

Component({
  properties: {
    id: {
      type: String,
      value: null
    },
    height: {
      type: String,
      value: '450rpx'
    },
    options: {
      type: Object,
      value: {},
      observer: function (newValue) {
        const chartId = this.data.id || this.data.chartId || `echart-${Date.now()}`;
        const chart = instances[chartId];
        const {
          legend,
          xAxis,
          yAxis,
          unit,
          decimals,
          isPaiming,
          ...opts
        } = newValue || {};
        const options = {
          color: ['#3AABFF', '#9BB3C6'],
          legend: {
            bottom: 0,
            icon: 'circle',
            itemHeight: 6,
            ...legend
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
              if (decimals === 'paiming') {
                if (params.length > 0) {
                  res += params[0].axisValue + '\n'
                }
                for (var i = 0, l = params.length; i < l; i++) {
                  if (!(params[i].value == null)) {
                    res += params[i].seriesName + ' : ' + params[i].value + '\n';
                  } else {
                    res += params[i].seriesName + ' : -' + '\n';
                  }
                }
                if (params.length === 2) {
                  if (!(params[0].value == null) && !(params[1].value == null)) {
                    let p0 = Number(params[0].value)
                    let p1 = Number(params[1].value)
                    let tb = ''
                    if (p0 == 0 && p1 == 0) {
                      tb = 0
                    } else {
                      tb = (((p0 - p1) / p1) * 100).toFixed(2)
                    }
                    res += '同比：' + tb + '%'
                  }
                }

                return res;
              }
              if (decimals === 'xiaoshoupaiming') {
                if (params.length > 0) {
                  res += params[0].axisValue + '\n'
                }
                for (var i = 0, l = params.length; i < l; i++) {
                  if (!(params[i].value == null)) {
                    res += params[i].seriesName + ' : ' + params[i].value + [unit] + '\n';
                  } else {
                    res += params[i].seriesName + ' : -' + '\n';
                  }
                }

                if (params.length === 2) {
                  if (!(params[0].value == null) && !(params[1].value == null)) {
                    let p0 = Number(params[0].value)
                    let p1 = Number(params[1].value)
                    let tb = ''
                    if (p0 == 0 && p1 == 0) {
                      tb = 0
                    } else {
                      tb = (((p0 - p1) / p1) * 100).toFixed(2)
                    }
                    res += '同比：' + tb + '%'
                  }
                }

                return res;
              }

              if (params.length > 0) {
                res += params[0].axisValue + '\n'
              }
              for (var i = 0, l = params.length; i < l; i++) {
                if (!(params[i].value == null)) {
                  res += params[i].seriesName + ' : ' + params[i].value + [unit] + '\n';
                } else {
                  res += params[i].seriesName + ' : -' + '\n';
                }
              }
              if (params.length === 2) {
                if (!(params[0].value == null) && !(params[1].value == null)) {
                  res += '同比：' + (Number(params[0].value) - Number(params[1].value)).toFixed(2) + [unit]
                }
              }

              return res;
            }
          },
          grid: {
            top: 10,
            bottom: 30,
            left: 5,
            right: 5,
            containLabel: true
          },
          xAxis: {
            boundaryGap: false,
            nameTextStyle: {
              color: '#f00'
            },
            axisLine: { //x轴
              show: true,
              lineStyle: {
                color: '#C9CCDA'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#ABB9BE',//坐标值得具体的颜色
              }
            },
            axisTick: { //刻度线
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            //   axisLabel: {   //x轴是否显示全
            //     interval:0
            //  },
            ...xAxis
          },
          yAxis: {
            boundaryGap: false,
            axisLine: { //x轴
              show: true,
              lineStyle: {
                color: '#C9CCDA'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#ABB9BE',//坐标值得具体的颜色
              }
            },
            axisTick: { //刻度线
              show: false
            },
            splitLine: {
              show: false
            },
            ...yAxis
          },
          ...opts
        };
        if (chart) {
          chart.setOption(options)

        } else {
          this.setData({
            chartId,
            ec: {
              onInit: (canvas, width, height, devicePixelRatio) => {
                const instance = echarts.init(canvas, null, {
                  width,
                  height,
                  devicePixelRatio
                });
                canvas.setChart(instance);
                instance.setOption(options);
          instances[chartId] = instance;
          return instance;
        }
      }
    });
        }
      }
    },
  },
data: {
  chartId: null,
    ec: {
    onInit: null
  }
},
lifetimes: {
  detached() {
    delete instances[this.data.chartId];
  }
}
});