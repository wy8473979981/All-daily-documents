<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:收款方式
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="PaymentMethod"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="PaymentMethod"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表按钮操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-8 ml-8" @click="Object.assign( PaymentAdd, { visible: true, record: {} })">新增</ysn-btn>
        <ysn-btn class="mr-8" type="info">
          <ysn-excel type="import">导入</ysn-excel>
        </ysn-btn>
        <ysn-btn type="reset">
          <ysn-excel type="export">导出</ysn-excel>
        </ysn-btn>
      </template>

    </YsnPageContent>
    <!-- 新增/编辑弹窗 -->
    <PaymentAdd
      :is-show-dialog="PaymentAdd.visible"
      :form-data="PaymentAdd.record"
      @closeDialog="Object.assign(PaymentAdd, { visible: false, record: {} })"
      @successTableList="successTableList"
      @remove="remove"
    />
  </div>
</template>
<script>
// 请求api
import PaymentAdd from './blocks/PaymentAdd.vue'
import { PayableApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
export default {
  name: 'PaymentMethod',
  components: { PaymentAdd },
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        paymentTypeId: '', // 收款方式编码
        paymentTypeName: '', // 收款方式名称
        status: '', // 状态
        creatDate: '' // 创建时间
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 新增编辑会话框
      PaymentAdd: {
        visible: false,
        record: {}
      },

      // 接口请求配置
      queryConfig: {
        api: PayableApi.PaymentMethod, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      },

      // 请求后的数据
      reqData: {}
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(dataTmp) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return dataTmp
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      this.reqData = data
    },
    // 列表单行点击
    rowClick(record) {
      Object.assign(this.PaymentAdd, { visible: true, record })
    },
    // 刷新列表
    async successTableList() {
      await this.$refs.PaymentMethod.getList()
      await this.update++
    },
    // 删除
    remove() {
      Object.assign(this.PaymentAdd, { visible: false, record: {}})
      this.successTableList()
    }
  }
}
</script>
