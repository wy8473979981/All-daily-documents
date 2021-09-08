<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销单列表
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="VerificationList"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      :table-order-config="tableOrderConfig"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="addBox">新增核销单</ysn-btn>
        <ysn-btn type="info" class="ml-8">
          <ysn-excel type="export">导出</ysn-excel>
        </ysn-btn>
        <ysn-btn class="ml-8" type="reset">
          <ysn-excel type="import">上传</ysn-excel>
        </ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>

<script>
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import { collectionList } from '@/api'

export default {
  name: 'VerificationList',
  data() {
    return {
      status: 0,
      verificationTypes: 0,
      // 列表数据
      tableData: [
        {
          verificationId: '', // 核销编号
          programName: '', // 项目名称
          tenantName: '', // 商家/企业
          verificationAmount: '', // 核销金额
          collectionVerificationTotal: '', // 收款核销
          OffsetAmountTotal: '', // 冲抵金额
          receivableReductionAmount: '', // 剩余可冲抵金额（保证金）
          advanceAmountTotal: '', // 转暂收金额汇总
          verificationDate: '', // 核销日期
          auditStatus: '', // 审核状态
          creator: '', // 创建人
          creatDate: '', // 创建时间
          updateTime: '', // 更新时间
          uploadState: '', // 上传状态
          receivedId: '' // 收款编号
        }
      ],
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        verificationId: '', // 核销编号
        programName: [], // 所有项目
        paymentTypeName: '', // 收款日期
        verificationDate: '', // 核销日期
        verificationType: '', // 核销类型
        verificationPerson: '' // 核销人
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: collectionList.verificationList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkb填入eox等
      tableOrderConfig: {
        checkbox: true
      }
    }
  },
  created() {
    // console.log(this.$route.query.id)
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    // 详情页面
    rowClick(row) {
      // 审核状态判断
      if (row.auditStatus === '审核通过') {
        this.status = 1
      } else if (row.auditStatus === '审核中') {
        this.status = 2
      } else if (row.auditStatus === '草稿') {
        this.status = 3
      }
      // 核销类型判断
      if (row.verificationTypes === '余额核销') {
        this.verificationTypes = 1
      } else if (row.verificationTypes === '收款核销') {
        this.verificationTypes = 2
      }
      // 详情页判断
      if (this.status === 1) {
        this.$router.push({ name: 'VerificationDetails', query: { id: row.id, status: this.status, verificationTypes: this.verificationTypes }})
      }
      // 审核中判断
      if (this.status === 2) {
        this.$router.push({ name: 'VerificationDetails', query: { id: row.id, status: this.status }})
      }
      // 新增页判断
      if (this.status === 3) {
        this.$router.push({ name: 'VerificationAdd', query: { id: row.id }})
      }
    },
    addBox() {
      this.$router.push({ name: 'VerificationAdd' })
    }
  }
}
</script>
