<template>
  <div>
    <el-carousel
      indicator-position="none"
      :autoplay="false"
      ref="carousel"
      arrow="hover"
      @change="onCarouselChange"
    >
      <el-carousel-item v-for="item in initInvoiceList " :key="item.invoiceFileUrl">
        <!-- <el-image
          style="width: 100%; height: 100%"
          :src="item.invoiceFileUrl"
          :preview-src-list="srcList"
        ></el-image>-->
        <image-viewer :urlList="[item.invoiceFileUrl]"></image-viewer>
      </el-carousel-item>
    </el-carousel>
    <div class="df mt-2 index-tip">
      <span class="dib w120">截图：{{currentIndex}}/{{initInvoiceList.length}}</span>
      <span class="f1 dib te">双击/鼠标滚轮放大缩小</span>
    </div>
    <div class="p-r o-h">
      <ul class="slider tabs" ref="ul" id="ul-com">
        <li class="tab-list" v-for="(item,index) in initInvoiceList" :key="item.invoiceFileUrl">
          <img
            :src="item.invoiceFileUrl"
            :class="item.recognizeStatus === 1?'success':'error'"
            @click="()=>onViewImage(item,index)"
          />
        </li>
        <div class="right-button" @click="onSlider">
          <i class="el-icon-arrow-right"></i>
        </div>
      </ul>
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'
import ImageViewer from '@/components/image-viewer.vue'
const Plb = namespace('plb')
@Component({
  components: {
    ImageViewer
  }
})
export default class Attachment extends Vue {
  marginLeft = 0

  @Ref() ul: any = { scrollLeft: undefined }

  @Ref() carousel: any

  @Plb.State('initInvoiceList') initInvoiceList: any

  currentIndex = 1

  onViewImage(item: any, index: number) {
    this.carousel.setActiveItem(index)
    this.currentIndex = index + 1
    this.setInvoiceItem(item)
  }

  @Plb.Mutation('setInvoiceItem')
  setInvoiceItem(n: any) {
    return n
  }

  onCarouselChange(currentIndex: number, oriIndex: number) {
    this.currentIndex = currentIndex + 1
    this.setInvoiceItem(this.initInvoiceList[currentIndex])
  }

  onSlider() {
    this.marginLeft = this.marginLeft + 100
    // this.$refs.ul.scrollLeft = this.marginLeft
  }
}
</script>
<style lang='scss' scope>
.el-carousel__container {
  height: 351px;
  border: 1px solid #efefef;
}
.f1 {
  flex: 1;
}
.w120 {
  width: 120px;
}
.te {
  text-align: end;
}
.slider {
  margin-top: 30px;
  margin-bottom: 40px;
  overflow: hidden;
  display: flex;
  height: 76px;
  flex-wrap: nowrap;
  justify-content: space-between;
  img {
    width: 102px;
    height: 76px;
    margin-right: 11px;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .success {
    border: 1px solid rgba(58, 192, 130, 1);
  }
  .error {
    border: 1px solid rgba(255, 79, 79, 1);
  }
}
.right-button {
  position: absolute;
  right: 0;
  top: 30;
  height: 76px;
  line-height: 76px;
  text-align: center;
  color: #ffffff;
  width: 20px;
  background: #c5c5c5;
}
.index-tip {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
}

ul,
li {
  list-style: none;
}

.tab-list {
  text-align: center;
  flex: 1 0 auto;
}
</style>
