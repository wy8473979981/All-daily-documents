<template>
  <div class="content visit-content">
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
              <el-form-item label="拜访类型" prop="type">
                <el-select v-model="ruleForm.type" clearable placeholder="请选择拜访类型">
                  <el-option v-for="(item,index) in dictTable.VISIT_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row class :gutter="20">
            <el-col :span="8">
              <el-form-item label="拜访时间" prop="visitTime">
                <el-date-picker siz="small" v-model="ruleForm.visitTime" :value-format="dateType" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否初次拜访" prop="firstFlag">
                <el-select v-model="ruleForm.firstFlag" disabled clearable placeholder>
                  <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="8">
              <el-form-item label="拜访纪要" prop="note">
                <el-input v-model.trim="ruleForm.note" type="textarea" :rows="5" maxlength="5000" show-word-limit style="width:800px;" placeholder="请输入活动描述" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
      </el-form>
    </div>

    <!-- 查询客户 -->
    <consumerComponent :show.sync="consumerVisible" v-if="consumerVisible" :type="'OWNER'" :requestChannel="'OPPORTUNITY'" @listenEvent="setConsumerValue"></consumerComponent>
  </div>
</template>
<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/visitService";
import consumerComponent from "@/components/UX/consumerComponent";
import { Utils } from "@/utils";
export default {
  components: {
    consumerComponent
  },
  data() {
    return {
      dictTable: null, //字典表
      dateType: "yyyy-MM-dd HH:mm:ss",
      consumerVisible: false,
      SelectionOptions,
      routeQuery: null,
      isCanUser: false, //能不能使用客户查询
      ruleForm: {
        customerId: null, // 客户ID
        customerName: null, // 客户名称
        firstFlag: null, //初次拜访（陌拜) : 0 否 1 是
        id: null, //拜访记录id
        note: null, // 拜访纪要
        type: null, // 拜访类型(1:电话拜访 2:实地拜访 3:微信拜访)
        visitTime: null //时间
      }, //表单字段
      rules: {
        customerName: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择拜访类型", trigger: "change" }
        ],
        visitTime: [
          { required: true, message: "请选择拜访时间", trigger: "change" }
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
      detailPath: "/visit/index/detail", //详情页路由地址
      ListPath: "/visit/index" //列表路由地址
    };
  },
  computed: {},

  created() {
    try {
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
      this.routeQuery = this.$route.query;
      if (this.routeQuery.flag == "edit") {
        this.getDetail();
      }
      if (this.routeQuery.activeName) {
        // 是从客户详情tab页进来的，不能使用
        this.isCanUser = true;
        this.ruleForm = {
          ...this.ruleForm,
          customerId: this.routeQuery.currConsumerId, // 客户ID
          customerName: this.routeQuery.currConsumerName // 客户名称
        };
        if (this.routeQuery.flag == "add") {
          DataApi.visitFirstFlag(this.routeQuery.currConsumerId).then(res => {
            if (res.code == 200) {
              const { data } = res;
              this.ruleForm.firstFlag = data.firstFlag;
            } else {
              this.$message({
                type: "warning",
                message: res.message ? res.message : "系统异常请联系管理员！"
              });
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
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
    getDetail() {
      DataApi.visitDetailById(this.routeQuery.visitId).then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.ruleForm = {
            customerId: data.customerId, // 客户ID
            customerName: data.customerName, // 客户名称
            firstFlag: data.firstFlag, //初次拜访（陌拜) : 0 否 1 是
            id: data.id, //拜访记录id
            note: data.note, // 拜访纪要
            type: data.type, // 拜访类型(1:电话拜访 2:实地拜访 3:微信拜访)
            visitTime: Utils.timestampToTime(data.visitTime, 2)
          };
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    searchClientFun() {
      this.consumerVisible = true;
    },
    setConsumerValue(data) {
      this.ruleForm.customerId = data.id; //客户ID
      this.ruleForm.customerName = data.name; //客户名称
      this.consumerVisible = false;
      DataApi.visitFirstFlag(data.id).then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.ruleForm.firstFlag = data.firstFlag;
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.routeQuery.flag == "edit") {
            DataApi.updateVisit(this.ruleForm).then(res => {
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
            DataApi.createVisit(this.ruleForm).then(res => {
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
      //     //客户详情跳转来的
      //     this.$router.push({
      //         path: "/consumer/index/detail",
      //         query: {
      //             flag: "detail",
      //             activeName: this.routeQuery.activeName,
      //             currConsumerId: this.routeQuery.currConsumerId,
      //             currConsumerType: this.routeQuery.currConsumerType,
      //             currConsumerName: this.routeQuery.currConsumerName
      //         }
      //     });
      // } else {
      //     if (viewType == "detail") {
      //         this.$router.push({
      //             path: this.detailPath,
      //             query: {
      //                 visitId: this.routeQuery.visitId
      //             }
      //         });
      //     } else {
      //         this.$router.push({
      //             path: this.ListPath
      //         });
      //     }
      // }
      localStorage.setItem("activeName", this.routeQuery.activeName);
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss">
.visit-content {
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