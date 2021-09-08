<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:
-->

<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      :data="tableData"
      :column="tableConfig"
      :checkbox="false"
    />
    <!-- 分页  -->
    <ysn-page :page="page" :total="total" @change="pageChange" />
  </div>
</template>

<script>
import { getDetailDataList } from '../config'

export default {
  name: 'InvoiceList',
  model: {
    prop: 'invoiceId',
    event: 'change'
  },
  props: {
    invoiceId: { type: String, default: '' }
  },
  data() {
    return {
      // 发票详情列表列数据配置
      tableConfig: [
        { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
        { receivableNo: '应收编号', sortable: true },
        { feeName: '费项', sortable: true },
        { amount: '价税合计(元)', type: 'money', sortable: true },
        { unverifiedAmount: '税率 (%)', type: 'money', sortable: true },
        { untaxAccount: '不含税金额(元)', type: 'money', sortable: true },
        { taxAccount: '税额(元)', type: 'money', sortable: true }
      ],
      page: {
        pageNo: 1,
        pageSize: 20
      },
      total: 100,
      tableData: []
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    /**
    * @method getTableData
    * @returns null
    * @desc 获取列表数据
    */
    async getTableData() {
      const { detailList, total } = await getDetailDataList(this.page)
      this.tableData = detailList
      this.total = total
    },
    /**
     * @method pageChange
     * @returns null
     * @desc 分页参数更改重新请求数据
     */
    pageChange(page) {
      this.page = page
      this.getTableData()
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 请求数据之后对返回的数据进行处理
    afterQueryData(data) {
      return data
    }
  }
}
</script>
