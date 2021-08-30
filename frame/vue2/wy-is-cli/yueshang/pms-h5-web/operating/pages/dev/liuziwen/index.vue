<template>
<view>
  <view class="root">
  <app-echarts class="line" :options="lineops"></app-echarts>
  <button @tap="change">change</button>
</view>
</view>
</template>

<script>
// pages/dev/liuziwen/index.js
import appEcharts from "@/components/echarts/echarts";

export default {
  data() {
    return {
      lineops: {
        color: ["#FF644F", "#5BC151", "#8B6FCE", '#3B95E4'],
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          // data: ['A']
          // data: [{
          //   name: 'A',
          //   // 强制设置图形为圆。
          //   icon: 'circle',
          //   // 设置文本为红色
          //   textStyle: {
          //     color: 'red'
          //   }
          // }],
          // width:16,
          icon: 'circle',
          left: 10 // top:-20

        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: function (params, ticket, callback) {
            console.log(params);
            var res = '收入 : ';
            var income = 0;

            for (var j = 0; j < params.length; j++) {
              income += parseInt(params[j].value);
            }

            console.log(" income = " + income);
            console.log(" params = " + params);
            console.log(" name = " + params[1].name); //使用for可以将需要的数据全部加到res 
            //注意下边的<br/>  

            res += income + '\n';

            for (var i = 0, l = params.length; i < l; i++) {
              res += params[i].seriesName + ' : ' + params[i].value + '\n';
            }

            res += '同比：' + (parseInt(params[0].value) - parseInt(params[1].value));
            return res;
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
          axisTick: {
            show: false
          }
        },
        yAxis: {
          x: 'center',
          type: 'value',
          interval: 400,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {// color: '#7F8695'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '20年度',
          type: 'line',
          smooth: true,
          data: [100, 200, 400, 900, 200, 300, 500],
          color: '#0f0',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(108,80,243,0.3)'
              }, {
                offset: 1,
                color: 'rgba(108,80,243,0)'
              }], false),
              shadowColor: 'rgba(108,80,243, 0.9)',
              shadowBlur: 20
            }
          }
        }, {
          name: '19年度',
          type: 'line',
          smooth: true,
          data: [400, 300, 400, 900, 300, 300, 500],
          color: '#f0f',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0,202,149,0.3)'
              }, {
                offset: 1,
                color: 'rgba(0,202,149,0)'
              }], false),
              shadowColor: 'rgba(0,202,149, 0.9)',
              shadowBlur: 20
            }
          }
        }]
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      legend: {
        icon: 'circle',
        left: 10
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
          console.log(params);
          var res = '收入 : ';
          var income = 0;

          for (var j = 0; j < params.length; j++) {
            income += parseInt(params[j].value);
          }

          console.log(" income = " + income);
          console.log(" params = " + params);
          console.log(" name = " + params[1].name);
          res += income + '\n';

          for (var i = 0, l = params.length; i < l; i++) {
            res += params[i].seriesName + ' : ' + params[i].value + '\n';
          }

          res += '同比：' + (parseInt(params[0].value) - parseInt(params[1].value));
          return res;
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisTick: {
          show: false
        }
      },
      yAxis: {
        x: 'center',
        type: 'value',
        interval: 400,
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {},
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      data: [100, 200, 400, 900, 200, 300, 500],
      areaStyle: {
        normal: {
          color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(108,80,243,0.3)'
          }, {
            offset: 1,
            color: 'rgba(108,80,243,0)'
          }], false),
          shadowColor: 'rgba(108,80,243, 0.9)',
          shadowBlur: 20
        }
      },
      data: [400, 300, 400, 900, 300, 300, 500],
      areaStyle: {
        normal: {
          color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0,202,149,0.3)'
          }, {
            offset: 1,
            color: 'rgba(0,202,149,0)'
          }], false),
          shadowColor: 'rgba(0,202,149, 0.9)',
          shadowBlur: 20
        }
      }
    };
  },

  components: {
    appEcharts
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    change: function () {
      console.log("change");
      this.setData({
        'lineops.color': ["#0f0", "#0f0", "#0f0", '#0f0'],
        'lineops.xAxis.data': ['06', '06', '06', '06/30', '07/01', '07/02', '07/03']
      });
    }
  }
};
</script>
<style>
@import "./index.css";
</style>