<!--
 * @Author: sdy
 * @LastEditors: fhj
 * @Description:处理单详情基本信息模块
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable text />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import PUBFN from '@/utils/pubFn'
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
          prop: 'tenantName',
          label: '商家/企业',
          list: PUBFN.getOptionsList('transFerinmer')
        },
        {
          itemType: 'text',
          prop: 'programName',
          label: '项目'
        },
        {
          itemType: 'text',
          prop: 'dealNo',
          label: '处理编号'
        },
        {
          itemType: 'text',
          prop: 'brandName',
          label: '品牌名'
        },
        {
          itemType: 'text',
          prop: 'dealDate',
          label: '处理日期'
        },
        {
          itemType: 'text',
          prop: 'attachment',
          label: '附件'
        }
      ]
    }
  },
  methods: {
  }

}
</script>
