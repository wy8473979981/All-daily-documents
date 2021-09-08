<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
/*
 * @Author: xiaoxie
 * @Date: 2021-08-03 15:28:58
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-25 11:06:46
 */
<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      ref="entryRules"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :first-row-add="false"
    >
      <template slot="otherBtn" slot-scope="scope">
        <el-image :src="require('@/assets/image/copy.png')" class="ml-12 copyIcon" @click="copyBox(scope.row)" />
      </template>
    </ysn-formTable>
    <!-- <Dialog /> -->
    <!-- 辅助核酸 -->
    <Assist :is-show-dialog="dialogAddVisible" @closeDialog="closeDialog" @getData="getAssistDataBox" />
    <!-- 摘要弹窗 -->
    <AbstractDialog :is-show-dialog="abstractVisible" @closeDialog="closeAbstractVisible" @getData="getAbstractDataBox" />
    <!-- 科目名称弹窗 -->
    <SubjectDialog :is-show-dialog="subjectVisible" @closeDialog="closeSubjectVisible" @getData="getSubjectDataBox" />

  </div>
</template>

<script>
import PUBFN from '@/utils/pubFn'
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import Assist from './formItem/assistItem/assist'
import AbstractDialog from './formItem/abstractItem/abstractDialog'
import SubjectDialog from './formItem/subjectDialog'
export default {
  name: 'Table',
  components: {
    Assist, AbstractDialog, SubjectDialog
  },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'entryRulesData',
    event: 'change'
  },
  props: {
    entryRulesData: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialogAddVisible: false, // 辅助核算
      currentAbstractVal: null,
      abstractVisible: false, // 摘要弹窗
      currentAssistingRuleVal: null,
      abstractIndex: 0, // 摘要index
      assistingRuleIndex: 0, // 辅助核算index
      subjectVisible: false,
      subjectIndex: 0,
      tableConfig: [
        { t0: '分录行号', type: 'index', fixedWidth: '120px', sortable: true, showFixed: true },
        { abstract: '摘要', itemType: 'input', fixedWidth: 120, listeners: { focus: this.abstractBox }},
        { direction: '方向', itemType: 'select', list: PUBFN.getOptionsList('direction'), fixedWidth: 120 },
        { costProject: '费用项目', itemType: 'selectDialog', list: PUBFN.getOptionsList('allProjectFees'), fixedWidth: 180 },
        { feeName: '冲抵费项', itemType: 'selectDialog', list: PUBFN.getOptionsList('feeNameList'), fixedWidth: 180 },
        { subjectVal: '科目编号/科目名称', itemType: 'input', fixedWidth: 140, listeners: { focus: this.subjectBox }},
        { assistingRule: '辅助核算', itemType: 'input', list: PUBFN.getOptionsList('openInvoic'), fixedWidth: 120, listeners: { focus: this.handleFocus }},
        { amountFormula: '金额取数公式', itemType: 'select', list: PUBFN.getOptionsList('amountFormulaList'), fixedWidth: 120 },
        { taxValue: '自定义税率（%）', itemType: 'select', list: PUBFN.getOptionsList('openInvoic'), fixedWidth: 140 },
        { cashflow: '现金流量', itemType: 'select', list: PUBFN.getOptionsList('openInvoic'), fixedWidth: 120 },
        { enterSeq: '对应分录号', itemType: 'input', fixedWidth: 120 },
        { remark: '备注', itemType: 'input', listeners: { input: this.expenditureChange }, fixedWidth: 120 }
      ]
    }
  },
  methods: {
    // 点击新增一行
    flodClick() {
      if (this.currentFormData.tableData !== undefined) {
        const datas = { abstract: '', direction: '', costProject: [], feeName: [], subjectId: '', assistingRule: '', amountFormula: '', taxValue: '', cashflow: '', enterSeq: '', remark: '' }
        this.currentFormData.tableData.push(datas)
      }
    },
    // 复制
    copyBox(row) {
      this.currentFormData.tableData.push(row)
    },
    // 摘要弹窗
    abstractBox(from, index) {
      this.abstractIndex = index
      this.currentAbstractVal = null
      this.abstractVisible = true
    },
    // 摘要弹窗关闭
    closeAbstractVisible() {
      this.abstractVisible = false
    },
    // 摘要赋值
    getAbstractDataBox(val) {
      this.currentAssistVal = val
      this.currentFormData.tableData[this.abstractIndex].abstract = val.arrLabel.toString()
      this.currentFormData.tableData[this.abstractIndex].abstractArr = val.arrVal
    },
    // 辅助核算
    getAssistDataBox(val) {
      this.currentAssistingRuleVal = val
      this.currentFormData.tableData[this.assistingRuleIndex].assistingRule = val.arrLabel.toString()
      this.currentFormData.tableData[this.assistingRuleIndex].assistingRuleArr = val.arrVal
    },
    // 辅助核算
    handleFocus(form, index) {
      this.assistingRuleIndex = index
      this.currentAssistingRuleVal = null
      this.dialogAddVisible = true
    },
    // 关闭
    closeDialog() {
      this.dialogAddVisible = false
    },
    // 科目名称弹窗
    subjectBox(form, index) {
      this.subjectVisible = true
      this.subjectIndex = index
    },
    // 关闭科目名称
    closeSubjectVisible() {
      this.subjectVisible = false
    },
    // 科目名称弹窗赋值
    getSubjectDataBox(val) {
      this.currentFormData.tableData[this.subjectIndex].subjectId = val.arrLabel
      this.currentFormData.tableData[this.subjectIndex].subjectVal = val.arrVal
    }
  }
}
</script>
<style scoped>
  .copyIcon{vertical-align: -webkit-baseline-middle;}
    ::v-deep.copyIcon img,.el-image__inner{vertical-align: text-bottom!important;}
</style>
