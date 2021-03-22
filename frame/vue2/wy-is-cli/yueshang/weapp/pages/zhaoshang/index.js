// pages/zhaoshang/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groups: [], //右上角筛选
    timeSpan: "0", //当月/年累计
    params: {
      //默认选择 商务选项
      layOutCd: "", //业态
      storeType: "1", //物业类型
      stage: "",
      yearMonth: '',
      tdType: "sw",
      operateArea: "", //项目区域
      provinceCd: "" //省份
    },
    //tab 选项卡
    tabList: [{
        label: "商务",
        value: "sw",
      },
      {
        label: "合同",
        value: "ht",
      },
      {
        label: "进场",
        value: "jc"
      },
      {
        label: "开业",
        value: "ky"
      }
    ],
    //默认按月时的表头
    monthColumns: [{
        label: "序号",
        width: "100rpx",
      },
      {
        label: "项目",
        key: "projectName",
        width: "160rpx"
      },
      {
        label: "面积(㎡)",
        key: "rentSquareSw",
        sortable: true,
        align: "right"
      },
      {
        label: "完成率(%)",
        key: "monthSwRate",
        width: "180rpx",
        sortable: true,
        align: "right"
      },
    ],
    //默认按年时的表头
    yearColumns: [{
        label: "序号",
        width: "100rpx",
      },
      {
        label: "项目",
        key: "projectName",
        width: "160rpx"
      },
      {
        label: "面积(㎡)",
        key: "rentSquareLjSw",
        sortable: true,
        align: "right"
      },
      {
        label: "完成率(%)",
        key: "yearSwRate",
        width: "180rpx",
        sortable: true,
        align: "right"
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
    this.getDataList()
    //默认使用当月的表头数据
    this.setData({
      columns: this.data.monthColumns,
    });
    this.getStoreType();
    this.getlayoutCdList();
    // this.getplanList()
  },
  getNowDate() {
    let date = new Date();
    let yearMonth = date.getFullYear() + '-' + (date.getMonth() + 1);
    this.setData({
      ["params.yearMonth"]: yearMonth
    })
  },
  //选择项目
  async onProjectSelected(e) {
    // await this.setData({
    //   ["params.operateArea"]: e.detail.name,
    // });
    // this.getDataList();
  },
  // 切换tab
  async onTabChanged(e) {
    let type = e.detail.value;
    await this.setData({
      ["params.tdType"]: type,
    });
    // 商务状态时不给予选择跳转
    if (type == 'sw') {
      this.data.yearColumns[1].color = '';
      this.data.monthColumns[1].color = '';
    } else {
      this.data.yearColumns[1].color = '#399CFF';
      this.data.monthColumns[1].color = '#399CFF';
    }
    if (type == 'sw') {
      this.data.monthColumns[2].key = "rentSquareSw"
      this.data.monthColumns[3].key = "monthSwRate"
      this.data.yearColumns[2].key = "rentSquareLjSw"
      this.data.yearColumns[3].key = "yearSwRate"
    }
    if (type == "ht") {
      this.data.monthColumns[2].key = "rentSquareHt"
      this.data.monthColumns[3].key = "monthHtRate"
      this.data.yearColumns[2].key = "rentSquareLjHt"
      this.data.yearColumns[3].key = "yearHtRate"
    }
    if (type == "jc") {
      this.data.monthColumns[2].key = "rentSquareJc"
      this.data.monthColumns[3].key = "monthJcRate"
      this.data.yearColumns[2].key = "rentSquareLjJc"
      this.data.yearColumns[3].key = "yearJcRate"
    }
    if (type == "ky") {
      this.data.monthColumns[2].key = "rentSquareKy"
      this.data.monthColumns[3].key = "monthKyRate"
      this.data.yearColumns[2].key = "rentSquareLjKy"
      this.data.yearColumns[3].key = "yearKyRate"
    }
    if (this.data.timeSpan == "0") {
      this.setData({
        columns: this.data.monthColumns,
      });
    } else {
      this.setData({
        columns: this.data.yearColumns,
      });
    }
    // this.getplanList()
    this.getDataList();
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
    console.log(detais);
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
  // 点击行查看详情跳转
  clickRow(e) {
    if (this.data.params.tdType != 'sw') {
      let bisProjectId = e.detail.row.bisProjectId;
      let projectName = e.detail.row.projectName;
      app.page.go('./details/details', {
        bisProjectId: bisProjectId,
        projectName: projectName,
        tdType:this.data.tdType
      })
      // wx.navigateTo({
      //   url: `./details/details?bisProjectId=${bisProjectId}&projectName=${projectName}&tdType=${this.data.tdType}`,
      // });
    }
  },
  //列表排序
  sort(e) {
    let key = e.detail.key;
    let direction = e.detail.direction;
    let dataList = this.data.dataList;
    if (direction === "up") {
      dataList.sort((a, b) => {
        return parseFloat(a[key]) - parseFloat(b[key]);
      });
    } else if (direction === "down") {
      dataList.sort((a, b) => {
        return parseFloat(b[key]) - parseFloat(a[key]);
      });
    }
    this.setData({
      dataList: this.data.dataList.map((item, index) => {
        return {
          ...item,
          ranking: index + 1
        };
      })
    });
  },
  //获取表格数据
  async getDataList() {
    let res = await app.request
      .options({
        loading: true
      })
      .get("/open/bis-open-report!zsPlanListPageItem.action", this.data.params);
    if (res.data.length) {
      this.setData({
        dataList: res.data.slice(0, -1).map((item, index) => {
          return {
            ...item,
            ranking: index + 1
          };
        }),
        totalRow: res.data.slice(-1)[0],
      });
    } else {
      this.setData({
        dataList: [],
        totalRow: null,
      });
    }
  },
})