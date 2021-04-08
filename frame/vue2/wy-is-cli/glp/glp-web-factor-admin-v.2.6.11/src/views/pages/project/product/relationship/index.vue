<template>
<div>
  <el-row :gutter="32">
    <el-col :span="12"><span :class="[$style.pageTopTitle]">项目名称：</span>{{projectName}}</el-col>
    <el-col :span="12"><span :class="[$style.pageTopTitle]">项目额度编号: </span>{{quotaCode}}</el-col>
  </el-row>
  <glp-tabs v-model="type">
    <glp-tab-pane name="1" label="柯利-交易对手关联查询">
      <query-form :def="relationFormDefs" @query="onRealtionQuery" :form="relationForm"></query-form>
      <glp-card title="交易对手关系列表">
        <glp-data-table :columns="relationColumns" :data-source="relationData" ref="relationRef" :pageable="false" class="mt-4">
          <template v-slot:opt="{row}">
            <el-button type="text" @click="onAddFirst(row)" v-if="accessFirstAdd">新建</el-button>
          </template>
        </glp-data-table>
      </glp-card>
    </glp-tab-pane>
    <glp-tab-pane name="2" label="买卖方关系">
      <query-form :def="formDefs" @query="onQuery" :form="buyerSellerForm"></query-form>
      <query-table :columns="columns" ref="tb" api="/backend/buyerSeller/list" class="mt-4" title="买卖方关系列表">
        <template slot="extra">
          <el-button type="primary" size="small" @click="onAddSecond" v-if="accessAdd" plain>新 增</el-button>
        </template>
        <template v-slot:opt="{row}">
          <el-button type="text" @click="onEdit(row)" v-if="(row.status !== 2) && accessEdit">编辑</el-button>
          <el-button type="text" @click="onOpen(row)" v-if="(row.status === 1) && accessOpenAndClose">关闭</el-button>
          <el-button type="text" @click="onOpen(row)" v-if="(row.status === 2) && accessOpenAndClose">开通</el-button>
        </template>
      </query-table>
    </glp-tab-pane>
  </glp-tabs>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { formDefs, columns, relationColumns, relationFormDefs } from './config'
import { getRelationList, openRelation } from '@/api/systemSet'

@Component
export default class Query extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() relationRef!: any

  @Prop() projectName!: any

  @Prop() quotaCode!: any

  @Prop() projectId!: any

  // @Prop({ type: String, default: '1' }) tabId!: string

  relationData: Array<any> = []

  formDefs = formDefs

  columns = columns

  relationColumns = relationColumns

  relationFormDefs = relationFormDefs

  relationForm: Record<string|number, any> = {
    creditCode: this.quotaCode
  }

  buyerSellerForm: Record<string|number, any> = {
    projectId: this.projectId
  }

  type = '1'

  firstAddBtn = false

  secondAddBtn = false

  accessAdd = false

  accessFirstAdd = false

  accessEdit = false

  accessOpenAndClose = false

  tabId: any = '1'

  @Watch('type') onChangeValue () {
    if (this.type === '2') this.onQuery()
    if (this.type === '1') this.onRealtionQuery()
  }

  @Watch('tabId') onChangeTabId () {
    if (this.tabId === '2') {
      this.type = '2'
      this.onChangeValue()
    }
  }

  @Watch('quotaCode') onWatchQuotaCode () {
    getRelationList({ creditCode: this.quotaCode }).then((data) => {
      this.relationData = data
    })
  }

  onRealtionQuery (params: any = {}) {
    if (this.quotaCode !== 'undefined') {
      Object.assign(params, { creditCode: this.quotaCode })
      getRelationList(params).then((data) => {
        this.relationData = data
      })
    }
  }

  onQuery (params: any = {}) {
    if (this.projectId !== 'undefined') {
      Object.assign(params, { projectId: this.projectId })
      this.tb.query(params)
    }
  }

  onAddFirst (row: any) {
    this.$router.push(`/project/product/relationship/first-add?type=${this.type}&quotaCode=${this.quotaCode}&projectId=${this.projectId}&relationCreditCode=${row.relationCreditCode}&creditCode=${row.creditCode}&relationCustomerCode=${row.relationCustomerCode}&customerCode=${row.customerCode}&customerName=${row.customerName}&relationCustomerName=${row.relationCustomerName}`)
  }

  onAddSecond (row: any) {
    this.$router.push(`/project/product/relationship/add?type=${this.type}&quotaCode=${this.quotaCode}&projectId=${this.projectId}`)
  }

  onEdit (row: any) {
    this.$router.push(`/project/product/relationship/edit/${row.id}?type=${this.type}`)
  }

  onOpen (row: any) {
    const status = row.status === 1 ? '关闭' : '开通'
    const params = {
      id: row.id,
      status: row.status === 1 ? 2 : 1
    }
    openRelation(params).then((data) => {
      this.$message({
        type: 'success',
        message: `${status}成功`,
        onClose: () => {
          this.$router.go(-1)
        },
        duration: 1500
      })
    })
  }

  mounted () {
    this.onRealtionQuery()

    this.tabId = this.$route.query.tabId

    this.accessEdit = this.$auth.accessSync('/project/product/relationship/edit')

    this.accessAdd = this.$auth.accessSync('/project/product/relationship/add')

    this.accessFirstAdd = this.$auth.accessSync('/project/product/relationship/first-add')

    this.accessOpenAndClose = this.$auth.accessSync('/project/product/relationship/open-close')
  }
}
</script>
<style lang="scss" module>
.pageTopTitle {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin: 20px 10px;
  display: inline-block;
}
</style>
