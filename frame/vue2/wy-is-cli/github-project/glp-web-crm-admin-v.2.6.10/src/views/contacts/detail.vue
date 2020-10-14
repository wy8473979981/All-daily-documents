<template>
  <div class="content contacts-detail">
    <div class="section base-info-section">
      <el-form class="form-section block-form" :model="ruleForm" ref="ruleForm" inline size="small" label-width="150px">
        <Btns :btnsProps="btnsProps" />
        <Card :title="'基本信息'">
          <el-row class :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户名称" prop="customerName" class="btn-box">
                <el-input v-model="ruleForm.customerName" placeholder="" disabled class="form-input"></el-input>
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
          <el-row class :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="contactName">
                <el-input v-model="ruleForm.contactName" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人类型" prop="contactType">
                <el-select v-model="ruleForm.contactType" disabled clearable placeholder="">
                  <el-option v-for="(item,index) in dictTable.CONTACT_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="部门" prop="department">
                <el-input v-model="ruleForm.department" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="8">
              <el-form-item label="职务" prop="title">
                <el-input v-model="ruleForm.title" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关系" prop="relationship">
                <el-select v-model="ruleForm.relationship" disabled clearable placeholder="">
                  <el-option v-for="(item,index) in dictTable.RELATIONSHIP" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码" prop="contactMobile">
                <el-input v-model="ruleForm.contactMobile" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="8">
              <el-form-item label="微信" prop="contactWechat">
                <el-input v-model="ruleForm.contactWechat" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系邮箱" prop="contactEmail">
                <el-input v-model="ruleForm.contactEmail" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="QQ" prop="contactQq">
                <el-input v-model="ruleForm.contactQq" disabled placeholder="" class="form-input"></el-input>
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
import DataApi from "@/api/contactsService";
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
      dictTable: null, //字典表
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
      btnsProps: {},
      ListPath: "/contacts/index", //列表路由地址
      editPath: "/contacts/index/edit" //修改路由地址
    };
  },
  computed: {},
  created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.getDetail();
  },
  mounted() { },
  methods: {
    getDetail() {
      DataApi.contactsDetailById(this.routeQuery.contactsId).then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.ruleForm = {
            ...data,
            createTime: Utils.timestampToTime(data.createTime, 2),
            updateTime: Utils.timestampToTime(data.updateTime, 2)
          };

          if (data) {
            this.btnsProps = {};
            data.buttonList &&
              data.buttonList.map((item, index) => {
                if (Utils.btnAuthority("CRM_CONTACTS_EDIT") && item.buttonType == "CRM_EDIT" && item.enable) {
                  this.btnsProps["edit"] = {
                    text: "修改",
                    func: this.editFunc
                  };
                } else if (Utils.btnAuthority("CRM_CONTACTS_DEL") && item.buttonType == "CRM_DEL" && item.enable) {
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
      this.dialogTxt = `确认删除联系人？<p>${this.ruleForm.contactName}</p>`;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let message = "删除成功！";
        let params = { ids: [this.ruleForm.id] };
        DataApi.deleteContacts(params).then(res => {
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
            contactsId: this.routeQuery.contactsId,
            activeName: this.routeQuery.activeName,
            currConsumerId: this.routeQuery.currConsumerId,
            currConsumerType: this.routeQuery.currConsumerType,
            currConsumerName: this.routeQuery.currConsumerName
          }
        });
      } else {
        this.$router.push({
          path: this.editPath,
          query: {
            flag: "edit",
            viewType: "detail",
            contactsId: this.ruleForm.id
          }
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
.contacts-detail {
  .base-info-section {
    label {
      font-weight: normal;
      color: #333;
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
  }
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