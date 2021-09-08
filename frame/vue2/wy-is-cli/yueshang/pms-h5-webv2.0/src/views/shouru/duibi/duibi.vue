<template>
  <div class="duibi" v-webTitle :data-title="`对比`">
    <div class="header-top" :style="!$isWxwork ? 'padding-top:1.2rem':''">
      <ys-n-nav-bar :title="`对比`" />

      <div class="app-header">
        <div class="app-header-container" v-if="recovery.show">
          <div class="app-header-left"></div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @selected="dateSelected" :selected="params.yearMonth"></ys-n-date-pick>
            <ys-n-filter-dialog :checkboxes="projectLists" @selected="showComparisonList" tip="注意：最少选两项" title="项目筛选"></ys-n-filter-dialog>
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section title="项目排名">
        <div slot="head-actions">
          <div class="list-mode">
            <span :class="'list-mode-item ' + (timeSpan === '0' ? 'active' : '')" @click="changeSpan" data-span="0"> 当月 </span>
            <span class="line"> | </span>
            <span :class="'list-mode-item ' + (timeSpan === '1' ? 'active' : '')" @click="changeSpan" data-span="1"> 年累计 </span>
          </div>
        </div>
        <ys-n-length-ways :values="dataList" :cross="cross"></ys-n-length-ways>
      </ys-n-section>
    </van-pull-refresh>
  </div>
</template>

<script>

import { yueColumns, nianColumns } from '../columns/duibiColumns'
export default {
  data () {
    return {
      isLoading: false, isLoadingCount: 0,
      routerParams: this.$route.query,
      timeSpan: "0",
      dataList: [],
      allDataList: [],
      cross: [],
      yueColumns: yueColumns,
      nianColumns: nianColumns,
      groups: [],
      projectList: [],
      projectLists: [],
      params: {},
      recovery: { show: true },
    };
  },

  components: {},
  props: {},
  mounted () {
    try {
      let cross = cross = this.yueColumns
      this.setData({ params: this.routerParams, cross, });
      this.getProjectData();
      this.getTableData();
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    onRefresh () {
      this.getProjectData();
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
        this.setData({ ["params.yearMonth"]: date, });
        this.getTableData();
        console.log(date);
      } catch (e) {
        console.log(e)
      }
    },
    changeSpan (e) {
      try {
        const span = e.currentTarget.dataset.span;
        let dataList = JSON.parse(JSON.stringify(this.dataList));
        this.setData({ timeSpan: span, dataList: dataList });

        //   租金收入（项目）、物管收入（项目）
        if (span === "0") {
          this.setData({
            cross: this.yueColumns,
          });
        } else {
          this.setData({
            cross: this.nianColumns,
          });
        }
      } catch (e) {
        console.log(e)
      }
    },

    async getTableData () {
      let projectIdList = this.params.ids.split(',')
      try {
        this.addIsLoadingCount()
        await this.$axios.shouruServe.queryRentFeeProjectList({ ...this.params, projectIdList: projectIdList })
          .then((res) => {
            this.decreaseIsLoadingCount()
            if (res.code == 1) {
              if (res.data && res.data.length > 0) {
                let projectList = res.data.map((item, index) => {
                  return { ...item, label: item.name };
                });
                let result = res.data.filter((item, i) => {
                  console.log(this.params.ids, this.params.ids.includes(item.id), i)
                  return this.params.ids.includes(item.id);
                });
                this.setData({
                  dataList: result,
                  allDataList: res.data,
                  projectList: projectList.slice(1),
                });
              }
            }
          });
      } catch (e) {
        console.log(e)
      }
    },
    async getProjectData () {
      try {
        this.addIsLoadingCount()
        await this.$axios.shouruServe.queryRentFeeProjectList({ ...this.params })
          .then((res) => {
            this.decreaseIsLoadingCount()
            if (res.code == 1) {
              if (res.data && res.data.length > 0) {
                let projectList = res.data.map((item, index) => {
                  return { ...item, label: item.name };
                });
                this.setData({
                  projectLists: projectList.slice(1),
                });
              }
            }
          });
      } catch (e) {
        console.log(e)
      }
    },
    showComparisonList (e) {
      try {
        if (e.detail.length < 2) {
          this.$Toast.fail('最少选两项');
          return;
        }
        let ids = []
        e.detail.map(item => {
          ids.push(item.id)
        })
        this.setData({ ["params.ids"]: ids.join(',') });
        this.getTableData()
        /* let result = this.allDataList.filter((item) => {
          return this.params.ids.includes(item.id);
        });
  	
        this.setData({ dataList: result, }); */
      } catch (e) {
        console.log(e)
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
