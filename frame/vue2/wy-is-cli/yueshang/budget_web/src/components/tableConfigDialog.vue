<template>
  <el-dialog
    class="table-config"
    :visible="visible"
    width="500"
    :close-on-click-modal='false'
    :show-close='false'
    :close-on-press-escape='false'
  >
    <i class="el-icon-close btn-close" @click='$emit("toggle", { name: "tableConfig", visible: false })'></i>
    <strong>新建</strong>
    <el-form label-width="150px" :inline='true'>
      <el-form-item label="行数">
        <el-input-number size="mini" :min="0" v-model="createConfig.row"></el-input-number>
      </el-form-item>
      <el-form-item label="列数">
        <el-input-number size="mini" :min="0" v-model="createConfig.col"></el-input-number>
      </el-form-item>
      <div class="btn-group">
        <el-button @click="confirmCreate" size="mini" type="success"
        :disabled="disableCreate"
        >确定</el-button>
      </div>
    </el-form>
    <hr>
    <strong>编辑</strong>
    <el-form label-width="150px" :inline='true'>
      <el-form-item label="第几个表格">
        <el-input-number size="mini" :min="0" v-model="updateConfig.tableIndex"></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="表格宽度">
        <el-input-number size="mini" :min="0" v-model="updateConfig.tableWidth"></el-input-number>
      </el-form-item> -->
      <el-form-item label="第几列">
        <el-input-number size="mini" :min="0" v-model="updateConfig.colIndex"></el-input-number>
      </el-form-item>
      <el-form-item label="列宽">
        <el-input-number size="mini" :step="20" :min="0" v-model="updateConfig.colWidth"></el-input-number>
      </el-form-item>
      <div class="btn-group">
        <el-button @click="confirmUpdate" size="mini" type="success"
          :disabled="disableUpdate"
        >确定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    createConfig: {
      type: Object
    },
    updateConfig: {
      type: Object
    },
    visible: {
      type: Boolean
    }
  },
  computed: {
    disableCreate () {
      return this.createConfig.row === 0 || this.createConfig.col === 0
    },
    disableUpdate () {
      return this.updateConfig.tableIndex === 0 || this.updateConfig.colIndex === 0 || this.updateConfig.colWidth === 0
    }
  },
  methods: {
    confirmCreate () {
      if (this.createConfig.tableIndex === 0 || this.createConfig.tableWidth === 0) return
      this.$emit('create', this.createConfig)
      this.$emit('clear')
      this.$emit('toggle', { name: 'tableConfig', visible: false })
    },
    confirmUpdate () {
      let table = document.querySelectorAll('table.quill-better-table')

      if (table === undefined || table.length === 0) {
        this.$message.error('请先插入表格')
        return
      }
      if (this.updateConfig.tableIndex > table.length) {
        this.$message.error('只能操作页面上已有的表格')
        return
      }
      table = table[this.updateConfig.tableIndex - 1]
      const col = table.querySelectorAll('col')
      if (this.updateConfig.colIndex > col.length) {
        this.$message.error('只能操作页面上已有的列')
        return
      }
      const colSelected = col[this.updateConfig.colIndex - 1]
      colSelected.setAttribute('width', this.updateConfig.colWidth + '')
      const colsWidth = [...col].map(item => {
        return item.getAttribute('width')
      })
      const tableWidth = colsWidth.reduce((a, c) => Number(a) + Number(c), 0)
      if (tableWidth > 1400) {
        this.$message.error('表格总宽度不能超过1400')
        return
      }
      table.style.width = tableWidth + 'px'
      console.log(tableWidth, '---tablewidth')
      this.$emit('clear')
      this.$emit('toggle', { name: 'tableConfig', visible: false })
    },
    getStyle (ele, attr) {
      if (!attr) {
        throw 'attr is required'
      }
      if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[attr]
      }
      return ele.currentStyle[attr]
    }
  }
}
</script>

<style lang='scss' scoped>
strong{
  font-size: 20px;
}
div.btn-group{
  display: flex;
  justify-content: flex-end;
}
</style>
