<template>
  <div class="content batchTranferConsumer">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section block-form" ref="ruleForm" :model="ruleForm" :rules="rules" inline size="small" label-width="80px">
          <el-row :gutter="20" type="flex" class="row-bg" justify="center" align="middle">
            <el-col :span="8">
              <el-form-item label="转出自" prop="fromUserName" class="btn-box">
                <el-input v-model="ruleForm.fromUserName" disabled class="form-input" placeholder="请查询并选择用户"></el-input>
                <el-button type="primary" @click="searchBelongerFunc('out')">查询</el-button>
              </el-form-item>
              <el-form-item label="转入到" prop="toUserName" class="btn-box">
                <el-input v-model="ruleForm.toUserName" disabled class="form-input" placeholder="请查询并选择用户"></el-input>
                <el-button type="primary" @click="searchBelongerFunc('into')">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center" align="middle">
            <el-col :span="8">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">开始批量转让</el-button>
                <el-button type="primary" @click="onClear">清空已选用户</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </Card>
    </div>
    <!-- 查询用户 -->
    <belongerModal :show.sync="belongerVisible" v-if="belongerVisible" :lockingStatus="lockingStatus" @listenEvent="setBelongerTableRow"></belongerModal>

    <el-dialog title="批量转让结果" :visible.sync="Visible" class="body-center" :width="'420px'">
      <p>已转让 {{batchLength}} 条客户数据</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Visible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import belongerModal from "@/components/UX/belongerComponent";
import DataApi from "@/api/consumerService";
import { Utils } from "@/utils";
export default {
  components: {
    belongerModal
  },
  data() {
    let self = this;
    return {
      belongerVisible: false,
      lockingStatus: "00",// crm内部是否有效 00 -有效， 01-无效 
      Visible: false,
      batchLength: 0,
      type: null,
      ruleForm: {
        fromUserNo: null,
        fromUserName: null,
        toUserNo: null,
        toUserName: null
      },
      rules: {
        fromUserName: [
          { required: true, message: "请选择用户", trigger: "change" }
        ],
        toUserName: [
          { required: true, message: "请选择用户", trigger: "change" }
        ]
      }
    };
  },
  created() { },
  methods: {
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.batchLength = 0;
          DataApi.consumerBatchTransfer(this.ruleForm).then(res => {
            if (res.code == 200) {
              const { data } = res;
              this.Visible = true;
              this.batchLength = data.success;
            } else {
              this.$message({
                type: "warning",
                message: res.message ? res.message : "系统异常请联系管理员！"
              });
            }
          });
        }
      });
    },
    onClear() {
      this.ruleForm = {
        fromUserNo: null,
        fromUserName: null,
        toUserNo: null,
        toUserName: null
      };
    },
    searchBelongerFunc(type) {
      this.belongerVisible = true;
      this.type = type;
      if (this.type == "out") {
        this.lockingStatus = null;
      } else {
        this.lockingStatus = "00";
      }
    },
    setBelongerTableRow(data) {
      this.belongerVisible = false;
      if (this.type == "out") {
        this.ruleForm.fromUserNo = data.userNo; //用户编号
        this.ruleForm.fromUserName = data.userName; //用户名称
      } else {
        this.ruleForm.toUserNo = data.userNo; //用户编号
        this.ruleForm.toUserName = data.userName; //用户名称
      }
    }
  }
};
</script>

<style lang="scss">
.batchTranferConsumer {
  .btn-box {
    .el-form-item__content {
      display: flex;
    }
    .el-button {
      margin-left: 5px;
    }
  }
  .body-center {
    .el-dialog__body {
      padding: 40px 0;
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
}
</style>