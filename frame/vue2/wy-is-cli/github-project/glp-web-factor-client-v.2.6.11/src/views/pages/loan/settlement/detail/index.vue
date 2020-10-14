<template>
    <div>
         <breadcrumb/>
         <div id="print_section">
              <div :class="[$style.wrapper]">
                  <span :class="[$style.title]">结算单：{{settlementNo}}</span>
                  <el-button type="primary" size="small" @click="onPrint()" plain>打印</el-button>
              </div>
              <glp-card title="基本信息" class="mt-4">
                  <detail-form :def="borrowDefs" label-width="120px" :span="12" :dataSource="project"></detail-form>
              </glp-card>
              <query-table :columns="columns1"  title="结算前信息" :dataSource="settlementBefore" :pageable="false" class="mt-4" show-summary></query-table>
              <query-table :columns="columns2" title="本次结算信息" :dataSource="settlementCurt" :pageable="false" class="mt-4" show-summary></query-table>
              <query-table :columns="columns3" title="结算后信息" :dataSource="settlementAfter" :pageable="false" class="mt-4" show-summary></query-table>
          </div>
      </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { borrowDefs, columns1, columns2, columns3 } from './config'
@Component({})
export default class FinanceDetail extends Vue {
  @Prop(String) id!: string
  borrowDefs = borrowDefs
  columns1 = columns1
  columns2 = columns2
  columns3 = columns3
  settlementNo = ''
  project={}
  settlementBefore: any=[]
  settlementCurt=[]
  settlementAfter=[]
  onQuery (params: any = {}) {
    this.$http.post<any>(
      '/clientend/settlement/detail',
      { settlementNo: params.id }
    ).then(data => {
      this.settlementNo = data.settlementNo
      this.project = { projectName: data.projectName, productName: data.productName, sellerCompName: data.sellerCompName, settlementTime: data.settlementTime }
      this.settlementBefore = data.settlementBefore
      this.settlementCurt = data.settlementCurt
      this.settlementAfter = data.settlementAfter
    })
  }

  onPrint () {
    const print: any = document.getElementById('print_section')
    document.body.innerHTML = print.innerHTML
    window.print()
    window.location.reload()
  }

  mounted () {
    this.onQuery(this.$route.params)
  }
}
</script>

<style lang="scss" module>
.wrapper{
  display: flex;
  padding-top:10px;
  justify-content:space-between;
  border-bottom:2px solid #3AC082;
  padding-bottom:10px;
  margin-bottom:30px;
  .title{
    color:#333;
    font-size:16px;
    font-weight: bold;
    line-height: 32px;
  }
}

</style>
