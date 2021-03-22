<template>
  <div :class="'shouru-zujin ' + (recovery.show ? 'recovery' : '')" v-webTitle :data-title="`收入`">
    <div class="header-top">
      <ys-n-nav-bar :title="`收入`" />
      <div class="app-header">
        <div v-show="recovery.show" class="redress_error_edit"> 纠错编辑 </div>
        <div class="app-header-container" v-show="!recovery.show">
          <div class="app-header-left"></div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @selected="dateSelected" :selected="params.yearMonth"></ys-n-date-pick>
            <ys-n-filter-dialog :groups="groups" @selected="bindselected" title="筛选" @open="bindopen" @close="bindclose"></ys-n-filter-dialog>
            <!-- <ys-n-redress-error :type="params.feeType" @onRecoveryClick="onRecoveryClick" v-show="params.feeType !== '3'"></ys-n-redress-error> -->
          </div>
        </div>
      </div>
      <div class="tab-container" v-show="!recovery.show">
        <ys-n-tab :tabList="tabList" :currentTab="currentTab" @selected="tabClickFunc"></ys-n-tab>
      </div>
    </div>

    <ys-n-section title="收缴率" :collapseable="true" v-show="!recovery.show && !show">
      <div class="registered-channels">
        <ys-n-echart :options="lineops"></ys-n-echart>
      </div>
    </ys-n-section>

    <ys-n-section title="项目排名" :hasTable="true">
      <div slot="head-actions">
        <div class="list-mode">
          <span :class="'list-mode-item ' + (timeSpan === '0' ? 'active' : '')" @click="changeSpan" data-span="0"> 当月 </span>
          <span class="line"> | </span>
          <span :class="'list-mode-item ' + (timeSpan === '1' ? 'active' : '')" @click="changeSpan" data-span="1"> 年累计 </span>
        </div>
      </div>
      <ys-n-table :mode="timeSpan" :fixednum="2" :totalRow="totalRow" :values="dataList" :columns="columns" :selected="tableSelected" @row-column-click="onRowColumnClick"></ys-n-table>
    </ys-n-section>

    <div class="recovery-actions" v-if="recovery.show">
      <!-- 纠错编辑 取消 和 提交 -->
      <div class="recovery-actions__action" @click="cancelRecovery">取消</div>
      <div class="recovery-actions__action recovery-actions__action--priamry" @click="postRecovery">提交</div>
    </div>

    <ys-n-filter-dialog :checkboxes="dataList" @selected="showComparisonList" v-if="params.feeType !== '3' && !recovery.show" tip="注意：最少选两项" @open="bindopen" @close="bindclose">
      <div class="comparison"> 对比 </div>
    </ys-n-filter-dialog>

    <ys-n-to-top />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import { yueColumnsZJ, nianColumnsZJ, yueColumnsWG, nianColumnsWG, yueColumnsDJ, nianColumnsDJ } from '../columns/zujinColumns'

export default {
  data() {
    return {
      canca: false,
      currentTab: '1',// tab 默认选中值
      params: {
        chargeType: "",//物业类型,1购物中心,2商业街,0全部
        stage: "",
        feeType: "1",//费项,1租金,物管,3多经
        yearMonth: "",//年月,格式yyyy-MM
      },
      routerParams: this.$route.query,
      recovery: {
        show: false,
        selected: {},
        current: {},
      },
      // selected: {},
      current: {},
      tableSelected: {
        key: "id",// 列表数据的 id
        keysMap: {},
      },
      keysMap: {},
      tabList: [
        {
          name: "租金收入",
          code: "1",
        },
        {
          name: "物管收入",
          code: "2",
        },
        {
          name: "多经收入",
          code: "3",
        },
      ],
      searchList: [
        {
          label: "物业类型",
          key: "wylx",
          selectedCode: 1,
          values: [
            {
              name: "购物中心",
              code: 1,
            },
            {
              name: "商业街",
              code: 2,
            },
            {
              name: "全部",
              code: 0,
            },
          ],
        },
      ],
      dataList: [],
      href: window.location.href,
      yueColumnsZJ: yueColumnsZJ,
      nianColumnsZJ: nianColumnsZJ,
      yueColumnsWG: yueColumnsWG,
      nianColumnsWG: nianColumnsWG,
      yueColumnsDJ: yueColumnsDJ,
      nianColumnsDJ: nianColumnsDJ,
      show: false,
      columns: [],
      totalRow: null,
      timeSpan: "0",
      groups: [],
      selected: [],
      lineops: {},
      page: {
        table: {
          mode: "month",
        },
      },
    };
  },
  computed: {
    ...mapGetters(['getGroups']),
  },
  components: {},
  props: {},
  mounted() {
    try {
      this.params = {
        ...this.params,
        feeType: this.routerParams.feeType,
        chargeType: this.routerParams.chargeType,
        projectId: this.routerParams.projectId,
        yearMonth: this.routerParams.yearMonth,
      };
      this.currentTab = this.routerParams.feeType;

      if (this.params.feeType == 1) {
        this.columns = this.yueColumnsZJ;
      } else if (this.params.feeType == 2) {
        this.columns = this.yueColumnsWG;
      } else if (this.params.feeType == 3) {
        this.columns = this.yueColumnsDJ;
      }
      this.getEchartData();
      this.getTableData();
      this.setData({
        "groups": [this.getGroups]
      });
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    dateSelected(date) {
      try {
        this.setData({ ["params.yearMonth"]: date, });
        this.getEchartData();
        this.getTableData();
        console.log(date);
      } catch (e) {
        console.log(e)
      }
    },
    onRowColumnClick(e) {
      try {
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
      } catch (e) {
        console.log(e)
      }
    },
    postRecovery() {
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
    cancelRecovery(reset = true) {
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
    async getEchartData() {
      try {
        // 查询具体项目数据 传递 projectId
        await this.$axios.shouruServe.queryCollectionRateList({ ...this.params })
          .then((res) => {
            if (res.code == 1) {
              let previousYearData = [];
              let currentYearData = [];
              res.data.map(item => {
                currentYearData.push(item.fixedContCollectionRate);
                previousYearData.push(item.fixedContCollectionRateLast);
              });
              let label = (this.params.yearMonth && this.params.yearMonth.split("-")[0]) || "2020";
              const legendData = [label.substring(2) + "年度" + "", (parseInt(label) - 1 + "").substring(2) + "年度" + ""];
              this.lineops = {
                legend: { data: legendData, icon: "circle", itemHeight: 7 },
                xAxis: { type: "category", data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], },
                yAxis: { type: "value" },
                unit: "%",
                series: [
                  {
                    type: "line",
                    name: legendData[0],
                    lineStyle: {
                      color: "#3AABFF",
                    },
                    data: currentYearData,
                    areaStyle: {
                      //color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#CFDFFE", }, { offset: 1, color: "#FFFFFF", }]), 
                      normal: { //自定义颜色，渐变色填充折线图区域
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, //变化度
                          //渐变色 
                          [{
                            offset: 0,
                            color: '#2D9FCB'
                          }, {
                            offset: 0.62,
                            color: "#ffffff"
                          }]),
                      }
                    },
                  },
                  {
                    type: "line",
                    lineStyle: {
                      color: "#9BB3C6",
                    },
                    name: legendData[1],
                    data: previousYearData,
                  },
                ],
              };
            }
          });
      } catch (e) {
        console.log(e)
      }
    },
    async getTableData() {
      try {
        await this.$axios.shouruServe.queryRentFeeProjectList({ ...this.params })
          .then((res) => {
            this.dataList = [];
            if (res.code == 1) {
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
    async changeSpan(e) {
      try {
        const span = e.currentTarget.dataset.span;
        let feeType = this.params.feeType;
        if (feeType == "1") {
          // 租金收入
          if (span === "0") {
            await this.setData({
              timeSpan: span,
              columns: this.yueColumnsZJ,
            });
          } else {
            await this.setData({
              timeSpan: span,
              columns: this.nianColumnsZJ,
            });
          }
        } else if (feeType == "2") {
          // 物管收入
          if (span === "0") {
            await this.setData({
              timeSpan: span,
              columns: this.yueColumnsWG,
            });
          } else {
            await this.setData({
              timeSpan: span,
              columns: this.nianColumnsWG,
            });
          }
        } else if (feeType == "3") {
          // 多经收入
          if (span === "0") {
            await this.setData({
              timeSpan: span,
              columns: this.yueColumnsDJ,
            });
          } else {
            await this.setData({
              timeSpan: span,
              columns: this.nianColumnsDJ,
            });
          }
        }
      } catch (e) {
        console.log(e)
      }
    },

    bindopen() {
      this.show = true;
    },
    bindclose() {
      this.show = false;
    },
    async tabClickFunc(data) {
      try {
        let span = this.timeSpan; // 当tab为多经收入时，取不同的columns
        if (data == "1") {
          // 租金收入
          if (span === "0") {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.yueColumnsZJ,
            });
          } else {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.nianColumnsZJ,
            });
          }
        } else if (data == "2") {
          // 物管收入
          if (span === "0") {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.yueColumnsWG,
            });
          } else {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.nianColumnsWG,
            });
          }
        } else if (data == "3") {
          // 多经收入
          if (span === "0") {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.yueColumnsDJ,
            });
          } else {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.nianColumnsDJ,
            });
          }
        }
        this.getEchartData();
        this.getTableData();
        console.log(data, 'tab切换')
      } catch (e) {
        console.log(e)
      }
    },

    bindselected(e) {
      try {
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
      } catch (e) {
        console.log(e)
      }
    },
    onProjectSelected(e) {
      if (e.detail.value) {
        let id = e.detail.value.projectId;
        uni.navigateTo({
          url: `./shouruxq/shouruxq?id=${id}&projectName=${e.detail.label}`,
        });
      }
    },

    onDateChanged(e) {
      this.setData({
        ["params.yearMonth"]: e.detail.value,
      });
      this.getDataList();
    },

    onRecoveryClick() {
      this.setData({
        "recovery.show": true,
        "recovery.current": JSON.parse(JSON.stringify(this.recovery.selected)),
      });
      this.getEchartData();
      this.getTableData();
    },

    // 对比操作
    showComparisonList(e) {
      try {
        if (e.detail.length < 2) {
          this.$Toast.fail('最少选两项');
          return;
        }
        let ids = e.detail.map((item) => item.id).join(",");
        let params = { ...this.params, ids: ids };


        this.$router.push({ path: '/shouru/duibi', query: { ...params } })
      } catch (e) {
        console.log(e)
      }
    },
  },
};
</script>
<style type="text/css" lang="scss" scoped>
.shouru-zujin.recovery {
  padding-bottom: 120px;
}
/* pages/shouru/zujin.wxss */
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
  // background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
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
.recovery-actions {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  z-index: 1;
}
.recovery-actions .recovery-actions__action {
  width: 250px;
  font-weight: normal;
  background-color: #c2c2c2;
  color: #333333;
  text-align: center;
  padding: 20px;
}

.recovery-actions .recovery-actions__action--priamry {
  flex: 1;
  color: #ffffff;
  background: linear-gradient(315deg, #1d5a87 0%, #3992ba 100%);
  margin-left: 20px;
}
</style>
