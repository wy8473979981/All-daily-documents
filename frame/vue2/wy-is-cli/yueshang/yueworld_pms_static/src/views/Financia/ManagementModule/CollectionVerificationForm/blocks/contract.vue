<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-核销-收款信息
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Contract',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'contract',
    event: 'change'
  },
  props: {
    contract: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'input', prop: 'receivedId', label: '收款编号', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label' },
        { itemType: 'input', prop: 'receivedDate', label: '收款日期', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label' },
        { itemType: 'input', prop: 'paymentTypeName', label: '收款方式', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label' },
        { itemType: 'input', prop: 'receivedAmount', label: '收款金额(元)', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label', type: 'money' },
        { itemType: 'input', prop: 'bankName', label: '收款银行', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label' },
        { itemType: 'input', prop: 'bankAccount', label: '收款账号', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label' },
        { itemType: 'input', prop: 'accountName', label: '收款单位', inputType: 'autoValue', disabled: true, width: '206px', listName: 'label' }
      ],
      rulesForm: { // 表单验证
        receivedId: [{ message: '请输入必填项', trigger: 'change' }],
        receivedDate: [{ message: '请输入必填项', trigger: 'change' }],
        paymentTypeName: [{ message: '请输入必填项', trigger: 'change' }],
        receivedAmount: [{ message: '请输入必填项', trigger: 'change' }],
        bankName: [{ message: '请输入必填项', trigger: 'change' }],
        bankAccount: [{ message: '请输入必填项', trigger: 'change' }],
        accountName: [{ message: '请输入必填项', trigger: 'change' }]
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        if (newVal.writeOffDetails.tableData.length === 0 && newVal.temporaryCollections.tableData.length === 1) {
          this.currentFormData.receivedAmount = String(newVal.temporaryCollections.allNum)
        }
      }
    }
  }
}
</script>
