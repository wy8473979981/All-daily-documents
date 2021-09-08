<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同解约-详情-项目及商家信息
-->
<template>
  <el-form
    ref="rulesForm"
    :model="currentFormData"
    label-position="top"
    size="small"
  >
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable text />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'ProgramAndBusinessForm',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'programAndBusinessInfo',
    event: 'change'
  },
  props: {
    programAndBusinessInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'text',
          prop: 'programName',
          label: '项目名称'
        },
        {
          itemType: 'text',
          prop: 'contNo',
          label: '合同编号'
        },
        {
          itemType: 'text',
          prop: 'tenantName',
          label: '商家/企业'
        },
        {
          itemType: 'text',
          prop: 'brandName',
          label: '品牌'
        },
        {
          itemType: 'text',
          prop: 'leaseArea',
          label: '租赁区域'
        },
        {
          itemType: 'text',
          prop: 'floorGrossArea',
          label: '建筑面积(m²)'
        },
        {
          itemType: 'text',
          prop: 'contType',
          label: '合同类型'
        },
        {
          itemType: 'text',
          prop: 'spaceLeasableArea',
          label: '计租面积(m²)'
        },
        {
          itemType: 'text',
          prop: 'contBeginDate',
          label: '合同开始日期'
        },
        {
          itemType: 'text',
          prop: 'contEndDate',
          label: '合同结束日期'
        },
        {
          itemType: 'text',
          prop: 'clearType',
          label: '解约类型'
        },
        {
          itemType: 'text',
          prop: 'contFallDate',
          label: '解约日期'
        },
        {
          itemType: 'text',
          prop: 'remark',
          label: '解约原因',
          width: '435px',
          span: 5
        }
      ]
    }
  },
  methods: {
  }
}
</script>
