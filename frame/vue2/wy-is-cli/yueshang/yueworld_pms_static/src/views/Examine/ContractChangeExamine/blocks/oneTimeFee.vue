<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-预览-一次性费用
-->

<template>
  <div v-if="currentFormData.tableList !==undefined && currentFormData.tableList.length > 0 ">
    <ysn-formTable
      v-model="currentFormData"
      prop="tableList"
      :column="tableConfig"
      is-dis-table
      :show-slots="[]"
    >
      <template #applicationAmountBeforeChange="scope">
        <div v-if="scope.row.applicationAmountBeforeChange">
          {{ changeNumber(scope.row.applicationAmountBeforeChange) }}
        </div>
        <div v-else>/</div>
      </template>
      <template #applicationAmountAfterChange="scope">
        <div
          :style="{'color':scope.row.applicationAmountAfterChange.toString() !==scope.row.applicationAmountBeforeChange.toString()?'#6F120C':''}"
        >
          {{ changeNumber(scope.row.applicationAmountAfterChange) }}
        </div>
      </template>
      <template #latestpaymentTimeBeforeChange="scope">
        <div v-if="scope.row.latestpaymentTimeBeforeChange">
          {{ scope.row.latestpaymentTimeBeforeChange }}
        </div>
        <div v-else>/</div>
      </template>
      <template #latestpaymentTimeAfterChange="scope">
        <div
          :style="{'color':scope.row.latestpaymentTimeAfterChange.toString() !==scope.row.latestpaymentTimeBeforeChange.toString()?'#6F120C':''}"
        >
          {{ scope.row.latestpaymentTimeAfterChange }}
        </div>
      </template>
      <template #invoiceTypeIdBeforeChange="scope">
        <div v-if="scope.row.invoiceTypeIdBeforeChange">
          {{ scope.row.invoiceTypeIdBeforeChange }}
        </div>
        <div v-else>/</div>
      </template>
      <template #invoiceTypeIdAfterChange="scope">
        <div :style="{'color':scope.row.invoiceTypeIdAfterChange !== scope.row.invoiceTypeIdBeforeChange?'#6F120C':''}">
          {{ scope.row.invoiceTypeIdAfterChange }}
        </div>
      </template>
      <template #taxBeforeChange="scope">
        <div v-if="scope.row.taxBeforeChange">
          {{ scope.row.taxBeforeChange }}
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
  name: 'OneTimeFee',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'oneTimeFee',
    event: 'change'
  },
  props: {
    oneTimeFee: {
      type: Object, default: () => {
      }
    }
  },
  data() {
    return {
      showSlots: [
        'applicationAmountBeforeChange',
        'applicationAmountAfterChange',
        'invoiceTypeIdBeforeChange',
        'latestpaymentTimeBeforeChange',
        'latestpaymentTimeAfterChange',
        'invoiceTypeIdBeforeChange',
        'invoiceTypeIdAfterChange',
        'taxBeforeChange',
        'taxAfterChange'
      ],
      tableConfig: [ // 表单配置
        { changeType: '变更类型', itemType: 'text', sortable: false, columnClass: 'hasBg', width: 100 },
        { conFeeType: '费项', itemType: 'text', sortable: false, width: 120 },
        {
          applicationAmount: '申请金额(元)', sortable: false, tableList: [
            {
              applicationAmountBeforeChange: '变更前',
              itemType: 'text',
              type: 'money',
              sortable: false,
              width: 130,
              hasSlot: true
            },
            {
              applicationAmountAfterChange: '变更后',
              itemType: 'text',
              type: 'money',
              sortable: false,
              width: 130,
              hasSlot: true
            }
          ]
        },
        {
          latestpaymentTime: '应收日期', sortable: false, tableList: [
            { latestpaymentTimeBeforeChange: '变更前', itemType: 'text', sortable: false, width: 130, hasSlot: true },
            { latestpaymentTimeAfterChange: '变更后', itemType: 'text', sortable: false, width: 130, hasSlot: true }
          ]
        },
        {
          invoiceTypeId: '票据类型', sortable: false, tableList: [
            { invoiceTypeIdBeforeChange: '变更前', itemType: 'text', sortable: false, width: 130, hasSlot: true },
            { invoiceTypeIdAfterChange: '变更后', itemType: 'text', sortable: false, width: 130, hasSlot: true }
          ]
        },
        {
          tax: '税率', sortable: false, tableList: [
            { taxBeforeChange: '变更前', itemType: 'text', sortable: false, type: 'rate', width: 100, hasSlot: true },
            { taxAfterChange: '变更后', itemType: 'text', sortable: false, type: 'rate', width: 100, hasSlot: true }
          ]
        }
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

