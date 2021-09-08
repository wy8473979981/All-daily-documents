<!--
 * @Author: xiaxiaona
 * @LastEditors: xza
 * @Description: 深入洽谈-新增、编辑
-->
<template>
  <div>
    <ysn-dialog :title="!isEdit?'新增':'编辑'" :out-close="outClose" :width="'920px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form ref="ruleForm" :model="formData" label-position="top" size="small" :rules="rulesForm">
          <ysn-formItem
            :form="formData"
            :config="configData"
            :column="4"
            clearable
          >
            <!--插槽-->
            <template #brandNameLabel>
              <div style="display:inline-block">
                <div style="display: flex;">
                  品牌名
                  <el-radio-group v-model="radioForm.value" :disabled="!!formData.id"  style="height:auto;display:flex;" @change="bindRadioChange">
                    <el-radio v-for="(item, index) in radioForm.list" :key="'radio' + index" :label="item.value">
                      {{ item.label }}
                    </el-radio>
                  </el-radio-group>
                </div>
              </div>
            </template>
          </ysn-formItem>
        </el-form>
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div v-if="!isEdit" class="text-right" @click="preservation"><ysn-btn>保存</ysn-btn></div>
        <div v-else class="text-right">
          <ysn-btn class="mr-16" @click="modify">提交修改</ysn-btn>
          <ysn-confirm
            title="提示"
            width="484px"
            top="120px"
            :content="`确认删除?`"
            tip="此操作将永久删除,不可撤回,请谨慎操作"
            @confirm="remove"
          >
            <ysn-btn type="delete" class="color-red pr-16">删除</ysn-btn>
          </ysn-confirm>
        </div>
        <div />
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { investmentApi } from '@/api'
export default {
  name: 'DialogForm',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    info: { type: Object, default: () => { return {} } }, // 表单数据
    isEdit: { type: Boolean, default: false }
  },
  data() {
    return {
      flag_: false,
      update: 0,
      chooseArea: false,
      isadd: true,
      outClose: true,
      formData: {
        programName: '',
        brandName: '',
        tenantContractPerson: '',
        tenantLetterheadTel: '',
        coordinator: '',
        principal: '1001001',
        leaseArea: [],
        spaceFormatNamePlan: '',
        negotiationDate: '',
        negotiationMethod: '',
        contents: '',
        contractdate: '',
        finishTime: '',
        decorationEnterDate: '',
        openDate: ''
      },
      configData: [ // 表单配置
        { itemType: 'select', prop: 'programName', label: '项目名称', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('projectList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'brandName', label: '品牌名', placeholder: '请输入', width: '206px', hasLabelSlot: true },
        { itemType: 'input', prop: 'tenantContractPerson', label: '联系人', placeholder: '请输入', width: '206px' },
        { itemType: 'phone', prop: 'tenantLetterheadTel', label: '联系手机号', placeholder: '请输入', width: '206px', blur: this.blur_ },
        { itemType: 'treeDialog', prop: 'coordinator', label: '协调人员', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('PlannerList'), listName: 'label', listValue: 'value' },
        { itemType: 'treeDialog', prop: 'principal', label: '招商人员', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('PlannerList'), listName: 'label', listValue: 'value' },
        { itemType: 'cascaderDialog', prop: 'leaseArea', label: '租赁区域', labelText: '租赁区域', placeholder: '请选择', width: '206px', listName: 'label', listValue: 'value', change: this.chooseAreas, disabled: false },
        { itemType: 'input', prop: 'spaceFormatNamePlan', label: '规划业态', placeholder: '--自动带出--', width: '206px', disabled: true },
        { itemType: 'datePicker', type: 'date', prop: 'negotiationDate', label: '洽谈时间', placeholder: '请输入', width: '206px', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'select', prop: 'negotiationMethod', label: '洽谈方式', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('discussMethods'), listName: 'label', listValue: 'value' },
        { itemType: 'input', type: 'textarea', prop: 'contents', label: '深入洽谈描述', placeholder: '请输入', width: '428px', span: 2 },
        { itemType: 'datePicker', type: 'date', prop: 'contractdate', label: '预计意向书签订日期', placeholder: '请输入', width: '206px', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'datePicker', type: 'date', prop: 'finishTime', label: '预计合同签订日期', placeholder: '请输入', width: '206px', valueFormat: 'yyyy-MM-dd', change: this.changeDate },
        { itemType: 'datePicker', type: 'date', prop: 'decorationEnterDate', label: '预计进场日期', placeholder: '请输入', width: '206px', valueFormat: 'yyyy-MM-dd', change: this.changeDate },
        { itemType: 'datePicker', type: 'date', prop: 'openDate', label: '预计开业日期', placeholder: '请输入', width: '206px', valueFormat: 'yyyy-MM-dd', change: this.changeDate }
      ],
      rulesForm: { // 表单验证
        programName: [{ required: true, message: '请选择必填项' }],
        brandName: [{ required: true, message: '请输入必填项' }],
        tenantContractPerson: [{ required: true, message: '请输入必填项' }],
        tenantLetterheadTel: [{ required: true, message: '请输入必填项' }],
        coordinator: [{ required: false, message: '请选择必填项' }],
        principal: [{ required: true, message: '请选择必填项' }],
        leaseArea: [{ required: true, message: '请选择必填项' }],
        spaceFormatNamePlan: [{ required: true, message: '请输入必填项' }],
        negotiationDate: [{ required: true, message: '请选择必填项' }],
        negotiationMethod: [{ required: true, message: '请选择必填项' }],
        contents: [{ required: true, message: '请输入必填项' }],
        contractdate: [{ required: false, message: '请输入必填项' }],
        finishTime: [{ required: false, message: '请输入必填项' }],
        decorationEnterDate: [{ required: false, message: '请输入必填项' }],
        openDate: [{ required: false, message: '请输入必填项' }]
      },
      radioForm: { value: 0, list: [{ value: 1, label: '已存在品牌' }, { value: 0, label: '新增品牌' }] }
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
        if (newData.tenantContractPerson) {
          // 深拷贝 避免污染列表页
          const obj = JSON.stringify(newData)
          this.formData = JSON.parse(obj)
        }
      },
      immediate: true
    },
    isEdit: {
      handler(news, old) {
        if (news) {
          this.configData[1].disabled = true
          this.configData[0].disabled = true
          this.configData[6].disabled = true
        }
      }
    },
    formData: {
      deep: true,
      handler: function(newV, oldV) {
        if (newV.leaseArea.length > 0) {
          this.$refs.ruleForm && this.$refs.ruleForm.clearValidate('leaseArea')
        }
      }
    }
  },
  methods: {
    // 校验日期选择
    changeDate() {
      console.log(this.formData.contractdate)
      if (this.formData.contractdate === '') {
        this.$message({
          message: '请先选择预计意向签订日期',
          type: 'error'
        })
        this.formData.finishTime = ''
        this.formData.decorationEnterDate = ''
        this.formData.openDate = ''
        return
      }
      if (this.formData.finishTime === '') {
        this.$message({
          message: '请先选择预计合同签订日期',
          type: 'error'
        })
        this.formData.decorationEnterDate = ''
        this.formData.openDate = ''
        return
      }
      if (this.formData.decorationEnterDate === '' && this.formData.openDate !== '') {
        this.$message({
          message: '请先选择预计进场日期',
          type: 'error'
        })
        this.formData.openDate = ''
        return
      }
    },
    chooseAreas(e) {
      console.log(this.formData.programName)
      if (this.formData.programName === undefined) {
        this.$message({
          message: '请先选择项目',
          type: 'error'
        })
        this.formData.leaseArea = []
        return
      }
      this.formData.spaceFormatNamePlan = '业态一'
    },
    // 品牌名 单选
    bindRadioChange() {
      if (this.radioForm.value) {
        this.formData.brandName = {}
        Object.assign(this.configData[1], { itemType: 'select', prop: 'brandName', label: '品牌名', placeholder: '请选择', list: this.$PUBFN.getOptionsList('bandName'), width: '206px', hasLabelSlot: true })
      } else {
        this.formData.brandName = ''
        Object.assign(this.configData[1], { itemType: 'input', prop: 'brandName', label: '品牌名', placeholder: '请输入', width: '206px', hasLabelSlot: true })
      }
    },
    // 删除
    remove() {
      investmentApi.negotiationDelete(this.formDataObj).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$emit('remove')
      })
    },
    blur_(e) {
      this.flag_ = e
    },
    // 弹窗关闭
    closeDialog() {
      this.formData = {
        programName: '',
        brandName: '',
        tenantContractPerson: '',
        tenantLetterheadTel: '',
        coordinator: '',
        principal: '1001001',
        leaseArea: [],
        spaceFormatNamePlan: '',
        negotiationDate: '',
        contents: '',
        contractdate: '',
        finishTime: '',
        decorationEnterDate: '',
        openDate: ''
      }
      this.configData[1].disabled = false
      this.configData[0].disabled = false
      this.configData[6].disabled = false
      this.$emit('closeDialog')
    },
    // 保存
    preservation() {
      if (this.formData.contractdate > this.formData.finishTime && this.formData.finishTime !== '') {
        this.$message({
          message: '预计意向签订日期需<=预计合同签订日期',
          type: 'error'
        })
        return
      }
      if (this.formData.finishTime > this.formData.decorationEnterDate && this.formData.decorationEnterDate !== '') {
        this.$message({
          message: '预计合同签订日期需<=预计进场日期需',
          type: 'error'
        })
        return
      }
      if (this.formData.decorationEnterDate > this.formData.openDate && this.formData.openDate !== '') {
        this.$message({
          message: '预计进场日期需<=预计开业日期',
          type: 'error'
        })
        return
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 数据新增
          investmentApi.negotiatioCreate(this.formData).then(() => {
            this.$message({ message: '保存成功', type: 'success' })
            this.outClose = !this.outClose
            this.$emit('successTableList')
          })
        } else {
          this.handleValidateErr()
        }
      })
    },
    // 提交修改
    modify() {
      if (this.formData.contractdate > this.formData.finishTime) {
        this.$message({
          message: '预计意向签订日期需<=预计合同签订日期',
          type: 'error'
        })
        return
      }
      if (this.formData.finishTime > this.formData.decorationEnterDate) {
        this.$message({
          message: '预计合同签订日期需<=预计进场日期需',
          type: 'error'
        })
        return
      }
      if (this.formData.decorationEnterDate > this.formData.openDate) {
        this.$message({
          message: '预计进场日期需<=预计开业日期',
          type: 'error'
        })
        return
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.flag_) {
            investmentApi.negotiationEdit(this.formData).then(() => {
              this.$message({ message: '修改成功', type: 'success' })
              this.outClose = !this.outClose
              this.$emit('successTableList')
            })
          } else {
            this.$message({ message: '手机号格式错误', type: 'error' })
          }
        } else {
          this.handleValidateErr()
        }
      })
    },
    // 处理校验失败
    handleValidateErr() {
      setTimeout(() => {
        var isError = document.getElementsByClassName('is-error')
        isError[0].querySelector('input').focus()
      }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-radio{
  margin: 0;
}
::v-deep .el-radio__label{
  font-size:12px;
  padding: 0;
}
::v-deep .el-radio__input {
  margin-left: 6px;
}
</style>
