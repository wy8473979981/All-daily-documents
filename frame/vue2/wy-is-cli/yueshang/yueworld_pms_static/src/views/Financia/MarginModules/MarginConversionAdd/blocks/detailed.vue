<!--
 * @Author: xza
 * @Date: 2021-07-22 17:58:49
 * @LastEditTime: 2021-09-06 11:29:31
 * @LastEditors: xza
 * @Description: 保证金转换单新增/编辑-转换明细
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionAdd/blocks/detailed.vue
-->

<template>
  <div>
    <ysn-tableDesc class="mb-8" :config="detailedData.configTop" />
    <!-- 表格 -->
    <ysn-formTable
      ref="detailedData"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :first-row-add="false"
      :rules="rules"
      @changeDate="changeDate"
    >
      <!-- 收款单位插槽 解决换行 -->
      <template #accountName="scope">
        <div class="warp_">{{ scope.row.accountName + '/' + scope.row.bankName + '/' + scope.row.bankAccount }}</div>
      </template>
    </ysn-formTable>
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
  name: 'Detailed',
  components: {
    DialogFormAdd
  },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'detailedData',
    event: 'change'
  },
  props: {
    detailedData: { type: Object, default: () => {} },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      dialogAdd: false,
      tableConfig: [ // 表单配置
        { outContNo: '转出意向/合同编号', itemType: 'text' },
        { outFeeName: '费项', itemType: 'text' },
        { accountName: '收款单位', itemType: 'text', hasSlot: true },
        { turnableAmount: '可转入金额(元)', itemType: 'text', type: 'money' },
        { turnAmount: '转入金额(元)', itemType: 'input', inputType: 'Number', fixedWidth: 140, type: 'money', required: true, listeners: { input: this.isTrueNum }},
        { applicationAmount: '冲抵金额(元)', itemType: 'input', fixedWidth: 140, inputType: 'Number', type: 'money', listeners: { input: this.isTrueNum }}
      ],
      rules: { // 表单校验
        turnAmount: [{ required: true, message: '请输入' }]
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
      if (this.data.baseInfo.outTenantName === '') {
        this.$message({ message: '请先选择转出商家', type: 'error' })
        return
      }
      this.dialogAdd = true
    },
    /**
     * @description: 校验金额
     * @param {*} row
     * @return {*}
     */
    isTrueNum(row) {
      // 基础校验
      if (row.turnAmount === undefined || row.turnAmount === '') {
        this.$message({ message: '请先输入转入金额', type: 'error' })
        row.applicationAmount = ''
        return
      }
      if (parseFloat(row.turnableAmount) < parseFloat(row.turnAmount)) {
        this.$message({ message: '转入金额不允许大于可转入金额', type: 'error' })
        row.turnAmount = ''
        // 校验不通过 金额归0后 通知页面数据修改
        this.$emit('comChange', { row, type: 'new' })
        return
      }
      if (parseFloat(row.turnAmount) < parseFloat(row.applicationAmount)) {
        this.$message({ message: '冲抵金额不允许大于转入金额', type: 'error' })
        row.applicationAmount = ''
        // 校验不通过 金额归0后 通知页面数据修改
        this.$emit('comChange', { row, type: 'new' })
        return
      }
      this.$emit('comChange', { row, type: 'new' })
    }
  }
}
</script>
<style lang="scss">
  .warp_{
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
