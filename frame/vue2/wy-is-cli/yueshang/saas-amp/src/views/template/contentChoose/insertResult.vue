<template>
  <div class="result">
    <strong>插入的数据类型：{{insertInfo.type}}</strong>
    <!-- <section class="info">
      <ul>
        <li class="header">
          <span>类型</span>
          <span>code</span>
        </li>
        <li>
          <span>{{insertInfo.code}}</span>
        </li>
      </ul>
    </section> -->
    <div class="btn-group">
      <el-button type="primary" size="mini" @click="insert">填充到页面</el-button>
      <el-button size="mini" @click="closeModal">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    insertInfo: {
      type: Object
    }
  },
  data () {
    return {
      step: 0
    }
  },
  methods: {
    goStep () {

    },
    insert () {
      this.$emit('emitContent', this.insertInfo)
      this.closeModal()
    },
    closeModal () {
      this.$emit("toggleModal")
    }
  }
}
</script>

<style lang='scss' scoped>
.result{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .btn-group{
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  // .info{
  //   ul{
  //     border: 1px solid grey;
  //     li{
  //       width: 500px;
  //       height: 50px;
  //       display: flex;
  //       line-height: 50px;
  //       &.header{
  //         background: #c9e5f5;
  //       }
  //       &:not(:last-child){
  //         border-bottom: 1px solid grey;
  //       }
  //       span{
  //         flex: 1;
  //         text-align: center;
  //         &:not(:last-child){
  //           border-right: 1px solid grey;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
