<template>
  <div class="corporateClient">
    <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small">
      <Btns :btnsProps="btnsProps" />
      <Card :title="'基本信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="name" class="btn-box">
              <el-input v-model.trim="ruleForm.name" clearable placeholder="请查询并选择客户" class="form-input" maxlength="50" @change="nameChange"></el-input>
              <el-button type="primary" @click="searchBusinessFun">查询工商</el-button>
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
            <el-form-item label="客户简称" prop="shortName">
              <el-input clearable v-model.trim="ruleForm.enterprise.shortName" placeholder="请输入客户简称" class="form-input"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="证件类型" prop="certificateType">
              <el-select v-model="ruleForm.certificateType" :disabled="certificateTypeIsCanEdit" clearable placeholder="请选择证件类型" class="form-input">
                <el-option v-for="(item,index) in dictTable.ENT_CERTIFICATE_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
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
            <el-form-item prop="industry" label="所属行业">
              <el-select v-model="ruleForm.enterprise.industry" clearable placeholder="请选择所属行业" class="form-input">
                <el-option v-for="(item,index) in dictTable.INDUSTRY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="attachedIndustry" label="业务类型">
              <el-select v-model="ruleForm.enterprise.attachedIndustry" clearable placeholder="请选择业务类型" class="form-input">
                <el-option v-for="(item,index) in dictTable.ATTACHED_INDUSTRY" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="companyScale" label="企业规模">
              <el-select v-model="ruleForm.enterprise.companyScale" clearable placeholder="请选择企业规模" class="form-input">
                <el-option v-for="(item,index) in dictTable.COMPANY_SCALE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="financingScale" label="融资规模">
              <el-select v-model="ruleForm.enterprise.financingScale" clearable placeholder="请选择融资规模" class="form-input">
                <el-option v-for="(item,index) in dictTable.FINANCING_SCALE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="companyFinancingAry" label="融资需求">
              <el-select v-model="companyFinancingAry" multiple clearable placeholder="请选择融资需求" @change="companyFinancingFunc">
                <el-option v-for="(item,index) in dictTable.COMPANY_FINANCING" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="fundUse" label="资金用途">
              <el-input v-model.trim="ruleForm.enterprise.fundUse" placeholder="请输入资金用途" clearable class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="yearOperationRevenue" label="年营业收入">
              <el-select v-model="ruleForm.enterprise.yearOperationRevenue" clearable placeholder="请选择年营业收入">
                <el-option v-for="(item,index) in dictTable.YEAR_OPERATION_REVENUE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="roadTransportationLicenseNo" label="道路运输经营许可证">
              <el-input clearable v-model.trim="ruleForm.enterprise.roadTransportationLicenseNo" placeholder="请输入道路运输经营许可证" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="overdueFlag" label="是否存在逾期/代偿记录">
              <el-select v-model="ruleForm.overdueFlag" clearable placeholder="请选择是否存在逾期/代偿记录" class="form-input">
                <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="是否GLP关联方" prop="glpRelated">
              <el-select v-model="ruleForm.glpRelated" clearable placeholder="请选择是否GLP关联方" class="form-input">
                <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="activityName" label="所属市场活动" class="btn-box">
              <el-input v-model="ruleForm.activityName" clearable placeholder="请查询并选择所属市场活动" disabled class="form-input"></el-input>
              <el-button type="primary" @click="searchActionFun">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="activityChannelName" label="市场活动渠道" class="btn-box">
              <el-input v-model="ruleForm.activityChannelName" clearable disabled placeholder="请查询并选择市场活动渠道" class="form-input"></el-input>
              <el-button type="primary" :disabled="isCanUserSearchChannel" @click="searchChannelFun">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="customerSource" label="市场部获客来源">
              <el-select v-model="ruleForm.customerSource" clearable placeholder="请选择市场部获客来源">
                <el-option v-for="(item,index) in dictTable.MARKET_CUSTOMER_SOURCE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="authStatus" label="实名状态">
              <el-select v-model="ruleForm.authStatus" disabled placeholder="">
                <el-option v-for="(item,index) in dictTable.AUTH_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="id" label="ECIF客户ID">
              <el-input v-model="ruleForm.ecifId" :disabled="true" placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item prop="channelFlag" label="是否渠道客户">
              <el-select v-model="ruleForm.channelFlag" clearable placeholder="请选择是否渠道客户" class="form-input">
                <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="recommendUserName" label="推荐人" class="btn-box">
              <el-input v-model="ruleForm.recommendUserName" class="form-input" placeholder="请查询并选择推荐人" disabled></el-input>
              <el-button type="primary" @click="searchBelongerFun">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'运费垫付补充信息'" v-show="companyFinancingFlag">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="运输货物类型" prop="cargoTypeAry">
              <el-select v-model="cargoTypeAry" clearable multiple placeholder="请选择运输货物类型" @change="cargoTypeFunc">
                <el-option v-for="(item,index) in dictTable.CARGO_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运输车辆总数" prop="vehicleSum">
              <el-input clearable v-model.trim="ruleForm.enterprise.vehicleSum" placeholder="请输入运输车辆总数" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物流类型" prop="logisticsType">
              <el-select v-model="ruleForm.enterprise.logisticsType" clearable placeholder="请选择物流类型">
                <el-option v-for="(item,index) in dictTable.LOGISTICS_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其中自有车辆占比" prop="vehicleScale">
              <el-select v-model="ruleForm.enterprise.vehicleScale" clearable placeholder="请选择其中自有车辆占比">
                <el-option v-for="(item,index) in dictTable.VEHICLE_SCALE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主要客户名称" prop="primeCustomerName">
              <el-input clearable v-model.trim="ruleForm.enterprise.primeCustomerName" placeholder="请输入主要客户名称" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="线上信息化水平" prop="onlineInfo">
              <el-select v-model="ruleForm.enterprise.onlineInfo" clearable placeholder="请选择线上信息化水平">
                <el-option v-for="(item,index) in dictTable.ONLINE_INFO" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品" prop="productName">
              <el-input clearable v-model.trim="ruleForm.enterprise.productName" placeholder="请输入产品" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上一年运费收入" prop="previousYearFreightRevenue">
              <el-select v-model="ruleForm.enterprise.previousYearFreightRevenue" clearable placeholder="请选择上一年运费收入">
                <el-option v-for="(item,index) in dictTable.PREVIOUS_YEAR_FREIGHT_REVENUE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>

      <Card :title="'联系信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="企业邮箱" prop="enterpriseEmail">
              <el-input clearable v-model.trim="ruleForm.enterprise.enterpriseEmail" placeholder="请输入企业邮箱" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="传真" prop="enterpriseFax">
              <el-input clearable v-model.trim="ruleForm.enterprise.enterpriseFax" placeholder="请输入传真" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮编" prop="enterpriseZipCode">
              <el-input clearable v-model.trim="ruleForm.enterprise.enterpriseZipCode" placeholder="请输入邮编" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'  工商信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="企业类型" prop="companyOrgType">
              <el-input disabled v-model="ruleForm.enterprise.companyOrgType" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织机构代码" prop="companyOrgCode">
              <el-input disabled v-model="ruleForm.enterprise.companyOrgCode" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定代表人" prop="companyLawPerson">
              <el-input disabled v-model="ruleForm.enterprise.companyLawPerson" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记机关" prop="companyRegisterOrg">
              <el-input disabled v-model="ruleForm.enterprise.companyRegisterOrg" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业状态" prop="companyBusinessState">
              <el-input disabled v-model="ruleForm.enterprise.companyBusinessState" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资本" prop="companyRegisterCaptial">
              <el-input disabled v-model="ruleForm.enterprise.companyRegisterCaptial" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址" prop="companyAddress">
              <el-input disabled v-model="ruleForm.enterprise.companyAddress" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="认缴资本" prop="companyActualRegisterCaptial">
              <el-input disabled v-model="ruleForm.enterprise.companyActualRegisterCaptial" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立日期" prop="companyEstablishTime">
              <el-input disabled value-format="yyyy/MM/dd" v-model="ruleForm.enterprise.companyEstablishTime" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营期限" prop="companyBusinessTerm">
              <el-input disabled v-model="ruleForm.enterprise.companyBusinessTerm" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="一般经营范围" prop="companyBusinessScope">
              <el-input disabled v-model="ruleForm.enterprise.companyBusinessScope" type="textarea" :rows="5" maxlength="300" show-word-limit style="width:800px;" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
    </el-form>

    <!-- 查询工商信息 -->
    <businessModal :show.sync="businessVisible" v-if="businessVisible" :name="customerName" @listenEvent="setBusinessTableRow"></businessModal>

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
    return {
      customerName: null, //客户名称
      certificateIdIsCanEdit: false, //修改页面，ECIF客户ID为空时可编辑
      certificateTypeIsCanEdit: false, //修改页面，ECIF客户ID为空时可编辑
      transferAry: {},
      SelectionOptions,
      businessVisible: false,
      actionVisible: false,
      channelVisible: false,
      belongerVisible: false,
      lockingStatus: "00",// crm内部是否有效 00 -有效， 01-无效 
      companyFinancingFlag: false, //融资需求是否选择运费垫付
      companyFinancingAry: [], //融资需求数组
      cargoTypeAry: [], //运输货物类型
      routeQuery: {}, //查询参数
      ruleForm: {
        id: null, //客户id 必填
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
          companyActualRegisterCaptial: null, //认缴资本
          companyAddress: null, //住所
          companyBusinessTerm: null, //营业期限
          companyBusinessScope: null, //一般经营范围
          companyBusinessState: null, //企业状态
          companyEstablishTime: null, //成立日期
          companyFinancing: "", //融资需求
          companyIndustry: null, //所在行业
          companyLawPerson: null, //法定代表人
          companyOrgCode: null, //组织机构代码
          companyOrgType: null, //企业类型
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
        ]
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
      dictTable: null, //字典表
      marketActiveData: null, //已选的市场活动
      activeChannelData: null, //已选的活动渠道
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
    }
  },

  created() {
    try {
      this.routeQuery = this.$route.query;
      this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
      if (this.routeQuery.flag == "edit") {
        this.ruleForm = this.baseInfo;
        //融资需求
        let companyFinancing = this.ruleForm.enterprise.companyFinancing && this.ruleForm.enterprise.companyFinancing.split(",");

        // 运输货物类型
        let cargoType = this.ruleForm.enterprise.cargoType && this.ruleForm.enterprise.cargoType.split(",");

        this.companyFinancingAry = companyFinancing && companyFinancing.map(Number) || [];
        this.cargoTypeAry = cargoType && cargoType.map(Number) || [];

        if (this.companyFinancingAry.includes(1)) {
          // 展示运费垫付补充信息
          this.companyFinancingFlag = true;
        } else {
          this.companyFinancingFlag = false;
        }

        this.ruleForm.customerTypeName = "企业客户";

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
  mounted() { },
  watch: {
    baseInfo: function (v) {
      this.ruleForm = v;
    }
  },
  methods: {
    nameChange(value) {
      if (!value) {
        this.ruleForm.name = null; //客户名称
      }
    },
    cargoTypeFunc(data) {
      //  运输货物类型
      this.ruleForm.enterprise.cargoType = data.join();
      this.cargoTypeAry = data;
    },
    companyFinancingFunc(data) {
      if (data && data.includes(1)) {
        // 展示运费垫付补充信息
        this.companyFinancingFlag = true;
      } else {
        this.companyFinancingFlag = false;
      }
      this.ruleForm.enterprise.companyFinancing = data.join(); //融资需求
      this.companyFinancingAry = data; //融资需求
    },
    searchActionFun() {
      this.actionVisible = true;
    },
    setBusinessTableRow(data) {
      this.ruleForm.certificateId = data.uniscid; // 证件号码
      this.ruleForm.certificateType = 3; //点击回填信息，证件类型默认为3

      this.ruleForm.name = data.name; //企业名称（客户名称）
      this.ruleForm.enterprise.companyOrgType = data.entType; //企业类型
      this.ruleForm.enterprise.companyOrgCode = data.licid; //组织机构代码
      this.ruleForm.enterprise.companyLawPerson = data.legalPerson; //法定代表人
      this.ruleForm.enterprise.companyRegisterOrg = data.regOrg; //登记机关

      this.ruleForm.enterprise.companyBusinessState = data.entstatus; //企业状态

      this.ruleForm.enterprise.companyRegisterCaptial = data.regCapital; //注册资本
      this.ruleForm.enterprise.companyAddress = data.address; //地址
      this.ruleForm.enterprise.companyActualRegisterCaptial = data.actualPay; //认缴资本
      this.ruleForm.enterprise.companyEstablishTime = data.esDate; //成立日期
      this.ruleForm.enterprise.companyBusinessTerm = data.operationDate; //经营期限
      this.ruleForm.enterprise.companyBusinessScope = data.operationScope; //一般经营范围
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
      this.customerName = this.ruleForm.name;
    },
    searchChannelFun() {
      this.channelVisible = true;
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
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
        // this.$router.push({
        //   name: "consumerDetail",
        //   params: {
        //     currConsumerId: this.routeQuery.currConsumerId,
        //     currConsumerType: this.routeQuery.currConsumerType
        //   }
        // });
      } else {
        this.$router.push({
          path: this.ListPath
        });
      }
    }
  }
};
</script>

<style lang="scss">
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