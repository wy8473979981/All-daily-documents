<!--
 * @Author: xza
 * @Date: 2021-08-02 10:47:36
 * @LastEditTime: 2021-09-06 14:00:57
 * @LastEditors: fhj
 * @Description: 保证金转换单新增/编辑-转换信息
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionAdd/blocks/form.vue
-->

<template>
  <el-form
    ref="ruleForm"
    :model="currentFormData"
    label-position="top"
    size="small"
    :rules="ruleForm"
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
    prop: 'baseInfo',
    event: 'change'
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        programName: '', // 项目
        ConversionDate: '', // 转换日期
        conversionNo: '', // 转换单号
        outTenantName: '', // 转出商家
        inTenantName: '', // 转入商家
        inContNo: '', // 转入合同
        description: '' // 备注
      },
      ruleForm: {
        inContNo: [
          { required: true, message: '请选择转入合同' }
        ],
        programName: [
          { required: true, message: '请选择项目' }
        ],
        ConversionDate: [
          { required: true, message: '请选择转换日期' }
        ],
        outTenantName: [
          { required: true, message: '请选择转出商家' }
        ],
        inTenantName: [
          { required: true, message: '请选择转入商家' }
        ]
      }
    }
  },
  computed: {
    configData() {
      return [
      // 表单配置
        {
          itemType: 'select',
          prop: 'programName',
          label: '项目',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('allProject'),
          change: this.contractNoChange
        },
        {
          itemType: 'datePicker',
          prop: 'ConversionDate',
          label: '转换日期',
          placeholder: '请选择',
          type: 'date',
          width: '206px',
          change: this.getNowDate
        },
        {
          itemType: 'input',
          prop: 'conversionNo',
          label: '转换单号',
          width: '206px',
          placeholder: '--系统自动带入--',
          disabled: true
        },
        {
          itemType: 'select',
          prop: 'outTenantName',
          label: '转出商家',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('outTenantName'),
          change: this.contractNoChange
        },
        {
          itemType: 'select',
          prop: 'inTenantName',
          label: '转入商家',
          placeholder: '请选择',
          width: '206px',
          list: this.$PUBFN.getOptionsList('outTenantName'),
          change: this.contractNoChange
        },
        {
          itemType: 'chooseNotSubject',
          prop: 'inContNo',
          label: '转入合同',
          width: '206px',
          change: this.contractNoChange,
          placeholder: '请选择'
        },
        {
          itemType: 'input',
          prop: 'description',
          type: 'textarea',
          label: '备注',
          span: 5,
          placeholder: '请填写',
          change: this.getAreaInfo
        }
      ]
    }
  },
  methods: {
    /**
     * @description: 获取当前选择日期
     * @param {*} val
     * @return {*}
     */
    getNowDate(val) {
      this.formData.ConversionDate = val
      this.$emit('comChange', this.formData)
    },
    /**
     * @description: 获取当前录入备注
     * @param {*} val
     * @return {*}
     */
    getAreaInfo(val) {
      this.formData.description = val
      // 反馈
      this.$emit('comChange', this.formData)
    },
    /**
     * @description: 表格选择交互逻辑
     * @param {*} val
     * @return {*}
     */
    contractNoChange(val) {
      console.log(val)
      if (val.clearType) {
        // 校验 项目字段是否为空
        if (this.formData.programName === '') {
          this.$message({
            message: '请先选择项目',
            type: 'error'
          })
          return
        }
        if (this.formData.inTenantName === '') {
          this.$message({
            message: '请选择转入商家',
            type: 'error'
          })
          return
        }
        // 校验通过 填充对应字段
        this.formData.inContNo = val.contNo
        // this.formData.conversionNo = val.conversionNo
      } else {
        // 默认先填充 项目字段，避免校验出错
        this.formData.programName = val.programName
        this.formData.ConversionDate = val.ConversionDate
        this.formData.description = val.description
        // 校验当前项目字段是否有值
        if (this.formData.programName === '') {
          val.outTenantName = ''
          val.inTenantName = ''
          this.$message({
            message: '请先选择项目',
            type: 'error'
          })
          return
        }
        // 校验通过 填充剩余对应字段
        this.formData.outTenantName = val.outTenantName
        this.formData.inTenantName = val.inTenantName
      }
      // 反馈
      this.$emit('comChange', this.formData)
    }
  }

}
</script>
