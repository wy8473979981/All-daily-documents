<template>
  <div class="list-page">
    <div class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-row :gutter="20" style="display:block;width:100%">
        <el-col class="select-title" :span="18">
          <div class="select-cutover">
            <span class="select-blue">总收入</span>
            <span @click="$router.push({path: '/management/read/feiyong/index',query:routerQuery})">经营费用</span>
          </div>
        </el-col>
        <el-col class="select-title" :span="6">
          <div class="select-data">
            <p>(金额:万元 / 面积:平方米)</p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="display:block;width:100%">
        <el-col :span="16" style="display: flex;justify-content: flex-start;">
          <el-select placeholder="请选择项目" size="mini" @change="search" v-model="query.paramFirst" style="margin-right: 5px; width: 180px;">
            <el-option v-for="item in selectLayoutList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select placeholder="请选择年份" size="mini" @change="search" v-model="query.year" style="margin-right: 5px; width: 180px;">
            <el-option v-for="item in yearList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button @click="reset" size="mini">重置</el-button>
        </el-col>
        <el-col :span="8" style="text-align:right">
        </el-col>
      </el-row>
    </div>
    <el-table ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column fixed min-width="150" label="大项" show-overflow-tooltip prop="key1"></el-table-column>
      <el-table-column min-width="220" label="子项" show-overflow-tooltip prop="key2"></el-table-column>
      <el-table-column min-width="150" label="当年预算指标" show-overflow-tooltip prop="key3"></el-table-column>
      <el-table-column min-width="180" label="当年预算指标预计完成" show-overflow-tooltip prop="key4"></el-table-column>
      <el-table-column min-width="150" label="当年1-6月管报实际" show-overflow-tooltip prop="key5"></el-table-column>
      <el-table-column min-width="180" label="当年7-12月预计完成" show-overflow-tooltip prop="key6"> </el-table-column>
      <el-table-column min-width="120" label="次年度预算" show-overflow-tooltip prop="key7"></el-table-column>
      <el-table-column min-width="100" label="1月" show-overflow-tooltip prop="key8"></el-table-column>
      <el-table-column min-width="100" label="2月" show-overflow-tooltip prop="key9"></el-table-column>
      <el-table-column min-width="100" label="3月" show-overflow-tooltip prop="key10"></el-table-column>
      <el-table-column min-width="100" label="4月" show-overflow-tooltip prop="key11"></el-table-column>
      <el-table-column min-width="100" label="5月" show-overflow-tooltip prop="key12"> </el-table-column>
      <el-table-column min-width="100" label="6月" show-overflow-tooltip prop="key13"> </el-table-column>
      <el-table-column min-width="100" label="7月" show-overflow-tooltip prop="key14"> </el-table-column>
      <el-table-column min-width="100" label="8月" show-overflow-tooltip prop="key15"> </el-table-column>
      <el-table-column min-width="100" label="9月" show-overflow-tooltip prop="key16"> </el-table-column>
      <el-table-column min-width="100" label="10月" show-overflow-tooltip prop="key17"> </el-table-column>
      <el-table-column min-width="100" label="11月" show-overflow-tooltip prop="key18"> </el-table-column>
      <el-table-column min-width="100" label="12月" show-overflow-tooltip prop="key19"> </el-table-column>
    </el-table>
    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight } from '@/utils/index'
import ReadApi from '@/apis/apis/readApi'
import CommonApi from '@/apis/apis/global'
import { mockData1 } from './mockData/mockData.js'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/axiosHelperLoading'
export default {
  mixins: [handle_paginator],
  data() {
    return {
      pageInfo: {
        pageSize: 50,
        pageNum: 1,
        total: 0
      },
      query: {
        paramFirst: 1,
        year: 1
      },
      routerQuery: {},
      tableData: [],
      selectLayoutList: [
        {
          value: 1,
          label: '示例项目'
        }
      ],
      yearList: [
        {
          value: 1,
          label: '2021'
        }
      ],
    }
  },
  watch: {},
  created() {
    this.routerParam = this.$route.query
  },
  mounted() {
    this.getList();
  },
  // 日期转换格式
  filters: {},
  methods: {
    showFullScreenLoading, tryHideFullScreenLoading,
    search() {
      this.pageInfo.pageNum = 1
      this.getList()
    },
    reset() {
      this.query = {
        paramFirst: 1, // 项目
        year: 1
      }
      this.getList()
    },
    async getList() {
      this.showFullScreenLoading();
      setTimeout(() => {
        this.tableData = mockData1;
        this.pageInfo.total = mockData1.length;
        this.tryHideFullScreenLoading();
        getDynamicTableHeight(this);
      }, 1000)
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.pageInfo.page = 1
      this.getList()
    },
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "~@styles/common.scss";
.select-title {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 20px;
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
  .select-status {
    margin: 0 auto;
    p {
      font-size: 14px;
      span {
        font-size: 16px;
        color: #468ceb;
        padding-left: 20px;
      }
    }
  }
  .select-data {
    font-size: 12px;
    color: #666666;
    line-height: 18px;
  }
}
.tip-data {
  padding-top: 20px;
  span {
    font-size: 14px;
  }
  .tip-red {
    color: #ed1111;
  }
}
</style>
