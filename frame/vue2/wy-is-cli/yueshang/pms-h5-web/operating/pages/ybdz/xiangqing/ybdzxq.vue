<template>
<view>
<app-header>
  <app-project-selector @selected="onProjectSelected" disabled-all :selected="selected"></app-project-selector>
</app-header>
<view class="detail-box">
    <view class="detail-item">
      <view class="detail-item-label">累计比例</view>
      <view class="item-num-box">
        <view class="item-num">{{totalRow.oweVsBondRate}}</view>
        <view class="item-unit"> %</view>
      </view>
    </view>
    <view class="detail-item">
      <view class="detail-item-label">户数</view>
      <view class="item-num-box">
        <view class="item-num">{{totalRow.shopNum}}</view>
        <!-- <view class="item-unit"> 万元</view> -->
      </view>
    </view>
    <view class="detail-item">
      <view class="detail-item-label">累计差额</view>
      <view class="item-num-box">
        <view class="item-num red">{{totalRow.moneySub}}</view>
        <view class="item-unit"> 万元</view>
      </view>
    </view>
</view>
  <app-section title="涉及商户">
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
      timeSpan: "0",
      columns: [{
        label: "序号",
        width: "90rpx"
      }, {
        label: "商户名",
        key: "bisShopName",
        align: "left"
      }, {
        label: "累计差额(万元)",
        key: "moneySub",
        color: "#FF120D",
        sortable: true,
        width: "240rpx",
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
  },
  methods: {
    async getDataList() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open!selectOweVsBondShopList.action", this.params);
      this.setData({
        dataList: res.data.slice(1),
        totalRow: res.data.slice(0, 1)[0]
      });
    },

    onProjectSelected(e) {
      let id = e.detail.value.bisProjectId;
      this.setData({
        ["params.bisProjectId"]: id
      });
      this.getDataList();
    }

  }
};
</script>
<style>
@import "./ybdzxq.css";
</style>