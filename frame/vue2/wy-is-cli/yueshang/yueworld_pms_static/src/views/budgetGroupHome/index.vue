<template>
  <div class="group-container budget-page">
    <el-row :gutter="56">
      <!--  预算趋势图 -->
      <el-col :span="12">
        <el-row class="hdTitle">预算趋势图</el-row>
        <div id="trendsCon" style="width: 100%; height: 240px"></div>
      </el-col>
      <!-- 执行中预算 -->
      <el-col :span="12">
        <el-row class="hdTitle">执行中预算</el-row>
        <el-row class="executingBox">
          <el-col :span="6">
            <div id="progress" style="width: 110px; height: 110px"></div>

          </el-col>
          <el-col :span="10" class="tipsBox">
            <el-row><i></i>租金收入(万元)</el-row>
            <el-row>28,784.01</el-row>
            <el-row><i></i>租金包(万元)：<em>8,783.87 </em>
              <svg-icon icon-class="detail-blue" class="icon"/>
            </el-row>
            <el-row>差额：<em>-722.00</em></el-row>
          </el-col>
          <el-col :span="8" class="btnBox">
            <el-button round>预算调整</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="itemBox">
          <el-col :span="8" class="items">
            <el-row>收入(万元)</el-row>
            <el-row>28,784.00</el-row>
          </el-col>
          <el-col :span="8">
            <el-row>费用支出(万元)</el-row>
            <el-row>8,783,722.00</el-row>
          </el-col>
          <el-col :span="8">
            <el-row>NOI(万元)</el-row>
            <el-row>2,000.00</el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 编制预算 -->
    <el-row>
      <el-row class="hdTitle">编制预算</el-row>
      <el-row class="yearBox">
        <el-select ref="optionItem" v-model="optionYear" placeholder="请选择" @change="yearChange" class="yearCon" size="small">
          <el-option v-for="item in yearItem" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-row>
      <div class="d-flex mt-8 pl-16">
        <div class="budge-circle flex-al-center d-flex-column">
          <div id="progressCon" class="circle"></div>
          <div class="text-center mt-4">编制总进度</div>
        </div>
        <div class="budge-circle flex-al-center d-flex-column">
          <div id="completionRatio" class="circle"></div>
          <div class="text-center mt-4">完成项目占比</div>
        </div>
        <div class="budge-circle flex-al-center d-flex-column">
          <div id="expenditure" class="circle"></div>
          <div class="text-center mt-4">费用支出完成占比</div>
        </div>
      </div>
    </el-row>
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
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {

  name: 'BudgetHome',
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
  mounted() {
    this.trendsBox() // 预算趋势图
    this.progressBox() // 执行中预算
    this.progressConBox(25) // 编制总进度
    this.completionRatioBox(25) // 完成项目占比
    this.expenditureBox(25) // 费用支出完成占比
  },
  methods: {
    changeActive(index) {
      if (index === 1) {
        this.$set(this.tableData, 0, { department: 'YY部',
          income: '20%',
          state: '待提交',
          edit: '张三',
          time: '2020-10-18  09:32' })
      } else if (index === 0) {
        this.$set(this.tableData, 0, { department: 'XX部',
          income: '10%',
          state: '已提交',
          edit: '张三',
          time: '2020-10-18  09:32' })
      } else {
        this.$set(this.tableData, 0, { department: 'ZZ部',
          income: '30%',
          state: '已提交',
          edit: '李四',
          time: '2020-10-18  09:32' })
      }
      this.activeIndex = index
    },
    // 预算趋势图
    trendsBox() {
      var trendsContainer = echarts.init(document.getElementById('trendsCon'))
      var option = {
        color: ['#1C4C7F', '#48A0C3'],
        grid: {
          // left:auto,
          bottom: 30
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
          // formatter: '{b0}: {c0}<br />{b1}: {c1}'
        },
        xAxis: {
          data: ['总收入', '费用支出', 'NOI', '租金包'],
          axisLine: false
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#D1CEC9'],
              width: 0.5,
              type: 'solid'
            }
          },
          type: 'value',
          name: '万元'
        },
        series: [
          {
            name: '2020',
            type: 'bar',
            barMaxWidth: 12,
            data: [26000, 35000, 36000, 10000],
            itemStyle: {
              // 柱形图圆角，鼠标移上去效果
              emphasis: {
                barBorderRadius: [10, 10, 10, 10]
              },
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 10, 10]
              }
            }
          },
          {
            name: '2021',
            type: 'bar',
            barMaxWidth: 12,
            data: [50000, 20000, 34000, 10000],
            itemStyle: {
              // 柱形图圆角，鼠标移上去效果
              emphasis: {
                barBorderRadius: [10, 10, 10, 10]
              },
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 10, 10]
              }
            }
          }
        ]
      }
      trendsContainer.setOption(option)
    },
    // 执行中预算
    progressBox() {
      const progressCon = echarts.init(document.getElementById('progress'))
      const option = {
        series: [{
          type: 'gauge',
          axisLine: {
            lineStyle: {
              color: [
                [0.3, '#48A0C3'],
                [1, '#16406D']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          radius: '100%',
          axisTick: {
            show: false
          },
          data: [{
            value: 30

          }],
          title: {
            fontSize: 14
          },
          detail: {
            show: false,
            fontSize: 18,
            color: '#050101',
            formatter: '{value}%'
          }
        }]
      }
      option && progressCon.setOption(option)
    },
    showOption(type, datas) {
      const option = {
        series: [{
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          itemStyle: {
            normal: {
              color: '#1C4C7F'
            }
          },
          radius: '100%',
          progress: {
            show: true,
            overlap: false,
            roundCap: false,
            clip: false,
            itemStyle: {
              borderWidth: 1
            }
          },
          axisLine: {
            lineStyle: {
              width: 8,
              color: [
                [1, '#E5E2DE']
              ]
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: [{
            value: datas,
            detail: {
              offsetCenter: ['0%', '0%']
            }
          }],
          title: {
            fontSize: 14
          },
          detail: {
            fontSize: 18,
            color: '#050101',
            formatter: '{value}%'
          }
        }]
      }
      return option
    },
    // 改变年份
    yearChange(e) {
      if (e === 2021) {
        this.progressConBox(89) // 编制总进度
        this.completionRatioBox(89) // 完成项目占比
        this.expenditureBox(89) // 费用支出完成占比
      } else if (e === 2020) {
        this.progressConBox(70) // 编制总进度
        this.completionRatioBox(79) // 完成项目占比
        this.expenditureBox(70) // 费用支出完成占比
      } else {
        this.progressConBox(80) // 编制总进度
        this.completionRatioBox(70) // 完成项目占比
        this.expenditureBox(68) // 费用支出完成占比
      }
    },
    // 编制总进度
    progressConBox(num) {
      const that = this
      const progressConCon = echarts.init(document.getElementById('progressCon'))
      progressConCon.setOption(that.showOption('', num))
    },
    // 完成项目占比
    completionRatioBox(num) {
      const that = this
      const completionRatioCon = echarts.init(document.getElementById('completionRatio'))
      completionRatioCon.setOption(that.showOption('', num))
    },
    // 费用支出完成占比
    expenditureBox(num) {
      const that = this
      const expenditureCon = echarts.init(document.getElementById('expenditure'))
      expenditureCon.setOption(that.showOption('', num))
    },
    focusSelectValue() {
      console.log(this.$refs.optionItem)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
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
