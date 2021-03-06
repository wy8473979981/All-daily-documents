<template>
  <div>
    <query-form :def="formDefs" title="合同台账查询" @query="onQuery"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      title="合同台账列表"
      :checkedRows.sync="checkedRows"
      :showCheckedInfo="operationAuth.downloadallcontract?true:false"
      row-key="invoiceNo"
      api="backend/contractWorkbench/list"
      class="mt-4"
    >
      <template v-slot:extra="{ checkedRows }">
        <el-button
          type="primary"
          size="mini"
          @click="addNonContract(checkedRows)"
          :disabled="checkedRows.length>0&&diff?false:true"
          v-if="operationAuth.noncontract"
          plain
        >新增非标合同</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="batchDownLoad(checkedRows)"
          v-if="operationAuth.downloadallcontract"
          :disabled="checkedRows.length>0?false:true"
          plain
        >批量下载合同</el-button>
      </template>
      <template v-slot:contractTypeId="{ row }">
        <span
          @click="viewOfficeOnline(row.signedContractUrl)"
          :class="[$style.link]"
        >{{d('contract_type')[row.contractTypeId]}}</span>

      </template>
      <template v-slot:signerName="{row}">
        <span @click="onSignerDetail(row)" :class="[$style.link]">详情</span>
      </template>
      <template v-slot:contractRelatedBusinessRes="{ row }">
            <DropBox :row="row"/>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" @click="onView(row)" v-if="operationAuth.detail" v-preventReClick>详 情</el-button>
        <el-button type="text" @click="onAbolish(row)" v-if="row.status!=60&&operationAuth.onabolish" v-preventReClick>作 废</el-button>
        <el-button type="text" @click="onUpload(row)" v-if="(row.signMethod==2&&row.status<30)&&operationAuth.onupload"  v-preventReClick>终稿上传</el-button>
        <el-button type="text" @click="onMake(row,$event)" v-if="row.status==81&&operationAuth.onmake">重新生成</el-button>
        <el-button type="text" @click="onReject(row)" v-if="row.status==81&&operationAuth.reject"  v-preventReClick>拒绝原因</el-button>
        <el-button type="text" @click="onSend(row,$event)" v-if="(row.signMethod==1&&(row.status==70||row.status==80))&&operationAuth.onsend">重新发送网签</el-button>
      </template>
    </query-table>
    <glp-upload :request="request" :value="value" :resp="finalUpload" type="card" max-size='10M' accept='image/*,.pdf' style="display:none;"></glp-upload>
    <el-dialog title="作废合同" :visible.sync="abolishVisible" width="500px">
      <div style="font-size:16px;padding-left:5px;">作废本合同？</div>
      <span slot="footer">
        <el-button type="primary" size="small" @click="onAbolishConfirm(0)"  v-preventReClick>仅作废本合同</el-button>
        <el-button type="primary" size="small" @click="onAbolishConfirm(1)"  v-preventReClick>作废并生成新合同</el-button>
        <el-button size="small" @click="abolishVisible=false"  v-preventReClick>取消</el-button>
      </span>
    </el-dialog>
    <el-dialog title :visible.sync="rejectVisible" width="500px" class="rejectReason">
      <div>
        <div class="mt-4" :class="[$style.rejectItem]">
          <div :class="[$style.label]">拒绝原因:</div>
          <div :class="[$style.item]">{{rejectData.rejectReason}}</div>
        </div>
        <div class="mt-4" :class="[$style.rejectItem]">
          <div :class="[$style.label]">操作时间：</div>
          <div :class="[$style.item]">{{rejectData.rejectTime|date('T')}}</div>
        </div>
        <div class="mt-4" :class="[$style.rejectItem]">
          <div :class="[$style.label]">操作人：</div>
          <div :class="[$style.item]">{{rejectData.userName}}</div>
        </div>
        <div class="mt-4" :class="[$style.rejectItem]">
          <div :class="[$style.label]">联系方式：</div>
          <div :class="[$style.item]">{{rejectData.userMobile}}</div>
        </div>
      </div>
    </el-dialog>
    <sign-detail :signId="currentId" :signStatus="signStatus" :againsendsign="operationAuth.againsendsign" ref="signDialog" :isLedger="true" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { formDefs, columns, columns1, arrDiff } from './config'
import SignDetail from '../components/sign-detail/index.vue'
import ContractPreview from '../components/contract-preview/index.vue'
import { request, action, d } from '@/config/form'
import { format } from '@/utils/date'
import { download, viewOfficeOnline } from '@/utils/file'
import { getAuth } from '@/utils/perms'
import DropBox from '@/views/pages/contract/components/drop-box/index.vue'
import { tGet } from '@/utils/throttle'
@Component({
  components: {
    SignDetail,
    ContractPreview,
    DropBox
  }
})
export default class Ledger extends Vue {
  @Ref() rejectForm!: any
  @Ref() signDialog!: any
  @Ref() contractPreview!: any
  @Ref() tb!: any
  @Ref() shangchuan!: any
  @Watch('checkedRows')
  checkedRowsChange(val: any) {
    this.diff = arrDiff(val)
  }

  formDefs = formDefs
  request = request
  operationAuth: any=this.getAuthObj()
  columns= this.operationAuth.downloadallcontract ? columns1 : columns
  checkedRows: any[] = []
  abolishVisible = false
  signVisible = false
  currentId = ''
  rejectVisible = false
  rejectData: any = {}
  contractVisible = false
  signStatus = 0
  contractPic = ''
  diff = false
  value=[]
  d = d
  viewOfficeOnline=viewOfficeOnline
  finalDraft(params: any) {
    this.$http.get<any>(
        `/backend/contractWorkbench/finalDraft?id=${this.currentId}&signedContractUrl=${params.url}`
    )
      .then(res => {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        this.tb.refresh()
      }).catch(() => {})
  }

  finalUpload(params: any) {
    this.finalDraft(params)
    this.value = []
    return params
  }

  addNonContract(params: any) {
    const ids = params.map((item: any) => item.id).join(',')
    const projectId = params[0].projectId
    this.$router.push(`/contract/ledger/noncontract/${ids}?projectId=${projectId}`)
  }

  onSignerDetail(params: any) {
    this.currentId = params.id
    this.signStatus = params.signMethod
    this.signDialog.signVisible = true
  }

  rejectRules = {
    desc: [{ required: true, message: '请填写拒绝原因' }]
  }

  batchDownLoad(rows: any) {
    this.$confirm('下载所有已选中的合同？', '批量下载合同', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const ids = rows.map((item: any) => item.id).join(',')
      download(`/backend/contractWorkbench/batchDownload?ids=${ids}`)
      this.checkedRows = []
    })
      .catch(() => {})
  }

  onView(params: any) {
    this.currentId = params.id
    this.$router.push(`/contract/ledger/detail/${this.currentId}`)
  }

  onAbolish(row: any) {
    this.currentId = row.id
    this.abolishVisible = true
  }

  onAbolishConfirm(status: number) {
    const text = status ? '作废并生成新合同' : '仅作废本合同'
    this.$confirm(text, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.$http
          .get<any>(
            `/backend/contractWorkbench/abandonment?id=${this.currentId}&type=${status}`
          )
          .then(res => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.tb.refresh()
          })
      }).finally(() => {
        this.abolishVisible = false
      })
  }

  onMake(row: any, el: any) {
    this.currentId = row.id
    tGet(`/backend/contractWorkbench/againGenerateContract?id=${this.currentId}`, el.target).then(res => {
      this.$message({
        type: 'success',
        message: '已重新生成合同'
      })
      this.tb.refresh()
    }).catch(() => {})
  }

  onReject(row: any) {
    this.currentId = row.id
    this.rejectVisible = true
    this.$http
      .get<any>(`/backend/contractWorkbench/refuseReason?id=${this.currentId}`)
      .then(res => {
        this.rejectData = res
      })
  }

  lookUp(params: any) {
    viewOfficeOnline(params)
  }

  onSend(row: any, el: any) {
    this.currentId = row.id
    tGet(`/backend/contractWorkbench/againGetOnlineSignAddress?id=${this.currentId}`, el.target).then(res => {
      this.$message({
        type: 'success',
        message: '重新发送网签成功'
      })
      this.tb.refresh()
    }).catch(() => {})
  }

  onUpload(row: any) {
    this.currentId = row.id
    const uploadInput: any = document.querySelector('.el-upload__input')
    uploadInput.click()
  }

  onQuery(params: any = {}) {
    const productTypes = params.productTypes
    params.signTimeEnd = params.signTimeEnd && params.signTimeEnd.replace('00:00:00', '23:59:59')
    if (productTypes) {
      params.productTypes = productTypes
    }
    this.checkedRows = []
    this.tb.query(params)
  }

  getAuthObj() {
    const list: any = this.$auth?.authorities
    const tempObj: any = {}
    list.forEach((item: any) => {
      if (item.parentId === '/contract/ledger') {
        tempObj[item.code] = true
      }
    })
    return tempObj
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
<style lang="scss">
.rejectReason{
  .el-dialog__body{
    padding-top:0px;
  }
}
</style>
