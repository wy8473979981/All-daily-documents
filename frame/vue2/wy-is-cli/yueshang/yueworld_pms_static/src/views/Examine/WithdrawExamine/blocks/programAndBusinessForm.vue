<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 撤场清算-详情-财务信息
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
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'ProgramAndBusinessForm',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'programAndBusinessInfo',
    event: 'change'
  },
  props: {
    programAndBusinessInfo: {
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
          prop: 'tenantName',
          label: '商家/企业'
        },
        {
          itemType: 'text',
          prop: 'brandName',
          label: '品牌'
        },
        {
          itemType: 'text',
          prop: 'leaseArea',
          label: '租赁区域'
        },
        {
          itemType: 'text',
          prop: 'spaceLeasableArea',
          label: '计租面积'
        },
        {
          itemType: 'text',
          prop: 'contBeginDate',
          label: '合同开始日期'
        },
        {
          itemType: 'text',
          prop: 'contEndDate',
          label: '合同结束日期'
        },
        {
          itemType: 'text',
          prop: 'clearType',
          label: '解约类型'
        },
        {
          itemType: 'text',
          prop: 'contFallDate',
          label: '解约日期'
        },
        {
          itemType: 'text',
          prop: 'realEedDate',
          label: '撤场清算日期',
          width: '217px',
          span: 5
        },
        {
          itemType: 'text',
          label: '解约原因',
          prop: 'remark',
          width: '435px',
          span: 5
        }
      ]
    }
  },
  mounted() {
    console.log(this.currentFormData)
  },
  methods: {
    // 合同编号change
    contractNoChange(val) {
      this.currentFormData.programName = val.programName
      this.currentFormData.contNo = val.contNo
      this.currentFormData.tenantName = val.tenantName
      this.currentFormData.brandName = val.brandName
      this.currentFormData.leaseArea = val.leaseArea
      this.currentFormData.spaceLeasableArea = val.spaceLeasableArea
      this.currentFormData.contBeginDate = val.contBeginDate
      this.currentFormData.contEndDate = val.contEndDate
      this.currentFormData.clearType = val.clearType
      this.currentFormData.contFallDate = val.contFallDate
      this.currentFormData.remark = val.remark
    }
  }
}
</script>
