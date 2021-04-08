<template>
  <div>
    <breadcrumb />
    <query-form :def="formDefs" @query="onQuery" title="查询列表"></query-form>
    <query-table
      :columns="columns"
      :checkedRows.sync="checkedRows"
      ref="tb"
      row-key="orderId"
      title="融资订单"
      api="/clientend/invoice/getOrderListPage"
      class="mt-4"
    >
      <template v-slot:extra="{ checkedRows }">
        <span
          style="margin-right:15px;"
        >已选发票剩余关联总额：{{$route.query.money}}，已选择笔数：{{count}}，已选择应收账款金额：{{money}}</span>
        <el-button
          type="primary"
          size="small"
          @click="relativeOrder(checkedRows)"
          :disabled="checkedRows.length<1"
          plain
        >关联订单提交</el-button>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" size="mini" @click="onView(row)">详 情</el-button>
      </template>
    </query-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { columns, formDefs } from './config'

@Component
export default class Relative extends Vue {
  @Ref() tb!: any
  formDefs = formDefs
  columns = columns
  count = 0
  money = 0
  checkedRows: any[] = []
  onQuery (params: any = {}) {
    if (Object.keys(params).length > 0) {
      params.beginTime = params.time[0]
      params.endTime = params.time[1]
      delete params.time
    }
    this.tb.query(params)
  }

  @Watch('checkedRows')
  onChangeValue (newVal: any, oldVal: any) {
    this.count = newVal.length
    this.money = newVal
      .map((item: any) => item.amount)
      .reduce((pre: number, next: number) => pre + next, 0)
  }

  mounted () {
    this.tb.query()
  }

  relativeOrder (params: any[]) {
    if (Number(this.$route.query.money) < this.money) {
      this.$alert(
        '您勾选的发票总金额小于已选择的应收账款总金额，请重新勾选。',
        ' ',
        {
          confirmButtonText: '确定'
        }
      )
      return
    }
    const invoiceNos: any = this.$route.query.invoiceNos
    const invoiceIds = invoiceNos.split(',').map((item: any) => Number(item))
    const orderIds = params.map((item: any) => item.id)
    this.$http.post<any>('/clientend/invoice/saveRelevanceOrder', {
      invoiceIds,
      orderIds
    })
      .then(data => {
        this.$message({
          type: 'success',
          message: '关联订单成功'
        })
        this.$router.push('/certificate/invoice')
      })
      .catch(() => {
        this.$message({
          type: 'error',
          message: '关联订单失败'
        })
      })
  }

  onView (params: any = {}) {
    this.$router.push(`/finance/order/detail/${params.orderId}`)
  }
}
</script>
<style lang="scss">
.relativeOrder .el-dialog__body {
  padding-top: 0px;
  margin-top: -10px;
  padding-bottom: 0px;
}
</style>
