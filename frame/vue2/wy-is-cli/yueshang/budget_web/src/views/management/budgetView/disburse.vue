<template>
  <!-- 预算查看-费用支出页面 -->
  <div class="list-page plait">
    <el-row class="tool-bar">
      <el-row class="page-txt-tab">
        <el-col class="select-title" :span="20">
          <div class="select-cutover">
            <span @click="$router.push({path: '/management/budgetView/income/index',query:routerQuery})">收入</span>
            <span class="select-blue">费用支出</span>
            <span @click="$router.push({path: '/management/budgetView/summary/index',query:routerQuery})">汇总</span>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column min-width="100" label="部门名称" show-overflow-tooltip prop="department">
        <template slot-scope="scope">
          <span>{{ scope.row.department || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" show-overflow-tooltip label="费用支出表" prop="name">
        <template slot-scope="scope">
          <span @click="goDetail(scope.row)" class="ys-text-blue c_p">{{ scope.row.name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="70" label="状态" show-overflow-tooltip prop="status">
        <template slot-scope="scope">
          <span>{{ scope.row.status | filterStatus }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="100" label="最后编辑人" show-overflow-tooltip prop="updaterName">
        <template slot-scope="scope">
          <span>{{ scope.row.updaterName || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="最后编辑时间" show-overflow-tooltip prop="updateTime">
        <template slot-scope="scope">
          <span>{{rTime(scope.row.updateTime|| '-')}}</span>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="goDetail(scope.row)">详情</el-button>
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
      },
      query: {},
      budgetTitle: [],
      formNum: null,
      tableData: [],
      routerQuery: null,
    }
  },
  watch: {},
  computed: {
  },
  created() {
    this.routerQuery = this.$route.query;
    this.getList()
  },
  mounted() {
  },
  filters: {
    // 状态判断
    filterStatus(val) {
      switch (val) {
        case 0:
          return '草稿'
          break
        case 1:
          return '未提交'
          break
        case 2:
          return '已提交'
          break
        case 3:
          return '已生效'
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
      'setViewInstanceId',
      'setBudgetYear'
    ]),
    rTime,
    // 查询列表数据
    async getList() {
      try {
        const params = {
          sheetType: 2,
          pageSize: this.pageInfo.pageSize,
          pageNum: this.pageInfo.pageNum,
          instanceId: this.routerQuery.companyId,
        }
        await PlaitApi.find(params).then(res => {
          if (res.code == 0) {
            let { data } = res;
            this.tableData = data.list;
            this.pageInfo.total = data.total;
            setTimeout(() => {
              getDynamicTableHeight(this)
            }, 500)
          }
        })
      } catch (e) {
        console.log(e)
      }
    },

    goDetail(item) {
      try {
        const routerPath = this.viewChartGather;
        const annual = item.annual; //年度
        const budgetInstanceSheetId = item.id;//表的 ID
        const budgetSheetId = item.budgetSheetId;//表的标识
        const budgetInstanceId = item.budgetInstanceId;//表的实例ID
        const projectId = item.projectId;// 项目 ID
        const companyId = this.routerQuery.companyId;// 预算公司的ID
        this.setBudgetYear({ budgetYear: annual });//预算年度
        if (budgetInstanceSheetId && budgetSheetId) {
          if (routerPath[budgetSheetId][1]) {
            const query = { budgetInstanceSheetId: budgetInstanceSheetId, budgetInstanceId: budgetInstanceId, budgetSheetId: budgetSheetId, annual: annual, projectId: projectId, companyId: companyId }
            this.$router.push({ path: routerPath[budgetSheetId] && routerPath[budgetSheetId][1], query: query });
          } else {
            this.$message.error('暂无编制中的预算方案')
          }
        } else {
          this.$message.error('暂无编制中的预算方案')
        }
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>
<style type="text/css" lang="scss" >
@import "~@styles/common.scss";
.plait {
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
