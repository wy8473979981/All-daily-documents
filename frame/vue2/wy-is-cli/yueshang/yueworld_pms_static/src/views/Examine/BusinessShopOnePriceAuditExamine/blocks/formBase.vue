<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="data" label-position="top" size="small">
    <ysn-formItem :form="data" :config="configData" :column="5" clearable text />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'text', prop: 'programName', label: '项目名称', placeholder: '请选择', width: '206px', listName: 'label', listValue: 'value' },
        { itemType: 'text', prop: 'standardId', label: '批次号', placeholder: '请选择', width: '206px', listName: 'label', listValue: 'value' },
        { itemType: 'text', prop: 'averagePriceProgram', label: '项目平均价格', placeholder: '请选择', width: '206px', listName: 'label', listValue: 'value' }
      ]
    }
  },
  mounted() {
    console.log('currentFormData', this.baseInfo, this.currentFormData)
  },
  methods: {
  }
}
</script>
