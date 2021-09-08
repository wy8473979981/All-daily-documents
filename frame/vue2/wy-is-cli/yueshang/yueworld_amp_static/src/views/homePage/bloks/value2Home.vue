<template>
    <div>
            <!-- 条状图 -->
      <div class="" style="display:flex;margin-top:26px;align-items:center"> 
          <div style="width:100px;">
             <div class="font-24" style="text-align:center">商业</div>
             <div style="text-align:center;color:#A7A7A7">
               <el-radio v-model="radio" label="2">商业街</el-radio>
             </div>
          </div>
        <div style="flex:1;">
         <div style="margin-top:8px;width:70%">
             <div style="display:flex">
              <div style="height:44px;line-height:44px;display:flex;flex:1;border-radius: 20px;overflow: hidden">
                 <div style="width:20%;background:#41B2AB"></div>
                 <div style="width:40%;background:#004948"></div>
                 <div style="width:40%;background:#BF9000"></div>
             </div>
             <div style="margin-left:11px;line-height:44px;font-size:24px;color:#050101">116个</div>
             </div>
          </div>

                   <div style="margin-top:8px;width:70%">
             <div style="display:flex">
              <div style="height:44px;line-height:44px;display:flex;flex:1;border-radius: 20px;overflow: hidden">
                 <div style="width:20%;background:#41B2AB"></div>
                 <div style="width:40%;background:#004948"></div>
                 <div style="width:40%;background:#BF9000"></div>
             </div>
             <div style="margin-left:11px;line-height:44px;font-size:24px;color:#050101">116个</div>
             </div>
          </div>
      </div>
    </div>

  <!-- demo -->

    </div>
</template>

<script>
 export default {
    name: 'topHome',
    data() {
        return {
            radio:false,

          };
     },


   methods:{

   }
};
</script>

<style  lang="scss" scoped>

.d-flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    // align-items:center
}
.pd-20{
    width:150px;
    min-width:150px;
     display: inline-block;
    vertical-align: middle;
    // margin: 0 5px 15px 5px;
    height: 32px;
    line-height: 32px;
    background:#C8C6A9;
    border-radius: 30px;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    // padding: 0 30px;
}
.pd-30{
    width:88px;
    // min-width:88px;
     display: inline-block;
    vertical-align: middle;
    // margin: 0 5px 15px 5px;
    height: 32px;
    line-height: 32px;
    background:#C8C6A9;
    border-radius: 30px;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    // padding: 0 30px;
}
.ria{
    color:#004948; font-size:16px;
}
.rid{
    color:#A7A7A7; font-size:14px;
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
 
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .font-z{
      color:#050101;
      font-size:24px;
      text-align: center;
  }
  .b-right{
      border-right: 1px solid #B8B8B8;
  }
  .d-fl{
        width: 112px;
        text-align: center;
        height: 44px;
        background: #D8D8D8;
        text-align: center;
        border-radius: 22px;
        display:flex;
       justify-content: center;
       align-items: center;
  }
  .d-f{
        width: 133.5px;
        text-align: center;
        height: 44px;
        background: #D8D8D8;
        text-align: center;
        border-radius: 22px;
        display:flex;
       justify-content: center;
       align-items: center;
  }
    .d-fg{
        width: 133.5px;
        height: 44px;
        background: #D8D8D8;
        text-align: center;
        border-radius: 22px;
      display:flex;
      justify-content: center;
      align-items: center;
      margin-left:50px;
    //   padding :4px 0;
  }
  .bo{
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px 15px 5px;
    height: 44px;
    line-height: 44px;
    background: #004948;
    border-radius: 30px;
    color: #221913;
    font-size: 24px;
    padding: 0 30px;
  }
  .flex{
          display: flex;
    justify-content: center;
  }
  .flex_2{
      display:flex;
    //   justify-content: space-between;
  }
  .f_1{
    width:30%;
    background:#41B2AB;
    font-size:24px;
    color:#ffffff;
  }
  .f_2{
    width:63%;
    background:#004948;
    font-size:24px;
    color:#ffffff;
  }
    .f_3{
    width:13%;
    background:#41B2AB;
    font-size:24px;
    color:#ffffff;
  }
    .f_4{
    width:23%;
    background:#004948;
    font-size:24px;
    color:#ffffff;
  }
  .f_5{
    background:#BF9000;
    width:70%;
  }
  .font-24{
    font-size: 24px;
    color:#050101
  }
  


</style>
