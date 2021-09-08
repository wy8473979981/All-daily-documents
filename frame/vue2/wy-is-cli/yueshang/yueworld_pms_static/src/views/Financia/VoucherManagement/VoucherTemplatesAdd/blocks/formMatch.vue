/*
 * @Author: xiaoxie
 * @Date: 2021-08-03 15:16:35
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-03 17:30:22
 */
<template>
  <el-form
    ref="ruleForm"
    :model="currentFormData"
    label-position="top"
    size="small"
    :rules="rulesForm"
  >
    <ysn-formItem
      :form="currentFormData"
      :config="configData"
      :column="5"
      clearable
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'From',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'formMatchData',
    event: 'change'
  },
  props: {
    formMatchData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [
        // 表单配置
        {
          itemType: 'select',
          prop: 'ibTypeId',
          label: '收付类型',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('receiptPaymentType')
        },
        {
          itemType: 'select',
          prop: 'storeTypes',
          label: '铺位类型',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('storeTypes')
        },
        {
          itemType: 'select',
          prop: 'paymentTypeName',
          label: '收款方式',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('paymentMethod')
        },
        {
          itemType: 'select',
          prop: 'derateType',
          label: '减免类型',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('derateTypeList')
        },
        {
          itemType: 'select',
          prop: 'levelId',
          label: '模板级别',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('levelIdList'),
          change: this.changesBox
        },
        {
          itemType: 'select',
          prop: 'accountName',
          label: '账套名称',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('subjectRelationFee')
        },
        {
          itemType: 'select',
          prop: 'isAgentReceivced',
          label: '是否代收',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('isAgentReceivced')
        },
        {
          itemType: 'select',
          prop: 'isBackAgentReceivced',
          label: '是否被代收',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('isBackAgentReceivced')
        },
        {
          itemType: 'select',
          prop: 'isBeforVer',
          label: '是否提前核销',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('isBeforVer')
        },
        {
          itemType: 'select',
          prop: 'isAfterPaid',
          label: '是否后付',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('isAfterPaid')
        },
        {
          itemType: 'select',
          prop: 'abstract',
          label: '征收类型',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('taxCollectType')
        },
        {
          itemType: 'select',
          prop: 'isInvoice',
          label: '是否已开票',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('isInvoice')
        },
        {
          itemType: 'select',
          prop: 'spaceEquityNature',
          label: '产权性质',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('spaceEquityNatureList')
        }
      ],
      rulesForm: {
        ibTypeId: [
          { required: true, message: '请选择收付类型' }
        ],
        levelId: [
          { required: true, message: '请选择模板级别' }
        ]
      }
    }
  },
  methods: {
    changesBox(val) {
      if (val.levelId === 2) {
        this.$set(this.rulesForm, 'accountName', { required: true, message: '请选择账套名称', trigger: 'blur' })
      } else {
        this.$set(this.rulesForm, 'accountName', '')
      }
    }
  }
}
</script>
