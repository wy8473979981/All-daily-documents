<!--
 * @Author: xiaoxie
 * @LastEditors: zengcheng
 * @Description: 选择计租方案
-->
<template>
  <div>
    <ysn-dialog :out-close="outClose" :title="'请选择计租方案'" :width="'920px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
      <!-- 弹窗表格 -->
      <template #contain>
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
export default {
  name: 'DialogRentPlan',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    toContract: { type: Boolean, default: false }
  },
  data() {
    return {
      outClose: true,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: [],
        storeTypes: ''
      },
      searchConfig: [
        { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入编码名称/方案名称', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: this.$PUBFN.getOptionsList('projectList'), isFirst: true },
        { itemType: 'select', prop: 'storeTypes', label: '', placeholder: '请选择所有铺位类型', width: '220px', list: this.$PUBFN.getOptionsList('contType'), isSearch: true, isFirst: true }
      ],

      // 接口请求配置
      queryConfig: {
        api: investmentApi.groupingSchemeList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
        { ruleId: '编号', sortable: true, isShow: true },
        { programName: '项目', sortable: true, isShow: true },
        { ruleName: '方案名称', sortable: true, isShow: true },
        { storeTypes: '铺位类型', sortable: true, isShow: true }
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
      const id = this.currentRow.id
      if (this.toContract) {
        this.closeDialog()
        this.$router.push({ name: 'LeaseContractAdd', query: { contNoIntent: this.currentRow.id }})
        return
      }
      if (this.currentRow) {
        this.closeDialog()
        // 调整新增租赁合同
        this.$router.push({ name: 'AgreementOfIntentAdd', query: { contNoIntent: id }})
      } else {
        this.$message({ message: '请选择计租方案', type: 'error' })
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>
