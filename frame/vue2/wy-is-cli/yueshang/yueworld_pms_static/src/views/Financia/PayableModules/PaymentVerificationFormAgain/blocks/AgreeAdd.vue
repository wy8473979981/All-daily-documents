<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:付款核销单-审核中-同意弹窗
-->
<template>
  <div>
    <ysn-dialog
      :title="'审核通过'"
      :out-close="outClose"
      :width="'500px'"
      :top="'246px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <!-- 弹窗列表内容 -->
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formDataObj"
          label-position="top"
          :top="'90px'"
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
          <ysn-btn class="mr-8" @click="preservation">提交</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { PayableApi } from '@/api/PayableList'
export default {
  name: 'AgreeAdd',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
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
          rows: 5,
          span: 3,
          prop: '',
          label: '审核意见',
          placeholder: '同意',
          width: '452px'
        }
      ]

    }
  },
  computed: {
    //   return 列表页数据
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
    // 弹窗提交
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          PayableApi.PaymentVerificationFormAgainSubmit(this.formDataObj).then(() => {
            this.outClose = !this.outClose
            this.$message({
              message: '同意成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
            this.$emit('successTableList')
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
