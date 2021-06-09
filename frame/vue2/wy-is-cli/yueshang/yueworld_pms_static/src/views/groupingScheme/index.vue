<template>
  <div class="app-page-main">
    <div class="ranking-form">
      <div class="data-list">
        <div class="operate-wrap">
          <el-input
            v-model="select"
            prefix-icon="el-icon-search"
            class="elinput"
            placeholder="请输入编号/方案名称"
          />
          <el-select v-model="value1" placeholder="所有项目">
            <el-option
              v-for="item in xinagmuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="value2" placeholder="请选择铺位类型">
            <el-option
              v-for="item in puweiList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="value3" placeholder="请选择状态">
            <el-option
              v-for="item in statueiList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <button class="blue-btn" @click="search">搜索</button>

          <button class="reset-btn" @click="reset">重置</button>
          <button class="blue-btn other" style="float: right">
            新增计组方案
          </button>
        </div>
      </div>
    </div>

    <div class="ranking-table">
      <el-table
        :data="tableData"
        :cell-class-name="hangStyle"
        style="width: 100%; font-size: 10px"
        :header-cell-style="rowClass"
        @sort-change="sort_change"
      >
        <el-table-column label="序列" type="index" :index="indexMethod" width="60" />
        <el-table-column prop="num" sortable label="方案编号">
          <template slot="header">
            <span>方案编号</span>
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
            >
          </template>
        </el-table-column>
        <el-table-column prop="shihe" sortable label="适用项目">
          <template slot="header">
            <span>方案编号</span>
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
            >
          </template>
        </el-table-column>
        <el-table-column prop="name" sortable label="方案名称">
          <template slot="header">
            <span>方案编号</span>
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
            >
          </template>
        </el-table-column>
        <el-table-column prop="feiyong" sortable label="包含费用">
          <template slot="header">
            <span>方案编号</span>
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
            >
          </template>
        </el-table-column>
        <el-table-column prop="type" sortable label="铺位类型">
          <template slot="header">
            <span>方案编号</span>
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
            >
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
            >
          </template>
        </el-table-column>
        <el-table-column prop="create" sortable label="创建时间">
          <template slot="header">
            <span>方案编号</span>
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
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <Pagination />
    </div>
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
      num: [],
      tableData: [
        {
          sequence: '1',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '2',
          num: 'cimi2022',
          shihe: '测试项目',
          name: '多经',
          feiyong: '6',
          status: '正常',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '3',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '4',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '5',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '6',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '7',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '8',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '9',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '10',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '11',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '12',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
        },
        {
          sequence: '13',
          num: 'cimi2021',
          shihe: '所有项目',
          name: '商铺计租方案',
          feiyong: '13',
          status: '失效',
          type: '商铺',
          create: '2020-12-12'
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
      value1: '',
      value2: '',
      value3: '',
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
      if (columnIndex === 7) {
        return 'border-bottom-right-radius: 20px;border-top-right-radius: 20px;'
      }
    },
    hangStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return 'firsthang'
      }
      if (columnIndex == 1) {
        return 'secondhang'
      }
    },
    search() {
      if (this.tableData.length > 8) {
        this.tableData.forEach((item) => {
          this.num.push(item)
        })
      }

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
    },
    reset() {
      this.select = ''
      this.tableData = this.num
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
