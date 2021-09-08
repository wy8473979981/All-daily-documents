<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <ysn-dialog title="编辑" :width="'920px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
      <!-- <ysn-btn class="mr-8">新增</ysn-btn> -->
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form ref="ruleForm" :model="tableRow" label-position="top" size="small" :rules="rulesForm">
          <ysn-formItem
            :form="tableRow"
            :config="configData"
            :column="4"
            clearable
          />
        </el-form>
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-16" @click="modify">提交修改</ysn-btn>
          <ysn-btn type="delete" class="color-red pr-16">删除</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { buildingApi } from '@/api'
export default {
  name: 'DialogForm',
  props: {
    isShowDialog: { type: Boolean },
    tableRow: { type: Object, default: () => {} }
  },
  data() {
    return {
      // formData: {
      //  FloorPic: [{ name: 'food.jpeg', url: 'url1' }, { name: 'food2.jpeg', url: 'url2' }]
      // },
      configData: [ // 表单配置
        { itemType: 'input', prop: 'programName', label: '所属项目', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'buildingName', label: '所属楼栋', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'floorId', label: '楼层编码', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'floorName', label: '楼层名称', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'floorGrossArea', label: '建筑面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'floorLeasableArea', label: '计租面积(m²)', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'floorStatus', label: '楼层状态', placeholder: '请输入', width: '206px', span: 2 },
        { itemType: 'fileUpload', prop: 'floorPic', label: '楼栋图', btnText: '上传', width: '428px', isSearch: true, actionUrl: '', limitNum: 4, span: 2 },
        { itemType: 'input', type: 'textarea', prop: 'remark', label: '备注', placeholder: '请输入', width: '428px', span: 2 }
      ],
      rulesForm: { // 表单验证
        programName: [{ required: true, message: '请输入必填项' }],
        buildingName: [{ required: true, message: '请输入必填项' }]
      }
    }
  },
  //  computed: {
  //      formData(){
  //           this.tableRow.FloorPic = [{ name: 'food.jpeg', url: 'url1' }, { name: 'food2.jpeg', url: 'url2' }]
  //            return  this.tableRow;
  //      },
  //     },
  methods: {
    // 关闭按钮
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 修改
    modify() {
      buildingApi.bisOfficeFloorEdit(this.formData).then(res => {
        this.$emit('closeDialogTableList')
      })
    }

  }
}
</script>
