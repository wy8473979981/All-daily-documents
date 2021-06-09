<template>
  <div class="app-page-main">
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
            >
            </el-option>
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
            style="width: 240px"
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
      <div style="margin-right: 160px">
        <div class="ttitle">
          <p>租约到期(3月内)</p>
          <div class="afterborder" />
          <div class="beforeborder" />
        </div>
        <div class="titleecharts">
          <div class="titleechartsbj">
            <div class="echartshead">租户:594</div>
            <div class="echarts">
              <attractEchartsFirst />
            </div>
            <p>到期品牌</p>
            <p>占比(3月内)</p>
          </div>

          <div class="titleechartsbj">
            <div class="echartshead">面积:39229.18m²</div>
            <div class="echarts">
              <attractEchartsSecond />
            </div>
            <p>到期品牌</p>
            <p>占比(3月内)</p>
          </div>
        </div>
      </div>

      <div>
        <div class="ttitle">
          <p>押不抵租</p>
          <div class="afterborder" />
          <div class="beforeborder" />
        </div>
        <div class="titleecharts">
          <div class="titleechartsbj">
            <div class="echartshead" style="color: #6f120c">
              累计差额:-11711.84
            </div>
            <div class="echarts">
              <attractEchartsThird />
            </div>
            <p>租不抵押</p>
            <p>品牌数占比</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking-table">
      <el-table
        :data="tableData"
        :cell-class-name="hangStyle"
        style="width: 100%; font-size: 10px"
        @sort-change="changeTableSort"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序列"
          width="50"
        />
        <el-table-column prop="name" label="项目" />

        <el-table-column align="center" label="到期品牌数量">
          <template #header>
            <div class="solt-icon">
              <span>到期品牌数量 K</span>
            </div>
          </template>
          <el-table-column prop="other" sortable="custom" label="3月内">
            <template #header>
              <div class="solt-icon">
                <span>3月内</span>
                <img
                  v-if="list.other === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else-if="list.other === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" sortable="custom" label="3~6月">
            <template #header>
              <div class="solt-icon">
                <span>3~6月</span>
                <img
                  v-if="list.address === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else-if="list.address === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                />
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" label="到期面积">
          <template #header>
            <div class="solt-icon">
              <span>到期面积 K</span>
            </div>
          </template>
          <el-table-column prop="address1" sortable="custom" label="3月内">
            <template #header>
              <div class="solt-icon">
                <span>3月内</span>
                <img
                  v-if="list.address1 === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else-if="list.address1 === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address2" sortable="custom" label="3~6月">
            <template #header>
              <div class="solt-icon">
                <span>3~6月</span>
                <img
                  v-if="list.address2 === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else-if="list.address2 === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                />
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column
          prop="address3"
          sortable="custom"
          label="押不抵押商户数占比(权责)"
          width="215"
        >
          <template #header>
            <div class="solt-icon">
              <span>押不抵押 商户数占比(权责)</span>
              <img
                v-if="list.address3 === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              />
              <img
                v-else-if="list.address3 === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              />
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address4"
          sortable="custom"
          label="押不抵押累计差额(权责)"
          width="215"
        >
          <template #header>
            <div class="solt-icon">
              <span>押不抵租 累计差额(万元)</span>
              <img
                v-if="list.address4 === 'ascending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              />
              <img
                v-else-if="list.address4 === 'descending'"
                style="margin-bottom: -5px"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              />
              <img
                v-else
                style="margin-bottom: -5px"
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging">
      <div class="paging-data">
        <p>共5条数据，当前在1/1页</p>
      </div>
      <div class="paging-option">
        <el-pagination
          layout="prev, pager, next,sizes"
          :page-sizes="[20, 40, 60, 80]"
          :total="5"
        />
      </div>
    </div>
  </div>
</template>
<script>
import attractEchartsFirst from "./brandEcharts";
import attractEchartsSecond from "./areaEcharts";
import attractEchartsThird from "./mortgageEcharts";
export default {
  name: "SaleRanking",
  components: {
    attractEchartsFirst,
    attractEchartsSecond,
    attractEchartsThird,
  },
  props: {},
  data() {
    return {
      select: "",
      monthValue: "",
      wuyeList: [
        {
          value: "选项1",
          label: "购物街",
        },
        {
          value: "选项2",
          label: "商业街",
        },
        {
          value: "选项3",
          label: "轻资产",
        },
      ],
      areaList: [
        {
          value: "选项1",
          label: "上海区域",
        },
        {
          value: "选项2",
          label: "华南区域",
        },
        {
          value: "选项3",
          label: "东北区域",
        },
        {
          value: "选项4",
          label: "西北区域",
        },
        {
          value: "选项5",
          label: "华北区域",
        },
        {
          value: "选项6",
          label: "华东区域",
        },
        {
          value: "选项7",
          label: "西南区域",
        },
      ],
      tableData: [
        {
          name: "汇总",
          address: "86.00%",
          address1: "86.00%",
          address2: "86.00%",
          address3: "86.00%",
          address4: "86.00%",
          other: "86.00%",
        },
        {
          sequence: "1",
          name: "杭州富阳",
          address: "86.00%",
          address1: "86.00%",
          address2: "86.00%",
          address3: "86.00%",
          address4: "86.00%",
          other: "28.57%",
        },
        {
          sequence: "2",
          name: "杭州富阳",
          address: "86.00%",
          address1: "86.00%",
          address2: "86.00%",
          address3: "86.00%",
          address4: "86.00%",
          other: "28.57%",
        },
        {
          sequence: "3",
          name: "杭州富阳",
          address: "86.00%",
          address1: "86.00%",
          address2: "86.00%",
          address3: "86.00%",
          address4: "86.00%",
          other: "28.57%",
        },
        {
          sequence: "4",
          name: "杭州富阳",
          address: "86.00%",
          address1: "86.00%",
          address2: "86.00%",
          address3: "86.00%",
          address4: "86.00%",
          other: "28.57%",
        },
        {
          sequence: "5",
          name: "杭州富阳",
          address: "86.00%",
          address1: "86.00%",
          address2: "86.00%",
          address3: "86.00%",
          address4: "86.00%",
          other: "28.37%",
        },
        {
          sequence: "6",
          name: "杭州富阳",
          address: "86.00%",
          address1: "86.00%",
          address2: "86.00%",
          address3: "86.00%",
          address4: "86.00%",
          other: "28.57%",
        },
        {
          sequence: "7",
          name: "杭州富阳",
          address: "86.00%",
          address1: "86.00%",
          address2: "86.00%",
          address3: "86.00%",
          address4: "86.00%",
          other: "38.57%",
        },
        {
          sequence: "8",
          name: "杭州富阳",
          address: "86.00%",
          address1: "86.00%",
          address2: "86.00%",
          address3: "86.00%",
          address4: "86.00%",
          other: "48.57%",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: "",
      value2: "",
      tableDataCopy: null,
      optionPages: [""],

      searchText: "",
      chooseArray: [],

      list: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    hangStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "firsthang";
      }
      if (columnIndex === 1) {
        return "secondhang";
      }
    },

    search() {
      this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData));
      this.tableData.splice(4);
    },
    // 重置
    reset() {
      this.value1 = "";
      this.value2 = "";
      this.monthValue = "";
      this.tableData = this.tableDataCopy;
    },
    indexMethod(index) {
      return index + 1;
    },
    changeTableSort(column) {
      this.list = {};
      const rops1 = column.prop;
      this.list[rops1] = column.order;
      const fieldName = column.prop;
      const sortingType = column.order;
      let tableData = this.tableData;
      let sumData = {}; // 放置总计一行数据
      tableData.map((item) => {
        if (item.name === "汇总") {
          sumData = item;
        }
      });
      if (sortingType === "ascending") {
        // 正序
        tableData = tableData.sort(
          (a, b) => parseInt(b[fieldName]) - parseInt(a[fieldName])
        );
        tableData.forEach((item, index) => {
          if (item.name === "汇总") {
            tableData.splice(index, 1);
          }
          return item;
        });
        tableData.unshift(sumData);
      } else if (sortingType === "descending") {
        // 倒序
        tableData = tableData.sort(
          (a, b) => parseInt(a[fieldName]) - parseInt(b[fieldName])
        );
        tableData.map((item, index) => {
          if (item.name === "汇总") {
            tableData.splice(index, 1);
          }
          return item;
        });
        tableData.unshift(sumData);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
