<template>
<view>
<app-section>
  <view slot="head-title">
    <view class="selector">
      <app-catalogue title="总部联发品牌数据监控"></app-catalogue>
    </view>
  </view>
  <app-table fixednum="2" :columns="columns" :values="rows" :total-row="totalRow" @row-column-click="onRowColumnClick"></app-table>
</app-section>
</view>
</template>

<script>
// pages/zhaoshang/lfpp/lfpp.js
const app = getApp();
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
        label: '品牌集团名称',
        key: 'companyName',
        width: '180rpx',
        align: 'left'
      }, {
        label: '合作品牌',
        key: 'cooperativeBrand',
        width: '160rpx',
        color: '#3B96BE',
        align: 'left'
      }, {
        label: '商家级别',
        key: 'businessLevel',
        width: '160rpx',
        align: 'right',
        sortable: true
      }, {
        label: '合作数量',
        key: 'cooperationProjectNumber',
        width: '160rpx',
        align: 'right',
        sortable: true
      }, {
        label: '合作项目',
        key: 'cooperationProject',
        width: '160rpx',
        align: 'left',
        ellipsis: '合作项目'
      }, {
        label: '合作租赁面积(㎡)',
        key: 'cooperationRentArea',
        width: '220rpx',
        align: 'right',
        sortable: true
      }, {
        label: '欠费情况(元)',
        key: 'owes',
        width: '190rpx',
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
  onLoad: function () {
    this.getDataList();
  },
  methods: {
    async getDataList() {
      let res = await app.globalData.request.options({
        loading: true
      }).get('/api/v1/report/bis/headquarters/brand/monitoring/total/bigs/list', this.params);
      this.setData({
        rows: res.data.list
      });
    },

    onRowColumnClick(e) {
      let params = Object.assign({}, this.params);
      params.cooperativeBrand = e.detail.row.cooperativeBrand;
      console.log(params);
      app.globalData.page.go('./detail', params);
    }

  }
};
</script>
<style>
@import "./lfpp.css";
</style>