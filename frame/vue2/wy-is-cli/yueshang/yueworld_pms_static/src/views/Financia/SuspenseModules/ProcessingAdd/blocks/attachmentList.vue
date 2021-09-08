<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单冲抵核销明细
-->
<template>
  <div>

    <!-- 表格 -->
    <ysn-formTable
      ref="rulesForm"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :first-row-add="false"
      :rules="rulesForm"
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
import PUBFN from '@/utils/pubFn'
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
      rulesForm: {
        // 表单验证
        feeName: [{ required: true, message: '请选择必填项' }],
        dealAmountOne: [{ required: true, message: '请选择必填项' }],
        dealType: [{ required: true, message: '请选择必填项' }],
        temporaryReceiptsBalanceOne: [{ required: true, message: '请选择必填项' }]
      },
      tableConfig: [
        // 表单配置
        {
          feeName: '费项',
          itemType: 'text',
          placeholder: '请选择',
          required: true
        },
        { accountName: '收款单位', itemType: 'text' },
        {
          dealType: '处理类型',
          itemType: 'select',
          list: PUBFN.getOptionsList('allType'),
          placeholder: '请选择',
          required: true
        },
        {
          temporaryReceiptsBalanceOne: '可用余额(元)',
          itemType: 'text',
          inputType: 'Number',
          type: 'money',
          disabled: true
        },
        {
          dealAmountOne: '处理金额(元)',
          itemType: 'input',
          type: 'money',
          required: true,
          inputType: 'Number',
          listeners: { input: this.dealAmountOnelisteners }
        },
        { dealReason: '处理原因', itemType: 'input' }
      ]
    }
  },
  computed: {
    // 合计计算数组去重
    totalAll() {
      let num = 0
      const list = this.currentFormData.tableData
      const noSame = list.reduce(function(item, next) {
        const feeName = next.feeName
        const accountName = next.accountName
        const index = `${feeName}${accountName}`
        if (item.length === 0 || !item[index]) {
          item[index] = next
        }
        return item
      }, [])
      // eslint-disable-next-line no-unused-vars
      for (const i in noSame) {
        num += Number(noSame[i].temporaryReceiptsBalanceOne)
      }
      return num
    }
  },
  // 不同页面修改处理明细样式
  created() {
    if (this.$route.query.id) {
      this.tableConfig[4].itemType = 'text'
      this.tableConfig[5].itemType = 'text'
      this.tableConfig[4].required = false
    } else {
      this.tableConfig[2].itemType = 'text'
      // this.tableConfig[3].itemType = 'input'
      this.tableConfig[3].required = true
      this.tableConfig[2].required = false
    }
    if (this.$route.query.id === 4) {
      this.tableConfig[2].required = false
    }
    // return
  },
  methods: {
    // 合计计算功能
    dealAmountOnelisteners(val) {
      const list = this.currentFormData.tableData
      const index = `${val.feeName}${val.accountName}`
      let allNum = 0
      list.forEach(item => {
        const idx = `${item.feeName}${item.accountName}`
        if (index === idx) {
          allNum += Number(item.dealAmountOne)
        }
      })
      if (allNum > val.temporaryReceiptsBalanceOne) {
        if (list.length === 1) {
          this.$message.error('处理金额不能大于可用余额')
          val.dealAmountOne = ''
          return
        }
        this.$message.error('处理明细里费项与收款单位一致时，多行的处理金额之合不能大于可用余额')
        val.dealAmountOne = ''
      }
    },
    // 头部添加
    flodClick() {
      if (this.data.programAndBusinessInfo.tenantName === '') {
        this.$message.error('请先选择商家/企业')
        return
      }
      this.dialogAdd = true
    },
    // 获取弹窗数据
    getData(val) {
      this.tableConfig[4].itemType = 'input'
      this.tableConfig[5].itemType = 'input'
      this.currentFormData.tableData = [...this.currentFormData.tableData, ...val]
    },
    // 关闭弹窗
    close_() {
      this.dialogAdd = false
    }
  }
}
</script>
