<template>
  <div>
    <breadcrumb />
    <query-form :def="formDefs" @query="onQuery"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      title="融资订单列表"
      api="/clientend/order/plb/queryOrderList"
      class="mt-4"
    >
      <template slot="extra">
        <el-button type="primary" size="mini" @click="onAdd">新建订单</el-button>
        <el-button type="primary" size="mini" @click="onView">合同明细</el-button>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" size="mini" @click="onLink(row)">查看</el-button>
        <el-button type="text" size="mini" @click="onEdit(row)">编辑</el-button>
        <el-button type="text" size="mini" @click="onSign(row)">签约</el-button>
        <el-button type="text" size="mini" @click="onAddFile(row)">补充文件</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { columns, formDefs } from './config'
import { insertAddition, stepNum, oneStep } from '@/api/plb-invoice'
import { namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component
export default class Product extends Vue {
  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  @Plb.Mutation('setOrderId')
  setOrderId(id: string) {
    return id
  }

  @Plb.Mutation('setCurrentStep') setCurrentStep(index: number) {
    return index
  }

  @Plb.State('orderId') orderId!: any

  @Plb.Mutation('setNoteList') setNoteList(nodeList: Array<any>) {
    return nodeList
  }

  @Plb.Mutation('setNoteListWidthAttachment') setNoteListWidthAttachment(
    list: any
  ) {
    return list
  }

  @Plb.Mutation('setPaperContract') setPaperContract(list: any) {
    return list
  }

  onQuery(params: any = {}) {
    this.tb.query(params)
  }

  onAdd() {
    insertAddition().then(res => {
      this.setOrderId(res)
      this.setNoteList([])
      this.$router.push('order/apply/edit')
      this.setCurrentStep(1)
    })
  }

  getDetail(num: number) {
    switch (num) {
      case 1:
        this.getOneStep()
        break
      case 2:
        this.getTwoStep()
    }
  }

  getOneStep() {
    oneStep({}).then(res => {
      this.setNoteList(res.paperEffectiveTmp)
    })
  }

  getTwoStep() {}

  onEdit(row: any) {
    stepNum(row.id).then(res => {
      this.$router.push('order/apply/edit')
      this.setOrderId(row.id)
      this.setCurrentStep(res.stepNum)
      switch (res.stepNum) {
        case 1:
          this.setNoteList(res.step1Resp)
          break
        case 2:
          this.setNoteListWidthAttachment(res.step2Resp.papers)
          break
        case 3:
          this.setPaperContract(res.step3Resp.paperContract)
          break
        case 4:
          break
        case 5:
          break
        case 6: {
          const paperContract: any = res.step3Resp.paperContract
          paperContract.supFiles = res.step3Resp.supFiles
          paperContract.conFiles = res.step3Resp.conFiles
          this.setNoteListWidthAttachment(res.step2Resp.papers)
          this.setNoteList(res.step2Resp)
          this.setPaperContract(paperContract)
          break
        }
      }
    })
  }

  onView() {}

  onAddFile(row: any) {
    console.log(row)
    this.$router.push(`/order/supply?id=${row.id}`)
  }

  onSign(row: any) {
    this.$router.push(`/order/sign-contract?id=${row.id}`)
  }

  mounted() {
    this.onQuery()
  }
}
</script>
