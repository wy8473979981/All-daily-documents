<template>
  <div>
    <!-- <div class="d-flex">
            <div style="flex:1;">
             <el-row :gutter="20" >
              <el-col :span="4">
               <div class="grid-content bg-purple d-flex">
                  <el-radio v-model="radio" label="1" class="ria" style=" color:#004948; font-size:16px;">按项目单元</el-radio>
             </div>
            </el-col>
           <el-col :span="4"><div class="grid-content bg-purple d-flex">
            <el-radio v-model="radio" label="1" class="rid" style="  color:#A7A7A7; font-size:14px;">按资产单元</el-radio>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple d-flex">
               <div class="pd-20">地产区域：全部</div>
            </div></el-col>
             <el-col :span="4"><div class="grid-content bg-purple d-flex">
            <div class="pd-20">管理公司：全部</div>
            </div></el-col>
           </el-row>
        </div>
     <div style="margin-right:30px;width:88px">
      <el-row :gutter="20" >
        <el-col :span="90" ><div class="grid-content bg-purple d-flex" @click="top()"> <div class="pd-30">{{typetop?'汇总模式':'平铺模式'}}</div> </div></el-col>
     </el-row>
     </div>

        </div> -->

    <div class="d-flex-1" style="margin-top:29px">
      <!-- 左边 -->
      <div class="d-flex-2" style="align-items: center;">
        <div class="mr-20">
          <el-radio v-model="radio" label="1">按项目单元</el-radio>
        </div>
        <div class="mr-40">
          <el-radio v-model="radio" label="1">按资产单元</el-radio>
        </div>
        <div class="mr-20">
          <div style="width:150px;height:32px;background:#C8C6A9;border-radius: 16px;color:#FFFFFF;font-size:14px;line-height:32px;text-align:center">地产区域：全部</div>
        </div>
        <div>
          <div style="width:150px;height:32px;background:#C8C6A9;border-radius: 16px;color:#FFFFFF;font-size:14px;line-height:32px;text-align:center">地产区域：全部</div>
        </div>
      </div>
      <!-- 右边 -->
      <div>
        <div style="width:88px;height:32px;line-height:32px;background:#C8C6A9;text-align:center;border-radius: 16px;color:#ffffff" @click="top">{{ typetop?'汇总模式':'平铺模式' }}</div>
      </div>
    </div>

    <div style="padding-top:29px;display:flex">
      <div style="width:100px">
        <div />
      </div>
      <div style="flex:1">
        <el-row :gutter="10" style="height:36px;line-height:36px">
          <!-- <el-col :span="6" :offset="6"><div class="font-z b-right">1</div></el-col> -->
          <el-col :span="6" style="padding:0"><div class="font-z b-right">在营</div></el-col>
          <el-col :span="6" style="padding:0"><div class="font-z b-right">在建</div></el-col>
          <el-col :span="6" style="padding:0"><div class="font-z b-right flex">
            <div class="d-fl" @mouseenter="mou1" @mouseleave="mou2">
              <div>可售</div>
              <el-switch

                v-model="value"
                style="margin-left:4px;"
                active-color="#13ce66"
                inactive-color="#848382"
              />
            </div>
          </div></el-col>
          <el-col :span="6" style="padding:0"><div class="flex font-z">
            <div class="d-f">
              <div>获取中</div>
              <el-switch
                v-model="value"
                style="margin-left:4px"
                active-color="#13ce66"
                inactive-color="#848382"
              />
            </div>
          </div></el-col>
        </el-row>
      </div>
    </div>

    <!-- 条状图 -->
    <div v-if="typetop" class="" style="display:flex;margin-top:26px;align-items:center">
      <div style="width:100px;">
        <div class="font-24" style="text-align:center">商业</div>
        <div style="text-align:center;color:#A7A7A7">
          <el-radio v-model="radio" label="2" style="color:#A7A7A7;font-size:14px;margin-top:4px">商业街</el-radio>
        </div>
      </div>
      <div style="flex:1;">
        <div style="background:#D9D9D9;border-radius: 20px">
          <el-row :gutter="10" style="height:36px;line-height:36px;">
            <el-col :span="6" style=""><div
              class="font-z"
              style="border-bottom-left-radius: 20px;
              border-top-left-radius: 20px;
              "
            >
              <div
                class="f_1"
                style="border-bottom-left-radius: 20px;border-top-left-radius: 20px;
                "
                @click="btn('1')"
              >122
                <div v-show="falg" class="info-panel-content" style="border-radius:18px">
                  <!-- <el-scrollbar style="height:300px;overflow-x: hidden;"> -->
                  <div class="info-panel-triple" />
                  <!-- <div style> -->
                  <el-scrollbar style="height:250px;overflow-x: hidden;">
                    <div style="display:flex;justify-content:space-between;font-size:14px;">
                      <div>来自</div>
                      <div><el-switch
                        v-model="value"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      /></div>
                    </div>

                  </el-scrollbar>
                  <!-- </div> -->
                  <!-- </el-scrollbar> -->
                </div>

              </div>
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z ">
              <div class="f_2">50个
                <div v-show="falg1" class="info-panel-content1">
                  <div class="info-panel-triple1" />
                  <div>aa</div>
                  <div>cc</div>
                  <div>aa</div>
                  <div>cc</div>
                </div>
              </div>
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z" style="display:flex">
              <div class="f_3" />
              <div class="f_4" />
              20个
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z " style="display:flex">
              <div class="f_5" />
              20g
            </div></el-col>
          </el-row>
        </div>

        <div style="background:#D9D9D9;border-radius: 20px;overflow: hidden;margin-top:8px;height:36px">
          <el-row :gutter="10" style="height:36px;line-height:36px;">
            <el-col :span="6" style="padding:0"><div class="font-z">
              <div class="f_1">1</div>
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z ">
              <div class="f_2">50个</div>
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z" style="display:flex">
              <div class="f_3" />
              <div class="f_4" />
              20个
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z " style="display:flex">
              <div class="f_5" />
              20g
            </div></el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 条状图 -->
    <div v-if="typetop" class="" style="display:flex;margin-top:26px;align-items:center">
      <div style="width:100px;">
        <div class="font-24" style="text-align:center">办公</div>
      </div>
      <div style="flex:1;">
        <div style="background:#D9D9D9;border-radius: 20px">
          <el-row :gutter="10" style="height:36px;line-height:36px;">
            <el-col :span="6" style=""><div
              class="font-z"
              style="border-bottom-left-radius: 20px;
              border-top-left-radius: 20px;
              "
            >
              <div
                class="f_1"
                style="border-bottom-left-radius: 20px;border-top-left-radius: 20px;
                "
                @click="btn('1')"
              >122
              </div>
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z ">
              <div class="f_2" @click="btn('2')">50个
                <div v-show="falg1" class="info-panel-content1">
                  <div class="info-panel-triple1" />
                  <div>aa</div>
                  <div>cc</div>
                  <div>aa</div>
                  <div>cc</div>
                </div>
              </div>
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z" style="display:flex">
              <div class="f_3" />
              <div class="f_4" />
              20个
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z " style="display:flex">
              <div class="f_5" />
              20g
            </div></el-col>
          </el-row>
        </div>

        <div style="background:#D9D9D9;border-radius: 20px;overflow: hidden;margin-top:8px">
          <el-row :gutter="10" style="height:36px;line-height:36px;">
            <el-col :span="6" style="padding:0"><div class="font-z">
              <div class="f_1">1</div>
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z ">
              <div class="f_2">50个</div>
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z" style="display:flex">
              <div class="f_3" />
              <div class="f_4" />
              20个
            </div></el-col>
            <el-col :span="6" style="padding:0"><div class="font-z " style="display:flex">
              <div class="f_5" />
              20g
            </div></el-col>
          </el-row>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ValueHome',
  data() {
    return {
      radio: '',
      value: false,
      typetop: true,
      falg: false,
      falg1: false
    }
  },
  methods: {
    top() {
      this.typetop = !this.typetop
      // console.log( this.typetop)
      this.$emit('presentationMode', this.typetop)
    },
    btn(val) {
      if (val == 1) {
        this.falg = !this.falg
      } else {
        this.falg1 = !this.falg1
      }
    },
    //  鼠标移动上去
    mou1() {
      console.log(1)
      this.value = true
    },
    //  鼠标失去
    mou2() {
      this.value = false
      console.log(2)
    }
  }

}
</script>

<style  lang="scss" scoped>
	.info-panel-triple{
		// width: 0;
		// height: 0;
		// border: 8px solid transparent;
		// border-bottom-color: hsla(0,0%,6%,.6);
    position: absolute;
    left: -30px;
    top: 6px;
    border-right: 17px solid transparent;
    border-left: 27px solid transparent;
    border-bottom: 14px solid rgba(0, 56, 55, 0.95);
    transform: rotate(51deg)
	}
	.info-panel-content{
    width: 198px;
    height: 308px;
    // border-radius: 10px;
    right: -217px;
    // right:0;
    box-sizing: border-box;
    // bottom:0;
    z-index:999;
		// display: inline-block;
		position: absolute;
		background-color: rgba(0, 56, 55, 0.95);
		color: #FFF;
		text-align: left;
		padding-left: 15px;
		padding-right: 12px;
		border-radius: 3px;
		font-size: 0.8rem;
		letter-spacing: 0.1rem;
	}

  	.info-panel-triple1{
		// width: 0;
		// height: 0;
		// border: 8px solid transparent;
		// border-bottom-color: hsla(0,0%,6%,.6);
    position: absolute;
    left: -30px;
    top: 3px;
    border-right: 17px solid transparent;
    border-left: 27px solid transparent;
    border-bottom: 14px solid rgba(0, 0, 0, 0.5);
    transform: rotate(51deg)
	}
	.info-panel-content1{
    width: 300px;
    right: -319px;
    // right:0;
    box-sizing: border-box;
    // bottom:0;
    z-index:999;
		// display: inline-block;
		position: absolute;
		background-color: rgba(0,0,0,.5);
		color: #FFF;
		text-align: left;
		padding-left: 15px;
		padding-right: 12px;
		border-radius: 3px;
		font-size: 0.8rem;
		letter-spacing: 0.1rem;
	}

     .kongxin1{
        width:0;
        height:0;
        border:10px solid transparent;
        border-bottom-color:#fff;
        position: relative;
        top: -39%;
        left:15%;
    }
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
    width:33%;
    background:#41B2AB;
    font-size:24px;
    position: relative;
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
    width:20%;
  }
  .font-24{
    font-size: 24px;
    color:#050101
  }
  .d-flex-1{
    display: flex;
    justify-content: space-between;
  }
  .d-flex-2{
    margin-right: 7px;
    display:flex;
  }
</style>
