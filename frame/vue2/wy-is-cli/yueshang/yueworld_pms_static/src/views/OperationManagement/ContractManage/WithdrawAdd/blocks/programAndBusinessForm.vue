<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 撤场清算-新增-财务信息
-->
<template>
  <el-form
    ref="rulesForm"
    :model="currentFormData"
    label-position="top"
    size="small"
    :rules="rulesForm"
  >
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable>
      <template #remark>
        <el-input
          v-model="currentFormData.remark"
          resize="none"
          type="textarea"
          placeholder="请输入内容"
          max-length="300"
          :disabled="!currentFormData.contNo"
        />
      </template>
    </ysn-formItem>
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'ProgramAndBusinessForm',
  components: {},
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
      rulesForm: {
        choiceContractDialog: [{ required: true, message: '合同编号不能为空' }],
        realEedDate: [{ required: true, message: '撤场清算日期不能为空' }]
      }
    }
  },
  computed: {
    configData() {
      const that = this
      // 装修结束日大于装修开始日
      const pickerOptions = {
        disabledDate(time) {
          if (that.currentFormData.contFallDate) {
            return new Date(that.currentFormData.contFallDate).getTime() > time.getTime() + 1000 * 60 * 60 * 24
          }
        }
      }
      return [
        // 详情配置
        {
          itemType: 'choiceContractDialog',
          prop: 'contNo',
          label: '合同编号',
          required: true,
          placeholder: '请选择',
          change: this.contractNoChange
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'programName',
          label: '项目名称',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantName',
          label: '商家/企业',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'brandName',
          label: '品牌',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'leaseArea',
          label: '租赁区域',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'spaceLeasableArea',
          label: '计租面积(m²)',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'contBeginDate',
          label: '合同开始日期',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'contEndDate',
          label: '合同结束日期',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'clearType',
          label: '解约类型',
          disabled: true
        },
        {
          itemType: 'datePicker',
          inputType: 'autoValue',
          prop: 'contFallDate',
          label: '解约日期',
          disabled: true
        },
        {
          itemType: 'datePicker',
          prop: 'realEedDate',
          required: true,
          label: '撤场清算日期',
          placeholder: '请选择撤场清算日期',
          width: '217px',
          span: 5,
          change: this.realEedDateChange,
          pickerOptions: pickerOptions,
          disabled: !this.currentFormData.contNo
        },
        {
          itemType: 'input',
          label: '解约原因',
          prop: 'remark',
          width: '435px',
          disabled: true,
          span: 5
        }
      ]
    }
  },
  methods: {
    // 合同编号change
    contractNoChange(val) {
      this.currentFormData.programName = val.programName
      this.currentFormData.contNo = val.contNo
      this.currentFormData.tenantName = val.tenantName
      this.currentFormData.brandName = val.brandName
      this.currentFormData.leaseArea = val.leaseArea
      this.currentFormData.spaceLeasableArea = val.spaceLeasableArea
      this.currentFormData.contBeginDate = val.contBeginDate
      this.currentFormData.contEndDate = val.contEndDate
      this.currentFormData.clearType = val.clearType
      this.currentFormData.contFallDate = val.contFallDate
      this.currentFormData.remark = val.remark
    },
    // 解约日期change,获取到解约时间的财务信息
    realEedDateChange() {
      if (!this.currentFormData.contNo) {
        this.currentFormData.contFallDate = ''
        return this.$message.warning('请先选择合同')
      }
      this.$emit('comChange')
    }
  }
}
</script>
