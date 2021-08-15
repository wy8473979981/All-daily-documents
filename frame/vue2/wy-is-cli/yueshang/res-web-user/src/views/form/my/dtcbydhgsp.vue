<template>
  <!--  明源-动态成本月度回顾审批-->
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
        <h2>二、目标成本信息</h2>
        <i v-if="isShow1" class="el-icon-arrow-up put-icon" @click="isShow1 = !isShow1"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow1 = !isShow1"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow1" gutter="24">
      <dl-col :span="12" title="上月动态成本(万元)">
        <el-input v-model="form.bizEntityJson.lastmonthCost"/>
      </dl-col>
      <dl-col :span="12" title="月度偏差金额(万元)" place="right">
        <el-date-picker v-model="form.bizEntityJson.lastdeviation"/>
      </dl-col>
      <dl-col :span="12" title="本月动态成本(万元)">
        <el-input v-model="form.bizEntityJson.thismonthCost"/>
      </dl-col>
      <dl-col :span="12" title="月度偏差率(%)" place="right">
        <el-date-picker v-model="form.bizEntityJson.deviationrate"/>
      </dl-col>
      <dl-col :span="12" title="最新版目标成本(万元)">
        <el-input v-model="form.bizEntityJson.currentCost"/>
      </dl-col>
      <dl-col :span="12" title="考核版成本偏差率(%)" place="right">
        <el-date-picker v-model="form.bizEntityJson.assessdeviation"/>
      </dl-col>
      <dl-col :span="24" title="动态成本回顾偏差说明" place="right">
        <el-input v-model="form.bizEntityJson.deviationnote" type="textarea" :autosize="{ minRows: 3}" readonly/>
      </dl-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <el-button @click="openUrl(form.bizEntityJson.costurl)" type="text" size="mini">查看动态成本回顾报告</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col right-col topRight-col" place="relative">
        <h2>三、动态成本回顾</h2>
        <i v-if="isShow2" class="el-icon-arrow-up put-icon" @click="isShow2 = !isShow2"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow2 = !isShow2"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow2">
      <dl-col :span="24" class="title-col right-col">
        <h2>动态成本回顾-科目</h2>
      </dl-col>
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.dynamiccostList" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="科目名称" prop="subjectname" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.subjectname != '合计'" v-model="scope.row.subjectname" readonly/>
              <span v-else>合计</span>
            </template>
          </el-table-column>
          <el-table-column label="目标成本(方案+调整)(万元)" prop="targetcost" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.targetcost != '合计'" v-model="scope.row.targetcost" readonly/>
              <span v-else>{{ scope.row.targetcost }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上月动态成本(万元)" prop="lastdynamiccost" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.lastdynamiccost != '合计'" v-model="scope.row.lastdynamiccost" readonly/>
              <span v-else>{{ scope.row.lastdynamiccost }}</span>
            </template>
          </el-table-column>
          <el-table-column label="本月动态成本(万元)" prop="thisdynamiccost" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.thisdynamiccost != '合计'" v-model="scope.row.thisdynamiccost" readonly/>
              <span v-else>{{ scope.row.thisdynamiccost }}</span>
            </template>
          </el-table-column>
          <el-table-column label="偏差说明" prop="deviationreason" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.deviationreason != '合计'" v-model="scope.row.deviationreason" readonly/>
              <span v-else>{{ scope.row.deviationreason }}</span>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
      <dl-col :span="24" class="title-col right-col">
        <h2>动态成本回顾-业态</h2>
      </dl-col>
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.dynamicFormatsList" size="mini" border stripe
                  header-row-class-name="table-header">
          <el-table-column label="业态" prop="productname" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.productname" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="总成本(万元)" prop="totalcost" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.totalcost" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="目标建安成本(元/㎡)" prop="jAtarget" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.jAtarget" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="动态建安成本(元/㎡)" prop="jAdynamic" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.jAdynamic" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="目标可售成本(元/㎡)" prop="saletarget" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.saletarget" readonly/>
            </template>
          </el-table-column>
          <el-table-column label="动态可售成本(元/㎡)" prop="saledynamic" align="center">
            <template slot-scope="detail">
              <el-input v-model="detail.row.saledynamic" readonly/>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <dl-col :span="24" class="title-col right-col topRight-col" place="relative">
        <h2>四、附件</h2>
        <i v-if="isShow3" class="el-icon-arrow-up put-icon" @click="isShow3 = !isShow3"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow3 = !isShow3"></i>
      </dl-col>
    </el-row>
    <el-row v-if="isShow3" gutter="24">
      <dl-col :span="24" title="文件" place="right">
        <many-files :form="form" value="fileId" />
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
      this.$set(this.form.bizEntityJson, 'dynamiccostList', [])
      this.$set(this.form.bizEntityJson, 'dynamicFormatsList', [])
      this.addDynamiccostList()
      this.addSumList()
      this.addDynamicFormatsList()
    }
    this.$set(this.form.bizEntityJson, 'oiginatorid', this.userInfo.userid)
    this.$set(this.form.bizEntityJson, 'originator', this.userInfo.username)
    this.$set(this.form.bizEntityJson, 'departmentid', this.userInfo.centerOrgCd)
    this.$set(this.form.bizEntityJson, 'department', this.userInfo.centerOrgName)
  },
  methods: {
    addDynamiccostList() {
      let newData = {
        subjectid: '',
        subjectname: '',
        targetcost: '',
        lastdynamiccost: '',
        thisdynamiccost: '',
        deviationreason: ''
      }
      this.form.bizEntityJson.dynamiccostList.push(newData)
    },
    addSumList() {
      let newData = {
        subjectid: '',
        subjectname: '合计',
        targetcost: '',
        lastdynamiccost: '',
        thisdynamiccost: '',
        deviationreason: ''
      }
      this.form.bizEntityJson.dynamiccostList.push(newData)
    },
    addDynamicFormatsList() {
      let newData = {
        productId: '',
        productname: '',
        totalcost: '',
        jAtarget: '',
        jAdynamic: '',
        saletarget: '',
        saledynamic: ''
      }
      this.form.bizEntityJson.dynamicFormatsList.push(newData)
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