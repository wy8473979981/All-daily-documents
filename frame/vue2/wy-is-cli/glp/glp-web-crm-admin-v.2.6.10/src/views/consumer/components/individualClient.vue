<template>
  <div class="corporateClient">
    <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small">
      <Btns :btnsProps="btnsProps" />
      <Card :title="'基本信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model.trim="ruleForm.name" maxlength="50" placeholder="请输入客户名称" clearable class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拥有人" prop="ownerUserName">
              <el-input v-model="ruleForm.ownerUserName" :disabled="true" placeholder="请输入拥有人" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型" prop="customerTypeName">
              <el-input v-model="ruleForm.customerTypeName" :disabled="true" placeholder="请输入客户类型" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="曾用名" prop="usedName">
              <el-input clearable v-model.trim="ruleForm.individual.usedName" placeholder="请输入曾用名" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="certificateType">
              <el-select v-model="ruleForm.certificateType" :disabled="certificateTypeIsCanEdit" clearable placeholder="请选择证件类型" class="form-input">
                <el-option v-for="(item,index) in dictTable.IND_CERTIFICATE_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="tip-box">
            <el-tooltip class="item" effect="dark" content="请输入客户社会信用代码或者注册号" placement="top-start">
              <i class="el-icon-info"></i>
            </el-tooltip>
            <el-form-item :span="12" label="证件号码" prop="certificateId">
              <el-input clearable maxlength="40" v-model.trim="ruleForm.certificateId" :disabled="certificateIdIsCanEdit" placeholder="请输入证件号码" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item class="form-item-div" label="证件有效期起始日" prop="validTermBegin">
              <el-date-picker :picker-options="startPickerOptions" type="date" placeholder="选择开始日期" :value-format="dateTypeString" v-model="ruleForm.individual.validTermBegin" class="form-input"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="form-item-div" label="证件有效期截止日" prop="validTermEnd">
              <el-date-picker :picker-options="endPickerOptions" type="date" :disabled="validTermEndType" placeholder="选择结束日期" :value-format="dateTypeString" v-model="ruleForm.individual.validTermEnd" class="form-input"></el-date-picker>
              <el-checkbox v-model="validTermEndType" @change="validTermEndTypeFunc" class="certificate-type">长期</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="certificateAuthority" label="证件签发机关">
              <el-input clearable v-model.trim="ruleForm.individual.certificateAuthority" placeholder="请输入证件签发机关" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="gender" label="性别">
              <el-select v-model="ruleForm.individual.gender" clearable placeholder="请选择性别">
                <el-option v-for="(item,index) in dictTable.GENDER" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="race" label="民族">
              <el-input v-model.trim="ruleForm.individual.race" clearable placeholder="请输入民族" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="birthday" label="出生日期">
              <el-date-picker v-model="ruleForm.individual.birthday" value-format="yyyy/MM/dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="dwellingStatus" label="居住状况">
              <el-select v-model="ruleForm.individual.dwellingStatus" clearable placeholder="请选择居住状况">
                <el-option v-for="(item,index) in dictTable.DWELLING_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否GLP关联方" prop="glpRelated">
              <el-select v-model="ruleForm.glpRelated" clearable class="form-input" placeholder="请选择是否GLP关联方">
                <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="overdueFlag" label="是否存在逾期/代偿记录">
              <el-select v-model="ruleForm.overdueFlag" clearable class="form-input" placeholder="请选择是否存在逾期/代偿记录">
                <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="activityName" label="所属市场活动" class="btn-box">
              <el-input v-model="ruleForm.activityName" disabled class="form-input" placeholder="请查询并选择所属市场活动"></el-input>
              <el-button type="primary" @click="searchActionFun">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="activityChannelName" label="市场活动渠道" class="btn-box">
              <el-input v-model="ruleForm.activityChannelName" disabled class="form-input" placeholder="请查询并选择市场活动渠道"></el-input>
              <el-button type="primary" :disabled="isCanUserSearchChannel" @click="searchChannelFun">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="customerSource" label="市场部获客来源">
              <el-select v-model="ruleForm.customerSource" clearable placeholder="请选择市场部获客来源">
                <el-option v-for="(item,index) in dictTable.MARKET_CUSTOMER_SOURCE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="authStatus" label="实名状态">
              <el-select v-model="ruleForm.authStatus" disabled placeholder>
                <el-option v-for="(item,index) in dictTable.AUTH_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="id" label="ECIF客户ID">
              <el-input v-model="ruleForm.ecifId" :disabled="true" placeholder class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="recommendUserName" label="推荐人" class="btn-box">
              <el-input v-model="ruleForm.recommendUserName" disabled class="form-input" placeholder="请查询并选择推荐人"></el-input>
              <el-button type="primary" @click="searchBelongerFun">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'联系信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="手机号码" prop="contactMobile">
              <el-input clearable v-model.trim="ruleForm.individual.contactMobile" placeholder="请输入手机号码" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信" prop="contactWechat">
              <el-input clearable v-model.trim="ruleForm.individual.contactWechat" placeholder="请输入微信" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="固定电话" prop="contactTelephone">
              <el-input clearable v-model.trim="ruleForm.individual.contactTelephone" placeholder="请输入固定电话" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="QQ" prop="contactQq">
              <el-input clearable v-model.trim="ruleForm.individual.contactQq" placeholder="请输入QQ" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="个人邮箱" prop="contactEmail">
              <el-input clearable v-model.trim="ruleForm.individual.contactEmail" placeholder="请输入个人邮箱" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>

      <Card :title="'教育信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="教育水平" prop="eduLevel">
              <el-select v-model="ruleForm.individual.eduLevel" clearable placeholder="请选择教育水平">
                <el-option v-for="(item,index) in dictTable.EDU_LEVEL" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业学校" prop="graduateSchool">
              <el-input clearable v-model.trim="ruleForm.individual.graduateSchool" placeholder="请输入毕业学校" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业年份" prop="graduationYear">
              <el-date-picker v-model="ruleForm.individual.graduationYear" type="month" format="yyyy/MM" value-format="yyyy/MM" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'婚姻信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-select v-model="ruleForm.individual.maritalStatus" clearable placeholder="请选择婚姻状况" @change="maritalStatusFunc">
                <el-option v-for="(item,index) in dictTable.MARITAL_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶证件类型" prop="spouseCertificateType">
              <el-select v-model="ruleForm.individual.spouseCertificateType" :disabled="maritalStatus" clearable placeholder="请选择配偶证件类型" class="form-input">
                <el-option v-for="(item,index) in dictTable.IND_CERTIFICATE_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶姓名" prop="spouseName">
              <el-input clearable v-model.trim="ruleForm.individual.spouseName" :disabled="maritalStatus" placeholder="请输入配偶姓名" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶证件号码" prop="spouseCertificateId">
              <el-input clearable v-model.trim="ruleForm.individual.spouseCertificateId" :disabled="maritalStatus" placeholder="请输入配偶证件号码" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'收入信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="家庭月收入" prop="householdMonthlyIncome">
              <el-input clearable v-model.trim="ruleForm.individual.householdMonthlyIncome" placeholder="请输入家庭月收入" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本人月收入" prop="monthlyIncome">
              <el-input clearable v-model.trim="ruleForm.individual.monthlyIncome" placeholder="请输入本人月收入" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'工作信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="实际从业年限" prop="workingSeniority">
              <el-select v-model="ruleForm.individual.workingSeniority" clearable class="form-input" placeholder="请选择实际从业年限">
                <el-option v-for="(item,index) in dictTable.WORKING_SENIORITY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位" prop="company">
              <el-input v-model.trim="ruleForm.individual.company" clearable placeholder="请输入工作单位" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司总机" prop="companySwitchboard">
              <el-input clearable v-model.trim="ruleForm.individual.companySwitchboard" placeholder="请输入公司总机" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位所属行业" prop="companyIndustry">
              <el-select v-model="ruleForm.individual.companyIndustry" clearable class="form-input" placeholder="请选择工作单位所属行业">
                <el-option v-for="(item,index) in dictTable.INDUSTRY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'备注信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item class="desTextarea" prop="note" label="备注">
              <el-input v-model.trim="ruleForm.individual.note" type="textarea" :rows="5" maxlength="300" show-word-limit style="width:800px;" placeholder="请输入备注" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
    </el-form>
    <!-- 查询工商信息 -->
    <businessModal :show.sync="businessVisible" v-if="businessVisible" @listenEvent="setBusinessTableRow"></businessModal>

    <!-- 查询市场活动 -->
    <actionModal :show.sync="actionVisible" v-if="actionVisible" :activeChannelData="activeChannelData" @listenEvent="setActionTableRow"></actionModal>

    <!-- 查询活动渠道 -->
    <channelModal :show.sync="channelVisible" v-if="channelVisible" :marketActiveData="marketActiveData" @listenEvent="setChannelTableRow"></channelModal>

    <!-- 查询用户 -->
    <belongerModal :show.sync="belongerVisible" v-if="belongerVisible" :lockingStatus="lockingStatus" :isUserAppId="false" @listenEvent="setBelongerTableRow"></belongerModal>
  </div>
</template>
<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import businessModal from "@/components/UX/businessComponent";
import actionModal from "@/components/UX/actionComponent";
import channelModal from "@/components/UX/channelComponent";
import belongerModal from "@/components/UX/belongerComponent";
import DataApi from "@/api/consumerService";
import { Utils } from "@/utils";
export default {
  components: {
    businessModal,
    actionModal,
    channelModal,
    belongerModal
  },
  name: "corporateClient",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    let self = this;
    let checkTime = (rule, value, callback) => {
      if (
        this.ruleForm.individual.validTermBegin &&
        this.ruleForm.individual.validTermEnd
      ) {
        if (
          this.ruleForm.individual.validTermBegin >
          this.ruleForm.individual.validTermEnd
        ) {
          return callback(new Error("开始时间必须大于结束时间"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      certificateIdIsCanEdit: false, //修改页面，ECIF客户ID为空时可编辑
      certificateTypeIsCanEdit: false, //修改页面，ECIF客户ID为空时可编辑
      transferAry: {},
      SelectionOptions,
      businessVisible: false,
      actionVisible: false,
      channelVisible: false,
      belongerVisible: false,
      lockingStatus: "00",// crm内部是否有效 00 -有效， 01-无效 
      routeQuery: {}, //查询参数
      dictTable: null, //字典表
      validTermEndType: false, //证件有效期截止日 是否长期
      ruleForm: {
        glpRelated: null, //是否GLP关联方
        ecifId: null, //ECIF客户ID
        name: null, //客户名称 必填
        overdueFlag: null, //是否存在逾期/代偿记录
        recommendUserNo: null, //推荐人编号
        recommendUserName: null, //推荐人名称
        activityChannelId: null, //市场活动渠道
        activityChannelName: null, //市场活动渠道名称
        activityId: null, //所属市场活动
        activityName: null, //所属市场活动名称
        certificateId: null, //证件号码 必填
        certificateType: null, //证件类型 必填
        channelFlag: 0,
        customerSource: null, //市场部获客来源
        customerSubType: null,
        customerType: "INDIVIDUAL", //客户类型
        customerTypeName: "个人客户", //客户类型名称
        ownerUserName: null, //拥有人名称
        ownerUserNo: null, //拥有人No
        authStatus: null, //实名状态
        individual: {
          birthday: null, //出生日期
          certificateAuthority: null, //证件签发机关
          company: null, //工作单位
          companyIndustry: null, //工作单位所属行业
          companySwitchboard: null, //公司总机
          contactEmail: null, //个人邮箱
          contactMobile: null, //手机号码
          contactQq: null, //QQ
          contactTelephone: null, //固定电话
          contactWechat: null, //微信
          dwellingAddressZipCode: null,
          dwellingStatus: null, //居住状况
          eduLevel: null, //教育水平
          gender: null, //性别
          graduateSchool: null, //毕业学校
          graduationYear: null, //毕业年份
          householdMonthlyIncome: null, //家庭月收入
          maritalStatus: null, //婚姻状况
          monthlyIncome: null, //本人月收入
          race: null, //民族
          spouseCertificateId: null, //配偶证件号码
          spouseCertificateType: null, //配偶证件类型
          spouseMobile: null,
          spouseName: null, //配偶姓名
          usedName: null, //曾用名
          validTermBegin: null, //证件有效期起始日
          validTermEnd: null, //证件有效期截止日
          workingSeniority: null, //实际从业年限
          note: null //备注
        }
      }, //表单字段
      rules: {
        //校验规则
        name: [
          { required: true, message: "请输入客户名称", trigger: ["blur"] },
          { min: 2, max: 50, message: "请至少输入2位", trigger: "blur" }
        ],
        certificateType: [{ required: true, message: "必选", trigger: "blur" }],
        certificateId: [
          { required: true, message: "请输入证件号码", trigger: ["blur"] },
          { min: 4, max: 40, message: "请至少输入4位", trigger: "blur" }
        ],
        validTermBegin: [{ validator: checkTime, trigger: ["blur", "change"] }],
        validTermEnd: [{ validator: checkTime, trigger: ["blur", "change"] }]
      },
      marketActiveData: null, //已选的市场活动
      activeChannelData: null, //已选的活动渠道
      dateTypeString: "yyyy/MM/dd", //时间格式
      startPickerOptions: {
        disabledDate(time) {
          let validTermEnd = self.ruleForm.individual.validTermEnd || "";
          if (validTermEnd) {
            let sdTime = new Date(validTermEnd).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          let startDate = self.ruleForm.individual.validTermBegin || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            // 估计时间格式的原因
            return time.getTime() < sdTime;
          }
        }
      },
      btnsProps: {
        submit: {
          text: "保存",
          func: this.submitForm,
          isSubmitting: false
        },
        cancel: {
          text: "取消",
          func: this.cancelFunc
        }
      },
      userInfo: {}, //登录人信息
      detailPath: "/consumer/index/detail", //详情页路由地址
      ListPath: "/consumer/index" //列表路由地址
    };
  },
  computed: {
    isCanUserSearchChannel: {
      get() {
        return this.ruleForm.activityName == null;
      },
      set() { }
    },
    maritalStatus: {
      get() {
        return this.ruleForm.individual.maritalStatus !== 20;
      },
      set() { }
    }
  },

  created() {
    this.routeQuery = this.$route.query;
    this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
  },
  mounted() {
    try {
      if (this.routeQuery.flag == "edit") {
        this.ruleForm = this.baseInfo;
        this.ruleForm.customerTypeName = "个人客户";
        if (this.ruleForm.individual.validTermEnd == "长期") {
          this.validTermEndType = true;
          this.ruleForm.individual.validTermEnd = null;
        } else {
          this.validTermEndType = false;
        }

        if (this.ruleForm.ecifId) {
          this.certificateIdIsCanEdit = true;
          this.certificateTypeIsCanEdit = true;
        } else {
          this.certificateIdIsCanEdit = false;
          this.certificateTypeIsCanEdit = false;
        }

        this.marketActiveData = { id: this.ruleForm.activityId }; //已选的市场活动
        this.activeChannelData = { id: this.ruleForm.activityChannelId }; //已选的市场活动渠道
      } else {
        this.ruleForm.ownerUserName = this.userInfo.name;
        this.ruleForm.ownerUserNo = this.userInfo.userNo;
      }
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    baseInfo: function (v) {
      this.ruleForm = v;
    }
  },
  methods: {
    validTermEndTypeFunc(value) {
      this.validTermEndType = value;
      this.ruleForm.individual.validTermEnd = null;
    },
    nameChange(value) {
      if (!value) {
        this.ruleForm.name = null; //客户名称
      }
    },
    searchActionFun() {
      this.actionVisible = true;
    },
    setBusinessTableRow(data) {
      this.ruleForm.name = data.entType; //企业名称（客户名称）
    },
    setActionTableRow(data) {
      this.marketActiveData = data; //已选的市场活动
      // 新增/修改客户，所属活动和渠道不为空时，切换所属活动，市场活动渠道要求清空，重新选择该活动下的渠道
      this.activeChannelData = null; //已选的市场活动渠道
      this.ruleForm = {
        ...this.ruleForm,
        activityId: data.id, //所属市场活动
        activityName: data.name, //所属市场活动名称
        activityChannelId: null, //市场活动渠道
        activityChannelName: null, //市场活动渠道名称
      }
    },
    setChannelTableRow(data) {
      this.ruleForm.activityChannelId = data.id; //市场活动渠道
      this.ruleForm.activityChannelName = data.name; //市场活动渠道名称
      this.activeChannelData = data; //已选的市场活动渠道
    },
    setBelongerTableRow(data) {
      this.ruleForm.recommendUserNo = data.userNo; //推荐人编号
      this.ruleForm.recommendUserName = data.userName; //推荐人名称
    },
    searchBelongerFun() {
      this.belongerVisible = true;
    },
    searchBusinessFun() {
      this.businessVisible = true;
    },
    searchChannelFun() {
      this.channelVisible = true;
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.validTermEndType) {
            this.ruleForm.individual.validTermEnd = "长期";
          }
          if (this.routeQuery.flag == "edit") {
            DataApi.updateConsumer(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message({ type: "success", message: "更新成功！" });
                this.cancelFunc();
              } else {
                this.$message({
                  type: "warning",
                  message: res.message ? res.message : "系统异常请联系管理员！"
                });
              }
            });
          } else {
            DataApi.createConsumer(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message({ type: "success", message: "新建成功！" });
                this.cancelFunc();
              } else {
                this.$message({
                  type: "warning",
                  message: res.message ? res.message : "系统异常请联系管理员！"
                });
              }
            });
          }
        }
      });
    },
    maritalStatusFunc(code) {
      if (code != 20) {
        this.ruleForm.individual.spouseCertificateId = null; //配偶证件号码
        this.ruleForm.individual.spouseCertificateType = null; //配偶证件类型
        this.ruleForm.individual.spouseName = null; //配偶姓名
      }
    },
    cancelFunc() {
      let viewType = this.routeQuery.viewType;
      if (viewType == "detail") {
        this.$router.push({
          path: this.detailPath,
          query: {
            currConsumerId: this.baseInfo.id, //客户ID
            currConsumerName: this.baseInfo.name, //客户名称
            currConsumerType: this.baseInfo.customerType //客户类型
          }
        });
      } else {
        this.$router.push({
          path: this.ListPath
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-checkbox-group {
  margin-left: 10px;
}
.corporateClient {
  .tip-box {
    position: relative;
    .el-icon-info {
      position: absolute;
      left: -5px;
      top: 3px;
      color: rgba(22, 155, 213, 1);
    }
  }
  .cursor {
    cursor: pointer;
  }
  .certificate-type {
    margin-left: 45px;
  }
  .btn-box {
    .el-form-item__content {
      display: flex;
    }
    .el-button {
      margin-left: 5px;
    }
  }
}
</style>