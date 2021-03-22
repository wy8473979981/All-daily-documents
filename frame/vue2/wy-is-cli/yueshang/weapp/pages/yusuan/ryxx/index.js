import {
  projectPageMap
} from '../datasource';
const app = getApp();
const columns = [{
    label: '编制类型',
    key: 'staffingType',
    width: '150rpx',
    align: 'left'
  },
  {
    label: '岗位类型',
    key: 'stationType',
    width: '150rpx',
    align: 'left'
  },
  {
    label: '出入口类型',
    key: 'inletOutletType',
    width: '160rpx',
    align: 'left'
  },
  {
    label: '总编制数',
    key: 'headcount',
    width: '150rpx',
    align: 'right',
    numberPrecision: 0,
    numberFormat: true
  },
  {
    label: '实际在岗人数',
    key: 'realcount',
    width: '200rpx',
    align: 'right',
    numberPrecision: 0,
    numberFormat: true
  },
  {
    label: '出入口个数',
    key: 'inletOutletCount',
    width: '200rpx',
    align: 'right',
    numberPrecision: 0,
    numberFormat: true
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
      table: {}
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
      .post('http://pmstest.powerlong.com/budget/open/collecttarget/queryPage', this.data.query);

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