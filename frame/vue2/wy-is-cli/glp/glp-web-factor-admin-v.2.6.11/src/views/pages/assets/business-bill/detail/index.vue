<template>
  <div>
    <breadcrumb />
    <glp-card title="单据融资信息" class="mt-4">
      <detail-form :def="defsFinance" :data-source="data.baseInfo" label-width="120px"></detail-form>
    </glp-card>
    <glp-card title="单据基本信息" class="mt-4">
      <detail-form :def="defsBase" :data-source="data.baseInfo" label-width="120px"></detail-form>
    </glp-card>
    <glp-card title="单据扩展信息" class="mt-4">
      <detail-form :def="defsExtend" :data-source="transport" label-width="120px"></detail-form>
      <query-table
        :columns="extendColumns"
        :data-source="extendDataSource"
        :pageable="false"
        class="mt-4"
        title="线路信息"
      >
        <template v-slot:opt="row">
          <el-button type="text" @click="()=>onView(row)">详情</el-button>
        </template>
      </query-table>
    </glp-card>
    <query-table
      title="单据关联信息"
      :columns="columns"
      :data-source="dataSource"
      :pageable="false"
      class="mt-4"
    >
      <template v-slot:opt="row">
        <el-button type="text" @click="()=>onView(row)">详情</el-button>
      </template>
    </query-table>
    <div class="text-center mt-7">
      <el-button size="small" plain class="px-5" @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  defsFinance,
  defsBase,
  defsExtend1010,
  columns1040,
  columns1010,
  defsExtend1040,
  extendColumns
} from './config'
import { queryClaimDetail } from '@/api/debt'
@Component
export default class Detail extends Vue {
  @Prop(String) id!: string
  defsFinance = defsFinance
  defsBase = defsBase
  columns = columns1040
  extendColumns = extendColumns
  defsExtend = defsExtend1010
  data = {}
  dataSource = []
  extendDataSource = []
  transport: any = {}
  $style!: any

  newId = this.id

  getQueryClaimDetail() {
    queryClaimDetail(this.newId).then((res) => {
      this.data = res
      const extendDataSource: any = []

      if (res.transport && res.transport.originalAddress) {
        res.transport.originalAddress.type = '始发地'
        extendDataSource.push(res.transport.originalAddress)
      }

      if (res.transport_1010) {
        this.columns = columns1040
        this.defsExtend = defsExtend1010
        this.transport = Object.assign({}, res.transport_1010, res.transport)
      } else {
        this.columns = columns1010
        this.defsExtend = defsExtend1040
        res.transport_1040.lstPassAddrs &&
          res.transport_1040.lstPassAddrs.map((item: any, index: any) => {
            item.address.type = `经停${index + 1}`
            extendDataSource.push(item.address)
          })
        this.transport = Object.assign({}, res.transport_1040, res.transport)
      }
      if (res.transport && res.transport.destinationAddress) {
        res.transport.destinationAddress.type = '目的地'
        extendDataSource.push(res.transport.destinationAddress)
      }
      this.extendDataSource = extendDataSource
      const _dataSource: any = []
      res.relationInfos.map((item: any, index: any) => {
        const data = item['transport_' + item.claimType]
        data.claimNumber = item.claimNumber
        _dataSource.push(data)
      })
      this.dataSource = _dataSource
    })
  }

  onView(row: any) {
    this.newId = row.row.claimNumber
    this.getQueryClaimDetail()
  }

  mounted() {
    this.getQueryClaimDetail()
  }
}
</script>

<style lang="scss" module>
.unit {
  margin-top: 20px;
  margin-bottom: 10px;
  height: 30px;
  line-height: 30px;
  text-align: right;
}
</style>
