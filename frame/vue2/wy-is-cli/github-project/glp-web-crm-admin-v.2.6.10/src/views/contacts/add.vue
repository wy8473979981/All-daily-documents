<template>
  <div class="content contacts-add">
    <div class="section">
      <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small" label-width="150px">
        <Btns :btnsProps="btnsProps" />
        <Card :title="'基本信息'">
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户名称" prop="customerName" class="btn-box">
                <el-input v-model="ruleForm.customerName" placeholder="请查询并选择客户" disabled class="form-input"></el-input>
                <el-button type="primary" :disabled="isCanUser" @click="searchClientFun">查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="activityName" label="所属市场活动" class="btn-box">
                <el-input v-model="ruleForm.activityName" clearable disabled class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="activityChannelName" label="市场活动渠道" class="btn-box">
                <el-input v-model="ruleForm.activityChannelName" clearable disabled class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="contactName">
                <el-input v-model.trim="ruleForm.contactName" clearable maxlength="50" placeholder="请输入姓名" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人类型" prop="contactType">
                <el-select v-model="ruleForm.contactType" clearable placeholder="请选择联系人类型">
                  <el-option v-for="(item,index) in dictTable.CONTACT_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="部门" prop="department">
                <el-input v-model.trim="ruleForm.department" clearable placeholder="请输入部门" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <el-form-item label="职务" prop="title">
                <el-input v-model.trim="ruleForm.title" clearable placeholder="请输入职务" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关系" prop="relationship">
                <el-select v-model="ruleForm.relationship" clearable placeholder="请选择关系">
                  <el-option v-for="(item,index) in dictTable.RELATIONSHIP" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码" prop="contactMobile">
                <el-input v-model.trim="ruleForm.contactMobile" clearable placeholder="请输入手机号码" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <el-form-item label="微信" prop="contactWechat">
                <el-input v-model.trim="ruleForm.contactWechat" clearable placeholder="请输入微信" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系邮箱" prop="contactEmail">
                <el-input v-model.trim="ruleForm.contactEmail" clearable placeholder="请输入联系邮箱" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="QQ" prop="contactQq">
                <el-input v-model.trim="ruleForm.contactQq" clearable placeholder="请输入QQ" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
      </el-form>
    </div>
    <!-- 查询客户 -->
    <consumerComponent :show.sync="consumerVisible" v-if="consumerVisible" :urlType="false" @listenEvent="setConsumValue"></consumerComponent>
    <!-- 查询市场活动 -->
    <actionModal :show.sync="actionVisible" v-if="actionVisible" :activeChannelData="activeChannelData" @listenEvent="setActionTableRow"></actionModal>

    <!-- 查询活动渠道 -->
    <channelModal :show.sync="channelVisible" v-if="channelVisible" :marketActiveData="marketActiveData" @listenEvent="setChannelTableRow"></channelModal>
  </div>
</template>
<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import consumerComponent from "@/components/UX/consumerComponent";
import actionModal from "@/components/UX/actionComponent";
import channelModal from "@/components/UX/channelComponent";
import DataApi from "@/api/contactsService";
import { Utils } from "@/utils";
export default {
  components: {
    actionModal,
    channelModal,
    consumerComponent
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      actionVisible: false,
      channelVisible: false,
      marketActiveData: null, //已选的市场活动
      activeChannelData: null, //已选的活动渠道
      consumerVisible: false,
      SelectionOptions,
      isCanUser: false, //能不能使用客户查询
      ruleForm: {
        customerId: null, // 客户ID
        customerName: null, // 客户名称
        activityChannelId: null, //市场活动渠道
        activityChannelName: null, //市场活动渠道名称
        activityId: null, //所属市场活动
        activityName: null, //所属市场活动名称
        contactName: null, //姓名
        contactType: null, //联系人类型
        department: null, //所属部门
        title: null, //职务
        relationship: null, //关系
        contactMobile: null, //手机号码
        contactWechat: null, //微信
        contactEmail: null, //联系邮箱
        contactQq: null //QQ
      }, //表单字段
      rules: {
        customerName: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        contactName: [
          { required: true, message: "请输入姓名", trigger: ["blur"] },
          { min: 2, max: 50, message: "请至少输入2位", trigger: "blur" }
        ],
        contactType: [
          { required: true, message: "请选择联系人类型", trigger: "change" }
        ],
        contactMobile: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: ["blur", "change"]
          },
          { validator: checkPhone, trigger: ["blur", "change"] }
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
      dictTable: null, //字典表
      routeQuery: null,
      ListPath: "/contacts/index" //列表路由地址
    };
  },
  computed: {},
  created() {
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
        customerName: this.routeQuery.currConsumerName, // 客户名称
        activityId: this.routeQuery.currActivityId, //所属市场活动
        activityName: this.routeQuery.currActivityName, //所属市场活动名称
        activityChannelId: this.routeQuery.currActivityChannelId, //市场活动渠道
        activityChannelName: this.routeQuery.currActivityChannelName //市场活动渠道名称
      };
    }
  },
  mounted() { },
  methods: {
    getDetail() {
      DataApi.contactsDetailById(this.routeQuery.contactsId).then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.ruleForm = {
            id: data.id,
            customerId: data.customerId, // 客户ID
            customerName: data.customerName, // 客户名称
            activityChannelId: data.activityChannelId, //市场活动渠道
            activityChannelName: data.activityChannelName, //市场活动渠道名称
            activityId: data.activityId, //所属市场活动
            activityName: data.activityName, //所属市场活动名称
            contactName: data.contactName, //姓名
            contactType: data.contactType, //联系人类型
            department: data.department, //所属部门
            title: data.title, //职务
            relationship: data.relationship, //关系
            contactMobile: data.contactMobile, //手机号码
            contactWechat: data.contactWechat, //微信
            contactEmail: data.contactEmail, //联系邮箱
            contactQq: data.contactQq //QQ
          };
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    searchActionFun() {
      this.actionVisible = true;
    },
    setActionTableRow(data) {
      this.ruleForm.activityId = data.id; //所属市场活动
      this.ruleForm.activityName = data.name; //所属市场活动名称
      this.marketActiveData = data; //已选的市场活动
    },
    searchChannelFun() {
      this.channelVisible = true;
    },
    setChannelTableRow(data) {
      this.ruleForm.activityChannelId = data.id; //市场活动渠道
      this.ruleForm.activityChannelName = data.name; //市场活动渠道名称
      this.activeChannelData = data; //已选的市场活动渠道
    },
    searchClientFun() {
      this.consumerVisible = true;
    },
    setConsumValue(data) {
      this.ruleForm.customerId = data.id; //客户ID
      this.ruleForm.customerName = data.name; //客户名称
      this.ruleForm.activityId = data.activityId; //所属市场活动
      this.ruleForm.activityName = data.activityName; //所属市场活动名称
      this.ruleForm.activityChannelId = data.activityChannelId; //市场活动渠道
      this.ruleForm.activityChannelName = data.channelName; //市场活动渠道名称
      this.consumerVisible = false;
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.routeQuery.flag == "edit") {
            DataApi.updateContacts(this.ruleForm).then(res => {
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
            DataApi.createContacts(this.ruleForm).then(res => {
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
      //       path: this.detailPath,
      //       query: {
      //         contactsId: this.routeQuery.contactsId
      //       }
      //     });
      //   } else {
      //     this.$router.push({
      //       path: this.ListPath
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
.contacts-add {
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