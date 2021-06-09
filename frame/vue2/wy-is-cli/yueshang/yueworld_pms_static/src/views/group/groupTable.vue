<template>
  <el-row>
    <div class="dailog-table" style="margin-top: 12px">
      <el-table :data="tableData" :cell-class-name="hangStyle" style="width: 100%">
        <el-table-column type="index" label="序列"> </el-table-column>
        <el-table-column
          v-for="(item,index) in tableColumn"
          :key="index"
          :prop="item.prop"
          :label="item.name"
          :align="item.align"
          :width="item.width">
          <template #header>
            <div class="solt-icon">
              <span>{{item.name}}</span>
              <i class="el-icon-sort cursor-pointer"></i>
            </div>
          </template>
          <template  slot-scope="scope">
            <span :class="[item.prop=='t2'&&scope.row.t2<'50%' ? 'red-color':'']">{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging pb-40">
      <div class="paging-data">
        <p>共8条数据，当前在1/1页</p>
      </div>
      <div class="paging-option">
        <el-pagination layout="prev, pager, next,sizes" :page-sizes="[20, 40, 60, 80]" :total="8"> </el-pagination>
      </div>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 0,
      optionYear: 2021,
      yearItem: [
        { value: 2021, label: '2021年' },
        { value: 2020, label: '2020年' },
        { value: 2019, label: '2019年' }
      ],
      activeName: 'first',
      tableColumn: [
        { name: '项目', prop: 't1' },
        { name: '完成进度', prop: 't2' },
        { name: '收入', prop: 't3' },
        { name: '费用支持', prop: 't4' },
        { name: '利润', prop: 't5' },
        { name: '租金收入', prop: 't6' }
      ],
      tableData: [
        { t1: '上海', t2: '10%', t3: '20,000', t4: '20,000', t5: '20,000', t6: '20,000' },
        { t1: '成都', t2: '22%', t3: '20,000', t4: '20,000', t5: '20,000', t6: '20,000' },
        { t1: '杭州', t2: '10%', t3: '20,000', t4: '20,000', t5: '20,000', t6: '20,000' },
        { t1: '北京', t2: '50%', t3: '20,000', t4: '20,000', t5: '20,000', t6: '20,000' },
        { t1: '上海', t2: '10%', t3: '20,000', t4: '20,000', t5: '20,000', t6: '20,000' },
        { t1: '成都', t2: '22%', t3: '20,000', t4: '20,000', t5: '20,000', t6: '20,000' },
        { t1: '杭州', t2: '10%', t3: '20,000', t4: '20,000', t5: '20,000', t6: '20,000' },
        { t1: '北京', t2: '50%', t3: '20,000', t4: '20,000', t5: '20,000', t6: '20,000' }]
    }
  },
  methods: {
    hangStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 7) {
        return 'changecolor'
      }
    }
  }
}
</script>
<style lang="scss">
  .budget-page{
    .el-input--small .el-input__inner{
      background: #FDFCFA;
      border-radius: 16px;
    }
  }
</style>
<style lang="scss" scoped>
  .budge-circle{
    margin-right: 90px;
    .circle{
      width: 82px;
      height: 82px;
    }
  }
  .red-color{
    color: #6F120C
  }
  .hdTitle {
    line-height: 32px;
    padding: 0 20px;
    font-size: 14px;
    color: #050101;
    background-color: #E5E2DE;
    border-radius: 16px;
  }

  .executingBox {
    margin-top: 10px;
  }

  .btnBox {
    text-align: right;

    .el-button {
      background-color: #1C4C7F;
      font-size: 14px;
      color: #fff
    }
  }

  .itemBox {
    margin-top: 10px;

    .el-col {
      position: relative;
      padding-left: 24px !important;

      &:after {
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -16px;
        content: '';
        width: 1px;
        height: 32px;
        background-color: #E5E2DE;
      }

      &:last-child:after {
        background-color: transparent;
      }

      .el-row {
        line-height: 32px;
        font-size: 24px;
        color: #050101;

        &:first-child {
          line-height: 24px;
          font-size: 14px;
        }
      }
    }
  }

  .yearBox {
    .el-select.yearCon {
      margin-top: 10px;
      width: 150px;

      .el-input__inner {
        border-radius: 16px !important;
        border: none !important;
      }
    }
  }

  .echartsCon {
    .el-col {
      margin-top: 15px;

      > div {
        margin: 0 auto;
      }
    }

    .el-row {
      padding-top: 10px;
      font-size: 14px;
      color: #050101;
      text-align: center
    }
  }

  .tipsBox {
    .el-row {
      text-align: center;
      font-size: 14px;
      color: #848382;
      line-height: 32px;

      i {
        display: inline-block;
        margin-right: 4px;
        width: 8px;
        height: 8px;
      }

      &:first-child {
        i {
          background-color: #1C4C7F
        }
      }

      &:nth-child(2) {
        font-size: 24px;
        color: #1C4C7F;
      }

      &:nth-child(3) {
        i {
          background-color: #48A0C3
        }

        em {
          display: inline-block;
          color: #48A0C3;
          font-style: normal;
          text-decoration: underline
        }
      }

      &:last-child {
        em {
          display: inline-block;
          color: #6F120C;
          font-style: normal;
        }
      }

      .icon {
        margin-left: 4px;
      }
    }

  }
  .top-bar{
    margin-top: 18px;
    .left{
      border-radius: 24px;
      font-size: 14px;
      color: #050101;
      line-height: 30px;
      display: flex;
      background-color: white;
    }
    .active{
      font-size: 16px;
      font-weight: bold;
      color: #1C4C7F;
      border-bottom: 2px solid #1C4C7F;
    }
  }
</style>
