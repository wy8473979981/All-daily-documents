<template>
  <div class="yusuan-qhf" v-webTitle :data-title="`企划费`">
    <div class="header-top header-top-padding-top">
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select v-if="showSelector" :selected="{ label: projectName }" @touchstart="touchPick" @projeSelected="onProjectSelected" :disabledAll="true"></ys-n-project-select>
          </div>
          <div class="app-header-right">
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="wrapper">
        <ys-n-section :hasTable="true">
          <div class="head-actions_left_div" slot="head-actions_left">
            <div class="selector" @click="openSelector">
              <div class="search-title">企划费</div>
              <van-image class="van-image" :src="searchIcon" />
            </div>
          </div>
          <div class="head-actions_right_div" slot="head-actions">
            <div class="list-mode">
              <span :class="'list-mode-item ' + (dateType === 1 ? 'active' : '')" @click="onListModeChanged(1)" data-value="1">地产支付</span>｜
              <span :class="'list-mode-item ' + (dateType === 2 ? 'active' : '')" @click="onListModeChanged(2)" data-value="2">商业自筹</span>
            </div>
          </div>
          <ys-n-table :fixednum="1" :columns="page.table.columns" :values="page.table.rows"></ys-n-table>
        </ys-n-section>
        <yusuan-dialog v-if="opened"  :items="menuItems" :projectName="projectName" :projectId="projectId" :budgetSheetId="budgetSheetId" :opened="opened" @closed="onSelectorClosed"> </yusuan-dialog>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  projectPageMap
} from "../datasource";
import yusuanDialog from "../components/filter/dialog";
import searchIcon from "../../../assets/images/icon-selector-arrow-blue.png";
const dcColumns = [{
  label: "项目",
  key: "project",
  width: "2rem",
  align: "left",
},
{
  label: "建筑面积",
  key: "builtArea",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "业主租金",
  key: "landlordRent",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "商业租金",
  key: "commerceRent",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "小计",
  key: "paySubtotal",
  group: "按面积计提",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "单价",
  key: "areaUnitPrice",
  group: "按面积计提",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "金额",
  key: "areaAmount",
  group: "按面积计提",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "计提比例",
  key: "rentRate",
  group: "按租金计提",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "金额",
  key: "areaAmount",
  group: "按租金计提",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "地产支付+商业自筹",
  key: "payFundingTotal",
  width: "3.5rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "调剂金额",
  key: "makeAmount",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "调剂后金额",
  key: "makeEndAmount",
  width: "3.2rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "核减",
  key: "review",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
];
const syColumns = [{
  label: "项目",
  key: "project",
  width: "3rem",
  align: "left",
},
{
  label: "建筑面积",
  key: "builtArea",
  width: "2rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "业主租金",
  key: "classify",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "商业租金",
  key: "device",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "计提比例",
  key: "expectBuilding",
  group: "按租金计提",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "金额",
  key: "expectResidence",
  group: "按租金计提",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "地产支付+商业自筹",
  key: "expectBuilding",
  width: "3.5rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "调剂金额",
  key: "expectBuilding",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "调剂后金额",
  key: "expectBuilding",
  width: "3.2rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
{
  label: "核减",
  key: "expectBuilding",
  width: "3rem",
  align: "right",
  numberPrecision: 2,
  numberFormat: true,
},
];
export default {
  data () {
    return {
      isLoading: false,
      page: {
        table: {
          columns: dcColumns,
          rows: []
        }
      },
      dateType: 1,
      opened: false,
      projectId: null,
      budgetSheetId: null,
      menuItems: [],
      searchIcon: searchIcon,
      routerParams: this.$route.query,
      showSelector: true,
      projectName: this.$route.query.projectName ? this.$route.query.projectName : "全部"
    }
  },
  components: {
    yusuanDialog
  },
  mounted () {
    const { id, projectName, projectId, budgetSheetId } = this.routerParams;
    this.setData({
      "query.bean.budgetInstanceSheetId": id,
      projectName: projectName,
      projectId: projectId,
      budgetSheetId: budgetSheetId
    });
    this.loadMenu();
  },
  methods: {
    onRefresh () {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 5000)
      this.loadData();
    },
    onListModeChanged (type) {
      this.dateType = type
      if (type == 1) {
        this.page.table.columns = dcColumns
      } else {
        this.page.table.columns = syColumns
      }
    },
    onSelectorClosed () {
      this.setData({
        opened: false,
      });
    },
    touchPick () {
      try {
        this.$util.showTabStatus('false', 'false')
      } catch (e) {
        console.log(e)
      }
    },
    onProjectSelected (item) {
      try {
        this.setData({
          projectId: (item && item.mallId) || "",
          projectName: (item && item.shortName) || "",
        });
        this.$util.showTabStatus('true', 'true')
        this.loadMenu();
      } catch (e) {
        console.log(e)
      }
    },
    openSelector () {
      try {
        this.$util.showTabStatus('false', 'false')
        this.setData({
          opened: true
        });
        console.log('touchPick')
      } catch (e) {
        console.log(e)
      }
    },
    async loadData () {
      try {
        await this.$axios.yusuanServe.getQhfSheet({
          budgetInstanceSheetId: this.projectId,
        })
          .then((res) => {
            this.isLoading = false
            if (res.code == 0) {
              this.page.table.rows = res.data
              console.log(this.page)
            }
          })
      } catch (e) {
        console.log(e)
      }
    },
    async loadMenu () {

      try {
        await this.$axios.yusuanServe.getBudgetInstanceSheet({
          projectId: this.projectId,
        })
          .then((res) => {
            if (res.code == 0) {
              const menuItems = res.data.map((item) => {
                return {
                  label: item.name,
                  value: item,
                };
              });
              const findUrl = `/${this.route}`;
              const budgetSheetId = Object.keys(projectPageMap).find((key) => {
                const item = projectPageMap[key];
                return item[1] === findUrl;
              });
              const item = res.data.find((item) => {
                return item.budgetSheetId == budgetSheetId;
              });
              this.setData({
                "query.bean.budgetInstanceSheetId": (item || {}).id,
                menuItems,
              });
              this.loadData();
            }
          })
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.selector {
  display: flex;
  align-items: center;
  color: #3992ba;
}

.selector image {
  margin-left: 10px;
  width: 24px;
  height: 12px;
}
</style>
