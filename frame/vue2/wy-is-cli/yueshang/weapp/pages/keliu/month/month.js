// pages/shuju/keliu/paiming.js

const app = getApp();

const monthColumns = [
  {
    label: '月份',
    key: 'month',
    width: "140"
  },
  {
    label: '工作日',
    key: 'gzr',
    sortable: true,
    width: '140',
    align: 'right'
  },
  {
    label: '节假日',
    key: 'jjr',
    sortable: true,
    width: '140',
    align: 'right'
  },
  {
    label: "渗透率",
    key: "stl",
    sortable: true,
    width: "140",
    align: 'right'
  },
  {
    label: "客流",
    key: "kl",
    sortable: true,
    width: "140",
    align: 'right'
  },
  {
    label: '同比',
    unit: '%',
    key: "tb",
    width: "130",
    align: 'right'
  },
  {
    label: "达成率",
    key: "dcl",
    width: "130",
    align: 'right'
  }
]

const yearColumns = [
  {
    label: "月份",
    key: "month",
    width: "140"
  },
  {
    label: "客流",
    key: "kl",
    sortable: true,
    width: "140",
    align: 'right'
  },
  {
    label: "同比",
    unit: '%',
    key: "tb",
    width: "130",
    align: 'right'
  },
  {
    label: "达成率",
    key: "dcl",
    width: "130",
    align: 'right'
  }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryModel: {
      bisProjectId : null,
      yearAndMonth: null
    },
    updateTime: null,
    collapseable: true,
    lineops: {
      decimals: 'paiming',
      unit: '%',
      // textStyle: {
      //   color: '#959595',
      //   fontSize: 10
      // },
      // legend: {
      //   icon: 'circle',
      //   right: 10
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // axisTick: {
        //   //x轴刻度线
        //   show: false,
        // },
        // axisLine: {
        //   //x轴
        //   show: false,
        // },
        // splitLine: {
        //   show: true,
        //   lineStyle: {
        //     color: '#C9CCDA',
        //     type: 'dashed'
        //   }
        // },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
        // splitLine: {
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
        // data: [0, 0.2, 0.4, 0.6, 0.8, 1]
      },
      series: [{
        type: 'line',
        lineStyle: {
          color: '#3AABFF'
        },
        areaStyle: {
          color: new app.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "#CFDFFE",
          },
          {
            offset: 1,
            color: "#FFFFFF",
          }]),
        }
      },
      {
        type: 'line',
        lineStyle: {
          color: '#9BB3C6'
        }
      }],
      // tooltip: {
      //   show: true,
      //   trigger: "axis",
      //   backgroundColor: "rgba(255,255,255,.7)",
      //   borderColor: '#1890FF',
      //   borderWidth: 1,
      //   textStyle: {
      //     color: "#333",
      //   },
      //   formatter: function (params, ticket, callback) {
      //     let tips  = ''
      //     params.forEach(item => {
      //       tips += item.seriesName + "：" + item.value + '\n'
      //     })
      //     tips += '同比：' + (Number(params[0].value) - Number(params[1].value)).toFixed(2) + '%'
      //     return tips
      //   }
      // }  
    },
		table: {
      mode: 'month',
      columns: monthColumns,
      dataList: []
    },
    monthData: [],
    yearData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // const date = new Date()
    this.setData({
      // updateTime: (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()),
      selectedProj: {
        label: options.projectName,
        value: options.bisProjectId
      },
      'queryModel.bisProjectId': options.bisProjectId,
      'queryModel.yearAndMonth': options.yearAndMonth
    })
    this.queryData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  onProjectSelected(e) {
    // console.log(e)
    if (e.detail.label !== '全部') {
      this.setData({
        'queryModel.bisProjectId': e.detail.value.bisProjectId
      })
      this.queryData()
    }
  },

  onDateChanged(e) {
    console.log(e)
    this.setData({
      'queryModel.yearAndMonth': e.detail.value
    })
    this.queryData()
  },

  onListModeChanged(e) {
    const mode = e.target.dataset.value;
    if (this.data.table.mode !== mode) {
      this.setData({
        'table.mode': mode, 
        'table.columns': mode === 'month' ? monthColumns : yearColumns,
        'table.dataList': mode === 'month' ? this.data.monthData : this.data.yearData
      })
    }
  },

  // clickRow(e) {
  //   console.log(e)
  //   app.page.go('../jiankong/jiankong', { 
  //     bisProjectId: this.data.queryModel.bisProjectId, 
  //     quickDate: e.detail.id
  //   }) 
  // },

  gotoJiankong() {
    app.page.go('../jiankong/jiankong', { 
      bisProjectId: this.data.queryModel.bisProjectId
    })
  },

  queryData() {
    app.request.options({ loading: true })
    .get('/open/bis-open-report!pfOfMon.action', this.data.queryModel)
    .then(res => {
      const data = res.data
      const date = JSON.parse(data.date)
      const preDate = JSON.parse(data.preDate)
      const legendData = [date[0].substring(2, 4) + '年度', preDate[0].substring(2,4) + '年度']
      let stlchart = JSON.parse(data.stlchart).reverse()
      const len = 12 - stlchart.length
      if (len && len > 0) {
        for (let i = 0; i < len; i++) {
          stlchart.push(null)
        }
      }

      // console.log(stlchart)
    
      // 数据
      const pf = data.pf
      // 月数据
      let mData = []
      // 年数据
      let yData = []
      for (let i = 0,len = pf.length; i < len; i++) {
        const arr = pf[i]
        mData.push({
          month: arr[16],
          gzr: arr[10],
          jjr: arr[11],
          stl: arr[12],
          kl: arr[4],
          tb: arr[6],
          dcl: arr[8],
        })
        yData.push({
          month: arr[16],
          kl: arr[5],
          tb: arr[7],
          dcl: arr[9]
        })
      }

      this.setData({
        'lineops.legend.data': legendData,
        'lineops.series[0].name': legendData[0],
        'lineops.series[0].data': stlchart,
        'lineops.series[1].name': legendData[1],
        'lineops.series[1].data': JSON.parse(data.preStlchart),
        monthData: mData,
        yearData: yData,
        'table.dataList': mData
      })
    })
  }

})