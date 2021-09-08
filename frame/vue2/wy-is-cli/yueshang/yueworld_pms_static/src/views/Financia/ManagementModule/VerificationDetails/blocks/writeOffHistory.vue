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
      show-operation="false"
      :column="formTableConfig"
      :first-row-add="false"
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'WriteOffHistory',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'writeOffHistory',
    event: 'change'
  },
  props: {
    writeOffHistory: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      flag: false,
      formTableConfig: [
        // TODO 4个字段都未找到
        { processingTime: '处理时间', itemType: 'text', width: '200px' },
        { processor: '处理者', itemType: 'text', width: '200px' },
        { step: '步骤', itemType: 'text', width: '200px' },
        { explain: '操作说明', itemType: 'text', width: '200px' }
      ]
    }
  },
  methods: {
    // 头部加号点击
    flodClick() {
      if (this.currentFormData.tableData !== undefined) {
        const datas = {
          fileName: '',
          attachment: []
        }
        this.currentFormData.tableData.push(datas)
      }
    }
  }
}
</script>
