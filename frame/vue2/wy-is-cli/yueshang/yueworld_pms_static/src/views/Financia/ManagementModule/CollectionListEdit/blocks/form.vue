<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-基本信息
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm" @comChange="comChange">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'Form',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'form',
    event: 'change'
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rulesForm: {
        applicableItems: [
          { required: true, message: '请选择适用项目' }
        ],
        unknownType: [
          { required: true, message: '请选择未名款项' }
        ]
      }
    }
  },
  computed: {
    configData() {
      if (this.currentFormData.unknownType === 1) {
      // 未名款展示组件
        return [
        // 表单配置
          {
            itemType: 'select',
            prop: 'applicableItems',
            label: '适用项目',
            width: '206px',
            placeholder: '请选择',
            list: this.$PUBFN.getOptionsList('entryName')
          },
          {
            itemType: 'input',
            prop: 'receivedId',
            label: '收款编号',
            width: '206px',
            disabled: true,
            placeholder: '系统自动生成'
          },
          {
            itemType: 'select',
            prop: 'unknownType',
            label: '未名款项',
            placeholder: '请选择',
            change: this.comChange,
            required: true,
            width: '206px',
            list: this.$PUBFN.getOptionsList('unnamedFunds')
          }
        ]
      }
      //  默认非未名款展示组件
      return [
        {
          itemType: 'selectBusiness',
          prop: 'tenantName',
          label: '商家/企业',
          width: '206px',
          required: true,
          change: this.businessChange
        },
        {
          itemType: 'input',
          prop: 'programName',
          width: '206px',
          label: '项目名称',
          disabled: true,
          placeholder: '自动带出'
        },
        {
          itemType: 'input',
          disabled: true,
          prop: 'receivedId',
          width: '206px',
          label: '收款编号',
          placeholder: '自动带出'
        },
        {
          itemType: 'input',
          disabled: true,
          width: '206px',
          prop: 'brandName',
          label: '品牌名',
          placeholder: '自动带出'
        },
        {
          itemType: 'input',
          disabled: true,
          prop: 'rentalArea',
          width: '206px',
          label: '租赁区域',
          placeholder: '自动带出'
        },
        {
          itemType: 'select',
          prop: 'unknownType',
          label: '未名款项',
          change: this.comChange,
          width: '206px',
          required: true,
          list: this.$PUBFN.getOptionsList('unnamedFunds')
        }
      ]
    }
  },
  methods: {
    comChange(val) {
      this.currentFormData.unknownType = val.unknownType
      this.$emit('comChange', val.unknownType)
    },
    // 商家/企业change
    businessChange(val) {
      this.currentFormData.tenantName = val.tenantName
      this.currentFormData.programName = val.programName
      this.currentFormData.receivedId = val.receivedId
      this.currentFormData.brandName = val.brandName
      this.currentFormData.rentalArea = val.rentalArea
    }
  }

}
</script>
