import {
  projectPageMap
} from '../datasource';
const app = getApp();
const columns = [{
    label: '项目',
    key: 'project',
    width: '200rpx',
    align: 'left'
  },
  {
    label: '物业类型',
    key: 'storeType',
    width: '200rpx',
    align: 'left'
  },
  {
    label: '预计交付日期',
    key: 'deliveryDate',
    width: '200rpx',
    align: 'left'
  },
  {
    label: '建筑面积',
    key: 'area',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '物管费单价',
    key: 'unitPrice',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: '收费率',
    key: 'rate',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
    unit: '%'
  },
  {
    label: '物管费增加',
    key: 'propertyFee',
    width: '200rpx',
    align: 'right',
    numberPrecision: 2,
    numberFormat: true,
  }
];

Page({
  data: {
    query: {
      budgetInstanceSheetId: null,
    },
    page: {
      table: {}
    },
    opened: false,
    projectName: '全部',
    projectId: null
  },

  onLoad: function (options = {}) {
    this.setData({
      'query.budgetInstanceSheetId': options.id,
      'projectName': options.projectName,
      'projectId': options.projectId
    })
    this.loadMenu();
  },

  loadData: async function () {
    const {
      data
    } = await app.request
      .options({
        loading: true
      })
      .post('http://pmstest.powerlong.com/budget/open/tmp/data/deliverystat/query', this.data.query);

    const setdata = {
      'page.table': {
        columns,
        rows: data
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
      'query.budgetInstanceSheetId': (item || {}).id,
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