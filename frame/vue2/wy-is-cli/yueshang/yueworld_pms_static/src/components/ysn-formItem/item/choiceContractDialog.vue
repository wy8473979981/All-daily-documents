<!--
 * @Author: xiaoxie
 * @LastEditors: fhj
 * @Description: 选择合同编号
-->
<template>
  <ysn-popoverDialog
    ref="popover"
    width="900"
  >
    <!-- 默认slot点击时打开弹窗 -->
    <el-input placeholder="请选择" suffix-icon="el-icon-arrow-down" :value="form[$attrs.prop]" @key="()=>{}" />
    <!-- 弹窗表格 -->
    <template slot="content">
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
      />
      <!-- 弹窗按钮 -->
      <div class="text-right">
        <ysn-btn :disabled="!currentRow" class="mr-12" @click="handleVisible">确认</ysn-btn>
        <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
      </div>
    </template>

  </ysn-popoverDialog>
</template>
<script>
import { baseApi } from '@/api'
export default {
  name: 'ItemChoiceContractDialog',
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
        programName: ''

      },
      outClose: true,
      searchConfig: [{ itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入合同编号/商家/品牌/租赁区域', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'select', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: this.$PUBFN.getOptionsList('allProject'), isFirst: true }],

      // 接口请求配置
      queryConfig: {
        api: baseApi.contractsList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { contNo: '合同编号', sortable: true, isShow: true },
        { programName: '项目名称', sortable: true, isShow: true },
        { brandName: '品牌/商家', sortable: true, isShow: true, formatter: item => item.brandName + '/' + item.tenantName },
        { contType: '类型', sortable: true, isShow: true },
        { rentYears: '租期', sortable: true, isShow: true }
      ],
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        highLightCurrentRow: true,
        full: false,
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
