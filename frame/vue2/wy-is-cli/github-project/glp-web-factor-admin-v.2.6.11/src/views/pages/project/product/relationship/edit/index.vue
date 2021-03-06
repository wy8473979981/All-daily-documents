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
            <el-select v-model="relaitonForm.sellId" placeholder="请选择卖方名称" :disabled="disabledFlag" clearable @change="onChangeSellId" filterable remote :remote-method="remoteMethod">
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
            <el-select v-model="relaitonForm.buyId" placeholder="请选择买方名称" :disabled="disabledFlag" clearable filterable remote :remote-method="remoteMethodSecond">
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
              <el-select v-model="relaitonForm.returnBankId" placeholder="请选择账户户名" clearable @change="onChangeReturnBankId">
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
              <el-select v-model="relaitonForm.ebankId" placeholder="请选择账户户名" clearable @change="onChangeEbankId">
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
              <el-input v-model="relaitonForm.ebankNo" placeholder="请填写账户账号" disabled clearable :class="[$style.width100]"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </glp-section>
    </el-form>
  </glp-card>
  <div class="text-center mt-4">
    <el-button size="small" class="px-5 ml-5" @click="$router.go(-1)">返 回</el-button>
    <el-button type="primary" size="small" class="px-5" @click="onSubmit" :disabled="approveFlag && !accessSubmit" :loading="loading">提 交</el-button>
  </div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { getRemoteCustomerName, getReturnAccountList, addBuyerSeller, editBuyerSeller, detailBuyerSeller } from '@/api/systemSet'

@Component
export default class Edit extends Vue {
  $style!: any

  @Prop() id!: any

  @Prop(String) type!: string

  @Prop() quotaCode!: any

  @Prop() projectId!: any

  @Prop() row!: any

  @Ref() relaitonRef!: any

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

  approveFlag: any = false

  buyerSellerCode: any = ''

  accessSubmit: any = false

  loading = false

  loadBaseForm () {
    let params = {}
    if (this.id) {
      this.disabledFlag = true
      params = {
        id: this.id
      }
      detailBuyerSeller(params).then((data) => {
        this.baseForm = data.project
        this.buyerSellerCode = data.projectBuyerSeller.buyerSellerCode
        this.approveFlag = data.approveFlag
        this.relaitonForm = data.projectBuyerSeller
        this.onChangeSellId(data.projectBuyerSeller.sellId)
        this.relaitonForm.bsId = data.projectBuyerSeller.id
        this.relaitonForm.returnBankNo = data.projectBuyerSeller.returnBank.bankAccountNumber
        this.relaitonForm.bindBankName = data.projectBuyerSeller.returnBank.bindBankName
        if (this.relaitonForm.ebank) {
          this.relaitonForm.ebankNo = data.projectBuyerSeller.ebank.bankAccountNumber
          this.relaitonForm.ebindBankName = data?.projectBuyerSeller.ebank.bindBankName
        }
        this.sellOptions = []
        this.buyOptions = []
        this.sellOptions.push({ id: this.relaitonForm.sellId, name: this.relaitonForm.sellName })
        this.buyOptions.push({ id: this.relaitonForm.buyId, name: this.relaitonForm.buyName })
        // this.accountOptions.push({ name: data.projectBuyerSeller.returnBank.bankAccountName, id: data.projectBuyerSeller.returnBank.id, number: data.projectBuyerSeller.returnBank.bankAccountNumber, bindBankName: data.projectBuyerSeller.returnBank.bindBankName })
        // if (data.projectBuyerSeller.ebank) {
        //   this.eAccountOptions.push({ name: data.projectBuyerSeller.ebank.bankAccountName, id: data.projectBuyerSeller.ebank.id, number: data.projectBuyerSeller.ebank.bankAccountNumber, ebindBankName: data.projectBuyerSeller.ebank.bindBankName })
        // }
      })
    }
  }

  onChangeSellId (value: any) {
    this.accountOptions = []
    this.eAccountOptions = []
    let params = {}
    params = {
      bankType: 2, // 1实户 2虚户
      customerId: value,
      usage: 1
    }
    getReturnAccountList(params).then((data) => {
      if (data.length > 0) {
        data.forEach((item: any, index: number) => {
          this.accountOptions.push({ name: item.bankAccountName, id: item.id, number: item.bankAccountNumber, bindBankName: item.bindBankName })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '账户户名列表为空',
          onClose: () => {
            return false
          },
          duration: 1500
        })
      }
    })
    const obj = {
      bankType: 1, // 1实户 2虚户
      customerId: value,
      usage: 2
    }
    getReturnAccountList(obj).then((data) => {
      if (data.length > 0) {
        data.forEach((item: any, index: number) => {
          this.eAccountOptions.push({ name: item.bankAccountName, id: item.id, number: item.bankAccountNumber, ebindBankName: item.bindBankName })
        })
      }
    })
  }

  onChangeReturnBankId (value: any) {
    this.accountOptions.forEach((item: any, index: number) => {
      if (item.id === value) {
        this.relaitonForm.returnBankNo = item.number
        this.$set(this.relaitonForm, 'returnBankNo', item.number)
        this.relaitonForm.bindBankName = item.bindBankName
      }
    })
  }

  onChangeEbankId (value: any) {
    this.eAccountOptions.forEach((item: any, index: number) => {
      if (item.id === value) {
        this.relaitonForm.ebankNo = item.number
        this.relaitonForm.ebindBankName = item.ebindBankName
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

  onSubmit () {
    this.loading = true
    this.relaitonRef.validate().then((valid: boolean) => {
      if (!valid) {
        this.loading = false
        this.$message({
          type: 'warning',
          message: '字段信息不完整，请补充完整后开通！',
          onClose: () => {
            return false
          },
          duration: 1500
        })
      } else {
        // delete this.relaitonForm.returnBankNo
        // delete this.relaitonForm.ebankNo
        delete this.relaitonForm.approveCount
        delete this.relaitonForm.buyName
        delete this.relaitonForm.status
        delete this.relaitonForm.updateTime
        delete this.relaitonForm.sellName
        delete this.relaitonForm.buyerSellerCode
        delete this.relaitonForm.id
        delete this.relaitonForm.returnBank
        delete this.relaitonForm.ebank
        delete this.relaitonForm.ebankStatus
        Object.assign(this.relaitonForm, { projectId: this.projectId })
        this.$confirm('是否生成合同', '', {
          distinguishCancelAndClose: true,
          confirmButtonText: '是',
          cancelButtonText: '否',
          center: true
        }).then(() => {
          Object.assign(this.relaitonForm, { contractGenerate: 1 })
          editBuyerSeller(this.relaitonForm).then((data) => {
            this.loading = false
            this.$message({
              type: 'success',
              message: '新增成功',
              onClose: () => {
                this.$router.go(-1)
              },
              duration: 1500
            })
          }).catch(() => {
            this.loading = false
          })
        }).catch((action) => {
          this.loading = false
          if (action === 'cancel') {
            Object.assign(this.relaitonForm, { contractGenerate: 0 })
            editBuyerSeller(this.relaitonForm).then((data) => {
              this.$message({
                type: 'success',
                message: '新增成功',
                onClose: () => {
                  this.$router.go(-1)
                },
                duration: 1500
              })
            })
          }
        })
      }
    })
  }

  mounted () {
    this.loadBaseForm()
    this.accessSubmit = this.$auth.accessSync('/project/product/relationship/edit/submit')
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
  width: 100%
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
