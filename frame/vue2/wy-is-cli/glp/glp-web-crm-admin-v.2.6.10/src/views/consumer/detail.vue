<template>
  <div class="content comsumer-detail">
    <div class="section" v-if="loading">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="基本信息" name="first">
          <Btns :btnsProps="btnsProps" />
          <template v-if="type=='ENTERPRISE'">
            <enterpriseBusinessInfoTab :baseInfo="baseInfo"></enterpriseBusinessInfoTab>
          </template>
          <template v-else>
            <individualBusinessInfoTab :baseInfo="baseInfo"></individualBusinessInfoTab>
          </template>
          <Card :title="'操作记录'">
            <el-row class="row-item" :gutter="20">
              <el-col :span="12">
                <label>信息创建:</label>
                <span class="mr">{{baseInfo.createUserName?baseInfo.createUserName:'-'}}</span>
                <span>{{baseInfo.createTime?baseInfo.createTime:'-'}}</span>
              </el-col>
              <el-col :span="12">
                <label>最后修改:</label>
                <span class="mr">{{baseInfo.updateUserName?baseInfo.updateUserName:'-'}}</span>
                <span>{{baseInfo.updateTime?baseInfo.updateTime:'-'}}</span>
              </el-col>
            </el-row>
          </Card>
          <Card :title="'其他信息'">
            <el-row class :gutter="20">
              <el-col :span="8">
                <label>
                  <el-link type="primary" @click="cnsumerMap">查看客户图谱>></el-link>
                </label>
              </el-col>
              <el-col :span="8">
                <label>
                  <el-link type="primary" @click="linesView">查看额度视图>></el-link>
                </label>
              </el-col>
              <el-col :span="8">
                <label>
                  <el-link type="primary" @click="businessLinkFunc">经营数据>></el-link>
                </label>
              </el-col>
            </el-row>
          </Card>
        </el-tab-pane>

        <el-tab-pane label="相关附件" name="second" :lazy="true">
          <accessoryTab :baseInfo="baseInfo"></accessoryTab>
        </el-tab-pane>

        <el-tab-pane label="联系人" name="third" v-if="contactPersonTab" :lazy="true">
          <contactPersonTab :baseInfo="baseInfo"></contactPersonTab>
        </el-tab-pane>

        <el-tab-pane label="地址信息" name="four" v-if="addressInfoTab" :lazy="true">
          <addressInfoTab :baseInfo="baseInfo"></addressInfoTab>
        </el-tab-pane>

        <el-tab-pane label="法定代表及实控人" name="five" :lazy="true" v-if="type=='ENTERPRISE'&&legalControlTab">
          <legalControlTab :baseInfo="baseInfo"></legalControlTab>
        </el-tab-pane>

        <el-tab-pane label="商机" name="six" v-if="businessTab" :lazy="true">
          <businessTab :baseInfo="baseInfo"></businessTab>
        </el-tab-pane>

        <el-tab-pane label="拜访" name="seven" v-if="visitTab" :lazy="true">
          <visitTab :baseInfo="baseInfo"></visitTab>
        </el-tab-pane>

        <el-tab-pane label="已授信贷款信息" name="eight" :lazy="true">
          <loanInformationTab :baseInfo="baseInfo"></loanInformationTab>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 删除 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>

    <!-- 领用 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getReceiveDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="receiveVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>

    <!-- 转让 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getTransferDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="transferVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>

    <!-- 释放 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getReleaseDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="releaseVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt">
      <template v-slot:content>
        <template v-if="batch">
          <el-select v-model="departmentCode" placeholder="请选择" class="liberum">
            <el-option v-for="item in LiberumOptions" :key="item.value" :label="item.poolDesc" :value="item.poolType"></el-option>
          </el-select>
        </template>
      </template>
    </commonDialogTemplate>

    <!-- 查询用户 -->
    <belongerModal :show.sync="belongerVisible" v-if="belongerVisible" :lockingStatus="lockingStatus" @listenEvent="setBelongerTableRow"></belongerModal>

    <!-- 共享 -->
    <shareComponent :show.sync="searchUserVisible" v-if="searchUserVisible" :shareId="shareId" :dataType="'CUSTOMER'"></shareComponent>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import shareComponent from "@/components/UX/shareComponent";
import enterpriseBusinessInfoTab from "./components/enterpriseBusinessInfoTab";
import individualBusinessInfoTab from "./components/individualBusinessInfoTab";
import accessoryTab from "./components/accessory/index";
import contactPersonTab from "./components/contactPersonTab";
import addressInfoTab from "./components/addressInfoTab";
import legalControlTab from "./components/legalControlTab";
import businessTab from "./components/businessTab";
import visitTab from "./components/visitTab";
import loanInformationTab from "./components/loanInformationTab";
import DataApi from "@/api/consumerService";
import belongerModal from "@/components/UX/belongerComponent";
import Cookies from "js-cookie";
import { Utils } from "@/utils";
import { mapGetters } from "vuex";
import commonFn from "@/js/common/methods";
// import merge from 'webpack-merge';
export default {
  mixins: [listMixin],
  components: {
    shareComponent,
    enterpriseBusinessInfoTab,
    individualBusinessInfoTab,
    accessoryTab,
    contactPersonTab,
    addressInfoTab,
    legalControlTab,
    businessTab,
    visitTab,
    loanInformationTab,
    belongerModal
  },
  data() {
    return {
      Utils: Utils,
      // accessoryTab: false,//附件tab
      contactPersonTab: false, //联系人
      addressInfoTab: false, //地址信息
      legalControlTab: false, //法定代表及实控人
      businessTab: false, //商机
      visitTab: false, //拜访
      mainMenu: [], //路由对象
      tabShow: true, //有新增权限，可以看到tab页
      loading: false,
      activeName: "first",
      routeQuery: {},
      type: null,
      baseInfo: null,
      ListPath: "/consumer/index", //列表路由地址
      detailPath: "/consumer/index/edit",
      deleteVisible: false, //删除
      receiveVisible: false, //领用
      transferVisible: false, //转让
      releaseVisible: false, //释放
      belongerVisible: false, //用户查询
      lockingStatus: "00",// crm内部是否有效 00 -有效， 01-无效 
      userDetail: null, //选择的转让客户
      searchUserVisible: false, //共享
      departmentCode: null, //部门code
      LiberumOptions: [], //公海部门
      shareId: null,
      batch: false, //批量
      btnsProps: {
      }
    };
  },
  computed: {
    ...mapGetters(["permission_routers", "menuData"])
  },
  created() {
    try {
      this.routeQuery = this.$route.query;
      this.type = this.routeQuery.currConsumerType;
      // 取菜单
      this.mainMenu = commonFn.deepClone(this.menuData);
      let activeName = localStorage.getItem("activeName");
      if (activeName) {
        this.activeName = activeName;
        localStorage.removeItem("activeName");
      }
      this.getDetailById();
    } catch (e) {
      console.log(e)

    }
  },
  mounted() { },
  methods: {
    cnsumerMap() {
      let token = Cookies.get("token");
      let url = `${process.env.TUPU_HOST}home?token=${token}&certificateId=${this.baseInfo.certificateId}`;
      window.open(url);
    },
    linesView() {
      let url = `${process.env.EDU_HOST}?target=creditView&ecifId=${this.baseInfo.ecifId}`;
      window.open(url);
    },
    businessLinkFunc() {
      let url = `http://pdcpbi01p/reports/browse/finance/crm`;
      window.open(url);
    },
    receiveFunc() {
      this.receiveVisible = true;
      this.dialogTxt = `确认领用客户？<p>${this.baseInfo.name}</p>`;
    },
    getReceiveDelItem(data) {
      if (data.type == true) {
        this.receiveVisible = false;
        let message = "领用成功！";
        let params = [this.baseInfo.id];
        DataApi.batchReceiveConsumer(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.onRefresh(); //刷新当前页
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      } else {
        this.receiveVisible = false;
      }
    },
    transferFunc() {
      this.belongerVisible = true;
    },
    setBelongerTableRow(data) {
      this.userDetail = data;
      this.transferVisible = true;
      this.dialogTxt = `确认转让选中客户？<p>${data.userName}</p>`;
    },
    getTransferDelItem(data) {
      if (data.type == true) {
        this.transferVisible = false;
        this.belongerVisible = false;
        let params = {
          customerIds: [this.baseInfo.id],
          toUserNo: this.userDetail.userNo
        };
        let message = "转让成功！";
        DataApi.batchTransferConsumer(params).then(res => {
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
        this.transferVisible = false;
        this.belongerVisible = false;
      }
    },
    releaseFunc() {
      this.departmentCode = null;
      this.releaseVisible = true;
      this.batch = true;
      this.dialogTxt = `确定释放客户？ <p>${this.baseInfo.name} 到</p>`;
      this.getLiberumByCurrentUser();
    },
    getLiberumByCurrentUser() {
      DataApi.getLiberumByCurrentUser().then(res => {
        if (res.code == 200) {
          let { data } = res || [];
          this.LiberumOptions = data;
        }
      });
    },
    getReleaseDelItem(data) {
      if (data.type == true) {
        let message = "释放成功！";
        if (!this.departmentCode) {
          this.$message({
            type: "warning",
            message: "请选择公海"
          });
          return true;
        }
        this.releaseVisible = false;
        let params = {
          customerIds: [this.baseInfo.id],
          departmentCode: this.departmentCode
        };
        DataApi.batchReleaseConsumer(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.onRefresh(); //刷新当前页
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      } else {
        this.releaseVisible = false;
      }
    },
    shareFunc(row) {
      this.searchUserVisible = true;
      this.shareId = this.baseInfo.id;
    },
    deleteFunc(item) {
      this.deleteVisible = true;
      this.dialogTxt = `确认删除客户？<p>${this.baseInfo.name}</p>`;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let message = "删除成功！";
        let params = [this.baseInfo.id];
        DataApi.deleteConsumerById(params).then(res => {
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
    getDetailById(data) {
      try {
        DataApi.consumerDetailById(this.routeQuery.currConsumerId).then(res => {
          if (res.code == 200) {
            let { data } = res;
            this.baseInfo = {
              ...data,
              customerTypeName: data.customerType == "ENTERPRISE" ? "企业客户" : "个人客户",
              createTime: Utils.timestampToTime(data.createTime, 2),
              updateTime: Utils.timestampToTime(data.updateTime, 2)
            };
            this.loading = true;
            this.btnsProps = {};

            // 客户为 企业客户，证件类型为 新加坡公司商业注册证 不显示附件 tab
            // this.accessoryTab = data.customerType == "ENTERPRISE" ? (data.certificateType == 6 ? false : true) : true;

            this.contactPersonTab = Utils.filterRouterFunc(this.mainMenu, "/contacts/index"); //联系人
            this.addressInfoTab = Utils.filterRouterFunc(this.mainMenu, "/more/siteIndex"); //地址信息
            this.businessTab = Utils.filterRouterFunc(this.mainMenu, "/business/index"); //商机
            this.visitTab = Utils.filterRouterFunc(this.mainMenu, "/visit/index"); //拜访

            let legalControlFlag = Utils.filterRouterFunc(this.mainMenu, "/more/legalControlIndex");//法定代表及实控人
            if (legalControlFlag) {
              // 证件类型为 新加坡公司商业注册证 不显示附件 tab
              this.legalControlTab = data.certificateType == 6 ? false : true
            }

            data.buttonList.map((item, index) => {

              if (Utils.btnAuthority("CRM_CUSTOMER_PICK") && item.buttonType == "CRM_CUSTOMER_PICK" && item.enable) {
                this.btnsProps["receive"] = { text: "领用", func: this.receiveFunc };
              } else if (Utils.btnAuthority("CRM_CUSTOMER_TRANSFER") && item.buttonType == "CRM_CUSTOMER_TRANSFER" && item.enable) {
                this.btnsProps["transfer"] = { text: "转让", func: this.transferFunc };
              } else if (Utils.btnAuthority("CRM_CUSTOMER_RELEASE") && item.buttonType == "CRM_CUSTOMER_RELEASE" && item.enable) {
                this.btnsProps["release"] = { text: "释放", func: this.releaseFunc };
              } else if (Utils.btnAuthority("CRM_CUSTOMER_SHARE") && item.buttonType == "CRM_CUSTOMER_SHARE" && item.enable) {
                this.btnsProps["share"] = { text: "共享", func: this.shareFunc };
              } else if (Utils.btnAuthority("CRM_CUSTOMER_EDIT") && item.buttonType == "CRM_CUSTOMER_EDIT" && item.enable) {
                this.btnsProps["edit"] = { text: "修改", func: this.editFunc };
              } else if (Utils.btnAuthority("CRM_CUSTOMER_DEL") && item.buttonType == "CRM_CUSTOMER_DEL" && item.enable) {
                this.btnsProps["delete"] = { text: "删除", func: this.deleteFunc };
              }
            });

            this.btnsProps["cancel"] = { text: "返回", func: this.cancelFunc };
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    handleTabClick(tab, event) {
      this.activeName = tab.paneName;
    },
    editFunc() {
      this.$router.push({
        path: this.detailPath,
        query: {
          currConsumerId: this.baseInfo.id,
          currConsumerType: this.baseInfo.customerType,
          flag: "edit",
          viewType: "detail"
        }
      });
      // this.$router.push({
      //   name: "consumerEdit",
      //   params: {
      //     currConsumerId: this.baseInfo.id,
      //     currConsumerType: this.baseInfo.customerType,
      //     flag: "edit",
      //     viewType: "detail"
      //   }
      // });
    },
    cancelFunc() {
      let from = this.routeQuery.from;
      if (from == "consumerTab") {
        this.$router.push({
          path: "/market/index/detail",
          query: {
            activeName: this.routeQuery.activityActiveName,
            activityId: this.routeQuery.activityId //活动ID
          }
        });
      } else {
        this.$router.push({
          path: this.ListPath
        });
      }
    },
    onRefresh() {
      this.getDetailById();
    }
  }
};
</script>

<style lang="scss">
.comsumer-detail {
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