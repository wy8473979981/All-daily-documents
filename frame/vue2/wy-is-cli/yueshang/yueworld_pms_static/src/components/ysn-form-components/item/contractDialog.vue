<!--
 * @Author: xiaoxie
 * @LastEditors: xueyx
 * @Description: 选择合同编号
-->
<template>
  <ysn-popoverDialog
    ref="popover"
    width="1100"
  >
    <!-- 默认slot点击时打开弹窗 -->
    <el-input placeholder="请选择" suffix-icon="el-icon-arrow-down" :value="form[$attrs.prop]" @key="()=>{}" />
    <!-- 弹窗表格 -->
    <template slot="content">

      <YsnPageContent
        ref="ItemcontractDialog"
        :search-config="searchConfig"
        :search-form="searchForm"
        :search-column="3"
        :query-config="queryConfig"
        :table-config="tableConfig"
        :table-order-config="tableOrderConfig"
        :before-qeury-data="beforeQeuryData"
        persmission="ItemcontractDialog"
        :has-table-config="false"
        @current-change="handleCurrentChange"
      />
      <div class="text-right">
        <ysn-btn :disabled="!currentRow" class="mr-12" @click="handleVisible">确认</ysn-btn>
        <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
      </div>
    </template>
  </ysn-popoverDialog>
</template>
<script>
import { approveApi } from '@/api'

import PUBFN from '@/utils/pubFn'
export default {
  name: 'ItemContractDialog',
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
        programName: [],
        derateType: '',
        auditStatus: ''
      },
      outClose: true,
      searchConfig: [{ itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入合同编号/商家/品牌/租赁区域', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '200px', list: PUBFN.getOptionsList('projectList'), isFirst: true },
        { itemType: 'select', prop: 'derateType', label: '', placeholder: '合同类型', width: '200px', list: PUBFN.getOptionsList('receivableContType'), isFirst: true },
        { itemType: 'select', prop: 'auditStatus', label: '', placeholder: '合同状态', width: '200px', list: PUBFN.getOptionsList('contractStatus'), isFirst: true }
      ],
      // 接口请求配置
      queryConfig: {
        api: approveApi.getAddContractList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
        { contNo: '合同编号', sortable: true, isShow: true },
        { programName: '项目名称', sortable: true, isShow: true },
        { tenantId: '商家/企业', sortable: true, isShow: true },
        { brandName: '品牌名', sortable: true, isShow: true },
        { derateType: '合同类型', sortable: true, isShow: true },
        { contType: '租期', sortable: true, isShow: true }, // TODO 字段暂不清楚
        { auditStatus: '合同状态', sortable: true, isShow: true }
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
      this.currentRow = null
      return data
    },
    // 关闭
    closeDialog() {
      this.$refs.popover.closePop()
    },
    // 保存
    handleVisible() {
      if (this.currentRow) {
        this.change(this.currentRow)
      }
      this.closeDialog()
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>
