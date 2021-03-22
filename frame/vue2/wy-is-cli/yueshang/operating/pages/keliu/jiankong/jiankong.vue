<template>
<view>
<!-- <view class="updata-time">数据更新时间：2020-11-10 数据来源系统：PMS系统</view> -->

<view class="wrapper">
	<app-section title="最近7天客流" :subtitle="workDayAvg ? '（工作日均' + workDayAvg + '/周末日均' + holidayAvg + ')' : ''" :collapseable="collapseable">
		<app-echarts height="400rpx" :options="lineops" canvasId="jiankong1"></app-echarts>
	</app-section>
	<app-section title="同比（单位：万人）">
		<app-echarts height="500rpx" :options="barops" canvasId="jiankong2"></app-echarts>
	</app-section>
</view>

<view class="wrapper" style="margin-top: 12rpx">
	<app-section title="考核指标">
		<!-- <view slot="head-actions">
			<app-filter-dialog checkboxes="{{ colsOptions }}" maxnum="3" bindselected="onSelectedColsOption" tip="筛选指标 （注：最多可选三项）">
				<view class="select-indicator">
					筛选指标
					<image class="select-icon" src="@/assets/images/icon-filter-index.png"/>
				</view>
			</app-filter-dialog>
		</view> -->
		<view class="content">
			<view style="width: 140rpx">
				<view class="left-header">项目</view>
				<view class="left-item">{{ bisProjectShortName }}</view>
				<view class="left-header" style="font-size: 18rpx">商场面积</view>
				<view class="left-item" style="font-size: 18rpx;">{{ area }}</view>
			</view>
			<app-table style="flex: 1;overflow: hidden;" :values="dataList" :columns="columns" :totalRow="totalRow"></app-table>
		</view>
	</app-section>
</view>
</view>
</template>

<script>
// pages/keliu/jiankong/jiankong.js
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
import appSection from "@/components/container/section";
import appEcharts from "@/components/echarts/echarts";
import appTable from "@/components/table/index";

export default {
  data() {
    return {
      queryModel: {
        bisProjectId: null,
        quickDate: null,
        month: null,
        dayNums: 7
      },
      updateTime: null,
      collapseable: true,
      lineops: {
        // textStyle: {
        //   color: '#959595',
        //   fontSize: 10
        // },
        legend: {
          show: false
        },
        xAxis: {
          type: "category",
          // axisTick: {
          //   //x轴刻度线
          //   show: false,
          // },
          // axisLine: {
          //   //x轴
          //   show: false,
          // },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#C9CCDA",
              type: "dashed"
            }
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: false // splitLine: {
          //   show: false,
          // },
          // axisTick: {
          //   //y轴刻度线
          //   show: false,
          // },
          // axisLine: {
          //   //y轴
          //   show: false,
          // },

        },
        series: [{
          name: "客流",
          type: "line",
          lineStyle: {
            color: "#3AABFF"
          },
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#CFDFFE"
            }, {
              offset: 1,
              color: "#FFFFFF"
            }])
          }
        }] // tooltip: {
        //   show: true,
        //   trigger: "axis",
        //   backgroundColor: "rgba(255,255,255,.7)",
        //   borderColor: '#3992BA',
        //   borderWidth: 1,
        //   textStyle: {
        //     color: "#333",
        //   },
        //   formatter: function (params, ticket, callback) {
        //     const item = params[0]
        //     // console.log(item)
        //     return item.axisValue + item.seriesName + "：" + item.value
        //   }
        // }

      },
      legend: {
        show: false
      },
      xAxis: {
        type: "category",
        splitLine: {
          show: true,
          lineStyle: {
            color: "#C9CCDA",
            type: "dashed"
          }
        }
      },
      yAxis: {
        type: "value",
        boundaryGap: false
      },
      lineStyle: {
        color: "#3AABFF"
      },
      areaStyle: {
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#CFDFFE"
        }, {
          offset: 1,
          color: "#FFFFFF"
        }])
      },
      workDayAvg: "",
      holidayAvg: "",
      barops: {
        color: ["#3992BA"],
        // textStyle: {
        //   color: '#959595',
        //   fontSize: 10
        // },
        legend: {
          show: false
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true
          },
          // axisLine: {
          //   lineStyle: {
          //     color: '#C9CCDA',
          //     type: 'dashed'
          //   },
          // },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: false // axisLine: {
          //   lineStyle: {
          //     color: '#C9CCDA',
          //     type: 'dashed'
          //   },
          // },
          // axisTick: {
          //   show: false,
          //   interval: 0
          // },
          // splitLine: {
          //   show: false
          // },

        },
        series: [{
          name: "同比",
          type: "bar",
          barWidth: "30%",
          label: {
            show: true,
            position: "top",
            color: "#333"
          }
        }],
        tooltip: {
          show: true,
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,.7)",
          borderColor: "#3992BA",
          borderWidth: 1,
          textStyle: {
            color: "#333"
          }
        }
      },
      legend: {
        show: false
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        axisTick: {
          alignWithLabel: true
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        boundaryGap: false
      },
      label: {
        show: true,
        position: "top",
        color: "#333"
      },
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "rgba(255,255,255,.7)",
        borderColor: "#3992BA",
        borderWidth: 1,
        textStyle: {
          color: "#333"
        }
      },
      // colsOptions: [
      // ],
      columns: [{
        label: "考核",
        // key: 'index',
        width: "100"
      }, {
        label: "实际客流",
        key: "passengerFlow",
        sortable: true,
        width: "160",
        align: "right"
      }, {
        label: "指标",
        key: "targetNowNum",
        sortable: true,
        width: "160",
        align: "right"
      }, {
        label: "达成率",
        sortable: true,
        key: "targetStr",
        width: "130",
        align: "right"
      }, {
        sortable: true,
        label: "客流密度",
        key: "penetrationStr",
        width: "160",
        align: "right"
      }],
      totalRow: null,
      dataList: [],
      bisProjectShortName: "",
      area: ""
    };
  },

  components: {
    appSection,
    appEcharts,
    appTable
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date();
    const month = date.getMonth() + 1;
    let quickDate = date.getFullYear();

    if (month > 9) {
      quickDate += "-" + month;
    } else {
      quickDate += "-0" + month;
    }

    this.setData({
      // updateTime: quickDate + date.getDate(),
      bisProjectShortName: options.projectName,
      "queryModel.bisProjectId": options.bisProjectId,
      "queryModel.quickDate": quickDate,
      "queryModel.month": month == 1 ? 12 : month - 1
    });
    this.queryData();
  },

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
    onSelectedColsOption(e) {
      console.log(e);
    },

    queryData() {
      app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!ipvaPassengerFlowProject.action", this.queryModel).then(res => {
        const data = res.data;
        const ipvaLinePic = data.ipvaLinePic;
        const ipvaColumnPic = data.ipvaColumnPic.data;
        const xAxisData = [];
        const seriesData = [];
        ipvaColumnPic.forEach(item => {
          const a1 = item[0];
          const y1 = a1[0] + "/" + a1[1];
          xAxisData.push(y1);
          const a2 = item[1];
          seriesData.push(a2 === 0 ? 0 : (a2 / 10000).toFixed(2));
        });
        const sum = data.sums[0];
        const daysDetail = data.daysDetail;
        daysDetail.forEach(item => {
          const passengerFlow = item.passengerFlow;
          item.passengerFlow = passengerFlow.substring(0, passengerFlow.indexOf("-"));
        });
        const length = ipvaLinePic.projectData.data.length;

        if (length > 0) {
          const projectData = ipvaLinePic.projectData.data[0];
          this.setData({
            workDayAvg: projectData.holidayAvg,
            holidayAvg: projectData.holidayAvg,
            bisProjectShortName: projectData.bisProjectShortName
          });
        }

        this.setData({
          area: data.days[0].area,
          "lineops.xAxis.data": ipvaLinePic.lineX.map(item => {
            return item + "日";
          }),
          "lineops.series[0].data": ipvaLinePic.lineY,
          "barops.xAxis.data": xAxisData,
          "barops.series[0].data": seriesData,
          totalRow: {
            passengerFlow: sum.sumNum,
            targetNowNum: sum.targetSum,
            targetStr: sum.sumTargetStr,
            penetrationStr: sum.sumPenetrationStr
          },
          dataList: daysDetail
        });
				console.log(this.barops ,'barops')
      });
    }

  }
};
</script>
<style>
@import "./jiankong.css";
</style>