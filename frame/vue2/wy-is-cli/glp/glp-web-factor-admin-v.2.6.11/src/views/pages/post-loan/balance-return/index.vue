<template>
  <div>
    <query-form :def="formDefs" @query="onQuery" :mappingOptions="{dateType: 'F'}"></query-form>
    <query-table :columns="columns" ref="tb" api="/backend/refund/list" class="mt-4">
      <template slot="extra">
        <el-button type="primary" size="small" @click="onExport">导出</el-button>
      </template>
      <template v-slot:refund="{row}">
        <el-button type="text" @click="onView(row)">{{row.refund}}</el-button>
      </template>
      <template v-slot:record="{row}">
        <el-button type="text" @click="onViewRecord(row)">{{row.record | empty}}</el-button>
      </template>
    </query-table>
    <el-dialog center title="拨付记录" :visible.sync="visible">
      <div slot="footer"></div>
      <return-record :data-source="dataSource"></return-record>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import ReturnRecord from './components/return-record/index.vue'
import { exportRefund, refundRecord } from '@/api/clear'
import { resp } from '@/utils/file'
import { format } from '@/utils/date'
@Component({
  components: {
    ReturnRecord
  }
})
export default class Index extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() modal!: any

  formDefs = formDefs

  columns = columns

  params = {}

  dataSource = {}

  visible = false

  onQuery(params: any = {}) {
    this.tb.query(params)
    this.params = params
  }

  mounted() {
    this.onQuery()
  }

  onView(row: any) {
    this.$router.push({
      path: '/post-loan/balance-return/edit/detail',
      query: {
        refundId: row.refundId
      }
    })
  }

  onExport() {
    exportRefund(this.params).then((res) => {
      resp(res.data, `YETH${format(new Date(), 'yyyyMMddHHmmss')}.xlsx`)
    })
  }

  onViewRecord(row: any) {
    if (!row.recordId) {
      return
    }
    refundRecord({ recordId: row.recordId }).then((res) => {
      this.dataSource = res
      this.visible = true
    })
  }

  beforeConfirmFn() {}
}
</script>

<style lang="scss" module>
</style>
