<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单详情同意弹窗
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
      <!-- 弹窗列表 -->
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
          <ysn-btn type="reset" @click="closeDialog">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { PayableApi } from '@/api/PayableList'
export default {
  name: 'AgreeAdd',
  //   components: { },
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
          label: '',
          placeholder: '同意',
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
