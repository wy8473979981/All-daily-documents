<template>
<view>
<app-header>
  <app-project-selector @selected="onProjectSelected" v-if='showSelector'></app-project-selector>
  <view slot="right">
    <app-date-picker :fromDate="params.yearAndMonth" fields="month" @changed="onDateChanged"></app-date-picker>
  </view>
</app-header>
<app-section>
  <view slot="head-title">
    <view class="selector">
      <app-catalogue title="筹备期网批驳回率统计"></app-catalogue>
      <!-- <image src="../../../assets/images/icon-selector-arrow-blue.svg"></image> -->
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
import appTable1 from "../../../components/tablecomponents/index";
import appCatalogue from "../../../components/catalogue/index";
import appSection from "../../../components/container/section";
import appProjectSelector from "../../../components/selector/project";

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
        key: 'projectName',
        width: '200rpx',
        align: 'left'
      }, {
        label: '发起数',
        key: 'lagmonthBrandFqNum',
        width: '140rpx',
        group: '上月-品牌',
        align: 'right',
        sortable: true
      }, {
        label: '驳回数',
        key: 'lagmonthBrandBhNum',
        group: '上月-品牌',
        width: '140rpx',
        align: 'right',
        sortable: true
      }, {
        label: '准确率',
        key: 'lagmonthBrandZql',
        group: '上月-品牌',
        width: '180rpx',
        unit: '%',
        slot: 'penoncel',
        align: 'right',
        sortable: true
      }, {
        label: '发起数',
        key: 'curmonthBrandFqNum',
        group: '本月-品牌',
        width: '140rpx',
        align: 'right',
        sortable: true
      }, {
        label: '驳回数',
        key: 'curmonthBrandBhNum',
        group: '本月-品牌',
        width: '140rpx',
        align: 'right',
        sortable: true
      }, {
        label: '准确率',
        key: 'curmonthPpZql',
        group: '本月-品牌',
        width: '180rpx',
        unit: '%',
        slot: 'penoncel',
        align: 'right',
        sortable: true
      }, {
        label: '发起数',
        key: 'lagmonthBusinessFqNum',
        group: '上月-商务',
        width: '140rpx',
        align: 'right',
        sortable: true
      }, {
        label: '驳回数',
        key: 'lagmonthBusinessBhNum',
        group: '上月-商务',
        width: '140rpx',
        align: 'right',
        sortable: true
      }, {
        label: '准确率',
        key: 'lagmonthBusinessZql',
        group: '上月-商务',
        width: '180rpx',
        unit: '%',
        slot: 'penoncel',
        align: 'right',
        sortable: true
      }, {
        label: '发起数',
        key: 'curmonthBusinessFqNum',
        group: '本月-商务',
        width: '140rpx',
        align: 'right',
        sortable: true
      }, {
        label: '驳回数',
        key: 'curmonthBusinessBhNum',
        group: '本月-商务',
        width: '140rpx',
        align: 'right',
        sortable: true
      }, {
        label: '准确率',
        key: 'curmonthBusinessZql',
        group: '本月-商务',
        width: '180rpx',
        unit: '%',
        slot: 'penoncel',
        align: 'right',
        sortable: true
      }],
      rows: [],
      totalRow: {},
      params: {
        offset: 1,
        limit: 100000,
        yearAndMonth: app.globalData.getDefaultDate('month'),
        projectId: ''
      }
    };
  },

  components: {
    appHeader,
    appDatePicker,
    appTable,
    appTable1,
    appCatalogue,
    appSection,
    appProjectSelector
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList();
  },
  methods: {
    onDateChanged(e) {
      this.setData({
        ['params.yearAndMonth']: e.detail.value
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
    async getDataList() {
      let params = this.params;
      params.monthId = this.params.yearAndMonth.split('-').join('');
      let res = await app.globalData.request.options({
        loading: true
      }).get('/api/v1/report/bis/commissions/rejects/rates/bigs/rejectList', params);
      this.setData({
        rows: res.data.list.slice(0, -1),
        totalRow: res.data.list.slice(-1)[0]
      });
    },

    onProjectSelected(e) {
		
      this.setData({
        ['params.projectId']: e.detail ? e.detail.bisProjectId : ''
      });
      this.getDataList();
    }

  }
};
</script>
<style>
@import "./bhl.css";
</style>