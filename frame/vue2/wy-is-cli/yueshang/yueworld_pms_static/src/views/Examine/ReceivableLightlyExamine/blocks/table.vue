/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 应收减免详情页
 */
<template>
  <div>
    <!-- 汇总 -->
    <div class="pb-8">
      <ysn-tableDesc :config="[{value:currentFormData.derateAmount,text:'申请减免汇总(元)'}]" />
    </div>
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="currentFormData.tableData"
      :column="tableConfig"
      select-key="id"
    />
    <ysn-page :total="currentFormData.tableData.length" :page="{page:1,pageSize:20}" :page-size="['10']" @change="currentChange" />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Table',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'countData',
    event: 'change'
  },
  props: {
    countData: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { receivableNo: '应收编号' },
        { feeName: '费项' },
        { receivableTime: '应收日期&权责月', formatter: row => this.changeTime(row) },
        { derateType: '减免类型' },
        { receivableAmount: '应收金额(元)', type: 'money', width: 105 },
        { DerateAmount: '可减免金额(元)', type: 'money', width: 125 },
        { applyDerateAmount: '申请减免金额(元)', type: 'money', width: 145 }
      ]
    }
  },
  methods: {
    changeTime(row) {
      return row.receivableTime + '/' + row.financialDate
    },
    currentChange(val) {
      this.$emit('comChange', val)
    }
  }
}
</script>
