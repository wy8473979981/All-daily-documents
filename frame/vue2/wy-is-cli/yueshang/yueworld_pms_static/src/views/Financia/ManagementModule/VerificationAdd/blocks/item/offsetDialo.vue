<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 核销明细弹窗
-->
<template>
  <div>
    <ysn-dialog
      :title="'请选择应收'"
      :out-close="outClose"
      :width="'900px'"
      :is-show-dialog="isShowDialog"
      :external="true"
      @closeDialog="closeDialog"
    >
      <template #contain>
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
          :hide-page="true"
          @selection-change="handleCurrentChange"
        />
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <!-- 带有删除的按钮 -->
        <div class="text-left flex_">
          <ysn-deleteItem v-for="(i,index) in currentRow" :key="index + 'info'" :info-type="infoType" :info="i" @removeChoose="removeChoose" />
        </div>
        <div class="text-right">
          <ysn-btn :disabled="disabledStatus" class="mr-12" @click="handleVisible">确认</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { collectionList } from '@/api'
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
      infoType: 'receivableNo',
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        feeName: []

      },
      outClose: true,
      searchConfig: [
        { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入应收编号/合同编号', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'selectDialog', prop: 'feeName', label: '', placeholder: '所有费项', width: '220px', list: this.$PUBFN.getOptionsList('feesName'), isFirst: true },
        { itemType: 'datePicker', prop: 'createTime', label: '', startPlaceholder: '应收日期起', endPlaceholder: '应收日期止', rangeSeparator: '~', type: 'daterange', width: '220px', isFirst: true }
      ],
      // 接口请求配置
      queryConfig: {
        api: collectionList.offsetDialo, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      tableData: [],
      tableConfig: [
        { idx: '序号', type: 'index', isShow: true, showFixed: true },
        { receivableNo: '应收编号', isShow: true },
        { contractNo: '合同编号', isShow: true },
        { tenantName: '商家/企业', isShow: true },
        { feeName: '费项', isShow: true },
        { receivableTime: '应收日期', isShow: true },
        { financialDate: '权责月', isShow: true },
        { actualReceivableAmount: '实际应收金额(元)', isShow: true, type: 'money' },
        { unverifiedAmount: '未核销金额(元)', isShow: true, type: 'money' },
        { verificationStatusId: '状态', isShow: true }
      ],
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: true, // 继承el-table所有属性,ysn-table的属性
        full: false,
        height: '200px',
        selectKey: 'id'
      },
      currentRow: null,
      disabledStatus: true
    }
  },
  methods: {
    // 弹窗删除已选择的
    removeChoose(e) {
      // 视图层逻辑 去除列表关键行cehckbox高亮样式
      this.currentRow.forEach((item, index) => {
        if (item.id === e.id) {
          this.currentRow.splice(index, 1)
          this.$refs.DialogDueform.$refs.tableKeys.$refs.ysnTable.toggleRowSelection(item)
        }
      })
    },
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      this.currentRow = []
      this.disabled = true
      return data
    },
    // 保存
    handleVisible() {
      if (this.currentRow) {
        this.$emit('getData', this.currentRow)
      }
      this.closeDialog()
    },
    handleCurrentChange(val) {
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
  .flex_{
    display: flex;
  }
</style>
