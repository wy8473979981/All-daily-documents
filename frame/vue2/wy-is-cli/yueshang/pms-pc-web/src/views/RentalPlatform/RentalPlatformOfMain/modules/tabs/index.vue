<template>
  <section v-loading.lock="loading">
    <div class="page-block mt-8 pt-16">
      <div class="page-tabs">
        <status-tabs
          :config="tabsConfig"
          v-model="currentTabs"
          @change="handleTabChange"
        ></status-tabs>
        <ys-n-select
          class="page-top-select"
          :options="contOptions"
          v-model="bisContId"
          @change="handleSelectChange"
        ></ys-n-select>
      </div>

      <section v-show="bisContId">
        <div class="page-info--contract mt-29" v-if="currentTabs !== 'zsPlanMerchantVoList'">
          <ys-n-title size="small" title="合同信息"> </ys-n-title>
          <ys-n-list
            :config="contractConfig"
            :list="contInfo"
            size="small"
          ></ys-n-list>
        </div>
        <div class="page-info--contrast mt-20" v-if="currentTabs !== 'zsPlanMerchantVoList'">
          <ys-n-title class="mb-8" size="small" title="对比信息"> </ys-n-title>
          <ys-n-table
            :config="tableConfig"
            v-model="tableData"
            :height="284"
          ></ys-n-table>
        </div>

        <ys-n-title class="mb-16 mt-17" size="small" title="进度信息">
          <template slot="right">
            <section class="progress-list">
              <span class="progress-list--item done">已完成</span>
              <span class="progress-list--item doing">进行中</span>
              <span class="progress-list--item feature">未进行</span>
            </section>
          </template>
        </ys-n-title>
        <x-progress
          :config="contInfo.zsPlanVoList"
          :active.sync="progressActive"
          :unbindShow="currentTabs == 'existingBussinessInfoVoList'"
        ></x-progress>

        <x-node v-if="false" class="mt-18"></x-node>

        <ys-n-title class="mb-8" size="small" title="操作" v-if="false"></ys-n-title>

        <div class="action-area scrollbar-custom" v-if="false">
          <el-button
            v-for="(item, index) in buttonArr"
            type="primary"
            size="small"
            :key="index"
            @click="handleBtnClick(item.key)"
            >{{ item.label }}</el-button
          >
        </div>
      </section>

      <section v-show="!bisContId" class="no-content">请先选择合同</section>
    </div>

    <!-- 销售额 -->
    <x-dialog-table
      v-if="saleVisible"
      v-model="saleVisible"
      :table-config="saleTableConfig"
      title="销售额(万元)"
      width="1175px"
      :table-height="400"
      api="/plpms-rent-control/rc/bis-sales/SalesDetails"
      :params="dialogParams"
    ></x-dialog-table>

    <!-- 对比信息弹窗 -->
    <x-dialog-table
      v-if="comparedVisible"
      v-model="comparedVisible"
      :table-config="dialogTableConfig.tableConfig"
      :title="dialogTableConfig.title"
      :width="dialogTableConfig.width"
      :table-height="248"
      :api="dialogTableConfig.api"
      :params="dialogTableConfig.params"
      :beforeFetchData="beforeFetchData"
    ></x-dialog-table>
  </section>
</template>

<script>
// import isEmpty from 'lodash/isEmpty'
import { mapState, mapActions, mapMutations } from "vuex";
import { StatusTabs, Progress, XNode, XDialogTable } from "../../components";
import {
  TabsConfig,
  getContractConfig,
  getTableConfig,
  getProgressConfig,
  ButtonArr,
  SaleTableConfig,
  RentTableConfig,
  RentTotalTableConfig,
} from "./config";
export default {
  name: "ModulesTabs",

  components: { StatusTabs, "x-progress": Progress, XNode, XDialogTable },

  data() {
    return {
      loading: false,
      bisContId: "",
      // tabs
      currentTabs: "existingBussinessInfoVoList",
      tabsConfig: TabsConfig,
      // 合同信息
      contractConfig: getContractConfig.call(this),
      // 对比信息
      tableConfig: getTableConfig.call(this),

      // 进度信息
      progressConfig: getProgressConfig.call(this),
      progressActive: '',

      buttonArr: ButtonArr,

      // 合同信息 年销售额 弹窗
      saleVisible: false,
      saleTableConfig: SaleTableConfig,

      // 对比信息弹窗
      currentSelect: '租金单价',
      comparedVisible: false,
    };
  },

  computed: {
    ...mapState({
      storeInfo: (state) => state.rentalPlatform.storeInfo,
      bisProjectId: (state) => state.rentalPlatform.bisProjectId,
      floorId: (state) => state.rentalPlatform.floorId,
      bisStoreId: (state) => state.rentalPlatform.bisStoreId,
      allCont: (state) => state.rentalPlatform.allCont,
      comparedInfo: (state) => state.rentalPlatform.comparedInfo,
      contInfo: (state) => state.rentalPlatform.contInfo,
    }),

    // 弹窗公用参数
    dialogParams() {
      return {
        bisContId: this.bisContId,
        bisStoreId: this.bisStoreId,
      };
    },

    contOptions() {
      return this.allCont[this.currentTabs] || [];
    },

    tableData() {
      return this.comparedInfo || [];
    },

    dialogTableConfig() {
      let config = {
        '租金单价': {
          title: '租金单价(元/m²/月)',
          width: '500px',
          api: '/plpms-rent-control/rc/bis-cont/getActualInfo',
          tableConfig: RentTableConfig,
          params: { bisContId: this.bisContId, feeType: 1 }
        },
        '租金合计': {
          title: '租金(元)',
          width: '800px',
          api: '/plpms-rent-control/rc/bis-cont/getRentDetails',
          tableConfig: RentTotalTableConfig,
          params: { bisContId: this.bisContId, feeType: 1 }
        },
        '物管费单价': {
          title: '物管费单价(元/m²/月)',
          width: '500px',
          api: '/plpms-rent-control/rc/bis-cont/getActualInfo',
          tableConfig: RentTableConfig,
          params: { bisContId: this.bisContId, feeType: 2 }
        },
        '物管费合计': {
          title: '物管费(元)',
          width: '800px',
          api: '/plpms-rent-control/rc/bis-cont/getRentDetails',
          tableConfig: RentTotalTableConfig,
          params: { bisContId: this.bisContId, feeType: 2 }
        }
      }
      return config[this.currentSelect.split('(')[0]]
    }
  },

  created() {},

  methods: {
    ...mapMutations({ resetContInfos: "rentalPlatform/resetContInfos" }),
    ...mapActions({ getInfoByContId: "rentalPlatform/getInfoByContId" }),

    // tab 切换
    handleTabChange() {
      // console.log("tab changed", val);
      this.resetContInfos();

      this.bisContId = this.contOptions[0] ? this.contOptions[0].key : "";
    },
    // 切换合同
    handleSelectChange() {
      // console.log("handleSelectChange");
    },

    // 合同信息 合同编号点击
    handleContractCode() {
      let url = 'http://pd.powerlong.com/bis/bs-info-rent2!input.action?'

      if (window.location.host === 'pmstest.powerlong.com') {
        url = 'http://demo.powerlong.com/PowerDesk/bis/bs-info-rent2!input.action?'
      }
      window.open(`${url}id=${this.contInfo.bisContId}`)
    },

    // 合同信息 销售总额点击
    handleContractSale() {
      // console.log("合同信息 销售总额点击");
      this.saleVisible = true;
    },

    // 对比信息table 点击
    handleTableClick(data) {
      this.currentSelect = data.row.key1
      this.comparedVisible = true
    },

    // 对比信息接口数据处理
    beforeFetchData(data) {
      if (this.currentSelect.includes('单价')) {
        return data.map((item) => Object.assign(item, { period: `${item.billingPeriodBegin}~${item.billingPeriodEnd}` }))
      } else {
        const list = data.rentPriceVoList.map((item, index) => Object.assign(item, { period: `第${index + 1}月(${item.billingPeriodBegin}~${item.billingPeriodEnd})` }))
        const firstData = { period: `合计(${data.billingPeriodBegin}~${data.billingPeriodEnd})`, actualMoney: data.actualMoney, standardMoney: data.standardMoney }
        return [firstData, ...list]
      }
    },

    // 进度信息 解约
    handleProgressClick(data) {
      console.log("进度信息 解约", data);
    },

    // 操作
    handleBtnClick(key) {
      console.log("操作", key);
    },
  },

  watch: {
    bisContId(val) {
      if (val) {
        this.loading = true
        this.getInfoByContId({id: this.bisContId, type: this.currentTabs === 'zsPlanMerchantVoList' ? 'plan' : 'cont', bisStoreId: this.bisStoreId}).finally(() => {
          this.loading = false;
        });
      }
    },

    storeInfo: {
      deep: true,
      handler() {
        this.bisContId = this.storeInfo.bisContId || "";
        this.currentTabs = "existingBussinessInfoVoList";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
