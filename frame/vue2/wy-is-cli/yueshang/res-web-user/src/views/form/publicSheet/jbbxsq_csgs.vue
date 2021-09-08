//城市公司加班补申请单

<template>
  <div class="public-box">
    <table class="border-table nobg" style="margin-bottom:10px">
      <tr>
        <td class="title" style="width:160px;position:relative">
        </td>
        <td  :class="{novalue: !form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3 && !form.bizEntityJson.company4 && !form.bizEntityJson.company7 && !form.bizEntityJson.company6,required: !form.bizEntityJson.disabled}"> <d-radio-group
            v-model="form.bizEntityJson"
            :nameList="[{label:'事业一部',name:'company1'},
                        {label:'事业二部',name:'company2'},
                        {label:'置地',name:'company3'},
                        {label:'浙江事业部',name:'company4'},
                        {label:'安徽事业部',name:'company7'},
                        {label:'广东事业部',name:'company6'},
                      ]"
        /></td>
      </tr>
    </table>

    <el-row>
      <d-col place="top" title="中心/公司">
        <el-input :class="{novalue: !form.bizEntityJson.center, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.center" @focus="showSearchOrg = true" readonly></el-input>
      </d-col>
      <d-col place="top right" title="部门">
        <el-input :class="{novalue: !form.bizEntityJson.dept, 'required': !form.bizEntityJson.disabled}" placeholder="" v-model="form.bizEntityJson.dept" size="mini"></el-input>
      </d-col>
      <d-col title="姓名">
        <el-input :class="{'novalue': !form.bizEntityJson.userName, 'required': !form.bizEntityJson.disabled}" placeholder="" readonly v-model="form.bizEntityJson.userName" size="mini" @focus="showSearchUser = true"></el-input>
      </d-col>
      <d-col title="职位" place="right">
        <el-input :class="{'novalue': !form.bizEntityJson.position, 'required': !form.bizEntityJson.disabled}" placeholder="" v-model="form.bizEntityJson.position" size="mini"></el-input>
      </d-col>
      <d-col title="职级">
        <el-input :class="{'novalue': !form.bizEntityJson.positionLevel, 'required': !form.bizEntityJson.disabled}" placeholder="" v-model="form.bizEntityJson.positionLevel" size="mini"></el-input>
      </d-col>
      <d-col title="加班时数" place="right">
        <el-input placeholder="" disabled v-model="form.bizEntityJson.totalOvertimeHour" size="mini"></el-input>
      </d-col>
      <d-col title="可用时数">
        <el-input placeholder="" disabled v-model="form.bizEntityJson.totalAvailableHour" size="mini"></el-input>
      </d-col>
      <d-col title="已休时数" place="right">
        <el-input placeholder="" disabled v-model="form.bizEntityJson.totalVacationHour" size="mini"></el-input>
      </d-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="5"><div class="d-min title">补休日期</div></el-col>
      <el-col :span="5"><div class="d-min title">从(时)</div></el-col>
      <el-col :span="5"><div class="d-min title">至(时)</div></el-col>
      <el-col :span="5"><div class="d-min title">时数</div></el-col>
      <el-col :span="4" class="right-col"><div class="d-min title">操作</div></el-col>
    </el-row>
    <el-row :gutter="24" v-for="(property,index) in form.bizEntityJson.resetDetails" :key="index">
      <el-col v-show="property.showValue" :span="24" class="right-col" style="color:red">
        <div class="d-min">
          <p style="color:red;line-height:36px;padding-left:20px">{{property.showValue}}</p>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min" :class="{novalue: !property.resetDate, 'required': !form.bizEntityJson.disabled}">
          <el-date-picker
              style="width:100%"
              v-model="property.resetDate"
              :readonly="form.bizEntityJson.disabled"
              type="datetime"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              :default-value="Date.now()"
              :default-time="getTimeNow()"
              placeholder="">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min" :class="{novalue: !property.resetStartHour, 'required': !form.bizEntityJson.disabled}">
          <el-time-select v-model="property.resetStartHour"
                          :picker-options="{start: '09:00', step: '01:00', end: '18:00'}"
                          :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                          :disabled="form.bizEntityJson.disabled"
                          @change="countHours(property)"/>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min" :class="{novalue: !property.resetEndHour, 'required': !form.bizEntityJson.disabled}">
          <el-time-select v-model="property.resetEndHour"
                          :picker-options="{start: '09:00', step: '01:00', end: '18:00'}"
                          :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                          :disabled="form.bizEntityJson.disabled"
                          @change="countHours(property)"/>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d-min" :class="{novalue: !property.restHours, 'required': !form.bizEntityJson.disabled}">
          <el-input v-model="property.restHours" disabled></el-input>
        </div>
      </el-col>
      <el-col :span="4" class="right-col">
        <div class="d-min">
          <i class="el-icon-error" style="color:#cd5b5b;font-size: 22px;margin-left:20px;margin-top:5px;cursor:pointer" @click="remove(index)" v-if="form.bizEntityJson.resetDetails.length > 1 && !form.bizEntityJson.disabled"></i>
        </div>
      </el-col>
    </el-row>
    <el-row class="padding-row" style="text-align:center" v-if="!form.bizEntityJson.disabled">
      <el-button @click="addData" style="background:#0072bb;color:#fff">增加补休</el-button>
    </el-row>

    <el-row class="padding-row">
      <d-col place="top,right" row="1" title="请假原因">
        <el-input :class="{novalue:!form.bizEntityJson.restReasonDesc, required: !form.bizEntityJson.disabled}" type="textarea" :rows="3" autosize v-model="form.bizEntityJson.restReasonDesc"></el-input>
      </d-col>
    </el-row>

    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerCd" @close="closeSearhOrg"></search-org>
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"></search-user>
  </div>
</template>
<script>
const data = {};
const uploadUrl = '';
export default {
  props: ['data'],
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        console.log(val)
        this.form = val;
      }
    }
  },
  data() {
    return {
      form: data,
      uploadUrl,
      // 以下为表单本身所需数据
      showSearchOrg: false,
      showSearchUser: false,
      jqList: []
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    console.log('-------------------', this.userInfo)
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson,'resetDetails',[]);
      this.form.bizEntityJson.resetDetails.push({
        resetDate: '',
        resetStartHour: '',
        resetEndHour: '',
        restHours: '',
      })
      this.$set(this.form.bizEntityJson, 'center', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'dept', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'deptCd', this.userInfo.orgCd)
      this.$set(this.form.bizEntityJson, 'userName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'userCd', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'position', this.userInfo.positionName)
      this.$set(this.form.bizEntityJson, 'positionCd', this.userInfo.positionCd)
      this.$set(this.form.bizEntityJson, 'positionLevel', this.userInfo.permissionLevelName)
      setTimeout(() => {
        this.overtimeCountInfoApi();
      }, 100)
    }
  },
  filters: {
  },
  methods: {
    // 获取当前时间
    getTimeNow() {
      var now = new Date();
      var hh = now.getHours();            //时
      var mm = now.getMinutes();          //分
      var ss = now.getSeconds();          //分
      var clock = '';
      if(hh < 10)
        clock += "0";
      clock += hh + ":00:00";
      return clock;
    },
    checkHour(property){
      var sumHours = 0;
      const arr = this.form.bizEntityJson.resetDetails;
      arr.forEach(e => {
        sumHours += e.restHours;
      })
      if(parseFloat(sumHours) > parseFloat(this.form.bizEntityJson.totalAvailableHour)) {
        this.$alert("最多可用补休时数为:" + this.form.bizEntityJson.totalAvailableHour + "！", '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString:true,
          callback: action => {
            if(property != null){
              property.restHours = 0;
            }
          }
        });
      }
    },
    // 计算小时
    countHours(property) {
      var startTime = property.resetStartHour;
      var endTime = property.resetEndHour;
      if(!startTime || !endTime) {
        return;
      }
      var fTime = startTime.split(":")[0];
      var tTime = endTime.split(":")[0];
      //如果包含了12点~13点，减去1小时
      if(fTime <= 12 && tTime >= 13){
        tTime= tTime - 1;
      }
      var hour = tTime-fTime
      if(hour < 0){
        return;
      }
      if(hour < 4){
        this.$alert("补休最小为4小时且必须为整点!", '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString:true,
          callback: action => {}
        });
        property.restHours = "";
        return;
      }
      property.restHours = hour.toFixed(1);
      this.checkHour(property);
    },
    // 获取加班时长、可用已用时长接口
    overtimeCountInfoApi() {
      const params = {userCode: this.form.bizEntityJson.userCd || this.userInfo.userid}
      this.$approval.overtimeCountInfoApi(params).then(res => {
        if(res.code == 1 && res.data){
          const data = res.data;
          this.$set(this.form.bizEntityJson,'totalOvertimeHour',data.totalOvertimeHour)
          this.$set(this.form.bizEntityJson,'totalAvailableHour',data.totalAvailableHour)
          this.$set(this.form.bizEntityJson,'totalVacationHour',data.totalVacationHour)
        } else {
          this.$set(this.form.bizEntityJson,'totalOvertimeHour',0)
          this.$set(this.form.bizEntityJson,'totalAvailableHour',0)
          this.$set(this.form.bizEntityJson,'totalVacationHour',0)
        }
      }).catch(err => {
        this.$set(this.form.bizEntityJson,'totalOvertimeHour',0)
        this.$set(this.form.bizEntityJson,'totalAvailableHour',0)
        this.$set(this.form.bizEntityJson,'totalVacationHour',0)
      });
    },
    addData() {
      this.form.bizEntityJson.resetDetails.push({
        resetDate: '',
        resetStartHour: '',
        resetEndHour: '',
        restHours: '',
      })
    },
    remove(index) {
      this.form.bizEntityJson.resetDetails.splice(index,1)
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.center = val.text
        this.form.bizEntityJson.centerCd = val.id
      }
      this.showSearchOrg = false
    },
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.userName = val.userName
        this.form.bizEntityJson.userCd = val.userCd
      }
      this.showSearchUser = false;
      // 重新获取加班时长
      this.overtimeCountInfoApi();
      this.form.bizEntityJson.resetDetails = []
    },
    validate() {
      if(this.form.bizEntityJson.resetDetails.length==0) return this.$message.error("请增加补休信息！"), false
      if(this.checkHour(null)) return this.$message.error("最多可用补休时数为:" + this.form.bizEntityJson.totalAvailableHour + "！"), false
    },
  }
}
</script>