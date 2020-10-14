<template>
  <div class="content market">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section" ref="searchForm" :model="serachParm" :inline="true" size="small" label-width="100px">
          <el-row class :gutter="20">
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item :span="12" label="活动筛选" prop="chooseFlag">
                <el-select v-model="serachParm.chooseFlag" clearable placeholder="全部活动">
                  <el-option v-for="(item,index) in SelectionOptions.ActivityScreening" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item :span="12" label="活动类型" prop="type">
                <el-select v-model="serachParm.type" clearable placeholder="全部类型">
                  <el-option v-for="(item,index) in dictTable.MARKET_ACTIVITY_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div form-item-date margin-r-0" label="活动日期" prop="startDate">
                <el-date-picker :picker-options="startPickerOptions" type="date" placeholder="选择开始日期" :value-format="dateTypeString" v-model="serachParm.startDate" class="form-input"></el-date-picker>
                <span>至</span>
              </el-form-item>
              <el-form-item class="form-item-div form-item-date" prop="endDate">
                <el-date-picker :picker-options="endPickerOptions" type="date" placeholder="选择结束日期" :value-format="dateTypeString" v-model="serachParm.endDate" @change="endDateChange" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="0">
            <el-col :span="24" align="center">
              <el-button type="primary" @click="submitSearch" size="small" class="btn-twofont">查询</el-button>
              <el-button @click="clearData('searchForm')" class="btn-twofont" size="small">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </Card>
    </div>

    <div class="section table-section">
      <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'市场活动列表'">
        <template v-slot:btns>
          <el-button @click="toDelete" size="small" type="primary" :disabled="multiBool" v-if="Utils.btnAuthority('CRM_MARKET_BATCH_DEL')" class="btn-button">批量删除</el-button>
          <el-button @click="addFunc" size="small" v-if="Utils.btnAuthority('CRM_MARKET_ADD')" type="primary" class="btn-button">新增</el-button>
        </template>
        <!-- 表格插件 -->
        <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" @listenMultiEvent="setMultipleSelection" :selection="true" :checkbox="true"></tableTemplate>
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

    <!-- 共享 -->
    <shareComponent :show.sync="searchUserVisible" :shareId="shareId" :dataType="'MARKET'" v-if="searchUserVisible"></shareComponent>
  </div>
</template>
<script type="text/javascript">
import shareComponent from "@/components/UX/shareComponent";
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/marketService";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  components: {
    shareComponent
  },
  data() {
    let self = this;
    return {
      Utils: Utils,
      searchUserVisible: false,
      batchDeleteVisible: false,
      shareValue: {},
      shareId: null,
      SelectionOptions,
      deleteVisible: false,
      batch: false, //批量
      batchTotal: 0, //批量条数
      isSearch: false,//true查询成功
      theadData: [
        { checked: true, key: "name", val: "活动名称" },
        {
          checked: true,
          key: "type",
          val: "活动类型",
          isFormat: true,
          formatFn: (item, row) => {
            try {
              let current = null;
              let MARKET_ACTIVITY_TYPE = Utils.dictTable("MARKET_ACTIVITY_TYPE");
              MARKET_ACTIVITY_TYPE.map(function (item, index, array) {
                if (item.key == row.type) {
                  current = item;
                }
              });
              return (current && current.label) || "-";
            } catch (e) {
              console.log(e);
            }
          }
        },
        {
          checked: true,
          key: "plan",
          val: "营销方案",
          isFormat: true,
          formatFn: (item, row) => {
            try {
              let current = null;
              let MARKET_ACTIVITY_PLAN = Utils.dictTable("MARKET_ACTIVITY_PLAN");
              MARKET_ACTIVITY_PLAN.map(function (item, index, array) {
                if (item.key == row.plan) {
                  current = item;
                }
              });
              return (current && current.label) || "-";
            } catch (e) {
              console.log(e);
            }
          }
        },
        { checked: true, key: "ownerUserName", val: "拥有人" },
        {
          checked: true,
          key: "startDate",
          val: "开始日期",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.startDate, 1);
          }
        },
        {
          checked: true,
          key: "endDate",
          val: "结束日期",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.endDate, 1);
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
        chooseFlag: 1,
        type: null,
        startDate: null,
        endDate: null
      },
      dateTypeString: "yyyy-MM-dd", //时间格式
      startPickerOptions: {
        disabledDate(time) {
          let endDate = self.serachParm.endDate || "";
          if (endDate) {
            let sdTime = new Date(endDate).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          let startDate = self.serachParm.startDate || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() + 24 * 3600 * 1000 < sdTime;
          }
        }
      },
      delKeyword: "活动",
      dictTable: null, //字典表
      multipleSelection: [],
      getListUrl: "/glp-crm/activity/queryList", //列表数据地址
      delListUrl: "/glp-crm/activity/deleteByIds", //批量删除数据地址
      detailPath: "/market/index/detail", //详情页路由地址
      addPath: "/market/index/add", //新增页路由地址
      editPath: "/market/index/edit" //修改页路由地址
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
    eleDateNew() {
      return JSON.parse(JSON.stringify(this.serachParm))
    },
    multiBool: {
      get() {
        if (this.isUserBatchBtn) {
          return true
        } else {
          return this.multipleSelection.length == 0
        }
      },
      set() { }
    }
  },
  created() {
    try {
      let serachParm = JSON.parse(localStorage.getItem("serachParm"));
      if (serachParm) {
        this.serachParm = Object.assign({}, serachParm);
      }
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
      this.getList();

    } catch (e) {
      console.log(e)
    }
  },
  mounted() {

  },
  methods: {
    setBtnItems() {
      let items = [];
      items.push({
        name: "查看",
        type: "text",
        func: this.detailFunc,
        checkFunc: row => {
          return (Utils.btnAuthority("CRM_MARKET_QUERY") && Utils.permissionsButtonFunc(row, "CRM_MARKET_QUERY"));
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          return (Utils.btnAuthority("CRM_MARKET_EDIT") && Utils.permissionsButtonFunc(row, "CRM_MARKET_EDIT"));
        }
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return (Utils.btnAuthority("CRM_MARKET_DEL") && Utils.permissionsButtonFunc(row, "CRM_MARKET_DEL"));
        }
      });
      items.push({
        name: "共享",
        type: "text",
        func: this.shareFunc,
        checkFunc: row => {
          return (Utils.btnAuthority("CRM_MARKET_SHARE") && Utils.permissionsButtonFunc(row, "CRM_MARKET_SHARE"));
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
    endDateChange() {
      this.serachParm = {
        ...this.serachParm,
        endDate: `${this.serachParm.endDate}T23:59:59`
      };
    },
    shareFunc(row) {
      this.searchUserVisible = true;
      this.shareId = row.id;
    },
    submitSearch() {
      localStorage.setItem("serachParm", JSON.stringify(this.serachParm));
      this.pageInfo.page = 1;
      this.pageInfo.total = 0;
      this.getList();
    },
    clearData(formName) {
      //重置
      this.$refs[formName].resetFields();
      localStorage.removeItem("serachParm");
      this.serachParm = {
        chooseFlag: 1,
        type: null,
        startDate: null,
        endDate: null
      };
    },
    setMultipleSelection(val) {
      this.multipleSelection = val && val.map(item => item.id);
    },
    toDelete() {
      this.deleteVisible = true;
      this.batch = true;
      this.dialogTxt = "确认批量删除选中数据？";
      this.batchTotal = this.multipleSelection.length;
    },
    deleteFunc(row) {
      this.deleteVisible = true;
      this.dialogTxt = `确认删除选中活动：<p>${row.name}</p>`;
      this.rowItem = row;
    },
    getDelItem(data) {
      //删除事件
      if (data.type == true) {
        this.deleteVisible = false;
        let params;
        let message = "批量删除成功！";
        if (this.batch) {
          this.batch = false;
          params = { ids: this.multipleSelection };
        } else {
          params = { ids: [this.rowItem.id] };
          message = "删除成功！";
        }
        DataApi.deleteMarket(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.pageInfo.page = 1;
            this.getList();
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
    getList() {
      let chooseFlag = this.serachParm.chooseFlag ? this.serachParm.chooseFlag : 0;
      let params = {
        ...this.serachParm,
        chooseFlag: chooseFlag,
        page: this.pageInfo.page,
        size: this.pageInfo.size
      };
      DataApi.queryMarket(params).then(
        res => {
          if (res.code == 200) {
            let ndata = res.data || {};
            this.tableData = ndata.items || [];
            this.pageInfo.total = ndata.totalNum || 0;
            this.isUserBatchBtn = false;
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        }
      );
    },
    addFunc() {
      //新增列表
      this.$router.push({
        path: this.addPath,
        query: {
          flag: "add"
        }
      });
    },
    editFunc(item) {
      this.$router.push({
        path: this.editPath,
        query: {
          activityId: item.id,
          flag: "edit"
        }
      });
    },
    detailFunc(item) {
      this.$router.push({
        path: this.detailPath,
        query: {
          activityId: item.id,
          flag: "detail"
        }
      });
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