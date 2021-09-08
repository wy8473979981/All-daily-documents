<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同解约-新增-项目及商家信息
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
          type="textarea"
          placeholder="请输入内容"
          max-length="300"
          :disabled="!currentFormData.contNo"
          resize="none"
        />
      </template>
    </ysn-formItem>
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'
import PUBFN from '@utils/pubFn'
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
        clearType: [{ required: true, message: '解约类型不能为空' }],
        contFallDate: [{ required: true, message: '解约日期不能为空' }]
      }
    }
  },
  computed: {
    configData() {
      const that = this
      // 装修结束日大于装修开始日
      const pickerOptions = {
        disabledDate(time) {
          if (that.currentFormData.contBeginDate && that.currentFormData.contEndDate) {
            return new Date(that.currentFormData.contEndDate).getTime() < time.getTime() ||
                new Date(that.currentFormData.contBeginDate).getTime() > time.getTime() + 1000 * 60 * 60 * 24
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
          itemType: 'select',
          prop: 'programName',
          label: '项目名称',
          placeholder: '请选择项目',
          list: PUBFN.getOptionsList('programName'),
          listName: 'label',
          disabled: true,
          listValue: 'value',
          multiple: false
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
          prop: 'floorGrossArea',
          label: '建筑面积(m²)',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'contType',
          label: '合同类型',
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
          itemType: 'select',
          prop: 'clearType',
          required: true,
          label: '解约类型',
          placeholder: '请选择解约类型',
          list: PUBFN.getOptionsList('clearType'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.currentFormData.contNo
        },
        {
          itemType: 'datePicker',
          prop: 'contFallDate',
          required: true,
          type: 'date',
          label: '解约日期',
          placeholder: '请选择解约日期',
          change: this.contFallDateChange,
          pickerOptions: pickerOptions,
          disabled: !this.currentFormData.contNo
        },
        {
          itemType: 'input',
          hasSlot: true,
          prop: 'remark',
          label: '解约原因',
          width: '435px',
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
      this.currentFormData.floorGrossArea = val.floorGrossArea
      this.currentFormData.contType = val.contType
      this.currentFormData.spaceLeasableArea = val.spaceLeasableArea
      this.currentFormData.contBeginDate = val.contBeginDate
      this.currentFormData.contEndDate = val.contEndDate
    },
    // 解约日期change,获取到解约时间的财务信息
    contFallDateChange() {
      if (!this.currentFormData.contNo) {
        this.currentFormData.contFallDate = ''
        return this.$message.warning('请先选择合同')
      }
      this.$emit('comChange')
    }
  }
}
</script>
