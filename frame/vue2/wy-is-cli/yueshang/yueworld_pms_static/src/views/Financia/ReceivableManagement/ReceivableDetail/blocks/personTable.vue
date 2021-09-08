/*
 * @Author: sdy
 * @LastEditors: xueyx
 * @Description:处理单详情审核记录模块
*/

<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="currentFormData.tableData"
      :column="tableConfig"
      select-key="id"
      is-dis-table
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'PersonInfo',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'personInfo',
    event: 'change'
  },
  props: {
    personInfo: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { payeeCompanyType: '', columnClass: 'hasBg', width: 113 },
        { settlementRealName: '姓名', itemType: 'text', label: '' },
        { settlementTel: '电话', itemType: 'text', label: '' },
        { settlementEmail: '邮箱', itemType: 'text', label: '' },
        { settlementFax: '传真', itemType: 'text', label: '' }
      ]
    }
  },

  methods: {

  }
}
</script>
