<template>
  <!-- 总部员工辞退或调岗培训建议表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row v-if="processCode=='RLZY_YGCT_13'">
      <dl-col :span="24" title="人员类型" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3 && !form.bizEntityJson.positionLevel4 && !form.bizEntityJson.positionLevel5">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'文化集团总经理',name:'positionLevel1'},
                        {label:'总经理级/副总经理级/财务负责人',name:'positionLevel2'},
                        {label:'书藏楼、典藏部负责人',name:'positionLevel3'},
                        {label:'书藏楼、典藏部其他人员',name:'positionLevel4'},
                        {label:'其他人员',name:'positionLevel5'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='MSG_XZGL_RL_60'">
      <dl-col :span="24" title="人员类型" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3 && !form.bizEntityJson.positionLevel4 && !form.bizEntityJson.positionLevel5">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级',name:'positionLevel1'},
                        {label:'副总经理级',name:'positionLevel2'},
                        {label:'副总经理级以下人员（不含财务、编制外）',name:'positionLevel3'},
                        {label:'财务人员',name:'positionLevel4'},
                        {label:'编制外人员',name:'positionLevel5'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='MSG_XZGL_RL_110'">
      <dl-col :span="24" title="人员类型" place="top right" :novalue="!form.bizEntityJson.positionLevel3 && !form.bizEntityJson.positionLevel4 && !form.bizEntityJson.positionLevel5">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级/副总经理级/财务负责人',name:'positionLevel3'},
                        {label:'部门负责人/双线人员',name:'positionLevel4'},
                        {label:'其他人员',name:'positionLevel5'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='JD_XZRS_RLZY_140'">
      <dl-col :span="24" title="人员类型" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理',name:'positionLevel1'},
                        {label:'业主代表',name:'positionLevel2'},
                        {label:'业主财务代表',name:'positionLevel3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='ZXGS_YGCT'">
      <dl-col :span="24" title="人员类型" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级及以上',name:'positionLevel1'},
                        {label:'经理级及以上',name:'positionLevel2'},
                        {label:'主管级及以下',name:'positionLevel3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='XZRL_RLZY_250'">
      <dl-col :span="24" title="人员类型" place="top right">
        <d-radio-group-string v-if="form.bizEntityJson.positionLevel3 != null" v-model="form.bizEntityJson" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel3" :nameList="[{label:'M9及以上',name:'positionLevel1'},
                        {label:'其他人员',name:'positionLevel3'}
                      ]" />
        <d-radio-group-string v-else v-model="form.bizEntityJson" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.newRank1 && !form.bizEntityJson.newRank2" :nameList="[{label:'M9及以上',name:'positionLevel1'},
                        {label:'其他M序列',name:'newRank1'},
                        {label:'P序列',name:'newRank2'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='XZRL_RLZY_3300'">
      <dl-col :span="24" title="人员类型" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'部门负责人',name:'positionLevel1'},
                        {label:'高级经理及以上人员（非部门负责人）',name:'positionLevel2'},
                        {label:'经理级及以下人员',name:'positionLevel3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='XZRL_RLZY_2500'">
      <dl-col :span="24" title="人员类型" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级及以上',name:'positionLevel1'},
                        {label:'部门负责人',name:'positionLevel2'},
                        {label:'其他人员',name:'positionLevel3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='CHJZ_RLZYGL_A_1_7'">
      <dl-col :span="24" title="人员类型" place="top right" :novalue="!form.bizEntityJson.positionLevel10 && !form.bizEntityJson.positionLevel3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'副总经理级及以上',name:'positionLevel10'},
                        {label:'其他人员',name:'positionLevel3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else>
      <dl-col :span="24" title="人员类型" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级（含）以上',name:'positionLevel1'},
                        {label:'副总经理级（含）以下',name:'positionLevel2'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row>
      <dl-col :span="8" title="姓名" :novalue="!form.bizEntityJson.employeeName">
        <el-input v-model="form.bizEntityJson.employeeName" @focus="showSearchUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
      </dl-col>
      <dl-col :span="8" title="公司" :novalue="!form.bizEntityJson.centerName">
        <el-input v-model="form.bizEntityJson.centerName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
      </dl-col>
      <dl-col :span="8" title="部门" place="right" :novalue="!form.bizEntityJson.departMent">
        <el-input v-model="form.bizEntityJson.departMent" @focus="showSearchDep = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
      </dl-col>
      <dl-col :span="8" title="职位" :novalue="!form.bizEntityJson.position">
        <el-input v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="8" title="入职日期" :novalue="!form.bizEntityJson.comeDate">
        <el-date-picker v-model="form.bizEntityJson.comeDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="8" title="调整生效日期" place="right" :novalue="!form.bizEntityJson.exeDate">
        <el-date-picker v-model="form.bizEntityJson.exeDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="16" :novalue="!form.bizEntityJson.season1 && !form.bizEntityJson.season2 && !form.bizEntityJson.season3 && !form.bizEntityJson.season4">
        <div class="d-min">
          <span style="display: flex;">
            前4个季度考核成绩
          </span>
        </div>
        <div class="d-min">
          <span style="display: flex;">
            前1季度
            <el-input style="background-color: #fff;" v-model="form.bizEntityJson.season1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          </span>
        </div>
        <div class="d-min">
          <span style="display: flex;">
            前2季度
            <el-input style="background-color: #fff;" v-model="form.bizEntityJson.season2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          </span>
        </div>
        <div class="d-min">
          <span style="display: flex;">
            前3季度
            <el-input style="background-color: #fff;" v-model="form.bizEntityJson.season3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          </span>
        </div>
        <div class="d-min">
          <span style="display: flex;">
            前4季度
            <el-input style="background-color: #fff;" v-model="form.bizEntityJson.season4" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          </span>
        </div>
      </dl-col>
      <dl-col :span="8" title="是否补签" style="border-left:none;" place="right">
        <el-checkbox v-model="form.bizEntityJson.signature" true-label="0" false-label="1"></el-checkbox>
      </dl-col>
      <dl-col :span="24" title="调整原因" place="right" :novalue="!form.bizEntityJson.reason">
        <el-input v-model="form.bizEntityJson.reason" type="textarea" :autosize="{ minRows: 5}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="24" title="调整方式" place="right" :novalue="!form.bizEntityJson.transferType1 && !form.bizEntityJson.transferType2 && !form.bizEntityJson.transferType3">
        <d-radio-group-string v-model="form.bizEntityJson" @change="(value) => changeRadio(value)" :nameList="[{label:'调岗或培训',name:'transferType1'},
                        {label:'无过失解除',name:'transferType2'},
                        {label:'过失解除',name:'transferType3'}
                      ]" />
      </dl-col>
      <dl-col :span="24" v-if="form.bizEntityJson.transferType2 == 'true' || form.bizEntityJson.transferType3 == 'true'" title="辞退类型" place="right" :novalue="!form.bizEntityJson.resignType6 && !form.bizEntityJson.resignType7">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'试用期被动',name:'resignType6'},
                        {label:'非试用期被动',name:'resignType7'}
                      ]" />
      </dl-col>
      <dl-col :span="24" title="辞退原因" place="right">
        <el-select :class="{novalue:!form.bizEntityJson.resignForShr}" :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.resignForShr" @blur="getTurnRes('1')">
          <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="24" title="是否有补偿金" place="right" :novalue="!form.bizEntityJson.transferType4 && !form.bizEntityJson.transferType5">
        <d-radio-group-string v-model="form.bizEntityJson" @change="checkRadio1()" :nameList="[{label:'是',name:'transferType4'}
                      ]" />
        <el-col :span="6" style="border-bottom:none;" v-if="form.bizEntityJson.transferType4 == 'true'" :novalue="!form.bizEntityJson.amountCompensation">
          <div class="d-min">
            <span style="display: flex;">
              (金额：
              <el-input style="background-color: #fff;" v-model="form.bizEntityJson.amountCompensation" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
              元，
            </span>
            <span style="display: flex;">
              <one-file :form="form" style="border-bottom:none;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" value="clearApproveId" />
              )
            </span>
          </div>
        </el-col>
        <d-radio-group-string v-model="form.bizEntityJson" @change="checkRadio2()" :nameList="[{label:'否',name:'transferType5'}
                      ]" />
      </dl-col>
      <dl-col :span="24" title="" place="title right">
        <h2>PD账号将于员工“最后工作日”后自动关闭;各公司/中心/部门负责人可以查询所属离职员工发起的网批。请用人单位做好移交工作（包括PD中重要邮件、审批等）</h2>
      </dl-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="showFirst" width="50%">
      <span>如果需要调岗，请配合说明目标岗位及初步沟通意向；如果需要培养，由用人部门准备专业培养资料、商学院准备配合培养事宜。</span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="showSecond" width="50%">
      <span>根据《劳动合同法》第三十六条、第四十条，可以解除劳动关系（有第四十二条的情形之一的，不能依照第四十条规定解除劳动合同），<strong>但需根据规定支付经济补偿金和代通知金</strong>：<br />
        <strong>第三十六条</strong><strong>&nbsp; </strong><strong>用人单位与劳动者协商一致，可以解除劳动合同。</strong><strong> </strong><br />
        <strong>第四十条</strong><strong>&nbsp; </strong><strong>有下列情形之一的，用人单位提前三十日以书面形式通知劳动者本人或者额外支付劳动者一个月工资后，可以解除劳动合同：</strong><strong> </strong><br />
        （一）劳动者患病或者非因工负伤，在规定的医疗期满后不能从事原工作，也不能从事由用人单位另行安排的工作的； <br />
        （二）劳动者不能胜任工作，经过培训或者调整工作岗位，仍不能胜任工作的； <br />
        （三）劳动合同订立时所依据的客观情况发生重大变化，致使劳动合同无法履行，经用人单位与劳动者协商，未能就变更劳动合同内容达成协议的。 <br />
        <strong>第四十二条</strong><strong>&nbsp; </strong><strong>劳动者有下列情形之一的，用人单位不得依照本法第四十条的规定解除劳动合同：</strong><strong> </strong><br />
        （一）从事接触职业病危害作业的劳动者未进行离岗前职业健康检查，或者疑似职业病病人在诊断或者医学观察期间的； <br />
        （二）在本单位患职业病或者因工负伤并被确认丧失或者部分丧失劳动能力的； <br />
        （三）患病或者非因工负伤，在规定的医疗期内的； <br />
        （四）女职工在孕期、产期、哺乳期的； <br />
        （五）在本单位连续工作满十五年，且距法定退休年龄不足五年的； <br />
        （六）法律、行政法规规定的其他情形。 </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="showThird" width="50%">
      <span><strong>根据《劳动合同法》第三十九条</strong><strong>&nbsp; </strong><strong>劳动者有下列情形之一的，用人单位可以解除劳动合同：</strong><strong> </strong><br />
        （一）在试用期间被证明不符合录用条件的； <br />
        （二）严重违反用人单位的规章制度的； <br />
        （三）严重失职，营私舞弊，给用人单位造成重大损害的； <br />
        （四）劳动者同时与其他用人单位建立劳动关系，对完成本单位的工作任务造成严重影响，或者经用人单位提出，拒不改正的； <br />
        （五）因本法第二十六条第一款第一项规定的情形致使劳动合同无效的； <br />
        （六）被依法追究刑事责任的。 </span>
    </el-dialog>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCd" @close="closeSearhOrg" />
    <search-org :open="showSearchDep && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendDepCd" @close="closeSearhDep" />
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser" />
  </div>
</template>

<script>
import dlCol from "../../../components/dlCol.vue";
export default {
  components: { dlCol },
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
      userInfo: {},
      processCode: null,
      showSearchOrg: false, // 公司组件打开关闭状态
      showSearchDep: false, // 部门组件打开关闭状态
      showSearchUser: false, // 人员组件打开关闭状态
      showFirst: false,
      showSecond: false,
      showThird: false,
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
      // 公司名称和cd
      this.$set(
        this.form.bizEntityJson,
        "centerName",
        this.userInfo.centerOrgName
      );
      this.$set(this.form.bizEntityJson, "centerCd", this.userInfo.centerOrgCd);
      // 人员名称和cd
      this.$set(
        this.form.bizEntityJson,
        "employeeName",
        this.userInfo.username
      );
      this.$set(this.form.bizEntityJson, "employeeCd", this.userInfo.userid);
      // 部门名称
      this.$set(this.form.bizEntityJson, "departMent", this.userInfo.orgName);
      this.$set(this.form.bizEntityJson, "departMentCd", this.userInfo.orgCd);
      // 单个选择复选框赋值未选中
      this.$set(this.form.bizEntityJson, "signature", "1");
      this.getTurnRes("1");
    }
  },
  methods: {
    // 获取辞退原因原因下拉框数据
    getTurnRes(query) {
      if (query !== "") {
        query = query.trim();
        this.$approval.getTurnRes(query).then((response) => {
          if (response.code == 1 && response.data) {
            this.options = response.data;
          } else {
            this.options = [];
          }
        });
      }
    },
    changeRadio(value) {
      if (value.name == "transferType1" && value.value == "true") {
        this.showFirst = true;
      } else if (value.name == "transferType2" && value.value == "true") {
        this.showSecond = true;
      } else if (value.name == "transferType3" && value.value == "true") {
        this.showThird = true;
      }
    },
    checkRadio1() {
      this.form.bizEntityJson.transferType5 = "false";
    },
    checkRadio2() {
      this.form.bizEntityJson.transferType4 = "false";
    },
    // 关闭公司组建回调
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerName = val.text;
        this.form.bizEntityJson.centerCd = val.id;
      }
      this.showSearchOrg = false;
    },
    // 关闭部门组建回调
    closeSearhDep(val) {
      if (val) {
        this.form.bizEntityJson.departMent = val.text;
        this.form.bizEntityJson.departMentCd = val.id;
      }
      this.showSearchDep = false;
    },
    // 关闭人员组件回调
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.employeeName = val.employeeName;
        this.form.bizEntityJson.employeeCd = val.employeeCd;
      }
      this.showSearchUser = false;
    },
  },
};
</script>