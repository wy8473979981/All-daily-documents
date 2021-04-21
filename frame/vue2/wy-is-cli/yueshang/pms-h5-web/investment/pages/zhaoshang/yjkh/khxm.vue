<template>
<view>
<app-header>
  <app-project-selector disabled-all :selected="selected" @selected="onProjectSelected" v-if='showSelector'></app-project-selector>
  <!-- <view slot='right'>
    <app-date-picker fromDate="{{ params.year }}" fields="year" bind:changed="onDateChanged" />
  </view> -->
</app-header>
<app-section>
  <view slot="head-title">
    <view class="selector">
      <app-catalogue title="招商业绩考核 - 项目"></app-catalogue>
    </view>
  </view>
  <app-table fixednum="2" :columns="columns" :values="rows" :total-row="totalRow" @row-column-click="onRowColumnClick"></app-table>
</app-section>
</view>
</template>

<script>
// pages/zhaoshang/yjkh/khxm.js
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
        align: 'left'
      }, {
        label: '主谈人',
        key: 'chiefNegotiator',
        width: '140rpx',
        color: '#3B96BE',
        align: 'left'
      }, {
        label: '目标计租面积(㎡)',
        key: 'rentAreaT',
        width: '240rpx',
        align: 'right',
        sortable: true
      }, {
        label: '实际计租面积(㎡)',
        key: 'rentAreaA',
        width: '240rpx',
        align: 'right',
        sortable: true
      }, {
        label: '完成率',
        key: 'percentageComplete',
        width: '140rpx',
        align: 'right',
        sortable: true
      }],
      rows: [],
      totalRow: null,
      params: {
        offset: 1,
        limit: 100000,
        projectId: ''
      },
      selected: ""
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
    let selected = {
      label: options.projectName,
      value: options.projectId
    };
    this.setData({
      params: options,
      selected
    });
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
      }).get('/api/v1/report/bis/investments/performances/assessments/projects/bigs/list', this.params);
      this.setData({
        rows: res.data.list
      });
    },

    onDateChanged(e) {
      this.setData({
        ['params.yearAndMonth']: e.detail.value
      });
    },

    onProjectSelected(e) {
		console.log(this.params)
      this.setData({
        ['params.projectId']: e.detail.bisProjectId,
        ['params.label']: e.detail.label,
        ['params.projectName']: e.detail.label,
      });
      this.getDataList();
    },

    onRowColumnClick(e) {
      let params = Object.assign({}, this.params);
      params.chiefNegotiator = e.detail.row.chiefNegotiator;
      app.globalData.page.go('./khpw', params);
    }

  }
};
</script>
<style>
@import "./khxm.css";
</style>