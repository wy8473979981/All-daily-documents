<!--
 * @Author: chenkeju9933
 * @LastEditors: chenkeju9933
 * @Description: 费用调整单详情页头部信息模块
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
          prop: 'programName',
          label: '项目名称'
        },
        {
          itemType: 'text',
          prop: 'adjustId',
          label: '调整单号'
        },
        {
          itemType: 'text',
          prop: 'adjustReason',
          label: '调整原因'
        }
      ]
    }
  },
  methods: {
  }

}
</script>
