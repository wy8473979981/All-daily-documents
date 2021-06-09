<template>
  <div class="app-page-main">
    <div class="budget-total">
      <div class="income">
        <el-select slot="prepend" v-model="select1" placeholder="请选择项目">
          <el-option v-for="(item, i) in list" :key="i" :value="item.name">
            {{ item.name }}
          </el-option>
        </el-select>
      </div>
      <div class="income">
        <el-select slot="prepend" v-model="select2" placeholder="版本号">
          <el-option v-for="(item, i) in list1" :key="i" :value="item.name">
            {{ item.name }}
          </el-option>
        </el-select>
      </div>
      <div class="income">
        <el-select slot="prepend" v-model="select3" placeholder="请选择类型">
          <el-option v-for="(item, i) in list2" :key="i" :value="item.name">
            {{ item.name }}
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="budget-table">
      <el-table
        :data="tableData"
        style="width: 100%; font-size: 10px"
        @sort-change="sort_change"
        :header-cell-style="rowClass"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序列"
          width="60px"

        />
        <el-table-column prop="name" label="项目" width="70" sortable>
          <template slot="header">
            <span>项目</span>
            <img
              v-if="lists.name == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="lists.name == 'descending'"
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
        <el-table-column
          prop="address"
          label="预算方案名称"
          width="250"
          sortable
        >
          <template slot="header">
            <span>预算方案名称</span>

            <img
              v-if="lists.address == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="lists.address == 'descending'"
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
        <el-table-column prop="address1" label="类型" width="80px" sortable>
          <template slot="header">
            <span>类型</span>

            <img
              v-if="lists.address1 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="lists.address1 == 'descending'"
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
        <el-table-column prop="address2" label="部门" sortable>
          <template slot="header">
            <span>部门</span>

            <img
              v-if="lists.address2 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="lists.address2 == 'descending'"
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
        <el-table-column prop="address3" label="版本号" sortable>
          <template slot="header">
            <span>版本号</span>

            <img
              v-if="lists.address3 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="lists.address3 == 'descending'"
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
        <el-table-column prop="address4" label="来源" sortable>
          <template slot="header">
            <span>来源</span>

            <img
              v-if="lists.address4 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="lists.address4 == 'descending'"
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
        <el-table-column prop="address5" label="审批状态" sortable>
          <template slot="header">
            <span>审批状态</span>

            <img
              v-if="lists.address5 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="lists.address5 == 'descending'"
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
        <el-table-column prop="address6" label="审核时间" width="180" sortable>
          <template slot="header">
            <span>审核时间</span>

            <img
              v-if="lists.address6 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="lists.address6 == 'descending'"
              src="@/assets/imges/19.png"
              width="20"
              alt=""
            />
            <img
              v-else
              src="@/assets/imges/16pt／排序@2x.png"
              width="20"
              alt=""
            /> </template
        ></el-table-column>
      </el-table>
    </div>
    <div>
      <Pagination />
    </div>
  </div>
</template>
<script>
import Pagination from "../../components/Pagination";
export default {
  name: "BudgetaApproval",
  components: { Pagination },
  data() {
    return {
      select1: "",
      lists: {},
      select2: "",
      select3: "",
      tableData: [
        {
          sequence: "1",
          name: "思睿",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address1: "收入",
          address2: "运营部",
          address3: "V1.0.1",
          address4: "调整",
          address5: "未提报",
        },
        {
          sequence: "2",
          name: "思睿",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address2: "运营部",
          address1: "收入",
          address3: "V1.0.1",
          address5: "已审核",
          address4: "调整",
          address6: "2021-10-18 09:32",
        },
        {
          sequence: "3",
          name: "思睿",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address2: "运营部",
          address3: "V1.0.1",
          address5: "审批中",
          address1: "收入",
          address4: "调整",
        },
        {
          sequence: "4",
          name: "思睿",
          address2: "运营部",
          address5: "未提报",
          address3: "V1.0.1",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address4: "调整",
          address1: "收入",
        },
        {
          sequence: "5",
          name: "思睿",
          address5: "未提报",
          address3: "V1.0.1",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address4: "调整",
          address2: "运营部",
          address1: "收入",
        },
        {
          address5: "未提报",
          sequence: "6",
          name: "思睿",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address4: "调整",
          address2: "运营部",
          address3: "V1.0.1",
          address1: "收入",
        },
        {
          address5: "未提报",
          sequence: "7",
          name: "思睿",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address4: "调整",
          address2: "运营部",
          address1: "收入",
          address3: "V1.0.1",
        },
        {
          sequence: "8",
          address5: "未提报",
          name: "思睿",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address4: "调整",
          address2: "运营部",
          address1: "收入",
          address3: "V1.0.1",
        },
        {
          sequence: "9",
          address5: "未提报",
          name: "思睿",
          address4: "调整",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address2: "运营部",
          address1: "收入",
          address3: "V1.0.1",
        },
        {
          sequence: "10",
          address5: "未提报",
          name: "思睿",
          address2: "运营部",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address4: "调整",
          address1: "收入",
          address3: "V1.0.1",
        },
        {
          address5: "未提报",
          sequence: "11",
          name: "思睿",
          address1: "收入",
          address4: "调整",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address2: "运营部",
          address3: "V1.0.1",
        },
        {
          sequence: "12",
          address5: "未提报",
          name: "思睿",
          address4: "调整",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address2: "运营部",
          address3: "V1.0.1",
          address1: "收入",
        },
        {
          address5: "未提报",
          sequence: "13",
          address4: "调整",
          name: "思睿",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address2: "运营部",
          address1: "收入",
          address3: "V1.0.1",
        },
        {
          sequence: "14",
          name: "思睿",
          address5: "未提报",
          address2: "运营部",
          address3: "V1.0.1",
          address1: "收入",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address4: "调整",
        },
        {
          address5: "未提报",
          sequence: "15",
          address3: "V1.0.1",
          name: "思睿",
          address2: "运营部",
          address4: "调整",
          address: "商业-上海区域-七宝年度预算-2022（经营期）",
          address1: "收入",
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
      list: [
        {
          name: "上海区域",
        },
        {
          name: "七宝",
        },
        {
          name: "奉贤",
        },
        {
          name: "宝山",
        },
        {
          name: "杭州区域",
        },
        {
          name: "萧山",
        },
        {
          name: "......",
        },
        {
          name: "上海城市公司",
        },
        {
          name: "华新",
        },
        {
          name: "青浦",
        },
        {
          name: "吴泾",
        },
        {
          name: "杭州城市公司",
        },
        {
          name: "萧山",
        },
        {
          name: "......",
        },
      ],
      list1: [
        {
          name: "版本号",
        },
      ],
      list2: [
        {
          name: "请选择类型",
        },
        {
          name: "收入",
        },
        {
          name: "费用",
        },
      ],
      value: "20条/页",
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (columnIndex === 8) {
        return "border-top-right-radius: 20px;border-bottom-right-radius: 20px;";
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, this.activeIndex);
      this.num = key;
    },
    sort_change(column, prop, order) {
      this.lists = {};
      const rops1 = column.prop;
      this.lists[rops1] = column.order;
      console.log(this.lists);
      console.log(column, "---", prop, order);
    },
    indexMethod(index) {
      return index + 1;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./budgetapp";
</style>
