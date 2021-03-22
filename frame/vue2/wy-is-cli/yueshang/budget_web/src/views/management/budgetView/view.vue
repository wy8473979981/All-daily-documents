<template>
  <!-- 预算查看-总页面 -->
  <div class="list-page plait">
    <el-row class="tool-bar">
      <!-- <el-row class="page-txt">
        <el-col :span="24" v-if="formNum">{{formNum}}</el-col>
      </el-row> -->
      <el-row class="page-txt">
        <el-col :span="16">
          <el-cascader placeholder="请输入关键字搜索" size="mini" :show-all-levels="false" :options="options" ref="cascaderAddr" @change="search" v-model="query.viewInstanceId" filterable style="margin-right: 5px; width: 380px;"></el-cascader>
          <!-- <el-button @click="reset" size="mini">重置</el-button> -->
        </el-col>
      </el-row>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column min-width="350" label="预算方案名称" show-overflow-tooltip prop="department">
        <template slot-scope="scope">
          <span>{{ scope.row.name ||'-' }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100" show-overflow-tooltip label="状态" prop="name">
        <template slot-scope="scope">
          <span>{{ scope.row.status | filterStatus }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="100" label="最后审批人" show-overflow-tooltip prop="status">
        <template slot-scope="scope">
          <span>{{ scope.row.updater ||'-' }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="生效时间" show-overflow-tooltip prop="updaterName">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime ||'-' }}</span>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" min-width="250" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="goDetail(scope.row,1)">查看利润表</el-button>
          <el-button type="text" size="mini" @click="goDetail(scope.row,2)">查看业务表</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, rTime, viewChartGather } from '@/utils/index'
import PlaitApi from '@/apis/apis/plaitApi'
import BudgetViewApi from '@/apis/apis/budgetViewApi'
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  mixins: [handle_paginator],
  data() {
    return {
      viewChartGather: viewChartGather,
      options: [],
      pageInfo: {
        pageSize: 50,
        pageNum: 1,
        total: 0
      },
      query: {
        viewInstanceId: null
      },
      budgetTitle: [],
      formNum: null,
      tableData: [],
      routerQuery: null,
    }
  },
  watch: {},
  computed: {
    ...mapState(["viewInstanceId"]),
  },
  created() {
    this.routerQuery = this.$route.query;
    this.query.viewInstanceId = this.viewInstanceId;
    this.getList()

  },
  mounted() {

  },
  filters: {
    // 状态判断
    filterStatus(val) {
      switch (val) {
        case 0:
          return '创建'
          break
        case 1:
          return '草稿'
          break
        case 2:
          return '提交'
          break
        case 3:
          return '审核通过'
          break
        case 4:
          return '驳回'
          break
      }
    }
  },
  methods: {
    ...mapMutations([
      'setCompanyName',
      'setViewInstanceId'
    ]),
    rTime,
    // 查询列表数据
    async getList() {
      try {
        const params = {
          areaId: this.query.viewInstanceId && this.query.viewInstanceId[0],
          projectId: this.query.viewInstanceId && this.query.viewInstanceId[1],
          pageSize: this.pageInfo.pageSize,
          pageNum: this.pageInfo.pageNum,
        }
        await BudgetViewApi.viewList(params).then(res => {
          if (res.code == 0) {
            let { data } = res;
            this.tableData = data.list;
            this.pageInfo.total = data.total;

            let serverArray = (arr) => {
              let newArr = [];
              for (let item = 0; item < arr.length; item++) {
                newArr.push({ value: arr[item]['id'] || arr[item]['projectId'] || arr[item]['areaId'], label: arr[item]['name'] || arr[item]['projectName'] || arr[item]['areaName'] })
                if (arr[item].children.length > 0) {
                  newArr[item].children = serverArray(arr[item].children)
                }
              }
              return newArr
            }

            this.options = serverArray(data.budgetAreaVOS);
            this.setViewInstanceId({ viewInstanceId: data.instanceIds });
            this.query.viewInstanceId = data.instanceIds;
            // this.setCompanyName({ companyName: data.instanceName });
            setTimeout(() => {
              getDynamicTableHeight(this)
            }, 500)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    goDetail(item, type) {
      try {
        let query = {
          companyId: item.id
        }
        this.setCompanyName({ companyName: item.name });
        if (type == 1) {
          this.$router.push({ path: '/management/budgetView/profit/index', query: query });
        } else if (type == 2) {
          this.$router.push({ path: '/management/budgetView/income/index', query: query });
        }
      } catch (e) {
        console.log(e)
      }
    },
    search() {
      // const companyName = this.$refs["cascaderAddr"].getCheckedNodes()[0].label;
      // this.setCompanyName({ companyName: companyName });
      this.setViewInstanceId({ viewInstanceId: this.query.viewInstanceId });
      this.pageInfo.pageNum = 1;
      this.getList();
    },
    reset() {
      this.query.viewInstanceId = null;
      this.pageInfo.pageNum = 1;
      this.setCompanyName({ companyName: null });
      this.setViewInstanceId({ viewInstanceId: this.query.viewInstanceId });
      this.getList()
    },
  }
}
</script>
<style type="text/css" lang="scss" >
@import "~@styles/common.scss";
.plait {
  .cell .el-button {
    padding: 4px 17px 4px 0;
  }
  .tool-bar {
    display: flex;
    flex-direction: column;
    .page-txt {
      .el-col {
        margin-bottom: 15px;
        font-size: 14px;
      }
      .plait-title {
        color: #468ceb;
      }
    }
    .page-txt-tab {
      .el-col {
        margin-bottom: 5px;
        font-size: 14px;
      }
      .plait-title {
        color: #468ceb;
      }
    }
    .el-tabs__content {
      display: none;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .select-title {
      display: flex;
      justify-content: flex-start;
      .select-cutover {
        span {
          display: inline-block;
          font-size: 14px;
          padding: 0 20px;
          border-right: 1px solid #000;
          cursor: pointer;
        }
        span:first-child {
          padding-left: 0;
        }
        span:last-child {
          border: 0;
        }
        .select-blue {
          color: #468ceb;
          font-size: 18px;
        }
      }
      .select-data {
        font-size: 12px;
        color: #666666;
        line-height: 18px;
      }
    }
  }
  .el-tabs__item:after {
    content: "";
    width: 1px;
    height: 40%;
    background-color: #585353;
    position: absolute;
    left: 99%;
    top: 11px;
  }
  .el-tabs__item:last-child:after {
    display: none;
    content: "";
    width: 1px;
    height: 40%;
    background-color: #fff;
    position: absolute;
    left: 99%;
    top: 11px;
  }
  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    position: absolute;
    cursor: pointer;
    line-height: 40px;
    font-size: 22px;
    color: #000;
  }
  .el-tabs__nav-wrap.is-scrollable {
    padding: 0 32px;
    box-sizing: border-box;
  }
}
</style>
