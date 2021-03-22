<template>
<view class="root">
	<app-header>
    <app-project-selector @selected="onProjectSelected" :selected="selected" disabled-all></app-project-selector>
    <view class v-if="params.queryProjectId">
    </view>
    <view slot="right">
      <app-picker @changed="onDateChanged" range fields="day" from :fromDate="params.queryStartTime" to :toDate="params.queryEndTime"></app-picker>
    </view>
</app-header>

  <!-- <view class="updata-time">数据更新时间：2020-11-10 数据来源系统：PMS系统</view> -->

  <app-section :title="global">
    <view class="global-content">
      <view v-for="(item, index) in globalData" :key="index" class="global-title-content">
        <view class="global-title">
          {{item.title}}
        </view>
        <view class="global-value-content">
          <view class="global-value">
            {{item.value || '-'}}
          </view>
          <view class="global-unit">
            {{item.unit}}
          </view>
        </view>
      </view>
    </view>
  </app-section>

  <view>
    <scroll-view class="top-scroll" scroll-x scroll-with-animation>
      <view class="top-list">
        <view v-for="(item, index) in registeredTitles" :key="index" :id="'registeredTitles' + index" :class="'list-item ' + (currentRegisteredIndex==index?'list-item--selected':'')" @tap="registered" :data-index="index">
          {{item.name}}
        </view>
      </view>
    </scroll-view>
    <view class="registered-channels">
      <app-echarts class="pie" :options="registeredChannels" height="400rpx" canvasId="hy1" margin='20px'></app-echarts>
    </view>
  </view>
  <view class="line-bg"></view>

  <view>
    <scroll-view class="top-scroll" scroll-x scroll-with-animation>
      <view class="top-list">
        <view v-for="(item, index) in membersTitles" :key="index" :id="'membersTitles' + index" :class="'list-item ' + (currentMembersIndex==index?'list-item--selected':'')" @tap="membersTap" :data-index="index">
          {{item.name}}
        </view>
      </view>
    </scroll-view>
    <view class="registered-channels">
      <app-echarts class="pie" :options="members" height="400rpx" canvasId="hy2"></app-echarts>
    </view>
  </view>
  <view class="line-bg"></view>

  <app-section title="会员年龄分布">
    <view class="members-bar">
      <app-echarts class="bar" :options="membersBar" height="400rpx" canvasId="hy3"></app-echarts>
    </view>
  </app-section>
  <view>
    <scroll-view class="top-scroll" scroll-x scroll-with-animation>
      <view class="top-list">
        <view v-for="(item, index) in integralOutputTitles" :key="index" :id="'integralOutputTitles' + index" :class="'list-item ' + (currentIntegralOutputIndex==index?'list-item--selected':'')" @tap="integralOutputTap" :data-index="index">
          {{item.name}}
        </view>
      </view>
    </scroll-view>
    <view class="integral-output">
      <app-echarts class="pie" :options="integralOutput" height="400rpx" canvasId="hy4"></app-echarts>
    </view>
  </view>

  <view class="line-bg"></view>
  <app-section title="消费业态分布">
    <view class="consumption-mod">
      <app-echarts class="bar" :options="consumptionMod" height="400rpx" canvasId="hy5"></app-echarts>
    </view>
  </app-section>
</view>
</template>

<script>
import * as echarts from '@/packages/ec-canvas/echarts';
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
import appEcharts from "@/components/echarts/echarts";
import appSection from "@/components/container/section";
import appHeader from "@/components/common/header";
import appProjectSelector from "@/components/selector/project";
import appPicker from "@/components/selector/datepicker";

export default {
  data() {
    return {
      global: '整体概况',
      globalData: [],
      currentRegisteredIndex: 0,
      registeredTitles: [{
        name: '注册渠道占比'
      }, {
        name: '会员性别占比'
      }, {
        name: '会员等级占比'
      }],
      currentRegisteredIndex: 0,
      membersTitles: [{
        name: '新增会员占累计会员'
      }, {
        name: '活跃会员占累计会员'
      }, {
        name: '消费会员占累计会员'
      }],
      currentMembersIndex: 0,
      integralOutputTitles: [{
        name: '积分产出占比'
      }, {
        name: '消费积分产出业态'
      }, {
        name: '积分消耗占比'
      }],
      currentIntegralOutputIndex: 0,
      consumeMemberRatio: 28.2,
      //消费会员占累计会员
      activeMemberRatio: 23,
      //活跃会员占累计会员
      newMemberRatio: 84,
      //新增会员占累计会员
      registeredChannels: {
        //注册渠道
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: "rgba(255,255,255,.7)",
          textStyle: {
            color: "#000000"
          },
          formatter: '{b}: {c} ({d}%)'
        },
        yAxis: {
          axisLine: {
            //y轴
            show: false
          }
        },
        grid: {
          top: 0,
          // left: 10,
          // right: 10,
          bottom: 0,
          containLabel: true
        },
        legend: {
          orient: 'horizontal',
          x: 'right',
          //可设定图例在左、右、居中
          y: 'bottom',
          //可设定图例在上、下、居中
          icon: 'circle',
          itemHeight: 7 // data: ['微信', '支付宝']

        },
        // tooltip: {
        //   show: false,
        // },
        series: [{
          // name: '访问来源',
          type: 'pie',
          radius: ['70%', '80%'],
          avoidLabelOverlap: false,
          // hoverAnimation: false,
          // legendHoverLink: false,
          top: 20,
          bottom: 20,
          label: {
            show: true,
            position: 'center',
            color: '#949596',
            fontSize: 10,
            formatter: '{a}'
          },
          markArea: {
            silent: false
          },
          // emphasis: {
          //   show:false,
          //   label: {
          //     show: false,
          //     fontSize: '12',
          //     formatter: '{b}\n\n{d}%'
          //   }
          // },
          labelLine: {
            show: false
          } // data: [
          //   { value: 310, name: '微信', itemStyle: { normal: { color: '#38BE73' } } },
          //   { value: 335, name: '支付宝', itemStyle: { normal: { color: '#338CF0' } } },
          // ]

        }]
      },
      tooltip: {
        show: true,
        trigger: 'item',
        backgroundColor: "rgba(255,255,255,.7)",
        textStyle: {
          color: "#000000"
        },
        formatter: '{b}: {c} ({d}%)'
      },
      yAxis: {
        axisLine: {
          show: false
        }
      },
      grid: {
        top: 0,
        bottom: 0,
        containLabel: true
      },
      legend: {
        orient: 'horizontal',
        x: 'right',
        y: 'bottom',
        icon: 'circle',
        itemHeight: 7
      },
      label: {
        show: true,
        position: 'center',
        color: '#949596',
        fontSize: 10,
        formatter: '{a}'
      },
      markArea: {
        silent: false
      },
      labelLine: {
        show: false
      },
      members: {
        //新增会员占比
        yAxis: {
          axisLine: {
            //y轴
            show: false
          }
        },
        grid: {
          top: 0,
          // left: 10,
          // right: 10,
          bottom: 0,
          containLabel: true
        },
        legend: {
          show: false
        },
        tooltip: {
          //是否显示提示框组件，包括提示框浮层和 axisPointe
          show: false,
          // 触发类型: item:数据项触发，axis：坐标轴触发
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [{
          // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
          name: '任务进度',
          type: 'pie',
          // 饼图的半径，数组的第一项是内半径，第二项是外半径
          radius: ['70%', '80%'],
          // 是否启用防止标签重叠策略，默认开启
          avoidLabelOverlap: false,
          hoverAnimation: false,
          // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            // value: 80,
            name: '新增会员',
            itemStyle: {
              normal: {
                color: '#1CC2FF'
              }
            },
            // color: '#1CC2FF',
            selected: false,
            label: {
              normal: {
                // 是显示标签
                show: true,
                position: 'center',
                fontSize: 12,
                color: '#333333',
                formatter: '{b}\n\n{d}%'
              }
            }
          }, {
            // value: 20,
            selected: false,
            itemStyle: {
              normal: {
                color: '#EAEAEA'
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          }]
        }]
      },
      yAxis: {
        axisLine: {
          show: false
        }
      },
      grid: {
        top: 0,
        bottom: 0,
        containLabel: true
      },
      legend: {
        show: false
      },
      tooltip: {
        show: false,
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
        name: '新增会员',
        itemStyle: {
          normal: {
            color: '#1CC2FF'
          }
        },
        selected: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            fontSize: 12,
            color: '#333333',
            formatter: '{b}\n\n{d}%'
          }
        }
      }, {
        selected: false,
        itemStyle: {
          normal: {
            color: '#EAEAEA'
          }
        },
        label: {
          normal: {
            show: false
          }
        }
      }],
      membersBar: {
        //会员年龄分布柱状图
        grid: {
          top: 10,
          // left: 10,
          // right: 10,
          bottom: 10,
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,.7)",
          textStyle: {
            color: "#000000"
          }
        },
        xAxis: {
          type: 'value',
          boundaryGap: true,
          // data: [0, 0.5, 1, 1.5, 2, 5],
          // "axisTick": {       //刻度线
          //   "show": false
          // },
          "splitLine": {
            //网格线
            "show": false
          },
          "axisLine": {
            //y轴
            "show": false
          }
        },
        yAxis: {
          type: 'category',
          boundaryGap: true,
          "splitLine": {
            //网格线
            "show": false
          },
          "axisLine": {
            //y轴
            "show": false
          }
        },
        series: [{
          barMaxWidth: 10,
          type: 'bar'
        }]
      },
      grid: {
        top: 10,
        bottom: 10,
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "rgba(255,255,255,.7)",
        textStyle: {
          color: "#000000"
        }
      },
      xAxis: {
        type: 'value',
        boundaryGap: true,
        "splitLine": {
          "show": false
        },
        "axisLine": {
          "show": false
        }
      },
      yAxis: {
        type: 'category',
        boundaryGap: true,
        "splitLine": {
          "show": false
        },
        "axisLine": {
          "show": false
        }
      },
      integralOutput: {
        // 积分产出占比
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: "rgba(255,255,255,.7)",
          textStyle: {
            color: "#000000"
          },
          formatter: '{b}: {c} ({d}%)'
        },
        yAxis: {
          axisLine: {
            //y轴
            show: false
          }
        },
        grid: {
          // left: 10,
          // right: 10,
          bottom: 0,
          containLabel: true
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          //可设定图例在左、右、居中
          y: 'bottom',
          //可设定图例在上、下、居中
          icon: 'circle',
          itemHeight: 7 // data: ['消费积分', '权益赠送', '转卡积分', '游戏奖励', '问券奖励']

        },
        series: [{
          type: 'pie',
          radius: ['70%', '80%'],
          avoidLabelOverlap: false,
          // hoverAnimation: false, //是否点击放大
          bottom: 40,
          label: {
            show: true,
            position: 'center',
            color: '#949596',
            fontSize: 10,
            formatter: '{a}'
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: '10',
          //     formatter: "{b}\n{d}%"
          //   }
          // },
          labelLine: {
            show: false
          }
        }]
      },
      tooltip: {
        show: true,
        trigger: 'item',
        backgroundColor: "rgba(255,255,255,.7)",
        textStyle: {
          color: "#000000"
        },
        formatter: '{b}: {c} ({d}%)'
      },
      yAxis: {
        axisLine: {
          show: false
        }
      },
      grid: {
        bottom: 0,
        containLabel: true
      },
      legend: {
        orient: 'horizontal',
        x: 'center',
        y: 'bottom',
        icon: 'circle',
        itemHeight: 7
      },
      label: {
        show: true,
        position: 'center',
        color: '#949596',
        fontSize: 10,
        formatter: '{a}'
      },
      labelLine: {
        show: false
      },
      consumptionMod: {
        //消费业态分布
        barWidth: 15,
        color: '#399BFF',
        tooltip: {
          show: true,
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,.7)",
          textStyle: {
            color: "#000000"
          }
        },
        grid: {
          top: 10,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          "splitLine": {
            //网格线
            "show": false
          },
          axisLine: {
            //x轴
            show: false,
            lineStyle: {
              color: '#C9CCDA'
            }
          } // axisLabel: {
          //   interval: 0,
          // }

        },
        yAxis: {
          type: 'value',
          "splitLine": {
            //网格线
            "show": false
          },
          axisLine: {
            //x轴
            show: false,
            lineStyle: {
              color: '#C9CCDA'
            }
          }
        },
        series: [{
          // data: [2000, 3000, 4000, 5000],
          type: 'bar',
          backgroundStyle: {
            color: '#399BFF' //柱条颜色

          }
        }]
      },
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "rgba(255,255,255,.7)",
        textStyle: {
          color: "#000000"
        }
      },
      grid: {
        top: 10,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        "splitLine": {
          "show": false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#C9CCDA'
          }
        }
      },
      yAxis: {
        type: 'value',
        "splitLine": {
          "show": false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#C9CCDA'
          }
        }
      },
      backgroundStyle: {
        color: '#399BFF'
      },
      params: {
        queryStartTime: "2020/01/01",
        queryEndTime: "2020/12/31" // queryProjectId: ''

      },
      fromDate: '2020/11/01',
      toDate: '2020/11/30',
      dataList: [],
      basicDateList: [],
      registerFrom: [],
      memberLevel: [],
      memberSex: [],
      pointsConsume: [],
      // 积分消耗占比
      // pointsConsumeName:['活动消耗', '游戏消耗', '商城消耗', '积分消耗总数', '停车消耗', '共享设备消耗 '],
      pointsGenerate: [],
      //积分产出占比
      // pointsGenerateName:['转卡积分', '游戏奖励', '积分产出总数', '权益赠送', '消费积分', '问卷奖励'],
      pointsGenerates: [{
        name: '转卡积分',
        key: 'oldPoints'
      }, {
        name: '游戏奖励',
        key: 'gamePoints'
      }, {
        name: '积分产出总数',
        key: 'totalPoints'
      }, {
        name: '权益赠送',
        key: 'powerPoints'
      }, {
        name: '消费积分',
        key: 'consumePoints'
      }, {
        name: '问卷奖励',
        key: 'questionPoints'
      }],
      pointsConsumes: [{
        name: '活动消耗',
        key: 'activePoints'
      }, {
        name: '游戏消耗',
        key: 'gamePoints'
      }, {
        name: '商城消耗',
        key: 'jPoints'
      }, {
        name: '积分消耗总数',
        key: 'totalPoints'
      }, {
        name: '停车消耗',
        key: 'parkingPoints'
      }, {
        name: '共享设备消耗',
        key: 'sharePoints'
      }],
      pointsCategory: [] // 消费积分产出业态
      ,
      projectName: "",
      selected: ""
    };
  },

  components: {
    appEcharts,
    appSection,
    appHeader,
    appProjectSelector,
    appPicker
  },
  props: {},
  onLoad: function (options) {
    let {
      bisProjectId,
      projectName
    } = options;
    let selected = {
      label: projectName,
      value: bisProjectId
    };
    this.setData({
      ["params.queryProjectId"]: options.bisProjectId,
      projectName: options.projectName,
      selected
    });
    let date = new Date();
    this.setData({
      'params.queryStartTime': this.startformatDate(date),
      'params.queryEndTime': this.endformatDate(date)
    });
    this.getData();
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
    async getData() {
      this.getbasicMemberData(); //基础数据

      this.getChannels(); //注册渠道

      this.getHuiYuanPieData(); //累计会员占比

      this.getHuiYuanData();
      this.getJifenCanchu();
      this.getConsumptionModData();
    },

    //消费业态分布
    async getConsumptionModData() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("https://proservice.powerlong.com/pms/statistics/memberStatistics/consumeCategoryDistribution", this.params);
      let name = res.data.map(function (item) {
        return item.name;
      });
      let value = res.data.map(function (item) {
        return item.value;
      });
      let valueArr = [];
      let valueObjec = {};
      valueObjec.data = value;
      valueObjec.type = 'bar';
      valueArr.push(valueObjec);
      this.setData({
        'consumptionMod.xAxis.data': name,
        'consumptionMod.series': valueArr
      });
    },

    //整体概况
    async getbasicMemberData() {
      let titleArr = [{
        title: '消费金额',
        key: 'consumeMoneyNum',
        unit: '万元'
      }, {
        title: '消费笔数',
        key: 'consumeNum',
        unit: '笔'
      }, {
        title: '累计会员数',
        key: 'totalMemberNum',
        unit: '人'
      }, {
        title: '消费会员数',
        key: 'consumeMemberNum',
        unit: '人'
      }, {
        title: '新增会员数',
        key: 'registerMemberNum',
        unit: '人'
      }, {
        title: '活跃会员数',
        key: 'activeMemberNum',
        unit: '人'
      }, {
        title: '客流',
        key: 'flow',
        unit: '人'
      }];
      let res = await app.globalData.request.options({
        loading: true
      }).get("https://proservice.powerlong.com/pms/statistics/memberStatistics/basicMemberData", this.params);
      let arr = [];
      titleArr.forEach((item, index) => {

        let value = 0;

        if (item.unit === '万元') {
          // value = (res.data[item.key] / 1000000).toFixed(2)
          value = res.data[item.key] > 0 ? (res.data[item.key] / 1000000).toFixed(2) : 0; // value = this.numFormat(value)
        } else {
          value = res.data[item.key]; // value = this.numFormat(value)
        }

        arr.push({
          title: item.title,
          value: value,
          unit: item.unit
        }); // }
      });
      this.setData({
        globalData: arr
      });
    },

    numFormat: function (num) {
      // if (num == 'undefined' || num === 'null' || !num || num.length === 0) {
      //   return
      // }
      num.toString().split("."); //分隔小数点

      var arr = num[0] && num[0].split("").reverse() || '';
      var res = [];

      for (let i = 0, len = arr.length; i < len; i++) {
        if (i % 3 === 0 && i !== 0) {
          res.push(",");
        }

        res.push(arr[i]);
      }

      res.reverse();

      if (num[1]) {
        //如果有小数部分的话，添加小数部分
        res = res.join("").concat("." + num[1]);
      } else {
        res = res.join("");
      }

      return res;
    },

    // 获取会员pie
    async getHuiYuanPieData() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("https://proservice.powerlong.com/pms/statistics/memberStatistics/memberFeature", this.params);

      if (res.data.newMemberRatio) {
        this.newMemberRatio = res.data.newMemberRatio;
      } else {
        this.newMemberRatio = 0;
      }

      if (res.data.activeMemberRatio) {
        this.activeMemberRatio = res.data.activeMemberRatio;
      } else {
        this.activeMemberRatio = 0;
      }

      if (res.data.consumeMemberRatio) {
        this.consumeMemberRatio = res.data.consumeMemberRatio;
      } else {
        this.consumeMemberRatio = 0;
      }

      this.setData({
        "members.series[0].data[0].name": "新增会员",
        "members.series[0].data[0].value": this.newMemberRatio,
        "members.series[0].data[1].value": 100 - this.newMemberRatio
      });
    },

    getHuiYuanPieClickData() {
      this.setData({
        "members.series[0].data[0].name": "新增会员",
        "members.series[0].data[0].value": this.newMemberRatio,
        "members.series[0].data[1].value": 100 - this.newMemberRatio
      });
    },

    getHuiYuanPieActiveData() {
      this.setData({
        "members.series[0].data[0].name": "活跃会员",
        "members.series[0].data[0].value": this.activeMemberRatio,
        "members.series[0].data[1].value": 100 - this.activeMemberRatio
      });
    },

    getHuiYuanPieConsumeData() {
      this.setData({
        "members.series[0].data[0].name": "消费会员",
        "members.series[0].data[0].value": this.consumeMemberRatio,
        "members.series[0].data[1].value": 100 - this.consumeMemberRatio
      });
    },

    // 获取会员年龄分布
    async getHuiYuanData() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("https://proservice.powerlong.com/pms/statistics/memberStatistics/memberAge", this.params);
      let name = res.data.map(function (item) {
        return item.name;
      });
      let value = res.data.map(function (item) {
        return item.value;
      });
      let valueArr = [];
      let valueObjec = {};
      valueObjec.data = value;
      valueObjec.type = 'bar';
      valueArr.push(valueObjec);
      this.setData({
        'membersBar.yAxis.data': name,
        'membersBar.series': valueArr
      });
    },

    onProjectSelected(e) {
      this.setData({
        ["params.queryProjectId"]: e.detail.value && e.detail.value.bisProjectId || ''
      });
      this.getData();
      this.setData({
        currentRegisteredIndex: 0,
        currentMembersIndex: 0,
        currentIntegralOutputIndex: 0
      });
    },

    onDateChanged(e) {
      let startTime = e.detail.value.from;
      let endTime = e.detail.value.to;
      if (!startTime) {
        startTime = "2020/11/20";
      } else {
        startTime = startTime.replace(/-/g, '/');
      }

      if (!endTime) {
        endTime = "2020/11/20";
      } else {
        endTime = endTime.replace(/-/g, '/');
      }

      this.setData({
        ["params.queryStartTime"]: startTime,
        ["params.queryEndTime"]: endTime
      }); // this.setData(setData)

      this.getData();
      this.setData({
        currentRegisteredIndex: 0,
        currentMembersIndex: 0,
        currentIntegralOutputIndex: 0
      });
    },

    bindselected(e) {
      e.detail.forEach(item => {
        let temp = item.split("-");
        let key = temp[0];
        let value = temp[1];

        if (key === "storeType") {
          this.setData({
            ["params.storeType"]: value
          });
        }

        if (key === "stage") {
          this.setData({
            "params.stage": value
          });
        }
      }); // this.getDataList();
    },

    //注册占比
    async getChannels() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("https://proservice.powerlong.com/pms/statistics/memberStatistics/memberRatio", this.params);
      this.registerFrom = res.data.registerFrom;
      this.memberLevel = res.data.memberLevel;
      this.memberSex = res.data.memberSex;
      let nameArr = res.data.registerFrom.map(function (item) {
        return item.name;
      });
      let valueArr = res.data.registerFrom.map(function (item) {
        return item.value;
      });
      let data = [];
      valueArr.forEach((one, index) => {
        let item = {};
        item.value = one;
        item.name = nameArr[index];
        data.push(item);
      });
      this.setData({
        "registeredChannels.series[0].name": '注册渠道占比',
        "registeredChannels.legend.data": nameArr,
        "registeredChannels.series[0].data": data
      });
    },

    getChannelsClickData() {
      let nameArr = this.registerFrom.map(function (item) {
        return item.name;
      });
      let valueArr = this.registerFrom.map(function (item) {
        return item.value;
      });
      let data = [];
      valueArr.forEach((one, index) => {
        let item = {};
        item.value = one;
        item.name = nameArr[index];
        data.push(item);
      });
      this.setData({
        "registeredChannels.series[0].name": '注册渠道占比',
        "registeredChannels.legend.data": nameArr,
        "registeredChannels.series[0].data": data
      });
    },

    //会员性别占比
    async getSex() {
      let type = this.memberSex.map(function (item) {
        return item.name;
      });
      let value = this.memberSex.map(function (item) {
        return item.value;
      });
      let itemStyleArr = this.getItemStyle();
      let data = [];
      value.forEach((one, index) => {
        let item = {};
        item.value = one;
        item.name = type[index];
        item.itemStyle = itemStyleArr[index];
        data.push(item);
      });
      this.setData({
        "registeredChannels.series[0].name": '会员性别占比',
        "registeredChannels.legend.data": type,
        "registeredChannels.series[0].data": data
      });
    },

    getItemStyle: function () {
      let jsonstyle1 = '{ "normal": { "color": "#38BE73" } }';
      let jsonstyle2 = '{ "normal": { "color": "#338CF0" } }';
      let jsonstyle3 = '{ "normal": { "color": "#F83200" } }';
      let jsonstyle4 = '{ "normal": { "color": "#56687D" } }';
      let jsonstyle5 = '{ "normal": { "color": "#54567D" } }';
      let jsonstyle6 = '{ "normal": { "color": "#57777D" } }';
      let jsonstyle7 = '{ "normal": { "color": "#FFea00" } }';
      let jsonObject = [];
      jsonObject.push(JSON.parse(jsonstyle1));
      jsonObject.push(JSON.parse(jsonstyle2));
      jsonObject.push(JSON.parse(jsonstyle3));
      jsonObject.push(JSON.parse(jsonstyle4));
      jsonObject.push(JSON.parse(jsonstyle5));
      jsonObject.push(JSON.parse(jsonstyle6));
      jsonObject.push(JSON.parse(jsonstyle7));
      return jsonObject;
    },

    ////会员等级占比
    async getMemberPoints() {
      let type = this.memberLevel.map(function (item) {
        return item.name;
      });
      let value = this.memberLevel.map(function (item) {
        return item.value;
      });
      let itemStyleArr = this.getItemStyle();
      let data = [];
      value.forEach((one, index) => {
        let item = {};
        item.value = one;
        item.name = type[index];
        item.itemStyle = itemStyleArr[index];
        data.push(item);
      });
      this.setData({
        "registeredChannels.series[0].name": '会员等级占比',
        "registeredChannels.legend.data": type,
        "registeredChannels.series[0].data": data
      });
    },

    registered(e) {
      let currentRegisteredIndex = e.currentTarget.dataset.index;
      let currentRegistered = this.registeredTitles[currentRegisteredIndex].name;
      this.setData({
        currentRegisteredIndex: currentRegisteredIndex
      });

      if ('注册渠道占比' == currentRegistered) {
        this.getChannelsClickData();
      } else if ('会员性别占比' == currentRegistered) {
        this.getSex();
      } else {
        this.getMemberPoints();
      }
    },

    membersTap(e) {
      let currentMembersIndex = e.currentTarget.dataset.index;
      let currentMembers = this.membersTitles[currentMembersIndex].name;
      this.setData({
        currentMembersIndex: currentMembersIndex
      });

      if ('新增会员占累计会员' === currentMembers) {
        this.getHuiYuanPieClickData();
      } else if ('活跃会员占累计会员' === currentMembers) {
        this.getHuiYuanPieActiveData();
      } else {
        this.getHuiYuanPieConsumeData();
      }
    },

    integralOutputTap(e) {
      let currentIntegralOutputIndex = e.currentTarget.dataset.index;
      let currentIntegralOutput = this.integralOutputTitles[currentIntegralOutputIndex].name;
      this.setData({
        currentIntegralOutputIndex: currentIntegralOutputIndex
      });

      if ('积分产出占比' === currentIntegralOutput) {
        this.getJifenCanchuClickData();
      } else if ('消费积分产出业态' === currentIntegralOutput) {
        this.getXfJfenCanChuYeTai();
      } else {
        this.getJifenXiaoHaoZhanBi();
      }
    },

    //积分产出占比
    async getJifenCanchu() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("https://proservice.powerlong.com/pms/statistics/memberStatistics/pointsRatio", this.params);
      this.pointsGenerates.forEach((item, index) => {
        // if (res.data.pointsGenerate[0][item.key]) {
        this.pointsGenerate.push({
          name: item.name,
          value: res.data.pointsGenerate[0][item.key]
        }); // }
      });
      this.pointsConsumes.forEach((item, index) => {
        if (res.data.pointsConsume[0][item.key]) {
          this.pointsConsume.push({
            name: item.name,
            value: res.data.pointsConsume[0][item.key]
          });
        }
      });
      this.pointsCategory = res.data.pointsCategory;
      let name = this.pointsGenerate.map(function (item) {
        return item.name;
      });
      let value = this.pointsGenerate.map(function (item) {
        return item.value;
      });
      let itemStyleArr = this.getItemStyle();
      let data = [];
      value.forEach((one, index) => {
        if (one) {
          let item = {};
          item.value = one;
          item.name = name[index];
          item.itemStyle = itemStyleArr[index];
          data.push(item);
        }
      });
      name = data.map(function (item) {
        return item.name;
      });
      this.setData({
        "integralOutput.series[0].name": "积分产出占比",
        "integralOutput.legend.data": name,
        "integralOutput.series[0].data": data
      });
    },

    //积分产出占比
    getJifenCanchuClickData() {
      let name = this.pointsGenerate.map(function (item) {
        return item.name;
      });
      let value = this.pointsGenerate.map(function (item) {
        return item.value;
      });
      let itemStyleArr = this.getItemStyle();
      let data = [];
      value.forEach((one, index) => {
        if (one) {
          let item = {};
          item.value = one;
          item.name = name[index];
          item.itemStyle = itemStyleArr[index];
          data.push(item);
        }
      });
      name = data.map(function (item) {
        return item.name;
      });
      this.setData({
        "integralOutput.series[0].name": "积分产出占比",
        "integralOutput.legend.data": name,
        "integralOutput.series[0].data": data
      });
    },

    //消费积分产出业态
    async getXfJfenCanChuYeTai() {
      let name = Object.keys(this.pointsCategory[0]);
      let value = Object.values(this.pointsCategory[0]);
      let itemStyleArr = this.getItemStyle();
      let data = [];
      value.forEach((one, index) => {
        let item = {};
        item.value = one;
        item.name = name[index];
        item.itemStyle = itemStyleArr[index];
        data.push(item);
      });
      this.setData({
        "integralOutput.series[0].name": "消费积分产出业态",
        "integralOutput.legend.data": name,
        "integralOutput.series[0].data": data
      });
    },

    //积分消耗占比
    async getJifenXiaoHaoZhanBi() {
      let name = this.pointsConsume.map(function (item) {
        return item.name;
      });
      let value = this.pointsConsume.map(function (item) {
        return item.value;
      });
      let itemStyleArr = this.getItemStyle();
      let data = [];
      value.forEach((one, index) => {
        if (one) {
          let item = {};
          item.value = one;
          item.name = name[index];
          item.itemStyle = itemStyleArr[index];
          data.push(item);
        }
      });
      name = data.map(function (item) {
        return item.name;
      });
      this.setData({
        "integralOutput.series[0].name": "积分消耗占比",
        "integralOutput.legend.data": name,
        "integralOutput.series[0].data": data
      });
    },

    endformatDate: function (data) {
		let date = data.getTime() - 3600*24*1000
		date = new Date(date)
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return [year, month, day].map(this.formatNumber).join('/');
    },
    startformatDate: function (date) {
		let endDate = this.endformatDate(date)
		let result  =  endDate.split('/')
		result[2] = '01'
		return result.join('/')
    },
    formatNumber: function (n) {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }
  }
};
</script>
<style>
@import "./huiyuan.css";
</style>