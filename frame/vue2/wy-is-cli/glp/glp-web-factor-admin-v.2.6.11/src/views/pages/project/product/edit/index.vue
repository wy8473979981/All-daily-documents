<template>
  <div :class="[$style.labelPadding]">
    <el-row :gutter="32">
        <el-col><title :class="[$style.pageTopTitle]">项目编号：{{projectCode}}</title></el-col>
    </el-row>
    <glp-card title="项目产品">
      <detail-form :def="baseFormDefs" :data-source="dataSource" :form="baseForm">
        <template v-slot:link>
          <el-link :href="quotaTargetUrl" target="_blank" type="primary">{{dataSource.quotaCode}}</el-link>
        </template>
      </detail-form>
    </glp-card>
    <div :class="[$style.padding0]">
      <data-form
        ref="dataFormRef"
        @onDataForm="getDataForm"
        :dataForm="dataSource"
        :pageType="type"
      ></data-form>
      <order-form
        ref="orderFormRef"
        @onOrderForm="getOrderForm"
        :orderForm="dataSource"
        :pageType="type"
        :disabledFlag="disabledFlag"
      ></order-form>
    </div>
    <contract-form
      ref="contractFormRef"
      @onContractForm="getContractForm"
      :contractForm="contractForm"
      :pageType="type"
      :id="id"
      :quotaCode="quotaCode"
      v-if="showFlag"
    ></contract-form>
    <sortrule-form
      ref="sortRuleFormRef"
      @onSortRuleForm="getSortRuleForm"
      :sortRuleForm="sortRuleForm"
      :pageType="type"
      :projectId="id"
      :disabledFlag="disabledFlag"
    ></sortrule-form>
    <query-table
      title="审批历史"
      :columns="approvalColumns"
      :dataSource="approvalList"
      :pageable="false"
      class="mb-4"
      v-if="type!='init'"
    >
      <template v-slot:proxyerType>
        <span>客户签署代理人</span>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" @click="onForbidden(row)">{{row.proxyerStatus === 0 ?'启用':'禁用'}}</el-button>
        <el-button type="text" @click="onEdit(row)">编辑</el-button>
        <el-button type="text" @click="onDelete(row)">删除</el-button>
      </template>
    </query-table>
    <div class="text-center" v-if="type==='init' || (type==='edit' && approveFlag === false)">
      <el-button size="small" class="px-5" @click="$router.go(-1)">返回</el-button>
      <el-button type="danger" size="small" class="px-5" @click="onSave" :loading="saveLoading" :disabled="submitLoading">保存</el-button>
      <el-button type="primary" size="small" class="px-5" @click="onSubmit(false)" :loading="submitLoading" :disabled="saveLoading">提交</el-button>
    </div>
    <audit-form
      v-if="type==='auth' && approveFlag"
      :passFn="onPass"
      :isShowReject="false"
      :denyFn="onReject"
    ></audit-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { baseFormDefs, approvalColumns } from './config'
import DataForm from '../components/data-form/index.vue'
import OrderForm from '../components/order-form/index.vue'
import ContractForm from '../components/contract-form/index.vue'
import SortruleForm from '../components/sortrule-form/index.vue'
import {
  initNewProjectInfo,
  addProject,
  getProjectDetail,
  approverProject,
  updateProject
} from '@/api/systemSet'

@Component({
  components: { DataForm, OrderForm, ContractForm, SortruleForm }
})
export default class DetailEdit extends Vue {
  $style!: any

  @Ref() dataFormRef!: DataForm

  @Ref() orderFormRef!: OrderForm

  @Ref() contractFormRef!: ContractForm

  @Ref() sortRuleFormRef!: SortruleForm

  @Ref() approvalFormRef!: any

  @Prop() id!: string

  @Prop(String) status!: string

  approvalColumns = approvalColumns

  baseFormDefs = baseFormDefs

  dataSource: Record<string | number, any> = {}

  approveFlag = false

  baseForm: Record<string|number, any> = {}

  quotaCode: any = ''

  disabledFlag = false

  transportFlag = false

  get statusValue () {
    return this.status
  }

  authInfo = ''

  params: Record<string | number, any> = {}

  type: any = 'detail'

  projectBD = []

  projectCode: any = '' // 项目编号

  projectStopAutoBank: Array<any> = []

  approvalList: Array<any> = []

  sortRuleForm: Record<string|number, any> = {
    autoCleanType1Day: '',
    autoCleanType: '',
    autoCleanType1: '',
    ifAutoClean: '',
    projectStopAutoBank: []
  }

  contractForm: Array<any> = []

  businessType: any = ''

  showFlag = false

  contractApproveFlag = false

  quotaTargetUrl: any = ''

  saveLoading = false

  submitLoading = false

  @Watch('quotaCode') onWatchQuota () {
    if (this.quotaCode !== '') {
      this.showFlag = true
    }
  }

  loadBaseForm () {
    const type = this.$route.query.type
    if (type === 'detail') {
      this.loadDetail()
    } else if (type === 'edit') {
      this.loadDetail()
    } else if (type === 'init') {
      initNewProjectInfo(this.id).then(data => {
        this.quotaTargetUrl = data.quotaTargetUrl
        this.dataSource = data.project || {}
        if (data.project.businessType === 'GLP_CHAIN_FACTORING') {
          this.disabledFlag = true
        }
        this.approveFlag = data.approveFlag
        this.quotaCode = data.project.quotaCode
        this.sortRuleForm = {
          autoCleanType1Day: data.project.autoCleanType1Day,
          autoCleanType: data.project.autoCleanType,
          autoCleanType1: data.project.autoCleanType1,
          ifAutoClean: data.project.ifAutoClean,
          projectStopAutoBank: data.projectStopAutoBank || []
        }
        this.projectBD = data.projectBD || []
        this.contractForm = data.projectContracts || []
      })
    } else if (type === 'auth') {
      this.loadDetail()
    } else {
      initNewProjectInfo(this.id).then(data => {
        this.quotaTargetUrl = data.quotaTargetUrl
        if (data.project.businessType === 'GLP_CHAIN_FACTORING') {
          this.disabledFlag = true
        }
        this.dataSource = data.project || {}
        this.approveFlag = data.approveFlag
        this.projectBD = data.projectBD || []
        this.contractForm = data.projectContracts || []
      })
    }
  }

  loadDetail () {
    const data = {
      processId: this.id,
      projectId: this.id
    }
    if (this.$route.query.queryParam === 'processId') {
      delete data.projectId
    } else {
      delete data.processId
    }
    getProjectDetail(data).then(data => {
      this.quotaTargetUrl = data.quotaTargetUrl
      if (data.project.businessType === 'GLP_CHAIN_FACTORING') {
        this.disabledFlag = true
      }
      if (data.project.businessType === 'GLP_TRANSPORT') {
        this.transportFlag = true
      }
      this.contractApproveFlag = data.firstApproveFlag
      this.dataSource = data.project || {}
      this.projectCode = data.project.projectCode
      this.quotaCode = data.project.quotaCode
      this.approveFlag = data.approveFlag
      this.projectBD = data.projectBD || []
      this.approvalList =
        (data.orderApproveHisInfos &&
          data.orderApproveHisInfos[1] && [data.orderApproveHisInfos[1]]) ||
        []
      this.sortRuleForm = {
        autoCleanType1Day: data.project.autoCleanType1Day,
        autoCleanType: data.project.autoCleanType,
        autoCleanType1: data.project.autoCleanType1,
        ifAutoClean: data.project.ifAutoClean,
        projectStopAutoBank: data.stopAutoBankList
      }
      this.contractForm = data.projectContracts
    })
  }

  getDataForm (value: {}) {
    this.params.dataForm = value
  }

  getContractForm (value: any) {
    this.params.contractForm = value
  }

  getOrderForm (value: {}) {
    this.params.orderForm = value
  }

  getSortRuleForm (value: any) {
    this.params.sortRuleForm = value
  }

  onSave () {
    this.onSubmit(true)
  }

  transNumber () {
    const obj = JSON.parse(JSON.stringify(this.params.sortRuleForm))
    if (obj.autoCleanType1 === '') {
      obj.autoCleanType1 = 0
    }
    if (obj.autoCleanType1.length > 0 && (typeof obj.autoCleanType1 === 'string')) {
      obj.autoCleanType1 = Number(obj.autoCleanType1)
    }
    if (obj.autoCleanType1Day === '') {
      obj.autoCleanType1Day = 0
    }
    if (obj.autoCleanType1Day.length > 0 && (typeof obj.autoCleanType1Day === 'string')) {
      obj.autoCleanType1Day = Number(obj.autoCleanType1Day)
    }
    if (obj.autoCleanType === '') {
      obj.autoCleanType = 0
    }
    if (obj.autoCleanType.length > 0 && (typeof obj.autoCleanType === 'string')) {
      obj.autoCleanType = Number(obj.autoCleanType)
    }
    return obj
  }

  onSubmit (isSave: boolean) {
    if (isSave) {
      this.saveLoading = true
      this.submitLoading = false
    } else {
      this.submitLoading = true
      this.saveLoading = false
    }
    this.contractFormRef.validContract().then((result: boolean) => {
      if (!result) {
        this.submitLoading = false
        this.saveLoading = false
        return false
      } else {
        const data: Record<string | number, any> = {}
        const project = {
          ...this.dataSource,
          ...this.params.dataForm,
          ...this.params.orderForm,
          ...this.transNumber()
          // ...this.params.contractForm
        }
        delete project.customerName
        delete project.bdName
        data.project = project
        data.projectBD = this.projectBD
        data.saveFlag = false
        data.projectStopAutoBank = project.projectStopAutoBank
        data.projectContracts = this.params.contractForm
        if (this.type === 'edit') {
          data.stopAutoBankList = project.projectStopAutoBank
          data.stopAutoBankList.map((item: any, index: any) => {
            delete item.options
            delete item.bankOptions
          })
        }
        delete project.projectStopAutoBank
        data.projectStopAutoBank.map((item: any, index: any) => {
          delete item.options
          delete item.bankOptions
        })
        data.saveFlag = isSave
        if (data.project.ifAutoClean === 2) {
          data.projectStopAutoBank = null
        }
        if (this.type === 'edit') {
          delete data.projectBD
          delete data.projectStopAutoBank
          updateProject(data).then(res => {
            this.submitLoading = false
            this.saveLoading = false
            this.$message({
              message: '编辑成功',
              type: 'success',
              onClose: () => {
                this.$router.push('/project/product')
              },
              duration: 1500
            })
          })
        } else {
          addProject(data).then(res => {
            this.submitLoading = false
            this.saveLoading = false
            this.$message({
              message: '提交成功',
              type: 'success',
              onClose: () => {
                this.$router.push('/project/product')
              },
              duration: 1500
            })
          }).catch(() => {
            this.submitLoading = false
            this.saveLoading = false
          })
        }
      }
    }).catch(() => {
      this.submitLoading = false
      this.saveLoading = false
    })
  }

  onPass (form: any) {
    let data = {}
    if (!this.contractApproveFlag) {
      this.$confirm('是否重新生成项目合同的审核待办？', '', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        center: true
      }).then(() => {
        data = {
          approverDesc: form.comment,
          projectId: this.dataSource.id,
          contractApproveFlag: true,
          status: 1
        }
        approverProject(data).then(res => {
          this.$message({
            message: '审批成功',
            type: 'success',
            onClose: () => {
              this.$router.push('/project/product')
            },
            duration: 1500
          })
        })
      }).catch(() => {
        data = {
          approverDesc: form.comment,
          projectId: this.dataSource.id,
          contractApproveFlag: false,
          status: 1
        }
        approverProject(data).then(res => {
          this.$message({
            message: '审批成功',
            type: 'success',
            onClose: () => {
              this.$router.push('/project/product')
            },
            duration: 1500
          })
        })
      })
    } else {
      data = {
        approverDesc: form.comment,
        projectId: this.dataSource.id,
        status: 1
      }
      approverProject(data).then(res => {
        this.$message({
          message: '审批成功',
          type: 'success',
          onClose: () => {
            this.$router.push('/project/product')
          },
          duration: 1500
        })
      })
    }
  }

  onReject (form: any) {
    const data: Record<string, any> = {
      approverDesc: form.comment,
      projectId: this.dataSource.id,
      status: 2
    }
    approverProject(data).then(res => {
      this.$message({
        message: '审批成功',
        type: 'success',
        onClose: () => {
          this.$router.push('/project/product')
        },
        duration: 1500
      })
    })
  }

  mounted () {
    this.type = this.$route.query.type
    this.loadBaseForm()
  }
}
</script>

<style lang="scss" module>
.el-radio-group {
  width: 100%;
}
.rowcenter {
  display: flex;
  align-items: center;
}
.textC {
  text-align: center;
}
.widthauto {
  width: auto;
}
.pageTopTitle {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin: 20px 10px;
  display: inline-block;
}
.labelPadding{
  :global {
    .glp-form-render-plain{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
}
.padding0{
  :global{
    .el-form-item__label{
        padding: 0;
      }
  }
}
</style>
