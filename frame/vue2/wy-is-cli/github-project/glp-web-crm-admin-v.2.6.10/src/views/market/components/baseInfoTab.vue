<template>
  <div class="content market">
    <div class="section">
      <Btns :btnsProps="btnsProps" />
      <el-form class="form-section block-form" :model="ruleForm" ref="ruleForm" inline size="small">
        <Card :title="'基本信息'">
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name" :disabled="isCanEdit" placeholder class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拥有人" prop="ownerUserName">
                <el-input v-model="ruleForm.ownerUserName " placeholder :disabled="isCanEdit" class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动类型" prop="type">
                <el-select v-model="ruleForm.type" :disabled="isCanEdit" class="form-input" placeholder>
                  <el-option v-for="(item,index) in dictTable.MARKET_ACTIVITY_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动地点" prop="location">
                <el-input v-model="ruleForm.location" :disabled="isCanEdit" placeholder class="form-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="form-item-div" label="开始日期" prop="startDate">
                <el-date-picker type="date" :disabled="isCanEdit" placeholder :value-format="dateTypeString" v-model="ruleForm.startDate" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="form-item-div" label="结束日期" prop="endDate">
                <el-date-picker :picker-options="endPickerOptions" type="date" :disabled="isCanEdit" placeholder :value-format="dateTypeString" v-model="ruleForm.endDate" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :span="12" label="营销方案" prop="plan">
                <el-select v-model="ruleForm.plan" clearable :disabled="isCanEdit" placeholder class="form-input">
                  <el-option v-for="(item,index) in dictTable.MARKET_ACTIVITY_PLAN" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="desTextarea" prop="note" label="活动描述">
                <el-input v-model="ruleForm.note" :disabled="isCanEdit" type="textarea" :rows="5" maxlength="300" show-word-limit style="width:800px;" placeholder class="form-input"></el-input>
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
    <!-- 删除插件 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>
    <!-- 共享 -->
    <shareComponent :show.sync="searchUserVisible" :shareId="shareId" :dataType="'MARKET'" v-if="searchUserVisible"></shareComponent>
  </div>
</template>
<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import shareComponent from "@/components/UX/shareComponent";
import listMixin from "@/js/mixins/listMixin";
import DataApi from "@/api/marketService";
import { Utils } from "@/utils";
export default {
  name: "baseInfoTab",
  mixins: [listMixin],
  components: {
    shareComponent
  },
  props: {
    baseInfo: {
      type: Object
    }
  },
  data() {
    return {
      Utils: Utils,
      SelectionOptions,
      deleteVisible: false,
      isCanEdit: true,
      searchUserVisible: false,
      shareValue: {},
      clientValue: {},
      routeQuery: {},
      shareId: null,
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
      dateTypeString: "yyyy-MM-dd", //时间格式
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
      btnsProps: {},
      dictTable: null, //字典表
      ListPath: "/market/index", //列表路由地址
      editPath: "/market/index/edit" //修改路由地址
    };
  },
  watch: {
    baseInfo: function (v) {
      this.ruleForm = v;
    }
  },
  created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
  },
  mounted() {
    this.ruleForm = this.baseInfo;
    if (this.baseInfo) {
      this.btnsProps = {};
      let buttonList = this.baseInfo.buttonList;
      buttonList && buttonList.map((item, index) => {
        if (Utils.btnAuthority("CRM_MARKET_SHARE") && item.buttonType == "CRM_MARKET_SHARE" && item.enable) {
          this.btnsProps["share"] = { text: "共享", func: this.shareFunc };
        } else if (Utils.btnAuthority("CRM_MARKET_EDIT") && item.buttonType == "CRM_MARKET_EDIT" && item.enable) {
          this.btnsProps["edit"] = { text: "修改", func: this.editFunc };
        } else if (Utils.btnAuthority("CRM_MARKET_DEL") && item.buttonType == "CRM_MARKET_DEL" && item.enable) {
          this.btnsProps["delete"] = { text: "删除", func: this.deleteFunc };
        }
      });
      this.btnsProps["cancel"] = { text: "返回", func: this.cancelFunc };
    }
  },
  methods: {
    shareFunc() {
      this.shareId = this.routeQuery.activityId;
      this.searchUserVisible = true;
    },
    relevanceFunc() {
      this.clientVisible = true;
    },
    setShareValue(data) {
      this.shareValue = data;
    },
    deleteFunc(item) {
      //获取删除对象
      this.deleteVisible = true;
      this.dialogTxt = `确认删除活动？<p>${this.ruleForm.name}</p>`;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let message = "删除成功！";
        let params = { ids: [this.ruleForm.id] };
        DataApi.deleteMarket(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.$router.push({ path: this.ListPath });
          } else {
            this.$message({ type: "warning", message: res.message ? res.message : "系统异常请联系管理员！" });
          }
        });
      } else {
        this.deleteVisible = false;
      }
    },
    editFunc() {
      this.$router.push({
        path: this.editPath,
        query: {
          flag: "edit",
          viewType: "detail",
          activityId: this.routeQuery.activityId
        }
      });
      // this.$router.push({
      //   name: "marketEdit",
      //   params: {
      //     flag: "edit",
      //     viewType: "detail",
      //     activityId: this.routeQuery.activityId
      //   }
      // });
    },
    cancelFunc() {
      this.$router.push({
        path: this.ListPath
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.base-info-section {
  label {
    font-weight: normal;
    color: #333;
  }
}
.row-item {
  font-size: 14px;
  margin-bottom: 20px;
  p {
    line-height: 24px;
    padding: 0 10px;
  }
  .el-col {
    display: flex;
    justify-content: left;
    .vm {
      vertical-align: middle;
      margin: 2px 5px 0 0;
    }
  }
  .align-center-item {
    align-items: center;
  }
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
.row-item:last-child {
  margin-bottom: 0px;
}
.green {
  color: #078e34;
}
.tc {
  text-align: center;
}
.base-info-section .row-item label {
  color: #3a3131;
  font-weight: normal;
  margin: 0 5px 15px 0;
  display: inline-block;
}
.base-info-section .row-item span {
  color: #888888;
}
.mr {
  margin-right: 15px;
}
.market {
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
}
</style>