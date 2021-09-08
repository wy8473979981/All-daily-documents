<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:付款核销单-详情
-->

<template>
  <!-- 表单 -->
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable text />
  </el-form>
</template>
<script>
// 混入
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
  //   表单数据
  data() {
    return {
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'text',
          prop: 'verificationId',
          label: '核销单号'
        },
        {
          itemType: 'text',
          prop: 'programName',
          label: '项目名称'
        },
        {
          itemType: 'text',
          prop: 'contNo',
          label: '合同编号'
        },
        {
          itemType: 'text',
          prop: 'brandName',
          label: '品牌名'
        },
        {
          itemType: 'text',
          prop: 'tenantId',
          label: '商家/企业'
        },
        {
          itemType: 'text',
          prop: 'verificationDate',
          label: '核销日期'
        },
        {
          itemType: 'text',
          prop: 'updatePerson',
          label: '核销人'
        },
        {
          itemType: 'text',
          prop: 'status',
          label: '状态'
        }
      ]
    }
  },
  methods: {
  }

}
</script>
