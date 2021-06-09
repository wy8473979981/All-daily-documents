<template>
  <!-- 测算对比分析 -->
  <div class="tablelist">
    <div v-show="tableShow" class="box" />
    <el-table
      v-if="tableShow"
      :data="tableData"
      style="width: 100%; font-size: 10px; border: none"
    >
      <el-table-column prop="date1" label="自然年" width="210">
        <el-table-column prop="date1" label="年份" width="210">
          <template slot-scope="scope">
            <div class="tab1">
              {{ scope.row.date1 }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="date2" label="测算值" width="100">
        <template slot-scope="scope">
          <div class="tab2">
            {{ scope.row.date2 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="date3" label="2020" width="80" align="center">
        <el-table-column prop="name" label="第-1年" width="120" align="center">
          <template slot-scope="scope">
            <div class="tab2">
              {{ scope.row.date3 }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="date4" label="2021" width="80" align="center">
        <el-table-column prop="date4" label="第1年" width="120" align="center">
          <template slot-scope="scope">
            <div class="tab2">
              {{ scope.row.date4 }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="date5" label="2022" width="80" align="center">
        <el-table-column prop="date5" label="第2年" width="120" align="center">
          <template slot-scope="scope">
            <div class="tab2">
              {{ scope.row.date5 }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="date6" label="2023" width="80" align="center">
        <el-table-column prop="date6" label="第3年" width="120" align="center">
          <template slot-scope="scope">
            <div class="tab2">
              {{ scope.row.date6 }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="date7" label="2024" width="80" align="center">
        <el-table-column prop="date7" label="第4年" width="120" align="center">
          <template slot-scope="scope">
            <div class="tab2">
              {{ scope.row.date7 }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="date8" label="2025" width="80" align="center">
        <el-table-column prop="date8" label="第5年" width="120" align="center">
          <template slot-scope="scope">
            <div class="tab2">
              {{ scope.row.date8 }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="date9" label="2026" width="80" align="center">
        <el-table-column prop="date9" label="第6年" width="120" align="center">
          <template slot-scope="scope">
            <div class="tab2">
              {{ scope.row.date9 }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="date10" label="2027" width="80" align="center">
        <el-table-column prop="date10" label="第7年" width="120" align="center">
          <template slot-scope="scope">
            <div class="tab2">
              {{ scope.row.date10 }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table
      v-show="!tableShow"
      :data="tableData1"
      style="width: 100%; font-size: 10px"
      @row-click="rowclick"
    >
      <el-table-column prop="date1" label="项目" width="150">
        <template slot-scope="scope">
          <div class="tables">
            {{ scope.row.date1 }}
            <span>商业街</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="date2" label="产品" width="100" />
      <el-table-column prop="date3" label="地上建面(m²)" width="150" sortable />
      <el-table-column prop="date4" label="地下建面(m²)" width="150" sortable />
      <el-table-column prop="date5" label="完成/更新时间" width="200">
        <!-- <template slot="header">
          <span>创建人</span>

        </template> -->
      </el-table-column>
      <el-table-column prop="date6" label="地价(万元)" width="100" />
      <el-table-column prop="date7" label="开发成本(万元) " width="100" />
      <el-table-column prop="date8" label="市政配套费(万元) " width="100" />
      <el-table-column prop="date9" label="地下分摊(万元) " width="100" />
      <el-table-column prop="date10" label="资本化利息 " width="100" />
      <el-table-column prop="date11" label="管理费用" width="100" />
      <el-table-column prop="date12" label="成本合计 " width="100" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date1: '累计总投',
          date2: '-',
          date3: '2700000.00',
          date4: '540000.00',
          date5: '65980.00',
          date6: '356420.00',
          date7: '52552.00',
          date8: '50009.00',
          date9: '631202.02',
          date10: '52552.00'
        },
        {
          date1: '总投',
          date2: '-',
          date3: '2700000.00',
          date4: '540000.00',
          date5: '65980.00',
          date6: '356420.00',
          date7: '52552.00',
          date8: '50009.00',
          date9: '631202.02',
          date10: '52552.00'
        }
      ],
      tableData1: [
        {
          date1: '上海闵行七宝项目',
          date2: '购物中心',
          date3: '66000',
          date4: '1000',
          date5: '22355',
          date6: '325500',
          date7: '52552',
          date8: '50009',
          date9: '631202',
          date10: '52552'
        },
        {
          date1: '上海四团',
          date2: '-',
          date3: '27000',
          date4: '5400.00',
          date5: '65980',
          date6: '356420',
          date7: '5255',
          date8: '50000',
          date9: '63102',
          date10: '5250'
        },
        {
          date1: '南京红山8号',
          date2: '-',
          date3: '27000',
          date4: '5400.00',
          date5: '65980',
          date6: '356420',
          date7: '5255',
          date8: '50000',
          date9: '63102',
          date10: '5250'
        },
        {
          date1: '宁波',
          date2: '-',
          date3: '27000',
          date4: '5400.00',
          date5: '65980',
          date6: '356420',
          date7: '5255',
          date8: '50000',
          date9: '63102',
          date10: '5250'
        },
        {
          date1: '九龙湖',
          date2: '-',
          date3: '27000',
          date4: '5400.00',
          date5: '65980',
          date6: '356420',
          date7: '5255',
          date8: '50000',
          date9: '63102',
          date10: '5250'
        }
      ],
      tableShow: false
    }
  },
  methods: {
    rowclick() {
      this.tableShow = true
      this.$parent.tableShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
.tablelist {
  width: 1113px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #050101;
  line-height: 14px;
  position: relative;
  ::v-deep .el-table td {
    background: #f6f5ee;
  }
  ::v-deep.el-table--border td {
    border-right: 1px solid transparent;
    border-bottom: none !important;
  }

  ::v-deep .el-table--scrollable-y ::-webkit-scrollbar {
    height: 1px;
  }
  ::v-deep .el-table--scrollable-x ::-webkit-scrollbar {
    height: 1px;
  }
  ::v-deep.el-table th {
    background: #e5e2de !important;
    padding: 0;
  }
  ::v-deep.el-table th:first-child {
    border-radius: 50px 0 0 50px;
    padding-left: 34px;
  }
  ::v-deep.el-table th:nth-last-child(2) {
    border-radius: 0 0 0px 50px;
    background: #f6f5ee;
  }
  ::v-deep.cell {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #050101;

    p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #1c4c7f;
    }
    img {
      vertical-align: middle;
    }
  }
  ::v-deep.el-table tr {
    background: #f6f5ee;
  }
  ::v-deep.has-gutter {
    background: #f6f5ee;
  }
  ::v-deep.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td:first-child {
    // border-top-left-radius: 20px;
    // border-bottom-left-radius: 20px;
    background: #e5e2de;
    color: #bf9000;
  }
  ::v-deep.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td:nth-last-child(1) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background: #e5e2de;
    color: #bf9000;
    //  color: #48A0C3  !important ;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #e5e2de;
    color: #bf9000;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td > .cell {
    color: #48a0c3;
    color: #bf9000 !important;
  }
  ::v-deep.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td
    > .cell
    > p {
    color: #48a0c3;
  }
  ::v-deep.el-table--enable-row-transition .el-table__body td {
    transition: background-color -1s ease;
  }
  ::v-deep .el-table__header-wrapper {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  ::v-deep.el-table,
  .el-table__expanded-cell {
    background: #f6f5ee;
  }
  ::v-deep.el-table td,
  .el-table th {
    padding: 0;
  }
  ::v-deep.el-table__row td .cell {
    height: 36px !important;
    line-height: 36px;
  }
  .solt-icon {
    i {
      margin-left: 8px;
    }
  }
  .tab1 {
    padding-left: 34px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #050101;
    line-height: 36px;
  }
  .tab2 {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6f120c;
    line-height: 36px;
  }
}
.box {
  height: 64px;
  width: 30px;
  background: #e5e2de;
  // border-radius: 50px 0 0 50px;
  border-radius: 45%;
  position: absolute;
  top: 37px;
  // left: -8px;
  left: -2px;
  z-index: 1000;
}
.tables {
  font-weight: 600;
  color: #014543;

  span {
    display: block;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    // color: #050101;
  }
}
tr:hover .tables {
  color: #bf9000 !important;
}
</style>
