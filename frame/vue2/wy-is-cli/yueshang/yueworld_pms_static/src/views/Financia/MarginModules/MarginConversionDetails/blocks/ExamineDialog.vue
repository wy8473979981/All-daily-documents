<!--
 * @Author: fhj
 * @Date: 2021-08-04 16:32:07
 * @LastEditTime: 2021-08-11 09:43:43
 * @LastEditors: xza
 * @Description: 内审统一驳回弹窗
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionDetails/blocks/ExamineDialog.vue
-->

<template>
  <div>
    <ysn-dialog :title="title" :width="'600px'" :out-close="outClose" @closeDialog="closeDialog">
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
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn v-if="type==='agree'" class="mr-16" @click="modify">同意</ysn-btn>
          <ysn-btn v-else class="mr-16" type="reject" @click="modify">驳回</ysn-btn>
          <ysn-btn type="reset" @click="closeDialog">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { baseApi } from '@/api'
export default {
  name: 'ExamineDialog',
  props: {
    type: {
      type: String,
      default: 'agree'
    }
  },
  data() {
    return {
      // 表单验证
      formData: {
        message: '' // 审批意见,
      },
      //   关闭弹窗
      outClose: 0,
      // 是否显示弹窗
      isShowDialog: false
    }
  },
  computed: {
    title() {
      if (this.type === 'reject') {
        return '驳回'
      }
      return '同意'
    },

    // 表单配置
    configData() {
      return [
        { itemType: 'input', prop: 'message', label: '', placeholder: '填写审批意见', type: 'textarea' }
      ]
    }
  },
  methods: {
    // 关闭按钮
    closeDialog() {
      this.$refs.ruleForm.resetFields()
      this.outClose++
    },
    // 修改
    modify() {
      this.$refs.ruleForm.validate(async(valid, failedObj) => {
        if (valid) {
          // 搜索字段抛出去接收
          const reqData = {
            id: this.$route.query.id,
            type: this.examine,
            ...this.formData
          }
          console.log(this.formData)
          await baseApi.examine(reqData)
          this.closeDialog()
          this.$emit('over')
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
