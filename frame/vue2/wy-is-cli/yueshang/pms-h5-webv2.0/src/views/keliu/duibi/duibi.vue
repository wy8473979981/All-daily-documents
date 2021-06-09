<template>
  <div class="duibi" v-webTitle :data-title="`对比`">
    <div class="header-top">
      <ys-n-nav-bar :title="`对比`" />
      <div class="app-header">
        <div class="app-header-container" v-if="recovery.show">
          <div class="app-header-left"></div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`date`" @selected="dateSelected" :selected="params.yearMonthDay"></ys-n-date-pick>
            <ys-n-filter-dialog :checkboxes="projectList" @selected="showComparisonList" tip="注意：最少选两项" title="项目筛选"></ys-n-filter-dialog>
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section title="项目排名">
        <div slot="head-actions">
          <div class="list-mode">
            <span :class="'list-mode-item ' + (timeSpan === '2' ? 'active' : '')" @click="changeSpan" data-span="2"> 当日 </span>
            <span class="line"> | </span>
            <span :class="'list-mode-item ' + (timeSpan === '0' ? 'active' : '')" @click="changeSpan" data-span="0"> 当月 </span>
            <span class="line"> | </span>
            <span :class="'list-mode-item ' + (timeSpan === '1' ? 'active' : '')" @click="changeSpan" data-span="1"> 年累计 </span>
          </div>
        </div>
        <ys-n-length-ways :values="dataList" :cross="cross"></ys-n-length-ways>
      </ys-n-section>
      <div class="button-tran" @click="timeFrame"> 时段客流对比图 </div>
    </van-pull-refresh>

  </div>
</template>

<script>

import { yearColumns, monthColumns, dayColumns } from '../columns/duibiColumns'
export default {
  data () {
    return {
      isLoading: false, isLoadingCount: 0,
      yearColumns, monthColumns, dayColumns,
      routerParams: this.$route.query,
      timeSpan: "0",
      dataList: [],
      tableData: [],
      allDataList: [],
      cross: [],
      groups: [],
      projectList: [],
      params: {},
      recovery: { show: true },
    };
  },

  components: {},
  props: {},
  mounted () {
    try {
      this.setData({ params: this.routerParams, cross: this.dayColumns, });
      this.getTableData();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    onRefresh () {
      this.getTableData();
    },
    addIsLoadingCount () {
      this.isLoadingCount++;
    },
    decreaseIsLoadingCount () {
      if (this.isLoadingCount <= 0) return;
      this.isLoadingCount--;
      if (this.isLoadingCount === 0) {
        this.$lodash.debounce(this.setIsLoading, 300)()
      }
    },
    setIsLoading () {
      this.isLoading = false;
    },
    dateSelected (date) {
      try {
        this.setData({ ["params.yearMonthDay"]: date, });
        this.getTableData();
        console.log(date);
      } catch (e) {
        console.log(e);
      }
    },
    changeSpan (e) {
      try {
        const span = e.currentTarget.dataset.span;
        this.setData({ timeSpan: span });
        let newTableDataAry = this.disposeTableData()
        this.setData({ "dataList": newTableDataAry[1], "projectList": newTableDataAry[0], "cross": newTableDataAry[2] });
      } catch (e) {
        console.log(e);
      }
    },

    async getTableData () {
      try {
        this.addIsLoadingCount()
        await this.$axios.keliuServe.queryPassengerFlowForPassengerFlowRanking({ ...this.params })
          .then((res) => {
            this.decreaseIsLoadingCount()
            if (res.code == 1) {
              this.tableData = res.data;
              let newTableDataAry = this.disposeTableData()
              this.setData({ "dataList": newTableDataAry[1], "projectList": newTableDataAry[0], "cross": newTableDataAry[2] });
            }
          });
      } catch (e) {
        console.log(e);
      }
    },

    disposeTableData () {
      let mode = this.timeSpan;
      let projectList = [];
      let dataList = [];
      let allTable = [];
      let cross = [];
      if (mode == '1') {
        allTable = this.tableData.passengerFlowWhenCurYearForPassengerFlowComparisonList;
        cross = yearColumns
      } else if (mode == '0') {
        allTable = this.tableData.passengerFlowWhenCurMonthForPassengerFlowComparisonList;
        cross = monthColumns
      } else if (mode == '2') {
        allTable = this.tableData.passengerFlowWhenCurDayForPassengerFlowComparisonList;
        cross = dayColumns
      }
      allTable.map((item, index) => {
        if (!item.isSummary) {
          let obj = { ...item, ranking: index, label: item.projectName };
          projectList.push(obj)
        }
      })

      dataList = projectList.filter((item) => { return this.params.ids.includes(item.projectId); });

      // console.log([projectList, dataList, cross], '22')
      return [projectList, dataList, cross];
    },

    showComparisonList (e) {
      try {
        let ids = e.detail.map((item) => item.projectId);
        this.setData({ ["params.ids"]: ids, });
        let newTableDataAry = this.disposeTableData()
        this.setData({ "dataList": newTableDataAry[1], "projectList": newTableDataAry[0], "cross": newTableDataAry[2] });
      } catch (e) {
        console.log(e);
      }
    },

    // 跳转到时段客流对比
    timeFrame () {
      try {
        this.$router.push({ path: '/keliu/timeframe', query: { ids: this.params.ids, chargeType: this.routerParams.chargeType } })
      } catch (e) {
        console.log(e);
      }
    },


  },
};
</script>
<style type="text/css" lang="scss" scoped>
.slot-right {
  display: flex;
}
.header-right-select {
  margin-left: 20px;
}
.select-indicator {
  display: flex;
  justify-content: flex-end;
}
.line {
  margin: 0 15px;
}
.active {
  color: #3992ba;
  font-weight: 600;
}
.button-tran {
  width: 570px;
  height: 80px;
  margin: 80px auto 0;
  color: #fff;
  font-size: 34px;
  line-height: 80px;
  text-align: center;
  background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
}
</style>
