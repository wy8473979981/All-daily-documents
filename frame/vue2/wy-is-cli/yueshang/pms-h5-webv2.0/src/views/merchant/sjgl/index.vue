<template>
  <div class="sjgl-list" v-webTitle :data-title="`商家管理`">
    <div class="header-top header-top-padding-top">
      <div class="app-header">
        <div class="app-header-container" @click="closeSjlbFunc">
          <ys-n-tree-select @touchstart="touchPick" @onSelect="onSelectTreeId" @onMerchantName="onMerchantName" ref="treeSelect" />
        </div>
      </div>
    </div>

    <div class="selected" v-if="selectedList && selectedList.length !== 0">
      <div class="label">已选</div>
      <div class="selected-list">
        <div v-for="(item, index) in selectedList" :key="index" class="selected-item" :data-id="item.bisShopSortId">
          <div class="item-name">{{item.sortName}}</div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section title="商家管理" :hasTable="true">

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onReachBottom">
          <ys-n-table :fixednum="2" :totalRow="page.merchantTable.totalRow" :values="page.merchantTable.rows" :columns="dealerColumns" @row-column-click="onRowClick"></ys-n-table>
        </van-list>

      </ys-n-section>
    </van-pull-refresh>

    <div @click="closeTreeSelectFunc">
      <Sjlb :query="query" ref="Sjlb" @touchstart="touchPick"></Sjlb>
    </div>
    <!-- <ys-n-to-top /> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { dealerColumns } from './config';
import Sjlb from '../components/sjlb/index';
export default {
  data () {
    return {
      open: false,
      isLoading: false, isLoadingCount: 0,
      selected: {},
      selector: false,
      dealerColumns: dealerColumns,
      page: {
        merchantTable: {
          columns: [],
          rows: []
        }
      },
      showModal: true,
      selectedList: [],
      selectedListDefault: [],
      merchantList: [],
      currentItem: {},
      query: {
        limit: 100,
        offset: 1,
        hasNext: false,
        total: '',
        merchantName: '',
        bisShopSortId: ''
      },
      loading: false,
      finished: false,
    };
  },

  components: { Sjlb },
  props: {},
  mounted () {
    try {
      this.loadData(true);
      this.getDataList();
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapMutations([
      'setMerchantList',
    ]),
    closeSjlbFunc () {
      this.$refs.Sjlb.showModal = false
    },
    closeTreeSelectFunc () {
      this.$refs.treeSelect.showModal = false
    },
    touchPick () {
      try {
        this.$util.showTabStatus('false', 'false')
      } catch (e) {
        console.log(e)
      }
    },
    onSelectTreeId (treeSelect) {
      try {
        this.$util.showTabStatus('true', 'true')
        this.setData({
          ['query.limit']: 100,
          ['query.bisShopSortId']: treeSelect.bisShopSortId.join(','),
          selectedList: treeSelect.selectedList,
          // selectedListDefault: JSON.parse(JSON.stringify(this.selectedList))
        });
        this.loadData();
      } catch (e) {
        console.log(e)
      }
    },
    onMerchantName (data) {
      this.setData({
        selector: false,
        ['query.limit']: 100,
        ['query.merchantName']: data
      });
      this.loadData();
    },
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
        this.query.offset = 1;
        this.addIsLoadingCount(isUse)
        await this.$axios.merchantServe.getMerchantList(this.query, true).then(res => {
          if (res.code == 200) {
            this.decreaseIsLoadingCount(isUse)
            const { data } = res;
            const rows = data.list.map(item => {
              return {
                bisShopId: item.bisShopId,
                merchantsChineseName: item.merchantsChineseName,
                thirdlyFormats: item.thirdlyFormats,
                storeType: item.storeType,
                owe: item.owe,
                cooperativeProjectsNumber: item.cooperativeProjectsNumber
              };
            });
            const setdata = {
              'query.offset': data.offset,
              'query.hasNext': data.hasNext,
              'query.total': data.total,
              'page.merchantTable': {
                columns: [...dealerColumns],
                rows: rows
              }
            };
            this.setData(setdata);
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    onReachBottom: async function () {
      try {
        if (this.query.hasNext) {
          this.query.limit = 50;
          this.query.offset = this.query.offset + 1;
          await this.$axios.merchantServe.getMerchantList(this.query, false).then(res => {
            if (res.code == 200) {
              const { data } = res
              this.loading = false;
              const rows = data.list.map(item => {
                return {
                  bisShopId: item.bisShopId,
                  merchantsChineseName: item.merchantsChineseName,
                  thirdlyFormats: item.thirdlyFormats,
                  storeType: item.storeType,
                  owe: item.owe
                };
              });
              let addrows = this.page.merchantTable.rows.concat(rows);
              const setdata = {
                'query.offset': data.offset,
                'query.hasNext': data.hasNext,
                'query.total': data.total,
                'page.merchantTable': {
                  columns: [...dealerColumns],
                  rows: addrows
                }
              };
              if (!data.hasNext) {
                this.finished = true;
              }
              this.setData(setdata);
            }
          })
        } else {
          this.loading = false;
        }
      } catch (e) {
        console.log(e)
      }
    },
    onRowClick: function (e) {
      this.$util.pageGo('/merchant/sjxx', { bisShopId: e.detail.row.bisShopId })
    },

    // 获取所有的列表
    async getDataList () {
      try {
        await this.$axios.merchantServe.getFormatList().then(res => {
          if (res.code == 200) {
            this.setData({
              merchantList: res.data.list,
              currentItem: res.data.list[0]
            });
            this.setMerchantList(res.data.list)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    goToComparison () {
      // let params = Object.assign({}, this.query);

      // this.$router.push({ path: "/merchant/sjlb", query: params });

      this.open = true
    },

  }
};
</script>
<style lang="scss" scoped>
.search-solt {
  flex: 1;
}
.project-selector {
  display: flex;
  align-items: center;
}
.icon-selector-arrow {
  width: 24px;
  height: 12px;
  margin-left: 10px;
}
.search-layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  align-items: center;
  overflow: hidden;
}
.search-btn {
  width: 26px;
  height: 26px;
  margin-left: 26px;
  justify-content: center;
}
.search-input-placeholder {
  color: #ffffff;
  font-size: 28px;
}
.search-input {
  color: #ffffff;
  font-size: 28px;
  margin-left: 10px;
}
.filter-modal {
  height: calc(100% - 100px);
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 100px;
  left: 0;
  z-index: 1;
}

.selected {
  display: flex;
  align-items: center;
  padding: 32px 30px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.label {
  margin-right: 20px;
  font-size: 24px;
  padding: 10px 15px;
}
.selected-list {
  display: flex;
  flex: 1;
  overflow: auto;
}
.selected-item {
  font-size: 24px;
  padding: 10px 15px;
  background-color: rgba(55, 143, 183, 0.1);
  color: #3b96be;
  display: flex;
  margin-left: 25px;
  flex-shrink: 0;
}
.item-clear {
  margin-left: 10px;
}

.filter-box {
  height: 800px;
  width: 100%;
  display: flex;
}
.filter-box-left {
  width: 260px;
  height: 100%;
  overflow: auto;
  background-color: #f5f5f5;
}
.filter-label-item {
  width: 100%;
  height: 96px;
  line-height: 96px;
  padding-left: 20px;
  border-left: 12px solid transparent;
}
.filter-label-item.active {
  background-color: #fff;
  border-left-color: #3b96be;
  color: #3b96be;
}
.filter-box-right {
  flex: 1;
  background-color: #fff;
  overflow: auto;
}
.filter-child-box {
  padding: 30px;
  border-bottom: 1px solid #f5f5f5;
}
.checkbox-group {
  margin-top: 20px;
}
.weui-cell {
  padding: 10px 16px;
}
.comparison {
  width: 1.013333rem;
  height: 1.013333rem;
  position: fixed;
  line-height: 1.013333rem;
  right: 0.8rem;
  bottom: 1.6rem;
  border-radius: 50%;
  background: linear-gradient(340deg, #40b9ed 0%, #0067c7 100%);
  color: #fff;
  text-align: center;
  z-index: 101;
}

.button-box {
  padding: 30px;
  display: flex;
  justify-content: flex-end;
}
.btn {
  font-size: 28px;
  background-color: #d8d8d8;
  color: #333;
  width: 160px;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  text-align: center;
}
.btn:active {
  opacity: 0.5;
}
.confirm {
  background: linear-gradient(350deg, #37acdd 0%, #1e5385 100%);
  color: #fff;
}
</style>
