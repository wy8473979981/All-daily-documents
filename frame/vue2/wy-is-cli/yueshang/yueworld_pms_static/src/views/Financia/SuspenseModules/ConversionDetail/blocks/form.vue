<!--
 * @Author: sdy
 * @LastEditors: fhj
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
// import PUBFN from '@/utils/pubFn'
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
          itemType: 'conversionDialog',
          prop: 'rollTenantName',
          label: '转出商家',
          // list: PUBFN.getOptionsList('transFerinmer'),
          change: this.rollTenantName
        },
        {
          itemType: 'text',
          prop: 'rollBrandName',
          label: '转出品牌名'
        },
        {
          itemType: 'conversionDialog',
          prop: 'intoTenantName',
          label: '转入商家',
          // list: PUBFN.getOptionsList('transFerinmer'),
          change: this.intoTenantName
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
  },
  methods: {
    rollTenantName(val) {
      this.currentFormData.rollTenantName = val.rollTenantName
      if (this.currentFormData.intoTenantName === this.currentFormData.rollTenantName) {
        this.$message.error('转出商家和转入商家不能重复')
        this.currentFormData.rollTenantName = ''
      }
    },
    intoTenantName(val) {
      this.currentFormData.intoTenantName = val.intoTenantName
      if (this.currentFormData.intoTenantName === this.currentFormData.rollTenantName) {
        this.$message.error('转入商家和转出商家不能重复')
        this.currentFormData.intoTenantName = ''
      }
    }
  }

}
</script>
