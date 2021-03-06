<template>
  <div class="content consumer">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section" ref="searchForm" :model="serachParm" :rules="rules" :inline="true" size="small" label-width="100px">
          <el-row class="row-item" :gutter="20">
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="客户筛选" prop="type">
                <el-select v-model="serachParm.type" clearable placeholder="全部客户">
                  <el-option v-for="(item,index) in consumerType" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="客户类型" prop="customerType">
                <el-select v-model="serachParm.customerType" clearable placeholder="全部类型">
                  <el-option v-for="(item,index) in dictTable.CUSTOMER_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="是否渠道客户" prop="channelFlag">
                <el-select v-model="serachParm.channelFlag" clearable class="form-input" placeholder="全部">
                  <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div" label="客户名称" prop="name">
                <el-input class="form-item" v-model.trim="serachParm.name" clearable placeholder="请输入客户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div" label="拥有人" prop="ownerName">
                <el-input class="form-item" v-model.trim="serachParm.ownerName" clearable placeholder="请输入拥有人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div form-item-date margin-r-0" label="创建日期" prop="createTimeBegin">
                <el-date-picker :picker-options="createStartPickerOptions" type="date" placeholder="选择开始日期" :value-format="dateTypeString" v-model="serachParm.createTimeBegin" class="form-input"></el-date-picker>
                <span>至</span>
              </el-form-item>
              <el-form-item class="form-item-div form-item-date" prop="createTimeEnd">
                <el-date-picker :picker-options="createEndPickerOptions" type="date" @change="createTimeEndChange" placeholder="选择结束日期" :value-format="dateTypeString" v-model="serachParm.createTimeEnd" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div form-item-date margin-r-0" label="最后修改日期" prop="updateTimeBegin">
                <el-date-picker :picker-options="updateStartPickerOptions" type="date" placeholder="选择开始日期" :value-format="dateTypeString" v-model="serachParm.updateTimeBegin" class="form-input"></el-date-picker>
                <span>至</span>
              </el-form-item>
              <el-form-item class="form-item-div form-item-date" prop="updateTimeEnd">
                <el-date-picker :picker-options="updateEndPickerOptions" type="date" @change="updateTimeEndChange" placeholder="选择结束日期" :value-format="dateTypeString" v-model="serachParm.updateTimeEnd" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="" :gutter="0">
            <el-col :span="24" align="center">
              <el-button type="primary" @click="submitSearch" size="small" class="btn-twofont">查询</el-button>
              <el-button @click="clearData('searchForm')" class="btn-twofont" size="small">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </Card>
    </div>

    <div class="section table-section">
      <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'客户列表'">
        <template v-slot:btns>
          <el-button @click="batchReceiveFunc" :disabled="batchPick" v-if="Utils.btnAuthority('CRM_CUSTOMER_BATCH_PICK')" size="small" type="primary" class="btn-button">批量领用</el-button>
          <el-button @click="batchTransferFunc" :disabled="batchTransfer" v-if="Utils.btnAuthority('CRM_CUSTOMER_BATCH_TRANSFER')" size="small" type="primary" class="btn-button">批量转让</el-button>
          <el-button @click="batchReleaseFunc" :disabled="batchRelease" v-if="Utils.btnAuthority('CRM_CUSTOMER_BATCH_RELEASE')" size="small" type="primary" class="btn-button">批量释放</el-button>
          <el-button @click="batchDeletedFunc" :disabled="batchDel" v-if="Utils.btnAuthority('CRM_CUSTOMER_BATCH_DEL')" size="small" type="primary" class="btn-button">批量删除</el-button>
          <el-button @click="addFunc" v-if="Utils.btnAuthority('CRM_CUSTOMER_ADD')" size="small" type="primary" class="btn-button">新增</el-button>
        </template>
        <!-- 表格插件 -->
        <tableTemplate v-loading="isGetList" ref="table" :thead-data="theadData" :table-data="tableData" @listenMultiEvent="setMultipleSelection" :selection="true" :checkbox="true"></tableTemplate>
        <!-- 分页插件 -->
        <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
      </Card>
    </div>

    <!-- 删除 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt">
      <template v-slot:content>
        <template v-if="batch">
          <p>共计{{ batchTotal }}条</p>
        </template>
      </template>
    </commonDialogTemplate>

    <!-- 领用 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getReceiveDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="receiveVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt">
      <template v-slot:content>
        <template v-if="batch">
          <p>共计{{ batchTotal }}条</p>
        </template>
      </template>
    </commonDialogTemplate>

    <!-- 转让 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getTransferDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="transferVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt">
      <template v-slot:content>
        <template v-if="batch">
          <p>共计{{ batchTotal }}条</p>
        </template>
      </template>
    </commonDialogTemplate>

    <!-- 释放 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getReleaseDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="releaseVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt">
      <template v-slot:content>
        <template v-if="batch">
          <p v-if="batchReleaseVisible">共计{{ batchTotal }}条到</p>
          <el-select v-model="departmentCode" placeholder="请选择" class="liberum">
            <el-option v-for="item in LiberumOptions" :key="item.value" :label="item.poolDesc" :value="item.poolType"></el-option>
          </el-select>
        </template>
      </template>
    </commonDialogTemplate>

    <!-- 客户类型 -->
    <clientTypeModal :show.sync="clientTypeModalVisible"></clientTypeModal>

    <!-- 共享 -->
    <shareComponent :show.sync="searchUserVisible" v-if="searchUserVisible" :shareId="shareId" :dataType="'CUSTOMER'"></shareComponent>

    <!-- 查询用户 -->
    <belongerModal :show.sync="belongerVisible" :lockingStatus="lockingStatus" v-if="belongerVisible" @listenEvent="setBelongerTableRow"></belongerModal>
  </div>
</template>
<script type="text/javascript">
import shareComponent from "@/components/UX/shareComponent";
import belongerModal from "@/components/UX/belongerComponent";
import clientTypeModal from "./components/clientTypeModal";
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/consumerService";
import { Utils } from "@/utils";
import { mapGetters } from "vuex";
export default {
  mixins: [listMixin],
  components: {
    shareComponent,
    clientTypeModal,
    belongerModal
  },
  data() {
    let self = this;
    return {
      Utils: Utils,
      belongerVisible: false,
      lockingStatus: "00",// crm内部是否有效 00 -有效， 01-无效 
      searchUserVisible: false,
      shareId: null,
      clientTypeModalVisible: false,
      deleteVisible: false, //删除
      receiveVisible: false, //领用
      transferVisible: false, //转让
      batchTransferBtn: false, //是否点击批量转让
      releaseVisible: false, //释放
      batchReleaseVisible: false, //是否点击的是批量释放按钮
      batch: false, //批量
      batchTotal: 0,
      shareValue: {},
      SelectionOptions,
      consumerType: [{ key: "OWNER", label: "我的客户" }], //客户筛选
      LiberumOptions: [], //公海部门
      departmentCode: null, //部门code
      theadData: [
        { checked: true, key: "name", val: "客户名称" },
        {
          checked: true,
          key: "customerType",
          val: "客户类型",
          isFormat: true,
          formatFn: (item, row) => {
            return row.customerType == "ENTERPRISE" ? "企业客户" : "个人客户";
          }
        },
        { checked: true, key: "certificateId", val: "证件号" },
        { checked: true, key: "ownerUserName", val: "拥有人" },
        {
          checked: true,
          key: "createTime",
          val: "创建日期",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.createTime, 2);
          }
        },
        {
          checked: true,
          key: "updateTime",
          val: "最近修改日期",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.updateTime, 2);
          }
        },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: true, //是否对操作按钮权限做效验，true开启
          btnItems: this.setBtnItems(),
          width: "200px"
        }
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      ],
      serachParm: {
        //查询参数
        type: "OWNER", //部门编码
        customerType: null, //客户类型
        channelFlag: null, //是否渠道客户
        ownerName: null, //拥有人
        name: null, //客户名称
        createTimeBegin: null,
        createTimeEnd: null,
        updateTimeBegin: null,
        updateTimeEnd: null
      },
      rules: {
        name: [{ min: 0, max: 50, message: "请输入0至50位", trigger: "blur" }],
        ownerName: [
          { min: 0, max: 50, message: "请输入0至50位", trigger: "blur" }
        ]
      },
      dateTypeString: "yyyy-MM-dd", //时间格式
      createStartPickerOptions: {
        disabledDate(time) {
          let createTimeEnd = self.serachParm.createTimeEnd || "";
          if (createTimeEnd) {
            let sdTime = new Date(createTimeEnd).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      createEndPickerOptions: {
        disabledDate(time) {
          let startDate = self.serachParm.createTimeBegin || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() + 24 * 3600 * 1000 < sdTime;
          }
        }
      },
      updateStartPickerOptions: {
        disabledDate(time) {
          let updateTimeEnd = self.serachParm.updateTimeEnd || "";
          if (updateTimeEnd) {
            let sdTime = new Date(updateTimeEnd).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      updateEndPickerOptions: {
        disabledDate(time) {
          let startDate = self.serachParm.updateTimeBegin || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() + 24 * 3600 * 1000 < sdTime;
          }
        }
      },
      role: null,
      delKeyword: "客户",
      multipleSelection: [],
      userDetail: null,
      dictTable: null, //字典表
      getListUrl: "/glp-crm/customer/dataAccessListPage", //列表数据地址
      detailPath: "/consumer/index/detail", //详情页路由地址
      addPath: "/consumer/index/add", //新增页路由地址
      editPath: "/consumer/index/edit" //修改页路由地址
    };
  },
  watch: {
    eleDateNew: {
      handler: function (nowVal, oldVal) {
        var $this = this;
        for (let i in nowVal) {
          if (nowVal[i] != oldVal[i]) {
            $this.isUserBatchBtn = true;
            break;
          } else {
            $this.isUserBatchBtn = false;
          }
        }
        console.log($this.isUserBatchBtn, '$this.isUserBatchBtn')
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["roles"]),
    eleDateNew() {
      return JSON.parse(JSON.stringify(this.serachParm))
    },
    batchPick: {//批量领用
      get() {
        // 全司公海：管理员-领、转，其他-领。
        // 部门公海：管理员和部门leader-领、转，其他-领。
        // 部门全部：全部角色-领、转、放。
        // 我的：全部角色-转、放
        let type = this.serachParm.type || "";
        let roleCode = this.role.code;
        let multiLengthBool = this.multipleSelection.length > 0;
        if (type == "OWNER" || type == "COMPANY_ALL" || type == "") {
          return true;
        } else {
          if (this.isUserBatchBtn) {
            return true
          } else {
            return multiLengthBool ? false : true;
          }
        }
      },
      set() { }
    },
    batchTransfer: {//批量转让
      get() {
        let type = this.serachParm.type || "";
        let roleCode = this.role.code;
        let multiLengthBool = this.multipleSelection.length > 0;
        if (type == "COMPANY_POOL") {
          if (roleCode == "CRM_ADMIN") {
            // return multiLengthBool ? false : true;
            if (this.isUserBatchBtn) {
              return true
            } else {
              return multiLengthBool ? false : true;
            }
          } else {
            return true;
          }
        } else if (type != "COMPANY_POOL" && type.indexOf("POOL") != -1) {
          if (roleCode == "CRM_ADMIN" || roleCode == "CRM_LEADER" || roleCode == "CRM_BD_LEADER") {
            // return multiLengthBool ? false : true;
            if (this.isUserBatchBtn) {
              return true
            } else {
              return multiLengthBool ? false : true;
            }
          } else {
            return true;
          }
        } else if (type != "COMPANY_ALL" && type.indexOf("ALL") != -1) {
          // return multiLengthBool ? false : true;
          if (this.isUserBatchBtn) {
            return true
          } else {
            return multiLengthBool ? false : true;
          }
        } else if (type == "OWNER") {
          // return multiLengthBool ? false : true;
          if (this.isUserBatchBtn) {
            return true
          } else {
            return multiLengthBool ? false : true;
          }
        } else {
          return true;
        }

      },
      set() { }
    },
    batchRelease: {//批量释放
      get() {
        let type = this.serachParm.type || "";
        let roleCode = this.role.code;
        let multiLengthBool = this.multipleSelection.length > 0;
        if (type != "COMPANY_ALL" && type.indexOf("ALL") != -1) {
          // return multiLengthBool ? false : true;
          if (this.isUserBatchBtn) {
            return true
          } else {
            return multiLengthBool ? false : true;
          }
        } else if (type == "OWNER") {
          // return multiLengthBool ? false : true;
          if (this.isUserBatchBtn) {
            return true
          } else {
            return multiLengthBool ? false : true;
          }
        } else {
          return true;
        }
      },
      set() { }
    },
    batchDel: {
      get() {
        let type = this.serachParm.type || "";
        let roleCode = this.role.code;
        let multiLengthBool = this.multipleSelection.length > 0;
        if (!type) {
          return true;
        } else {
          if (roleCode == "CRM_ADMIN") {
            if (this.isUserBatchBtn) {
              return true;
            } else {
              return multiLengthBool ? false : true;
            }
          } else {
            return true;
          }
        }
      },
      set() { }
    }
  },
  created() {
    try {
      let serachParm = JSON.parse(localStorage.getItem("serachParm"));
      if (serachParm) {
        this.serachParm = serachParm;
      }
      this.getConsumerType();
      this.getList();
      this.role = this.roles[0];//获取角色
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));

    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    setBtnItems(row) {
      //设置有权限的按钮
      let items = [];
      items.push({
        name: "查看",
        type: "text",
        func: this.detailFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CUSTOMER_QUERY") && Utils.permissionsButtonFunc(row, "CRM_CUSTOMER_QUERY");
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CUSTOMER_EDIT") && Utils.permissionsButtonFunc(row, "CRM_CUSTOMER_EDIT");
        }
      });

      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CUSTOMER_DEL") && Utils.permissionsButtonFunc(row, "CRM_CUSTOMER_DEL");
        }
      });
      items.push({
        name: "转让",
        type: "text",
        func: this.transferFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CUSTOMER_TRANSFER") && Utils.permissionsButtonFunc(row, "CRM_CUSTOMER_TRANSFER");
        }
      });
      items.push({
        name: "领用",
        type: "text",
        func: this.receiveFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CUSTOMER_PICK") && Utils.permissionsButtonFunc(row, "CRM_CUSTOMER_PICK");
        }
      });
      items.push({
        name: "释放",
        type: "text",
        func: this.releaseFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CUSTOMER_RELEASE") && Utils.permissionsButtonFunc(row, "CRM_CUSTOMER_RELEASE");
        }
      });
      items.push({
        name: "共享",
        type: "text",
        func: this.shareFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CUSTOMER_SHARE") && Utils.permissionsButtonFunc(row, "CRM_CUSTOMER_SHARE");
        }
      });
      return items;
    },
    permissionsButtonFunc(row, currBtnType) {
      try {
        let current = null;
        let buttonList = row.buttonList;
        buttonList.map(function (item, index, array) {
          if (item.buttonType == currBtnType) {
            current = item;
          }
        });
        return (current && current.enable) || false;
      } catch (e) {
        console.log(e);
      }
    },
    createTimeEndChange() {
      this.serachParm = {
        ...this.serachParm,
        createTimeEnd: `${this.serachParm.createTimeEnd}T23:59:59`
      };
    },
    updateTimeEndChange() {
      this.serachParm = {
        ...this.serachParm,
        updateTimeEnd: `${this.serachParm.updateTimeEnd}T23:59:59`
      };
    },
    getConsumerType() {
      DataApi.getConsumerType().then(res => {
        if (res.code == 200) {
          const { data } = res;
          this.consumerType = [];
          Object.entries(data).forEach((k, v) => {
            let obj = { label: k[1].desc, key: k[1].value };
            this.consumerType.push(obj);
          });
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    batchReceiveFunc(row) {
      this.receiveVisible = true;
      this.batch = true;
      this.dialogTxt = "确认批量领用选中客户？";
      this.batchTotal = this.multipleSelection.length;
    },
    batchTransferFunc() {
      this.belongerVisible = true;
      this.batchTransferBtn = true;
    },
    batchReleaseFunc() {
      this.departmentCode = null;
      this.batchReleaseVisible = true;
      this.releaseVisible = true;
      this.batch = true;
      this.dialogTxt = "确认批量释放选中客户？";
      this.batchTotal = this.multipleSelection.length;
      this.getLiberumByCurrentUser();
    },
    releaseFunc(row) {
      this.departmentCode = null;
      this.releaseVisible = true;
      this.batchReleaseVisible = false;
      this.batch = true;
      this.rowItem = row;
      this.dialogTxt = `确定释放选中客户？ <p>${row.name} 到</p>`;
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
        let params;
        let message = "批量释放成功！";
        if (!this.departmentCode) {
          this.$message({ type: "warning", message: "请选择公海" });
          return true;
        }
        this.releaseVisible = false;
        if (this.batchReleaseVisible) {
          this.batch = false;
          params = {
            customerIds: [...this.multipleSelection],
            departmentCode: this.departmentCode
          };
        } else {
          params = {
            customerIds: [this.rowItem.id],
            departmentCode: this.departmentCode
          };
          message = "释放成功！";
        }
        DataApi.batchReleaseConsumer(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.onRefresh();
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
    receiveFunc(row) {
      this.receiveVisible = true;
      this.batch = false;
      this.rowItem = row;
      this.dialogTxt = `确认领用选中客户？<p>${row.name}</p>`;
    },
    addFunc() {
      this.clientTypeModalVisible = true;
    },

    shareFunc(row) {
      this.searchUserVisible = true;
      this.shareId = row.id;
    },
    submitSearch() {
      localStorage.setItem("serachParm", JSON.stringify(this.serachParm));
      this.toSearch();
      // let createTimeBegin = this.serachParm.createTimeBegin;
      // let createTimeEnd = this.serachParm.createTimeEnd;
      // let updateTimeBegin = this.serachParm.updateTimeBegin;
      // let updateTimeEnd = this.serachParm.updateTimeEnd;
      // if (
      //   (createTimeBegin && createTimeEnd) ||
      //   (updateTimeBegin && updateTimeEnd)
      // ) {
      //   if (createTimeBegin > createTimeEnd) {
      //     this.$message({
      //       type: "warning",
      //       message: "开始日期必须小于结束日期"
      //     });
      //     return true;
      //   }
      //   if (updateTimeBegin > updateTimeEnd) {
      //     this.$message({
      //       type: "warning",
      //       message: "开始日期必须小于结束日期"
      //     });
      //     return true;
      //   }
      //   this.toSearch();
      // } else {
      //   this.toSearch();
      // }
    },
    setMultipleSelection(val) {
      this.multipleSelection = val && val.map(item => item.id);
    },
    setShareValue(data) {
      this.shareValue = data;
      console.log(this.shareValue, "shareValue");
    },
    deleteFunc(item) {
      this.deleteVisible = true;
      this.batch = false;
      this.dialogTxt = `确认删除选中客户？<p>${item.name}</p>`;
      this.rowItem = item;
    },
    batchDeletedFunc(row) {
      this.deleteVisible = true;
      this.batch = true;
      this.dialogTxt = "确认批量删除选中数据？";
      this.rowItem = row;
      this.batchTotal = this.multipleSelection.length;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let params;
        let message = "批量删除成功！";
        if (this.batch) {
          this.batch = false;
          params = this.multipleSelection;
        } else {
          params = [this.rowItem.id];
          message = "删除成功！";
        }
        DataApi.deleteConsumerById(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.onRefresh();
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
    getReceiveDelItem(data) {
      if (data.type == true) {
        this.receiveVisible = false;
        let params = [];
        let message = "批量领用成功！";
        if (this.batch) {
          this.batch = false;
          params = this.multipleSelection;
        } else {
          params = [this.rowItem.id];
          message = "领用成功！";
        }
        DataApi.batchReceiveConsumer(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.onRefresh();
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
    transferFunc(row) {
      this.belongerVisible = true;
      this.batchTransferBtn = false;
      this.rowItem = row;
    },
    setBelongerTableRow(data) {
      this.userDetail = data;
      this.transferVisible = true;
      if (this.batchTransferBtn) {
        this.batch = true;
        this.dialogTxt = "确认批量转让选中客户？";
        this.batchTotal = this.multipleSelection.length;
      } else {
        this.batch = false;
        this.dialogTxt = `确认转让选中客户？<p>${data.userName}</p>`;
      }
    },
    getTransferDelItem(data) {
      if (data.type == true) {
        let params;
        let message = "批量转让成功！";
        this.transferVisible = false;
        this.belongerVisible = false;
        this.batchTransferBtn = false;
        if (this.batch) {
          this.batch = false;
          params = {
            customerIds: this.multipleSelection,
            toUserNo: this.userDetail.userNo
          };
        } else {
          message = "转让成功！";
          params = {
            customerIds: [this.rowItem.id],
            toUserNo: this.userDetail.userNo
          };
        }
        DataApi.batchTransferConsumer(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.onRefresh();
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
        this.batchTransferBtn = false;
      }
    },
    editFunc(item) {
      this.$router.push({
        path: this.editPath,
        query: {
          currConsumerId: item.id,
          currConsumerType: item.customerType,
          flag: "edit"
        }
      });
    },
    detailFunc(item) {
      this.$router.push({
        path: this.detailPath,
        query: {
          currConsumerId: item.id,
          currConsumerType: item.customerType,
          currConsumerName: item.name
        }
      });
    },
    clearData(formName) {
      //重置
      this.$refs[formName].resetFields();
      localStorage.removeItem("serachParm");
      this.serachParm = {
        //查询参数
        type: "OWNER", //部门编码
        customerType: null, //客户类型
        channelFlag: null, //是否渠道客户
        ownerName: null, //拥有人
        name: null, //客户名称
        createTimeBegin: null,
        createTimeEnd: null,
        updateTimeBegin: null,
        updateTimeEnd: null
      };
    },
    onRefresh() {
      this.pageInfo.page = 1;
      this.getList();
    }
  }
};
</script>

<style lang="scss">
.search-section {
  .form-section {
  }

  .form-item-div {
    margin-bottom: 20px;
  }

  .search-btn-item {
    margin-bottom: 0px;
  }
}
.consumer {
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
  .form-item-date {
    .el-date-editor--date {
      width: 150px;
      .el-input__inner {
        width: 150px;
      }
    }
  }
}
</style>