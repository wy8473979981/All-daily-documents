// pages/shuju/keliu/paiming.js

const app = getApp();

const monthColumns = [
  {
    label: "序号",
    width: "100"
  },
  {
    label: "项目",
    key: "projectName",
    color: '#399CFF',
    width: "160",
    align: 'left'
  },
  {
    label: "渗透率",
    key: "stl",
    sortable: true,
    width: "140",
    align: 'right'
  },
  {
    label: "客流(万人)",
    key: "kl",
    sortable: true,
    width: "180",
    align: 'right'
  },
  {
    label: "同比",
    unit: '%',
    key: "tb",
    width: "140",
    align: 'right'
  },
  {
    label: "达成率",
    unit: '%',
    key: "dcl",
    width: "120",
    align: 'right'
  }
]

const yearColumns = [
  {
    label: "序号",
    width: "100"
  },
  {
    label: "项目",
    key: "projectName",
    color: '#399CFF',
    width: "160",
    align: 'left'
  },
  {
    label: "客流(万人)",
    key: "kl",
    sortable: true,
    width: "180",
    align: 'right'
  },
  {
    label: "同比",
    unit: '%',
    key: "tb",
    width: "140",
    align: 'right'
  },
  {
    label: "达成率",
    unit: '%',
    key: "dcl",
    width: "120",
    align: 'right'
  }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryModel: {
      provinceCd: '',
      yearAndMonth: null,
      attrNew: 7,
      attrNew2: '',
      sortNew: 'desc',
      sortNew2: '',
      operateArea: '',
      stage: ''
    },
    options: [{
      label: '项目阶段',
      maxnum: 1,
      items: [
        {
          label: '全部',
          value: 'stage-'
        },
        {
          label: '筹备期',
          value: 'stage-1'
        },
        {
          label: '培育期',
          value: 'stage-2'
        },
        {
          label: '稳定期',
          value: 'stage-3'
        },
        {
          label: '调改期',
          value: 'stage-4'
        }
      ]
    }],
    updateTime: null,
    collapseable: true,
    lineops: {
      decimals: 'paiming',
      unit: '%',
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#C9CCDA',
            type: 'dashed'
          }
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
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
      }]
    },
    table: {
      mode: 'month',
      columns: monthColumns,
      totalRow: null,
      dataList: []
    },
    mTotalRow: null,
    yTotalRow: null,
    monthData: [],
    yearData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date()
    let month = date.getMonth() + 1
    let yearAndMonth = date.getFullYear()
    if (month > 9) {
      yearAndMonth += '-' + month
    } else {
      yearAndMonth += '-0' + month
    }
    // const project = app.cache.get('project-selector-selected')
    // let provinceCd = ''
    // if (project && project.name !== '全部') {
    //   provinceCd = project.name
    // }
    this.setData({
      // updateTime: yearAndMonth + date.getDate(),
      'queryModel.yearAndMonth': yearAndMonth
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
    console.log(e)
    let provinceCd = ''
    if (e.detail.label !== '全部') {
      provinceCd = e.detail.label
    }
    this.setData({
      'queryModel.provinceCd': provinceCd
    })
    this.queryData()
  },

  onDateChanged(e) {
    // console.log(e)
    this.setData({
      'queryModel.yearAndMonth': e.detail.value
    })
    this.queryData()
  },

  onSelectedChange(e) {
    // console.log(e)
    const detail = e.detail
    if (detail.length === 0) {
      this.setData({
        'queryModel.provinceCd': '',
        'queryModel.operateArea': '',
        'queryModel.storeType': '',
        'queryModel.stage': ''
      })
    } else {
      let kv = {}
      detail.forEach(item => {
        const key = item.split('-')[0]
        const val = item.split('-')[1]
        kv[key] = val
      })
      for (const key in kv) {
        this.setData({
          [`queryModel.${key}`]: kv[key]
        })
      }
    }
    this.queryData()
  },

  onListModeChanged(e) {
    const mode = e.target.dataset.value;
    if (this.data.table.mode !== mode) {
      if (mode === 'month') {
        this.setData({
          'table.mode': mode, 
          'table.columns': monthColumns,
          'table.totalRow': this.data.mTotalRow,
          'table.dataList': this.data.monthData
        })
      } else {
        this.setData({
          'table.mode': mode, 
          'table.columns': yearColumns,
          'table.totalRow': this.data.yTotalRow,
          'table.dataList': this.data.yearData
        })
      }
    }
  },

  onRowColumnClick(e) {
    // console.log(e)
    const year = this.data.queryModel.yearAndMonth.split('-')[0]
    // console.log(year)
    app.page.go('../month/month', { 
      bisProjectId: e.detail.row.id,
      projectName: e.detail.row.projectName,
      yearAndMonth: year
    }) 
  },

  queryData() {
    app.request.options({ loading: true })
    .get('/open/bis-open-report!pfOfMonOrYear.action', this.data.queryModel)
    .then(res => {
      const data = res.data
      const chartData = data.chartData
      const legendData = [chartData.year.substring(2) + '年度', chartData.prevYear.substring(2) + '年度']
      // 表格数据
      const pfMon = data.pfOfMon.pfMon
      // 当月
      let mData = []
       // 年累计
       let yData = []
      for (let i = 0,len = pfMon.length; i < len; i++) {
        const arr = pfMon[i]
        if (i === 0) {
          const mTotalRow = {
            projectName: arr[1],
            stl: arr[8],
            kl: arr[2],
            tb: arr[4],
            dcl: arr[6]
          }
          const yTotalRow = {
            projectName: arr[1],
            kl: arr[3],
            tb: arr[5],
            dcl: arr[7]
          }
          this.setData({
            mTotalRow,
            yTotalRow,
            'table.totalRow': mTotalRow
          })
        } else {
          mData.push({
            id: arr[0],
            projectName: arr[1],
            stl: arr[8],
            kl: arr[2],
            tb: arr[4],
            dcl: arr[6]
          })

          yData.push({
            id: arr[0],
            projectName: arr[1],
            kl: arr[3],
            tb: arr[5],
            dcl: arr[7]
          })
        }
      }

      // // 筛选条件配置
      // let options = this.data.options
      // if (options.length === 1) {
      //   // 项目区域
      //   let areaOptionItem = {
      //     label: '项目区域',
      //     maxnum: 1,
      //     items: [{
      //       label: '全部',
      //       value: 'operateArea-'
      //     }]
      //   }
      //   data.result.operateAreaList.forEach(item => {
      //     areaOptionItem.items.push({
      //       label: item.operateArea,
      //       value: 'operateArea-' + item.index
      //     })
      //   })
      //   options.push(areaOptionItem)

      //   // 省份
      //   let provOptionItem = {
      //     label: '省份',
      //     maxnum: 1,
      //     items: [{
      //       label: '全部',
      //       value: 'provinceCd-'
      //     }]
      //   }
      //   data.result.proviceList.forEach(item => {
      //     provOptionItem.items.push({
      //       label: item.province,
      //       value: 'provinceCd-' + item.index
      //     })
      //   })
      //   options.push(provOptionItem)
      // }

      this.setData({
        // options,
        'lineops.legend.data': legendData,
        'lineops.series[0].name': legendData[0],
        'lineops.series[0].data': chartData.stlArr,
        'lineops.series[1].name': legendData[1],
        'lineops.series[1].data': chartData.stlPrevYearArr,
        monthData: mData,
        yearData: yData,
        'table.dataList': mData
      })
    })
  }

})