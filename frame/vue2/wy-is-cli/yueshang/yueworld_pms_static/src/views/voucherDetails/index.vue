<template>
  <div class="app-page-main">
    <header>
      <div class="head">凭证号码：V0-20210100021</div>
      <div class="btn">
        <button class="see">查看源代码</button>
        <button class="void">作废</button>
        <button class="save">保存</button>
      </div>
    </header>

    <div class="ranking-infor">
      <div class="inforhead">
        <p>主信息</p>
        <div class="up" @click="inforFlag = !inforFlag">
          <span>收起</span>
        </div>
        <div class="xian" />
      </div>
      <transition name="el-zoom-in-top">
        <div v-if="inforFlag" class="zhubj">
          <div class="every">
            <p>账套名称</p>
            <p>上海商业管理有限公司</p>
          </div>
          <div class="every">
            <p>凭证日期</p>
            <p>2021-01-19</p>
          </div>
          <div class="every">
            <p>第三方凭证号</p>
            <p>2021-04-28</p>
          </div>
          <div class="every">
            <p>收付类型</p>
            <p>收款</p>
          </div>
          <div class="every">
            <p>借方金额</p>
            <p>90.86</p>
          </div>
          <div class="every">
            <p>贷方金额</p>
            <p>90.86</p>
          </div>
          <div class="every">
            <p>上传时间</p>
            <p>2021-04-28</p>
          </div>
          <div class="every">
            <p>上传人</p>
            <p>张三</p>
          </div>
          <div class="every">
            <p>凭证类型</p>
            <p>记账</p>
          </div>
          <div class="every">
            <p>来源类型</p>
            <p>新增凭证</p>
          </div>
        </div>
      </transition>
    </div>

    <div class="ranking-table">
      <div class="inforhead">
        <p>分类信息</p>
        <div class="up" @click="tableShow = !tableShow">
          <span>收起</span>
        </div>
        <div class="xian" />
      </div>
      <transition name="el-zoom-in-top">
        <el-table
          v-if="tableShow"
          :data="tableData"
          :cell-class-name="hangStyle"
          style="width: 100%; font-size: 10px"
          :header-cell-style="rowClass"
          @sort-change="sort_change"
        >
          <el-table-column
            prop="sequence"
            type="index"
            :index="indexMethod"
            label="序列"
            width="60"
          />
          <el-table-column prop="num" sortable label="科目代码">
            <template slot="header">
              <span>科目代码</span>
              <img
                v-if="lists.num == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.num == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="shihe" sortable label="科目名称">
            <template slot="header">
              <span>科目名称</span>
              <img
                v-if="lists.shihe == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.shihe == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="name" sortable label="辅助核算">
            <template slot="header">
              <span>辅助核算</span>
              <img
                v-if="lists.name == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="feiyong" sortable label="方向">
            <template slot="header">
              <span>方向</span>
              <img
                v-if="lists.feiyong == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.feiyong == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="type" sortable label="借方金额">
            <template slot="header">
              <span>借方金额</span>
              <img
                v-if="lists.type == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.type == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="status" sortable label="贷方金额">
            <template slot="header">
              <span>贷方金额</span>
              <img
                v-if="lists.status == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.status == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="create" sortable label="摘要">
            <template slot="header">
              <span>摘要</span>
              <img
                v-if="lists.create == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.create == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="liu" sortable label="现金流项目" width="140">
            <template slot="header">
              <span>现金流项目</span>
              <img
                v-if="lists.liu == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.liu == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
          </el-table-column>
          <el-table-column prop="hao" sortable label="对方分录号" width="160">
            <template slot="header">
              <span>对方分录号</span>
              <img
                v-if="lists.hao == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.hao == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template>
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
import Pagination from '../../components/Pagination'
export default {
  name: 'GroupingScheme',
  components: { Pagination },
  props: {},
  data() {
    return {
      select: '',
      monthValue: '',
      lists: {},
      tableShow: true,
      inforFlag: true,
      tableData: [
        {
          sequence: '1',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '2',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '3',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '4',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '5',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '6',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '7',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '8',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '9',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '10',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '11',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '12',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        },
        {
          sequence: '13',
          num: '22031205',
          shihe: '能源费',
          name: '电费',
          feiyong: '借',
          status: '500.00',
          type: '500.00',
          create: '电费',
          liu: '不想影响现金流量',
          hao: '1'
        }
      ],
      xinagmuList: [
        {
          value: '选项1',
          label: '项目1'
        },
        {
          value: '选项2',
          label: '项目2'
        },
        {
          value: '选项3',
          label: '项目3'
        },
        {
          value: '选项4',
          label: '项目4'
        }
      ],
      puweiList: [
        {
          value: '选项1',
          label: '商铺'
        },
        {
          value: '选项2',
          label: '多径'
        }
      ],
      statueiList: [
        {
          value: '选项1',
          label: '正常'
        },
        {
          value: '选项2',
          label: '失效'
        }
      ],
      value: '',
      optionPages: [''],

      searchText: '',
      chooseArray: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex)
      if (columnIndex === 9) {
        return 'border-bottom-right-radius: 20px;border-top-right-radius: 20px;'
      }
    },
    hangStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'firsthang'
      }
      if (columnIndex === 1) {
        return 'secondhang'
      }
    },
    search() {
      this.tableData.splice(8)
    },
    sort_change(column, prop, order) {
      this.lists = {}
      const rops1 = column.prop
      this.lists[rops1] = column.order
      console.log(this.lists)
      console.log(column, '---', prop, order)
    },
    indexMethod(index) {
      return index + 1
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
