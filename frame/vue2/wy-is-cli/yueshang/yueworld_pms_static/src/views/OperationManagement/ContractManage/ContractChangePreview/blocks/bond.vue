<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-预览-保证金
-->

<template>
  <div v-if="currentFormData.tableList !==undefined && currentFormData.tableList.length > 0 ">
    <ysn-formTable
      v-model="currentFormData"
      prop="tableList"
      :column="tableConfig"
      is-dis-table
      :show-slots="showSlots"
    >
      <template #amountBeforeChange="scope">
        <div v-if="scope.row.amountBeforeChange">
          {{ changeNumber(scope.row.amountBeforeChange) }}
        </div>
        <div v-else>/</div>
      </template>
      <template #amountAfterChange="scope">
        <div :style="{'color':scope.row.amountAfterChange.toString() !== scope.row.amountBeforeChange.toString()?'#6F120C':''}">
          {{ changeNumber(scope.row.amountAfterChange) }}
        </div>
      </template>
      <template #latestpaymentTimeBeforeChange="scope">
        <div v-if="scope.row.latestpaymentTimeBeforeChange">
          {{ scope.row.latestpaymentTimeBeforeChange }}
        </div>
        <div v-else>/</div>
      </template>
      <template #latestpaymentTimeAfterChange="scope">
        <div :style="{'color':scope.row.latestpaymentTimeAfterChange.toString() !== scope.row.latestpaymentTimeBeforeChange.toString()?'#6F120C':''}">
          {{ scope.row.latestpaymentTimeAfterChange }}
        </div>
      </template>
    </ysn-formTable>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'Bond',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'bond',
    event: 'change'
  },
  props: {
    bond: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      showSlots: [
        'amountAfterChange',
        'latestpaymentTimeBeforeChange',
        'latestpaymentTimeAfterChange',
        'amountBeforeChange',
        'amountAfterChange'
      ],
      tableConfig: [ // 表单配置
        { changeType: '变更类型', itemType: 'text', sortable: false, columnClass: 'hasBg', width: 100 },
        { depositType: '保证金类型', itemType: 'text', sortable: false, width: 120 },
        { amount: '金额(元)', sortable: false, tableList: [
          { amountBeforeChange: '变更前', itemType: 'text', type: 'money', sortable: false, hasSlot: true },
          { amountAfterChange: '变更后', sortable: false, type: 'money', hasSlot: true }
        ] },
        { latestpaymentTime: '应收日期', sortable: false, tableList: [
          { latestpaymentTimeBeforeChange: '变更前', itemType: 'text', sortable: false, hasSlot: true },
          { latestpaymentTimeAfterChange: '变更后', sortable: false, hasSlot: true }
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

