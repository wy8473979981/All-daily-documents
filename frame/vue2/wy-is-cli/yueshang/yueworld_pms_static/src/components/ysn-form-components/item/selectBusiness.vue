<!--
 * @Author: fzx
 * @LastEditors: fhj
 * @Description: 选择商家
-->
<template>
  <ysn-dialog
    v-bind="$attrs"
    ref="dialog"
    :title="'请选择商家'"
    :top="'10%'"
    width="900px"
    :parent-choose-data="form[$attrs.prop]"
  >
    <!-- 默认slot点击时打开弹窗 -->
    <el-input placeholder="请选择" suffix-icon="el-icon-arrow-down" :value="form[$attrs.prop]" @key="()=>{}" />
    <!-- 弹窗表格 -->
    <template #contain>
      <YsnPageContent
        ref="ItemSelectBusiness"
        :search-config="searchConfig"
        :search-form="searchForm"
        :search-column="3"
        :query-config="queryConfig"
        :table-config="tableConfig"
        :table-order-config="tableOrderConfig"
        :before-qeury-data="beforeQeuryData"
        persmission="ItemSelectBusiness"
        :has-table-config="false"
        @current-change="handleCurrentChange"
      >
        <!-- 列表操作功能 -->
        <template #tableRight>
          <ysn-btn @click="add">新增商家</ysn-btn>
        </template>
      </YsnPageContent>
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
import { collectionList } from '@/api'
export default {
  name: 'ItemSelectBusiness',
  inheritAttrs: false,
  props: {
    form: {
      type: Object, default: () => {}
    },
    // 数据变更处理
    change: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: []
      },
      outClose: true,
      searchConfig: [
        { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入商家/企业名称/编号', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '所有项目', width: '220px', list: this.$PUBFN.getOptionsList('projectList'), isFirst: true },
        { itemType: 'select', prop: 'tenantName', label: '', placeholder: '所有商家/企业名称', width: '220px', list: this.$PUBFN.getOptionsList('brandName'), isFirst: true }
      ],

      // 接口请求配置
      queryConfig: {
        api: collectionList.selectBusiness, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { idx: '序号', type: 'index', sortable: true, showFixed: true },
        { tenantId: '商家/企业编号', sortable: true, isShow: true },
        { programName: '项目名称', sortable: true, isShow: true },
        { tenantName: '商家/企业名称', sortable: true, isShow: true },
        { tenantType: '类型', sortable: true, isShow: true },
        { checkStatus: '状态', sortable: true, isShow: true },
        { verificationId: '核销编号', sortable: true, isShow: false },
        { verificationTypes: '核销类型', sortable: true, isShow: false },
        { verificationPerson: '核销人员', sortable: true, isShow: false }
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
      this.$refs.dialog.onCancel()
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
    },
    add() {
      const newPage = this.$router.resolve({
        name: 'TenantLibrary'
      })
      window.open(newPage.href, '_blank')
    }
  }
}
</script>
