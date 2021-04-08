<template>
  <div class="baseInfoTab">
    <div class="base-info-section">
      <Btns :btnsProps="btnsProps" />
      <Card :title="'基本信息'">
        <el-form class="form-section block-form" :model="ruleForm" ref="ruleForm" inline size="small" label-width="150px">
          <el-row class :gutter="20">
            <el-col :span="10">
              <el-form-item label="客户名称" class="btn-box">
                <el-input v-model="ruleForm.customerName" placeholder="" disabled class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="10">
              <el-form-item label="商机名称">
                <el-input v-model="ruleForm.name" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拥有人">
                <el-input v-model="ruleForm.ownerUserName" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="10">
              <el-form-item label="商机阶段">
                <el-select v-model="ruleForm.step" disabled clearable placeholder="">
                  <el-option v-for="(item,index) in dictTable.BUSINESS_OPPORTUNITY_STEP" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拥有人所属事业部">
                <el-input v-model="ruleForm.ownerDepartment" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="10">
              <el-form-item label="赢率">
                <el-input v-model="ruleForm.winRatio" disabled placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="20">
            <el-col :span="8">
              <el-form-item label="商机描述">
                <el-input disabled v-model="ruleForm.note" type="textarea" :rows="5" maxlength="300" show-word-limit style="width:800px;" placeholder="" class="form-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </Card>
      <Card :title="'商机小组'">
        <el-row class="row-item partners_list" :gutter="20" v-for="item in ruleForm.partners" :key="item.message" style="margin-bottom:0;">
          <el-col :span="12">
            <label v-if="item&&item.type == 1">拥有人:</label>
            <label v-if="item&&item.type == 2">成员:</label>
            <span>{{item&&item.userName||'-'}}</span>
          </el-col>
          <el-col :span="12">
            <label v-if="item&&item.type == 1">拥有人贡献率:</label>
            <label v-if="item&&item.type == 2">成员贡献率:</label>
            <span>{{item&&item.contributionRate?item.contributionRate+'%':'-'}}</span>
          </el-col>
        </el-row>
        <el-row class :gutter="20" v-if="!ruleForm.partners||ruleForm.partners.length==0">
          <el-col :span="12">
            <label style="color:#666;font-size:12px;">暂无记录</label>
          </el-col>
        </el-row>
      </Card>
      <Card :title="'操作记录'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="12">
            <label>信息创建:</label>
            <span>{{ruleForm&&ruleForm.createUserName||'-'}}&nbsp;</span>
            <span>{{ruleForm&&ruleForm.createTime?Utils.timestampToTime(ruleForm.createTime, 2):'-'}}</span>
          </el-col>
          <el-col :span="12">
            <label>最后修改:</label>
            <span>{{ruleForm&&ruleForm.updateUserName||'-'}}&nbsp;</span>
            <span>{{ruleForm&&ruleForm.updateTime?Utils.timestampToTime(ruleForm.updateTime, 2):'-'}}</span>
          </el-col>
        </el-row>
      </Card>
      <!-- 删除 -->
      <commonDialogTemplate class="body-center" v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>
    </div>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import DataApi from "@/api/business";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  components: {},
  name: "baseInfoTab",
  props: {
    baseInfo: {
      type: Object
    }
  },
  data: function () {
    return {
      Utils: Utils,
      deleteVisible: false,
      btnsProps: {
      },
      ruleForm: {
        customerName: null, //客户名称
        name: null, //商机名称
        ownerUserName: null, //拥有人
        step: null, //商机阶段
        ownerDepartment: null, //拥有人所属事业部
        winRatio: null, //赢率
        note: null //商机描述
      },
      dictTable: null, //字典表
      Utils: Utils,
      ListPath: "/business/index", //商机列表路由地址
      editPath: "/business/index/edit" //商机修改路由地址
    };
  },
  watch: {
    baseInfo: function (v) {
      this.ruleForm = v;
    }
  },
  computed: {},
  created() {
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.routeQuery = this.$route.query;
  },
  mounted() {
    this.ruleForm = {
      ...this.baseInfo,
      ownerDepartment:
        this.baseInfo.ownerDepartment &&
          this.baseInfo.ownerDepartment.length > 0
          ? this.baseInfo.ownerDepartment.join(", ")
          : "-"
    };
    if (this.baseInfo) {
      this.btnsProps = {};
      this.baseInfo.buttonList &&
        this.baseInfo.buttonList.map((item, index) => {
          if (Utils.btnAuthority("CRM_BUSINESS_EDIT") && item.buttonType == "CRM_EDIT" && item.enable) {
            this.btnsProps["edit"] = { text: "修改", func: this.editFunc };
          } else if (Utils.btnAuthority("CRM_BUSINESS_DEL") && item.buttonType == "CRM_DEL" && item.enable) {
            this.btnsProps["delete"] = { text: "删除", func: this.deleteFunc };
          }
        });
      this.btnsProps["cancel"] = { text: "返回", func: this.cancelFunc };
    }
  },
  methods: {
    deleteFunc(item) {
      this.deleteVisible = true;
      this.dialogTxt = `确认删除商机？<p>${this.ruleForm.name}</p>`;
      this.rowItem = item;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let message = "删除成功！";
        let params = { ids: [this.ruleForm.id] };
        DataApi.deleteList(params).then(res => {
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
    stepFN(d) {
      let arr = this.dictTable.BUSINESS_OPPORTUNITY_STEP;
      let curr;
      if (d && arr && arr.length > 0) {
        arr.map(item => {
          if (item.key == d) {
            curr = item.label;
          }
        });
      }
      return curr;
    },
    editFunc() {
      let activeName = this.routeQuery.activeName;
      if (activeName) {
        //客户详情跳转来的,点击修改需要带上这些参数
        this.$router.push({
          path: "/business/index/edit",
          query: {
            flag: "edit",
            businessId: this.routeQuery.businessId,
            activeName: this.routeQuery.activeName,
            currConsumerId: this.routeQuery.currConsumerId,
            currConsumerType: this.routeQuery.currConsumerType,
            currConsumerName: this.routeQuery.currConsumerName
          }
        });
      } else {
        this.$router.push({
          path: "/business/index/edit",
          query: {
            flag: "edit",
            viewType: "detail",
            businessId: this.ruleForm.id
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
      //     path: "/business/index"
      //   });
      // }
      localStorage.setItem("activeName", this.routeQuery.activeName);
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss">
.baseInfoTab {
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
  .partners_list {
    margin-bottom: 10px;
  }
  .body-center {
    .el-dialog__body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      p,
      .liberum {
        margin: 15px 0 0 0;
      }
    }
  }
}
</style>
