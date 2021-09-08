<template>
  <div class="bond">
    <FormItem />
    <TableList />
  </div>
</template>
<script>
import FormItem from './blocks/formItem'
import TableList from './blocks/tableList'
export default {
  name: 'FinancialVerification',
  components: { FormItem, TableList },
  data() {
    return {

    }
  },
  methods: {

  },
  // 拖拽事件
  handleNodeClick(data) {
    console.log(data)
  },
  collapse(moveNode, inNode, type) {
    // return type === 'next';
    // 一级拖动到一级
    if (moveNode.level === 1 && inNode.level === 1) {
      // 四种情况
      if (moveNode.nextSibling === undefined) {
        return type === 'prev'
      } else if (inNode.nextSibling === undefined) {
        return type === 'next'
      } else if (moveNode.nextSibling.id !== inNode.id) {
        return type === 'prev'
      } else {
        return type === 'next'
      }
    }
  },
  rowClass({ row, column, rowIndex, columnIndex }) {
    if (columnIndex === 17) {
      return 'border-bottom-right-radius: 20px;border-top-right-radius: 20px;'
    }
  },
  sort() {
    this.tableDatas = this.tableDatas.reverse()
    console.log(this.tableDatas)
  },
  seach() {
    this.show = !this.show
    this.shape = !this.shape
  },
  search() {
    if (this.tableDatas.length > 3) {
      this.tableDatas.forEach((item) => {
        this.numlist.push(item)
      })
    }
    this.tableDatas.splice(5)
  },
  sort_change(column, prop, order) {
    this.lists = {}
    const rops1 = column.prop
    this.lists[rops1] = column.order
    console.log(column)
  },
  reset() {
    this.tableDatas = this.numlist
    this.serchTxt = ''
  },
  handleClose(done) {
    done()
  },
  clickImport(val) {
    this.dialogVisible = true
    if (val === 1) {
      this.menuShow = true
      this.title = '导入保证金'
    }
    if (val === 2) {
      this.menuShow = false
      this.title = '自定义显示字段'
    }
  },
  indexMethod(index) {
    return index + 1
  }
}

</script>
