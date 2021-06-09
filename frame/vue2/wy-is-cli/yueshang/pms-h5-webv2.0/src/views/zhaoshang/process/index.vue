<template>
  <div class="home" v-webTitle :data-title="`招商进度`">
    <div class="header-top header-top-padding-top">
      <!-- <ys-n-nav-bar :title="`招商进度`" /> -->
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :moduleName="'zhaoshang'" :selected="selected" @touchstart="touchPick" @projeSelected="projeSelected" :disabledAll="true">
            </ys-n-project-select>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @touchstart="touchPick" @close="closePick" @selected="dateSelected" :selected="params.realCompletedYm">
            </ys-n-date-pick>
          </div>
        </div>
      </div>
      <div class="tab-container">
        <ys-n-tab :tabList="tabList" :currentTab="currentTab" @selected="tabClickFunc"></ys-n-tab>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section :collapseable="collapseable" :hasTable="true">
        <div class="head-actions_left_view" slot="head-actions_left">
          <!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
          <!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
          <ys-n-filter-chart-dialog :label="chartsTitle" @touchstart="touchPick" :searchList="searchTypeList" @search="searchType" @linkUrl="goLink" :type="'zhaoshang'"></ys-n-filter-chart-dialog>
        </div>
        <div slot="head-actions" class="head-actions">
          <div class="list-mode">
            <span :class="'list-mode-item ' + (table.mode == '2' ? 'active' : '')" @click="onListModeChanged" data-value="2">建筑面积</span>
            <span class="line"> | </span>
            <span :class="'list-mode-item ' + (table.mode == '3' ? 'active' : '')" @click="onListModeChanged" data-value="3">计租面积</span>
            <span class="line"> | </span>
            <span :class="'list-mode-item ' + (table.mode == '1' ? 'active' : '')" @click="onListModeChanged" data-value="1">品牌数量</span>
          </div>
        </div>
        <ys-n-table :fixednum="2" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns" :mode="table.mode" @row-column-click="onRowColumnClick"></ys-n-table>
      </ys-n-section>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
const columnList = [{
  label: "序号",
  width: "1.3rem",
  align: "left",
  fixed: true
}, {
  label: "项目",
  key: "projectName",
  width: "2rem",
  color: "#3B96BE",
  align: "left",
  fixed: true
},
{
  label: "开业时间",
  key: "openDate",
  width: "2.7rem",
  align: "left",
  sortable: true,
},
{
  label: "建筑面积",
  key: "structureSquare",
  width: "2.4rem",
  align: "right",
  sortable: true,
  type: "2",
},
{
  label: "计租面积",
  key: "rentSquare",
  width: "2.4rem",
  align: "right",
  sortable: true,
  type: "3",
},
{
  label: "品牌数量",
  key: "brandCount",
  width: "2.4rem",
  align: "right",
  sortable: true,
  type: "1",
},
{
  label: "实际",
  key: "intentionA",
  width: "2rem",
  group: "意向",
  align: "right",
  sortable: true,
},
{
  label: "目标",
  key: "intentionT",
  width: "2rem",
  group: "意向",
  align: "right",
  sortable: true,
},
{
  label: "实际",
  key: "businessA",
  width: "2rem",
  group: "商务",
  align: "right",
  sortable: true,
},
{
  label: "目标",
  key: "businessT",
  width: "2rem",
  group: "商务",
  align: "right",
  sortable: true,
},
{
  label: "差异",
  key: "businessC",
  width: "2rem",
  group: "商务",
  align: "right",
  sortable: true,
},
{
  label: "实际",
  key: "contNetworkReformationA",
  width: "2rem",
  group: "合同网批",
  align: "right",
  sortable: true,
},
{
  label: "目标",
  key: "contNetworkReformationT",
  width: "2rem",
  group: "合同网批",
  align: "right",
  sortable: true,
},
{
  label: "差异",
  key: "contNetworkReformationC",
  width: "2rem",
  group: "合同网批",
  align: "right",
  sortable: true,
},
{
  label: "实际",
  key: "contSignA",
  width: "2rem",
  group: "合同签署",
  align: "right",
  sortable: true,
},
{
  label: "目标",
  key: "contSignT",
  width: "2rem",
  group: "合同签署",
  align: "right",
  sortable: true,
},
{
  label: "差异",
  key: "contSignC",
  width: "2rem",
  group: "合同签署",
  align: "right",
  sortable: true,
},
{
  label: "实际",
  key: "enterA",
  width: "2rem",
  group: "进场",
  align: "right",
  sortable: true,
},
{
  label: "目标",
  key: "enterT",
  width: "2rem",
  group: "进场",
  align: "right",
  sortable: true,
},
{
  label: "差异",
  key: "enterC",
  width: "2rem",
  group: "进场",
  align: "right",
  sortable: true,
},
{
  label: "实际",
  key: "startBusinessA",
  width: "2rem",
  group: "开业",
  align: "right",
  sortable: true,
},
{
  label: "目标",
  key: "startBusinessT",
  width: "2rem",
  group: "开业",
  align: "right",
  sortable: true,
},
{
  label: "差异",
  key: "startBusinessC",
  width: "2rem",
  group: "开业",
  align: "right",
  sortable: true,
},
{
  label: "实际",
  key: "initialChargeA",
  width: "2rem",
  group: "前期费用",
  align: "right",
  sortable: true,
},
{
  label: "目标",
  key: "initialChargeT",
  width: "2rem",
  group: "前期费用",
  align: "right",
  sortable: true,
},
{
  label: "差异",
  key: "initialChargeC",
  width: "2rem",
  group: "前期费用",
  align: "right",
  sortable: true,
},
]
export default {
  name: "Home",
  data () {
    return {
      isLoading: false,
      projectList: [],
      searchTypeList: [
        {
          label: "",
          key: "wylx",
          selectedCode: 1,
          values: [{
            name: "筹备招商进度",
            url: "/zhaoshang/process/index",
            code: 1
          },
          {
            name: "筹备期网批驳回率统计",
            url: "/zhaoshang/reject",
            code: 2
          },
          {
            name: "筹备期全面抽成统计",
            url: "/zhaoshang/commissionTotal",
            code: 3
          },
          {
            name: "招商业绩考核",
            url: "/zhaoshang/perfCheck/index",
            code: 4
          },
          {
            name: "总部联发品牌数据监控",
            url: "/zhaoshang/linkBrand/index",
            code: 5
          },
          {
            name: "已招租金达成率柱状图",
            url: "/zhaoshang/rentCompletRate",
            code: 6
          },
          {
            name: "进场审图进度-品牌数",
            url: "/zhaoshang/brandNum",
            code: 7
          },
          {
            name: "待开业项目招商进度-品牌数",
            url: "/zhaoshang/noMakebusinessBrandNum",
            code: 8
          },
          ],
        }
      ],
      collapseable: false,
      chartsTitle: "筹备招商进度",
      selected: {
        projectId: "",
        label: "全部",
      },
      currentTab: "1", //tab选中项
      params: {
        offset: 1,
        limit: 200,
        conditionType: 1,
        menuType: 1,
        realCompletedYm: this.$route.query.yearAndMonth ? this.$route.query.yearAndMonth : this.$util.getDefaultDate("month")
      },
      tabList: [{
        name: '累计招商',
        code: 1
      },
      {
        name: '当月招商',
        code: 2
      }
      ],
      table: {
        mode: '1',
        totalRow: null,
        dataList: [],
        columns: columnList
      },
    }
  },
  created () {
    this.getDataList()
    this.getProjectList()
  },

  methods: {
    ...mapMutations(['setProjectInfo']),
    onRefresh () {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 0)
      this.getDataList()
    },
    async getProjectList () {
      try {
        let params = {
          operStatus: 1
        }
        let res = await this.$axios.zhaoshangServe.getMakeBusnessProjectList(params, false)
        // this.setProjectInfo({ projectList: res.data, grade: 0 })
        this.$store.commit("setZsProjectInfo", { projectList: res.data, grade: 0 })
      } catch (e) {
        console.log(e)
      }
    },
    closePick () {
      try {
        this.$util.showTabStatus('true', 'true')
      } catch (e) {
        console.log(e)
      }
    },
    touchPick () {
      try {
        this.$util.showTabStatus('false', 'false')
      } catch (e) {
        console.log(e)
      }
    },
    projeSelected (item) {
      try {
        this.$util.showTabStatus('true', 'true')
        this.setData({
          ["params.projectId"]: (item && item.projectId) || "",
          ["params.projectName"]: (item && item.shortName) || "",
        });
        this.getDataList()
      } catch (e) {
        console.log(e)
      }
    },
    dateSelected (date) {
      console.log(date);
      this.setData({
        ["params.realCompletedYm"]: date,
      });
      this.getDataList()
      // },
    },
    tabClickFunc (data) {
      this.currentTab = data
      this.params.menuType = parseInt(data)
      this.getDataList()
    },
    searchType (item) { },
    onListModeChanged (e) {
      const mode = e.target.dataset.value;
      console.log(mode)
      this.table.mode = mode
      this.params.conditionType = parseInt(mode)
      this.getDataList()
    },
    onRowColumnClick (e) {
      if (e.detail.column.key == "projectName") {
        this.$util.pageGo('/zhaoshang/process/detail', {
          ...this.params,
          projectId: e.detail.row.bisProjectId,
          projectName: e.detail.row.projectName
        })
      }
    },
    async getDataList () {
      let res = await this.$axios.zhaoshangServe.getTableData(this.params)
      this.isLoading = false
      this.setData({
        "table.dataList": res.data.list.slice(0, -1),
        "table.totalRow": res.data.list.slice(-1)[0],
      });
    },
    goLink (url) {
      try {
        this.$util.showTabStatus('true', 'true')
        this.$util.pageGo(url, {
          ...this.params,
          yearAndMonth: this.params.realCompletedYm
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
}
</script>

<style>
</style>
