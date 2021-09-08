/*
 * @Author: sdy
 * @LastEditors: xueyx
 * @Description:处理单详情审核记录模块
*/
<template>
  <div>
    <ysn-tableDesc
      class="pb-8 pl-10"
      :config="currentTableDescConfig"
    />

    <!-- 表格 -->
    <ysn-formTable
      :checkbox="false"
      prop="list"
      :data="currentFormData"
      :column="tableConfig"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'UserInfo',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'userInfo',
    event: 'change'
  },
  props: {
    userInfo: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { payeeCompanyType: '收款单位类型', itemType: 'text' },
        { taxpayerName: '收款账户名称', itemType: 'text' },
        { bankName: '收款账户银行', itemType: 'text' },
        { bankAccount: '银行账户', itemType: 'text' }
      ]
    }
  },
  computed: {
    currentTableDescConfig() {
      const data = [
        { text: '合计缴款(元)',
          value: this.currentFormData.totalPayment
        }
      ]
      return data
    }
  },

  methods: {

  }
}
</script>
