<!--
 * @Author: zbk
 * @LastEditors: xza
-->
<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      ref="detailedData"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :first-row-add="false"
      :rules="rules"
    />
  </div>
</template>

<script>
import PUBFN from '@/utils/pubFn'
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Detailed',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'detailedData',
    event: 'change'
  },
  props: {
    detailedData: { type: Object, default: () => {} },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [
        { feeName: '费项', itemType: 'select', list: PUBFN.getOptionsList('allProjectFees'), required: true, change: this.expenditureChange },
        { paymentTypeName: '收款方式', itemType: 'select', list: PUBFN.getOptionsList('paymentMethod'), required: true, change: this.expenditureChange },
        { amountOne: '金额(元)', itemType: 'input', inputType: 'Number', type: 'money', required: true, listeners: { input: this.expenditureChange }, fixedWidth: 180 },
        { remarkOne: '备注', itemType: 'input', required: false, placeholder: '请填入', listeners: { input: this.expenditureChange }}
      ],
      rules: {
        feeName: [{ required: true, message: '请选择' }],
        paymentTypeName: [{ required: true, message: '请选择' }],
        amountOne: [{ required: true, message: '请输入' }]
      },
      flag: false
    }
  },
  methods: {
    // 点击新增一行
    flodClick() {
      if (this.currentFormData.tableData !== undefined) {
        const datas = { feeName: '', paymentTypeName: '', amountOne: '', remarkOne: '' }
        this.currentFormData.tableData.push(datas)
        this.flag = true
        this.$emit('comChange', { type: '3', data: this.flag })
      }
    },
    // 选择 select
    expenditureChange(val) {
      this.$emit('comChange', { type: '2', data: val })
      // this.$refs.detailedData.validate((valids, failedObjs) => {
      //   if (valids) {
      //     console.log(1)
      //     this.$emit('comChange', { type: '2', data: val })
      //   }
      // })
    }
  }
}
</script>
