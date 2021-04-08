<template>
  <div class="corporateClient">
    <el-form class="form-section base-info-section block-form" :model="form" ref="form" inline size="small">
      <Card :title="'基本信息'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="form.name" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拥有人" prop="ownerUserName">
              <el-input v-model="form.ownerUserName" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型" prop="customerTypeName">
              <el-input v-model="form.customerTypeName" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="曾用名" prop="usedName">
              <el-input v-model="form.individual.usedName" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="certificateType">
              <el-select v-model="form.certificateType" :disabled="isCanEdit" class="form-input" placeholder>
                <el-option v-for="(item,index) in dictTable.IND_CERTIFICATE_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="tip-box">
            <el-tooltip class="item" effect="dark" content="请输入客户社会信用代码或者注册号" placement="top-start">
              <i class="el-icon-info"></i>
            </el-tooltip>
            <el-form-item :span="12" label="证件号码" prop="certificateId">
              <el-input v-model="form.certificateId" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item class="form-item-div" label="证件有效期起始日" prop="validTermBegin">
              <el-date-picker type="date" :disabled="isCanEdit" placeholder="" :value-format="dateTypeString" v-model="form.individual.validTermBegin" class="form-input"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="form-item-div" label="证件有效期截止日" prop="validTermEnd">
              <el-date-picker :picker-options="endPickerOptions" type="date" :disabled="isCanEdit" placeholder="" :value-format="dateTypeString" v-model="form.individual.validTermEnd" class="form-input"></el-date-picker>
              <el-checkbox v-model="validTermEndType" disabled class="certificate-type">长期</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="certificateAuthority" label="证件签发机关">
              <el-input :disabled="isCanEdit" v-model="form.individual.certificateAuthority" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item prop="gender" label="性别">
              <el-select v-model="form.individual.gender" :disabled="isCanEdit" placeholder>
                <el-option v-for="(item,index) in dictTable.GENDER" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="race" label="民族">
              <el-input v-model="form.individual.race" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="birthday" label="出生日期">
              <el-date-picker v-model="form.individual.birthday" :disabled="isCanEdit" type="date" placeholder=""></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item prop="dwellingStatus" label="居住状况">
              <el-select v-model="form.individual.dwellingStatus" :disabled="isCanEdit" placeholder>
                <el-option v-for="(item,index) in dictTable.DWELLING_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否GLP关联方" prop="glpRelated">
              <el-select v-model="form.glpRelated" :disabled="isCanEdit" class="form-input" placeholder>
                <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="overdueFlag" label="是否存在逾期/代偿记录">
              <el-select v-model="form.overdueFlag" :disabled="isCanEdit" class="form-input" placeholder>
                <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item prop="activityName" label="所属市场活动">
              <el-input v-model="form.activityName" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="activityChannelName" label="市场活动渠道">
              <el-input v-model="form.activityChannelName" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="customerSource" label="市场部获客来源">
              <el-select v-model="form.customerSource" :disabled="isCanEdit" placeholder>
                <el-option v-for="(item,index) in dictTable.MARKET_CUSTOMER_SOURCE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item prop="authStatus" label="实名状态">
              <el-select v-model="form.authStatus" :disabled="isCanEdit" placeholder>
                <el-option v-for="(item,index) in dictTable.AUTH_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="id" label="ECIF客户ID">
              <el-input v-model="form.ecifId" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="recommendUserName" label="推荐人">
              <el-input v-model="form.recommendUserName" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'联系信息'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="手机号码" prop="contactMobile">
              <el-input :disabled="isCanEdit" v-model="form.individual.contactMobile" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信" prop="contactWechat">
              <el-input :disabled="isCanEdit" v-model="form.individual.contactWechat" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="固定电话" prop="contactTelephone">
              <el-input :disabled="isCanEdit" v-model="form.individual.contactTelephone" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="QQ" prop="contactQq">
              <el-input v-model="form.individual.contactQq" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="个人邮箱" prop="contactEmail">
              <el-input v-model="form.individual.contactEmail" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>

      <Card :title="'教育信息'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="教育水平" prop="eduLevel">
              <el-select v-model="form.individual.eduLevel" :disabled="isCanEdit" placeholder>
                <el-option v-for="(item,index) in dictTable.EDU_LEVEL" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业学校" prop="graduateSchool">
              <el-input :disabled="isCanEdit" v-model="form.individual.graduateSchool" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业年份" prop="graduationYear">
              <el-date-picker :disabled="isCanEdit" v-model="form.individual.graduationYear" type="month" format="yyyy/MM" value-format="yyyy/MM" placeholder=""></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'婚姻信息'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-select v-model="form.individual.maritalStatus" :disabled="isCanEdit" placeholder>
                <el-option v-for="(item,index) in dictTable.MARITAL_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶证件类型" prop="spouseCertificateType">
              <el-select v-model="form.individual.spouseCertificateType" :disabled="isCanEdit" class="form-input" placeholder>
                <el-option v-for="(item,index) in dictTable.IND_CERTIFICATE_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶姓名" prop="spouseName">
              <el-input v-model="form.individual.spouseName" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶证件号码" prop="spouseCertificateId">
              <el-input :disabled="isCanEdit" v-model="form.individual.spouseCertificateId" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'收入信息'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="家庭月收入" prop="householdMonthlyIncome">
              <el-input :disabled="isCanEdit" v-model="form.individual.householdMonthlyIncome" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本人月收入" prop="monthlyIncome">
              <el-input :disabled="isCanEdit" v-model="form.individual.monthlyIncome" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'工作信息'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="实际从业年限" prop="workingSeniority">
              <el-select v-model="form.individual.workingSeniority" clearable class="form-input" placeholder :disabled="isCanEdit">
                <el-option v-for="(item,index) in dictTable.WORKING_SENIORITY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位" prop="company">
              <el-input v-model="form.individual.company" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司总机" prop="companySwitchboard">
              <el-input :disabled="isCanEdit" v-model="form.individual.companySwitchboard" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位所属行业" prop="companyIndustry">
              <el-select v-model="form.individual.companyIndustry" :disabled="isCanEdit" clearable class="form-input" placeholder>
                <el-option v-for="(item,index) in dictTable.INDUSTRY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'备注信息'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item class="desTextarea" prop="note" label="备注">
              <el-input v-model="form.individual.note" type="textarea" :rows="5" :disabled="isCanEdit" maxlength="300" show-word-limit style="width:800px;" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
    </el-form>
  </div>
</template>

<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
export default {
  components: {},
  name: "individualBusinessInfoTab",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      SelectionOptions,
      isCanEdit: true,
      addPath: "/consumer/index/add",
      routeQuery: {}, //查询参数
      dictTable: null, //字典表
      validTermEndType: false, //证件有效期截止日 是否长期
      form: {
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
      },
      dateTypeString: "yyyy-MM-dd", //时间格式
      startPickerOptions: {
        disabledDate(time) {
          let nowDate = new Date();
          return time.getTime() < nowDate.getTime() - 24 * 3600 * 1000;
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          let startDate = self.form.validTermBegin || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() + 24 * 3600 * 1000 < sdTime;
          }
        }
      }
    };
  },
  computed: {},
  created() {
    this.routeQuery = this.$route.query;
    this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
  },
  mounted() {
    try {
      this.$nextTick(function () {
        this.form = this.baseInfo;
        this.form.customerTypeName = "个人客户";
        if (this.form.individual.validTermEnd == "长期") {
          this.validTermEndType = true;
          this.form.individual.validTermEnd = null;
        } else {
          this.validTermEndType = false;
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    baseInfo: function (v) {
      this.form = v;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.corporateClient {
  .base-info-section {
    label {
      font-weight: normal;
      color: #333;
    }
  }
  .row-item {
    font-size: 14px;
    margin-bottom: 20px;
    p {
      line-height: 24px;
      padding: 0 10px;
    }
    .el-col {
      display: flex;
      justify-content: left;
      .vm {
        vertical-align: middle;
        margin: 2px 5px 0 0;
      }
    }
    .align-center-item {
      align-items: center;
    }
    label {
      color: #3a3131;
      font-weight: normal;
      margin: 0 5px 15px 0;
      display: inline-block;
    }
    span {
      color: #888;
      word-break: break-all;
      line-height: 1.5em;
    }
  }
  .row-item:last-child {
    margin-bottom: 0px;
  }
  .green {
    color: #078e34;
  }
  .tc {
    text-align: center;
  }
  .base-info-section .row-item label {
    color: #3a3131;
    font-weight: normal;
    margin: 0 5px 15px 0;
    display: inline-block;
  }
  .base-info-section .row-item span {
    color: #888888;
  }
  .mr {
    margin-right: 15px;
  }
  .tip-box {
    position: relative;
    .el-icon-info {
      position: absolute;
      left: -5px;
      top: 3px;
      color: rgba(22, 155, 213, 1);
    }
  }
  .certificate-type {
    margin-left: 45px !important;
  }
}
</style>