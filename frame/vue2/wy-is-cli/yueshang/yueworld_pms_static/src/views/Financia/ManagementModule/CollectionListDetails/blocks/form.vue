<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-基本信息详情
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData.formData" label-position="top" size="small">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData.formData" :config="configData" :column="5" clearable text />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'form',
    event: 'change'
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      newForm: [
        {
          itemType: 'text',
          prop: 'tenantName',
          label: '商家/企业'
        },
        {
          itemType: 'text',
          prop: 'programName',
          label: '项目名称'
        },
        {
          itemType: 'text',
          prop: 'receivedId',
          label: '收款编号'
        },
        {
          itemType: 'text',
          prop: 'brandName',
          label: '品牌名'
        },
        {
          itemType: 'text',
          prop: 'rentalArea',
          label: '租赁区域'
        },
        {
          itemType: 'text',
          prop: 'unknownType',
          label: '未名款项'
        }
      ],
      configData: [
        // 详情配置
        {
          itemType: 'text',
          prop: 'programName',
          label: '项目名称'
        },
        {
          itemType: 'text',
          prop: 'receivedId',
          label: '收款编号'
        },
        {
          itemType: 'text',
          prop: 'unknownType',
          label: '未名款项'
        }
      ]
    }
  },
  created() {
    if (this.$route.query.unknownType === 2) {
      this.configData = this.newForm
    }
  }
}
</script>
