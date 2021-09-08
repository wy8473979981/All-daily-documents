<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-新增-首帐期
-->

<template>
  <div v-if="currentFormData.firstAccountPeriod !==undefined && currentFormData.firstAccountPeriod.length > 0 ">
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      prop="firstAccountPeriod"
      :column="tableConfig"
      :show-operation="true"
      add
      :first-row-add="false"
      :show-slots="['paymentBegin','paymentEnd','paymentTotalAmount']"
    >
      <template #paymentBegin="scope">
        <el-date-picker
          v-model="scope.row.paymentBegin"
          placeholder="选择时间"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          style="width: 100%"
          :disabled="!data.essentialData.contNo"
          @change="changePickerOption(scope)"
        />
      </template>
      <template #paymentEnd="scope">
        <el-date-picker
          v-model="scope.row.paymentEnd"
          placeholder="选择时间"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          style="width: 100%"
          :disabled="!scope.row.paymentBegin"
          :picker-options="pickerOptions[scope.$index]"
        />
      </template>
      <template #paymentTotalAmount="scope">
        <el-input
          v-model="scope.row.paymentTotalAmount"
          v-onlyNumber="{model:['$refs','page',`tableData`,scope.$index,'paymentTotalAmount']}"
          placeholder="请输入"
          :disabled="!data.essentialData.contNo"
        />
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
    firstAccountPeriod: { type: Object, default: () => {} },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    tableConfig() {
      return [ // 表单配置
        { conFeeType: '费项', itemType: 'select', placeholder: '请选择', list: this.$PUBFN.getOptionsList('feeName'), listValue: 'value', listName: 'label', sortable: false, width: 150,
          disabled: !this.data.essentialData.contNo },
        { paymentBegin: '开始日期', sortable: false, hasSlot: true, width: 180 },
        { paymentEnd: '结束日期', sortable: false, hasSlot: true, width: 180 },
        { firstPaymentDate: '应收日期', itemType: 'datePicker', placeholder: '请选择', type: 'date', valueFormat: 'yyyy-MM-dd', sortable: false, width: 180,
          disabled: !this.data.essentialData.contNo },
        { paymentTotalAmount: '总金额', itemType: 'input', placeholder: '请输入', sortable: false, width: 150, hasSlot: true },
        { tax: '税率', itemType: 'select', list: this.$PUBFN.getOptionsList('txd'), listValue: 'value', listName: 'label', sortable: false, width: 100, disabled: true }
      ]
    },
    pickerOptions() {
      const pickerOptionsObject = {}
      this.currentFormData.firstAccountPeriod.forEach((value, index) => {
        this.$set(pickerOptionsObject, index,
          {
            disabledDate(time) {
              if (value.paymentBegin) {
                return new Date(value.paymentBegin).getTime() > time.getTime() + 1000 * 60 * 60 * 24
              }
            }
          })
      })
      return pickerOptionsObject
    }
  },
  methods: {
    flodClick() {
      if (this.currentFormData.firstAccountPeriod !== undefined) {
        const datas = { conFeeType: '', paymentBegin: '', paymentEnd: '', firstPaymentDate: '', paymentTotalAmount: '', tax: '' }
        this.$set(this.pickerOptions, this.currentFormData.firstAccountPeriod.length, {})
        this.currentFormData.firstAccountPeriod.push(datas)
      }
    },
    changePickerOption(scope) {
      if (!scope.row.paymentBegin) {
        scope.row.paymentEnd = ''
        return
      }
      const idx = scope.$index
      this.pickerOptions[idx] = {
        disabledDate(time) {
          if (scope.row.paymentBegin) {
            return new Date(scope.row.paymentBegin).getTime() > time.getTime() + 1000 * 60 * 60 * 24
          }
        }
      }
    }
  }
}
</script>

