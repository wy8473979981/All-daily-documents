<template>
  <div class="rent" v-webTitle :data-title="`租约到期-项目`">
    <div class="header-top">
      <ys-n-nav-bar :title="`租约到期-项目`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :selected="selected" @projeSelected="projeSelected" :disabledAll="false"></ys-n-project-select>
            <!-- <ys-n-dialog :projectId="params.projectId"></ys-n-dialog> -->
          </div>
        </div>
      </div>
    </div>
    <ys-n-section title="涉及商户" :hasTable="true">
      <div slot="head-actions">
        <div class="list-mode">
          <span :class="'list-mode-item ' + (params.dateType == 1 ? 'active' : '')" @click="onListModeChanged(1)" data-value="day">3月内</span>｜
          <span :class="'list-mode-item ' + (params.dateType == 2 ? 'active' : '')" @click="onListModeChanged(2)" data-value="month">3-6月</span>
        </div>
      </div>
      <ys-n-table :mode="params.dateType.toString()" :fixednum="2" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns"></ys-n-table>
    </ys-n-section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      leaderDetail: {},
      params: {
        queryType: 3,
        dateType: this.$route.query.dateType ? this.$route.query.dateType : 1 ,
        chargeType: this.$route.query.chargeType,
        projectId: this.$route.query.projectId,
        projectName: this.$route.query.projectName
      },
      table: {
        totalRow: {},
        dataList: [],
        columns: [
          {
            label: "序号",
            width: "1.2rem"
          }, {
            label: "商户名",
            key: "name",
            width: "2.5rem",
            align: "left"
          },/* {
            label: "到期租户数量",
            key: "contNum",
            color: "#FF120D",
            width: "2.9rem",
            sortable: true,
            align: "right"
          }, */{
            label: "到期面积",
            key: "rentSquare",
            sortable: true,
            align: "right",
            numberFormat: true,
            numberPrecision: 2,
          },
		  {
		    label: "到期日",
		    key: "contEndDate",
		    align: "left",
			sortable: true,
		  }
        ]
      },
      selected: {
        label: this.$route.query.projectName,
        projectId: this.$route.query.projectId
      },
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    projeSelected(item) {
      this.setData({
        ["params.projectId"]: (item && item.projectId) || "",
        ["params.projectName"]: (item && item.shortName) || "",
        ["selected.projectId"]: (item && item.projectId) || "",
        ["selected.label"]: (item && item.shortName) || "",
      });
      this.getTableData()
    },
    async getTableData() {
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
    },
    onListModeChanged(type) {
      this.params.dateType = type
      this.getTableData()
    },
    onRowColumnClick(e) {
      let projectId = null;
      let projectName = null;
      let params = this.params;
      if (e) {
        projectId = e.detail.row.id;
        projectName = e.detail.row.name;
      }
      params.projectId = projectId;
      params.projectName = projectName;
      this.$router.push({
        path: '/rent/detail',
        query: { ...params }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.app-header-left {
  display: flex;
}
.list-mode-item {
  font-size: 28px;

  &.active {
    color: #3992ba;
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
