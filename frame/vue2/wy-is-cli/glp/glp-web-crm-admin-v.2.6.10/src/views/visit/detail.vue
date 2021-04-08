<template>
  <div class="content visit-content">
    <div class="section base-info-section">
      <el-form class="form-section block-form" :model="ruleForm" ref="ruleForm" inline size="small" label-width="150px">
        <Btns :btnsProps="btnsProps" />
        <Card :title="'基本信息'">
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户名称" prop="customerName" class="btn-box">
                <el-input v-model="ruleForm.customerName" disabled class="form-input" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拜访类型" prop="type">
                <el-select v-model="ruleForm.type" disabled clearable placeholder="">
                  <el-option v-for="(item,index) in dictTable.VISIT_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <el-form-item label="拜访时间" prop="visitTime">
                <el-date-picker type="datetime" disabled placeholder="" :value-format="dateType" v-model="ruleForm.visitTime" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否初次拜访" prop="firstFlag">
                <el-select v-model="ruleForm.firstFlag" disabled clearable placeholder="">
                  <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <el-form-item label="拜访纪要" prop="note">
                <el-input v-model="ruleForm.note" type="textarea" disabled :rows="5" maxlength="5000" show-word-limit style="width:800px;" placeholder="" class="form-input"></el-input>
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
import DataApi from "@/api/visitService";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  components: {},
  data() {
    return {
      dictTable: null, //字典表
      dateType: "yyyy-MM-dd HH:mm:ss",
      deleteVisible: false,
      SelectionOptions,
      routeQuery: null,
      ruleForm: {
        customerId: null, // 客户ID
        customerName: null, // 客户名称
        firstFlag: null, //初次拜访（陌拜) : 0 否 1 是
        id: null, //拜访记录id
        note: null, // 拜访纪要
        type: null, // 拜访类型(1:电话拜访 2:实地拜访 3:微信拜访)
        visitTime: null //时间
      }, //表单字段
      btnsProps: {},
      ListPath: "/visit/index", //列表路由地址
      editPath: "/visit/index/edit" //修改路由地址
    };
  },
  computed: {},
  created() {
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.routeQuery = this.$route.query;
    this.getDetail();
  },
  mounted() { },
  methods: {
    getDetail() {
      DataApi.visitDetailById(this.routeQuery.visitId).then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.ruleForm = {
            ...data,
            visitTime: Utils.timestampToTime(data.visitTime, 2),
            createTime: Utils.timestampToTime(data.createTime, 2),
            updateTime: Utils.timestampToTime(data.updateTime, 2)
          };
          if (data) {
            this.btnsProps = {};
            data.buttonList && data.buttonList.map((item, index) => {
              if (Utils.btnAuthority("CRM_VISIT_EDIT") && item.buttonType == "CRM_EDIT" && item.enable) {
                this.btnsProps["edit"] = {
                  text: "修改",
                  func: this.editFunc
                };
              } else if (Utils.btnAuthority("CRM_VISIT_DEL") && item.buttonType == "CRM_DEL" && item.enable) {
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
    deleteFunc(item) {
      this.deleteVisible = true;
      this.batch = false;
      this.dialogTxt = `确认删除拜访记录？`;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let message = "删除成功！";
        let params = { ids: [this.ruleForm.id] };
        DataApi.deleteVisit(params).then(res => {
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
            visitId: this.routeQuery.visitId,
            activeName: this.routeQuery.activeName,
            currConsumerId: this.routeQuery.currConsumerId,
            currConsumerType: this.routeQuery.currConsumerType,
            currConsumerName: this.routeQuery.currConsumerName
          }
        });
      } else {
        this.$router.push({
          path: this.editPath,
          query: { flag: "edit", viewType: "detail", visitId: this.ruleForm.id }
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
.visit-content {
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