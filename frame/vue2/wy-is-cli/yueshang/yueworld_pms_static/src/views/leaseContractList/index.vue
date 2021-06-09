<template>
  <div class="app-page-main">
    <div class="ranking-form">
      <div class="data-list">
        <div class="operate-wrap">
          <el-input
            v-model="select"
            prefix-icon="el-icon-search"
            class="elinput"
            placeholder="请输入意向编号等信息"
          />
          <el-select v-model="value" placeholder="所有项目">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <button class="blue-btn" @click="search">搜索</button>
          <!-- <button class="highsearch">
            <span>高级搜索</span>
            <i class="el-icon-caret-bottom"></i>
          </button> -->
          <button class="reset-btn" @click="reset">重置</button>
        </div>

        <div class="btn">
          <button class="see">意向转租聘</button>
          <button class="upload">续租</button>
          <button class="add">新增租赁合同</button>
        </div>
      </div>
    </div>

    <div class="ranking-table">
      <transition name="el-zoom-in-top">
        <el-table
          :data="tableData"
          :cell-class-name="hangStyle"
          style="width: 100%; font-size: 10px"
          @sort-change="sort_change"
          :header-cell-style="rowClass"
        >
          <el-table-column type="selection" align="center" width="55" />
          <el-table-column label="序列" type="index" :index="indexMethod" width="60" />
          <el-table-column prop="num" sortable label="合同编号">
            <template slot="header">
              <span>方案编号</span>
              <img
                v-if="lists.num == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              />
              <img
                v-else-if="lists.num == 'descending'"
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
          <el-table-column prop="shihe" sortable label="项目名称">
            <template slot="header">
              <span>方案编号</span>
              <img
                v-if="lists.shihe == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              />
              <img
                v-else-if="lists.shihe == 'descending'"
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
          <el-table-column prop="name" sortable label="合同名称">
            <template slot="header">
              <span>方案编号</span>
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
          <el-table-column prop="feiyong" sortable label="商家名称">
            <template slot="header">
              <span>方案编号</span>
              <img
                v-if="lists.feiyong == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              />
              <img
                v-else-if="lists.feiyong == 'descending'"
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
          <el-table-column prop="type" sortable label="品牌名">
            <template slot="header">
              <span>方案编号</span>
              <img
                v-if="lists.type == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              />
              <img
                v-else-if="lists.type == 'descending'"
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
          <el-table-column prop="status" sortable label="状态">
            <template slot="header">
              <span>方案编号</span>
              <img
                v-if="lists.status == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              />
              <img
                v-else-if="lists.status == 'descending'"
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
        </el-table>
      </transition>
    </div>
    <transition name="el-zoom-in-top">
      <div>
        <Pagination />
      </div>
    </transition>
  </div>
</template>
<script>
import Pagination from "../../components/Pagination";
export default {
  name: "GroupingScheme",
  components: { Pagination },
  props: {},
  data() {
    return {
      select: "",
      monthValue: "",
      activeFlag: 0,
      lists: {},
      options: [
        {
          value: "选项1",
          label: "项目1",
        },
        {
          value: "选项2",
          label: "项目2",
        },
        {
          value: "选项3",
          label: "项目3",
        },
      ],
      tableData: [
        {
          sequence: "1",
          num: "cimi2021",
          shihe: "测试项目",
          name: "全量测量合同",
          feiyong: "0212品牌",
          status: "全家",
          type: "审批通过",
        },
        {
          sequence: "2",
          num: "cimi2021",
          shihe: "测试项目",
          name: "全量测量合同",
          feiyong: "0212品牌",
          status: "全家",
          type: "审批通过",
        },
        {
          sequence: "3",
          num: "cimi2021",
          shihe: "测试项目",
          name: "全量测量合同",
          feiyong: "0212品牌",
          status: "全家",
          type: "审批通过",
        },
        {
          sequence: "4",
          num: "cimi2021",
          shihe: "测试项目",
          name: "全量测量合同",
          feiyong: "0212品牌",
          status: "全家",
          type: "审批通过",
        },
        {
          sequence: "5",
          num: "cimi2021",
          shihe: "测试项目",
          name: "全量测量合同",
          feiyong: "0212品牌",
          status: "全家",
          type: "审批通过",
        },
        {
          sequence: "6",
          num: "cimi2021",
          shihe: "测试项目",
          name: "全量测量合同",
          feiyong: "0212品牌",
          status: "全家",
          type: "审批通过",
        },
        {
          sequence: "7",
          num: "cimi2021",
          shihe: "测试项目",
          name: "全量测量合同",
          feiyong: "0212品牌",
          status: "全家",
          type: "审批通过",
        },
        {
          sequence: "8",
          num: "cimi2021",
          shihe: "测试项目",
          name: "全量测量合同",
          feiyong: "0212品牌",
          status: "全家",
          type: "审批通过",
        },
        {
          sequence: "9",
          num: "cimi2021",
          shihe: "测试项目",
          name: "全量测量合同",
          feiyong: "0212品牌",
          status: "全家",
          type: "审批通过",
        },
        {
          sequence: "10",
          num: "cimi2021",
          shihe: "测试项目",
          name: "全量测量合同",
          feiyong: "0212品牌",
          status: "全家",
          type: "审批通过",
        },
      ],
      xinagmuList: [
        {
          value: "选项1",
          label: "项目1",
        },
        {
          value: "选项2",
          label: "项目2",
        },
        {
          value: "选项3",
          label: "项目3",
        },
        {
          value: "选项4",
          label: "项目4",
        },
      ],
      puweiList: [
        {
          value: "选项1",
          label: "商铺",
        },
        {
          value: "选项2",
          label: "多径",
        },
      ],
      statueiList: [
        {
          value: "选项1",
          label: "正常",
        },
        {
          value: "选项2",
          label: "失效",
        },
      ],
      value: "",
      tableDataCopy: null,
      optionPages: [""],

      searchText: "",
      chooseArray: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (columnIndex === 7) {
        return "border-bottom-right-radius: 20px;border-top-right-radius: 20px;";
      }
    },
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
      this.tableData.splice(8);
    },
    // 重置
    reset() {
      this.value = "";
      this.select = "";
      this.tableData = this.tableDataCopy;
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
@import "./index.scss";
</style>
