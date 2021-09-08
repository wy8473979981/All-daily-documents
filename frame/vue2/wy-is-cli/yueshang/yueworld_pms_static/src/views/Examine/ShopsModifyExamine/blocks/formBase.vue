<!--
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="baseInfo" label-position="top" size="small">
    <ysn-formItem
      :form="baseInfo"
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
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfo',
    event: 'change'
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      configData: [
        {
          itemType: 'text',
          prop: 'programName',
          label: '所属项目',
          width: '206px'
        },
        {
          itemType: 'text',
          prop: 'buildingName',
          label: '所属楼栋',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'floorName',
          label: '所属楼层',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'spaceId',
          label: '商铺编码',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'spaceName',
          label: '铺位号',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'spaceType',
          label: '商业类型',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'spaceEquityNature',
          label: '产权性质',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'spaceLocation',
          label: '商铺属性',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'areaType',
          label: '计租方式',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'leasableArea',
          label: '计租面积(m²)',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'spaceGrossArea',
          label: '建筑面积(m²)',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'spaceNetArea',
          label: '套内面积(m²)',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'spaceStatus',
          label: '商铺状态',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'effectiveDate',
          label: '生效起始日期',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'radio',
          prop: 'vacancyRatio',
          label: '计入统计',
          width: '206px',
          list: [{ label: '出租率', value: '1' }],
          listName: 'label',
          listValue: '1'
        },
        {
          itemType: 'text',
          prop: 'remark',
          label: '备注',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'spaceGrossAreaNew',
          label: '新建筑面积(m²)',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'spaceNetAreaNew',
          label: '新套内面积(m²)',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        }
      ]
    }
  },
  mounted() {
    console.log('currentFormData', this.baseInfo, this.data)
  },
  methods: {}
}
</script>
