<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销单-新增
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn @click="saveBox(1)">提交审核</ysn-btn>
        <ysn-btn v-if="!isEdit" class="ml-8" @click="saveBox(0)">保存</ysn-btn>
        <ysn-btn v-if="isEdit" class="ml-8" type="info" @click="saveBox(0)">保存</ysn-btn>
        <ysn-confirm
          title="提示"
          width="484px"
          top="120px"
          :content="`是否确认删除?`"
          tip="此操作将永久删除,不可撤回,请谨慎操作"
          @confirm="deleteBox"
        >
          <ysn-btn v-if="isEdit" class="mr-12 ml-8" type="delete">删除</ysn-btn>
        </ysn-confirm>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { pageConfig } from './config'
import { processingApi, collectionList } from '@/api'
export default {
  name: 'VerificationAdd',
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
      update: 0,
      // 判断是否为编辑页
      isEdit: false,
      id: 0,
      hasMenu: true, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      flag: false,
      // 统一数据
      formData: {
        essential: {
          tenantName: '', // 商户名称
          programName: '', // 项目名称
          verificationId: '', // 核销编号
          verificationPerson: '', // 核销人员
          verificationTypes: '', // 核销类型
          verificationDate: '' // 核销日期
        },
        offset: {
          provisional: [],
          bond: []
        },
        receivableDeduction: {
          tableData: []
        },
        writeOffDetails: {
          tableData: []
        }
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.isEdit = true
      const datas = {
        id: this.$route.query.id
      }
      this.verificationAdd(datas) // 详情数据接口
    } else {
      // 当id不存在时为新增页，新增页默认获取id为1的数据
      const datas = {
        id: 0
      }
      this.verificationAdd(datas) // 详情数据接口
    }
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
    // 详情数据接口
    verificationAdd(datas) {
      const that = this
      collectionList.verificationAdd(datas).then(res => {
        if (res) {
          if (this.$route.query.id) {
            that.formData = res.list
          } else {
            res.list.offset.bond.forEach(item => {
              item.applyOffsetAmount = ''
            })
            res.list.offset.provisional.forEach(item => {
              item.applyOffsetAmount = ''
            })
            that.formData = res.list
          }
        }
        that.update++
      })
    },
    examine() {
      this.$router.push({ name: 'VerificationList' })// 跳转到核销单列表页
    },
    // 提交审核  保存
    saveBox(submitType) {
      const that = this
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          if (that.editStatus) {
            that.formData.submitType = 1
            that.formData.id = that.id
          } else {
            that.formData.submitType = submitType
          }
          if (submitType === 1) {
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
            that.$message.success({ message: '提交成功' })
          } else {
            that.$message.success({ message: '保存成功' })
          }
          that.$router.push({ name: 'VerificationList' })
        }
      })
    },
    // 点击删除
    deleteBox() {
      const that = this
      const datas = {
        id: this.id
      }
      processingApi.processing(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => {
          that.$router.push({ name: 'VerificationList' })
        }, 1000)
      })
    }
  }
}
</script>
