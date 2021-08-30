<template>
<view class="kaiye-details">
  <app-header @tab-changed="onTabChanged">
    <app-project-selector @selected="onProjectSelected" :selected="selected" disabled-all></app-project-selector>
  </app-header>
  <app-section title="空铺排名">
    <app-table :values="dataList" :columns="columns" :totalRow="totalRow" :selected="tableSelected" @row-column-click="onRowColumnClick"></app-table>
  </app-section>
</view>
</template>

<script>
// pages/kaiye/kongpu/kongpu.js
const app = getApp();
import appSection from "@/components/container/section";
import appTable from "@/components/table/index";
import appProjectSelector from "@/components/selector/project";
import appHeader from "@/components/common/header";

export default {
  data() {
    return {
      params: {
        bisProjectId: null,
        storeType: "",
        squareFlag: "",
        stage: "",
        operateArea: "",
        provinceCd: "",
        queryBeginDate: "",
        queryEndDate: ""
      },
      columns: [{
        label: "序号",
        width: "90rpx"
      }, {
        label: "铺位号",
        width: "250rpx",
        key: "storeNo"
      }, {
        label: "空铺面积",
        key: "square",
        sortable: true,
        align: "right"
      }, {
        label: "空铺天数",
        key: "emptyDay",
        sortable: true,
        width: "150rpx",
        align: "right"
      }],
      groups: [],
      group: {
        selected: []
      },
      dataList: [],
      //数据列表
      totalRow: null //合计数据

    };
  },

  components: {
    appSection,
    appTable,
    appProjectSelector,
    appHeader
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ["params.bisProjectId"]: options.bisProjectId,
      ["params.queryBeginDate"]: options.yearMonth,
      ["params.queryEndDate"]: options.yearMonth,
      ["selected.label"]: options.projectName,
      ["selected.value"]: options.bisProjectId,
      ["params.storeType"]: options.storeType
    });
    this.loadData();
  },
  methods: {
    onProjectSelected(e) {
      let bisProjectId = e.detail.value.bisProjectId;
      this.setData({
        ["params.bisProjectId"]: bisProjectId
      });
      this.loadData();
    },

    //获取数据
    async loadData() {
      let res = await app.globalData.request.options({
        loading: true
      }).get(`/open/bis-open!selectEmptyStoreList.action?bisProjectId=${this.params.bisProjectId}&storeType=${this.params.storeType}`);

      if (res.data) {
        this.setData({
          dataList: res.data.slice(1, -1).map((item, index) => {
            return { ...item,
              ranking: index + 1
            };
          }),
          totalRow: res.data.slice(0)[0]
        });
      }
    }

  }
};
</script>
<style>
@import "./kongpu.css";
</style>