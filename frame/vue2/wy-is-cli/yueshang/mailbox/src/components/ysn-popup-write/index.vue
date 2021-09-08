<template>
  <!-- 写信 模版 二次封装 -->
  <app-ysn-popup class="app-modul-pop" :show="showPop" :zType="zType" :ele="ele" @hidePop="hidePop" :filterFull="filterFull" @savePopMsg="savePopMsg" @sentPopMsg="sentPopMsg">
    <div style="height: 100%;overflow-y: auto;-webkit-overflow-scrolling: touch;">
      <van-cell v-if="2 == zType" title="提交人：" :border="false" center title-class="vancell-title" class="app-border-top">
        <span class="app-text-ztype">{{query.senderNameCopy?query.senderNameCopy:query.senderName}}</span>
      </van-cell>
      <van-cell v-if="2 == zType" title="转发：" :border="false" center title-class="vancell-title" class="app-border-top" @click="showcontact">
        <span class="app-text-ztype cut-line1" style="height: 30px;line-height: 30px;padding-right: 20px;">
          <span style="color: #32A5D1;" v-for="(item,index) in receiverList" :key="index" class="app-text-html" @click.stop="showUser(item.createrId)">{{item.createrName}};</span>
        </span>
        <van-image class="app-contact-icon" :src="iconForwarding"></van-image>
      </van-cell>
      <van-cell v-if="2 != zType" title="涉及职能：" :border="false" center title-class="vancell-title" class="app-border-top">
        <template>
          <app-ysn-drop-down-menu :model="query.functionCode" :title="title" :options="dePartOptions" location @changeSelect="changeSelect" />
        </template>
      </van-cell>
      <van-cell title="主题：" :border="false" center title-class="vancell-title" class="app-border-top">
        <template>
          <van-field v-model="query.topic" style="height: 48px;line-height: 48px;" :disabled="disEdit" :class="{'app-pop-title': disEdit}"
                     placeholder="请输入主题描述(10字以内)" maxlength="10" input-align="right" error-message-align="right" />
        </template>
      </van-cell>
      <!-- 添加附件-tip -->
      <app-ysn-add-file v-if="!addFilesStatus" @clickAddFile="clickAddFile"></app-ysn-add-file>
      <!-- 输入内容 -->
      <van-field v-if="2 != zType" v-model="query.content" placeholder="请输入内容描述" type="textarea" clickable
                 style="min-height: 266px;max-height: 266px;"
                 show-word-limit maxlength="1000" class="app-border-top app-textarea" />
      <!-- 转发 -->
      <van-field v-if="2 == zType" v-model="query.content" placeholder="请输入内容(选填)" type="textarea"
                 show-word-limit maxlength="140" class="app-border-top app-textarea" />
      <div v-if="2 == zType" class="msg-email-box">
        <div class="msg-email">{{emialText}}</div>
      </div>
      <!-- 附件内容 -->
      <app-ysn-add-upload v-if="!editFile" :addFilesStatus="true" :setMargin="addFilesStatus" :fileData="fileData" :sindex="sindex" setBottom js-show styles></app-ysn-add-upload>
      <!-- 附件内容 -->
      <app-ysn-add-upload v-show="!isHideUpload" :addFilesStatus="addFilesStatus" :sindex="sindex" :fileData="fileData2" styles @uploadOver="uploadOver"></app-ysn-add-upload>
    </div>
    <!-- 用户弹窗 -->
    <app-ysn-popup-user :show="showUserStatus" :userId="openUserId" @hidePopUser="hidePopUser"></app-ysn-popup-user>
  </app-ysn-popup>
</template>
<script>
import iconForwarding from "../../assets/images/icon-forwarding.png"
export default {
  data() {
    return {
      title: '请选择',
      addFilesStatus: false,
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
      filterFull: 0, // 1 存草稿按钮 2 发送按钮
      fileData: [],
      fileData2: [],
      transmitArray: '', // 转发人-展示
      iconForwarding: iconForwarding,
      showUserStatus: false,
      openUserId: null,
      isHideUpload: false,
      saveType: null,
      emialText: '',// 邮件原内容
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    mainId: {
      type: [Number,String]
    },
    // =2 转发
    zType: {
      type: [Number,String]
    },
    ele: {
      type: String,
      default: '#app'
    },
    receiverList: {
      type: Array,
      default: function(){
        return []
      }
    },
    sindex: {
      type: String,
      default: '76px'
    },
    setBottom: {
      type: Boolean,
      default: false
    },
    editFile: {
      type: Boolean,
      default: false
    },
    disEdit: {
      type: Boolean,
      default: false
    },
    isHideUp: {
      type: Boolean,
      default: false
    },
    pageType: {
      type: [String, Number]
    }
  },
  computed: {
    showPop(){
      return this.show
    }
  },
  watch: {
    query: {
      handler(n) {
        // console.log(n)
        if(2 == this.zType) {
          if(this.receiverList.length > 0 && n.topic) {
            this.filterFull = 2
          }else{
            this.filterFull = 0
          }
        }else{
          if(n.content && n.functionCode) {
            if(n.topic){
              this.filterFull = 2
            }else{
              this.filterFull = 1
            }
          }else{
            this.filterFull = 0
          }
        }
      },
      immediate: true,
      deep: true
    },
    show(n) {
      if(n) {
        this.detail()
      }
    },
    receiverList: {
      handler(n) {
        // console.log(n)
        if(2 == this.zType && n && n.length > 0 && this.query.topic) {
          this.filterFull = 2
        }
      },
      immediate: true,
      deep: true
    },
    isHideUp(n) {
      this.isHideUpload = n
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
  },
  created() {
    if(this.$store && this.$store.state.userInfo) {
      const { uiid,userName } = this.$store.state.userInfo
      // 赋值用户
      this.query.createrId = uiid
      this.query.createrName = userName
      this.query.senderId = uiid
      this.query.senderName = userName
    }
  },
  mounted() {
    window.onresize = (value) => {
      // this.$Error(document.body.clientHeight)
      if(document.body.clientHeight > 650) {
        this.showUpload()
      }else{
        this.hideUpload()
      }
    }
  },
  methods: {
    hidePop(query) {
      console.log('cancel')
      // 任意参数有值、用户误触关闭窗口、非转发
      if((this.query.functionCode || this.query.content || this.query.topic) && !this.saveType && this.zType !== 2 && this.pageType === 99){
        this.savePopMsg()
      }
      this.reset()
      this.$emit('hidePop',query)
    },
    async savePopMsg() {
      // if(!this.query.functionCode) {
      //   this.$toast('请选择职能')
      //   return
      // }
      // if(!this.query.content) {
      //   this.$toast('请输入内容描述')
      //   return
      // }
      if(!this.query.functionCode && !this.query.content && !this.query.topic) {
        this.$toast('请输入内容')
        return
      }
      this.saveType = 1
      this.query.topic = this.query.topic?this.query.topic : '无主题'
      delete this.query['sendTime']
      this.query.id = this.query.mainId
      await this.$axios.user.saveMailbox(this.query).then(res => {
        console.log('保存为草稿：', res)
        this.reset()
        if(res && res.code === '1') {
          setTimeout(() => {
            this.$toast({message: '保存成功',duration: 1200})
          },200)
        }
        setTimeout(() => {
          this.hidePop(this.query)
          this.reset()
        },500)
      })
    },
    async sentPopMsg() {
      console.log('sent message')
      if(!this.query.functionCode && this.zType != '2') {
        this.$toast('请选择职能')
        return
      }
      if(!this.query.content && this.zType != '2') {
        this.$toast('请输入内容描述')
        return
      }
      if(!this.query.topic) {
        this.$toast('请输入主题描述')
        return
      }
      if(this.receiverList.length === 0 && '2' == this.zType) {
        this.$toast('请选择转发人')
        return
      }
      if(this.isSend) {
        return
      }
      this.saveType = 2
      if('2' == this.zType) {
        delete this.query['sendTime']
        this.query.receiverList = this.receiverList
        await this.$axios.manager.forwardMailBox(this.query).then(res => {
          console.log('转发：', res)
          if(res && res.code === '1') {
            this.$store.commit('setReceiverList', [])
            this.$store.commit('setContactArray', [])
            this.$store.commit('setSelectedBox', {selectedUser: [],selectedUserStr: ''})
            setTimeout(() => {
              this.$toast({message: '转发成功',duration: 1200})
            },200)
          }
          setTimeout(() => {
            this.hidePop()
          },500)
        })
      }else{
        delete this.query['sendTime']
        this.query.id = this.query.mainId
        await this.$axios.user.sendMailbox(this.query).then(res => {
          console.log('发送：', res)
          if(res && res.code === '1') {
            setTimeout(() => {
              this.$toast({message: '发送成功',duration: 1200})
            },200)
          }
          setTimeout(() => {
            this.hidePop()
          },500)
        })
      }
    },
    async detail() {
      if(!this.mainId) return
      await this.$axios.common.detail({...this.quser, mainId: this.mainId}).then(res => {
        console.log('获取详情：', res)
        if(res && res.data) {
          const fCode = this.dePartOptions.find(item => item.value === res.data.main.functionCode)
          if(fCode) {
            this.title = fCode.text
          }
          this.query.senderNameCopy = res.data.main.senderName
          delete res.data.main['senderId']
          delete res.data.main['senderName']
          this.emialText = res.data.main.content || ''
          if(res.data.replyList && res.data.replyList.length > 0){
            const yL = res.data.replyList.length - 1
            this.emialText = res.data.replyList[yL].content
          }
          if(this.pageType !== 2) {
            delete res.data.main['content']
          }
          this.query = {...this.query, ...res.data.main}
          if(res.data.fileNewList && res.data.fileNewList.length > 0) {
            if(this.editFile) {
              this.addFilesStatus = true
            }
            this.query.fileNewList = res.data.fileNewList
            console.log("res.data.fileNewList==",res.data.fileNewList)
            this.query.fileNewList = [...res.data.fileNewList]
            res.data.fileNewList.forEach(item => {
              item.url = item.filePath
              const file = {size: item.fileSize,fileName: item.fileName}
              item.file = file
            })
            this.fileData = res.data.fileNewList
            if(this.$store.state.userType === 1) {
              this.fileData2 = res.data.fileNewList
            }
            console.log("this.fileData==",this.fileData)
          }
        }
      })
    },
    clickAddFile() {
      this.addFilesStatus = true
    },
    changeSelect(i) {
      this.title = this.dePartOptions.find(item => item.value === i).text
      this.query.functionCode = i
    },
    reset() {
      const set = {
        content: null, // 内容
        fileNewList: [], // 文件list
        functionCode: null, // 职能编码
        topic: null, //主题描述
        receiverList: [], // 转发列表
      }
      this.addFilesStatus = false
      this.fileData = []
      this.fileData2 = []
      this.query = {...this.query , ...set}
      this.title = '请选择'
      this.saveType = null
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
    // 打开通讯录
    showcontact() {
      this.$router.push({path: 'contact'})
    },
    showUser(id) {
      console.log('展示用户：'+id)
      this.openUserId = id
      this.showUserStatus = true
    },
    hidePopUser() {
      this.openUserId = null
      this.showUserStatus = false
    },
    hideUpload() {
      this.isHideUpload = true
    },
    showUpload() {
      this.isHideUpload = false
    },
    showLog(data) {
      // this.$Error(JSON.stringify(data))
    }
  }
}
</script>
<style lang="scss" scoped>
.van-popup {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
}
.van-popup--bottom.van-popup--round {
  border-radius: 26px 26px 0 0;
}
.app-handle-btn {
  text-indent: 32px;
  color: #333333;
  font-size: 30px;
  font-weight: 500;
  line-height: 42px;
  &:last-child {
    color: #32A5D1;
  }
}
.van-row {
  margin-bottom: 32px;
}
.van-cell__title {
  flex: unset;
}

.vancell-title {
  font-size: 28px;
  font-weight: 400;
  color: #908E94;
  line-height: 96px;
  font-family: PingFangSC-Regular, PingFang SC;
}
.van-cell {
  line-height: 104px;
  padding-top: 0;
  padding-bottom: 0;
}

.van-field {
  padding: 0;
  /deep/ .van-field__body {
    height: 100%;
    align-items: unset;
  }
}
.vancell-title {
  width: 172px;
  flex: unset;
}
.app-textarea {
  padding: 28px 32px 56px;
  line-height: 52px;
  //flex: 1;
  //max-height: 48%;
  //max-height: calc(100% - 810px);
}
.app-textarea::after {
  border: none!important;
}

.msg-email-box {
  width: 100%;
  background-color: #FFFFFF;
  padding-top: 12px;
  .msg-email {
    border-top: 1px solid #F2F2F2;
    padding: 32px 36px 22px 0;
    margin-left: 36px;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 60px;
    //max-height: 300px;
    //overflow-y: auto;
    //-webkit-overflow-scrolling: touch;
  }
}

.app-text-ztype {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  //line-height: 96px;
}
.app-contact-icon {
  width: 28px;
  vertical-align: middle;
  //height: 14px;
  position: absolute;
  top: 18px;
  right: 0;
}
/deep/ .app-text-html {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #908E94;
  line-height: 24px;
  padding-right: 4px;
}

.app-pop-title {
  /deep/ .van-field__control:disabled {
    color: #333333;
    -webkit-text-fill-color: #333333;
  }
}
</style>
