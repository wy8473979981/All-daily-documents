<template>
  <el-dialog title="签署方详情" :visible.sync="signVisible" :width="`${signWidth}px`" class="signDetail">
    <query-table
      :columns="signColumns"
      ref="signTb"
      title
      :api="api"
      :pageable="false"
      :paged="false"
      class="mt-4"
      :wrap="false"
      v-if="signVisible"
    >
      <template v-slot:opt="{row}" v-if="!isLedger">
           <span v-if="row.isRealname||!remindRealName||row.signerName.includes('普洛斯')">-</span>
           <el-button type="text" @click="onRemind(row)" v-else>提醒实名</el-button>
      </template>
      <template v-slot:opt="{row}" v-else>
           <el-button type="text" @click="onSendContract(row)" v-if="row.isShowAgainSendSign&&againsendsign">重新发送签约链接</el-button>
           <span v-else>-</span>
       </template>
    </query-table>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch, Prop } from 'vue-property-decorator'
import { signColumns1, signColumns2, ledgerColumns1, ledgerColumns2 } from './config'
const config = {
  contractmenu: {
    api: '/backend/contract/signerDetails?contractId=',
    net: { width: 1200, column: signColumns1 },
    other: { width: 800, column: signColumns2 }

  },
  ledger: {
    api: '/backend/contractWorkbench/signerDetails?contractId=',
    net: { width: 1200, column: ledgerColumns1 },
    other: { width: 1000, column: ledgerColumns2 }
  }
}

@Component({})
export default class SignDetail extends Vue {
  @Prop() signId!: any
  @Prop() signStatus!: number
  @Prop() remindRealName!: boolean
  @Prop() againsendsign!: boolean
  @Prop({ default: false }) isLedger!: boolean
  @Ref() signTb!: any
  @Watch('signVisible')
  signChange(newVal: any) {
    if (newVal) {
      this.onQuery()
    }
  }

  signVisible = false
  signColumns: any = []
  signWidth = 0
  config: any={}
  api=''
  onQuery() {
    if (this.isLedger) {
      this.config = config.ledger
    } else {
      this.config = config.contractmenu
    }
    this.signColumns =
      this.signStatus === 1 ? this.config.net.column : this.config.other.column
    this.signWidth =
      this.signStatus === 1 ? this.config.net.width : this.config.other.width
    this.api = `${this.config.api}${this.signId}`
    this.$nextTick(() => {
      this.signTb.query()
    })
  }

  onRemind(params: any) {
    this.$http
      .post<any>('/backend/contract/remindRealName', { id: params.id })
      .then(data => {
        this.$message({
          type: 'success',
          message: '已发送实名提醒'
        })
      })
  }

  onSendContract(params: any) {
    this.$http.get<any>(`/backend/contractWorkbench/againSendSignLink?contractSignerId=${params.id}`).then(data => {
      this.$message({
        type: 'success',
        message: '已重新发送签约链接'
      })
    })
  }
}
</script>

<style lang="scss">
.signDetail {
  .el-dialog__body {
    padding-top: 0px;
  }
}
</style>
