<template>
<view>
<app-section>
  <view slot="head-title">
    <view class="selector">
      <app-catalogue title="总部联发品牌数据监控 - 明细"></app-catalogue>
    </view>
  </view>
  <app-table fixednum="2" :columns="columns" :values="rows" :total-row="totalRow"></app-table>
</app-section>
</view>
</template>

<script>
// pages/zhaoshang/lfpp/detail.js
const app = getApp(); // 当前年份
// 当前年份
const currentYear = app.globalData.getDefaultDate('year');
const prevOneYear = currentYear - 1;
const prevTwoYear = currentYear - 2;
import appSection from "../../../components/container/section";
import appCatalogue from "../../../components/catalogue/index";
import appTable from "../../../components/table/index";

export default {
  data() {
    return {
      columns: [{
        label: '序号',
        width: '100rpx',
        align: 'left'
      }, {
        label: '业态',
        key: 'primaryForms',
        width: '100rpx',
        align: 'left'
      }, {
        label: '品牌名称',
        key: 'cooperativeBrand',
        width: '160rpx',
        align: 'left'
      }, {
        label: '项目',
        key: 'bisProjectName',
        width: '140rpx',
        align: 'left'
      }, {
        label: '铺位号',
        key: 'storeNo',
        width: '200rpx',
        align: 'left'
      }, {
        label: '租赁面积(㎡)',
        key: 'rentArea',
        width: '180rpx',
        align: 'right',
        sortable: true
      }, {
        label: '签约日',
        key: 'signDate',
        width: '200rpx',
        align: 'right',
        sortable: true
      }, {
        label: '到期日',
        key: 'expiringDate',
        width: '200rpx',
        align: 'right',
        sortable: true
      }, {
        label: '免租期',
        key: 'rentFreePeriod',
        width: '180rpx',
        align: 'left'
      }, {
        label: '租金(元)',
        key: 'rentMoneys',
        width: '180rpx',
        align: 'right',
        sortable: true
      }, {
        label: '物业费(元)',
        key: 'mgrMoneys',
        width: '180rpx',
        align: 'right',
        sortable: true
      }, {
        label: `${prevTwoYear}年`,
        key: 'historicalAnnualPerformance2018s',
        width: '180rpx',
        align: 'right',
        sortable: true,
        group: '历史年业绩(万)'
      }, {
        label: `${prevOneYear}年`,
        key: 'historicalAnnualPerformance2019s',
        width: '180rpx',
        align: 'right',
        sortable: true,
        group: '历史年业绩(万)'
      }, {
        label: `${currentYear}年年累计 营业额(万)`,
        key: 'accumulatedTurnover2020s',
        width: '210rpx',
        align: 'right',
        sortable: true
      }],
      rows: [],
      totalRow: null,
      params: {
        offset: 1,
        limit: 100
      }
    };
  },

  components: {
    appSection,
    appCatalogue,
    appTable
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      params: options
    });
    this.getDataList();
  },
  methods: {
    async getDataList() {
      let res = await app.globalData.request.options({
        loading: true
      }).get('/api/v1/report/bis/headquarters/brand/monitoring/detail/bigs/list', this.params);
      this.setData({
        rows: res.data.list
      });
    }

  }
};
</script>
<style>
@import "./detail.css";
</style>