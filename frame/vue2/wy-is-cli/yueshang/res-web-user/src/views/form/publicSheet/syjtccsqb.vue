<template>
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row v-if="processCode=='SYGS_XZRL_FWGL_FHB'|| processCode=='BLSY_XZRL_RLZY_150'">
      <dl-col :span="24" title="选择" :novalue="form.bizEntityJson.positionLevel7 != 'true' && form.bizEntityJson.positionLevel1 != 'true'">
          <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'商业集团',name:'positionLevel7'},
                        {label:'区域公司',name:'positionLevel1'}
                      ]"
          />
        </dl-col>
        <dl-col v-if="form.bizEntityJson.positionLevel7 == 'true'" :span="24" title="" :novalue="form.bizEntityJson.positionLevel15 != 'true' && form.bizEntityJson.positionLevel9 != 'true' && form.bizEntityJson.positionLevel5 != 'true' && form.bizEntityJson.positionLevel6 != 'true' && form.bizEntityJson.positionLevel4 != 'true'">
          <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="groupList"
          />
        </dl-col>
        <dl-col v-if="form.bizEntityJson.positionLevel1 == 'true'" :span="24" title="" :novalue="form.bizEntityJson.positionLevel2 != 'true' && form.bizEntityJson.positionLevel5 != 'true' && form.bizEntityJson.positionLevel6 != 'true' && form.bizEntityJson.positionLevel3 != 'true' && form.bizEntityJson.positionLevel10 != 'true'">
          <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="companyList"
          />
        </dl-col>
    </el-row>
    <el-row v-else>
      <dl-col :span="24" title="选择" :novalue="form.bizEntityJson.positionLevel11 != 'true' && form.bizEntityJson.positionLevel12 != 'true' && form.bizEntityJson.positionLevel13 != 'true' && form.bizEntityJson.positionLevel14 != 'true'">
          <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'总经理/负责人',name:'positionLevel11'},
                        {label:'副总经理/部门负责人（非双线）',name:'positionLevel12'},
                        {label:'副总经理/部门负责人（双线）',name:'positionLevel13'},
                        {label:'其他人员',name:'positionLevel14'}
                      ]"
          />
        </dl-col>
    </el-row>
    <el-row class="padding-row">
      <dl-col :span="24" title="中心/公司" :novalue="!form.bizEntityJson.sendCenterName">
          <el-input v-model="form.bizEntityJson.sendCenterName" @focus="showSearchCenter = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
        <dl-col :span="8" title="申请人" place="right" :novalue="!form.bizEntityJson.userName">
          <el-input v-model="form.bizEntityJson.userName" @focus="showSearchUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
        <dl-col :span="8" title="部门" :novalue="!form.bizEntityJson.dept">
          <el-input v-model="form.bizEntityJson.dept" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="8" title="职位" :novalue="!form.bizEntityJson.position">
          <el-input v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="8" title="出差天数" :novalue="!form.bizEntityJson.tripDay">
          <el-input readonly v-model="form.bizEntityJson.tripDay" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="8" title="开始日期" :novalue="!form.bizEntityJson.tripTimeBegin">
        <el-date-picker @change="calcDate()" v-model="form.bizEntityJson.tripTimeBegin" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="8" title="结束日期" :novalue="!form.bizEntityJson.tripaTimeEnd">
        <el-date-picker @change="calcDate()" v-model="form.bizEntityJson.tripaTimeEnd" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="8" title="随行人员" place="right">
          <el-input v-model="form.bizEntityJson.entourageUserName" @focus="showSearchEntourageUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
        <dl-col :span="8" title="出差地点" :novalue="!form.bizEntityJson.tripPlace">
          <el-input v-model="form.bizEntityJson.tripPlace" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="8" title="交通方式" place="right" :novalue="!form.bizEntityJson.travelWay">
          <el-select v-model="form.bizEntityJson.travelWay" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-for="item in travelWayOptions" :key="item.dictCd" :label="item.dictName" :value="item.dictCd"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="24" title="出差事由" place="right" :novalue="!form.bizEntityJson.tripReason">
          <el-input v-model="form.bizEntityJson.tripReason" type="textarea" :autosize="{ minRows: 3}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="4" title="预计差旅费用" place="right" :novalue="!form.bizEntityJson.lendMoneyAmt">
          <el-input v-model="form.bizEntityJson.lendMoneyAmt" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="20" title="元" place="right"></dl-col>
        <dl-col :span="24" title="行程计划安排" place="right" :novalue="!form.bizEntityJson.tripDesc">
          <el-input v-model="form.bizEntityJson.tripDesc" type="textarea" :autosize="{ minRows: 3}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
    </el-row>
     
    <el-row v-if="form.bizEntityJson.travelWay == 0" class="padding-row">
        <dl-col :span="23" place="title relative">
        <h2>与机票订购有关</h2>
      </dl-col>
      <dl-col :span="1" place="right">
        <div class="explain-p">
          <p class="explain-p-one">
            <span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="addList">添加</span>
          </p>
        </div>
      </dl-col>
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.airTicketsBookingSheet2" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="出行人员" prop="userName">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.userName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.userName" @focus="showSearchAirUser = true; selectIndex = scope.$index" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
            </template>
          </el-table-column>
          <el-table-column label="起迄地" prop="beginEndPlace">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.beginEndPlace, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.beginEndPlace" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </template>
          </el-table-column>
          <el-table-column label="身份证号" prop="idCardNo">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.idCardNo, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.idCardNo" @focus="showSearchOrg = true; selectIndex = scope.$index" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </template>
          </el-table-column>
          <el-table-column label="建议航班时间" prop="tripDate">
            <template slot-scope="scope">
              <el-date-picker style="width: -webkit-fill-available;" :class="{'novalue': !scope.row.tripDate, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.tripDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
            </template>
          </el-table-column>
          <el-table-column label="费用承担部门" prop="costDeptCd">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.costDeptCd, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.costDeptCd" @focus="showSearchOrg = true; selectIndex = scope.$index" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" v-if="!$route.query.id">
            <template slot-scope="scope">
              <el-button v-if="scope.$index > 0" type="text" size="mini" style="color: #EF2941; margin-left: 0;" @click="remove(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row class="padding-row">
        <dl-col :span="23" place="title relative">
        <div class="explain-p">
          <p class="explain-p-one">与行程有关(如有住宿须在结束日期填写第二天的日期，即开始日期和结束日期如同一天将不产生住宿费)</p>
        </div>
      </dl-col>
      <dl-col :span="1" place="right">
        <div class="explain-p">
          <p class="explain-p-one">
            <span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="addList2">添加</span>
          </p>
        </div>
      </dl-col>
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.airTicketsBookingSheet" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="出行人员" prop="userName">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.userName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.userName" @focus="showSearchAirUser2 = true; selectIndex2 = scope.$index" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
            </template>
          </el-table-column>
          <el-table-column label="出发地" prop="beginEndPlace">
            <template slot-scope="scope">
              <el-select
            v-model="scope.row.beginEndPlace"
            filterable
            remote
            clearable
            @change="beginEndPlaceChange; selectIndex2 = scope.$index"
            :remote-method="searchBeginEndPlace"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in beginEndPlaceOptions"
              :key="item.placeCd"
              :label="item.placeName"
              :value="item.placeName">
            </el-option>
          </el-select>
            </template>
          </el-table-column>
          <el-table-column label="目的地" prop="endPlace">
            <template slot-scope="scope">
              <el-select
            v-model="scope.row.endPlace"
            filterable
            remote
            clearable
            @change="endPlaceChange; selectIndex2 = scope.$index"
            :remote-method="searchEndPlace"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in endPlaceOptions"
              :key="item.placeCd"
              :label="item.placeName"
              :value="item.placeName">
            </el-option>
          </el-select>
            </template>
          </el-table-column>
          <el-table-column label="开始" prop="startDate">
            <template slot-scope="scope">
              <el-date-picker style="width: -webkit-fill-available;" :class="{'novalue': !scope.row.startDate, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.startDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
            </template>
          </el-table-column>
          <el-table-column label="结束" prop="endDate">
            <template slot-scope="scope">
              <el-date-picker style="width: -webkit-fill-available;" :class="{'novalue': !scope.row.endDate, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.endDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
            </template>
          </el-table-column>
          <el-table-column label="费用承担部门" prop="costDept">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.costDept, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.costDept" @focus="showSearchOrg2 = true; selectIndex2 = scope.$index" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </template>
          </el-table-column>
          <el-table-column label="操作1" width="200" v-if="!$route.query.id">
            <template slot-scope="scope">
              <el-button v-if="scope.$index > 0" type="text" size="mini" style="color: #EF2941; margin-left: 0;" @click="remove2(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <search-org :open="showSearchCenter && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCd" @close="closeSearhCenter" />
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser" />
    <search-user :open="showSearchEntourageUser && !form.bizEntityJson.disabled" @close="closeSearhEntourageUser" />
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCd" @close="closeSearhOrg" />
    <search-org :open="showSearchAirUser && !form.bizEntityJson.disabled" @close="closeSearhAirUser" />
    <search-org :open="showSearchOrg2 && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCd" @close="closeSearhOrg2" />
    <search-org :open="showSearchAirUser2 && !form.bizEntityJson.disabled" @close="closeSearhAirUser2" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
      processCode: null,
      groupList: [],
      companyList: [],
      userInfo: [],
      showSearchCenter: false,
      showSearchUser: false,
      showSearchEntourageUser: false,
      travelWayOptions: {dictCd: '',dictName: ''},
      selectIndex: null,
      showSearchOrg: false,
      showSearchAirUser: false,
      showSearchAirUser2: false,
      selectIndex2: null,
      showSearchOrg2: false,
      loading: false,
      beginEndPlaceOptions: [],
      endPlaceOptions: [],
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
  /* end */
  created() {
      this.userInfo = JSON.parse(localStorage.getItem("ys_contract_token"));
      if (!this.$route.query.id) {
      this.processCode = this.$store.state.menuTreeItem.processCode;
      this.form.bizEntityJson.sendCenterName = this.userInfo.centerOrgName;
      this.form.bizEntityJson.sendCenterCd = this.userInfo.centerOrgCd;
      this.form.bizEntityJson.dept = this.userInfo.orgName;
      this.form.bizEntityJson.position = this.userInfo.positionName;
      this.form.bizEntityJson.positionCd = this.userInfo.positionCd;
      if (this.processCode =='BLSY_XZRL_3003'|| this.processCode=='BLSY_XZRL_RLZY_150') {
          this.groupList = [{label:'副总裁/助理总裁',name:'positionLevel15'},
                        {label:'中心总经理',name:'positionLevel9'},
                        {label:'部门负责人（非双线）',name:'positionLevel5'},
                        {label:'部门负责人（双线）',name:'positionLevel6'},
                        {label:'其他人员',name:'positionLevel4'}
                      ];
          this.companyList = [{label:'总经理/负责人',name:'positionLevel2'},
                        {label:'部门负责人（非双线）',name:'positionLevel5'},
                        {label:'部门负责人（双线）',name:'positionLevel6'},
                        {label:'其他人员',name:'positionLevel10'}
                      ]
      } else {
          this.groupList = [{label:'中心总经理',name:'positionLevel9'},
                        {label:'部门负责人（非双线）',name:'positionLevel5'},
                        {label:'部门负责人（双线）',name:'positionLevel6'},
                        {label:'其他人员',name:'positionLevel4'}
                      ];
        this.companyList = [{label:'总经理/负责人',name:'positionLevel2'},
                        {label:'部门负责人',name:'positionLevel3'},
                        {label:'其他人员',name:'positionLevel10'}
                      ]
      }
      this.getMapTravelWay();
      this.$set(this.form.bizEntityJson,'airTicketsBookingSheet2',[]);
      this.$set(this.form.bizEntityJson,'airTicketsBookingSheet',[]);
    this.addList()
    this.addList2()
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'deptName', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'orgCd', this.userInfo.orgCd)
      this.overtimeCountApi()
    }
  },
  methods: {
      searchEndPlace(query) {
      if (query) {
        this.loading = true
        this.$approval.getCityList(query).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.endPlaceOptions = res.data
            } else {
              this.endPlaceOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.endPlaceOptions = []
      }
    },
    endPlaceChange(val) {
      let obj = this.endPlaceOptions.find(item => item.placeName == val)
      // 赋值查询到公司cd
      this.form.bizEntityJson.airTicketsBookingSheet[this.selectIndex2].endPlaceCd = obj ? obj.placeCd : ''
    },
      searchBeginEndPlace(query) {
      if (query) {
        this.loading = true
        this.$approval.getCityList(query).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.beginEndPlaceOptions = res.data
            } else {
              this.beginEndPlaceOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.beginEndPlaceOptions = []
      }
    },
    beginEndPlaceChange(val) {
      let obj = this.beginEndPlaceOptions.find(item => item.placeName == val)
      // 赋值查询到公司cd
      this.form.bizEntityJson.airTicketsBookingSheet[this.selectIndex2].beginEndPlaceCd = obj ? obj.placeCd : ''
    },
    //   行程人员
      closeSearhAirUser2(val) {
      if (val) {
        this.form.bizEntityJson.airTicketsBookingSheet[this.selectIndex2].userName = val.userName
        this.form.bizEntityJson.airTicketsBookingSheet[this.selectIndex2].userCd = val.userCd
      }
      this.showSearchAirUser2 = false
    },
    // 关闭行程部门
    closeSearhOrg2(val) {
      if (val) {
        this.form.bizEntityJson.airTicketsBookingSheet[this.selectIndex2].costDept = val.text
        this.form.bizEntityJson.airTicketsBookingSheet[this.selectIndex2].costDeptCd = val.id
      }
      this.showSearchOrg2 = false
    },
      // 删除
    remove2(index) {
      if (this.form.bizEntityJson.airTicketsBookingSheet.length > 0) {
        this.form.bizEntityJson.airTicketsBookingSheet.splice(index, 1)
      }
    },
      addList2() {
      let newData = {
          userName: '',
        userCd: '',
        subjectItemId: '',
        subjectItemNm: '',
        beginEndPlace: '',
        expenseAmt: '',
        beginEndPlaceCd: '',
        endPlaceCd: '',
        realExecFlg: '',
        zsbtAmt: '',
        subjectItemZsId: '',
        subjectItemZsNm: '',
        moneyzs: '',
        money: '',
        endPlace: '',
        startDate: '',
        endDate: '',
        costDeptCd: '',
        costDept: '',
        costParentDept: '',
      }
      this.form.bizEntityJson.airTicketsBookingSheet.push(newData)
    },
      
    // 删除
    remove(index) {
      if (this.form.bizEntityJson.airTicketsBookingSheet2.length > 0) {
        this.form.bizEntityJson.airTicketsBookingSheet2.splice(index, 1)
      }
    },
    //   飞机人员
      closeSearhAirUser(val) {
      if (val) {
          console.log(val);
        this.form.bizEntityJson.airTicketsBookingSheet2[this.selectIndex].userName = val.userName
        this.form.bizEntityJson.airTicketsBookingSheet2[this.selectIndex].userCd = val.userCd
      }
      this.showSearchAirUser = false
    },
    // 关闭飞机部门
    closeSearhOrg(val) {
      if (val) {
          console.log(val);
        this.form.bizEntityJson.airTicketsBookingSheet2[this.selectIndex].costDept = val.text
        this.form.bizEntityJson.airTicketsBookingSheet2[this.selectIndex].costDeptCd = val.id
      }
      this.showSearchOrg = false
    },
      addList() {
      let newData = {
        userName: '',
        userCd: '',
        beginEndPlace: '',
        idCardNo: '',
        tripDate: '',
        costDeptCd: '',
        costDept: '',
        costParentDept: ''
      }
      this.form.bizEntityJson.airTicketsBookingSheet2.push(newData)
    },
      getMapTravelWay() {
          const param = {dictTypeCd: 'JBPM_TRAVEL_WAY'};
      this.$approval.getMapTravelWay(param).then(res => {
        if(res.code == 1 && res.data) {
          this.travelWayOptions = res.data;
        } else {
          this.$message.error(res.message)
        }
      })
    },
      // 关闭人员组件回调
    closeSearhEntourageUser(val) {
      if (val) {
        this.form.bizEntityJson.entourageUserName = val.userName
        this.form.bizEntityJson.entourageUserCd = val.userCd
      }
      this.showSearchEntourageUser = false
    },
      calcDate() {
        var fromDate = this.form.bizEntityJson.tripTimeBegin;
        var toDate = this.form.bizEntityJson.tripaTimeEnd;
        if(fromDate == '' || toDate == '') {
            return;
        }
        var fArray = fromDate.split("-");
        var tArray = toDate.split("-");
        var fDate = new Date(fArray[0],fArray[1]-1,fArray[2]);
        var tDate = new Date(tArray[0],tArray[1]-1,tArray[2]);
        if(tDate.getTime()<fDate.getTime()) {
            this.form.bizEntityJson.tripDay = '';
            return;
        }
        var day = Math.abs(tDate.getTime()-fDate.getTime())/1000/60/60/24+1;
        if(day) {
            this.form.bizEntityJson.tripDay = day;
        }
    },
    
    // 关闭人员组件回调
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.userName = val.userName
        this.form.bizEntityJson.userCd = val.userCd
      }
      this.showSearchUser = false
    },
    // 关闭中心组建回调
    closeSearhCenter(val) {
      if (val) {
        this.form.bizEntityJson.sendCenterName = val.text
        this.form.bizEntityJson.sendCenterCd = val.id
      }
      this.showSearchCenter = false
    },
  }
}
</script>