<template>
  <div class="p-24">
    <!-- <ysn-displayInfo :data="data" :config="config" :column="5" />
    <ysn-seniorSearch :form="data" :config="configData2" :column="5" /> -->
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="rulesForm"
      label-position="top"
    >
      <ysn-formItem :form="formData" :config="configData" :column="4" clearabl>
        <!--插槽-->
        <template #t22>
          <el-button class="el-button el-button--text">插槽</el-button>
        </template>

        <template #t1Label>
          123你猜啊
          <el-tooltip content="你猜我猜不猜" placement="top" effect="dark">
            <span>移上来</span>
          </el-tooltip>
        </template>
      </ysn-formItem>
    </el-form>
    <el-button class="mt-20" type="primary" @click="submit()">提交</el-button>

    <!-- <SeniorSearch :is-search="true" :form="formData2" :config="configData2" clearable @searchResult="searchResult" /> -->

    <el-button
      class="mt-20"
      type="primary"
      size="small"
      @click="submit()"
    >提交</el-button>
  </div>
</template>

<script>
const selectList = [
  { label: '一次性', value: '1' },
  { label: '保证金', value: '2' },
  { label: '周期型', value: '3' }
]
// const radioList = [{ label: '是', value: '0' }, { label: '否', value: '1' }]
// const checkboxList = [{ label: '复选框1', value: '0' }, { label: '复选框2', value: '1' }]
export default {
  name: 'FromDemo',
  data() {
    return {
      packUp: false,
      formData: {
        s4: [],
        s3: '',
        s5: [1001],
        t1: '商业',
        t3: [],
        t5: '2021-02-26',
        t6: '',
        t7: '',
        t8: '',
        t9: '',
        t10: '',
        t21: [],
        fileList: [
          { name: 'food.jpeg', url: 'url1' },
          { name: 'food2.jpeg', url: 'url2' }
        ]
      },
      formData2: {
      },
      rulesForm: {
        // 表单验证
        t1: [{ required: true, message: '请输入必填项' }],
        a1: [{ required: true, message: '请输入必填项' }],
        t3: [{ required: true, message: '请输入必填项' }],
        t5: [{ required: true, message: '请输入必填项' }],
        t20: [{ required: true, message: '请输入必填项' }]
      },
      data: { name: '李雷', age: '18' },
      config: [
        { prop: 'name', label: '姓名', formatter: (row) => '你好' + row.name },
        { prop: 'age', label: '年龄', click: this.handleClick },
        { prop: 'age', label: '年龄', click: this.handleClick },
        { prop: 'age', label: '年龄', click: this.handleClick },
        { prop: 'age', label: '年龄', click: this.handleClick }
      ],
      optionsList: [{
        label: '铺位',
        value: 0
      },
      {
        label: '品牌名',
        value: 1
      },
      {
        label: '网批',
        value: 2
      },
      {
        label: '招商进度',
        value: 3
      },
      {
        label: '项目',
        value: 4
      },
      {
        label: '项目2',
        value: 5
      }
      ]
    }
  },
  computed: {
    configData() {
      return [ // 表单配置
        { itemType: 'select', prop: 's3', label: '选择', placeholder: '所有费项', width: '200px', list: this.optionsList, filterable: true, remote: true, remoteMethod: this.remoteMethod },
        { itemType: 'selectDialog', prop: 's4', label: '选择', placeholder: '所有费项', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList') },
        // { itemType: 'treeDialog', prop: 's5', label: '选择', placeholder: '所有费项tree', width: '200px', list: this.$PUBFN.getOptionsList('fileClassList') },
        { itemType: 'treeDialog', multipleChoice: true, prop: 's5', label: '选择', placeholder: '所有费项--多选', width: '200px', list: this.$PUBFN.getOptionsList('fileClassList') },
        { itemType: 'input', prop: 't1', label: '输入框', placeholder: '请输入', width: '206px', required: true, inputType: 'Number', numberConfig: { max: 99 }, hasLabelSlot: true },
        { itemType: 'input', type: 'textarea', prop: 't2', label: '输入框', placeholder: '请输入', width: '206px', labelPosition: 'left' },
        { itemType: 'radio', prop: 't3', label: '单选框', list: selectList, width: '264px' },
        { itemType: 'checkbox', prop: 't3', label: '复选框', list: selectList, checkAll: true },
        { itemType: 'datePicker', prop: 't5', label: '日期带默认值', type: 'date', width: '206px', change: this.datsPickerChange },
        { itemType: 'datePicker', prop: 't6', label: '日期valueFormat', type: 'datetime', width: '206px', span: 2, valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { itemType: 'datePicker', prop: 't4', label: '日期range', type: 'daterange', width: '206px', span: 2 },
        { itemType: 'select', prop: 't22', label: '插槽', hasSlot: true },
        { itemType: 'input', prop: 't20', label: '商铺选择', placeholder: '请输入', width: '206px', isSearch: true, change: this.inputChange },
        { itemType: 'plannerDialog', prop: 't21', label: '弹窗选择', placeholder: '请选择商铺', width: '206px' },
        { itemType: 'cascaderDialog', prop: 't21', label: '搜索框', placeholder: '请选择商铺', width: '206px' },
        { itemType: 'shopDialog', prop: 't6', label: '搜索框', placeholder: '请选择商铺', width: '206px' },
        // { itemType: 'shopDialog', prop: 't21', label: '搜索框', placeholder: '请选择商铺', width: '206px' },
        { itemType: 'fileUpload', prop: 'fileList', label: '上传文件', btnText: '上传', width: '428px', isSearch: true, actionUrl: '', limitNum: 4, span: 2 },
        { itemType: 'fileUpload', prop: 'fileList', label: '上传文件展示', btnText: '上传', type: "text", width: '428px', isSearch: true, actionUrl: '', limitNum: 4, span: 2 },
        { itemType: 'monthPicker', prop: 't7', label: '月份选择', placeholder: '选择月份', type: 'month', format: 'yyyy年MM月', valueFormat: 'yyyy-MM', width: '206px', change: this.datsPickerChange },
        { itemType: 'monthPicker', prop: 't8', label: '年份选择', placeholder: '选择年份', type: 'year', format: 'yyyy年', valueFormat: 'yyyy', width: '206px', change: this.datsPickerChange },
        { itemType: 'monthPicker', prop: 't9', label: '区间日期选择', type: 'monthrange', format: 'yyyy年MM月', valueFormat: 'yyyy-MM', startPlaceholder: '权责月起', endPlaceholder: '权责月止', width: '240px', change: this.datsPickerChange },
        { itemType: 'timePicker', prop: 't10', label: '时间选择：时-分', width: '150px', change: this.datsPickerChange }
      ]
    }
  },
  methods: {
    handleClick: (row) => {
      console.log(row)
      alert(row.age)
    },
    searchResult(data) {
      console.log('高级搜索', data)
    },
    submit() {
      console.log(this.formData)
      this.$refs.ruleForm.validate((valid, failedObj) => {
        console.log(failedObj)
        console.log(valid)
        if (valid) {
          console.log(this.formData)
          // 在这里添加提交代码
        } else {
          // 光标定位在以一个校验不通过项
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
    },
    datsPickerChange(val) {
      console.log(val)
    },
    inputChange(val) {
      this.formData.t1 = val + '123'
    },
    remoteMethod(val) {
      console.log(val)
      setTimeout(() => {
        this.optionsList = [
          { label: val, label: val + new Date().getTime() }
        ]
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
