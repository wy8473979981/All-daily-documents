<template>
  <div class="content site-content">
    <div class="section base-info-section">
      <el-form class="form-section block-form" :model="ruleForm" ref="ruleForm" inline size="small" label-width="150px">
        <Btns :btnsProps="btnsProps" />
        <Card :title="'基本信息'">
          <el-row class :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户名称" prop="customerName" class="btn-box">
                <el-input v-model="ruleForm.customerName" disabled class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户类型" prop="customerTypeName">
                <el-input v-model="ruleForm.customerTypeName" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址类型" prop="addressType">
                <el-select v-model="ruleForm.addressType" disabled clearable placeholder="">
                  <el-option v-for="(item,index) in CUSTOMER_ADDRESS_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省份" prop="addressProvince">
                <el-select v-model="ruleForm.addressProvince" disabled clearable placeholder="">
                  <el-option v-for="(value,name,index) in provinces" :key="index" :label="value" :value="name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市" prop="addressCity">
                <el-select v-model="ruleForm.addressCity" disabled clearable placeholder="">
                  <el-option v-for="(value,name,index) in city" :key="index" :label="value" :value="name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区县" prop="addressCounty">
                <el-select v-model="ruleForm.addressCounty" disabled clearable placeholder="">
                  <el-option v-for="(value,name,index) in county" :key="index" :label="value" :value="name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮编" prop="zipCode">
                <el-input v-model="ruleForm.zipCode" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="12">
              <el-form-item label="详细地址" prop="addressDetail">
                <el-input disabled v-model="ruleForm.addressDetail" type="textarea" :rows="5" maxlength="300" show-word-limit style="width:800px;" placeholder="" class="form-input"></el-input>
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
    </div>
    <!-- 删除 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/siteService";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  components: {},
  data() {
    return {
      provinces: null, //省
      city: null, //市
      county: null, //区
      dictTable: null, //字典表
      CUSTOMER_ADDRESS_TYPE: null, //地址类型
      dateType: "yyyy-MM-dd HH:mm:ss",
      deleteVisible: false,
      SelectionOptions,
      routeQuery: null,
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
      btnsProps: {
        // edit: {
        //   text: "修改",
        //   func: this.editFunc
        // },
        // delete: {
        //   text: "删除",
        //   func: this.deleteFunc
        // },
        // cancel: {
        //   text: "返回",
        //   func: this.cancelFunc
        // }
      },
      ListPath: "/more/siteIndex", //列表路由地址
      editPath: "/more/siteIndex/edit" //修改路由地址
    };
  },
  computed: {},
  created() {
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.routeQuery = this.$route.query;
    this.provinces = Utils.provinces;
    this.getDetail();
  },
  mounted() { },
  methods: {
    getDetail() {
      DataApi.siteDetailById(this.routeQuery.siteId).then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.ruleForm = {
            ...data,
            customerTypeName:
              data.customerType == "ENTERPRISE" ? "企业客户" : "个人客户", //客户类型名称
            createTime: Utils.timestampToTime(data.createTime, 2),
            updateTime: Utils.timestampToTime(data.updateTime, 2)
          };
          if (data.customerType == "ENTERPRISE") {
            this.CUSTOMER_ADDRESS_TYPE = this.dictTable.ENTERPRISE_ADDRESS_TYPE;
          } else {
            this.CUSTOMER_ADDRESS_TYPE = this.dictTable.INDIVIDUAL_ADDRESS_TYPE;
          }
          this.city = [];
          this.county = [];
          this.city = Utils.getCities(data.addressProvince);
          this.county = Utils.getCounties(data.addressCity);

          if (data) {
            this.btnsProps = {};
            data.buttonList && data.buttonList.map((item, index) => {
              if (Utils.btnAuthority("CRM_SITE_EDIT") && item.buttonType == "CRM_EDIT" && item.enable) {
                this.btnsProps["edit"] = {
                  text: "修改",
                  func: this.editFunc
                };
              } else if (Utils.btnAuthority("CRM_SITE_DEL") && item.buttonType == "CRM_DEL" && item.enable) {
                this.btnsProps["delete"] = {
                  text: "删除",
                  func: this.deleteFunc
                };
              }
            });
            this.btnsProps["cancel"] = { text: "返回", func: this.cancelFunc };
          }
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    getCities(code) {
      this.city = Utils.getCities(code);
    },
    getCounties(code) {
      this.county = Utils.getCounties(code);
    },
    deleteFunc(item) {
      this.deleteVisible = true;
      this.dialogTxt = `确认删除地址信息？`;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let message = "删除成功！";
        let params = { ids: [this.ruleForm.id] };
        DataApi.deleteSite(params).then(res => {
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
          path: this.editPath,
          query: {
            flag: "edit",
            siteId: this.routeQuery.siteId,
            activeName: this.routeQuery.activeName,
            currConsumerId: this.routeQuery.currConsumerId,
            currConsumerType: this.routeQuery.currConsumerType,
            currConsumerName: this.routeQuery.currConsumerName
          }
        });
      } else {
        this.$router.push({
          path: this.editPath,
          query: { flag: "edit", viewType: "detail", siteId: this.ruleForm.id }
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
      //     path: this.ListPath
      //   });
      // }
      localStorage.setItem("activeName", this.routeQuery.activeName);
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss">
.site-content {
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