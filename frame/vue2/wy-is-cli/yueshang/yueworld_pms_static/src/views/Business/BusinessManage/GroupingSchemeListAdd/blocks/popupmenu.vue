<!--
 * @Author: zsj
 * @Date: 2021-07-06 09:09:42
 * @LastEditTime: 2021-07-08 11:10:01
 * @LastEditors: zsj
-->
<template>
  <div>
    <ysn-dialog title="配置字段" :is-show-dialog="isShowDialog" :external="isShowDialog" :width="'717px'" @closeDialog="closeDialog">
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formData"
          label-position="top"
          :rules="rulesForm"
        >
          <ysn-formItem
            :form="formData"
            :config="configData"
            :column="4"
            clearable
          />
        </el-form>
      </template>
      <template #btn>
        <div class="text-right" @click="preservation">
          <ysn-btn>确定</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { agreementIntentionApi } from '@/api'

// agreementIntention
export default {
  name: 'Popupmenu',
  props: {
    isShowDialog: { type: Boolean, default: false } // 弹窗控制
  },
  data() {
    return {
      formData: { // 表单数据

      },
      rulesForm: { // 表单验证
        field: [{ required: true, message: '请输入必填项' }],
        logic: [{ required: true, message: '请输入必填项' }]

      },
      configData: [ // 表单配置
        { itemType: 'input', prop: 'field', label: '字段', type: 'textarea', width: '669px', rows: '6', placeholder: '请输入' },
        { itemType: 'input', prop: 'logic', label: '逻辑', type: 'textarea', span: 4, rows: '6', placeholder: '请输入', listValue: 'value' }
      ]
    }
  },
  created() {
    console.log('987')
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 提交表单
    preservation() {
      this.$refs.ruleForm.validate((valid, failedObj) => {
        if (valid) {
          // 在这里添加提交代码
          console.log(this.formData, '000')
          console.log(agreementIntentionApi, '000')
          agreementIntentionApi.configurAtion(this.formData).then(res => {
            this.$emit('closeDialog', this.formData)
          })
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
