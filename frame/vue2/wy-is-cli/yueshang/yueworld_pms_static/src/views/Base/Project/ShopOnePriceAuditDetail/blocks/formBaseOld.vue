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
        { itemType: 'text', prop: 'floorName', label: '楼层' },
        { itemType: 'text', prop: 'standardId', label: '规划业态' },
        { itemType: 'text', prop: 'spaceType', label: '商铺类型' },
        { itemType: 'text', prop: 'averagePriceProgram', label: '得房率(%)' }, // todo
        { itemType: 'text', prop: 'spaceEquityNature', label: '产权类型' },
        { itemType: 'text', prop: 'spaceLocation', label: '商铺属性' },
        { itemType: 'text', prop: 'areaType', label: '计租面积类型' },
        { itemType: 'text', prop: 'leasableArea', label: '计租面积(m²)' },
        { itemType: 'text', prop: 'spaceGrossArea', label: '建筑面积(m²)' },
        { itemType: 'text', prop: 'spaceNetArea', label: '套内面积(m²)' },
        { itemType: 'text', prop: 'otherArea', label: '其他面积(m²)' }
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
