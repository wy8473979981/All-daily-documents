<template>
  <div>
    <div class="container mt-3">
      <div class="carousel-container">
        <carousel></carousel>
      </div>
      <div class="form-container">
        <ocr-result></ocr-result>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import Carousel from './carousel/index.vue'
import OcrResult from './ocr-result/index.vue'

import { namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component({
  components: {
    Carousel,
    OcrResult
  }
})
export default class Attachment extends Vue {}
</script>
<style lang='scss' scope>
.container {
  display: flex;
  width: 1000px;
  margin: auto;
}
.carousel-container {
  width: 566px;
}
.form-container {
  flex: 1;
  margin-left: 16px;
}
</style>
