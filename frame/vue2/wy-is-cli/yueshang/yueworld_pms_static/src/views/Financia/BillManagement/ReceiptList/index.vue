<!--
 * @Author: zbk
 * @LastEditors: xza
 * @Description:收据管理列表
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      persmission="ReceiptList"
      :before-qeury-data="beforeQeuryData"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <template #tableRight>
        <el-dropdown class="mr-12">
          <el-button class="btn" type="primary">新增收据<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-dropdown-menu slot="dropdown" style="width: 130px">
            <el-dropdown-item>
              <el-button type="text" @click="addInvoice">通过手工开票</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" @click="openBoxs">通过核销单开票</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <ysn-btn class="mr-8" type="info">批量打印</ysn-btn>
        <ysn-btn class="mr-12" type="info">
          <ysn-excel type="export">导出</ysn-excel>
        </ysn-btn>
      </template>
    </YsnPageContent>
    <DialogFormAdd
      :is-show-dialog="dialogAdd"
      @closeDialog="close_"
      @getData="getData"
    />
  </div>
</template>
<script>
import { statusSearchConfig, searchConfig, tableConfig, queryConfig, searchForm } from './config'
import DialogFormAdd from './block/dialogFormAdd.vue'
export default {
  name: 'ReceiptList',
  components: {
    DialogFormAdd
  },
  props: {},
  data() {
    return {
      dialogAdd: false,
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索form配置
      searchConfig: searchConfig.call(this),
      // 搜索form数据
      searchForm: searchForm.call(this),
      // 列表接口及数据回显配置
      queryConfig: queryConfig.call(this),
      // 表格列的配置
      tableConfig: tableConfig.call(this)
    }
  },
  methods: {
    /**
     * @method addInvoice
     * @returns null
     * @desc 新增发票
     */
    addInvoice() {
      this.$router.push({ name: 'ReceiptListAdd' })
    },
    /**
    * @method  rowClick
    * @returns null
    * @desc 行的点击事件，点击跳转至详情页
    */
    rowClick(row) {
      console.log(row.id)
      if (row.id === 1) {
        this.$router.push({ name: 'ReceiptListAdd', query: { id: row.id }})
        return
      }
      this.$router.push({ name: 'ReceiptListDetails', query: { id: row.id }})
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
    },
    // 获取弹窗数据
    getData(val) {
      this.$emit('comChange', val)
    },
    // 关闭弹窗
    close_() {
      this.dialogAdd = false
    },
    openBoxs() {
      this.dialogAdd = true
    }
    // 默认非草稿禁止删除
    // selectable(row) {
    //   // return row.statusId === 1
    // }
  }
}
</script>
<style scoped lang="scss">
.btn {
  border: none;
  padding: 0 14px;
  border-radius: 16px;
  line-height: 32px;
  min-width: 86px;
  font-size: 14px;

  // 主要按钮
  &.el-button--primary {
    &:hover {
      background: #20384A;
    }
  }

  &.el-button--text {
    width: auto;
    padding: 0px;
  }
}
</style>
