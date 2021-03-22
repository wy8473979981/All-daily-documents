const app = getApp();
const fixedColumns = [{
  label: '月份',
  key: 'month',
}];
const monthColumns = [{
    label: '欠费（万元）',
    key: 'priceOfMonth',
    sortable: true,
    color: '#FD100E',
    align:"right"
  },
  {
    label: '同比',
    key: 'compareOfMonth',
    sortable: true,
    align:"right"
  }
];
const yearColumns = [{
  label: '欠费（万元）',
  key: 'priceOfYear',
  sortable: true,
  align:"right"
}];

Page({

  data: {
    selected: {},
    query: {
      type: 'zj',
      attr: 1,
      yearMonth: '2020'
    },
    page: {
      tabActiveIndex: 0,
      tabs: [{
          label: '租金欠费',
          value: 'zj'
        },
        {
          label: '物管欠费',
          value: 'wg'
        }
      ],
      table: {
        mode: 'month'
      }
    }
  },

  onLoad: function (options) {
    const date = (new Date());
    const year = date.getFullYear();
    console.log((options.type || 'zj') === 'zj' ? 0 : 1);
    this.setData({
      'query.bisProjectId': options.id,
      'query.yearMonth': (options.year || year).split('-')[0],
      'query.type': options.type || 'zj',
      'page.tabActiveIndex': (options.type || 'zj') === 'zj' ? 0 : 1,
      ["selected.label"]: options.name,
      ["selected.value"]: options.id,
    })
    this.loadData();
  },

  loadData: async function () {
    const url = '/open/bis-open-project!oweOfMon.action';
    const {
      data: res
    } = await app.request
      .options({
        loading: true
      })
      .get(url, this.data.query);
    const rows = res.oweOfMon.owe.map(item => {
      return {
        month: item[0],
        priceOfMonth: item[2] || '--',
        compareOfMonth: item[3] || '--',
        priceOfYear: item[4] || '--',
      };
    });

    const setdata = {
      'page.charts.main.options': {
        unit:'万元',
        color: ['#FD100E'],
        legend: {
          data: [this.data.query.yearMonth]
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
        },
        series: [{
          type: 'line',
          name: this.data.query.yearMonth,
          data: JSON.parse(res.oweOfMon.owechart).map(num => num),
          areaStyle: {
            color: new app.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#FD100E'
            }, {
              offset: 1,
              color: '#ffffff'
            }])
          }
        }]
      },
      'page.table': {
        mode: 'month',
        columns: [...fixedColumns, ...monthColumns],
        rows
      }
    };
    this.setData(setdata);
  },

  onTabChanged(e) {
    this.setData({
      'query.type': e.detail.value
    });
    this.loadData();
  },

  onProjectSelected(e) {
    this.setData({
      'query.bisProjectId': e.detail.value.bisProjectId,
    });
    this.loadData();
  },

  onDateChanged(e) {
    this.setData({
      'query.yearMonth': e.detail.value
    });
    this.loadData();
  },

  onListModeChanged(e) {
    const mode = e.target.dataset.value;
    if (this.data.page.table.mode !== mode) {
      this.setData({
        'page.table.mode': mode,
        'page.table.columns': [...fixedColumns, ...(mode === 'year' ? yearColumns : monthColumns)],
      });
    }
  },
  onRowClick(e) {
    app.page.go('/pages/shuju/qiankuan/details', {
      id: e.detail.id
    });
  }
});