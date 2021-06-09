<template>
  <div
    class="page"
    id="page"
    v-loading.lock="loading"
    :class="{ 'overflow-hidden': loadingLock }"
  >
    <div class="page-title">
      <div class="page-title__main">{{ $route.meta.title }}</div>
      <div class="page-title__sub" v-show="subTitle">{{ subTitle }}</div>

      <slot name="title"></slot>
    </div>

    <div class="page-list" v-if="showList">
      <ys-n-list :config="rateConfig" :list="rateList" />
    </div>

    <div class="page-search">
      <ys-n-search
        v-model="currentFormData"
        :update="updateForm"
        :config="formConfig"
        :showExport="showExport"
        @search="handleSearch"
        @reset="handleReset"
        @export="handleExport"
        @change="handleFormChange"
      />
    </div>

    <div class="page-echart" v-if="showChart && pageHeight">
      <ys-n-chart
        :type="chartType"
        :x="chartX"
        :data="chartData"
        :title="chartTitle"
        :subTitle="chartSubTitle"
        :legend="chartLegend"
        :unit="chartUnit"
      />
    </div>

    <div class="page-table" id="table-content" v-if="pageHeight">
      <div class="fix-btn" v-if="false">
        <div class="full-screen" @click="fullScreen" v-show="!isFull">
          <i class="el-icon-full-screen"></i>
        </div>
        <div class="exit-screen" @click="exitFullScreen" v-show="isFull">
          <i class="el-icon-switch-button"></i>
        </div>
      </div>
      <ys-n-table
        :config="tableConfig"
        v-model="currentTableData"
        mouseMove
        :hasPagination="hasPagination"
        :totals="totals"
        :initialize="initialize"
        @sort-change="sortChange"
        @table-page-change="tablePageChange"
        :max-height="pageHeight"
      ></ys-n-table>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import queryFormatterMixins from '@/mixins/queryFormatterMixins'
export default {
  name: 'YsNContainer',

  mixins: [queryFormatterMixins],

  props: {
    showList: {
      // 是否有列表组件
      type: Boolean,
      default: false,
    },
    rateConfig: Array, // 列表组件配置

    showChart: {
      // 是否有图表组件
      type: Boolean,
      default: false,
    },
    chartX: Array, // 图表组件 x轴 配置
    chartTitle: String, // 图表组件 标题
    chartSubTitle: String, // 图表组件 标题辅助说明文字
    chartType: { // 图表组件类型
      type: String,
      default: 'line',
    },
    chartUnit: { // 图表组件数据单位
      type: String,
      default: ''
    },

    tableConfig: Array, // 表格组件配置
    tableData: Array, // 表格组件数据
    hasPagination: Boolean, // 是否需要分页
  },

  data() {
    return {
      rateList: {},

      chartLegend: [],
      chartData: [],

      currentTableData: [],
      originTableData: [],

      pageHeight: 0, // table 默认高度

      isFull: false, // 是否全屏
      // isPostMessage: false, // 是否使用了postmessage

      totals: 0, // 总页数
      initialize: 1, // 更新table
    };
  },

  created() {
    console.log('created')

    this.handleDataBefortLoad();
  },

  beforeDestroy() {
    // window.removeEventListener('message', this.getMessage)
  },

  mounted() {
    this.pageHeight = document.querySelector('#page').offsetHeight - 20 || 300;

    // window.onresize = function() {
    //   this.isFull = !!(document.webkitIsFullScreen || document.mozFullScreen ||
    //       document.msFullscreenElement || document.fullscreenElement
    //   ); //!document.webkitIsFullScreen都为true。因此用!!
    // }
  },

  methods: {
    getMessage(event) {
      console.log('post message')
      if (event.data.formData) {
        this.currentFormData = Object.assign(this.currentFormData, event.data.formData);
        this.updateForm++;
      }
      // this.isPostMessage = true;
      this.fecthData()
      window.removeEventListener('message', this.getMessage, false)
    },

    // 更新数据
    fecthData() {
      this.loading = true;
      this.loadingLock = true;
      const sendData = this.beforeSearchModifyFormData(this.beforeSearch(cloneDeep(this.currentFormData)));

      let requestArr = [this.requestConfig.query.api(sendData)];
      if (this.requestConfig.echarts && this.requestConfig.echarts.api) {
        requestArr.push(this.requestConfig.echarts.api(sendData));
      }

      Promise.all(requestArr)
        .then(([queryData, echartsList]) => {
          // 处理返回值
          const responeData = this.asyncBefortTableUpdate
            ? this.asyncBefortTableUpdate(queryData)
            : queryData;

          // 处理tablelist
          let rk = this.requestConfig.query.responseKey || '';
          let tableData = (rk ? responeData[rk] : responeData) || [];

          this.currentTableData = this.sortTable(tableData);
          this.originTableData = cloneDeep(this.currentTableData);

          this.$emit('update:tableData', cloneDeep(this.currentTableData))

          // 分页
          if (this.hasPagination) {
            this.totals = responeData.total
          }

          // 处理echartsList
          if (this.showChart) {
            // 有接口请求的
            if (echartsList && echartsList.length) {
              this.updateEcharts(echartsList);
            } else {
              // 跟table一个接口返回的
              const echartsListData =
                responeData[this.requestConfig.echarts.responseKey] || [];
              this.updateEcharts(echartsListData);
            }
          }

          // 处理列表
          if (this.requestConfig.list) {
            let rk = this.requestConfig.list.responseKey || '';
            this.rateList = (rk ? responeData[rk] : responeData) || {};
          }
        })
        .finally(() => {
          this.loading = false;
          setTimeout(() => {
            this.loadingLock = false;
          }, 200);
        });
    },

    // 分页切换
    tablePageChange(val) {
      console.log(val)
      this.currentFormData.currentPage = val

      this.fecthData();
    },

    //  更新图表数据
    updateEcharts(echartsList) {
      // 字段定义 currYear lastYear 今年 去年 年份的字段， currData lastData 今年 去年的数据，
      const {
        currYear,
        lastYear,
        currData,
        lastData,
      } = this.requestConfig.echarts.keys;
      const firstData = echartsList[0];
      if (!firstData) return;

      this.chartLegend = [`${firstData[currYear]}`, `${firstData[lastYear]}`];
      this.chartData = [
        {
          name: `${firstData[currYear]}`,
          type: 'line',
          data: echartsList.map((item) => item[currData]),
        },
        {
          name: `${firstData[lastYear]}`,
          type: 'line',
          data: echartsList.map((item) => item[lastData]),
        },
      ];
    },

    // 搜索
    handleSearch() {
      this.defaultTableAction()
      this.fecthData();
    },

    // 重置
    handleReset() {
      this.defaultTableAction()
      this.fecthData();
    },

    // table 默认行为
    defaultTableAction() {
      if (!this.hasPagination) return
      this.currentFormData.currentPage = 1;
      this.currentFormData.pageSize = 300;
      this.initialize++
    },

    // 有汇总的，汇总排第一行
    sortTable(data) {
      let tableData = [...data];
      const summaryIndex = tableData.findIndex((item) => item.isSummary);
      if (summaryIndex !== -1) {
        const summaryData = tableData[summaryIndex];
        tableData.splice(summaryIndex, 1);
        tableData.unshift(summaryData);
      }
      let idx = 1;
      tableData = tableData.map((item) => {
        if (!item.isSummary) {
          return Object.assign(item, { sortIndex: idx++ });
        }
        return item;
      });
      return tableData;
    },

    // 排序发生改变时, 自定义排序
    sortChange({ prop, order }) {
      let tableData = cloneDeep(this.currentTableData);
      if (order) {
        tableData.sort((pre, cur) => {
          if (order === 'ascending') {
            return pre[prop] > cur[prop] ? 1 : '-1';
          } else {
            return cur[prop] > pre[prop] ? 1 : '-1';
          }
        });
        this.currentTableData = this.sortTable(tableData);
      } else {
        this.currentTableData = this.originTableData;
      }
      return order;
    },

    // 打开全屏
    fullScreen() {
      var element = document.querySelector('#table-content');
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      }
      this.isFull = true;
    },

    // 退出全屏
    exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      this.isFull = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.page.overflow-hidden {
  overflow: hidden;
}

.page-table {
  position: relative;

  .fix-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    height: 20px;
    display: flex;
    z-index: 9;
    font-size: 18px;
    transition: transform 0.5s;
    font-weight: bolder;
    // background: rgba(0, 0, 0, .3);
    padding: 4px;
    color: $font-record-color;

    &:hover {
      transform: scale(1.5);
    }
  }
}

// mask loading
.page {
  ::v-deep .el-loading-mask {
    height: 10000px;

    .el-loading-spinner {
      top: 350px;
    }
  }
}

.title-right {
  flex: 1;
  justify-content: flex-end;
  display: flex;
}
</style>
