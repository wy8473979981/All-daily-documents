<!--
 * @Author: zsj
 * @Date: 2021-07-06 13:22:02
 * @LastEditTime: 2021-09-03 20:26:06
 * @LastEditors: xza
-->
<template>
  <div>
    <ysn-dialog :title="isEdit.type? '编辑一铺一价配置':'新增一铺一价配置'" :is-show-dialog="isShowDialog" :external="isShowDialog" :width="'920'" @closeDialog="closeDialog">
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
          <ysn-title title="日单价转换公式" class="mb-8" />
          <ysn-formItem
            :form="formData"
            :config="configDatasce"
            :column="4"
            clearable
          />
          <ysn-title title="月单价转换公式" class="mb-8" />
          <ysn-formItem
            :form="formData"
            :config="configDatathree"
            :column="4"
            clearable
          />
        </el-form>
      </template>
      <template #btn>
        <div class="text-right" @click="preservation">
          <ysn-btn>保存</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { getOptionsLabel } from '@/filters/index'
export default {
  name: 'Beddingitem',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    rowData: {
      type: Object,
      default: () => {}
    },
    isEdit: { type: Object, default: () => {
      return {}
    } }
  },
  data() {
    return {
      id_: 1002,
      hasMenu: false, // 是否显示左侧菜单
      update: 0,
      formData: { // 表单数据
        name: '', // 序号
        feeName: '', // 费项类型
        acrossYears: '', // 跨年计算
        unitsPlanType: '', // 铺位平均计算公式
        packageType: [], // 一铺一价
        packageState: 1, // 状态
        incomplete1001Id: '不换算', // 申请日单价
        incomplete1002Id: '', // 申请月单价
        incomplete1003Id: '', // 申请月总额
        incomplete1004Id: '', // 申请年清单
        incomplete1005Id: '', // 申请年总额 //日
        full1001Id: '',
        full1002Id: '不换算',
        full1003Id: '',
        full1004Id: '',
        full1005Id: ''
      },
      configDatasce: [
        { itemType: 'input', prop: 'incomplete1001Id', label: '申请日单价', disabled: true, placeholder: '不换算' },
        { itemType: 'select', prop: 'incomplete1002Id', label: '申请月单价', placeholder: '请选择', list: this.$PUBFN.getOptionsList('incomplete1002Id'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'incomplete1003Id', label: '申请月总额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('incomplete1003Id'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'incomplete1004Id', label: '申请年单价', placeholder: '请选择', list: this.$PUBFN.getOptionsList('incomplete1004Id'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'incomplete1005Id', label: '申请年总额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('incomplete1005Id'), listName: 'label', listValue: 'value' }
      ],
      configDatathree: [
        { itemType: 'select', prop: 'full1001Id', label: '申请日单价', placeholder: '请选择', list: this.$PUBFN.getOptionsList('full1001Id'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'full1002Id', label: '申请月单价', disabled: true, placeholder: '不换算' },
        { itemType: 'select', prop: 'full1003Id', label: '申请月总额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('full1003Id'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'full1004Id', label: '申请年单价', placeholder: '请选择', list: this.$PUBFN.getOptionsList('full1004Id'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'full1005Id', label: '申请年总额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('full1005Id'), listName: 'label', listValue: 'value' }

      ],
      rulesForm: { // 表单验证
        feeName: [{ required: true, message: '请输入必填项' }],
        acrossYears: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        unitsPlanType: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        packageType: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        packageState: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        full1001Id: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        full1002Id: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        full1003Id: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        full1004Id: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        full1005Id: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        incomplete1005Id: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        incomplete1001Id: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        incomplete1002Id: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        incomplete1003Id: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        incomplete1004Id: [{ required: true, message: '请输入必填项', trigger: 'change' }]
      },
      configData: [
        { itemType: 'select', prop: 'feeName', label: '费项类型', placeholder: '请选择', list: this.$PUBFN.getOptionsList('feeName'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'acrossYears', label: '跨年计算', placeholder: '请选择', list: this.$PUBFN.getOptionsList('acrossYears'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'unitsPlanType', label: '多铺位平均计算公式', placeholder: '请选择', list: this.$PUBFN.getOptionsList('unitsPlanType'), listName: 'label', listValue: 'value' },
        { itemType: 'selectDialog', prop: 'packageType', label: '一铺一价类型', placeholder: '请选择', list: this.$PUBFN.getOptionsList('packageType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'packageState', label: '状态', placeholder: '请选择', list: this.$PUBFN.getOptionsList('packageState'), listName: 'label', listValue: 'value' }
      ]
    }
  },
  updated() {
    // this.formData = this.rowData
    for (let k in this.formData) {
      for (let key in this.rowData) {
        if (k === key) {
          this.formData[k] = this.rowData[key]
        }
      }
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.formData = { // 表单数据
        name: '', // 序号
        feeName: '', // 费项类型
        acrossYears: '', // 跨年计算
        unitsPlanType: '', // 铺位平均计算公式
        packageType: [], // 一铺一价
        packageState: 1, // 状态
        incomplete1001Id: '不换算', // 申请日单价
        incomplete1002Id: '', // 申请月单价
        incomplete1003Id: '', // 申请月总额
        incomplete1004Id: '', // 申请年清单
        incomplete1005Id: '', // 申请年总额 //日
        full1001Id: '',
        full1002Id: '不换算',
        full1003Id: '',
        full1004Id: '',
        full1005Id: ''
      }
      this.$emit('closeDialog')
    },
    // 提交表单
    preservation() {
      this.$refs.ruleForm.validate((valid, failedObj) => {
        if (valid) {
          // 在这里添加提交代码
          console.log(this.formData.packageType)
          let datas_ = JSON.parse(JSON.stringify(this.formData))
          for (var k in datas_) {
            if (typeof datas_[k] === 'object') {
              console.log(datas_[k])
              datas_[k].map(i => {
                console.log(i)
                datas_[k][i - 1] = getOptionsLabel(i, 'packageType')
              })
            } else {
              datas_[k] = getOptionsLabel(datas_[k], k)
            }
          }
          if (!this.isEdit.type) {
            this.id_++
            datas_['name'] = this.id_
          } else {
            datas_['name'] = this.isEdit.name
          }
          this.$emit('closeDialog', datas_)
          this.$message({
            message: '不要忘记保存计租方案哦',
            type: 'success'
          })
          this.formData = { // 表单数据
            name: '', // 序号
            feeName: '', // 费项类型
            acrossYears: '', // 跨年计算
            unitsPlanType: '', // 铺位平均计算公式
            packageType: [], // 一铺一价
            packageState: 1, // 状态
            incomplete1001Id: '不换算', // 申请日单价
            incomplete1002Id: '', // 申请月单价
            incomplete1003Id: '', // 申请月总额
            incomplete1004Id: '', // 申请年清单
            incomplete1005Id: '', // 申请年总额 //日
            full1001Id: '',
            full1002Id: '不换算',
            full1003Id: '',
            full1004Id: '',
            full1005Id: ''
          }
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
