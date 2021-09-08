<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-预览-费用明细
-->

<template>
  <div v-if="currentFormData.tabsList !==undefined && currentFormData.tabsList.length > 0 ">
    <div style="display: flex;align-items: center">
      <ysn-tabs
        :active="active"
        :list="currentFormData.tabsList"
        :dynamic="false"
        @input="tabsChange"
      />
      <ysn-popoverDialog
        ref="popover"
        :width="470"
        :trigger="'hover'"
        class="ml-16"
      >
        <template>
          <div>应收规则<i class="el-icon-warning-outline" /></div>
        </template>
        <template #content>
          <div class="font-18 text-weight-bold font-color-black pb-8" style="border-bottom: 1px solid #E5E2DE;">应收规则</div>
          <el-form ref="ruleForm" :model="dialogFormData" label-position="top" class="mt-16">
            <ysn-formItem :form="dialogFormData" :config="dialogConfigData" :column="3" clearable text />
          </el-form>
        </template>
      </ysn-popoverDialog>
    </div>
    <div class="flex-al-center mt-16" style="justify-content: space-between">
      <div class="font-14 text-left">应收
        <span class="font-18 font-color-blue text-weight-bold">{{ changeNumber(receivableAmountTotal) }}</span>
      </div>
      <div class="text-right">
        <ysn-btn v-if="contractStates!=='待审核' && contractStates!=='已清算'" class="mr-12" @click="push()">推送</ysn-btn>
      </div>
    </div>
    <ysn-table
      :data="tableList"
      class="mt-8"
      :column="tableConfig"
      select-key="id"
      :show-slots="['paymentDate','isToPush']"
      @onSelect="tableSelect"
    >
      <template #isToPush="scope">
        <div>{{ scope.row.isToPush ? '已推送' : '未推送' }}</div>
      </template>
      <template #paymentDate="scope">
        <div>
          <span>{{ scope.row.paymentStartDate }}</span>
          <span>~</span>
          <span>{{ scope.row.paymentEndDate }}</span>
        </div>
      </template>
    </ysn-table>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'
import { standingBookApi } from '@/api'

export default {
  name: 'ExpenseDetailTable',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'expenseDetail',
    event: 'change'
  },
  props: {
    expenseDetail: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      active: 0,
      contractStates: '',
      receivableAmountTotal: 0,
      tableList: [],
      tableSelectList: [],
      tableConfig: [ // 表单配置
        { receivableNo: '应收编号', sortable: true, itemType: 'text' },
        { isToPush: '是否推送', sortable: true, itemType: 'text' },
        { feeName: '费项', sortable: true, itemType: 'text' },
        { receivableTime: '应收日期', sortable: true, itemType: 'text', width: 120 },
        { paymentDate: '账期', sortable: true, itemType: 'text', width: 180 },
        { financialDate: '权责月', sortable: true, itemType: 'text' },
        { receivableAmount: '应收金额(元)', sortable: true, itemType: 'text', width: 150, type: 'money' },
        { subAmount: '减免金额(元)', sortable: true, itemType: 'text', width: 150, type: 'money' },
        { receivedAmount: '已核销金额(元)', sortable: true, itemType: 'text', width: 150, type: 'money' }
      ],
      dialogConfigData: [
        { itemType: 'text', prop: 'receivableRuleId', label: '应收规则' },
        { itemType: 'text', prop: 'paymentCycleId', label: '支付周期' },
        { itemType: 'text', prop: 'cycleType', label: '周期类型' },
        { itemType: 'text', prop: 'collectId', label: '账期模式' },
        { itemType: 'text', prop: 'n', label: 'N' }
      ],
      dialogFormData: {
        receivableRuleId: '',
        paymentCycleId: '',
        cycleType: '',
        collectId: '',
        n: ''
      }
    }
  },
  mounted() {
    this.active = this.currentFormData.tabsList[0].name
    this.contractStates = this.$route.query.contractStates
    this.standingBookExpenseDetail()
  },
  methods: {
    // 获取详细数据
    standingBookExpenseDetail() {
      const datas = {
        id: this.$route.query.id,
        feeName: this.active
      }
      standingBookApi.standingBookExpenseDetail(datas).then(res => {
        this.receivableAmountTotal = res.receivableAmountTotal
        if (res.expenseDetail) {
          this.tableList = res.expenseDetail
        }
        if (res.receivableRule) {
          this.dialogFormData = res.receivableRule
        }
      })
    },
    changeNumber(num) {
      let number = num
      number = parseFloat(number.toFixed(2))
      number = number.toLocaleString()
      const numberArray = number.toString().split('.')
      if (numberArray.length <= 1) {
        number = number + '.00'
      } else if (numberArray[1] < 10) {
        number = number + '0'
      }
      return number
    },
    // 点击tabs
    tabsChange(row) {
      this.active = this.currentFormData.tabsList[row].name
      this.standingBookExpenseDetail()
    },
    // 推送
    push() {
      if (this.tableSelectList.length === 0) {
        this.$message.warning('请先选择推送项')
        return
      }
      const selectList = []
      this.tableSelectList.forEach((item) => {
        selectList.push(item.receivableNo)
      })
      const datas = {
        receivableNoList: selectList,
        contNo: this.$route.query.id
      }
      standingBookApi.standingBookExpenseDetailPush(datas).then(res => {
        if (res) {
          if (res.success) {
            this.$message.success('推送成功')
            this.tableSelectList.forEach((item) => {
              item.isToPush = true
            })
          } else {
            this.$message.error('推送失败，请重试')
          }
        }
      })
    },
    tableSelect(row) {
      this.tableSelectList = row
    },
    handleMouseover() {
      this.$refs.dialog.clickStop()
    }
  }
}
</script>

<style scoped lang="scss">
.font-14{
  font-size: 14px;
}
.font-color-blue {
  color: #1C4C7F;
}
.font-18 {
  font-size: 18px;
}
.font-color-black {
  color: #000000;
}
.text-weight-bold {
  font-weight: bold;
}
.flex-al-center {
  display: flex;
  align-items: center;
}
</style>
