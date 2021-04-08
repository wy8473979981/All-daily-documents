<template>
  <div class="content site-content">
    <div class="section">
      <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small" label-width="150px">
        <Btns :btnsProps="btnsProps" />
        <Card :title="'基本信息'">
          <el-row class :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户名称" prop="customerName" class="btn-box">
                <el-input v-model="ruleForm.customerName" placeholder="请查询并选择客户" disabled class="form-input"></el-input>
                <el-button type="primary" :disabled="isCanUser" @click="searchClientFun">查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户类型" prop="customerTypeName">
                <el-input v-model="ruleForm.customerTypeName" disabled placeholder="请输入客户类型" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址类型" prop="addressType">
                <el-select v-model="ruleForm.addressType" clearable placeholder="请选择地址类型">
                  <el-option v-for="(item,index) in CUSTOMER_ADDRESS_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省份" prop="addressProvince">
                <el-select v-model="ruleForm.addressProvince" clearable placeholder="请选择省份" @change="getCities">
                  <el-option v-for="(value,name,index) in provinces" :key="index" :label="value" :value="name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市" prop="addressCity">
                <el-select v-model="ruleForm.addressCity" clearable placeholder="请选择城市" @change="getCounties">
                  <el-option v-for="(value,name,index) in city" :key="index" :label="value" :value="name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区县" prop="addressCounty">
                <el-select v-model="ruleForm.addressCounty" clearable placeholder="请选择区县">
                  <el-option v-for="(value,name,index) in county" :key="index" :label="value" :value="name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮编" prop="zipCode">
                <el-input v-model.trim="ruleForm.zipCode" clearable placeholder="请输入邮编" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="12">
              <el-form-item label="详细地址" prop="addressDetail">
                <el-input v-model.trim="ruleForm.addressDetail" type="textarea" :rows="5" maxlength="300" show-word-limit style="width:800px;" placeholder="请输入详细地址" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
      </el-form>
    </div>
    <!-- 查询客户 -->
    <consumerComponent :show.sync="consumerVisible" v-if="consumerVisible" :urlType="false" @listenEvent="setConsumerValue"></consumerComponent>
  </div>
</template>
<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/siteService";
import consumerComponent from "@/components/UX/consumerComponent";
import { Utils } from "@/utils";
export default {
  components: {
    consumerComponent
  },
  data() {
    return {
      provinces: null, //省
      city: null, //市
      county: null, //区
      SelectionOptions,
      consumerVisible: false,
      dictTable: null, //字典表
      CUSTOMER_ADDRESS_TYPE: null, //地址类型
      routeQuery: null,
      isCanUser: false, //能不能使用客户查询
      ruleForm: {
        customerId: null, // 客户ID
        customerName: null, // 客户名称
        customerType: null, //客户类型
        customerTypeName: null, //客户类型名称
        addressType: null, // 地址类型
        addressProvince: null, //省
        addressCity: null, //市
        addressCounty: null, // 区
        zipCode: null, //邮编
        addressDetail: null //详细地址
      },
      rules: {
        customerName: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        addressType: [
          { required: true, message: "请选择地址类型", trigger: "change" }
        ],
        addressProvince: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        addressCity: [
          { required: true, message: "请选择城市", trigger: "change" }
        ],
        addressCounty: [
          { required: true, message: "请选择区县", trigger: "change" }
        ],
        addressDetail: [
          { required: true, message: "请输入详细地址", trigger: "change" }
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
      ListPath: "/more/siteIndex" //列表路由地址
    };
  },
  computed: {},
  created() {
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.routeQuery = this.$route.query;
    this.provinces = Utils.provinces;
    if (this.routeQuery.flag == "edit") {
      this.getDetail();
    } else {
      if (this.routeQuery.currConsumerType == "ENTERPRISE") {
        this.ruleForm = {
          ...this.ruleForm,
          customerType: "ENTERPRISE", //客户类型
          customerTypeName: "企业客户" //客户类型名称
        };
      } else if (this.routeQuery.currConsumerType == "INDIVIDUAL") {
        this.ruleForm = {
          ...this.ruleForm,
          customerType: "INDIVIDUAL", //客户类型
          customerTypeName: "个人客户" //客户类型名称
        };
      }
    }
    if (this.routeQuery.activeName) {
      // 是从客户详情tab页进来的，不能使用
      this.isCanUser = true;
      let customerTypeName =
        this.routeQuery.currConsumerType == "ENTERPRISE"
          ? "企业客户"
          : "个人客户";
      this.ruleForm = {
        ...this.ruleForm,
        customerId: this.routeQuery.currConsumerId, // 客户ID
        customerName: this.routeQuery.currConsumerName, // 客户名称
        customerType: this.routeQuery.currConsumerType, //客户类型
        customerTypeName: customerTypeName //客户类型名称
      };
      if (this.routeQuery.currConsumerType == "ENTERPRISE") {
        this.CUSTOMER_ADDRESS_TYPE = this.dictTable.ENTERPRISE_ADDRESS_TYPE;
      } else {
        this.CUSTOMER_ADDRESS_TYPE = this.dictTable.INDIVIDUAL_ADDRESS_TYPE;
      }
    }
  },
  mounted() { },
  methods: {
    getDetail() {
      DataApi.siteDetailById(this.routeQuery.siteId).then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.ruleForm = {
            id: data.id,
            customerId: data.customerId, // 客户ID
            customerName: data.customerName, // 客户名称
            customerType: data.customerType, //客户类型
            customerTypeName:
              data.customerType == "ENTERPRISE" ? "企业客户" : "个人客户", //客户类型名称
            addressType: data.addressType, // 地址类型
            addressProvince: data.addressProvince, //省
            addressCity: data.addressCity, //市
            addressCounty: data.addressCounty, // 区
            zipCode: data.zipCode, //邮编
            addressDetail: data.addressDetail //详细地址
          };
          if (data.customerType == "ENTERPRISE") {
            this.CUSTOMER_ADDRESS_TYPE = this.dictTable.ENTERPRISE_ADDRESS_TYPE;
          } else {
            this.CUSTOMER_ADDRESS_TYPE = this.dictTable.INDIVIDUAL_ADDRESS_TYPE;
          }
          this.city = null;
          this.county = null;
          this.city = Utils.getCities(data.addressProvince);
          this.county = Utils.getCounties(data.addressCity);
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    getCities(code) {
      this.city = null;
      this.county = null;
      this.ruleForm.addressCity = null;
      this.ruleForm.addressCounty = null;
      this.city = Utils.getCities(code);
    },
    getCounties(code) {
      this.county = null;
      this.ruleForm.addressCounty = null;
      this.county = Utils.getCounties(code);
    },
    searchClientFun() {
      this.consumerVisible = true;
    },
    setConsumerValue(data) {
      this.ruleForm.customerId = data.id; //客户ID
      this.ruleForm.customerName = data.name; //客户名称
      this.ruleForm.customerType = data.customerType; //客户类型
      this.ruleForm.customerTypeName =
        data.customerType == "ENTERPRISE" ? "企业客户" : "个人客户";

      this.CUSTOMER_ADDRESS_TYPE = [];
      this.ruleForm.addressType = [];

      if (data.customerType == "ENTERPRISE") {
        this.CUSTOMER_ADDRESS_TYPE = this.dictTable.ENTERPRISE_ADDRESS_TYPE;
      } else {
        this.CUSTOMER_ADDRESS_TYPE = this.dictTable.INDIVIDUAL_ADDRESS_TYPE;
      }
      this.consumerVisible = false;
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.routeQuery.flag == "edit") {
            DataApi.updateSite(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message({ type: "success", message: "更新成功" });
                this.cancelFunc();
              } else {
                this.$message({
                  type: "warning",
                  message: res.message ? res.message : "系统异常请联系管理员！"
                });
              }
            });
          } else {
            DataApi.createSite(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message({ type: "success", message: "新建成功" });
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
      //       path: "/more/siteIndex/detail",
      //       query: {
      //         siteId: this.routeQuery.siteId
      //       }
      //     });
      //   } else {
      //     this.$router.push({
      //       path: this.ListPath
      //     });
      //   }
      // }
      localStorage.setItem("activeName", this.routeQuery.activeName);
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" >
.site-content {
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