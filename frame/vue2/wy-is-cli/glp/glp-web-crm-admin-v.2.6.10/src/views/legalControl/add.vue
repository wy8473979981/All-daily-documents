<template>
  <div class="legalControl">
    <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small">
      <Btns :btnsProps="btnsProps" />
      <Card :title="'基本信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName" class="btn-box">
              <el-input v-model.trim="ruleForm.customerName" clearable disabled placeholder="请查询并选择客户" class="form-input" @change="nameChange"></el-input>
              <el-button type="primary" v-if="customerNameBtnVisible" :disabled="isCanUser" @click="searchClientFun">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input clearable v-model.trim="ruleForm.name" maxlength="50" placeholder="请输入姓名" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :span="12" label="人员类型" prop="type">
              <el-select v-model="ruleForm.type" disabled clearable placeholder="">
                <el-option v-for="(item,index) in dictTable.PERSON_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="曾用名" prop="usedName">
              <el-input clearable v-model.trim="ruleForm.usedName" placeholder="请输入曾用名" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="certificateType">
              <el-select v-model="ruleForm.certificateType" :disabled="certificateTypeIsCanEdit" clearable class="form-input" placeholder="请选择证件类型">
                <el-option v-for="(item,index) in dictTable.IND_CERTIFICATE_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="tip-box">
            <el-form-item :span="12" label="证件号码" prop="certificateId">
              <el-input clearable maxlength="40" v-model.trim="ruleForm.certificateId" :disabled="certificateIdIsCanEdit" placeholder="请输入证件号码" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="gender" label="性别">
              <el-select v-model="ruleForm.gender" clearable placeholder="请选择性别">
                <el-option v-for="(item,index) in dictTable.GENDER" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族" prop="race">
              <el-input clearable v-model.trim="ruleForm.race" placeholder="请输入民族" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="birthday" label="出生日期">
              <el-date-picker v-model="ruleForm.birthday" value-format="yyyy/MM/dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item class="form-item-div" label="证件有效期起始日" prop="validTermBegin">
              <el-date-picker :picker-options="startPickerOptions" type="date" placeholder="选择开始日期" :value-format="dateTypeString" v-model="ruleForm.validTermBegin" class="form-input"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="form-item-div" label="证件有效期截止日" prop="validTermEnd">
              <el-date-picker :picker-options="endPickerOptions" type="date" :disabled="validTermEndType" placeholder="选择结束日期" :value-format="dateTypeString" v-model="ruleForm.validTermEnd" class="form-input"></el-date-picker>
              <el-checkbox v-model="validTermEndType" @change="validTermEndTypeFunc" class="certificate-type">长期</el-checkbox>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item prop="authStatus" label="实名状态">
              <el-select v-model="ruleForm.authStatus" disabled placeholder="">
                <el-option v-for="(item,index) in dictTable.AUTH_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item prop="certificateAuthority" label="证件签发机关">
              <el-input clearable v-model.trim="ruleForm.certificateAuthority" placeholder="请输入证件签发机关" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="certificateAuthority" label="证件签发机关">
              <el-input clearable v-model.trim="ruleForm.certificateAuthority" placeholder="请输入证件签发机关" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
      </Card>
      <Card :title="'联系信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="手机号码" prop="contactMobile">
              <el-input clearable v-model.trim="ruleForm.contactMobile" placeholder="请输入手机号码" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信" prop="contactWechat">
              <el-input clearable v-model.trim="ruleForm.contactWechat" placeholder="请输入微信" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="固定电话" prop="contactTelephone">
              <el-input clearable v-model.trim="ruleForm.contactTelephone" placeholder="请输入固定电话" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="QQ" prop="contactQq">
              <el-input clearable v-model.trim="ruleForm.contactQq" placeholder="请输入QQ" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="个人邮箱" prop="contactEmail">
              <el-input clearable v-model.trim="ruleForm.contactEmail" placeholder="请输入个人邮箱" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>

      <Card :title="'居住信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="dwellingStatus" label="居住状况">
              <el-select v-model="ruleForm.dwellingStatus" clearable placeholder="请选择居住状况">
                <el-option v-for="(item,index) in dictTable.DWELLING_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="省份" prop="dwellingProvince">
              <el-select v-model="ruleForm.dwellingProvince" @change="getCities" clearable placeholder="请选择省份">
                <el-option v-for="(value,name,index) in provinces" :key="index" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市" prop="dwellingCity">
              <el-select v-model="ruleForm.dwellingCity" clearable placeholder="请选择城市">
                <el-option v-for="(value,name,index) in city" :key="index" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住地" prop="dwellingAddress">
              <el-input clearable v-model="ruleForm.dwellingAddress" placeholder="请输入居住地" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮编" prop="dwellingAddressZipCode">
              <el-input clearable v-model="ruleForm.dwellingAddressZipCode" placeholder="请输入邮编" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>

      <Card :title="'教育信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="教育水平" prop="eduLevel">
              <el-select v-model="ruleForm.eduLevel" clearable placeholder="请选择教育水平">
                <el-option v-for="(item,index) in dictTable.EDU_LEVEL" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业学校" prop="graduateSchool">
              <el-input clearable v-model.trim="ruleForm.graduateSchool" placeholder="请输入毕业学校" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业年份" prop="graduationYear">
              <el-date-picker v-model="ruleForm.graduationYear" type="month" format="yyyy/MM" value-format="yyyy/MM" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'婚姻信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-select v-model="ruleForm.maritalStatus" clearable placeholder="请选择婚姻状况" @change="maritalStatusFunc">
                <el-option v-for="(item,index) in dictTable.MARITAL_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶证件类型" prop="spouseCertificateType">
              <el-select v-model="ruleForm.spouseCertificateType" :disabled="maritalStatus" clearable placeholder="请选择配偶证件类型" class="form-input">
                <el-option v-for="(item,index) in dictTable.IND_CERTIFICATE_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶姓名" prop="spouseName">
              <el-input clearable :disabled="maritalStatus" v-model.trim="ruleForm.spouseName" placeholder="请输入配偶姓名" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶证件号码" prop="spouseCertificateId">
              <el-input clearable :disabled="maritalStatus" v-model.trim="ruleForm.spouseCertificateId" placeholder="请输入配偶证件号码" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'收入信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="家庭月收入" prop="householdMonthlyIncome">
              <el-input clearable v-model.trim="ruleForm.householdMonthlyIncome" placeholder="请输入收入信息" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本人月收入" prop="monthlyIncome">
              <el-input clearable v-model.trim="ruleForm.monthlyIncome" placeholder="请输入本人月收入" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'工作信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="实际从业年限" prop="workingSeniority">
              <el-select v-model="ruleForm.workingSeniority" clearable class="form-input" placeholder="请选择实际从业年限">
                <el-option v-for="(item,index) in dictTable.WORKING_SENIORITY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位" prop="company">
              <el-input v-model.trim="ruleForm.company" clearable placeholder="请输入工作单位" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司总机" prop="companySwitchboard">
              <el-input clearable v-model.trim="ruleForm.companySwitchboard" placeholder="请输入公司总机" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位所属行业" prop="companyIndustry">
              <el-select v-model="ruleForm.companyIndustry" clearable class="form-input" placeholder="请选择工作单位所属行业">
                <el-option v-for="(item,index) in dictTable.INDUSTRY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
    </el-form>
    <!-- 查询客户 -->
    <consumerComponent :show.sync="consumerVisible" v-if="consumerVisible" :customerType="'ENTERPRISE'" :urlType="false" @listenEvent="setConsumValue"></consumerComponent>
  </div>
</template>
<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import consumerComponent from "@/components/UX/consumerComponent";
import DataApi from "@/api/legalControlService";
import { Utils } from "@/utils";
export default {
  components: {
    consumerComponent
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
      if (this.ruleForm.validTermBegin && this.ruleForm.validTermEnd) {
        if (this.ruleForm.validTermBegin > this.ruleForm.validTermEnd) {
          return callback(new Error("开始时间必须大于结束时间"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      isCanUser: false,
      provinces: null, //省
      city: null, //市
      customerNameBtnVisible: true,
      certificateIdIsCanEdit: false, //修改页面，证件号码不可编辑,为空时可编辑
      certificateTypeIsCanEdit: false, //修改页面，证件类型不可编辑,为空时可编辑
      transferAry: {},
      SelectionOptions,
      consumerVisible: false,
      actionVisible: false,
      channelVisible: false,
      belongerVisible: false,
      routeQuery: {}, //查询参数
      dictTable: null, //字典表
      validTermEndType: false, //证件有效期截止日 是否长期
      ruleForm: {
        customerName: null, //客户名称 必填
        customerId: null, //客户ID 必填
        name: null, //姓名
        type: null, //人员类型
        usedName: null, //曾用名
        certificateType: null, //证件类型
        gender: null, // 性别
        certificateId: null, //证件号码
        race: null, //民族
        validTermBegin: null, //证件有效期起始日
        validTermEnd: null, //证件有效期截止日
        authStatus: null, //实名状态
        birthday: null, //出生日期
        certificateAuthority: null, //证件签发机关

        contactEmail: null, //个人邮箱
        contactMobile: null, //手机号码
        contactQq: null, //QQ
        contactTelephone: null, //固定电话
        contactWechat: null, //微信

        dwellingStatus: null, //居住状况
        dwellingProvince: null, // 居住省
        dwellingCity: null, // 居住市
        dwellingAddress: null, // 居住地
        dwellingAddressZipCode: null, // 邮编

        eduLevel: null, //教育水平
        graduateSchool: null, //毕业学校
        graduationYear: null, //毕业年份

        maritalStatus: null, //婚姻状况
        spouseCertificateId: null, //配偶证件号码
        spouseCertificateType: null, //配偶证件类型
        spouseName: null, //配偶姓名

        householdMonthlyIncome: null, //家庭月收入
        monthlyIncome: null, //本人月收入

        workingSeniority: null, //实际从业年限
        company: null, //工作单位
        companyIndustry: null, //工作单位所属行业
        companySwitchboard: null //公司总机
      }, //表单字段
      rules: {
        //校验规则
        customerName: [{ required: true, message: "请查询并选择客户", trigger: ["blur"] }],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 50, message: "请至少输入2位", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择人员类型", trigger: ["change"] }],
        certificateType: [
          { required: true, message: "请选择证件类型", trigger: ["blur", "change"] }
        ],
        certificateId: [{ required: true, message: "请输入证件号码", trigger: ["blur"] }],
        validTermBegin: [{ validator: checkTime, trigger: ["blur", "change"] }],
        validTermEnd: [{ validator: checkTime, trigger: ["blur", "change"] }]
      },
      marketActiveData: null, //已选的市场活动
      activeChannelData: null, //已选的活动渠道
      dateTypeString: "yyyy-MM-dd", //时间格式
      startPickerOptions: {
        disabledDate(time) {
          let endDate = self.ruleForm.validTermEnd || "";
          if (endDate) {
            let sdTime = new Date(endDate).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          let startDate = self.ruleForm.validTermBegin || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() + 24 * 3600 * 1000 < sdTime;
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
      saveDetailUrl: "" //保存数据地址
    };
  },
  computed: {
    maritalStatus: {
      get() {
        return this.ruleForm.maritalStatus !== 20;
      },
      set() { }
    }
  },

  created() {
    this.routeQuery = this.$route.query;
    this.provinces = Utils.provinces;
    this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));

    if (this.routeQuery.flag == "edit") {
      this.getDetailById();
      this.customerNameBtnVisible = false;
    }

    if (this.routeQuery.activeName) {
      // 是从客户详情tab页进来的，不能使用
      this.isCanUser = true;
      this.ruleForm = {
        ...this.ruleForm,
        customerId: this.routeQuery.currConsumerId, // 客户ID
        customerName: this.routeQuery.currConsumerName // 客户名称
      };

      let currCertificateType = this.routeQuery.currCertificateType;// 客户证件类型
      if (currCertificateType == 6) {
        this.$message({ type: "warning", message: "客户为新加坡公司，无法创建法定代表及实控人" });
        this.ruleForm.customerId = null; //客户ID
        this.ruleForm.customerName = null; //客户名称
        return true;
      } else if (currCertificateType == 3) {
        this.ruleForm.type = 0;
      } else if (currCertificateType == 4) {
        this.ruleForm.type = 1;
      }
    }
  },
  mounted() {
    try {
      //
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    getDetailById(data) {
      DataApi.legalControlDetailById(this.routeQuery.legalControlId).then(
        res => {
          if (res.code == 200) {
            try {
              let { data } = res;
              this.ruleForm = data;
              if (this.ruleForm.validTermEnd == "长期") {
                this.validTermEndType = true;
                this.ruleForm.validTermEnd = null;
              } else {
                this.validTermEndType = false;
              }
              this.city = [];
              this.city = Utils.getCities(data.dwellingProvince);
            } catch (e) {
              console.log(e);
            }
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        }
      );
    },
    maritalStatusFunc(code) {
      if (code != 20) {
        this.ruleForm = {
          ...this.ruleForm,
          spouseCertificateId: null, //配偶证件号码
          spouseCertificateType: null, //配偶证件类型
          spouseName: null //配偶姓名
        };
      }
    },
    getCities(code) {
      this.city = [];
      this.ruleForm.dwellingCity = null;
      this.city = Utils.getCities(code);
    },
    searchClientFun() {
      this.consumerVisible = true;
    },
    setConsumValue(data) {
      this.IND_CERTIFICATE_TYPE = [];

      if (data.certificateType == 6) {
        this.$message({ type: "warning", message: "客户为新加坡公司，无法创建法定代表及实控人" });
        this.IND_CERTIFICATE_TYPE = [];
        this.ruleForm.customerId = null; //客户ID
        this.ruleForm.customerName = null; //客户名称
        return true;
      } else if (data.certificateType == 3) {
        this.ruleForm.type = 0;
        this.IND_CERTIFICATE_TYPE = this.dictTable.IND_CERTIFICATE_TYPE;
      } else if (data.certificateType == 4) {
        this.ruleForm.type = 1;
        this.IND_CERTIFICATE_TYPE = this.dictTable.IND_CERTIFICATE_TYPE;
      }

      this.ruleForm.customerId = data.id; //客户ID
      this.ruleForm.customerName = data.name; //客户名称
      this.consumerVisible = false;
    },
    nameChange(value) {
      if (!value) {
        this.ruleForm.name = null; //客户名称
      }
    },
    validTermEndTypeFunc(value) {
      this.validTermEndType = value;
      this.ruleForm.validTermEnd = null;
    },
    setBusinessTableRow(data) {
      this.ruleForm.name = data.entType; //企业名称（客户名称）
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.validTermEndType) {
            this.ruleForm.validTermEnd = "长期";
          }
          if (this.routeQuery.flag == "edit") {
            DataApi.updateLegalControl(this.ruleForm).then(res => {
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
            DataApi.createLegalControl(this.ruleForm).then(res => {
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
    cancelFunc() {
      // let viewType = this.routeQuery.viewType;
      // let activeName = this.routeQuery.activeName;
      // if (activeName) {
      //   //客户详情跳转来的
      //   this.$router.push({
      //     path: "/consumer/index/detail",
      //     query: {
      //       flag: "detail",
      //       activeName: this.routeQuery.activeName,
      //       currConsumerId: this.routeQuery.currConsumerId,
      //       currConsumerType: this.routeQuery.currConsumerType,
      //       currConsumerName: this.routeQuery.currConsumerName
      //     }
      //   });
      // } else {
      //   if (viewType == "detail") {
      //     this.$router.push({
      //       path: "/more/legalControlIndex/detail",
      //       query: {
      //         legalControlId: this.routeQuery.legalControlId
      //       }
      //     });
      //   } else {
      //     this.$router.push({
      //       path: "/more/legalControlIndex"
      //     });
      //   }
      // }
      localStorage.setItem("activeName", this.routeQuery.activeName);
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss">
.el-checkbox-group {
  margin-left: 10px;
}
.legalControl {
  .tip-box {
    position: relative;
    .el-icon-info {
      position: absolute;
      left: -7px;
      top: 6px;
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