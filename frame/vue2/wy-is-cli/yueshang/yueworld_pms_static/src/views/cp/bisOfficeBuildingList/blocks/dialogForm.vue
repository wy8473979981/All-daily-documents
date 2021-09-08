<template>
  <div>
    <div>
      <ysn-dialog :title="!isShowDialog?'新增':'编辑'" :out-close="outClose" :width="'920px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
        <ysn-btn class="mr-8" @click="add">新增</ysn-btn>
        <!-- 弹窗表格 -->
        <template #contain>
          <el-form ref="ruleForm" :model="formData" label-position="top" size="small" :rules="rulesForm">
            <ysn-formItem
              :form="formData"
              :config="configData"
              :column="4"
              clearable
            />
          </el-form>
        </template>
        <!-- 弹窗按钮 -->
        <template #btn>
          <div v-if="!isShowDialog" class="text-right" @click="preservation"><ysn-btn>保存</ysn-btn></div>
          <div v-if="isShowDialog" class="text-right">
            <ysn-btn class="mr-16" @click="modify">提交修改</ysn-btn>
            <ysn-btn type="delete" class="color-red pr-16" @click="remove">删除</ysn-btn>
          </div>
          <div />
        </template>
      </ysn-dialog>
      <div class="el-icon-setting font-size-18" />
    </div>
  </div>
</template>

<script>
import { buildingApi } from '@/api'
export default {
  name: 'DialogForm',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: { type: Object, default: () => { return {} } } // 表单数据
  },
  data() {
    return {
      isadd: true,
      // formData: {
      //   ProgramName: '111',
      //   BuildingId: '',
      //   buildingName: '',
      //   buildingStatus: '',
      //   buildingGrossArea: '',
      //   buildingLeasableArea: '',
      //   buildingFloorAboveGround: '',
      //   buildingFloorUnderground: '',
      //   buildingPic: [],
      //   remark: ''
      // },
      outClose: true,
      configData: [ // 表单配置
        { itemType: 'select', prop: 'programName', label: '所属项目', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'buildingId', label: '楼栋编码', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'buildingName', label: '楼栋名称', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'buildingStatus', label: '楼栋状态', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'buildingGrossArea', label: '建筑面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'buildingLeasableArea', label: '计租面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'buildingFloorAboveGround', label: '地上层数', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'buildingFloorUnderground', label: '地下层数', placeholder: '请输入', width: '206px' },
        { itemType: 'fileUpload', prop: 'buildingPic', label: '楼栋图', btnText: '上传', width: '428px', isSearch: true, actionUrl: '', limitNum: 4, span: 2 },
        { itemType: 'input', type: 'textarea', prop: 'remark', label: '备注', placeholder: '请输入', width: '428px', span: 2 }
      ],
      rulesForm: { // 表单验证
        programName: [{ required: true, message: '请输入必填项' }],
        buildingName: [{ required: true, message: '请输入必填项' }],
        buildingStatus: [{ required: true, message: '请输入必填项' }],
        buildingFloorAboveGround: [{ required: true, message: '请输入必填项' }],
        buildingFloorUnderground: [{ required: true, message: '请输入必填项' }]
      }
    }
  },
  computed: {
  },
  methods: {
    // 新增
    add() {
      this.$emit('addTable')
    },
    // 删除
    remove() {
      this.$emit('remove')
    },
    // 弹窗关闭
    closeDialog() {
      this.$emit('tableRowDialog')
    },
    // 保存
    preservation() {
      console.log(this.$refs.ruleForm)
      this.$refs.ruleForm.validate((valid, failedObj) => {
        if (valid) {
          this.getListAdd(this.formData)
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
    },
    // 数据新增
    getListAdd(formData) {
      buildingApi.buildinglistAdd(formData).then(res => {
        this.outClose = !this.outClose
        this.$emit('successTableList')
      })
    },
    // 提交修改
    modify() {
      buildingApi.buildinglistEdit(this.formDataObj).then(res => {
        this.outClose = !this.outClose
        this.$emit('successTableList')
      })
    }

  }
}
</script>

