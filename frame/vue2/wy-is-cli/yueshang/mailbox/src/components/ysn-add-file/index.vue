<template>
  <!-- 添加附件 tip -->
  <van-row class="app-write-addfile" :class="{'app-border-top': pageType !== 0}" >
    <van-image :src="iconFiles" @click="clickAddFile">添加附件</van-image>
  </van-row>
</template>
<script>
import iconFiles from "../../assets/images/icon-files.png";
export default {
  data() {
    return {
      iconFiles: iconFiles
    }
  },
  props: {
    pageType: {
      type: Number
    }
  },
  methods: {
    clickAddFile() {
      this.$emit('clickAddFile',{})
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.app-write-addfile {
  height: 86px;
  padding: 0 36px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #32A5D1;
  background-color: #FFFFFF;
  margin-bottom: 0!important;
  .van-image {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    /deep/ .van-image__img {
      width: 28px;
      height: 28px;
      margin-right: 12px;
    }
  }
}
</style>
