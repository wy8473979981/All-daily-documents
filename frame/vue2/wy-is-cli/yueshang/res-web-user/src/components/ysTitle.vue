<template>
  <div class="page-title">
    <el-row class="" type="flex" justify="space-between" align="">
      <el-col class="title">{{$route.meta.title}}</el-col>
      <el-col class="down" align="right" v-if="showDown" >
        <span @click="dealDown">下载导入模版</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    showDown: {
      type: Boolean,
      default: true
    },
    downUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    dealDown(){
      const token = localStorage.getItem('ys_contract_token')
      if(token){
        window.location.href = `../${this.downUrl}?token=${token}`
      }else{
        router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title{
  padding-bottom: 12px;
  .title{
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(119,140,162,1);
  }
  .down{
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(90,180,110,1);
    padding-left: 20px;
    &::before{
      content: '';
      position: absolute;
      background-image: url("../assets/images/down-load.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 14px;
      height: 14px;
      margin-left: -18px;
    }
    &:hover{
      cursor:pointer
    }
  }
}
</style>


