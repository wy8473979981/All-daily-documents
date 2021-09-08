<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:发票管理列表
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-order-config="tableOrderConfig"
      :table-config="tableConfig"
      :table-slots="['invoiceId']"
      persmission="InvoiceList"
      :before-qeury-data="beforeQeuryData"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
      @select="comSelect"
      @select-all="comSelect"
    >
      <template #invoiceId="scope">
        <ysn-btn type="text">{{ scope.row.invoiceId }}</ysn-btn>
      </template>
      <template #tableRight>
        <ysn-btn class="mr-8" @click="addInvoice">新增发票</ysn-btn>
        <ysn-btn class="mr-8" type="info">
          <ysn-excel type="import">上传发票</ysn-excel>
        </ysn-btn>
        <ysn-btn class="mr-8" type="reset">
          <ysn-excel type="export">下载电子发票</ysn-excel>
        </ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>

import { statusSearchConfig, searchConfig, tableConfig } from './config'
import { invoiceOfListApi } from '@/api'

export default {
  name: 'InvoiceList',
  props: {},
  data() {
    return {
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索form配置
      searchConfig: searchConfig.call(this),
      // 搜索form数据
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        invoiceId: '', // 编号
        programName: [], // 所有项目
        invoiceNumber: '', // 发票号
        receivableNo: '', // 应收编号
        invoiceType: [], // 类型
        feeName: [], // 所有费项
        invoiceDate: '', // 发票日期
        minMoney: '', // 开票金额
        maxMoney: '', // 开票金额
        billMonth: '', // 月份
        status: [] // 状态
      },
      // 列表接口及数据回显配置
      queryConfig: {
        api: invoiceOfListApi.invoiceOfList,
        dataKey: 'invoiceList' // 用于渲染表格数据的标识
      },
      // 表格列的配置
      tableConfig: tableConfig.call(this),
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        showSlots: ['invoiceId'],
        checkbox: true
      },
      checkboxList: []
    }
  },

  mounted() {},
  methods: {
    // 多选
    comSelect(val) {
      this.checkboxList = val
    },
    minMoney(val) {
      if (Number(val) > this.searchForm.maxMoney && this.searchForm.maxMoney !== '') {
        this.$message({ message: '最小金额不可大于最大金额', type: 'error' })
        return
      }
    },
    maxMoney(val) {
      if (Number(val) < this.searchForm.minMoney && this.searchForm.minMoney !== '') {
        this.$message({ message: '最大金额不可小于最小金额', type: 'error' })
        return
      }
    },
    /**
     * @method addInvoice
     * @returns null
     * @desc 新增发票
     */
    addInvoice() {
      this.$router.push({ name: 'InvoiceListAdd' })
    },
    /**
    * @method  rowClick
    * @returns null
    * @desc 行的点击事件，点击跳转至详情页
    */
    rowClick(row) {
      this.$router.push({ name: 'InvoiceListDetail', query: { id: row.id, status: row.status, invoiceId: row.invoiceId }})
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 手动处理状态
      if (data.status.length === 0) {
        data.status = this.statusSearchConfig[0].list.map(item => {
          return item.value
        })
      }
      if (!data.pageNo) {
        data.pageNo = 1
      } else if (data.pageNo.pageNo) {
        data.pageNo = data.pageNo.pageNo
      }
      if (!data.pageSize) data.pageSize = 20
      return data
    },
    // 请求数据之后对返回的数据进行处理
    afterQueryData(data) {
      return data
    }
  }
}
</script>
