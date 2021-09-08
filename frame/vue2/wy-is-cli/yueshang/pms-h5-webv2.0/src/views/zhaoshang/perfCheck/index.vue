<template>
  <div class="home" v-webTitle :data-title="`招商业绩考核 `">
    <div class="header-top" :style="!$isWxwork ? 'padding-top:1.2rem':''">
      <ys-n-nav-bar :title="`招商业绩考核 `" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :moduleName="'zhaoshang'" :selected="selected" @projeSelected="projeSelected" :dilogShow="false" :disabledAll="true"></ys-n-project-select>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year`" @selected="dateSelected" :selected="params.queryYear"></ys-n-date-pick>
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section :collapseable="collapseable" :hasTable="true">
        <div class="head-actions_left_view" slot="head-actions_left">
          <ys-n-filter-chart-dialog :label="chartsTitle" :searchList="searchTypeList" @search="searchType" @linkUrl="goLink" :type="'zhaoshang'"></ys-n-filter-chart-dialog>
        </div>
        <ys-n-table :fixednum="2" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns" @row-column-click="onRowColumnClick"></ys-n-table>
      </ys-n-section>
    </van-pull-refresh>
  </div>
</template>

<script>

const columnList = [{
  label: '序号',
  width: '1.5rem',
  align: 'left'
}, {
  label: '项目',
  key: 'bisProjectName',
  width: '2rem',
  color: '#3B96BE',
  align: 'left',
  fixed: true
}, {
  label: '实际计租面积(㎡)',
  key: 'rentArea',
  width: '3.2rem',
  align: 'right',
  sortable: true
}, {
  label: '占比',
  key: 'rentAreaRatio',
  width: '1.7rem',
  align: 'right',
  sortable: true
}, {
  label: '实际品牌数',
  key: 'brandNumber',
  width: '2.4rem',
  align: 'right',
  sortable: true
}, {
  label: '占比',
  key: 'brandNumberRatio',
  width: '1.7rem',
  align: 'right',
  sortable: true
}]
export default {
  name: "Home",
  data () {
    return {
      isLoading: false,
      searchTypeList: [{
        label: "",
        key: "wylx",
        selectedCode: 4,
        values: [{
          name: "筹备招商进度",
          url: "/zhaoshang/process/index",
          code: 1
        },
        {
          name: "筹备期网批驳回率统计",
          url: "/zhaoshang/reject",
          code: 2
        },
        {
          name: "筹备期全面抽成统计",
          url: "/zhaoshang/commissionTotal",
          code: 3
        },
        {
          name: "招商业绩考核",
          url: "/zhaoshang/perfCheck/index",
          code: 4
        },
        {
          name: "总部联发品牌数据监控",
          url: "/zhaoshang/linkBrand/index",
          code: 5
        },
        {
          name: "已招租金达成率柱状图",
          url: "/zhaoshang/rentCompletRate",
          code: 6
        },
        {
          name: "进场审图进度-品牌数",
          url: "/zhaoshang/brandNum",
          code: 7
        },
        {
          name: "待开业项目招商进度-品牌数",
          url: "/zhaoshang/noMakebusinessBrandNum",
          code: 8
        },
        ],
      }],
      collapseable: false,
      chartsTitle: "招商业绩考核",
      selected: {
        projectId: this.$route.query.projectId || '',
        label: this.$route.query.projectName || "全部",
      },
      params: {
        /* chargeType: "0",
        projectId: null,
        projectName: null,
        yearMonth:'',
        menuType: 1 */
        offset: 1,
        limit: 200,
        conditionType: 1,
        menuType: 1,
        queryYear: this.$route.query.yearAndMonth ? this.$route.query.yearAndMonth : this.$util.getDefaultDate("year"),
        projectId: this.$route.query.projectId || '',
        projectName: this.$route.query.projectName
      },
      table: {
        totalRow: null,
        dataList: [],
        columns: columnList
      },
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    onRefresh () {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 0)
      this.getDataList()
    },
    projeSelected (item) {
      console.log(item);
      this.setData({
        ["params.projectId"]: (item && item.projectId) || "",
        ["params.projectName"]: (item && item.shortName) || "",
      });
      this.getDataList()
    },
    dateSelected (date) {
      console.log(date);
      this.setData({
        ["params.queryYear"]: date,
      });
      this.getDataList()
      // },
    },
    searchType (item) { },
    onRowColumnClick (e) {
      this.$router.push({ path: '/zhaoshang/perfCheck/detail', query: { ...this.params } })
    },
    async getDataList () {
      let res = await this.$axios.zhaoshangServe.getPerfListTableData(this.params)
      this.isLoading = false
      this.setData({
        "table.dataList": res.data.list
      });
    },
    goLink (url) {
      this.$router.push({ path: '/zhaoshang/perfCheck/detail', query: { ...this.params, yearAndMonth: this.params.queryYear } })
    }
  },
}
</script>

<style>
</style>
