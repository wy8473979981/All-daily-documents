<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description: 核销单弹窗
-->
<template>
  <div>
    <ysn-dialog
      :title="'请选择核销单'"
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
          @selection-change="handleCurrentChange"
        />
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <!-- 带有删除的按钮 -->
        <div class="text-left flex_">
          <ysn-deleteItem v-for="(i,index) in info" :key="index + 'reinfo'" :info-type="infoType" :info="i" @removeChoose="removeChoose" />
        </div>
        <div class="text-right">
          <ysn-btn :disabled="currentRow.length === 0" class="mr-12" @click="handleVisible">确认</ysn-btn>
          <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { receiptListApi } from '@/api/receiptList'
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
      infoType: 'verificationId',
      info: [],
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: []

      },
      outClose: true,
      searchConfig: [
        { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入合同号/核销单号/商家', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: this.$PUBFN.getOptionsList('allProject'), isFirst: true },
        { itemType: 'datePicker', prop: 'verificationDate', label: '', type: 'daterange', width: '236px', startPlaceholder: '核销日期开始', endPlaceholder: '核销日期结束', rangeSeparator: '~', isFirst: true }
      ],
      // 接口请求配置
      queryConfig: {
        api: receiptListApi.receiptListWindow, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      tableData: [],
      tableConfig: [
        { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
        { verificationId: '核销单号', isShow: true, width: '120px' },
        { programName: '项目', isShow: true },
        { tenantName: '商家', isShow: true },
        { receivedAmount: '核销金额(元)', isShow: true, type: 'money' },
        { verificationDate: '核销日期', isShow: true }
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
    // 下方删除时间 获取当前关键信息
    removeChoose(e) {
      // 视图层逻辑 去除列表关键行cehckbox高亮样式
      this.info.forEach((item, index) => {
        if (item.id === e.id) {
          this.info.splice(index, 1)
          this.$refs.ItemChooseContract.$refs.tableKeys.$refs.ysnTable.toggleRowSelection(item)
        }
      })
    },
    // 关闭弹窗
    closeDialog() {
      this.info = []
      this.$emit('closeDialog')
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      this.currentRow = []
      return data
    },
    // 保存
    handleVisible() {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.closeDialog()
      // this.info = []
      // if (this.currentRow.length <= 1) {
      //   this.$router.push({ name: 'ReceiptListDetails', query: { id: this.currentRow[0].id, type: 1 }})
      // } else {
      //   this.$router.push({ name: 'ReceiptListDetails', query: { id: 4, type: 1 }})
      // }
      // this.closeDialog()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.info = val
      this.currentRow = val
    }
  }
}
</script>
<style lang="scss" scoped>
  .flex_{
    display: flex;
  }
</style>
