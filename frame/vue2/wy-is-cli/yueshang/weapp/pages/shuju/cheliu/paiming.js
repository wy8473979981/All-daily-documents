const app = getApp();
const fixedColumns = [{
    label: '排名'
  },
  {
    label: '项目',
    key: 'projectName'
  }
];
const monthColumns = [{
    label: '周转率',
    key: 'trunoverMonthRate',
    sortable: true
  },
  {
    label: '车流',
    key: 'trafficMonth',
    sortable: true
  }
];
const yearColumns = [{
    label: '周转率',
    key: 'trunoverYearRate',
    sortable: true
  },
  {
    label: '车流',
    key: 'trafficYear',
    sortable: true
  }
];

Page({

  data: {
    query: {
      yearMonth: [app.today.year, app.today.month].join('-')
    },
    page: {
      table: {
        mode: 'month',
        columns: [...fixedColumns, ...monthColumns]
      }
    },
    groups:[]
  },

  onLoad: function (options) {
    console.log(app.today);
    this.loadData();
    this.getStage()
    // this.getplanList()
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
        [`query.${key}`]: detais[key]
      })
    }
    this.loadData()
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
    groups.push(provice_group);
    this.setData({
      groups,
    });
  },
  	// 获取项目阶段枚举
	async getStage() {
		let res = await app.request
			.options({ loading: true })
			.get("/open/bis-open-dict!stageList.action");
		let result = res.data.map((item) => {
			return {
				label: item.name,
				value: "stage-" + item.code,
			};
		});
		let group = {
			label: "项目阶段",
			items: result,
			maxnum: 1,
		};
		let groups = this.data.groups;
		groups.push(group);
		this.setData({
			groups,
		});
	},
  loadData: async function () {
    const {
      data: {
        chartData,
        ...res
      }
    } = await app.request
      .options({
        loading: true
      })
      .get('/open/bis-open-report!trafficInfo.action', this.data.query);

    const rows = res.parkTrafficList.map((item, itemi) => {
      return {
        ...item
      }
    });
    const totalRow = rows.pop();
    let year = chartData.year;
    let prevYear = chartData.prevYear;
    year = year.substring(year.length - 2) + "年度";
    prevYear = prevYear.substring(prevYear.length - 2) + "年度";

    let label =
    (this.data.query.yearMonth &&
      this.data.query.yearMonth.split("-")[0]) ||
    "2020";
  const legendData = [label.substring(2) + '年度' + '', ((parseInt(label) - 1) + '').substring(2) + '年度' + '']

    const setdata = {
      'page.charts.main.options': {
        unit: '万',
        decimals: 'xiaoshoupaiming',
        legend: {
          // data: [year, prevYear]
          data: legendData
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
            type: 'line',
            // name: year,
            name: legendData[0],
            data: JSON.parse(res.initChar).map(num => num),
            areaStyle: {
              color: new app.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#CFDFFE'
              }, {
                offset: 1,
                color: '#ffffff'
              }])
            },
          },
          {
            type: 'line',
            // name: prevYear,
            name: legendData[1],
            data: JSON.parse(res.initPrevYearChar).map(num => num)
          }
        ]
      },
      'page.table': {
        mode: 'month',
        columns: [...fixedColumns, ...monthColumns],
        totalRow,
        rows: rows.map((item, itemi) => {
          return {
            // rank: itemi + 1,
            ...item
          }
        })
      }
    };
    this.setData(setdata);
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
  }
})