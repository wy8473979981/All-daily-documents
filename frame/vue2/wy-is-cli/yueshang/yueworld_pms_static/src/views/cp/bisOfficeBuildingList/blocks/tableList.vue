<template>
  <div class="max-area">
    <!-- 按钮 -->
    <div class="flex-ju-al-between mb-12">
      <ysn-tableDesc :config="tableDescConfig" />
      <!-- 弹窗新增编辑 -->
      <DialogForm :is-show-dialog="isShowDialog" :form-data="formData" @tableRowDialog="tableRowDialog" @successTableList="successTableList" @addTable="addTable" @remove="remove" />
    </div>
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="tableData.tableData"
      :column="tableConfig"
      select-key="id"
      full
      @row-click="openDetails"
    />
    <!-- 分页 -->
    <ysn-page :total="tableData.total" :page="page" @change="currentChange" />
  </div>
</template>

<script>
import DialogForm from './dialogForm'
import { buildingApi } from '@/api'
export default {
  name: 'TableList',
  components: { DialogForm },
  props: {
    tableData: { type: Object } // 表格数据
  },
  data() {
    return {

      formData: { // 弹窗表单数据
        programName: '',
        buildingId: '',
        buildingName: '',
        buildingStatus: '',
        buildingGrossArea: '',
        buildingLeasableArea: '',
        buildingFloorAboveGround: '',
        buildingFloorUnderground: '',
        buildingPic: [],
        remark: ''
      },
      page: { // 页数
        pageNo: 1,
        pageSize: 20
      },
      isShowDialog: false, // 弹窗控制
      tableConfig: [
        { tab: '序号', sortable: true, type: 'index', width: '100px' },
        { programName: '项目', sortable: true },
        { buildingId: '楼栋编码', sortable: true },
        { buildingName: '楼栋名称', sortable: true },
        { buildingGrossArea: '建筑面积(m²)', sortable: true },
        { buildingLeasableArea: '计租面积(m²)', sortable: true },
        { buildingStatus: '楼栋状态', sortable: true }
      ]
    }
  },
  computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '建筑面积(m²)', value: '' },
        { text: '计租面积(m²)', value: 100 }
      ]
      return list
    }
  },
  methods: {
    //  新增重置表单
    addTable() {
      this.formData = {}
      this.formData.buildingPic = [{ name: 'food.jpeg', url: 'url1' }, { name: 'food2.jpeg', url: 'url2' }]
    },
    // 分页
    sizeChange(data) {
      console.log(data)
    },
    currentChange(data) {
      console.log(data)
    },
    // 表格点击一列数据
    openDetails(row) {
      this.isShowDialog = !this.isShowDialog
      console.log(this.formData.buildingPic)
      this.formData = row
      this.formData.buildingPic = [{ name: 'food.jpeg', url: 'url1' }, { name: 'food2.jpeg', url: 'url2' }]
      console.log(this.formData)
    },
    // 关闭弹窗
    tableRowDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    // 新增成功通知外层组件刷新列表
    successTableList() {
      this.$emit('successTableList')
    },
    //  删除
    remove() {
      this.isShowDialog = !this.isShowDialog
    }
  }
}
</script>

