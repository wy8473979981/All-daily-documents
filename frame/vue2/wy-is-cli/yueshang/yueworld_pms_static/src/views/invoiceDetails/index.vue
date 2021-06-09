<template>
  <div class="app-page-main">
    <div class="ranking-infor">
      <div class="inforhead">
        <p>基础信息</p>
        <div class="xian" />
      </div>
      <transition name="el-zoom-in-top">
        <div v-if="inforFlag" class="zhubj">
          <div class="every">
            <p>项目名称</p>
            <p>上海项目</p>
          </div>
          <div class="every">
            <p>发票编号</p>
            <p>FP-CDFHTQYI-000002</p>
          </div>
          <div class="every">
            <p>发票编码</p>
            <p>2101062250242512580</p>
          </div>
          <div class="every">
            <p>发票类型</p>
            <p>电子发票</p>
          </div>
          <div class="every">
            <p>发票日期</p>
            <p>2021-01-06</p>
          </div>
          <div class="every">
            <p>发票状态</p>
            <p>已上传</p>
          </div>
          <div class="every">
            <p>发票金额</p>
            <p>1,433.34</p>
          </div>
          <div class="every">
            <p>不含税金额</p>
            <p>1,234.56</p>
          </div>
          <div class="every">
            <p>税额</p>
            <p>68.25</p>
          </div>
          <div class="every">
            <p>购买方</p>
            <p>上海一二三四公司</p>
          </div>
          <div class="every">
            <p>销售方</p>
            <p>上海一二三四公司</p>
          </div>
          <div class="every">
            <p>备注</p>
            <p>信息服务费</p>
          </div>
        </div>
      </transition>
    </div>

    <div class="ranking-table">
      <div class="inforhead">
        <p>发票明细</p>

        <div class="xian" />
      </div>
      <transition name="el-zoom-in-top">
        <el-table
          v-if="tableShow"
          :data="tableData"
          :cell-class-name="hangStyle"
          style="width: 100%; font-size: 10px"
          @sort-change="sort_change"
          :header-cell-style="rowClass"
        >
          <el-table-column prop="sequence" label="应收编号" sortable>
            <template slot="header">
              <span>应收编号</span>
              <img
                v-if="lists.sequence == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              />
              <img
                v-else-if="lists.sequence == 'descending'"
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
            prop="num"
            sortable
            label="货物/应税劳务名称"
            width="200"
          >
            <template slot="header">
              <span>货物/应税劳务名称</span>
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
          <el-table-column prop="shihe" sortable label="规格">
            <template slot="header">
              <span>规格</span>
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
          <el-table-column prop="name" sortable label="价税合计">
            <template slot="header">
              <span>价税合计</span>
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
          <el-table-column prop="feiyong" sortable label="税率">
            <template slot="header">
              <span>税率</span>
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
          <el-table-column prop="type" sortable label="不含税金额">
            <template slot="header">
              <span>不含税金额</span>
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
          <el-table-column prop="status" sortable label="税额">
            <template slot="header">
              <span>税额</span>
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
      <div v-if="tableShow">
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
      lists: {},
      select: "",
      monthValue: "",
      tableShow: true,
      inforFlag: true,
      tableData: [
        {
          sequence: "AR-202101000290",
          num: "租金",
          shihe: "-",
          name: "500.00",
          feiyong: "5.00%",
          status: "479.18",
          type: "23.81",
        },
        {
          sequence: "AR-202101000290",
          num: "租金",
          shihe: "-",
          name: "500.00",
          feiyong: "5.00%",
          status: "479.18",
          type: "23.81",
        },
        {
          sequence: "AR-202101000290",
          num: "租金",
          shihe: "-",
          name: "500.00",
          feiyong: "5.00%",
          status: "479.18",
          type: "23.81",
        },
        {
          sequence: "AR-202101000290",
          num: "租金",
          shihe: "-",
          name: "500.00",
          feiyong: "5.00%",
          status: "479.18",
          type: "23.81",
        },
        {
          sequence: "AR-202101000290",
          num: "租金",
          shihe: "-",
          name: "500.00",
          feiyong: "5.00%",
          status: "479.18",
          type: "23.81",
        },
        {
          sequence: "AR-202101000290",
          num: "租金",
          shihe: "-",
          name: "500.00",
          feiyong: "5.00%",
          status: "479.18",
          type: "23.81",
        },
        {
          sequence: "AR-202101000290",
          num: "租金",
          shihe: "-",
          name: "500.00",
          feiyong: "5.00%",
          status: "479.18",
          type: "23.81",
        },
        {
          sequence: "AR-202101000290",
          num: "租金",
          shihe: "-",
          name: "500.00",
          feiyong: "5.00%",
          status: "479.18",
          type: "23.81",
        },
        {
          sequence: "AR-202101000290",
          num: "租金",
          shihe: "-",
          name: "500.00",
          feiyong: "5.00%",
          status: "479.18",
          type: "23.81",
        },
        {
          sequence: "AR-202101000290",
          num: "租金",
          shihe: "-",
          name: "500.00",
          feiyong: "5.00%",
          status: "479.18",
          type: "23.81",
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
      if (columnIndex === 6) {
        return "border-bottom-right-radius: 20px;border-top-right-radius: 20px;";
      }
    },
    hangStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "firsthang";
      }
      if (columnIndex == 1) {
        return "secondhang";
      }
    },
    search() {
      this.tableData.splice(8);
    },
    sort_change(column, prop, order) {
      this.lists = {};
      const rops1 = column.prop;
      this.lists[rops1] = column.order;
      console.log(this.lists);
      console.log(column, "---", prop, order);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
