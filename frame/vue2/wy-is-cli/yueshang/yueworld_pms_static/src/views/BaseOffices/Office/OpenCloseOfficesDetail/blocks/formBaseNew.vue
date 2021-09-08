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
import PUBFN from '@/utils/pubFn'
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'FormBaseNew',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfo',
    event: 'change'
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return {
          otherArea: []
        }
      }
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'text', prop: 'buildingName', label: '楼栋' },
        { itemType: 'text', prop: 'floorName', label: '楼层' },
        { itemType: 'text', prop: 'officeId', label: '单元号' },
        { itemType: 'text', prop: 'officeType', label: '营运类型' },
        { itemType: 'text', prop: 'officeEquityNature', label: '产权性质' },
        { itemType: 'text', prop: 'areaType', label: '计租面积类型' },
        { itemType: 'text', prop: 'leasableArea', label: '计租面积(m²)' },
        { itemType: 'text', prop: 'spaceGrossArea', label: '建筑面积(m²)' },
        { itemType: 'text', prop: 'spaceNetArea', label: '套内面积(m²)' },
        { itemType: 'text', width: '206px', prop: 'effectiveDate', label: '生效起始日期' },
        { itemType: 'checkbox', width: '206px', prop: 'otherArea', label: '计入统计', disabled: true, list: PUBFN.getOptionsList('officeSumType') }
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
