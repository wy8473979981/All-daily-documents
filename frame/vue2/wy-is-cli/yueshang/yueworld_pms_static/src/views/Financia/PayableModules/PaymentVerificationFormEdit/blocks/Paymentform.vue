<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:付款核销单-详情
-->

<template>
  <!-- 表单 -->
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable text />
  </el-form>
</template>
<script>
// 混入
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Paymentform',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfoPayment',
    event: 'change'
  },
  props: {
    baseInfoPayment: {
      type: Object,
      default: () => {}
    }
  },
  //   表单数据
  data() {
    return {
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'text',
          type: 'money',
          prop: 'payableAmount',
          label: '本次付款金额',
          formatter: this.payableAmount
        },
        {
          itemType: 'text',
          prop: 'payableType',
          label: '付款方式'
        },
        {
          itemType: 'text',
          prop: 'accountName',
          label: '付款单位'
        },
        {
          itemType: 'text',
          prop: 'bankName',
          label: '付款银行'
        },
        {
          itemType: 'text',
          prop: 'bankAccount',
          label: '付款账号'
        },
        {
          itemType: 'text',
          prop: 'payableDate',
          label: '付款日期'
        }
      ]
    }
  },
  methods: {
    // 给本次付款金额添加千位分割
    payableAmount(cellValue) {
      cellValue.payableAmount += ''
      if (!cellValue.payableAmount.includes('.')) cellValue.payableAmount += '.'
      return cellValue.payableAmount.replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
        return $1 + ','
      }).replace(/\.$/, '')
    }
  }
}
</script>
