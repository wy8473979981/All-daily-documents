<template>
  <div :class="'shouru-zujin ' + (recovery.show ? 'recovery' : '')" v-webTitle :data-title="`招商信息-项目`">
    <div class="header-top">
      <ys-n-nav-bar :title="`招商信息-项目`" />
      <div class="app-header">
        <!-- <div v-show="recovery.show" class="redress_error_edit"> 纠错编辑 </div> -->
        <div class="app-header-container" v-show="!recovery.show">
          <div class="app-header-left">
            <ys-n-project-select :moduleName="'yysj'" :selected="selected" @projeSelected="projeSelected"></ys-n-project-select>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`date`" @selected="dateSelected" :selected="params.yearMonthDay"></ys-n-date-pick>
            <ys-n-filter-dialog :groups="groups" @selected="bindselected" title="筛选" @open="bindopen" @close="bindclose"></ys-n-filter-dialog>
            <!-- <ys-n-redress-error :type="params.feeType" @onRecoveryClick="onRecoveryClick" v-show="params.feeType !== '3'"></ys-n-redress-error> -->
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section title="开业率" :collapseable="true" v-show="!recovery.show && !show">
        <div class="registered-channels">
          <ys-n-echart :options="lineops"></ys-n-echart>
        </div>
      </ys-n-section>
      <ys-n-section title="项目排名" :hasTable="true">
        <ys-n-table :fixednum="1" :totalRow="totalRow" :values="dataList" :columns="columns" :selected="tableSelected" @row-column-click="onRowColumnClick"></ys-n-table>
      </ys-n-section>
      <div class="recovery-actions" v-if="recovery.show">
        <!-- 纠错编辑 取消 和 提交 -->
        <div class="recovery-actions__action" @click="cancelRecovery">取消</div>
        <div class="recovery-actions__action recovery-actions__action--priamry" @click="postRecovery">提交</div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>

import { mapMutations, mapGetters } from "vuex";
const columns = [
  {
    label: "月份",
    key: "yearMonth",
    width: "2rem",
    align: "left"
  }, {
    label: "开业率",
    key: "openRate",
    width: "2.333rem",
    sortable: true,
    align: "right",
    numberFormat: true,
    numberPrecision: 2,
    unit: '%'
  }, {
    label: "开业率同比",
    key: "openRateTb",
    sortable: true,
    width: "2.75555rem",
    align: "right",
    numberFormat: true,
    numberPrecision: 2,
    unit: '%'
  }, {
    label: "出租率",
    key: "leaseRate",
    width: "2.34444rem",
    sortable: true,
    align: "right",
    numberFormat: true,
    numberPrecision: 2,
    unit: '%'
  }, {
    label: "空铺面积(㎡)",
    key: "emptyRentSquare",
    sortable: true,
    align: "right",
    width: "2.88888rem",
    numberFormat: true,
    numberPrecision: 2
  }
];
export default {
  data () {
    return {
      isLoadingCount: 0,
      isLoading: false,
      totalRow: {},
      dataList: [],
      columns: columns,
      tableSelected: {
        key: "id",// 列表数据的 id
        keysMap: {},
      },
      lineops: {
        decimals: "xiaoshoupaiming",
        unit: "%",
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        },
        yAxis: {
          type: "value",
          boundaryGap: false,
        },
        series: [{
          type: "line",
          lineStyle: {
            color: "#3AABFF",
          },
          areaStyle: {
            normal: { //自定义颜色，渐变色填充折线图区域
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, //变化度
                //渐变色
                //渐变色
                [{
                  offset: 0,
                  color: 'rgba(45, 159, 203, 0.2)'
                }, {
                  offset: 0.62,
                  color: 'rgba(255, 255, 255, 0.48)'
                }]),
            }
          },
        },
        {
          type: "line",
          lineStyle: {
            color: "#9BB3C6",
          },
        },
        ],
      },
      params: {
        chargeType: this.$route.query.chargeType,//物业类型,1购物中心,2商业街,0全部
        stage: this.$route.query.stage,
        yearMonth: this.$route.query.yearMonth,//年月,格式yyyy-MM
        yearMonthDay: this.$route.query.yearMonthDay ? this.$route.query.yearMonthDay : this.$util.getDefaultDate('day'),
        projectId: this.$route.query.projectId,
        projectName: this.$route.query.projectName
      },
      recovery: {
        show: false,
        selected: {},
        current: {},
      },
      show: false,
      groups: [],
      selected: [],
      routerParams: this.$route.query,
    }
  },
  computed: {
    ...mapGetters(['getGroups']),
  },
  created () {
    let { projectName, projectId } = this.routerParams;
    let selected = { label: projectName, projectId: projectId, };
    this.setData({
      selected,
    });
    this.getEchartData();
    this.getTableData();
  },
  mounted () {
    this.setData({
      "groups": [this.getGroups]
    });
  },
  methods: {
    onRefresh () {
      this.isLoading = true
      this.getEchartData();
      this.getTableData();
    },
    setIsLoading () {
      this.isLoading = false;
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
    dateSelected (date) {
      this.setData({ ["params.yearMonth"]: date.split('-')[0] + '-' + date.split('-')[1] });
      this.setData({ ["params.yearMonthDay"]: date });
      this.getEchartData();
      this.getTableData();
      console.log(date);
    },
    bindselected (e) {
      e.detail.forEach((item) => {
        let temp = item.split("-");
        let key = temp[0];
        let value = temp[1];
        if (key === "chargeType") {
          this.setData({
            ["params.chargeType"]: value,
          });
        }

        if (key === "stage") {
          this.setData({
            "params.stage": value,
          });
        }
      });
      this.getEchartData();
      this.getTableData();
    },
    bindopen () {
      this.show = true;
    },
    bindclose () {
      this.show = false;
    },
    onRecoveryClick () {
      this.setData({
        "recovery.show": true,
        "recovery.current": JSON.parse(JSON.stringify(this.recovery.selected)),
      });
      this.getEchartData();
      this.getTableData();
    },
    async getEchartData () {
      this.addIsLoadingCount()
      const year = this.params.yearMonth.split("-")[0];
      const lastYear = String(year - 1);
      const legendData = [year.substring(2) + "年度", lastYear.substring(2) + "年度"];
      this.params.squareFlag = 1
      let res = await this.$axios.makeBusinessServe.geteEchartData(this.params)
      this.decreaseIsLoadingCount()
      let openRates = []
      let openRateLasts = []
      res.data.map(item => {
        if (item.openRate || item.openRate === 0) {
          openRates.push(item.openRate)
        }
        openRateLasts.push(item.openRateLast)
      })
      this.setData({
        "lineops.legend.data": legendData,
        "lineops.series[0].name": legendData[0],
        "lineops.series[1].name": legendData[1],
        "lineops.series[0].data": openRates,//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        "lineops.series[1].data": openRateLasts,//[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
      })
    },
    async getTableData () {
      this.addIsLoadingCount()
      let res = await this.$axios.makeBusinessServe.getDetailTable(this.params)
      this.decreaseIsLoadingCount()
      let data = res.data
      /* data.map(item => {
        item.month = item.yearMonth ? item.yearMonth.split('-')[1] : ''
      item.month = parseInt(item.month)
      }) */
      this.dataList = data.filter(item => !item.summary)
      this.totalRow = data.filter(item => item.summary)[0]
    },
    onRowColumnClick (e) {
      const { show, selected } = this.recovery;
      const { row, column } = e.detail;
      if (show) {
        const rowKey = this.tableSelected.key;
        if (!selected[row[rowKey]]) {
          selected[row[rowKey]] = [];
        }
        if (selected[row[rowKey]].includes(column.key)) {
          selected[row[rowKey]].splice(selected[row[rowKey]].indexOf(column.key), 1);
        } else {
          selected[row[rowKey]].push(column.key);
        }
        this.tableSelected.keysMap = selected;
        this.tableSelected.keysMap = Object.assign({}, this.tableSelected.keysMap);
        this.tableSelected = Object.assign({}, this.tableSelected);
        return;
      }

      if (column.key === "name") {
        let projectId = e.detail.row.id;
        let projectName = e.detail.row.name;


        this.$router.push({
          path: '/shouru/shouruxq',
          query: {
            ...this.params,
            projectId: projectId, projectName: projectName, chargeType: this.params.chargeType
          }
        })
        return;
      }
      let projectId = row.projectId;
      let currentColumn = column.key;
      return;
    },
    postRecovery () {
      // 纠错 提交按钮 事件
      const { projectId, type: pageType, chargeType } = this.params;
      const selectedMap = this.recovery.selected;
      const markInfos = Object.keys(selectedMap)
        .filter((key) => selectedMap[key].length)
        .map((key) => {
          return {
            markX: key,
            markY: selectedMap[key].join(","),
            notes: "",
          };
        });
      app.globalData.request
        .options({
          loading: true,
        })
        .post("/open/bis-open-mark-info!clearAndSavePageMarkInfoList.action", {
          projectId,
          chargeType,
          markInfos,
          pageType,
          pageSource: 'pages/shouru/zujin',
          projectId: "",
          uuid: "feedback",
          userName: "pd测试管理员",
        })
        .then(() => {
          this.cancelRecovery(false);
        });
    },
    cancelRecovery (reset = true) {
      // 纠错 取消按钮 事件
      const setdata = {
        "recovery.show": false,
        "recovery.selected": this.tableSelected.keysMap,
      };

      if (reset !== false) {
        setdata["recovery.selected"] = this.recovery.current;
        setdata["tableSelected.keysMap"] = this.recovery.current;
      }

      this.setData(setdata);
      this.getEchartData();
      this.getTableData();
    },
    projeSelected (item) {
      try {
        if (item.shortName !== "全部") {
          this.setData({
            ["params.projectId"]: (item && item.projectId) || "",
            ["params.projectName"]: (item && item.shortName) || "",
          });
          this.getEchartData();
          this.getTableData();
        }
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<style>
</style>

