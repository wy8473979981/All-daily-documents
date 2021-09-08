<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-核销明细信息
-->
<template>
  <el-form :model="currentFormData" label-position="top" size="small">
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      :column="formTableConfig"
      :first-row-add="false"
      add
    />
    <DialogFormAdd
      :is-show-dialog="dialogAdd"
      @closeDialog="close_"
      @getData="getData"
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import DialogFormAdd from './item/offsetDialo.vue'
export default {
  name: 'WriteOffDetails',
  components: {
    DialogFormAdd
  },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'writeOffDetails',
    event: 'change'
  },
  props: {
    writeOffDetails: {
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
      dialogAdd: false,
      config: [
        { receivableNo: '应收编号', sortable: 'true', itemType: 'text', width: '122px' },
        { receivableTime: '应收日期', sortable: 'true', itemType: 'text', width: '120px' },
        { financialDate: '权责月', sortable: 'true', itemType: 'text', width: '80px' },
        { receivableAmount: '应收金额(元)', sortable: 'true', itemType: 'text', width: '120px', type: 'money' },
        { applyDerateAmountTotal: '减免金额(元)', sortable: 'true', itemType: 'text', width: '120px', type: 'money' },
        { unverifiedAmount: '未核销金额(元)', sortable: 'true', itemType: 'text', width: '130px', type: 'money' },
        { collectionVerification: '收款核销(元)', sortable: 'true', itemType: 'input', width: '120px', type: 'number', inputType: 'Number' }

      ],
      configTwo: [
        { zanOffsetAmount: '预收款冲抵(元)', sortable: 'true', itemType: 'input', width: '130px', type: 'number', inputType: 'Number' },
        { baoOffsetAmount: '保证金冲抵(元)', sortable: 'true', itemType: 'input', width: '130px', type: 'number', inputType: 'Number' },
        { receivableReductionAmount: '应收冲减(元)', sortable: 'true', itemType: 'input', width: '120px', type: 'number', inputType: 'Number' }
      ]
    }
  },
  computed: {
    formTableConfig() {
      // 当冲抵   应收冲减  没有数据时，预收款冲抵 保证金冲抵，应收冲减  字段隐藏。
      if (
        this.data.offset.tableData.length === 0 &&
        this.data.offset.tableDataTwo.length === 0 &&
        this.data.receivableDeduction.tableData.length === 0
      ) {
        return this.config
      }
      return [...this.config, ...this.configTwo]
    }
  },
  created() {
    setTimeout(() => {
      // 当已添加核销明细金额 时， 核销金额大于收款金额 时，第一条记录收款核销输入框默认为收款金额
      if (Number(this.data.essential.receivedAmount) > Number(this.data.contract.receivedAmount)) {
        this.currentFormData.tableData[0].collectionVerification = this.data.contract.receivedAmount
        // 核销金额小于收款金额时，第一条收款核销输入框默认为核销金额   如果存在第二条数据依次类推
      } else if (Number(this.data.essential.receivedAmount) < Number(this.data.contract.receivedAmount)) {
        this.currentFormData.tableData[0].collectionVerification = this.data.essential.receivedAmount
      }
    }, 100)
  },
  methods: {
  // 头部加号点击
    flodClick() {
      this.dialogAdd = true
    },
    // 获取弹窗数据
    getData(val) {
      this.currentFormData.tableData = [...this.currentFormData.tableData, ...val]
    },
    // 关闭弹窗
    close_() {
      this.dialogAdd = false
    }
  }
}
</script>
