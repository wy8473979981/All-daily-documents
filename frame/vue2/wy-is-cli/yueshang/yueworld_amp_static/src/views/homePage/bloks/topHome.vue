<template>
  <div>
    <!-- <div class="d-flex">
   <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple">
      <div class="font-20">总投资</div>
      <div class="color-y">246.63亿</div>
      </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
      <div class="font-20">总面积</div>
      <div class="color-y">246.63亿</div>
      </div></el-col>
 <el-col :span="6"><div class="grid-content bg-purple">
      <div class="font-20">项目</div>
      <div class="color-y">125.64</div>
      </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
      <div class="font-20"><span>总收入</span><span class="mt-8">达标率88%</span></div>
      <div class="color-y">246.63亿</div>
      </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
        <div class="font-20">总估值</div>
      <div class="color-y">246.63亿</div>
      </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
      <div class="font-20">可售货值</div>
      <div class="color-h1">未选</div>
      </div></el-col>

     <el-col :span="5"><div class="grid-content bg-purple">
      <div class="pd-20"><span class="color-b">资产单元：</span><span>890</span></div>
      <div class="pd-20"><span class="color-b">资产单元：</span><span>890</span></div>
      <div class="pd-20"><span class="color-b">资产单元：</span><span>890</span></div>
      </div></el-col>

      <el-col :span="5"><div class="grid-content bg-purple">
      <div class="pd-20"><span class="color-b">资产单元：</span><span>890</span></div>
      <div class="pd-20"><span class="color-b">资产单元：</span><span>890</span></div>
      <div class="pd-20"><span class="color-b">资产单元：</span><span>890</span></div>
      </div></el-col>
</el-row>
     <div style="margin-right:60px;width:180px;text-align:center;">

        <el-row :gutter="20" type="flex" justify="center">
  <el-col :span="100">
             <div class="color-h">2021年</div>
             <div class="box">
           <div style="" class="pd-10">4月</div>
       </div>
               <div><el-radio v-model="radio" label="2">17</el-radio></div>
      </el-col>
      </el-row>

     </div>
</div>  -->

    <!-- <div class="d-flex1">
    <div style="background:pink;width:80%">
      <div class="d-flex2">
        <div style="background:green;width:120px">
          <div class="color-blue">总投资</div>
          <div class="color-y">246.63<span>亿</span></div>
        </div>
         <div style="width:125px">
          <div class="color-blue">总面积</div>
          <div class="color-y">125.64</div>
        </div>
         <div style="width:125px">
          <div class="color-blue">项目</div>
          <div class="color-y">284.66</div>
        </div>
         <div style="width:125px">
          <div class="color-blue">总收入<span class="color-font">达标率85%</span></div>
          <div class="color-y">633.64<span>亿</span></div>
        </div>
                 <div style="width:125px">
          <div class="color-blue">项目</div>
          <div class="color-y">284.66<span>亿</span></div>
        </div>
                 <div style="width:125px">
          <div class="color-blue">可售货值</div>
          <div class="color-y">284.66</div>
        </div>
           <div style="width:150px">
          <div style="width:131px;height:20px;background:#B5B18B">资产单元</div>
           <div style="width:131px;height:20px;background:#B5B18B">资产单元</div>
            <div style="width:131px;height:20px;background:#B5B18B">资产单元</div>
        </div>
                 <div style="width:125px">
          <div class="color-blue">项目</div>
          <div class="color-y">284.66</div>
        </div>
      </div>
    </div>
    <div>右边</div>
 </div> -->

    <div class="box">
      <div class="box1">
        <div>
          <div class="color-blue" style="width:108px">总投资</div><div class="color-y">246.63<span style="font-size:16px;width:120px">亿</span></div>
          <div class="color-blue pt-20">总估值</div><div class="color-y">11212</div>
        </div>

        <div>
          <div class="color-blue" style="width:108px">总面积</div><div class="color-y">246.22<span style="font-size:16px;">亿</span></div>
          <div class="color-blue pt-20">可售货值</div><div style="color:#BFBFBF;font-size:24px;margin-top:4px" class="color-y">未选</div>
        </div>

        <div>
          <div class="color-blue" style="width:108px">项目</div><div class="color-y">284.66</div>
          <div class="pt-20">
            <div class="f-1">资产单元：<span style="font-size:12px;color:#ffffff">890</span></div>
            <div class="f-2">资产单元：<span style="font-size:12px;color:#ffffff">890</span></div>
            <div class="f-3">资产单元：<span style="font-size:12px;color:#ffffff">890</span></div>
          </div>
        </div>

        <div>
          <div class="color-blue">总投1资</div><div class="color-y">11212</div>
          <div class="pt-20">
            <div class="f-1">资产单元：<span style="font-size:12px;color:#ffffff">890</span></div>
            <div class="f-2">资产单元：<span style="font-size:12px;color:#ffffff">890</span></div>
            <div class="f-3">资产单元：<span style="font-size:12px;color:#ffffff">890</span></div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div style="font-size:24px;color:#050101">2021年</div>
          <div
            class="df-le"
            style=" display: flex;
                    align-items: center;
                    justify-content: center;"
          >
            <div style="text-align:center;width:53px;height:28px;background: #E0DFDD;border-radius: 16px;line-height:28px">4月</div></div>
          <div style="text-align:Center">
            <el-radio v-model="radio" label="1" style="color:#848382;font-size:14px">17</el-radio>
          </div>
        </div>

      </div>
    </div>
    <!-- 内容组件横向 -->
    <valueHome v-if="vl=='1'" @presentationMode="presentationMode" />
    <!-- 内容组件纵向 -->
    <value2Home v-if="!mode && vl==='1'" />
    <!-- 地图组件 -->
    <mapHome v-if="vl==='2'" />
  </div>
</template>

<script>
import valueHome from './valueHome'
import value2Home from './value2Home'
import mapHome from './mapHome'
export default {
  name: 'TopHome',
  components: { valueHome, value2Home, mapHome },
  props: {
    vl: {
      type: String
    }
  },
  data() {
    return {
      mode: true,
      radio: false
    }
  },
  mounted() {
    console.log(this.vl)
  },
  methods: {
    presentationMode(data) {
      console.log(data)
      this.mode = data
      console.log(this.mode)
    }
  }
}
</script>
<style lang="scss" scoped>
.box{
  width:718px;
  display:flex;
  justify-content: space-between;
}
.df-le{
  display: flex;
  align-items: center;
}
.box1{
  width:596px;
  display: flex;
  justify-content: space-between;
}
  .d-flex1{
    display: flex;
    width:625px;
    justify-content: space-between;
  }
  .d-flex2{
    display:flex;
    justify-content: space-between;
    width:500px;
     flex-wrap:wrap
  }
.color-y{
  font-size:28px;
  color:#816203;
}
.color-blue{
  font-size:14px;
  color:#004948;
}
.color-font{
  font-size:14px;
  color:#816203;
}
.f-1{
width:131px;height:20px;background:#B5B18B;border-radius: 18px;
line-height: 20px;
text-align: center;
color:#050101;
font-size:12px;
}
.f-2{
  width:131px;height:20px;background:#B5B18B;border-radius: 18px;margin-top:1px;line-height: 20px;
text-align: center;
color:#050101;
font-size:12px;
}
.f-3{
  width:131px;height:20px;background:#B5B18B;border-radius: 18px;margin-top:1px;line-height: 20px;
text-align: center;
color:#050101;
font-size:12px;
}
// .d-flex{
//     display:flex;
//     justify-content: space-between;
// }
// .box{
//     display:flex;
//     justify-content: center;
// }
// .pd-10{
//     // text-align: center;
//      width:53px;
//      height:28px;
//     line-height: 28px;
//     background:#E0DFDD;
//     border-radius: 16px;
//     color: #050101;
//     font-size: 18px;
//     //  padding: 0 4px;
// }
// .pd-20{
//     width:131px;
//     //  display: inline-block;
//     vertical-align: middle;
//     // margin: 0 5px 15px 5px;
//     margin-top:1px;
//     height: 20px;
//     line-height: 20px;
//     background:#B5B18B;
//     border-radius: 18px;
//     color: #ffffff;
//     font-size: 12px;
//     padding: 0 14px;
// }
// .color-b{
//     color:#050101;
// }
// .color-h{
//     color:#050101;
//    font-size:24px;
//    text-align: center;
// }
// .t-c{
//     text-align: center;
// }
// .t-cenetr{
//     text-align:center
// }
// .row-bg{
//     width:77px;

// }
// .white-space-nowrap{
//     color: #A6AEBC;
// }
//   .el-row {
//     margin-bottom: 20px;
//     // padding: 30px;
//     &:last-child {
//       margin-bottom: 0;
//     }
//   }
//   .el-col {
//     border-radius: 4px;
//     margin-top:10px;
//   }
//   .bg-purple-dark {
//     background: #99a9bf;
//   }
//   .bg-purple {
//     // background: #d3dce6;
//   }
//   .bg-purple-light {
//     background: #e5e9f2;
//   }
//   .grid-content {
//     border-radius: 4px;
//     min-height: 36px;
//   }
//   .row-bg {
//     padding: 10px 0;
//     background-color: #f9fafc;
//   }
//   .font-20{
//       color:#004948;
//       font-size:14px;
//   }
//   .color-y{
//       color:#816203;
//       font-size:28px;
//   }
//   .mt-8{
//       margin-left:8px;
//       color:#816203;
//       font-size:14px;
//   }
//   .color-h1{
//       color:#BFBFBF;
//       font-size:28px;
//   }
</style>
