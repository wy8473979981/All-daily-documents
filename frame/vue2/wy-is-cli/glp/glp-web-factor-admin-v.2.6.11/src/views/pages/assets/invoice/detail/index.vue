<template>
     <div>
      <glp-card title="发票详情" class="mt-4">
         <detail-form :def="defs" :dataSource="invoiceInfoDetailDTO" label-width="130px">
             <template v-slot:link>
                 <div style="min-height:33px">
                   <el-button type="text" size="small" @click="onLook(invoiceInfoDetailDTO)" :class="[$style.link]">{{invoiceInfoDetailDTO.fileName}}</el-button>
                 </div>
            </template>
         </detail-form>
      </glp-card>
       <glp-card title="关联的融资订单" class="mt-4">
          <span slot="extra" style="color:#666;">{{$route.query.money}}已关联笔数：{{financeOrders.length}}，已关联订单的应收账款金额：{{money|currency}}</span>
          <query-table :columns="columns" title="" :dataSource="financeOrders" class="mt-4" :pageable="false" :page="false" :wrap="false">
                <template v-slot:opt="{row}">
                  <el-button type="text" size="mini" @click="onView(row)">详 情</el-button>
                </template>
            </query-table>
        </glp-card>
        <preview :img="currentPic" ref="preview"/>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { defs, columns } from './config'
import preview from '@/views/pages/assets/invoice/components/preview/index.vue'
@Component({
  components: {
    preview
  }
})
export default class Detail extends Vue {
  @Prop(String) id!: string
  @Ref() preview!: any
  defs = defs
  columns = columns
  money = 0
  invoiceInfoDetailDTO={}
  financeOrders=[]
  currentPic=''

  onView (row: any) {
    this.$router.push(`/finance/order/detail/${row.orderNumber}`)
  }

  onLook (params: any) {
    this.preview.dialogTableVisible = true
    this.currentPic = params.invoiceFileUrl
  }

  mounted () {
    this.$http.get<any>(
      `/backend/invoice/getInvoiceInfoDetails/${this.id}`
    ).then(data => {
      this.invoiceInfoDetailDTO = data.invoiceInfoDetailDTO || []
      this.financeOrders = data.financeOrders || []
      this.money = data.financeOrders.map((row: any) => row.amount).reduce((pre: any, next: any) => {
        return pre + next
      }, 0)
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
