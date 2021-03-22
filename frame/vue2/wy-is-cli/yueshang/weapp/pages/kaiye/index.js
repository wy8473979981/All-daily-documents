const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
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
    columns: [
      {
        label: "序号",
        width: "100rpx",
      },
      {
        label: "项目",
        key: "shortName",
        color: '#399CFF',
        width: "200rpx",
      },
      {
        label: "面积(㎡)",
        key: "allSquare",
        sortable: true,
        align: "right"
      },
      {
        label: "开业率",
        key: "openRate",
        width: "200rpx",
        sortable: true,
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
    this.getNowDate()
    this.loadData();
    this.getStoreType();
    // this.getplanList()
  },
  getNowDate() {
    let date = new Date();
    let queryBeginDate = (date.getFullYear() - 1) + '-' + (date.getMonth() + 1);
    let queryEndDate = date.getFullYear() + '-' + (date.getMonth() + 1);
    this.setData({
      ["params.queryBeginDate"]: queryBeginDate,
      ["params.queryEndDate"]: queryEndDate
    })
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
      .get('/open/bis-open-report!kyTotal.action', this.data.params);

    let year = this.getYear(this.data.params.queryEndDate);
    let prevYear = this.getYear(this.data.params.queryBeginDate);
    year = year.substring(year.length - 2);
    prevYear = prevYear.substring(prevYear.length - 2);
    const setdata = {
      'page.charts.main.options': {
        legend: {
          data: [year + "年度", prevYear + "年度"],
          icon: 'circle',
          itemHeight: 7
        },
        unit: '%',
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
          name: year + "年度",
          data: JSON.parse(res.initChar.openRateChar).map(num => num),
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
          data: JSON.parse(res.initChar.openPrevRateChar).map(num => num),
        },
        ]
      }
    };
    this.setData(setdata);
    if (res.list.length) {
      this.setData({
        dataList: res.list.slice(0, -1).map((item, index) => {
          return {
            ...item,
            ranking: index + 1
          };
        }),
        totalRow: res.list.slice(-1)[0],
      })
    } else {
      this.setData({
        dataList: [],
        totalRow: null
      })
    }
  },
  //选择筛选日期
  onDateChanged(e) {
    let from = e.detail.value;
    this.setData({
      ["params.queryBeginDate"]: (this.getYear(from) - 1) + '-' + from.split('-')[1],
      ["params.queryEndDate"]: from
    })
    this.loadData()
  },
  // 点击行查看详情跳转
  clickRow(e) {
    let bisProjectId = e.detail.row.bisProjectId;
    let projectName = e.detail.row.shortName;
    wx.navigateTo({
      url: `./details/details?bisProjectId=${bisProjectId}&projectName=${projectName}&queryBeginDate=${this.data.params.queryBeginDate}&queryEndDate=${this.data.params.queryEndDate}`,
    });
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
  // 获取区域枚举
  async getplanList() {
    let res = await app.request.options({
      loading: true
    }).get("/open/bis-open-report!zsPlanListPage.action", this.data.params);
    let groups = this.data.groups;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].label == '项目区域' || groups[i].label == '省份') {
        groups.splice(i, 1)
        i--
      }
    }
    let area = res.data.operateAreaList.map((item) => {
      return {
        label: item.operateArea,
        value: "operateArea-" + item.index,
      };
    });
    let provice = res.data.proviceList.map((item) => {
      return {
        label: item.province,
        value: "provinceCd-" + item.index,
      };
    });
    area.unshift({
      label: "全部",
      value: "operateArea-" + '',
    })
    provice.unshift({
      label: "全部",
      value: "provinceCd-" + '',
    })
    let area_group = {
      label: "项目区域",
      items: area,
      maxnum: 1,
    };
    let provice_group = {
      label: "省份",
      items: provice,
      maxnum: 1,
    };
    groups.push(area_group, provice_group);
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
      url: "../zhaoshang/index",
    });
  },
})