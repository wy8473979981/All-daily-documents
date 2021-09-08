/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:
*/

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
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'contractDialog',
          prop: 'contNo',
          label: '合同编号',
          placeholder: '请选择合同编号',
          change: this.contractNoChange
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'programName',
          disabled: true,
          label: '项目名称'
        },
        {
          itemType: 'input',
          prop: 'brandName',
          inputType: 'autoValue',
          disabled: true,
          label: '品牌名'
        },
        {
          itemType: 'input',
          prop: 'tenantName',
          inputType: 'autoValue',
          disabled: true,
          label: '商家/企业'
        },

        {
          itemType: 'input',
          prop: 'leaseArea',
          disabled: true,
          inputType: 'autoValue',
          label: '租赁区域'
        }
      ],
      rulesForm: {
        contNo: [
          { required: true, message: '请选择合同编号' }
        ]
      }
    }
  },
  methods: {
    // 合同编号change
    contractNoChange(val) {
      this.currentFormData.contNo = val.contNo
      this.currentFormData.programName = val.programName
      this.currentFormData.brandName = val.brandName
      this.currentFormData.tenantName = val.tenantId
      this.currentFormData.leaseArea = val.leaseArea
      // this.$emit('comChange', val)
    }
  }

}
</script>
