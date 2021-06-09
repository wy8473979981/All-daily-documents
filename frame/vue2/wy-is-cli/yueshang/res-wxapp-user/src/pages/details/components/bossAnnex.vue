<template>
  <!-- 总裁意见副本组件 -->
  <div v-if="this.fileList.length > 0" class="bossAnnex-box">
    <h1>总裁意见副本</h1>
    <van-row class="bossAnnex-file" v-for="(item, index) in fileList" :key="index">
      <van-col span="2" class="col1-box">
        <van-icon name="description" />
      </van-col>
      <van-col span="22" class="col2-box">
        <p class="file-name" @click="download(item)">{{ item.originalFilename }}</p>
        <p class="file-date">{{ item.createdUserName }}<span>{{ item.createdDate }}</span></p>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { mapState } from "vuex"
import file from '@/apis/apis/file'
export default {
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
  },
  mounted() {
    this.getSignFile()
  },
  methods: {
    getSignFile () {
      file.getSignFile(this.userInfo.approveId).then(res => {
        this.fileList = []
        if (res.code == 1) {
          if (res.data && res.data.length > 0) {
            this.fileList.push(res.data[res.data.length - 1])
            this.$emit('bossFile', this.fileList)
          }
        } else {
          this.$toast.fail(res.message)
        }
      })
    },
    // 打开新窗口或下载
    download (item) {
      var contentType = ''
      if (/(ppt)/i.test(item.contentType)) {
        contentType = 'ppt'
      } else if (/(docx)/i.test(item.contentType)) {
        contentType = 'docx'
      } else if (/(doc)/i.test(item.contentType)) {
        contentType = 'doc'
      } else if (/(xlsx)/i.test(item.contentType)) {
        contentType = 'xlsx'
      } else if (/(xls)/i.test(item.contentType)) {
        contentType = 'xls'
      } else if (/(pdf)/i.test(item.contentType)) {
        contentType = 'pdf'
      } else {
        contentType = 'ios'
      }
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // 微信环境
        var userAgent = typeof navigator !== 'undefined' && navigator.userAgent || ''
        var isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent)
        if (isIOS) {
          // ios ppt文件不需要调取小程序api打开
          window.parent.postMessage({type:'download', url: item.showUrl, contentType: 'ios', fileName: item.originalFilename},'*')
          // if (contentType == 'ppt') {
          //   window.parent.postMessage({type:'download', url: item.showUrl, contentType: 'ppt', fileName: item.originalFilename},'*')
          // } else {
          //   window.parent.postMessage({type:'download', url: item.showUrl, contentType: 'ios', fileName: item.originalFilename},'*')
          // }
        } else {
          if (/(png|jpg|jpeg|gif|bmp)/i.test(item.contentType)) {
            window.parent.postMessage({type:'download', url: item.showUrl, contentType: contentType, fileName: item.originalFilename, img: true},'*')
          } else {
            window.parent.postMessage({type:'download', url: item.showUrl, contentType: contentType, fileName: item.originalFilename},'*')
          }
        }
      } else if (window.WebViewJavascriptBridge) {
        // 安卓环境
        window.WebViewJavascriptBridge.callHandler('gotoDetail', {param: '详情', url: item.showUrl}, function () {})
      } else if (window.webkit && window.webkit.messageHandlers) {
        // ios环境
        window.webkit.messageHandlers.gotoDetail.postMessage({title: '详情', url: item.showUrl})
      } else {
        // web环境
        window.open(item.showUrl)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
$color: #468CEB;
$color-file: #F4F5F5;
$color-border: #F4F5F5;

.bossAnnex-box {
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
  .bossAnnex-file {
    background-color: $color-file;
    padding: 10px;
    margin-bottom: 10px;
    .col1-box {
      color: #5AB46E;
      font-size: 18px;
      padding-top: 2px;
    }
    .col2-box {
      p {
        margin: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .file-name {
        color: $color;
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 3px;
      }
      .file-date {
        color: #999999;
        font-size: 12px;
        font-weight: 400;
        span {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
