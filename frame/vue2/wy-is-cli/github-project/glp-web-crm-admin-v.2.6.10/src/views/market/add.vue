<template>
  <div class="content market-content" v-loading="isLoading">
    <div class="section">
      <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small">
        <Btns :btnsProps="btnsProps" />
        <Card :title="pageTitle">
          <el-row class :gutter="20">
            <el-col :span="8">
              <el-form-item label="活动名称" prop="name">
                <el-input v-model.trim="ruleForm.name" placeholder="请输入活动名称" maxlength="50" clearable class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拥有人" prop="ownerUserName" class="btn-box">
                <el-input v-model="ruleForm.ownerUserName" :disabled="true" class="form-input"></el-input>
                <!-- <el-button type="primary" @click="changOwnerFunc">查询</el-button> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动类型" prop="type">
                <el-select v-model="ruleForm.type" clearable placeholder="请选择活动类型" class="form-input">
                  <el-option v-for="(item,index) in dictTable.MARKET_ACTIVITY_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动地点" prop="location">
                <el-input v-model.trim="ruleForm.location" placeholder="请输入活动地点" clearable class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="form-item-div" label="开始日期" prop="startDate">
                <el-date-picker type="date" :picker-options="startPickerOptions" placeholder="选择开始日期" :value-format="dateTypeString" v-model="ruleForm.startDate" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="form-item-div" label="结束日期" prop="endDate">
                <el-date-picker :picker-options="endPickerOptions" type="date" placeholder="选择结束日期" :value-format="dateTypeString" v-model="ruleForm.endDate" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :span="12" label="营销方案" prop="plan">
                <el-select v-model="ruleForm.plan" clearable placeholder="请选择营销方案" class="form-input">
                  <el-option v-for="(item,index) in dictTable.MARKET_ACTIVITY_PLAN" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="desTextarea" prop="note" label="活动描述">
                <el-input v-model.trim="ruleForm.note" type="textarea" :rows="5" maxlength="300" show-word-limit style="width:800px;" placeholder="请输入活动描述" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
      </el-form>
    </div>
    <!-- 查询用户 -->
    <belongerComponent :show.sync="belongerVisible" v-if="belongerVisible" @listenEvent="setTableRow"></belongerComponent>
  </div>
</template>
<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import belongerComponent from "@/components/UX/belongerComponent";
import DataApi from "@/api/marketService";
import { Utils } from "@/utils";
export default {
  components: {
    belongerComponent
  },
  data() {
    let self = this;
    let checkTime = (rule, value, callback) => {
      if (this.ruleForm.startDate && this.ruleForm.endDate) {
        if (this.ruleForm.startDate > this.ruleForm.endDate) {
          return callback(new Error("开始时间必须大于结束时间"));
        } else {
          callback();
        }
      }
    };
    return {
      pageTitle: "新建市场活动",
      belongerVisible: false,
      dateTypeString: "yyyy-MM-dd", //时间格式
      SelectionOptions,
      routeQuery: {},
      isLoading: false, //是否正在加载
      isSubmitting: false, //是否正在提交
      ruleForm: {
        name: null,
        ownerUserNo: null, //拥有人No
        ownerUserName: null, //拥有人name
        type: null,
        startDate: null,
        endDate: null,
        location: null,
        note: null,
        plan: null
      },
      rules: {
        //校验规则
        name: [
          { required: true, message: "请输入活动名称", trigger: ["blur"] },
          { min: 2, max: 50, message: "请至少输入2位", trigger: "blur" }
        ],
        ownerUserName: [
          { required: true, message: "请选择拥有人", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            message: "请选择活动类型",
            trigger: ["blur", "change"]
          }
        ],
        startDate: [
          {
            required: true,
            message: "请选择开始日期",
            trigger: ["blur", "change"]
          },
          { validator: checkTime, trigger: ["blur", "change"] }
        ],
        endDate: [
          {
            required: true,
            message: "请选择结束日期",
            trigger: ["blur", "change"]
          },
          { validator: checkTime, trigger: ["blur", "change"] }
        ]
      },
      startPickerOptions: {
        disabledDate(time) {
          let endDate = self.ruleForm.endDate || "";
          if (endDate) {
            let sdTime = new Date(endDate).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          let startDate = self.ruleForm.startDate || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() + 24 * 3600 * 1000 < sdTime;
          }
        }
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
      userInfo: {}, //登录人信息
      dictTable: null, //字典表
      detailPath: "/market/index/detail", //详情路由地址
      ListPath: "/market/index" //列表路由地址
    };
  },
  computed: {},

  created() {
    this.routeQuery = this.$route.query;
    this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    if (this.routeQuery.flag == "edit") {
      this.pageTitle = "修改市场活动";
      this.getMarketDetail();
    } else {
      this.ruleForm.ownerUserName = this.userInfo.name;
      this.ruleForm.ownerUserNo = this.userInfo.userNo;
    }
  },
  mounted() { },
  methods: {
    getMarketDetail() {
      DataApi.getMarketDetail(this.routeQuery.activityId).then(res => {
        if (res.code == 200) {
          let ndata = res.data || {};
          this.ruleForm = {
            ...ndata,
            name: ndata.name,
            ownerUserNo: ndata.ownerUserNo,
            ownerUserName: ndata.ownerUserName,
            type: ndata.type,
            startDate: Utils.timestampToTime(ndata.startDate, 1),
            endDate: Utils.timestampToTime(ndata.endDate, 1),
            location: ndata.location,
            note: ndata.note,
            plan: ndata.plan
          };
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    setTableRow(data) {
      this.belongerVisible = false;
      this.ruleForm.ownerUserName = data.userName;
      this.ruleForm.ownerUserNo = data.userNo;
    },
    changOwnerFunc() {
      this.belongerVisible = true;
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.routeQuery.flag == "edit") {
            DataApi.updateMarket(this.ruleForm).then(res => {
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
            DataApi.addMarket(this.ruleForm).then(res => {
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
            activityId: this.routeQuery.activityId
          }
        });
        // this.$router.push({
        //   name: "marketDetail",
        //   params: { activityId: this.routeQuery.activityId, flag: "detail" }
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
.content {
  .cursor {
    cursor: pointer;
  }
}
.market-content {
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