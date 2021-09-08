<!--
 * @Author: xiaoxie
 * @LastEditors: fhj
 * @Description: 品牌落位详情-品牌落位综合信息
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
          prop: 'programName',
          label: '项目'
        },
        {
          itemType: 'text',
          prop: 'brandPlacementNo',
          label: '编号'
        },
        {
          itemType: 'text',
          prop: 'note',
          label: '备注'
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
    flodClick() {
      console.log('headerClick')
    }
  }

}
</script>
