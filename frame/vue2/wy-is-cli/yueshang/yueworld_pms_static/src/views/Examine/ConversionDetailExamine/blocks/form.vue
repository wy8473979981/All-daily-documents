<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单详情转换信息
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
          label: '项目'
        },
        {
          itemType: 'text',
          prop: 'rollTenantName',
          label: '转出商家'
        },
        {
          itemType: 'text',
          prop: 'rollBrandName',
          label: '转出品牌名'
        },
        {
          itemType: 'text',
          prop: 'intoTenantName',
          label: '转入商家'
        },
        {
          itemType: 'text',
          prop: 'intoBrandName',
          label: '转入品牌名'
        },
        {
          itemType: 'text',
          prop: 'ConversionDate',
          label: '转换日期'
        },
        {
          itemType: 'text',
          prop: 'description',
          label: '备注'
        }
      ]
    }
  }
}
</script>
