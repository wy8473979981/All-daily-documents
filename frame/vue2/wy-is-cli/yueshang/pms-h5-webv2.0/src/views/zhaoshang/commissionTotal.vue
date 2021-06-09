<template>
  <div class="home" v-webTitle :data-title="`筹备期全面抽成统计  `">
    <div class="header-top">
      <ys-n-nav-bar :title="`筹备期全面抽成统计`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @selected="dateSelected" :selected="params.yearAndMonth"></ys-n-date-pick>
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section :collapseable="collapseable" :hasTable="true">
        <div class="head-actions_left_view" slot="head-actions_left">
          <ys-n-filter-chart-dialog :label="chartsTitle" :searchList="searchTypeList" @search="searchType" @linkUrl="goLink" :type="'zhaoshang'"></ys-n-filter-chart-dialog>
        </div>
        <ys-n-table :fixednum="2" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns"></ys-n-table>
      </ys-n-section>
    </van-pull-refresh>
  </div>
</template>

<script>

let columns = [{
  label: '序号',
  width: '1.5rem',
  align: 'left'
}, {
  label: '项目',
  key: 'projectName',
  width: '2rem',
  align: 'left'
}, {
  label: '当前合同数',
  key: 'totalNum',
  width: '2.4rem',
  align: 'right',
  sortable: true
}, {
  label: '纯扣',
  key: 'ckNum',
  group: '合同类型',
  width: '1.7rem',
  align: 'right',
  sortable: true
}, {
  label: '纯保底',
  key: 'bdNum',
  group: '合同类型',
  width: '1.7rem',
  align: 'right',
  sortable: true
}, {
  label: '两者取高',
  key: 'qgNum',
  group: '合同类型',
  width: '2rem',
  align: 'right',
  sortable: true
}]
export default {
  name: "reject",
  data () {
    return {
      isLoading: false,
      collapseable: false,
      chartsTitle: "筹备期全面抽成统计",
      selected: {
        projectId: "",
        label: "全部",
      },
      params: {
        offset: 1,
        limit: 100000,
        yearAndMonth: this.$route.query.yearAndMonth || '',
        projectId: '',
        monthId: this.$route.query.yearAndMonth.replace('-', '') || ''
      },
      table: {
        totalRow: null,
        dataList: [],
        columns: columns,
      },
      searchTypeList: [{
        label: "",
        key: "wylx",
        selectedCode: 3,
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
      }]
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
    dateSelected (date) {
      console.log(date);
      this.setData({
        ["params.yearAndMonth"]: date,
        ["params.monthId"]: date.replace('-', ''),
      });
      this.getDataList()
      // },
    },
    async getDataList () {
      let res = await this.$axios.zhaoshangServe.getExtractList(this.params)
      this.isLoading = false
      this.setData({
        "table.dataList": res.data.list.slice(0, -1),
        "table.totalRow": res.data.list.slice(-1)[0],
      });
    },
    searchType () {

    },
    goLink (url) {

      this.$router.push({ path: url, query: { ...this.params } })
    }
  }
}
</script>

<style>
</style>
