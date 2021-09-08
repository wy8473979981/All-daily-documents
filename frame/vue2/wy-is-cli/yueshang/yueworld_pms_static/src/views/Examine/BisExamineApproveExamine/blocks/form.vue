<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:开业审批详情页信息模块
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <!-- 信息模块-->
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
    prop: 'detailInfo',
    event: 'change'
  },
  props: {
    detailInfo: {
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
          prop: 'openDate',
          label: '确认开业日期'
        },
        {
          itemType: 'text',
          prop: 'description',
          label: '备注说明',
          isFirst: true
        }
      ]
    }
  },
  methods: {
  }

}
</script>
