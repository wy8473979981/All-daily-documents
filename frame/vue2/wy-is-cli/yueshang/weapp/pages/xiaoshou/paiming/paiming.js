// pages/xiaoshou/paiming/paiming.js

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
    width: '160',
    align: 'left'
  },
  {
    label: "平效",
    key: "px",
    sortable: true,
    width: "140",
    align: 'right'
  },
  {
    label: "租售比",
    key: "zsb",
    // sortable: true,
    width: "140",
    align: 'right'
  },
  {
    label: "销售额(万元)",
    key: "monthSales",
    sortable: true,
    width: '200',
    align: 'right'
  },
  {
    label: "同比",
    key: "mtm",
    width: "130",
    align: 'right'
  },
  {
    label: "环比",
    key: "hb",
    width: "130",
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
    label: "平均月平效",
    key: "avgMonthPx",
    sortable: true,
    width: "200",
    align: 'right'
  },
  {
    label: "销售额(万元)",
    key: "yearSales",
    sortable: true,
    width: "200",
    align: 'right'
  },
  {
    label: "同比",
    key: "yty",
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
      operateArea: '',
      provinceCd: '',
      yearMonth: null,
      storeType: '',
      stage: ''
    },
    options: [{
      label: '物业类型',
      maxnum: 1,
      items: [
        {
          label: '全部',
          value: 'storeType-0'
        },
        {
          label: '购物中心',
          value: 'storeType-1'
        },
        {
          label: '商业街',
          value: 'storeType-2'
        }
      ]
    },{
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
      decimals: 'xiaoshoupaiming',
      unit: '元/㎡',
      xAxis: {
        type: 'category',
        boundaryGap: false,
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
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#FFFFFF' // 0% 处的颜色
            }, {
                offset: 1, color: '#CFDFFE' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
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
    let yearMonth = date.getFullYear()
    if (month > 9) {
      yearMonth += '-' + month
    } else {
      yearMonth += '-0' + month
    }
    // const project = app.cache.get('project-selector-selected')
    // let provinceCd = ''
    // if (project && project.name !== '全部') {
    //   provinceCd = project.name
    // }
    this.setData({
      // updateTime: yearMonth + date.getDate(),
      'queryModel.yearMonth': yearMonth
      // 'queryModel.provinceCd': provinceCd
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
    console.log(e)
    this.setData({
      'queryModel.yearMonth': e.detail.value
    })
    this.queryData()
  },

  onSelectedChange(e) {
    // console.log(e)
    const detail = e.detail
    if (detail.length === 0) {
      this.setData({
        queryModel: {
          provinceCd: '',
          yearMonth: this.data.queryModel.yearMonth,
          storeType: '',
          stage: ''
        }
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
    app.page.go('../month/month', {
      bisProjectId: e.detail.row.bisProjectId,
      projectName: e.detail.row.projectName, 
      yearMonth: this.data.queryModel.yearMonth 
    }) 
  },

  queryData() {
    app.request.options({ loading: true })
    .get('/open/bis-open-project!salesOfMonOrYear.action', this.data.queryModel)
    .then(res => {
      const data = res.data
      const initChar = data.initChar
      const initPrevYearChar = data.initPrevYearChar
      const year = new Date().getFullYear()

      const legendData = [(year+'').substring(2) + '年度'+'', ((year - 1)+'').substring(2) + '年度'+'']
      
      const salesMonth = data.salesMonth
      // 月数据
      let mData = []
      // 年数据
      let yData = []
      for (let i = 0,len = salesMonth.length; i < len; i++) {
        const item = salesMonth[i]
        if (i === 0) { // 合计数据
          // 月合计
          const mTotalRow = {
            projectName: '合计',
            px: item.pxTot,
            zsb: item.zsbTot,
            monthSales: item.monthSalesTot,
            mtm: item.mtmTot,
            hb: item.hbTot
          }
          // 年合计
          const yTotalRow = {
            projectName: '合计',
            avgMonthPx: item.avgMonthPxTot,
            yearSales: item.yearSalesTot,
            yty: item.ytyTot
          }

          this.setData({
            mTotalRow: mTotalRow,
            yTotalRow: yTotalRow,
            'table.totalRow': mTotalRow
          })
        } else {
          // 月数据
          mData.push({
            bisProjectId: item.bisProjectId,
            projectName: item.projectName,
            px: item.px,
            zsb: item.zsb,
            monthSales: item.monthSales,
            mtm: item.mtm,
            hb: item.hb
          })

          // 年数据
          yData.push({
            bisProjectId: item.bisProjectId,
            projectName: item.projectName,
            avgMonthPx: item.avgMonthPx,
            yearSales: item.yearSales,
            yty: item.yty
          })
        }
      }

      // // 筛选条件配置
      // let options = this.data.options
      // if (options.length === 2) {
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
        'lineops.series[0].data': JSON.parse(initChar.pxChart),
        'lineops.series[1].name': legendData[1],
        'lineops.series[1].data': JSON.parse(initPrevYearChar.pxChart),
        monthData: mData,
        yearData: yData,
        'table.dataList': mData
      })
    })
  }

})