<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 附件管理弹窗
-->
<template>
  <div>
    <ysn-dialog
      class="ysn-accessory-dialog"
      :title="title"
      :width="'500px'"
      :is-determine="false"
      :is-show-dialog="isShowDialog"
      :is-cancel="false"
      :show-footer="false"
      :external="true"
      @closeDialog="closeDialog"
    >
      <slot />
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form v-if="type==='detailBtn'" ref="ruleForm" :model="formData" size="small" :rules="rulesForm" class="content">
          <ysn-formItem
            :form="formData"
            :column="1"
            clearable
          />
          <ysn-btn>
            <ysn-excel type="import" @click="upload">上传附件</ysn-excel>
          </ysn-btn>
          <div class="text">可上传小于20M的常用文件</div>
        </el-form>
        <el-form v-if="type==='tableBtn'" ref="ruleForm" :model="formData" size="small" :rules="rulesForm" class="content">
          <ysn-formItem
            :form="formData"
            :column="1"
            clearable
          />
          <ysn-btn>
            <ysn-excel type="import" @click="upload">上传</ysn-excel>
          </ysn-btn>
          <div class="text">可上传小于20M的常用文件</div>
          <!-- <svg-icon icon-class="finish-green" class="icon" />
          <span class="finish">导入完成</span>
          <span>新增77条减免单</span> -->
        </el-form>
      </template>
      <template #footer>
        <div />
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'ExamineDialog',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isShowDialog: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: '',
      outClose: true,
      // 表单验证
      formData: {
        fileUpload: [] // 上传附件列表,
      },
      // 校验
      rulesForm: {
        node: [{ required: true, message: '' }]
      }
    }
  },
  created() {
    if (this.type === 'detailBtn') {
      this.title = '附件管理'
    } else if (this.type === 'tableBtn') {
      this.title = '导入调整单'
    }
  },
  methods: {
    // 关闭按钮
    closeDialog() {
      this.$emit('closeDialog')
    },
    upload() {
    }
  }
}
</script>
<style scoped lang="scss">
 .content{
    margin: 20px 0 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content .text{
    margin-top: 16px;
  }
  .icon{
    width: 80px;
    height: 80px;
  }
  .finish{
    font-size: 18px;
    font-weight: bold;
    color: #050101;
    line-height: 18px;
    margin: 30px 0 16px;
  }
</style>
