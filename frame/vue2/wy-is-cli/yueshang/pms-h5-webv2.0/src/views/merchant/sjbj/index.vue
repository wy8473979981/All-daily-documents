<template>
  <div class="duibi" v-webTitle :data-title="`商家信息对比`">
    <div class="header-top">
      <ys-n-nav-bar :title="`商家信息对比`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @selected="onDateChanged" :selected="params.queryDate"></ys-n-date-pick>
          </div>
        </div>
      </div>
    </div>

    <ys-n-section>
      <div slot="head-title">
        <!-- <ys-n-filter-chart-dialog :title="title" :items="itemList" @chartselected="bindchartselected"></ys-n-filter-chart-dialog> -->
        <ys-n-filter-chart-dialog :label="chartsTitle" :searchList="searchList" @search="bindchartselected"> </ys-n-filter-chart-dialog>
      </div>
      <div class="registered-channels">
        <ys-n-echart :options="options"></ys-n-echart>
      </div>
    </ys-n-section>
    <ys-n-section title="商家信息对比">
      <ys-n-length-ways :values="dataList" :cross="cross"></ys-n-length-ways>
    </ys-n-section>
  </div>
</template>

<script>
const searchList = [
  {
    label: "",
    key: "detail",
    selectedCode: 'rentMoney',
    values: [
      {
        name: "当月租金",
        code: "rentMoney",
        value: "rentMoney",
        unit: "万元",
      },
      {
        name: "当月物管",
        code: "managementMoney",
        value: "managementMoney",
        unit: "万",
      },
      {
        name: "上月销售",
        code: "sales",
        value: "sales",
        unit: "万",
      },
      {
        name: "月平效",
        code: "monthsEffect",
        value: "monthsEffect",
        unit: "元",
      },
      {
        name: "总欠费",
        code: "totalOwe",
        value: "totalOwe",
        unit: "万",
      },
      {
        name: "租售比",
        code: "rentRatio",
        value: "rentRatio",
        unit: "%",
      },
    ],
  }
];
const options = {
  color: ['#EA6B00', '#1890FF', '#02DFFF', '#FFCE49', '#1EFBB8'],
  legend: {
    selectedMode: true,
    data: [],
    itemHeight: 12,
    y: 'bottom',
    bottom: '0',
    type: 'scroll'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params, ticket, callback) {
      let res = '';

      if (params.length > 0) {
        res += params[0].axisValue + '\n<br/>';
      }

      for (var i = 0, l = params.length; i < l; i++) {
        if (!(params[i].value == null)) {
          res += params[i].seriesName + ' : ' + params[i].value + '\n<br/>';
        } else {
          res += params[i].seriesName + ' : -' + '\n<br/>';
        }
      }

      return res;
    },
    padding: [8, 10, 8, 10],
    borderColor: 'rgba(45, 159, 203, 1)',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    textStyle: {
      color: '#333333',
      fontSize: 11
    }
  },
  grid: {
    right: '5%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    axisPointer: {
      type: 'shadow'
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: '12'
      },
      interval: 0
    },
    axisLine: {
      show: false
    },
    nameLocation: 'end' //坐标轴名称显示位置。

  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      //y轴刻度线
      show: false
    }
  },
  series: []
};

export default {
  data() {
    return {
      searchList,
      chartsType: "rentMoney",
      chartsTitle: "当月租金(万)",
      routerParams: this.$route.query,
      dataList: [],
      cross: [
        {
          key: 'merchantsChineseName'
        }, {
          label: '当月租金(万)',
          key: 'rentMoney'
        }, {
          label: '当月物管(万)',
          key: 'managementMoney'
        }, {
          label: '上月销售(万)',
          key: 'sales'
        }, {
          label: '月平效(元/㎡)',
          key: 'monthsEffect'
        }, {
          label: '总欠费(万)',
          key: 'totalOwe'
        }, {
          label: '租售比',
          key: 'rentRatio'
        }
      ],
      params: {
        bisShopId: [],
        limit: 20,
        offset: 1,
        queryDate: this.$util.getDefaultDate('month')
      },
      options: options,
      chartHeight: '500px'
    };
  },

  components: {},
  props: {},
  mounted() {
    let ids = this.routerParams.ids;
    console.log(ids);
    this.setData({
      'params.bisShopId': ids
    });
    setTimeout(_ => {
      this.getDataList();
      this.getChartList('rentMoney');
    });
  },
  methods: {
    async getDataList(bisShopId) {
      try {
        let params = this.params;
        await this.$axios.externalLinkServe.getMerchantCompareDetail(params, false).then(res => {
          if (res.code == 200) {
            this.setData({
              dataList: res.data.list
            });
          }
        })
      } catch (e) {
        console.log(e)
      }
    },

    async getChartList(value) {
      try {
        await this.$axios.externalLinkServe.getListLineChart(this.params, false).then(res => {
          if (res.code == 200) {
            const { list } = res.data;
            let shopList = [], seriesInfo = {}, seriesList;
            list.forEach(item => {
              let {
                merchantsChineseName
              } = item;

              if (!seriesInfo[merchantsChineseName]) {
                seriesInfo[merchantsChineseName] = {
                  merchantsChineseName,
                  data: []
                };
              }

              seriesInfo[merchantsChineseName].data.push(item[value]);
            });
            shopList = Object.keys(seriesInfo);
            seriesList = Object.values(seriesInfo);
            const series = seriesList.map(item => ({
              name: item.merchantsChineseName,
              type: 'line',
              data: item.data,
              barWidth: 10,
              barGap: '0%'
            }));
            console.log(series);
            options.legend.data = shopList;
            options.series = series;
            this.setData({
              options
            });
          }
        })
      } catch (e) {
        console.log(e)
      }
    },

    onDateChanged(date) {
      this.setData({
        'params.queryDate': date
      });
      this.getDataList();
    },

    bindchartselected(e) {
      try {
        console.log(e);
        let selected = null;
        let values = this.searchList[0].values;
        this.searchList[0].selectedCode = e.detail.code;
        values.map((item) => {
          if (item.name === e.detail.name) {
            selected = item;
            this.setData({
              chartsTitle: e.detail.name + "(" + e.detail.unit + ")",
              chartsType: item.code,
            });
          }
        });
        this.getChartList(this.chartsType);
      } catch (e) {
        console.log(e)
      }
    },

  }
};
</script>
<style lang="scss" scoped>
.registered-channels {
  background-color: #fff;
}
</style>