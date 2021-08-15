<template>
  <!--  明源-工程指令单(非造价咨询)-->
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
      <dl-col :span="12" title="指令单编号">
        <el-input v-model="form.bizEntityJson.orderNo" readonly/>
      </dl-col>
      <dl-col :span="12" title="工程名称" place="right">
        <el-input v-model="form.bizEntityJson.alterName" readonly/>
      </dl-col>
      <dl-col :span="12" title="变更类型">
        <el-input v-model="form.bizEntityJson.alterType" readonly/>
      </dl-col>
      <dl-col :span="12" title="关联设计变更单" place="right">
        <el-button @click="openUrl(form.bizEntityJson.changeOderUrl)" type="text" size="mini">关联设计变更单</el-button>
      </dl-col>
      <dl-col :span="12" title="乙方提单编号">
        <el-input v-model="form.bizEntityJson.yfReportCode" readonly/>
      </dl-col>
      <dl-col :span="12" title="申报金额(含税)" place="right">
        <el-input v-model="form.bizEntityJson.taxdeclaredamount" readonly/>
      </dl-col>
      <dl-col :span="12" title="申报金额(不含税)">
        <el-input v-model="form.bizEntityJson.declaredamount" readonly/>
      </dl-col>
      <dl-col :span="12" title="申报金额(进项税)" place="right">
        <el-input v-model="form.bizEntityJson.declaredInputTaxAmount" readonly/>
      </dl-col>
      <dl-col :span="12" title="是否发生费用">
        <el-input v-model="form.bizEntityJson.isCost" readonly/>
      </dl-col>
      <dl-col :span="12" title="是否设计拆改" place="right">
        <el-input v-model="form.bizEntityJson.isInvolved" readonly/>
      </dl-col>
      <dl-col :span="12" title="是否回收">
        <el-input v-model="form.bizEntityJson.recycleOrNot" readonly/>
      </dl-col>
      <dl-col :span="12" title="主旨" place="right">
        <el-input v-model="form.bizEntityJson.gist" readonly/>
      </dl-col>
      <dl-col :span="24" title="事项" place="right">
        <el-input v-model="form.bizEntityJson.items" type="textarea" :autosize="{ minRows: 3}" readonly/>
      </dl-col>
      <dl-col :span="24" title="指令" place="right">
        <el-input v-model="form.bizEntityJson.order" type="textarea" :autosize="{ minRows: 3}" readonly/>
      </dl-col>
      <dl-col :span="24" title="备注" place="right">
        <el-input v-model="form.bizEntityJson.remarks" type="textarea" :autosize="{ minRows: 3}" readonly/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>合同信息</h2>
        <i v-if="isShow2" class="el-icon-arrow-up put-icon" @click="isShow2 = !isShow2"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow2 = !isShow2"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow2" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.contractList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="所属合同" prop="contractname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.contractname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="乙方单位" prop="yfprovidername" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.yfprovidername" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="申报金额(含税)" prop="taxdeclaredamount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.taxdeclaredamount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="申报金额(不含税)" prop="declaredamount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.declaredamount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="申报金额(进项税额)" prop="declaredInputTaxAmount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.declaredInputTaxAmount" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="预计完成时间" prop="declaredInputTaxAmount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.downDate" readonly/>
            </template>
          </el-table-column>
        </el-table>
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
      <dl-col :span="12" title="项目名称">
        <el-input v-model="form.bizEntityJson.projname" readonly/>
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
        <i v-if="isShow4" class="el-icon-arrow-up put-icon" @click="isShow4 = !isShow4"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow4 = !isShow4"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow4" gutter="24">
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
      this.$set(this.form.bizEntityJson, 'contractList', [])
      this.$set(this.form.bizEntityJson, 'fileDetailList', [])
      this.addContractList()
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
    addContractList() {
      let newData = {
        contractname: '',
        yfprovidername: '',
        taxdeclaredamount: '',
        declaredamount: '',
        declaredInputTaxAmount: ''
      }
      this.form.bizEntityJson.contractList.push(newData)
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