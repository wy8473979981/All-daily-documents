<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:品牌落位综合信息
-->
<template>

  <el-form
    ref="ruleForm"
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
    <ysn-formItem
      :form="currentFormData"
      :config="configDataTwo"
      :column="50"
      clearable
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
      default: () => {}
    }
  },
  data() {
    return {
      rulesForm: {
        programName: [
          { required: true, message: '请选择项目' }
        ]
      },
      configData: [
        // 表单配置
        {
          itemType: 'select',
          prop: 'programName',
          label: '项目',
          placeholder: '请选择项目',
          list: this.$PUBFN.getOptionsList('allProject'),
          width: '206px',
          change: this.programNameChange
        },
        {
          itemType: 'input',
          inputType: 'input',
          placeholder: '--自动生成--',
          label: '编号',
          width: '206px',
          disabled: true,
          prop: 'brandPlacementNo'
        }
      ],
      configDataTwo: [
        // 表单配置
        {
          itemType: 'input',
          type: 'textarea',
          prop: 'description',
          label: '备注说明',
          placeholder: '请输入',
          width: '433px',
          span: 21,
          rows: 3,
          isFirst: true,
          maxlength: 300

        },
        {
          itemType: 'fileUpload',
          type: 'textarea',
          prop: 'attachmentList',
          label: '附件',
          btnText: '上传',
          width: '433px',
          span: 10,
          actionUrl: '',
          infoText: '单个文件不超过50Mb'
        }
      ]

    }
  },
  mounted() {
    console.log('currentFormData', this.currentFormData)
  },
  methods: {
    // 选择项目生成编号
    programNameChange(val) {
      this.$emit('comChange', val)
    }
  }

}
</script>
