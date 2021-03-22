import {
  projectPageMap
} from '../datasource';
const app = getApp();
const columns = [{
    label: '业态',
    key: 'bizType',
    width: '200rpx',
    align: 'left',
  },
  {
    label: '资产',
    key: 'assetType',
    width: '200rpx',
    align: 'left'
  },
  {
    label: '属性',
    key: 'assetNature',
    width: '200rpx',
    align: 'left'
  },
  {
    label: '建筑面积(m²)',
    key: 'coveredArea',
    width: '200rpx',
    group: '管理面积',
    align: 'left',
    numberPrecision:2,
    numberFormat:true
  },
  {
    label: '套内面积(m²)',
    key: 'insideArea',
    width: '200rpx',
    group: '管理面积',
    align: 'left',
    numberPrecision:2,
    numberFormat:true
  },
  {
    label: '一铺一价版',
    key: 'glaPriceArea',
    width: '200rpx',
    group: 'GLA(可租面积)',
    align: 'left',
    numberPrecision:2,
    numberFormat:true
  },
  {
    label: '签约版',
    key: 'glaContractArea',
    width: '200rpx',
    group: 'GLA(可租面积)',
    align: 'left',
    numberPrecision:2,
    numberFormat:true
  },
  {
    label: '签约版',
    key: 'billingArea',
    width: '200rpx',
    group: '计费面积',
    align: 'left',
    numberPrecision:2,
    numberFormat:true
  },
  {
    label: '车位数',
    key: 'parkingNum',
    width: '200rpx',
    align: 'left',
    numberPrecision:2,
    numberFormat:true
  },
  {
    label: '免费时长(h)',
    key: 'ratesFreetime',
    width: '200rpx',
    group: '收费标准',
    align: 'left',
    numberPrecision:2,
    numberFormat:true
  },
  {
    label: '收费标准(元/h)',
    key: 'ratesHour',
    width: '200rpx',
    group: '收费标准',
    align: 'left',
    numberPrecision:2,
    numberFormat:true
  },
  {
    label: '24H封顶(元)',
    key: 'ratesDay',
    width: '200rpx',
    group: '收费标准',
    align: 'left',
    numberPrecision:2,
    numberFormat:true
  },
  {
    label: '员工停车(元/月)',
    key: 'ratesEmp',
    width: '220rpx',
    group: '收费标准',
    align: 'left',
    numberPrecision:2,
    numberFormat:true
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
      .post('http://pmstest.powerlong.com/budget/open/collectbase/queryPage', this.data.query);

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