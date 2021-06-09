<template>
  <div class="app-page-main">
    <div class="budget-total">
      <el-select v-model="select" slot="prepend" placeholder="请选择项目">
        <el-option v-for="(item, i) in list" :key="i" :value="item.name">
          {{ item.name }}
        </el-option>
      </el-select>
      <div class="budgets">
        <div class="budget" @click="packages">
          <span>查看租金包</span>
        </div>
        <div class="budget" @click="budgetdialog">
          <span>开启预算编制</span>
        </div>
      </div>
    </div>
    <div class="dialogd">
      <el-dialog
        title="资管租金包分解"
        :visible.sync="packagess"
        width="920px"
        :before-close="handleClose"
        @sort-change="sort_change"
      >
        <el-divider></el-divider>
        <el-table
          :data="tableData1"
          style="width: 99%; margin-top: 25px; font-size: 10px"
        >
          <el-table-column prop="sequence" label="项目"> </el-table-column>
          <el-table-column prop="name" label="租金包"> </el-table-column>
          <el-table-column prop="address" label="NOI"> </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="packagess = false">取消</el-button>
          <el-button type="primary" @click="packagess = false">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="dialogc">
      <el-dialog
        title="开启下一年度预算编制"
        :visible.sync="organization"
        width="666px"
        :before-close="handleClose"
        @sort-change="sort_change"
      >
        <el-divider></el-divider>
        <p>开启后，自动为各项目创建下一年度预算表并可进行预算编制</p>
        <div style="display: flex">
          <div>
            <p>请选择预算年度</p>
            <el-date-picker
              v-model="value"
              type="datetime"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
          <div style="margin-left: 117px">
            <p>请设置预算编制关闭的时间</p>
            <div class="block">
              <el-date-picker
                v-model="value5"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
          </div>
        </div>

        <el-table
          :data="tableData1"
          style="width: 99%; margin-top: 25px; font-size: 10px"
        >
          <el-table-column prop="sequence" label="项目"> </el-table-column>
          <el-table-column prop="name" label="租金包"> </el-table-column>
          <el-table-column prop="address" label="NOI"> </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="organization = false">暂不开启</el-button>
          <el-button type="primary" @click="organization = false"
            >确定开启</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div class="budget-table">

      <el-table
        :data="tableData"
        style="width: 100%; font-size: 10px"
        @sort-change="sort_change"
        :header-cell-style="rowClass"
      >
        <el-table-column
          label="序列"
          width="50"
          type="index"
          :index="indexMethod"
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
        <el-table-column prop="address" label="年度预算" width="100" sortable>
          <template slot="header">
            <span>年度预算</span>
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
        <el-table-column
          prop="status"
          label="预算方案名称"
          width="300"
          sortable
        >
          <template slot="header">
            <span>预算方案名称</span>
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
        <el-table-column
          prop="establishment"
          label="编制状态"
          width="260"
          sortable
        >
          <template slot="header">
            <span>编制状态</span>
         <img
              v-if="lists.establishment == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="lists.establishment == 'descending'"
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
          <template slot-scope="scope">
            <span>编制中(</span
            ><span class="spancolor">{{ scope.row.establishment }}</span>
            <span style="cursor: pointer" @click="timing">定时关闭)</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="版本号" sortable>
          <template slot="header">
            <span>版本号</span>
          <img
              v-if="lists.number == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            />
            <img
              v-else-if="lists.number == 'descending'"
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
        <el-table-column prop="address" label="操作" width="200" sortable>
          <template slot-scope="scope">
            <el-button @click="yewu()" type="text" size="small">
              编制业务表
            </el-button>
            <el-button @click="time()" type="text" size="small">
              修改关闭时间
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialoga">
      <el-dialog
        title="重新开启2022年度预算编制"
        :visible.sync="dialogVisible"
        width="400px"
        ref="dialogtitle"
        :before-close="handleClose"
      >
        <el-divider></el-divider>
        <el-radio v-model="radio" label="1"> 定时关闭</el-radio>
        <el-radio v-model="radio" label="2">立即关闭</el-radio>
        <div v-if="timeshow">
          <div style="margin-left: 8px; margin-top: 27px">
            <p>请设置预算关闭的时间</p>
            <div class="block">
              <el-date-picker
                v-model="value5"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="dialoge">
      <el-dialog
        title="重新开启2022年度预算编制"
        :visible.sync="timings"
        width="400px"
        ref="dialogtitle"
        :before-close="handleClose"
      >
        <el-divider></el-divider>
        <div style="margin-left: 8px; margin-top: 27px">
          <p>请设置预算关闭的时间</p>
          <div class="block">
            <el-date-picker
              v-model="value4"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="timings = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="dialogb">
      <el-dialog
        title="修改2022年度预算编制关闭时间"
        :visible.sync="innerVisible"
        width="496px"
        :before-close="handleClose"
      >
        <el-divider></el-divider>
        <div class="icon">
          <i class="el-icon-success"></i>
        </div>
        <div class="pp">
          <h4>修改成功</h4>
          <p>预算编制已关闭</p>
        </div>
      </el-dialog>
    </div>
    <div class="dialogf">
      <el-dialog
        title="修改2022年度预算编制关闭时间"
        :visible.sync="innerVisible1"
        width="496px"
        :before-close="handleClose"
      >
        <el-divider></el-divider>
        <div class="icon">
          <i class="el-icon-success"></i>
        </div>
        <div class="pp">
          <h4>修改成功</h4>
          <p>即时起至，各部门可以进行2022年度预算编制</p>
        </div>
      </el-dialog>
    </div>

    <div >
   <Pagination/>
    </div>
  </div>
</template>
<script>
import Pagination from "../../components/Pagination";
export default {

  name: "BudgetOrganizationList",
  components: { Pagination },

  data() {
    return {
      select: "",
      dialogVisible: false,
      innerVisible: false,
      innerVisible1: false,
      lists:{},
      organization: false,
      timings: false,
      value4: "",
      value5: "",
      valueb: "",
      value3: "",
      packagess: false,
      timeshow: true,
      radio: "1",
      tableData: [
        {
          sequence: "1",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "2",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "3",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "4",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "5",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "6",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "7",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "8",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "9",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "10",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "11",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "12",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "13",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "14",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
        {
          sequence: "15",
          name: "项目一",
          address: "2022",
          status: "商业-上海区域-七宝年度预算-2022(经营期)",
          establishment: "2020-12-12  16:00 ",
          number: "v1.0.1",
        },
      ],
      tableData1: [
        {
          sequence: "合计",
          name: "21109",
          address: "7796",
        },
        {
          sequence: "项目一",
          name: "3333",
          address: "2512",
        },
        {
          sequence: "项目二",
          name: "4444",
          address: "1321",
        },
        {
          sequence: "项目三",
          name: "4444",
          address: "1321",
        },
        {
          sequence: "项目四",
          name: "4444",
          address: "1321",
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
      optionss: [
        {
          name: "2022-12-12 16:00",
        },
      ],
      options: [
        {
          name: "2022-12-12 16:00",
        },
      ],
      optionsss: [
        {
          name: "2022",
        },
      ],
      optionssss: [
        {
          name: "2021-11-30 23:59:59",
        },
      ],
      optionlist:[
        {

          num:"第一页"
        },
        {
          num:"第二页"
        },
        {
          num:"第三页"
        },
        {
          num:"第四页"
        },
        {
          num:"第五页"
        },
        {
          num:"第六页"
        },
        {
          num:"第七页"
        }

      ],
      value: "",
    };
  },
  watch: {
    radio(val, value) {
      if (val == 2) {
        this.timeshow = false;
      }
      if (val == 1) {
        this.timeshow = true;
      }
    },
  },
  created() {},
  methods: {
  rowClass({ row, column, rowIndex, columnIndex }){
    console.log(columnIndex);
      if(columnIndex === 6){
           return 'border-top-right-radius: 20px;border-bottom-right-radius: 20px;'

      }
        },
    yewu() {},
    packages() {
      this.packagess = true;
    },
    budgetdialog() {
      this.organization = true;
    },
    time() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    },
    determine() {
      if (this.radio == 2) {
        this.innerVisible = true;
      }
      this.dialogVisible = false;
      this.timings = false;
      this.innerVisible1 = true;
    },
    indexMethod(index) {
      return index + 1;
    },

    sort_change(column, prop, order) {
      this.lists = {};
      const rops1 = column.prop;

      this.lists[rops1] = column.order;
      console.log(this.lists);
      console.log(column, "---", prop, order);
    },
    sortFun: function (attr, rev) {
      console.log(rev);

      //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序

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
    timing() {
      this.timings = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./budgetOrganizationList.scss";
</style>
