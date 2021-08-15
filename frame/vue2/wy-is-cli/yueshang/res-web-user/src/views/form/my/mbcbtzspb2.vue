<template>
  <!--  明源-项目目标成本调整审核表-->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row gutter="24">
      <dl-col :span="24" class="title-col topRight-col" place="relative">
        <h2>一、基本信息</h2>
        <i v-if="isShow" class="el-icon-arrow-up put-icon" @click="isShow = !isShow"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow = !isShow"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow">
      <dl-col :span="12" title="流程序号">
        <el-input v-model="form.bizEntityJson.approveNo"/>
      </dl-col>
      <dl-col :span="12" title="发起时间" place="right">
        <el-date-picker v-model="form.bizEntityJson.startDate" value-format="yyyy-MM-dd" clearable/>
      </dl-col>
      <dl-col :span="12" title="发起人" :novalue="!form.bizEntityJson.originator">
        <el-input v-model="form.bizEntityJson.originator" @focus="showSearchUser = true" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"/>
      </dl-col>
      <dl-col :span="12" title="发起部门" place="right" :novalue="!form.bizEntityJson.department">
        <el-input v-model="form.bizEntityJson.department" @focus="showSearchOrg = true" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"/>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col right-col topRight-col" place="relative">
        <h2>二、目标成本调整管控指标</h2>
        <i v-if="isShow1" class="el-icon-arrow-up put-icon" @click="isShow1 = !isShow1"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow1 = !isShow1"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow1" gutter="24">
      <dl-col :span="24" class="title-col right-col">
        <h2>基本信息</h2>
      </dl-col>
      <dl-col :span="12" title="项目名称">
        <el-input v-model="form.bizEntityJson.projname" readonly/>
      </dl-col>
      <dl-col :span="12" title="申请日期" place="right">
        <el-input v-model="form.bizEntityJson.applydate" readonly/>
      </dl-col>
      <dl-col :span="12" title="调整前目标成本">
        <el-input v-model="form.bizEntityJson.betargetcost" readonly/>
      </dl-col>
      <dl-col :span="12" title="调整金额" place="right">
        <el-input v-model="form.bizEntityJson.adjustamount" readonly/>
      </dl-col>
      <dl-col :span="12" title="调整后目标成本">
        <el-input v-model="form.bizEntityJson.aftargetcost" readonly/>
      </dl-col>
      <dl-col :span="12" title="调整总比例%" place="right">
        <el-input v-model="form.bizEntityJson.adjustratio" readonly/>
      </dl-col>
      <dl-col :span="24" title="调整原因" place="right">
        <el-input v-model="form.bizEntityJson.adjustnote" type="textarea" :autosize="{ minRows: 3}" readonly/>
      </dl-col>
      <dl-col :span="24" class="title-col right-col">
        <h2>利润率相关信息</h2>
      </dl-col>
      <el-col :span="24" class="title-col right-col">
        <div class="d-min">
          <span></span>
          <p style="width: calc(50% - 160px); text-align: center">调整前</p>
          <p style="width: 50%; text-align: center;">调整后</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>销售物业总收入</span>
          <el-input v-model="form.bizEntityJson.beestateincome" readonly></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.beprofittotal" readonly></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>净利润总额</span>
          <el-input v-model="form.bizEntityJson.beprofitrate" readonly></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.afprofittotal" readonly></el-input>
          <span class="span-auto" style="width:40px;">万元</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>平均可售均价</span>
          <el-input v-model="form.bizEntityJson.beaverageprice" readonly></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.afaverageprice" readonly></el-input>
          <span class="span-auto" style="width:40px;">元/㎡</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>利润率</span>
          <el-input v-model="form.bizEntityJson.beprofitrate" readonly></el-input>
          <span class="span-auto" style="width:40px;">%</span>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <el-input v-model="form.bizEntityJson.afprofitrate" readonly></el-input>
          <span class="span-auto" style="width:40px;">%</span>
        </div>
      </el-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col right-col topRight-col" place="relative">
        <h2>三、目标成本调整明细</h2>
        <i v-if="isShow2" class="el-icon-arrow-up put-icon" @click="isShow2 = !isShow2"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow2 = !isShow2"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow2" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.detail1" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="科目名称" prop="subjectname" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.subjectname != '合计'" readonly v-model="scope.row.subjectname"/>
              <span v-else>合计</span>
            </template>
          </el-table-column>
          <el-table-column label="调整前" align="center">
            <el-table-column label="科目金额(不含税)(元)" prop="sceneConfigName" align="center">
              <template slot-scope="scope">
                <el-input v-if="scope.row.subjectname != '合计'" readonly v-model="scope.row.besubjectsum"/>
                <span v-else>{{ scope.row.besubjectsum }}</span>
              </template>
            </el-table-column>
            <el-table-column label="科目金额(含税)(元)" prop="centerName" align="center">
              <template slot-scope="scope">
                <el-input v-if="scope.row.subjectname != '合计'" readonly v-model="scope.row.besubjectsumrate"/>
                <span v-else>{{ scope.row.besubjectsumrate }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="调整后" align="center">
            <el-table-column label="科目金额(不含税)(元)" prop="subjectName" align="center">
              <template slot-scope="scope">
                <el-input v-if="scope.row.subjectname != '合计'" readonly v-model="scope.row.afsubjectsum"/>
                <span v-else>{{ scope.row.afsubjectsum }}</span>
              </template>
            </el-table-column>
            <el-table-column label="科目金额(含税)(元)" prop="projectAmount" align="center">
              <template slot-scope="scope">
                <el-input v-if="scope.row.subjectname != '合计'" readonly v-model="scope.row.afsubjectsumrate"/>
                <span v-else>{{ scope.row.afsubjectsumrate }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <el-button @click="openUrl(form.bizEntityJson.targetcost)" type="text" size="mini">目标成本详情</el-button>
          </div>
        </el-col>
      </dl-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col right-col topRight-col" place="relative">
        <h2>四、业态单方信息列表</h2>
        <i v-if="isShow3" class="el-icon-arrow-up put-icon" @click="isShow3 = !isShow3"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow3 = !isShow3"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow3" gutter="24">
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.detail2" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="序号" prop="rowno" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.rowno" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="业态名称" prop="formatname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.formatname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="调整前目标成本(元)" prop="totalcost" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.totalcost" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="调整后目标成本(元)" prop="jaarea" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.jaarea" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="差额(元)" prop="jaunilateral" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.jaunilateral" readonly/>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <el-button @click="openUrl(form.bizEntityJson.targetcost)" type="text" size="mini">目标成本详情</el-button>
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
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
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
      this.$set(this.form.bizEntityJson, 'details', [])
      this.$set(this.form.bizEntityJson, 'formatdetails', [])
      this.addFormatdetails()
      this.addList()
      this.sumList()
    }
    this.$set(this.form.bizEntityJson, 'oiginatorid', this.userInfo.userid)
    this.$set(this.form.bizEntityJson, 'originator', this.userInfo.username)
    this.$set(this.form.bizEntityJson, 'departmentid', this.userInfo.centerOrgCd)
    this.$set(this.form.bizEntityJson, 'department', this.userInfo.centerOrgName)
  },
  methods: {
    addList() {
      let newData = {
        subjectid: '',
        subjectname: '',
        besubjectsum: '',
        besubjectsumrate: '',
        afsubjectsum: '',
        afsubjectsumrate: '',
        targetcostdetails: '',
      }
      this.form.bizEntityJson.details.push(newData)
    },
    sumList() {
      let newData = {
        subjectid: '',
        subjectname: '合计',
        besubjectsum: '',
        besubjectsumrate: '',
        afsubjectsum: '',
        afsubjectsumrate: '',
        targetcostdetails: '',
      }
      this.form.bizEntityJson.details.push(newData)
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
      this.form.bizEntityJson.formatdetails.push(newData)
    },
    removeFormatdetails(index) {
      if (this.form.bizEntityJson.formatdetails.length > 0) {
        this.form.bizEntityJson.formatdetails.splice(index, 1)
      }
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    openUrl(url) {
      if (url){
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