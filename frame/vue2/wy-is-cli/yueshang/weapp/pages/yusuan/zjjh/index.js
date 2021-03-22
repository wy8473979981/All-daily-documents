import {
  projectPageMap
} from '../datasource';
const app = getApp();
const columns = [{
    label: '资金方向',
    key: 'subjectLevelOne',
    width: '200rpx',
    align: 'left'
  },
  {
    label: '项目',
    key: 'subjectLevelTwo',
    width: '200rpx',
    align: 'left'
  },
  {
    label: '1月预算数',
    key: 'budgetJan',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '2月预算数',
    key: 'budgetFeb',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '3月预算数',
    key: 'budgetMarch',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '4月预算数',
    key: 'budgetApril',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '5月预算数',
    key: 'budgetMay',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '6月预算数',
    key: 'budgetJune',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '7月预算数',
    key: 'budgetJuly',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '8月预算数',
    key: 'budgetAug',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '9月预算数',
    key: 'budgetSep',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '10月预算数',
    key: 'budgetOct',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '11月预算数',
    key: 'budgetNov',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '12月预算数',
    key: 'budgetDece',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
];

Page({
  data: {
    query: {
      bean: {
        budgetInstanceSheetId: null,
      },
      pageNum: 1,
      pageSize: 1000,
    },
    page: {
      table: {
        columns
      }
    },
    opened: false,
    projectName: '全部',
    projectId: null
  },

  onLoad: function (options = {}) {
    this.setData({
      'query.bean.budgetInstanceSheetId': options.id,
      'projectName': options.projectName,
      'projectId': options.projectId
    })
    this.loadMenu();
  },

  loadData: async function () {
    const {
      data: {
        ...res
      }
    } = await app.request
      .options({
        loading: true
      })
      .post('http://pmstest.powerlong.com/budget/open/capitalPlan/queryPage', this.data.query);

    const setdata = {
      'page.table': {
        columns,
        rows: res.list
      }
    };
    this.setData(setdata);
  },


  loadMenu: async function () {
    const res = await app.request
      .options({
        loading: true
      })
      .post('http://pmstest.powerlong.com/budget/open/getBudgetInstanceSheet', {
        projectId: this.data.projectId
      });
    const menuItems = res.data.map(item => {
      return {
        label: item.name,
        value: item
      };
    })
    const findUrl = `/${this.route}`;
    const budgetSheetId = Object.keys(projectPageMap).find(key => {
      const item = projectPageMap[key];
      return item[1] === findUrl;
    });
    const item = res.data.find(item => {
      return item.budgetSheetId == budgetSheetId
    });

    this.setData({
      'query.bean.budgetInstanceSheetId': (item || {}).id,
      menuItems
    });
    this.loadData();
  },

  onProjectSelected(e) {
    this.setData({
      projectId: e.detail.value.mallId,
      projectName: e.detail.value.shortName
    })
    this.loadMenu();
  },

  openSelector() {
    this.setData({
      'opened': true
    })
  },
  onSelectorClosed() {
    this.setData({
      'opened': false
    })
  }
})