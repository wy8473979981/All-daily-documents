<!--
 * @Author: xza
 * @Date: 2021-08-02 10:47:36
 * @LastEditTime: 2021-08-11 09:43:02
 * @LastEditors: xza
 * @Description: 保证金转换单详情-基本信息
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionDetails/blocks/form.vue
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top">
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
          prop: 'programName',
          label: '项目'
        },
        {
          itemType: 'text',
          prop: 'ConversionDate',
          label: '转换日期'
        },
        {
          itemType: 'text',
          prop: 'conversionNo',
          label: '转换单号'
        },
        {
          itemType: 'text',
          prop: 'outTenantName',
          label: '转出商家'
        },
        {
          itemType: 'text',
          prop: 'inTenantName',
          label: '转入商家'
        },
        {
          itemType: 'text',
          prop: 'inContNo',
          label: '转入合同'
        },
        {
          itemType: 'text',
          prop: 'description',
          label: '备注',
          span: 10
        }
      ]
    }
  }

}
</script>
