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
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生效状态" prop="effectiveStatus">
                <el-select v-model="ruleForm.effectiveStatus" clearable disabled placeholder="">
                  <el-option v-for="(item,index) in SelectionOptions.EFFECTIVE_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="截止日期" prop="expireDate">
                <el-date-picker type="date" placeholder="选择截止日期" disabled :value-format="dateTypeString" v-model="ruleForm.expireDate" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="12">
              <el-form-item label="授信额度编号" class="btn-box creadit-no" prop="credits">
                <div class="creadit-no-list">
                  <tableTemplate :thead-data="theadData" :table-data="ruleForm.credits" ref="tablearea" :selection="false" :checkbox="false" :maxHeight="'500px'"></tableTemplate>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
        <Card :title="'参与方'">
          <el-row class="row-item partners_list" :gutter="20" v-for="(item,index) in ruleForm.partners" :key="item.message" style="margin-bottom:0;">
            <el-col :span="8">
              <label v-if="item&&item.type == 1">所属事业部:</label>
              <label v-if="item&&item.type == 2">所属事业部:</label>
              <span>{{item&&Utils.getLabel(item.businessCode,dictTable.BUSINESS_RANGE)||'-'}}</span>
            </el-col>
            <el-col :span="8">
              <label v-if="item&&item.type == 1">客户拥有人:</label>
              <label v-if="item&&item.type == 2">参与方成员{{index}}:</label>
              <span>{{item&&item.userName||'-'}}</span>
            </el-col>
            <el-col :span="8">
              <label v-if="item&&item.type == 1">分润比例:</label>
              <label v-if="item&&item.type == 2">分润比例:</label>
              <span>{{item&&item.profitRatio?item.profitRatio+'%':'-'}}</span>
            </el-col>
          </el-row>
          <el-row class :gutter="20" v-if="!ruleForm.partners||ruleForm.partners.length==0">
            <el-col :span="12">
              <label style="color:#666;font-size:12px;">暂无记录</label>
            </el-col>
          </el-row>
        </Card>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/shareProfitSet";
import { Utils } from "@/utils";
import { mapGetters } from "vuex";
export default {
  mixins: [listMixin],
  components: {},
  data() {
    return {
      Utils: Utils,
      DEPARTMENT: [
        { label: "物流", key: "01" },
        { label: "食品冷链", key: "02" },
        { label: "跨境电商", key: "04" },
        { label: "零售通路", key: "05" },
        { label: "普云链", key: "06" },
      ],
      dateTypeString: "yyyy-MM-dd", //时间格式
      lockingStatus: "00",// crm内部是否有效 00 -有效， 01-无效 
      belongerVisible: false,
      creditNoVisible: false,
      isCanUser: false, //能不能使用客户查询
      isCanCredit: false,//能不能查询授信编号
      SelectionOptions,
      dictTable: null, //字典表
      clientVisible: false, //客户名称
      setUserData: [], //成员
      routeQuery: null,
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
        effectiveStatus: 2, //生效状态 
        credits: [],//授信额度编号
        expireDate: null,//截止日期
        yyrUserName: null,//拥有人用户名称
        yyrUserNo: null,//拥有人用户编号
        businessCode: null,//拥有人事业部 
        profitRatio: null,//拥有人分润比例 
        partners: [],
        dataForm: {
          bills: [{
            businessCode: null,//参与方事业部 
            profitRatio: null,//分润比例 
            type: 2,//参与方成员类型(1：拥有人，2：成员)
            userName: null,//参与方用户名称
            userNo: null,//参与方用户编号
          }]
        }
      }, //表单字段
      rules: {
        customerName: [{ required: true, message: "请查询并选择客户", trigger: "blur" }],
        credits: [{ required: true, message: "请查询并选择授信编号", trigger: "blur" }],
        expireDate: [{ required: true, message: "请选择截止日期", trigger: "blur" }],
        profitRatio: [
          { required: true, message: "请输入有效分润比例", trigger: "blur" }
        ]
      }, //校验规则
      btnsProps: {},
      isDisabled: false,
      role: null,
      userInfo: null,
      baseInfo: null //详情
    };
  },
  computed: {
    ...mapGetters(["roles"]),
  },

  created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.role = this.roles[0];//获取角色
    this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
    this.getDetails();
  },
  mounted() { },
  methods: {
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

            this.ruleForm = {
              ...this.ruleForm,
              expireDate: Utils.timestampToTime(data.expireDate, 1),
              dataForm: {
                bills: [...bills]
              }
            };

            if (data) {
              this.btnsProps = {};

              let btnAuthority = Utils.btnAuthority("SHARE_PROFIT_SET_DEIT");
              let roleBD = this.role.code == "CRM_BD" ? true : false;
              let isCreateUser = data.createUserNo == this.userInfo.userNo ? true : false;
              let rejected = data.approvalStatus == 40 ? true : false;
              let notEffect = data.effectiveStatus == 2 ? true : false;
              if (btnAuthority && roleBD && isCreateUser && rejected && notEffect) {
                this.btnsProps["edit"] = { text: "修改", func: this.editFunc };
              }
              this.btnsProps["cancel"] = { text: "返回", func: this.cancelFunc };
            }
          }
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    editFunc() {
      this.$router.push({
        path: "/more/shareProfitSet/edit",
        query: { flag: "edit", viewType: "detail", shareProfitSetId: this.ruleForm.id }
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
  .el-table__empty-block {
    display: none;
  }
  .create-btn {
    width: 940px;
    margin-top: 20px;
    text-align: center;
  }
  .creadit-no {
    .creadit-no-list {
      width: 1000px;
      height: 350px;
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
