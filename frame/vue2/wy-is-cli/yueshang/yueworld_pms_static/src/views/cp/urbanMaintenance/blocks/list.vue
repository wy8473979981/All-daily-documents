
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
      :chekcbox="false"
      full
      @row-click="tableRow"
    />
    <!-- 分页 -->
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
      }, // 编辑数据
      isShowDialog: false,
      outClose: false,
      formData: {},
      configData: [ // 表单配置
        { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入城市名称', width: '200px', isFirst: true },
        { itemType: 'select', prop: 'regionName', label: '', placeholder: '请选择区域', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true }
      ],

      tableConfig: [
        { idx: '序号', type: 'index', width: '100px' },
        { cityId: '城市编码', sortable: true },
        { regionName: '所属区域', sortable: true },
        { cityName: '城市名称', sortable: true },
        { cityStatus: '状态', sortable: true },
        { cityCreateDate: '创建时间', sortable: true }
      ]
    }
  },

  methods: {
    searchResult(data) {},
    tableRow(row) {
      this.isShowDialog = !this.isShowDialog
      basicApi.urbanMaintenanceEdit().then(res => {
        this.editFormData = res
      })
    },
    // 弹窗关闭
    closeDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    // 弹窗关闭
    close() {
      this.outClose = !this.outClose
    },
    // 分页改变
    sizeChange() {}
  }
}
</script>
