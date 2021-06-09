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
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
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
    </van-pull-refresh>
  </div>
</template>

<script>
import { searchList, options } from './config';
export default {
  data () {
    return {
      isLoading: false, isLoadingCount: 0,
      options: options,
      searchList: searchList,
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
      chartHeight: '500px'
    };
  },

  components: {},
  props: {},
  mounted () {
    let ids = this.routerParams.ids;
    console.log(ids);
    this.setData({
      'params.bisShopId': ids
    });
    this.getDataList(true);
    this.getChartList('rentMoney');
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        // 如果接口有问题，5s后关闭下拉刷新loading
        this.isLoading = false
      }, 0)
      this.getDataList(true)
    },
    addIsLoadingCount (isUse = true) {
      // isUse 表示下拉刷新是否真实使用
      if (!isUse) {
        return false;
      }
      this.isLoadingCount++;
    },
    decreaseIsLoadingCount (isUse = true) {
      // isUse 表示下拉刷新是否真实使用
      if (!isUse) {
        return false;
      }
      if (this.isLoadingCount <= 0) return;
      this.isLoadingCount--;
      if (this.isLoadingCount === 0) {
        this.$lodash.debounce(this.setIsLoading, 300)()
      }
    },
    setIsLoading () {
      this.isLoading = false;
    },
    async getDataList (isUse = false) {
      try {
        let params = this.params;
        this.addIsLoadingCount(isUse)
        await this.$axios.merchantServe.getMerchantCompareDetail(params, true).then(res => {
          if (res.code == 200) {
            this.decreaseIsLoadingCount(isUse)
            this.setData({
              dataList: res.data.list
            });
          }
        })
      } catch (e) {
        console.log(e)
      }
    },

    async getChartList (value) {
      try {
        await this.$axios.merchantServe.getListLineChart(this.params, false).then(res => {
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

    onDateChanged (date) {
      this.setData({
        'params.queryDate': date
      });
      this.getDataList();
    },

    bindchartselected (e) {
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