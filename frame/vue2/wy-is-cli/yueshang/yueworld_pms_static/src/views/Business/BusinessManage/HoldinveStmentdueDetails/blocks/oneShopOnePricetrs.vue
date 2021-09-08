<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 16:38:53
 * @LastEditors: fhj
 * @LastEditTime: 2021-08-05 21:01:56
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
          { standardMonthlyRent: '标准月租金', itemType: 'text', width: '260px', type: 'money' },
          { monthlyRent: '月租金', itemType: 'text', type: 'money' }
        ] },
        { leasTterm: '租期总额', tableList: [
          { standardCycleAmount: '租决期期总额', hasSlot: true, width: '120px', type: 'money' },
          { cycleAmount: '租期总额', itemType: 'text', width: '100px', type: 'money' },
          { totalLeaseCompletionRate: '租期总额达成率', itemType: 'text', width: '180px', type: 'rate' }
        ] }

      ]
    }
  }

}
</script>
