/*
 * @Author: xueyx
 * @Last Modified by: xueyx
 */
<template>
  <ysn-dialog :out-close="outClose" :title="'请选择应收'" :width="'1054px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
    <!-- 弹窗表格 -->
    <template #contain>
      <!-- xxx合同编号 -->
      <YsnPageContent
        ref="DialogDueform"
        :search-config="searchConfig"
        :search-form="searchForm"
        :search-column="3"
        :query-config="queryConfig"
        :table-config="tableConfig"
        :table-order-config="tableOrderConfig"
        :before-qeury-data="beforeQeuryData"
        persmission="DialogDueform"
        :has-table-config="false"
        :update="update"
        @selection-change="handleSelectionChange"
      >
        <template #pageTop>
          <span class="contno">{{ contno }}</span> 合同编号
        </template>
      </YsnPageContent>

    </template>
    <!-- 弹窗按钮 -->
    <template #btn>
      <div class="footer">
        <!-- 带有删除的按钮 -->
        <div class="text-left flex_">
          <ysn-deleteItem v-for="(i,index) in currentRow" :key="index + 'info'" :info-type="infoType" :info="i" @removeChoose="removeChoose" />
        </div>
        <div class="text-right">
          <ysn-btn :disabled="disabledStatus" class="mr-12" @click="handleVisible">确认</ysn-btn>
          <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
        </div>
      </div>

    </template>
  </ysn-dialog>
</template>
<script>
import { approveApi } from '@/api'
import PUBFN from '@/utils/pubFn'

export default {
  name: 'DialogDueform',
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
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    contno: {
      type: String, default: () => ''
    }
  },
  data() {
    return {
      update: 0,
      infoType: 'receivableNo',
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        feeName: [], // 费项
        receivableTime: ''// 时间
      },
      outClose: true, // 关闭
      searchConfig: [
        { itemType: 'selectDialog', prop: 'feeName', label: '', placeholder: '所有费项', width: '150px', list: PUBFN.getOptionsList('Payabledata'), isFirst: true },
        { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '应收编号/商家/企业/租赁区域', width: '260px', isSearch: true, isFirst: true },
        { itemType: 'datePicker', prop: 'receivableTime', label: '', type: 'daterange', width: '206px', startPlaceholder: '应收日期起', endPlaceholder: '应收日期止', rangeSeparator: '~', isFirst: true }
      ],

      // 接口请求配置
      queryConfig: {
        api: approveApi.getReceivableDueformlist, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { idx: '序号', type: 'index', width: 50, sortable: true, showFixed: true, label: '' },
        { receivableNo: '应收编号', isShow: true, sortable: true, label: '' },
        { tenantId: '商家/企业', isShow: true, sortable: true, label: '' },
        { feeName: '费项', isShow: true, sortable: true, label: '' },
        { receivableTime: '应收日期', isShow: true, sortable: true, label: '' },
        { financialDate: '权责月', isShow: true, sortable: true, label: '' },
        { receivableAmount: '应收金额(元)', isShow: true, type: 'money', sortable: true, label: '' },
        { DerateAmount: '减免金额(元)', isShow: true, type: 'money', sortable: true, label: '' },
        { unverifiedAmount: '未核销金额(元)', isShow: true, type: 'money', sortable: true, label: '' }
      ],
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: true, // 继承el-table所有属性,ysn-table的属性
        height: '200px',
        selectKey: 'id'
      },
      currentRow: null, // 选中数据
      disabledStatus: true // 保存按钮的状态
    }
  },
  methods: {
    // 下方删除时间 获取当前关键信息
    removeChoose(e) {
      // 视图层逻辑 去除列表关键行cehckbox高亮样式
      this.currentRow.forEach((item, index) => {
        if (item.id === e.id) {
          this.currentRow.splice(index, 1)
          this.$refs.DialogDueform.$refs.tableKeys.$refs.ysnTable.toggleRowSelection(item)
        }
      })
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      this.currentRow = null
      this.disabled = true
      return data
    },
    // 关闭
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 保存
    handleVisible() {
      this.$emit('currentRowBox', this.currentRow)
      this.closeDialog()
    },
    handleSelectionChange(val) {
      this.currentRow = val
      if (this.currentRow !== undefined && this.currentRow.length > 0) {
        this.disabledStatus = false
      } else {
        this.disabledStatus = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.contno{
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #050101;
}
.flex_{
    display: flex;
    flex-wrap: wrap;
  }
  .footer{
    display: flex;
    justify-content: space-between;
  }
  .text-right{
    display: flex;
  }
</style>
