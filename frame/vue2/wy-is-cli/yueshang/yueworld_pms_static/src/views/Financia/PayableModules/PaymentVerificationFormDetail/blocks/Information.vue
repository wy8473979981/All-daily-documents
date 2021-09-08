<!--
 * @Author: jllk
 * @Date: 2021-07-22 16:59:01
 * @Last Modified by:   jllk
 * @Last Modified time: 2021-07-22 16:59:01
  -->

<template>
  <!-- 表单 -->
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable />
  </el-form>
</template>
<script>
// 混入
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Information',
  components: {},
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
  //   表单数据
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'input', prop: 'verificationId', label: '核销编号', placeholder: '请输入', width: '206px', inputType: 'autoValue', disabled: true },
        { itemType: 'input', prop: 'programName', label: '项目名称', placeholder: '请输入', width: '206px', inputType: 'autoValue', disabled: true },
        { itemType: 'input', prop: 'contNo', label: '合同编号', placeholder: '请输入', width: '206px', inputType: 'autoValue', disabled: true },
        { itemType: 'input', prop: 'brandName', label: '品牌名', placeholder: '请输入', width: '206px', inputType: 'autoValue', disabled: true },
        { itemType: 'input', prop: 'tenantId', label: '商家/企业', placeholder: '请输入', width: '206px', inputType: 'autoValue', disabled: true },
        { itemType: 'datePicker', prop: 'verificationDate', label: '核销日期', width: '206px' },
        { itemType: 'input', prop: 'updatePerson', label: '核销人', placeholder: '请输入', width: '206px', inputType: 'autoValue', disabled: true },
        { itemType: 'input', prop: 'status', label: '状态', placeholder: '请输入', width: '206px', inputType: 'autoValue', disabled: true }
      ],
      rulesForm: { // 表单验证
        verificationDate: [{ required: true, message: '', trigger: 'change' }]

      }
    }
  },
  methods: {
  }
}
</script>
