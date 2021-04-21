<template>
<view>
<app-header>
  <app-project-selector  @selected="onProjectSelected" v-if='showSelector'></app-project-selector>
  <view slot="right">
    <app-date-picker :fromDate="params.queryYear" fields="year" @changed="onDateChanged"></app-date-picker>
  </view>
</app-header>
<app-section>
  <view slot="head-title">
    <view class="selector">
      <app-catalogue title="招商业绩考核"></app-catalogue>
    </view>
  </view>
  <app-table fixednum="2" :columns="columns" :values="rows" :total-row="totalRow" @row-column-click="onRowColumnClick"></app-table>
</app-section>
</view>
</template>

<script>
// pages/zhaoshang/yjkh/yjkh.js
const app = getApp();
import appHeader from "../../../components/common/header";
import appProjectSelector from "../../../components/selector/project";
import appDatePicker from "../../../components/selector/datepicker";
import appSection from "../../../components/container/section";
import appCatalogue from "../../../components/catalogue/index";
import appTable from "../../../components/table/index";

export default {
  data() {
    return {
		showSelector:true,
      columns: [{
        label: '序号',
        width: '100rpx',
        align: 'left'
      }, {
        label: '项目',
        key: 'bisProjectName',
        width: '200rpx',
        color: '#3B96BE',
        align: 'left'
      }, {
        label: '实际计租面积(㎡)',
        key: 'rentArea',
        width: '240rpx',
        align: 'right',
        sortable: true
      }, {
        label: '占比',
        key: 'rentAreaRatio',
        width: '180rpx',
        align: 'right',
        sortable: true
      }, {
        label: '实际品牌数',
        key: 'brandNumber',
        width: '180rpx',
        align: 'right',
        sortable: true
      }, {
        label: '占比',
        key: 'brandNumberRatio',
        width: '180rpx',
        align: 'right',
        sortable: true
      }],
      rows: [],
      totalRow: null,
      params: {
        offset: 1,
        limit: 10000,
        queryYear: app.globalData.getDefaultDate('year'),
        projectId: ''
      },
    };
  },

  components: {
    appHeader,
    appProjectSelector,
    appDatePicker,
    appSection,
    appCatalogue,
    appTable
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList();
  },
  onShow(){
  	this.setData({
  		showSelector:true
  	})
  },
  onHide(){
  	this.setData({
  		showSelector:false
  	})
  },
  methods: {
    async getDataList() {
      let res = await app.globalData.request.options({
        loading: true
      }).get('/api/v1/report/bis/investments/performances/assessments/summaries/bigs/list', this.params);
      this.setData({
        rows: res.data.list
      });
    },

    onDateChanged(e) {
      this.setData({
        ['params.queryYear']: e.detail.value
      });
      this.getDataList();
    },

    onProjectSelected(e) {
      this.setData({
        ['params.projectId']: e.detail ? e.detail.bisProjectId : ''
      });
      this.getDataList();
    },

    onRowColumnClick(e) {
      let params = Object.assign({}, this.params);
      params.projectId = e.detail.row.bisProjectId;
      params.projectName = e.detail.row.bisProjectName;
      app.globalData.page.go('./khxm', params);
    }

  }
};
</script>
<style>
@import "./yjkh.css";
</style>