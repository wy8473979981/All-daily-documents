import * as echarts from '../../packages/ec-canvas/echarts';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    global: '整体概况',
    globalData: [],
    currentRegisteredIndex: 0,

    registeredTitles: [{ name: '注册渠道占比' }, { name: '会员性别占比' }, { name: '会员等级占比' }],
    currentRegisteredIndex: 0,

    membersTitles: [{ name: '新增会员占累计会员' }, { name: '活跃会员占累计会员' }, { name: '消费会员占累计会员' }],
    currentMembersIndex: 0,

    integralOutputTitles: [{ name: '积分产出占比' }, { name: '消费积分产出业态' }, { name: '积分消耗占比' }],
    currentIntegralOutputIndex: 0,

    consumeMemberRatio: 28.2, //消费会员占累计会员
    activeMemberRatio: 23, //活跃会员占累计会员
    newMemberRatio: 84,  //新增会员占累计会员


    registeredChannels: {
      yAxis: {
        axisLine: { //y轴
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
        x: 'right',      //可设定图例在左、右、居中
        y: 'bottom',     //可设定图例在上、下、居中
        icon: 'circle',
        itemHeight: 7,
        // data: ['微信', '支付宝']
      },
      tooltip: {
        show: false,
      },


      series: [
        {
          // name: '访问来源',
          type: 'pie',
          radius: ['70%', '80%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          legendHoverLink: false,
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
          },
          // data: [
          //   { value: 310, name: '微信', itemStyle: { normal: { color: '#38BE73' } } },
          //   { value: 335, name: '支付宝', itemStyle: { normal: { color: '#338CF0' } } },
          // ]
        }
      ]
    },
    members: {
      yAxis: {
        axisLine: { //y轴
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
      series: [
        {
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
          data: [
            {
              value: 80,
              name: '新增会员',
              itemStyle: { normal: { color: '#1CC2FF' } },
              // color: '#1CC2FF',
              selected: false,
              label: {
                normal: {
                  // 是显示标签
                  show: true,
                  position: 'center',
                  fontSize: 12,
                  color: '#333333',
                  formatter: '{b}\n\n{d}%',
                }

              },

            },
            {
              value: 20,
              selected: false,
              itemStyle: { normal: { color: '#EAEAEA' } },
              label: {
                normal: {
                  show: false,

                }
              }

            },

          ]
        }
      ]
    },
    membersBar: {
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
          color: "#000000",
        },
      },
      xAxis: {
        type: 'value',
        boundaryGap: true,
        // data: [0, 0.5, 1, 1.5, 2, 5],
        // "axisTick": {       //刻度线
        //   "show": false
        // },
        "splitLine": {     //网格线
          "show": false
        },
        // "axisLine": {       //y轴
        //   "show": false

        // },
      },
      yAxis: {
        type: 'category',
        boundaryGap: true,

        "splitLine": {     //网格线
          "show": false
        }
      },

      series: [{
        barMaxWidth: 10,
        type: 'bar'
      }]
    },

    integralOutput: {
      yAxis: {
        axisLine: { //y轴
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
        x: 'center',      //可设定图例在左、右、居中
        y: 'bottom',     //可设定图例在上、下、居中
        icon: 'circle',
        itemHeight: 7,
        // data: ['消费积分', '权益赠送', '转卡积分', '游戏奖励', '问券奖励']
      },

      series: [
        {
          type: 'pie',
          radius: ['70%', '80%'],
          avoidLabelOverlap: false,
          hoverAnimation: false, //是否点击放大
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
          },
        }
      ]
    },
    consumptionMod: {
      barWidth: 15,
      color: '#399BFF',
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "rgba(255,255,255,.7)",
        textStyle: {
          color: "#000000",
        },
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
        "splitLine": {     //网格线
          "show": false
        },
        // axisLabel: {
        //   interval: 0,
        // }
      },
      yAxis: {
        type: 'value',
        "splitLine": {     //网格线
          "show": false
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
    params: {
      queryStartTime: "2020/01/01",
      queryEndTime: "2020/12/31",
      // queryProjectId: ''
    },
    fromDate: '2020/11/01',
    toDate: '2020/11/30',


    dataList: [],
    basicDateList: [],

    registerFrom: [],
    memberLevel: [],
    memberSex: [],

    pointsConsume: [],// 积分消耗占比
    // pointsConsumeName:['活动消耗', '游戏消耗', '商城消耗', '积分消耗总数', '停车消耗', '共享设备消耗 '],

    pointsGenerate: [],//积分产出占比
    // pointsGenerateName:['转卡积分', '游戏奖励', '积分产出总数', '权益赠送', '消费积分', '问卷奖励'],
    pointsGenerates:
      [
        {
          name: '转卡积分',
          key: 'oldPoints'
        },
        {
          name: '游戏奖励',
          key: 'gamePoints'

        },
        {
          name: '积分产出总数',
          key: 'totalPoints'

        },
        {
          name: '权益赠送',
          key: 'powerPoints'

        },
        {
          name: '消费积分',
          key: 'consumePoints'

        },
        {
          name: '问卷奖励',
          key: 'questionPoints'
        }
      ],

    pointsConsumes:
      [
        {
          name: '活动消耗',
          key: 'activePoints'
        },
        {
          name: '游戏消耗',
          key: 'gamePoints'

        },
        {
          name: '商城消耗',
          key: 'jPoints'

        },
        {
          name: '积分消耗总数',
          key: 'totalPoints'

        },
        {
          name: '停车消耗',
          key: 'parkingPoints'

        },
        {
          name: '共享设备消耗',
          key: 'sharePoints'
        }
      ],

    pointsCategory: [],// 消费积分产出业态


  },
  async getData() {
    this.getbasicMemberData() //基础数据
    this.getChannels() //注册渠道
    this.getHuiYuanPieData() //累计会员占比


    this.getHuiYuanData()

    this.getJifenCanchu()

    this.getConsumptionModData()
  },


  //消费业态分布
  async getConsumptionModData() {
    let res = await app.request
      .options({ loading: true })
      .get("https://proservice.powerlong.com/pms/statistics/memberStatistics/consumeCategoryDistribution", this.data.params);
    console.log("name = " + res.data.name)
    let name = res.data.map(function (item) { return item.name; });
    let value = res.data.map(function (item) { return item.value; });
    let valueArr = []
    let valueObjec = {}
    valueObjec.data = value
    valueObjec.type = 'bar'
    console.log("valueObjec.data = " + valueObjec.data)
    valueArr.push(valueObjec)
    console.log("valueObjec.valueArr = " + valueArr[0].data)
    this.setData({
      'consumptionMod.xAxis.data': name,
      'consumptionMod.series': valueArr
    })
  },

  //整体概况
  async getbasicMemberData() {
    let titleArr =
      [
        {
          title: '消费金额',
          key: 'consumeMoneyNum',
          unit: '万元'
        },
        {
          title: '消费笔数',
          key: 'consumeNum',
          unit: '笔'

        },
        {
          title: '累计会员数',
          key: 'totalMemberNum',
          unit: '人'

        },
        {
          title: '消费会员数',
          key: 'consumeMemberNum',
          unit: '人'

        },
        {
          title: '新增会员数',
          key: 'registerMemberNum',
          unit: '人'

        },
        {
          title: '活跃会员数',
          key: 'activeMemberNum',
          unit: '人'
        },
        {
          title: '客流',
          key: 'flow',
          unit: '人'
        }
      ]

    let res = await app.request
      .options({ loading: true })
      .get("https://proservice.powerlong.com/pms/statistics/memberStatistics/basicMemberData", this.data.params);

    let arr = []
    titleArr.forEach((item, index) => {
      console.log("item.key" + item.key)
      // if(res.data[item.key]){
      let value = 0

      if (item.unit === '万元') {
        // value = (res.data[item.key] / 1000000).toFixed(2)
        value = res.data[item.key] > 0 ? (res.data[item.key] / 1000000).toFixed(2) : 0
        value = this.numFormat(value)
      } else {
        value = res.data[item.key]
        value = this.numFormat(value)
      }
      arr.push({
        title: item.title,
        value: value,
        unit: item.unit
      })
      // }


    })
    this.setData({
      globalData: arr
    })

  },

  numFormat: function (num) {
    if (num == 'undefined' || num === 'null' || !num || num.length === 0) {
      return
    }

    console.log(789)
    num.toString().split(".");   //分隔小数点
    var arr = num[0] && num[0].split("").reverse() || '';
    var res = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      if (i % 3 === 0 && i !== 0) {
        res.push(",");
      }
      res.push(arr[i]);
    }
    res.reverse();
    if (num[1]) { //如果有小数部分的话，添加小数部分
      res = res.join("").concat("." + num[1]);

    } else {
      res = res.join("")

    }

    return res
  },

  // 获取会员pie
  async getHuiYuanPieData() {
    let res = await app.request
      .options({ loading: true })
      .get("https://proservice.powerlong.com/pms/statistics/memberStatistics/memberFeature", this.data.params);

    if (res.data.newMemberRatio) {
      this.data.newMemberRatio = res.data.newMemberRatio
    } else {
      this.data.newMemberRatio = 0
    }
    if (res.data.activeMemberRatio) {
      this.data.activeMemberRatio = res.data.activeMemberRatio
    } else {
      this.data.activeMemberRatio = 0
    }
    if (res.data.consumeMemberRatio) {
      this.data.consumeMemberRatio = res.data.consumeMemberRatio
    } else {
      this.data.consumeMemberRatio = 0
    }

    this.setData({
      "members.series[0].data[0].name": "新增会员",
      "members.series[0].data[0].value": this.data.newMemberRatio,
      "members.series[0].data[1].value": 100 - this.data.newMemberRatio
    })

  },

  getHuiYuanPieClickData() {
    this.setData({
      "members.series[0].data[0].name": "新增会员",
      "members.series[0].data[0].value": this.data.newMemberRatio,
      "members.series[0].data[1].value": 100 - this.data.newMemberRatio
    })
  },
  getHuiYuanPieActiveData() {
    this.setData({
      "members.series[0].data[0].name": "活跃会员",
      "members.series[0].data[0].value": this.data.activeMemberRatio,
      "members.series[0].data[1].value": 100 - this.data.activeMemberRatio
    })
  },
  getHuiYuanPieConsumeData() {
    this.setData({
      "members.series[0].data[0].name": "消费会员",
      "members.series[0].data[0].value": this.data.consumeMemberRatio,
      "members.series[0].data[1].value": 100 - this.data.consumeMemberRatio
    })
  },


  // 获取会员年龄分布
  async getHuiYuanData() {
    let res = await app.request
      .options({ loading: true })
      .get("https://proservice.powerlong.com/pms/statistics/memberStatistics/memberAge", this.data.params);

    let name = res.data.map(function (item) { return item.name; });
    let value = res.data.map(function (item) { return item.value; });
    console.log("getHuiYuanData name = " + name)
    console.log("getHuiYuanData value = " + value)

    let valueArr = []
    let valueObjec = {}
    valueObjec.data = value
    valueObjec.type = 'bar'
    valueArr.push(valueObjec)
    this.setData({
      'membersBar.yAxis.data': name,
      'membersBar.series': valueArr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onProjectSelected(e) {
    console.log("e.detail.value = " + (e.detail.value || {}).bisProjectId)

    this.setData({
      ["params.queryProjectId"]: e.detail.value && e.detail.value.bisProjectId || '',
    });
    this.getData();
    this.setData({
      currentRegisteredIndex: 0,
      currentMembersIndex: 0,
      currentIntegralOutputIndex: 0
    })
  },
  onDateChanged(e) {
    let startTime = e.detail.value.from;
    console.log("startTime = " + startTime);
    let endTime = e.detail.value.to;
    console.log("endTime = " + endTime);
    if (!startTime) {
      startTime = "2020/11/20"
    } else {
      startTime = startTime.replace(/-/g, '/')
      console.log("startTime= " + startTime)
    }
    if (!endTime) {
      endTime = "2020/11/20"
    } else {
      endTime = endTime.replace(/-/g, '/')
    }
    this.setData({
      ["params.queryStartTime"]: startTime,
      ["params.queryEndTime"]: endTime,
    });
    // this.setData(setData)
    this.getData();
    this.setData({
      currentRegisteredIndex: 0,
      currentMembersIndex: 0,
      currentIntegralOutputIndex: 0
    })


  },
  bindselected(e) {
    e.detail.forEach((item) => {
      let temp = item.split("-");
      let key = temp[0];
      let value = temp[1];
      if (key === "storeType") {
        this.setData({
          ["params.storeType"]: value,
        });
      }
      if (key === "stage") {
        this.setData({
          "params.stage": value,
        });
      }
    });
    // this.getDataList();
  },



  //注册占比
  async getChannels() {
    let res = await app.request
      .options({ loading: true })
      .get("https://proservice.powerlong.com/pms/statistics/memberStatistics/memberRatio", this.data.params);
    this.data.registerFrom = res.data.registerFrom
    this.data.memberLevel = res.data.memberLevel
    this.data.memberSex = res.data.memberSex

    let nameArr = res.data.registerFrom.map(function (item) { return item.name; });
    let valueArr = res.data.registerFrom.map(function (item) { return item.value; });
    let data = []
    valueArr.forEach((one, index) => {
      let item = {}
      item.value = one
      item.name = nameArr[index]
      data.push(item)
    })
    this.setData({
      "registeredChannels.series.name": '注册渠道占比',
      "registeredChannels.legend.data": nameArr,
      "registeredChannels.series.data": data
    })
  },
  getChannelsClickData() {
    let nameArr = this.data.registerFrom.map(function (item) { return item.name; });
    let valueArr = this.data.registerFrom.map(function (item) { return item.value; });
    let data = []
    valueArr.forEach((one, index) => {
      let item = {}
      item.value = one
      item.name = nameArr[index]
      data.push(item)
    })
    this.setData({
      "registeredChannels.series.name": '注册渠道占比',
      "registeredChannels.legend.data": nameArr,
      "registeredChannels.series.data": data
    })
  },

  //会员性别占比
  async getSex() {
    let type = this.data.memberSex.map(function (item) { return item.name; });
    let value = this.data.memberSex.map(function (item) { return item.value; });
    let itemStyleArr = this.getItemStyle()
    let data = []
    value.forEach((one, index) => {
      let item = {}
      item.value = one
      item.name = type[index]
      item.itemStyle = itemStyleArr[index]
      data.push(item)
    })

    this.setData({
      "registeredChannels.series.name": '会员性别占比',
      "registeredChannels.legend.data": type,
      "registeredChannels.series.data": data
    })
  },
  getItemStyle: function () {
    let jsonstyle1 = '{ "normal": { "color": "#38BE73" } }'
    let jsonstyle2 = '{ "normal": { "color": "#338CF0" } }'
    let jsonstyle3 = '{ "normal": { "color": "#F83200" } }'
    let jsonstyle4 = '{ "normal": { "color": "#56687D" } }'
    let jsonstyle5 = '{ "normal": { "color": "#54567D" } }'
    let jsonstyle6 = '{ "normal": { "color": "#57777D" } }'
    let jsonstyle7 = '{ "normal": { "color": "#FFea00" } }'
    let jsonObject = []
    jsonObject.push(JSON.parse(jsonstyle1))
    jsonObject.push(JSON.parse(jsonstyle2))
    jsonObject.push(JSON.parse(jsonstyle3))
    jsonObject.push(JSON.parse(jsonstyle4))
    jsonObject.push(JSON.parse(jsonstyle5))
    jsonObject.push(JSON.parse(jsonstyle6))
    jsonObject.push(JSON.parse(jsonstyle7))
    return jsonObject
  },

  ////会员等级占比
  async getMemberPoints() {
    let type = this.data.memberLevel.map(function (item) { return item.name; });
    let value = this.data.memberLevel.map(function (item) { return item.value; });
    let itemStyleArr = this.getItemStyle()
    let data = []
    value.forEach((one, index) => {
      let item = {}
      item.value = one
      item.name = type[index]
      item.itemStyle = itemStyleArr[index]
      data.push(item)
    })

    this.setData({
      "registeredChannels.series.name": '会员等级占比',
      "registeredChannels.legend.data": type,
      "registeredChannels.series.data": data
    })
  },



  registered(e) {
    console.log(e.currentTarget.dataset.index)
    let currentRegisteredIndex = e.currentTarget.dataset.index;
    let currentRegistered = this.data.registeredTitles[currentRegisteredIndex].name;
    this.setData({
      currentRegisteredIndex: currentRegisteredIndex
    })
    if ('注册渠道占比' == currentRegistered) {
      this.getChannelsClickData()
    } else if ('会员性别占比' == currentRegistered) {
      this.getSex()
    } else {
      this.getMemberPoints()
    }

  },


  membersTap(e) {
    let currentMembersIndex = e.currentTarget.dataset.index;
    let currentMembers = this.data.membersTitles[currentMembersIndex].name;
    this.setData({
      currentMembersIndex: currentMembersIndex
    })
    if ('新增会员占累计会员' === currentMembers) {
      this.getHuiYuanPieClickData()
    } else if ('活跃会员占累计会员' === currentMembers) {
      this.getHuiYuanPieActiveData()
    } else {
      this.getHuiYuanPieConsumeData()
    }
  },



  integralOutputTap(e) {
    let currentIntegralOutputIndex = e.currentTarget.dataset.index;
    let currentIntegralOutput = this.data.integralOutputTitles[currentIntegralOutputIndex].name;
    this.setData({
      currentIntegralOutputIndex: currentIntegralOutputIndex
    })
    if ('积分产出占比' === currentIntegralOutput) {
      this.getJifenCanchuClickData()
    } else if ('消费积分产出业态' === currentIntegralOutput) {
      this.getXfJfenCanChuYeTai()
    } else {
      this.getJifenXiaoHaoZhanBi()
    }

  },

  //积分产出占比
  async getJifenCanchu() {
    let res = await app.request
      .options({ loading: true })
      .get("https://proservice.powerlong.com/pms/statistics/memberStatistics/pointsRatio", this.data.params);

    this.data.pointsGenerates.forEach((item, index) => {
      // if (res.data.pointsGenerate[0][item.key]) {
      this.data.pointsGenerate.push({
        name: item.name,
        value: res.data.pointsGenerate[0][item.key]
      })

      // }
    })

    this.data.pointsConsumes.forEach((item, index) => {
      if (res.data.pointsConsume[0][item.key]) {
        this.data.pointsConsume.push({
          name: item.name,
          value: res.data.pointsConsume[0][item.key]
        })

      }
    })
    this.data.pointsCategory = res.data.pointsCategory
    let name = this.data.pointsGenerate.map(function (item) { return item.name; });
    let value = this.data.pointsGenerate.map(function (item) { return item.value; });

    let itemStyleArr = this.getItemStyle()
    let data = []
    value.forEach((one, index) => {
      if (one) {
        let item = {}
        item.value = one
        item.name = name[index]
        item.itemStyle = itemStyleArr[index]
        data.push(item)
      }
    })
    name = data.map(function (item) { return item.name; });

    this.setData({
      "integralOutput.series.name": "积分产出占比",
      "integralOutput.legend.data": name,
      "integralOutput.series.data": data
    })
  },
  //积分产出占比
  getJifenCanchuClickData() {
    let name = this.data.pointsGenerate.map(function (item) { return item.name; });
    let value = this.data.pointsGenerate.map(function (item) { return item.value; });

    let itemStyleArr = this.getItemStyle()
    let data = []
    value.forEach((one, index) => {
      if (one) {
        let item = {}
        item.value = one
        item.name = name[index]
        item.itemStyle = itemStyleArr[index]
        data.push(item)
      }
    })
    name = data.map(function (item) { return item.name; });
    this.setData({
      "integralOutput.series.name": "积分产出占比",
      "integralOutput.legend.data": name,
      "integralOutput.series.data": data
    })
  },

  //消费积分产出业态
  async getXfJfenCanChuYeTai() {
    let name = Object.keys(this.data.pointsCategory[0])
    let value = Object.values(this.data.pointsCategory[0])
    let itemStyleArr = this.getItemStyle()
    let data = []
    value.forEach((one, index) => {
      let item = {}
      item.value = one
      item.name = name[index]
      item.itemStyle = itemStyleArr[index]
      data.push(item)
    })

    this.setData({
      "integralOutput.series.name": "消费积分产出业态",
      "integralOutput.legend.data": name,
      "integralOutput.series.data": data
    })
  },

  //积分消耗占比
  async getJifenXiaoHaoZhanBi() {

    let name = this.data.pointsConsume.map(function (item) { return item.name; });
    let value = this.data.pointsConsume.map(function (item) { return item.value; });

    let itemStyleArr = this.getItemStyle()
    let data = []
    value.forEach((one, index) => {
      if (one) {
        let item = {}
        item.value = one
        item.name = name[index]
        item.itemStyle = itemStyleArr[index]
        data.push(item)
      }
    })
    name = data.map(function (item) { return item.name; });

    this.setData({
      "integralOutput.series.name": "积分消耗占比",
      "integralOutput.legend.data": name,
      "integralOutput.series.data": data
    })
  },
  onLoad: function (options) {
    console.log(options)
    let {bisProjectId, label} = options;
		let selected = {
			label: label,
			value: bisProjectId,
		};
		this.setData({
			["params.queryProjectId"]: options.bisProjectId,
			projectName: options.label,
			selected,
		});

    let date = new Date()
    this.setData({
      'params.queryStartTime': this.startformatDate(date),
      'params.queryEndTime': this.endformatDate(date)
    })

    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  endformatDate: function (date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return [year, month, day].map(this.formatNumber).join('/');
  },
  startformatDate: function (date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = '1'
    return [year, month, day].map(this.formatNumber).join('/');
  },


  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})