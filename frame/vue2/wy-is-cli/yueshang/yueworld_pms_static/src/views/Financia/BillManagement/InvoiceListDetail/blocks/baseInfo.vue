<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <!-- 基本信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" text />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'detailInfo',
    event: 'change'
  },
  props: {
    detailInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 基本信息表单配置
      configData: [
        // 表单配置
        {
          itemType: 'text',
          prop: 'programName',
          label: '项目名称',
          disabled: true
        },
        {
          itemType: 'text',
          prop: 'invoiceNumber',
          label: '编号',
          placeholder: '请选择',
          disabled: true
        },
        {
          itemType: 'text',
          prop: 'invoiceType',
          label: '发票类型',
          disabled: true
        },
        {
          itemType: 'text',
          prop: 'invoiceDate',
          label: '发票日期',
          disabled: true
        },
        {
          itemType: 'text',
          prop: 'status',
          label: '发票状态',
          disabled: true
        },
        {
          itemType: 'text',
          prop: 'makeInvoiceAmountThr',
          label: '发票金额(元)',
          disabled: true
        },
        {
          itemType: 'text',
          prop: 'untaxAccount',
          label: '不含税金额(元)',
          disabled: true
        },
        {
          itemType: 'text',
          prop: 'taxAccount',
          label: '税额(元)',
          disabled: true
        },
        {
          itemType: 'text',
          prop: 'buyer',
          label: '购买方',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'text',
          prop: 'seller',
          label: '销售方',
          width: '206px',
          disabled: true
        },
        {
          itemType: 'text',
          prop: 'remark',
          label: '备注说明',
          placeholder: '请输入',
          width: '50%',
          span: 4,
          isFirst: true,
          disabled: true
        }
      ]
    }
  },
  methods: {
  }

}
</script>
