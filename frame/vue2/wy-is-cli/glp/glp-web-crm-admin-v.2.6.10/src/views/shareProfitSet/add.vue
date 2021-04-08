<template>
  <div class="content share-profit-set-create">
    <div class="section">
      <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small" label-width="150px">
        <Btns :btnsProps="btnsProps" />
        <Card :title="'基本信息'" class="base-info">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户名称" class="btn-box" prop="customerName">
                <el-input v-model.trim="ruleForm.customerName" placeholder="请查询并选择客户" disabled class="form-input"></el-input>
                <el-button type="primary" @click="searchClientFun">查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生效状态" prop="effectiveStatus">
                <el-select v-model="ruleForm.effectiveStatus" clearable disabled placeholder="">
                  <el-option v-for="(item,index) in dictTable.SHARE_PROFIT_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="截止日期" prop="expireDate">
                <el-date-picker type="date" placeholder="选择截止日期" :picker-options="endPickerOptions" :value-format="dateTypeString" v-model.trim="ruleForm.expireDate" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="12">
              <el-form-item label="授信额度编号" class="btn-box creadit-no" prop="credits">
                <div class="creadit-no-list">
                  <!-- <ul>
                    <li v-for="item of ruleForm.credits" :key="item">{{item}}</li>
                  </ul> -->
                  <tableTemplate :thead-data="theadData" :table-data="ruleForm.credits" ref="tablearea" :selection="false" :checkbox="false" :maxHeight="'500px'"></tableTemplate>
                </div>
                <el-button type="primary" :disabled="isCanCredit" @click="searchCreditFun">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
        <Card :title="'参与方'" class="participants">
          <el-form-item label="所属事业部" prop="businessCode" style="width:296px;padding-left:10px;margin-right:0px;">
            <el-select v-model="ruleForm.businessCode" clearable placeholder="请选择所属事业部" :disabled="yyrbusinessCodeFlag" @focus="createDepartmentFunc">
              <el-option v-for="(item,index) in yyrDEPARTMENT" :key="index" :label="item.label" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户拥有人" prop="yyrUserName" style="width:362px;padding-left:10px;margin-right:0px;">
            <el-input v-model="ruleForm.yyrUserName" placeholder="" class="form-input" disabled></el-input>
          </el-form-item>
          <el-form-item label="分润比例" prop="profitRatio" style="width:296px;padding-left:10px;margin-right:0px;">
            <el-input v-model.trim="ruleForm.profitRatio" clearable placeholder="请输入分润比例" oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}" maxlength="6" class="form-input">
              <i slot="suffix" class="el-input__icon">%</i>
            </el-input>
          </el-form-item>
          <el-table :data="ruleForm.dataForm.bills" :show-header="false">
            <el-table-column property="categoryCodeList" width="300px" align="center" height="20">
              <template slot-scope="scope">
                <el-form-item label="所属事业部" :prop="`dataForm.bills.${scope.$index}.businessCode`" :rules="[{ required: true, message: '请选择所属事业部', trigger: ['blur','change'] }]">
                  <el-select v-model="scope.row.businessCode" clearable placeholder="请选择所属事业部" @focus="businessCodeFunc(scope)" @change="changeSearchUserFlag(scope)">
                    <el-option v-for="(item,index) in scope.row.DEPARTMENT" :key="index" :label="item.label" :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column property="type" width="368px" align="center" height="20">
              <template slot-scope="scope">
                <el-form-item :label="`参与方成员${scope.$index+1}`" :prop="`dataForm.bills.${scope.$index}.userName`" :rules="[{ required: true, message: '请查询并选择参与方成员', trigger: ['blur','change'] }]">
                  <el-input v-model="scope.row.userName" placeholder="请查询并选择参与方成员" class="form-input" disabled></el-input>
                </el-form-item>
                <el-button type="primary" :disabled="scope.row.searchUserFlag" @click="searchUserFun(scope)" style="position: relative;right: 5px;top: 33px;height: 32px;line-height: 10px;">查询</el-button>
              </template>
            </el-table-column>
            <el-table-column property="categoryCodeList" width="300px" align="center" height="20">
              <template slot-scope="scope">
                <el-form-item label="分润比例" :prop="`dataForm.bills.${scope.$index}.profitRatio`" :rules="[{ required: true, message: '请输入分润比例', trigger: ['blur','change'] },{validator:contribution, trigger: ['blur', 'change'] }]">
                  <el-input v-model.trim="scope.row.profitRatio" clearable oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}" maxlength="6" placeholder="请输入分润比例" class="form-input">
                    <i slot="suffix" class="el-input__icon">%</i>
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="50" align="center" header-align="center" height="20">
              <template slot-scope="scope">
                <i class="el-icon-remove" @click="deleteListing(scope.$index)" v-if="ruleForm.dataForm.bills.length>1"></i>
              </template>
            </el-table-column>
          </el-table>
          <div class="create-btn">
            <el-button type="primary" v-if="ruleForm.dataForm.bills.length<dictTable.BUSINESS_RANGE.length-1" @click="addListing">+ 添加参与方</el-button>
          </div>
        </Card>
      </el-form>
    </div>
    <!-- 查询客户 -->
    <consumerComponent :show.sync="clientVisible" v-if="clientVisible" :type="'OWNER'" @listenEvent="setClientValue" :requestChannel="'SHARE_PROFIT'"></consumerComponent>

    <!-- 查询用户 -->
    <belongerModal :show.sync="belongerVisible" v-if="belongerVisible" :lockingStatus="lockingStatus" :businessCode="setUserData.row.businessCode" @listenEvent="setBelongerTableRow"></belongerModal>

    <!-- 客户授信编号查询 -->
    <creditNoModal :show.sync="creditNoVisible" v-if="creditNoVisible" :defaultArr="ruleForm.credits" :customerName="ruleForm.customerName" :customerCode="ruleForm.customerCode" @listenEvent="setCreditNoTableRow"></creditNoModal>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import belongerModal from "@/components/UX/belongerComponent";
import creditNoModal from "@/components/UX/creditNoComponent";
import DataApi from "@/api/shareProfitSet";
import consumerComponent from "@/components/UX/consumerComponent";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  components: {
    consumerComponent,
    belongerModal,
    creditNoModal
  },
  data() {
    let checkContribution = (rule, value, callback) => {
      if (Number(value) > 100) {
        return callback(new Error("请输入有效分润比例"));
      }
      if (value && Number(value) === 0) {
        callback(new Error("分润比例不能为0"));
      }
      callback();
    };
    return {
      Utils: Utils,
      DEPARTMENT: [],
      yyrDEPARTMENT: [],
      yyrbusinessCodeFlag: false,
      dateTypeString: "yyyy-MM-dd", //时间格式
      lockingStatus: "00",// crm内部是否有效 00 -有效， 01-无效 
      belongerVisible: false,
      creditNoVisible: false,
      isCanCredit: true,//能不能查询授信编号
      SelectionOptions,
      dictTable: null, //字典表
      clientVisible: false, //客户名称
      setUserData: [], //成员
      routeQuery: null,
      credits: [],
      theadData: [
        { checked: true, key: "creditCode", val: "额度编号", },
        {
          checked: true, key: "relationType", val: "额度类型",
          isFormat: true,
          formatFn: (item, row) => {
            try {
              let current = null;
              let CREDIT_RELATION_TYPE = this.dictTable.CREDIT_RELATION_TYPE;
              CREDIT_RELATION_TYPE.map(function (item, index, array) {
                if (item.key == row.relationType) {
                  current = item;
                }
              });
              return (current && current.label) || "-";
            } catch (e) {
              console.log(e);
            }
          }
        },
        { checked: true, key: "productName", val: "产品名称" },
        {
          checked: true, key: "amount", val: "额度金额(元)",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.MicrometerLevel(row.amount, '', 2);
          }
        },
        {
          checked: true, key: "approvedTime", val: "获批日期",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.approvedTime, 2);
          }
        }
      ],
      ruleForm: {
        customerId: null,
        customerName: null,
        customerCode: null,
        effectiveStatus: 2, //生效状态 
        credits: [],//授信额度编号
        expireDate: null,//截止日期
        yyrUserName: null,//拥有人用户名称
        yyrUserNo: null,//拥有人用户编号
        businessCode: null,//拥有人事业部 
        profitRatio: null,//拥有人分润比例 
        partners: [],
        dataForm: {
          bills: [
            {
              businessCode: null,//参与方事业部 
              profitRatio: null,//分润比例 
              type: 2,//参与方成员类型(1：拥有人，2：成员)
              userName: null,//参与方用户名称
              userNo: null,//参与方用户编号
              searchUserFlag: true,
              DEPARTMENT: []
            }
          ]
        }
      }, //表单字段
      rules: {
        customerName: [{ required: true, message: "请查询并选择客户", trigger: ['blur', 'change'] }],
        credits: [{ required: true, message: "请查询并选择授信编号", trigger: ['blur', 'change'] }],
        expireDate: [{ required: true, message: "请选择截止日期", trigger: ['blur', 'change'] }],
        businessCode: [{ required: true, message: "请选择所属事业部", trigger: ['blur', 'change'] }],
        profitRatio: [
          { required: true, message: "请输入有效分润比例", trigger: ['blur', 'change'] },
          { validator: checkContribution, trigger: ['blur', 'change'] }
        ]
      }, //校验规则
      btnsProps: {
        submit: {
          text: "提交审批",
          func: this.submitForm
        },
        cancel: {
          text: "取消",
          func: this.cancelFunc
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          let sdTime = new Date().getTime();
          return time.getTime() < sdTime;
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
    this.DEPARTMENT = this.dictTable.BUSINESS_RANGE;

    if (this.routeQuery.flag == "edit") {
      this.isCanCredit = false;
      this.getDetails();
    } else {
      this.ruleForm.yyrUserName = global_user_info.name;//拥有人用户名称
      this.ruleForm.yyrUserNo = global_user_info.userNo;//拥有人用户编号
    }

    let code = global_user_info.businessRangeCodes; //拥有人所属事业部
    let arr = [...this.dictTable.BUSINESS_RANGE].filter(x => [...code].some(y => y === x.key));
    this.yyrDEPARTMENT = arr;
    if (code && code.length == 1) {
      this.ruleForm.businessCode = code[0];
      this.yyrbusinessCodeFlag = true;
    }

    if (this.routeQuery.activeName) {
      // 是从客户详情tab页进来的，不能使用
      this.ruleForm = {
        ...this.ruleForm,
        customerId: this.routeQuery.currConsumerId, // 客户ID
        customerName: this.routeQuery.currConsumerName // 客户名称
      };
    }
  },
  mounted() { },
  methods: {
    contribution(rule, value, callback) {
      const field = rule.field.split(".");
      const index = field[2];
      const type = field[3];
      const item = this.ruleForm.dataForm.bills[index];
      if (item.profitRatio && Number(item.profitRatio) === 0) {
        callback(new Error("分润比例不能为0"));
      }
      if (Number(item.profitRatio) > 100) {
        callback(new Error("请输入有效分润比例"));
      }
      callback();
    },
    searchCreditFun() {
      this.creditNoVisible = true;
    },
    setCreditNoTableRow(data) {
      let newArr = data && data.map((item) => {
        return { ...item, productName: item.businessTypeName }
      })
      this.ruleForm.credits = newArr;
    },
    /* 客户名称 */
    searchClientFun() {
      this.clientVisible = true;
    },
    setClientValue(data) {

      this.ruleForm.customerId = data.id; //客户ID
      this.ruleForm.customerName = data.name; //客户名称
      this.ruleForm.customerCode = data.ecifId;
      this.clientVisible = false;
      this.isCanCredit = false;
      this.ruleForm.credits = [];

    },
    /* 成员名称 */
    searchUserFun(data) {
      this.belongerVisible = true;
      this.setUserData = data;
    },
    createDepartmentFunc() {
      let bills = this.ruleForm.dataForm.bills;
      let businessCodeArr = [];
      bills.map((item, index) => {
        if (item.businessCode) {
          businessCodeArr.push(item.businessCode);
        }
      })
      let arr = [...this.yyrDEPARTMENT].filter(x => [...businessCodeArr].every(y => y != x.key));
      this.yyrDEPARTMENT = arr;
    },
    changeSearchUserFlag(data) {
      if (data.row.businessCode) {
        data.row.searchUserFlag = false;
      } else {
        data.row.searchUserFlag = true;
      }
      data.row.userName = null;
      data.row.userNo = null;
    },
    businessCodeFunc(data) {
      // 选项校验已选事业部，其他参与方已选，则无对应事业部选项
      let $index = data.$index;
      let bills = this.ruleForm.dataForm.bills;
      let businessCodeArr = [];
      bills.map((item, index) => {
        if (item.businessCode && index != $index) {
          businessCodeArr.push(item.businessCode);
        }
      })
      if (this.ruleForm.businessCode) {
        businessCodeArr = businessCodeArr.concat(this.ruleForm.businessCode);
      }
      console.log(businessCodeArr, '222')

      let arr = [...this.DEPARTMENT].filter(x => [...businessCodeArr].every(y => y != x.key));
      bills[$index].DEPARTMENT = arr;
    },
    setBelongerTableRow(data) {
      let index = this.setUserData.$index;
      let bills = this.ruleForm.dataForm.bills;
      let yyrbills = [{ userNo: this.ruleForm.yyrUserNo }];
      let allbills = yyrbills.concat(bills);

      let isRepeat = allbills && allbills.some((item, i) => {
        let currentIndex = index + 1;
        if (currentIndex !== i) {
          return item.userNo == data.userNo;
        }
      });
      if (isRepeat) {
        this.$message({ type: "warning", message: "不能重复选择同一个参与方成员" });
        return true;
      }

      bills[index].userName = data.userName; //成员ID
      bills[index].userNo = data.userNo; //成员名称
      bills[index].type = 2; //成员类型
      this.belongerVisible = false;
    },
    /* 添加参与方 */
    addListing() {
      let bills = this.ruleForm.dataForm.bills;
      let arr = [...this.DEPARTMENT].filter(x => [...bills].every(y => y.businessCode != x.key));
      let item = {
        businessCode: null,//参与方事业部 
        profitRatio: null,//分润比例 
        type: 2,//参与方成员类型(1：拥有人，2：成员)
        userName: null,//参与方用户名称
        userNo: null,//参与方用户编号
        searchUserFlag: true,
        DEPARTMENT: arr
      };
      this.ruleForm.dataForm.bills.push(item);
    },
    /* 删除参与方 */
    deleteListing(index) {
      this.$confirm("确认删除此内容吗？", "提示", { confirmButtonText: "确定删除", cancelButtonText: "取消", customClass: "member-danger-class" })
        .then(() => {
          this.ruleForm.dataForm.bills.splice(index, 1);
        })
        .catch(() => { });
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.subFunc();
        }
      });
    },

    subFunc() {
      let credits = this.ruleForm.credits.map((item) => {
        return {
          amount: item.amount,//金额
          approvedTime: item.approvedTime,// 获批时间
          creditCode: item.creditCode,//额度编号
          productCode: item.productCode,// 产品编码
          productName: item.productName,// 产品名称
          relationType: item.relationType,// 额度关系：担保额度 GUARANTEE，直接额度 DIRECT，子额度 SUB，渠道额度 CHANNEL
        }
      })

      let params = {
        customerId: this.ruleForm.customerId,
        customerName: this.ruleForm.customerName,
        effectiveStatus: this.ruleForm.effectiveStatus,//生效状态 
        credits: credits,//授信额度编号
        expireDate: this.ruleForm.expireDate,//截止日期
        partners: []
      };
      let arr = [];
      let bills = this.ruleForm.dataForm.bills;
      let global_user_info = JSON.parse(localStorage.getItem("global_user_info"));

      if (this.ruleForm.profitRatio) {
        let type1 = {
          type: 1,
          userNo: this.ruleForm.yyrUserNo,//拥有人用户编号
          userName: this.ruleForm.yyrUserName,//拥有人用户名称
          businessCode: this.ruleForm.businessCode,//拥有人事业部 
          profitRatio: this.ruleForm.profitRatio,//拥有人分润比例 
        };
        arr.push(type1);
        let newBills = bills && bills.filter((item) => {
          return item.profitRatio && item.userName
        })
        arr = arr.concat(newBills);
      }

      params.partners = arr;

      if (this.routeQuery.shareProfitSetId) {
        params.id = this.routeQuery.shareProfitSetId;
        DataApi.update(params).then(res => {
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
        DataApi.create(params).then(res => {
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
      DataApi.getDetail(this.routeQuery.shareProfitSetId).then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.ruleForm = data;

          if (res.data.partners && res.data.partners.length > 0) {
            data.partners.map(item => {
              if (item.type == 1) {
                this.ruleForm.yyrUserNo = item.userNo;//拥有人用户编号
                this.ruleForm.yyrUserName = item.userName;//拥有人用户名称
                this.ruleForm.businessCode = item.businessCode;//拥有人事业部
                this.ruleForm.profitRatio = item.profitRatio;//拥有人分润比例 
              }
            });
            let bills = data.partners.filter(item => {
              return item.type != 1;
            });
            bills = bills.map((item) => {
              return { ...item, DEPARTMENT: this.DEPARTMENT, searchUserFlag: false };
            })
            this.ruleForm = {
              ...this.ruleForm,
              expireDate: Utils.timestampToTime(data.expireDate, 1),
              dataForm: {
                bills: [...bills]
              }
            };

            console.log(this.ruleForm, '00')
          }
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    cancelFunc() {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss">
.share-profit-set-create {
  .base-info {
    .el-input--small .el-input__inner {
      width: 300px;
    }
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
  .participants .el-table__empty-block {
    display: none;
  }
  .create-btn {
    width: 940px;
    margin-top: 20px;
    text-align: center;
  }
  .el-table--medium th {
    padding: 9px 0;
    line-height: 23px;
  }
  .creadit-no {
    .creadit-no-list {
      width: 1000px;
      height: 250px;
      overflow: hidden;
      overflow-y: auto;
      border: 1px solid #c0c4cc;
      padding: 5px;
      ul > li {
        line-height: 24px;
      }
    }
    .el-button {
      height: 32px;
    }
  }
}
</style>
