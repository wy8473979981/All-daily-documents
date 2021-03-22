<template>
    <div id="commonTable">
        <el-table :data="data" :max-height="maxHeight" border stripe tooltip-effect="light"
　　　　　　@selection-change="handleSelectionChange" size="mini"  header-row-class-name="table-header" :height="this.$store.state.tableHeight">
            <template v-for="(item, index) in columns">
                <el-table-column
                    v-if="item.show != false"
                    :key="index"
                    :prop="item.prop"
                    :label="item.label"
                    :align="item.align?item.align:'center'"
                    :width="item.width"
                    :formatter="item.formatter?item.formatter : formatterValue"
                >
                </el-table-column>
            </template>
            <slot name="table_oper"/>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="text-align: center;margin:20px 0;"
            :current-page="pager.pageNo"
            :page-size="pager.limit"
            :page-sizes="pager.sizes"
            :total="pager.total"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>

<script>
export default {
  name: 'commonTable',
  props: {
    columns: Array,
    data: Array,
    pager: Object,
    maxHeight: {
      type: Number,
      default: 2000
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    },
    formatterValue (row, column, cellValue) {
      return cellValue
    }
  }
}
</script>
