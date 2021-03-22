<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="80%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="tool-bar-wrapper">
      <section class="tool-bar">
        <el-input style="width: 500px;"
          size="mini"
          placeholder="请输入搜索的内容"
          v-model="searchWord"
          clearable>
        </el-input>
        <el-button size="mini" type="success" @click.native='search'>搜索</el-button>
      </section>
      <el-button @click="toggleDialog" type="success" size="mini">关闭</el-button>
    </div>
    <el-divider></el-divider>
    <slot></slot>
  </el-dialog>
</template>

<script>
// import data from "../../mock/data.js"
export default {
  data () {
    return {
      hideSelected: false,
      searchWord: '',
      contractInfo: {},
      activeName: 'first',
      checkList: ['列出已选', '列出未选']
    }
  },
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
    search () {
      // this.getData()
    },
    // // 获取列表数据
    // async getData () {
    //   const params = {searchWord: this.searchWord}
    //   const res = await getList(params)
    //   if (res.code === '0') {
    //     this.tableData = res.data.map(item => {
    //       return {
    //         en: item.FIELD_CODE,
    //         cn: item.FIELD_NAME,
    //         html: `<span id input-edit class="input-comm" desc="${item.FIELD_NAME}">${item.FIELD_CODE}</span>`,
    //         desc: item.FIELD_DESCRIPTION,
    //         selected: false
    //       }
    //     })
    //     this.distribute()
    //   } else {
    //     this.$message.error(res.msg)
    //   }
    // },
    test () {
      console.log('hello world test')
    },
    handleTabClick () {
    },
    toggleDialog (val) {
      console.log('关闭')
      this.$emit('closeModal')
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.tool-bar-wrapper {
  display: flex;
  align-items: center;
  .tool-bar {
    display: flex;
    align-items: center;
    flex: 1;
    > *:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
