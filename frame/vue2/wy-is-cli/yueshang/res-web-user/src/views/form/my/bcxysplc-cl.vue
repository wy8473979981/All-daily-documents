<template>
  <!--  明源-补充协议审批流程(材料类)-->
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
      <dl-col :span="12" title="所属项目">
        <el-input v-model="form.bizEntityJson.projname" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同名称" place="right">
        <el-input v-model="form.bizEntityJson.contractname" readonly/>
      </dl-col>
      <dl-col :span="12" title="原主合同金额(含税)">
        <el-input v-model="form.bizEntityJson.contracttotaltax" readonly/>
      </dl-col>
      <dl-col :span="12" title="调整后合同总(含税)" place="right">
        <el-input v-model="form.bizEntityJson.afcontracttotaltax" readonly/>
      </dl-col>
      <dl-col :span="12" title="本次补充合同(含税)">
        <el-input v-model="form.bizEntityJson.bccontracttotaltax" readonly/>
      </dl-col>
      <dl-col :span="12" title="地产合同补充(含税)" place="right">
        <el-input v-model="form.bizEntityJson.dccontracttotaltax" readonly/>
      </dl-col>
      <dl-col :span="12" title="本次补充(不含税)">
        <el-input v-model="form.bizEntityJson.bccontracttotal" readonly/>
      </dl-col>
      <dl-col :span="12" title="地产合同补充(不含税)" place="right">
        <el-input v-model="form.bizEntityJson.dccontracttotaltax" readonly/>
      </dl-col>
      <dl-col :span="12" title="本次补充(进项税额)">
        <el-input v-model="form.bizEntityJson.bccontracttaxtotal" readonly/>
      </dl-col>
      <dl-col :span="12" title="地产合同补(进项税额)" place="right">
        <el-input v-model="form.bizEntityJson.dccontracttaxtotal" readonly/>
      </dl-col>
      <dl-col :span="12" title="本次补充合同金额比%">
        <el-input v-model="form.bizEntityJson.bccontracttotalrate" readonly/>
      </dl-col>
      <dl-col :span="12" title="补充合同类别" place="right">
        <el-input v-model="form.bizEntityJson.bccontracttype" readonly/>
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
        <el-table ref="table" :data="form.bizEntityJson.detail1" size="mini" border stripe header-row-class-name="table-header">
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
          <el-table-column label="原合同含税金额" prop="contracttotaltax">
            <template slot-scope="scope">
              <el-input v-model="scope.row.contracttotaltax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="原合同不含税金额" prop="contracttotal">
            <template slot-scope="scope">
              <el-input v-model="scope.row.contracttotal" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="原合同税率%" prop="contracttax">
            <template slot-scope="scope">
              <el-input v-model="scope.row.contracttax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="补充合同含税金额" prop="bccontractamounttax">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bccontractamounttax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="补充合同不含税金额" prop="conamount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.conamount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="历史补充合同累计金额" prop="totalbccontractAmount">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.totalbccontractAmount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="变更后合同金额" prop="afmcontractamount">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.afmcontractamount" readonly/>
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
        <el-table ref="table" :data="form.bizEntityJson.detail2" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="项目名称" prop="projectname">
            <template slot-scope="scope">
              <el-input v-model="scope.row.projectname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="业态名称" prop="productname">
            <template slot-scope="scope">
              <el-input v-model="scope.row.productname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="合同金额(含税)" prop="bcsharetotaltax">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bcsharetotaltax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="合同金额(不含税)" prop="bcsharetotal">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bcsharetotal" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="合同金额(进项税额)" prop="bctaxtotal">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bctaxtotal" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="主合同金额(含税)" prop="sharetotaltax">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sharetotaltax" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="主合同金额(不含税)" prop="sharetotal">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sharetotal" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="主合同金额(进项税额)" prop="taxtotal">
            <template slot-scope="scope">
              <el-input v-model="scope.row.taxtotal" readonly/>
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
      <dl-col :span="12" title="补充合同编号">
        <el-input v-model="form.bizEntityJson.bccontractcode" readonly/>
      </dl-col>
      <dl-col :span="12" title="甲方单位" place="right">
        <el-input v-model="form.bizEntityJson.jfprovider" readonly/>
      </dl-col>
      <dl-col :span="12" title="乙方单位">
        <el-input v-model="form.bizEntityJson.yfprovider" readonly/>
      </dl-col>
      <dl-col :span="12" title="银行账户" place="right">
        <el-input v-model="form.bizEntityJson.yfbankaccount" readonly/>
      </dl-col>
      <dl-col :span="12" title="丙方单位">
        <el-input v-model="form.bizEntityJson.bfproviderId" readonly/>
      </dl-col>
      <dl-col :span="12" title="银行账号" place="right">
        <el-input v-model="form.bizEntityJson.bfprovider" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同类别">
        <el-input v-model="form.bizEntityJson.contracttype" readonly/>
      </dl-col>
      <dl-col :span="12" title="是否标准合同" place="right">
        <el-input v-model="form.bizEntityJson.isnormcontract" readonly/>
      </dl-col>
      <dl-col :span="12" title="经办人">
        <el-input v-model="form.bizEntityJson.operator" readonly/>
      </dl-col>
      <dl-col :span="12" title="经办部门" place="right">
        <el-input v-model="form.bizEntityJson.operatebu" readonly/>
      </dl-col>
      <dl-col :span="24" title="经办人电话" place="right">
        <el-input v-model="form.bizEntityJson.phone" readonly/>
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
        <el-table ref="table" :data="form.bizEntityJson.fileDetail" size="mini" border stripe
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
    }
    this.$set(this.form.bizEntityJson, 'oiginatorid', this.userInfo.userid)
    this.$set(this.form.bizEntityJson, 'originator', this.userInfo.username)
    this.$set(this.form.bizEntityJson, 'departmentid', this.userInfo.centerOrgCd)
    this.$set(this.form.bizEntityJson, 'department', this.userInfo.centerOrgName)
    this.$set(this.form.bizEntityJson, 'applyPositionName', this.userInfo.positionName)
  },
  methods: {
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