<!--
 * @Author: fhj
 * @LastEditors: zengcheng
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    {{ $attrs.title }}
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'From1',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfo1',
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
        { itemType: 'select', prop: 'BuildingName', label: '所属楼栋', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'FloorName', label: '楼层', placeholder: '请选择全部楼层', width: '200px', change: this.handelChange },
        { itemType: 'select', prop: 'OfficeId', label: '单元号', placeholder: '请选择单元号', width: '200px' }
      ],
      rulesForm: { // 表单验证
        BuildingName: [{ required: true, message: '请输入必填项' }],
        FloorName: [{ required: true, message: '请输入必填项' }]
      }
    }
  },
  mounted() {
    console.log(this.currentFormData)
  },
  methods: {
    flodClick() {
      console.log('headerClick')
    },
    handelChange(val) {
      this.currentFormData.BuildingName = 0
    }
  }

}
</script>
