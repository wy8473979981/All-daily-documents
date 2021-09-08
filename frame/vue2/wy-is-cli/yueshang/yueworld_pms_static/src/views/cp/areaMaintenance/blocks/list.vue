<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-24 15:48:06
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-25 14:37:16
-->
<template>
  <div class="max-area">
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable @searchResult="searchResult" />
    <div class="flex-al-center flex-ju-end mb-12">
      <AddDialog :out-close="outClose" @close="close" />
      <div class="el-icon-setting" />
    </div>
    <ysn-table
      :data="tableList.data"
      :column="tableConfig"
      select-key="id"
      full
      @row-click="tableRow"
    />
    <ysn-page :total="tableList.total" :page="page" @sizeChange="sizeChange" />
    <EditDialog :is-show-dialog="isShowDialog" :edit-form-data="editFormData" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import { basicApi } from '@/api'
import AddDialog from './addDialog.vue'
import EditDialog from './editDialog.vue'
export default {
  name: 'List',
  components: { AddDialog, EditDialog },
  props: {
    tableList: { type: Object, default: () => {} }
  },
  data() {
    return {
      page: { // 页数
        pageNo: 1,
        pageSize: 20
      },
      editFormData: {
        formData: {}
      }, // 编辑数据
      isShowDialog: false,
      outClose: false,
      formData: {},
      configData: [ // 表单配置
        { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入编码，区域名称', width: '200px', isFirst: true },
        { itemType: 'select', prop: 'regionStatus', label: '', placeholder: '请选择状态', width: '200px', isFirst: true }
      ],

      tableConfig: [
        { idx: '序号', type: 'index', width: '100px' },
        { regionId: '区域编码', sortable: true },
        { regionName: '区域名称', sortable: true },
        { regionStatus: '状态', sortable: true },
        { regionCreateDate: '创建时间', sortable: true }
      ]
    }
  },

  methods: {
    searchResult(data) {},
    tableRow(row) {
      this.isShowDialog = !this.isShowDialog
      basicApi.areaMaintenanceEdit().then(res => {
        this.editFormData = res
      })
    },
    closeDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    close() {
      this.outClose = !this.outClose
    },
    sizeChange() {}
  }
}
</script>
