<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:新增页面
-->

<template>
  <div class="app-page-main invoice-list-add">
    <!-- 表单区域 -->
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="rulesForm"
      label-position="left"
    >
      <ysn-formItem class="form-item-36" :form="formData" :config="configData" :column="1" clearable />
    </el-form>

    <!-- 表头操作 -->
    <div class="text-right">
      <ysn-confirm
        ref="confirm"
        title="提示"
        width="484px"
        top="120px"
        :show-btn="false"
        :content="`合计${invoiceValue}元，本次开票将生成${invoiceNum}张发票！`"
      >
        <template #btn>
          <ysn-btn class="mr-8" @click="handleConfirm">确认</ysn-btn>
          <ysn-btn class="mr-8" type="info" @click="handleCancel">取消</ysn-btn>
        </template>
      </ysn-confirm>
      <ysn-btn class="mr-8" type="primary" @click="openInvoice">开票</ysn-btn>
      <ysn-btn class="mr-8" type="primary" @click="addRecords">添加应收</ysn-btn>
      <ysn-btn class="mr-8" type="danger" @click="currentFormData.tableData = []">清空记录</ysn-btn>
      <!-- 自定义表头 -->
      <!-- <ysn-tableConfigDialog
        :config="tableConfig"
        @change="tableConfigChange"
      /> -->
    </div>
    <!-- 表格组件 -->
    <ysn-formTable
      ref="ruleTable"
      v-model="currentFormData"
      prop="tableData"
      :column="currentTableConfig"
      :first-row-add="false"
      add
      :rules="rulesTable"
    />
    <!-- 分页组件 -->
    <ysn-page
      :page="page"
      :total="currentFormData.tableData.length"
      @change="pageChange"
    />
    <!-- 弹出层组件 -->
    <search-table-dialog
      ref="searchTableDialog"
      :search-form="dialogForm"
      :search-config="dialogSearchConfig"
      :query-config="dialogQueryConfig"
      :table-config="dialogConfigData"
      @rowClick="dialogRowClick"
    />
  </div>
</template>

<script>
import {
  configData,
  rulesForm,
  rulesTable,
  tableConfig,
  queryConfig,
  tableOrderConfig,
  dialogConfig,
  dialogConfigData,
  dialogQueryConfig,
  dialogSearchConfig
} from './config'
import SearchTableDialog from './SearchTableDialog'
export default {
  name: 'InvoiceListAdd',
  comments: {
    SearchTableDialog
  },
  components: { SearchTableDialog },
  data() {
    return {
      //   左侧按钮导航配置
      configData: configData.call(this),
      rulesForm: rulesForm.call(this),
      rulesTable: rulesTable.call(this),
      tableConfig: tableConfig.call(this),
      queryConfig: queryConfig.call(this),
      dialogConfig: dialogConfig.call(this),
      tableOrderConfig: tableOrderConfig.call(this),
      dialogSearchConfig: dialogSearchConfig.call(this),
      dialogQueryConfig: dialogQueryConfig.call(this),
      dialogConfigData: dialogConfigData.call(this),
      formData: {
        invoiceType: 1, // 发票类型
        programName: 0, // 备注名称
        remark: '', // 备注
        limit: ''// 限额
      },
      dialogForm: {
        fuzzyEnquiry: '', // 模糊查询
        invoiceId: '', // 编号/发票号/合同编号/商家/品牌
        programName: [], // 所有项目
        feeName: [], // 所有费项
        status: [], // 开票状态
        monthNumber: '' // 权债月分
      },
      currentFormData: {
        tableData: [] // 表格数据
      },
      visible: false,
      confirm: false,

      page: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      currentTableConfig: [], // 使用的表格配置
      tableDataForm: {
        tableData: [] // 表格数据
      },
      tableData: [], // 表格数据
      tableKey: 1, // 表格标识
      invoiceValue: 0, // 开票金额
      invoiceNum: 0 // 开票数量
    }
  },
  created() {
    this.currentTableConfig = this.tableConfig.filter(item => {
      return item.isShow
    })
  },
  methods: {
    // 确认
    handleConfirm() {
      this.$refs.confirm.handleConfirm()
      this.$message.success('开票成功')
      this.$router.push({ name: 'InvoiceList' })
    },
    // 取消
    handleCancel() {
      this.$refs.confirm.handleCancel()
    },
    /**
    * @method dialogRowClick
    * @returns null
    * @desc 开票范围弹出层列表行点击事件
    */
    dialogRowClick(row) {
      this.$message.success('加入成功')
      this.tableData.push(row)
      this.currentFormData.tableData.push(row)
    },
    /**
    * @method addRecords
    * @returns null
    * @desc 打开添加应收弹出层
    */
    addRecords() {
      this.$refs['searchTableDialog'].openDialog(this.dialogConfig)
    },
    /**
    * @method confirmEvent
    * @returns
    * @desc 确认弹窗确认事件
    */
    confirmEvents(row) {
      console.log(row)
    },
    confirmEvent() {
      console.log()
    },
    /**
    * @method openInvoice
    * @returns  null
    * @desc 开票事件
    */
    async openInvoice() {
      let valid = await this.ruleTableValidate()
      if (!valid) return
      valid = await this.ruleFormValidate()
      if (!valid) return
      if (['0', 0].includes(this.formData.limit)) {
        this.$message.error('限额不能为0')
        return
      }
      this.invoiceValue = 0
      this.currentFormData.tableData.forEach(item => {
        this.invoiceValue += Number(item.makeInvoiceAmountThr)
      })
      this.invoiceNum = Math.ceil(Number(this.invoiceValue) / this.formData.limit)
      this.$refs.confirm.visible = true
    },
    /**
    * @method ruleTableValidate
    * @returns  null
    * @desc 开票事件表格验证
    */
    ruleTableValidate() {
      return new Promise(res => {
        this.$refs.ruleTable.validate(valid => {
          res(valid)
        })
      })
    },
    /**
     * @method ruleTableValidate
     * @returns  null
     * @desc 开票事件表单验证
     */
    ruleFormValidate() {
      return new Promise(res => {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            if (this.currentFormData.tableData.length === 0) {
              this.$message.error('暂无可开票的数据')
              res(false)
            } else {
              res(true)
            }
          } else {
            res(false)
          }
        })
      })
    },
    preservation() {
      this.visible = false
    },
    /**
    * @method deleteRecordsEvent
    * @returns null
    * @desc 列表移除事件
    */
    deleteRecordsEvent({ row }) {
      this.tableData = this.tableData.filter(item => {
        return item.id !== row.id
      })
    },
    // 列表config切换
    tableConfigChange(newConfig) {
      this.currentTableConfig = newConfig.concat()
      this.tableKey++
    },
    pageChange(val) {

    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
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
<style lang="scss" scoped>
.operation{
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
.text-right {
  text-align: right;
  margin-bottom: 8px;
  line-height: 32px;
}
.invoice-list-add {
  ::v-deep .el-form-item__label{
    padding-top: 7px;
  }
}

</style>
