<template>
  <div class="cashForRent" v-webTitle :data-title="`押不抵租`">
    <div class="header-top" :style="!$isWxwork ? 'padding-top:1.2rem':''">
      <ys-n-nav-bar :title="`押不抵租`" />
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section title="涉及商户" :hasTable="true">
        <!-- <div slot="head-actions">
			<div class="list-mode">
			  <span :class="'list-mode-item ' + (params.dateType == 1 ? 'active' : '')" @click="onListModeChanged(1)" data-value="day">3月内</span>｜
			  <span :class="'list-mode-item ' + (params.dateType == 2 ? 'active' : '')" @click="onListModeChanged(2)" data-value="month">3-6月</span>
			</div>
		  </div> -->
        <ys-n-table :fixednum="2" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns" @row-column-click="onRowColumnClick" :mode="params.dateType.toString()"></ys-n-table>
      </ys-n-section>
    </van-pull-refresh>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isLoading: false,
      params: {
        dateType: '',
        chargeType: this.$route.query.chargeType,
        projectId: this.$route.query.projectId,
      },
      table: {
        totalRow: {},
        dataList: [],
        columns: [
          {
            label: "序号",
            width: "1.3rem",
            align: "left"
          }, {
            label: "项目",
            key: "name",
            width: "2.5rem",
            color: "#3992BA",
            align: "left"
          },/*  {
            label: "商户数占比(合同)",
            key: "shopRate",
            color: "#FF120D",
            width: "3.2rem",
            sortable: true,
            align: "right",
            unit: '%'

          }, {
            label: "累计差额(万元)(合同)",
            key: "blanceSubOwe",
			      width: "3.9rem",
            sortable: true,
            align: "right",
            numberFormat: true,
            numberPrecision: 2,
            changeNum: 10000
          }, */ {
            label: "商户数占比(权责)",
            key: "qzShopRate",
            width: "3.4rem",
            sortable: true,
            align: "right",
            numberFormat: true,
            numberPrecision: 2,
            unit: '%'
          }, {
            label: "累计差额(万元)(权责)",
            key: "qzBlanceSubOwe",
            width: "3.9rem",
            sortable: true,
            align: "right",
            numberFormat: true,
            numberPrecision: 2,
            changeNum: 10000
          }
        ]
      },

    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    onRefresh () {
      this.isLoading = true
      this.getTableData()
    },
    setIsLoading () {
      this.isLoading = false;
    },
    async getTableData () {
      let res = await this.$axios.cashForRentServe.getTotalDetailData(this.params)
      let dataList = []
      if (res.data && res.data.length > 0) {
        res.data.map(item => {
          if (item.name == '合计') {
            this.table.totalRow = item
          } else {
            dataList.push(item)
          }
        })
        this.$lodash.debounce(this.setIsLoading, 300)()

      }

      this.table.dataList = dataList
    },
    /* onListModeChanged(type) {
      this.params.dateType = type
      this.getTableData()
    }, */
    onRowColumnClick (e) {
      let projectId = null;
      let projectName = null;
      let params = this.params;
      if (e) {
        projectId = e.detail.row.id;
        projectName = e.detail.row.name;
      }
      if (e.detail.column.key == 'name') {
        params.projectId = projectId;
        params.projectName = projectName;
        this.$router.push({ path: '/cashForRent/detail', query: params })
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.list-mode-item {
  font-size: 28px;

  &.active {
    color: #3992ba;
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
