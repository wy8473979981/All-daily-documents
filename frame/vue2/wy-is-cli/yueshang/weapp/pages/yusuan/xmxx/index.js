import {
  projectPageMap
} from '../datasource';
const app = getApp();
const columns = [{
    label: '项目',
    key: 'projectName',
    width: '200rpx',
    align: 'left'
  },
  {
    label: '面积',
    key: 'projectArea',
    width: '150rpx',
    align: 'right',
    numberPrecision:2,
    numberFormat:true
  },
  {
    label: '配置人数',
    key: 'projectEmp',
    width: '160rpx',
    align: 'right',
    numberPrecision:0,
    numberFormat:true
  },
  {
    label: '单价(元/月/人)',
    key: 'projectEmpSalary',
    width: '250rpx',
    align: 'right',
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
      .post('http://pmstest.powerlong.com/budget/open/collectbaseProject/queryPage', this.data.query);

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