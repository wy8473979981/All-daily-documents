<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 费用调整单 新增编辑  顶部
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import PUBFN from '@/utils/pubFn'
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
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rulesForm: { // 表单验证
        programName: [{ required: true, message: '请输入必填项' }],
        adjustReason: [{ required: true, message: '请输入必填项' }]
      },
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'selectDialog',
          prop: 'programName',
          width: '206px',
          span: 1,
          list: PUBFN.getOptionsList('projectName'),
          placeholder: '所有项目',
          label: '项目名称',
          change: this.programName
        },
        {
          itemType: 'input',
          disabled: true,
          prop: 'adjustId',
          span: 1,
          placeholder: '自动生成',
          label: '调整单号'
        },
        {
          itemType: 'input',
          prop: 'adjustReason',
          label: '调整原因',
          type: 'textarea',
          width: '400px',
          inputType: 'Textarea',
          disabled: true,
          span: 10
        }
      ]
    }
  },
  created() {
    if (this.currentFormData.programName.length !== 0) {
      this.configData[2].disabled = false
    }
  },
  methods: {
    programName(val) {
      if (val.programName.length !== 0) {
        this.configData[2].disabled = false
      } else {
        this.configData[2].disabled = true
      }
    }
  }
}
</script>
