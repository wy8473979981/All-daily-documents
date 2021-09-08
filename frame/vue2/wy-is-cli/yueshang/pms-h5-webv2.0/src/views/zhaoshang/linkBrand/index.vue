<template>
  <div class="home" v-webTitle :data-title="`总部联发品牌数据监控 `">
    <div class="header-top" :style="!$isWxwork ? 'padding-top:1.2rem':''">
      <ys-n-nav-bar :title="`总部联发品牌数据监控 `" />
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

let columnList = [{
  label: '序号',
  width: '1.5rem',
  align: 'left'
}, {
  label: '业态',
  key: 'primaryForms',
  width: '2rem',
  align: 'left',
  fixed: true
}, {
  label: '品牌集团名称',
  key: 'companyName',
  width: '2.5rem',
  align: 'left'
}, {
  label: '合作品牌',
  key: 'cooperativeBrand',
  width: '2.5rem',
  color: '#3B96BE',
  align: 'left'
}, {
  label: '商家级别',
  key: 'businessLevel',
  width: '2rem',
  align: 'right',
  sortable: true
}, {
  label: '合作数量',
  key: 'cooperationProjectNumber',
  width: '2rem',
  align: 'right',
  sortable: true
}, {
  label: '合作项目',
  key: 'cooperationProject',
  width: '2rem',
  align: 'left',
  ellipsis: '合作项目'
}, {
  label: '合作租赁面积(㎡)',
  key: 'cooperationRentArea',
  width: '3.2rem',
  align: 'right',
  sortable: true
}, {
  label: '欠费情况(元)',
  key: 'owes',
  width: '2.6rem',
  align: 'right',
  sortable: true,
  color: "#FF4954"
}]
export default {
  name: "Home",
  data () {
    return {
      isLoading: false,
      searchTypeList: [{
        label: "",
        key: "wylx",
        selectedCode: 5,
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
      chartsTitle: "总部联发品牌数据监控",
      params: {
        /* chargeType: "0",
        projectId: null,
        projectName: null,
        yearMonth:'',
        menuType: 1 */
        offset: 1,
        limit: 200,
        yearAndMonth: '',
        projectId: '',
        projectName: ''
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
    searchType (item) { },
    onRowColumnClick (e) {
      this.$router.push({ path: '/zhaoshang/linkBrand/detail', query: { ...this.params, cooperativeBrand: e.detail.row.cooperativeBrand } })
    },
    async getDataList () {
      let res = await this.$axios.zhaoshangServe.getBrandList(this.params)
      this.isLoading = false
      this.setData({
        "table.dataList": res.data.list,
      });
    },
    goLink (url) {
      this.$router.push({ path: url, query: { ...this.params } })
    }
  }
}
</script>

<style>
</style>
