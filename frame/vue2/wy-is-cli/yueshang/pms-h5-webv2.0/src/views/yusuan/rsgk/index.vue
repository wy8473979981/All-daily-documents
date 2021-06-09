<template>
  <div class="yusuan-nhf" v-webTitle :data-title="`人事费用概况-人数概况`">
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
              <div class="search-title">人事费用概况-人数概况</div>
              <van-image class="van-image" :src="searchIcon" />
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
const columns = [
  {
    label: "业态",
    key: "projectType",
    align: "left",
  },
  {
    label: "类别",
    key: "empType",
    align: "left",
  },
  {
    label: "编制人数",
    key: "empStaffing",
    width: "auto",
    align: "right",
    numberPrecision: 0,
    numberFormat: true,
  },
  {
    label: "实际到岗",
    key: "empReal",
    width: "auto",
    align: "right",
    numberPrecision: 0,
    numberFormat: true,
  },
];
export default {
  data () {
    return {
      isLoading: false,
      page: {
        table: {
          columns: columns,
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
        await this.$axios.yusuanServe.getCollectEmpSheet({
          bean: {
            budgetInstanceSheetId: this.projectId
          },
          pageNum: 1,
          pageSize: 1000
        })
          .then((res) => {
            this.isLoading = false
            if (res.code == 0) {
              this.page.table.rows = res.data.list
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
::v-deep .app-table-row:first-child {
  .app-table-row__item {
    font-weight: bold;
  }
}
</style>
