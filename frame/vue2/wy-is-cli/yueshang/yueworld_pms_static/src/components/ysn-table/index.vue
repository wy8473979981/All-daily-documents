<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: ysn-表格组件
-->
<template>
  <div class="ysn-table">
    <el-table
      ref="ysnTable"
      :data="dataList"
      v-bind="$attrs"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      v-on="$listeners"
      @select="$comSelect"
      @select-all="$comSelect"
    >
      <template slot="empty" class="flex-ju-al-center">
        暂无数据
      </template>
      <!-- checkbox -->
      <el-table-column v-if="checkbox" type="selection" width="50" :fixed="showFixed" v-bind="{ ...selectionProps }" />
      <!-- 是否显示expand -->
      <el-table-column v-if="showExpand" type="expand" :fixed="showFixed">
        <template #default="scope">
          <slot v-bind="scope" name="expand" />
        </template>
      </el-table-column>

      <!-- 组件需求： 多选框列和内容列第一列固定 -->
      <YsnTableColumn
        v-for="(item, index) in column"
        :key="'ytable' + index"
        v-bind="{ ...item }"
        :item="item"
        :fixed="index === 0 && showFixed"
        :prop="`${Object.keys(item)[0]}`"
        :label="item[Object.keys(item)[0]]"
        :width="item.width || ''"
        :formatter="item.formatter"
        show-overflow-tooltip
        :show-slots="showSlots"
      >
        <template v-if="isShowSlots(Object.keys(item)[0])" :slot="Object.keys(item)[0]" slot-scope="scope">
          <slot v-bind="scope" :name="Object.keys(item)[0]" />
        </template>

      </YsnTableColumn>
      <!-- 组件需求： 操作列固定 -->
      <el-table-column v-if="showOperation" :fixed="showFixed ? 'right' : false" label="操作" :width="operationWidth">
        <template #default="scope">
          <slot v-bind="scope" />
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import YsnTableColumn from './column'
export default {
  name: 'YsnTable',
  components: { YsnTableColumn },
  props: {
    // 表单数据
    data: {
      type: Array,
      default: () => []
    },
    // 表单列内容
    column: {
      type: Array,
      default: () => []
    },
    // 是否具备展开列
    showExpand: {
      type: Boolean,
      default: false
    },
    // 是否固定首行
    showFixed: {
      type: Boolean,
      default: false
    },
    // 是否展示checkbox
    checkbox: {
      type: Boolean,
      default: true
    },
    // selection操作列添加自定义属性
    selectionProps: {
      type: Object,
      default: () => {}
    },
    // 设置操作项宽度
    operationWidth: {
      type: String,
      default: 'auto'
    },
    // 是否显示操作
    showOperation: {
      type: Boolean,
      default: false
    },
    // 插槽数组
    showSlots: {
      type: Array,
      default: () => []
    },
    // 高亮用选中的id-key 默认id
    selectKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      selectRow: [], // 选中行
      indexList: [] // 需要高亮的行
    }
  },
  computed: {
    // 列表变化后重置select
    dataList() {
      this.indexList = []
      return this.data
    }
  },

  methods: {
    // 判断row是否选中 返回高亮class
    tableRowClassName({ row, rowIndex }) {
      if (this.indexList.includes(rowIndex)) {
        return 'line-height'
      }
      return ''
    },
    // 将选中的状态值抛出去接收
    $comSelect(selectData, row) {
      if (!this.checkbox) {
        return false
      }
      this.selectData = selectData
      this.$emit('onSelect', selectData)
      // 如果外部传入id的key 则高亮选中行
      if (this.selectKey) {
        const { data, selectKey } = this
        const idList = selectData.map(item => item[selectKey])
        const indexList = []
        idList.map(item => {
          for (let i = 0; i < data.length; i++) {
            if (data[i][selectKey] === item) {
              indexList.push(i)
              break
            }
          }
        })
        this.indexList = indexList
      }
    },
    isShowSlots(val) {
      return this.showSlots.includes(val)
    }

  }
}
</script>
<style lang="scss" scoped>
.ysn-table{
  ::v-deep .el-table td {
    background-color: none;
    text-align: center;
    border: none;
  }
  ::v-deep.el-table{
    border: none;
  }
  ::v-deep.el-table th.is-leaf, ::v-deep.el-table td{
    border: none;
  }
  ::v-deep.el-table th {
    text-align: center;
    background: #e5e2de !important;
    padding: 0;
  }

  ::v-deep.cell {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #050101;
    text-align: left;
  }

  ::v-deep div.borderRight{
    border-right: 1px solid #D1CEC9;
  }
  ::v-deep th.borderBottom{
    border-bottom:  1px solid #D1CEC9;
  }
  ::v-deep th.borderLeft{
      border-left:  1px solid #D1CEC9;
  }
  ::v-deep .el-table  th.whiteRight{
    border-right: 4px solid #fff;
  }
  ::v-deep.el-table tr {
    background: #f6f5ee;
  }

  ::v-deep.has-gutter {
    background: #f6f5ee;
  }

  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #e5e2de;
  }

  ::v-deep .el-table__header-wrapper {
   border-radius: 20px;
  }

  ::v-deep.el-table,
  .el-table__expanded-cell {
    background: #f6f5ee;
  }

  ::v-deep.el-table td,
  .el-table th {
    padding: 0;
  }
  // select选中样式
  ::v-deep.el-table__row.line-height{
    background: #1C4C7F;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr.line-height> td {
    border: none;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr.line-height:hover > td {
     background: #1C4C7F !important;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr.line-height > td .cell {
    color: #FDFCFA !important;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr.line-height .td-color {
    color: #FDFCFA !important;
  }

  // hover样式
  ::v-deep.el-table__row:hover td{
     border-bottom: 1px solid transparent;
   }
  ::v-deep.el-table__row td{
     border-bottom:1px solid #E5E2DE;
  }
  ::v-deep.el-table__row td .cell {
    height: 36px !important;
    line-height: 36px;

    &>div{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  ::v-deep.el-table__row.el-table--enable-row-hover td{
     border-bottom:1px solid transparent;
  }

  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(229, 226, 222, 0.4) !important;
  }

  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td .cell {
    color: #48a0c3 !important;
  }

  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover .td-color {
    color: #48a0c3 !important;
  }

  // 去除排序默认样式
  ::v-deep .is-sortable .sort-caret{
    border: none;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    top:5px;
  }
  ::v-deep .is-sortable .sort-caret.ascending{
    background: url("~@/assets/image/sort.png") no-repeat;
    background-size: contain;
  }
  ::v-deep .is-sortable .descending{
    display: none;
  }
  //升序时显示降序按钮 升序图片
  ::v-deep .is-sortable.ascending .ascending,::v-deep .is-sortable.descending .ascending {
    display: none;
  }
  ::v-deep .is-sortable.ascending .descending{
    display: inline-block;
    background: url("~@/assets/image/sort-ascending.png") no-repeat;
    background-size: contain;
  }

  ::v-deep .is-sortable.descending .descending{
    display: inline-block;
    background: url("~@/assets/image/sort-descending.png") no-repeat;
    background-size: contain;
  }

}
</style>
