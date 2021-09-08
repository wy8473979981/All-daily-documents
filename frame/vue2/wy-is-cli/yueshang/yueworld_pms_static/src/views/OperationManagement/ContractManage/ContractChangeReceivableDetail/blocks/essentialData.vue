<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-合同应收调整详情-基本信息
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
import PUBFN from '@utils/pubFn'
export default {
  name: 'EssentialData',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'essentialData',
    event: 'change'
  },
  props: {
    essentialData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    configData() {
      return [
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
          inputType: 'autoValue',
          prop: 'brandName',
          label: '品牌名称'
        },
        {
          itemType: 'text',
          inputType: 'autoValue',
          prop: 'tenantName',
          label: '商户名称'
        },
        {
          itemType: 'text',
          inputType: 'autoValue',
          prop: 'contBeginDate',
          label: '合同开始日期'
        },
        {
          itemType: 'text',
          inputType: 'autoValue',
          prop: 'contEndDate',
          label: '合同结束日期'
        },
        {
          itemType: 'text',
          inputType: 'autoValue',
          prop: 'spaceName',
          label: '铺位号'
        },
        {
          itemType: 'text',
          inputType: 'autoValue',
          prop: 'spaceLeasableArea',
          type: 'number',
          label: '计租面积(m²)'
        },
        {
          itemType: 'text',
          prop: 'remark',
          label: '变更原因',
          width: '435px',
          span: 5
        }
      ]
    }
  },
  methods: {}
}
</script>
