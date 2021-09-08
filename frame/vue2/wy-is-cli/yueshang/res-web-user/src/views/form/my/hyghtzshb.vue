<template>
  <!--  明源-合约规划调整审核表-->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row gutter="24">
      <dl-col :span="24" class="title-col topRight-col right-col" place="relative">
        <h2>一、基本信息</h2>
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
      <dl-col :span="24" class="title-col right-col topRight-col" place="relative">
        <h2>二、合约规划信息</h2>
        <i v-if="isShow1" class="el-icon-arrow-up put-icon" @click="isShow1 = !isShow1"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow1 = !isShow1"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow1" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.detail1" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="序号" prop="rowno" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.rowno != '合计'">{{ detail.$index + 1 }}</span>
              <span v-else>合计</span>
            </template>
          </el-table-column>
          <el-table-column label="调整类型" prop="adjusttype" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.adjusttype != '合计'" v-model="scope.row.adjusttype" readonly/>
              <span v-else>{{ scope.row.adjusttype }}</span>
            </template>
          </el-table-column>
          <el-table-column label="调整前合约规划名称" prop="beBudgetname" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.beBudgetname != '合计'" v-model="scope.row.beBudgetname" readonly/>
              <span v-else>{{ scope.row.beBudgetname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="调整前金额" prop="subjectName" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.beBudgetamount != '合计'" v-model="scope.row.beBudgetamount" readonly/>
              <span v-else>{{ scope.row.beBudgetamount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="调整后合约规划名称" prop="projectAmount" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.afBudgetname != '合计'" v-model="scope.row.afBudgetname" readonly/>
              <span v-else>{{ scope.row.afBudgetname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="调整后金额" prop="projectAmount" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.afBudgetamount != '合计'" v-model="scope.row.afBudgetamount" readonly/>
              <span v-else>{{ scope.row.afBudgetamount }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <el-button @click="openUrl(form.bizEntityJson.budgeturl)" type="text" size="mini">查看合约规划数据</el-button>
          </div>
        </el-col>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>附件信息</h2>
        <i v-if="isShow4" class="el-icon-arrow-up put-icon" @click="isShow4 = !isShow4"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow4 = !isShow4"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow4" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.fileDetail" size="mini" border stripe
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
      this.$set(this.form.bizEntityJson, 'budgetList', [])
      this.addBudgetList()
      this.addSumList()
    }
    this.$set(this.form.bizEntityJson, 'oiginatorid', this.userInfo.userid)
    this.$set(this.form.bizEntityJson, 'originator', this.userInfo.username)
    this.$set(this.form.bizEntityJson, 'departmentid', this.userInfo.centerOrgCd)
    this.$set(this.form.bizEntityJson, 'department', this.userInfo.centerOrgName)
  },
  methods: {
    addSumList() {
      let newData = {
        rowno: '合计',
        adjusttype: '',
        beBudgetId: '',
        beBudgetname: '',
        beBudgetamount: '',
        afBudgetId: '',
        afBudgetname: '',
        afBudgetamount: ''
      }
      this.form.bizEntityJson.budgetList.push(newData)
    },
    addBudgetList() {
      let newData = {
        rowno: '',
        adjusttype: '',
        beBudgetId: '',
        beBudgetname: '',
        beBudgetamount: '',
        afBudgetId: '',
        afBudgetname: '',
        afBudgetamount: ''
      }
      this.form.bizEntityJson.budgetList.push(newData)
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