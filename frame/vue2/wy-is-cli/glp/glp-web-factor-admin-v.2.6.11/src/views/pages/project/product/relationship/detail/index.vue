<template>
<div :class="[$style.buyModal]">
  <el-row :gutter="32">
    <el-col :span="24"><span :class="[$style.pageTopTitle]">买卖方关系编号：</span>{{buyerSellerCode}}</el-col>
  </el-row>
  <glp-card title="项目产品信息">
      <el-form :model="baseForm">
        <el-row :gutter="32">
          <el-col :span="10">
            <el-form-item label="项目名称" prop="sellId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <span>{{baseForm.projectName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客户经理" prop="bdName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <span>{{baseForm.bdName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="金融产品" prop="businessTypeName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <span>{{baseForm.businessTypeName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="10">
            <el-form-item label="授信企业" prop="customerName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <span>{{baseForm.customerName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="授信编号" prop="quotaCode" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <span>{{baseForm.quotaCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="资金流向" prop="capitalFlow" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <span v-if="baseForm.capitalFlow === 1">无要求</span>
              <span v-if="baseForm.capitalFlow === 2">翻单支付</span>
              <span v-if="baseForm.capitalFlow === 3">定向支付</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </glp-card>
  <glp-card title="买卖方关系" class="mt-4" :class="[$style.pageBox]">
    <el-form size="small"  ref="relaitonRef" :model="relaitonForm" label-position="right" label-width="140px">
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="卖方名称" prop="sellId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="relaitonForm.sellId" placeholder="请选择卖方名称" disabled clearable @change="onChangeSellId" filterable remote :remote-method="remoteMethod">
              <el-option
                v-for="item in sellOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="买方名称" prop="buyId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="relaitonForm.buyId" placeholder="请选择买方名称" disabled clearable filterable remote :remote-method="remoteMethodSecond">
              <el-option
                v-for="item in buyOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <glp-section title="回款账户维护">
        <el-row :gutter="32">
          <el-col :span="8">
            <el-form-item label="账户户名" prop="returnBankId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <el-select v-model="relaitonForm.returnBankId" placeholder="请选择账户户名" disabled clearable @change="onChangeReturnBankId">
                <el-option
                  v-for="(item, index) in accountOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行" prop="bindBankName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <el-input v-model="relaitonForm.bindBankName" placeholder="请填写开户行" disabled clearable :class="[$style.width100]"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户账号" prop="returnBankNo" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <el-input v-model="relaitonForm.returnBankNo" placeholder="请填写账户账号" disabled clearable :class="[$style.width100]"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </glp-section>
      <glp-section title="浦发E账户维护" v-if="baseForm.capitalFlow === 2">
        <el-row :gutter="32">
          <el-col :span="8">
            <el-form-item label="账户户名" prop="ebankId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <el-select v-model="relaitonForm.ebankId" placeholder="请选择账户户名"  disabled clearable @change="onChangeEbankId">
                <el-option
                  v-for="(item, index) in eAccountOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行" prop="ebindBankName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <el-input v-model="relaitonForm.ebindBankName" placeholder="请填写开户行" disabled clearable :class="[$style.width100]"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户账号" prop="ebankNo" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
              <el-input v-model="relaitonForm.ebankNo" placeholder="请填写账户账号" clearable disabled :class="[$style.width100]"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </glp-section>
    </el-form>
  </glp-card>
  <glp-card title="审批信息" class="mt-4">
    <query-table :columns="columns"  :data-source="approvalLogList" class="mt-4" :wrap="false" :pageable="false"></query-table>
  </glp-card>
  <audit-form :passFn="passFn" :rejectFn="rejectFn" :isShowDeny="false" class="mt-4" v-if="isDetail != '1'"></audit-form>
  <div class="text-center mt-4" v-if="isDetail === '1'">
    <el-button size="small" class="px-5" @click="$router.go(-1)">返回</el-button>
  </div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { columns } from './config'
import { getRemoteCustomerName, getReturnAccountList, addBuyerSeller, editBuyerSeller, detailBuyerSeller, relationCheck } from '@/api/systemSet'

@Component
export default class Edit extends Vue {
  $style!: any

  @Prop() id!: any

  @Prop(String) type!: string

  @Prop() quotaCode!: any

  @Prop() projectId!: any

  @Prop() row!: any

  @Ref() relaitonRef!: any

  columns = columns

  baseForm: Record<string, any> = {}

  relaitonForm: Record<string, any> = {}

  backAccountForm: Record<string, any> = {}

  ePFAccountForm: Record<string, any> = {}

  groupForm: Record<string, any> = {}

  sellOptions: Array<any> = []

  buyOptions: Array<any> = []

  accountOptions: Array<any> = []

  eAccountOptions: Array<any> = []

  disabledFlag: any = false

  approvalLogList: Array<any> = []

  processId: any = ''

  isDetail: any = ''

  bsid: any = ''

  buyerSellerCode: any = ''

  @Watch('processId') onChangeProcessId () {
    detailBuyerSeller({ processId: this.processId }).then((data) => {
      this.buyerSellerCode = data?.projectBuyerSeller?.buyerSellerCode
      this.baseForm = data.project
      this.bsid = data?.projectBuyerSeller.id
      this.relaitonForm = data?.projectBuyerSeller
      this.onChangeSellId(data?.projectBuyerSeller.sellId)
      this.relaitonForm.returnBankNo = data?.projectBuyerSeller.returnBank.bankAccountNumber
      this.relaitonForm.bindBankName = data?.projectBuyerSeller.returnBank.bindBankName
      if (this.relaitonForm.ebank) {
        this.relaitonForm.ebankNo = data?.projectBuyerSeller.ebank.bankAccountNumber
        this.relaitonForm.ebindBankName = data?.projectBuyerSeller.ebank.bindBankName
      }
      this.sellOptions = []
      this.buyOptions = []
      this.sellOptions.push({ id: this.relaitonForm.sellId, name: this.relaitonForm.sellName })
      this.buyOptions.push({ id: this.relaitonForm.buyId, name: this.relaitonForm.buyName })
    })
  }

  loadBaseForm () {
    let params = {}
    if (this.id) {
      params = {
        id: this.id
      }
      detailBuyerSeller(params).then((data) => {
        this.relaitonForm = data.projectBuyerSeller
        this.approvalLogList = []
        if (data.orderApproveHisInfos.list.length > 1) {
          this.approvalLogList.push(data.orderApproveHisInfos.list[1])
        }
      })
    }
  }

  onChangeSellId (value: any) {
    this.accountOptions = []
    let params = {}
    params = {
      bankType: 2, // 1实户 2虚户
      customerId: value,
      usage: 1
    }
    getReturnAccountList(params).then((data) => {
      if (data.length > 0) {
        data.forEach((item: any, index: number) => {
          this.accountOptions.push({ name: item.bankAccountName, id: item.id, number: item.bankAccountNumber })
        })
      }
    })

    params = {
      bankType: 1, // 1实户 2虚户
      customerId: value,
      usage: 2
    }
    getReturnAccountList(params).then((data) => {
      if (data.length > 0) {
        data.forEach((item: any, index: number) => {
          this.eAccountOptions.push({ name: item.bankAccountName, id: item.id, number: item.bankAccountNumber })
        })
      }
    })
  }

  onChangeReturnBankId (value: any) {
    this.accountOptions.forEach((item: any, index: number) => {
      if (item.id === value) {
        this.relaitonForm.returnBankNo = item.number
        this.$set(this.relaitonForm, 'returnBankNo', item.number)
      }
    })
  }

  onChangeEbankId (value: any) {
    this.eAccountOptions.forEach((item: any, index: number) => {
      if (item.id === value) {
        this.relaitonForm.ebankNo = item.number
      }
    })
  }

  remoteMethod (query: any) {
    getRemoteCustomerName({ name: query }).then((data) => {
      this.sellOptions = data
    })
  }

  remoteMethodSecond (query: any) {
    getRemoteCustomerName({ name: query }).then((data) => {
      this.buyOptions = data
    })
  }

  passFn ({ comment }: any) {
    const params = {
      id: this.bsid,
      approverDesc: comment,
      status: 1
    }
    relationCheck(params).then((data) => {
      this.$message({
        message: '审批成功',
        type: 'success',
        onClose: () => {
          this.$router.push('/todo?doOrNot=1')
        },
        duration: 1500
      })
    })
  }

  rejectFn ({ comment }: any) {
    const params = {
      id: this.bsid,
      approverDesc: comment,
      status: 2
    }
    return relationCheck(params).then((data) => {
      this.$message({
        message: '审批成功',
        type: 'success',
        onClose: () => {
          this.$router.push('/todo?doOrNot=1')
        },
        duration: 1500
      })
    })
  }

  mounted () {
    this.loadBaseForm()
    this.processId = ''
    this.processId = this.$route.query?.processId
    this.isDetail = this.$route.query?.isDetail
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
.margin20 {
  margin:20px auto
}
.width100 {
 width: 100%;
}
.pageBox{
  :global{
    .el-select, .el-input{
      width: 100%;
    }
  }
}
.buyModal{
  :global{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}
</style>
