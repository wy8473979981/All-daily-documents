// pages/xiaoshou/month/month.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: {},
    params: {
      bisProjectId: null,
      storeType: "",
      squareFlag: "",
      stage: "",
      operateArea: "",
      provinceCd: "",
      year: ""
    },
    page: {
      table: {
        mode: 'month'
      }
    },
    timeSpan: "0", //当月/年累计
    //默认按月时的表头
    monthColumns: [{
        label: "月份",
        key: "yearMonth"
      },
      {
        label: "平效",
        key: "px",
        unit: "",
        width: "160rpx",
        sortable: true,
        align: 'right'
      },
      {
        label: "租售比",
        key: "zsb",
        unit: "",
        width: "160rpx",
        sortable: true,
        align: 'right'
      },
      {
        label: "销售额(万元)",
        key: "sales",
        width: "200rpx",
        sortable: true,
        align: 'right'
      }
    ],
    //默认按年时的表头
    yearColumns: [{
        label: "月份",
        key: "yearMonth",
      },
      {
        label: "同比",
        key: "mtmTot",
        width: "140rpx",
        align: 'right'
      },
      {
        label: "销售额完成率",
        key: "salesBudgetTot",
        width: "200rpx",
        sortable: true,
        align: 'right'
      },
      {
        label: "销售额(万元)",
        key: "salesTotal",
        width: "200rpx",
        sortable: true,
        align: 'right'
      },
    ],
    columns: [], //最终显示的表头数据
    groups: [],
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      columns: this.data.monthColumns,
      ["params.year"]: this.getYear(options.yearMonth),
      ["params.bisProjectId"]: options.bisProjectId,
      ["selected.label"]: options.projectName,
      ["selected.value"]: options.bisProjectId,
    });
    this.loadData();
    this.getStoreType()
  },
  onProjectSelected(e) {
    let bisProjectId = e.detail.value ? e.detail.value.bisProjectId : ''
    if (bisProjectId) {
      this.setData({
        ["params.bisProjectId"]: bisProjectId
      })
      this.loadData()
    } else {
      wx.showToast({
        icon: 'none',
        title: '不能选择全部',
      })
    }
  },
  //筛选框选择数据
  bindselected(e) {
    let arr = e.detail
    let detais = {}
    arr.map((item, index) => {
      let key = item.split('-')[0]
      let val = item.split('-')[1]
      detais[key] = val
    })
    for (const key in detais) {
      this.setData({
        [`params.${key}`]: detais[key]
      })
    }
    this.loadData()
  },
  //切换 当月/年累计
  changeSpan(e) {
    const span = e.currentTarget.dataset.span;
    this.setData({
      timeSpan: span,
    });
    if (span === "0") {
      this.setData({
        columns: this.data.monthColumns,
      });
    } else {
      this.setData({
        columns: this.data.yearColumns,
      });
    }
  },
  //选择筛选日期
  onDateChanged(e) {
    let from = e.detail.value;
    this.setData({
      ["params.year"]: from,
    })
    this.loadData()
  },
  // 获取搜索物业类型枚举
  async getStoreType() {
    let res = await app.request.options({
      loading: true
    }).get("/open/bis-open-dict!chargeTypeList.action");
    let result = res.data.map((item) => {
      return {
        label: item.name,
        value: "storeType-" + item.code,
      };
    });
    let group = {
      label: "物业类型",
      items: result,
      maxnum: 1,
    };
    let groups = this.data.groups;
    groups.push(group);
    this.setData({
      groups,
    });
  },
  getYear(year) {
    if (year) {
      return year.split('-')[0]
    }
  },
  //按年图表
  async loadData() {
    const {
      data: {
        chartData,
        ...res
      }
    } = await app.request
      .options({
        loading: true
      })
      .get('/open/bis-open-project!salesOfMon.action', this.data.params);

    let year = this.data.params.year;
    let prevYear = String(this.data.params.year - 1);
    year = year.substring(year.length - 2);
    prevYear = prevYear.substring(prevYear.length - 2);
    const setdata = {
      'page.charts.main.options': {
        legend: {
          data: [year + "年度", prevYear + "年度"],
          icon: 'circle',
          itemHeight: 7
        },
        unit: '元/㎡',
        decimals: 'xiaoshoupaiming',
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          splitLine: {
            show: true,
            lineStyle: {
              color: '#C9CCDA',
              type: 'dashed'
            }
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [{
            type: 'line',
            name: year + "年度",
            data: JSON.parse(res.curYearPx).map(num => num),
            areaStyle: {
              color: new app.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "#CFDFFE",
                },
                {
                  offset: 1,
                  color: "#FFFFFF",
                },
              ]),
            },
          },
          {
            type: 'line',
            name: prevYear + "年度",
            data: JSON.parse(res.preYearPx).map(num => num)
          }
        ]
      },
      'page.charts.kind.options': {
        legend: {
          data: ["主力店", "餐饮", "服装", "配套", "儿童"],
          icon: 'circle',
          itemHeight: 7
        },
        color: ['#EA6B00', '#1890FF', "#02DFFF", "#FFCE49", "#1EFBB8"],
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          splitLine: {
            show: true,
            lineStyle: {
              color: '#C9CCDA',
              type: 'dashed'
            }
          },
        },
        yAxis: {
          type: 'value'
        },
        series: [{
            type: 'line',
            name: "主力店",
            data: JSON.parse(res.layoutSalesArr.zld).map(num => num)
          },
          {
            type: 'line',
            name: "餐饮",
            data: JSON.parse(res.layoutSalesArr.cy).map(num => num)
          },
          {
            type: 'line',
            name: "服装",
            data: JSON.parse(res.layoutSalesArr.fz).map(num => num)
          },
          {
            type: 'line',
            name: "配套",
            data: JSON.parse(res.layoutSalesArr.pt).map(num => num)
          },
          {
            type: 'line',
            name: "儿童",
            data: JSON.parse(res.layoutSalesArr.et).map(num => num)
          },
        ]
      }
    };
    this.setData(setdata);
    if (res.curYear.length) {
      this.setData({
        dataList: res.curYear,
      })
    } else {
      this.setData({
        dataList: []
      })
    }
  }
})