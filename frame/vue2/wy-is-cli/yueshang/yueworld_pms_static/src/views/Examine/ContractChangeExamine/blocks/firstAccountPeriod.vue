<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-预览-首帐期
-->

<template>
  <div v-if="currentFormData.tableList !==undefined && currentFormData.tableList.length > 0 ">
    <ysn-formTable
      v-model="currentFormData"
      prop="tableList"
      :column="tableConfig"
      is-dis-table
      :show-slots="slotList"
    >
      <template #firstAccountPeriodBeforeChange="scope">
        <div v-if="scope.row.firstAccountPeriodBeforeChangeStart && scope.row.firstAccountPeriodBeforeChangeEnd">
          {{ scope.row.firstAccountPeriodBeforeChangeStart }}~{{ scope.row.firstAccountPeriodBeforeChangeEnd }}
        </div>
        <div v-else>/</div>
      </template>
      <template #firstAccountPeriodAfterChange="scope">
        <div
          :style="{'color':scope.row.firstAccountPeriodAfterChangeStart !==scope.row.firstAccountPeriodBeforeChangeStart
            || scope.row.firstAccountPeriodAfterChangeEnd !==scope.row.firstAccountPeriodBeforeChangeEnd?'#6F120C':''}"
        >
          {{ scope.row.firstAccountPeriodAfterChangeStart }}~{{ scope.row.firstAccountPeriodAfterChangeEnd }}
        </div>
      </template>
      <template #firstPaymentDateBeforeChange="scope">
        <div v-if="scope.row.firstPaymentDateBeforeChange">
          {{ scope.row.firstPaymentDateBeforeChange }}
        </div>
        <div v-else>/</div>
      </template>
      <template #firstPaymentDateAfterChange="scope">
        <div :style="{'color':scope.row.firstPaymentDateAfterChange !==scope.row.firstPaymentDateBeforeChange?'#6F120C':''}">
          {{ scope.row.firstPaymentDateAfterChange }}
        </div>
      </template>
      <template #amountBeforeChange="scope">
        <div v-if="scope.row.amountBeforeChange">
          {{ changeNumber(scope.row.amountBeforeChange) }}
        </div>
        <div v-else>/</div>
      </template>
      <template #amountAfterChange="scope">
        <div :style="{'color':scope.row.amountAfterChange.toString() !==scope.row.amountBeforeChange.toString()?'#6F120C':''}">
          {{ changeNumber(scope.row.amountAfterChange) }}
        </div>
      </template>
      <template #taxBeforeChange="scope">
        <div v-if="scope.row.taxBeforeChange">
          {{ scope.row.taxBeforeChange }}%
        </div>
        <div v-else>/</div>
      </template>
      <template #taxAfterChange="scope">
        <div :style="{'color':scope.row.taxAfterChange !==scope.row.taxBeforeChange?'#6F120C':''}">
          {{ scope.row.taxAfterChange }}%
        </div>
      </template>
    </ysn-formTable>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'FirstAccountPeriod',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'firstAccountPeriod',
    event: 'change'
  },
  props: {
    firstAccountPeriod: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      slotList: [
        'firstAccountPeriodBeforeChange',
        'firstAccountPeriodAfterChange',
        'firstPaymentDateBeforeChange',
        'firstPaymentDateAfterChange',
        'amountBeforeChange',
        'amountAfterChange',
        'taxBeforeChange',
        'taxAfterChange'
      ],
      tableConfig: [ // 表单配置
        { changeType: '变更类型', itemType: 'text', columnClass: 'hasBg', sortable: false, width: 100 },
        { conFeeType: '费项', itemType: 'text', sortable: false, width: 120 },
        { firstAccountPeriod: '首账期', sortable: false, tableList: [
          { firstAccountPeriodBeforeChange: '变更前', sortable: false, width: 110, hasSlot: true },
          { firstAccountPeriodAfterChange: '变更后', sortable: false, width: 110, hasSlot: true }
        ] },
        { firstPaymentDate: '首期缴款日', sortable: false, tableList: [
          { firstPaymentDateBeforeChange: '变更前', itemType: 'text', sortable: false, width: 130 },
          { firstPaymentDateAfterChange: '变更后', itemType: 'text', sortable: false, width: 130, hasSlot: true }
        ] },
        { amount: '金额(元)', sortable: false, tableList: [
          { amountBeforeChange: '变更前', itemType: 'text', type: 'money', sortable: false, width: 130 },
          { amountAfterChange: '变更后', itemType: 'text', type: 'money', sortable: false, width: 130, hasSlot: true }
        ] },
        { tax: '税率', sortable: false, tableList: [
          { taxBeforeChange: '变更前', itemType: 'text', type: 'rate', width: 100 },
          { taxAfterChange: '变更后', itemType: 'text', type: 'rate', sortable: false, width: 100, hasSlot: true }
        ] }
      ]
    }
  },
  methods: {
    changeNumber(num) {
      let number = num
      number = parseFloat(number.toFixed(2))
      number = number.toLocaleString()
      const numberArray = number.toString().split('.')
      if (numberArray.length <= 1) {
        number = number + '.00'
      } else if (numberArray[1] < 10) {
        number = number + '0'
      }
      return number
    }
  }
}
</script>

