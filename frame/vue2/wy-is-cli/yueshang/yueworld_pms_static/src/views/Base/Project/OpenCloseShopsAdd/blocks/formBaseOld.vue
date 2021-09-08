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
      // const { id } = this.$route.query
      return [ // 新单元表单配置
        { itemType: 'text', prop: 'buildingName', label: '楼栋' },
        { itemType: 'text', prop: 'floorName', label: '楼层' },
        { itemType: 'text', prop: 'spaceId', label: '商铺编码' },
        { itemType: 'text', prop: 'spaceName', label: '铺位号' },
        { itemType: 'text', prop: 'spaceType', label: '商业类型' },
        { itemType: 'text', prop: 'spaceEquityNature', label: '产权性质' },
        { itemType: 'text', prop: 'spaceLocation', label: '商铺属性' },
        { itemType: 'text', prop: 'planning', label: '规划业态' },
        { itemType: 'text', prop: 'areaType', label: '计租面积类型' },
        { itemType: 'text', prop: 'leasableArea', label: '计租面积(m²)' },
        { itemType: 'text', prop: 'spaceGrossArea', label: '建筑面积(m²)' },
        { itemType: 'text', prop: 'spaceNetArea', label: '套内面积(m²)' }
      ]
      // 编辑表单配置
      /* if (id) {
        return [ // 新单元表单配置
          { itemType: 'text', prop: 'buildingName', label: '楼栋' },
          { itemType: 'text', prop: 'floorName', label: '楼层' },
          { itemType: 'text', prop: 'spaceId', label: '商铺编码' },
          { itemType: 'text', prop: 'spaceName', label: '铺位号' },
          { itemType: 'text', prop: 'spaceType', label: '商业类型' },
          { itemType: 'text', prop: 'spaceEquityNature', label: '产权性质' },
          { itemType: 'text', prop: 'spaceLocation', label: '商铺属性' },
          { itemType: 'text', prop: 'planning', label: '规划业态' },
          { itemType: 'text', prop: 'areaType', label: '计租面积类型' },
          { itemType: 'text', prop: 'leasableArea', label: '计租面积(m²)' },
          { itemType: 'text', prop: 'spaceGrossArea', label: '建筑面积(m²)' },
          { itemType: 'text', prop: 'spaceNetArea', label: '套内面积(m²)' }
        ]
      }
      return [ // 新单元表单配置
        { itemType: 'text', prop: 'floorName', label: '楼层' },
        { itemType: 'text', prop: 'planning', label: '规划业态' },
        { itemType: 'text', prop: 'spaceType', label: '商铺类型' },
        { itemType: 'text', prop: 'getPercent', label: '得房率(%)' }, // todo
        { itemType: 'text', prop: 'spaceEquityNature', label: '产权性质' },
        { itemType: 'text', prop: 'spaceLocation', label: '商铺属性' },
        { itemType: 'text', prop: 'areaType', label: '计租面积类型' },
        { itemType: 'text', prop: 'leasableArea', label: '计租面积(m²)' },
        { itemType: 'text', prop: 'spaceGrossArea', label: '建筑面积(m²)' },
        { itemType: 'text', prop: 'spaceNetArea', label: '套内面积(m²)' },
        { itemType: 'text', prop: 'otherArea', label: '其他面积(m²)' }
      ]*/
    }
  },
  mounted() {
    console.log('currentFormData', this.baseInfo, this.currentFormData)
  },
  methods: {
  }
}
</script>
