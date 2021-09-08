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
        { itemType: 'text', width: '206px', prop: 'buildingName', label: '楼栋' },
        { itemType: 'text', width: '206px', prop: 'floorName', label: '楼层' },
        { itemType: 'text', width: '206px', prop: 'spaceId', label: '商铺编码' },
        { itemType: 'text', width: '206px', prop: 'spaceName', label: '铺位号' },
        { itemType: 'text', width: '206px', prop: 'spaceType', label: '商业类型' },
        { itemType: 'text', width: '206px', prop: 'spaceEquityNature', label: '产权性质' },
        { itemType: 'text', width: '206px', prop: 'spaceLocation', label: '商铺属性' },
        { itemType: 'text', width: '206px', prop: 'planning', label: '规划业态' }, // todo:待确认字段
        { itemType: 'text', width: '206px', prop: 'areaType', label: '计租面积类型' },
        { itemType: 'text', width: '206px', prop: 'leasableArea', label: '计租面积(m²)', type: 'Number' },
        { itemType: 'text', width: '206px', prop: 'spaceGrossArea', label: '建筑面积(m²)', type: 'Number' },
        { itemType: 'text', width: '206px', prop: 'spaceNetArea', label: '套内面积(m²)', type: 'Number' },
        { itemType: 'text', width: '206px', prop: 'effectiveDate', label: '生效起始日期' },
        { itemType: 'checkbox', width: '206px', prop: 'otherArea', label: '计入统计', disabled: true, list: PUBFN.getOptionsList('sumType') }
        // { itemType: 'text', width: '206px', prop: 'standardDeposit', label: '租赁保证金标准(元)' },
        // { itemType: 'text', width: '206px', prop: 'standardDecorationDeposit', label: '装修保证金标准(元)' },
        // { itemType: 'text', width: '206px', prop: 'standardRentFreePeriod', label: '免租期(天)' }
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
