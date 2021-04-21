<template>
<view>
<app-header>
  <app-project-selector @selected="onProjectSelected" disabled-all :selected="selected"></app-project-selector>
</app-header>
  <app-section title="涉及商户">
    <view slot="head-actions">
      <view class="select-indicator">
        <view :class="'mount ' + (params.queryType === '1' ? 'active' : '' )" @tap="changeSpan" data-span="1"> 3个月内 </view>
        <view class="line"> | </view>
        <view :class="'year ' + ( params.queryType === '2' ? 'active' : '' )" @tap="changeSpan" data-span="2"> 3-6月 </view>
      </view>
    </view>
    <app-table :totalRow="totalRow" :values="dataList" :columns="columns" @row-column-click="onRowColumnClick"></app-table>
  </app-section>
</view>
</template>

<script>
const app = getApp();
import appHeader from "@/components/common/header";
import appSection from "@/components/container/section";
import appTable from "@/components/table/index";
import appProjectSelector from "@/components/selector/project";

export default {
  data() {
    return {
      columns: [{
        label: "序号",
        width: "90rpx"
      }, {
        label: "商户名",
        key: "bisShopName",
        width: "200rpx",
        align: "left"
      }, {
        label: "到期面积",
        key: "square",
        color: "#FF120D",
        sortable: true,
        align: "right"
      }, {
        label: "到期日",
        key: "endDate",
        width: "200rpx",
        sortable: true,
        align: "right"
      }],
      params: {},
      dataList: [{
        projectName: "宝山",
        curMonthFact: 100
      }],
      selected: "",
      totalRow: {}
    };
  },

  components: {
    appHeader,
    appSection,
    appTable,
    appProjectSelector
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let selected = {
      label: options.projectName,
      value: options.bisProjectId
    };
    this.setData({
      params: options,
      selected
    });
    this.getDataList();
	uni.$on('onProjectSelected',(e) => {
		this.onProjectSelected(e)
	});
  },
  methods: {
    async getDataList() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open!selectExpireShopList.action", this.params);
      console.log(res);
      this.setData({
        dataList: res.data.slice(1),
        totalRow: res.data.slice(0, 1)[0]
      });
    },

    changeSpan(e) {
      let span = e.currentTarget.dataset.span;
      this.setData({
        ["params.queryType"]: span
      });
      this.getDataList();
    },

    onProjectSelected(e) {
      let id = e.detail.value.bisProjectId;
      this.setData({
        ["params.bisProjectId"]: id
      });
	  this.setData({
	    selected: e.detail,
	  });
      this.getDataList();
    }

  }
};
</script>
<style>
@import "./zyxq.css";
</style>