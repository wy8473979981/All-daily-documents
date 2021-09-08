<!--
 * @Author: xiaoxie
 * @LastEditors:fhj
 * @Description: 装修进场详情-装修进场审批
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top">
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable text />
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
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'text',
          prop: 'contNo',
          label: '合同编号'
        },
        {
          itemType: 'text',
          prop: 'programName',
          label: '项目名称'
        },
        {
          itemType: 'text',
          prop: 'tenantName',
          label: '商家名称'
        },
        {
          itemType: 'text',
          prop: 'leaseArea',
          label: '租赁区域'
        },
        {
          itemType: 'text',
          prop: 'brandName',
          label: '品牌名称'
        },
        {
          itemType: 'text',
          prop: 'spaceLeasableArea',
          label: '计租面积（㎡）'
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
          prop: 'decorationEnterDate',
          label: '装修进场日期'

        }, // TODO 字段不明确
        {
          itemType: 'text',
          prop: 'decorateEndDate',
          label: '装修结束日期'
        },
        {
          itemType: 'text',
          prop: 'acceptanceDate',
          label: '验收日期'
        },
        {
          itemType: 'text',
          prop: 'expectOpenDate',
          label: '预计开业日期'

        },
        {
          itemType: 'text',
          prop: 'description',
          label: '备注说明',
          span: 4,
          isFirst: true
        }
      ]
    }
  },
  methods: {
    flodClick() {
      console.log('headerClick')
    }
  }

}
</script>
