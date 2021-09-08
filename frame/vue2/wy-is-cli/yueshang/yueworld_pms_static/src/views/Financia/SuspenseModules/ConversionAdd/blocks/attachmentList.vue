<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单冲抵核销明细
-->
<template>
  <div>
    <ysn-tableDesc ref="tableDesc" class="mb-8" :config="tableDescConfig" />
    <!-- 表格 -->
    <ysn-formTable
      ref="attachmentList"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :first-row-add="false"
    />
    <DialogFormAdd
      :is-show-dialog="dialogAdd"
      @closeDialog="close_"
      @getData="getData"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import DialogFormAdd from './item/dialogFormAdd.vue'
export default {
  name: 'AttachmentList',
  components: {
    DialogFormAdd
  },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'attachmentList',
    event: 'change'
  },
  props: {
    attachmentList: { type: Object, default: () => {} },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {

      dialogAdd: false,
      tableConfig: [ // 表单配置
        { feeName: '费项', itemType: 'text' },
        { receivableNo: '应收编号', itemType: 'text' },
        { receivableTime: '应收日期', itemType: 'text' },
        { financialDate: '权责月', itemType: 'text' },
        { receivableAmount: '应收金额(元)', itemType: 'text', type: 'money' },
        { applyDerateAmountTotal: '减免金额(元)', itemType: 'text', type: 'money' },
        { unverifiedAmount: '未核销金额(元)', itemType: 'text', type: 'money' },
        { OffsetAmount: '暂收款冲抵(元)', itemType: 'input', type: 'money', inputType: 'Number', width: '130px' }
      ]
    }
  },
  computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '未核销金额汇总(元)', value: this.unverifiedAmount, type: 'money' },
        { text: '暂收款冲抵汇总(元)', value: this.OffsetAmount, type: 'money' }
      ]
      return list
    },
    unverifiedAmount() {
      let num = 0
      this.currentFormData.tableData.forEach(val => {
        num += Number(val.unverifiedAmount)
      })
      return num
    },
    OffsetAmount() {
      let num = 0
      // 暂收款的冲抵金额合计等于转换明细的冲抵金额合计
      const list = this.currentFormData.tableData
      list.forEach(val => {
        num += Number(val.OffsetAmount)
      })
      return num
    }
  },
  methods: {
    // 获取弹窗数据
    getData(val) {
      this.currentFormData.tableData = [...this.currentFormData.tableData, ...val]
    },
    // 关闭弹窗
    close_() {
      this.dialogAdd = false
    },
    // 头部点击添加
    flodClick() {
      if (this.data.programAndBusinessInfo.programName === '') {
        this.$message.error('请选择项目')
        return
      } else if (this.data.countData.tableData.length === 0) {
        this.$message.error('请添加转换明细')
        return
      }
      // 过滤出不含冲抵金额字段的对象 并赋值到新变量
      const keyD = this.data.countData.tableData.filter(i => {
        return !i.applicationAmount
      })
      // 循环数组判断是否为空
      for (var i = 0; i < keyD.length; i++) {
        if (keyD[i].applicationAmount === '') {
          this.$message.error('请输入冲抵金额')
          return
        }
      }
      this.dialogAdd = true
    }
  }
}
</script>
