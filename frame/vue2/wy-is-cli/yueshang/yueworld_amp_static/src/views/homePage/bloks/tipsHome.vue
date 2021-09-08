<template>
    <div>
        <!-- <div class="d-flex">
            <div class="pd-30">风险预警</div>
             <div class="pd-20">22条</div>
        </div> -->

         <div class="d-flex">
           <div class="b-border">
           <div class="pd-30">风险预警</div>
           </div>
         <div class="b-d">
           <div class="pd-20">22条</div>
        </div>
       </div>


  <div style="height:300px">
  <el-scrollbar style="height:100%;overflow-x: hidden;">
   <div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
      <div class="pd-40">业主收益未达标：14个项目</div>
   </div>
  </el-scrollbar>
  <div class="t-center">查看更多</div>
 </div>
    </div>
</template>

<script>
export default {
    name: 'tipsHome',
    data() {
        return {
             clientHeight:'',//浏览器可视区域高度
             slbHeight:''
          };
     },
    mounted() {
      this.clientHeight = `${document.documentElement.clientHeight}`;//获取浏览器可视区域高度
      let that = this;
      window.onresize = function(){
        this.clientHeight =  `${document.documentElement.clientHeight}`;
        that.slbHeight = this.clientHeight - 480 + 'px';
      }
    },

};
</script>

<style scoped>
  .d-flex{
      display: flex;
      justify-content: space-between
      /* justify-content: space-between; */
      /* width:100%; */
      /* padding-bottom: 8px;
      align-items: center;
      border-bottom: 1px solid #E0DFDD; */
  }
  .pd-20{
     display: inline-block;
    vertical-align: middle;
    width:48px;
    text-align: center;
    /* margin: 0 5px 15px 5px; */
    height: 24px;
    line-height: 24px;
    background:#6F120C;
    border-radius: 30px;
    color: #ffffff;
    font-size: 12px;
    /* padding: 4px 12px; */
}
  .pd-30{
    vertical-align: middle;
    /* margin: 0 5px 15px 5px; */
    height: 24px;
    line-height: 24px;
    /* background:#6F120C; */
    border-radius: 30px;
    color: #050101;
    font-size: 18px;

}
.pd-40{
    /* display: inline-block; */
    /* vertical-align: middle; */
    /* margin: 0 5px 15px 5px; */
  width: 240px;
     margin-top:8px;
    line-height: 24px;
    background:#6F120C;
    border-radius: 30px;
    color: #ffffff;
    font-size: 12px;
     padding: 4px 47px 4px 21px;
}
.t-center{
    text-align: center;
    margin-top:15px;
    font-size:14px;
    color:#BEBEBE;
}
.b-border{
          padding-bottom: 8px;
      align-items: center;
      border-bottom: 1px solid #050101;
      width:50%;
}
.b-d{
   padding-bottom: 8px;
      align-items: center;
      border-bottom: 1px solid #E0DFDD;
        width:50%;
        text-align:right
}
</style>
