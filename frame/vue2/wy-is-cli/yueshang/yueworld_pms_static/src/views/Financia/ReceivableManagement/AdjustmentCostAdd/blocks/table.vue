<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 费用调整单 新增编辑  表格调整明细
-->

<template>
  <el-form label-position="top" size="small">
    <div class="box">
      <ysn-tableDesc :config="tableDescConfig" />
      <ysn-btn class="mb-8" @click="enclosure">导入</ysn-btn>
    </div>
    <ysn-formTable
      ref="rulesForm"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :first-row-add="false"
      :rules="rulesForm"
    />
    <Enclosure
      :is-show-dialog="isShowDialog"
      :disabled="false"
      :type="type"
      @closeDialog="closeDialog"
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import PUBFN from '@/utils/pubFn'
import Enclosure from './enclosure.vue'
export default {
  name: 'Table',
  components: { Enclosure },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'countData',
    event: 'change'
  },
  props: {
    countData: { type: Object, default: () => {} },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      isShowDialog: false,
      rulesForm: { // 表单验证
        contNo: [{ required: true, message: '请选择必填项' }],
        feeName: [{ required: true, message: '请选择必填项' }],
        receivableTime: [{ required: true, message: '请选择必填项' }],
        financialDate: [{ required: true, message: '请选择必填项' }],
        adjustAmountone: [{ required: true, message: '请选择必填项' }]
      },
      tableConfig: [ // 表单配置
        { contNo: '合同编号', width: '115px', itemType: 'contNo', change: this.contNoChange, required: true, placeholder: '请选择' },
        { accountName: '收款单位', itemType: 'input', placeholder: '自动生成', disabled: true, width: '90px' },
        { tenantName: '商家/企业', itemType: 'input', placeholder: '自动生成', disabled: true, width: '80px' },
        { feeName: '费项', itemType: 'select', required: true, list: PUBFN.getOptionsList('FeeSubjectAll'), width: '100px' },
        { receivableTime: '应收日期', itemType: 'datePicker', required: true, placeholder: '请选择', width: '120px' },
        { financialDate: '权责月', itemType: 'monthPicker', required: true, width: '120px' },
        { adjustAmountone: '调整金额', itemType: 'input', required: true, type: 'number' },
        { adjustReasonone: '调整原因', itemType: 'input' }
      ],
      type: 'tableBtn'
    }
  },
  computed: {
    tableDescConfig() {
      const list = [
        { text: '调整金额汇总(元)', value: this.summary }
      ]
      return list
    },
    summary() {
      let sum = 0
      console.log(this.currentFormData)
      this.currentFormData.tableData.forEach(item => {
        sum += Number(item.adjustAmountone)
      })
      return sum
    }
  },
  methods: {
    // 合同编号change
    contNoChange(val, index) {
      this.currentFormData.tableData[index].contNo = val.contNo
      this.currentFormData.tableData[index].tenantName = val.tenantName
      this.currentFormData.tableData[index].accountName = val.accountName
      this.currentFormData.adjustAmount = val.adjustAmount
    },
    enclosure() {
      this.isShowDialog = true
    },
    closeDialog() {
      this.isShowDialog = false
    },
    // 头部加号点击
    flodClick() {
      if (this.data.detailInfo.programName.length === 0) {
        this.$message({ message: '请先选择项目名称', type: 'error' })
        return
      }
      if (this.currentFormData.tableData !== undefined) {
        const datas = {
          contNo: '',
          accountName: '',
          tenantName: '',
          feeName: '',
          receivableTime: '',
          financialDate: '',
          adjustAmountone: '',
          adjustReasonone: ''
        }
        this.currentFormData.tableData.push(datas)
      }
    }
  }
}
</script>
<style scoped>
  .box{
    display: flex;
    justify-content: space-between;
  }
</style>
