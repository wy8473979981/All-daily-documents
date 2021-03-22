// pages/kaiye/index.js
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
      queryBeginDate: "",
      queryEndDate: ""
    },
    page: {
      table: {
        mode: 'month'
      }
    },
    columns: [{
        label: "月份",
        key: "monthSkip",
        width: "160rpx",
      },
      {
        label: "开业率",
        key: "openRate",
        width: "160rpx",
        align: "right"
      },
      {
        label: "开业率同比",
        key: "openRateTb",
        width: "200rpx",
        align: "right"
      },
      {
        label: "空铺面积",
        key: "emptyShopArea",
        align: "right"
      }
    ],
    groups: [],
    dataList: [], //数据列表
    totalRow: null, //合计数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ["params.bisProjectId"]: options.bisProjectId,
      ["params.queryBeginDate"]: options.queryBeginDate,
      ["params.queryEndDate"]: options.queryEndDate,
      ["selected.label"]: options.projectName,
      ["selected.value"]: options.bisProjectId,
    })
    this.loadData();
    this.getStoreType();
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
         icon:'none',
         title: '不能选择全部',
       })
    }
  },
  getYear(year) {
    if (year) {
      return year.split('-')[0]
    }
  },
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
      .get('/open/bis-open-report!bisPassengerFlowProject.action', this.data.params);
    let prevYear = this.getYear(this.data.params.queryBeginDate);
    let year = this.getYear(this.data.params.queryEndDate);
    year = year.substring(year.length - 2);
    prevYear = prevYear.substring(prevYear.length - 2);
    const setdata = {
      'page.charts.main.options': {
        legend: {
          data: [year + "年度", prevYear + "年度"],
          icon: 'circle',
          itemHeight: 7
        },
        unit:'%',
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
          // splitLine: {
          //   show: false
          // },
          // axisTick: { //y轴刻度线
          //   show: false
          // },
          // axisLine: { //y轴
          //   show: false
          // },
        },
        series: [{
          type: 'line',
          name: year + "年度",
          data: JSON.parse(res.curYearLayoutArr).map(num => num ),
          areaStyle: {
            color: new app.echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#CFDFFE",
              },
              {
                offset: 1,
                color: "#FFFFFF",
              },
            ]),
          },
        }, {
          type: 'line',
          name: prevYear + "年度",
          data: JSON.parse(res.prevYearLayoutArr).map(num => num )
        }]
      }
    };
    this.setData(setdata);
    this.setData({
      dataList: res.tableList
    })
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
    console.log(detais);
    this.loadData()
  },
  // 跳转
  skip() {
    wx.navigateTo({
      url: "../../zhaoshang/index",
    });
  },
})