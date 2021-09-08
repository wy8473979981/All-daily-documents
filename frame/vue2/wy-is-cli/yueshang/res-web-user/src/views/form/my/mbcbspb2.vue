<template>
  <!--  明源-项目方案版目标成本审核表-->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>一、基本信息</h2>
        <i v-if="isShow" class="el-icon-arrow-up put-icon" @click="isShow = !isShow"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow = !isShow"></i>
      </dl-col>
    </el-row>
    <div v-if="isShow">
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="d-min">
            <span>流程序号</span>
            <el-input v-model="form.bizEntityJson.approveNo" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span>发起时间</span>
            <el-date-picker
                v-model="form.bizEntityJson.startDate"
                value-format="yyyy-MM-dd"
                clearable
                readonly
                :disabled="form.bizEntityJson.disabled">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min">
            <span>发起人</span>
            <el-input :class="{'novalue': !form.bizEntityJson.originator, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.originator" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span>发起部门</span>
            <el-input :class="{'novalue': !form.bizEntityJson.department, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.department" @focus="showSearchOrg = true" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col right-col topRight-col" place="relative">
        <h2>二、目标成本信息</h2>
        <i v-if="isShow1" class="el-icon-arrow-up put-icon" @click="isShow1 = !isShow1"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow1 = !isShow1"></i>
      </dl-col>
    </el-row>
    <div v-if="isShow1">
      <el-row :gutter="24">
        <el-col :span="24" class="title-col right-col">
          <h2>基本信息</h2>
        </el-col>
        <el-col :span="12">
          <div class="d-min">
            <span>项目名称</span>
            <el-input v-model="form.bizEntityJson.projname" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span>目标成本总额</span>
            <el-input v-model="form.bizEntityJson.costtotal" readonly></el-input>
            <span class="span-auto" style="width:40px;">元</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min">
            <span>总建筑面积</span>
            <el-input v-model="form.bizEntityJson.buildarea" readonly></el-input>
            <span class="span-auto" style="width:40px;">㎡</span>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span>可售面积</span>
            <el-input  v-model="form.bizEntityJson.saleratio" readonly></el-input>
            <span class="span-auto" style="width:40px;">㎡</span>
          </div>
        </el-col>
        <el-col :span="24" class="title-col right-col">
          <h2>利润率相关信息</h2>
        </el-col>
        <el-col :span="12">
          <div class="d-min">
            <span>销售物业总收入</span>
            <el-input  v-model="form.bizEntityJson.estateincome" readonly></el-input>
            <span class="span-auto" style="width:40px;">亿元</span>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span>平均可售均价</span>
            <el-input  v-model="form.bizEntityJson.averageprice" readonly></el-input>
            <span class="span-auto" style="width:40px;">元/㎡</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min">
            <span>净利润总额</span>
            <el-input  v-model="form.bizEntityJson.profittotal" readonly></el-input>
            <span class="span-auto" style="width:40px;">亿元</span>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span>利润率</span>
            <el-input  v-model="form.bizEntityJson.profitrate" readonly></el-input>
            <span class="span-auto" style="width:40px;">%</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col right-col topRight-col" place="relative">
        <h2>三、业态单方信息列表</h2>
        <i v-if="isShow2" class="el-icon-arrow-up put-icon" @click="isShow2 = !isShow2"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow2 = !isShow2"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow2" :gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.detail1" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="科目名称" prop="subjectname" align="center">
            <template slot-scope="detail">
              <el-input v-if="detail.row.subjectname != '合计'" v-model="detail.row.subjectname" readonly/>
              <span v-else>合计</span>
            </template>
          </el-table-column>
          <el-table-column label="科目金额(不含税)(万元)" prop="subject" align="center">
            <template slot-scope="detail">
              <el-input v-if="detail.row.subject != '合计'" v-model="detail.row.subject" readonly/>
              <span v-else>{{ detail.row.subject }}</span>
            </template>
          </el-table-column>
          <el-table-column label="科目金额(税额)(万元)" prop="taxamount" align="center">
            <template slot-scope="detail">
              <el-input v-if="detail.row.taxamount != '合计'" v-model="detail.row.taxamount" readonly/>
              <span v-else>{{ detail.row.taxamount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="科目金额(税额)(万元)" prop="taxsubject" align="center">
            <template slot-scope="detail">
              <el-input v-if="detail.row.taxsubject != '合计'" v-model="detail.row.taxsubject" readonly/>
              <span v-else>{{ detail.row.taxsubject }}</span>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <el-button @click="openMyPageUrl(form.bizEntityJson.targetcost)" type="text" size="mini">目标成本详情</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col right-col topRight-col" place="relative">
        <h2>四、业态单方信息列表</h2>
        <i v-if="isShow3" class="el-icon-arrow-up put-icon" @click="isShow3 = !isShow3"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow3 = !isShow3"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow3" :gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.detail2" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="业态" prop="formatname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.formatname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="总面积(㎡)" prop="totalAare" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.totalAare" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="总成本(万元)" prop="totalcost" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.totalcost" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="建安面积(㎡)" prop="jaarea" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.jaarea" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="建安单方(元/㎡)" prop="jaunilateral" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.jaunilateral" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="可售面积(㎡)" prop="salearea" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.salearea" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="可售单方(元/㎡)" prop="saleunilateral" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.saleunilateral" readonly/>
            </template>
          </el-table-column>
        </el-table>
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
              <span class="openUrl-p" @click="openMyFileUrl(detail.row.attachmenturl)">{{ detail.row.attachmentname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="uploader" align="center">
            <template slot-scope="detail">
              <span>{{ detail.row.uploader }}</span>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
import Approval from '@/apis/apis/approval';
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
      uploadUrl: '',
      userInfo: {}
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        this.form = val
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)

      this.$set(this.form.bizEntityJson, 'oiginatorid', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'originator', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'departmentid', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'department', this.userInfo.centerOrgName)

      this.$set(this.form.bizEntityJson, 'detail1', [])
      this.$set(this.form.bizEntityJson, 'detail2', [])
      this.addFormatdetails()
      this.addDetails()
      this.sumList()
    }
    this.$set(this.form.bizEntityJson, 'oiginatorid', this.userInfo.userid)
    this.$set(this.form.bizEntityJson, 'originator', this.userInfo.username)
    this.$set(this.form.bizEntityJson, 'departmentid', this.userInfo.centerOrgCd)
    this.$set(this.form.bizEntityJson, 'department', this.userInfo.centerOrgName)
  },
  methods: {
    addDetails () {
      let newData = {
        subjectid: '',
        subjectname: '',
        subject: '',
        taxamount: '',
        taxsubject: '',
        targetcost: ''
      }
      this.form.bizEntityJson.detail1.push(newData)
    },
    sumList() {
      let newData = {
        subjectid: '',
        subjectname: '合计',
        subject: '',
        taxamount: '',
        taxsubject: '',
        targetcost: ''
      }
      this.form.bizEntityJson.detail1.push(newData)
    },
    removeDetails(index) {
      if (this.form.bizEntityJson.detail1.length > 0) {
        this.form.bizEntityJson.detail1.splice(index, 1)
      }
    },
    addFormatdetails() {
      let newData = {
        formatid: '',
        formatname: '',
        totalcost: '',
        jaarea: '',
        jaunilateral: '',
        salearea: '',
        saleunilateral:''
      }
      this.form.bizEntityJson.detail2.push(newData)
    },
    removeFormatdetails(index) {
      if (this.form.bizEntityJson.detail2.length > 0) {
        this.form.bizEntityJson.detail2.splice(index, 1)
      }
    },
    openUrl(index,url) {
      if (url){
        window.open(url, url)
      }
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id

        this.form.bizEntityJson.department = val.text
        this.form.bizEntityJson.departmentid = val.id
      }
      this.showSearchOrg = false
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    handleRemove(file, fileList) {
      let nowfile
      if(file.response) {
        nowfile = file.response.data.fileId
      }else {
        nowfile = file.id + ','
      }
      let fileId = this.form.bizEntityJson.fileId
      this.form.bizEntityJson.fileId = fileId.replace(nowfile,'')
    },
    handleSuccess(response, file, fileList) {
      const fileId = response.data.fileId
      if(!this.form.bizEntityJson.fileId) {
        this.$set(this.form.bizEntityJson,'fileId','')
      }
      this.form.bizEntityJson.fileId += fileId
    },
    onChangeToolFile(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1].raw]
      }
    },
    downLoadFile(file) {
      if(file.showUrl) {
        window.open(file.showUrl, '_blank')
        return
      }
      const fileIds = file.response.data.fileId
      this.$file.loadFiles({fileIds}).then(res => {
        if(res.code ==1 && res.data) {
          const showUrl = res.data.fileShowVoList[0].showUrl
          window.open(showUrl, '_blank')
        }
      })
    },
    // 必填判断
    validate() {

    },
  }
}
</script>
<style type="text/css" lang="scss">
@import 'src/views/form/publicSheet/publicSheet';
</style>