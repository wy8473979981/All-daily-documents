<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:费用调整单-新增编辑-选择合同编号弹窗
-->
<template>
  <ysn-dialog
    v-bind="$attrs"
    ref="dialog"
    :title="'请选择合同'"
    :top="'10%'"
    width="1100px"
    :parent-choose-data="form[$attrs.prop]"
  >
    <!-- 默认slot点击时打开弹窗 -->
    <el-input placeholder="请选择" suffix-icon="el-icon-arrow-down" :value="form[$attrs.prop]" @key="()=>{}" />
    <!-- 弹窗表格 -->
    <template #contain>
      <YsnPageContent
        ref="ItemContNo"
        :search-config="searchConfig"
        :search-form="searchForm"
        :search-column="4"
        :query-config="queryConfig"
        :table-config="tableConfig"
        :table-order-config="tableOrderConfig"
        :before-qeury-data="beforeQeuryData"
        persmission="ItemContNo"
        :has-table-config="false"
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
import { collectionList } from '@/api'
export default {
  name: 'ItemContNo',
  inheritAttrs: false,
  props: {
    form: {
      type: Object, default: () => {}
    },
    // 数据变更处理
    change: {
      type: Function,
      default: () => {}
    },
    index: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      // 搜索form
      searchForm: {
        contNo: '',
        programName: '',
        protocolType: '',
        auditStatus: ''
      },
      outClose: true,
      searchConfig: [
        { itemType: 'input', prop: 'contNo', placeholder: '合同编号/品牌名/商家/企业', isSearch: true, isFirst: true },
        { itemType: 'select', prop: 'programName', placeholder: '请选择项目', list: this.$PUBFN.getOptionsList('projectList'), isFirst: true },
        { itemType: 'select', prop: 'protocolType', placeholder: '合同类型', list: this.$PUBFN.getOptionsList('contractsType'), isFirst: true },
        { itemType: 'select', prop: 'auditStatus', placeholder: '合同状态', list: this.$PUBFN.getOptionsList('contractStatus'), isFirst: true }
      ],

      // 接口请求配置
      queryConfig: {
        api: collectionList.contNoChange, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { contNo: '合同编号', sortable: true, isShow: true },
        { programName: '项目名称', sortable: true, isShow: true },
        { tenantName: '商家/企业名称', sortable: true, isShow: true },
        { brandName: '品牌名', sortable: true, isShow: true },
        { protocolType: '合同类型', sortable: true, isShow: true },
        { leaseTerm: '租期', sortable: true, isShow: true },
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
      this.$refs.dialog.onCancel()
    },
    // 保存
    handleVisible(val) {
      if (this.currentRow) {
        this.change(this.currentRow, this.index)
      }
      this.closeDialog()
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>
