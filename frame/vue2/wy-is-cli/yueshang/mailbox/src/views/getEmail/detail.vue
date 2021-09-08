<template>
	<!-- 收件箱详情 -->
  <div class="app-page-get-detail" id="getDetail" v-if="$store.state && $store.state.userInfo">
    <app-ysn-nav-bar title="收件箱" :left-arrow="true"></app-ysn-nav-bar>
    <app-ysn-page-list :obj="query" :contact="contact" :detailList="detailList" :pageType="pageType" :finished="true" :noBorder="reply?true:false" :show-del="false" :show-top="false"></app-ysn-page-list>
    <!-- 添加附件-tip -->
    <app-ysn-add-file v-if="!addFilesStatus && reply" :pageType="pageType" @clickAddFile="clickAddFile"></app-ysn-add-file>
    <!-- 输入内容 -->
    <van-field v-if="reply" v-model="query.content" placeholder="请输入回复内容" type="textarea" autosize show-word-limit maxlength="140" class="app-textarea app-border-before" />
    <!-- 消息列表 -->
    <app-ysn-message :list="msgData" :emialText="emialText" showBorder></app-ysn-message>
    <!-- 附件内容 -->
    <app-ysn-add-upload v-show="!isHideUpload" :addFilesStatus="true" :setMargin="addFilesStatus" :fileData="fileData" js-show styles></app-ysn-add-upload>
    <!-- 附件内容 -->
    <app-ysn-add-upload v-show="!isHideUpload" :addFilesStatus="addFilesStatus" :fileData="fileData" styles @uploadOver="uploadOver"></app-ysn-add-upload>
    <!-- buttons -->
    <app-ysn-buttons v-show="!isHideUpload" del transmit :reply="reply" :disTransmit="disTransmit" :disReply="disReply" :mainId="mainId" :pageType="pageType" :source="source" @delf="delf" @replyf="replyf" @transmitf="transmitf"></app-ysn-buttons>
    <!-- 写信 -->
    <app-ysn-popup-write :isHideUp="isHideUpload" :show="showPopup" disEdit :mainId="mainId" sindex="0" setBottom :receiverList="receiverList" zType="2" ele="#getDetail" @hidePop="hidePop"></app-ysn-popup-write>
  </div>
</template>

<script>
export default {
  name: "getDetail",
  data() {
    return {
      pageType: 0,
      addFilesStatus: false,
      query: {
        content: '', // 回复内容
        receiverList: [],
        fileNewList: [], // 文件list
      },
      disabled: true,
      msgData: [],
      mainId: null,
      source: null,
      fileData: [],
      detailList: [], // 接收人
      emailType: null,
      showPopup: false,
      disReply: true,
      disTransmit: false, // 取消限制，默认可以多次转发
      reply: false,
      receiverList: [],
      contact: [],
      isHideUpload: false,
      emialText: ''
    }
  },
  watch: {
    'query.content': {
      handler(n, o) {
        // console.log('content:',n)
        if(n) {
          if(this.reply)this.disReply = false
        }else{
          if(this.reply)this.disReply = true
        }
      },
      deep: true,
      immediate: true
    },
    showPopup(n) {
      const pop = document.querySelectorAll(".van-overlay")
      if(pop) {
        Array.from(pop).map(item => {
          const index = item.className.indexOf('overlayNo')
          const imgIndex = item.className.indexOf('van-image-preview__overlay')
          if(index === -1 && imgIndex === -1) {
            item.style.display = n?'block':'none'
          }
        })
      }
    }
  },
  activated() {
    window.onresize = (value) => {
      // this.$Error(document.body.clientHeight)
      if(document.body.clientHeight > 650) {
        this.showUpload()
      }else{
        this.hideUpload()
      }
    }
    if(this.showPopup) {
      const pop = document.querySelectorAll(".van-overlay")
      Array.from(pop).map(item => {
        const index = item.className.indexOf('overlayNo')
        const imgIndex = item.className.indexOf('van-image-preview__overlay')
        if(index === -1 && imgIndex === -1) {
          item.style.display = 'block'
        }
      })
      // this.receiverList = this.$store.state.receiverList
      this.receiverList = this.$store.state.selectedBox.selectedUser
    }else{
      const options = this.$route.query
      if(this.$store && this.$store.state.userInfo) {
        const { uiid, userName } = this.$store.state.userInfo
        // 赋值用户
        this.query.createrId = uiid
        this.query.createrName = userName
        this.query.senderId = uiid
        this.query.senderName = userName
        this.mainId = options.mainId
        this.initData()
      }
    }
  },
  beforeRouteLeave(to,from,next){
    console.log('to===',to)
    if(to.path === '/contact') {
      // from.meta.keepAlive = true
    }else{
      // from.meta.keepAlive = false
      this.resetData()
    }
    next()
  },
  mounted() {
    const options = this.$route.query
    if(options) {
      this.mainId = options.mainId
      if(this.$store && this.$store.state.userInfo) {
        const { uiid, userName } = this.$store.state.userInfo
        // 赋值用户
        this.query.createrId = uiid
        this.query.createrName = userName
        this.query.senderId = uiid
        this.query.senderName = userName
        this.initData()
      }
    }
    window.onresize = (value) => {
      // this.$Error(document.body.clientHeight)
      if(document.body.clientHeight > 650) {
        this.showUpload()
      }else{
        this.hideUpload()
      }
    }
  },
  created() {
  },
  methods: {
    async initData() {
      this.query.content = ''
      await this.$axios.common.detail({...this.quser, mainId: this.mainId}).then(res => {
        console.log('获取详情：', res)
        if(res && res.data) {
          this.source = res.data.main.source
          this.emailType = res.data.main.type
          this.detailList = res.data.detailList || []
          console.log("res.data.personList==",res.data.personList)
          if(res.data.personList && res.data.personList.length > 0) {
            this.disTransmit = false // 取消限制 2021-03-25 19:05:33
          }else{
            this.disTransmit = false // 取消限制 2021-03-25 19:05:33
          }
          if(this.detailList.length > 0) {
            const firstUser = this.detailList[0].senderId
            if(firstUser === this.$store.state.userInfo.uiid) {
              this.reply = false
            }else{
              this.reply = true
            }
          }else{
            this.reply = true
          }
          this.query.sendTimeCopy = res.data.main.sendTime
          delete res.data.main['sendTime']
          this.query.senderNameCopy = res.data.main.senderName
          delete res.data.main['senderId']
          delete res.data.main['senderName']
          this.emialText = res.data.main.content || ''
          if(res.data.replyList && res.data.replyList.length > 0){
            const yL = res.data.replyList.length - 1
            this.emialText = res.data.replyList[yL].content
          }
          delete res.data.main['content']
          this.query = {...this.query, ...res.data.main,receiverList: []}
          if(res.data.fileNewList && res.data.fileNewList.length > 0) {
            // this.addFilesStatus = true
            console.log("res.data.fileNewList==",res.data.fileNewList)
            this.query.fileNewList = [...res.data.fileNewList]
            res.data.fileNewList.forEach(item => {
              item.url = item.filePath
              const file = {size: item.fileSize,fileName: item.fileName}
              item.file = file
            })
            this.fileData = res.data.fileNewList
          }
          this.contact = res.data.personList || []

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
    delf(item) {
      console.log('del')
      this.$store.commit('setDetailItem', item)
      this.$router.go(-1)
    },
    async replyf() {
      // console.log('replyf')
      // console.log("this.detailList==",this.detailList)
      // console.log("this.query==",this.query)
      if(!this.query.content) {
        this.$toast('请输入回复内容')
        return
      }
      if(!this.detailList || this.detailList.length === 0) {
        this.query.receiverList.push({receiverId: this.query.senderId,receiverName: this.query.senderName})
      }else{
        this.query.receiverList.push({receiverId: this.detailList[0].senderId,receiverName: this.detailList[0].senderName})
      }
      await this.$axios.manager.reply(this.query).then(res => {
        console.log('回复：', res)
        if(res.code === '1'){
          this.$toast('回复成功',{duration: 1200})
          this.reply = false
          // this.initData()
          this.$router.go(-1)
        }
      })
    },
    transmitf() {
      // this.$router.push({path: 'contact'})
      this.showPopup = !this.showPopup
    },
    uploadOver(files) {
      console.log("files:",files)
      const { uiid, userName } = this.$store.state.userInfo
      if(files) {
        this.query.fileNewList = []
        files.forEach(item => {
          let file = {createrId: uiid,createrName: userName,fileName: item.file.name,filePath: item.url,fileSize:item.file.size}
          if(item.id || item.id === 0) {
            file = {createrId: item.createrId,createrName: item.createrName,fileName: item.fileName,filePath: item.filePath,fileSize:item.fileSize}
          }else{
            file = {createrId: uiid,createrName: userName,fileName: item.file.name,filePath: item.url,fileSize:item.file.size}
          }
          this.query.fileNewList.push(file)
        })
      }
    },
    hidePop(query) {
      this.receiverList = []
      this.showPopup = false
      this.initData()
      // const index = this.emailList.findIndex(obj => obj.mainId === query.id)
      // this.$set(this.emailList,index,{...this.emailList[index],...query})
    },
    hideUpload() {
      this.isHideUpload = true
    },
    showUpload() {
      this.isHideUpload = false
    },
    resetData() {
      console.log('resetData')
      const _q = {
        content: '', // 回复内容
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
        positionName: '',
        mobilePhone: '',
        receiverCreateTime: '',
        sendTimeCopy: '',
        senderNameCopy: ''
      }
      this.query = {...this.query, ..._q}
      // console.log(8888,this.query)
      this.fileData = []
      this.detailList = []
      this.addFilesStatus = false
      this.msgData = []
      this.disReply = true
      this.disTransmit = true
      this.reply = false
      this.$store.commit('setReceiverList', [])
      this.$store.commit('setContactArray', [])
      this.$store.commit('setSelectedBox', {selectedUser: [],selectedUserStr: ''})
    }
  }
}
</script>
