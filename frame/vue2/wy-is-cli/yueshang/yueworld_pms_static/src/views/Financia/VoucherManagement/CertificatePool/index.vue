
/*
 * @Author: xiaoxie
 * @Date: 2021-07-22 16:01:07
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 15:41:43
 */
// 凭证池
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="CertificatePool"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="4"
      :table-slots="['receiptNumber']"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="CertificatePool"
      @onSelect="onSelect"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-12" @click="tipBox()">生成凭证(合并)</ysn-btn>
        <ysn-btn class="mr-12" @click="tipBox()">生成凭证(不合并)</ysn-btn>
      </template>
      <!-- 单号 -->
      <template #receiptNumber="scope">
        <span class="primary-color">{{ scope.row.receiptNumber }}</span>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
import { marginProcessingApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
export default {
  name: 'CertificatePool',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: [],
        financialDate: ''
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: marginProcessingApi.certificatePoolList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // 选中的table row
      checkedData: []
    }
  },
  activated() {
    this.$refs['CertificatePool'] && this.$refs['CertificatePool'].getList()
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 更新列表
    updateList() {
      this.$refs.CertificatePool.getList()
    },
    // 选中的checkbox
    onSelect(value) {
      this.checkedData = value
    },
    tipBox() {
      if (this.checkedData.length > 0) {
        this.$message({ message: '生成凭证成功！', type: 'success' })
        this.updateList()
      } else {
        this.$message({ message: '请先勾选需要生成凭证的数据。', type: 'error' })
      }
    }
  }
}
</script>
