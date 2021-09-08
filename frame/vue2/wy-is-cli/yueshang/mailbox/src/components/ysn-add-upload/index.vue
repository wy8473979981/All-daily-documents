<template>
  <!-- 附件内容 -->
  <van-row :class="{'app-file-box': true ,'app-file-box-s': styles,'app-file-box-j': jsShow,'app-file-box-j-s': (jsShow && setMargin),
  'app-file-box-sindex': (jsShow && (sindex == '0' || sindex == '0px')),'app-file-box-bottom': (setBottom && !setMargin)}" :style="{bottom: sindex?sindex:'0'}" class="app-row-box">
    <!--        <van-cell title="上传附件" :border="false" class="app-files" v-if="!addFilesStatus" @click="">-->
    <!--          <template #icon>-->
    <!--            <van-image :src="iconFiles"></van-image>-->
    <!--          </template>-->
    <!--        </van-cell>-->
    <van-cell title="附件" :border="false" class="app-files" v-if="addFilesStatus && (!jsShow || jsShow && fileNewList.length > 0)" @click="addFiles">
      <!--          <template #right-icon>-->
      <!--            <van-image :src="iconFiles">添加</van-image>-->
      <!--          </template>-->
    </van-cell>
    <van-uploader v-model="fileNewList" v-if="addFilesStatus" multiple :before-read="beforeRead" :after-read="afterRead" :max-count="99"
                  :class="{'app-upload-justshow': jsShow}"
                  @click-preview="clickFile"
                  @delete="deleteImage" :max-size="20 * 1024 * 1024" @oversize="onOversize">
      <div>
        <van-image :src="iconAddFile" class="app-upload-add"></van-image>
        <div class="app-upload-add-cover van-ellipsis">20M以内</div>
      </div>
      <template #preview-cover="{ file }">
        <div class="cut-line2 cover-text">{{ file.fileName }}</div>
        <div class="preview-cover van-ellipsis">{{ file.size | dealNum }}</div>
      </template>
    </van-uploader>
  </van-row>
</template>
<script>
import iconAddFile from "../../assets/images/icon-add-file.png";
export default {
  data() {
    return {
      iconAddFile: iconAddFile,
      fileNewList: []
    }
  },
  props: {
    addFilesStatus: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Boolean,
      default: false
    },
    sindex: {
      type: String,
      default: '76px'
    },
    fileData: {
      type: Array,
      default: function() {
        return []
      }
    },
    jsShow: {
      type: Boolean,
      default: false
    },
    setMargin: {
      type: Boolean,
      default: false
    },
    setBottom: {
      type: Boolean,
      default: false
    },
    isHideUp: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    fileData: {
      handler(n, o) {
       this.fileNewList = n
     },
     deep: true,
     immediate: true
    }
  },
  filters: {
    dealNum(num) {
      if(num/1000/1000 > 1) {
        return Math.floor(num/1000/1000) + 'M';
      }else if(num/1000 > 1) {
        return Math.floor(num/1000) + 'K';
      }else if(num > 1) {
        return num + 'B';
      }
    },
    dealText(val) {
      if(val) {
        const arr = val.split('.')
        return val.replace('.'+arr.pop(),'') || ''
      }
    }
  },
  methods: {
    addFiles() {

    },
    beforeRead(file) {
      console.log("file:",file)
      if (Array.isArray(file)) {
        let canUse = true
        file.forEach((item,index) => {
          if(!this.$util.getFileType(item.type,item.name)){
            canUse = false
          }
        })
        if(!canUse) {
          return false;
        }
      }else{
        if (!this.$util.getFileType(file.type,file.name)) {
          // this.$Toast('文件格式不支持！')
          return false;
        }
        return true;
      }
    },
    afterRead(file) {
      // console.log("file999=",file)
      if (Array.isArray(file)) {
        file.forEach((item,index) => {
          this.fileUpload(item,file.length,index)
        })
      }else{
        this.fileUpload(file)
      }
    },
    async fileUpload(file,len,index) {
      // console.log("file",file)
      // console.log("len,index===",len+"--"+index)
      let params = new FormData();
      params.append("file", file.file);
      params.append("creator",this.$store.state.userInfo.userName);
      params.append("version",'1.0');
      params.append('sign','YUEWORLD2A72F53B39C')

      this.$axios.common.fileUpload(params).then(res => {
        console.log('文件上传res：',res)
        console.log('this.fileNewList==',this.fileNewList)
        const imgl = this.fileNewList.length
        if(res && res.data) {
          if(len && len > 0) {
            this.fileNewList[imgl - len + index].url = res.data.fullPath
          }else{
            this.fileNewList[imgl - 1].url = res.data.fullPath
          }
        }else{
          this.fileNewList[imgl - 1].status = 'failed'
          this.fileNewList[imgl - 1].message = '上传失败'
        }
        this.$emit('uploadOver',this.fileNewList)
      })
    },
    deleteImage() {
      this.$emit('uploadOver',this.fileNewList)
    },
    onOversize() {
      this.$Toast('文件大小不能超过 20Mb')
    },
    clickFile(data) {
      if(data && data.url) {
        const sp = data.url.split(".")
        if(sp.length > 0) {
          const name = sp[sp.length - 1]
          if(name.toLowerCase() === 'jpg' || name.toLowerCase() === 'jpeg' || name.toLowerCase() === 'png') {
            // do`not do something
          }else{
            this.$util.openFile(data.url,data.fileName,true)
            // window.open(data.url)
          }
        }else{
          this.$util.openFile(data.url,data.fileName,true)
          // window.open(data.url)
        }
      }
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
/* 附件 */
.app-row-box {
  position: fixed;
  width: 100%;
  bottom: 0;
  padding-bottom: 20px;
  margin-bottom: 0;
}
.app-file-box {
  background-color: #F8F8F8;
}
.app-file-box-s {
  background-color: #FFFFFF!important;
  .app-files {
    background-color: #FFFFFF!important;
    border: none!important;
    height: 52px;
    padding-top: 32px;
    padding-bottom: 10px;
  }
  .van-uploader {
    margin-top: 0;
  }
}
.app-file-box-j {
  position: unset;
  margin-bottom: 150px;
}
.app-file-box-j-s {
  margin-bottom: 500px;
}
.app-file-box-sindex {
  margin-bottom: 300px;
}
.app-file-box-bottom {
  margin-bottom: 0!important;
  bottom: 0!important;
}
.app-upload-add {
  width: 200px;
  height: 200px;
  margin-top: 16px;
  margin-right: 16px;
}
.app-upload-add-cover {
  text-align: center;
  position: absolute;
  bottom: 16px;
  box-sizing: border-box;
  width: 93%;
  width: calc(100% - 16px);
  padding: 0.053333rem;
  background: rgba(0, 0, 0, 0.3);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(1, 1, 1, 0.26) 100%);
  border-radius: 0 0 0.16rem 0.16rem;
  font-size: 0.16rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  height: 0.533333rem;
  line-height: 0.533333rem;
}
/deep/ .van-uploader__input-wrapper {
  position: sticky;
  top: 0;
  left: 0;
}
/deep/ .van-uploader__preview {
  margin: 0 16px 16px 0;
  padding: 16px 0 0;
}
/deep/ .van-uploader__preview-image {
  width: 200px;
  height: 200px;
  border-radius: 12px;
}
/deep/ .van-uploader__preview-delete {
  top: 0;
  right: -10px;
  width: 32px;
  height: 32px;
  background-color: #CACACA;
  border-radius: 100%;
}
/deep/ .van-uploader__preview-delete-icon {
  top: -8px;
  right: -8px;
  font-size: 48px;
}
/deep/ .van-uploader__preview-cover {
  border-radius: 12px;
}
/deep/ .van-uploader__upload {
  width: 200px;
  height: 200px;
  background: #EFEFEF;
  border-radius: 12px;
  padding: 16px 0 0;
  &:after {
    content: '20M以内';
    height: 40px;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 40px;
    text-align: center;
    width: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(1, 1, 1, 0.26) 100%);
    border-radius: 0px 0px 12px 12px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
.app-files {
  height: 116px;
  margin: 0 36px;
  padding: 0;
  width: auto;
  background-color: #F8F8F8;
  border-bottom: 1px solid #ECECEC;
  display: flex;
  align-items: center;
  /deep/ .van-image__img {
    width: 35px;
    height: 35px;
    margin-right: 20px;
    display: inline-block;
    vertical-align: sub;
  }
  /deep/ .van-cell__title {
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
  }
}

/* upload */
.van-uploader {
  margin: 0 0 10px 40px;
  width: 94.6%;
  width: calc(100% - 40px);
  box-sizing: border-box;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  /deep/ .van-uploader__wrapper {
    display: inline-flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    box-sizing: border-box;
    padding-top: 26px;

    /* upload error */
    /deep/ .van-uploader__mask {
      top: 18px;
    }

    .van-uploader__file {
      width: 200px;
      height: 200px;
      border-radius: 12px;
    }
  }
  /deep/ .van-uploader__upload{
    margin-top: 16px;
  }

}
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  text-align: left;
  background: rgba(0, 0, 0, 0.3);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(1, 1, 1, 0.26) 100%);
  border-radius: 0px 0px 12px 12px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  height: 40px;
  line-height: 40px;
}

/* just show imgs */
.app-upload-justshow {
  /deep/ .van-uploader__input-wrapper {
    display: none;
  }
  /deep/ .van-uploader__preview-delete {
    display: none;
  }
  /deep/ .van-icon::before {
    display: none;
  }
}

/* 附件 查看 */
/deep/ .van-icon-description::before {
  background-image: url("../../assets/images/icon-file2.png");
  content: '';
  width: 42px;
  background-repeat: no-repeat;
  height: 30px;
  background-size: 100% 100%;
  margin-bottom: 40px;
}
.cover-text {
  text-align: center;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 28px;
  position: absolute;
  top: 128px;
  padding: 0 28px;
  width: 100%;
}
/deep/ .van-uploader__file-name {
  position: absolute;
  top: 128px;
  padding: 0 28px;
  width: 100%;
  color: #000000;
  font-weight: 400;
  margin: 0;
}
</style>
