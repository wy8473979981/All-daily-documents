<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable text />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'formBaseOld',
    event: 'change'
  },
  props: {
    formBaseOld: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    configData() {
      return [ // 新单元表单配置
        { itemType: 'text', prop: 'buildingName', label: '楼栋' },
        { itemType: 'text', prop: 'floorName', label: '楼层' },
        { itemType: 'text', prop: 'officeNo', label: '单元编码' },
        { itemType: 'text', prop: 'officeId', label: '单元号' },
        { itemType: 'text', prop: 'officeType', label: '营运类型' },
        { itemType: 'text', prop: 'officeEquityNature', label: '产权性质' },
        { itemType: 'text', prop: 'areaType', label: '计租面积类型' },
        { itemType: 'text', prop: 'leasableArea', label: '计租面积(m²)' },
        { itemType: 'text', prop: 'spaceGrossArea', label: '建筑面积(m²)' },
        { itemType: 'text', prop: 'spaceNetArea', label: '套内面积(m²)' }
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
