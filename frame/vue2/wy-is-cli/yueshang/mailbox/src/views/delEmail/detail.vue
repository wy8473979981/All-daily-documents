<template>
	<!-- 已删除详情 -->
  <div class="app-page-del-detail">
    <app-ysn-nav-bar title="已删除" :left-arrow="true"></app-ysn-nav-bar>
    <app-ysn-page-detail :obj="query" :finished="true" :pageType="pageType" :show-del="false" :show-top="false"></app-ysn-page-detail>
    <!-- 消息列表 -->
    <app-ysn-message :list="msgData" :emialText="emialText"></app-ysn-message>
    <!-- 附件内容 -->
    <app-ysn-add-upload :addFilesStatus="addFilesStatus" :fileData="fileData" jsShow styles></app-ysn-add-upload>
    <!-- buttons -->
    <app-ysn-buttons show-cancel @cancelItem="cancelItem" :page-type="pageType" :source="source" :main-id="mainId"></app-ysn-buttons>
  </div>
</template>

<script>
export default {
  name: "app-page-del-detail",
  data() {
    return {
      addFilesStatus: true,
      query: {
      },
      disabled: true,
      msgData: [],
      emialText: '',
      fileData: [],
      pageType: null,
      source: null,
      mainId: null
    }
  },
  watch: {

  },
  mounted() {
    const options = this.$route.query
    if(options) {
      this.mainId = options.mainId
      this.pageType = parseInt(options.pageType)
      this.detail()
    }
  },
  created() {
  },
  methods: {
    async detail() {
      await this.$axios.common.detail({...this.quser, mainId: this.mainId}).then(res => {
        console.log('获取详情：', res)
        if(res && res.data) {
          this.emialText = res.data.main.content || ''
          if(res.data.replyList && res.data.replyList.length > 0){
            const yL = res.data.replyList.length - 1
            this.emialText = res.data.replyList[yL].content
          }
          this.source = res.data.main.source
          delete res.data.main['content']
          this.query = {...this.query, ...res.data.main}
          if(res.data.fileNewList && res.data.fileNewList.length > 0) {
            this.addFilesStatus = true
            console.log("res.data.fileNewList==",res.data.fileNewList)
            res.data.fileNewList.forEach(item => {
              item.url = item.filePath
              const file = {size: item.fileSize,fileName: item.fileName}
              item.file = file
            })
            this.fileData = res.data.fileNewList
          }
          // 前端处理 每条消息 谁发送的
          res.data.replyList.forEach(item => {
            if(res.data.main.isAdmin === '1') {
              item.senderName = item.createName
            }else{
              item.senderName = item.ownerName
            }
          })
          this.msgData = res.data.replyList || []
        }
      })
    },
    clickAddFile() {
      this.addFilesStatus = true
    },
    delf() {
      console.log('del')
    },
    replyf() {
      console.log('replyf')
    },
    cancelItem() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .van-cell-obj::after{
  border-bottom: 1px solid #ECF0F3!important;
}</style>
