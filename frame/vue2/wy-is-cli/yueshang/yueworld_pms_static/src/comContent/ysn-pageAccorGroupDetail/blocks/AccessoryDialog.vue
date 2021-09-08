<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 附件管理弹窗
-->
<template>
  <div>
    <ysn-dialog
      class="ysn-accessory-dialog"
      :title="title"
      :width="'706px'"
      :out-close="outClose"
      :is-determine="false"
      :is-cancel="false"
      :show-footer="false"
      @closeDialog="closeDialog"
    >
      <slot />
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form ref="ruleForm" :model="formData" size="small" :rules="rulesForm">
          <ysn-formItem
            :form="formData"
            :config="configData"
            :column="1"
            clearable
          />
        </el-form>
      </template>
      <template #footer>
        <div />
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { baseApi } from '@/api'
export default {
  name: 'ExamineDialog',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '附件信息'
    }
  },
  data() {
    return {
      // 表单验证
      formData: {
        fileUpload: [] // 上传附件列表,
      },
      //   关闭弹窗
      outClose: 0,
      // 是否显示弹窗
      isShowDialog: false,
      // 校验
      rulesForm: {
        node: [{ required: true, message: '' }]
      }
    }
  },
  computed: {
    // 表单配置
    configData() {
      const select = []
      const { disabled } = this
      return [
        ...select,
        { itemType: 'fileUploadFile', prop: 'fileUpload', label: '', btnText: '上传', width: '660px', disabled: disabled, type: disabled ? 'text' : 'upload', isSearch: true, actionUrl: '', limitNum: 4, span: 4, infoText: '可上传小于20M的常用文件' }
      ]
    }
  },
  methods: {
    // 关闭按钮
    closeDialog() {
      this.outClose++
      this.isShowDialog = false
    }
  }
}
</script>
