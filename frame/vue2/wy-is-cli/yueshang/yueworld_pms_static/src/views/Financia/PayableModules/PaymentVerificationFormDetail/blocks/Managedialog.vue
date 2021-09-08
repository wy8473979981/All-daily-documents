
<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:附件信息
-->
<template>
  <div>
    <ysn-dialog
      :title="'附件管理'"
      :top="'120px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      :is-determine="false"
      :is-cancel="isCancel"
      @closeDialog="closeDialog"
    >
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form
          :model="formData"
          label-position="top"
        >
          <ysn-formItem
            :form="formData"
            :config="configData"
            :column="1"
            clearable
          />
        </el-form>

      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isShowDialog: { type: Boolean, default: false } // 弹窗控制
  },
  // 表单数据
  data() {
    return {
      formData: {
        fileList: [{ text: '' }, { text: '' }]
      },
      isDetermine: false, // 是否需要确定按钮
      isCancel: false, // 是否需要取消按钮
      //    表单配置
      configData: [
        {
          itemType: 'fileUploadFile',
          prop: 'fileList',
          label: '',
          btnText: '上传',
          actionUrl: '',
          limitNum: 5,
          infoText: '可上传小于20MB的常用文件'
        }
      ]
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
