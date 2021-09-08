<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:处理单新增基本信息模块
-->
<template>
  <el-form
    ref="rulesForm"
    :model="currentFormData"
    label-position="top"
    size="small"
    :rules="rulesForm"
  >
    <ysn-formItem
      :form="currentFormData"
      :config="configData"
      :column="5"
      clearable
    />
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
      // 表单验证
      rulesForm: {
        tenantName: [
          { required: true, message: '请选择合同编号' }
        ],
        dealDate: [
          { required: true, message: '请选择 验收日期' }
        ]
      },
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'processingDialog',
          prop: 'tenantName',
          label: '商家/企业',
          placeholder: '请选择',
          change: this.contractNoChange,
          required: true
        },
        {
          itemType: 'input',
          prop: 'programName',
          label: '项目',
          disabled: true,
          placeholder: '--系统自动生成--'

        },
        {
          itemType: 'input',
          prop: 'dealNo', // dealNo
          label: '处理编号',
          disabled: true,
          placeholder: '--系统自动生成--'

        },
        {
          itemType: 'input',
          prop: 'brandName',
          label: '品牌名',
          disabled: true,
          placeholder: '--系统自动生成--'

        },
        {
          itemType: 'datePicker',
          inputType: 'autoValue',
          prop: 'dealDate',
          label: '处理日期',
          required: true,
          span: 1.1,
          width: '214px'
        },
        {
          itemType: 'fileUploadFile',
          prop: 'attachment',
          label: '附件',
          btnText: '上传',
          width: '428px',
          isSearch: true,
          actionUrl: '',
          limitNum: 4,
          span: 4,
          infoText: '可上传小于20M的常用文件'
        }
      ]
    }
  },
  created() {
    if (this.$route.query.id) {
      this.configData[4].span = null
      this.configData[4].width = null
    }
  },
  methods: {
    // 合同编号change
    contractNoChange(val) {
      this.currentFormData.tenantName = val.tenantName
      this.currentFormData.programName = val.programName
      this.currentFormData.dealNo = val.dealNo
      this.currentFormData.brandName = val.brandName
    }
  }
}
</script>

