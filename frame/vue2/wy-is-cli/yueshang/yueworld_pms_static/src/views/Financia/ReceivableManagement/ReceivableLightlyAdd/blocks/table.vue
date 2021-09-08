/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:
*/

<template>
  <div>
    <!-- 汇总 -->
    <div class="pb-8">
      <ysn-tableDesc
        v-if="currentFormData.tableData !==undefined && currentFormData.tableData.length > 0 "
        :config="[{value:derateAmount,text:'申请减免汇总(元)'}]"
      />
    </div>
    <!-- 表格 -->
    <ysn-formTable
      ref="rulesForm"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      :first-row-add="false"
      add
      :rules="rulesForm"
    />
    <ysn-page
      v-if="currentFormData.tableData !==undefined && currentFormData.tableData.length > 0 "
      :total="currentFormData.tableData.length"
      :page="{page:1,pageSize:20}"
      :page-size="['10']"
    />
    <lightlyDialog :is-show-dialog="dialogAddVisible" :contno="contNo" @closeDialog="closeDialog" @currentRowBox="currentRowBox" />
  </div>
</template>

<script>
import PUBFN from '@/utils/pubFn'
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import lightlyDialog from './lightlyDialog.vue'
export default {
  name: 'Table',
  components: { lightlyDialog },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'countData',
    event: 'change'
  },
  props: {
    countData: { type: Object, default: () => {} },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { receivableNo: '应收编号', itemType: 'text', width: '110' },
        { feeName: '费项', itemType: 'text', width: '120' },
        { receivableTime: '应收日期', itemType: 'text', width: '170' },
        { financialDate: '权责月', itemType: 'text', width: '170' },
        { derateType: '减免类型', itemType: 'select', list: PUBFN.getOptionsList('derateTypeList'), width: '140', required: true, change: this.selectChange },
        { receivableAmount: '应收金额(元)', type: 'money', itemType: 'text', width: '125' },
        { DerateAmount: '可减免金额(元)', type: 'money', itemType: 'text', width: '150' },
        { applyDerateAmount: '申请减免金额(元)', itemType: 'input', inputType: 'Number', numberConfig: { min: -9999999999 }, width: '150', required: true },
        { reason: '减免原因', itemType: 'input', width: '120' }

      ],
      dialogAddVisible: false, // 选择处理明细
      contNo: this.data.detailInfo.contNo, // 合同编号
      rulesForm: { // 正则验证
        derateType: [
          { required: true, message: '请选择减免类型' }
        ],
        applyDerateAmount: [
          { required: true, message: '请填写申请减免金额' }
        ]
      }
    }
  },
  computed: {

    derateAmount() { // 金额计算
      let num = 0
      this.currentFormData.tableData.forEach(item => {
        if (item.applyDerateAmount) {
          num += Number(item.applyDerateAmount)
        }
      })
      return num
    }
  },
  methods: {
    selectChange(val) {
      if (val.derateType === 2) {
        this.$set(val, 'applyDerateAmount', 11.22)
      }
    },
    // 添加事件
    async flodClick() {
      if (this.data.detailInfo.contNo) {
        this.contNo = this.data.detailInfo.contNo
        if (this.currentFormData.tableData !== undefined) {
          this.dialogAddVisible = true
        }
      } else {
        this.$message({ message: '请先选择合同编号', type: 'error' })
      }
    },
    // 处理明细的选择弹窗
    currentRowBox(val) {
      this.currentFormData.tableData = [...this.currentFormData.tableData, ...val]
      const obj = {}
      this.currentFormData.tableData = this.currentFormData.tableData.reduce((item, next) => {
        obj[next.id] ? '' : obj[next.id] = true && item.push(next)
        return item
      }, [])
      this.$emit('comChange', val)
    },
    // 关闭
    closeDialog() {
      this.dialogAddVisible = false
    }
  }
}
</script>
