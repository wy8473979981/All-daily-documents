<template>
  <!--  明源-合同审批表单(工程类)-->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row gutter="24">
      <dl-col :span="24" class="title-col topRight-col right-col" place="relative">
        <h2>基本信息</h2>
        <i v-if="isShow" class="el-icon-arrow-up put-icon" @click="isShow = !isShow"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow = !isShow"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow" gutter="24">
      <dl-col :span="12" title="流程序号">
        <el-input v-model="form.bizEntityJson.approveNo"/>
      </dl-col>
      <dl-col :span="12" title="发起时间" place="right">
        <el-date-picker v-model="form.bizEntityJson.startDate" value-format="yyyy-MM-dd" clearable/>
      </dl-col>
      <dl-col :span="12" title="发起人" :novalue="!form.bizEntityJson.originator">
        <el-input v-model="form.bizEntityJson.originator" @focus="showSearchUser = true"
                  :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"/>
      </dl-col>
      <dl-col :span="12" title="发起部门" place="right" :novalue="!form.bizEntityJson.department">
        <el-input v-model="form.bizEntityJson.department" @focus="showSearchOrg = true"
                  :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>基本信息</h2>
        <i v-if="isShow1" class="el-icon-arrow-up put-icon" @click="isShow1 = !isShow1"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow1 = !isShow1"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow1" gutter="24">
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
        <i v-if="isShow2" class="el-icon-arrow-up put-icon" @click="isShow2 = !isShow2"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow2 = !isShow2"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow2" gutter="24">
      <dl-col :span="24" title="查看业务单据" place="right">
        <el-button @click="openUrl(form.bizEntityJson.billsurl)" type="text" size="mini">查看业务单据</el-button>
      </dl-col>
      <dl-col :span="12" title="合同名称">
        <el-input v-model="form.bizEntityJson.contractname" readonly/>
      </dl-col>
      <dl-col :span="12" title="项目名称" place="right">
        <el-input v-model="form.bizEntityJson.projname" readonly/>
      </dl-col>
      <dl-col :span="12" title="乙方单位">
        <el-input v-model="form.bizEntityJson.yfprovidername" readonly/>
      </dl-col>
      <dl-col :span="12" title="银行账户" place="right">
        <el-input v-model="form.bizEntityJson.bankaccount" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同金额(含税)">
        <el-input v-model="form.bizEntityJson.contotaltax" readonly/>
      </dl-col>
      <dl-col :span="12" title="地产合同金额(含税)" place="right">
        <el-input v-model="form.bizEntityJson.dccontotaltax" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同金额(不含税)">
        <el-input v-model="form.bizEntityJson.contotal" readonly/>
      </dl-col>
      <dl-col :span="12" title="地产合同金额(不含税)" place="right">
        <el-input v-model="form.bizEntityJson.dccontotal" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同(进项税额)">
        <el-input v-model="form.bizEntityJson.taxamount" readonly/>
      </dl-col>
      <dl-col :span="12" title="地产合同(进项税额)" place="right">
        <el-input v-model="form.bizEntityJson.dctaxamount" readonly/>
      </dl-col>
      <dl-col :span="12" title="规划金额合计(含税)">
        <el-input v-model="form.bizEntityJson.budgettotaltax" readonly/>
      </dl-col>
      <dl-col :span="12" title="是否超合约规划" place="right">
        <el-input v-model="form.bizEntityJson.isfullBudget" readonly/>
      </dl-col>
      <dl-col :span="12" title="定标审批号">
        <el-button @click="openUrl(form.bizEntityJson.calibratecode)" type="text" size="mini">定标审批号</el-button>
      </dl-col>
      <dl-col :span="12" title="商票支付比例%" place="right">
        <el-input v-model="form.bizEntityJson.payscale" readonly/>
      </dl-col>
      <dl-col :span="12" title="可退还金额">
        <el-input v-model="form.bizEntityJson.returnmoney" readonly/>
      </dl-col>
      <dl-col :span="12" title="计价方式" place="right">
        <el-input v-model="form.bizEntityJson.pricingmanner" readonly/>
      </dl-col>
      <dl-col :span="12" title="合作方式">
        <el-input v-model="form.bizEntityJson.jointype" readonly/>
      </dl-col>
      <dl-col :span="12" title="招商模式" place="right">
        <el-input v-model="form.bizEntityJson.biddingmode" readonly/>
      </dl-col>
      <dl-col :span="24" title="抵房相关信息" place="right">
        <el-input v-model="form.bizEntityJson.deduction" readonly/>
      </dl-col>
      <dl-col :span="24" title="单方口径及指标说明" :novalue="!form.bizEntityJson.unilateralCaliberIndicators" place="right">
        <el-input v-model="form.bizEntityJson.unilateralCaliberIndicators"
                  :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"/>
      </dl-col>
      <dl-col :span="24" class="right-col">
        <el-button @click="openUrl(form.bizEntityJson.index)" type="text" size="mini">指标数据</el-button>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>合约规划归集列表</h2>
        <i v-if="isShow3" class="el-icon-arrow-up put-icon" @click="isShow3 = !isShow3"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow3 = !isShow3"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow3" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.contractPlanList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="项目名称" prop="projectname">
            <template slot-scope="scope">
              <el-input v-model="scope.row.projectname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="成本科目" prop="subjects">
            <template slot-scope="scope">
              <el-input v-model="scope.row.subjects" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="合约规划名称" prop="budgetname">
            <template slot-scope="scope">
              <el-input v-model="scope.row.budgetname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="含税规划金额" prop="budgetmoneytax">
            <template slot-scope="scope">
              <el-input v-model="scope.row.budgetmoneytax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="不含税规划金额" prop="budgetmoney">
            <template slot-scope="scope">
              <el-input v-model="scope.row.budgetmoney" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="规划税率%" prop="budgettax">
            <template slot-scope="scope">
              <el-input v-model="scope.row.budgettax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="对应含税金额" prop="conamounttax">
            <template slot-scope="scope">
              <el-input v-model="scope.row.conamounttax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="对应不含税金额" prop="conamount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.conamount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="对应合同税率" prop="contracttax">
            <template slot-scope="scope">
              <el-input v-model="scope.row.contracttax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="规划余额" prop="budbalance">
            <template slot-scope="scope">
              <el-input v-model="scope.row.budbalance" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="预估变更金额" prop="changetotal">
            <template slot-scope="scope">
              <el-input v-model="scope.row.changetotal" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="预估变更比例%" prop="changerate">
            <template slot-scope="scope">
              <el-input v-model="scope.row.changerate" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="是否超合约规划" prop="isfullBudget">
            <template slot-scope="scope">
              <el-input v-model="scope.row.isfullBudget" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>业态拆分信息</h2>
        <i v-if="isShow4" class="el-icon-arrow-up put-icon" @click="isShow4 = !isShow4"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow4 = !isShow4"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow4" gutter="24">
      <dl-col :span="24" class="right-col">
        <el-button @click="openUrl(form.bizEntityJson.producturl)" type="text" size="mini">业态拆分</el-button>
      </dl-col>
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.businessDetailList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="项目名称" prop="projname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.projname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="业态名称" prop="productname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.productname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="合同金额(含税)" prop="sharetotaltax" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.sharetotaltax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="合同金额(不含税)" prop="sharetotal" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.sharetotal" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="合同金额(进项税额)" prop="taxtotal" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.taxtotal" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>合同付款信息</h2>
        <i v-if="isShow5" class="el-icon-arrow-up put-icon" @click="isShow5 = !isShow5"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow5 = !isShow5"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow5" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.contractPayDetailList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="序号" prop="rowno" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.rowno" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="款项类型及名称" prop="paytype" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.paytype" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="付款比例%" prop="payrate" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.payrate" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="付款金额" prop="payamount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.payamount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="付款日期" prop="paydate" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.paydate" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="付款条件" prop="payterms" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.payterms" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>定标信息</h2>
        <i v-if="isShow6" class="el-icon-arrow-up put-icon" @click="isShow6 = !isShow6"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow6 = !isShow6"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow6" :gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.scalingDetailList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="中标单位" prop="winunit" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.winunit" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="中标价(含税)" prop="wintotaltax" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.wintotaltax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="中标价(不含税)" prop="wintotal" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.wintotal" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="中标税率%" prop="wintax" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.wintax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="中标税额" prop="wintaxtotal" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.wintaxtotal" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>经办人信息</h2>
        <i v-if="isShow7" class="el-icon-arrow-up put-icon" @click="isShow7 = !isShow7"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow7 = !isShow7"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow7" gutter="24">
      <dl-col :span="12" title="甲方单位">
        <el-input v-model="form.bizEntityJson.jfprovider" readonly/>
      </dl-col>
      <dl-col :span="12" title="签约日期" place="right">
        <el-input v-model="form.bizEntityJson.signdate" readonly/>
      </dl-col>
      <dl-col :span="12" title="丙方单位">
        <el-input v-model="form.bizEntityJson.bfprovider" readonly/>
      </dl-col>
      <dl-col :span="12" title="银行账户" place="right">
        <el-input v-model="form.bizEntityJson.bankaccount" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同工编号">
        <el-input v-model="form.bizEntityJson.contractcode" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同类别" place="right">
        <el-input v-model="form.bizEntityJson.contracttype" readonly/>
      </dl-col>
      <dl-col :span="12" title="是否标准合同">
        <el-input v-model="form.bizEntityJson.isnormcontract" readonly/>
      </dl-col>
      <dl-col :span="12" title="经办人" place="right">
        <el-input v-model="form.bizEntityJson.operator" readonly/>
      </dl-col>
      <dl-col :span="12" title="经办部门">
        <el-input v-model="form.bizEntityJson.operatebu" readonly/>
      </dl-col>
      <dl-col :span="12" title="经办人电话" place="right">
        <el-input v-model="form.bizEntityJson.phone" readonly/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>附件列表</h2>
        <i v-if="isShow8" class="el-icon-arrow-up put-icon" @click="isShow8 = !isShow8"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow8 = !isShow8"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow8" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.fileDetailList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="序号" prop="index" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.index" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="附件名称" prop="attachmentname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.attachmentname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="uploader" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.uploader" readonly/>
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
      this.$set(this.form.bizEntityJson, 'businessDetailList', [])
      this.$set(this.form.bizEntityJson, 'contractPayDetailList', [])
      this.$set(this.form.bizEntityJson, 'scalingDetailList', [])
      this.$set(this.form.bizEntityJson, 'fileDetailList', [])
      this.addContractPlanList()
      this.addBusinessDetailList()
      this.addContractPayDetailList()
      this.addScalingDetailList()
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
        projectid: '',
        projectname: '',
        subjectid: '',
        subjects: '',
        budgetid: '',
        budgetname: '',
        budgetmoneytax: '',
        budgetmoney: '',
        budgettax: '',
        conamounttax: '',
        conamount: '',
        contracttax: '',
        budbalance: '',
        changetotal: '',
        changerate: '',
        isfullBudget: '',
      }
      this.form.bizEntityJson.contractPlanList.push(newData)
    },
    addBusinessDetailList() {
      let newData = {
        projectid: '',
        projname: '',
        productcode: '',
        productname: '',
        sharetotaltax: '',
        sharetotal: '',
        taxtotal: ''
      }
      this.form.bizEntityJson.businessDetailList.push(newData)
    },
    addContractPayDetailList() {
      let newData = {
        rowno: '',
        paytype: '',
        payrate: '',
        payamount: '',
        paydate: '',
        payterms: ''
      }
      this.form.bizEntityJson.contractPayDetailList.push(newData)
    },
    addScalingDetailList() {
      let newData = {
        providerid: '',
        winunit: '',
        wintotaltax: '',
        wintotal: '',
        wintax: '',
        wintaxtotal: ''
      }
      this.form.bizEntityJson.scalingDetailList.push(newData)
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