<template>
  <div :class="'huiyuan-index '" v-webTitle :data-title="`会员`">
    <div class="header-top">
      <ys-n-nav-bar :title="`会员`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left"></div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @selected="dateSelected" :selected="params.yearMonth"></ys-n-date-pick>
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section title="项目排名" :hasTable="true">
        <div slot="head-actions">
          <div class="list-mode">
            <span :class="'list-mode-item ' + (timeSpan === '0' ? 'active' : '')" @click="changeSpan" data-span="0"> 当月 </span>
            <span class="line"> | </span>
            <span :class="'list-mode-item ' + (timeSpan === '1' ? 'active' : '')" @click="changeSpan" data-span="1"> 年累计 </span>
          </div>
        </div>
        <ys-n-table :mode="timeSpan" :fixednum="2" :totalRow="totalRow" :values="dataList" :columns="columns" @row-column-click="onRowColumnClick"></ys-n-table>
      </ys-n-section>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import { columns } from './columns/columns'

export default {
  data () {
    return {
      isLoading: false, isLoadingCount: 0,
      params: {
        chargeType: "",//物业类型,1购物中心,2商业街,0全部
        yearMonth: "",//年月,格式yyyy-MM
      },
      routerParams: this.$route.query,
      dataList: [],
      href: window.location.href,
      columns: columns,
      totalRow: null,
      timeSpan: "0",
    };
  },
  computed: {
  },
  components: {},
  props: {},
  mounted () {
    try {
      this.params = {
        ...this.params,
        chargeType: this.routerParams.chargeType,
        projectId: this.routerParams.projectId,
        yearMonth: this.routerParams.yearMonth,
      };
      this.getTableData();
    } catch (e) {
      console.log(e)
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
        this.setData({ ["params.yearMonth"]: date, });
        this.getTableData();
        console.log(date);
      } catch (e) {
        console.log(e)
      }
    },
    onRowColumnClick (e) {
      try {
        const { row, column } = e.detail;
        if (column.key === "projectName") {
          let projectId = e.detail.row.id;
          let projectName = e.detail.row.name;

          this.$router.push({
            path: '/huiyuan/detail',
            query: {
              ...this.params,
              projectId: projectId, projectName: projectName, chargeType: this.params.chargeType
            }
          })
          return;
        }
      } catch (e) {
        console.log(e)
      }
    },

    async getTableData () {
      try {
        this.addIsLoadingCount()
        let params = {
          ...this.params,
          queryDate: this.params.yearMonth && this.params.yearMonth.replace('-', ''),//查询年月，格式：yyyyMM
          period: Number(this.timeSpan),//查询周期，0-月度，1-年度
        }
        await this.$axios.homeServe.getMemberList({ ...params }, true)
          .then((res) => {
            this.decreaseIsLoadingCount()
            this.dataList = [];
            if (res.code == 200) {
              if (res.data && res.data.length > 0) {
                let result = res.data.map((item, index) => {
                  return {
                    ...item,
                    ranking: index,
                    label: item.name
                  };
                });
                result.map(item => {
                  if (item.name == "合计") {
                    this.totalRow = item;
                  } else {
                    this.dataList.push(item)
                  }
                })
              }
            }
          });
      } catch (e) {
        console.log(e)
      }
    },

    //切换 年月筛选
    async changeSpan (e) {
      try {
        const span = e.currentTarget.dataset.span;
        if (span === "0") {
          await this.setData({
            timeSpan: span,
          });
        } else {
          await this.setData({
            timeSpan: span,
          });
        }
        this.getTableData()
      } catch (e) {
        console.log(e)
      }
    },
  },
};
</script>
<style type="text/css" lang="scss" scoped>
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
.header {
  height: 100px;
  width: 100%;
  background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 36px;
  justify-content: space-between;
}
.header-right-box {
  display: flex;
}
.header-right-select {
  margin-left: 20px;
}
.tab-list-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 100px 0 100px;
  color: #cdcfd5;
  font-size: 32px;
}
.tab-list-item {
  border-bottom: 5px solid transparent;
  padding-bottom: 20px;
}
.border-current {
  border-color: #fff;
  color: #fff;
}
.registered-channels {
  width: 100%;
}
.slot-right {
  display: flex;
  align-items: center;
}

.comparison {
  width: 76px;
  height: 76px;
  position: fixed;
  line-height: 76px;
  right: 60px;
  bottom: 120px;
  border-radius: 50%;
  background: linear-gradient(340deg, #40b9ed 0%, #0067c7 100%);
  color: #fff;
  text-align: center;
  z-index: 101;
}
</style>
