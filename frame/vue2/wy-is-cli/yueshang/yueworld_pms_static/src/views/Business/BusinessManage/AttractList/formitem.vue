/*
 * @Author: zsj
 * @Date: 2021-07-01 16:59:02
 * @LastEditTime: 2021-07-07 09:37:59
 * @LastEditors: xueyx
*/
<template>
  <div>
    <ysn-dialog title="上传" :is-show-dialog="isShowDialog" :external="isShowDialog" @ok="submit" @closeDialog="closeDialog">
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formData"
          :rules="rulesForm"
        >
          <ysn-formItem
            :form="formData"
            :config="configData"
            :column="2"
          />
        </el-form>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    isShowDialog: { type: Boolean, default: false } // 弹窗控制
  },
  data() {
    return {
      formData: { // 表单数据
        programName: [], // 文件名称
        toolkitType: '', // 工具包分类
        fileType: '', // 文件分类
        fileList: [] // 上传图片list
      },
      rulesForm: { // 表单验证
        toolkitType: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        programName: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        fileType: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        fileList: [{ required: true, message: '请输入必填项', trigger: 'change' }]
      },
      list: []
    }
  },
  computed: {
    // 动态配置 工具包和文档分类
    configData() {
      return [ // 表单配置
        { itemType: 'select', prop: 'programName', label: '项目名称', placeholder: '请选择项目', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'toolkitType', label: '工具包分类', placeholder: '请选择类型', width: '206px', list: this.$PUBFN.getOptionsList('toolkitType'), listName: 'label', listValue: 'value', change: this.getToolkit },
        { itemType: 'select', prop: 'fileType', label: '文档分类', placeholder: '请选择文档', width: '206px', list: this.list, listName: 'label', listValue: 'value' },
        { itemType: 'fileUploadFile', type: 'upload', prop: 'fileList', label: '文档来源', btnText: '上传', width: '428px', isSearch: true, actionUrl: '', limitNum: 4, span: 2, infoText: '上传文件不能超过50MB' }
      ]
    }
  },
  watch: {
    formData: {
      deep: true,
      handler: function(newV, oldV) {
        if (newV.fileList.length > 0) {
          this.$refs.ruleForm.clearValidate('fileList')
        }
      }
    }
  },
  methods: {
    getToolkit(val) {
      this.formData.fileType = ''
      if (val.toolkitType === 0) {
        this.list = [{ value: 5, label: '一铺一价模版' }, { value: 6, label: '招商培训课件' }, { value: 7, label: '招商巡检标准' }, { value: 8, label: '招商各类标准' }]
      } else if (val.toolkitType === 1) {
        this.list = [{ value: 9, label: '项目招商手册' }, { value: 10, label: '市场调研报告' }, { value: 11, label: '项目总平图、商业效果图' }, { value: 12, label: '集团介绍电子版' }]
      } else {
        this.list = []
      }
    },
    // 关闭弹窗
    closeDialog() {
      this.clearInfo()
      this.$emit('closeDialog')
    },
    // 清空数据
    clearInfo() {
      this.formData = { // 表单数据
        programName: [], // 文件名称
        toolkitType: '', // 工具包分类
        fileType: '', // 文件分类
        fileList: [] // 上传图片list
      }
    },
    // 提交表单
    submit() {
      this.$refs.ruleForm.validate((valid, failedObj) => {
        if (valid) {
          // 在这里添加提交代码
          this.$emit('closeDialog')
          this.$message({
            type: 'success',
            message: '成功'
          }, 2000)
          this.clearInfo()
        } else {
          // 光标定位在以一个校验不通过项
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
    }
  }
}
</script>
