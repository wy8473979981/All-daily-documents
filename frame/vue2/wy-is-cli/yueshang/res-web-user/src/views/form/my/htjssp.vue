<template>
  <!--  明源-合同结算审批(工程类)-->
  <!--  明源-合同结算审批(材料类)-->
  <!--  明源-合同结算审批(其他类)-->
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
        <el-input v-model="form.bizEntityJson.yfbankaccount" readonly/>
      </dl-col>
      <dl-col :span="12" title="施工单位申报金额(含税)">
        <el-input v-model="form.bizEntityJson.construcReportedFee" readonly/>
      </dl-col>
      <dl-col :span="12" title="地产公司审核金额(含税)" place="right">
        <el-input v-model="form.bizEntityJson.dcApprovalFee" readonly/>
      </dl-col>
      <dl-col :span="12" title="成本中心审核金(含税)">
        <el-input v-model="form.bizEntityJson.cbApprovalFee" readonly/>
      </dl-col>
      <dl-col :span="12" place="right">
        <el-button @click="openUrl(form.bizEntityJson.changeApprovalFeeURL)" type="text" size="mini">修改成本中心审核中心审核金额&业态拆分</el-button>
      </dl-col>
      <dl-col :span="12" title="结算金(含税)">
        <el-input v-model="form.bizEntityJson.settlementAmount" readonly/>
      </dl-col>
      <dl-col :span="12" title="地产合同结算金(含税)" place="right">
        <el-input v-model="form.bizEntityJson.dcSettlementAmount" readonly/>
      </dl-col>
      <dl-col :span="12" title="结算金(不含税)">
        <el-input v-model="form.bizEntityJson.settlementAmountNonTax" readonly/>
      </dl-col>
      <dl-col :span="12" title="地产合同结算(不含税)" place="right">
        <el-input v-model="form.bizEntityJson.dcSettlementAmountNonTax" readonly/>
      </dl-col>
      <dl-col :span="12" title="结算金(进含税)">
        <el-input v-model="form.bizEntityJson.settlementAmountInputTax" readonly/>
      </dl-col>
      <dl-col :span="12" title="地产合同结算(进含税)" place="right">
        <el-input v-model="form.bizEntityJson.dcSettlementAmountInputTax" readonly/>
      </dl-col>
      <dl-col :span="12" title="已确认合同总价(含税)">
        <el-input v-model="form.bizEntityJson.conftotalcontractprice" readonly/>
      </dl-col>
      <dl-col :span="12" title="甲供材金额" place="right">
        <el-input v-model="form.bizEntityJson.JgMaterialsAmount" readonly/>
      </dl-col>
      <dl-col :span="12" title="累计补充合同金(含税)">
        <el-input v-model="form.bizEntityJson.cumSupContractValue" readonly/>
      </dl-col>
      <dl-col :span="12" title="占主合同比例" place="right">
        <el-input v-model="form.bizEntityJson.supContractRate" readonly/>
      </dl-col>
      <dl-col :span="12" title="累计签证金额(含税)">
        <el-input v-model="form.bizEntityJson.cumVisaValue" readonly/>
      </dl-col>
      <dl-col :span="12" title="占主合同比例" place="right">
        <el-input v-model="form.bizEntityJson.visaRate" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同结算偏差率%">
        <el-input v-model="form.bizEntityJson.contractSetDeviationRate" readonly/>
      </dl-col>
      <dl-col :span="12" title="结算送审偏差率%" place="right">
        <el-input v-model="form.bizEntityJson.setConstrDeviationRate" readonly/>
      </dl-col>
      <dl-col :span="12" title="结算方式">
        <el-input v-model="form.bizEntityJson.settleType" readonly/>
      </dl-col>
      <dl-col :span="12" title="结算日期" place="right">
        <el-input v-model="form.bizEntityJson.jsDate" readonly/>
      </dl-col>
      <dl-col :span="24" title="结算内容说明" place="right">
        <el-input v-model="form.bizEntityJson.settlementContents" type="textarea" :autosize="{ minRows: 3}" readonly/>
      </dl-col>
      <dl-col :span="24" title="单方口径及指标说明" :novalue="!form.bizEntityJson.unilateralCaliberIndicators" place="right">
        <el-input v-model="form.bizEntityJson.unilateralCaliberIndicators" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"/>
      </dl-col>
      <dl-col :span="24" class="right-col">
        <el-button @click="openUrl(form.bizEntityJson.indexUrl)" type="text" size="mini">指标数据</el-button>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>合约规划归集列表</h2>
        <i v-if="isShow2" class="el-icon-arrow-up put-icon" @click="isShow2 = !isShow2"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow2 = !isShow2"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow2" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.contractPlanList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="成本科目" prop="subjects" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.subjects" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="规划名称" prop="budgetname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.budgetname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="规划金额(元)" prop="budgetamount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.budgetamount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="结算对应金额(含税)(元)" prop="setCollectionAmount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.setCollectionAmount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="结算对应金额(不含税)(元)" prop="setCollectionAmountNoTax" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.setCollectionAmountNoTax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="结算差额(含税)" prop="settlementBalance" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.settlementBalance" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>业态拆分信息</h2>
        <i v-if="isShow3" class="el-icon-arrow-up put-icon" @click="isShow3 = !isShow3"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow3 = !isShow3"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow3" gutter="24">
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
          <el-table-column label="结算(含税)(元)" prop="sharesetfee" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.sharesetfee" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="结算金额(不含税)(元)" prop="sharesetfeenotax" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.sharesetfeenotax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="结算金额(进项税额)(含税)" prop="sharesetfeeinputtax" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.sharesetfeeinputtax" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>经办人信息</h2>
        <i v-if="isShow4" class="el-icon-arrow-up put-icon" @click="isShow4 = !isShow4"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow4 = !isShow4"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow4" gutter="24">
      <dl-col :span="12" title="合同编号">
        <el-input v-model="form.bizEntityJson.contractcode" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同类别" place="right">
        <el-input v-model="form.bizEntityJson.contracttype" readonly/>
      </dl-col>
      <dl-col :span="12" title="丙方单位">
        <el-input v-model="form.bizEntityJson.bfprovider" readonly/>
      </dl-col>
      <dl-col :span="12" title="银行账户" place="right">
        <el-input v-model="form.bizEntityJson.bfbankaccount" readonly/>
      </dl-col>
      <dl-col :span="12" title="经办人">
        <el-input v-model="form.bizEntityJson.operator" readonly/>
      </dl-col>
      <dl-col :span="12" title="经办人电话" place="right">
        <el-input v-model="form.bizEntityJson.phone" readonly/>
      </dl-col>
      <dl-col :span="24" title="经办部门" place="right">
        <el-input v-model="form.bizEntityJson.operatebu" readonly/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>附件列表</h2>
        <i v-if="isShow5" class="el-icon-arrow-up put-icon" @click="isShow5 = !isShow5"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow5 = !isShow5"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow5" gutter="24">
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
      this.$set(this.form.bizEntityJson, 'fileDetailList', [])
      this.addContractPlanList()
      this.addBusinessDetailList()
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
        subjects: '',
        budgetname: '',
        budgetamount: '',
        setCollectionAmount: '',
        setCollectionAmountNoTax: '',
        settlementBalance: ''
      }
      this.form.bizEntityJson.contractPlanList.push(newData)
    },
    addBusinessDetailList() {
      let newData = {
        projname: '',
        productname: '',
        sharetotaltax: '',
        sharesetfee: '',
        sharesetfeenotax: '',
        sharesetfeeinputtax: ''
      }
      this.form.bizEntityJson.businessDetailList.push(newData)
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