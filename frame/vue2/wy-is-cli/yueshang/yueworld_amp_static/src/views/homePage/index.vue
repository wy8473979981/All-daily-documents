<template>
  <div class="box">
    <!-- 顶部组件 -->
    <homepage style="flex:1;padding-right:70px" :vl="vl" />
    <el-row :gutter="50" class="home-right" style="padding:0">
      <el-col :span="20000" style="padding:0">
        <el-input
          v-model="input4"
          class="textarea"
          placeholder="全局搜索"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <!-- 分拆出来 -->
        <div style="display:flex;justify-content:space-between;margin-top:8px">
          <div class="pd-20 color-1">搜索</div>
          <div class="pd-30 color-2">设定条件</div>
        </div>

        <div v-if="vl==1" @click="mapimg">
          <img src="../../assets/image/mapImg.png" style="width:300px;" alt="">
        </div>

        <!-- 达标率组件 -->
        <standardHome v-if="vl==2" />
        <!-- 风险提示组件 -->
        <tipsHome style="margin-top:61px" />
      </el-col>
    </el-row>
  </div>

</template>

<script>
import homepage from './bloks/topHome'
import tipsHome from './bloks/tipsHome'
import standardHome from './bloks/standardHome'
export default {
  name: 'TopHome',
  components: { homepage, tipsHome, standardHome },
  data() {
    return {
      input4: '',
      vl: '1'
    }
  },
  mounted() {
    document.body.style.backgroundColor = '#F2F1EC'
  },
  methods: {
    mapimg() {
      this.vl = '2'
      console.log(this.vl)
    }

  }
}
</script>

<style lang="scss" scoped>
.box{
  display:flex;
  box-sizing:border-box;
  padding:33px 26px 26px 2px;
  justify-content:space-around
}
.pd-20{
     display: inline-block;
    vertical-align: middle;
    margin: 0 5px 15px 5px;
    height: 32px;
    line-height: 32px;
    background:#004948;
    border-radius: 30px;
    color: rgba(34, 25, 19, 1);
    font-size: 14px;
    padding: 0 30px;
}
.pd-30{
     display: inline-block;
    vertical-align: middle;
    margin: 0 5px 15px 5px;
    height: 32px;
    line-height: 32px;
    background:#D1CEC9;
    border-radius: 30px;
    color: rgba(34, 25, 19, 1);
    font-size: 14px;
    padding: 0 30px;
}
.color-1{
    color:#ffffff;
}
.color-2{
    color:#FFFFFF
}
   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
   .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    // background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
