<template>
<!--pages/dev/tianda/index.wxml-->
<app-table @sort="sort" :values="dataList" :cols="cols" :totalRow="totalRow"></app-table>
</template>

<script>
import appTable from "@/components/table/table";

export default {
  data() {
    return {
      dataList: [{
        ranking: 4,
        // projecName: "上海1",
        name: "悦商",
        relative: "12.85%"
      }, {
        ranking: 2,
        projecName: "上海2",
        relative: "38.65%"
      }, {
        ranking: 3,
        projecName: "上海3",
        relative: "43.7%"
      }],
      cols: [{
        label: "序号",
        key: "ranking",
        standbyKey: "rank",
        unit: "",
        sort: true,
        width: "120rpx"
      }, {
        label: "项目名称",
        key: "projecName",
        standbyKey: "name",
        unit: "",
        sort: false
      }, {
        label: "环比",
        key: "relative",
        standbyKey: "name",
        unit: "",
        sort: true,
        width: "120rpx"
      }],
      totalRow: {
        projecName: "合计",
        relative: "52.35%"
      }
    };
  },

  components: {
    appTable
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  methods: {
    sort(e) {
      let key = e.detail.key;
      let direction = e.detail.direction;
      let dataList = this.dataList;

      if (direction === "up") {
        dataList.sort((a, b) => {
          return parseFloat(a[key]) - parseFloat(b[key]);
        });
      } else if (direction === "down") {
        dataList.sort((a, b) => {
          return parseFloat(b[key]) - parseFloat(a[key]);
        });
      }

      this.setData({
        dataList
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>