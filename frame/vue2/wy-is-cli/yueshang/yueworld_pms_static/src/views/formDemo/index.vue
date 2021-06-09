<template>
  <div class="p-24">
    <el-form
      ref="ruleForm"
      :model="formData"
      label-position="top"
      size="small"
      :rules="rulesForm"
    >
      <ysn-form-item
        :form="formData"
        :config="configData"
        :column="3"
        clearable>
        <!--插槽-->
        <template #t22>
          <el-button class="el-button el-button--text">插槽</el-button>
        </template>
      </ysn-form-item>
    </el-form>
    <el-button class="mt-20" type="primary" @click="submit()">提交</el-button>
  </div>
</template>

<script>
const selectList = [
  { name: '一次性', value: '1' },
  { name: '保证金', value: '2' },
  { name: '周期型', value: '3' }
]
// const radioList = [{ label: '是', value: '0' }, { label: '否', value: '1' }]
// const checkboxList = [{ label: '复选框1', value: '0' }, { label: '复选框2', value: '1' }]
export default {
  name: 'FromDemo',
  data() {
    return {
      formData: {
        t3: []
      },
      configData: [ // 表单配置
        { itemType: 'input', prop: 't1', label: '输入框', placeholder: '请输入', width: '264px' },
        { itemType: 'select', prop: 'a1', label: '下拉框', placeholder: '请选择', list: selectList, listName: 'name', listValue: 'value', width: '264px' },
        // { itemType: 'radio', prop: 't3', label: '单选框', list: radioList, listName: 'label', listKey: 'value', width: '264px' },
        // { itemType: 'checkbox', prop: 't3', label: '复选框', listName: 'label', listKey: 'value', list: checkboxList, checkAll: true },
        { itemType: 'datePicker', prop: 't5', label: '日期', type: 'date', width: '264px', align: 'right' },
        { itemType: 'datePicker', prop: 't4', label: '日期range', type: 'daterange', width: '400px', span: 2 },
        { itemType: 'select', prop: 't22', label: '插槽', hasSlot: true },
        { itemType: 'input', prop: 't20', label: '输入框', placeholder: '请输入', width: '264px' }
      ],
      rulesForm: { // 表单验证
        t1: [{ required: true, message: '请输入必填项', trigger: 'blur' }],
        a1: [{ required: true, message: '请输入必填项', trigger: 'blur' }],
        t3: [{ required: true, message: '请输入必填项', trigger: 'blur' }],
        t5: [{ required: true, message: '请输入必填项', trigger: 'blur' }],
        t20: [{ required: true, message: '请输入必填项', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid, failedObj) => {
        console.log(failedObj)
        if (valid) {
          // 在这里添加提交代码
          console.log('this.formData=======', this.formData)
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

<style scoped>

</style>
