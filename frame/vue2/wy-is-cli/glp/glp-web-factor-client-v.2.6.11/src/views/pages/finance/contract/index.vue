<template>
  <div>
    <query-form :def="formDefs" title="合同台账查询" @query="onQuery"></query-form>
    <el-tabs v-model="tabValue">
      <el-tab-pane label="未签署" name="first">
        <query-table
          :columns="columns1"
          ref="tb1"
          title
          :checkedRows.sync="checkedRows1"
          :wrap="false"
          row-key="invoiceNo"
          api="/clientend/contract/listBySignerId"
          class="mt-4"
        >
       <template v-slot:contractTypeId="{ row }">
        <a
          :class="[$style.link]"
          @click="onLink(row)"
          target="_blank"
        >{{d('contract_type')[row.contractTypeId]}}</a>
      </template>
         <template v-slot:signerName="{row}">
            <span @click="onSignerDetail(row)" :class="[$style.link]">详情</span>
         </template>
           <template v-slot:opt="{row}">
             <span v-if="row.status===1&&row.signMethod===1">
                <a :href="row.signerUrl" :class="[$style.link]" target="_blank" style="margin-right:20px;" v-if="row.signerUrl">签署</a>
                <el-button type="text" @click="rejectSign(row,'tb1')">拒绝签署</el-button>
             </span>
             <span v-else>
               -
             </span>
          </template>
        </query-table>
      </el-tab-pane>
      <el-tab-pane label="已签署" name="second">
        <query-table
          :columns="columns2"
          ref="tb2"
          title
          :checkedRows.sync="checkedRows2"
          row-key="invoiceNo"
          :wrap="false"
          api="/clientend/contract/listBySignerId"
          class="mt-4"
        >
        <template v-slot:contractTypeId="{ row }">
        <a
          :class="[$style.link]"
          @click="onLink(row)"
          target="_blank"
        >{{d('contract_type')[row.contractTypeId]}}</a>

      </template>
          <template v-slot:signerName="{row}">
            <span @click="onSignerDetail(row)" :class="[$style.link]">详情</span>
         </template>
        </query-table>
      </el-tab-pane>
      <el-tab-pane label="拒绝签署" name="third">
        <query-table
          :columns="columns1"
          ref="tb3"
          title
          :checkedRows.sync="checkedRows3"
          row-key="invoiceNo"
          :wrap="false"
          api="/clientend/contract/listBySignerId"
          class="mt-4"
        >
        <template v-slot:contractTypeId="{ row }">
        <a
          :class="[$style.link]"
          @click="onLink(row)"
          target="_blank"
        >{{d('contract_type')[row.contractTypeId]}}</a>
      </template>
         <template v-slot:signerName="{row}">
            <span @click="onSignerDetail(row)" :class="[$style.link]">详情</span>
         </template>
          <template v-slot:opt="{row}">
            <span v-if="row.status===1&&row.signMethod===1">
              <a :href="row.signerUrl" :class="[$style.link]" target="_blank" style="margin-right:20px;" v-if="row.signerUrl">签署</a>
              <el-button type="text" @click="rejectSign(row,'tb3')">拒绝签署</el-button>
            </span>
            <span v-else>
               -
            </span>
          </template>
        </query-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="拒绝签署" :visible.sync="rejectSignVisible" width="500px">
         <el-form ref="rejectForm" label-width="80px">
           <el-form-item label="原因">
             <el-input type="textarea" v-model="refuseReason" placeholder="请输入拒绝原因"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button type="primary" size="small" @click="onRejectConfirm">确定</el-button>
          <el-button size="small" @click="rejectSignVisible=false">取消</el-button>
        </span>
    </el-dialog>
    <sign-detail :signId="currentId" ref="signDialog"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { formDefs, columns1, columns2 } from './config'
import SignDetail from './components/sign-detail/index.vue'
import { format } from '@/utils/date'
import { download, viewOfficeOnline } from '@/utils/file'
import { d } from '@/config/form'
@Component({
  components: {
    SignDetail
  }
})
export default class Contract extends Vue {
  @Ref() signDialog!: any
  @Ref() tb1!: any
  @Ref() tb2!: any
  @Ref() tb3!: any
  @Ref() rejectForm!: any
  @Watch('tabValue')
  tabValueChange () {
    this.onQuery()
  }

 @Watch('rejectSignVisible')
  rejectSignChange (val: any) {
    if (!val) {
      this.refuseReason = ''
    }
  }

  formDefs = formDefs
  columns1 = columns1
  columns2 = columns2
  d = d
  tabValue='first'
  checkedRows1: any[] = []
  checkedRows2: any[] = []
  checkedRows3: any[] = []
  rejectSignVisible = false
  currentId = ''
  currentSignerId=''
  refuseReason=''
  currentTb: any=''
  onSignerDetail (params: any) {
    this.currentId = params.contractId
    this.signDialog.signVisible = true
  }

  onQuery (params: any = {}) {
    if (this.tabValue === 'first') {
      this.tb1.query({ status: 1, ...params })
    } else if (this.tabValue === 'second') {
      this.tb2.query({ status: 2, ...params })
    } else {
      this.tb3.query({ status: 3, ...params })
    }
  }

  rejectSign (params: any, tb: string) {
    if (tb === 'tb1') {
      this.currentTb = this.tb1
    } else {
      this.currentTb = this.tb3
    }
    this.currentSignerId = params.signerId
    this.rejectSignVisible = true
  }

  onRejectConfirm () {
    this.rejectSignVisible = false
    this.$http.post<any>(
      '/clientend/contract/refuseSign',
      {
        signerId: this.currentSignerId,
        refuseReason: this.refuseReason
      }
    ).then(data => {
      this.$message({
        type: 'success',
        message: '提交成功'
      })
      this.currentTb.refresh()
    })
  }

  onLink (params: any) {
    const url = params.userSignerContractUrl || params.originalContractUrl
    viewOfficeOnline(url)
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>
.link {
  color: #67c23a;
  cursor: pointer;
  text-decoration: none;
}
.rejectItem {
  display: flex;
  .label {
    width: 90px;
    box-sizing: border-box;
    padding-left: 14px;
  }
  .item {
    flex: 1;
  }
}
</style>
