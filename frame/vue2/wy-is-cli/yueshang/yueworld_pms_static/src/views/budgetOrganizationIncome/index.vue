<template>
  <div class="app-page-main">
    <div class="budget-total">
      <div class="income">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1" :class="[this.num == 1 ? 'boldsize' : '']"
            >收入</el-menu-item
          >
          <el-menu-item index="2" :class="[this.num == 2 ? 'boldsize' : '']"
            >费用支出</el-menu-item
          >
          <el-menu-item index="3" :class="[this.num == 3 ? 'boldsize' : '']"
            >汇总</el-menu-item
          >
        </el-menu>
      </div>
      <div class="budget">
        <span>提交审批</span>
      </div>
    </div>
    <div v-if="this.num == 1" class="budget-table">
      <el-table
        :data="tableData"
        style="width: 100%; font-size: 10px"
        :default-sort="{ prop: 'data', order: 'descending' }"
        @sort-change="sort_change"
        :header-cell-style="rowClass"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          prop="data"
          label="序列"
          type="index"
          :index="indexMethod"
        />
        <el-table-column prop="name" label="主要部门" sortable>
          <template slot="header">
            <span>主要部门</span>

            <img
              v-if="list.name == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="list.name == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            />
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column prop="address1" label="收入表" sortable>
          <template slot="header">
            <span>收入表</span>
            <img
              v-if="list.address1 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="list.address1 == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            />
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column prop="address2" label="状态" sortable>
          <template slot="header">
            <span>状态</span>
            <img
              v-if="list.address2 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="list.address2 == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            />
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column prop="address3" label="最后编辑人" sortable>
          <template slot="header">
            <span>最后编辑人</span>
            <img
              v-if="list.address3 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="list.address3 == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            />
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column prop="address4" label="操作"
          ><p>详情</p></el-table-column
        >
      </el-table>
    </div>
    <div v-if="this.num == 1">
      <Pagination />
    </div>
    <Expenses v-if="this.num == 2" />
    <Summary v-if="this.num == 3" />
  </div>
</template>
<script>
import Expenses from "./expenses"; // 费用支出
import Summary from "./summary"; // 汇总
import Pagination from "../../components/Pagination";
export default {
  name: "BudgetOrganizationIncome",
  components: { Expenses, Summary, Pagination },
  data() {
    return {
      select: "",
      activeIndex: "1",
      boldsize: "boldsize",
      num: 1,
      num1: "",
      num2: "",
      show: true,
      show1: false,
      show2: false,
      list: {},
      tableData: [
        {
          name: "cimi2022",
          address1: "物管费收入-住宅",
          address2: "编制中",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "物管费收入-住宅",
          address2: "编制中",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "物管费收入-住宅",
          address2: "审批成功",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "物管费收入-写字楼",
          address2: "审批成功",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "联营收支明细",
          address2: "已提交",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "租费明细（清欠）",
          address2: "已提交",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "多经收入-住宅",
          address2: "审批成功 ",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "多经收入-写字楼",
          address2: "审批成功 ",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          data: "9",
          name: "cimi2022",
          address1: "物管费收入-住宅",
          address2: "审批成功 ",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "物管费收入-住宅",
          address2: "已提交",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "停车场场收入",
          address2: "审批成功",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "其他业务类型收入",
          address2: "审批成功",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "其他收入",
          address2: "审批成功",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "其他收入",
          address2: "审批成功",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
        {
          name: "cimi2022",
          address1: "其他收入",
          address2: "审批成功",
          address3: "张三",
          address4: "2020-10-18 09:32",
        },
      ],
      optionlist: [
        {
          num: "第一页",
        },
        {
          num: "第二页",
        },
        {
          num: "第三页",
        },
        {
          num: "第四页",
        },
        {
          num: "第五页",
        },
        {
          num: "第六页",
        },
        {
          num: "第七页",
        },
      ],
      value: "第一页",
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (columnIndex === 6) {
        return "border-top-right-radius: 20px;border-bottom-right-radius: 20px;";
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, this.activeIndex);
      this.num = key;
    },
    indexMethod(index) {
      return index + 1;
    },
    sort_change(column, prop, order) {
      this.list = {};
      const rops1 = column.prop;
      this.list[rops1] = column.order;
      console.log(column.order);
      console.log(column, "---", prop, order);
    },
    sortFun: function (attr, rev) {
      console.log(rev);
      // 第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      return function (a, b) {
        console.log(a, b);
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./income.scss";
</style>
