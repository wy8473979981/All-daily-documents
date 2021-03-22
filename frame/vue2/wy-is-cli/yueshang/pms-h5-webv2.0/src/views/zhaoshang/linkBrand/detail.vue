<template>
  <div class="home" v-webTitle :data-title="`招商业绩考核 `">
    <div class="header-top">
      <ys-n-nav-bar :title="`招商业绩考核 `" />
    </div>
    <ys-n-section :title="chartsTitle" :collapseable="collapseable">
      <div class="head-actions_left_view" slot="head-actions_left">
        <!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
        <!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
        <ys-n-filter-chart-dialog :searchList="searchTypeList" @search="searchType" :leftLink="true" @linkUrl="goLink"></ys-n-filter-chart-dialog>
      </div>
      <ys-n-table :fixednum="1" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns"></ys-n-table>
    </ys-n-section>
  </div>
</template>

<script>

let currentYear = new Date().getFullYear()
let prevOneYear = currentYear - 1
let prevTwoYear = currentYear - 2
let columnList = [{
  label: '序号',
  width: '1.5rem',
  align: 'left'
}, {
  label: '业态',
  key: 'primaryForms',
  width: '2.2rem',
  align: 'left'
}, {
  label: '品牌名称',
  key: 'cooperativeBrand',
  width: '2.2rem',
  align: 'left'
}, {
  label: '项目',
  key: 'bisProjectName',
  width: '2.2rem',
  align: 'left'
}, {
  label: '铺位号',
  key: 'storeNo',
  width: '2.5rem',
  align: 'left'
}, {
  label: '租赁面积(㎡)',
  key: 'rentArea',
  width: '2.6rem',
  align: 'right',
  sortable: true
}, {
  label: '签约日',
  key: 'signDate',
  width: '2.5rem',
  align: 'right',
  sortable: true
}, {
  label: '到期日',
  key: 'expiringDate',
  width: '2.5rem',
  align: 'right',
  sortable: true
}, {
  label: '免租期',
  key: 'rentFreePeriod',
  width: '2.5rem',
  align: 'left'
}, {
  label: '租金(元)',
  key: 'rentMoneys',
  width: '2rem',
  align: 'right',
  sortable: true
}, {
  label: '物业费(元)',
  key: 'mgrMoneys',
  width: '2.2rem',
  align: 'right',
  sortable: true
}, {
  label: `${prevTwoYear}年`,
  key: 'historicalAnnualPerformance2018s',
  width: '2.4rem',
  align: 'right',
  sortable: true,
  group: '历史年业绩(万)'
}, {
  label: `${prevOneYear}年`,
  key: 'historicalAnnualPerformance2019s',
  width: '2.4rem',
  align: 'right',
  sortable: true,
  group: '历史年业绩(万)'
}, {
  label: `${currentYear}年年累计 营业额(万)`,
  key: 'accumulatedTurnover2020s',
  width: '5rem',
  align: 'right',
  sortable: true
}]
export default {
  name: "Home",
  data() {
    return {
      searchTypeList: [{
        label: "",
        key: "wylx",
        selectedCode: 5,
        values: [{
          name: "筹备招商进度",
          url: "/zhaoshang/process/index",
        },
        {
          name: "筹备期网批驳回率统计",
          url: "/zhaoshang/reject",
        },
        {
          name: "筹备期全面抽成统计",
          url: "/zhaoshang/commissionTotal",
        }, // {
        // 	label: "项目铺位分解",
        // 	url: "/pages/zhaoshang/pwfj/pwfj"
        // },
        {
          name: "招商业绩考核",
          url: "/zhaoshang/perfCheck/index",
        },
        {
          name: "总部联发品牌数据监控",
          url: "/zhaoshang/linkBrand/index",
          code: 5
        },
        {
          name: "已招租金达成率柱状图",
          url: "/zhaoshang/rentCompletRate",
        },
        {
          name: "进场审图进度-品牌数",
          url: "/zhaoshang/brandNum",
        },
        {
          name: "待开业项目招商进度-品牌数",
          url: "/zhaoshang/noMakebusinessBrandNum",
        },
        ],
      }],
      collapseable: false,
      chartsTitle: "总部联发品牌数据监控-明细",
      params: {
        offset: 1,
        limit: 200,
		cooperativeBrand:this.$route.query.cooperativeBrand,
		yearAndMonth:'',
		projectId:'',
		projectName:''
      },
      table: {
        totalRow: null,
        dataList: [],
        columns: columnList
      },
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    searchType(item) { },
    async getDataList() {
      let res = await this.$axios.zhaoshangServe.getBrandList(this.params)
      this.setData({
        "table.dataList": res.data.list,
      });
    },
    goLink(url) {
      this.$router.push({ path: url, query: this.params })
    }
  }
}
</script>

<style>
</style>
