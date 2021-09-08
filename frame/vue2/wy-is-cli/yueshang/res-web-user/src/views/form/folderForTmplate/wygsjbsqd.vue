//宝龙地产/商业/物业公司/04-行政人事/人力资源管理  物业公司加班申请单

<template>
	<div class="public-box">
    <el-row>
      <d-col place="top" title="选择" row="1" :novalue="!form.bizEntityJson.cityCompany && !form.bizEntityJson.propertyManage" :class="{'required': !form.bizEntityJson.disabled}">
        <el-checkbox v-model="form.bizEntityJson.cityCompany">城市公司</el-checkbox>
        <el-checkbox v-model="form.bizEntityJson.propertyManage">物业项目</el-checkbox>
      </d-col>
      <d-col title="中心/公司" row="1" :novalue="!form.bizEntityJson.centerOrgName">
        <el-input v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly></el-input>
      </d-col>
      <d-col title="部门" :novalue="!form.bizEntityJson.deptName">
        <el-input placeholder="" v-model="form.bizEntityJson.deptName" size="mini"></el-input>
      </d-col>
      <d-col place="right" title="今年已加班申请时数">
        <el-input placeholder="" disabled v-model="form.bizEntityJson.totalOvertimeHour" size="mini"></el-input>
      </d-col>
    </el-row>

    <div style="margin-top:20px;position:relative"  v-for="(item,index) in form.bizEntityJson.detailList" :key="index">
      <el-button 
        style="position:absolute;top:5px;right:5px;z-index:222"
        type="danger" 
        v-if="!form.bizEntityJson.disabled"
        @click="remove(index)">
        移除条款
      </el-button>
      <el-row>
        <d-col place="top" title="姓名" :novalue="!item.applyUserName">
          <el-input placeholder="" disabled v-model="item.applyUserName" size="mini"></el-input>
        </d-col>
        <d-col place="top right" title="职位">
          <el-input placeholder="" disabled v-model="item.positionName" size="mini"></el-input>
        </d-col>
        <d-col row="1" place="right" title="职级">
          <el-input placeholder="" v-model="item.positionLevel" size="mini"></el-input>
        </d-col>
      </el-row>
      <el-row>
        <d-col title="加班日期" :novalue="!item.overtimeDate">
           <el-date-picker
            style="width:100%"
            value-format="yyyy-MM-dd"
            :readonly="form.bizEntityJson.disabled"
            v-model="item.overtimeDate"
            type="date"
           >
          </el-date-picker>
        </d-col>
        <d-col place="right" title="加班开始时间" :novalue="!item.fromTime">
          <el-time-picker
            style="width:100%"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            :readonly="form.bizEntityJson.disabled"
            value-format="HH:mm"
            format="HH:mm"
            v-model="item.fromTime">
          </el-time-picker>
        </d-col>
      </el-row>
      <el-row>
       <d-col  title="加班结束时间" :novalue="!item.toTime">
           <el-time-picker
            style="width:100%"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            value-format="HH:mm"
            :readonly="form.bizEntityJson.disabled"
            format="HH:mm"
            v-model="item.toTime">
          </el-time-picker>
        </d-col>
         <el-col :span="12" class="right-col">
          <div class="d-min">
            <span><el-button :disabled="form.bizEntityJson.disabled" @click="getTotalHour(item)">计算时数</el-button></span>
            <div class="d-red" :class="{'novalue': item.totalHour === undefined}">
              <el-input v-model="item.totalHour" disabled></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <d-col row="1" title="加班类型" :novalue="!item.overworkType">
          <el-radio-group v-model="item.overworkType" @change="changeWorkType(item.overworkType,item)">
            <el-radio class="line-radio" :label="'1'">休息日加班</el-radio>
            <el-radio class="line-radio" :label="'2'">法定假日加班</el-radio>
            <el-radio class="line-radio" :label="'3'">延时加班</el-radio>
          </el-radio-group>
        </d-col>
        <d-col row="1" title="补贴方式" :novalue="!item.subsidyType">
          <el-radio-group v-model="item.subsidyType">
            <el-radio class="line-radio" :label="'1'">安排调休</el-radio>
            <el-radio class="line-radio" :label="'2'" :disabled="item.overworkType && item.overworkType != 2">支付工资</el-radio>
          </el-radio-group>
        </d-col>
        <d-col row="1" title="加班原因" :novalue="!item.reason">
          <el-input type="textarea" rows="5" v-model="item.reason" size="mini"></el-input>
        </d-col>
      </el-row>
    </div>
    
    <el-row style="margin-top: 10px !important;text-align: center" v-if="!form.bizEntityJson.disabled">
      <el-button @click="addData">增加条款</el-button>
    </el-row>
     <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
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
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson,'detailList',[]);
      this.form.bizEntityJson.detailList.push({
        applyUserCd: this.userInfo.userid,
        applyUserName: this.userInfo.username,
        positionName: this.userInfo.positionName,
        positionCd: this.userInfo.positionCd,
        positionLevel: this.userInfo.permissionLevelName,
      })
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'deptName', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'orgCd', this.userInfo.orgCd)
      this.overtimeCountApi()
    }
  },
  methods: {
     overtimeCountApi() {
      const params = {userCode: this.userInfo.userid}
      this.$approval.overtimeCountApi(params).then(res => {
        if(res.code == 1 && res.data){
          const data = res.data || 0;
          // this.form.bizEntityJson.totalOvertimeHour = res.data;
          this.$set(this.form.bizEntityJson,'totalOvertimeHour',data)
        } else {
          this.$set(this.form.bizEntityJson,'totalOvertimeHour',0)
        }
      }).catch(err => {
        this.$set(this.form.bizEntityJson,'totalOvertimeHour',0)
      });
    },
    addData() {
      this.form.bizEntityJson.detailList.push({
        applyUserCd: this.userInfo.userid,
        applyUserName: this.userInfo.username,
        positionName: this.userInfo.positionName,
        positionCd: this.userInfo.positionCd,
        positionLevel: this.userInfo.permissionLevelName,
      })
    },
    remove(index) {
      this.form.bizEntityJson.detailList.splice(index,1)
    },
    changeWorkType(val,item) {
      console.log(val,item)
      if(val != 2) {
        this.$set(item,'subsidyType','1')
      }
    },
    getTotalHour(item) {
      var startTime = item.fromTime;
      var endTime = item.toTime;
      if(startTime&&endTime){
        var startTimeHH=startTime.substring(0,2);
        var endTimeHH=endTime.substring(0,2);
        var startTimeSS=startTime.substring(3,5);
        var endTimeSS=endTime.substring(3,5);
        var noonStart=12*1000*60*60;
        var noonEnd=13*1000*60*60;
        var nightStart=18*1000*60*60;
        var nightEnd=19*1000*60*60;
        if(endTimeHH=="00"){
            endTimeHH=24;
        }
        startTimeHH=startTimeHH*1000*60*60;
        endTimeHH=endTimeHH*1000*60*60;
        startTimeSS=startTimeSS*1000*60;
        endTimeSS=endTimeSS*1000*60;
        var hours=(endTimeHH+endTimeSS)-(startTimeHH+startTimeSS);
        hours=hours/1000/60/60;
        if(hours>0){
            if((startTimeHH+startTimeSS)<=noonStart&&(endTimeHH+endTimeSS)>=noonEnd){
                hours=hours-1;
            }
            if((startTimeHH+startTimeSS)<=nightStart&&(endTimeHH+endTimeSS)>=nightEnd){
                hours=hours-1;
            }
            this.$set(item,'totalHour',parseInt(hours));
        }else{
          this.$alert('填写时间有误', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          this.$set(item,'totalHour',undefined);
        }
      }
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
  }
}
</script>>