// pages/zhaoshang/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: {},
    groups: [], //右上角筛选
    timeSpan: "0", //当月/年累计
    tdType: null, //根据页面传入类型，区分表格字段
    params: {
      //默认选择 商务选项
      layOutCd: "", //业态
      storeType: "", //物业类型
      stage: "",
      operStatus:"",
      bisProjectId:"",
      yearMonth: "",
      operateArea: "", //项目区域
      provinceCd: "" //省份
    },
    //默认按月时的表头
    monthColumns: [
      {
        label: "业务",
        key: "layoutName",
        width: "200rpx",
      },
      {
        label: "面积(㎡)",
        key: "rentSquareHt",
        sortable: true,
        align:"right"
      },
      {
        label: "完成率(%)",
        key: "monthHtRate",
        width: "180rpx",
        sortable: true,
        align:"right"
      },
    ],
    //默认按年时的表头
    yearColumns: [
      {
        label: "业务",
        key: "layoutName",
        width: "180rpx",
      },
      {
        label: "面积(㎡)",
        key: "rentSquareLjHt",
        sortable: true,
        align:"right"
      },
      {
        label: "完成率(%)",
        key: "yearHtRate",
        width: "180rpx",
        sortable: true,
        align:'right'
      },
    ],
    columns: [], //最终显示的表头数据
    dataList: [], //数据列表
    totalRow: null, //合计数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNowDate()
    //默认使用当月的表头数据
    this.setData({
      tdType: options.tdType,
      columns: this.data.monthColumns,
      ["params.bisProjectId"]: options.bisProjectId,
      ["selected.label"]: options.projectName,
      ["selected.value"]: options.bisProjectId,
    });
    this.changList()
    this.getStoreType();
    // this.getlayoutCdList();
    // this.getplanList()
  },
  getNowDate(){
    let date = new Date();
    let yearMonth = date.getFullYear() + '-' + (date.getMonth() + 1);
    this.setData({
      ["params.yearMonth"]:yearMonth
    })
  },
  //选择项目
  onProjectSelected(e) {
    let bisProjectId = e.detail.value ? e.detail.value.bisProjectId : ''
    if (bisProjectId) {
      this.setData({
        ["params.bisProjectId"]: bisProjectId
      })
      this.getDataList()
    } else {
      wx.showToast({
        icon: 'none',
        title: '不能选择全部',
      })
    }
  },
  //日期选择
  onDateChanged(e) {
    this.setData({
      ["params.yearMonth"]: e.detail.value
    })
    this.getDataList()
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
    this.getDataList()
  },
  //更改列表字段
  changList() {
    const span = this.data.timeSpan;
    let type = this.data.tdType
    if (span === "0") {
      if (type == "ht") {
        this.data.monthColumns[2].key = "rentSquareHt"
        this.data.monthColumns[3].key = "monthHtRate"
      }
      if (type == "jc") {
        this.data.monthColumns[2].key = "rentSquareJc"
        this.data.monthColumns[3].key = "monthJcRate"
      }
      if (type == "ky") {
        this.data.monthColumns[2].key = "rentSquareKy"
        this.data.monthColumns[3].key = "monthKyRate"
      }
      this.setData({
        columns: this.data.monthColumns,
      });
    } else {
      if (type == "ht") {
        this.data.yearColumns[2].key = "rentSquareLjHt"
        this.data.yearColumns[3].key = "yearHtRate"
      }
      if (type == "jc") {
        this.data.yearColumns[2].key = "rentSquareLjJc"
        this.data.yearColumns[3].key = "yearJcRate"
      }
      if (type == "ky") {
        this.data.yearColumns[2].key = "rentSquareLjKy"
        this.data.yearColumns[3].key = "yearKyRate"
      }
      this.setData({
        columns: this.data.yearColumns,
      });
    }
    this.getDataList()
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
  // 获取业态枚举
  async getlayoutCdList() {
    let res = await app.request.options({
      loading: true
    }).get("/open/bis-open-dict!layoutCdList.action");
    let result = res.data.map((item) => {
      return {
        label: item.name,
        value: "layOutCd-" + item.code,
      };
    });
    let group = {
      label: "业态",
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
  //获取表格数据
  async getDataList() {
    let res = await app.request
      .options({
        loading: true
      })
      .get("/open/bis-open-report!zsPlanListDetailPage.action", this.data.params);
    if (res.data.length) {
      this.setData({
        dataList: res.data.slice(1, -1).map((item, index) => {
          return {
            ...item,
            ranking: index + 1
          };
        }),
        totalRow: res.data.slice(0)[0],
      });
    } else {
      this.setData({
        dataList: [],
        totalRow: null,
      });
    }
  }
})