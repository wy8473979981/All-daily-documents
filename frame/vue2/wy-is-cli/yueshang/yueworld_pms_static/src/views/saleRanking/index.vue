<template>
  <div class="app-page-main">
    <div class="ranking-data">
      <div class="data-bj">
        <p>累计客流</p>
        <div>63.58%</div>
      </div>
      <div class="data-bj">
        <p>客流密度</p>
        <div>63.58%</div>
      </div>
    </div>
    <div class="ranking-form">
      <div class="data-list">
        <div class="operate-wrap">
          <el-select
            v-model="value1"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择物业类型"
          >
            <el-option
              v-for="item in wuyeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="value2" placeholder="请选择区域/城市">
            <el-option
              v-for="item in areaList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="value3"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择业务"
          >
            <el-option
              v-for="item in yewuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-model="monthValue"
            style="width: 200px"
            type="monthrange"
            range-separator="~"
            :clearable="false"
            format="yyyy年MM月"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          />
          <button class="blue-btn" @click="search">查询</button>
          <button class="reset-btn" @click="reset">重置</button>
          <button class="blue-btn" style="float: right; margin-right: 0">
            导出
          </button>
        </div>
      </div>
    </div>
    <div class="ranking-echarts">
      <div class="echarts">
        <attractEchartsFirst />
      </div>
    </div>
    <div class="ranking-table">
      <el-table
        ref="experienceInfoTable"
        :data="tableData"
        :cell-class-name="hangStyle"
        style="width: 100%; font-size: 10px"
        @sort-change="changeTableSort"
      >
        <el-table-column type="index" :index="indexMethod" label="排名" />
        <el-table-column prop="name" label="项目" sortable>
          <template #header>
            <div class="solt-icon">
              <span>项目</span>
              <img
                v-if="list.name === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.name === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pingxiao" sortable label="日均平效" width="110">
          <template #header>
            <div class="solt-icon">
              <span>日均平效</span>
              <img
                v-if="list.pingxiao === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.pingxiao === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="zushoubi" sortable label="租售比" width="100">
          <template #header>
            <div class="solt-icon">
              <span>租售比</span>
              <img
                v-if="list.zushoubi === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.zushoubi === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="zushoue"
          sortable
          label="租售额(万元)"
          width="130"
        >
          <template #header>
            <div class="solt-icon">
              <span>租售额(万元)</span>
              <img
                v-if="list.zushoue === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.zushoue === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="nextleiji"
          sortable
          label="去年累计(万元)"
          width="150"
        >
          <template #header>
            <div class="solt-icon">
              <span>去年累计(万元)</span>
              <img
                v-if="list.nextleiji === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.nextleiji === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="tongbinext"
          sortable
          label="同比去年(万元)"
          width="140"
        >
          <template #header>
            <div class="solt-icon">
              <span>同比去年(万元)</span>
              <img
                v-if="list.tongbinext === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.tongbinext === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="daysale"
          sortable
          label="日均销售(万元)"
          width="140"
        >
          <template #header>
            <div class="solt-icon">
              <span>日均销售(万元)</span>
              <img
                v-if="list.daysale === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.daysale === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="dayzhibiao"
          sortable
          label="日均指标 "
          width="120"
        >
          <template #header>
            <div class="solt-icon">
              <span>日均指标</span>
              <img
                v-if="list.dayzhibiao === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.dayzhibiao === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dacheng" sortable label="达成率" width="90">
          <template #header>
            <div class="solt-icon">
              <span>达成率</span>
              <img
                v-if="list.dacheng === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.dacheng === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="gongzuoday"
          sortable
          label="工作日日均(万元)"
          width="150"
        >
          <template #header>
            <div class="solt-icon">
              <span>工作日日均(万元)</span>
              <img
                v-if="list.gongzuoday === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.gongzuoday === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="weekday"
          sortable
          label="周末日均(万元)"
          width="140"
        >
          <template #header>
            <div class="solt-icon">
              <span>周末日均(万元)</span>
              <img
                v-if="list.weekday === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="list.weekday === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination />
  </div>
</template>
<script>
import attractEchartsFirst from './averageEcharts'

export default {
  name: 'SaleRanking',
  components: {
    attractEchartsFirst
  },
  props: {},
  data() {
    return {
      select: '',
      monthValue: '',
      wuyeList: [
        {
          value: '选项1',
          label: '购物中心'
        },
        {
          value: '选项2',
          label: '商业街'
        },
        {
          value: '选项3',
          label: '轻资产'
        }
      ],
      yewuList: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '超市'
        },
        {
          value: '选项3',
          label: '文化教育'
        }
      ],
      areaList: [
        {
          value: '选项1',
          label: '上海区域'
        },
        {
          value: '选项2',
          label: '华南区域'
        },
        {
          value: '选项3',
          label: '东北区域'
        },
        {
          value: '选项4',
          label: '西北区域'
        },
        {
          value: '选项5',
          label: '华北区域'
        },
        {
          value: '选项6',
          label: '华东区域'
        },
        {
          value: '选项7',
          label: '西南区域'
        }
      ],
      tableData: [
        {
          name: '汇总',
          pingxiao: '86.00',
          zushoubi: '86.00%',
          zushoue: '216.20',
          nextleiji: '216.20',
          tongbinext: '86.00',
          daysale: '216.20',
          dayzhibiao: '0.00',
          dacheng: '-',
          gongzuoday: '86.00',
          weekday: '156.34'
        },
        {
          name: '杭州富阳',
          pingxiao: '86.00',
          zushoubi: '86.00%',
          zushoue: '216.20',
          nextleiji: '216.20',
          tongbinext: '86.00',
          daysale: '216.20',
          dayzhibiao: '0.00',
          dacheng: '-',
          gongzuoday: '86.00',
          weekday: '86.00'
        },
        {
          name: '杭州富阳',
          pingxiao: '86.00',
          zushoubi: '86.00%',
          zushoue: '2',
          nextleiji: '216.20',
          tongbinext: '86.00',
          daysale: '216.20',
          dayzhibiao: '0.00',
          dacheng: '-',
          gongzuoday: '86.00',
          weekday: '86.00'
        },
        {
          name: '杭州富阳',
          pingxiao: '86.00',
          zushoubi: '86.00%',
          zushoue: '3',
          nextleiji: '216.20',
          tongbinext: '86.00',
          daysale: '216.20',
          dayzhibiao: '0.00',
          dacheng: '-',
          gongzuoday: '86.00',
          weekday: '86.00'
        },
        {
          name: '杭州富阳',
          pingxiao: '86.00',
          zushoubi: '86.00%',
          zushoue: '4',
          nextleiji: '216.20',
          tongbinext: '86.00',
          daysale: '216.20',
          dayzhibiao: '0.00',
          dacheng: '-',
          gongzuoday: '86.00',
          weekday: '86.00'
        },
        {
          name: '杭州富阳',
          pingxiao: '86.00',
          zushoubi: '86.00%',
          zushoue: '5',
          nextleiji: '216.20',
          tongbinext: '86.00',
          daysale: '216.20',
          dayzhibiao: '0.00',
          dacheng: '-',
          gongzuoday: '86.00',
          weekday: '86.00'
        },
        {
          name: '杭州富阳',
          pingxiao: '86.00',
          zushoubi: '86.00%',
          zushoue: '6',
          nextleiji: '216.20',
          tongbinext: '86.00',
          daysale: '216.20',
          dayzhibiao: '0.00',
          dacheng: '-',
          gongzuoday: '86.00',
          weekday: '86.00'
        },
        {
          name: '杭州富阳',
          pingxiao: '86.00',
          zushoubi: '86.00%',
          zushoue: '7',
          nextleiji: '216.20',
          tongbinext: '86.00',
          daysale: '216.20',
          dayzhibiao: '0.00',
          dacheng: '-',
          gongzuoday: '86.00',
          weekday: '86.00'
        }
      ],

      value1: '',
      value2: '',
      value3: '',
      tableDataCopy: null,
      optionPages: [''],

      searchText: '',
      chooseArray: [],

      list: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    hangStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'firsthang'
      }
      if (columnIndex === 1) {
        return 'secondhang'
      }
    },
    // 搜索
    search() {
      this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData))
      this.tableData.splice(3)
    },
    // 重置
    reset() {
      this.value1 = ''
      this.value2 = ''
      this.value3 = ''
      this.monthValue = ''
      this.tableData = this.tableDataCopy
    },
    indexMethod(index) {
      if (index !== 0) {
        return index
      }
    },
    changeTableSort(column, prop, order) {
      const orderGroup = []
      const fieldName = column.prop
      const sortingType = column.order
      this.tableData.map(item => {
        orderGroup.push(item)
      })
      console.log(orderGroup, column)
      // 降序排序
      if (sortingType === 'descending') {
        console.log(orderGroup)
        this.tableData = orderGroup.sort((a, b) => {
          console.log(a.name, '======================')
          let aVal = a[fieldName]
          let bVal = b[fieldName]
          // 令中心总体所在行指标值最大
          if (a.name === '汇总') {
            aVal = 9999999999
          }
          if (b.name === '汇总') {
            bVal = 9999999999
          }
          return bVal - aVal
        })
      } else if (sortingType === 'ascending') {
        // 升序排序
        this.tableData = orderGroup.sort((a, b) => {
          console.log(a.name, '======================')
          let aVal = a[fieldName]
          let bVal = b[fieldName]
          if (a.name === '汇总') {
            aVal = -2
          }
          if (b.name === '汇总') {
            bVal = -2
          }
          return aVal - bVal
        })
      } else {
        this.$refs.experienceInfoTable.clearSort() // 清除排序
      }
    },
    changeTableSor1t(column) {
      this.list = {}
      const rops1 = column.prop
      this.list[rops1] = column.order
      const fieldName = column.prop
      const sortingType = column.order
      let tableData = this.tableData

      let sumData = {} // 放置总计一行数据
      tableData.map((item) => {
        console.log(item.name)
        if (item.name === '汇总') {
          sumData = item
        }
      })
      if (sortingType === 'ascending') {
        // 正序
        tableData = tableData.sort(
          (a, b) => parseInt(b[fieldName]) - parseInt(a[fieldName])
        )
        tableData.forEach((item, index) => {
          if (item.name === '汇总') {
            tableData.splice(index, 1)
          }
          return item
        })
        tableData.unshift(sumData)
      } else if (sortingType === 'descending') {
        // 倒序
        tableData = tableData.sort(
          (a, b) => parseInt(a[fieldName]) - parseInt(b[fieldName])
        )
        tableData.map((item, index) => {
          if (item.name === '汇总') {
            tableData.splice(index, 1)
          }
          return item
        })
        tableData.unshift(sumData)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
