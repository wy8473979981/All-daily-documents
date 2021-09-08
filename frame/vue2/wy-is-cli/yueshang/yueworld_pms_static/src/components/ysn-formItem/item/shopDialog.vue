<!--
 * @Author: xiaoxie
 * @LastEditors: fhj
 * @Description: 选择合同编号
-->
<template>
  <ysn-popoverDialog ref="popover" width="900">
    <!-- 默认slot点击时打开弹窗 -->
    <el-input placeholder="请选择" suffix-icon="el-icon-arrow-down" :disabled="$attrs.disabled" :value="form[$attrs.prop]" @key="()=>{}" />
    <!-- 弹窗表格 -->
    <template #content>

      <YsnPageContent
        ref="ItemChoiceContractDialog"
        :search-config="searchConfig"
        :search-form="searchForm"
        :search-column="3"
        :query-config="queryConfig"
        :table-config="tableConfig"
        :table-order-config="tableOrderConfig"
        :before-qeury-data="beforeQeuryData"
        persmission="ItemChoiceContractDialog"
        :has-table-config="false"
        @current-change="handleCurrentChange"
      >
        <template #tableRight>
          <ysn-btn>新增</ysn-btn>
        </template>
      </YsnPageContent>
      <div class="pt-16 text-right">
        <ysn-btn class="mr-12" @click="handleVisible">确认</ysn-btn>
        <ysn-btn type="reset" @click="closeDialog">取消</ysn-btn>
      </div>
    </template>

  </ysn-popoverDialog>
</template>
<script>
import { baseApi } from '@/api'
export default {
  name: 'ItemShopDialog',
  inheritAttrs: false,
  props: {
    form: {
      type: Object, default: () => {}
    },
    // 数据变更处理
    change: {
      type: Function
    }
  },
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: '',
        type: ''

      },
      outClose: true,
      searchConfig: [{ itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入商家名称', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'select', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: this.$PUBFN.getOptionsList('projectList'), isFirst: true },
        { itemType: 'select', prop: 'type', label: '', placeholder: '请选择商家类型', width: '220px', list: this.$PUBFN.getOptionsList('projectList'), isFirst: true }],

      // 接口请求配置
      queryConfig: {
        api: baseApi.shopNameQuery, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { tenantId: '编码', sortable: true, isShow: true },
        { tenantName: '商家名称', sortable: true, isShow: true },
        { name: '租户名称', sortable: true, isShow: true },
        { type: '类型', sortable: true, isShow: true },
        { status: '状态', sortable: true, isShow: true }
      ],
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        highLightCurrentRow: true,
        full: false,
        height: '200px',
        selectKey: 'id'
      },
      currentRow: null
    }
  },
  methods: {

    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 关闭
    closeDialog() {
      this.$refs.popover.closePop()
    },
    // 保存
    handleVisible() {
      if (this.currentRow) {
        this.form[this.$attrs.prop] = this.currentRow.tenantName
        this.change && this.change(this.currentRow)
      }
      this.closeDialog()
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>
