<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单转换信息
-->
<template>
  <el-form
    ref="rulesForm"
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
import PUBFN from '@/utils/pubFn'
export default {
  name: 'ProgramAndBusinessForm',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'programAndBusinessInfo',
    event: 'change'
  },
  props: {
    programAndBusinessInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 表单验证
      rulesForm: {
        programName: [
          { required: true, message: '请选择 项目名称' }
        ],
        rollTenantName: [
          { required: true, message: '请选择 转出商家' }
        ],
        intoTenantName: [
          { required: true, message: '请选择 转入商家' }
        ],
        ConversionDate: [
          { required: true, message: '请选择 转换日期' }
        ]
      },
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'select',
          prop: 'programName',
          inputType: 'autoValue',
          label: '项目',
          placeholder: '请选择项目',
          list: PUBFN.getOptionsList('PayableList')
        },
        {
          itemType: 'conversionDialog',
          prop: 'rollTenantName',
          label: '转出商家',
          placeholder: '请选择',
          change: this.contractNoChange,
          required: true
        },
        {
          itemType: 'input',
          prop: 'rollBrandName',
          label: '转出品牌名',
          disabled: true,
          placeholder: '--系统自动生成--'

        },
        {
          itemType: 'conversionDialog',
          prop: 'intoTenantName',
          label: '转入商家',
          placeholder: '请选择商家',
          list: PUBFN.getOptionsList('transFerinmer'),
          required: true,
          change: this.intoChange
        },
        {
          itemType: 'input',
          prop: 'intoBrandName',
          label: '转入品牌名',
          disabled: true,
          placeholder: '--系统自动生成--'
        },
        {
          itemType: 'datePicker',
          inputType: 'autoValue',
          prop: 'ConversionDate',
          label: '转换日期',
          required: true
        },
        {
          itemType: 'input',
          type: 'textarea',
          prop: 'description',
          label: '备注',
          span: 5,
          isFirst: true
        }
      ]
    }
  },
  methods: {
    // 判断转入商家与转出商家不可相等
    intoChange(val) {
      if (val) {
        // 校验 项目字段是否为空
        if (this.currentFormData.programName === '') {
          this.$message({
            message: '请选择项目',
            type: 'error'
          })
          return
        }
      }
      this.currentFormData.intoTenantName = val.intoTenantName
      this.currentFormData.intoBrandName = val.intoBrandName
      const list = PUBFN.getOptionsList('transFerinmer')
      let label = ''
      list.forEach(item => {
        if (item.label === val.intoTenantName) {
          label = item.label
        }
      })
      if (label === this.currentFormData.rollTenantName) {
        this.$message.error('转入商家和转出商家不能重复')
        this.currentFormData.intoTenantName = ''
      }
    },
    // 合同编号change
    contractNoChange(val) {
      if (this.currentFormData.programName === '') {
        this.$message({
          message: '请先选择项目',
          type: 'error'
        })
        return
      }
      this.currentFormData.rollBrandName = val.rollBrandName
      this.currentFormData.rollTenantName = val.rollTenantName
      const list = PUBFN.getOptionsList('transFerinmer')
      let label = ''
      list.forEach(item => {
        if (item.label === this.currentFormData.intoTenantName) {
          label = item.label
        }
      })
      if (label === this.currentFormData.rollTenantName) {
        this.$message.error('转出家和转入商家不能重复')
        this.currentFormData.rollTenantName = ''
      }
    }
  }
}
</script>

