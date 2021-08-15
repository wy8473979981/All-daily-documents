<template>
  <!-- 总部辞职审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row v-if="processCode=='XZRS_RLZYSY_40'">
      <dl-col :span="24">
        <dl-col :span="24" v-if="form.bizEntityJson.company5 != null" title="" place="top right" :novalue="!form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3
       && !form.bizEntityJson.company4 && !form.bizEntityJson.company5 && !form.bizEntityJson.company6">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'事业一部',name:'company1'},
                        {label:'事业二部',name:'company2'},
                        {label:'置地',name:'company3'},
                        {label:'浙江事业部',name:'company4'},
                        {label:'事业三部',name:'company5'},
                        {label:'广东事业部',name:'company6'}
                      ]" />
        </dl-col>
        <dl-col :span="24" v-else title="" place="top right" :novalue="!form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3
       && !form.bizEntityJson.company4 && !form.bizEntityJson.company7 && !form.bizEntityJson.company6">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'事业一部',name:'company1'},
                        {label:'事业二部',name:'company2'},
                        {label:'置地',name:'company3'},
                        {label:'浙江事业部',name:'company4'},
                        {label:'安徽事业部',name:'company7'},
                        {label:'广东事业部',name:'company6'}
                      ]" />
        </dl-col>
      </dl-col>
    </el-row>
    <el-row v-if="processCode=='MSG_XZGL_RL_40'">
      <dl-col :span="24" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3
       && !form.bizEntityJson.positionGrade4 && !form.bizEntityJson.positionGrade5">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级',name:'positionGrade1'},
                        {label:'副总经理级',name:'positionGrade2'},
                        {label:'副总经理级以下人员（不含财务、编制外）',name:'positionGrade3'},
                        {label:'财务人员',name:'positionGrade4'},
                        {label:'编制外人员',name:'positionGrade5'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='MSG_XZGL_RL_80'">
      <dl-col :span="24" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade3 && !form.bizEntityJson.positionGrade4 && !form.bizEntityJson.positionGrade5">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级/副总经理级/财务负责人',name:'positionGrade3'},
                        {label:'部门负责人/双线人员',name:'positionGrade4'},
                        {label:'其他人员',name:'positionGrade5'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='XZRS_RLZY_35'">
      <dl-col title="选择" place="top right">
        <d-radio-group-string v-if="form.bizEntityJson.positionGrade3 != null" v-model="form.bizEntityJson" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade3" :nameList="[{label:'M9及以上',name:'positionGrade1'},
                        {label:'其他人员',name:'positionGrade3'}
                      ]" />
        <d-radio-group-string v-else v-model="form.bizEntityJson" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.newRank1 && !form.bizEntityJson.newRank2" :nameList="[{label:'M9及以上',name:'positionGrade1'},
                        {label:'其他M序列',name:'newRank1'},
                        {label:'P序列',name:'newRank2'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='XZRS_RLZY_1111'">
      <dl-col :span="24" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级及以上',name:'positionGrade1'},
                        {label:'部门负责人',name:'positionGrade2'},
                        {label:'其他人员',name:'positionGrade3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='ZXGS_CZSP'">
      <dl-col :span="24" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级及以上',name:'positionGrade1'},
                        {label:'经理级及以上',name:'positionGrade2'},
                        {label:'主管级及以下',name:'positionGrade3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='CHJZ_RLZYGL_A_1_6'">
      <dl-col :span="24" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade8 && !form.bizEntityJson.positionCategory3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'副总经理级及以上',name:'positionGrade8'},
                        {label:'其他人员',name:'positionCategory3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='XZRS_RLZY_3000'">
      <dl-col :span="24" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'部门负责人',name:'positionGrade1'},
                        {label:'高级经理及以上人员（非部门负责人）',name:'positionGrade2'},
                        {label:'经理级及以下人员',name:'positionGrade3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='RLZY_ZBCZ_11'">
      <dl-col :span="24" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3 && !form.bizEntityJson.positionGrade4 && !form.bizEntityJson.positionGrade5">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'文化集团总经理',name:'positionGrade1'},
                        {label:'总经理级/副总经理级/财务负责人',name:'positionGrade2'},
                        {label:'书藏楼、典藏部负责人',name:'positionGrade3'},
                        {label:'书藏楼、典藏部其他人员',name:'positionGrade4'},
                        {label:'其他人员',name:'positionGrade5'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='JD_XZRS_RLZY_80'">
      <dl-col :span="24" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3 && !form.bizEntityJson.positionGrade4">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级',name:'positionGrade1'},
                        {label:'副总经理级',name:'positionGrade2'},
                        {label:'双线管理部门第一负责人及出纳',name:'positionGrade4'},
                        {label:'其他人员',name:'positionGrade3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='XZRS_RLZYSY_40'">
      <dl-col :span="24">
        <dl-col :span="24" v-if="form.bizEntityJson.positionLevel7 != null || form.bizEntityJson.positionLevel1 != null || form.bizEntityJson.positionLevel2 != null || form.bizEntityJson.positionLevel3 != null" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3 && !form.bizEntityJson.positionLevel7">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'M9及以上',name:'positionLevel7'},
                        {label:'M4-M8;P9-P11',name:'positionLevel1'},
                        {label:'双线职能P7-P8及出纳',name:'positionLevel2'},
                        {label:'其他人员',name:'positionLevel3'}
                      ]" />
        </dl-col>
        <dl-col :span="24" v-else title="选择" place="top right" :novalue="!form.bizEntityJson.newPositionLevel1 && !form.bizEntityJson.newPositionLevel2 && !form.bizEntityJson.newPositionLevel3 && !form.bizEntityJson.newPositionLevel4">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'M9及以上',name:'newPositionLevel1'},
                        {label:'其他M序列',name:'newPositionLevel2'},
                        {label:'P9及以上',name:'newPositionLevel3'},
                        {label:'其他P序列',name:'newPositionLevel4'}
                      ]" />
        </dl-col>
        <dl-col :span="24" title="选择" place="right" :novalue="!form.bizEntityJson.positionGrade8 && !form.bizEntityJson.positionGrade9">
          <div class="d-min">
            <span>事业部负责人：</span>
            <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'是',name:'positionGrade8'},
                        {label:'否',name:'positionGrade9'}
                      ]" />
          </div>
        </dl-col>
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='XZRS_RLZY_40'">
      <dl-col :span="24">
        <dl-col :span="24" v-if="form.bizEntityJson.positionLevel1 != null || form.bizEntityJson.positionLevel2 != null || form.bizEntityJson.positionLevel3 != null || form.bizEntityJson.positionLevel4 != null" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3 && !form.bizEntityJson.positionLevel4">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'M5-M8;P9-P11',name:'positionLevel1'},
                        {label:'双线职能M1-M4;P7-P8及出纳',name:'positionLevel2'},
                        {label:'非双线职能M1-M4;P7-P8',name:'positionLevel4'},
                        {label:'其他人员',name:'positionLevel3'}
                      ]" />
        </dl-col>
        <dl-col :span="24" v-else title="选择" place="top right" :novalue="!form.bizEntityJson.newPositionLevel1 && !form.bizEntityJson.newPositionLevel2 && !form.bizEntityJson.newPositionLevel3 && !form.bizEntityJson.newPositionLevel4 && !form.bizEntityJson.newPositionLevel5">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'城市公司总经理',name:'newPositionLevel1'},
                        {label:'双线M序列及出纳',name:'newPositionLevel2'},
                        {label:'其他M序列',name:'newPositionLevel5'},
                        {label:'P7及以上',name:'newPositionLevel3'},
                        {label:'其他P序列',name:'newPositionLevel4'}
                      ]" />
        </dl-col>
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='XZRS_RLZY_HKXM02'">
      <dl-col :span="24" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel11 && !form.bizEntityJson.positionLevel12">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'副总经理级及以上',name:'positionLevel11'},
                        {label:'副总经理级以下',name:'positionLevel12'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else>
      <dl-col :span="24" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3
       && !form.bizEntityJson.positionGrade4 && !form.bizEntityJson.positionGrade5 && !form.bizEntityJson.positionGrade6 && !form.bizEntityJson.positionGrade7">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'副总裁级',name:'positionGrade1'},
                        {label:'总经理级',name:'positionGrade2'},
                        {label:'副总经理级',name:'positionGrade3'},
                        {label:'高级经理级',name:'positionGrade4'},
                        {label:'经理级',name:'positionGrade5'},
                        {label:'主管级',name:'positionGrade6'},
                        {label:'专员级',name:'positionGrade7'}
                      ]" />
      </dl-col>
      <dl-col :span="24" title="专业条线" place="right" style="border-bottom:none;" :novalue="!form.bizEntityJson.positionCategory1 && !form.bizEntityJson.positionCategory2 && !form.bizEntityJson.positionCategory3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'成本、技术',name:'positionCategory1'},
                        {label:'营运',name:'positionCategory2'},
                        {label:'其他人员',name:'positionCategory3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row>
      <dl-col :span="12" title="姓名" place="top" :novalue="!form.bizEntityJson.userName">
        <el-input v-model="form.bizEntityJson.userName" @focus="showSearchUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
      </dl-col>
      <dl-col :span="12" :title="processCode=='CHJZ_RLZYGL_A_1_6' ? '部门' : '中心/部门'" place="top right" :novalue="!form.bizEntityJson.center">
        <el-input v-model="form.bizEntityJson.center" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
      </dl-col>
      <dl-col :span="12" title="职位" :novalue="!form.bizEntityJson.position">
        <el-input v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="12" title="入职日期" place="right" :novalue="!form.bizEntityJson.enterDate">
        <el-date-picker v-model="form.bizEntityJson.enterDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="24" v-if="processCode=='XZRS_RLZYSY_40' || processCode=='XZRS_RLZY_35'||  processCode=='XZRS_RLZY_1111'|| processCode=='CHJZ_RLZYGL_A_1_6'">
        <dl-col :span="12" title="最后工作日" place="right" :novalue="!form.bizEntityJson.lastWorkDay">
          <el-date-picker v-model="form.bizEntityJson.lastWorkDay" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
        </dl-col>
        <dl-col :span="12" title="是否补签" place="right">
          <el-checkbox v-model="form.bizEntityJson.signature" true-label="0" false-label="1"></el-checkbox>
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else>
        <dl-col :span="12" title="合同期限" style="border-left:none;" :novalue="!form.bizEntityJson.contractExpires">
          <el-input v-model="form.bizEntityJson.contractExpires" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="最后工作日" place="right" :novalue="!form.bizEntityJson.lastWorkDay">
          <el-input v-model="form.bizEntityJson.lastWorkDay" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="24" title="是否补签" place="right" style="border-left:none;border-bottom:none;">
          <el-checkbox v-model="form.bizEntityJson.signature" true-label="0" false-label="1"></el-checkbox>
        </dl-col>
      </dl-col>
      <dl-col :span="12" title="辞职类型" :novalue="!form.bizEntityJson.resignType6 && !form.bizEntityJson.resignType7">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'试用期主动',name:'resignType6'},
                        {label:'非试用期主动',name:'resignType7'}
                      ]" />
      </dl-col>
      <dl-col :span="12" title="辞职原因" place="right">
        <el-select :class="{novalue:!form.bizEntityJson.resignReason}" :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.resignReason" @blur="getShrRes('1')">
          <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="24" title="" place="title right">
        <h2>PD账号将于员工“最后工作日”后自动关闭;各公司/中心/部门负责人可以查询所属离职员工发起的网批。请用人单位做好移交工作（包括PD中重要邮件、审批等）</h2>
      </dl-col>
      <dl-col :span="24" title="备注" place="right">
        <el-input v-model="form.bizEntityJson.remark" type="textarea" :autosize="{ minRows: 3}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="24" title="附件" place="right" :novalue="!form.bizEntityJson.fileId">
        <one-file :form="form" value="fileId" />
      </dl-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCd" @close="closeSearhOrg" />
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
      userInfo: {},
      processCode: null,
      showSearchOrg: false, // 中心、部门组件打开关闭状态
      showSearchUser: false, // 人员组件打开关闭状态
      options: [],
    };
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ["data"],
  watch: {
    data: {
      immediate: true,
      handler: function (val) {
        this.form = val;
      },
    },
  },
  /* end */
  created() {
    this.processCode = this.$store.state.menuTreeItem.processCode;
    this.userInfo = JSON.parse(localStorage.getItem("ys_contract_token"));
    if (!this.$route.query.id) {
      // 中心名称和cd
      this.$set(this.form.bizEntityJson, "center", this.userInfo.centerOrgName);
      this.$set(
        this.form.bizEntityJson,
        "sendOrgCd",
        this.userInfo.centerOrgCd
      );
      // 人员名称和cd
      this.$set(this.form.bizEntityJson, "userName", this.userInfo.username);
      this.$set(this.form.bizEntityJson, "applyUser", this.userInfo.userid);
      // 单个选择复选框赋值未选中
      this.$set(this.form.bizEntityJson, "signature", "1");
      this.getShrRes("1");
    }
  },
  methods: {
    // 获取辞职原因下拉框数据
    getShrRes(query) {
      if (query !== "") {
        query = query.trim();
        this.$approval.getShrRes(query).then((response) => {
          if (response.code == 1 && response.data) {
            this.options = response.data;
          } else {
            this.options = [];
          }
        });
      }
    },
    // 关闭中心组建回调
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.center = val.text;
        this.form.bizEntityJson.sendOrgCd = val.id;
      }
      this.showSearchOrg = false;
    },
    // 关闭人员组件回调
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.userName = val.userName;
        this.form.bizEntityJson.userCd = val.userCd;
      }
      this.showSearchUser = false;
    },
  },
};
</script>