<!--
 * @Author: xiaoxie
 * @LastEditors: zengcheng
 * @Description: 意向转合同
-->
<template>
  <div>
    <ysn-dialog :out-close="outClose" :width="'1238px'" :title="'请选择-意向协议'" :is-show-dialog="isShowDialogs" :external="isShowDialogs" @closeDialog="closeDialog">
      <!-- 弹窗表格 -->
      <template #contain>
        <YsnPageContent
          ref="ItemChoiceContractDialog"
          :search-config="searchConfig"
          :search-form="searchForm"
          :search-column="5"
          :query-config="queryConfig"
          :table-config="tableConfig"
          :table-order-config="tableOrderConfig"
          :before-qeury-data="beforeQeuryData"
          persmission="ToStmentdue"
          :has-table-config="false"
          @current-change="handleCurrentChange"
        />
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn class="mr-16" @click="handleVisible">确认</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { investmentApi } from '@/api'
import PUBFN from '@/utils/pubFn'
export default {
  name: 'ToStmentdue',
  props: {
    isShowDialogs: { type: Boolean, default: false } // 弹窗控制
  },
  data() {
    return {
      outClose: true,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: ''
      },
      searchConfig: [
        { itemType: 'input', prop: 'spaceName', label: '', placeholder: '请输入意向编码/名称商家名称关键字', isSearch: true, isFirst: true },
        { itemType: 'select', prop: 'programName', label: '', placeholder: '请选择项目', list: PUBFN.getOptionsList('allPro'), isFirst: true },
        { itemType: 'select', prop: 'buildingName', label: '', placeholder: '请选择楼栋', list: PUBFN.getOptionsList('allFlo'), isFirst: true },
        { itemType: 'select', prop: 'floorName', label: '', placeholder: '请选择楼层', list: PUBFN.getOptionsList('allFlos'), isFirst: true },
        { itemType: 'select', prop: 'spaceName', label: '', placeholder: '请选择商铺', list: PUBFN.getOptionsList('allStores'), isFirst: true }
      ],

      // 接口请求配置
      queryConfig: {
        api: investmentApi.groupingSchemeList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { contNoIntent: '意向编号', sortable: true, isShow: true },
        { intentProtocolName: '意向名称', sortable: true, isShow: true },
        { programName: '项目名称', sortable: true, isShow: true },
        { rentYears: '租期', sortable: true, isShow: true },
        { creator: '创建人', sortable: true, isShow: true },
        { createdDate: '创建时间', sortable: true, isShow: true }
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
  computed: { },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 关闭
    closeDialog() {
      // this.outClose = false
      // this.isShowDialog = false
      this.$emit('closeDialog')
    },
    // 保存
    handleVisible() {
      if (this.currentRow) {
        this.closeDialog()
        // const id = this.currentRow.id
        // 调整新增租赁合同
        this.$router.push({ name: 'LeaseContractAdd', query: { contNoIntentAdd: this.currentRow.id }})
      } else {
        this.$message({ message: '请选择意向协议', type: 'error' })
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>
