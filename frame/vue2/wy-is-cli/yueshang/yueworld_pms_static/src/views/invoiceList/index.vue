<template>
  <div class="app-page-main">
    <div class="tabhead">
      <div class="table-header">
        <p :class="activeFlag == 0 ? 'active' : ''" @click="activeFlag = 0">
          收据
        </p>
        <p :class="activeFlag == 1 ? 'active' : ''" @click="activeFlag = 1">
          票据
        </p>
      </div>
    </div>

    <div class="ranking-form">
      <div class="data-list">
        <div class="operate-wrap">
          <el-input
            v-model="select"
            prefix-icon="el-icon-search"
            class="elinput"
            placeholder="请输入合同编号、发票编号"
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
          <button class="see">查看电子发票</button>
          <button class="upload">上传发票</button>
          <button class="add">新增发票</button>
        </div>
      </div>
    </div>

    <div class="ranking-table">
      <transition name="el-zoom-in-top">
        <el-table
          :data="tableData"
          :cell-class-name="hangStyle"
          style="width: 100%; font-size: 10px"
          :header-cell-style="rowClass"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" align="center" width="55" />
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="60"
          />
          <el-table-column prop="num" sortable label="发票编号">
            <template #header>
              <div class="solt-icon">
                <span>发票编号</span>
                <img
                  v-if="list.num === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.num === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="shihe" sortable label="项目">
            <template #header>
              <div class="solt-icon">
                <span>项目</span>
                <img
                  v-if="list.shihe === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.shihe === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" sortable label="租户">
            <template #header>
              <div class="solt-icon">
                <span>租户</span>
                <img
                  v-if="list.name === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="feiyong" sortable label="类型">
            <template #header>
              <div class="solt-icon">
                <span>类型</span>
                <img
                  v-if="list.feiyong === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.feiyong === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" sortable label="开票金额(元)">
            <template #header>
              <div class="solt-icon">
                <span>开票金额(元)</span>
                <img
                  v-if="list.type === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.type === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" sortable label="税额(元)">
            <template #header>
              <div class="solt-icon">
                <span>税额(元)</span>
                <img
                  v-if="list.status === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.status === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                >
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="riqi" sortable label="发票日期">
            <template #header>
              <div class="solt-icon">
                <span>发票日期</span>
                <img
                  v-if="list.riqi === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.riqi === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="zhuagntai" sortable label="状态">
            <template #header>
              <div class="solt-icon">
                <span>状态</span>
                <img
                  v-if="list.zhuagntai === 'ascending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.zhuagntai === 'descending'"
                  style="margin-bottom: -5px"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else
                  style="margin-bottom: -5px"
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </transition>
    </div>
    <transition name="el-zoom-in-top">
      <Pagination />
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
      activeFlag: 0,
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
        }
      ],
      tableData: [
        {
          sequence: '1',
          num: 'FP-20203000004',
          shihe: '测试项目',
          name: '珠海市酒店管理有限公司',
          feiyong: '普票',
          status: '31,800,00',
          type: '31,800,00',
          riqi: '2020-10-12',
          zhuagntai: '上传失败'
        },
        {
          sequence: '2',
          num: 'FP-20203000004',
          shihe: '测试项目',
          name: '珠海市酒店管理有限公司',
          feiyong: '普票',
          status: '31,800,00',
          type: '31,800,00',
          riqi: '2020-10-12',
          zhuagntai: '上传失败'
        },
        {
          sequence: '3',
          num: 'FP-20203000004',
          shihe: '测试项目',
          name: '珠海市酒店管理有限公司',
          feiyong: '普票',
          status: '31,800,00',
          type: '31,800,00',
          riqi: '2020-10-12',
          zhuagntai: '上传失败'
        },
        {
          sequence: '4',
          num: 'FP-20203000004',
          shihe: '测试项目',
          name: '珠海市酒店管理有限公司',
          feiyong: '普票',
          status: '31,800,00',
          type: '31,800,00',
          riqi: '2020-10-12',
          zhuagntai: '上传失败'
        },
        {
          sequence: '5',
          num: 'FP-20203000004',
          shihe: '测试项目',
          name: '珠海市酒店管理有限公司',
          feiyong: '普票',
          status: '31,800,00',
          type: '31,800,00',
          riqi: '2020-10-12',
          zhuagntai: '上传失败'
        },
        {
          sequence: '6',
          num: 'FP-20203000004',
          shihe: '测试项目',
          name: '珠海市酒店管理有限公司',
          feiyong: '普票',
          status: '31,800,00',
          type: '31,800,00',
          riqi: '2020-10-12',
          zhuagntai: '上传失败'
        },
        {
          sequence: '7',
          num: 'FP-20203000004',
          shihe: '测试项目',
          name: '珠海市酒店管理有限公司',
          feiyong: '普票',
          status: '31,800,00',
          type: '31,800,00',
          riqi: '2020-10-12',
          zhuagntai: '上传失败'
        },
        {
          sequence: '8',
          num: 'FP-20203000004',
          shihe: '测试项目',
          name: '珠海市酒店管理有限公司',
          feiyong: '普票',
          status: '31,800,00',
          type: '31,800,00',
          riqi: '2020-10-12',
          zhuagntai: '上传失败'
        },
        {
          sequence: '9',
          num: 'FP-20203000004',
          shihe: '测试项目',
          name: '珠海市酒店管理有限公司',
          feiyong: '普票',
          status: '31,800,00',
          type: '31,800,00',
          riqi: '2020-10-12',
          zhuagntai: '上传失败'
        },
        {
          sequence: '10',
          num: 'FP-20203000004',
          shihe: '测试项目',
          name: '珠海市酒店管理有限公司',
          feiyong: '普票',
          status: '31,800,00',
          type: '31,800,00',
          riqi: '2020-10-12',
          zhuagntai: '上传失败'
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
      tableDataCopy: null,
      optionPages: [''],

      searchText: '',
      chooseArray: [],

      list: {}
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
      this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData))
      this.tableData.splice(8)
    },
    // 重置
    reset() {
      this.value = ''
      this.select = ''
      this.tableData = this.tableDataCopy
    },

    indexMethod(index) {
      return index + 1
    },
    changeTableSort(column) {
      this.list = {}
      const rops1 = column.prop
      this.list[rops1] = column.order
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
