<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-新增-一次性费用
-->

<template>
  <div v-if="currentFormData.oneTimeFee !==undefined && currentFormData.oneTimeFee.length > 0 ">
    <ysn-formTable
      ref="formTableRules"
      v-model="currentFormData"
      prop="oneTimeFee"
      :column="tableConfig"
      :show-operation="true"
      add
      :first-row-add="false"
      :rules="formTableRules"
      :show-slots="['paymentTotalAmount', 'latestpaymentDate', 'invoiceTypeId']"
    >

      <template #paymentTotalAmount="scope">
        <el-input
          v-model="scope.row.paymentTotalAmount"
          v-onlyNumber="{model:['$refs','page',`tableData`,scope.$index,'paymentTotalAmount']}"
          :disabled="scope.row.disabled"
          placeholder="请输入"
        />
      </template>
      <template #latestpaymentDate="scope">
        <el-date-picker
          v-model="scope.row.latestpaymentDate"
          value-format="yyyy-MM-dd"
          placeholder="请选择"
          :disabled="scope.row.disabled"
          style="width: 100%"
        />
      </template>
      <template #invoiceTypeId="scope">
        <el-select v-model="scope.row.invoiceTypeId" clearable placeholder="请选择" :disabled="scope.row.disabled">
          <el-option
            v-for="item in $PUBFN.getOptionsList('invoiceTypeId')"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      formTableRules: {
        paymentTotalAmount: [
          { required: true, trigger: 'blur' },
          { type: 'number', message: '请输入正确的总金额', trigger: ['blur', 'change'] }
        ]
      },
      tableConfig: [ // 表单配置
        { conFeeType: '费项', itemType: 'select', placeholder: '请选择', list: this.$PUBFN.getOptionsList('feeName'), listValue: 'value', listName: 'label', sortable: false },
        { latestpaymentDate: '应收日期', itemType: 'datePicker', placeholder: '请选择', type: 'date', valueFormat: 'yyyy-MM-dd', sortable: false, hasSlot: true },
        { paymentTotalAmount: '总金额', sortable: false, hasSlot: true },
        { tax: '税率', itemType: 'select', list: this.$PUBFN.getOptionsList('txd'), listValue: 'value', listName: 'label', sortable: false },
        { invoiceTypeId: '票据类型', itemType: 'select', list: this.$PUBFN.getOptionsList('invoiceTypeId'), listValue: 'value', sortable: false, hasSlot: true }
      ]
    }
  },
  methods: {
    flodClick() {
      if (this.currentFormData.oneTimeFee !== undefined) {
        const datas = {
          conFeeType: '',
          latestpaymentDate: '',
          paymentTotalAmount: '',
          tax: '',
          disabled: false
        }
        this.currentFormData.oneTimeFee.push(datas)
      }
    },
    formatNumber(row) {
      console.log(row)
    }
  }
}
</script>

