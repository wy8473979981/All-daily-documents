<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description: 转入合同选择
-->
<template>
  <ysn-dialog
    v-bind="$attrs"
    ref="dialog"
    :title="'转入合同'"
    :top="'10%'"
    width="900px"
    :parent-choose-data="form[$attrs.prop]"
  >
    <!-- 默认slot点击时打开弹窗 -->
    <el-input placeholder="请选择" suffix-icon="el-icon-arrow-down" :value="form[$attrs.prop]" @key="()=>{}" />
    <!-- 弹窗表格 -->
    <template #contain>

      <YsnPageContent
        ref="ItemChooseContract"
        :search-config="searchConfig"
        :search-form="searchForm"
        :search-column="3"
        :query-config="queryConfig"
        :table-config="tableConfig"
        :table-order-config="tableOrderConfig"
        :before-qeury-data="beforeQeuryData"
        persmission="ItemChooseContract"
        :has-table-config="false"
        :hide-page="true"
        @current-change="handleCurrentChange"
      />

    </template>
    <!-- 弹窗按钮 -->
    <template #btn>
      <div class="text-right">
        <ysn-btn :disabled="!currentRow" class="mr-12" @click="handleVisible">确认</ysn-btn>
        <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
      </div>
    </template>
  </ysn-dialog>
</template>
<script>
import { baseApi } from '@/api'
export default {
  name: 'ItemChooseContract',
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
        feeName: []

      },
      outClose: true,
      searchConfig: [{ itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入合同编号/商家/品牌/收款单位/收款银行/银行账号', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'selectDialog', prop: 'feeName', label: '', placeholder: '请选择费项', width: '220px', list: this.$PUBFN.getOptionsList('FeeSubjectAll'), isFirst: true }],

      // 接口请求配置
      queryConfig: {
        api: baseApi.contNolist, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { contNo: '合同编号', isShow: true },
        { programName: '项目名称', isShow: true },
        { tenantName: '品牌/商家', isShow: true },
        { feeName: '费项', isShow: true },
        { accountName: '收款单位', isShow: true },
        { bankName: '收款银行', isShow: true },
        { bankAccount: '银行账号', isShow: true },
        { type: '类型', isShow: true },
        { rentYears: '租期', isShow: true }
      ],
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: true, // 继承el-table所有属性,ysn-table的属性
        // highLightCurrentRow: true,
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
      this.$refs.dialog.onCancel()
    },
    // 保存
    handleVisible(val) {
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
