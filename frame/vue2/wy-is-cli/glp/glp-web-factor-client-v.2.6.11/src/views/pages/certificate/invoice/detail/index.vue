<template>
     <div>
      <breadcrumb/>
      <glp-card title="发票详情" class="mt-4">
         <detail-form :def="defs" :dataSource="invoiceInfoDetailDTO" label-width="130px">
              <template v-slot:link>
                <a target="_blank" :class="[$style.link]" :href="invoiceInfoDetailDTO.invoiceFileUrl">{{invoiceInfoDetailDTO.fileName}}</a>
            </template>
         </detail-form>
      </glp-card>
       <glp-card title="关联的融资订单" class="mt-4">
          <span slot="extra" style="color:#666;">{{$route.query.money}}已关联笔数：{{count}}，已关联订单的应收账款金额：{{money}}</span>
          <query-table :columns="columns" ref="tb" title="" :wrap="false" :dataSource="financeOrders" class="mt-4" :pageable="false">
                <template v-slot:opt="{row}">
                  <el-button type="primary" size="mini" @click="onView(row)">详 情</el-button>
                </template>
            </query-table>
        </glp-card>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { defs, columns } from './config'

@Component
export default class Detail extends Vue {
  @Prop(String) id!: string
  defs = defs
  columns = columns
  count = 0
  money = 0
  invoiceInfoDetailDTO={}
  financeOrders=[]
  @Ref() tb!: any
  onView (row: any) {
    this.$router.push(`/finance/project/apply/${row.invoiceNo}`)
  }

  mounted () {
    this.tb.query()
    this.$http.get<any>(
      `/clientend/invoice/getInvoiceInfoDetails/${this.id}`
    ).then(data => {
      this.invoiceInfoDetailDTO = data.invoiceInfoDetailDTO
      this.financeOrders = data.financeOrders
    })
  }
}
</script>

<style lang="scss" module>
.link {
  color: #67c23a;
  cursor: pointer;
  text-decoration: none;
}
</style>
