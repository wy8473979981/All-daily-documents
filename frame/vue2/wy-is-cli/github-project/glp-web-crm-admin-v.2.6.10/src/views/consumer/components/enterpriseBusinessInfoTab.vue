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
            <el-form-item label="客户简称" prop="shortName">
              <el-input v-model="form.enterprise.shortName" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="certificateType">
              <el-select v-model="form.certificateType" :disabled="isCanEdit" placeholder="" class="form-input">
                <el-option v-for="(item,index) in dictTable.ENT_CERTIFICATE_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
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
            <el-form-item prop="industry" label="所属行业">
              <el-select v-model="form.enterprise.industry" :disabled="isCanEdit" placeholder="" class="form-input">
                <el-option v-for="(item,index) in dictTable.INDUSTRY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="attachedIndustry" label="业务类型">
              <el-select v-model="form.enterprise.attachedIndustry" :disabled="isCanEdit" placeholder="" class="form-input">
                <el-option v-for="(item,index) in dictTable.ATTACHED_INDUSTRY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="companyScale" label="企业规模">
              <el-select v-model="form.enterprise.companyScale" :disabled="isCanEdit" placeholder="" class="form-input">
                <el-option v-for="(item,index) in dictTable.COMPANY_SCALE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item prop="financingScale" label="融资规模">
              <el-select v-model="form.enterprise.financingScale" :disabled="isCanEdit" placeholder="" class="form-input">
                <el-option v-for="(item,index) in dictTable.FINANCING_SCALE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="companyFinancingAry" label="融资需求">
              <el-select v-model="companyFinancingAry" :disabled="isCanEdit" multiple placeholder="">
                <el-option v-for="(item,index) in dictTable.COMPANY_FINANCING" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="fundUse" label="资金用途">
              <el-input v-model="form.enterprise.fundUse" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item prop="yearOperationRevenue" label="年营业收入">
              <el-select v-model="form.enterprise.yearOperationRevenue" :disabled="isCanEdit" placeholder="">
                <el-option v-for="(item,index) in dictTable.YEAR_OPERATION_REVENUE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="roadTransportationLicenseNo" label="道路运输经营许可证">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.roadTransportationLicenseNo" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="overdueFlag" label="是否存在逾期/代偿记录">
              <el-select v-model="form.overdueFlag" :disabled="isCanEdit" class="form-input" placeholder="">
                <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="是否GLP关联方" prop="glpRelated">
              <el-select v-model="form.glpRelated" :disabled="isCanEdit" class="form-input" placeholder="">
                <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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

        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item prop="customerSource" label="市场部获客来源">
              <el-select v-model="form.customerSource" placeholder="" :disabled="isCanEdit">
                <el-option v-for="(item,index) in dictTable.MARKET_CUSTOMER_SOURCE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="authStatus" label="实名状态">
              <el-select v-model="form.authStatus" :disabled="isCanEdit" placeholder="">
                <el-option v-for="(item,index) in dictTable.AUTH_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="id" label="ECIF客户ID">
              <el-input v-model="form.ecifId" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item prop="channelFlag" label="是否渠道客户">
              <el-select v-model="form.channelFlag" :disabled="isCanEdit" class="form-input" placeholder="">
                <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="recommendUserName" label="推荐人">
              <el-input v-model="form.recommendUserName" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'运费垫付补充信息'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="运输货物类型" prop="cargoTypeAry">
              <el-select v-model="cargoTypeAry" :disabled="isCanEdit" multiple placeholder="">
                <el-option v-for="(item,index) in dictTable.CARGO_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运输车辆总数" prop="vehicleSum">
              <el-input v-model="form.enterprise.vehicleSum" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物流类型" prop="logisticsType">
              <el-select v-model="form.enterprise.logisticsType" :disabled="isCanEdit" placeholder="">
                <el-option v-for="(item,index) in dictTable.LOGISTICS_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其中自有车辆占比" prop="vehicleScale">
              <el-select v-model="form.enterprise.vehicleScale" :disabled="isCanEdit" placeholder="">
                <el-option v-for="(item,index) in dictTable.VEHICLE_SCALE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主要客户名称" prop="primeCustomerName">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.primeCustomerName" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="线上信息化水平" prop="onlineInfo">
              <el-select v-model="form.enterprise.onlineInfo" :disabled="isCanEdit" placeholder="">
                <el-option v-for="(item,index) in dictTable.ONLINE_INFO" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品" prop="productName">
              <el-input v-model="form.enterprise.productName" :disabled="isCanEdit" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上一年运费收入" prop="previousYearFreightRevenue">
              <el-select v-model="form.enterprise.previousYearFreightRevenue" :disabled="isCanEdit" clearable placeholder="">
                <el-option v-for="(item,index) in dictTable.PREVIOUS_YEAR_FREIGHT_REVENUE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>

      <Card :title="'联系信息'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="企业邮箱" prop="enterpriseEmail">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.enterpriseEmail" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="传真" prop="enterpriseFax">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.enterpriseFax" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮编" prop="enterpriseZipCode">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.enterpriseZipCode" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'工商信息'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="企业类型" prop="companyOrgType">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyOrgType" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织机构代码" prop="companyOrgCode">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyOrgCode" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人" prop="companyLawPerson">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyLawPerson" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记机关" prop="companyRegisterOrg">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyRegisterOrg" class="form-input"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="企业状态" prop="companyRegisterOrg">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyRegisterOrg" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资本" prop="companyRegisterCaptial">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyRegisterCaptial" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址" prop="companyAddress">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyAddress" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="认缴资本" prop="companyActualRegisterCaptial">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyActualRegisterCaptial" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立日期" prop="companyEstablishTime">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyEstablishTime" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营期限" prop="companyBusinessEndTime">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyBusinessTerm" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="经营范围" prop="companyBusinessScope">
              <el-input :disabled="isCanEdit" v-model="form.enterprise.companyBusinessScope" type="textarea" :rows="5" maxlength="300" show-word-limit style="width:800px;" class="form-input"></el-input>
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
  name: "enterpriseBusinessInfoTab",
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
      companyFinancingAry: [], //融资需求数组
      cargoTypeAry: [], //运输货物类型
      userInfo: {}, //登录人信息
      addPath: "/consumer/index/add",
      dictTable: null, //字典表
      form: {
        name: null, //客户名称 必填
        activityChannelId: null, //市场活动渠道
        activityChannelName: null, //市场活动渠道名称
        activityId: null, //所属市场活动
        activityName: null, //所属市场活动名称
        certificateId: null, //证件号码 必填
        channelFlag: null, //是否渠道客户
        customerSource: null, //市场部获客来源
        customerSubType: null,
        customerType: "ENTERPRISE", //客户类型
        customerTypeName: "企业客户", //客户类型名称
        glpRelated: null, //是否GLP关联方
        ecifId: null, //ECIF客户ID
        overdueFlag: null, //是否存在逾期/代偿记录
        recommendUserNo: null, //推荐人编号
        recommendUserName: null, //推荐人名称
        ownerUserName: null, //拥有人名称
        ownerUserNo: null, //拥有人No
        certificateType: null, //证件类型 必填
        authStatus: null, //实名状态
        enterprise: {
          cargoType: null, //运输货物类型
          companyActualRegisterCaptial: null, //实收资本
          companyAddress: null, //住所
          companyBusinessEndTime: null, //营业期限截止日期
          companyBusinessScope: null, //经营范围
          companyBusinessState: null, //经营状态
          companyEstablishTime: null, //成立日期
          companyFinancing: [], //融资需求
          companyIndustry: null, //所在行业
          companyLawPerson: null, //法定代表人
          companyOrgCode: null, //组织机构代码
          companyOrgType: null, //企业（机构）类型
          companyProvince: null, //所在省份
          companyRegisterCaptial: null, //注册资本
          companyRegisterNo: null, //注册号
          companyRegisterOrg: null, //登记机关
          companyScale: null, //企业规模
          customerId: null,
          enterpriseEmail: null, //企业邮箱
          enterpriseFax: null, //传真
          enterpriseZipCode: null, //邮编
          financingScale: null, //融资规模
          fundUse: null, //资金用途
          industry: null, //所属行业
          attachedIndustry: null,//业务类型
          logisticsType: null, //物流类型
          onlineInfo: null, //线上信息化水平
          primeCustomerName: null, //主要客户名称
          productName: null, //产品
          roadTransportationLicenseNo: null, //道路运输经营许可证
          shortName: null, //客户简称
          vehicleScale: null, //其中自有车辆占比
          vehicleSum: null, //运输车辆总数
          yearOperationRevenue: null, //年营业收入
          previousYearFreightRevenue: null //上一年运费收入
        }
      }
    };
  },
  computed: {},
  created() {
    try {
      this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
      this.form = this.baseInfo;
      this.form.customerTypeName = "企业客户";
      //融资需求
      let companyFinancing = this.form.enterprise.companyFinancing && this.form.enterprise.companyFinancing.split(",");
      // 运输货物类型
      let cargoType = this.form.enterprise.cargoType && this.form.enterprise.cargoType.split(",");

      this.cargoTypeAry = cargoType && cargoType.map(Number) || [];
      this.companyFinancingAry = companyFinancing && companyFinancing.map(Number) || [];
      if (this.companyFinancingAry.includes(1)) {
        // 展示运费垫付补充信息
        this.companyFinancingFlag = true;
      } else {
        this.companyFinancingFlag = false;
      }
    } catch (e) {
      console.log(e);
    }
  },
  mounted() { },
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
}
</style>