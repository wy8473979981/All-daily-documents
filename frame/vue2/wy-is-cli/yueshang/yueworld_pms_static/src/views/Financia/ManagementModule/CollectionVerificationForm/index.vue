<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-核销
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :query-config="queryConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="collectionVerificationForm"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn @click="examine">提交审核</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
// 请求api
import { pageConfig } from './config'
import { collectionList } from '@/api'

export default {
  name: 'CollectionVerificationForm',
  props: {},
  data() {
    return {
      amountSum: {
        // 冲抵-暂收款-申请冲抵金额汇总
        zanOffsetAmount: 0,
        // 冲抵-保证金-申请冲抵金额汇总
        baoOffsetAmount: 0,
        // 应收冲减-应收冲减金额汇总
        receivableReductionAmount: 0
      },
      amountSumTwo: {
        // 核销明细-预收款冲抵汇总
        zanOffsetAmount: 0,
        // 核销明细-保证金冲抵汇总
        baoOffsetAmount: 0,
        // 核销明细-应收冲抵汇总
        receivableReductionAmount: 0
      },
      hasMenu: true, // 是否显示左侧菜单
      //   左侧按钮导航配置
      update: 0, // 更新视图用
      pageConfig: pageConfig.call(this),
      flag: false,
      // 统一数据
      formData: {
        essential: {},
        contract: {},
        offset: {
          tableData: [],
          tableDataTwo: []
        },
        temporaryCollections: {
          tableData: []
        },
        receivableDeduction: {
          tableData: []
        },
        writeOffDetails: {
          tableData: []
        }
      },
      // 接口请求配置
      queryConfig: {
        api: collectionList.collectionVerificationForm, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      }
    }
  },
  created() {
    this.$route.query.unknownType = Number(this.$route.query.unknownType)
    this.collectionVerificationForm() // 详情数据接口
  },
  methods: {
    // 计算金额汇总
    judge() {
      const refData = this.$refs.pageDetail.$refs
      this.amountSumTwo.zanOffsetAmount = refData.offset[0].tableDescConfig[1].value
      this.amountSumTwo.baoOffsetAmount = refData.offset[0].tableDescConfigTwo[1].value
      this.amountSumTwo.receivableReductionAmount = refData.receivableDeduction[0].offsetAmount
      this.amountSum.zanOffsetAmount = 0
      this.amountSum.baoOffsetAmount = 0
      this.amountSum.receivableReductionAmount = 0
      const datas = this.$refs.pageDetail.currentFormData.writeOffDetails.tableData
      // 计算 核销明细-预收款冲抵汇总
      datas.forEach(item => {
        this.amountSum.zanOffsetAmount += Number(item.zanOffsetAmount)
      })
      // 计算 核销明细-保证金冲抵汇总
      datas.forEach(item => {
        this.amountSum.baoOffsetAmount += Number(item.baoOffsetAmount)
      })
      // 计算 核销明细-应收冲抵汇总
      datas.forEach(item => {
        this.amountSum.receivableReductionAmount += Number(item.receivableReductionAmount)
      })
    },
    async examine() {
      // 校验是否符合规则
      const res = await this.$refs.pageDetail.valiFormDate()
      console.log(res)
      if (res) {
        this.judge()
        if (this.amountSum.zanOffsetAmount !== this.amountSumTwo.zanOffsetAmount) {
          this.$message.error({ message: '预收款冲抵核销总额和预收款申请冲抵金额汇总不一致，请重新填写' })
          return
        }
        if (this.amountSum.baoOffsetAmount !== this.amountSumTwo.baoOffsetAmount) {
          this.$message.error({ message: '保证金冲抵核销总额和保证金申请金额冲抵汇总不一致，请重新填写' })
          return
        }
        if (this.amountSum.receivableReductionAmount !== this.amountSumTwo.receivableReductionAmount) {
          this.$message.error({ message: '应收冲减冲抵核销总额和应收冲减金额汇总不一致，请重新填写' })
          return
        }
        this.$message.success({ message: '提交成功' })
        this.$router.push({ name: 'CollectionList' })// 跳转到收款单列表页
      }
    },
    // 详情数据接口
    collectionVerificationForm(datas) {
      const that = this
      collectionList.collectionVerificationForm().then(res => {
        if (res) {
          that.formData = res.list
          that.formData.essential.verificationDate = new Date()
          // 暂收款 收款单位显示方式：收款单位+银行+账号
          res.list.offset.tableData.forEach(e => {
            e.accountName = e.accountName + '/' + res.list.contract.bankName + '/' + res.list.contract.bankAccount
          })
          // 保证金 收款单位显示方式：收款单位+银行+账号
          res.list.offset.tableDataTwo.forEach(e => {
            e.accountName = e.accountName + '/' + res.list.contract.bankName + '/' + res.list.contract.bankAccount
          })
        }
        that.update++
      })
    }
  }
}
</script>
