<template>
    <el-dialog
        :visible.sync="dialogTableVisible"
        width="1000px"
        class="pushOrder"
        >
        <query-table :columns="columns" ref="tb" :defaultSize="10" title="单据推送信息列表" api="/clientend/claim/queryClaimPush" class="mt-4">
            <template v-slot:extra="{ checkedRows }">
                <el-button type="primary" size="small" @click="exportExcel(checkedRows)">Excel导出</el-button>
            </template>
          </query-table>
     </el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { columns } from './config'

@Component
export default class PushOrder extends Vue {
  @Ref() tb!: any
  dialogTableVisible=false
  columns = columns
  @Watch('dialogTableVisible')
  onChangeValue (newVal: string, oldVal: string) {
    if (this.dialogTableVisible) {
      this.$nextTick(() => {
        this.onQuery()
      })
    }
  }

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  exportExcel (rows: any) { // todo
    console.log(rows)
  }
}
</script>
<style lang="scss">
.pushOrder .el-dialog__body{
    padding-top:0px;
    margin-top:0px;
    padding-bottom:0px;
  }
</style>
