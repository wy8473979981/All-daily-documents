<template>
  <section class="choosed-result">
    <ul class="tab-head">
      <li class="pointer" :class="{'active': activeName === 0}" @click="changeTab(0)">未使用的</li>
      <el-badge :value="selectedCount">
        <li class="pointer" :class="{'active': activeName === 1}" @click="changeTab(1)"> 已使用的</li>
      </el-badge>
    </ul>
    <el-divider/>
    <ul class="tab-content">
      <el-table :data='dataShow' @row-click='rowClick'>
        <el-table-column prop="en" label="映射值"></el-table-column>
        <el-table-column prop="cn" label="中文"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
      </el-table>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      activeName: 0,
      tableData2: [
      ],
      tableData: [
        {en: '映射值1', cn: '中文1', desc: '描述1', selected: false},
        {en: '映射值2', cn: '中文2', desc: '描述2', selected: true},
        {en: '映射值3', cn: '中文3', desc: '描述3', selected: false},
        {en: '映射值4', cn: '中文4', desc: '描述4', selected: false},
      ],
      unChoosedList: [],
      choosedList: [],
      dataShow: []
    }
  },
  computed: {
    selectedCount () {
      return this.tableData.filter(item => item.selected).length
    }
  },
  methods: {
    changeTab (val) {
      this.activeName = val
      this.distribute()
    },
    rowClick (row) {
      this.tableData.forEach((item, index) => {
        if (item.en === row.en) {
          item.selected = !item.selected;
        }
      })
      this.distribute()
      if (this.activeName === 1) return
      const reg = /id/
      const {html, ...rest} = row
      const replaced = html.replace(reg, (val) => {
        return `id="${Date.now()}"`
      })
      this.$emit('getContractTxt', {html: replaced, ...rest})
    },
    handleClick (row) {
      this.tableData.forEach((item, index) => {
        if (item.en === row.en) {
          item.selected = !item.selected;
        }
      });
      this.distribute()
      const reg = /id/
      const {html, ...rest} = row
      const replaced = html.replace(reg, (val) => {
        return `id="${Date.now()}"`
      })
      this.$emit('getContractTxt', {html: replaced, ...rest})
    },
    distribute () {
      this.choosedList = this.tableData.filter(item => item.selected)
      this.unChoosedList = this.tableData.filter(item => !item.selected)
      this.dataShow = this.activeName === 0? this.unChoosedList : this.choosedList
    }
  }
}
</script>

<style lang="scss" scoped>
.choosed-result{
  border: 1px solid #efefef;
  padding: 10px;
  ul.tab-head{
    display: flex;
    li{
      padding: 5px;
      border: 1px solid $info;
      border-radius: 4px;
      color: $info;
      &.active{
        color: $primary;
        border-color: $primary;
      }
    }
  }
}
</style>
