<!--
 * @Author: jiallk
 * @LastEditors:jiallk
 * @Description: 付款核销单
-->
<template>
  <div class="app-page-main ">
    <YsnPageContent
      ref="PaymentVerificationForm"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="brandPositioningList"
      :update="update"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
      @onSelect="onSelect"
      @successTableList="successTableList"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="Upload()">
          上传
        </ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
// 请求api
import { PayableApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
export default {
  name: 'PaymentVerificationForm',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        programName: [], // 所有项目
        payableDate: '', // 付款日期起 ~付款日期止
        feeName: [], // 费项
        uploadStatus: [], // 请选择上传状态
        verificationDate: '' // 核销日期起 ~核销日期止
      },
      // 更新列表
      update: 0,
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: PayableApi.PaymentVerificationForm, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: true // 继承el-table所有属性,ysn-table的属性
      },

      // 选中的table row
      checkedData: [],
      // 多选数据
      checkboxList: []
    }
  },
  methods: {
    //  点击反核销，生成一笔负数付款金额  核销编号前面加R
    afterQueryData() {
      this.tableData = this.$refs.PaymentVerificationForm.tableData
      if (this.tableData && this.tableData.length > 0) {
        this.tableData.forEach(item => {
          if (this.$route.query.id === item.id) {
            item.receivableNo = 'R' + item.receivableNo
            item.payableAmount = '-' + item.payableAmount
          }
        })
      }
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 并接字段
    Parallelstatus(row) {
      return row.uploadStatus + '/' + row.verificationStatusId + '/' + row.auditStatus
    },
    // 列表单行点击
    rowClick(row) {
      // 审核通和审核中详情剩下的是编辑
      if (row.auditStatus === '审核通过') {
        this.$router.push({ name: 'PaymentVerificationFormEdit', query: { id: row.id }}) // 审核通过-详情
      }
      if (row.auditStatus === '草稿') {
        this.$router.push({ name: 'PaymentVerificationFormadd', query: { id: row.id }}) // 草稿-编辑
      }
      if (row.auditStatus === '已驳回' || row.auditStatus === '已红冲') {
        this.$router.push({ name: 'PaymentVerificationFormDetail', query: { id: row.id }}) // 驳回/已红冲-编辑
      }
      if (row.auditStatus === '审核中') {
        this.$router.push({ name: 'PaymentVerificationFormAgain', query: { id: row.id }}) // 审核中-详情
      }
    },
    // 刷新列表
    async successTableList() {
      await this.$refs.PaymentVerificationForm.getList()
      await this.update++
    },
    // 更新列表
    updateList() {
      this.$refs.PaymentVerificationForm.getList()
    },
    // 选中的checkbox
    onSelect(value) {
      this.checkedData = value
    },
    Upload() {
      if (this.checkedData.length > 0) {
        this.$message({ message: '上传成功！', type: 'success' })
        this.updateList()
        setTimeout(() => {
          this.$router.go(0)
        }, 500)
      } else {
        this.$message({ message: '请先勾选需要上传的数据。', type: 'error' })
      }
    }
  }
}
</script>
