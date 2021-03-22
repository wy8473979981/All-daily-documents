<template>
  <div :class="'shouru-zujin ' + (recovery.show ? 'recovery' : '')" v-webTitle :data-title="`收入-项目排名`">
    <div class="header-top">
      <ys-n-nav-bar :title="`收入-项目排名`" />

      <div class="app-header">
        <div v-show="recovery.show" class="redress_error_edit"> 纠错编辑 </div>
        <div class="app-header-container" v-show="!recovery.show">
          <div class="app-header-left">
            <ys-n-project-select :selected="selected" @projeSelected="projeSelected"></ys-n-project-select>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year`" @selected="dateSelected" :selected="params.year"></ys-n-date-pick>
            <ys-n-filter-dialog :groups="groups" @selected="bindselected" title="筛选"></ys-n-filter-dialog>
            <!-- <ys-n-redress-error :type="params.feeType" @onRecoveryClick="onRecoveryClick" /> -->
          </div>
        </div>
      </div>
      <div class="tab-container" v-show="!recovery.show">
        <ys-n-tab :tabList="tabList" :currentTab="currentTab" @selected="tabClickFunc"></ys-n-tab>
      </div>
    </div>

    <ys-n-section title="收缴率" :collapseable="true" v-if="!recovery.show">
      <div class="registered-channels">
        <ys-n-echart :options="lineops"></ys-n-echart>
      </div>
    </ys-n-section>

    <ys-n-section title="本年收入" :hasTable="true">
      <div slot="head-actions">
        <div class="list-mode">
          <span :class="'list-mode-item ' + (timeSpan === '0' ? 'active' : '')" @click="changeSpan" data-span="0"> 当月 </span>
          <span class="line"> | </span>
          <span :class="'list-mode-item ' + (timeSpan === '1' ? 'active' : '')" @click="changeSpan" data-span="1"> 年累计 </span>
        </div>
      </div>
      <ys-n-table :mode="timeSpan" :fixednum="1" :totalRow="totalRow" :values="dataList" :columns="columns" :selected="tableSelected" @row-column-click="onRowColumnClick"></ys-n-table>
    </ys-n-section>

    <div class="recovery-actions" v-if="recovery.show">
      <div class="recovery-actions__action" @click="cancelRecovery">取消</div>
      <div class="recovery-actions__action recovery-actions__action--priamry" @click="postRecovery">提交</div>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import { yueProjectColumnsZJ, nianProjectColumnsZJ, yueProjectColumnsWG, nianProjectColumnsWG, yueProjectColumnsDJ, nianProjectColumnsDJ } from '../columns/zujinColumns'
export default {
  data() {
    return {
      recovery: {
        show: false,
        selected: {},
        current: {},
      },
      leaderDetail: {
        userName: '',
        resultList: '',
        attendWorkDate: '',
        mobilePhone: ''
      },
      currentTab: '1',
      lineops: {},
      params: {
        projectName: "",
        chargeType: "",//物业类型,1购物中心,2商业街,0全部
        stage: "",
        feeType: "",//费项,1租金,物管,3多经
        year: "",
        // yearMonth: "",//年月,格式yyyy-MM
      },
      routerParams: this.$route.query,
      yueProjectColumnsZJ: yueProjectColumnsZJ,
      nianProjectColumnsZJ: nianProjectColumnsZJ,
      yueProjectColumnsWG: yueProjectColumnsWG,
      nianProjectColumnsWG: nianProjectColumnsWG,
      yueProjectColumnsDJ: yueProjectColumnsDJ,
      nianProjectColumnsDJ: nianProjectColumnsDJ,
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
      selected: {},
      current: {},
      tableSelected: {
        key: "businessKey",
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
      dataList: [],
      totalRow: null,
      type: "zj",
      columns: [],
      timeSpan: "0",
      groups: [],
      page: {
        charts: {
          main: {},
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
      let { projectName, projectId, chargeType, yearMonth, feeType } = this.routerParams;
      let selected = { label: projectName, projectId: projectId, };
      this.setData({
        selected,
        "params.projectName": projectName,
        "params.projectId": projectId,
        "params.chargeType": chargeType,
        "params.feeType": feeType,
        currentTab: feeType,
        "params.year": yearMonth.split("-")[0],
        "groups": [this.getGroups]
      });

      if (this.params.feeType == 1) {
        this.columns = this.yueProjectColumnsZJ;
      } else if (this.params.feeType == 2) {
        this.columns = this.yueProjectColumnsWG;
      } else if (this.params.feeType == 3) {
        this.columns = this.yueProjectColumnsDJ;
      }

      this.getEchartData();
      this.getProjectTableData();
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    dateSelected(date) {
      try {
        this.setData({ ["params.year"]: date, });
        this.getEchartData();
        this.getProjectTableData();
      } catch (e) {
        console.log(e)
      }
    },
    projeSelected(item) {
      try {
        console.log(item);
        if (item.shortName !== "全部") {
          this.setData({
            ["params.projectId"]: (item && item.projectId) || "",
            ["params.projectName"]: (item && item.shortName) || "",
          });
          this.getEchartData();
          this.getProjectTableData();
        }
      } catch (e) {
        console.log(e)
      }
    },
    async tabClickFunc(data) {
      try {
        let span = this.timeSpan; // 当tab为多经收入时，取不同的columns
        if (data == 1) {
          if (span === "0") {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.yueProjectColumnsZJ,
            });
          } else {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.nianProjectColumnsZJ,
            });
          }
        } else if (data == 2) {
          if (span === "0") {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.yueProjectColumnsWG,
            });
          } else {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.nianProjectColumnsWG,
            });
          }
        } else if (data == 3) {
          if (span === "0") {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.yueProjectColumnsDJ,
            });
          } else {
            await this.setData({
              ["params.feeType"]: data,
              currentTab: data,
              columns: this.nianProjectColumnsDJ,
            });
          }
        }
        this.getEchartData();
        this.getProjectTableData();
        console.log(data, 'tab切换')
      } catch (e) {
        console.log(e)
      }
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
              let label = this.params.year;
              const legendData = [label.substring(2) + "年度" + "", (parseInt(label) - 1 + "").substring(2) + "年度" + ""];
              this.lineops = {
                unit: "%",
                legend: { data: legendData, icon: "circle", itemHeight: 7, },
                xAxis: { type: "category", data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], },
                yAxis: { type: "value", },
                series: [
                  {
                    type: "line",
                    name: legendData[0],
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
                    name: legendData[1],
                    data: previousYearData,
                  },
                ],
              }
            }
          });
      } catch (e) {
        console.log(e)
      }
    },
    async getProjectTableData() {
      try {
        // 具体项目的table数据
        await this.$axios.shouruServe.queryRentFeeProjectDetailsList({ ...this.params })
          .then((res) => {
            if (res.code == 1) {
              if (res.data && res.data.length > 0) {
                let result = res.data.map((item, index) => {
                  return {
                    ...item
                  };
                });
                this.setData({ dataList: result });
              }
            }
          });
      } catch (e) {
        console.log(e)
      }
    },
    async changeSpan(e) {
      try {
        const span = e.currentTarget.dataset.span;
        let feeType = this.params.feeType;
        if (feeType == "1") {
          // 租金收入
          if (span === "0") {
            await this.setData({
              timeSpan: span,
              columns: this.yueProjectColumnsZJ,
            });
          } else {
            await this.setData({
              timeSpan: span,
              columns: this.nianProjectColumnsZJ,
            });
          }
        } else if (feeType == "2") {
          // 物管收入
          if (span === "0") {
            await this.setData({
              timeSpan: span,
              columns: this.yueProjectColumnsWG,
            });
          } else {
            await this.setData({
              timeSpan: span,
              columns: this.nianProjectColumnsWG,
            });
          }
        } else if (feeType == "3") {
          // 多经收入
          if (span === "0") {
            await this.setData({
              timeSpan: span,
              columns: this.yueProjectColumnsDJ,
            });
          } else {
            await this.setData({
              timeSpan: span,
              columns: this.nianProjectColumnsDJ,
            });
          }
        }
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
        this.getDataList();
      } catch (e) {
        console.log(e)
      }
    },

    onRowColumnClick(e) {
      try {
        const { show, selected } = this.recovery;

        if (show) {
          const { row, column } = e.detail;

          if (!selected[row.businessKey]) {
            selected[row.businessKey] = [];
          }

          if (selected[row.businessKey].includes(column.key)) {
            selected[row.businessKey].splice(selected[row.businessKey].indexOf(column.key), 1);
          } else {
            selected[row.businessKey].push(column.key);
          }
          this.tableSelected.keysMap = selected;
          this.tableSelected.keysMap = Object.assign({}, this.tableSelected.keysMap);
          this.tableSelected = Object.assign({}, this.tableSelected);
          // this.setData({
          //   "tableSelected.keysMap": selected
          // });
        }
      } catch (e) {
        console.log(e)
      }
    },

    onRecoveryClick() {
      try {
        this.setData({
          "recovery.show": true,
          "recovery.current": JSON.parse(JSON.stringify(this.recovery.selected)),
        });
        this.getDataList();
        this.getStoreType(); // this.getStage();
      } catch (e) {
        console.log(e)
      }
    },

    postRecovery() {
      const { bisProjectId, type: pageType, chargeType } = this.params;
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
          bisProjectId,
          chargeType,
          markInfos: JSON.stringify(markInfos),
          pageType,
          pageSource: getCurrentPages().pop().route,
        })
        .then(() => {
          this.cancelRecovery(false);
        });
    },

    cancelRecovery(reset = true) {
      const setdata = {
        "recovery.show": false,
        "recovery.selected": this.tableSelected.keysMap,
      };

      if (reset !== false) {
        setdata["recovery.selected"] = this.recovery.current;
        setdata["tableSelected.keysMap"] = this.recovery.current;
      }

      this.setData(setdata);
      this.getDataList();
      this.getStoreType(); // this.getStage();
    },
  },
};
</script>
<style type="text/css" lang="scss" scoped>
.shouru-zujin.recovery {
  padding-bottom: 120px;
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
  height: 100%;
}

.recovery-actions {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
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
