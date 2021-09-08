<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-26 01:32:42
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-28 14:27:31
-->
<template>
  <div class="max-area">
    <div class="mb-16 flex-ju-al-between">
      <div><ysn-tableDesc :config="tableDescConfig" /></div>
      <div class="flex-ju-end">
        <AddDoalog />
        <ysn-btn class="mr-16" type="info">导入</ysn-btn>
        <ysn-btn type="reset">导出</ysn-btn>
      </div>
    </div>
    <!-- 表格组件 -->
    <ysn-table
      :checkbox="false"
      :data="overall.data"
      :column="tableConfig"
      select-key="id"
      full
      @row-click="tableRow"
    />
    <DetailsDialog :is-show-dialog="isShowDialog" :external="isShowDialog" :edit-list="editList" @cloneDialog="cloneDialog" />
    <!-- 分页 -->
    <ysn-page :total="overall.total" :page="page" @sizeChange="sizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>
import { buildingApi } from '@/api'
import AddDoalog from './addDoalog'
import DetailsDialog from './detailsDialog'
export default {
  name: 'TableList',
  components: { AddDoalog, DetailsDialog },
  props: {
    overall: { type: Object, default: () => {} }
  },
  data() {
    return {
      editList: {}, // 编辑详情数据
      isShowDialog: false,
      total: 20, // 总页数
      page: { // 页数
        pageNo: 1,
        pageSize: 20
      },
      tableData: [ // 模拟表格假数据
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
        { tenantCompanyQuailty: '企业属性', sortable: true },
        { checkStatus: '审核状态', sortable: true }
      ]
    }
  },
  computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '公司商家(个)', value: 100 },
        { text: '个人商家(个)', value: 100 }
      ]
      return list
    }
  },
  methods: {
    sizeChange() {},
    currentChange() {},
    tableRow() {
      buildingApi.enterpriseLibraryEdit().then(res => {
        console.log(res)
        this.isShowDialog = !this.isShowDialog
        this.editList = JSON.parse(JSON.stringify(res))
      })
    },
    // 关闭弹窗
    cloneDialog() {
      this.isShowDialog = !this.isShowDialog
    }
  }
}
</script>
