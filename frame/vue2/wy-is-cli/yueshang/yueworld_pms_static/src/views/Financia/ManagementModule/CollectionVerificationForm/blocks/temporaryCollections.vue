<!--
 * @Author: fzx
 * @LastEditors: xueyx
 * @Description:收款单-编辑-暂收款信息
-->
<template>
  <el-form :model="currentFormData" label-position="top" size="small">
    <ysn-tableDesc :config="tableDescConfig" />
    <ysn-formTable
      ref="countData"
      v-model="currentFormData"
      prop="tableData"
      show-operation="false"
      :column="formTableConfig"
      add
      :first-row-add="false"
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import PUBFN from '@/utils/pubFn'
export default {
  name: 'TemporaryCollections',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'temporaryCollections',
    event: 'change'
  },
  props: {
    temporaryCollections: {
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
      formTableConfig: [
        { feeName: '费项', sortable: 'true', itemType: 'select', list: PUBFN.getOptionsList('expenditure') },
        { advanceAmount: '转暂收金额(元)', sortable: 'true', itemType: 'input', inputType: 'Number', type: 'number', listeners: { input: this.advanceAmountListeners }},
        { applyadvanceAmount: '申请核销金额(元)', sortable: 'true', itemType: 'input', inputType: 'Number', type: 'number' }
      ]
    }
  },
  computed: {
    tableDescConfig() {
      const list = [
        { text: '转暂收金额汇总(元)', value: this.currentFormData.allNum, type: 'money' }
      ]
      return list
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        //  当未添加核销明细 且转暂收款只有一条记录时，转暂收款金额不可编辑
        if (newVal.writeOffDetails.tableData.length === 0 && newVal.temporaryCollections.tableData.length === 1) {
          this.currentFormData.tableData[0].disabled = true
        // 当未添加核销明细 ，转暂收款有多条记录时，  除第一条记录外 其他转暂收金额输入框可编辑
        } else if (newVal.writeOffDetails.tableData.length === 0 && newVal.temporaryCollections.tableData.length > 1) {
          this.currentFormData.tableData[0].disabled = true
        } else {
          this.currentFormData.tableData[0].disabled = false
        }
        this.advanceAmountListeners()
      }
    }
  },
  methods: {
    // 暂收款-转暂收金额 的计算逻辑
    advanceAmountListeners(val) {
      let num = 0
      for (let i = 1; i < this.currentFormData.tableData.length; i++) {
        num += Number(this.currentFormData.tableData[i].advanceAmount)
      }
      if (num <= this.currentFormData.allNum) {
        this.currentFormData.tableData[0].advanceAmount = this.currentFormData.allNum - num
      } else {
        this.$message.error('超过收款金额')
        val.advanceAmount = ''
      }
    },
    // 头部加号点击
    async flodClick() {
      if (this.currentFormData.tableData !== undefined) {
        const datas = {
          fileName: '',
          advanceAmount: '',
          applyadvanceAmount: ''
        }
        this.currentFormData.tableData.push(datas)
      }
    }
  }
}
</script>
