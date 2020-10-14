<template>
  <div class="content" v-loading="isLoading">
    <div class="section">
      <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small">
        <Btns :btnsProps="btnsProps" />
        <Card :title="pageTitle">
          <el-row class :gutter="20">
            <el-col :span="24">
              <el-form-item label="渠道名称" prop="name">
                <el-input v-model.trim="ruleForm.name" placeholder="请输入渠道名称" clearable maxlength="50" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="所属活动" prop="activityName">
                <el-input v-model="ruleForm.activityName " placeholder="" :disabled="true" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
      </el-form>
    </div>
    <!-- 查询活动 -->
    <actionComponent :show.sync="actionVisible" v-if="actionVisible" @listenEvent="setTableRow"></actionComponent>
  </div>
</template>
<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import actionComponent from "@/components/UX/actionComponent";
import DataApi from "@/api/marketService";
import { Utils } from "@/utils";
export default {
  components: {
    actionComponent
  },
  data() {
    let self = this;
    return {
      Utils: Utils,
      pageTitle: "新建渠道",
      actionVisible: false,
      dateTypeString: "yyyy/MM/dd", //时间格式
      SelectionOptions,
      query: {
        //查询参数
      },
      isLoading: false, //是否正在加载
      isSubmitting: false, //是否正在提交
      ruleForm: {
        name: null,
        activityId: null,
        activityName: null,
        qrcodeName: null,
        qrcodeUrl: null
      },
      rules: {
        name: [
          { required: true, message: "请输入渠道名称", trigger: ["blur"] },
          { min: 2, max: 50, message: "请至少输入2位", trigger: "blur" }
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
      routeQuery: {},
      detailPath: "/market/index/detail", //列表路由地址
      channelDetailPath: "/market/index/channelDetail" //渠道详情路由地址
    };
  },
  computed: {},

  created() {
    this.routeQuery = this.$route.query;
  },
  mounted() {
    this.ruleForm = {
      name: null,
      activityId: this.routeQuery.activityId,
      activityName: this.routeQuery.activityName,
      qrcodeName: null,
      qrcodeUrl: null
    };
    if (this.routeQuery.flag === "add") {
      this.pageTitle = "新增渠道";
    } else {
      this.pageTitle = "修改渠道";
      this.getChannelDetail();
    }
  },
  methods: {
    getChannelDetail() {
      DataApi.getChannelDetail(this.routeQuery.channelId).then(res => {
        if (res.code == 200) {
          let ndata = res.data || {};
          this.ruleForm = {
            ...ndata,
            name: ndata.name,
            activityId: ndata.activityId,
            activityName: ndata.activityName,
            qrcodeName: ndata.qrcodeName,
            qrcodeUrl: ndata.qrcodeUrl
          };
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    searchActionFunc() {
      this.actionVisible = true;
    },
    submitForm() {
      //前端校验表单
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.routeQuery.flag == "edit") {
            DataApi.updateChannel(this.ruleForm).then(res => {
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
            DataApi.addChannel(this.ruleForm).then(res => {
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
          path: this.channelDetailPath,
          query: {
            activityId: this.routeQuery.activityId,
            channelId: this.routeQuery.channelId
          }
        });
      } else {
        this.$router.push({
          path: this.detailPath,
          query: {
            activeName: "second",
            activityId: this.routeQuery.activityId
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-checkbox-group {
  margin-left: 10px;
}
</style>