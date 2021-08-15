//商业集团请假单

<template>
	<div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <table class="border-table nobg" style="margin-bottom:10px">
      <tr>
        <td :rowspan="3" class="title" style="width:160px;position:relative"><span style="position:absolute;top:50%;height:36px;width:100px;margin-top:-18px;">选择</span></td>
        <td :class="{novalue: !form.bizEntityJson.dayType,required: !form.bizEntityJson.disabled}">
          <el-radio-group v-model="form.bizEntityJson.dayType">
            <el-radio class="line-radio" :label="'1'">短期（3天及以内）</el-radio>
            <el-radio class="line-radio" :label="'2'">长期（3天以上）</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td :class="{novalue: !form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2,required: !form.bizEntityJson.disabled}">
          <d-radio-group-boolean
              v-model="form.bizEntityJson" 
              :nameList="[{label:'商业集团',name:'positionLevel1'},
                          {label:'区域公司',name:'positionLevel2'},
                        ]"
          />
        </td>
      </tr>
      <tr v-if="form.bizEntityJson.positionLevel1 || form.bizEntityJson.positionLevel1 === undefined">
        <td :class="{novalue: !form.bizEntityJson.positionLevel3 && !form.bizEntityJson.positionLevel11 && !form.bizEntityJson.positionLevel4 && !form.bizEntityJson.positionLevel5 && !form.bizEntityJson.positionLevel7,required: !form.bizEntityJson.disabled}">
          <d-radio-group-boolean
            v-model="form.bizEntityJson"
            :nameList="[{label:'集团总裁',name:'positionLevel3'},
                        {label:'副总裁',name:'positionLevel11'},
                        {label:'助理总裁/中心负责人',name:'positionLevel4'},
                        {label:'部门负责人',name:'positionLevel5'},
                        {label:'其他人员',name:'positionLevel7'},
                      ]"
          />
        </td>
      </tr>
      <tr v-if="form.bizEntityJson.positionLevel2">
        <td :class="{novalue: !form.bizEntityJson.positionLevel8 && !form.bizEntityJson.positionLevel12 && !form.bizEntityJson.positionLevel13 && !form.bizEntityJson.positionLevel10,required: !form.bizEntityJson.disabled}">
          <d-radio-group-boolean
            v-model="form.bizEntityJson"
            :nameList="[{label:'总经理',name:'positionLevel8'},
                        {label:'部门负责人(双线)',name:'positionLevel12'},
                        {label:'部门负责人(非双线)',name:'positionLevel13'},
                        {label:'其他人员',name:'positionLevel10'},
                      ]"
          />
        </td>
      </tr>
    </table>
    
    <el-row>
      <d-col place="top" title="中心/公司">
        <el-input :class="{novalue: !form.bizEntityJson.center, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.center" @focus="showSearchOrg = true" readonly></el-input>
      </d-col>
      <d-col place="top right" title="部门">
        <el-input :class="{novalue: !form.bizEntityJson.center, 'required': !form.bizEntityJson.disabled}" placeholder="" v-model="form.bizEntityJson.dept" size="mini"></el-input>
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
      <d-col title="入职日期" place="right">
        <el-date-picker
          :class="{'novalue': !form.bizEntityJson.joinDate, 'required': !form.bizEntityJson.disabled}"
          style="width:100%"
          value-format="yyyy-MM-dd"
          :readonly="form.bizEntityJson.disabled"
          v-model="form.bizEntityJson.joinDate"
          type="date"
          >
        </el-date-picker>
      </d-col>
      <d-col title="当前可用年假">
        <el-input placeholder="" disabled v-model="form.bizEntityJson.avaliableDay" size="mini"></el-input>
      </d-col>
      <d-col title="当前可用全薪病假" place="right">
        <el-input placeholder="" disabled v-model="form.bizEntityJson.avaLeaveHour" size="mini"></el-input>
      </d-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="4"><div class="d-min title">假期类别</div></el-col>
      <el-col :span="4"><div class="d-min title">单位</div></el-col>
      <el-col :span="4"><div class="d-min title">由</div></el-col>
      <el-col :span="4"><div class="d-min title">至</div></el-col>
      <el-col :span="4"><div class="d-min title">合计请假时间</div></el-col>
      <el-col :span="4" class="right-col"><div class="d-min title">操作</div></el-col>
    </el-row>
    <el-row :gutter="24" v-for="(property,index) in form.bizEntityJson.otherProperties" :key="index">
      <el-col v-show="property.showValue" :span="24" class="right-col" style="color:red">
        <div class="d-min">
          <p style="color:red;line-height:36px;padding-left:20px">{{property.showValue}}</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="d-min" :class="{novalue:!property.holidayType, 'required': !form.bizEntityJson.disabled}">
          <el-select
            :disabled="form.bizEntityJson.disabled"
            v-model="property.holidayType"
            @change="holidayTypeChange"
            filterable
            remote
            reserve-keyword
            placeholder=""
            >
            <el-option
              v-for="item in jqList"
              :key="item.value"
              :label="item.key"
              :value="item.value">
              <el-row>
                <el-col @click.native="selectHolidayType(item,index)">{{item.key}}</el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="d-min" :class="{novalue: !property.unit, 'required': !form.bizEntityJson.disabled}">
          <p style="padding-left:20px;line-height:36px">{{property.unit | filterUnit}}</p>
        </div></el-col>
      <el-col :span="4">
        <div class="d-min" :class="{novalue: !property.beginDate, 'required': !form.bizEntityJson.disabled}">
          <el-date-picker
            style="width:100%"
            v-model="property.beginDate"
            :readonly="form.bizEntityJson.disabled"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH"
            :default-value="Date.now()"
            :default-time="getTimeNow()"
            @change="countTotalDays(property)"
            placeholder="">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="d-min" :class="{novalue: !property.endDate, 'required': !form.bizEntityJson.disabled}">
          <el-date-picker
            style="width:100%"
            v-model="property.endDate"
            :readonly="form.bizEntityJson.disabled"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH"
            :default-value="Date.now()"
            :default-time="getTimeNow()"
            @change="countTotalDays(property)"
            placeholder="">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="d-min" :class="{novalue: !property.totalDays, 'required': !form.bizEntityJson.disabled}">
          <el-input v-model="property.totalDays" disabled></el-input>
        </div>
      </el-col>
      <el-col :span="4" class="right-col">
        <div class="d-min">
          <i class="el-icon-error" style="color:#cd5b5b;font-size: 22px;margin-left:20px;margin-top:5px;cursor:pointer" @click="remove(index)" v-if="form.bizEntityJson.otherProperties.length > 1 && !form.bizEntityJson.disabled"></i>
        </div>
      </el-col>
    </el-row>
    <el-row class="padding-row" style="text-align:center" v-if="!form.bizEntityJson.disabled">
        <el-button @click="addData" style="background:#0072bb;color:#fff">增加假期</el-button>
    </el-row>

    <el-row class="padding-row">
      <d-col place="top" row="1" title="请假期间联系地址/电话">
        <el-input :class="{novalue: !form.bizEntityJson.contactWay,required: !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.contactWay"></el-input>
      </d-col>
      <d-col place="right" row="1" title="请假原因">
        <el-input :class="{novalue:!form.bizEntityJson.holidayReason, required: !form.bizEntityJson.disabled}" type="textarea" :rows="3" autosize v-model="form.bizEntityJson.holidayReason"></el-input>
      </d-col>
      <d-col place="right" row="1" title="其他说明">
        <el-input type="textarea" :rows="3" autosize v-model="form.bizEntityJson.otherRemark"></el-input>
      </d-col>
    </el-row>

    <el-row v-if="showUpload" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>审批材料</h2>
      </el-col>
      <el-col :span="24" class="right-col textBtn-col">
        <div class="d-min">
          <span>相关材料</span>
          <div class="d-red" :class="{novalue:!form.bizEntityJson.fileId, required: !form.bizEntityJson.disabled}">
            <el-upload
              name="fileName"
              :headers="{'Authorization': userInfo.token}"
              :accept="$action"
              :action="uploadUrl"
              :show-file-list="false"
              :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.bizId}"
              :before-remove="beforeRemoveGlobal"
              :before-upload="beforeUploadGlobal"
              :on-success="handleSuccess"
              :on-error="handleErrorGlobal"
              :on-preview="downLoadFileGlobal"
              :on-change="onChangeToolFile"
              :file-list="form.allEntityFileIds.fileId"
              style="display: flex;">
              <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">上传附件</el-button>
            </el-upload>
            <p v-if="fileDetail" class="file-p">
              <span class="upload-title">
                <i class="el-icon-document"></i>
                <span class="fj-title">{{ fileDetail.name }}</span>
              </span>
              <span class="upload-del">
                <i class="el-icon-close" @click="delFile(1)"></i>
              </span>
            </p>
            <p v-else-if="$route.query.id && form.allEntityFileIds.fileId[0]" class="file-p">
              <span class="upload-title">
                <i class="el-icon-document"></i>
                <span class="fj-title">{{ form.allEntityFileIds.fileId[0].name }}</span>
              </span>
              <span v-if="!form.bizEntityJson.disabled" class="upload-del">
                <i class="el-icon-close" @click="delFile(2)"></i>
              </span>
            </p>
          </div>
        </div>
      </el-col>
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
      showUpload: false,
      jqList: [],
      fileDetail: null,
      uploadUrl,
      fileList: fileList || [],
    }
  },
  watch: {
    'form.bizEntityJson.positionLevel1' (val) {
      console.log(val)
      if (!val) {
        this.$set(this.form.bizEntityJson, 'positionLevel3', false)
        this.$set(this.form.bizEntityJson, 'positionLevel11', false)
        this.$set(this.form.bizEntityJson, 'positionLevel4', false)
        this.$set(this.form.bizEntityJson, 'positionLevel5', false)
        this.$set(this.form.bizEntityJson, 'positionLevel7', false)
      }
    },
    'form.bizEntityJson.positionLevel2' (val) {
      console.log(val)
      if (!val) {
        this.$set(this.form.bizEntityJson, 'positionLevel8', false)
        this.$set(this.form.bizEntityJson, 'positionLevel12', false)
        this.$set(this.form.bizEntityJson, 'positionLevel13', false)
        this.$set(this.form.bizEntityJson, 'positionLevel10', false)
      }
    }
  },
  created() {
    this.getMapHolidayType();
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson,'otherProperties',[]);
      this.form.bizEntityJson.otherProperties.push({
        holidayType: '',
        unit: '',
        beginDate: '',
        endDate: '',
        totalDays: '',
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
      this.$set(this.form.bizEntityJson, 'joinDate', this.userInfo.attendWorkDate)
      setTimeout(() => {
        this.checkCanUserVacation();
        this.getAvaLeaveHour();
      }, 100)
    } else {
      if (this.form.bizEntityJson.otherProperties.length == 0) return
      this.form.bizEntityJson.otherProperties.forEach(item => {
        if (item.holidayType == 3 || item.holidayType == 4 || item.holidayType == 8 || item.holidayType == 9) {
          this.showUpload = true
        }
      })
    }
  },
  filters: {
    filterUnit(val) {
      const arr = ['天','小时']
      if(val) {
        return arr[val]
      }
    }
  },
  methods: {
    //格式化文本输入框输入的数字
    formatVal(srcEle) {
      console.log(srcEle)
      var v = (srcEle.totalDays + '').trim();
      if (!parseFloat(v)&&v!='0') {
        srcEle.totalDays = ''
      } else {
        srcEle.totalDays = Number(v).toFixed(2);
      }
      this.checkVacationDayBlur(srcEle);
    },
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
      // if (mm < 10)
      // clock += '0';
      // clock += mm + ":";
      // if (ss < 10)
      // clock += '0';
      // clock += ss; 
      return clock;
    },
    changeType(val) {
      if(val == 1) {
        this.$set(this.form.bizEntityJson,'positionLevel7',false)
        this.$set(this.form.bizEntityJson,'positionLevel8',false)
      }
    },
    // 获取假期类型下拉
    getMapHolidayType() {
      this.$approval.getMapHolidayType().then(res => {
        if(res.code == 1 && res.data){
          const data = res.data;
          let arr = [];
          Object.keys(data).forEach(key => {
            arr.push({key: data[key], value: key})
          })
          this.jqList = arr;
        } else {
          this.jqList = []
        }
      })
    },
    // 获取年假可用时间
    checkCanUserVacation() {
      console.log(this.form.bizEntityJson.userCd || this.userInfo.userid,'年假参数')
      this.$approval.checkCanUserVacation({easNo: this.form.bizEntityJson.userCd || this.userInfo.userid}).then(res => {
        if(res.code == 1 && res.data){
          let result = eval("(" + res.data + ")");
          console.log(result, '年假')
          if('success' == result['success']) {
            this.$set(this.form.bizEntityJson,'curVacationId',result['vacationId'])
            this.$set(this.form.bizEntityJson,'avaliableDay',result['avaliableDay'])
            this.$set(this.form.bizEntityJson,'earliestUseDate',result['earliestUseDate'])
          } else {
            if('have_no_vacation' == result['error_no_date']) {
              // alert("您当前没有可用假期！");
            }
            this.$set(this.form.bizEntityJson,'curVacationId','0')
            this.$set(this.form.bizEntityJson,'avaliableDay','0')
            this.$set(this.form.bizEntityJson,'earliestUseDate','')
          }
          this.checkVacationDayBlur();
        }
      })
    },
    // 获取病假可用时间
    getAvaLeaveHour() {
       console.log(this.form.bizEntityJson.joinDate || this.userInfo.attendWorkDate,'病假参数')
      const params = {
        entryDate: this.form.bizEntityJson.joinDate || this.userInfo.attendWorkDate,
        userCd: this.userInfo.userid
      }
      this.$approval.getAvaLeaveHour(params).then(res => {
        if(res.code == 1 && res.data){
          const data = Number(res.data).toFixed(1);
          this.$set(this.form.bizEntityJson,'avaLeaveHour',data)
        } else {
           this.$set(this.form.bizEntityJson,'avaLeaveHour','0')
        }
      })
    },
    holidayTypeChange(val) {
      console.log(val)
      if (val == 3 || val == 4 || val == 8 || val == 9) {
        this.showUpload = true
      } else {
        this.form.bizEntityJson.otherProperties.forEach(item => {
          if (item.holidayType != 3 || item.holidayType != 4 || item.holidayType != 8 || item.holidayType != 9) {
            this.showUpload = false
            this.form.bizEntityJson.fileId = ''
          }
        })
      }
    },
    selectHolidayType(ele,index) {
      console.log(index) 
      var showValue = "";
      switch(ele.value){
          //空值
        case "":
          showValue = "";
          break;
          //年假
        case "1":
          showValue = "连续工龄10年以上员工第一次请年假，请上传“工龄证明”，如社保证明、劳动手册等";
          break;
          //婚假
        case "2":
          showValue = "请上传“结婚证明”";
          break;
          //产假
        case "3":
          showValue = "请上传由计生部门出具的相关证明，如准生证，再生育子女告知书";
          break;
          //丧假
        case "4":
          showValue = "请上传相关证明，具体可与人事部门沟通";
          break;
          //事假
        case "6":
          showValue = "";
          break;
          //其它
        case "7":
          showValue = "晚育护理假，请上传由计生部门出具的相关证明，如准生证，再生育子女告知书等及子女的“出生医学证明”";
          break;
          //全薪病假
        case "8":
          showValue = "请上传病历卡和区县区以上医院开具的“建议休息证明”";
          break;
          //超额病假
        case "9":
          showValue = "请上传病历卡和区县区以上医院开具的“建议休息证明”";
          break;
          //产检
        case "10":
          showValue = "产检请上传区县级以上医院开具的“建议休息证明”和病历卡";
          break;
        case "11":
          showValue = "哺乳假请上传子女的“出生医学证明”";
          break;
        default:
          showValue = "";
      }
      if(!ele.value) {

      } else {
        this.form.bizEntityJson.otherProperties[index].showValue = showValue;
        if(ele.value==6 || ele.value==8 || ele.value==9 || ele.value==10 || ele.value==11) {
          this.$alert(showValue+"<p>当前计算单位为：小时</p><p>请仔细核实您的请假时间：具体到小时，谢谢！</p>", '提示', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString:true,
            callback: action => {}
          });
          this.form.bizEntityJson.otherProperties[index].unit = '1';
          this.form.bizEntityJson.otherProperties[index].totalDays = '';
        } else {
          this.form.bizEntityJson.otherProperties[index].unit = '0';
          this.form.bizEntityJson.otherProperties[index].totalDays = '';
          this.$alert(showValue+"<p>当前计算单位为：天</p><p>请仔细核实您的请假时间：具体到小时，谢谢！</p>", '提示', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString:true,
            callback: action => {}
          });
        }
      }
    },
    // 检测病假时间是否足够
    checkSickLeaveHour(property){
      var holidayTypeVal = property.holidayType;
      if(holidayTypeVal==8){
        var vacaDays = 0;
        const arr = this.form.bizEntityJson.otherProperties;
        arr.forEach(e => {
          if(e.holidayType == 8) {
            vacaDays += e.totalDays;
          }
        })
        if(vacaDays > parseFloat(this.form.bizEntityJson.avaLeaveHour)) {
          this.$alert("最多可用全薪病假" + this.form.bizEntityJson.avaLeaveHour + "小时！", '提示', {
            confirmButtonText: '确定',
            callback: action => {
              property.totalDays = ''
            }
          });
        }
      }
    },
     // 输入后检测年假对应条款的可请假时间
    checkVacationDayBlur(property) {
      // 只在选择年假时校验
      if(property && property.holidayType != 1) {
        return
      }
      var vacaDays = 0;
      const arr = this.form.bizEntityJson.otherProperties;
      arr.forEach(e => {
        if(e.holidayType == 1) {
          vacaDays += e.totalDays;
        }
      })

      if(parseFloat(vacaDays) > parseFloat(this.form.bizEntityJson.avaliableDay)) {
        this.$alert("最多可以请假：" + this.form.bizEntityJson.avaliableDay + "天！", '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString:true,
          callback: action => {
            property.totalDays = ''
          }
        });
      }
    },
    // 检测年假对应条款的可请假时间
    checkVacationDay(property) {
      // 只在选择年假时校验
      if(property && property.holidayType != 1) {
        return
      }
      var vacaDays = 0;
      const arr = this.form.bizEntityJson.otherProperties;
      arr.forEach(e => {
        if(e.holidayType == 1) {
          vacaDays += Number(e.totalDays);
        }
      })

      if(parseFloat(vacaDays) > parseFloat(this.form.bizEntityJson.avaliableDay)) {
        this.$alert("可用年假：" + this.form.bizEntityJson.avaliableDay + "天！"+ "<p>本次申请年假："+ vacaDays + "天 </p>" + "<p>建议驳回！</p>", '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString:true,
          callback: action => {}
        });
        if(property) {
          property.totalDays = ''
        }
      }
    },
    // 计算时间判断
    countTotalDays(property) {
      var holidayTypeVal = property.holidayType;
      if(holidayTypeVal==6 || holidayTypeVal==8 || holidayTypeVal==9 || holidayTypeVal==10 || holidayTypeVal==11){
        this.countHours(property);
      }else{
        this.countDays(property);
      }
      this.checkSickLeaveHour(property);
    },
    // 计算天数
    countDays(property) {
      var fromDate = property.beginDate;
      var toDate = property.endDate;
      if(!fromDate || !toDate) {
        return;
      }
      var fArray = fromDate.split(" ")[0].split("-");
      var tArray = toDate.split(" ")[0].split("-");
      if(fArray[0]==tArray[0] && fArray[1]==tArray[1]&&fArray[2]==tArray[2]){
          if((toDate.split(" ")[1].slice(0,2)-fromDate.split(" ")[1].slice(0,2))<5){
              property.totalDays = "0.5";
              this.checkVacationDayblur(property);
              return;
          }
      }
      var fDate = new Date(fArray[0],fArray[1]-1,fArray[2]);
      var tDate = new Date(tArray[0],tArray[1]-1,tArray[2]);
      if(tDate.getTime()<fDate.getTime()) {
        return;
      }
      var day = Math.abs(tDate.getTime()-fDate.getTime())/1000/60/60/24+1;
      property.totalDays = day.toFixed(1);
      // 检测“合计请假时间” todo
      this.checkVacationDayBlur(property);
      // if(property.holidayType == 1) {
      //   this.checkVacationDay(property);
      // }
    },
    // 计算小时
    countHours(property) {
      var fromDate = property.beginDate;
      var toDate = property.endDate;
      if(!fromDate || !toDate) {
        return;
      }
      var fHour = fromDate.split(" ");
      var tHour = toDate.split(" ");
      var fArray = fHour[0].split("-");
      var tArray = tHour[0].split("-");
      var fDate = new Date(fArray[0],fArray[1]-1,fArray[2]);
      var tDate = new Date(tArray[0],tArray[1]-1,tArray[2]);
      console.log(fDate.getTime(),tDate.getTime())
      if(tDate.getTime() < fDate.getTime()) {
        return;
      }
      //得到假期跨天天数
      var hour = Math.abs(tDate.getTime() - fDate.getTime())/1000/60/60/24;
      //取小时值
      var fromHour = fHour[1].slice(0,2);
      var toHour = tHour[1].slice(0,2);
      //起始小时从9点开始
      if(fromHour < 9){
        fromHour = 9;
      }
      //结束小时从18点结束
      if(toHour > 18){
        toHour = 18;
      }
      //如果包含了12点~13点，减去1小时
      if(fromHour <= 12 && toHour >= 13){
        toHour = toHour - 1;
      }
      hour = hour * 8 + (toHour - fromHour);
      if(hour < 0){
          return;
      }
      property.totalDays = hour.toFixed(1);
      console.log(hour)
    },
    // 查询可用假期接口
    overtimeCountApi() {
      const params = {userCode: this.userInfo.userid}
      this.$approval.overtimeCountApi(params).then(res => {
        if(res.code == 1 && res.data){
          const data = res.data || 0;
          this.$set(this.form.bizEntityJson,'totalOvertimeHour',data)
        } else {
          this.$set(this.form.bizEntityJson,'totalOvertimeHour',0)
        }
      }).catch(err => {
        this.$set(this.form.bizEntityJson,'totalOvertimeHour',0)
      });
    },
    addData() {
      this.form.bizEntityJson.otherProperties.push({
        holidayType: '',
        unit: '',
        beginDate: '',
        endDate: '',
        totalDays: '',
      })
    },
    remove(index) {
      this.form.bizEntityJson.otherProperties.splice(index,1)
      if (this.form.bizEntityJson.otherProperties.length == 0) return
      this.form.bizEntityJson.otherProperties.forEach(item => {
        if (item.holidayType != 3 || item.holidayType != 4 || item.holidayType != 8 || item.holidayType != 9) {
          this.showUpload = false
          this.form.bizEntityJson.fileId = ''
        }
      })
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
      // 重新获取年假
      this.checkCanUserVacation();
    },
    delFile(index) {
      if (index == 1) {
        this.fileDetail = ''
        this.form.bizEntityJson.fileId = ''
      } else {
        this.form.allEntityFileIds.fileId = []
        this.form.bizEntityJson.fileId = ''
      }
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file, 1)()
    },
    onChangeToolFile(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1].raw]
      }
    },
  }
}
</script>>