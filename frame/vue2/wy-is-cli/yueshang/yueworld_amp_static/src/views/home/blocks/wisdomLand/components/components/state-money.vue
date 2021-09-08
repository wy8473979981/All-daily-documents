<template>
  <div class="state-cs">
    <!--租金测算/ 开始测算 -->
    <div v-if="show">
      <p class="p1">宝龙城商铺租金测算结果</p>
      <div class="txt-twoBox" style="height:187px">
        <div class="title">租期总收入</div>
        <div class="box">
          <div>
            <div v-for="(item, index) in dataList" :key="index" class="left">
              <span>{{ item.name }}</span>
              <span>{{ item.val }}</span>
            </div>
          </div>

          <div>
            <div v-for="(item, index) in dataLists" :key="index" class="left">
              <span style="width: 60px">{{ item.name }}</span>
              <span>{{ item.val }}</span>
            </div>
          </div>
        </div>
        <button class="add" @click="topath">首年分析</button>
      </div>
      <div class="txt-twoBox" style="margin-top: 8px">
        <div class="title">生成商务条件</div>
        <div class="box">
          <div>
            <div v-for="(item, index) in dataList1" :key="index" class="left">
              <span>{{ item.name }}</span>
              <span>{{ item.val }}</span>
            </div>
          </div>

          <div>
            <div
              v-for="(item, index) in dataLists2"
              :key="index"
              class="left fourcolor"
            >
              <span style="width: 75px">{{ item.name }}</span>
              <span :style="'color:' + item.color">{{ item.val }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="txt-twoBox" style="margin-top:10px">
        <div class="title">租期递增率分析</div>
        <div class="box">
          <div class="tablelist">
            <el-table :data="tableData" style="width: 100%; font-size: 10px">
              <el-table-column prop="date1" label="年份" align="center" />
              <el-table-column prop="date2" label="递增率" />
              <el-table-column prop="date3" label="租金收入/m" />
              <el-table-column prop="date4" label="修正">
                <template slot-scope="scope">
                  <div style="color: #ff641c">
                    {{ scope.row.date4 }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <button class="add" style="margin-bottom: 21px" @click="exportt">导出结果</button>
    </div>

    <div v-if="!show" class="result">
      <p>宝龙城商铺租金测算结果</p>
      <div class="txt-twoBox">
        <div class="box">
          <table style="width: 322px">
            <tr class="tr1">
              <th v-for="(i, index) in thList" :key="index">{{ i }}</th>
            </tr>
            <tr v-for="(i, index) in tablistL" :key="index">
              <td>{{ i.name1 }}</td>
              <td>{{ i.name2 }}</td>
              <td>{{ i.name3 }}</td>
              <td>{{ i.name4 }}</td>

            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      dataList: [
        { name: '租金收入', val: '自动生成' },
        { name: '物业收入', val: '自动生成' }
      ],
      dataLists: [
        { name: '按年平均', val: '自动生成' },
        { name: '按年平均', val: '自动生成' }
      ],

      dataList1: [
        { name: '起始租金/m', val: '自动生成' },
        { name: '物业费/m', val: '自动生成' },
        { name: '租金方式', val: '自动生成' },
        { name: '抽成扣率', val: '自动生成' },
        { name: '租期上限', val: '自动生成' },
        { name: '免租期', val: '自动生成' }
      ],
      dataLists2: [
        { name: '修正', val: '自动生成' },
        { name: '修正', val: '自动生成' },
        { name: '修正', val: '自动生成' },
        { name: '销售额预测', val: '输入+数字', color: '#FA6400' },
        { name: '修正', val: '自动生成' },
        { name: '修正', val: '自动生成' }
      ],
      tableData: [
        {
          date1: 1,
          date2: '自动生成',
          date3: '自动生成',
          date4: '修改比率或数字'
        },
        {
          date1: 2,
          date2: '自动生成',
          date3: '自动生成',
          date4: '修改比率或数字'
        },
        {
          date1: 3,
          date2: '自动生成',
          date3: '自动生成',
          date4: '修改比率或数字'
        },
        {
          date1: 4,
          date2: '自动生成',
          date3: '自动生成',
          date4: '修改比率或数字'
        },
        {
          date1: 5,
          date2: '自动生成',
          date3: '自动生成',
          date4: '修改比率或数字'
        },
        {
          date1: 6,
          date2: '自动生成',
          date3: '自动生成',
          date4: '修改比率或数字'
        },
        {
          date1: 7,
          date2: '自动生成',
          date3: '自动生成',
          date4: '修改比率或数字'
        }
      ],
      thList: ['首年分析', '', '内部达标率', '外部对比值'],
      tablistL: [
        {
          name1: '租金收入',
          name2: '自动生成',
          name3: '自动生成',
          name4: '自动生成'
        },
        {
          name1: '物业费收入',
          name2: '自动生成',
          name3: '自动生成',
          name4: '自动生成'
        },
        {
          name1: '租金单价',
          name2: '自动生成',
          name3: '自动生成',
          name4: '自动生成'
        }
      ]
    }
  },
  methods: {
    exportt() {
      this.show = false
    },
    topath() {
      this.$router.push('history')
    }
  }
}
</script>
<style lang="scss" scoped>
.state-cs {
  .p1 {
    width: 198px;
    height: 18px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #050101;
    line-height: 18px;
    margin-bottom: 14px;
  }
  .txt-twoBox {
    width: 100%;
    background: #ffffff;
    border-radius: 20px;
    padding: 18px 16px;
    // overflow-x: scroll;
    .title {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #050101;
      line-height: 18px;
      padding-bottom: 13px;
      border-bottom: 1px solid #e5e2de;
    }
    .box {
      width: 357px;
      display: flex;
      .left {
        width: 170px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 14px;
        margin-top: 17px;
        margin-right: 25px;
        :nth-last-child(1) {
          width: 56px;
          display: inline-block;
          font-size: 14px;
          color: #014543;
          white-space: nowrap;
        }
        :nth-last-child(2) {
          width: 72px;
          display: inline-block;
          font-size: 14px;
          white-space: nowrap;
          color: #999999;
        }
      }
    }
  }
}
.add {
  width: 86px;
  height: 32px;
  background: #014543;
  border-radius: 16px;
  border: none;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 1;
  margin-top: 24px;
  float: right;
}
.tablelist {
  width: 337px;
  font-size: 14px;
  font-family: Helvetica;
  color: #050101;
  line-height: 14px;
  ::v-deep .el-table td {
    background: #f6f5ee;
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
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  ::v-deep.el-table th:nth-last-child(2) {
    border-top-right-radius: 20px;
    background: #f6f5ee;
    border-bottom-right-radius: 20px;
  }
  ::v-deep.cell {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-family: Helvetica;
    color: #050101;
    p {
      font-size: 14px;
      font-family: Helvetica;
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
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background: #e5e2de;
  }
  ::v-deep.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td:nth-last-child(1) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background: #e5e2de;
    //  color: #48A0C3  !important ;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #e5e2de;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td > .cell {
    color: #48a0c3;
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
}
</style>
<style lang="scss" scoped>
.result {
  p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #848382;
    line-height: 24px;
    margin-bottom: 16px;
  }
  .tr1 {
    width: 322px;
    height: 32px;
    background: #e5e2de;
    border-radius: 20px;
    th {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: #050101;
      line-height: 32px;
    }
    :nth-child(1) {
      border-radius: 20px 0 0 20px;
    }
    :nth-child(4) {
      border-radius: 0 20px 20px 0;
    }
  }
  tr {
    td {
      line-height: 32px;
      text-align: center;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      height: 32px;
    }
    :nth-child(1) {
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
  }
}
</style>
