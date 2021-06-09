export const CONFIG = {
  columns1: [
    {
      label: "所属事业部",
      key: "businessName",
      color: "#3992BA",
      align: "left",
      width: "190rpx",
    },
    {
      label: "前六个月累计回款(全口径)",
      key: "accuCollection",
      width: "200rpx",
      sortable: false,
      align: "left"
    },
    {
      label: "目标监管比例",
      key: "regulateRatio",
      width: "160rpx",
      sortable: false,
      align: "left"
    },
    {
      label: "监管资金目标余额",
      key: "regulateFundBalance",
      width: "160rpx",
      sortable: false,
      align: "left",
    },
    {
      label: "实际监管资金余额",
      key: "regulateFundBalanceAct",
      width: "160rpx",
      sortable: false,
      align: "left",
    },
    {
      label: "实际监管比例",
      key: "regulateRatioAct",
      width: "160rpx",
      sortable: false,
      align: "left"
    },
    {
      label: "完成率",
      key: "completionRate",
      width: "160rpx",
      sortable: false,
      align: "left"
    }
  ],
  columns2: [
    {
      label: "所属事业部",
      key: "businessName",
      color: "#3992BA",
      align: "left",
      width: "190rpx",
    },
    {
      label: "前六个月累计回款(全口径)",
      key: "accuCollection",
      sortable: false,
      align: "left"
    },
    {
      label: "目标监管比例",
      key: "regulateRatio",
      sortable: false,
      align: "left"
    },
    {
      label: "监管资金目标余额",
      key: "regulateFundBalance",
      sortable: false,
      align: "left",
    },
    {
      label: "实际监管资金余额",
      key: "regulateFundBalanceAct",
      sortable: false,
      align: "left",
    },
    {
      label: "实际监管比例",
      key: "regulateRatioAct",
      sortable: false,
      align: "left"
    },
    {
      label: "完成率",
      key: "completionRate",
      sortable: false,
      align: "left"
    }
  ],
  tableData: [{
    key1: '事业一部',
    key2: '41.86',
    key3: '30%',
    key4: '12.56',
    key5: '9.36',
    key6: '20%',
    key7: '133%',
  }, {
    key1: '事业一部',
    key2: '95.48',
    key3: '33%',
    key4: '31.51',
    key5: '25.31',
    key6: '27%',
    key7: '120%',
  }, {
    key1: '置地',
    key2: '98.36',
    key3: '33%',
    key4: '32.46',
    key5: '29.84',
    key6: '30%',
    key7: '108%',
  }, {
    key1: '浙江事业部',
    key2: '201.2',
    key3: '33%',
    key4: '66.40',
    key5: '68.48',
    key6: '34%',
    key7: '97%',
  }, {
    key1: '广东事业部',
    key2: '28.55',
    key3: '40%',
    key4: '11.42',
    key5: '13.74',
    key6: '48%',
    key7: '80%',
  }, {
    key1: '合计',
    key2: '465.45',
    key3: '33%',
    key4: '154.35',
    key5: '145.73',
    key6: '31%',
    key7: '106%',
  }],
  tabList: [{
    code: "1",
    name: "汇报报表",
  },
  {
    code: "2",
    name: "组合报表",
  },
  {
    code: "3",
    name: "",
  },
  {
    code: "4",
    name: "",
  }],
  selectTabWeekList: [{
    name: '周报',
    hiddenImage: false
  }, {
    name: '',
    hiddenImage: true
  }],
  actionSheets: {
    report: [{
      name: 'xx报表1',
      code: '1',
      color: null
    },
    {
      name: 'xx报表2',
      code: '2',
      color: null
    }],
    weekAndMonth: [{
      name: '周报',
      code: '0',
      color: '#00a1ff'
    },
    {
      name: '月报',
      code: '1',
      color: null
    }],
    monthList: []
  },
};
