<template>
  <!--  明源-履约保证金额退回审批单-->
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
        <el-date-picker v-model="form.bizEntityJson.startDate" value-format="yyyy-MM-dd" clearable readonly />
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
      <dl-col :span="12" title="申请主题" >
        <el-input v-model="form.bizEntityJson.subject" readonly/>
      </dl-col>
      <dl-col :span="12" title="申请编号" place="right">
        <el-input v-model="form.bizEntityJson.applicationNo" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同编号">
        <el-input v-model="form.bizEntityJson.projname" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同名称" place="right">
        <el-input v-model="form.bizEntityJson.applicationNo" readonly/>
      </dl-col>
      <dl-col :span="12" title="付款单位">
        <el-input v-model="form.bizEntityJson.paymentunit" readonly/>
      </dl-col>
      <dl-col :span="12" title="供应商名称"  place="right">
        <el-input v-model="form.bizEntityJson.providerName" readonly/>
      </dl-col>
      <dl-col :span="12" title="其中本次申请金额A">
        <el-input v-model="form.bizEntityJson.applyamount" readonly/>
      </dl-col>
      <dl-col :span="12" title="保证金金额" place="right">
        <el-input v-model="form.bizEntityJson.performBail" readonly/>
      </dl-col>
      <dl-col :span="12" title="其中应扣工期违约金B">
        <el-input v-model="form.bizEntityJson.penaltyfordelay" readonly/>
      </dl-col>
      <dl-col :span="12" title="工期延误说明" place="right">
        <el-input v-model="form.bizEntityJson.scheduledelayinfo" readonly/>
      </dl-col>
      <dl-col :span="12" title="其中应扣工期违约金C">
        <el-input v-model="form.bizEntityJson.penaltyfordelay" readonly/>
      </dl-col>
      <dl-col :span="12" title="质量验收说明" place="right">
        <el-input v-model="form.bizEntityJson.qualityacceptanceinfo" readonly/>
      </dl-col>
      <dl-col :span="12"  title="其中应扣工期违约金D">
        <el-input v-model="form.bizEntityJson.penaltyforother" readonly/>
      </dl-col>
      <dl-col :span="12" title="其他违约说明" place="right">
        <el-input v-model="form.bizEntityJson.otherbreachinfo" readonly/>
      </dl-col>
      <dl-col :span="24" title="应退金额A-B-C-D" place="right">
        <el-input v-model="form.bizEntityJson.refamount" readonly/>
      </dl-col>
      <dl-col :span="12"  title="开户银行">
        <el-input v-model="form.bizEntityJson.bank" readonly/>
      </dl-col>
      <dl-col :span="12" title="银行账户" place="right">
        <el-input v-model="form.bizEntityJson.bankaccount" readonly/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>附件列表</h2>
        <i v-if="isShow3" class="el-icon-arrow-up put-icon" @click="isShow3 = !isShow3"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow3 = !isShow3"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow3" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.fileDetailList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="序号" prop="index" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.index" readonly />
            </template>
          </el-table-column>
          <el-table-column label="附件名称" prop="attachmentname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.attachmentname" readonly />
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="uploader" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.uploader" readonly />
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