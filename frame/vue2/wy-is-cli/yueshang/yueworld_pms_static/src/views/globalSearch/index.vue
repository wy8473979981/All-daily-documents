<template>
  <div class="app-page-main">
    <div class="global-header">
      <div class="left-icon">
        <i class="el-icon-arrow-left" />
      </div>

      <el-input
        v-model="searchText"
        style="width: 468px"
        class="searchinput"
        prefix-icon="el-icon-search"
      />

      <div class="search-button" @click="search">搜索</div>

      <ysn-selectDialog
        :form="form"
        prop="searchSelect"
        :list="globalSearchList"
      >
        <div class="set-select ml-8 right-down-icon pl-8">
          <!-- 默认文字 -->
          <span v-if="form.searchSelect.length === 0" class="ml-8">请选择</span>
          <!-- 选中至少一个的效果 -->
          <el-tag v-if="form.searchSelect.length>0" size="small" closable color="#1C4C7F" class="tag px-8" disable-transitions @close="tagClose">
            <span class="text-truncate tag-text">
              {{ form.searchSelect[0] | getOptionsLabel("globalSearchList") }}
            </span>
          </el-tag>

          <!-- 选中2个以上 -->
          <!-- 选中至少一个的效果 -->
          <el-tag v-if="form.searchSelect.length>1" size="small" color="#1C4C7F" class="tag px-8" disable-transitions>
            +{{ form.searchSelect.length-1 }}
          </el-tag>
        </div>
      </ysn-selectDialog>
    </div>
    <div class="global-table">
      <div class="table-header">
        <p :class="activeFlag == 0 ? 'active' : ''" @click="activeFlag = 0">
          铺位(10)
        </p>
        <p :class="activeFlag == 1 ? 'active' : ''" @click="activeFlag = 1">
          品牌名(1)
        </p>
      </div>
      <Table :table-data="tableData" :table-columns-config="tableColumnsConfig" />
    </div>
    <Pagination />
  </div>
</template>
<script>
import { globalSearchList } from '@/utils/optionsList'
import Pagination from '../../components/Pagination'
export default {
  name: 'BudgetOrganization',
  components: { Pagination },
  props: {},
  data() {
    return {
      activeFlag: 0,
      // 搜索form
      form: {
        searchValue: '', // 搜索内容
        searchSelect: [] // 搜索select
      },
      // 搜索字典表
      globalSearchList,
      select: '',
      tableColumnsConfig: [
        {
          prop: 'name',
          label: '项目',
          width: '',
          isSort: true
        },
        {
          prop: 'address',
          label: '铺位号',
          width: '',
          isSort: true
        },
        {
          prop: 'fzr',
          label: '铺位负责人',
          isSort: true
        },
        {
          prop: 'mianji',
          label: '铺位面积',
          width: '160px',
          isSort: true
        }
      ],
      tableData: [
        {
          sequence: '1',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张德',
          mianji: 81.25
        },
        {
          sequence: '2',
          name: '青山湖',
          address: 'F1-0011',
          fzr: '周德',
          mianji: 90.2
        },
        {
          sequence: '3',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张德',
          mianji: 62.25
        },
        {
          sequence: '4',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张德',
          mianji: 56.78
        },
        {
          sequence: '5',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张得南',
          mianji: 81.56
        },
        {
          sequence: '6',
          name: '青山湖',
          address: 'F1-001',
          fzr: '王默',
          mianji: 43.78
        },
        {
          sequence: '7',
          name: '青山湖',
          address: 'F1-001',
          fzr: '王默',
          mianji: 78.92
        },
        {
          sequence: '8',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张德',
          mianji: 56.56
        },
        {
          sequence: '9',
          name: '青山湖',
          address: 'F1-001',
          fzr: '周德',
          mianji: 34.32
        },
        {
          sequence: '10',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张德',
          mianji: 51.75
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '20条/页',

      searchText: '',
      chooseArray: [],

      list: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.$route.query)
  },
  methods: {
    // tag关闭
    tagClose() {
      this.form.searchSelect.shift()
    },

    search() {
      this.tableData.splice(6)
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
