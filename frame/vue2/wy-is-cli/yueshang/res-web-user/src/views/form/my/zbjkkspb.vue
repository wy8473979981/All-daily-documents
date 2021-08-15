<template>
  <!--  明源-质保金扣款审批表-->
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
      <dl-col :span="24" title="查看扣款单据" class="right-col">
        <el-button @click="openUrl(form.bizEntityJson.deductionUrl)" type="text" size="mini">查看扣款单据</el-button>
      </dl-col>
      <dl-col :span="12" title="扣款编号" >
        <el-input v-model="form.bizEntityJson.deductionno" readonly/>
      </dl-col>
      <dl-col :span="12" title="扣款主题" place="right">
        <el-input v-model="form.bizEntityJson.subject" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同名称">
        <el-input v-model="form.bizEntityJson.contractname" readonly/>
      </dl-col>
      <dl-col :span="12" title="合同编号" place="right">
        <el-input v-model="form.bizEntityJson.contractcode" readonly/>
      </dl-col>
      <dl-col :span="12" title="所属公司">
        <el-input v-model="form.bizEntityJson.company" readonly/>
      </dl-col>
      <dl-col :span="12" title="所属项目"  place="right">
        <el-input v-model="form.bizEntityJson.projname" readonly/>
      </dl-col>
      <dl-col :span="12" title="经办人">
        <el-input v-model="form.bizEntityJson.operator" readonly/>
      </dl-col>
      <dl-col :span="12" title="经办部门" place="right">
        <el-input v-model="form.bizEntityJson.operatebu" readonly/>
      </dl-col>
      <dl-col :span="12" title="扣款类型">
        <el-input v-model="form.bizEntityJson.deductionstype" readonly/>
      </dl-col>
      <dl-col :span="12" title="扣款金额" place="right">
        <el-input v-model="form.bizEntityJson.deductionamount" readonly/>
      </dl-col>
      <dl-col :span="24" title="扣款说明" place="right">
        <el-input v-model="form.bizEntityJson.exemptionNotes" type="textarea" :autosize="{ minRows: 3}" readonly/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>扣款明细列表</h2>
        <i v-if="isShow2" class="el-icon-arrow-up put-icon" @click="isShow2 = !isShow2"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow2 = !isShow2"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow2" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.deductionDetailsList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="序号" prop="rowno" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.rowno" readonly />
            </template>
          </el-table-column>
          <el-table-column label="扣款名称" prop="deductionname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.deductionname" readonly />
            </template>
          </el-table-column>
          <el-table-column label="扣款金额" prop="deductionamount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.deductionamount" readonly />
            </template>
          </el-table-column>
          <el-table-column label="税率" prop="taxRate" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.taxRate" readonly />
            </template>
          </el-table-column>
          <el-table-column label="不含税金额" prop="notaxamount" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.notaxamount" readonly />
            </template>
          </el-table-column>
          <el-table-column label="扣款说明" prop="exemptionNotes" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.exemptionNotes" readonly />
            </template>
          </el-table-column>
        </el-table>
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
      this.$set(this.form.bizEntityJson, 'deductionDetailsList', [])
      this.$set(this.form.bizEntityJson, 'fileDetailList', [])
      this.addDeductionDetailsList()
      this.addFileDetailList()
    }
    this.$set(this.form.bizEntityJson, 'oiginatorid', this.userInfo.userid)
    this.$set(this.form.bizEntityJson, 'originator', this.userInfo.username)
    this.$set(this.form.bizEntityJson, 'departmentid', this.userInfo.centerOrgCd)
    this.$set(this.form.bizEntityJson, 'department', this.userInfo.centerOrgName)
    this.$set(this.form.bizEntityJson, 'applyPositionName', this.userInfo.positionName)
  },
  methods: {
    addDeductionDetailsList() {
      let newData = {
        deductionname: '',
        deductionamount: '',
        taxRate: '',
        notaxamount: '',
        exemptionNotes: ''
      }
      this.form.bizEntityJson.deductionDetailsList.push(newData)
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