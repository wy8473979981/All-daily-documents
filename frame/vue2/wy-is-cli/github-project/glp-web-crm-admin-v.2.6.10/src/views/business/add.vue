<template>
  <div class="content business-create" v-loading="isLoading">
    <div class="section">
      <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small" label-width="150px">
        <Btns :btnsProps="btnsProps" />
        <Card :title="'基本信息'">
          <el-row class :gutter="20">
            <el-col :span="10">
              <el-form-item label="客户名称" class="btn-box" prop="customerName">
                <el-input v-model.trim="ruleForm.customerName" placeholder="请查询并选择客户" disabled class="form-input"></el-input>
                <el-button type="primary" :disabled="isCanUser" @click="searchClientFun">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="10">
              <el-form-item label="商机名称" prop="name">
                <el-input v-model.trim="ruleForm.name" clearable placeholder="请输入商机名称" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="拥有人" prop="yyr">
                <el-input v-model="yyr" disabled placeholder="请输入" class="form-input yyr"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="10">
              <el-form-item label="商机阶段" prop="step">
                <el-select v-model="ruleForm.step" clearable placeholder="请选择商机阶段" @change="stepChange">
                  <el-option v-for="(item,index) in dictTable.BUSINESS_OPPORTUNITY_STEP" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="拥有人所属事业部" prop="yyrsyb">
                <el-input v-model="yyrsyb" disabled placeholder="请输入" class="form-input yyr"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class :gutter="20">
            <el-col :span="10">
              <el-form-item label="赢率" prop="winRatio">
                <el-input v-model.trim="ruleForm.winRatio" clearable oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+5)}" maxlength="9" placeholder="请输入赢率" class="form-input">
                  <i slot="suffix" class="el-input__icon">%</i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class :gutter="20">
            <el-col :span="10">
              <el-form-item label="商机描述" prop="note">
                <el-input v-model.trim="ruleForm.note" type="textarea" :rows="5" maxlength="300" show-word-limit style="width:800px;" placeholder="请输入活动描述" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
        <Card :title="'商机小组'">
          <p>● 商机拥有人所属事业部贡献率之和，不能低于50%</p>
          <p>● 请在贡献率字段输入1到100的数字</p>
          <el-divider></el-divider>
          <el-form-item label="拥有人" prop="yyr" style="width:400px;padding-left:10px;">
            <span class="yyr">{{yyr}}</span>
          </el-form-item>
          <el-form-item label="拥有人贡献率" style="width:350px;" prop="contributionRate">
            <el-input v-model.trim="ruleForm.contributionRate" clearable placeholder="请输入拥有人贡献率" oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}" maxlength="6" class="form-input">
              <i slot="suffix" class="el-input__icon">%</i>
            </el-input>
          </el-form-item>

          <!-- <el-form-item style="width:400px;padding-top:20px;" v-if="ruleForm.dataForm.bills.length==0">
            <i class="el-icon-circle-plus" @click="addListing" v-if="ruleForm.dataForm.bills.length==0"></i>
          </el-form-item> -->

          <el-table :data="ruleForm.dataForm.bills" :show-header="false">
            <el-table-column property="type" width="405px" align="center" height="20">
              <template slot-scope="scope">
                <el-form-item :label="`成员${scope.$index+1}`" :prop="`dataForm.bills.${scope.$index}.userName`" :rules="[{validator:userName, trigger: ['blur', 'change'] }]">
                  <el-input v-model="scope.row.userName" placeholder="请查询并选择成员" class="form-input" disabled></el-input>
                </el-form-item>
                <el-button type="primary" @click="searchUserFun(scope)" style="position: relative;right: 5px;top: 33px;height: 32px;line-height: 10px;">查询</el-button>
              </template>
            </el-table-column>
            <el-table-column property="categoryCodeList" width="350px" align="center" height="20">
              <template slot-scope="scope">
                <el-form-item label="成员贡献率" :prop="`dataForm.bills.${scope.$index}.contributionRate`" :rules="[{validator:contribution, trigger: ['blur', 'change'] }]">
                  <el-input v-model.trim="scope.row.contributionRate" clearable oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}" maxlength="6" placeholder="请输入成员贡献率" class="form-input">
                    <i slot="suffix" class="el-input__icon">%</i>
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="130" align="center" header-align="center" height="20">
              <template slot-scope="scope">
                <!-- <i class="el-icon-circle-plus" @click="addListing"></i> -->
                <i class="el-icon-remove" v-if="ruleForm.dataForm.bills.length>=1" @click="deleteListing(scope.$index)"></i>
              </template>
            </el-table-column>
          </el-table>
          <div class="create-btn">
            <el-button type="primary" v-if="ruleForm.dataForm.bills.length<=99" @click="addListing">+ 添加成员</el-button>
          </div>
        </Card>
      </el-form>
    </div>
    <!-- 查询客户 -->
    <consumerComponent :show.sync="clientVisible" v-if="clientVisible" :type="'OWNER'" @listenEvent="setClientValue" :requestChannel="'OPPORTUNITY'"></consumerComponent>

    <!-- 查询用户 -->
    <belongerModal :show.sync="belongerVisible" v-if="belongerVisible" :lockingStatus="lockingStatus" @listenEvent="setBelongerTableRow"></belongerModal>
  </div>
</template>
<script type="text/javascript">
import UploadTpl from "@/components/Upload/index";
import { SelectionOptions } from "@/js/common/consts";
import belongerModal from "@/components/UX/belongerComponent";
import CommonApi from "@/api/common";
import commonDataApi from "@/api/common";
import DataApi from "@/api/business";
import userComponent from "@/components/UX/userComponent";
import consumerComponent from "@/components/UX/consumerComponent";
import { regex, checkFn } from "@/utils/formCheck";
import { Utils } from "@/utils";
export default {
  components: {
    UploadTpl,
    consumerComponent,
    belongerModal
  },
  data() {
    let checkContribution = (rule, value, callback) => {
      if (Number(value) > 100) {
        return callback(new Error("请输入有效贡献率"));
      }
      if (value && Number(value) === 0) {
        callback(new Error("贡献率不能为0"));
      }
      callback();
    };
    return {
      baseInfo: null,
      belongerVisible: false,
      lockingStatus: "00",// crm内部是否有效 00 -有效， 01-无效 
      isCanUser: false, //能不能使用客户查询
      SelectionOptions,
      dictTable: null, //字典表
      yyr: "", //拥有人
      yyrsyb: "", //拥有人所属事业部
      clientVisible: false, //客户名称
      setUserData: [], //成员
      routeQuery: null,
      isLoading: false, //是否正在加载

      isSubmitting: false, //是否正在提交

      ruleForm: {
        customerId: null,
        customerName: null,
        name: null,
        step: null,
        winRatio: null,
        note: null,
        partners: [],
        contributionRate: 100, //拥有人贡献率
        dataForm: {
          bills: []
        }
      }, //表单字段
      rules: {
        customerName: [{ required: true, message: "请查询并选择客户", trigger: "blur" }],
        name: [{ required: true, message: "请输入商机名称", trigger: "blur" }],
        winRatio: [{ required: true, message: "请输入赢率", trigger: "blur" }],
        step: [
          {
            required: true,
            message: "请选择商机阶段",
            trigger: ["blur", "change"]
          }
        ],
        contributionRate: [
          { required: true, message: "请输入拥有人贡献率", trigger: "blur" },
          { validator: checkContribution, trigger: ["blur", "change"] }
        ]
      }, //校验规则

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
      isDisabled: false,
      view: false,
      baseInfo: null //详情
    };
  },
  computed: {},

  created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    let global_user_info = JSON.parse(localStorage.getItem("global_user_info"));

    if (this.routeQuery.flag == "edit") {
      this.isCanUser = true;
      this.getDetails();
    } else {
      this.yyr = global_user_info.name; //拥有人
      let code = global_user_info.businessRangeCodes; //拥有人所属事业部
      let departments = [];
      if (code && code.length > 0) {
        code.map(item => {
          departments.push(Utils.getDepartment(item));
        });
      }
      if (departments && departments.length > 0) {
        this.yyrsyb = departments.join(", ");
      } else {
        this.yyrsyb = "-";
      }
    }
    if (this.routeQuery.activeName) {
      // 是从客户详情tab页进来的，不能使用
      this.isCanUser = true;
      this.ruleForm = {
        ...this.ruleForm,
        customerId: this.routeQuery.currConsumerId, // 客户ID
        customerName: this.routeQuery.currConsumerName // 客户名称
      };
    }
    console.log(this.ruleForm, "ooo");
  },
  mounted() { },
  methods: {
    userName(rule, value, callback) {
      const field = rule.field.split(".");
      const index = field[2];
      const type = field[3];
      const item = this.ruleForm.dataForm.bills[index];
      if (!item.userName && item.contributionRate) {
        callback(new Error("请查询并选择成员"));
      }
      callback();
    },
    contribution(rule, value, callback) {
      const field = rule.field.split(".");
      const index = field[2];
      const type = field[3];
      const item = this.ruleForm.dataForm.bills[index];
      if (item.userName && !item.contributionRate) {
        callback(new Error("请输入贡献率"));
      }
      if (item.contributionRate && Number(item.contributionRate) === 0) {
        callback(new Error("贡献率不能为0"));
      }
      if (Number(item.contributionRate) > 100) {
        callback(new Error("请输入有效贡献率"));
      }
      callback();
    },
    /* 客户名称 */
    searchClientFun() {
      this.clientVisible = true;
    },
    setClientValue(data) {
      this.ruleForm.customerId = data.id; //客户ID
      this.ruleForm.customerName = data.name; //客户名称
      this.clientVisible = false;
    },
    /* 成员名称 */
    searchUserFun(data) {
      this.belongerVisible = true;
      this.setUserData = data;
    },
    setBelongerTableRow(data) {
      let index = this.setUserData.$index;
      let bills = this.ruleForm.dataForm.bills;
      let isRepeat = bills && bills.some((item) => {
        return item.userNo == data.userNo;
      })
      if (isRepeat) {
        this.$message({ type: "warning", message: "不能重复选择同一个成员" });
        return true;
      }

      this.ruleForm.dataForm.bills[index].userName = data.userName; //成员ID
      this.ruleForm.dataForm.bills[index].userNo = data.userNo; //成员名称
      this.ruleForm.dataForm.bills[index].type = 2; //成员类型
      this.belongerVisible = false;
    },
    /* 添加成员 */
    addListing() {
      let bills = this.ruleForm.dataForm.bills;
      let item = {
        contributionRate: "", //解决不输入为空的问题
        type: "",
        userName: "",
        userNo: ""
      };
      this.ruleForm.dataForm.bills.push(item);
    },
    /* 删除商机 */
    deleteListing(index) {
      this.$confirm("确认删除此内容吗？", "提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        customClass: "member-danger-class"
      })
        .then(() => {
          this.ruleForm.dataForm.bills.splice(index, 1);
        })
        .catch(() => { });
    },
    submitForm() {
      //前端校验表单
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.subFunc();
        }
      });
    },

    subFunc() {
      let params = {
        contributionRate: this.ruleForm.contributionRate,
        customerId: this.ruleForm.customerId,
        customerName: this.ruleForm.customerName,
        name: this.ruleForm.name,
        note: this.ruleForm.note,
        partners: [],
        step: this.ruleForm.step,
        winRatio: this.ruleForm.winRatio,
      };

      let arr = [];
      let bills = this.ruleForm.dataForm.bills;
      let global_user_info = JSON.parse(localStorage.getItem("global_user_info"));

      if (this.ruleForm.contributionRate) {
        let type1 = {
          type: 1,
          userNo: this.routeQuery.flag == "edit" ? this.baseInfo.ownerUserNo : global_user_info.userNo,
          userName: this.routeQuery.flag == "edit" ? this.baseInfo.ownerUserName : global_user_info.name,
          contributionRate: this.ruleForm.contributionRate
        };
        arr.push(type1);
        // 过滤没有选择成员和贡献率的数据
        let newBills = bills && bills.filter((item) => {
          return item.contributionRate && item.userName
        })
        arr = arr.concat(newBills);
      }

      params.partners = arr;

      if (this.routeQuery.businessId) {
        params.id = this.routeQuery.businessId;
        DataApi.updateBusiness(params).then(res => {
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
        DataApi.createBusiness(params).then(res => {
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
    },
    // 拉取详情
    getDetails() {
      DataApi.getDetail(this.routeQuery.businessId).then(res => {
        if (res.code == 200) {
          this.ruleForm = res.data;
          this.loading = true;
          if (res.data.partners && res.data.partners.length > 0) {
            res.data.partners.map(item => {
              if (item.type == 1) {
                this.ruleForm.contributionRate = item.contributionRate;
              }
            });
            let bills = res.data.partners.filter(item => {
              return item.type != 1;
            });

            this.ruleForm = {
              ...this.ruleForm,
              dataForm: {
                bills: [...bills]
              }
            };
            this.baseInfo = res.data;
            this.yyr = res.data.ownerUserName; //拥有人
            this.yyrsyb = res.data.ownerDepartment.join();
          } else {
            this.ruleForm.contributionRate = 100;
          }
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    stepChange(data) {
      this.ruleForm.winRatio = null;
      if (data == 1) {
        this.ruleForm.winRatio = 10;
      } else if (data == 2) {
        this.ruleForm.winRatio = 15;
      } else if (data == 3) {
        this.ruleForm.winRatio = 20;
      } else if (data == 4) {
        this.ruleForm.winRatio = 25;
      } else if (data == 5) {
        this.ruleForm.winRatio = 30;
      } else if (data == 6) {
        this.ruleForm.winRatio = 35;
      } else if (data == 7) {
        this.ruleForm.winRatio = 40;
      } else if (data == 8) {
        this.ruleForm.winRatio = 45;
      } else if (data == 9) {
        this.ruleForm.winRatio = 55;
      } else if (data == 10) {
        this.ruleForm.winRatio = 60;
      } else if (data == 11) {
        this.ruleForm.winRatio = 65;
      } else if (data == 12) {
        this.ruleForm.winRatio = 70;
      } else if (data == 13) {
        this.ruleForm.winRatio = 80;
      } else if (data == 14) {
        this.ruleForm.winRatio = 95;
      } else if (data == 15) {
        this.ruleForm.winRatio = 100;
      } else if (data == 16) {
        this.ruleForm.winRatio = 0;
      }
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
      //       path: "/business/index/detail",
      //       query: {
      //         businessId: this.routeQuery.businessId
      //       }
      //     });
      //   } else {
      //     this.$router.push({
      //       path: "/business/index"
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
.business-create {
  .create-btn {
    width: 886px;
    text-align: center;
    margin-top: 20px;
  }
  .el-icon-circle-plus {
    font-size: 28px;
    color: #409eff;
  }
  .el-icon-remove {
    font-size: 28px;
    color: #f56c6c;
  }
  .fr {
    float: right;
  }
  .yyr {
    font-size: 14px;
    color: #333;
  }
  .gxl {
    position: relative;
    right: -60px;
  }
  .btn-box {
    .el-form-item__content {
      display: flex;
    }
    .el-button {
      margin-left: 5px;
    }
  }
  .el-input-number .el-input__inner {
    text-align: left;
  }
  .el-table__empty-block {
    display: none;
  }
}
</style>
