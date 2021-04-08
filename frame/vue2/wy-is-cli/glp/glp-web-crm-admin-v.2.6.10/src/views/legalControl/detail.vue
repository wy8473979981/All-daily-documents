<template>
  <div class="legalControl">
    <el-form class="form-section block-form" :model="ruleForm" ref="ruleForm" inline size="small">
      <Btns :btnsProps="btnsProps" />
      <Card :title="'基本信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName" class="btn-box">
              <el-input v-model="ruleForm.customerName" clearable disabled class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input clearable v-model="ruleForm.name" maxlength="50" disabled placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :span="12" label="人员类型" prop="type">
              <el-select v-model="ruleForm.type" clearable disabled placeholder="">
                <el-option v-for="(item,index) in dictTable.PERSON_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="曾用名" prop="usedName">
              <el-input clearable v-model="ruleForm.usedName" disabled placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="certificateType">
              <el-select v-model="ruleForm.certificateType" disabled clearable class="form-input" placeholder="">
                <el-option v-for="(item,index) in dictTable.IND_CERTIFICATE_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="tip-box">
            <el-form-item :span="12" label="证件号码" prop="certificateId">
              <el-input clearable maxlength="40" v-model="ruleForm.certificateId" disabled placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="gender" label="性别">
              <el-select v-model="ruleForm.gender" disabled clearable placeholder="">
                <el-option v-for="(item,index) in dictTable.GENDER" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族" prop="race">
              <el-input clearable v-model="ruleForm.race " disabled placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="birthday" label="出生日期">
              <el-date-picker disabled v-model="ruleForm.birthday" value-format="yyyy/MM/dd" type="date" placeholder=""></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item class="form-item-div" label="证件有效期起始日" prop="validTermBegin">
              <el-date-picker type="date" disabled placeholder="" :value-format="dateTypeString" v-model="ruleForm.validTermBegin" class="form-input"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="form-item-div" label="证件有效期截止日" prop="validTermEnd">
              <el-date-picker :picker-options="endPickerOptions" type="date" disabled placeholder="" :value-format="dateTypeString" v-model="ruleForm.validTermEnd" class="form-input"></el-date-picker>
              <el-checkbox v-model="validTermEndType" disabled class="certificate-type">长期</el-checkbox>
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
              <el-input clearable disabled v-model="ruleForm.certificateAuthority" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="certificateAuthority" label="证件签发机关">
              <el-input clearable disabled v-model="ruleForm.certificateAuthority" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
      </Card>
      <Card :title="'联系信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="手机号码" prop="contactMobile">
              <el-input clearable disabled v-model="ruleForm.contactMobile" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信" prop="contactWechat">
              <el-input clearable disabled v-model="ruleForm.contactWechat" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="固定电话" prop="contactTelephone">
              <el-input clearable disabled v-model="ruleForm.contactTelephone" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="QQ" prop="contactQq">
              <el-input clearable disabled v-model="ruleForm.contactQq" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="个人邮箱" prop="contactEmail">
              <el-input clearable disabled v-model="ruleForm.contactEmail" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>

      <Card :title="'居住信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="dwellingStatus" label="居住状况">
              <el-select v-model="ruleForm.dwellingStatus" disabled clearable placeholder="">
                <el-option v-for="(item,index) in dictTable.DWELLING_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="省份" prop="dwellingProvince">
              <el-select v-model="ruleForm.dwellingProvince" @change="getCities" clearable disabled placeholder="">
                <el-option v-for="(value,name,index) in provinces" :key="index" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市" prop="dwellingCity">
              <el-select v-model="ruleForm.dwellingCity" disabled clearable placeholder="">
                <el-option v-for="(value,name,index) in city" :key="index" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住地" prop="dwellingAddress">
              <el-input clearable disabled v-model="ruleForm.dwellingAddress" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮编" prop="dwellingAddressZipCode">
              <el-input clearable disabled v-model="ruleForm.dwellingAddressZipCode" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>

      <Card :title="'教育信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="教育水平" prop="eduLevel">
              <el-select v-model="ruleForm.eduLevel" disabled clearable placeholder="">
                <el-option v-for="(item,index) in dictTable.EDU_LEVEL" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业学校" prop="graduateSchool">
              <el-input clearable disabled v-model="ruleForm.graduateSchool" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业年份" prop="graduationYear">
              <el-date-picker disabled v-model="ruleForm.graduationYear" type="month" format="yyyy/MM" value-format="yyyy/MM" placeholder=""></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'婚姻信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-select v-model="ruleForm.maritalStatus" disabled clearable placeholder="">
                <el-option v-for="(item,index) in dictTable.MARITAL_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶证件类型" prop="spouseCertificateType">
              <el-select v-model="ruleForm.spouseCertificateType" disabled clearable class="form-input" placeholder="">
                <el-option v-for="(item,index) in dictTable.IND_CERTIFICATE_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶姓名" prop="spouseName">
              <el-input clearable disabled v-model="ruleForm.spouseName" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配偶证件号码" prop="spouseCertificateId">
              <el-input clearable disabled v-model="ruleForm.spouseCertificateId" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'收入信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="家庭月收入" prop="householdMonthlyIncome">
              <el-input clearable disabled v-model="ruleForm.householdMonthlyIncome" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本人月收入" prop="monthlyIncome">
              <el-input clearable disabled v-model="ruleForm.monthlyIncome" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'工作信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="实际从业年限" prop="workingSeniority">
              <el-select v-model="ruleForm.workingSeniority" disabled clearable class="form-input" placeholder="">
                <el-option v-for="(item,index) in dictTable.WORKING_SENIORITY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位" prop="company">
              <el-input v-model="ruleForm.company" clearable disabled placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司总机" prop="companySwitchboard">
              <el-input clearable disabled v-model="ruleForm.companySwitchboard" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位所属行业" prop="companyIndustry">
              <el-select v-model="ruleForm.companyIndustry" clearable disabled class="form-input" placeholder="">
                <el-option v-for="(item,index) in dictTable.INDUSTRY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'操作记录'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="12">
            <label>信息创建:</label>
            <span class="mr">{{ruleForm.createUserName?ruleForm.createUserName:'-'}}</span>
            <span>{{ruleForm.createTime?ruleForm.createTime:'-'}}</span>
          </el-col>
          <el-col :span="12">
            <label>最后修改:</label>
            <span class="mr">{{ruleForm.updateUserName?ruleForm.updateUserName:'-'}}</span>
            <span>{{ruleForm.updateTime?ruleForm.updateTime:'-'}}</span>
          </el-col>
        </el-row>
      </Card>
    </el-form>
    <!-- 删除 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/legalControlService";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  components: {},
  data() {
    return {
      activeName: "first",
      provinces: null, //省
      city: null, //市
      routeQuery: null,
      dictTable: null, //字典表
      SelectionOptions,
      deleteVisible: false,
      validTermEndType: false, //证件有效期截止日 是否长期
      btnsProps: {},
      dateTypeString: "yyyy-MM-dd", //时间格式
      startPickerOptions: {
        disabledDate(time) {
          let nowDate = new Date();
          return time.getTime() < nowDate.getTime() - 24 * 3600 * 1000;
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
      } //表单字段
    };
  },
  computed: {},
  created() {
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.routeQuery = this.$route.query;
    this.provinces = Utils.provinces;
    this.getDetailById();
  },
  mounted() { },
  methods: {
    getDetailById(data) {
      DataApi.legalControlDetailById(this.routeQuery.legalControlId).then(
        res => {
          if (res.code == 200) {
            try {
              let { data } = res;
              this.ruleForm = {
                ...data,
                createTime: Utils.timestampToTime(data.createTime, 2),
                updateTime: Utils.timestampToTime(data.updateTime, 2)
              };
              if (this.ruleForm.validTermEnd == "长期") {
                this.validTermEndType = true;
                this.ruleForm.validTermEnd = null;
              } else {
                this.validTermEndType = false;
              }

              this.city = [];
              this.city = Utils.getCities(data.dwellingProvince);

              if (data) {
                this.btnsProps = {};
                data.buttonList && data.buttonList.map((item, index) => {
                  if (Utils.btnAuthority("CRM_LEGAL_CONTROL_EDIT") && item.buttonType == "CRM_EDIT" && item.enable) {
                    this.btnsProps["edit"] = {
                      text: "修改",
                      func: this.editFunc
                    };
                  } else if (Utils.btnAuthority("CRM_LEGAL_CONTROL_DEL") && item.buttonType == "CRM_DEL" && item.enable) {
                    this.btnsProps["delete"] = {
                      text: "删除",
                      func: this.deleteFunc
                    };
                  }
                });
                this.btnsProps["cancel"] = { text: "返回", func: this.cancelFunc };
              }
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
    getCities(code) {
      this.city = [];
      this.city = Utils.getCities(code);
    },
    deleteFunc(item) {
      this.deleteVisible = true;
      this.dialogTxt = `确认删除法定代表及实控人？<p>${this.ruleForm.name}</p>`;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let message = "删除成功！";
        let params = { ids: [this.ruleForm.id] };
        DataApi.deleteLegalControl(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.cancelFunc();
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      } else {
        this.deleteVisible = false;
      }
    },
    editFunc() {
      let activeName = this.routeQuery.activeName;
      if (activeName) {
        //客户详情跳转来的,点击修改需要带上这些参数
        this.$router.push({
          path: "/more/legalControlIndex/edit",
          query: {
            flag: "edit",
            legalControlId: this.routeQuery.legalControlId,
            activeName: this.routeQuery.activeName,
            currConsumerId: this.routeQuery.currConsumerId,
            currConsumerType: this.routeQuery.currConsumerType,
            currConsumerName: this.routeQuery.currConsumerName,
          }
        });
      } else {
        this.$router.push({
          path: "/more/legalControlIndex/edit",
          query: {
            flag: "edit",
            viewType: "detail",
            legalControlId: this.ruleForm.id
          }
        });
      }
    },
    cancelFunc() {
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
      //   this.$router.push({
      //     path: "/more/legalControlIndex"
      //   });
      // }
      localStorage.setItem("activeName", this.routeQuery.activeName);
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss">
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
  .body-center {
    .el-dialog__body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      p {
        margin: 15px 0 0 0;
      }
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
  .mr {
    margin-right: 15px;
  }
  .row-item {
    font-size: 14px;
    margin-bottom: 20px;
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
}
</style>