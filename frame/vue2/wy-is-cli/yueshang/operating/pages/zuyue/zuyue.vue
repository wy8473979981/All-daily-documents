<template>
<app-section title="涉及商户">
	<view slot="head-actions">
		<view class="select-indicator">
			<view :class="'mount ' + ( params.queryType === '1' ? 'active' : '' )" @tap="changeSpan" data-span="1">
				3个月内
			</view>
			<view class="line"> | </view>
			<view :class="'year ' + ( params.queryType === '2' ? 'active' : '' )" @tap="changeSpan" data-span="2">
				3-6月
			</view>
		</view>
	</view>
	<app-table :totalRow="totalRow" :values="dataList" :columns="columns" @row-column-click="onRowColumnClick"></app-table>
</app-section>
</template>

<script>
// pages/zuyue/zuyue.js
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
        label: "项目",
        key: "shortName",
        color: "#3992BA",
        align: "left"
      }, {
        label: "到期租户数量",
        key: "contNum",
        color: "#FF120D",
        width: "220rpx",
        sortable: true,
        align: "right"
      }, {
        label: "到期面积",
        key: "square",
        width: "180rpx",
        sortable: true,
        align: "right"
      }],
      dataList: [],
      params: {
        queryType: "1"
      },
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
    this.setData({
      params: { ...this.params,
        ...options
      }
    });
    this.getDataList();
  },
  methods: {
    changeSpan(e) {
      let span = e.currentTarget.dataset.span;
      this.setData({
        ["params.queryType"]: span
      });
      this.getDataList();
    },

    async getDataList() {
      this.params.bisProjectId = "";
      let res = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open!selectExpireProjectList.action", this.params);
      this.setData({
        dataList: res.data.slice(1),
        totalRow: res.data.slice(0, 1)[0]
      });
    },

    onRowColumnClick(e) {
		let bisProjectId = null;
		let projectName = null;
		let params = this.params;
		if(e){
			bisProjectId = e.detail.row.bisProjectId;
			projectName = e.detail.row.shortName;
		}
		params.bisProjectId = bisProjectId;
		params.projectName = projectName;
		app.globalData.page.go("./xiangqing/zyxq", params);
    }
  }
};
</script>
<style>
@import "./zuyue.css";
</style>