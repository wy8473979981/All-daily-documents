<template>
  <div class="content todoApproval">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section" ref="searchForm" :model="serachParm" :inline="true" size="small" label-width="100px">
          <el-row class="row-item" :gutter="20">
            <!-- <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="审批筛选" prop="approveType">
                <el-select v-model="serachParm.approveType" placeholder="" @change="approveTypeChange">
                  <el-option v-for="(item,index) in SelectionOptions.APPROVAL_SCREEN" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="业务类型" prop="businessType">
                <el-select v-model="serachParm.businessType" clearable placeholder="全部类型">
                  <el-option v-for="(item,index) in businessType" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="审批状态" prop="approvalStatus">
                <el-select v-model="serachParm.approvalStatus" clearable placeholder="全部状态">
                  <el-option v-for="(item,index) in dictTable.APPROVAL_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="提交人" prop="userName">
                <el-input class="form-item" v-model.trim="serachParm.userName" clearable placeholder="请输入提交人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div form-item-date margin-r-0" label="提交日期" prop="createTimeStart">
                <el-date-picker :picker-options="createTimeStartPickerOptions" type="date" placeholder="选择开始日期" @change="createTimeStartChange" :value-format="dateTypeString" v-model="serachParm.createTimeStart" class="form-input"></el-date-picker>
                <span>至</span>
              </el-form-item>
              <el-form-item class="form-item-div form-item-date" prop="createTimeEnd">
                <el-date-picker :picker-options="createTimeEndPickerOptions" type="date" placeholder="选择结束日期" @change="createTimeEndChange" :value-format="dateTypeString" v-model="serachParm.createTimeEnd" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div form-item-date margin-r-0" label="审批完成日期" prop="endTimeStart">
                <el-date-picker :picker-options="endTimeStartPickerOptions" type="date" placeholder="选择开始日期" @change="endTimeStartChange" :value-format="dateTypeString" v-model="serachParm.endTimeStart" class="form-input"></el-date-picker>
                <span>至</span>
              </el-form-item>
              <el-form-item class="form-item-div form-item-date" prop="endTimeEnd">
                <el-date-picker :picker-options="endTimeEndPickerOptions" type="date" placeholder="选择结束日期" @change="endTimeEndChange" :value-format="dateTypeString" v-model="serachParm.endTimeEnd" class="form-input"></el-date-picker>
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
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="我的待办" name="TODO"></el-tab-pane>
      <el-tab-pane label="我的已办" name="DONE"></el-tab-pane>
    </el-tabs>
    <div class="section table-section">
      <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'业务审批列表'">
        <!-- 表格插件 -->
        <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" :selection="false" :checkbox="false"></tableTemplate>
        <!-- 分页插件 -->
        <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
      </Card>
    </div>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/todoApproval";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  data() {
    let self = this;
    return {
      Utils: Utils,
      activeName: 'TODO',//默认我的待办
      SelectionOptions,
      dictTable: null, //字典表
      businessType: [],
      theadData: [
        {
          checked: true,
          key: "orderTitle",
          val: "业务类型"
        },
        {
          checked: true, key: "orderStatus", val: "审批状态",
          isFormat: true,
          formatFn: (item, row) => {
            let current = null;
            let APPROVAL_STATUS = Utils.dictTable("APPROVAL_STATUS");
            APPROVAL_STATUS.map(function (item, index, array) {
              if (item.key == row.orderStatus) {
                current = item;
              }
            });
            return (current && current.label) || "-";
          }
        },
        { checked: true, key: "createUser", val: "提交人" },
        { checked: true, key: "createTime", val: "提交时间" },
        {
          checked: true, key: "updateTime", val: "审批完成时间"
        },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: true, //是否对操作按钮权限做效验，true开启
          btnItems: this.setBtnItems(),
          width: "150px"
        }
      ],
      serachParm: {
        approveType: 'TODO', // 审批类型
        businessType: null, // 业务类型 
        approvalStatus: null, // 审批状态
        userName: null, // 提交人 
        createTimeStart: null, // 提交时间开始 yyyy-MM-dd
        createTimeEnd: null, // 提交时间结束 yyyy-MM-dd HH:mm:ss 
        endTimeStart: null, //审批完成日期开始 yyyy-MM-dd HH:mm:ss 
        endTimeEnd: null, //审批完成日期结束 yyyy-MM-dd HH:mm:ss 
      },
      dateTypeString: "yyyy-MM-dd", //时间格式
      createTimeStartPickerOptions: {
        disabledDate(time) {
          let endDate = self.serachParm.createTimeEnd || "";
          if (endDate) {
            let sdTime = new Date(endDate).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      createTimeEndPickerOptions: {
        disabledDate(time) {
          let startDate = self.serachParm.createTimeStart || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() < sdTime;
          }
        }
      },
      endTimeStartPickerOptions: {
        disabledDate(time) {
          let endDate = self.serachParm.endTimeEnd || "";
          if (endDate) {
            let sdTime = new Date(endDate).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      endTimeEndPickerOptions: {
        disabledDate(time) {
          let startDate = self.serachParm.endTimeStart || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() < sdTime;
          }
        }
      },
      getListUrl: "/glp-crm/process/workflow/approveList", //列表数据地址
      detailPath: "/todoApproval/index/detail", //详情页路由地址
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
      },
      deep: true
    }
  },
  computed: {
    eleDateNew() {
      return JSON.parse(JSON.stringify(this.serachParm))
    },
  },
  components: {},
  created() {
    try {
      let serachParm = JSON.parse(localStorage.getItem("serachParm"));
      if (serachParm) {
        this.serachParm = Object.assign({}, serachParm);
        this.activeName = this.serachParm.approveType;
      }
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
      this.templateCodeList();
      this.getList();

    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    setBtnItems() {
      let items = [];
      items.push({
        name: "查看",
        type: "text",
        func: this.detailFunc,
        checkFunc: row => {
          return true;
        }
      });
      return items;
    },
    //tab切换
    handleTabClick(tab, event) {
      let status = tab.name
      switch (status) {
        case "TODO":
          this.serachParm.approveType = 'TODO'
          break;
        case "DONE":
          this.serachParm.approveType = 'DONE'
          break;
        default:
          this.serachParm.approveType = "TODO"
      }
      localStorage.setItem("serachParm", JSON.stringify(this.serachParm));
      this.onRefresh();
    },
    approveTypeChange() {
      localStorage.setItem("serachParm", JSON.stringify(this.serachParm));
      this.onRefresh();
    },
    templateCodeList() {
      DataApi.templateCodeList().then(res => {
        if (res.code == 200) {
          let { data } = res;
          this.businessType = [];
          data && data.map((item) => {
            let obj = { label: item.desc, key: item.code };
            this.businessType.push(obj);
          })
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    createTimeStartChange() {
      this.serachParm = {
        ...this.serachParm,
        createTimeStart: `${this.serachParm.createTimeStart}T00:00:00`
      };
    },
    createTimeEndChange() {
      this.serachParm = {
        ...this.serachParm,
        createTimeEnd: `${this.serachParm.createTimeEnd}T23:59:59`
      };
    },
    endTimeStartChange() {
      this.serachParm = {
        ...this.serachParm,
        endTimeStart: `${this.serachParm.endTimeStart}T00:00:00`
      };
    },
    endTimeEndChange() {
      this.serachParm = {
        ...this.serachParm,
        endTimeEnd: `${this.serachParm.endTimeEnd}T23:59:59`
      };
    },
    submitSearch() {
      localStorage.setItem("serachParm", JSON.stringify(this.serachParm));
      this.onRefresh();
    },
    clearData(formName) {
      //重置
      this.$refs[formName].resetFields();
      localStorage.removeItem("serachParm");
      this.serachParm = {
        approveType: 'TODO', // 审批类型
        businessType: null, // 业务类型 
        approvalStatus: null, // 审批状态
        userName: null, // 提交人 
        createTimeStart: null, // 提交时间开始 yyyy-MM-dd
        createTimeEnd: null, // 提交时间结束 yyyy-MM-dd HH:mm:ss 
        endTimeStart: null, //审批完成日期开始 yyyy-MM-dd HH:mm:ss 
        endTimeEnd: null, //审批完成日期结束 yyyy-MM-dd HH:mm:ss 
      };
    },
    detailFunc(item) {
      this.$router.push({
        path: this.detailPath,
        query: { flag: "edit", processId: item.processId, taskId: item.taskId, approveType: this.serachParm.approveType }
      });
    },
    getList() {                                     //获取列表数据
      let params = {
        ...this.serachParm,
        page: this.pageInfo.page,
        size: this.pageInfo.size
      }
      DataApi.post(this.getListUrl, params).then(
        res => {
          if (res.code == 200) {
            let ndata = res.data || {};
            let tableData = [];
            ndata.items && ndata.items.map((item) => {
              let obj = {
                ...item,
                updateTime: this.serachParm.approveType == "TODO" ? '-' : item.updateTime
              }
              tableData.push(obj);
            })
            this.pageInfo.total = ndata.totalNum || 0;
            this.isUserBatchBtn = false;
            this.tableData = tableData;
          } else {
            this.isUserBatchBtn = true;
            this.$message({ type: 'warning', message: res.message ? res.message : '系统异常请联系管理员！' })
          }
        }
      )
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
.todoApproval {
  // tab
  .el-tabs__item {
    font-weight: normal;
    color: #888;
    height: 48px;
    line-height: 48px;
  }
  .el-tabs__item.is-active {
    font-weight: bold;
    font-size: 14px;
    color: #359c67;
  }
  .el-tabs__content {
    margin-top: 10px;
  }
  .el-tabs__nav-scroll {
    overflow: hidden;
    background: #ffffff;
    -webkit-box-shadow: 1px 0px 4px 1px rgba(171, 172, 174, 0.18);
    box-shadow: 1px 0px 4px 1px rgba(171, 172, 174, 0.18);
    border-radius: 4px;
    padding-left: 17px;
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