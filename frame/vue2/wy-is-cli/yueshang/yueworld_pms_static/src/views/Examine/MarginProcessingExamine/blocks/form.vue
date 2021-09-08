/*
 * @Author: xiaoxie
 * @Date: 2021-07-28 10:30:51
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-03 10:23:09
 */
<template>
  <el-form
    ref="ruleForm"
    :model="currentFormData"
    label-position="top"
    size="small"
  >
    <ysn-formItem
      :form="currentFormData"
      :config="configData"
      :column="5"
      clearable
      text
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
      configData: [
        { itemType: 'text', prop: 'contNo', label: '合同编号' },
        { itemType: 'text', inputType: 'autoValue', prop: 'programName', label: '项目' },
        { itemType: 'text', inputType: 'autoValue', prop: 'marginNo', label: '处理单号' },
        { itemType: 'text', prop: 'brandName', inputType: 'autoValue', label: '品牌' },
        { itemType: 'text', inputType: 'autoValue', prop: 'tenantName', label: '商家' },
        { itemType: 'text', inputType: 'autoValue', prop: 'leaseArea', label: '租赁区域' },
        { itemType: 'text', prop: 'actionDate', label: '处理日期', width: '200px', type: 'date' }
      ]
    }
  }
}
</script>
