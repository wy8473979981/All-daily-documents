<template>
  <div>
    <breadcrumb />
    <query-form :def="formDefs" @query="onQuery"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      :postQuery="postQuery"
      title="业务单据列表"
      api="/clientend/claim/queryBaseClaimList"
      class="mt-4"
    >
      <template v-slot:extra="{ checkedRows }">
        <span style="margin-right:15px; color:#666;">
          最近一次数据推送：时间 2020-05-30 21:00:01，总条数100，满足格式条数 95，有效条数95
          <span :class="[$style.link]">详情查看...</span>
        </span>
        <el-button type="primary" size="small" @click="exportExcel(checkedRows)" plain>Excel导出</el-button>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" size="mini" @click="onLink(row)">详 情</el-button>
      </template>
    </query-table>
    <push-order ref="PushOrder"></push-order>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import PushOrder from './components/push-order/index.vue'
import { format } from '@/utils/date'
import { download } from '@/utils/file'
@Component({
  components: { PushOrder }
})
export default class Business extends Vue {
  params: any = {}
  formDefs = formDefs
  columns = columns
  queryData = []
  @Ref() tb!: any
  @Ref() PushOrder!: PushOrder
  onQuery(params: any = {}) {
    this.tb.query(params)
    this.params = params
  }

  postQuery (params: any) {}

  onLink (row: any) {
    this.$router.push(`/certificate/business/detail/${row.claimNumber}`)
  }

  onPushDetail () {
    // 详情查看
    this.PushOrder.dialogTableVisible = true
  }

  exportExcel (params: any) {
    // todo
    const stamp = format(new Date(), 'yyyyMMdd')
    download('/clientend/claim/exportBaseClaimList', `业务单据列表${stamp}.xlsx`, this.queryData, 'post')
  }

  mounted() {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>
.link {
  color: #67c23a;
  cursor: pointer;
  text-decoration: none;
  margin-left: 15px;
}
</style>
