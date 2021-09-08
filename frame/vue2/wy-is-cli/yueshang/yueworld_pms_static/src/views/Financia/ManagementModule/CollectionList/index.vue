<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单列表页
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="CollectionList"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="4"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="CollectionList"
      v-on="$listeners"
      @afterQueryData="afterQueryData"
      @select="comSelect"
      @select-all="comSelect"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="addBox">新增收款单</ysn-btn>
        <ysn-btn class="ml-8" @click="autoWriteOff">自动核销</ysn-btn>
        <ysn-btn class="ml-8" type="info">
          <ysn-excel type="import">导入</ysn-excel>
        </ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>

<script>
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import { collectionList } from '@/api'

export default {
  name: 'CollectionList',
  data() {
    return {
      yesNo: 0,
      min: '',
      max: '',
      // 搜索form
      searchForm: {
        searchStatus: [],
        fuzzyEnquiry: '', // 模糊查询
        receivedId: '', // 收款编号
        programName: [], // 所有项目
        paymentTypeName: [], // 所有收款方式
        receivedDate: '', // 收款日期
        unknownType: '', // 选择未名款
        minMoney: '', // 最小收款金额
        maxMoney: '', // 最大收款金额
        generation: '', // 生成方式
        bankFlowNumber: '', // 银行流水
        bankAccount: '', // 收款银行账号
        receivedPerson: '' // 收款人
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: collectionList.collectionList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox填入等
      tableOrderConfig: {
        checkbox: true // 继承el-table所有属性,ysn-table的属性
      },
      // 多选数据
      checkboxList: []
    }
  },
  methods: {
    minMoney(val) {
      this.min = Number(val)
      if (this.min > this.max && this.max !== '') {
        this.$message.error({ message: '最小金额不可大于最大金额' })
        return
      }
    },
    maxMoney(val) {
      this.max = Number(val)
      if (this.max < this.min && this.min !== '') {
        this.$message.error({ message: '最大金额不可小于最小金额' })
        return
      }
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    // 点击每行数据后
    rowClick(row) {
      console.log(row)
      if (row.unknownType === '是') {
        this.yesNo = 1
      }
      if (row.unknownType === '否') {
        this.yesNo = 2
      }
      if (row.receivedVerificationStatusId === 3 || row.receivedVerificationStatusId === 2) {
        // 跳转详情页
        this.$router.push({ name: 'CollectionListDetails', query: { id: row.id, unknownType: this.yesNo }})
      } else if (row.receivedVerificationStatusId === 1) {
        // 跳转编辑页
        this.$router.push({ name: 'CollectionListEdit', query: { id: row.id }})
      }
    },
    // 新增跳转
    addBox() {
      this.$router.push({ name: 'CollectionListEdit' })
    },
    // 多选
    comSelect(val) {
      this.checkboxList = val
    },
    // 自动核销
    autoWriteOff() {
      if (this.checkboxList.length > 0) {
        this.$message.success({ message: '自动核销成功' })
        // 更新列表
        this.$refs.CollectionList.getList()
        return
      }
      this.$message.error({ message: '请勾选需要自动核销的数据' })
    }
  }
}
</script>
