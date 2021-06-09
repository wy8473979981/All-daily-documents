<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-18 16:04:21
 * @LastEditors: zhb
-->
<template>
  <div class="app-page-main">
    <div class="date-picker">
      <el-date-picker v-model="datePickerValue" type="month" :clearable="false" placeholder="选择月" />
    </div>
    <div class="budget-table">
      <el-table :data="tableData" style="width: 100%; font-size: 10px" @sort-change="changeSort">
        <el-table-column label="基础信息 K">
          <el-table-column prop="sequence" label="序列" width="80px" />
          <el-table-column prop="v1" label="项目" sortable>
            <template #header>
              <div class="solt-icon">
                <span>项目</span>
                <i class="el-icon-sort-down" />
              </div>
              <div class="table-title">
                <span style="margin-right: 22px">汇总</span>
              </div>
            </template>
            <template slot-scope="scope">
              <span class="td-color">{{ scope.row.v1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="v2" label="考核开业率" sortable>
            <template #header>
              <div class="solt-icon">
                <span>考核开业率</span>
                <i class="el-icon-sort" />
              </div>
              <div class="table-title">
                <span>86.00%</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="v3" label="考核出租率" sortable>
            <template #header>
              <div class="solt-icon">
                <span>考核出租率</span>
                <i class="el-icon-sort" />
              </div>
              <div class="table-title">
                <span>86.00%</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="v4" label="平均租金" sortable>
            <template #header>
              <div class="solt-icon">
                <span>平均租金</span>
                <i class="el-icon-sort" />
              </div>
              <div class="table-title">
                <span>216.20</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="v5" label="收缴率" sortable>
            <template #header>
              <div class="solt-icon">
                <span>收缴率</span>
                <i class="el-icon-sort" />
              </div>
              <div class="table-title">
                <span>54.90%</span>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <div class="paging-data">
        <p>共15条数据，当前在1/1页</p>
      </div>
      <div class="paging-option">
        <el-pagination layout="prev, pager, next" :total="12" />
        <el-select v-model="value">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
// import{getWabTreePosApp}from "../../api/common"
export default {
  name: 'HomeList',
  data() {
    return {
      datePickerValue: '2020/5',
      select: '',
      tableData: [{
        sequence: '',
        v1: '汇总',
        v2: '0.86%',
        v3: '0.86%',
        v4: '216.0',
        v5: '54.9%'
      }, {
        sequence: '1',
        v1: '杭州富阳',
        v2: '0.86%',
        v3: '0.86%',
        v4: '3.10',
        v5: '114.9%'
      }, {
        sequence: '2',
        v1: '重庆合川',
        v2: '0.86%',
        v3: '0.86%',
        v4: '4.10',
        v5: '114.9%'
      }, {
        sequence: '3',
        v1: '杭州富阳',
        v2: '0.86%',
        v3: '0.86%',
        v4: '5.10',
        v5: '114.9%'
      }, {
        sequence: '4',
        v1: '福州',
        v2: '0.86%',
        v3: '0.86%',
        v4: '6.10',
        v5: '114.9%'
      }, {
        sequence: '5',
        v1: '蓬莱',
        v2: '0.86%',
        v3: '0.86%',
        v4: '7.10',
        v5: '114.9%'
      }, {
        sequence: '6',
        v1: '烟台',
        v2: '0.86%',
        v3: '0.86%',
        v4: '8.10',
        v5: '114.9%'
      }, {
        sequence: '7',
        v1: '郑州',
        v2: '0.86%',
        v3: '0.86%',
        v4: '9.10',
        v5: '114.9%'
      }, {
        sequence: '8',
        v1: '无锡',
        v2: '0.86%',
        v3: '0.86%',
        v4: '21.10',
        v5: '114.9%'
      }, {
        sequence: '9',
        v1: '洛阳',
        v2: '0.86%',
        v3: '0.86%',
        v4: '22.10',
        v5: '114.9%'
      }, {
        sequence: '10',
        v1: '南京高淳',
        v2: '0.86%',
        v3: '0.86%',
        v4: '24.10',
        v5: '114.9%'
      }, {
        sequence: '11',
        v1: '杭州大江东',
        v2: '0.86%',
        v3: '0.86%',
        v4: '25.10',
        v5: '114.9%'
      }, {
        sequence: '12',
        v1: '杭州青山湖',
        v2: '0.86%',
        v3: '0.86%',
        v4: '26.10',
        v5: '114.9%'
      }

      ],
      options: [{
        value: '10',
        label: '10条/页'
      },
      {
        value: '15',
        label: '15条/页'
      },
      {
        value: '20',
        label: '20条/页'
      },
      {
        value: '30',
        label: '30条/页'
      }
      ],
      value: '20条/页'
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    changeSort(val) {
      console.log(val)
    }
  }
}

</script>
<style lang="scss" scoped>
  .app-page-main {
    width: 100%;
    background: #f6f5ee;

    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }

    ::v-deep .date-picker {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-content: center;

      .el-input__inner {
        width: 194px;
        height: 32px;
        background: #fdfcfa;
        border-radius: 18px;
        border: none;
        font-size: 14px;
        color: #050101;
        padding-left: 38px;
      }

      .el-input__icon {
        line-height: 32px;
      }
    }

    ::v-deep .budget-table {
      tbody tr:first-child span {
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #050101;
      }

      .td-color {
        color: #1c4c7f;
      }

      .el-table tr {
        background: #f6f5ee;
      }

      .el-table td {
        background-color: #f6f5ee;
        text-align: center;
        padding: 0;
      }

      .el-table thead tr:nth-child(1) th {
        text-align: center;
        background: #e5e2de !important;
        padding: 0;

        &:first-child {
          border-top-left-radius: 20px;
          //   border-bottom-left-radius: 20px;
          border-top-right-radius: 20px;
        }

        &:nth-child(6) {
          //   border-top-right-radius: 20px;
          background: #f6f5ee;
          //   border-bottom-right-radius: 20px;
        }
      }

      .el-table thead tr:nth-child(2) th {
        text-align: center;
        background: #e5e2de !important;
        padding: 0;

        &:first-child {
          border-bottom-left-radius: 20px;
          //   border-top-right-radius: 20px;
        }

        &:nth-child(6) {
          //   border-top-right-radius: 20px;
          background: #f6f5ee;
          border-bottom-right-radius: 20px;
        }
      }

      .cell {
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #050101;
        position: relative;
        font-weight: normal;
      }

      .table-title {
        position: absolute;
        bottom: -35px;
        text-align: center;
        position: absolute;
        bottom: -35px;
        margin: 0 auto;
        text-align: center;
        left: 0;
        right: 0;
      }

      .has-gutter {
        background: #f6f5ee;
      }

      .el-table--border th,
      .el-table--border td {
        border-right: 0;
      }

      .el-table--group,
      .el-table--border {
        border: 0;
      }

      .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color: #e5e2de;
      }

      .el-table__header-wrapper {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }

      .el-table,
      .el-table__expanded-cell {
        background: #f6f5ee;
      }

      .el-table__row td .cell {
        height: 36px !important;
        line-height: 36px;
      }

      .el-table--enable-row-hover .el-table__body tr:hover>td:nth-child(1) {
        border-radius: 20px 0 0 20px;
      }

      .el-table--enable-row-hover .el-table__body tr:hover>td:last-child {
        border-radius: 0 20px 20px 0;
      }

      .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color: rgba(229, 226, 222, 0.4) !important;
      }

      .el-table--enable-row-hover .el-table__body tr:hover>td .cell {
        color: #48a0c3 !important;
      }

      .el-table--enable-row-hover .el-table__body tr:hover .td-color {
        color: #48a0c3 !important;
      }

      .solt-icon {
        i {
          margin-left: 4px;
        }
      }
    }

    ::v-deep.paging {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 34px;

      .paging-data {
        padding: 0;

        p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #050101;
        }
      }

      .paging-option {
        display: flex;

        .el-input__inner {
          padding: 0;
          height: 24px;
          width: 80px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #050101;
          background: #f6f5ee;
          border: none;
          padding-top: 4px;
        }

        .el-input__icon {
          line-height: 24px;
        }

        .el-pager li {
          height: 24px;
          line-height: 24px;
        }

        .el-pagination button,
        .el-pagination span:not([class*="suffix"]) {
          height: 24px;
          line-height: 24px;
        }

        .el-pager li.active {
          color: #1c4c7f;
        }

        .el-pager li {
          color: #050101;
        }
      }

      .el-pagination button {
        background: #f6f5ee;
      }

      .number {
        background: #f6f5ee !important;
      }
    }
  }

</style>
