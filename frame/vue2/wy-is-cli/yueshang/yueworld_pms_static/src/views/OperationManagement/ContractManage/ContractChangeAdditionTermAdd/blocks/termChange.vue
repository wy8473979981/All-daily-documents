<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-补充条款新增-条款变更
-->

<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      :show-slots="['contractTerm']"
    >
      <template #contractTerm="scope">
        <el-input
          v-model="scope.row.contractTerm"
          placeholder="请输入内容"
          :disabled="!data.essentialData.contNo"
          @change="changeData(scope)"
        />
      </template>
    </ysn-formTable>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'TermChange',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'termChange',
    event: 'change'
  },
  props: {
    termChange: {
      type: Object, default: () => {}
    },
    data: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      formTableRules: {},
      tableConfig: [
        { changeItem: '变更项', sortable: false, fixedWidth: 206, itemType: 'text' },
        { contractTerm: '合同条款', sortable: false, required: true, hasSlot: true }
      ]
    }
  },
  mounted() {
    this.currentFormData.tableData[0].contractTerm = this.currentFormData.beforeChangeContTerms
    this.currentFormData.tableData[1].contractTerm = this.currentFormData.afterChangeContTerms
  },
  methods: {
    changeData(scope) {
      const index = scope.$index
      this.currentFormData[index === 0 ? 'beforeChangeContTerms' : 'afterChangeContTerms'] = scope.row.contractTerm
    }
  }
}
</script>

