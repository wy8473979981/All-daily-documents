<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-预览-两者取合
-->

<template>
  <div>
    <el-form ref="rulesForm" :model="currentFormData.formData" label-position="top" size="small" class="mt-16">
      <ysn-formItem :form="currentFormData.formData" :config="firstFormConfig" :column="$attrs.column" clearable text />
    </el-form>
    <ysn-formTable
      v-model="currentFormData"
      class="mt-16"
      prop="fixedTableList"
      :column="fixedTableConfig"
      :show-slots="['rentYears']"
    >
      <template #rentYears="scope">
        <div>
          <span>{{ scope.row.rentYearStart }}</span>
          <span>~</span>
          <span>{{ scope.row.rentYearEnd }}</span>
        </div>
      </template>
    </ysn-formTable>
    <el-form ref="rulesForm" :model="currentFormData.fixedFormData" label-position="top" size="small" class="mt-16">
      <ysn-formItem :form="currentFormData.fixedFormData" :config="fixedFormConfig" :column="$attrs.column" clearable text />
    </el-form>
    <ysn-formTable
      v-model="currentFormData"
      class="mt-16"
      prop="commissionTableList"
      :column="commissionTableConfig"
      :show-slots="['rentYears']"
    >
      <template #rentYears="scope">
        <div>
          <span>{{ scope.row.rentYearStart }}</span>
          <span>~</span>
          <span>{{ scope.row.rentYearEnd }}</span>
        </div>
      </template>
    </ysn-formTable>
    <el-form ref="rulesForm" :model="currentFormData.commissionFormData" label-position="top" size="small" class="mt-16">
      <ysn-formItem :form="currentFormData.commissionFormData" :config="commissionFormConfig" :column="$attrs.column" clearable text />
    </el-form>
  </div>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'GetSumFeeNameBlock',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'feeName',
    event: 'change'
  },
  props: {
    feeName: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      firstFormConfig: [
        { itemType: 'text', prop: 'algorithmId', label: '收费方式' }
      ],
      fixedFormConfig: [
        { itemType: 'text', prop: 'fixedPaymentCycleId', label: '固定支付周期' },
        { itemType: 'text', prop: 'cycleType', label: '周期类型' },
        { itemType: 'text', prop: 'collectId', label: '账期模式' },
        { itemType: 'text', prop: 'n', label: 'N' },
        { itemType: 'text', prop: 'latestpaymentDay', label: '最迟缴费日' }
      ],
      commissionFormConfig: [
        { itemType: 'text', prop: 'fixedPaymentCycleId', label: '提成支付周期' },
        { itemType: 'text', prop: 'cycleType', label: '周期类型' },
        { itemType: 'text', prop: 'collectId', label: '账期模式' },
        { itemType: 'text', prop: 'n', label: 'N' },
        { itemType: 'text', prop: 'latestpaymentDay', label: '最迟缴费日' },
        { itemType: 'text', prop: 'commissionType', label: '提成类型' },
        { itemType: 'text', prop: 'isClassDeduction', label: '是否有品类扣' }
      ],
      fixedTableConfig: [
        { changeItem: '租赁区域', sortable: true, itemType: 'text' },
        { meterRentArea: '面积（m²）', sortable: true, itemType: 'text', type: 'area' },
        { rentYears: '租期', sortable: true, itemType: 'text', width: 160, hasSlot: true },
        { isPromotional: '优惠期', sortable: true, itemType: 'text' },
        { taxId: '税率（%）', sortable: true, itemType: 'text', type: 'rate' },
        {
          toApplyPrice: '申请单价(元)',
          type: 'money',
          sortable: true,
          itemType: 'text'
        },
        { unitPriceYieldRate: '达成率（%）', sortable: true, itemType: 'text', type: 'rate' },
        {
          monthAmount: '月总额(元)',
          type: 'money',
          sortable: true,
          itemType: 'text'
        },
        {
          cycleAmount: '期总额(元)',
          type: 'money',
          sortable: true,
          itemType: 'text'
        }
      ],
      commissionTableConfig: [
        { changeItem: '租赁区域', sortable: true, itemType: 'text' },
        { meterRentArea: '面积（m²）', sortable: true, itemType: 'text', type: 'area' },
        { rentYears: '租期', sortable: true, itemType: 'text', hasSlot: true },
        { isPromotional: '优惠期', sortable: true, itemType: 'text' },
        { taxId: '税率（%）', sortable: true, itemType: 'text', type: 'rate' },
        {
          monthlyEstimatedTurnover: '月预估营业额(元)',
          type: 'money',
          sortable: true,
          itemType: 'text'
        }
      ]
    }
  },
  created() {
    this.currentFormData = this.$attrs.data[this.$attrs.dataKey]
    if (!this.currentFormData.fixedFormData.cycleType) {
      this.fixedFormConfig.splice(2, 1)
    }
    if (this.currentFormData.commissionFormData.isClassDeduction === '是') {
      this.commissionTableConfig.push({ classification: '品类扣', sortable: true, itemType: 'text' })
    }
    if (this.currentFormData.commissionFormData.commissionType === '从低到高阶梯提成' || this.currentFormData.commissionFormData.commissionType === '总额阶梯提成') {
      this.commissionTableConfig.push({
        startingMonthlyTurnover: '月营业额起',
        type: 'money',
        sortable: true,
        itemType: 'text'
      })
      this.commissionTableConfig.push({
        endingMonthlyTurnover: '月营业止',
        type: 'money',
        sortable: true,
        itemType: 'text'
      })
    }
    this.commissionTableConfig.push({
      commDiscountApply: '申请扣率', sortable: true, itemType: 'text', type: 'rate'
    })
  },
  methods: {}

}
</script>

