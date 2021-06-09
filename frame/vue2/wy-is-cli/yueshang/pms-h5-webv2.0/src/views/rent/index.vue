<template>
  <div class="rent" v-webTitle :data-title="`租约到期`">
    <div class="header-top">
      <ys-n-nav-bar :title="`租约到期`" />
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section title="涉及商户" :hasTable="true">
        <div slot="head-actions">
          <div class="list-mode">
            <span :class="'list-mode-item ' + (params.dateType === 1 ? 'active' : '')" @click="onListModeChanged(1)" data-value="day">3月内</span>｜
            <span :class="'list-mode-item ' + (params.dateType === 2 ? 'active' : '')" @click="onListModeChanged(2)" data-value="month">3-6月</span>
          </div>
        </div>
        <ys-n-table :mode="params.dateType.toString()" :fixednum="2" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns" @row-column-click="onRowColumnClick"></ys-n-table>
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
        dateType: 1,
        chargeType: this.$route.query.chargeType,
        projectId: this.$route.query.projectId
      },
      table: {
        totalRow: {},
        dataList: [],
        columns: [{
          label: "序号",
          width: "1.3rem",
          align: "left"
        }, {
          label: "项目",
          key: "name",
          width: "2.5rem",
          color: "#3992BA",
          align: "left"
        }, {
          label: "到期租户数量",
          key: "contNum",
          color: "#FF120D",
          width: "2.9rem",
          sortable: true,
          align: "right"
        }, {
          label: "到期面积(m²)",
          key: "rentSquare",
          sortable: true,
          align: "right",
          numberFormat: true,
          numberPrecision: 2,
        }]
      },

    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    onRefresh () {
      this.isLoading = true
      this.getTableData();
    },
    setIsLoading () {
      this.isLoading = false;
    },
    async getTableData () {
      let res = await this.$axios.rentServe.getTotalDetailData(this.params)
      let dataList = []
      if (res.data && res.data.length > 0) {
        res.data.map(item => {
          if (item.id) {
            dataList.push(item)
          } else {
            this.table.totalRow = item
          }
        })
      }
      this.table.dataList = dataList
      this.$lodash.debounce(this.setIsLoading, 300)()
    },
    onListModeChanged (type) {
      this.params.dateType = type
      this.getTableData()
    },
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
        this.$router.push({
          path: '/rent/detail',
          query: params
        })
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
