<!--
 * @Author: zbk
 * @Date: 2021-07-24 14:21:54
 * @LastEditTime: 2021-08-04 16:12:07
 * @LastEditors: xza
-->
<template>
  <el-form
    ref="userInfo"
    :model="currentFormData"
    label-position="top"
  >
    <ysn-formItem
      :form="currentFormData"
      :config="configData"
      :column="4"
      clearable
      text
    />
  </el-form>
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
    userInfo: {
      type: Object,
      default: () => {}
    },
    routeMess: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    configData() {
      if (this.routeMess.id === 5 || this.routeMess.id === '5') {
        return [
        // 表单配置
          {
            itemType: 'text',
            prop: 'isTenant',
            label: '是否商家'
          },
          {
            itemType: 'text',
            prop: 'operationDate',
            label: '开票日期'
          },
          {
            itemType: 'text',
            prop: 'status',
            label: '收据状态'
          },
          {
            itemType: 'text',
            prop: 'receiptId',
            label: '收据编号'
          },
          {
            itemType: 'text',
            prop: 'contNo',
            label: '合同编号'
          },
          {
            itemType: 'text',
            prop: 'programName',
            label: '项目名称'
          },
          {
            itemType: 'text',
            prop: 'tenantName',
            label: '商家/企业名称'
          },
          {
            itemType: 'text',
            prop: 'accountName',
            label: '收款单位'
          },
          {
            itemType: 'text',
            prop: 'payConpanyName',
            label: '缴款单位'
          },
          {
            itemType: 'text',
            prop: 'operationUser',
            label: '经办人员'
          },
          {
            itemType: 'text',
            prop: 'securityCode',
            label: '防伪编码'
          },
          {
            itemType: 'text',
            type: 'textarea',
            prop: 'remark',
            label: '备注信息',
            span: 10
          }
        ]
      }
      if (this.routeMess.id === 2 || this.routeMess.id === 3 || this.routeMess.id === 4) {
        return [
        // 表单配置
          {
            itemType: 'text',
            prop: 'isTenant',
            label: '是否商家',
            placeholder: '自动带出，可编辑'
          },
          {
            itemType: 'text',
            prop: 'operationDate',
            label: '开票日期',
            required: false
          },
          {
            itemType: 'text',
            prop: 'status',
            label: '收据状态',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            prop: 'receiptId',
            label: '收据编号',
            placeholder: '--系统自动生成--',
            disabled: true
          }, {
            itemType: 'text',
            prop: 'securityCode',
            label: '防伪编码',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            type: 'textarea',
            prop: 'remark',
            label: '备注信息',
            placeholder: '自动带出，可编辑',
            span: 10
          }
        ]
      } else {
        return [
          {
            itemType: 'text',
            prop: 'programName',
            label: '项目名称',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            prop: 'receiptId',
            label: '收据编号',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            prop: 'invoiceType',
            label: '收据类型',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            prop: 'operationDate',
            label: '开票日期',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            prop: 'status',
            label: '收据状态',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            prop: 'amountOne',
            label: '收据金额',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            prop: 'untaxAccount',
            label: '不含税金额',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            prop: 'taxAccount',
            label: '税额',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            prop: 'buyer',
            label: '购买方',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            prop: 'seller',
            label: '销售方',
            placeholder: '--系统自动生成--',
            disabled: true
          },
          {
            itemType: 'text',
            type: 'textarea',
            prop: 'remark',
            label: '备注信息',
            placeholder: '自动带出，可编辑',
            span: 10
          }
        ]
      }
    }
  }
}
</script>
