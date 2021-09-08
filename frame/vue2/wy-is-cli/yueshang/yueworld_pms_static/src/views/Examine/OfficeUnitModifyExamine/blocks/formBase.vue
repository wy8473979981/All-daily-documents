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
          prop: 'officeId',
          label: '单元编码',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'officeName',
          label: '单元号',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'officeType',
          label: '营运类型',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'officeEquityNature',
          label: '产权性质',
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
          prop: 'officeGrossArea',
          label: '建筑面积(m²)',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'officeNetArea',
          label: '套内面积(m²)',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'officeStatus',
          label: '单元状态',
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
          itemType: 'text',
          prop: 'leasableArea',
          label: '计租面积(m²)',
          width: '206px',
          listName: 'label',
          listValue: 'value'
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
          prop: 'officeGrossAreaNew',
          label: '新建筑面积(m²)',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'officeNetAreaNew',
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
