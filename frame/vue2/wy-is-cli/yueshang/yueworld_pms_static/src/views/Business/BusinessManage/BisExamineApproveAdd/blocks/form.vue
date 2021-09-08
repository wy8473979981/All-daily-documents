<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:开业审批编新增页信息模块
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable />
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
      rulesForm: {
        contNo: [
          { required: true, message: '请选择合同编号' }
        ],
        openDate: [
          { required: true, message: '请选择日期' }
        ]
      },
      configData: [
        // 表单配置
        {
          itemType: 'choiceContractDialog',
          prop: 'contNo',
          label: '合同编号',
          placeholder: '请选择',
          width: '206px',
          change: this.contractNoChange
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'programName',
          label: '项目名称',
          disabled: true,
          width: '206px'
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantName',
          label: '商家名称',
          disabled: true,
          width: '206px'
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'leaseArea',
          label: '租赁区域',
          disabled: true,
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'brandName',
          inputType: 'autoValue',
          label: '品牌名称',
          disabled: true,
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'spaceLeasableArea',
          label: '计租面积（㎡）',
          inputType: 'autoValue',
          disabled: true,
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'contBeginDate',
          label: '合同开始日期',
          inputType: 'autoValue',
          disabled: true,
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'contEndDate',
          label: '合同结束日期',
          inputType: 'autoValue',
          disabled: true,
          width: '206px'
        },
        {
          itemType: 'datePicker',
          prop: 'openDate',
          label: '确认开业日期',
          type: 'date',
          width: '206px'
        },
        {
          itemType: 'input',
          type: 'textarea',
          prop: 'description',
          label: '备注说明',
          placeholder: '请输入',
          width: '425px',
          span: 4,
          isFirst: true
        }

      ]
    }
  },
  methods: {
    // 合同编号change
    contractNoChange(val) {
      this.$emit('comChange', val)
    }
  }

}
</script>
