<template>
  <div class="content todoApproval-content" v-if="detailFlag&&approveRecordFlag">
    <div class="section base-info-section">
      <el-form class="form-section" :model="ruleForm" ref="ruleForm" :inline="true" size="small" label-width="150px">
        <!-- ----提交人            审核人
        10审批中  返回              同意 驳回 返回
        20已通过  返回              返回
        30未通过  返回              返回
        40驳回    修改 终止 返回     返回 -->
        <template v-if="orderStatus">
          <template v-if="routeQuery.approveType=='DONE'">
            <Btns :btnsProps="passBtn" />
          </template>
          <template v-else>
            <template v-if="orderStatus==10">
              <template v-if="isSubmitUser">
                <Btns :btnsProps="passBtn" />
              </template>
              <template v-else>
                <Btns :btnsProps="approvalBtn" />
              </template>
            </template>
            <template v-else-if="orderStatus==20">
              <Btns :btnsProps="passBtn" />
            </template>
            <template v-else-if="orderStatus==30">
              <Btns :btnsProps="passBtn" />
            </template>
            <template v-else>
              <template v-if="isSubmitUser">
                <Btns :btnsProps="submitBtn" />
              </template>
              <template v-else>
                <Btns :btnsProps="passBtn" />
              </template>
            </template>
          </template>
        </template>

        <Card :title="'基本信息'">
          <el-row class="row-span" :gutter="20">
            <el-col :span="12">
              <el-form-item label="业务类型:" prop="customerName">
                <span>{{ruleForm.approveRes.orderTitle}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提交人:" prop="type">
                <span>{{ruleForm.shareProfitVO.createUserName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审批状态:" prop="customerName">
                <span>{{Utils.getLabel(ruleForm.approveRes.orderStatus,dictTable.APPROVAL_STATUS)}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提交时间:" prop="type">
                <span>{{Utils.timestampToTime(ruleForm.approveRes.createTime,2)}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
        <Card :title="'审批内容'">
          <shareProfitSet :baseInfo="ruleForm.shareProfitVO"></shareProfitSet>
        </Card>
      </el-form>
      <Card :title="'审批记录'">
        <tableTemplate :thead-data="theadData" :table-data="commentList" :selection="false" :checkbox="false"></tableTemplate>
      </Card>
    </div>
    <el-dialog title="提示" :visible.sync="rebutVisible" :width="'500px'">
      <el-form :model="rebutForm" :rules="rebutRules" ref="rebutForm">
        <el-form-item label="驳回原因" prop="remark">
          <el-input type="textarea" placeholder="请输入内容" v-model.trim="rebutForm.remark" rows="5" maxlength="300" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRebutfunc">确 定</el-button>
        <el-button @click="rebutVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="terminationVisible" :width="'500px'">
      <el-form :model="terminationForm" :rules="terminationRules" ref="terminationForm">
        <el-form-item label="终止原因" prop="remark">
          <el-input type="textarea" placeholder="请输入内容" v-model.trim="terminationForm.remark" rows="5" maxlength="300" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTerminationfunc">确 定</el-button>
        <el-button @click="terminationVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/todoApproval";
import { Utils } from "@/utils";
import shareProfitSet from "./components/shareProfitSet";
export default {
  mixins: [listMixin],
  components: { shareProfitSet },
  data() {
    return {
      orderStatus: null,//20：通过，40：驳回
      Utils: Utils,
      detailFlag: false,
      approveRecordFlag: false,
      isSubmitUser: false,// true 提交人，false审批人
      dictTable: null, //字典表
      dateType: "yyyy-MM-dd HH:mm:ss",
      SelectionOptions,
      routeQuery: null,
      terminationVisible: false,
      rebutVisible: false,
      commentList: [],
      terminationForm: {
        remark: null,
      },
      rebutForm: {
        remark: null,
      },
      terminationRules: {
        remark: [
          { required: true, message: "请输入终止原因", trigger: ["blur"] },
          { min: 1, max: 300, message: "请至少输入1位", trigger: "blur" }
        ]
      },
      rebutRules: {
        remark: [
          { required: true, message: "请输入驳回原因", trigger: ["blur"] },
          { min: 1, max: 300, message: "请至少输入1位", trigger: "blur" }
        ]
      },
      ruleForm: {
        approveRes: {},
        shareProfitVO: {}
      }, //表单字段
      theadData: [
        { checked: true, key: "taskName", val: "节点" },
        { checked: true, key: "assigneeName", val: "操作人" },
        { checked: true, key: "endTime", val: "操作时间" },
        { checked: true, key: "auditOperation", val: "审批操作" },
        { checked: true, key: "auditComment", val: "原因备注" },
      ],
      submitBtn: {
        edit: { text: "修改", func: this.editFunc },
        termination: { text: "终止", func: this.terminationFunc },
        cancel: { text: "返回", func: this.cancelFunc }
      },
      approvalBtn: {
        submit: { text: "同意", func: this.submitFunc },
        rebut: { text: "驳回", func: this.rebutFunc },
        cancel: { text: "返回", func: this.cancelFunc }
      },
      passBtn: {
        cancel: { text: "返回", func: this.cancelFunc }
      },
      userInfo: null,
      ListPath: "/visit/index", //列表路由地址
      editPath: "/visit/index/edit" //修改路由地址
    };
  },
  computed: {},
  created() {
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.routeQuery = this.$route.query;
    this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));

    this.approveRecord();
    this.getDetail();
  },
  mounted() {
    console.log(this.ruleForm, '0000')
  },
  methods: {
    getDetail() {
      DataApi.todoDetailById(this.routeQuery.processId).then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.ruleForm = {
            ...this.ruleForm,
            shareProfitVO: data.shareProfitVO
          };
          this.isSubmitUser = this.userInfo.userNo == data.shareProfitVO.createUserNo;
          this.detailFlag = true;
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    approveRecord() {
      DataApi.approveRecord(this.routeQuery.processId).then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.ruleForm = {
            ...this.ruleForm,
            approveRes: data.approveRes
          };
          this.orderStatus = data.approveRes.orderStatus;
         
          this.commentList = data.approveRes.commentList;
          this.approveRecordFlag = true;
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    terminationFunc() {
      this.terminationVisible = true;
    },
    submitTerminationfunc() {
      this.$refs["terminationForm"].validate(valid => {
        if (valid) {
          this.terminationVisible = false;
          let params = {
            taskId: this.routeQuery.taskId,
            processId: this.routeQuery.processId,
            remark: this.terminationForm.remark,
          }
          this.termination(params);
        }
      });
    },
    submitFunc() {
      let params = {
        taskId: this.routeQuery.taskId,
        processId: this.routeQuery.processId,
        id: this.ruleForm.shareProfitVO.id,
        remark: "",
        result: "PASS",
      }
      this.todoApproval(params);
    },
    rebutFunc() {
      this.rebutVisible = true;
    },
    submitRebutfunc() {
      this.$refs["rebutForm"].validate(valid => {
        if (valid) {
          this.rebutVisible = false;
          let params = {
            userNos: [this.ruleForm.shareProfitVO.createUserNo],
            taskId: this.routeQuery.taskId,
            processId: this.routeQuery.processId,
            id: this.ruleForm.shareProfitVO.id,
            remark: this.rebutForm.remark,
            result: "REJECT",
          }
          this.todoApproval(params);
        }
      });

    },
    todoApproval(params) {
      // 同意，驳回
      DataApi.todoApproval(params).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "审批成功！"
          });
          this.cancelFunc();
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    termination(params) {
      // 终止
      DataApi.termination(params).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "审批成功！"
          });
          this.cancelFunc();
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
        query: { flag: "edit", shareProfitSetId: this.ruleForm.shareProfitVO.id }
      });
    },
    cancelFunc() {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss">
.todoApproval-content {
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
  .row-span {
    font-size: 14px;
    .el-form-item {
      margin: 0;
    }
    label {
      color: #3a3131;
      font-weight: normal;
      display: inline-block;
    }
    span {
      color: #888;
      word-break: break-all;
      line-height: 1.5em;
      font-weight: normal;
      display: inline-block;
    }
  }
}
</style>