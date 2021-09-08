<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:银行账户新增/编辑弹窗
-->
<template>
  <div>
    <ysn-dialog
      :title="!formData.bankAccountId ? '新增' : '编辑'"
      :out-close="outClose"
      :width="'476px'"
      :top="'120px'"
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
          size="small"
          :rules="rulesForm"
        >
          <ysn-formItem
            :config="getNewArr"
            :column="2"
            :form="formDataObj"
            clearable
          />
        </el-form>
      </template>
      <!-- 保存/删除按钮功能 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-8" @click="preservation">保存</ysn-btn>
          <ysn-confirm
            v-if="!formData.bankAccountId? false:true"
            title="提示"
            width="484px"
            top="120px"
            :content="`是否确认删除?`"
            tip="此操作将永久删除,不可撤回,请谨慎操作"
            @confirm="remove"
          >
            <ysn-btn type="delete" class="mr-12">删除</ysn-btn>
          </ysn-confirm></div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
// 请求api
import { configData, configDataEdit, rulesForm } from './config'
import { PayableApi } from '@/api/PayableList'
export default {
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
      configData: configData.call(this), // 表格配置
      configDataEdit: configDataEdit.call(this), // 表格配置
      rulesForm: rulesForm.call(this) // 表单验证
    }
  },
  computed: {
    // return 列表页的数据
    formDataObj() {
      return this.formData
    },
    getNewArr() {
      if (!this.formData.bankAccountId) {
        const newArr = this.configData.filter(i => {
          return i.prop !== 'creatDate'
        })
        return newArr
      } else {
        return this.configData
      }
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
      this.$emit('successTableList')
    },
    // 新增保存/编辑提交
    preservation() {
      if (!this.formData.accountName) {
        // 保存
        this.$refs.ruleForm.validate((valid, failedObj) => {
          if (valid) {
            PayableApi.BankAccountsAdd(this.formDataObj).then(() => {
              this.outClose = !this.outClose
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$emit('successTableList')
            })
          }
        })
        return
      }
      // 提交编辑
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          PayableApi.BankAccountsEdit(this.formDataObj).then(() => {
            this.outClose = !this.outClose
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$emit('successTableList')
          })
        }
      })
    },
    // 删除当前列
    remove() {
      PayableApi.BankAccountsDelete(this.formDataObj).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        }, 2000)
        this.$emit('remove')
      })
    }
  }
}
</script>
