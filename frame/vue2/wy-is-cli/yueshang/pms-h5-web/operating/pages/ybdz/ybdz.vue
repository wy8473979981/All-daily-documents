<template>
<app-section title="涉及商户">
    <app-table :totalRow="totalRow" :values="dataList" :columns="columns" @row-column-click="onRowColumnClick"></app-table>
  </app-section>
</template>

<script>
const app = getApp();
import appSection from "@/components/container/section";
import appTable from "@/components/table/index";

export default {
  data() {
    return {
      columns: [{
        label: "序号",
        width: "90rpx"
      }, {
        label: "项目",
        key: "shortName",
        color: "#3992BA",
        align: "left"
      }, {
        label: "累计比例",
        key: "oweVsBondRate",
        width: "180rpx",
        unit: "%",
        sortable: true,
        align: "right"
      }, {
        label: "累计差额(万元)",
        key: "moneySub",
        color: "#FF120D",
        width: "240rpx",
        sortable: true,
        align: "right"
      }],
      dataList: [],
      params: {},
      totalRow: {}
    };
  },

  components: {
    appSection,
    appTable
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uni.setNavigationBarTitle({
      title: "押不抵租"
    });
    this.setData({
      params: options
    });
    this.getDataList();
  },
  methods: {
    async getDataList() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open!selectOweVsBondProjectList.action", this.params);
      console.log(res);
      this.setData({
        dataList: res.data.slice(1),
        totalRow: res.data.slice(0, 1)[0]
      });
    },

    onRowColumnClick(e) {
      let bisProjectId = e.detail.row.bisProjectId;
      let projectName = e.detail.row.shortName;
      let params = this.params;
      params.bisProjectId = bisProjectId;
      params.projectName = projectName;
      app.globalData.page.go("./xiangqing/ybdzxq", params);
    }

  }
};
</script>
<style>
@import "./ybdz.css";
</style>