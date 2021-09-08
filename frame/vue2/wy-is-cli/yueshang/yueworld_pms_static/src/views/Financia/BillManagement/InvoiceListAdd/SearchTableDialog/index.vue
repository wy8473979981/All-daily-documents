<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:弹窗页面
-->
<template>
  <ysn-dialog
    ref="SearchTableDialog"
    external
    :title="config.title"
    :top="config.top"
    :is-show-dialog="visible"
    :width="config.width"
    :is-determine="false"
    :is-cancel="false"
    @closeDialog="closeDialog"
  >
    <!-- 弹窗表格 -->
    <template #contain>
      <YsnPageContent
        ref="SearchTableDialogTable"
        :search-config="searchConfig"
        :search-form="searchForm"
        :query-config="queryConfig"
        :table-config="tableConfig"
        :table-order-config="tableOrderConfig"
        :before-qeury-data="beforeQeuryData"
        :has-table-config="false"
        persmission="SearchTableDialogTable"
        @row-click="rowClick"
      >
        <!-- 列表操作列插槽 -->
        <template #default="scope">
          <span class="table-operate" @click="addInvocie(scope)">加入待开票列表</span>
        </template>
      </YsnPageContent>

    </template>
    <!-- 弹窗按钮 -->
    <!-- <template #btn>
      <div class="text-right">
        <ysn-btn class="mr-12" @click="handleVisible">确认</ysn-btn>
        <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
      </div>
    </template> -->
  </ysn-dialog>
</template>
<script>
export default {
  name: 'SearchTableDialog',
  inheritAttrs: false,
  props: {
    dialogConfig: {
      type: Object, default: () => {}
    },
    searchConfig: {
      type: Array, default: () => []
    },
    searchForm: {
      type: Object, default: () => {}
    },
    queryConfig: {
      type: Object, default: () => {}
    },
    tableConfig: {
      type: Array, default: () => []
    }
  },
  data() {
    return {
      config: {
        title: '带有表单列表的弹出层',
        top: '5%',
        width: '900px'
      },
      visible: false, // 控制弹出层显示
      outClose: true,
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        full: true,
        showOperation: true,
        operationWidth: '150'
      }
    }
  },
  methods: {
    // 加入开票列表
    addInvocie({ row }) {
      this.$emit('rowClick', { ...row })
    },
    /**
    * @method openDialog
    * @returns null
    * @desc 打开弹出层
    */
    openDialog(config) {
      this.visible = true
      this.config = { ...this.config, ...config }
    },
    /**
    * @method rowClick
    * @returns null
    * @desc 行点击事件
    */
    rowClick(row, column) {
      // if (column.label === '操作') { // 处理操作列事件
      //   this.$emit('rowClick', { ...row })
      // }
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
    // 关闭
    closeDialog() {
      this.visible = false
    },
    // 保存
    handleVisible() {
      this.closeDialog()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index";
</style>
