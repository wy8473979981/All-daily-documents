<template>
  <section>
    <!-- <ys-n-title class="mt-9" underline size="medium" title="铺位概览"> </ys-n-title> -->
    <div class="page-block pt-17">
      <ys-n-title size="small" title="基础信息"> </ys-n-title>
      <ys-n-list :config="baseShopInfoConfig" :list="storeInfo" size="small"></ys-n-list>

      <div class="page-year mt-24">
        <div class="page-year--rent pr-17">
          <ys-n-title size="small" title="本年租金(万元)"> </ys-n-title>
          <ys-n-list :config="baseRentThisYearConfig" :list="storeInfo" size="small" width="33.3"></ys-n-list>
        </div>
        <div class="page-year--pro">
          <ys-n-title size="small" title="本年物管费(万元)"> </ys-n-title>
          <ys-n-list :config="basePropertyManagementFeeThisYearConfig" :list="storeInfo" size="small"></ys-n-list>
        </div>
      </div>

    </div>

    <x-dialog-table v-if="yearSaleVisible" v-model="yearSaleVisible" :table-config="tableConfig" title="销售额(万元)" width="1175px" :table-height="72" api="/plpms-rent-control/rc/bis-sales/SalesDetails" :params="dialogParams"></x-dialog-table>

  </section>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime } from 'utils/utils'
import { XDialogTable } from '../../components'
import { getBaseInfoConfig, getRentThisYearConfig, getPropertyManagementFeeThisYearConfig, TableConfig } from './config'
export default {
  name: 'ModulesBase',

  components: { XDialogTable },

  data() {
    return {
      /* 铺位概览 */
      // 基础信息
      baseShopInfoConfig: getBaseInfoConfig.call(this),

      // 本年租金
      baseRentThisYearConfig: getRentThisYearConfig.call(this),
      // 本年物管费
      basePropertyManagementFeeThisYearConfig: getPropertyManagementFeeThisYearConfig.call(this),

      // 基础信息 年销售额 弹窗
      yearSaleVisible: false,
      tableConfig: TableConfig,
    }
  },

  computed: {
    ...mapState({
      storeInfo: state => state.rentalPlatform.storeInfo,
      bisProjectId: state => state.rentalPlatform.bisProjectId,
      floorId: state => state.rentalPlatform.floorId,
      bisStoreId: state => state.rentalPlatform.bisStoreId
    }),

    // 弹窗公用参数
    dialogParams() {
      return {
        // floorId: this.floorId,
        // bisProjectId: this.bisProjectId,
        bisStoreId: this.bisStoreId,
        queryYear: parseTime(new Date(), '{y}')
      }
    }
  },

  methods: {
    // 年销售额 点击
    handleBaseInfoSale() {
      console.log('年销售额')
      this.yearSaleVisible = true
    },
  }
}
</script>

<style lang="scss" scoped>
.page-block {
  background: #FDFCFA;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 23px;
}
.page-year {
  display: flex;

  >div {
    flex: 1;
  }
}
</style>
