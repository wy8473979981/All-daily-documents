<!--
 * @Description:合同台帐-详情-商务信息
 * @Author: wyz
 * @LastEditors: wyz
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
      <ysn-formItem :form="currentFormData" :config="configData" :column="$attrs.column" clearable text />
    </el-form>
  </div>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'BusinessAffairs',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'businessAffairs',
    event: 'change'
  },
  props: {
    businessAffairs: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      configData: [
        { itemType: 'text', prop: 'contNo', label: '合同编号', width: 120 },
        { itemType: 'text', prop: 'programName', label: '项目名称', width: 120 },
        { itemType: 'text', prop: 'contType', label: '合同类型' },
        { itemType: 'text', prop: 'leaseArea', label: '租赁区域' },
        { itemType: 'text', prop: 'tenantName', label: '商家/企业' },
        { itemType: 'text', prop: 'brandName', label: '品牌名' },
        { itemType: 'text', prop: 'contFallDate', label: '解约日期' },
        { itemType: 'text', prop: 'brandFormatName', label: '签约业态' },
        { itemType: 'text', prop: 'spaceFormatNamePlan', label: '规划业态' },
        { itemType: 'text', prop: 'contBeginDate', label: '合同开始日期' },
        { itemType: 'text', prop: 'contEndDate', label: '合同结束日期' },
        { itemType: 'text', prop: 'rentYears', label: '租期' },
        { itemType: 'text', prop: 'decoratePeriod', label: '装修期' },
        { itemType: 'text', prop: 'meterRentBeginDate', label: '租金起计日' },
        { itemType: 'text', prop: 'managementBeginDate', label: '物管起计日' },
        { itemType: 'text', prop: 'decorationEnterDate', label: '装修进场日' },
        { itemType: 'text', prop: 'decorateEndDate', label: '装修结束日' },
        { itemType: 'text', prop: 'openDate', label: '开业日期' },
        { itemType: 'text', prop: 'textType', label: '文本类型' }
      ]
    }
  },
  methods: {}
}
</script>

