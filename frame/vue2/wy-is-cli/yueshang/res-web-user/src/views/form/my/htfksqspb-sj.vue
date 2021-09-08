<template>
  <!--  明源-合同付款申请审批表-设计-->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row gutter="24">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>基本信息</h2>
        <i v-if="isShow" class="el-icon-arrow-up put-icon" @click="isShow = !isShow"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow = !isShow"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow">
      <dl-col :span="24" title="流程主题" place="right">
        <el-input v-model="form.bizEntityJson.subject"/>
      </dl-col>
      <dl-col :span="12" title="申请人" :novalue="!form.bizEntityJson.originator">
        <el-input v-model="form.bizEntityJson.originator" @focus="showSearchUser = true"
                  :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"/>
      </dl-col>
      <dl-col :span="12" title="所属组织" place="right" :novalue="!form.bizEntityJson.department">
        <el-input v-model="form.bizEntityJson.department" @focus="showSearchOrg = true"
                  :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"/>
      </dl-col>
      <dl-col :span="12" title="申请人职位">
        <el-input v-model="form.bizEntityJson.applyPositionName"/>
      </dl-col>
      <dl-col :span="12" title="申请时间" place="right">
        <el-date-picker v-model="form.bizEntityJson.startDate" value-format="yyyy-MM-dd" clearable readonly/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>审批信息</h2>
        <i v-if="isShow1" class="el-icon-arrow-up put-icon" @click="isShow1 = !isShow1"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow1 = !isShow1"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow1" gutter="24">
      <dl-col :span="24" title="查看业务单据" class="right-col">
        <el-button @click="openUrl(form.bizEntityJson.billsurl)" type="text" size="mini">查看业务单据</el-button>
      </dl-col>
      <dl-col :span="12" title="付款主题" >
        <el-input v-model="form.bizEntityJson.paymentsubject" readonly/>
      </dl-col>
      <dl-col :span="12" title="申请编号" place="right">
        <el-input v-model="form.bizEntityJson.applicationNo" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同编号">
        <el-input v-model="form.bizEntityJson.contractcode" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同名称" place="right">
        <el-input v-model="form.bizEntityJson.contractname" readonly/>
      </dl-col>
      <dl-col :span="12" title="支付单位">
        <el-input v-model="form.bizEntityJson.paymentunit" readonly/>
      </dl-col>
      <dl-col :span="12" title="收款单位"  place="right">
        <el-input v-model="form.bizEntityJson.payee" readonly/>
      </dl-col>
      <dl-col :span="12" title="开户银行">
        <el-input v-model="form.bizEntityJson.bank" readonly/>
      </dl-col>
      <dl-col :span="12" title="银行账户" place="right">
        <el-input v-model="form.bizEntityJson.bankaccount" readonly/>
      </dl-col>
      <dl-col :span="12" title="主合同签约金额A">
        <el-input v-model="form.bizEntityJson.contractamount" readonly/>
      </dl-col>
      <dl-col :span="12" title="结算金额" place="right">
        <el-input v-model="form.bizEntityJson.settlementAmount" readonly/>
      </dl-col>
      <dl-col :span="12" title="补充合同金额B">
        <el-input v-model="form.bizEntityJson.supcontractamount" readonly/>
      </dl-col>
      <dl-col :span="12" title="阶段结算金额" place="right">
        <el-input v-model="form.bizEntityJson.stageSettlementAmount" readonly/>
      </dl-col>
      <dl-col :span="12" title="签证金额C">
        <el-input v-model="form.bizEntityJson.visaAmount" readonly/>
      </dl-col>
      <dl-col :span="12" title="结算调整金额D" place="right">
        <el-input v-model="form.bizEntityJson.setAdjustmentAmount" readonly/>
      </dl-col>
      <dl-col :span="12" title="汇总金额A+B+C+D">
        <el-input v-model="form.bizEntityJson.totalAmount" readonly/>
      </dl-col>
      <dl-col :span="12" title="款项名称" place="right">
        <el-input v-model="form.bizEntityJson.paymentname" readonly/>
      </dl-col>
      <dl-col :span="12" title="申请金额">
        <el-input v-model="form.bizEntityJson.applyamount" readonly/>
      </dl-col>
      <dl-col :span="12" title="是否纳入保留" place="right">
        <el-radio-group v-model="form.bizEntityJson.isInFactoring">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </dl-col>
      <dl-col :span="12" title="累计付款申请金额(含在途)">
        <el-input v-model="form.bizEntityJson.totalApprovalYfAmount" readonly/>
      </dl-col>
      <dl-col :span="12" title="累计付款申请比例(含在途)" place="right">
        <el-input v-model="form.bizEntityJson.totalApprovalYfRatio" readonly/>
      </dl-col>
      <dl-col :span="24" title="申请说明" place="right">
        <el-input v-model="form.bizEntityJson.applicationDescription" type="textarea" :autosize="{ minRows: 3}" readonly/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>款项明细</h2>
        <i v-if="isShow2" class="el-icon-arrow-up put-icon" @click="isShow2 = !isShow2"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow2 = !isShow2"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow2" gutter="24">
      <dl-col class="title-col" :span="4">
        <h2></h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>税率(%)</h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>含税金额</h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>税额</h2>
      </dl-col>
      <dl-col class="title-col right-col" :span="5">
        <h2>不含税金额</h2>
      </dl-col>
      <dl-col :span="4" title="已确认合同总价" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col place="right" :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="4" title="其中原合同总价" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col place="right" :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="4" title="其中补充协议" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col place="right" :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="4" title="其中累计已核定变更费" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col place="right" :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="4" title="本次付款申请金额" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col place="right" :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="4" title="其中现金" place="title-auto" />
      <dl-col  :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col place="right" :span="5">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>合约规划明细</h2>
        <i v-if="isShow3" class="el-icon-arrow-up put-icon" @click="isShow3 = !isShow3"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow3 = !isShow3"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow3" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.contractPlanList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="项目名称" prop="projectname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.projectname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="合约规划" prop="budgetname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.budgetname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="科目名称" prop="subjectname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.subjectname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="综合税率(%)" prop="taxRate" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.taxRate" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="应付金额(含税)" prop="yfAmount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.yfAmount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="应付金额(不含税)" prop="yfAmountNonTax" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.yfAmountNonTax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="应付金额(进项税)" prop="yfAmountInputTax" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.yfAmountInputTax" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>原合同付款列表</h2>
        <i v-if="isShow4" class="el-icon-arrow-up put-icon" @click="isShow4 = !isShow4"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow4 = !isShow4"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow4" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.payPlanList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="序号" prop="fkcode" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.fkcode" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="款项类别及名称" prop="fundParam" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.fundParam" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="付款比例" prop="fKRate" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.fKRate" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="付款金额" prop="fKAmount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.fKAmount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="付款条件" prop="fKCondition" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.fKCondition" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>附件列表</h2>
        <i v-if="isShow6" class="el-icon-arrow-up put-icon" @click="isShow6 = !isShow6"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow6 = !isShow6"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow6" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.fileDetailList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="序号" prop="index" align="center">
            <template slot-scope="detail">
              <span>{{ detail.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="附件名称" prop="attachmentname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.attachmentname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="Uploader" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.Uploader" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd"
                @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
const uploadUrl = 'api/file/uploadFile'
export default {
  data() {
    return {
      form: {},
      isShow: true,
      isShow1: true,
      isShow2: true,
      isShow3: true,
      isShow4: true,
      isShow5: true,
      isShow6: true,
      isShow7: true,
      isShow8: true,
      disabled: true,
      showSearchOrg: false,
      fileDetail: null,
      uploadUrl: uploadUrl,
      userInfo: {}
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
  watch: {
    data: {
      immediate: true,
      handler: function (val) {
        this.form = val
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'startUserName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'startUserCd', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'contractPlanList', [])
      this.$set(this.form.bizEntityJson, 'payPlanList', [])
      this.$set(this.form.bizEntityJson, 'warrantyPlanList', [])
      this.$set(this.form.bizEntityJson, 'fileDetailList', [])
      this.addContractPlanList()
      this.addPayPlanList()
      this.addWarrantyPlanList()
      this.addFileDetailList()
    }
    this.$set(this.form.bizEntityJson, 'oiginatorid', this.userInfo.userid)
    this.$set(this.form.bizEntityJson, 'originator', this.userInfo.username)
    this.$set(this.form.bizEntityJson, 'departmentid', this.userInfo.centerOrgCd)
    this.$set(this.form.bizEntityJson, 'department', this.userInfo.centerOrgName)
    this.$set(this.form.bizEntityJson, 'applyPositionName', this.userInfo.positionName)
  },
  methods: {
    addContractPlanList() {
      let newData = {
        projectname: '',
        budgetname: '',
        subjectname: '',
        taxRate: '',
        yfAmount: '',
        yfAmountNonTax: '',
        yfAmountInputTax: ''
      }
      this.form.bizEntityJson.contractPlanList.push(newData)
    },
    addPayPlanList() {
      let newData = {
        fkcode: '',
        fundParam: '',
        fKRate: '',
        fKAmount: '',
        fKCondition: ''
      }
      this.form.bizEntityJson.payPlanList.push(newData)
    },
    addWarrantyPlanList() {
      let newData = {
        projectname: '',
        budgetname: '',
        subjectname: '',
        taxRate: '',
        yfAmount: '',
        yfAmountNonTax: '',
        yfAmountInputTax: ''
      }
      this.form.bizEntityJson.warrantyPlanList.push(newData)
    },
    addFileDetailList() {
      let newData = {
        attachmentid: '',
        attachmentname: '',
        attachmenturl: '',
        attachmentsize: '',
        uploaddate: '',
        uploaderid: '',
        uploader: ''
      }
      this.form.bizEntityJson.fileDetailList.push(newData)
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    openUrl(url) {
      if (url) {
        window.open(url, url)
      }
    },
    // 必填判断
    validate() {

    }
  }
}
</script>
<style type="text/css" lang="scss">
@import 'src/views/form/publicSheet/publicSheet';
</style>