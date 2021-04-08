<template>
  <div class="content activityStatistics">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section" ref="searchForm" :model="serachParm" :inline="true" size="small" label-width="100px">
          <el-row class="row-item" :gutter="20">
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item :span="12" label="活动类型" prop="type">
                <el-select v-model="serachParm.type" clearable placeholder="请选择活动类型">
                  <el-option v-for="(item,index) in dictTable.MARKET_ACTIVITY_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="活动名称" prop="name">
                <el-input class="form-item" v-model="serachParm.name" placeholder="请输入活动名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="渠道名称" prop="activityChannelName">
                <el-input class="form-item" v-model="serachParm.activityChannelName" placeholder="请输入渠道名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div form-item-date margin-r-0" label="活动日期" prop="startDate">
                <el-date-picker :picker-options="startPickerOptions" type="date" placeholder="选择开始日期" :value-format="dateTypeString" v-model="serachParm.startDate" class="form-input"></el-date-picker>
                <span>至</span>
              </el-form-item>
              <el-form-item class="form-item-div form-item-date" prop="endDate">
                <el-date-picker :picker-options="endPickerOptions" type="date" @change="endDateChange" placeholder="选择结束日期" :value-format="dateTypeString" v-model="serachParm.endDate" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="" :gutter="20">
            <el-col :span="24" align="center">
              <el-button type="primary" @click="submitSearch" size="small" class="btn-twofont">查询</el-button>
              <el-button @click="clearData('searchForm')" class="btn-twofont" size="small">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </Card>
    </div>

    <div class="section table-section">
      <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'活动统计列表'">
        <template v-slot:btns>
          <el-link :underline="false" class="export" :href="exportUrlFunc" v-if="Utils.btnAuthority('CRM_OPERATION_ACTIVITY_EXPORT')">
            <el-button size="small" type="primary" class="btn-button">导出数据</el-button>
          </el-link>
        </template>
        <!-- 表格插件 -->
        <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" :selection="false" :checkbox="false"></tableTemplate>
        <!-- 分页插件 -->
        <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
      </Card>
    </div>

    <!-- 删除插件 -->
    <commonDialogTemplate v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="dialogVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  data() {
    let self = this;
    return {
      Utils: Utils,
      SelectionOptions,
      dictTable: null, //字典表
      multipleSelection: [],
      theadData: [
        { checked: true, key: "activityName", val: "活动名称" },
        {
          checked: true,
          key: "type",
          val: "活动类型",
          isFormat: true,
          formatFn: (item, row) => {
            try {
              let current = null;
              let MARKET_ACTIVITY_TYPE = Utils.dictTable(
                "MARKET_ACTIVITY_TYPE"
              );
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
        { checked: true, key: "activityChannelName", val: "活动渠道" },
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
        { checked: true, key: "customerName", val: "客户名称" }
      ],
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
      exportUrl: null,
      serachParm: {
        type: null, //活动类型
        startDate: null, //开始日期
        endDate: null, //结束日期
        name: null, //活动名称
        activityChannelName: null //渠道名称
      },
      getListUrl: "/glp-crm/activity/queryDataStatistics" //列表数据地址
    };
  },
  computed: {
    exportUrlFunc: {
      get() {
        let origin = window.location.origin;

        let serachParm = this.serachParm;
        let param = "";
        for (let key in serachParm) {
          if (serachParm[key] || serachParm[key] == 0) {
            param += `${key}=${serachParm[key]}&`;
          }
        }

        if (param == "") {
          this.exportUrl = `${origin}/glp-crm/activity/export/activityExcel`;
        } else {
          param = param.substr(0, param.length - 1);
          this.exportUrl = `${origin}/glp-crm/activity/export/activityExcel?${param}`;
        }
        console.log(this.exportUrl)
        return this.exportUrl;
      },
      set() { }
    },
  },
  components: {},
  created() {
    try {
      let serachParm = JSON.parse(localStorage.getItem("serachParm"));
      if (serachParm) {
        this.serachParm = serachParm;
      }
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
      this.getList();

    } catch (e) {
      console.log(e)
    }

  },
  methods: {
    exportFunc() {

    },
    submitSearch() {
      localStorage.setItem("serachParm", JSON.stringify(this.serachParm));
      this.toSearch();
    },
    endDateChange() {
      this.serachParm = {
        ...this.serachParm,
        endDate: `${this.serachParm.endDate}T23:59:59`
      };
    },
    formatFn(item) {
      return item;
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
.activityStatistics {
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