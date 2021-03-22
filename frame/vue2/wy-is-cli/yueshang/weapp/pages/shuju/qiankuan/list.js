const app = getApp();
const fixedColumns = [{
  label: '排序',
  width: 100
},
{
  label: '项目',
  key: 'name',
  color: '#1890FF',
}
];
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
},
{
  label: '同比',
  key: 'compareOfYear',
  sortable: true,
  align:"right"
}
];

Page({

  data: {
    query: {
      type: 'zj',
      attr: 1,
      yearMonth: '2020-11'
    },
    page: {
      activeTab: '租金欠费（万元）',
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
    const month = `0${date.getMonth()}`.slice(1);
    this.setData({
      'query.yearMonth': `${year}-${month}`
    })
    this.loadData();
  },

  loadData: async function () {
    const { data: res } = await app.request
      .options({
        loading: true
      })
      .get('/open/bis-open-report!oweOfYear.action', this.data.query);
    let result = res.zjowe || res.wgowe
    const rows = result.owe.map((item, itemi) => {
      const name = itemi === 0 ? item[1] : item[0];
      const id = itemi === 0 ? null : item[1];
      if (this.data.query.type === 'zj') {
        return {
          id,
          name,
          priceOfMonth: item[2],
          compareOfMonth: item[4],
          priceOfYear: item[3],
          compareOfYear: item[5],
        };
      }
      return {
        id,
        name,
        priceOfMonth: item[2],
        compareOfMonth: item[3],
        priceOfYear: item[4],
        compareOfYear: item[5],
      };
    });
    const totalRow = rows.shift();

      const legend = ['欠费']
    const setdata = {
      'page.charts.main.options': {
        unit: '万元',
        color: ['#FD100E'],
        legend: {
          data: legend,
          icon: "circle",
					itemHeight: 7,
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
          // name: res.tabulateData.yearMonth,
          name: legend[0],
          data: JSON.parse(res.initChart.oweChart).map(num => num),
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
        totalRow,
        rows
      }
    };
    this.setData(setdata);
  },

  onTabChanged(e) {
    let title = ''
    if (e.detail.value === 'wg') {
      title = '物管欠费（万元）'
    } else {
      title = '租金欠费（万元）'
    }
    this.setData({
      'query.type': e.detail.value,
      'page.activeTab': title
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
      id: e.detail.row.id,
      name:e.detail.row.name,
      year: this.data.query.yearMonth,
      type: this.data.query.type
    });
  }
});