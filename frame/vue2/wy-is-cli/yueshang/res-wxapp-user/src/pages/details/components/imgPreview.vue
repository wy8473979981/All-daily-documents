<template>
  <!-- 图片附件组件 -->
  <div class="imgPreview-box">
    <h1>图片附件预览</h1>
    <div v-if="imgList.length > 0" class="imgPreview-file">
      <viewer class="imgPreview-viewer" :images="imgList">
        <!-- <img
          v-for="(item, index) in imgList"
          :src="item.showUrl"
          :key="index"
        > -->
        <van-row gutter="10">
          <van-col span="8" v-for="(item, index) in imgList" :key="index">
            <img :src="item.showUrl" :alt="item.filename">
          </van-col>
        </van-row>
      </viewer>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import file from '@/apis/apis/file'
export default {
  data() {
    return {
      imgList: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    this.getAllFileDetail()
  },
  methods: {
    getAllFileDetail () {
      file.getAllFileDetail({approveId: this.userInfo.approveId}).then(res => {
        this.imgList = []
        if (res.code == 1) {
          if (res.data && res.data.length > 0) {
            res.data.forEach(item => {
              if (/(png|jpg|jpeg|gif|bmp)/i.test(item.contentType)) {
                this.imgList.push(item)
              }
            })
          }
        } else {
          this.$toast.fail(res.message)
        }
      })
      this.getSignFile()
    },
    getSignFile () {
      file.getSignFile(this.userInfo.approveId).then(res => {
        if(res.code == 1){
          if (res.data && res.data.length > 0) {
            res.data.forEach(item => {
              if (/(png|jpg|jpeg|gif|bmp)/i.test(item.contentType)) {
                this.imgList.push(item)
              }
            })
          }
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
$color: #468CEB;
$color-file: #F4F5F5;
$color-border: #F4F5F5;

.imgPreview-box {
  padding: 10px;
  background-color: #FFFFFF;
  border-bottom: 10px solid $color-border;
  h1 {
    font-size: 16px;
    color: #333333;
    font-weight: 400;
    height: 16px;
    line-height: 16px;
    border-left: 3px solid $color;
    padding-left: 5px;
    margin: 0 0 10px;
  }
  .imgPreview-file {
    background-color: $color-file;
    padding: 6.66667px 6.66667px 0 6.66667px;
    margin-bottom: 10px;
    .imgPreview-viewer {
      // display: flex;
      // flex-wrap: wrap;
      .van-col--8 {
        padding-bottom: 6.66667px;
      }
      img {
        width: 100%;
        height: 27vw;
        // margin-right: 10px;
        // margin-bottom: 10px;
      }
    }
  }
}
</style>
