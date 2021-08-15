<template>
  <!--  明源-合同审批表单(其他类)-->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row>
      <dl-col :span="24" class="title-col topRight-col">
        <h2>基本信息</h2>
      </dl-col>
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
      <dl-col :span="24" class="title-col right-col">
        <h2>审批信息</h2>
      </dl-col>
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
      <dl-col :span="24" class="title-col" place="right">
        <h2>合约规划归集列表</h2>
      </dl-col>
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.contractPlanList" size="mini" border stripe header-row-class-name="table-header">
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
              <el-input  v-model="scope.row.contracttax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="规划余额" prop="budbalance">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.budbalance" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="预估变更金额" prop="changetotal">
            <template slot-scope="scope">
              <el-input v-model="scope.row.changetotal" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="预估变更比例%" prop="changerate">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.changerate" readonly />
            </template>
          </el-table-column>
          <el-table-column label="是否超合约规划" prop="isfullBudget">
            <template slot-scope="scope">
              <el-input v-model="scope.row.isfullBudget" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
      <dl-col :span="24" class="right-col">
        <el-button @click="openUrl(form.bizEntityJson.producturl)" type="text" size="mini">业态拆分</el-button>
      </dl-col>
      <dl-col :span="24" class="title-col" place="right">
        <h2>业态拆分信息</h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>项目名称</h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>业态名称</h2>
      </dl-col>
      <dl-col class="title-col" :span="4">
        <h2>合同金额(含税)</h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>合同金额(不含税)</h2>
      </dl-col>
      <dl-col class="title-col" :span="5" place="right">
        <h2>合同金额(进项税额)</h2>
      </dl-col>
      <div v-for="(item, index) in form.bizEntityJson.businessDetailList" :key="index">
        <el-col :span="5">
          <div class="d-min">
            <el-input v-model="item.projname" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="d-min">
            <el-input v-model="item.productname" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="d-min">
            <el-input v-model="item.sharetotaltax" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="d-min">
            <el-input v-model="item.sharetotal" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="d-min right-col">
            <el-input v-model="item.taxtotal" readonly></el-input>
          </div>
        </el-col>
      </div>
      <dl-col :span="24" class="title-col" place="right">
        <h2>合同付款信息</h2>
      </dl-col>
      <dl-col class="title-col" :span="1">
        <h2>序号</h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>款项类型及名称</h2>
      </dl-col>
      <dl-col class="title-col" :span="4">
        <h2>付款比例%</h2>
      </dl-col>
      <dl-col class="title-col" :span="4">
        <h2>付款金额</h2>
      </dl-col>
      <dl-col class="title-col" :span="4">
        <h2>付款日期</h2>
      </dl-col>
      <dl-col class="title-col" :span="6" place="right">
        <h2>付款条件</h2>
      </dl-col>
      <div v-for="(item, index) in form.bizEntityJson.contractPayDetailList" :key="index">
        <el-col :span="1">
          <div class="d-min">
            <el-input v-model="item.rowno" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="d-min">
            <el-input v-model="item.paytype" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="d-min">
            <el-input v-model="item.payrate" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="d-min">
            <el-input v-model="item.payamount" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="d-min">
            <el-input v-model="item.paydate" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="6" class="right-col">
          <div class="d-min">
            <el-input v-model="item.payterms" readonly></el-input>
          </div>
        </el-col>
      </div>
      <dl-col :span="24" class="title-col" place="right">
        <h2>定标信息</h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>中标单位</h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>中标价(含税)</h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>中标价(不含税)</h2>
      </dl-col>
      <dl-col class="title-col" :span="5">
        <h2>中标税率%</h2>
      </dl-col>
      <dl-col class="title-col" :span="4" place="right">
        <h2>中标税额</h2>
      </dl-col>
      <div v-for="(item, index) in form.bizEntityJson.scalingDetailList" :key="index">
        <el-col :span="5">
          <div class="d-min">
            <el-input v-model="item.winunit" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="d-min">
            <el-input v-model="item.wintotaltax" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="d-min">
            <el-input v-model="item.wintotal" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="d-min">
            <el-input v-model="item.wintax" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="4" class="right-col">
          <div class="d-min">
            <el-input v-model="item.wintaxtotal" readonly></el-input>
          </div>
        </el-col>
      </div>
      <dl-col :span="24" class="title-col" place="right">
        <h2>经办人信息</h2>
      </dl-col>
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
    <el-row :gutter="24">
      <dl-col :span="24" class="title-col right-col">
        <h2>附件列表</h2>
      </dl-col>
      <dl-col class="title-col" :span="1">
        <h2>序号</h2>
      </dl-col>
      <dl-col class="title-col" :span="12">
        <h2>附件名称</h2>
      </dl-col>
      <dl-col class="title-col" :span="11" place="right">
        <h2>创建人</h2>
      </dl-col>
      <div v-for="(item, index) in form.bizEntityJson.fileDetailList" :key="index">
        <el-col :span="1">
          <div class="d-min">
            <el-input v-model="item.index" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min">
            <el-input v-model="item.attachmentname" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="11" class="right-col">
          <div class="d-min">
            <el-input v-model="item.uploader" readonly></el-input>
          </div>
        </el-col>
      </div>
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