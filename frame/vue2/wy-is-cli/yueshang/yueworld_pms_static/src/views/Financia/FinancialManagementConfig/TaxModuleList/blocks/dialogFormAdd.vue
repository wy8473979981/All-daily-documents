<!--
 * @Author: xza
 * @Date: 2021-08-02 10:47:36
 * @LastEditTime: 2021-08-24 10:02:26
 * @LastEditors: xza
 * @Description: 税率新增/编辑弹框
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/TaxModuleList/blocks/dialogFormAdd.vue
-->

<template>
  <div>
    <ysn-dialog
      :title="!isEdit ? '新增' : '编辑'"
      :out-close="outClose"
      :width="'476px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formData"
          label-position="top"
          size="small"
          :rules="rulesForm"
        >
          <ysn-formItem
            :config="configData"
            :column="2"
            :form="formData"
            clearable
          />
        </el-form>
      </template>
      <!-- 保存按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-8" @click="preservation">保存</ysn-btn>
          <ysn-confirm
            title="提示"
            width="484px"
            top="120px"
            :content="`确认删除?`"
            tip="此操作将永久删除,不可撤回,请谨慎操作"
            @confirm="remove"
          >
            <ysn-btn v-if="isEdit" type="delete" class="ml-8 pr-16">删除</ysn-btn>
          </ysn-confirm>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { taxModuleListApi } from '@/api'
import { formData, configData, rulesForm } from './config'
export default {
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }, // 表单数据
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      outClose: true,
      formData: formData.call(this), // 表单数据
      configData: configData.call(this), // 表单配置
      rulesForm: rulesForm.call(this) // 表单校验
    }
  },
  watch: {
    /**
     * @description: 监听点击列表页每行后传递的数据
     * @param {*}
     * @return {*}
     */
    info: {
      handler(newData, oldData) {
        if (newData.taxName) {
          // 深拷贝 避免污染列表页
          const obj = JSON.stringify(newData)
          // 转换税值类型
          let data_ = JSON.parse(obj)
          data_.tax = data_.tax.toString()
          this.formData = data_
        }
      },
      immediate: true
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      // 关闭清空数据
      this.formData = {
        taxId: '', // 税率编码
        thirdPartyId: '', // 三方编码
        taxName: '', // 税率名称
        tax: '', // 税值
        taxType: '', // 税率类别
        taxCollectType: '', // 征收类型
        status: '' // 状态
      }
      this.$emit('closeDialog')
    },
    // 新增保存/编辑提交
    preservation() {
      if (!this.isEdit) {
        // 保存
        this.$refs.ruleForm.validate((valid, failedObj) => {
          if (valid) {
            console.log(this.formData)
            taxModuleListApi.taxModuleCreate(this.formData).then(() => {
              this.outClose = !this.outClose
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$emit('successTableList')
            })
          } else {
            setTimeout(() => {
              var isError = document.getElementsByClassName('is-error')
              isError[0].querySelector('input').focus()
            }, 100)
          }
        })
        return
      }
      // 提交编辑
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.formData)
          taxModuleListApi.taxModuleEdit(this.formData).then(() => {
            this.outClose = !this.outClose
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$emit('successTableList')
          })
        } else {
          this.handleValidateErr()
        }
      })
    },
    // 错误处理
    handleValidateErr() {
      this.$message({
        message: '编辑失败',
        type: 'error'
      })
    },
    // 删除当前列
    remove() {
      taxModuleListApi.taxModuleDelete(this.formData).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$emit('remove')
      })
    }
  }
}
</script>
