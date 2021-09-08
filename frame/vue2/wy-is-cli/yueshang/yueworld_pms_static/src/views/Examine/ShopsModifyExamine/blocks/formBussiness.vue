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
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      configData: [
        // 新单元表单配置
        {
          itemType: 'text',
          prop: 'spaceFormatNamePlan',
          label: '规划业态',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        },
        {
          itemType: 'text',
          prop: 'brandFormatName',
          label: '签约业态',
          width: '206px',
          listName: 'label',
          listValue: 'value'
        }
      ],
      // 表单验证
      rulesForm: {}
    }
  }
}
</script>
