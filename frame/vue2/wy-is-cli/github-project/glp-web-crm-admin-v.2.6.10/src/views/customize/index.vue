<template>
  <div>
    <div class="questionnaire ovhpart">
      <div class="qa-msg" v-show="showMsg">{{msg}}</div>
      <div class="qa-title">
        <h2>普洛斯金融合作意向表</h2>
        <p>请您如实填写以下信息</p>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="qa-ruleForm">
        <h3>
          <i class="qa-information"></i>企业信息
        </h3>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model.trim="ruleForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="企业证件号" prop="certificateId">
          <el-input v-model.trim="ruleForm.certificateId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" prop="industry">
          <el-select v-model="ruleForm.industry" placeholder="请选择">
            <el-option v-for="(item,index) in SelectionOptions.INDUSTRY" :key="index" :label="item.label" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年营业收入" prop="yearOperationRevenue">
          <el-select v-model="ruleForm.yearOperationRevenue" placeholder="请选择(人民币)">
            <el-option v-for="(item,index) in SelectionOptions.YEAR_OPERATION_REVENUE" :key="index" :label="item.label" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="融资规模" prop="financingScale">
          <el-select v-model="ruleForm.financingScale" placeholder="请选择">
            <el-option v-for="(item,index) in SelectionOptions.FINANCING_SCALE" :key="index" :label="item.label" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="融资需求" prop="companyFinancing" class="qa-need loanNeeds-box">
          <span class="qa-need-plholder">可多选</span>
          <el-checkbox-group v-model="ruleForm.companyFinancing" @change="needChange">
            <el-checkbox v-for="(item,index) in SelectionOptions.COMPANY_FINANCING" :key="index" :label="item.key">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <template v-if="loanNeedsShow">
          <el-form-item label="物流类型" prop="logisticsType">
            <el-select v-model="ruleForm.logisticsType" placeholder="请选择">
              <el-option v-for="(item,index) in SelectionOptions.LOGISTICS_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运输货物类型" prop="cargoType" class="qa-need cargoType-box">
            <span class="qa-need-plholder">可多选</span>
            <el-checkbox-group v-model="ruleForm.cargoType">
              <el-checkbox v-for="(item,index) in SelectionOptions.CARGO_TYPE" :key="index" :label="item.key">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="主要客户名称" prop="primeCustomerName">
            <el-input v-model.trim="ruleForm.primeCustomerName" placeholder="请输入主要客户名称"></el-input>
          </el-form-item>
          <el-form-item label="运输车辆总数" prop="vehicleSum" class="vehicleSum">
            <!-- <el-input v-model.trim="ruleForm.vehicleSum" placeholder="请按每月实际承运情况,填写具体数字"></el-input> -->
            <el-input v-model.trim="ruleForm.vehicleSum" oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+0)}" placeholder="请按每月实际承运情况,填写具体数字" class="form-input">
            </el-input>
          </el-form-item>
          <el-form-item label="其中自有车辆占比" prop="vehicleScale">
            <el-select v-model="ruleForm.vehicleScale" placeholder="请选择">
              <el-option v-for="(item,index) in SelectionOptions.VEHICLE_SCALE" :key="index" :label="item.label" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线上信息化水平" prop="onlineInfo" class="onlineInfo">
            <el-select v-model="ruleForm.onlineInfo" placeholder="请选择">
              <el-option v-for="(item,index) in SelectionOptions.ONLINE_INFO" :key="index" :label="item.label" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上一年运费收入" prop="previousYearFreightRevenue">
            <el-select v-model="ruleForm.previousYearFreightRevenue" placeholder="请选择">
              <el-option v-for="(item,index) in SelectionOptions.PREVIOUS_YEAR_FREIGHT_REVENUE" :key="index" :label="item.label" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </template>

        <el-form-item label="资金用途" class="fundUse-box" prop="fundUse">
          <el-input v-model.trim="ruleForm.fundUse" type="textarea" placeholder="例如:我是XX公司/平台,拟融资XX万元,用于XX..." maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <h3>
          <i class="qa-contacts"></i>联系人信息
        </h3>
        <el-form-item label="姓名" prop="contactName" class>
          <el-input v-model.trim="ruleForm.contactName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="职位" class prop="title">
          <el-input v-model.trim="ruleForm.title" placeholder="可选填"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="contactMobile" class>
          <el-input v-model.trim="ruleForm.contactMobile" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captchaCode" class="qa-identifying qa-pc-label">
          <el-input v-model.trim="ruleForm.captchaCode"></el-input>
          <el-button type="primary" @click="getCode" :disabled="identifyingDis">
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{count}} s</span>
          </el-button>
        </el-form-item>
        <el-form-item class="qa-sumbit">
          <el-button type="primary" @click="submitForm('ruleForm')" :disabled="loading">提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
import { Button, Select } from "element-ui";
import DataApi from "@/api/questionnaireService.js";
import { SelectionOptions } from "@/js/common/consts";
import { Utils } from "@/utils";

const TIME_COUNT = 60;
export default {
  data() {
    let noSpace = (rule, value, callback) => {
      if (value == " ") {
        callback(new Error("首字符不能为空格"));
      } else {
        callback();
      }
    };
    let noSpaceQT = (rule, value, callback) => {
      if (this.qaQT && value == "") {
        callback(new Error("请输入其他"));
      } else if (this.qaQT && value == " ") {
        callback(new Error("首字不为空格"));
      } else {
        callback();
      }
    };
    return {
      SelectionOptions,
      loanNeedsShow: false,
      dictTable: null, //字典表
      shows: false,
      hasmonted: false,
      qaQT: false,
      identifyingDis: false,
      loading: false,
      timer: null,
      show: true,
      showMsg: false,
      msg: "",
      count: "",
      routeQuery: null,
      requestCode: "49367cb3258f486fb8d792cf9de35a01",
      ruleForm: {
        name: null, //企业名称
        certificateId: null, //企业证件号
        contactName: null, // 姓名
        title: null, // 职位
        contactMobile: null, // 手机号
        captchaCode: null, // 验证码
        yearOperationRevenue: null, //年营业收入
        industry: null, //所属行业(0：其他 1：农业 2：工业 3：建筑业 4：房地产业 5：商贸流通业 6：交通运输业 7:仓储业 8:住宿和餐饮 9:农村 10:农民)
        financingScale: null, //融资规模(0:小于300万元 1:大于等于300小于1000万 2:大于1000万小于等于5000万 3:大于等于5000万)
        companyFinancing: [], // 融资需求:逗号分隔
        logisticsType: null, //  物流类型
        cargoType: [], // 货物类型:逗号分隔
        primeCustomerName: null, // 主要客户名称
        vehicleSum: null, //运输车辆总数
        vehicleScale: null, // 其中自有车辆占比
        onlineInfo: null, // 线上信息化水平
        previousYearFreightRevenue: null, // 上一年运费收入
        fundUse: null // 资金用途
      },
      loanNeeds: [],
      qt: "",
      rules: {
        name: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
          { min: 1, max: 100, message: "长度在1到100个字符", trigger: "blur" },
          { required: true, validator: noSpace, trigger: "blur" }
        ],
        industry: [
          {
            required: true,
            message: "请选择所属行业",
            trigger: ["change", "blur"]
          }
        ],
        yearOperationRevenue: [
          { required: true, message: "请选择年营业收入", trigger: "change" }
        ],
        financingScale: [
          { required: true, message: "请选择融资规模", trigger: "change" }
        ],
        companyFinancing: [
          { required: true, message: "请选择融资需求", trigger: "change" }
        ],
        logisticsType: [
          { required: true, message: "请选择物流类型", trigger: "change" }
        ],
        cargoType: [
          { required: true, message: "请选择货物类型", trigger: "change" }
        ],
        primeCustomerName: [
          { required: true, message: "请输入主要客户名称", trigger: "blur" }
        ],
        vehicleSum: [
          { required: true, message: "请输入运输车辆总数", trigger: "blur" }
        ],
        vehicleScale: [
          {
            required: true,
            message: "请选择其中自有车辆占比",
            trigger: "change"
          }
        ],
        onlineInfo: [
          { required: true, message: "请选择线上信息化水平", trigger: "change" }
        ],
        previousYearFreightRevenue: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        fundUse: [
          { required: true, message: "请输入资金用途", trigger: "blur" },
          { required: true, validator: noSpace, trigger: "blur" }
        ],
        contactName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { required: true, validator: noSpace, trigger: "blur" }
        ],
        contactMobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^1\d{10}$/, message: "请输入正确的手机号码" },
          { required: true, validator: noSpace, trigger: "blur" }
        ],
        captchaCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { required: true, validator: noSpace, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    try {
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
      this.routeQuery = this.$route.query;
    } catch (e) {
      console.log(e);
    }
  },
  mounted() { },
  methods: {
    needChange(e) {
      if (e.includes(1)) {
        this.loanNeedsShow = true;
      } else {
        this.loanNeedsShow = false;
      }
    },
    getCodeAbled() {
      if (/^1\d{10}$/.test(this.ruleForm.contactMobile)) {
        this.identifyingDis = false;
      } else {
        this.identifyingDis = true;
      }
    },
    qtFN(e) {
      if (!e) {
        $(".qa-qt .el-form-item__error").hide();
        // this.rules.qt = []
      } else {
        this.$refs["ruleForm"].validateField("qt");
      }
    },
    getCode(formData) {
      if (!/^1\d{10}$/.test(this.ruleForm.contactMobile)) {
        this.showMsg = true;
        this.msg = "请输入手机号";
        setTimeout(() => {
          this.showMsg = false;
        }, 3000);
        this.$refs["ruleForm"].validateField("contactMobile");
        return;
      }
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.identifyingDis = true;
        DataApi.send({ contactMobile: this.ruleForm.contactMobile })
          .then(res => {
            if (res.code == 200 && res.data) {
              this.requestCode = res.data.requestCode;
              this.showMsg = true;
              this.msg = res.message ? res.message : "短信发送成功，请注意查收";
              setTimeout(() => {
                this.showMsg = false;
              }, 3000);
            } else {
              this.showMsg = true;
              this.msg = res.message ? res.message : "短信发送失败，请稍后重试";
              setTimeout(() => {
                this.showMsg = false;
              }, 3000);
            }
          })
          .catch(err => {
            this.showMsg = true;
            this.msg = "短信发送失败，请稍后重试";
            setTimeout(() => {
              this.showMsg = false;
            }, 3000);
          });
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            this.identifyingDis = false;
          }
        }, 1000);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let companyFinancing = this.ruleForm.companyFinancing && this.ruleForm.companyFinancing.join(); // 融资需求:逗号分隔
          let cargoType = this.ruleForm.cargoType && this.ruleForm.cargoType.join(); // 货物类型:逗号分隔
          let req = {
            activityChannelId: this.routeQuery.channelId && Number(this.routeQuery.channelId) || null, //渠道
            channel: this.routeQuery.channel || null,
            name: this.ruleForm.name, //企业名称
            certificateId: this.ruleForm.certificateId, //企业证件号
            contactName: this.ruleForm.contactName, // 姓名
            title: this.ruleForm.title, // 职位
            contactMobile: this.ruleForm.contactMobile, // 手机号
            captchaCode: this.ruleForm.captchaCode, // 验证码
            enterprise: {
              yearOperationRevenue: this.ruleForm.yearOperationRevenue, //年营业收入
              industry: this.ruleForm.industry, //所属行业(0：其他 1：农业 2：工业 3：建筑业 4：房地产业 5：商贸流通业 6：交通运输业 7:仓储业 8:住宿和餐饮 9:农村 10:农民)
              financingScale: this.ruleForm.financingScale, //融资规模(0:小于300万元 1:大于等于300小于1000万 2:大于1000万小于等于5000万 3:大于等于5000万)
              companyFinancing: companyFinancing, // 融资需求:逗号分隔
              logisticsType: this.ruleForm.logisticsType, //  物流类型
              cargoType: cargoType, // 货物类型:逗号分隔
              primeCustomerName: this.ruleForm.primeCustomerName, // 主要客户名称
              vehicleSum: this.ruleForm.vehicleSum, //运输车辆总数
              vehicleScale: this.ruleForm.vehicleScale, // 其中自有车辆占比
              onlineInfo: this.ruleForm.onlineInfo, // 线上信息化水平
              previousYearFreightRevenue: this.ruleForm
                .previousYearFreightRevenue, // 上一年运费收入
              fundUse: this.ruleForm.fundUse // 资金用途
            }
          };
          DataApi.submit(req)
            .then(res => {
              this.loading = true;
              this.showMsg = true;
              if (res.code == 200) {
                this.msg = res.message ? res.message : "提交成功";
                this.$refs["ruleForm"].resetFields();//清空表单
                setTimeout(() => {
                  this.showMsg = false;
                  this.loading = false;
                }, 3000);
              } else {
                this.msg = res.message ? res.message : "提交失败";
                setTimeout(() => {
                  this.showMsg = false;
                  this.loading = false;
                }, 3000);
              }
            })
            .catch(err => {
              this.showMsg = true;
              this.loading = true;
              this.msg = "提交失败";
              setTimeout(() => {
                this.showMsg = false;
                this.loading = false;
              }, 3000);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {},
  mounted() {
    // 插入 meta 标签
    let meta =
      '<meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">';
    $("head").prepend(meta);
    // if(this.$route.query.shownav == 'yep'){
    //   this.shows = true
    // }else{
    //   this.shows = false
    // }
    let type = "";
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (
      bIsIpad ||
      bIsIphoneOs ||
      bIsMidp ||
      bIsUc7 ||
      bIsUc ||
      bIsAndroid ||
      bIsCE ||
      bIsWM
    ) {
      //phone
      type = "phone";
      this.shows = true;
      this.hasmonted = true;
      $(".questionnaire").css("padding-top", "45px");
    } else {
      console.log("ddddddddddd", type);
      type = "pc";
      $(".questionnaire").css("padding-top", "90px");
      this.shows = false;
      this.hasmonted = true;
    }
    document.title = "普洛斯金融问卷调查";

    if (
      this.ruleForm.loanNeeds &&
      this.ruleForm.loanNeeds.indexOf("其他") > -1
    ) {
      this.qaQT = true;
    } else {
      this.qaQT = false;
    }
  }
};
</script>
<style lang="scss">
@import "./index.css";
.questionnaire {
  width: 100%;
  background-color: #f5f5f5;
  .loanNeeds-box {
    position: relative;
    .el-form-item__label {
      text-align: left !important;
      padding-left: 67px !important;
    }
    .el-form-item__label:before {
      left: 123px !important;
    }
    .el-form-item__content {
      margin-left: 140px;
    }
  }
  .cargoType-box {
    position: relative;
    height: 280px !important;
    .el-form-item__label {
      text-align: left !important;
      padding-left: 42px !important;
    }
    .el-form-item__label:before {
      left: 123px !important;
    }
    .el-form-item__content {
      margin-left: 140px;
    }
  }
  .qa-title {
    width: 100%;
    background-image: url(./top.png);
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 55px 0;
    background-size: cover;
    h2 {
      margin: 0;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
      font-size: 18px;
    }
    p {
      margin: 0;
      color: rgba(255, 255, 255, 0.6);
      line-height: 20px;
      font-size: 14px;
    }
  }
  .qa-ruleForm {
    h3 {
      margin: 0;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      font-size: 16px;
      padding-left: 15px;
      height: 52px;
      line-height: 52px;
      background: rgba(245, 245, 245, 1);
      font-weight: 600;
      i {
        position: relative;
        top: 2px;
        margin-right: 5px;
      }
      .qa-information {
        width: 16px;
        height: 16px;
        display: inline-block;
        background-image: url(./information.svg);
      }
      .qa-contacts {
        width: 16px;
        height: 16px;
        display: inline-block;
        background-image: url(./contacts.svg);
      }
    }
    .el-form-item {
      height: 50px;
      margin-bottom: 0;
      border-bottom: 1px solid #f7f7f7;
      .el-select {
        width: 100%;
      }
      .el-input__inner {
        // border: 0;
        height: 49px;
        text-align: right;
      }
      .el-form-item__label {
        margin-bottom: 0;
        height: 49px;
        line-height: 50px;
        text-align: left;
        padding-left: 15px;
        position: relative;
        background-color: #fff;
      }
      .el-form-item__error {
        // top: 32px;
        // left: auto;
        // right: 15px;
      }
    }
    .qa-need {
      height: 350px;
      background: rgba(245, 245, 245, 1);
      .el-form-item__label {
        width: 100% !important;
        position: absolute;
        border-bottom: 1px solid #f7f7f7;
        text-align: left;
        padding-left: 14px;
        background-color: #fff;
      }
      .el-checkbox {
        display: block;
      }
      .el-form-item__content {
        // margin-left: 15px !important;
        top: 50px;
        .el-checkbox {
          height: 40px;
          margin-bottom: 0;
        }
        .el-checkbox-group {
          // padding: 10px 0;
        }
        .qa-need-plholder {
          color: #c0c4cc;
          font-size: 14px;
          position: absolute;
          right: 15px;
          top: -45px;
        }
        .el-form-item__error {
          // top: auto;
          // bottom: 10px;
        }
        .qa-qt-input {
          position: absolute;
          bottom: 10px;
          width: 150px;
          height: 40px;
          left: 70px;
          .el-input__inner {
            height: 40px;
            // border: 1px solid #dcdfe6;
            text-align: left;
          }
        }
      }
    }
    .qa-qt {
      display: inline-block;
      float: left;
      width: 325px;
      margin-top: -40px;
      i {
        color: #f56c6c;
        position: absolute;
        top: -48px;
        left: 59px;
      }
    }
    .qa-purpose {
      height: 111px;
      .el-form-item__label {
        width: 100% !important;
        position: absolute;
        text-align: left;
        padding-left: 14px;
        height: 35px;
      }
      .el-form-item__content {
        margin-left: 0 !important;
        .el-textarea {
          width: 100%;
          position: absolute;
          left: 0;
          top: 35px;
          .el-textarea__inner {
            height: 75px;
            border: 0;
          }
          .el-input__count {
            bottom: auto;
            top: -30px;
          }
        }
      }
    }
  }
  .qa-identifying {
    position: relative;
    .el-input__inner {
      text-align: left !important;
    }
    .el-form-item__label {
      // width: 70px !important;
    }
    .el-form-item__content {
      // margin-left: 70px !important;
    }
    .el-form-item__error {
      // right: auto !important;
      // left: 15px !important;
    }
    .el-button--primary {
      background: rgba(124, 185, 34, 1);
      border-color: rgba(124, 185, 34, 1);
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
      padding: 6px 8px;
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
    }
    .el-button.is-disabled,
    .el-button.is-disabled:focus,
    .el-button.is-disabled:hover {
      color: #c0c4cc;
      cursor: not-allowed;
      background-image: none;
      background-color: #fff;
      border-color: #ebeef5;
    }
    .el-button--primary.is-disabled,
    .el-button--primary.is-disabled:active,
    .el-button--primary.is-disabled:focus,
    .el-button--primary.is-disabled:hover {
      color: #fff;
      background-color: rgba(124, 185, 34, 0.6) !important;
      border-color: rgba(124, 185, 34, 0.2) !important;
    }
  }
  .qa-sumbit {
    height: auto !important;
    padding-top: 40px;
    padding-bottom: 20px;
    background: rgba(245, 245, 245, 1);
    .el-form-item__content {
      margin-left: 0 !important;
      display: block;
      .el-button--primary {
        background: rgba(124, 185, 34, 1);
        border-color: rgba(124, 185, 34, 1);
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        width: 100%;
        height: 50px;
      }
    }
  }
  .el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before,
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    position: absolute;
    right: 6px;
    top: 3px;
    font-size: 16px;
  }
  .qa-name.el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before,
  .qa-name.el-form-item.is-required:not(.is-no-asterisk)
    > .el-form-item__label:before {
    left: 48px;
  }
  .qa-identifying.el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before,
  .qa-identifying.el-form-item.is-required:not(.is-no-asterisk)
    > .el-form-item__label:before {
    left: 62px;
  }
  .qa-msg {
    position: fixed;
    padding: 15px 20px;
    background-color: #fff;
    top: 50px;
    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    color: #333;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
  }
  .el-button.is-disabled,
  .el-button.is-disabled:focus,
  .el-button.is-disabled:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }
  .el-button--primary.is-disabled,
  .el-button--primary.is-disabled:active,
  .el-button--primary.is-disabled:focus,
  .el-button--primary.is-disabled:hover {
    color: #fff;
    background-color: rgba(124, 185, 34, 0.6) !important;
    border-color: rgba(124, 185, 34, 0.2) !important;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: rgba(124, 185, 34, 1) !important;
    border-color: rgba(124, 185, 34, 1) !important;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label,
  .el-checkbox__inner:hover {
    color: rgba(124, 185, 34, 1) !important;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: rgba(124, 185, 34, 1) !important;
  }
}

@media screen and (min-width: 800px) {
  body {
    background-color: #242f37;
  }
  .questionnaire {
    width: 800px;
    margin: 0 auto;
    padding-top: 0;
    // overflow-x: hidden;
  }
  .questionnaire .qa-title {
    width: 800px;
    height: 340px;
    padding: 0;
    display: flex;
    margin: auto;
    justify-content: center;
    flex-direction: column-reverse;
  }
  .questionnaire .qa-title h2 {
    font-size: 30px;
    margin-top: -60px;
  }
  .el-form.qa-ruleForm {
    width: 600px;
    margin: 0 auto;
  }
  .questionnaire .qa-ruleForm .el-form-item {
    margin-bottom: 10px;
  }
  .questionnaire .qa-ruleForm .el-form-item .el-form-item__label {
    background-color: #f5f5f5;
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 20px;
    text-align: right;
  }
  .questionnaire .qa-ruleForm .el-form-item .el-input__inner {
    // border: 1px solid #dcdfe6;
    line-height: 40px;
    height: 40px;
    text-align: left;
  }
  .questionnaire .qa-ruleForm .el-form-item .el-form-item__error {
    // top: 42px;
    // right: auto;
    // left: 15px;
  }
  .questionnaire .qa-ruleForm .qa-need .el-form-item__label,
  .questionnaire .qa-ruleForm .qa-purpose .el-form-item__label {
    width: 600px !important;
  }
  .questionnaire
    .qa-ruleForm
    .qa-need
    .el-form-item__content
    .qa-need-plholder {
    right: auto;
    top: -28px;
    left: 0;
  }
  .questionnaire
    .qa-ruleForm
    .qa-need
    .el-form-item__content
    .el-checkbox-group {
    padding-top: 0;
  }
  .questionnaire .qa-ruleForm .qa-need .el-form-item__content {
    top: 30px;
    // margin-left: 100px !important;
  }
  .questionnaire .qa-ruleForm .qa-need .el-form-item__content .el-checkbox {
    height: 30px;
  }
  .questionnaire .qa-ruleForm .qa-need {
    height: 250px;
  }
  .questionnaire .qa-ruleForm .qa-purpose .el-form-item__content .el-textarea {
    border: 1px solid #dcdfe6;
    margin-left: 100px;
    top: 5px;
    width: 500px;
  }
  .questionnaire
    .qa-ruleForm
    .qa-purpose
    .el-form-item__content
    .el-textarea
    .el-input__count {
    bottom: 0;
    top: auto;
  }
  .questionnaire
    .qa-ruleForm
    .qa-purpose
    .el-form-item__content
    .el-textarea
    .el-textarea__inner {
    height: 90px;
  }
  .questionnaire .qa-identifying .el-form-item__content {
    // margin-left: 100px !important;
  }
  .questionnaire .qa-identifying .el-form-item__label {
    // width: 100px !important;
  }
  .questionnaire .qa-sumbit .el-form-item__content .el-button--primary {
    width: 50%;
    margin: 0 auto 30px;
    display: block;
    height: 40px;
    min-width: 200px;
  }
  .questionnaire
    .qa-ruleForm
    .el-form-item.qa-pc-label.qa-identifying
    .el-form-item__label {
    padding-left: 29px;
  }
  .questionnaire .qa-ruleForm .el-form-item.qa-pc-label .el-form-item__label {
    padding-left: 42px;
  }
  .questionnaire
    .qa-name.el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before,
  .questionnaire
    .qa-name.el-form-item.is-required:not(.is-no-asterisk)
    > .el-form-item__label:before {
    left: 74px;
  }
  .questionnaire
    .qa-identifying.el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before,
  .questionnaire
    .qa-identifying.el-form-item.is-required:not(.is-no-asterisk)
    > .el-form-item__label:before {
    left: 74px;
  }
  .questionnaire .qa-ruleForm .qa-need .el-form-item__error {
    // bottom: 0 !important;
    // left: 0;
  }
  .questionnaire .qa-ruleForm .qa-need .el-form-item__content .qa-qt-input {
    bottom: -20px;
    left: -20px;
  }
  .questionnaire .qa-ruleForm .qa-qt i {
    top: -18px;
    left: -35px;
  }
  .questionnaire .qa-ruleForm .qa-need .qa-qt .el-form-item__error {
    // left: 150px;
    // bottom: -5px !important;
  }
}

@media screen and (max-width: 414px) {
  * {
    -webkit-tap-highlight-color: transparent !important;
  }
  .questionnaire {
    .qa-ruleForm {
      .el-form-item {
        .el-input__inner {
          border: none;
        }
      }
      .vehicleSum {
        .el-form-item__label {
          width: 108px !important;
        }
        .el-form-item__content {
          margin-left: 108px !important;
          .el-input__inner {
            padding-left: 0px;
          }
        }
      }
      .onlineInfo {
        .el-form-item__label {
          width: 108px !important;
        }
        .el-form-item__content {
          margin-left: 108px !important;
          .el-input__inner {
            padding-left: 0px;
          }
        }
      }
      .el-form-item.is-required:not(.is-no-asterisk)
        > .el-form-item__label:before {
        left: 5px;
      }
      .loanNeeds-box {
        .el-form-item__label {
          padding-left: 15px !important;
        }
        .el-form-item__label:before {
          left: 5px !important;
        }
        .el-form-item__content {
          margin-left: 15px !important;
          .el-form-item__error {
            position: absolute;
            text-align: right;
            top: -21px;
            right: 16px;
          }
        }
      }
      .cargoType-box {
        height: 380px !important;
        .el-form-item__label {
          padding-left: 15px !important;
        }
        .el-form-item__label:before {
          left: 5px !important;
        }
        .el-form-item__content {
          margin-left: 15px !important;
          .el-form-item__error {
            position: absolute;
            text-align: right;
            top: -21px;
            right: 16px;
          }
        }
      }
      .fundUse-box {
        height: 110px;
        .el-form-item__label {
          width: 100% !important;
        }
        .el-form-item__content {
          margin-left: 0px !important;
          .el-textarea {
            padding: 0 5px;
            margin-top: 5px;
          }
          .el-textarea__inner {
            // border: none;
            // padding-left: 0px;
            min-height: 49px;
            // border-radius: 0;
            // padding-top:2px;
          }
          .el-form-item__error {
            position: absolute;
            text-align: right;
            top: 105px;
            right: 16px;
          }
        }
      }
      .el-textarea .el-input__count {
        background: none;
        bottom: -10px;
      }
      .el-form-item__content {
        position: relative;
        .el-form-item__error {
          position: absolute;
          text-align: right;
          top: 30px;
          right: 16px;
        }
        .el-checkbox {
          height: 20px;
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
