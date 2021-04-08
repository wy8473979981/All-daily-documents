<template>
      <el-dialog
        title=""
        class="invoiceUploadDetail"
        :visible.sync="dialogTableVisible"
        width="1000px"
        >
        <div @mouseenter="showRotate=true" @mouseleave="showRotate=false">
            <div class="rotate el-icon-refresh-left" v-show="showRotate" @click="imgRotate"></div>
            <div class="preview">
                <img class="pic" :src="img" :style="`transform:rotate(${deg}deg) translate(${translateX}%,${translateY}%)`" el-loading/>
            </div>
        </div>
     </el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'

@Component({})
export default class Preview extends Vue {
  @Watch('dialogTableVisible')
  dialogChange(val: any) {
    this.deg = 0
    this.translateX = 0
    this.translateY = 0
  }

  @Prop(String) img!: string
  showRotate=false
  dialogTableVisible = false
  translateX=0
  translateY=0
  deg=0

  imgRotate() {
    if (this.deg < 270) {
      this.deg += 90
    } else {
      this.deg = 0
    }
    switch (this.deg) {
      case 90:
        this.translateX = 0
        this.translateY = -100
        break
      case 180:
        this.translateX = -100
        this.translateY = -100
        break
      case 270:
        this.translateX = -100
        this.translateY = 0
        break
      default:
        this.translateX = 0
        this.translateY = 0
    }
  }
}
</script>

<style lang="scss">
.invoiceUploadDetail{
  .el-dialog__body{
     padding:18px 20px 16px;
     position: relative;
     .rotate{
      position: absolute;
      left:50%;
      top:50%;
      color:#fff;
      transform:translate(-50%,-50%);
      width:60px;
      height:60px;
      text-align: center;
      cursor: pointer;
      line-height: 60px;
      background:rgba(96,98,102,0.5);
      border-radius:10px;
      font-size: 40px;
      z-index: 2;
    }
  }
  .preview{
    max-height:600px;
    text-align:center;
    overflow: auto;
    .pic{
      transform-origin: 0 0;
    }
  }
}
</style>
