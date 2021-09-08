<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-预览-提成
-->

<template>
  <div>
    <!--表格 -->
    <ysn-formTable
      v-model="currentFormData"
      class="mt-16"
      prop="tableList"
      :column="tableConfig"
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
    <el-form ref="rulesForm" :model="currentFormData.formData" label-position="top" size="small" class="mt-16">
      <ysn-formItem :form="currentFormData.formData" :config="formConfig" :column="$attrs.column" clearable text />
    </el-form>
  </div>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'CommissionFeeNameBlock',
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
      formConfig: [
        { itemType: 'text', prop: 'algorithmId', label: '收费方式' },
        { itemType: 'text', prop: 'fixedPaymentCycleId', label: '提成支付周期' },
        { itemType: 'text', prop: 'cycleType', label: '周期类型' },
        { itemType: 'text', prop: 'collectId', label: '账期模式' },
        { itemType: 'text', prop: 'n', label: 'N' },
        { itemType: 'text', prop: 'latestpaymentDay', label: '最迟缴费日' },
        { itemType: 'text', prop: 'commissionType', label: '提成类型' },
        { itemType: 'text', prop: 'isClassDeduction', label: '是否有品类扣' }
      ],
      tableConfig: [
        { changeItem: '租赁区域', sortable: true, itemType: 'text' },
        { meterRentArea: '面积（m²）', sortable: true, itemType: 'text', type: 'area' },
        { rentYears: '租期', sortable: true, itemType: 'text', hasSlot: true, width: 160 },
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
    if (this.currentFormData.formData.isClassDeduction === '是') {
      this.tableConfig.push({ classification: '品类扣', sortable: true, itemType: 'text' })
    }
    if (this.currentFormData.formData.commissionType === '从低到高阶梯提成' || this.currentFormData.formData.commissionType === '总额阶梯提成') {
      this.tableConfig.push({
        startingMonthlyTurnover: '月营业额起',
        sortable: true,
        itemType: 'text',
        type: 'money'
      })
      this.tableConfig.push({
        endingMonthlyTurnover: '月营业止',
        sortable: true,
        itemType: 'text',
        type: 'money'
      })
    }
    this.tableConfig.push({ commDiscountApply: '申请扣率（%）', sortable: true, itemType: 'text', type: 'rate' })
  },
  methods: {
  }

}
</script>

