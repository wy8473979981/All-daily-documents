<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-收款信息
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData.baseInfo" label-position="top" size="small" :rules="rulesForm">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData.baseInfo" :config="configData" :column="5" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'CollectionFome',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'collectionFome',
    event: 'change'
  },
  props: {
    collectionFome: {
      type: Object,
      default: () => {}
    },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
    }
  },
  computed: {
    configData() {
      const un = this.data.form.unknownType
      if (un === 1) {
        return [
        // 表单配置
          {
            itemType: 'input',
            inputType: 'Number',
            type: 'number',
            prop: 'receivedAmount',
            label: '收款金额',
            placeholder: '请输入',
            required: true,
            width: '206px'
          },
          {
            itemType: 'select',
            prop: 'paymentTypeName',
            label: '收款方式',
            placeholder: '请选择',
            width: '206px',
            required: true,
            list: this.$PUBFN.getOptionsList('paymentMethod')
          },
          {
            itemType: 'input',
            inputType: 'String',
            type: 'string',
            prop: 'bankFlowNumber',
            width: '206px',
            label: '银行流水号',
            change: this.bankFlowNumberChange
          },
          {
            itemType: 'select',
            prop: 'accountName',
            label: '收款单位',
            width: '206px',
            placeholder: '请选择',
            required: true,
            change: this.accountNameChange,
            list: this.$PUBFN.getOptionsList('payee')
          },
          {
            itemType: 'input',
            disabled: true,
            prop: 'bankName',
            width: '206px',
            placeholder: '自动带出',
            label: '收款银行'
          },
          {
            itemType: 'input',
            disabled: true,
            prop: 'bankAccount',
            placeholder: '自动带出',
            width: '206px',
            label: '收款账号'
          },
          {
            itemType: 'input',
            disabled: true,
            prop: 'receivedPerson',
            placeholder: '自动带出',
            width: '206px',
            label: '收款人'
          },
          {
            itemType: 'datePicker',
            prop: 'receivedDate',
            label: '收款日期',
            placeholder: '请选择',
            width: '206px',
            required: true
          },
          {
            itemType: 'input',
            prop: 'draweeName',
            label: '付款人姓名',
            placeholder: '请输入',
            width: '206px'
          },
          {
            itemType: 'input',
            prop: 'draweeBank',
            label: '付款人银行',
            placeholder: '请输入',
            width: '206px'
          },
          {
            itemType: 'input',
            type: 'number',
            prop: 'draweeBankAccount',
            label: '付款人账号',
            placeholder: '请输入',
            width: '206px'
          },
          {
            itemType: 'input',
            type: 'textarea',
            prop: 'remark',
            label: '备注',
            placeholder: '请输入',
            width: '434px',
            span: 6
          }
        ]
      }
      return [
        // 表单配置
        {
          itemType: 'input',
          inputType: 'Number',
          type: 'number',
          prop: 'receivedAmount',
          label: '收款金额',
          placeholder: '请输入',
          required: true,
          width: '206px'
        },
        {
          itemType: 'select',
          prop: 'paymentTypeName',
          label: '收款方式',
          placeholder: '请选择',
          width: '206px',
          required: true,
          list: this.$PUBFN.getOptionsList('paymentMethod')
        },
        {
          itemType: 'input',
          inputType: 'String',
          type: 'string',
          prop: 'bankFlowNumber',
          width: '206px',
          label: '银行流水号',
          change: this.bankFlowNumberChange
        },
        {
          itemType: 'select',
          prop: 'accountName',
          label: '收款单位',
          width: '206px',
          placeholder: '请选择',
          required: true,
          change: this.accountNameChange,
          list: this.$PUBFN.getOptionsList('payee')
        },
        {
          itemType: 'input',
          disabled: true,
          prop: 'bankName',
          width: '206px',
          placeholder: '自动带出',
          label: '收款银行'
        },
        {
          itemType: 'input',
          disabled: true,
          prop: 'bankAccount',
          placeholder: '自动带出',
          width: '206px',
          label: '收款账号'
        },
        {
          itemType: 'input',
          disabled: true,
          prop: 'receivedPerson',
          placeholder: '自动带出',
          width: '206px',
          label: '收款人'
        },
        {
          itemType: 'datePicker',
          prop: 'receivedDate',
          label: '收款日期',
          placeholder: '请选择',
          width: '206px',
          required: true
        },
        {
          itemType: 'input',
          type: 'textarea',
          prop: 'remark',
          label: '备注',
          placeholder: '请输入',
          width: '434px',
          span: 6
        }
      ]
    },
    rulesForm() {
      const un = this.data.form.unknownType
      if (un === 1) {
        return {
          receivedAmount: [
            { required: true, message: '请选择收款金额' }
          ],
          paymentTypeName: [
            { required: true, message: '请选择收款方式' }
          ],
          accountName: [
            { required: true, message: '请选择收款单位' }
          ],
          receivedDate: [
            { required: true, message: '请选择收款日期' }
          ],
          draweeName: [
            { required: true, message: '请输入付款人姓名' }
          ],
          draweeBank: [
            { required: true, message: '请输入付款人银行' }
          ],
          draweeBankAccount: [
            { required: true, message: '请输入付款人账号' }
          ]
        }
      } else {
        return {
          receivedAmount: [
            { required: true, message: '请选择收款金额' }
          ],
          paymentTypeName: [
            { required: true, message: '请选择收款方式' }
          ],
          accountName: [
            { required: true, message: '请选择收款单位' }
          ],
          receivedDate: [
            { required: true, message: '请选择收款日期' }
          ]
        }
      }
    }
  },
  methods: {
    bankFlowNumberChange(val) {
      const check = /^[A-Za-z0-9]+$/
      if (!check.test(val)) {
        this.currentFormData.baseInfo.bankFlowNumber = ''
      }
    },
    accountNameChange(val) {
      const programName = this.data.form.programName
      const applicableItems = this.data.form.applicableItems
      const unknownType = this.data.form.unknownType
      if (!programName && unknownType === 2) {
        val.accountName = ''
        this.$message.error('请先选择商家/企业')
        return
      }
      if (!applicableItems && unknownType === 1) {
        val.accountName = ''
        this.$message.error('请先选择适用项目')
        return
      }
      switch (val.accountName) {
        case 1:
          val.bankName = '中国建设银行'
          val.bankAccount = '6228569568459656513'
          break
        case 2:
          val.bankName = '中国招商银行'
          val.bankAccount = '6228569568459641252'
          break
        case 3:
          val.bankName = '中国农业银行'
          val.bankAccount = '6228569568459656965'
          break
        case 4:
          val.bankName = '中国邮政储蓄银行'
          val.bankAccount = '6228569568459623625'
          break
      }
    }
  }
}
</script>
