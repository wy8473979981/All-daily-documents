<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:处理单详情驳回弹窗
-->
<template>
  <div>
    <ysn-dialog
      :title="'驳回'"
      :out-close="outClose"
      :width="'500px'"
      :top="'246px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formDataObj"
          label-position="top"
        >
          <ysn-formItem
            :config="configData"
            :column="2"
            :form="formDataObj"
            clearable
          />
        </el-form>
      </template>
      <!-- 保存按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-16" type="reject" @click="preservation">提交</ysn-btn>
          <ysn-btn class="mr-16" type="reset" @click="closeDialog">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { PayableApi } from '@/api/PayableList'
export default {
  name: 'DismissedAdd',
  props: {
    isShowDialog: { type: Boolean, default: true }, // 弹窗控制
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  // 表单数据
  data() {
    return {
      outClose: true,
      configData: [
        {
          itemType: 'input',
          type: 'textarea',
          span: 3,
          prop: '',
          label: '',
          rows: 5,
          placeholder: '请填写驳回意见',
          width: '452px'
        }
      ]

    }
  },
  computed: {
    formDataObj() {
      return this.formData
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    },
    preservation() {
      // 驳回提交
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          PayableApi.PaymentVerificationFormAgainRefuse(this.formDataObj).then(() => {
            this.outClose = !this.outClose
            this.$message({
              message: '驳回成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          })
        } else {
          this.handleValidateErr()
        }
      })
    },
    // 错误处理
    handleValidateErr() {
      console.log('err')
    }
  }
}
</script>
<style scoped>

</style>
