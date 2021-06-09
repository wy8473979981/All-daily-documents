<template>
  <div class="app-page-main">
    <div class="ranking-data">
      <div class="data-bj">
        <p>全部开业率</p>
        <div>63.58%</div>
      </div>
      <div class="data-bj">
        <p>考核开业率</p>
        <div>63.58%</div>
      </div>
      <div class="xian" />

      <div class="data-bj">
        <p>全部出租率</p>
        <div>63.58%</div>
      </div>
      <div class="data-bj">
        <p>考核出租率</p>
        <div>63.58%</div>
      </div>
      <div class="xian" />

      <div class="data-bj">
        <p>平均租金(元/㎡)</p>
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
          <el-date-picker
            v-model="monthValue"
            type="monthrange"
            range-separator="~"
            :clearable="false"
            format="yyyy年MM月"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          />
          <button class="blue-btn" @click="search">查询</button>
          <button class="reset-btn" @click="reset">重置</button>
          <button class="blue-btn" style="float: right">导出</button>
        </div>
      </div>
    </div>
    <div class="ranking-echarts">
      <attractEcharts />
    </div>
    <div class="ranking-table">
      <el-table
        :data="tableData"
        :cell-class-name="hangStyle"
        style="width: 100%; font-size: 10px"
        @sort-change="changeTableSort"
      >
        <el-table-column type="index" :index="indexMethod" label="排名" />
        <el-table-column prop="name" label="项目" width="140px" />
        <el-table-column
          prop="jizu"
          sortable="custom"
          label="计租面积(㎡)"
          width="130px"
        >
          <template slot="header">
            <span>计租面积(㎡)</span>
            <img
              v-if="lists.jizu == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.jizu == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="kaohe"
          sortable="custom"
          label="考核面积(㎡)"
          width="130px"
        >
          <template slot="header">
            <span>考核面积(㎡)</span>
            <img
              v-if="lists.kaohe == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.kaohe == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="quankai"
          sortable="custom"
          label="全部开业率"
          width="150px"
        >
          <template slot="header">
            <span>全部开业率</span>
            <img
              v-if="lists.quankai == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.quankai == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="kaokai"
          sortable="custom"
          label="考核开业率"
          width="150"
        >
          <template slot="header">
            <span>考核开业率</span>
            <img
              v-if="lists.kaokai == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.kaokai == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="quanchu"
          sortable="custom"
          label="全部出租率"
          width="150"
        >
          <template slot="header">
            <span>全部出租率</span>
            <img
              v-if="lists.quanchu == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.quanchu == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="kaochu"
          sortable="custom"
          label="考核出租率"
          width="150"
        >
          <template slot="header">
            <span>考核出租率</span>
            <img
              v-if="lists.kaochu == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.kaochu == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="pingzum"
          sortable="custom"
          label="平均租金(元/㎡)"
          width="180"
        >
          <template slot="header">
            <span>平均租金(元/㎡)</span>
            <img
              v-if="lists.pingzum == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.pingzum == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="pingzufdian"
          sortable="custom"
          label="平均租金(主力店)"
          width="180"
        >
          <template slot="header">
            <span>平均租金(主力店)</span>
            <img
              v-if="lists.pingzufdian == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.pingzufdian == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="pingzudian"
          sortable="custom"
          label="平均租金(非主力店)"
          width="180"
        >
          <template slot="header">
            <span>平均租金(非主力店)</span>
            <img
              v-if="lists.pingzudian == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.pingzudian == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            >
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 8px">
      <Pagination />
    </div>
  </div>
</template>
<script>
import attractEcharts from './components/investmentEcharts'
export default {
  name: 'InvestmentPromotionRanking',
  components: {
    attractEcharts
  },
  props: {},
  data() {
    return {
      select: '',
      monthValue: '',
      tableDataCopy: null,
      lists: {},

      tableData: [
        {
          name: '汇总',
          jizu: '248,989.53',
          kaohe: '201,681.52',
          quankai: '73.32%',
          kaokai: '85.58%',
          quanchu: '84.72%',
          kaochu: '86.58%',
          pingzum: '86.58',
          pingzufdian: '84.26',
          pingzudian: '84.26'
        },
        {
          sequence: '1',
          name: '上海青浦广场阳',
          jizu: '10,850.25',
          kaohe: '9,765.23',
          quankai: '93.12%',
          kaokai: '86.13%',
          quanchu: '83.88%',
          kaochu: '82.07%',
          pingzum: '45.44',
          pingzufdian: '43.12',
          pingzudian: '47.88'
        },
        {
          sequence: '2',
          name: '上海七宝宝龙广场',
          jizu: '53,879.38',
          kaohe: '48,491.44',
          quankai: '86.13%',
          kaokai: '76.59%',
          quanchu: '76.34%',
          kaochu: '67.39%',
          pingzum: '73.95',
          pingzufdian: '70.21',
          pingzudian: '76.32'
        },
        {
          sequence: '3',
          name: '上海宝山宝杨',
          jizu: '72,391.03',
          kaohe: '65,151.93',
          quankai: '76.89%',
          kaokai: '93.12%',
          quanchu: '97.80%',
          kaochu: '94.90%',
          pingzum: '44.55',
          pingzufdian: '41.27',
          pingzudian: '46.87'
        },
        {
          sequence: '4',
          name: '成都宝龙广场',
          jizu: '51,287.47',
          kaohe: '46,158.72',
          quankai: '76.74%',
          kaokai: '76.74%',
          quanchu: '70.05%',
          kaochu: '70.05%',
          pingzum: '108.37',
          pingzufdian: '105.67',
          pingzudian: '110.87'
        },
        {
          sequence: '5',
          name: '珠海宝龙广场',
          jizu: '32,807.38',
          kaohe: '29,526.64',
          quankai: '71.07%',
          kaokai: '71.07%',
          quanchu: '85.78%',
          kaochu: '85.78%',
          pingzum: '125.77',
          pingzufdian: '122.23',
          pingzudian: '128.78'
        },
        {
          sequence: '6',
          name: '青岛宝龙广场',
          jizu: '27,774.02',
          kaohe: '24,996.62',
          quankai: '24.03.%',
          kaokai: '84.03.%',
          quanchu: '81.62.%',
          kaochu: '77.73%',
          pingzum: '131.77',
          pingzufdian: '126.65',
          pingzudian: '133.89'
        }
      ],
      wuyeList: [
        {
          value: '选项1',
          label: '购物街'
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
      value1: '',
      value2: '',
      optionPages: [''],

      searchText: '',
      chooseArray: []
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
    indexMethod(index) {
      if (index !== 0) {
        return index
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
      this.monthValue = ''
      this.tableData = this.tableDataCopy
    },
    changeTableSort(column) {
      this.lists = {}
      const rops1 = column.prop
      this.lists[rops1] = column.order
      const fieldName = column.prop
      const sortingType = column.order
      let tableData = this.tableData
      let sumData = {} // 放置总计一行数据
      tableData.map((item) => {
        if (item.name === '汇总') {
          sumData = item
        }
      })
      console.log(sumData)
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
