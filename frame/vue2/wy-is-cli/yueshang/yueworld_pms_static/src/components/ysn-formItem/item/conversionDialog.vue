<!--
 * @Author: sdy
 * @LastEditors: fhj
 * @Description: 选择商家
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
        ref="ItemconversionDialog"
        :search-config="searchConfig"
        :search-form="searchForm"
        :search-column="3"
        :query-config="queryConfig"
        :table-config="tableConfig"
        :table-order-config="tableOrderConfig"
        :before-qeury-data="beforeQeuryData"
        persmission="ItemconversionDialog"
        :has-table-config="false"
        @current-change="handleCurrentChange"
      >
        <template #tableRight>
          <ysn-btn v-if="$attrs.prop!='rollTenantName'" @click="add">新增</ysn-btn>
        </template>
      </YsnPageContent>
      <div class="text-right">
        <ysn-btn :disabled="!currentRow" class="mr-12" @click="handleVisible">确认</ysn-btn>
        <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
      </div>
    </template>
  </ysn-popoverDialog>
</template>
<script>
import { processingApi } from '@/api'
import PUBFN from '@/utils/pubFn'
export default {
  name: 'ItemConversionDialog',
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
        programName: '',
        derateType: '',
        auditStatus: ''
      },
      outClose: true,
      searchConfig: [{ itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入商家/企业名称/编号', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'input', prop: 'programName', width: '200px', isFirst: true, disabled: true },
        { itemType: 'select', prop: 'tenantName', label: '', placeholder: '所有商家/企业类型', width: '200px', list: PUBFN.getOptionsList('allBusiness'), isFirst: true }
      ],
      // 接口请求配置
      queryConfig: {
        api: processingApi.processingDialog, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
        { tenantId: '商业/企业编号', sortable: true, isShow: true },
        { programName: '项目名称', sortable: true, isShow: true },
        { brandName: '品牌名称', sortable: true, isShow: false },
        { tenantName: '商家/企业名称', sortable: true, isShow: true },
        { tenantType: '类型', sortable: true, isShow: true },
        { checkStatus: '状态', sortable: true, isShow: true },
        { rollTenantName: '转出商家', sortable: true, isShow: false },
        { intoTenantName: '转入商家', sortable: true, isShow: false },
        { rollBrandName: '转出品牌名', sortable: true, isShow: false },
        { intoBrandName: '转入品牌名', sortable: true, isShow: false }
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
      const list = PUBFN.getOptionsList('PayableList')
      let label = ''
      list.forEach(item => {
        if (item.value === this.form.programName || item.label === this.form.programName) {
          label = item.label
        }
        this.searchForm.programName = label
      })
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
