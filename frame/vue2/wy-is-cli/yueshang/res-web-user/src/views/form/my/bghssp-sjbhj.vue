<template>
  <!--  明源-变更核算审批(设计费核价)-->
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
      <dl-col :span="12" title="核价类型">
        <el-input v-model="form.bizEntityJson.pricingtype" readonly/>
      </dl-col>
      <dl-col :span="12" title="项目名称" place="right">
        <el-input v-model="form.bizEntityJson.projname" readonly/>
      </dl-col>
      <dl-col :span="12" title="核价主题">
        <el-input v-model="form.bizEntityJson.subject" readonly/>
      </dl-col>
      <dl-col :span="12" title="核价单编号" place="right">
        <el-input v-model="form.bizEntityJson.nuclearNo" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同名称">
        <el-input v-model="form.bizEntityJson.dcApprovalFee" readonly/>
      </dl-col>
      <dl-col :span="12" title="乙方单位" place="right">
        <el-input v-model="form.bizEntityJson.dcApprovalFee" readonly/>
      </dl-col>
      <dl-col :span="12" title="设计变更审核表单号">
        <el-button @click="openUrl(form.bizEntityJson.billsurl)" type="text" size="mini">设计签证</el-button>
      </dl-col>
      <dl-col :span="12" title="变更内容" place="right">
        <el-input v-model="form.bizEntityJson.dcApprovalFee" readonly/>
      </dl-col>
      <dl-col :span="24" place="right">
        <el-radio-group v-model="form.bizEntityJson.isInFactoring">
          <el-radio label="1">累计增加金额/原合同金额≤5%</el-radio>
          <el-radio label="2">5%≤累计增加金额/原合同金额≤20%</el-radio>
          <el-radio label="3">20%≤累计增加金额/原合同金额</el-radio>
        </el-radio-group>
      </dl-col>
      <dl-col :span="24" place="right">
        <el-radio-group v-model="form.bizEntityJson.isInFactoring444">
          <el-radio label="1">招商/销售原因业态改变</el-radio>
          <el-radio label="2">时长定位改变</el-radio>
          <el-radio label="3">设计范围调整</el-radio>
          <el-radio label="4">设计条件改变</el-radio>
          <el-radio label="5">产品设计风格调整</el-radio>
          <el-radio label="6">法律法规调整</el-radio>
          <el-radio label="7">其他</el-radio>
        </el-radio-group>
      </dl-col>
      <dl-col :span="12" title="已确认合同总价(含税)(元)">
        <el-input v-model="form.bizEntityJson.conftotalcontractprice" readonly/>
      </dl-col>
      <dl-col :span="12" title="已发生变更比例(%)(含税)" place="right">
        <el-input v-model="form.bizEntityJson.proportionChanged" readonly/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>其中</h2>
        <i v-if="isShow2" class="el-icon-arrow-up put-icon" @click="isShow2 = !isShow2"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow2 = !isShow2"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow2" gutter="24">
      <dl-col :span="24"  title="合同原价(含税)(元)" place="right">
        <el-input v-model="form.bizEntityJson.orContractPrice" readonly/>
      </dl-col>
      <dl-col :span="24" title="补充协议(含税)(元)" place="right">
        <el-input v-model="form.bizEntityJson.supplementaryPrice" readonly/>
      </dl-col>
      <dl-col :span="24" title="累计已确定变更费用(含税)(元)" place="right">
        <el-input v-model="form.bizEntityJson.accumulatedAuditFee" readonly/>
      </dl-col>
      <dl-col :span="12" title="已累计变更预估费用(含税)(元)">
        <el-input v-model="form.bizEntityJson.ygAlterationRatio" readonly/>
      </dl-col>
      <dl-col :span="12" title="已预估变更比例(%)含税" place="right">
        <el-input v-model="form.bizEntityJson.operatebu" readonly/>
      </dl-col>
      <dl-col :span="12" title="设计单位上报费用(含税)(元)">
        <el-input v-model="form.bizEntityJson.desReportedFee" readonly/>
      </dl-col>
      <dl-col :span="12" title="事业部成本审核费用(含税)(元)" place="right">
        <el-input v-model="form.bizEntityJson.sybApprovalFee" readonly/>
      </dl-col>
      <dl-col :span="12" title="审定费用(含税)(元)">
        <el-input v-model="form.bizEntityJson.approvalFee" readonly/>
      </dl-col>
      <dl-col :span="12" title="本次变更比例(%)" place="right">
        <el-input v-model="form.bizEntityJson.alterationRatio" readonly/>
      </dl-col>
      <dl-col :span="12" title="本次设计费增加后预估总合同价(含税)(元)">
        <el-input v-model="form.bizEntityJson.ygContractPrice" readonly/>
      </dl-col>
      <dl-col :span="12" title="本次设计费增加后累计变更比例(含税)" place="right">
        <el-input v-model="form.bizEntityJson.cumChangeRatio" readonly/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>经办人信息</h2>
        <i v-if="isShow3" class="el-icon-arrow-up put-icon" @click="isShow3 = !isShow3"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow3 = !isShow3"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow3" gutter="24">
      <dl-col :span="12" title="经办人">
        <el-input v-model="form.bizEntityJson.phone" readonly/>
      </dl-col>
      <dl-col :span="12" title="经办部门" place="right">
        <el-input v-model="form.bizEntityJson.phone" readonly/>
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
      this.$set(this.form.bizEntityJson, 'fileDetailList', [])
      this.addFileDetailList()
    }
    this.$set(this.form.bizEntityJson, 'oiginatorid', this.userInfo.userid)
    this.$set(this.form.bizEntityJson, 'originator', this.userInfo.username)
    this.$set(this.form.bizEntityJson, 'departmentid', this.userInfo.centerOrgCd)
    this.$set(this.form.bizEntityJson, 'department', this.userInfo.centerOrgName)
    this.$set(this.form.bizEntityJson, 'applyPositionName', this.userInfo.positionName)
  },
  methods: {
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