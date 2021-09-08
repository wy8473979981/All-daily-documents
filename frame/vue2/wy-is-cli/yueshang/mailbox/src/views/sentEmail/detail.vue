<template>
	<!-- 已发送详情 -->
  <div class="app-page-sent-detail">
    <app-ysn-nav-bar title="已发送" :left-arrow="true"></app-ysn-nav-bar>
    <app-ysn-page-detail :obj="query" :contact="contact" :detailList="msgData" :finished="true" :zfb="!true" :pageType="pageType" :show-del="false" :show-top="false"></app-ysn-page-detail>
    <!-- 添加附件-tip -->
    <app-ysn-add-file v-if="!addFilesStatus" @clickAddFile="clickAddFile"></app-ysn-add-file>
    <!-- 消息列表 -->
    <app-ysn-message :list="msgData" :emialText="emialText"></app-ysn-message>
    <!-- 附件内容 -->
    <app-ysn-add-upload :addFilesStatus="addFilesStatus" :fileData="fileData" jsShow sindex styles></app-ysn-add-upload>
    <!-- buttons -->
    <app-ysn-buttons del :disabled="disabled" :mainId="mainId" :source="source" :page-type="pageType" @delf="delf" @replyf="replyf"></app-ysn-buttons>
  </div>
</template>

<script>
export default {
  name: "app-page-sent-detail",
  data() {
    return {
      pageType: 1,
      addFilesStatus: true,// 附件显示状态
      query: {
        content: null, // 内容
        createrId: null, // 创建人id
        createrName: null, // 创建人名称
        fileNewList: [], // 文件list
        functionCode: null, // 职能编码
        receiverList: [], // 收件人list {createrId,createrName,type}
        // type: 6、7、8、9 收件箱、已发送、草稿箱、已删除
        // type: 10、11、12、13、14 未读、已读、转发、已回复、主表信息
        senderId: null, // 发件人id
        senderName: null, // 发件人名称
        topic: null, //主题描述
      },
      disabled: true,
      msgData: [],
      mainId: null,
      source: null,
      fileData: [],
      contact: [],
      emialText: ''
    }
  },
  watch: {
    'query.content': {
      handler(n, o) {
        console.log('content:',n)
        if(n) {
          this.disabled = false
        }else{
          this.disabled = true
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.mainId = this.$route.query.mainId
    this.detail()
  },
  created() {
  },
  methods: {
    clickAddFile() {
      this.addFilesStatus = true
    },
    delf() {
      console.log('del')
      this.$router.go(-1)
    },
    replyf() {
      console.log('replyf')
    },
    async detail() {
      await this.$axios.common.detail({...this.quser, mainId: this.mainId}).then(res => {
        console.log('获取详情：', res)
        if(res && res.data) {
          this.source = res.data.main.source
          const fCode = this.dePartOptions.find(item => item.value === res.data.main.functionCode)
          if(fCode) {
            this.title = fCode.text
          }
          this.emialText = res.data.main.content || ''
          if(res.data.replyList && res.data.replyList.length > 0){
            const yL = res.data.replyList.length - 1
            this.emialText = res.data.replyList[yL].content
          }
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
          this.contact = res.data.receivePersonList || []
        }
      })
    }
  }
}
</script>
