<template>
  <!-- 主要指标 -->

  <div class="yusuan-zfgk" v-webTitle :data-title="`主要指标`">
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

    <div class="wrapper">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ys-n-section :hasTable="true">
          <div class="head-actions_left_div" slot="head-actions_left">
            <div class="selector" @click="openSelector">
              <div class="search-title">主要指标</div>
              <van-image class="van-image" :src="searchIcon" />
            </div>
          </div>
          <ys-n-table :fixednum="2" :columns="page.table.columns" :values="page.table.rows" :total-row="page.table.totalRow"></ys-n-table>
        </ys-n-section>
      </van-pull-refresh>
      <yusuan-dialog v-if="opened"  :items="menuItems" :projectName="projectName" :projectId="projectId" :budgetSheetId="budgetSheetId" :opened="opened" @closed="onSelectorClosed"> </yusuan-dialog>
    </div>

  </div>
</template>

<script>
import { projectPageMap } from "../datasource";
import yusuanDialog from "../components/filter/dialog";
import searchIcon from "../../../assets/images/icon-selector-arrow-blue.png";
import { columns } from "./config"

export default {
  data () {
    return {
      isLoading: false, isLoadingCount: 0,
      routerParams: this.$route.query,
      searchIcon: searchIcon,
      showSelector: true,
      menuItems: [],
      query: {
        bean: {
          budgetInstanceSheetId: null,
        },
        pageNum: 1,
        pageSize: 1000,
      },
      bean: {
        budgetInstanceSheetId: null,
      },
      page: {
        table: {
          columns,
        },
      },
      opened: false,
      projectName: "全部",
      projectId: null,
      budgetSheetId: null,
    };
  },
  components: {
    yusuanDialog,
  },
  props: {},
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
      setTimeout(() => {
        // 如果接口有问题，5s后关闭下拉刷新loading
        this.isLoading = false
      }, 0)
      this.loadData(true)
    },
    addIsLoadingCount (isUse = true) {
      // isUse 表示下拉刷新是否真实使用
      if (!isUse) {
        return false;
      }
      this.isLoadingCount++;
    },
    decreaseIsLoadingCount (isUse = true) {
      // isUse 表示下拉刷新是否真实使用
      if (!isUse) {
        return false;
      }
      if (this.isLoadingCount <= 0) return;
      this.isLoadingCount--;
      if (this.isLoadingCount === 0) {
        this.$lodash.debounce(this.setIsLoading, 300)()
      }
    },
    setIsLoading () {
      this.isLoading = false;
    },
    loadData: async function (isUse = false) {
      try {
        this.addIsLoadingCount(isUse)
        await this.$axios.yusuanServe.getZyzbSheet(this.query)
          .then((res) => {
            if (res.code == 0) {
              this.decreaseIsLoadingCount(isUse)
              const setdata = {
                "page.table": {
                  columns,
                  rows: res.data.list,
                },
              };
              this.setData(setdata);
            } else {
              this.$Notify({
                type: "danger",
                message: response.data.msg || response.data.message || "出错了",
              });
            }
          })
      } catch (e) {
        console.log(e)
      }
    },
    loadMenu: async function () {
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
              const findUrl = this.$route.path;
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
            } else {
              this.$Notify({
                type: "danger",
                message: response.data.msg || response.data.message || "出错了",
              });
            }
          })
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
      } catch (e) {
        console.log(e)
      }
    },

    onSelectorClosed () {
      this.setData({
        opened: false,
      });
    },
  },
};
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
