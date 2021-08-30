<template>
<view>
<app-header>
  <app-project-selector disabled-all :selected="selected" @selected="onProjectSelected" v-if='showSelector'></app-project-selector>
  <view slot="right">
    <!-- <app-date-picker fromDate="{{ params.yearAndMonth }}" fields="month" bind:changed="onDateChanged" /> -->
  </view>
</app-header>
<app-section title="筹备招商进度-项目">
  <view slot="head-actions" class="action-box">
    <view v-for="(item, index) in tabList" :key="index" :class="'action-item ' + (item.type===params.conditionType?'active':'')" @tap="tabChange" :data-type="item.type">
      {{item.label}}
    </view>
  </view>
  <app-table fixednum="2" :columns="columns" :values="rows" :total-row="totalRow"></app-table>
</app-section>
</view>
</template>

<script>
const app = getApp();
import appHeader from "../../../components/common/header";
import appDatePicker from "../../../components/selector/datepicker";
import appTable from "../../../components/table/index";
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
        key: 'businessName',
        align: 'left',
        width: '200rpx'
      }, {
        label: '1月',
        key: 'janValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '2月',
        key: 'febValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '3月',
        key: 'marValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '4月',
        key: 'aprValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '5月',
        key: 'mayValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '6月',
        key: 'junValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '7月',
        key: 'julValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '8月',
        key: 'augValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '9月',
        key: 'sepValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '10月',
        key: 'octValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '11月',
        key: 'novValue',
        width: '140rpx',
        align: 'right'
      }, {
        label: '12月',
        key: 'decValue',
        width: '140rpx',
        align: 'right'
      }],
      rows: [],
      totalRow: null,
      tabList: [{
        type: '2',
        label: '建筑面积'
      }, {
        type: '3',
        label: '计租面积'
      }, {
        type: '1',
        label: '品牌数量'
      }],
      params: {
        offset: 1,
        limit: 100,
        projectId: ''
      },
      selected: ""
    };
  },

  components: {
    appHeader,
    appDatePicker,
    appTable,
    appSection,
    appProjectSelector
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
    let params = options;
    params.completeData = options.realCompletedYm && options.realCompletedYm.split('-')[0];
    this.changeColumns(options.projectName);
    this.setData({
      params: options,
      selected
    });
    this.getDataList();
  },
  methods: {
    changeColumns(title) {
      let columns = this.columns;
      columns[1].label = title;
      this.setData({
        columns
      });
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
      // this.data.params.conditionType = "";
      console.log(this.params);
      let res = await app.globalData.request.get('/api/v1/report/bis/attracts/investments/deatils/bigs/list', this.params);
      this.setData({
        rows: res.data.list
      });
    },

    tabChange(e) {
      this.setData({
        ['params.conditionType']: e.currentTarget.dataset.type
      });
      this.getDataList();
    },

    onProjectSelected(e) {
      this.changeColumns(e.detail.label);
      this.setData({
        ['params.projectId']: e.detail.bisProjectId
      });
      this.getDataList();
    }

  }
};
</script>
<style>
@import "./detail.css";
</style>