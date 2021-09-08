<!--
 * @Author: xza
 * @Date: 2021-07-22 15:13:01
 * @LastEditTime: 2021-09-06 11:20:27
 * @LastEditors: xza
 * @Description: 转换明细弹窗
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionAdd/blocks/item/dialogFormAdd.vue
-->

<template>
  <div>
    <ysn-dialog
      :title="'转出意向/合同编号'"
      :out-close="outClose"
      :width="'900px'"
      :is-show-dialog="isShowDialog"
      :external="true"
      @closeDialog="closeDialog"
    >
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
          persmission="DialogFormAdd"
          :has-table-config="false"
          :hide-page="true"
          @after-query-data="afterQueryData"
          @selection-change="handleCurrentChange"
        />
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn :disabled="currentRow.length === 0" class="mr-12" @click="handleVisible">确认</ysn-btn>
          <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { baseApi } from '@/api'
export default {
  name: 'DialogFormAdd',
  inheritAttrs: false,
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    form: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        outFeeName: []
      },
      outClose: true,
      searchConfig: [{ itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入意向/合同编号/商家/品牌/收款单位/收款银行/银行账号', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'selectDialog', prop: 'outFeeName', label: '', placeholder: '请选择费项', width: '220px', list: this.$PUBFN.getOptionsList('FeeSubjectAll'), isFirst: true }],
      // 接口请求配置
      queryConfig: {
        api: baseApi.contNolist, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      tableData: [],
      tableConfig: [
        { id: '序号', itemType: 'text', width: '50px', required: false, isShow: true },
        { outContNo: '意向/合同编号', isShow: true, width: '120px' },
        { programName: '项目名称', isShow: true },
        { tenantName: '品牌/商家', isShow: true, formatter: item => item.brandName + '/' + item.tenantName },
        { outFeeName: '费项', isShow: true },
        { accountName: '收款单位', isShow: true },
        { bankName: '收款银行', isShow: true },
        { bankAccount: '银行账号', isShow: true },
        { contType: '类型', isShow: true },
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
      currentRow: []
    }
  },
  methods: {
    /**
     * @description: 关闭弹窗
     * @param {*}
     * @return {*}
     */
    closeDialog() {
      this.$emit('closeDialog')
    },
    /**
     * @description: 列表数据请求之前数据处理
     * @param {*} data
     * @return {*}
     */
    beforeQeuryData(data) {
      this.currentRow = []
      return data
    },
    /**
     * @description: 请求返回数据
     * @param {*} data
     * @return {*}
     */
    afterQueryData(data) {
      this.currentRow = []
      return data
    },
    /**
     * @description: 确认按钮反馈
     * @param {*}
     * @return {*}
     */
    handleVisible() {
      if (this.currentRow) {
        this.$emit('getData', this.currentRow)
      }
      this.closeDialog()
    },
    /**
     * @description: 选中当前行数据反馈
     * @param {*} val
     * @return {*}
     */
    handleCurrentChange(val) {
      console.log(val)
      this.currentRow = val
    }
  }
}
</script>
