<template>
<view>
<app-header>
  <view slot="right">
    <app-date-picker :fromDate="params.yearAndMonth" fields="month" @changed="onDateChanged"></app-date-picker>
  </view>
</app-header>
<app-section>
  <view slot="head-title">
    <view class="selector">
      <app-catalogue title="筹备期全面抽成统计"></app-catalogue>
    </view>
  </view>
  <app-table fixednum="2" :columns="columns" :values="rows" :total-row="totalRow"></app-table>
</app-section>
</view>
</template>

<script>
// pages/zhaoshang/cctj/cctj.js
const app = getApp();
import appHeader from "../../../components/common/header";
import appDatePicker from "../../../components/selector/datepicker";
import appTable from "../../../components/table/index";
import appCatalogue from "../../../components/catalogue/index";
import appSection from "../../../components/container/section";

export default {
  data() {
    return {
      columns: [{
        label: '序号',
        width: '100rpx',
        align: 'left'
      }, {
        label: '项目',
        key: 'projectName',
        width: '200rpx',
        align: 'left'
      }, {
        label: '当前合同数',
        key: 'totalNum',
        width: '200rpx',
        align: 'right',
        sortable: true
      }, {
        label: '纯扣',
        key: 'ckNum',
        group: '合同类型',
        width: '120rpx',
        align: 'right',
        sortable: true
      }, {
        label: '纯保底',
        key: 'bdNum',
        group: '合同类型',
        width: '120rpx',
        align: 'right',
        sortable: true
      }, {
        label: '两者取高',
        key: 'qgNum',
        group: '合同类型',
        width: '140rpx',
        align: 'right',
        sortable: true
      }],
      rows: [],
      totalRow: {},
      params: {
        offset: 1,
        limit: 200,
        monthId: '',
        yearAndMonth: app.globalData.getDefaultDate('month')
      }
    };
  },

  components: {
    appHeader,
    appDatePicker,
    appTable,
    appCatalogue,
    appSection
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList();
  },
  methods: {
    async getDataList() {
      let params = this.params;
      params.monthId = this.params.yearAndMonth.split('-').join('');
      let res = await app.globalData.request.get('/api/v1/report/bis/commissions/rejects/rates/bigs/extractList', params);
      this.setData({
        rows: res.data.list.slice(0, -1),
        totalRow: res.data.list.slice(-1)[0]
      });
    },

    onDateChanged(e) {
      this.setData({
        ['params.yearAndMonth']: e.detail.value
      });
      this.getDataList();
    }

  }
};
</script>
<style>
@import "./cctj.css";
</style>