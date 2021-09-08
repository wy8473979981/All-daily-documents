<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 16:38:53
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-18 18:34:04
-->
<template>
  <div>
    <!-- <ysn-formTable
      ref="formTab"
      v-model="currentFormData"
      prop="tableData"
      :column="formTableConfig"
    /> -->
    <ysn-table
      :data="currentFormData.oneShopOnePricetrs"
      :column="formTableConfig"
      select-key="id"
      :checkbox="false"
    />
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'OneShopOnePricetrs',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'oneShopOnePricetrs',
    event: 'change'
  },
  props: {
    oneShopOnePricetrs: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formTableConfig: [
        { leaseArea: '铺位号', itemType: 'text' },
        { rentYears: '租期', itemType: 'text' },
        { leasTterm: '月总额', tableList: [
          { standardMonthlyRent: '标准月租金',  hasSlot: true, width: '260px' },
          { monthlyRent: '月租金', itemType: 'text' }
        ] },
        { leasTterm: '租期总额', tableList: [
          { standardCycleAmount: '租决期期总额',  hasSlot: true, width: '120px' },
          { cycleAmount: '租期总额', itemType: 'text', width: '100px' },
          { totalLeaseCompletionRate: '租期总额达成率', itemType: 'text', width: '180px' }
        ] }

      ]
    }
  }

}
</script>
