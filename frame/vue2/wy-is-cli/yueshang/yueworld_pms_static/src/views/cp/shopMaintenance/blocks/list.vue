<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-28 13:19:49
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-29 14:00:23
-->
<template>
  <div class="max-area">
    <!-- 筛选组件 -->
    <ysn-statusSearch
      :config="statusSearchConfig"
      name="商铺状态"
      @change="handleChange"
    />
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="form" :config="configData" clearable :column="5" @searchResult="searchResult" />
    <div class="flex-ju-al-between mb-12">
      <ysn-tableDesc :config="tableDescConfig" />
      <div class="flex-ju-al-between">
        <AddDialog :out-close="outClose" @close="close" />
        <ysn-btn class="mr-16" type="info">导入</ysn-btn>
        <ysn-btn class="mr-16" type="reset">导出</ysn-btn>
        <div class="el-icon-setting font-size-18" />
      </div>
    </div>
    <!-- 表格 -->
    <ysn-table
      :data="tableList.data"
      :column="tableConfig"
      select-key="id"
      :checkbox="false"
      show-operation
      full
      @row-click="openDetails"
    >
      <template #default="scope">
        <AreaChange :out-close="outClose" :row="scope.row" @close="close" />
      </template>
    </ysn-table>
    <EditDialog :is-show-dialog="isShowDialog" :form-data.sync="formData" @closeDialog="closeDialog" />
    <!-- 分页 -->
    <ysn-page :total="tableList.total" :page="page" @sizeChange="sizeChange" />
  </div>
</template>

<script>
import AddDialog from './addDialog.vue'
import AreaChange from './areaChange.vue'
import EditDialog from './editDialog.vue'
import { basicApi } from '@/api'
export default {
  name: 'FormItem',
  components: { AddDialog, AreaChange, EditDialog },
  props: {
    tableList: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      outClose: false,
      formData: { // 编辑数据
        shopsDara: {},
        formatData: {},
        ownerData: {}
      },
      isShowDialog: false,
      // tableData: [], // 表格数据
      page: { pageNo: 1, pageSize: 10 }, // 页数
      statusSearchConfig: [
        { label: '新建', value: 1, statusNum: 0 },
        { label: '合同', value: 2, statusNum: 1 },
        { label: '开业', value: 3, statusNum: 10 },
        { label: '空置', value: 4, statusNum: 20 },
        { label: '失效', value: 5, statusNum: 20 }
      ],
      form: {
        tenantName: '',
        programName: '',
        tenantType: ''
      },
      configData: [ // 表单配置
        { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入商铺名称关键字', width: '220px', isFirst: true },
        { itemType: 'select', prop: 'programName', label: '', placeholder: '请选择项目', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 'buildingName', label: '', placeholder: '请选择楼栋', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 'floorName', label: '', placeholder: '请选择楼层', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 'spaceType', label: '', placeholder: '请选择商业类型', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 'spaceEquityNature', label: '', placeholder: '请选择产权性质', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 'spaceLocation', label: '', placeholder: '请选择商铺属性', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true }
      ],
      tableData: [{ programName: 'xxx' }],
      tableConfig: [
        { idx: '序号', sortable: true, type: 'index' },
        { programName: '项目', sortable: true },
        { buildingName: '楼栋', sortable: true },
        { floorName: '楼层', sortable: true },
        { spaceName: '铺位号', sortable: true },
        { spaceType: '商业类型', sortable: true },
        { spaceGrossArea: '建筑面积(m²)', sortable: true },
        { leasableArea: '计租面积(m²)', sortable: true },
        { spaceStatus: '状态', sortable: true }
      ]
    }
  },
  computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '建筑面积(m²)', value: this.tableList.spaceGrossAreaTotal },
        { text: '计租面积(m²)', value: this.tableList.spaceLeasableAreaTotal }
      ]
      return list
    }
  },
  methods: {
    // 搜索事件
    searchResult(data) {
      console.log(data)
      this.$emit('searchTable', data)
    },
    handleChange(statusList) {
      console.log(statusList)
    },
    //  表格行
    openDetails() {
      this.isShowDialog = !this.isShowDialog
      basicApi.shopMaintenanceEdit().then(res => {
        console.log(this.tableList)
        this.formData = res
      })
    },
    // 关闭弹窗
    closeDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    // 分页改变
    sizeChange() {},
    // 新增弹窗关闭
    close() {
      this.outClose = !this.outClose
    }
  }
}
</script>
