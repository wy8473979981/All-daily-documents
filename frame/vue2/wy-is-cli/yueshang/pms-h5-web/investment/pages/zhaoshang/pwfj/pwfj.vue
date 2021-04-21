<template>
<view>
<app-header>
  <app-project-selector @selected="onProjectSelected"></app-project-selector>
</app-header>
<app-section>
  <view slot="head-title">
    <view class="selector">
      <app-catalogue title="项目铺位分解"></app-catalogue>
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
import appCatalogue from "../../../components/catalogue/index";

export default {
  data() {
    return {
      columns: [{
        label: '序号',
        width: '100rpx',
        align: 'left'
      }, {
        label: "项目",
        key: "projectName",
        width: "200rpx",
        group: "基本信息",
        align: "left"
      }, {
        label: "铺位号",
        key: "storeNo",
        width: "240rpx",
        group: "基本信息",
        align: "left",
        ellipsis: "铺位号"
      }, {
        label: "业态",
        key: "businessFrom",
        width: "200rpx",
        group: "基本信息",
        align: "left"
      }, // {
      // 	label: "建筑面积",
      // 	key: "projectName",
      // 	width: "200rpx",
      // 	group: "基本信息",
      // },
      {
        label: "计租面积",
        key: "rentSquare",
        width: "140rpx",
        group: "基本信息",
        align: "right",
        sortable: true
      }, {
        label: "主谈人",
        key: "chiefNegotiator",
        width: "200rpx",
        group: "任务指标分解",
        align: "left"
      }, {
        label: "配合人",
        key: "supportStaff",
        width: "200rpx",
        group: "任务指标分解",
        align: "left"
      }, {
        label: "目标完成月份",
        key: "targetDate",
        width: "200rpx",
        group: "任务指标分解",
        align: "left"
      }, {
        label: "计划完成时间",
        key: "planDate",
        width: "200rpx",
        group: "任务指标分解",
        align: "left"
      }, {
        label: "实际完成时间",
        key: "actualDate",
        width: "200rpx",
        group: "任务指标分解",
        align: "left"
      }, {
        label: "差异",
        key: "differenceDays",
        width: "200rpx",
        group: "任务指标分解",
        align: "right",
        sortable: true
      }],
      rows: [],
      totalRow: null,
      params: {
        offset: 1,
        limit: 500,
        projectId: ""
      }
    };
  },

  components: {
    appHeader,
    appDatePicker,
    appTable,
    appSection,
    appProjectSelector,
    appCatalogue
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
      let res = await app.globalData.request.get("/api/v1/report/bis/investments/attractions/performances/assessments/bigs/list", this.params);
      this.setData({
        rows: res.data.list
      });
    },

    onProjectSelected(e) {
      this.setData({
        ["params.projectId"]: e.detail.value.bisProjectId
      });
      this.getDataList();
    }

  }
};
</script>
<style>
@import "./pwfj.css";
</style>