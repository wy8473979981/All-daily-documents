const dialog = {
  methods: {
    toggleDialog (val) {
      console.log(val, this.dialogVisible, '-toggle mixins')
      for (let i in this.dialogVisible) {
        this.dialogVisible[i] = false
      }
      if (val.visible) {
        this.dialogVisible[val.name] = true
      }
      // console.log(this.dialogVisible, '---visible')
    }
  }
}

const list_confirm = {
  methods: {
    async confirm (id) {
      try {
        await this.$confirm(`确认${this.is_deleted ? '恢复' : '删除'}吗？`)
        this.handle_confirm(id)
      } catch (error) {
        console.log('取消了')
      }
    },
    async confirm_batch () {
      const selection = this.$refs.table.selection
      if (selection.length === 0) {
        this.$message.error(`请选择${this.is_deleted ? '恢复' : '删除'}的${this.page_name}`)
        return
      }
      const ids = selection.map(item => item.id).join(',')
      console.log(ids, '----处理的id')
      try {
        await this.$confirm(`确认${this.is_deleted ? '恢复' : '删除'}吗`)
        this.handle_confirm(ids)
      } catch (error) {
        console.log('取消批量操作')
      }
    }
  }
}

const handle_paginator = {
  methods: {
    handle_paginator (pageInfo) {
      this.pageInfo = { ...this.pageInfo, ...pageInfo }
      this.getList()
    }
  }
}

const getStatus = {
  data () {
    return {
      enumStatus: this.$enums.status
    }
  },
  methods: {
    getStatus (status) {
      // console.log(status, this.enumStatus, '----mixins')
      return this.enumStatus.find(item => item.value === status)
      // return 1
    }
  }
}

// 修改table tr行的背景 start
const tableRowStyle = (( row, rowIndex ) => {
  return 'background-color: white;'
})

// 修改table header的背景 start
const tableHeaderColor = ((row, column, rowIndex, columnIndex ) => {
  return 'background-color: lightblue; color: #666; font-weight: bold;'
})

export {
  dialog,
  list_confirm,
  handle_paginator,
  getStatus,
  tableRowStyle,
  tableHeaderColor
}
