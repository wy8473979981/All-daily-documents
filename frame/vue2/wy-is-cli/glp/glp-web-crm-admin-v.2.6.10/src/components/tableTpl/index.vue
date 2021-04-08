<template>
  <el-table :data="tableData" :border="hasBorder" :highlight-current-row="canChecked" ref="tablearea" empty-text="暂无数据" :summary-method="getSummaries" :show-summary="showSummary" :cell-style="cellStyle" :min-height="minHeight" :max-height="maxHeight" @selection-change="handleSelectionChange" @row-click="singleElection">

    <!-- 复选框 -->
    <template v-if="checkbox">
      <el-table-column v-if="selection" type="selection" width="55">
      </el-table-column>
      <el-table-column v-else label="" width="65">
        <template slot-scope="scope">
          <el-radio class="radio" v-model="templateSelection" :label="scope.$index">&nbsp;</el-radio>
        </template>
      </el-table-column>
    </template>

    <!-- 循环体 -->
    <template v-for="(item,index) in theadData">
      <!-- 操作按钮 -->
      <el-table-column v-if="item.key==='isBtns'" :key="index" :prop="item.key" :width="item.width || ow" :label="item.val" :show-overflow-tooltip="false" fixed="right">
        <template slot-scope="scope">
          <template v-if="item.checkRight">
            <!-- 是否有权限判断 -->
            <template v-for="(nItem,index) in item.btnItems">
              <el-button v-if="nItem.checkFunc(scope.row)" :key="index" class="operate-btn" :class="nItem.className" @click="nItem.func(scope.row)" :type="nItem.type || 'text'" :title="nItem.name">
                {{nItem.name}}
              </el-button>
            </template>
          </template>
          <template v-else>
            <template v-for="(nItem,index) in item.btnItems">
              <el-button :key="index" class="operate-btn" :class="nItem.className" @click="nItem.func(scope.row)" :type="nItem.type || 'text'" :title="nItem.name">
                {{nItem.name}}
              </el-button>
            </template>
          </template>
        </template>
      </el-table-column>
      <template v-else>
        <el-table-column v-if="item.checked" :key="index" :prop="item.key" :width="item.width || ow" :label="item.val" :show-overflow-tooltip="item.tooltip || false">
          <template slot-scope="scope">
            <!-- 判断是否有格式化方法 -->
            <template v-if="item.isFormat==true">
              <div v-html="item.formatFn(item.key,scope.row)">
              </div>
            </template>

            <template v-else>
              {{getValue(scope.row[item.key])}}
            </template>
          </template>
        </el-table-column>
      </template>

    </template>
  </el-table>
</template>

<script>
// import textStatus from '@/components/StatusText'
export default {
  name: 'tableList',
  props: {
    'tableData': {
      type: Array,
      default: () => {
        return []
      }
    },
    'theadData': {
      type: Array,
      default: () => {
        return []
      }
    },
    'lastName': {
      type: String
    },
    'btnWidth': {
      type: String,
      default: '120px'
    },
    'toOperate': {
      type: Object
    },
    'toDetail': {
      type: Object,
      default: null
    }, 'toEdit': {
      type: Object,
      default: null
    }, 'toApproval': {
      type: Object,
      default: null
    }, 'toDelete': {
      type: Object,
      default: null
    }, 'toRights': {
      type: Object,
      default: null
    },
    'hasBorder': {
      type: Boolean,
      default: false
    },
    'showSummary': {
      type: Boolean,
      default: false
    },
    'cellStyle': {
      type: Object,
      default: null
    },
    'canChecked': {
      type: Boolean,
      default: false
    },
    'minHeight': {
      type: String,
      default: 'auto'
    },
    'maxHeight': {
      type: String,
      default: 'auto'
    },
    'selection': {
      type: Boolean,
      default: false
    },
    'checkbox': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultValue: '--',
      templateSelection: ''
    }
  },
  computed: {
    ow() {
      return this.tdWidth || 'auto'
    }
  },
  components: {
    // 'textStatus':textStatus
  },
  created() {
  },
  mounted() {
  },
  methods: {
    defaultSelectionRow(rows) {
      // let rows = [4138,4139]//通过id,查找table中需要默认选中的数据
      if (rows) {
        let arr = [...this.tableData].filter(x => [...rows].some(y => y === x.creditCode));
        arr.forEach(row => {
          this.$refs.tablearea.toggleRowSelection(row);
        });
      } else {
        this.$refs.tablearea.clearSelection();
      }
    },
    getSummaries(param) {                       //合计
      const { columns, data } = param;
      const sums = [], len = columns.length;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总分';
          return;
        } else if (index == len - 1) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '';
          } else {
            sums[index] = 'N/A';
          }
        }

      });

      return sums;
    },
    getValue(item) {
      if (item === undefined || item === null || item === '') {
        return this.defaultValue
      } else {
        return item;
      }
    },
    singleElection(row, column, event) {
      this.$emit('listenSingleEvent', row)
    },
    handleSelectionChange(val) {
      this.$emit('listenMultiEvent', val)
    },
  }
}
</script>

<style lang="scss" scoped>
.operate-btn {
  font-size: 14px;
  color: #359c67;
}
.delete-btn {
  color: #ff6d6d;
}

.el-button + .el-button {
  margin-left: 10px;
}
</style>
