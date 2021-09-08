<!--
 * @Author: xza
 * @Date: 2021-07-20 10:44:34
 * @LastEditTime: 2021-08-16 15:53:53
 * @LastEditors: xza
 * @Description: 保证金转换单新增/编辑-冲抵明细
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionAdd/blocks/balance.vue
-->

<template>
  <div>
    <ysn-tableDesc class="mb-8" :config="balanceData.configTop" />
    <!-- 表格 -->
    <ysn-formTable
      ref="balanceData"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :first-row-add="false"
      :rules="rules"
      @changeDate="changeDate"
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
import DialogFormAdd from './item/offsetDialo.vue'
export default {
  name: 'Balance',
  components: {
    DialogFormAdd
  },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'balanceData',
    event: 'change'
  },
  props: {
    balanceData: { type: Object, default: () => {} },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialogAdd: false,
      tableConfig: [ // 表单配置
        { feeName: '收款费项', itemType: 'text', width: '120px' },
        { receivableNo: '应收编号', itemType: 'text', width: '130px' },
        { receivableDate: '应收日期', itemType: 'text' },
        { accrualDate: '权责月', itemType: 'text' },
        { receivableAmount: '应收金额(元)', itemType: 'text', fixedWidth: 130, type: 'money' },
        { verificationAmount: '已核销金额(元)', itemType: 'text', fixedWidth: 140, type: 'money' },
        { subAmount: '减免金额(元)', itemType: 'text', fixedWidth: 140, type: 'money' },
        { realReceivableAmount: '未核销金额(元)', itemType: 'text', fixedWidth: 140, type: 'money' },
        { offsetAmount: '保证金冲抵金额(元)', itemType: 'input', inputType: 'Number', fixedWidth: 160, listeners: { input: this.isTrueNum }, type: 'money' },
        { note: '备注', itemType: 'input', width: '100px' }
      ],
      rules: {
        feeName: [{ required: true, message: '' }]
      }
    }
  },
  methods: {
    /**
     * @description: 删除当前行数据更新
     * @param {*} e
     * @return {*}
     */
    changeDate(e) {
      this.$emit('changeDate', e)
    },
    /**
     * @description: 获取弹窗数据
     * @param {*} val
     * @return {*}
     */
    getData(val) {
      this.$emit('comChange', val)
    },
    /**
     * @description: 关闭弹窗
     * @param {*}
     * @return {*}
     */
    close_() {
      this.dialogAdd = false
    },
    /**
     * @description: 头部添加
     * @param {*}
     * @return {*}
     */
    flodClick() {
      if (this.data.baseInfo.inContNo === '') {
        this.$message({ message: '请先选择转入合同', type: 'error' })
        return
      }
      // 获取原转换明细数组长度
      const length_ = this.data.detailedData.tableData.length
      // 过滤出不含冲抵金额字段的对象 并赋值到新变量
      const keyD = this.data.detailedData.tableData.filter(i => {
        return !i.applicationAmount
      })
      // 判断原数组长度 是否等于 当前数组长度
      if (keyD.length === length_) {
        this.$message({ message: '请先输入冲抵金额', type: 'error' })
        return
      }
      this.dialogAdd = true
    },
    /**
     * @description: 验证金额
     * @param {*} row
     * @return {*}
     */
    isTrueNum(row) {
      if (parseFloat(row.realReceivableAmount) < parseFloat(row.offsetAmount)) {
        this.$message({ message: '保证金冲抵金额不允许大于未核销金额', type: 'error' })
        row.offsetAmount = ''
        // 校验不通过 金额归0后 通知页面数据修改
        this.$emit('comChange', { row, type: 'new_' })
        return
      }
      this.$emit('comChange', { row, type: 'new_' })
    }
  }
}
</script>
