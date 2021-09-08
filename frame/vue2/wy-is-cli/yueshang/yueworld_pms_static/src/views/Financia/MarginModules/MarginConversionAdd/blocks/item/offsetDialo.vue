<!--
 * @Author: xza
 * @Date: 2021-08-03 13:47:52
 * @LastEditTime: 2021-08-26 11:34:24
 * @LastEditors: xza
 * @Description: 冲抵明细弹窗
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionAdd/blocks/item/offsetDialo.vue
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
          ref="ItemChooseContract"
          :search-config="searchConfig"
          :search-form="searchForm"
          :search-column="3"
          :query-config="queryConfig"
          :table-config="tableConfig"
          :table-order-config="tableOrderConfig"
          :before-qeury-data="beforeQeuryData"
          persmission="OffsetDialo"
          :has-table-config="false"
          :hide-page="true"
          @selection-change="handleCurrentChange"
        />
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <!-- 带有删除的按钮 -->
        <div class="text-left flex_">
          <ysn-deleteItem
            v-for="(i,index) in info"
            :key="index + 111"
            :info="i"
            :info-type="infoType"
            @removeChoose="removeChoose"
          />
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
import { baseApi } from '@/api'
export default {
  name: 'OffsetDialo',
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
      info: [],
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        feeName: [],
        receivableDate: ''
      },
      outClose: true,
      searchConfig: [{ itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入应收编号/商家/企业', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'selectDialog', prop: 'feeName', label: '', placeholder: '所有费项', width: '220px', list: this.$PUBFN.getOptionsList('allPro'), isFirst: true },
        { itemType: 'datePicker', prop: 'conversionDate', label: '', type: 'daterange', width: '236px', startPlaceholder: '应收日期起', endPlaceholder: '应收日期止', rangeSeparator: '~', isFirst: true }
      ],

      // 接口请求配置
      queryConfig: {
        api: baseApi.detailsList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { id: '序号', itemType: 'text', width: '50px', required: false, isShow: true },
        { receivableNo: '应收编号', isShow: true },
        { contNo: '合同编号', isShow: true },
        { tenantName: '商家/企业', isShow: true, width: '90px', formatter: item => item.brandName + '/' + item.tenantName },
        { feeName: '费项', isShow: true },
        { receivableDate: '应收日期', isShow: true },
        { accrualDate: '权责月', isShow: true },
        { receivableAmount: '实际应收金额(元)', isShow: true, width: '160px', type: 'money' },
        { realReceivableAmount: '未核销金额(元)', isShow: true, width: '150px', type: 'money' },
        { status: '状态', isShow: true }
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
     * @description: 下方删除时间 获取当前关键信息
     * @param {*} e
     * @return {*}
     */
    removeChoose(e) {
      // 视图层逻辑 去除列表关键行cehckbox高亮样式
      this.info.forEach((item, index) => {
        if (item.id === e.id) {
          this.info.splice(index, 1)
          this.$refs.ItemChooseContract.$refs.tableKeys.$refs.ysnTable.toggleRowSelection(item)
        }
      })
    },
    /**
     * @description: 关闭弹窗
     * @param {*}
     * @return {*}
     */
    closeDialog() {
      this.info = []
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
     * @description: 确认
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
     * @description: 点击每一列数据
     * @param {*} val
     * @return {*}
     */
    handleCurrentChange(val) {
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
