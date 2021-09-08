<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Group',
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
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'BuildingName', label: '所属楼栋', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
      ],
      rulesForm: { // 表单验证
        BuildingName: [{ required: true, message: '请输入必填项' }],
        FloorName: [{ required: true, message: '请输入必填项' }]
      }
    }
  },
  mounted() {
    console.log('currentFormData', this.baseInfo, this.currentFormData)
  },
  methods: {
    flodClick() {
      console.log('headerClick')
      this.currentFormData.dataList.push({ a: 123123 })
    },
    handelChange(val) {
      this.currentFormData.decorationEnterDate = val
    },
    handleChange(val) {
      console.log(this.currentFormData)
      this.currentFormData.dataList.push({ a: 123123 })
    }
  }

}
</script>
