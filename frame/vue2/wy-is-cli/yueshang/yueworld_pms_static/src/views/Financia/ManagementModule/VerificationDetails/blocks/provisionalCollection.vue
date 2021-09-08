<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销单-新增-应收冲减信息
-->
<template>
  <el-form :model="currentFormData" label-position="top" size="small">
    <ysn-tableDesc :config="tableDescConfig" />
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
  name: 'ProvisionalCollection',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'provisionalCollection',
    event: 'change'
  },
  props: {
    provisionalCollection: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      flag: false,
      formTableConfig: [
        { feeName: '费项', sortable: 'true', itemType: 'text', fixedWidth: 180 },
        { advanceAmount: '转暂收金额(元)', sortable: 'true', itemType: 'text', type: 'money', fixedWidth: 200 },
        { applyadvanceAmount: '申请核销金额(元)', sortable: 'true', itemType: 'text', type: 'money', fixedWidth: 280 }
      ]
    }
  },
  computed: {
    tableDescConfig() {
      const list = [
        { text: '应收冲减金额汇总(元)', value: this.temporary, type: 'money' }
      ]
      return list
    },
    // 标题-应收冲减金额汇总 计算
    temporary() {
      let sum = 0
      if (this.currentFormData.tableData.length === 1) {
        sum = Number(this.currentFormData.tableData[0].advanceAmount)
      } else {
        this.currentFormData.tableData.forEach(val => {
          sum += Number(val.advanceAmount)
        })
      }
      return sum
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
