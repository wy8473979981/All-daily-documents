<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单转换明细
-->
<template>
  <el-form :model="currentFormData" label-position="top" size="small">
    <ysn-tableDesc class="mb-8" :config="tableDescConfig" />
    <!-- 表格 -->
    <ysn-formTable
      ref="rulesForm"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :show-operation="true"
      :first-row-add="false"
      :rules="rulesForm"
    />
  </el-form>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'Table',
  components: {},
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
      dialogAdd: false,
      tableConfig: [ // 表单配置
        { transferOutFee: '转出费项', itemType: 'optionFeename', required: true, placeholder: '请选择', change: this.transferOutFee, fixedWidth: 240 },
        { accountName: '收款单位', itemType: 'text', fixedWidth: 80 },
        { turnableAmount: '可转入金额(元)', itemType: 'text', type: 'money', fixedWidth: 200 },
        { turnAmount: '转入金额(元)', itemType: 'input', required: true, type: 'money', inputType: 'Number' },
        { applicationAmount: '冲抵金额(元)', itemType: 'input', required: true, type: 'money', inputType: 'Number' }
      ],
      rulesForm: { // 表单验证
        transferOutFee: [{ required: true, message: '请选择必填项' }],
        turnAmount: [{ required: true, message: '请选择必填项' }],
        applicationAmount: [{ required: true, message: '请选择必填项' }]
      }
    }
  },
  computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '可转入金额汇总(元)', value: this.turnableAmount, type: 'money' },
        { text: '转入金额汇总(元)', value: this.turnAmount, type: 'money' },
        { text: '冲抵金额汇总(元)', value: this.applicationAmount, type: 'money' }
      ]
      return list
    },
    // 可转入金额汇总
    turnableAmount() {
      let num = 0
      this.currentFormData.tableData.forEach(val => {
        num += Number(val.turnableAmount)
      })
      return num
    },
    // 转入金额汇总
    turnAmount() {
      let num = 0
      this.currentFormData.tableData.forEach(val => {
        if (val.transferOutFee === '' && val.turnAmount !== '') {
          this.$message.error('请选择转出费项')
          val.turnAmount = ''
          return num
        }

        const numOne = Number(val.turnAmount)
        const numTwo = Number(val.turnableAmount)
        num += numOne

        if (numOne > numTwo) {
          this.$message.error('转入金额不可大于可转入金额')
          val.turnAmount = ''
          // eslint-disable-next-line no-return-assign
          return num = 0
        }
      })

      return num
    },
    // 冲抵金额汇总
    applicationAmount() {
      let num = 0
      this.currentFormData.tableData.forEach(val => {
        if (val.turnAmount === '' && val.applicationAmount !== '') {
          this.$message.error('请添加转入金额')
          val.applicationAmount = ''
          // return num
        }
        const numOne = Number(val.applicationAmount)
        const numTwo = Number(val.turnAmount)
        num += numOne
        if (numOne > numTwo && numTwo !== 0) {
          this.$message.error('冲抵金额不可大于转入金额')
          val.applicationAmount = ''
          // eslint-disable-next-line no-return-assign
          return num = 0
        }
      })
      return num
    }
  },

  methods: {
    // 转出费项不允许重复
    transferOutFee(val, index) {
      const list = this.currentFormData.tableData
      let num = 0
      list.forEach(item => {
        if (item.transferOutFee === val.transferOutFee) {
          num++
        }
      })
      if (num >= 1) {
        this.$message.error('转出费项不允许重复')
        val.transferOutFee = ''
        val.accountName = ''
        val.turnableAmount = ''
      }
      this.currentFormData.tableData[index].transferOutFee = val.transferOutFee
      this.currentFormData.tableData[index].accountName = val.accountName
      this.currentFormData.tableData[index].turnableAmount = val.turnableAmount
    },

    // 头部添加
    flodClick() {
      if (this.data.programAndBusinessInfo.rollTenantName === '') {
        this.$message({ message: '请选择转出商家', type: 'error' })
        return
      }
      if (this.currentFormData.tableData !== undefined) {
        const datas = {
          transferOutFee: '',
          accountName: '',
          turnableAmount: '',
          turnAmount: '',
          applicationAmount: ''
        }
        this.currentFormData.tableData.push(datas)
      }
    }
  }
}
</script>
