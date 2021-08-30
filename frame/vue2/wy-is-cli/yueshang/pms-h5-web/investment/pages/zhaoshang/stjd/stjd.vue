<template>
<view class="container">
  <app-header>
    <app-project-selector @selected="onProjectSelected" v-if='showSelector'>
    </app-project-selector>
    <view slot="right">
      <app-date-picker :fromDate="params.queryDate" fields="month" @changed="onDateChanged"></app-date-picker>
    </view>
  </app-header>
  <app-section>
    <view slot="head-title">
      <view class="selector">
        <app-catalogue title="进场审图进度-品牌数"></app-catalogue>
      </view>
    </view>
    <view class="registered-channels">
      <app-echarts :options="options"></app-echarts>
    </view>
  </app-section>
</view>
</template>

<script>
// pages/zhaoshang/stjd/stjd.js
const app = getApp();
import regeneratorRuntime from '../../../utils/runtime';
import appHeader from "../../../components/common/header";
import appProjectSelector from "../../../components/selector/project";
import appDatePicker from "../../../components/selector/datepicker";
import appSection from "../../../components/container/section";
import appCatalogue from "../../../components/catalogue/index";
import appEcharts from "../../../components/echarts/echarts";

export default {
  data() {
    return {
		showSelector:true,
      params: {
        queryDate: app.globalData.getDefaultDate('month'),
        projectId: ''
      },
	  options:{}
    };
  },

  components: {
    appHeader,
    appProjectSelector,
    appDatePicker,
    appSection,
    appCatalogue,
    appEcharts
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList();
  },
  onShow(){
  	this.setData({
  		showSelector:true
  	})
  },
  onHide(){
  	this.setData({
  		showSelector:false
  	})
  },
  methods: {
    // 项目选择
    onProjectSelected(e) {
      let bisProjectId = e.detail.value.bisProjectId;
      this.setData({
        ['params.projectId']: bisProjectId
      });
      this.getDataList();
    },

    async getDataList() {
      let res = await app.globalData.request.options({
        loading: true
      }).get('/api/v1/report/bis/tobeopens/projects/merchantsteps/bigs/jcstlist', this.params);
      let chartData = res.data.list;
      console.log(chartData);
      let titleData = [],
          //底部文字
      jcRateData = [],
          //进场数据
      stRateData = [],
          //审图数据
      jcAverage = '',
          stAverage = '';
      chartData.forEach(item => {
        titleData.push(item.primaryForms);
        jcRateData.push(item.jcRate);
        stRateData.push(item.stRate);

        if (item.primaryForms === '平均') {
          jcAverage = item.jcRate;
          stAverage = item.stRate;
        }
      }); // console.log(chartData);
      // console.log(jcRateData, stRateData);

      const setData = {
        'options': {
          color: ['#4EABD3', '#32B667'],
          legend: {
            selectedMode: true,
            data: ['进场', '审图'],
            padding: [30, 0, 0, 0],
            itemHeight: 12
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '4%',
            top: '10%',
            containLabel: true
          },
          dataZoom: [{
            type: 'inside',
            start: 1,
            end: 30
          }],
          tooltip: {
            show: false
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: titleData,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: '12',
                color: '#333F4F'
              },
              interval: 0,
              rotate: '45'
            },
            splitLine: {
              show: false
            }
          },
          yAxis: [{
            type: 'value',
            max: 100,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value}%'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              //y轴刻度线
              show: false
            }
          }],
          series: [{
            type: 'bar',
            name: '进场',
            data: jcRateData,
            barWidth: 10,
            //设置柱状图大小
            markLine: {
              symbol: 'none',
              data: [{
                type: 'average',
                name: '平均值',
                yAxis: jcAverage
              }],
              lineStyle: {
                color: '#55C6FF'
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.name !== '平均') {
                    return '#4EABD3';
                  } else {
                    return '#4CCCDA';
                  }
                },
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 9,

                  formatter(value) {
                    return value.data + '%';
                  }

                }
              }
            }
          }, {
            type: 'bar',
            name: '审图',
            data: stRateData,
            //设置柱状图大小
            barWidth: 10,
            barGap: '140%',
            markLine: {
              symbol: 'none',
              data: [{
                type: 'average',
                name: '平均值',
                yAxis: stAverage
              }],
              lineStyle: {
                color: '#78D232'
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.name !== '平均') {
                    return '#32B667';
                  } else {
                    return '#48BD19';
                  }
                },
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 9,

                  formatter(value) {
                    return value.data + '%';
                  }

                }
              }
            }
          }]
        }
      };
      this.setData(setData);
    },

    onDateChanged(e) {
      this.setData({
        ['params.realCompletedYm']: e.detail.value
      });
      this.getDataList();
    },

    onProjectSelected(e) {
      this.setData({
        ['params.projectId']: e.detail ? e.detail.bisProjectId : ''
      });
      this.getDataList();
    }

  }
};
</script>
