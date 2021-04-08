<template>
  <div>
    <glp-card class="mt-4 audit dropWrap">
      <template v-slot:title>
       <div :class="[$style.longTitle]">
          合同清单
          <span style='font-size:15px;color:#666'>
              （合同批次号：{{id}}，项目名称：{{projectName}}）（{{contractList.length}}条）
          </span>
        </div>
      </template>
      <template v-slot:extra>
        <div :class="[$style.btnGroup]">
          <el-button type="primary" size="mini" v-if="operationAuth.othercontract" @click="$router.push(`/contract/othercontract/${projectId}`)" plain>查看项目下其他合同</el-button>
          <div
            class="el-button el-button--primary el-button--mini is-plain"
            :class="riskVisible?'el-icon-arrow-up':'el-icon-arrow-down'"
            style="vertical-align: middle;"
            @mouseenter="riskVisible=true"
            @mouseleave="riskVisible=false"
            v-if="operationAuth.riskmenu"
          >
          风控用信清单
           <div :class="[$style.riskMenu,riskVisible?[$style.fold]:'']">
            <ul
              :class="[$style.inRiskMenu]"
              v-if="riskControlCreditDetailList&&riskControlCreditDetailList.length>0"
            >
              <li
                :class="[$style.item]"
                v-for="(item,index) in riskControlCreditDetailList"
                :key="index"
              >
                <div :class="[$style.text]">{{item.fileName}}</div>
                <div :class="[$style.lookDown]">
                  <span :class="[$style.link]" @click="viewOfficeOnline(item.url)">预览</span>
                  |
                  <span :class="[$style.downLoad]" @click="menuDownLoad(item.url,item.fileName)">下载</span>
                </div>
              </li>
            </ul>
            <div v-else :class="[$style.noData]">暂无</div>
          </div>
          </div>
          <el-button type="primary" size="mini" @click="batchDownLoad" v-if="operationAuth.downloadallcontract"  plain>下载所有合同</el-button>
        </div>
    </template>
    <query-table
      :columns="columns"
      :dataSource="contractList"
      class="mt-4"
      :pageable="false"
      ref="tb"
      :wrap="false"
    >
      <template v-slot:isCustomContract="{ row }">
        <span>{{row.isCustomContract?'非标合同':'标准合同'}}</span>
      </template>
      <template v-slot:contractTypeId="{ row }">
        <span
        @click="viewOfficeOnline(row.originalContractUrl)"
          :class="[$style.link]"
        >{{contractTypeChange(row.contractTypeId)}}</span>
      </template>
      <template v-slot:signerName="{ row }">
        <span @click="onSignerDetail(row)" :class="[$style.link]">详情</span>
      </template>
      <template v-slot:contractRelatedBusinessRes="{ row }">
          <DropBox :row="row" :projectId="projectId" :projectName="projectName"/>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" size="mini" @click="onView(row)"  v-if="operationAuth.contractdetail">合同详情</el-button>
        <el-button
          type="text"
          size="mini"
          @click="onDelete(row)"
          v-if="pendingRoFinish&&auditNode=='1'&&operationAuth.delete"
        >删 除</el-button>
        <el-button
          type="text"
          size="mini"
          @click="onSend(row)"
          v-if="pendingRoFinish&&auditNode!=='4'&&operationAuth.initiateassistance"
        >发起协助</el-button>
        <el-button
          type="text"
          size="mini"
          @click="addNonContract(row)"
          v-if="pendingRoFinish&&auditNode=='1'&&operationAuth.addNonContract"
        >新增非标合同</el-button>
      </template>
    </query-table>
   </glp-card>
    <initiate-assistance ref="InitiateAssistance" :id="currentId" :projectId="projectId" v-if="pendingRoFinish" />
    <sign-detail :signId="currentId" :signStatus="signStatus" :remindRealName="operationAuth.remindrealname" ref="signDialog" />
    <glp-card title="审批" class="mt-4" v-if="pendingRoFinish&&(operationAuth.pass||operationAuth.reject)">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="审批意见">
          <el-input type="textarea" v-model="comment" placeholder="请输入审批意见" maxlength='500'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onPass()" v-if="operationAuth.pass">通 过</el-button>
          <el-button
            type="danger"
            size="small"
            @click="onReject()"
            :disabled="comment===''?true:false"
            v-if="auditNode!='1'&&operationAuth.reject"
          >驳 回</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="驳回至" :visible.sync="rejectVisible" width="500px">
        <el-row v-if="rejectList.length>1">
          <el-col v-for="(item,index) in rejectList" :key="index" :span="8">
            <el-radio class="radio" v-model="checked" :label="item">{{ApprovalRole[item]}}</el-radio>
          </el-col>
        </el-row>
        <el-row v-if="rejectList.length==1">
          <el-col :span="8">{{ApprovalRole[rejectList]}}</el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onRejectCancel" size="small">取 消</el-button>
          <el-button type="primary" @click="onRejectConfirm" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </glp-card>
    <query-table
      :columns="columns2"
      :dataSource="contractAuditLogs"
      :title="`操作日志（${contractAuditLogs.length}条）`"
      class="mt-4"
      :pageable="false"
    >
      <template v-slot:auditType="{ row }">{{row.auditType===1?'通过':'驳回'}}</template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch, Prop } from 'vue-property-decorator'
import { columns, columns2, defs2, riskColumns } from './config'
import { viewOfficeOnline, download } from '@/utils/file'
import { d } from '@/config/form'
import InitiateAssistance from '@/views/pages/contract/components/initiate-assistance/index.vue'
import SignDetail from '@/views/pages/contract/components/sign-detail/index.vue'
import DropBox from '@/views/pages/contract/components/drop-box/index.vue'
import { format } from '@/utils/date'
import { getAuth } from '@/utils/perms'
import { ApprovalRole, passList, rejectList } from '@/views/pages/contract/common/approvalRole'
@Component({
  components: {
    SignDetail,
    InitiateAssistance,
    DropBox
  }
})
export default class ContractMenu extends Vue {
  @Prop(String) id!: string
  @Ref() InitiateAssistance!: any
  @Ref() signDialog!: any
  @Ref() tb!: any
  @Watch('rejectVisible')
  change(newVal: any) {
    if (newVal) {
      this.checked = ''
    }
  }

  pendingRoFinish: any = ''
  columns = columns
  columns2 = columns2
  riskColumns = riskColumns
  defs2 = defs2
  projectName = ''
  contractList = []
  contractAuditLogs = []
  riskControlCreditDetailList = []
  currentId = ''
  riskVisible = false
  signStatus = 0
  signVisible = false
  operationAuth={}
  comment = ''
  radio = 1
  projectId: any = ''
  next = ''
  auditNode: any = 1
  rejectList = []
  auditId = ''
  checked = ''
  ApprovalRole = ApprovalRole
  departList: any = []
  rejectVisible = false
  viewOfficeOnline=viewOfficeOnline
  contractTypeChange(contactType: any) {
    const contactString = contactType.toString()
    return d('contract_type')[contactString]
  }

  onSignerDetail(params: any) {
    this.currentId = params.id
    this.signStatus = params.signMethod
    this.signDialog.signVisible = true
  }

  addNonContract(params: any) {
    this.currentId = params.id
    this.$router.push(
      `/contract/noncontract/${this.currentId}?batchNumber=${this.id}&projectId=${this.projectId}`
    )
  }

  created() {
    this.pendingRoFinish = this.$route.query.status === 'pending'
  }

  getAuthObj() {
    const tempObj: any = {}
    getAuth(this).forEach((item: any) => {
      tempObj[item] = true
    })
    return tempObj
  }

  auditNodeFns(customContract: boolean) {
    const other = customContract ? '_no' : ''
    const next = `${this.auditNode}${other}`
    this.rejectList = rejectList[next] ? rejectList[next] : []
    this.next = ApprovalRole[passList[next]]
  }

  mounted() {
    this.operationAuth = this.getAuthObj()
    this.$http
      .post<any>('/backend/contract/auditDetail', { batchNumber: this.id })
      .then(res => {
        this.auditNode = res.auditNode.toString()
        this.auditId = res.id
        this.auditNodeFns(res.customContract)
        this.projectName = res.projectName
        this.contractList = res.contractList
        this.contractAuditLogs = res.contractAuditLogs
        this.projectId = res.projectId
        this.riskControlCreditDetailList = res.riskControlCreditDetailList
      })
  }

  batchDownLoad() {
    this.$confirm('下载所有合同？', '批量下载合同', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const ids = this.contractList.map((item: any) => item.id).join(',')
      download(`backend/contractWorkbench/batchDownload?ids=${ids}`)
    })
      .catch(() => {})
  }

  menuDownLoad(url: string, name: string) {
    if (url) {
      const suffix = url.split('.').pop()
      download(url, `${name}.${suffix}`)
    }
  }

  onView(params: any) {
    this.currentId = params.id
    let url = ''
    if (this.$route.query.status === 'pending') {
      url = `/contract/contractdetail/${this.currentId}?batchNumber=${this.id}`
    } else {
      url = `/contract/ledger/detail/${this.currentId}`
    }

    this.$router.push(url)
  }

  onDelete(params: any) {
    const tip = this.contractList.length === 1 ? '您确定要删除最后一份合同吗？' : '删除合同'
    this.$confirm(tip, '删除合同', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.currentId = params.id
      this.$http
        .post<any>('/backend/contract/deleteDuringAudit', {
          contractId: this.currentId
        })
        .then(data => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          const index = this.contractList.findIndex(
            (item: any) => item.id === this.currentId
          )
          this.contractList.splice(index, 1)
          const flag = this.contractList.some((item: any) => {
            return item.isCustomContract
          })
          this.auditNodeFns(flag)
          this.contractList.length === 0 && this.$router.push('/todo')
        })
    })
  }

  onSend(params: any) {
    this.currentId = params.id
    this.InitiateAssistance.assistVisible = true
  }

  passAndReject(auditType: any, params?: any) {
    this.$http
      .post<any>('/backend/contract/auditProcess', {
        auditId: this.auditId,
        comment: this.comment,
        auditType,
        nextNode: params
      })
      .then(data => {
        this.$router.push('/todo')
      })
  }

  onPass() {
    this.$confirm(`下一步：提交${this.next}`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.passAndReject(1)
      })
      .catch(() => {})
  }

  onReject() {
    this.rejectVisible = true
  }

  onRejectCancel() {
    this.rejectVisible = false
  }

  onRejectConfirm() {
    let reject
    if (this.rejectList.length === 1) {
      reject = this.rejectList
    } else {
      reject = this.checked
    }
    if (reject === '') {
      this.$message({
        type: 'error',
        message: '请选择驳回人'
      })
      return
    }
    this.rejectVisible = false
    this.passAndReject(2, reject)
  }
}
</script>
<style lang="scss">
.audit{
   .glp-card__header{
      display:flex;
      .glp-card__title{
         min-width: 0;

      }
   }
}
</style>
<style lang="scss" module>
.longTitle{
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.btnGroup {
  position: relative;
  width:400px;
  .riskMenu {
    position: absolute;
    left: 150px;
    top: 29px;
    height: 0;
    width: 234px;
    z-index: 100;
    transition: height 0.5s;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: #fff;
    overflow-y: auto;
    .inRiskMenu {
      list-style: none;
      font-size: 12px;
      margin: 0;
      padding: 5px 0;
      .item {
        display: flex;
        line-height: 24px;
        height: 24px;
        color: #666;
        .text {
          padding-left: 10px;
          width: 154px;
          white-space: nowrap;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: left;
          color: #666;
        }
        .lookDown {
          width: 80px;
          .look {
            color: #359c67;
            cursor: pointer;
          }
          .downLoad {
            color: #3182bd;
            cursor: pointer;
          }
        }
      }
    }
    &.fold {
      height: 160px;
    }
  }
}
.link {
  color: #67c23a;
  cursor: pointer;
  text-decoration: none;
}
.noData {
  color: #666;
  font-size: 14px;
  text-align: center;
  line-height: 140px;
}
</style>
