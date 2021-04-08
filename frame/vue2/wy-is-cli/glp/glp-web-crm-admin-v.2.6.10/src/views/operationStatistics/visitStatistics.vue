<template>
  <div class="content visitStatistics">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section" ref="searchForm" :model="serachParm" :inline="true" size="small" label-width="100px">
          <el-row class="row-item" :gutter="20">
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item :span="12" label="拜访类型" prop="type">
                <el-select v-model="serachParm.type" clearable placeholder="请选择拜访类型">
                  <el-option v-for="(item,index) in dictTable.VISIT_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="是否首次拜访" prop="firstFlag">
                <el-select v-model="serachParm.firstFlag" clearable class="form-input" placeholder="请选择是否首次拜访">
                  <el-option v-for="(item,index) in SelectionOptions.optionYesOrNo" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="客户名称" prop="customerName">
                <el-input class="form-item" v-model="serachParm.customerName" placeholder="请输入客户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div form-item-date margin-r-0" label="拜访日期" prop="visitStartTime">
                <el-date-picker :picker-options="startPickerOptions" type="date" placeholder="选择开始日期" :value-format="dateTypeString" v-model="serachParm.visitStartTime" class="form-input"></el-date-picker>
                <span>至</span>
              </el-form-item>
              <el-form-item class="form-item-div form-item-date" prop="visitEndTime">
                <el-date-picker :picker-options="endPickerOptions" type="date" @change="visitEndTimeChange" placeholder="选择结束日期" :value-format="dateTypeString" v-model="serachParm.visitEndTime" class="form-input"></el-date-picker>
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
      <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'拜访统计列表'">
        <template v-slot:btns>
          <el-link :underline="false" class="export" :href="exportUrlFunc" v-if="Utils.btnAuthority('CRM_OPERATION_VISITE_EXPORT')">
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
import DataApi from "@/api/operationStatisticsService";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  data() {
    let self = this;
    return {
      Utils: Utils,
      SelectionOptions,
      multipleSelection: [],
      dictTable: null, //字典表
      theadData: [

        {
          checked: true,
          key: "type",
          val: "拜访类型",
          isFormat: true,
          formatFn: (item, row) => {
            let current = null;
            let VISIT_TYPE = Utils.dictTable("VISIT_TYPE");
            VISIT_TYPE.map(function (item, index, array) {
              if (item.key == row.type) {
                current = item;
              }
            });
            return (current && current.label) || "-";
          }
        },
        { checked: true, key: "customerName", val: "客户名称" },
        {
          checked: true,
          key: "firstFlag",
          val: "是否初次拜访",
          isFormat: true,
          formatFn: (item, row) => {
            return row.firstFlag == 0 ? "否" : "是";
          }
        },
        {
          checked: true,
          key: "visitTime",
          val: "拜访时间",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.visitTime, 2);
          }
        },
        {
          checked: true,
          key: "createTime",
          val: "创建时间",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.createTime, 2);
          }
        },
        { checked: true, key: "ownerUserName", val: "拥有人" },
        { checked: true, key: "departmentName", val: "事业部" }
      ],
      dateTypeString: "yyyy-MM-dd", //时间格式
      startPickerOptions: {
        disabledDate(time) {
          let endDate = self.serachParm.visitEndTime || "";
          if (endDate) {
            let sdTime = new Date(endDate).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          let startDate = self.serachParm.visitStartTime || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() + 24 * 3600 * 1000 < sdTime;
          }
        }
      },
      exportUrl: null,
      getListUrl: "/glp-crm/customer/visit/queryDataStatistics", //列表数据地址
      serachParm: {
        type: null, //拜访类型
        visitStartTime: null, //拜访开始时间
        visitEndTime: null, // 拜访结束时间
        firstFlag: null, //初次拜访（陌拜) : 0 否 1 是
        customerName: null //客户名称
      }
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
          this.exportUrl = `${origin}/glp-crm/customer/visit/export/visitExcel`;
        } else {
          param = param.substr(0, param.length - 1);
          this.exportUrl = `${origin}/glp-crm/customer/visit/export/visitExcel?${param}`;
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
    submitSearch() {
      localStorage.setItem("serachParm", JSON.stringify(this.serachParm));
      this.toSearch();
    },
    visitEndTimeChange() {
      this.serachParm = {
        ...this.serachParm,
        visitEndTime: `${this.serachParm.visitEndTime}T23:59:59`
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
.visitStatistics {
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