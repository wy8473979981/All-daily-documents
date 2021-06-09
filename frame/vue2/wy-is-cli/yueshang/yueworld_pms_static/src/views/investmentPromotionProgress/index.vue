<template>
  <div class="app-page-main">
    <div class="ranking-form">
      <div class="data-list">
        <div class="operate-wrap">
          <el-input
            v-model="select"
            prefix-icon="el-icon-search"
            class="elinput"
            placeholder="请输入商家/品牌/合同编号"
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
      </div>
    </div>

    <div class="ranking-table">
      <el-table
        :data="tableData"
        :cell-class-name="hangStyle"
        style="width: 100%; font-size: 10px"
        @sort-change="sort_change"
          :header-cell-style="rowClass"
      >
        <el-table-column label="序列" type="index" :index="indexMethod" width="60" />
        <el-table-column prop="name" label="项目" sortable >
          <template slot="header">
            <span>项目</span>
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
        <el-table-column prop="dong" label="楼栋" sortable>
          <template slot="header">
            <span>楼栋</span>
            <img
              v-if="lists.dong == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.dong == 'descending'"
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
        <el-table-column prop="ceng" label="楼层" sortable>
          <template slot="header">
            <span>楼层</span>
            <img
              v-if="lists.ceng == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.ceng == 'descending'"
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
        <el-table-column prop="hao" label="铺位号" sortable>
          <template slot="header">
            <span>铺位号</span>
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
            >
          </template>
        </el-table-column>
        <el-table-column prop="jianzu" label="建筑面积(m²)" sortable>
          <template slot="header">
            <span>建筑面积(m²)</span>
            <img
              v-if="lists.jianzu == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.jianzu == 'descending'"
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
        <el-table-column prop="jizu" label="计租面积(m²)" sortable>
          <template slot="header">
            <span>计租面积(m²)</span>
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
        <el-table-column prop="jingdu" label="招商进度" sortable>
          <template slot="header">
            <span>招商进度</span>
            <img
              v-if="lists.jingdu == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="lists.jingdu == 'descending'"
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
    <div class="paging">
      <div class="paging-data">
        <p>共10条数据，当前在1/1页</p>
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
export default {
  name: 'GroupingScheme',
  components: {},
  props: {},
  data() {
    return {
      select: '',
      monthValue: '',
      lists: {},
      tableData: [
        {
          sequence: '1',
          name: '上海七宝项目',
          dong: 'T1',
          ceng: 'B1',
          hao: 'M-B-001',
          jianzu: 140.0,
          jizu: 140.0,
          jingdu: '洽谈'
        },
        {
          sequence: '2',
          name: '上海七宝项目',
          dong: 'T1',
          ceng: 'B1',
          hao: 'M-B-001',
          jianzu: 140.0,
          jizu: 140.0,
          jingdu: '双签'
        },
        {
          sequence: '3',
          name: '上海七宝项目',
          dong: 'T1',
          ceng: 'B1',
          hao: 'M-B-001',
          jianzu: 140.0,
          jizu: 140.0,
          jingdu: '洽谈'
        },
        {
          sequence: '4',
          name: '上海七宝项目',
          dong: 'T1',
          ceng: 'B1',
          hao: 'M-B-001',
          jianzu: 140.0,
          jizu: 140.0,
          jingdu: '洽谈'
        },
        {
          sequence: '5',
          name: '上海七宝项目',
          dong: 'T1',
          ceng: 'B1',
          hao: 'M-B-001',
          jianzu: 140.0,
          jizu: 140.0,
          jingdu: '洽谈'
        },
        {
          sequence: '6',
          name: '上海七宝项目',
          dong: 'T1',
          ceng: 'B1',
          hao: 'M-B-001',
          jianzu: 140.0,
          jizu: 140.0,
          jingdu: '洽谈'
        },
        {
          sequence: '7',
          name: '上海七宝项目',
          dong: 'T1',
          ceng: 'B1',
          hao: 'M-B-001',
          jianzu: 140.0,
          jizu: 140.0,
          jingdu: '洽谈'
        },
        {
          sequence: '8',
          name: '上海七宝项目',
          dong: 'T1',
          ceng: 'B1',
          hao: 'M-B-001',
          jianzu: 140.0,
          jizu: 140.0,
          jingdu: '洽谈'
        },
        {
          sequence: '9',
          name: '上海七宝项目',
          dong: 'T1',
          ceng: 'B1',
          hao: 'M-B-001',
          jianzu: 140.0,
          jizu: 140.0,
          jingdu: '洽谈'
        },
        {
          sequence: '10',
          name: '上海七宝项目',
          dong: 'T1',
          ceng: 'B1',
          hao: 'M-B-001',
          jianzu: 140.0,
          jizu: 140.0,
          jingdu: '洽谈'
        }
      ],
      options: [
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
        },
        {
          value: '选项5',
          label: '项目5'
        }
      ],
      value: '',
      optionPages: [''],
      num:[],
      searchText: '',
      chooseArray: []
    }
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
      if (columnIndex == 7) {
        return 'changecolor'
      }
    },
    sort_change(column, prop, order) {
      this.lists = {}
      const rops1 = column.prop
      this.lists[rops1] = column.order
      console.log(this.lists)
      console.log(column, '---', prop, order)
    },
    search() {
      if(this.tableData.length>6){
        this.tableData.forEach(item=>{
            this.num.push(item)
        })
       
      }
      this.tableData.splice(6)
    },
    indexMethod(index) {
      return index + 1
    },
    reset(){
       this.select=""
       this.tableData= this.num
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
