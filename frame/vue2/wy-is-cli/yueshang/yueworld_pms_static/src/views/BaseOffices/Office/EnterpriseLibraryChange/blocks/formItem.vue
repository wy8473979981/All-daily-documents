<template>
  <div class="max-area">
    <ysn-statusSearch
      :config="statusSearchConfig"
      name="审批状态"
      @change="handleChange"
    />
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable :column="5" @searchResult="searchResult" />
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="overall.data"
      :column="tableConfig"
      select-key="id"
      full
      @row-click="tableRow"
    />
    <DetailsDialog v-if="isStatus==='0'" :is-show-dialog="isShowDialog" :edit-list="editList" :external="isShowDialog" @cloneDialog="cloneDialog" />
    <EditDialog v-if="isStatus==='1'" :is-show-dialog="isShowDialog" :edit-list="editList" :external="isShowDialog" @cloneDialog="cloneDialog" />
    <!-- 分页 -->
    <ysn-page :total="overall.total" :page="page" @sizeChange="sizeChange" />
  </div>
</template>

<script>
import { buildingApi } from '@/api'
import DetailsDialog from './detailsDialog.vue'
import EditDialog from './editDialog.vue'
export default {
  name: 'FormItem',
  components: { DetailsDialog, EditDialog },
  props: {
    overall: { type: Object, default: () => {} }
  },
  data() {
    return {
      isStatus: '', // 显示编辑详情弹窗控制
      isShowDialog: false, // 弹窗
      editList: { // 编辑数据
        formData: {},
        contractFormData: {},
        billingTableData: [],
        contactsTableData: [],
        licenceTableData: [],
        sincerityTableData: []
      }, // 编辑数据
      total: 100,
      // 分页
      page: {
        pageNo: 1,
        pageSize: 10
      },
      statusSearchConfig: [{ label: '草稿', value: 1, statusNum: 0 },
        { label: '审核中', value: 2, statusNum: 1 },
        { label: '审核通过', value: 3, statusNum: 10 },
        { label: '已驳回', value: 4, statusNum: 20 }],
      formData: {
        tenantName: '',
        programName: '',
        tenantType: ''
      },
      configData: [ // 表单配置
        { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入企业名称关键字', width: '220px', isFirst: true }, // TODO 字段没找到
        { itemType: 'select', prop: 'programName', label: '', placeholder: '请选择项目', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 'tenantType', label: '', placeholder: '请选择企业性质', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 'tenantName', label: '', placeholder: '请选择企业名称', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true }
      ],
      tableData: [
        { programName: '11' }
      ], // 表格数据
      tableConfig: [// 表单配置
        { idx: '序号', type: 'index', width: '100px' },
        { programName: '项目', sortable: true },
        { tenantId: '企业编码', sortable: true },
        { tenantName: '企业名称', sortable: true },
        { tenantType: '企业性质', sortable: true, formatter: row => {
          if (row.tenantType === 0) {
            return '个人'
          }
          return '公司'
        } },
        { changes: '变更内容', sortable: true },
        { checkStatus: '审核状态', sortable: true, formatter: row => {
          if (row.checkStatus === '0') {
            return '已审核'
          }
          return '审核中'
        } },
        { applyDate: '发起时间', sortable: true },
        { completeDate: '审核结束时间', sortable: true }
      ]
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
    tableRow(row) {
      console.log(row)
      buildingApi.enterpriseLibraryEdit().then(res => {
        this.editList = JSON.parse(JSON.stringify(res))
        console.log(this.editList)
        if (row.checkStatus === '0') { // 详情
          this.isStatus = row.checkStatus
          this.isShowDialog = !this.isShowDialog
          return
        }
        // 编辑
        this.isStatus = row.checkStatus
        this.isShowDialog = !this.isShowDialog
      })
    },
    sizeChange() {},
    cloneDialog() {
      this.isShowDialog = !this.isShowDialog
    }
  }
}
</script>
